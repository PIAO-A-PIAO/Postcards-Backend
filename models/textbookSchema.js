const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TextbookSchema = new Schema(
  {
    ISBN_13: String,
    title: String,
    authors: [String], //array
    description: String,
    publisher: String,
    publishedDate: Date,
    categories: [String], //array
    language: String,
    thumbnail: String,
  },
  {collection: "textbook"}
);

module.exports = TextbookSchema