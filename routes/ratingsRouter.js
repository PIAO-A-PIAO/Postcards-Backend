const express = require("express");
const {
  getUserLatestRating, getAllRating, getMasterRating
} = require("../controllers/ratingsController");
const router = express.Router();

/**
 * @description - Util use for generalized rating queries, specific queries go in respective controllers to prevent clutter.
 */

router.post("/get-user-latest-rating-for-category", getUserLatestRating);
router.post("/get-all-rating-for-category", getAllRating);
router.post("/get-master-rating-for-category", getMasterRating);

module.exports = router;
