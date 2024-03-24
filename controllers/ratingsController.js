const DbLogic = require("./DbLogic.js");
const Category = require("../util/Category");
const db = new DbLogic();

/**
 * @description -
 * Util use for generalized rating queries,
 * specific queries go in respective controllers to prevent clutter.
 */

exports.submitRating = async (catId, ratingData) => {
  switch (catId) {
    case Category.MOVIE:
      console.log(ratingData);
      return await db.rateMovie(ratingData);
    case Category.TV:
      return await db.rateTVShow(ratingData);
    case Category.GAME:
      return await db.rateGame(ratingData);
    case Category.TEXTBOOK:
      return await db.rateTextbook(ratingData);
    case Category.SCHOOL:
      return await db.rateSchool(ratingData);
    case Category.CLASS:
      return await db.rateClass(ratingData);
    case Category.ONLINE_LEARNING:
      return await db.rateOnlineLearning(ratingData);
    case Category.ONLINE_RESOURCE:
      return await db.rateOnlineResources(ratingData);
    case Category.ARTICLE:
      return await db.rateArticle(ratingData);
    case Category.POLITICAL_POLICY:
      // TODO: Add when page is added
      // return res.json(await db.ratePoliticalPolicy(ratingData));
      return;
    case Category.MISDISINFO:
      return await db.rateMisDisInformation(ratingData);
    case Category.JOB_PROSPECT:
      return await db.rateJobProspect(ratingData);
    case Category.APPLICATION_PROCESS:
      return await db.rateAppProcess(ratingData);
    case Category.MENTAL_HEALTH:
      return await db.rateMentalHealth(ratingData);
  }
}

exports.getUserLatestRating = async (req, res) => {
  try {
    const userId = req.body.userId;
    const catId = req.body.catId;

    switch (catId) {
      case Category.MOVIE:
        // TODO: Implement later for general latest
        // return res.json(await db.getMovieRatingsByCatId(userId));
        return;
      case Category.TV:
        // TODO: Implement later for general latest
        // return res.json(await db.getTVRatingsByCatId(userId));
        return;
      case Category.GAME:
        // TODO: Implement later for general latest
        // return res.json(await db.getVideoGameRatingsByCatId(userId));
        return;
      case Category.TEXTBOOK:
        return res.json(await db.getLatestTextbookRating(userId));
      case Category.SCHOOL:
        return res.json(await db.getLatestSchoolRating(userId));
      case Category.CLASS:
        return res.json(await db.getLatestClassRating(userId));
      case Category.ONLINE_LEARNING:
        return res.json(await db.getLatestOnlineLearningRating(userId));
      case Category.ONLINE_RESOURCE:
        return res.json(await db.getLatestOnlineResourcesRating(userId));
      case Category.ARTICLE:
        return res.json(await db.getLatestArticleRating(userId));
      case Category.POLITICAL_POLICY:
        // TODO: Add when page is added
        // return res.json(await db.getLatestPoliticalPolicyRating(userId));
        return;
      case Category.MISDISINFO:
        return res.json(await db.getLatestMisDisInformationRating(userId));
      case Category.JOB_PROSPECT:
        return res.json(await db.getLatestJobProspectRating(userId));
      case Category.APPLICATION_PROCESS:
        return res.json(await db.getLatestAppProcessRating(userId));
      case Category.MENTAL_HEALTH:
        return res.json(await db.getLatestMentalHealthRating(userId));
    }
  } catch (error) {
    console.error(error);
  }
}

exports.getAllRating = async (req, res) => {
  try {
    const catId = req.body.catId;

    switch (catId) {
      case Category.MOVIE:
        return res.json(await db.getMovieRatingsByCatId());
      case Category.TV:
        return res.json(await db.getTVRatingsByCatId());
      case Category.GAME:
        return res.json(await db.getVideoGameRatingsByCatId());
      case Category.TEXTBOOK:
        return res.json(await db.getTextbookRatingsByCatId());
      case Category.SCHOOL:
        return res.json(await db.getSchoolRatingsByCatId());
      case Category.CLASS:
        return res.json(await db.getClassRatingsByCatId());
      case Category.ONLINE_LEARNING:
        return res.json(await db.getOnlineLearningRatingsByCatId());
      case Category.ONLINE_RESOURCE:
        return res.json(await db.getOnlineResourcesRatingsByCatId());
      case Category.ARTICLE:
        return res.json(await db.getArticleRatingsByCatId());
      case Category.POLITICAL_POLICY:
        return res.json(await db.getPoliticalPolicyRatingsByCatId());
      case Category.MISDISINFO:
        return res.json(await db.getMisDisInformationRatingsByCatId());
      case Category.JOB_PROSPECT:
        return res.json(await db.getJobProspectRatingsByCatId());
      case Category.APPLICATION_PROCESS:
        return res.json(await db.getAppProcessRatingsByCatId());
      case Category.MENTAL_HEALTH:
        return res.json(await db.getMentalHealthRatingsByCatId());
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * @deprecated - Removing master collection
 *
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.getMasterRating = async (req, res) => {
  try {
    const catId = req.body.catId;
    return res.json(await db.getRatingsByCatId(catId));
  } catch (error) {
    console.error(error)
  }
}
