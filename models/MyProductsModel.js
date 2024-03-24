const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MyProductsSchema = new Schema(
  {
    userId: {
      type: String,
      ref: "users",
    },
    catId: {
      type: String,
      ref: "rating-category",
    },
    contentId: String,
    contentName: String,
    backdrop_path: String, //Consistent with API return
    timestamp: Date,
  },
  {collection: 'myProducts'}
);

module.exports = MyProductsSchema;