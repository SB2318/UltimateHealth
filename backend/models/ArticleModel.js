const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
