const ArticleTag = require("../models/ArticleModel");
const Article = require("../models/Articles");

// Create a new article
module.exports.createArticle = async (req, res) => {
  try {
    const newArticle = new Article(req.body);
    await newArticle.save();
    res
      .status(201)
      .json({ message: "Article created successfully", newArticle });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error creating article", details: error.message });
  }
};

// Get all articles
module.exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
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
//Search an article by title
module.exports.getArticleByTitle = async (req, res) => {
  try {
    const article = await Article.findOne({ title: req.params.title });
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
//Search an article by Name
module.exports.getArticleByName = async (req, res) => {
  try {
    const article = await Article.findOne({
      authorName: req.params.authorName,
    });
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

//Search an article by Summary
module.exports.getArticlesBySummary = async (req, res) => {
  try {
    const { summary } = req.query;
    if (!summary) {
      return res
        .status(400)
        .json({ message: "Summary is required to search articles" });
    }

    const articles = await Article.find({
      summary: { $regex: summary, $options: "i" },
    });

    if (articles.length === 0) {
      return res
        .status(404)
        .json({ message: "No articles found with the given summary" });
    }

    res.status(200).json({ articles });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error fetching articles by summary",
        details: error.message,
      });
  }
};
//Search an article by Tags
module.exports.getArticlesByTags = async (req, res) => {
  try {
    const { tags } = req.query;
    if (!tags || tags.length === 0) {
      return res
        .status(400)
        .json({ message: "Tags are required to search articles" });
    }

    const tagsArray = tags.split(","); // Assuming tags are provided as a comma-separated string in the query
    const articles = await Article.find({ tags: { $in: tagsArray } });

    if (articles.length === 0) {
      return res
        .status(404)
        .json({ message: "No articles found with the given tags" });
    }

    res.status(200).json({ articles });
  } catch (error) {
    res
      .status(500)
      .json({
        error: "Error fetching articles by tags",
        details: error.message,
      });
  }
};

/**** For Article Tags */
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
