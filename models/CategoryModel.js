const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    id: Number,
    title: String,
    route: String,
  },
  {collection: 'rating-category'}
);

module.exports = CategorySchema;