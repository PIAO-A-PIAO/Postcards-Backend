const DbLogic = require("./DbLogic.js");
const db = new DbLogic();

exports.getAllSubject = async (req, res) => {
  try {
    return res.json(await db.getAllSubject());
  } catch (error) {
    console.error(error);
  }
}

exports.getAllLevel = async (req, res) => {
  try {
    return res.json(await db.getAllLevel());
  } catch (error) {
    console.error(error);
  }
}

exports.getAllSemesterYear = async (req, res) => {
  try {
    return res.json(await db.getAllSemesterYear());
  } catch (error) {
    console.error(error);
  }
}

exports.getAllSemester = async (req, res) => {
  try {
    return res.json(await db.getAllSemester());
  } catch (error) {
    console.error(error);
  }
}

exports.getAllResource = async (req, res) => {
  try {
    return res.json(await db.getAllResource());
  } catch (error) {
    console.error(error);
  }
}

exports.getAllCategory = async (req, res) => {
  try {
    return res.json(await db.getAllCategory());
  } catch (error) {
    console.error(error);
  }
}

exports.getAllAppMethod = async (req, res) => {
  try {
    return res.json(await db.getAllAppMethod());
  } catch (error) {
    console.error(error);
  }
}

exports.getAllRatingQuestions = async (req, res) => {
  try {
    const catId = req.body.catId;
    return res.json(await db.getAllRatingQuestions(catId));
  } catch (error) {
    console.error(error)
  }
}