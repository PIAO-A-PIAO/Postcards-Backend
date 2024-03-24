const DbLogic = require("./DbLogic.js");
const db = new DbLogic();

exports.getAllBeverages = async (req, res) => {
  try {
    const beverages = await db.getAllBeverages();
    return res.json(beverages);
  } catch (error) {
    console.error(error);
  }
}

// Adds beverage to a brand, a brand must exist before the beverage
exports.addBeverage = async (req, res) => {
  try {
    const brandData = await db.getBrands(req.body.brand);
    console.log(brandData);

    if (brandData.length === 0) return res.status(400).json({error: 'Failed to fetch JSON data. Brand does not exist!'});
    console.log('passed');

    let newBeverage = {
      name: req.body.name,
      category: req.body.category,
      description: req.body.description,
      imageLink: req.body.imageLink
    }

    return res.json(await db.addBeverage(req.body.brand, newBeverage));
  } catch (error) {
    console.error(error);
  }
}

exports.getBrands = async (req, res) => {
  try {
    const brands = await db.getBrands(req.body.brand);
    return res.json(brands);
  } catch (error) {
    console.error(error);
  }
}

exports.addBrand = async (req, res) => {
  try {

    let newBrand = {
      brand: req.body.brand
    }

    return res.json(await db.addBrand(newBrand));
  } catch (error) {
    console.error(error);
  }
}

exports.getBeveragesByBrand = async (req, res) => {
  try {
    // TODO: Implement
    // const beverages = await db.getBeveragesByBrand(req.body.brand);
    return res.json("beverages");
  } catch (error) {
    console.error(error);
  }
}
