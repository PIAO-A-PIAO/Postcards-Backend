const DbLogic = require("./DbLogic.js");
const db = new DbLogic();

exports.addProduct = async (req, res) => {

  const newProductData = {
    userId: req.body.userId,
    catId: req.body.catId,
    contentId: req.body.contentId,
    contentName: req.body.contentName,
    backdrop_path: req.body.backdrop_path,
    timestamp: req.body.timestamp,
  };
  return res.json(await db.addProduct(newProductData));
};

exports.getMyProductsByUserId = async (req, res) => {
  try {
    const userId = req.body.userId;
    const products = await db.getMyProductsByUserId(userId);
    return res.json(products);
  } catch (error) {
    console.error("Error in getMyProductsByUserId controller function: ", error);
    return res.status(500).json({error: "Internal server error"});
  }
};
