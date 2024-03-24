const express = require("express");
const {createSurvey, getSurvey, submitSurvey, getResults} = require("../controllers/surveyController");

const router = express.Router();

router.post("/", createSurvey);
router.get("/", getSurvey);

router.post("/submit", submitSurvey);
router.get("/results", getResults);

module.exports = router;
