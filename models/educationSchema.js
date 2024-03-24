const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationSchema = new Schema({
  userId: {
    type: String,
    ref: "users",
  },
  catId: {
    type: String,
    ref: "rating-category",
  },
  resourceUrl: String,
  subject: String,
  level: String,
  semester: String,
  year: String,
  school: String,
  credibility: String,
  ratings: [],
  isRecommended: Boolean,
  comment: String,
  timestamp: Date,
  cost: String,
  applicationmethod: String,
  ISBN: String,
});

module.exports = EducationSchema;
