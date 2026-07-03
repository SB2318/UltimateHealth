const expressAsyncHandler = require('express-async-handler');
const glossaryService = require('../services/glossaryService');
const { throwError } = require('../utils/throwError');

module.exports.createTerm = expressAsyncHandler(async (req, res) => {

  const authorId = req.user ? req.userId: req.body.authorId; 
  const data = { ...req.validateBody, authorId };
  
  const term = await glossaryService.createTerm(data);
  res.status(201).json({ message: 'Glossary term created successfully', term });
});

module.exports.getTerm = expressAsyncHandler(async (req, res) => {
  const { slug } = req.params;
  const term = await glossaryService.getTermBySlug(slug);
  
  if (!term) {
    throwError(404, 'NOT_FOUND', 'Glossary term not found');
  }
  
  res.status(200).json({ term });
});

module.exports.updateTerm = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const updateData = req.validateBody;
  
  const updatedTerm = await glossaryService.updateTerm(id, updateData);
  
  if (!updatedTerm) {
    throwError(404, 'NOT_FOUND', 'Glossary term not found');
  }
  
  res.status(200).json({ message: 'Glossary term updated successfully', term: updatedTerm });
});

module.exports.deleteTerm = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedTerm = await glossaryService.deleteTerm(id);
  
  if (!deletedTerm) {
    throwError(404, 'NOT_FOUND', 'Glossary term not found');
  }
  
  res.status(200).json({ message: 'Glossary term deleted successfully' });
});

module.exports.listTerms = expressAsyncHandler(async (req, res) => {
  const { page, limit, letter, category, status } = req.query;
  const result = await glossaryService.listTerms({ page, limit, letter, category, status });
  
  res.status(200).json(result);
});

module.exports.searchTerms = expressAsyncHandler(async (req, res) => {
  const { q, limit } = req.query;
  
  if (!q) {
    throwError(400, 'BAD_REQUEST', 'Search query is required');
  }
  
  const results = await glossaryService.searchTerms(q, limit);
  res.status(200).json({ results });
});