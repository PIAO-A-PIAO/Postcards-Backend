const express = require("express");
const {addCategory, updateCategory, deleteCategory, getCategoryById} = require("../controllers/categoryController");

const router = express.Router();

router.post("/", addCategory);
router.post("/get-by-id", getCategoryById);
router.put("/update-category", updateCategory);
router.post("/delete-category", deleteCategory);

module.exports = router;