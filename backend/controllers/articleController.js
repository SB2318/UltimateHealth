const expressAsyncHandler = require("express-async-handler");
const ArticleTag = require("../models/ArticleModel");
const Article = require("../models/Articles");
const User = require("../models/UserModel");
const EditRequest = require('../models/admin/articleEditRequestModel');
const ReadAggregate = require("../models/events/readEventSchema");
const WriteAggregate = require("../models/events/writeEventSchema");
const statusEnum = require("../utils/StatusEnum");
const { sendArticleForReviewEmail } = require("./emailservice");

const mongoose = require('mongoose');

module.exports.createArticle = expressAsyncHandler(
  async (req, res) => {
    try {

      const {
        authorId,
        title,
        authorName,
        description,
        content,
        tags,
        imageUtils,
        pb_recordId,
        allow_podcast,
        language = 'en-IN',
        isTranslation = false,
        sourceArticleId,
        sourceArticleRecordId,
        sourceLanguage,
        translationOf,
      } = req.body; // Destructure required fields from req.body


      if (!authorId || !title || !authorName || !description || !content
        || !tags || !imageUtils || !pb_recordId || !language) {
        return res.status(400).json({ message: "Please fill in all fields: authorId, title, authorName, description, content, tags, imageUtils, pb_recordId, allow_podcast, language" });
      }

      if (!Array.isArray(tags) || tags.length === 0) {
        return res.status(400).json({ error: "Tags must be a non-empty array" });
      }

      for (const tag of tags) {
        if (
          !tag ||
          typeof tag !== "object" ||
          !tag._id ||
          !mongoose.Types.ObjectId.isValid(tag._id)
        ) {
          return res.status(400).json({ error: "Invalid tag format" });
        }
      }


      // Later will be there language schema check
      const validTags = tags.map(tag => new mongoose.Types.ObjectId(tag._id));
      // validate tags
      const validTagsFromDB = await ArticleTag.find({ _id: { $in: validTags } });
      if (validTags.length !== validTagsFromDB.length) {
        return res.status(400).json({ error: "Invalid tags provided" });
      }
      // Find the user by ID
      const user = await User.findById(authorId);

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      if (user.isBlockUser || user.isBannedUser) {
        return res.status(403).json({ error: "User is blocked or banned." });
      }

      let sourceArticle = null;
      const requestedTranslation = Boolean(isTranslation || sourceArticleId || translationOf);

      if (requestedTranslation) {
        const articleToTranslate = Number(sourceArticleId || translationOf);

        if (!articleToTranslate || Number.isNaN(articleToTranslate)) {
          return res.status(400).json({ error: "A valid source article ID is required for translations" });
        }

        sourceArticle = await Article.findById(articleToTranslate);

        if (!sourceArticle || sourceArticle.is_removed) {
          return res.status(404).json({ error: "Source article not found" });
        }

        const originalLanguage = sourceLanguage || sourceArticle.language;

        if (originalLanguage === language) {
          return res.status(400).json({ error: "Translation language must be different from the source article language" });
        }

        const existingTranslation = await Article.findOne({
          $or: [
            { translationOf: sourceArticle._id },
            { sourceArticleId: sourceArticle._id },
          ],
          language,
          is_removed: false,
          status: { $ne: statusEnum.statusEnum.DISCARDED },
        });

        if (existingTranslation) {
          return res.status(409).json({ error: "A translation for this article and language already exists" });
        }
      }

      // Create a new article instance
      const newArticle = new Article({
        title,
        authorName,
        content,
        tags,
        description,
        imageUtils,
        language,
        isTranslation: requestedTranslation,
        sourceArticleId: sourceArticle ? sourceArticle._id : null,
        sourceArticleRecordId: sourceArticleRecordId || (sourceArticle ? sourceArticle.pb_recordId : null),
        sourceLanguage: sourceArticle ? sourceLanguage || sourceArticle.language : null,
        translationOf: sourceArticle ? sourceArticle._id : null,
        authorId: user._id, // Set authorId to the user's ObjectId
        pb_recordId,
        allow_for_podcast: allow_podcast
      });

      newArticle.mentionedUsers.push(user._id); // Initially all can mention the author.
      // Save the new article to the database
      await newArticle.save();

      // Update the user's articles field
      user.articles.push(newArticle._id);

      if (sourceArticle) {
        await Article.findByIdAndUpdate(sourceArticle._id, {
          $addToSet: { translatedArticles: newArticle._id }
        });
      }

      // await updateWriteEvents(newArticle._id, user.id);

      await user.save();

      sendArticleForReviewEmail(user.email, title);
      // Respond with a success message and the new article
      res.status(201).json({
        message: requestedTranslation ? "Translation under reviewed" : "Article under reviewed",
        newArticle
      });

    } catch (error) {
      console.log("Article Creation Error", error);
      res.status(500).json({ error: "Error creating article", details: error.message });
    }
  }
)

// Get all articles (published)
module.exports.getAllArticles = expressAsyncHandler(
  async (req, res) => {

    const { page = 1, limit = 150 } = req.query;
    try {

      const query = {
        status: statusEnum.statusEnum.PUBLISHED,
        is_removed: false
      };



      const skip = (Number(page) - 1) * parseInt(limit);

      let articles = await Article.find(query)
        .populate('tags')
        //.populate('mentionedUsers', 'user_handle user_name Profile_image')
        .populate({
          path: 'mentionedUsers',
          select: 'user_handle user_name Profile_image',
          match: {
            isBlockUser: false,
            isBannedUser: false
          }
        })
        //.populate('likedUsers', 'Profile_image')
        .populate({
          path: 'likedUsers',
          select: 'Profile_image user_name user_handle',
          match: {
            isBlockUser: false,
            isBannedUser: false
          }
        })
        .populate({
          path: 'authorId',
          select: 'Profile_image user_name user_handle',
          match: {
            isBlockUser: false,
            isBannedUser: false
          }
        })
        .skip(skip)
        .limit(Number(limit))
        .sort({ lastUpdated: -1 })
        .exec();

      //console.log("Author", articles);
      articles = articles.filter(r => r.authorId !== null);

      for (const article of articles) {

        if (article.mentionedUsers) {
          article.mentionedUsers = article.mentionedUsers.filter(user => user !== null);
        }

        if (article.likedUsers) {
          article.likedUsers = article.likedUsers.filter(user => user !== null).reverse();
        }
      }

      if (Number(page) === 1) {
        const totalArticles = await Article.countDocuments(query);
        const totalPages = Math.ceil(totalArticles / Number(limit));
        res.status(200).json({ articles, totalPages });
      } else {
        res.status(200).json({ articles: articles });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching articles", details: error.message });
    }
  }
)


// Get all articles for user
module.exports.getAllArticlesForUser = expressAsyncHandler(
  async (req, res) => {
    const { page = 1, limit = 10, status = 1, visit = 1 } = req.query;
    try {

      const skip = (Number(page) - 1) * parseInt(limit);

      const query = { authorId: req.userId, is_removed: false };
      let articleQuery = query;
      if (Number(status) === 1) {
        articleQuery = {
          ...query,
          status: statusEnum.statusEnum.PUBLISHED
        }
      }
      else if (Number(status) === 2) {
        articleQuery = {
          ...query,
          status: {
            $in: [
              statusEnum.statusEnum.AWAITING_USER,
              statusEnum.statusEnum.REVIEW_PENDING,
              statusEnum.statusEnum.IN_PROGRESS,
              statusEnum.statusEnum.UNASSIGNED
            ]
          },
        }
      }
      else if (Number(status) === 3) {
        articleQuery = {
          ...query,
          status: statusEnum.statusEnum.DISCARDED
        }
      }
      const articles = await Article.find(articleQuery)
        .populate('tags')
        .populate({
          path: 'mentionedUsers',
          select: 'user_handle user_name Profile_image',
          match: {
            isBlockUser: false,
            isBannedUser: false
          }
        })
        .populate({
          path: 'likedUsers',
          select: 'Profile_image user_name user_handle',
          match: {
            isBlockUser: false,
            isBannedUser: false
          }
        })
        .skip(skip)
        .limit(Number(limit))
        .sort({ lastUpdated: -1 })
        .exec();

      articles.forEach(article => {
        if (article.mentionedUsers) {
          article.mentionedUsers = article.mentionedUsers.filter(user => user !== null);
        }

        if (article.likedUsers) {
          article.likedUsers = article.likedUsers.filter(user => user !== null).reverse();

        }

      });

      if (Number(page) === 1) {
        const totalArticles = await Article.countDocuments(articleQuery);
        const totalPages = Math.ceil(totalArticles / Number(limit));

        if (Number(visit) === 1) {
          const publishedCount = await Article.countDocuments({
            authorId: req.userId,
            status: statusEnum.statusEnum.PUBLISHED,
            is_removed: false,
          });

          const progressCount = await Article.countDocuments({
            authorId: req.userId,
            status: {
              $in: [
                statusEnum.statusEnum.AWAITING_USER,
                statusEnum.statusEnum.REVIEW_PENDING,
                statusEnum.statusEnum.IN_PROGRESS,
                statusEnum.statusEnum.UNASSIGNED,
              ],
            },
            is_removed: false,
          });

          const discardCount = await Article.countDocuments({
            authorId: req.userId,
            status: statusEnum.statusEnum.DISCARDED,
            is_removed: false,
          });
          res.status(200).json({ articles, totalPages, publishedCount, progressCount, discardCount });
          return;
        }
        res.status(200).json({ articles, totalPages });

      } else {
        res.status(200).json({ articles: articles });
      }

    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching articles", details: error.message });
    }
  }
)

// Get all improvements for user
module.exports.getAllImprovementsForUser = expressAsyncHandler(
  async (req, res) => {
    const userId = req.userId;
    const { page = 1, limit = 10, status = 1, visit = 1 } = req.query;
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required.' });
    }
    try {

      const skip = (Number(page) - 1) * parseInt(limit);
      let query = { user_id: userId };
      let articleQuery = query;

      if (Number(status) === 1) {
        articleQuery = {
          ...query,
          status: statusEnum.statusEnum.PUBLISHED
        }
      }

      if (Number(status) === 2) {
        articleQuery = {
          ...query,
          status: {
            $in: [
              statusEnum.statusEnum.AWAITING_USER,
              statusEnum.statusEnum.REVIEW_PENDING,
              statusEnum.statusEnum.IN_PROGRESS,
              statusEnum.statusEnum.UNASSIGNED
            ]
          }
        }
      }

      if (Number(status) === 3) {
        articleQuery = {
          ...query,
          status: statusEnum.statusEnum.DISCARDED
        };
      }

      let articles = await EditRequest.find(articleQuery).populate({
        path: 'article',
        populate: {
          path: 'tags',
        },
        match: {
          is_removed: false
        }
      })
        .skip(skip)
        .limit(Number(limit))
        .sort({ last_updated: -1 })
        .exec();

      if (articles) {
        articles = articles.filter(a => a.article !== null);
      }

      if (Number(page) === 1) {
        const totalArticles = await EditRequest.countDocuments(articleQuery);
        const totalPages = Math.ceil(totalArticles / Number(limit));

        if (Number(visit) === 1) {
          const publishedCount = await EditRequest.countDocuments(articleQuery);

          const progressCount = await EditRequest.countDocuments(articleQuery);

          const discardCount = await EditRequest.countDocuments(articleQuery);
          res.status(200).json({ articles, totalPages, publishedCount, progressCount, discardCount });
          return;
        }
        res.status(200).json({ articles, totalPages });

      } else {
        res.status(200).json({ articles: articles });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
)

// Get an article by ID
module.exports.getArticleById = expressAsyncHandler(
  async (req, res) => {
    try {

      const article = await Article.findById(req.params.id)
        .populate('tags')
        .populate({
          path: 'likedUsers',
          select: 'user_handle user_name Profile_image',
          match: {
            isBlockUser: false,
            isBannedUser: false
          }
        })
        .populate({
          path: 'contributors',
          select: 'user_handle user_name Profile_image',
          match: {
            isBannedUser: false,
            isBlockUser: false
          }
        })
        .populate({
          path: "authorId",
          populate: {
            path: 'followers',
            select: 'user_handle user_name Profile_image',
            match: {
              isBannedUser: false,
              isBlockUser: false
            }
          }
        })
        .populate({
          path: 'translationOf',
          select: '_id title language pb_recordId'
        })
        .populate({
          path: 'translatedArticles',
          select: '_id title description language imageUtils pb_recordId status',
          match: {
            is_removed: false,
            status: statusEnum.statusEnum.PUBLISHED
          }
        })
        .exec();

      if (!article || article.is_removed) {
        return res.status(404).json({ message: "Article not found" });
      }



      if (Array.isArray(article.likedUsers)) {
        article.likedUsers = article.likedUsers.filter(user => user !== null);
      }


      if (Array.isArray(article.contributors)) {
        article.contributors = article.contributors.filter(user => user !== null);
      }


      if (article.authorId && Array.isArray(article.authorId.followers)) {
        article.authorId.followers = article.authorId.followers.filter(user => user !== null);
      }

      if (Array.isArray(article.translatedArticles)) {
        article.translatedArticles = article.translatedArticles.filter(article => article !== null);
      }



      res.status(200).json({ article });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching article", details: error.message });
    }
  }
)

module.exports.getArticleTranslations = expressAsyncHandler(
  async (req, res) => {
    try {
      const { language } = req.query;
      const article = await Article.findById(Number(req.params.id));

      if (!article || article.is_removed) {
        return res.status(404).json({ message: "Article not found" });
      }

      const rootArticleId = article.isTranslation && article.translationOf
        ? article.translationOf
        : article._id;

      const query = {
        $or: [
          { translationOf: rootArticleId },
          { sourceArticleId: rootArticleId },
        ],
        is_removed: false,
        status: statusEnum.statusEnum.PUBLISHED,
      };

      if (language) {
        query.language = language;
      }

      const translations = await Article.find(query)
        .populate('tags')
        .populate({
          path: 'authorId',
          select: 'Profile_image user_name user_handle',
          match: {
            isBlockUser: false,
            isBannedUser: false
          }
        })
        .sort({ lastUpdated: -1 })
        .exec();

      res.status(200).json({ translations });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error fetching article translations", details: error.message });
    }
  }
)

// Update an article by ID
module.exports.updateArticle = expressAsyncHandler(
  async (req, res) => {
    try {
      const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).populate('tags') // This populates the tag data
        .exec();
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      // await article.save();
      res.status(200).json({ message: "Article updated successfully", article });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error updating article", details: error.message });
    }
  }
)

// Delete an article by ID
module.exports.deleteArticle = expressAsyncHandler(
  async (req, res) => {
    try {
      const article = await Article.findByIdAndDelete(req.params.id)
        .populate('tags') // This populates the tag data
        .exec();
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.status(200).json({ message: "Article deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error deleting article", details: error.message });
    }
  }
)

// Save Article : (published article)
module.exports.saveArticle = expressAsyncHandler(
  async (req, res) => {
    try {
      const { article_id } = req.body;

      if (!article_id) {
        return res.status(400).json({ message: "User ID and Article ID are required" });
      }
      const user = await User.findById(req.userId);
      const article = await Article.findById(Number(article_id))
        .populate('tags') // This populates the tag data
        .exec();

      if (!user || !article || article.is_removed) {
        return res.status(404).json({ error: 'User or article not found' });
      }

      if (user.isBannedUser) {
        return res.status(403).json({ error: 'User is banned' });
      }

      if (article.status !== statusEnum.statusEnum.PUBLISHED) {
        return res.status(400).json({ message: 'Article is not published' });
      }
      // Check if the article is already saved
      //const isArticleSaved = user.savedArticles.includes(id => id === article_id);
      const savedArticlesSet = new Set(user.savedArticles);
      const isArticleSaved = savedArticlesSet.has(article_id);

      if (isArticleSaved) {

        // unsave article
        await Promise.all([
          Article.findByIdAndUpdate(article_id, {
            $pull: { savedUsers: req.userId } // Remove user from savedUsers
          }),
          User.findByIdAndUpdate(req.userId, {
            $pull: { savedArticles: article_id } // Remove article from savedArticles
          })
        ]);
        res.status(200).json({ message: 'Article unsaved' });

      }
      else {
        await Promise.all([
          Article.findByIdAndUpdate(article_id, {
            $addToSet: { savedUsers: req.userId } // Add user to savedUsers
          }),
          User.findByIdAndUpdate(req.userId, {
            $addToSet: { savedArticles: article_id } // Add article to savedArticles
          })
        ]);
        res.status(200).json({ message: 'Article saved successfully' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error saving article', details: error.message });
    }
  }
)
// Like Articles (published article)
module.exports.likeArticle = expressAsyncHandler(
  async (req, res) => {
    try {
      const { article_id } = req.body;

      if (!article_id) {
        return res.status(400).json({ message: "Article ID and User ID are required" });
      }

      const user = await User.findById(req.userId);



      const articleDb = await Article.findById(Number(article_id))
        .populate(['tags', 'likedUsers']) // This populates the tag data
        .exec();

      if (!user || !articleDb || articleDb.is_removed) {
        return res.status(404).json({ error: 'User or Article not found' });
      }

      if (user.isBlockUser || user.isBannedUser) {
        return res.status(403).json({ error: 'User is blocked or banned' });
      }


      if (articleDb.status !== statusEnum.statusEnum.PUBLISHED) {
        return res.status(400).json({ message: 'Article is not published' });
      }
      // Check if the article is already liked
      const likedArticlesSet = new Set(user.likedArticles);
      const isArticleLiked = likedArticlesSet.has(Number(article_id));
      //console.log("Article Id", article_id);

      // console.log('Liked Articles', user.likedArticles);
      //  console.log('Article Liked', isArticleLiked );
      //  console.log('Liked Users', articleDb.likedUsers);
      if (isArticleLiked) {

        // Unlike It
        await Promise.all([
          Article.findByIdAndUpdate(Number(article_id), {
            $pull: { likedUsers: req.userId } // Remove user from likedUsers
          }),
          User.findByIdAndUpdate(req.userId, {
            $pull: { likedArticles: Number(article_id) } // Remove article from likedArticles
          })
        ]);

        articleDb.likeCount = Math.max(articleDb.likeCount - 1, 0); // Decrement like count
        await articleDb.save();

        return res.status(200).json({
          message: 'Article unliked successfully', data: {
            article: articleDb,
            likeStatus: false
          }
        });

      } else {
        await Promise.all([
          Article.findByIdAndUpdate(Number(article_id), {
            $addToSet: { likedUsers: req.userId } // Add user to likedUsers
          }),
          User.findByIdAndUpdate(req.userId, {
            $addToSet: { likedArticles: article_id } // Add article to likedArticles
          })
        ]);

        articleDb.likeCount++;
        await articleDb.save();

        return res.status(200).json({
          message: 'Article liked successfully', data: {
            article: articleDb,
            likeStatus: true
          }
        });
      }

    } catch (error) {
      res.status(500).json({ error: 'Error liking article', details: error.message });
    }
  }
)

// Update View Count (Published article)
module.exports.updateViewCount = expressAsyncHandler(
  async (req, res) => {
    const { article_id } = req.body;

    try {

      const user = await User.findById(req.userId);
      const articleDb = await Article.findById(Number(article_id))
        .populate(['tags', 'likedUsers'])
        .exec();

      if (!user || !articleDb || articleDb.is_removed) {
        return res.status(404).json({ error: 'User or Article not found' });
      }

      if (user.isBlockUser || user.isBannedUser) {
        return res.status(403).json({ error: 'User is blocked or banned' });
      }

      if (articleDb.status !== statusEnum.statusEnum.PUBLISHED) {
        return res.status(400).json({ message: 'Article is not published' });
      }

      // Check if the user has already viewed the article
      const userId = new mongoose.Types.ObjectId(req.userId);
      const hasViewed = articleDb.viewUsers.some(id => id.equals(userId));
      // console.log('Has Viewed', hasViewed)
      // console.log('Article View Users', articleDb.viewUsers);

      if (hasViewed) {
        return res.status(200).json({ message: 'Article already viewed by user', article: articleDb });
      }

      // Increment view count and add user to viewUsers
      articleDb.viewCount += 1;
      articleDb.viewUsers.push(req.userId);

      await articleDb.save();
      res.status(200).json({ message: 'Article view count updated', article: articleDb });

    } catch (err) {
      res.status(500).json({ error: 'Error updating view', details: err.message });
    }
  }
)


// Helper function to get the next id
const getNextId = async () => {
  const tags = await ArticleTag.find().sort({ id: -1 }).limit(1);
  return tags.length === 0 ? 1 : tags[0].id + 1;
};

// Create a new tag
module.exports.addNewTag = expressAsyncHandler(
  async (req, res) => {
    try {
      const { name } = req.body;
      const id = await getNextId();
      const newTag = new ArticleTag({ id, name });
      await newTag.save();
      res.status(201).json(newTag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
)

// Get all tags as per used in the last articles
module.exports.getAllTags = expressAsyncHandler(
  async (req, res) => {
    try {
      const articles = await Article.find(
        {
          status: statusEnum.statusEnum.PUBLISHED
        }
      ).sort({
        lastUpdated: -1
      }).select('tags')
        .lean();

      const tagIds = [];

      // constant operation, at most 5 tags in the inner loop
      articles.forEach(article => {

        article.tags.forEach(tag => {
          if (!tagIds.some(id => id.toString() === tag.toString())) {
            tagIds.push(tag);
          }
        })
      });

      //  Fetch tags
      const tags = await ArticleTag.find({
        _id: { $in: tagIds }
      });

      //  Preserve order
      const orderedTags = tagIds.map(id =>
        tags.find(tag => tag._id.toString() === id.toString())
      );
      //  const tags = await ArticleTag.find().sort({ id: -1 });
      res.status(200).json(orderedTags.filter(Boolean));
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
)

// Update a tag by id
module.exports.updateTagById = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const updatedTag = await ArticleTag.findOneAndUpdate(
        { id },
        { name },
        { new: true }
      );
      if (!updatedTag) {
        return res.status(404).json({ error: "Tag not found" });
      }
      res.status(200).json(updatedTag);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
)

// Delete a tag by id
// findById -> Auto cast
// find & findOne -> need explicit cast sometimes
module.exports.deleteArticleTagByIds = expressAsyncHandler(
  async (req, res) => {
    try {
      const { id } = req.params;


      const tag = await ArticleTag.findOne({ id });

      if (!tag) {
        return res.status(404).json({ message: "Tag not found" });
      }

      const articleExist = await Article.findOne({
        tags: mongoose.Types.ObjectId(tag._id), status: {
          $ne: statusEnum.statusEnum.DISCARDED
        }
      })

      if (articleExist) {
        return res.status(400).json({ message: "Tag is used in an article" });
      }

      await ArticleTag.findByIdAndDelete(tag._id);


      res.status(200).json({ message: "Tag deleted successfully", data: tag });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
)

// Read Event API
// Update User Read Event
module.exports.updateReadEvents = expressAsyncHandler(
  async (req, res) => {

    const { article_id } = req.body;

    if (!article_id) {
      return res.status(400).json({ error: "Article ID is required" });
    }

    const now = new Date();
    const today = new Date(now.setHours(0, 0, 0, 0));

    try {
      // New Read Event Entry
      // console.log("Today", today);
      // console.log("Read event post", req.userId);
      const readEvent = await ReadAggregate.findOne({ userId: req.userId, date: today });

      if (!readEvent) {
        // Create New

        const newReadEvent = new ReadAggregate({ userId: req.userId, date: today });
        newReadEvent.dailyReads = 1;
        newReadEvent.monthlyReads = 1;
        newReadEvent.yearlyReads = 1;
        newReadEvent.date = today;
        await newReadEvent.save();

        res.status(201).json({ message: 'Read Event Saved', event: newReadEvent });
      } else {
        readEvent.dailyReads += 1;
        readEvent.monthlyReads += 1;
        readEvent.yearlyReads += 1;

        await readEvent.save();

        res.status(201).json({ message: 'Read Event Saved', event: readEvent });
      }
    } catch (err) {
      console.log('Article Read Event Update Error', err);
      res.status(500).json({ error: err.message });
    }
  }
)

// GET ALL READ EVENTS STATUS DAILY, WEEKLY, MONTHLY
module.exports.getReadDataForGraphs = expressAsyncHandler(
  async (req, res) => {

    const userId = req.userId;
    //console.log("Read event", userId);
    try {
      const today = new Date();
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const yearStart = new Date(today.getFullYear(), 0, 1);

      const dailyData = await ReadAggregate.find({ userId, date: today });
      const monthlyData = await ReadAggregate.find({ userId, date: { $gte: monthStart } });
      const yearlyData = await ReadAggregate.find({ userId, date: { $gte: yearStart } });

      res.status(200).json({
        dailyReads: {
          date: today.toISOString().slice(0, 10), // Today's date
          count: dailyData ? dailyData.dailyReads : 0 // Reads today
        },
        monthlyReads: monthlyData.map(entry => ({
          date: entry.date.toISOString().slice(0, 10), // Date of the month
          count: entry.monthlyReads // Reads on that day
        })),
        yearlyReads: yearlyData.map(entry => ({
          month: entry.date.toISOString().slice(0, 7), // Month formatted as YYYY-MM
          count: entry.yearlyReads // Reads for that month
        })),
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching read data' });
    }
  }
)

// GET ALL Write EVENTS STATUS DAILY, WEEKLY, MONTHLY
module.exports.getWriteDataForGraphs = expressAsyncHandler(
  async (req, res) => {

    const userId = req.userId;

    try {
      const today = new Date();
      const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
      const yearStart = new Date(today.getFullYear(), 0, 1);

      const dailyData = await WriteAggregate.find({ userId, date: today });
      const monthlyData = await WriteAggregate.find({ userId, date: { $gte: monthStart } });
      const yearlyData = await WriteAggregate.find({ userId, date: { $gte: yearStart } });

      res.status(200).json({
        dailyWrites: {
          date: today.toISOString().slice(0, 10), // Today's date
          count: dailyData ? dailyData.dailyWrites : 0 // Writes today
        },
        monthlyWrites: monthlyData.map(entry => ({
          date: entry.date.toISOString().slice(0, 10), // Date of the month
          count: entry.monthlyWrites // Writes on that day
        })),
        yearlyWrites: yearlyData.map(entry => ({
          month: entry.date.toISOString().slice(0, 7), // Month formatted as YYYY-MM
          count: entry.yearlyWrites // Writes for that month
        })),
      });
    } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching read data' });
    }
  }
)

// Repost Article (Published article)
module.exports.repostArticle = expressAsyncHandler(
  async (req, res) => {

    try {

      const { articleId } = req.body;
      const userId = req.userId;

      if (!articleId) {
        res.status(400).json({ error: 'Article ID is required.' });
        return;
      }

      const [article, user] = await Promise.all([
        Article.findById(Number(articleId)),
        User.findById(userId),
      ]);

      if (!article || !user || article.is_removed) {
        res.status(404).json({ error: 'Article or user not found.' });
        return;
      }

      if (user.isBlockUser || user.isBannedUser) {
        res.status(403).json({ error: 'You are blocked or banned.' });
        return;
      }

      if (article.status !== statusEnum.statusEnum.PUBLISHED) {
        return res.status(400).json({ message: 'Article is not published' });
      }
      // Check if user has already reposted the article
      // Check if the article is already liked
      const repostArticlesSet = new Set(user.repostArticles);
      const isArticleRepost = repostArticlesSet.has(article._id);

      if (isArticleRepost) {
        user.repostArticles = user.repostArticles.filter(id => id !== article._id);
        user.repostArticles.unshift(article._id); // unshift will add one element at the beginning of the array
        await user.save();
      } else {
        user.repostArticles.push(article._id);
        await user.save();
        article.repostUsers.push(user._id);
        await article.save();
      }

      res.status(200).json({ message: "Article reposted successfully" });

    } catch (err) {
      console.log('Error reposting article', err);
      res.status(500).json({ message: "Internal server error" });
    }

  }
)



module.exports.getImprovementById = expressAsyncHandler(

  async (req, res) => {

    const reqid = req.params.reqid;
    if (!reqid) {
      return res.status(400).json({ message: "Request ID is required" });
    }
    try {

      const improvement = await EditRequest.findById(reqid).populate({
        path: 'article',
        populate: {
          path: 'tags',
        },
      }).exec();

      if (improvement.article.is_removed) {
        return res.status(404).json({ message: "Article not found" });
      }

      res.status(200).json(improvement);

    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
)






// Trust or Untrust an Article
module.exports.trustArticle = expressAsyncHandler(
  async (req, res) => {
    try {
      const { article_id } = req.body;

      if (!article_id) {
        return res.status(400).json({ message: "Article ID is required" });
      }

      const user = await User.findById(req.userId);
      const articleDb = await Article.findById(Number(article_id));

      if (!user || !articleDb || articleDb.is_removed) {
        return res.status(404).json({ error: 'User or Article not found' });
      }

      if (user.isBlockUser || user.isBannedUser) {
        return res.status(403).json({ error: 'User is blocked or banned' });
      }

      if (articleDb.status !== statusEnum.statusEnum.PUBLISHED) {
        return res.status(400).json({ message: 'Article is not published' });
      }

      const trustedArticlesSet = new Set(user.trustedArticles);
      const trustUsersSet = new Set(articleDb.trustUsers.map(id => id.toString()));

      let isTrusted;

      if (trustedArticlesSet.has(articleDb._id)) {
        // Untrust
        trustedArticlesSet.delete(articleDb._id);
        trustUsersSet.delete(user._id.toString());
        isTrusted = false;
      } else {
        // Trust
        trustedArticlesSet.add(articleDb._id);
        trustUsersSet.add(user._id.toString());
        isTrusted = true;
      }

      user.trustedArticles = Array.from(trustedArticlesSet);
      articleDb.trustUsers = Array.from(trustUsersSet);

      await Promise.all([user.save(), articleDb.save()]);

      return res.status(200).json({ 
        message: isTrusted ? 'Article trusted successfully' : 'Article untrusted successfully',
        isTrusted
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

// Get trusted users for an article
module.exports.getTrustedUsers = expressAsyncHandler(
  async (req, res) => {
    try {
      const { article_id } = req.query;

      if (!article_id) {
        return res.status(400).json({ message: "Article ID is required" });
      }

      const articleDb = await Article.findById(Number(article_id))
        .populate('trustUsers', 'user_name user_handle Profile_image bio')
        .exec();

      if (!articleDb || articleDb.is_removed) {
        return res.status(404).json({ error: 'Article not found' });
      }

      return res.status(200).json({ 
        trustUsers: articleDb.trustUsers 
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
