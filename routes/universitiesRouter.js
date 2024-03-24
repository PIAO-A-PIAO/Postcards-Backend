const {Router} = require('express');
const {getUniversities, searchUniversities} = require("../controllers/universitiesController");
const router = Router();

router.get('/', getUniversities);

router.post('/', searchUniversities);

module.exports = router;