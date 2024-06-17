const express = require('express');
const router = express.Router();
const ArticleTagController = require('../controllers/ArticleTagController');

router.post('/articles/tags', ArticleTagController.addNewTag);
router.get('/articles/tags', ArticleTagController.getAllTags);
router.put('/articles/tags/:id', ArticleTagController.updateTagById);
router.delete('/articles/tags/:id', ArticleTagController.deleteArticleTagByIds);

module.exports = router;
