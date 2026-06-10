const BookmarkCollection = require("../models/BookmarkCollection");

exports.createCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Collection name is required" });
    }
    const collection = await BookmarkCollection.create({
      userId: req.user.userId,
      name: name.trim(),
      description: (description || "").trim(),
    });
    res.status(201).json(collection);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "A collection with that name already exists" });
    }
    console.error("createCollection error:", err);
    res.status(500).json({ message: "Failed to create collection" });
  }
};

exports.getCollections = async (req, res) => {
  try {
    const collections = await BookmarkCollection.find({
      userId: req.user.userId,
    })
      .select("-__v")
      .sort({ updatedAt: -1 })
      .lean();

    const result = collections.map((c) => ({
      ...c,
      articleCount: c.articleIds ? c.articleIds.length : 0,
    }));

    res.json(result);
  } catch (err) {
    console.error("getCollections error:", err);
    res.status(500).json({ message: "Failed to fetch collections" });
  }
};

exports.getCollection = async (req, res) => {
  try {
    const collection = await BookmarkCollection.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    }).lean();

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit) || 20));
    const start = (page - 1) * limit;
    const paginatedIds = collection.articleIds.slice(start, start + limit);

    res.json({
      _id: collection._id,
      name: collection.name,
      description: collection.description,
      articleIds: paginatedIds,
      totalArticles: collection.articleIds.length,
      page,
      totalPages: Math.ceil(collection.articleIds.length / limit) || 1,
      createdAt: collection.createdAt,
      updatedAt: collection.updatedAt,
    });
  } catch (err) {
    console.error("getCollection error:", err);
    res.status(500).json({ message: "Failed to fetch collection" });
  }
};

exports.updateCollection = async (req, res) => {
  try {
    const { name, description } = req.body;
    const update = {};
    if (name !== undefined) update.name = name.trim();
    if (description !== undefined) update.description = description.trim();

    if (update.name === "") {
      return res.status(400).json({ message: "Collection name cannot be empty" });
    }

    const collection = await BookmarkCollection.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.json(collection);
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "A collection with that name already exists" });
    }
    console.error("updateCollection error:", err);
    res.status(500).json({ message: "Failed to update collection" });
  }
};

exports.deleteCollection = async (req, res) => {
  try {
    const collection = await BookmarkCollection.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.json({ message: "Collection deleted successfully" });
  } catch (err) {
    console.error("deleteCollection error:", err);
    res.status(500).json({ message: "Failed to delete collection" });
  }
};

exports.addArticleToCollection = async (req, res) => {
  try {
    const articleId = parseInt(req.body.articleId);
    if (!articleId) {
      return res.status(400).json({ message: "articleId is required" });
    }

    const collection = await BookmarkCollection.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { $addToSet: { articleIds: articleId } },
      { new: true }
    );

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.json(collection);
  } catch (err) {
    console.error("addArticleToCollection error:", err);
    res.status(500).json({ message: "Failed to add article to collection" });
  }
};

exports.removeArticleFromCollection = async (req, res) => {
  try {
    const articleId = parseInt(req.params.articleId);

    const collection = await BookmarkCollection.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.userId },
      { $pull: { articleIds: articleId } },
      { new: true }
    );

    if (!collection) {
      return res.status(404).json({ message: "Collection not found" });
    }

    res.json(collection);
  } catch (err) {
    console.error("removeArticleFromCollection error:", err);
    res
      .status(500)
      .json({ message: "Failed to remove article from collection" });
  }
};
