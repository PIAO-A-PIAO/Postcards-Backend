const mongoose = require("mongoose")
const Schema = mongoose.Schema;

/**
 * Questions will contain an array of objects, title, description, and type
 *
 * Type 1 - Likert
 * Type 2 - Boolean
 * example: {title: "Q1", desc: "desc for q1", type: 1}
 */

const SurveySchema = new Schema(
  {
    surveyId: String,
    questions: [],
    passcode: String,
  }
);

module.exports = SurveySchema;