const express = require('express');
const glossaryController = require('../controllers/glossaryController');
const { validateBody } = require('../middleware/validator');
const { createGlossarySchema, updateGlossarySchema } = require('../validators/glossary.schema');
// Use the existing admin auth middleware
const adminAuthenticateToken = require('../middleware/adminAuthenticateToken');

const router = express.Router();

// Public Routes
router.get('/', glossaryController.listTerms);
router.get('/search', glossaryController.searchTerms);
router.get('/:slug', glossaryController.getTerm);

// Admin / Write Routes
router.use(adminAuthenticateToken); 
router.post('/', validateBody(createGlossarySchema), glossaryController.createTerm);
router.put('/:id', validateBody(updateGlossarySchema), glossaryController.updateTerm);
router.delete('/:id', glossaryController.deleteTerm);

module.exports = router;