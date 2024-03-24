const DbLogic = require("./DbLogic.js");
const db = new DbLogic();

/**
 * @deprecated - scheduled for removal BETA
 *
 * @param req
 * @param res
 */
const rateMaster = (req, res) => {
  const userId = req.body.userId;
  const catId = req.body.catId;
  const context = req.body.context;
  const ratings = req.body.ratings;

  const masterRatingData = {
    userId: userId,
    catId: catId,
    context: context,
    ratings: ratings,
  };

  db.rateMaster(masterRatingData).then(function (result) {
    res.send(result);
  });
};

/**
 * @deprecated
 *
 * @param req
 * @param res
 */
const getRatingsByCatId = (req, res) => {
  const catId = req.params.catId;
  db.getRatingsByCatId(catId).then(function (result) {
    res.send(result);
  });
};

const getRatingsByUserIdForCat = (req, res) => {
  const userId = req.params.userId;
  const catId = req.params.catId;
  db.getUserRatingsForCategory(userId, catId).then(function (result) {
    res.send(result);
  })
};

module.exports = {
  rateMaster,
  getRatingsByCatId,
  getRatingsByUserIdForCat,
};
