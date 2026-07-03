const { HTTP_STATUS, ERROR_CODES } = require("../../constants/errorConstants");
const Article = require("../../models/Articles");
const { throwError } = require("../../utils/throwError");

const findArticleById = async (articleId) => {
    if (!Number.isSafeInteger(articleId) || articleId <= 0) {
    throwError(
      HTTP_STATUS.BAD_REQUEST,
      ERROR_CODES.INVALID_INPUT,
      "Article ID must be a positive integer within safe range"
    );
  }
  return Article.findById(Number(articleId)).lean();
}

const getArticleContributors = async (articleId) => {

  const article = await
    Article.findById(Number(articleId))
      .populate({
        path: "contributors",
        select: "user_id user_name followers Profile_image",
        match: {
          isBannedUser: false,
          isBlockUser: false
        }
      }).
      exec();

  if (!article || article.is_removed) {
    return null;
  }

  if (article.contributors) {
    article.contributors = article.contributors.filter(user => user !== null);
  }

  return article.contributors || [];
}

module.exports = {
  findArticleById,
  getArticleContributors
}