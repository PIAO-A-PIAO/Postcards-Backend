const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MasterModelSchema = new Schema(
  {
    userId: {
      type: String,
      ref: "users",
    },
    catId: {
      type: String,
      ref: "rating-category",
    },
    context: [],
    ratings: [],
  },
  {collection: "RatingsMaster"}
);

module.exports = MasterModelSchema;
