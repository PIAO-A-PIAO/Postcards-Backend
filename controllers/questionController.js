const DbLogic = require("./DbLogic.js");
const db = new DbLogic();

//Add new question
exports.addQuestion = async (req, res) => {
  let catId = req.body.catId;

  let questionId;
  let highestId = 0;

  await db.getAllRatingQuestions(catId).then(function (questions) {

    for (let questionsKey in questions) {
      if (questionsKey >= highestId) highestId = questionsKey;
    }
  })

  highestId === 0 ? questionId = 0 : questionId = ++highestId
  let newQuestion = {
    id: questionId,
    cat_id: catId,
    question: req.body.question,
    description: req.body.description,
  };
  db.addQuestion(newQuestion).then(function (result) {
    res.send(result);
  });
};


exports.getQuestionByCategory = async (req, res) => {
  let catId = req.body.catId;
  let questionId = req.body["questionId"];
  db.getQuestionByCategory(questionId, catId).then(function (result) {
    res.send(result);
  });
};

exports.updateQuestionByCategory = async (req, res) => {
  let catId = req.body.catId;
  let questionId = req.body["questionId"];
  let description = req.body.description;
  const question = {question: req.body.question};
  db.updateQuestionByCategory(questionId, catId, question, description).then(
    function () {
      res.send({msg: "Question Updated Successfully", status: true});
    }
  );
};

// Delete Question By Category ID
exports.deleteQuestionByCategory = async (req, res) => {
  let catId = req.body.catId;
  let questionId = req.body["questionId"];

  try {
    const result = await db.deleteQuestionByCategory(catId, questionId);
    if (result && result.deletedCount === 1) {
      res.send({msg: "Question Deleted Successfully", status: true});
    } else {
      res.send({msg: "Failed to delete question", status: false});
    }
  } catch (err) {
    console.error(err);
    res.send({msg: "An error occurred", status: false});
  }
};
