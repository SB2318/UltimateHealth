const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

/**** For Article Tags */
router.post('/articles/tags', articleController.addNewTag);
router.get('/articles/tags', articleController.getAllTags);
router.put('/articles/tags/:id', articleController.updateTagById);
router.delete('/articles/tags/:id', articleController.deleteArticleTagByIds);


/**** For Article *****/
router.post('/articles', articleController.createArticle); // Create a new article
router.get('/articles', articleController.getAllArticles);// Get all articles
router.get('/articles/:id', articleController.getArticleById);// Get an article by ID
router.put('/articles/:id', articleController.updateArticle);// Update an article by ID
router.delete('/articles/:id', articleController.deleteArticle);// Delete an article by ID

module.exports = router;
