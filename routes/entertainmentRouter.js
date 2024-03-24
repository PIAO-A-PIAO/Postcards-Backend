const express = require("express");

const router = express.Router();

const {
  getContentRatingsById,
  getContentRatingsByUser,
  getLatestRatingOfContentForUser, addEntertainmentRating
} = require("../controllers/entertainmentController");

router.post("/", addEntertainmentRating);
router.post("/get-ratings-by-id", getContentRatingsById);
router.post("/get-ratings-by-user", getContentRatingsByUser);
router.post("/get-latest-rating-for-user", getLatestRatingOfContentForUser);

module.exports = router;