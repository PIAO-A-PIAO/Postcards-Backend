const express = require('express');
const {searchTextbookByISBN} = require("../controllers/textbookController");
const router = express.Router();

router.post('/search-textbook', searchTextbookByISBN);

module.exports = router;