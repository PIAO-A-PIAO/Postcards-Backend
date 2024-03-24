const DbLogic = require("./DbLogic.js");
const Category = require("../util/Category");
const {submitRating} = require("./ratingsController");
const db = new DbLogic();

exports.addEntertainmentRating = async (req, res) => {
  try {
    const userId = req.body.userId;
    const entertainmentRatingsData = {
      userId: userId,
      catId: req.body.catId,
      contentId: req.body.contentId,
      contentName: req.body.contentName,
      platform: req.body.platform,
      backdrop_path: req.body.backdrop_path, //naming is how we digest from API
      ratings: req.body.ratings,
      isRecommended: req.body.isRecommended,
      timestamp: req.body.timestamp,
    }

    await db.updateLastActivity(userId);
    await db.updateRatingCount(userId);

    return res.json(await submitRating(req.body.catId, entertainmentRatingsData));
  } catch (error) {
    console.error(error);
  }
}

exports.getContentRatingsById = async (req, res) => {
  const contentId = req.body.contentId;
  const catId = req.body.catId;
  try {
    switch (catId) {
      case Category.MOVIE:
        return res.json(await db.getMovieRatingsById(contentId));
      case Category.TV:
        return res.json(await db.getTVRatingsById(contentId));
      case Category.GAME:
        return await res.json(await db.getGameRatingsById(contentId));
    }
  } catch (error) {
    console.error(error);
  }
}

exports.getContentRatingsByUser = async (req, res) => {
  const userId = req.body.userId;
  const contentId = req.body.contentId;
  const catId = req.body.catId;
  try {
    switch (catId) {
      case Category.MOVIE:
        return res.json(await db.getDidTheyReviewMovie(contentId, userId));
      case Category.TV:
        return res.json(await db.getDidTheyReviewTV(contentId, userId));
      case Category.GAME:
        return res.json(await db.getDidTheyReviewGame(contentId, userId));
    }
  } catch (error) {
    console.error(error);
  }
}

exports.getLatestRatingOfContentForUser = async (req, res) => {
  const userId = req.body.userId;
  const contentId = req.body.contentId;
  const catId = req.body.catId;
  try {
    switch (catId) {
      case Category.MOVIE:
        return res.json(await db.getLatestMovieRatingForUser(contentId, userId));
      case Category.TV:
        return res.json(await db.getLatestTVShowRatingForUser(contentId, userId));
      case Category.GAME:
        return res.json(await db.getLatestGameRatingForUser(contentId, userId));
    }
  } catch (error) {
    console.error(error);
  }
}