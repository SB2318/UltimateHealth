const Article = require('../models/ArticleModel');

// Create a new article
exports.createArticle = async (req, res) => {
  try {
    const { id, name } = req.body;
    const newArticle = new Article({ id, name });
    await newArticle.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all articles
exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update an article by id
exports.updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const updatedArticle = await Article.findOneAndUpdate({ id }, { name }, { new: true });
    if (!updatedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json(updatedArticle);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete an article by id
exports.deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedArticle = await Article.findOneAndDelete({ id });
    if (!deletedArticle) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
