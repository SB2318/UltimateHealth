const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/auth");
const collectionController = require("../controllers/collectionController");

router.use(authenticate);

router.post("/", collectionController.createCollection);
router.get("/", collectionController.getCollections);
router.get("/:id", collectionController.getCollection);
router.put("/:id", collectionController.updateCollection);
router.delete("/:id", collectionController.deleteCollection);
router.post("/:id/articles", collectionController.addArticleToCollection);
router.delete(
  "/:id/articles/:articleId",
  collectionController.removeArticleFromCollection
);

module.exports = router;
