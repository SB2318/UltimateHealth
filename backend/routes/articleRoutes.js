const express = require('express');
const router = express.Router();
const articleController = require('../controllers/articleController');

/**** For Article Tags */
router.post('/articles/tags', articleController.addNewTag);
router.get('/articles/tags', articleController.getAllTags);
router.put('/articles/tags/:id', articleController.updateTagById);
router.delete('/articles/tags/:id', articleController.deleteArticleTagByIds);

module.exports = router;
