const mongoose = require("mongoose")
const Schema = mongoose.Schema;

/*
 No identifying features here as this is anonymous
 */

const SurveyResultsSchema = new Schema(
  {
    surveyId: {
      type: String,
      ref: 'surveys'
    },
    questions: [],
    timestamp: Date,
  },
);

module.exports = SurveyResultsSchema