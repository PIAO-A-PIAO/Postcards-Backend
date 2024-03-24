const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SemesterYearSchema = new Schema(
  {
    id: String,
    year: String,
  },
  {collection: 'semester-year'}
);

module.exports = SemesterYearSchema;