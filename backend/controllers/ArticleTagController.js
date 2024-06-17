const ArticleTag = require('../models/ArticleTagModel');

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
    const updatedTag = await ArticleTag.findOneAndUpdate({ id }, { name }, { new: true });
    if (!updatedTag) {
      return res.status(404).json({ error: 'Tag not found' });
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
      return res.status(404).json({ error: 'Tag not found' });
    }
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
