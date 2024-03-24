const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const EntertainmentSchema = new Schema(
  {
    userId: {
      type: String,
      ref: 'users'
    },
    catId: {
      type: String,
      ref: 'rating-category'
    },
    contentId: String,
    contentName: String,
    platform: String,
    backdrop_path: String,
    ratings: [],
    isRecommended: Boolean,
    timestamp: Date,
  },
);

module.exports = EntertainmentSchema;