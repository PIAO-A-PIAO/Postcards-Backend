const DbLogic = require("./DbLogic.js");
const Category = require("../util/Category");
const {submitRating} = require("./ratingsController");
const db = new DbLogic();

exports.addEducationRating = async (req, res) => {
  try {
    const userId = req.body.userId;
    const educationRatingData = {
      userId: userId,
      catId: req.body.catId,
      resourceUrl: req.body.resourceUrl,
      year: req.body.year,
      subject: req.body.subject,
      semester: req.body.semester,
      level: req.body.level,
      school: req.body.school,
      credibility: req.body.credibility,
      ratings: req.body.ratings,
      cost: req.body.cost,
      applicationmethod: req.body.applicationmethod,
      isRecommended: req.body.isRecommended,
      ISBN: req.body.ISBN,
    };

    await db.updateLastActivity(userId);
    await db.updateRatingCount(userId);

    return res.json(await submitRating(req.body.catId, educationRatingData));
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

exports.getRatingsByURL = async (req, res) => {
  const resourceUrl = req.body.resourceUrl;
  const catId = req.body.catId;
  try {
    switch (catId) {
      case Category.ARTICLE:
        return res.json(await db.getArticleRatingsByURL(resourceUrl));
      case Category.MISDISINFO:
        return res.json(await db.getMisDisInformationRatingsByURL(resourceUrl));
      case Category.ONLINE_RESOURCE:
        return res.json(await db.getOnlineResourceRatingsByURL(resourceUrl));
      case Category.POLITICAL_POLICY:
        return res.json(await db.getPoliticalPolicyRatingsByURL(resourceUrl));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

exports.getRatingsBySchool = async (req, res) => {
  const school = req.body.school;
  const catId = req.body.catId;
  try {
    switch (catId) {
      case Category.APPLICATION_PROCESS:
        return res.json(await db.getAppProcessRatingsBySchool(school));
      case Category.JOB_PROSPECT:
        return res.json(await db.getJobProspectRatingsBySchool(school));
      case Category.ONLINE_LEARNING:
        return res.json(await db.getOnlineLearningRatingsBySchool(school));
      case Category.SCHOOL:
        return res.json(await db.getSchoolRatingsBySchool(school));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

exports.getRatingsBySchoolAndSubject = async (req, res) => {
  const school = req.body.school;
  const subject = req.body.subject;
  const catId = req.body.catId;
  try {
    switch (catId) {
      case Category.CLASS:
        return res.json(await db.getClassRatingsBySchoolAndSubject(school, subject));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

exports.getRatingsBySchoolAndYear = async (req, res) => {
  const school = req.body.school;
  const year = req.body.year;
  const catId = req.body.catId;
  try {
    switch (catId) {
      case Category.MENTAL_HEALTH:
        return res.json(await db.getMentalHealthRatingsBySchoolAndYear(school, year));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

exports.getRatingsByISBN = async (req, res) => {
  const resourceISBN = req.body.resourceISBN;
  const catId = req.body.catId;
  try {
    switch (catId) {
      case Category.TEXTBOOK:
        return res.json(await db.getTextbookRatingsByISBN(resourceISBN));
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

// TODO Revisit: Idea for this was we can filter links by their credibility and determine how accurate a certain link is, this is not possible if we are never taking in Information reviews
/**
 * Compares link to database, calculates how credible a link is.
 *
 * @param req - Resource URL is the URL you want to check, Credibility is 'misinformation'/'disinformation' or 'information'
 * @param res
 * @returns {Promise<void>} - Percentage
 */
exports.getCredibilityOfURL = async (req, res) => {
  try {
    const {resourceUrl, credibility} = req.body;
    const ratings = await db.getMisDisInformationRatingsByURL(resourceUrl);

    let filteredRatings = ratings;

    if (credibility) {
      filteredRatings = ratings.filter((cred) => cred["credibility"].toLowerCase() === credibility.toLowerCase());
    }

    const count = filteredRatings.length;

    let percent = count / Object.keys(ratings).length;

    percent = Math.round(percent * 100);

    return res.json(percent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};
