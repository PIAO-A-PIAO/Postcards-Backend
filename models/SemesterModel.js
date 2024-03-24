const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SemesterSchema = new Schema(
  {
    id: String,
    semesterName: String,
  },
  {collection: 'semester'}
);

module.exports = SemesterSchema;