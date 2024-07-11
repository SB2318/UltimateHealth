const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');
const authenticateToken = require('../middleware/authentcatetoken');

/**** For Article Tags */
router.post('/articles/tags', articleController.addNewTag);
router.get('/articles/tags', articleController.getAllTags);
router.put('/articles/tags/:id', articleController.updateTagById);
router.delete('/articles/tags/:id', articleController.deleteArticleTagByIds);



/**** For Article *****/
router.post('/articles',authenticateToken, articleController.createArticle); // Create a new article
router.get('/articles',authenticateToken, articleController.getAllArticles);// Get all articles
router.get('/articles/:id',authenticateToken, articleController.getArticleById);// Get an article by ID
router.put('/articles/:id',authenticateToken, articleController.updateArticle);// Update an article by ID
router.delete('/articles/:id',authenticateToken, articleController.deleteArticle);// Delete an article by ID
router.get('/articles/:title',authenticateToken, articleController.getArticleByTitle);// get article by title
router.get('/articles/:name',authenticateToken, articleController.getArticleByName);// / get an article by name

module.exports = router;
