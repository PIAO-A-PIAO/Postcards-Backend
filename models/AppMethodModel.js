const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppMethodSchema = new Schema(
  {
    id: String,
    methodType: String,
  },
  {collection: 'AppMethod'}
);

module.exports = AppMethodSchema;
