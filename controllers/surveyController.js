const DbLogic = require("./DbLogic.js");
const db = new DbLogic();

exports.createSurvey = async (req, res) => {
  try {
    const id = generateID(1, 10);
    const passcode = generateID(2, 6);

    let newSurvey = {
      surveyId: id,
      questions: req.body.questions,
      passcode: passcode
    }
    return res.json(await db.createSurvey(newSurvey));
  } catch (error) {
    console.error(error);
    return res.status(400).json(error);
  }
}

exports.getSurvey = async (req, res) => {
  const id = req.query.s; //surveyId
  console.log(id);
  return res.json(await db.getSurvey(id));
}

exports.submitSurvey = async (req, res) => {

  let newResults = {
    surveyId: req.body.surveyId,
    questions: req.body.questions,
    timestamp: req.body.timestamp
  }
  return res.json(await db.submitSurvey(newResults));
}

exports.getResults = async (req, res) => {
  const id = req.query.surveyId;
  return res.json(await db.getSurveyResults(id));
}

function generateID(type, length) {
  let result = '';
  const characters = type === 1 ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' : '0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}
