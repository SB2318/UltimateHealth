const ArticleTag = require("../models/ArticleModel");
const Article = require("../models/Articles");
const User = require("../models/UserModel");

// Create a new article
module.exports.createArticle = async (req, res) => {
  try {
    const { authorId,  title, authorName, content, tags,imageUtils } = req.body; // Destructure required fields from req.body

    // Find the user by ID
    const user = await User.findById(authorId);
    
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Create a new article instance
    const newArticle = new Article({
      title,
      authorName,
      content,
      tags,
      imageUtils,
      authorId: user._id, // Set authorId to the user's ObjectId
    });

    // Save the new article to the database
    await newArticle.save();

    // Update the user's articles field
    user.articles.push(newArticle._id); 
 
    await user.save();
    // Respond with a success message and the new article
    res.status(201).json({ message: "Article created successfully", newArticle });
  } catch (error) {
    console.log("Article Creation Error", error);
    res.status(500).json({ error: "Error creating article", details: error.message });
  }
};

// Get all articles
module.exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate('tags') // This populates the tag data
      .exec();
    res.status(200).json({ articles });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching articles", details: error.message });
  }
};


// Get an article by ID
module.exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ article });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching article", details: error.message });
  }
};

// Update an article by ID
module.exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
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
};

// Delete an article by ID
module.exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error deleting article", details: error.message });
  }
};

// Save Article :
module.exports.saveArticle = async (req, res) => {
  try {
    const { article_id } = req.body;

    if(!article_id){
      return res.status(400).json({ message: "User ID and Article ID are required"});
    }
    const user = await User.findById(req.user.userId);
    const  article = await Article.findById(article_id);

    if (!user || !article) {
      return res.status(404).json({ error: 'User or article not found' });
    }

    // Check if the article is already saved
    //const isArticleSaved = user.savedArticles.includes(id => id === article_id);
    const savedArticlesSet = new Set(user.savedArticles);
    const isArticleSaved = savedArticlesSet.has(article_id);
  
    if (isArticleSaved) {
      
       // unsave article
       await Promise.all([
        Article.findByIdAndUpdate(article_id, {
          $pull: { savedUsers: req.user.userId } // Remove user from savedUsers
        }),
        User.findByIdAndUpdate(req.user.userId, {
          $pull: { savedArticles: article_id } // Remove article from savedArticles
        })
      ]);
      res.status(200).json({ message: 'Article unsaved'});
    
  }
   else{
    await Promise.all([
      Article.findByIdAndUpdate(article_id, {
        $addToSet: { savedUsers: req.user.userId } // Add user to savedUsers
      }),
      User.findByIdAndUpdate(req.user.userId, {
        $addToSet: { savedArticles: article_id } // Add article to savedArticles
      })
    ]);
    res.status(200).json({ message: 'Article saved successfully'});
   }
  } catch (error) {
    res.status(500).json({ error: 'Error saving article', details: error.message });
  }
};

// Like Articles
module.exports.likeArticle = async (req, res) => {
  try {
    const { article_id} = req.body;

    if(!article_id){
      return res.status(400).json({ message: "Article ID and User ID are required"});
    }

    const user = await User.findById(req.user.userId);
    
    const articleDb = await Article.findById(article_id);

    if (!user || !articleDb) {
      return res.status(404).json({ error: 'User or Article not found' });
    }


    // Check if the article is already liked
    const likedArticlesSet = new Set(user.likedArticles);
    const isArticleLiked = likedArticlesSet.has(article_id);
   //console.log("Article Id", article_id);
 
  // console.log('Liked Articles', user.likedArticles);
 //  console.log('Article Liked', isArticleLiked );
 //  console.log('Liked Users', articleDb.likedUsers);
    if (isArticleLiked) {

      // Unlike It
      await Promise.all([
        Article.findByIdAndUpdate(article_id, {
          $pull: { likedUsers: req.user.userId } // Remove user from likedUsers
        }),
        User.findByIdAndUpdate(req.user.userId, {
          $pull: { likedArticles: article_id } // Remove article from likedArticles
        })
      ]);

      articleDb.likeCount = Math.max(articleDb.likeCount - 1, 0); // Decrement like count
      await articleDb.save();

      return res.status(200).json({ message: 'Article unliked successfully', articleDb });
      
    }else{
      await Promise.all([
        Article.findByIdAndUpdate(article_id, {
          $addToSet: { likedUsers: req.user.userId } // Add user to likedUsers
        }),
        User.findByIdAndUpdate(req.user.userId, {
          $addToSet: { likedArticles: article_id } // Add article to likedArticles
        })
      ]);

      articleDb.likeCount++;
      await articleDb.save();

      return res.status(200).json({ message: 'Article liked successfully', articleDb });
    }

  } catch (error) {
    res.status(500).json({ error: 'Error liking article', details: error.message });
  }
};

// Update View Count
module.exports.updateViewCount = async(req, res)=>{

  const {article_id} = req.body;
  const user = await User.findById(req.user.userId);
    //console.log("user", req.user);
 try{
  const articleDb = await Article.findById(article_id);

  if (!user || !articleDb) {
    return res.status(404).json({ error: 'User or Article not found' });
  }
  articleDb.viewCount +=1;
  await articleDb.save();
  res.status(200).json({ message: 'Article view count updated', article: articleDb});

 }catch(err){

  res.status(500).json({ error: 'Error liking article', details: err.message });
 }

}

// Helper function to get the next id
const getNextId = async () => {
  const tags = await ArticleTag.find().sort({ id: -1 }).limit(1);
  return tags.length === 0 ? 1 : tags[0].id + 1;
};

// Create a new tag
exports.addNewTag = async (req, res) => {
  try {
    const { name } = req.body;
    const id = await getNextId();
    const newTag = new ArticleTag({ id, name });
    await newTag.save();
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all tags
exports.getAllTags = async (req, res) => {
  try {
    const tags = await ArticleTag.find();
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a tag by id
exports.updateTagById = async (req, res) => {
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
};

// Delete a tag by id
exports.deleteArticleTagByIds = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTag = await ArticleTag.findOneAndDelete({ id });
    if (!deletedTag) {
      return res.status(404).json({ error: "Tag not found" });
    }
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
