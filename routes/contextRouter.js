const express = require("express");
const {
  getAllSubject, getAllSemesterYear, getAllSemester, getAllResource, getAllCategory,
  getAllAppMethod, getAllRatingQuestions, getAllLevel
} = require("../controllers/contextController");

const router = express.Router();

router.get("/get-all-subject", getAllSubject);
router.get("/get-all-level", getAllLevel);
router.get("/get-all-semester-year", getAllSemesterYear);
router.get("/get-all-semester", getAllSemester);
router.get("/get-all-resource", getAllResource);
router.get("/get-all-category", getAllCategory);
router.get("/get-all-app-method", getAllAppMethod);

router.post("/get-all-rating-questions", getAllRatingQuestions);

module.exports = router;