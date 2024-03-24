const express = require('express');
const {
  getAllBeverages,
  addBeverage,
  getBrands,
  addBrand,
  getBeveragesByBrand
} = require("../controllers/beverageController");
const router = express.Router();

router.get('/', getAllBeverages);
router.get('/get-brands', getBrands);
router.get('/get-beverages-by-brand', getBeveragesByBrand);

router.post('/add-beverage', addBeverage);
router.post('/add-brand', addBrand);

module.exports = router;