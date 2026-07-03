const expressAsyncHandler = require("express-async-handler");
const ArticleTag = require("../../models/ArticleModel");
const Article = require("../../models/Articles");
const User = require("../../models/UserModel");
const EditRequest = require("../../models/admin/articleEditRequestModel");
const ReadAggregate = require("../../models/events/readEventSchema");
const WriteAggregate = require("../../models/events/writeEventSchema");
const statusEnum = require("../../utils/StatusEnum");

const mongoose = require("mongoose");

const { throwError } = require("../../utils/throwError");
const { sendSuccess } = require("../../utils/response");
const { HTTP_STATUS, ERROR_CODES } = require("../../constants/errorConstants");

module.exports.createArticle = expressAsyncHandler(async (req, res) => {
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
  } = req.body; // Destructure required fields from req.body

  if (
    !authorId ||
    !title ||
    !authorName ||
    !description ||
    !content ||
    !tags ||
    !imageUtils ||
    !pb_recordId ||
    !allow_podcast
  ) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.VALIDATION_ERROR,
      "Please fill in all fields: authorId, title, authorName, description, content, tags, imageUtils, pb_recordId, allow_podcast",
    );
  }
  // Find the user by ID
  const user = await User.findById(authorId);

  if (!user) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User not found",
    );
  }

  if (user.isBlockUser || user.isBannedUser) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "User is blocked or banned",
    );
  }

  // Create a new article instance
  const newArticle = new Article({
    title,
    authorName,
    content,
    tags,
    description,
    imageUtils,
    authorId: user._id, // Set authorId to the user's ObjectId
    pb_recordId,
    allow_for_podcast: allow_podcast,
  });

  newArticle.mentionedUsers.push(user._id); // Initially all can mention the author.
  // Save the new article to the database
  await newArticle.save();

  // Update the user's articles field
  user.articles.push(newArticle._id);

  // await updateWriteEvents(newArticle._id, user.id);

  await user.save();

  // Respond with a success message and the new article
  sendSuccess(res, HTTP_STATUS.CREATED, "Article under reviewed", newArticle);
});

// Get all articles (published)
module.exports.getAllArticles = expressAsyncHandler(async (req, res) => {
  const { page = 1, limit = 50 } = req.query;

  const query = {
    status: statusEnum.statusEnum.PUBLISHED,
    is_removed: false,
  };

  const skip = (Number(page) - 1) * parseInt(limit);

  const articles = await Article.find(query)
    .populate("tags")
    //.populate('mentionedUsers', 'user_handle user_name Profile_image')
    .populate({
      path: "mentionedUsers",
      select: "user_handle user_name Profile_image",
      match: {
        isBlockUser: false,
        isBannedUser: false,
      },
    })
    //.populate('likedUsers', 'Profile_image')
    .populate({
      path: "likedUsers",
      select: "Profile_image user_name user_handle",
      match: {
        isBlockUser: false,
        isBannedUser: false,
      },
    })
    .populate({
      path: "authorId",
      select: "Profile_image user_name user_handle",
      match: {
        isBlockUser: false,
        isBannedUser: false,
      },
    })
    .skip(skip)
    .limit(Number(limit))
    .sort({ lastUpdated: -1 })
    .exec();

  //console.log("Author", articles);
  articles.filter((r) => r.article?.authorId !== null);

  for (const article of articles) {
    if (article.mentionedUsers) {
      article.mentionedUsers = article.mentionedUsers.filter(
        (user) => user !== null,
      );
    }

    if (article.likedUsers) {
      article.likedUsers = article.likedUsers
        .filter((user) => user !== null)
        .reverse();
    }
  }

  if (Number(page) === 1) {
    const totalArticles = await Article.countDocuments(query);
    const totalPages = Math.ceil(totalArticles / Number(limit));
    sendSuccess(res, HTTP_STATUS.OK, "Articles fetched successfully", {
      articles,
      totalPages,
    });
  } else {
    sendSuccess(res, HTTP_STATUS.OK, "Articles fetched successfully", {
      articles: articles,
    });
  }
});

// Get all articles for user
module.exports.getAllArticlesForUser = expressAsyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status = 1, visit = 1 } = req.query;

  const skip = (Number(page) - 1) * parseInt(limit);

  const query = { authorId: req.userId, is_removed: false };
  let articleQuery = query;
  if (Number(status) === 1) {
    articleQuery = {
      ...query,
      status: statusEnum.statusEnum.PUBLISHED,
    };
  } else if (Number(status) === 2) {
    articleQuery = {
      ...query,
      status: {
        $in: [
          statusEnum.statusEnum.AWAITING_USER,
          statusEnum.statusEnum.REVIEW_PENDING,
          statusEnum.statusEnum.IN_PROGRESS,
          statusEnum.statusEnum.UNASSIGNED,
        ],
      },
    };
  } else if (Number(status) === 3) {
    articleQuery = {
      ...query,
      status: statusEnum.statusEnum.DISCARDED,
    };
  }
  const articles = await Article.find(articleQuery)
    .populate("tags")
    .populate({
      path: "mentionedUsers",
      select: "user_handle user_name Profile_image",
      match: {
        isBlockUser: false,
        isBannedUser: false,
      },
    })
    .populate({
      path: "likedUsers",
      select: "Profile_image user_name user_handle",
      match: {
        isBlockUser: false,
        isBannedUser: false,
      },
    })
    .skip(skip)
    .limit(Number(limit))
    .sort({ lastUpdated: -1 })
    .exec();

  articles.forEach((article) => {
    if (article.mentionedUsers) {
      article.mentionedUsers = article.mentionedUsers.filter(
        (user) => user !== null,
      );
    }

    if (article.likedUsers) {
      article.likedUsers = article.likedUsers
        .filter((user) => user !== null)
        .reverse();
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
      sendSuccess(res, HTTP_STATUS.OK, "Articles fetched successfully", {
        articles,
        totalPages,
        publishedCount,
        progressCount,
        discardCount,
      });
    }
    sendSuccess(res, HTTP_STATUS.OK, "Articles fetched successfully", {
      articles,
      totalPages,
    });
  } else {
    sendSuccess(res, HTTP_STATUS.OK, "Articles fetched successfully", {
      articles: articles,
    });
  }
});

// Get all improvements for user
module.exports.getAllImprovementsForUser = expressAsyncHandler(
  async (req, res) => {
    const userId = req.userId;
    const { page = 1, limit = 10, status = 1, visit = 1 } = req.query;
    if (!userId) {
      throwError(
        HTTP_STATUS.BAD_REQUEST,
        ERROR_CODES.INVALID_INPUT,
        "User ID is required.",
      );
    }

    const skip = (Number(page) - 1) * parseInt(limit);
    let query = { user_id: userId };
    let articleQuery = query;

    if (Number(status) === 1) {
      articleQuery = {
        ...query,
        status: statusEnum.statusEnum.PUBLISHED,
      };
    }

    if (Number(status) === 2) {
      articleQuery = {
        ...query,
        status: {
          $in: [
            statusEnum.statusEnum.AWAITING_USER,
            statusEnum.statusEnum.REVIEW_PENDING,
            statusEnum.statusEnum.IN_PROGRESS,
            statusEnum.statusEnum.UNASSIGNED,
          ],
        },
      };
    }

    if (Number(status) === 3) {
      articleQuery = {
        ...query,
        status: statusEnum.statusEnum.DISCARDED,
      };
    }

    let articles = await EditRequest.find(articleQuery)
      .populate({
        path: "article",
        populate: {
          path: "tags",
        },
        match: {
          is_removed: false,
        },
      })
      .skip(skip)
      .limit(Number(limit))
      .sort({ last_updated: -1 })
      .exec();

    if (articles) {
      articles = articles.filter((a) => a.article !== null);
    }

    if (Number(page) === 1) {
      const totalArticles = await EditRequest.countDocuments(articleQuery);
      const totalPages = Math.ceil(totalArticles / Number(limit));

      if (Number(visit) === 1) {
        const publishedCount = await EditRequest.countDocuments(articleQuery);

        const progressCount = await EditRequest.countDocuments(articleQuery);

        const discardCount = await EditRequest.countDocuments(articleQuery);
        sendSuccess(res, HTTP_STATUS.OK, "Articles fetched successfully", {
          articles,
          totalPages,
          publishedCount,
          progressCount,
          discardCount,
        });
      }
      sendSuccess(res, HTTP_STATUS.OK, "Articles fetched successfully", {
        articles,
        totalPages,
      });
    } else {
      sendSuccess(res, HTTP_STATUS.OK, "Articles fetched successfully", {
        articles: articles,
      });
    }
  },
);

// Get an article by ID
module.exports.getArticleById = expressAsyncHandler(async (req, res) => {
  const article = await Article.findById(req.params.id)
    .populate("tags")
    .populate({
      path: "likedUsers",
      select: "user_handle user_name Profile_image",
      match: {
        isBlockUser: false,
        isBannedUser: false,
      },
    })
    .populate({
      path: "contributors",
      select: "user_handle user_name Profile_image",
      match: {
        isBannedUser: false,
        isBlockUser: false,
      },
    })
    .populate({
      path: "authorId",
      populate: {
        path: "followers",
        select: "user_handle user_name Profile_image",
        match: {
          isBannedUser: false,
          isBlockUser: false,
        },
      },
    })
    .exec();

  if (!article || article.is_removed) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Article not found",
    );
  }

  if (Array.isArray(article.likedUsers)) {
    article.likedUsers = article.likedUsers.filter((user) => user !== null);
  }

  if (Array.isArray(article.contributors)) {
    article.contributors = article.contributors.filter((user) => user !== null);
  }

  if (article.authorId && Array.isArray(article.authorId.followers)) {
    article.authorId.followers = article.authorId.followers.filter(
      (user) => user !== null,
    );
  }

  sendSuccess(res, HTTP_STATUS.OK, "Article fetched successfully", article);
});

// Update an article by ID
module.exports.updateArticle = expressAsyncHandler(async (req, res) => {
  const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  })
    .populate("tags") // This populates the tag data
    .exec();
  if (!article) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Article not found",
    );
  }
  // await article.save();
  sendSuccess(res, HTTP_STATUS.OK, "Article updated successfully", article);
});

// Delete an article by ID
module.exports.deleteArticle = expressAsyncHandler(async (req, res) => {
  const article = await Article.findByIdAndDelete(req.params.id)
    .populate("tags") // This populates the tag data
    .exec();
  if (!article) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Article not found",
    );
  }
  sendSuccess(res, HTTP_STATUS.OK, "Article deleted successfully");
});

// Save Article : (published article)
module.exports.saveArticle = expressAsyncHandler(async (req, res) => {
  const { article_id } = req.body;

  if (!article_id) {
    return res
      .status(400)
      .json({ message: "User ID and Article ID are required" });
  }
  const user = await User.findById(req.userId);
  const article = await Article.findById(Number(article_id))
    .populate("tags") // This populates the tag data
    .exec();

  if (!user || !article || article.is_removed) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User or article not found",
    );
  }

  if (user.isBannedUser) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "User is banned",
    );
  }

  if (article.status !== statusEnum.statusEnum.PUBLISHED) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.INVALID_INPUT,
      "Article is not published",
    );
  }
  // Check if the article is already saved
  //const isArticleSaved = user.savedArticles.includes(id => id === article_id);
  const savedArticlesSet = new Set(user.savedArticles);
  const isArticleSaved = savedArticlesSet.has(article_id);

  if (isArticleSaved) {
    // unsave article
    await Promise.all([
      Article.findByIdAndUpdate(article_id, {
        $pull: { savedUsers: req.userId }, // Remove user from savedUsers
      }),
      User.findByIdAndUpdate(req.userId, {
        $pull: { savedArticles: article_id }, // Remove article from savedArticles
      }),
    ]);
    sendSuccess(res, HTTP_STATUS.OK, "Article unsaved");
  } else {
    await Promise.all([
      Article.findByIdAndUpdate(article_id, {
        $addToSet: { savedUsers: req.userId }, // Add user to savedUsers
      }),
      User.findByIdAndUpdate(req.userId, {
        $addToSet: { savedArticles: article_id }, // Add article to savedArticles
      }),
    ]);
    sendSuccess(res, HTTP_STATUS.OK, "Article saved successfully");
  }
});
// Like Articles (published article)
module.exports.likeArticle = expressAsyncHandler(async (req, res) => {
  const { article_id } = req.body;

  if (!article_id) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.INVALID_INPUT,
      "Article ID and User ID are required",
    );
  }

  const user = await User.findById(req.userId);

  const articleDb = await Article.findById(Number(article_id))
    .populate(["tags", "likedUsers"]) // This populates the tag data
    .exec();

  if (!user || !articleDb || articleDb.is_removed) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User or article not found",
    );
  }

  if (user.isBlockUser || user.isBannedUser) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "User is blocked or banned",
    );
  }

  if (articleDb.status !== statusEnum.statusEnum.PUBLISHED) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.INVALID_INPUT,
      "Article is not published",
    );
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
        $pull: { likedUsers: req.userId }, // Remove user from likedUsers
      }),
      User.findByIdAndUpdate(req.userId, {
        $pull: { likedArticles: Number(article_id) }, // Remove article from likedArticles
      }),
    ]);

    articleDb.likeCount = Math.max(articleDb.likeCount - 1, 0); // Decrement like count
    await articleDb.save();

    sendSuccess(res, HTTP_STATUS.OK, "Article unliked successfully", {
      article: articleDb,
      likeStatus: false,
    });
  } else {
    await Promise.all([
      Article.findByIdAndUpdate(Number(article_id), {
        $addToSet: { likedUsers: req.userId }, // Add user to likedUsers
      }),
      User.findByIdAndUpdate(req.userId, {
        $addToSet: { likedArticles: article_id }, // Add article to likedArticles
      }),
    ]);

    articleDb.likeCount++;
    await articleDb.save();

    sendSuccess(res, HTTP_STATUS.OK, "Article liked successfully", {
      article: articleDb,
      likeStatus: true,
    });
  }
});

// Update View Count (Published article)
module.exports.updateViewCount = expressAsyncHandler(async (req, res) => {
  const { article_id } = req.body;

  const user = await User.findById(req.userId);
  const articleDb = await Article.findById(Number(article_id))
    .populate(["tags", "likedUsers"])
    .exec();

  if (!user || !articleDb || articleDb.is_removed) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "User or article not found",
    );
  }

  if (user.isBlockUser || user.isBannedUser) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "User is blocked or banned",
    );
  }

  if (articleDb.status !== statusEnum.statusEnum.PUBLISHED) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.INVALID_INPUT,
      "Article is not published",
    );
  }

  // Check if the user has already viewed the article
  const userId = new mongoose.Types.ObjectId(req.userId);
  const hasViewed = articleDb.viewUsers.some((id) => id.equals(userId));
  // console.log('Has Viewed', hasViewed)
  // console.log('Article View Users', articleDb.viewUsers);

  if (hasViewed) {
    sendSuccess(res, HTTP_STATUS.OK, "Article already viewed by user", {
      article: articleDb,
      viewStatus: false,
    });
  }

  // Increment view count and add user to viewUsers
  articleDb.viewCount += 1;
  articleDb.viewUsers.push(req.userId);

  await articleDb.save();

  sendSuccess(res, HTTP_STATUS.OK, "Article view count updated", {
    article: articleDb,
    viewStatus: true,
  });
});

// Helper function to get the next id
const getNextId = async () => {
  const tags = await ArticleTag.find().sort({ id: -1 }).limit(1);
  return tags.length === 0 ? 1 : tags[0].id + 1;
};

// Create a new tag
module.exports.addNewTag = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  const id = await getNextId();
  const newTag = new ArticleTag({ id, name });
  await newTag.save();
  sendSuccess(res, HTTP_STATUS.OK, "Tag created successfully", newTag);
});

// Get all tags
module.exports.getAllTags = expressAsyncHandler(async (req, res) => {
  const tags = await ArticleTag.find().sort({ id: -1 });
  sendSuccess(res, HTTP_STATUS.OK, "Tags fetched successfully", tags);
});

// Update a tag by id
module.exports.updateTagById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const updatedTag = await ArticleTag.findOneAndUpdate(
    { id },
    { name },
    { new: true },
  );
  if (!updatedTag) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Tag not found",
    );
  }
  sendSuccess(res, HTTP_STATUS.OK, "Tag updated successfully", updatedTag);
});

// Delete a tag by id
// findById -> Auto cast
// find & findOne -> need explicit cast sometimes
module.exports.deleteArticleTagByIds = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const tag = await ArticleTag.findOne({ id });

  if (!tag) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Tag not found",
    );
  }

  const articleExist = await Article.findOne({
    tags: mongoose.Types.ObjectId(tag._id),
    status: {
      $ne: statusEnum.statusEnum.DISCARDED,
    },
  });

  if (articleExist) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.INVALID_INPUT,
      "Tag is used in an article",
    );
  }

  await ArticleTag.findByIdAndDelete(tag._id);
  sendSuccess(res, HTTP_STATUS.OK, "Tag deleted successfully", tag);
});

// Read Event API
// Update User Read Event
module.exports.updateReadEvents = expressAsyncHandler(async (req, res) => {
  const { article_id } = req.body;

  if (!article_id) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.INVALID_INPUT,
      "Article ID is required",
    );
  }

  const now = new Date();
  const today = new Date(now.setHours(0, 0, 0, 0));

  // New Read Event Entry
  // console.log("Today", today);
  // console.log("Read event post", req.userId);
  const readEvent = await ReadAggregate.findOne({
    userId: req.userId,
    date: today,
  });

  if (!readEvent) {
    // Create New

    const newReadEvent = new ReadAggregate({ userId: req.userId, date: today });
    newReadEvent.dailyReads = 1;
    newReadEvent.monthlyReads = 1;
    newReadEvent.yearlyReads = 1;
    newReadEvent.date = today;
    await newReadEvent.save();

    sendSuccess(res, HTTP_STATUS.OK, "Read Event Saved", newReadEvent);
  } else {
    readEvent.dailyReads += 1;
    readEvent.monthlyReads += 1;
    readEvent.yearlyReads += 1;

    await readEvent.save();

    sendSuccess(res, HTTP_STATUS.OK, "Read Event Saved", readEvent);
  }
});

// GET ALL READ EVENTS STATUS DAILY, WEEKLY, MONTHLY
module.exports.getReadDataForGraphs = expressAsyncHandler(async (req, res) => {
  const userId = req.userId;
  //console.log("Read event", userId);
  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const yearStart = new Date(today.getFullYear(), 0, 1);

  const dailyData = await ReadAggregate.find({ userId, date: today });
  const monthlyData = await ReadAggregate.find({
    userId,
    date: { $gte: monthStart },
  });
  const yearlyData = await ReadAggregate.find({
    userId,
    date: { $gte: yearStart },
  });

  sendSuccess(res, HTTP_STATUS.OK, "Read Data Fetched Successfully", {
    dailyReads: {
      date: today.toISOString().slice(0, 10), // Today's date
      count: dailyData ? dailyData.dailyReads : 0, // Reads today
    },
    monthlyReads: monthlyData.map((entry) => ({
      date: entry.date.toISOString().slice(0, 10), // Date of the month
      count: entry.monthlyReads, // Reads on that day
    })),
    yearlyReads: yearlyData.map((entry) => ({
      month: entry.date.toISOString().slice(0, 7), // Month formatted as YYYY-MM
      count: entry.yearlyReads, // Reads for that month
    })),
  });
});

// GET ALL Write EVENTS STATUS DAILY, WEEKLY, MONTHLY
module.exports.getWriteDataForGraphs = expressAsyncHandler(async (req, res) => {
  const userId = req.userId;

  const today = new Date();
  const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
  const yearStart = new Date(today.getFullYear(), 0, 1);

  const dailyData = await WriteAggregate.find({ userId, date: today });
  const monthlyData = await WriteAggregate.find({
    userId,
    date: { $gte: monthStart },
  });
  const yearlyData = await WriteAggregate.find({
    userId,
    date: { $gte: yearStart },
  });

  sendSuccess(res, HTTP_STATUS.OK, "Write Data Fetched Successfully", {
    dailyWrites: {
      date: today.toISOString().slice(0, 10), // Today's date
      count: dailyData ? dailyData.dailyWrites : 0, // Writes today
    },
    monthlyWrites: monthlyData.map((entry) => ({
      date: entry.date.toISOString().slice(0, 10), // Date of the month
      count: entry.monthlyWrites, // Writes on that day
    })),
    yearlyWrites: yearlyData.map((entry) => ({
      month: entry.date.toISOString().slice(0, 7), // Month formatted as YYYY-MM
      count: entry.yearlyWrites, // Writes for that month
    })),
  });
});

// Repost Article (Published article)
module.exports.repostArticle = expressAsyncHandler(async (req, res) => {
  const { articleId } = req.body;
  const userId = req.userId;

  if (!articleId) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.MISSING_REQUIRED_FIELD,
      "Article ID is required",
    );
  }

  const [article, user] = await Promise.all([
    Article.findById(Number(articleId)),
    User.findById(userId),
  ]);

  if (!article || !user || article.is_removed) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Article or user not found",
    );
  }

  if (user.isBlockUser || user.isBannedUser) {
    throwError(
      HTTP_STATUS.FORBIDDEN,
      ERROR_CODES.ACCESS_DENIED,
      "You are blocked or banned",
    );
  }

  if (article.status !== statusEnum.statusEnum.PUBLISHED) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.INVALID_INPUT,
      "Article is not published",
    );
  }
  // Check if user has already reposted the article
  // Check if the article is already liked
  const repostArticlesSet = new Set(user.repostArticles);
  const isArticleRepost = repostArticlesSet.has(article._id);

  if (isArticleRepost) {
    user.repostArticles = user.repostArticles.filter(
      (id) => id !== article._id,
    );
    user.repostArticles.unshift(article._id); // unshift will add one element at the beginning of the array
    await user.save();
  } else {
    user.repostArticles.push(article._id);
    await user.save();
    article.repostUsers.push(user._id);
    await article.save();
  }

  sendSuccess(res, HTTP_STATUS.OK, "Article reposted successfully", {});
});

module.exports.getImprovementById = expressAsyncHandler(async (req, res) => {
  const reqid = req.params.reqid;
  if (!reqid) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.MISSING_REQUIRED_FIELD,
      "Request ID is required",
    );
  }

  const improvement = await EditRequest.findById(reqid)
    .populate({
      path: "article",
      populate: {
        path: "tags",
      },
    })
    .exec();

  if (improvement.article.is_removed) {
    throwError(
      HTTP_STATUS.NOT_FOUND,
      ERROR_CODES.RESOURCE_NOT_FOUND,
      "Article not found",
    );
  }

  sendSuccess(
    res,
    HTTP_STATUS.OK,
    "Improvement fetched successfully",
    improvement,
  );
});
