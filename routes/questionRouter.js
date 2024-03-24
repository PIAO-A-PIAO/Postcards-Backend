const express = require("express");
const {
  getQuestionByCategory,
  addQuestion,
  updateQuestionByCategory,
  deleteQuestionByCategory
} = require("../controllers/questionController");

const router = express.Router();

router.post("/", addQuestion);
router.post("/get-question", getQuestionByCategory);
router.put("/update-question", updateQuestionByCategory);
router.post("/delete-question", deleteQuestionByCategory);

module.exports = router;