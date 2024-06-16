const express = require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');

router.post('/articles', ArticleController.createArticle);
router.get('/articles', ArticleController.getArticles);
router.put('/articles/:id', ArticleController.updateArticle);
router.delete('/articles/:id', ArticleController.deleteArticle);

module.exports = router;
