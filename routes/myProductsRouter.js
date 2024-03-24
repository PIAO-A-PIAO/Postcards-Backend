const express = require('express');
const {addProduct, getMyProductsByUserId} = require("../controllers/myProductsController");

const router = express.Router();

router.post("/", addProduct);
router.post("/getMyProductsByUserId", getMyProductsByUserId);

module.exports = router;