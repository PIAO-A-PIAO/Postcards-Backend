const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const BeverageSchema = new Schema(
  {
    brand: String,
    products: [
      {
        name: String,
        category: String,
        description: String,
        imageLink: String
      }
    ]
  },
  {collection: 'beverages'}
);

module.exports = BeverageSchema;