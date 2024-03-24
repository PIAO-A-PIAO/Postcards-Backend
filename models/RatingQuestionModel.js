const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RatingQuestionSchema = new Schema({
  id: Number,
  cat_id: String,
  question: String,
  description: String,
});

module.exports = RatingQuestionSchema;
