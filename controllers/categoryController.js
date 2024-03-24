const DbLogic = require("./DbLogic.js");
const db = new DbLogic();

exports.addCategory = async (req, res) => {
  let title = req.body.title;
  let route = req.body.route;

  db.getAllCategory().then(function (categories) {
    // Find the highest category ID
    let highestId = 0;
    for (let i = 0; i < categories.length; i++) {
      if (categories[i].id > highestId) {
        highestId = categories[i].id;
      }
    }
    let newCategoryId = highestId + 1;

    let newCategory = {
      id: newCategoryId, title: title, route: route,
    };

    db.addCategory(newCategory).then(function (result) {
      res.send(result);
    });
  });
};

exports.updateCategory = async (req, res) => {
  let catId = req.body.catId;
  let title = req.body.title;
  let route = req.body.route;

  const category = {title: title, route: route};

  db.updateCategory(catId, category).then(function () {
    res.send({msg: "Category Updated Successfully", status: true});
  });
};

// Delete category
exports.deleteCategory = async (req, res) => {
  let catId = req.body.catId;
  try {
    const result = await db.deleteCategory(catId);
    if (result && result.deletedCount === 1) {
      res.send({msg: "Category Deleted Successfully", status: true});
    } else {
      res.send({msg: "Failed to delete category", status: false});
    }
  } catch (err) {
    console.error(err);
    res.send({msg: "An error occurred", status: false});
  }
};

exports.getCategoryById = async (req, res) => {
  let catId = req.body.catId;
  db.getCategoryById(catId).then(function (result) {
    res.send(result);
  });
};