const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const glossarySchema = new Schema({
  term: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  synonyms: [{
    type: String,
    trim: true,
  }],
  shortDescription: {
    type: String,
    maxLength: 160,
  },
  definition: {
    type: String,
    required: true,
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'ArticleTag',
    default: [],
  }],
  relatedTerms: [{
    type: Schema.Types.ObjectId,
    ref: 'Glossary',
    default: [],
  }],
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  authorId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

// Indexes for fast lookup and search
glossarySchema.index({ slug: 1 });
glossarySchema.index({ term: 'text', synonyms: 'text', shortDescription: 'text' });
glossarySchema.index({ status: 1, term: 1 });
glossarySchema.index({ categories: 1 });

const Glossary = mongoose.model('Glossary', glossarySchema);

module.exports = Glossary;