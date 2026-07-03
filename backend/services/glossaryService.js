const Glossary = require('../models/Glossary');

class GlossaryService {
  async createTerm(data) {
    const term = new Glossary(data);
    return await term.save();
  }

  async getTermBySlug(slug) {
    return await Glossary.findOne({ slug })
      .populate('categories', 'name slug')
      .populate('relatedTerms', 'term slug shortDescription')
      .populate('authorId', 'username name');
  }

  async updateTerm(id, updateData) {
    return await Glossary.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteTerm(id) {
    return await Glossary.findByIdAndDelete(id);
  }

  async listTerms({ page = 1, limit = 20, letter, category, status }) {
    const query = {};
    
    if (status) {
      query.status = status;
    } else {
      query.status = 'published'; // Default public view
    }

    if (letter) {
      query.term = { $regex: new RegExp(`^${letter}`, 'i') };
    }

    if (category) {
      query.categories = category; // ObjectId expected
    }

    const skip = (page - 1) * limit;

    const terms = await Glossary.find(query)
      .select('term slug shortDescription categories status')
      .populate('categories', 'name slug')
      .sort({ term: 1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Glossary.countDocuments(query);

    return {
      data: terms,
      meta: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit)
      }
    };
  }

  async searchTerms(searchQuery, limit = 10) {
    return await Glossary.find(
      { 
        $text: { $search: searchQuery },
        status: 'published' 
      },
      { score: { $meta: 'textScore' } }
    )
    .sort({ score: { $meta: 'textScore' } })
    .limit(Number(limit))
    .select('term slug shortDescription');
  }
}

module.exports = new GlossaryService();