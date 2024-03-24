const express = require("express");
const {
  addEducationRating, getRatingsByURL, getRatingsBySchool, getRatingsBySchoolAndSubject, getRatingsBySchoolAndYear,
  getRatingsByISBN
} = require("../controllers/educationController");
const router = express.Router();

router.post("/", addEducationRating);

router.post("/get-ratings-by-url", getRatingsByURL);
router.post("/get-ratings-by-school", getRatingsBySchool);
router.post("/get-ratings-by-school-subject", getRatingsBySchoolAndSubject);
router.post("/get-ratings-by-school-year", getRatingsBySchoolAndYear)
router.post("/get-ratings-by-isbn", getRatingsByISBN);


module.exports = router;