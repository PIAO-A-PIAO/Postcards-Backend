const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SubjectSchema = new Schema(
  {
    id: String,
    code: String,
    description: String,
  },
  {collection: 'subject'}
);

module.exports = SubjectSchema;