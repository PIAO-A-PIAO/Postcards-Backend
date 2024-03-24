const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LevelSchema = new Schema(
  {
    id: String,
    descA: String,
    descB: String,
  },
  {collection: 'levels'}
);

module.exports = LevelSchema;