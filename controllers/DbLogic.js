const {createConnection} = require("mongoose");
const UserRegisterTokenSchema = require("../models/UserRegisterTokenModel");
const UserSchema = require("../models/UserModel");
const SubjectSchema = require("../models/SubjectModel");
const LevelSchema = require("../models/LevelModel");
const SemesterYearSchema = require("../models/SemesterYearModel");
const SemesterSchema = require("../models/SemesterModel");
const ResourceSchema = require("../models/ResourceModel");
const CategorySchema = require("../models/CategoryModel");
const RatingQuestionSchema = require("../models/RatingQuestionModel");
const MasterRatingSchema = require("../models/RatingModelMaster");
const AppMethodSchema = require("../models/AppMethodModel");
const MyProductsSchema = require("../models/MyProductsModel");
const BeveragesSchema = require("../models/beverageSchema");
const TextbookSchema = require("../models/textbookSchema");
const EducationSchema = require("../models/educationSchema");
const EntertainmentSchema = require("../models/entertainmentSchema");
const SurveySchema = require("../models/surveySchema");
const SurveyResultsSchema = require("../models/surveyResultsSchema");

let User,
  UserRegistrationToken,
  Subject,
  Level,
  SemesterYear,
  Semester,
  Resource,
  Category,
  AppMethod,
  RatingQuestion,
  RatingMaster = "",
  RatingMovie = "",
  RatingTVShow = "",
  RatingGame = "",
  RatingTextbook = "",
  RatingArticle = "",
  RatingMisDisInformation = "",
  RatingPoliticalPolicy = "",
  RatingJobProspect = "",
  RatingSchool = "",
  RatingOnlineLearning = "",
  RatingClass = "",
  RatingAppProcess = "",
  RatingOnlineResources = "",
  RatingMentalHealth = "",
  MyProducts,
  Beverages,
  Textbook,
  Survey,
  SurveyResults;

module.exports = class DbLogic {
  initialize(conn) {
    let databaseConnection = createConnection(conn);
    User = databaseConnection.model("users", UserSchema);
    UserRegistrationToken = databaseConnection.model("user-register-token", UserRegisterTokenSchema);
    Subject = databaseConnection.model("subject", SubjectSchema);
    Level = databaseConnection.model("levels", LevelSchema);
    SemesterYear = databaseConnection.model("semester-year", SemesterYearSchema);
    Semester = databaseConnection.model("semester", SemesterSchema);
    AppMethod = databaseConnection.model("AppMethod", AppMethodSchema);
    Resource = databaseConnection.model("resource", ResourceSchema);
    Category = databaseConnection.model("rating-category", CategorySchema);
    RatingQuestion = databaseConnection.model("rating-questions", RatingQuestionSchema);
    // checking which Rating to save, need some way to input

    RatingMaster = databaseConnection.model("ratingsMaster", MasterRatingSchema);
    RatingMovie = databaseConnection.model("Movie Ratings", EntertainmentSchema, "ratingsMovie");
    RatingTVShow = databaseConnection.model("TV Show Ratings", EntertainmentSchema, "ratingsTVShow");
    RatingTextbook = databaseConnection.model("ratingsTextbook", EducationSchema, "ratingsTextbook");
    RatingArticle = databaseConnection.model("ratingArticle", EducationSchema, "ratingsArticle");
    RatingMisDisInformation = databaseConnection.model("ratingMisDisInformation", EducationSchema, "ratingsMisDisInformation");
    RatingPoliticalPolicy = databaseConnection.model("ratingPoliticalPolicy", EducationSchema, "ratingsPoliticalPolicy");
    RatingJobProspect = databaseConnection.model("ratingJobProspect", EducationSchema, "ratingsJobProspect");
    RatingGame = databaseConnection.model("ratingGame", EntertainmentSchema, "ratingsGame");
    RatingMentalHealth = databaseConnection.model("ratingMentalHealth", EducationSchema, "ratingsMentalHealth");

    RatingSchool = databaseConnection.model("ratingSchool", EducationSchema, "ratingsSchool");
    RatingOnlineLearning = databaseConnection.model("ratingOnlineLearning", EducationSchema, "ratingsOnlineLearning");
    RatingOnlineResources = databaseConnection.model("ratingOnlineResources", EducationSchema, "ratingsOnlineResources");

    RatingClass = databaseConnection.model("ratingClass", EducationSchema, "ratingsClass");

    RatingAppProcess = databaseConnection.model("ratingAppProcess", EducationSchema, "ratingsAppProcess");

    MyProducts = databaseConnection.model("myProducts", MyProductsSchema);

    Beverages = databaseConnection.model("beverages", BeveragesSchema);

    Textbook = databaseConnection.model("textbook", TextbookSchema);

    Survey = databaseConnection.model("Survey", SurveySchema, "surveys");
    SurveyResults = databaseConnection.model("Survey Results", SurveyResultsSchema, "surveyResults");

    return databaseConnection.readyState;
  }

  // Get User Token Model
  getUserRegistrationTokenModel() {
    return UserRegistrationToken;
  }

  getUserModel() {
    return User;
  }

  //Store User registration verification link token in db collection - user-register-token
  async storeVerificationToken(tokenData) {
    let newToken = new UserRegistrationToken(tokenData);
    let storeToken = await newToken.save();
    return !!storeToken;
  }

  async verifyToken(urlToken) {
    let getUserTokenData = await UserRegistrationToken.findOne({
      token: urlToken,
    })
      .lean()
      .exec();
    if (getUserTokenData == null) {
      console.log("Verification Link is invalid, please try again!");
      return null;
    } else {
      let removeToken = await UserRegistrationToken.deleteOne({
        _id: getUserTokenData._id,
      }).exec();
      if (removeToken.deletedCount > 0) {
        return getUserTokenData.data;
      } else {
        console.log("Some error occurred while removing verification token!");
        return null;
      }
    }
  }

  async addUser(userData) {
    let validateUser = await this.findUser(userData.email);
    if (validateUser == null) {
      let newUser = new User(userData);
      await newUser.save();
      return true;
    } else {
      return false;
    }
  }

  async findUser(userEmail) {
    return await User.findOne({email: userEmail}).exec();
  }

  async getAllUser() {
    return await User.find({}).lean().exec();
  }

  async getAllSubject() {
    return await Subject.find({}).sort({code: 1}).lean().exec();
  }

  async getAllLevel() {
    return await Level.find({}).lean().exec();
  }

  async getAllAppMethod() {
    return await AppMethod.find({}).lean().exec();
  }

  async getAllSemesterYear() {
    return await SemesterYear.find({}).lean().exec();
  }

  async getAllSemester() {
    return await Semester.find({}).lean().exec();
  }

  async getAllResource() {
    return await Resource.find({}).lean().exec();
  }

  async getUserById(id) {
    return await User.findOne({_id: id}).lean().exec();
  }

  async getAllCategory() {
    return await Category.find({}).sort({title: 1}).lean().exec();
  }

  async getAllRatingQuestions(cat_id) {
    return await RatingQuestion.find({cat_id: cat_id}).lean().exec();
  }

  async deleteUser(id) {
    return await User.deleteOne({_id: id}).exec();
  }

  //Rate
  async rateMaster(RatingData) {
    let Rating = new RatingMaster(RatingData);
    await Rating.save();
    return true;
  }

  async rateMovie(movieRatingData) {
    let movieRating = new RatingMovie(movieRatingData);

    await movieRating
      .save()
      .then((savedItem) => {
        console.log("Item saved: ", savedItem);
      })
      .catch((error) => {
        console.error("Error saving item: ", error);
      });
    return true;
  }

  async rateTextbook(textbookRatingData) {
    let textbookRating = new RatingTextbook(textbookRatingData);
    await textbookRating.save();
    return true;
  }

  async rateArticle(articleRatingData) {
    let articleRating = new RatingArticle(articleRatingData);
    await articleRating.save();
    return true;
  }

  async rateMisDisInformation(articleRatingData) {
    let articleRating = new RatingMisDisInformation(articleRatingData);
    await articleRating.save();
    return true;
  }

  async ratePoliticalPolicy(politicalPolicyRatingData) {
    let politicalPolicyRating = new RatingPoliticalPolicy(politicalPolicyRatingData);
    await politicalPolicyRating.save();
    return true;
  }

  async rateJobProspect(jobProspectRatingData) {
    let jobProspectRating = new RatingJobProspect(jobProspectRatingData);
    await jobProspectRating.save();
    return true;
  }

  async rateSchool(schoolRatingData) {
    let schoolRating = new RatingSchool(schoolRatingData);
    await schoolRating.save();
    return true;
  }

  async rateClass(classRatingData) {
    let classRating = new RatingClass(classRatingData);
    await classRating.save();
    return true;
  }

  async rateOnlineLearning(onlineLearningData) {
    let onlineLearningRating = new RatingOnlineLearning(onlineLearningData);
    await onlineLearningRating.save();
    return true;
  }

  //Rate Application Process
  async rateAppProcess(AppProcessRatingData) {
    let AppProcessRating = new RatingAppProcess(AppProcessRatingData);
    await AppProcessRating.save();
    return true;
  }

  async rateOnlineResources(onlineResourceData) {
    let onlineResourceRating = new RatingOnlineResources(onlineResourceData);
    await onlineResourceRating.save();
    return true;
  }

  async rateMentalHealth(mentalHealthData) {
    let mentalHealthRating = new RatingMentalHealth(mentalHealthData);
    await mentalHealthRating.save();
    return true;
  }

  //Rate Games
  async rateGame(rateGameData) {
    let rateGame = new RatingGame(rateGameData);
    await rateGame
      .save()
      .then((savedItem) => {
        console.log("Item saved: ", savedItem);
      })
      .catch((error) => {
        console.log("Error saving item: ", error);
      });
    return true;
  }

  //Rate TV Shows
  async rateTVShow(rateTVShowData) {
    let rateTVShow = new RatingTVShow(rateTVShowData);
    await rateTVShow
      .save()
      .then((savedItem) => {
        console.log("Item saved: ", savedItem);
      })
      .catch((error) => {
        console.log("Error saving item: ", error);
      });
    return true;
  }

  //Fetch Ratings
  async getMovieRatingsById(contentId) {
    return await RatingMovie.find({contentId: contentId}).lean().exec();
  }

  async getTVRatingsById(contentId) {
    return await RatingTVShow.find({contentId: contentId}).lean().exec();
  }

  async getGameRatingsById(contentId) {
    return await RatingGame.find({contentId: contentId}).lean().exec();
  }

  async getDidTheyReviewGame(contentId, userId) {
    let count = await RatingGame.countDocuments({
      contentId: contentId,
      userId: userId,
    }).exec();
    return count > 0;
  }

  async getDidTheyReviewMovie(contentId, userId) {
    let count = await RatingMovie.countDocuments({
      contentId: contentId,
      userId: userId,
    }).exec();
    return count > 0;
  }

  async getDidTheyReviewTV(contentId, userId) {
    let count = await RatingTVShow.countDocuments({
      contentId: contentId,
      userId: userId,
    }).exec();
    return count > 0;
  }

  async getLatestMovieRatingForUser(contentId, userId) {
    return await RatingMovie.findOne({userId: userId, contentId: contentId}).sort({_id: -1}).lean().exec();
  }

  async getLatestTVShowRatingForUser(contentId, userId) {
    return await RatingTVShow.findOne({userId: userId, contentId: contentId}).sort({_id: -1}).lean().exec();
  }

  async getLatestGameRatingForUser(contentId, userId) {
    return await RatingGame.findOne({userId: userId, contentId: contentId}).sort({_id: -1}).lean().exec();
  }

  async getArticleRatingsById(resourceUrl) {
    //
    // TODO: Why was I doing this? - Ryan
    // try {
    //     return await RatingArticle.aggregate([
    //         {
    //             $lookup: {
    //                 from: 'ratingsMisDisInformation',
    //                 localField: 'resourceUrl',
    //                 foreignField: 'resourceUrl',
    //                 as: 'misDisInformationRatings'
    //             }
    //
    //         },
    //         {
    //             $unwind: { path: "$misDisInformationRatings", preserveNullAndEmptyArrays: true }
    //         },
    //         {
    //             $project: {
    //                 mergedData: { $mergeObjects: ["$misDisInformationRatings", "$$ROOT"] }
    //             }
    //         },
    //         {
    //             $replaceRoot: { newRoot: "$mergedData" }
    //         }
    //     ]);
    // } catch (error) {
    //     console.error('Error:', error);
    // }
    return await RatingArticle.find({resourceUrl: decodeURIComponent(resourceUrl)})
      .lean()
      .exec();
  }

  async getArticleRatingsByURL(resourceUrl) {
    return await RatingArticle.find({resourceUrl: resourceUrl}).lean().exec();
  }

  async getMisDisInformationRatingsByURL(resourceUrl) {
    return await RatingMisDisInformation.find({resourceUrl: resourceUrl}).lean().exec();
  }

  async getPoliticalPolicyRatingsByURL(resourceUrl) {
    return await RatingPoliticalPolicy.find({resourceUrl: resourceUrl}).lean().exec();
  }

  async getLatestArticleRating(userId) {
    return await RatingArticle.findOne({userId: userId}).sort({_id: -1}).lean().exec();
  }

  async getLatestAppProcessRating(userId) {
    return await RatingAppProcess.findOne({userId: userId}).sort({_id: -1}).lean().exec();
  }

  async getLatestClassRating(userId) {
    return await RatingClass.findOne({userId: userId}).sort({_id: -1}).lean().exec();
  }

  async getLatestJobProspectRating(userId) {
    return await RatingJobProspect.findOne({userId: userId}).sort({_id: -1}).lean().exec();
  }

  async getLatestMentalHealthRating(userId) {
    return await RatingMentalHealth.findOne({userId: userId}).sort({_id: -1}).lean().exec();
  }

  async getLatestMisDisInformationRating(userId) {
    return await RatingMisDisInformation.findOne({userId: userId}).sort({_id: -1}).lean().exec();
  }

  async getLatestOnlineLearningRating(userId) {
    return await RatingOnlineLearning.findOne({userId: userId}).sort({_id: -1}).lean().exec();
  }

  async getLatestOnlineResourcesRating(userId) {
    return await RatingOnlineResources.findOne({userId: userId}).sort({_id: -1}).lean().exec();
  }

  async getLatestSchoolRating(userId) {
    return await RatingSchool.findOne({userId: userId}).sort({_id: -1}).lean().exec();
  }

  async getLatestTextbookRating(userId) {
    return await RatingTextbook.findOne({userId: userId}).sort({_id: -1}).lean().exec();
  }

  async getOnlineLearningRatingsById(resourceUrl) {
    return await RatingOnlineLearning.find({resourceUrl: resourceUrl}).lean().exec();
  }

  // Add new category
  async addCategory(newCategory) {
    try {
      let category = new Category(newCategory);
      await category.save();
      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  //Get Category ID
  async getCategoryById(catId) {
    return await Category.findById(catId).lean().exec();
  }

  async updateCategory(catId, category) {
    try {
      return await Category.findByIdAndUpdate(catId, category).exec();
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  // delete category
  async deleteCategory(catId) {
    try {
      const result = await Category.deleteOne({_id: catId}).exec();
      return {deletedCount: result.deletedCount};
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  //Add Question
  async addQuestion(newQuestion) {
    let rateQuestion = new RatingQuestion(newQuestion);
    await rateQuestion.save();
    return true;
  }

  //Get Question
  async getQuestionByCategory(questionId, catId) {
    return await RatingQuestion.findOne({_id: questionId, catId: catId}).populate("cat_id").lean().exec();
  }

  // Update Question
  async updateQuestionByCategory(questionId, catId, question, description) {
    return await RatingQuestion.updateOne({_id: questionId, catId: catId}, {$set: question, description}).exec();
  }

  //Delete Question
  async deleteQuestionByCategory(catId, questionId) {
    try {
      const result = await RatingQuestion.deleteOne({
        _id: questionId,
        cat_id: catId,
      }).exec();
      return {deletedCount: result.deletedCount};
    } catch (err) {
      console.error(err);
      return false;
    }
  }

  async getUserRatingsForCategory(userId, catId) {
    return await RatingMaster.find({userId: userId, catId: catId}).lean().exec();
  }

  async getRatingsByCatId(catId) {
    return await RatingMaster.find({catId: catId}).lean().populate("catId", "title").exec();
  }

  async getMovieRatingsByCatId() {
    return await RatingMovie.find().lean().populate("catId", "title").exec();
  }

  async getTVRatingsByCatId() {
    return await RatingTVShow.find().lean().populate("catId", "title").exec();
  }

  async getVideoGameRatingsByCatId() {
    return await RatingGame.find().lean().populate("catId", "title").exec();
  }

  // Add product to MyProducts
  async addProduct(newProductData) {
    try {
      await MyProducts.updateOne(
        {
          userId: newProductData.userId,
          contentName: newProductData.contentName,
        },
        {$setOnInsert: newProductData},
        {upsert: true}
      ).exec();
    } catch (e) {
      console.log(e);
    }
  }

  // Return MyProducts list for a certain user
  async getMyProductsByUserId(userId) {
    try {
      return await MyProducts.find({userId: userId}).lean().exec();
    } catch (error) {
      console.error("Error in getMyProductsByUserId database function:", error);
      throw new Error("Database query failed");
    }
  }

  async getArticleRatingsByCatId() {
    return await RatingArticle.find().lean().populate("catId", "title").exec();
  }

  async getMisDisInformationRatingsByCatId() {
    return await RatingMisDisInformation.find().lean().populate("catId", "title").exec();
  }

  async getPoliticalPolicyRatingsByCatId() {
    return await RatingPoliticalPolicy.find().lean().populate("catId", "title").exec();
  }

  async getTextbookRatingsByCatId() {
    return await RatingTextbook.find().lean().populate("catId", "title").exec();
  }

  async getJobProspectRatingsByCatId() {
    return await RatingJobProspect.find().lean().populate("catId", "title").exec();
  }

  async getSchoolRatingsByCatId() {
    return await RatingSchool.find().lean().populate("catId", "title").exec();
  }

  async getClassRatingsByCatId() {
    return await RatingClass.find().lean().populate("catId", "title").exec();
  }

  async getClassRatingsBySchoolAndSubject(school, subject) {
    return await RatingClass.find({school: school, subject: subject}).lean().populate("school", "title").exec();
  }

  async getMentalHealthRatingsBySchoolAndYear(school, year) {
    return await RatingMentalHealth.find({school: school, year: year}).lean().populate("school", "title").exec();
  }

  async getOnlineLearningRatingsBySchool(school) {
    return await RatingOnlineLearning.find({school: school}).lean().populate("school", "title").exec();
  }

  async getSchoolRatingsBySchool(school) {
    return await RatingSchool.find({school: school}).lean().populate("school", "title").exec();
  }

  async getOnlineResourceRatingsByURL(resourceUrl) {
    return await RatingOnlineResources.find({resourceUrl: resourceUrl}).lean().exec();
  }

  async getTextbookRatingsByISBN(resourceISBN) {
    return await RatingTextbook.find({resourceISBN: resourceISBN}).lean().exec();
  }

  async getAppProcessRatingsByCatId(catId) {
    return await RatingAppProcess.find({catId: catId}).lean().populate("catId", "title").exec();
  }

  async getAppProcessRatingsBySchool(school) {
    return await RatingAppProcess.find({school: school}).lean().populate("school", "title").exec();
  }

  async getJobProspectRatingsBySchool(school) {
    return await RatingJobProspect.find({school: school}).lean().populate("school", "title").exec();
  }

  async getOnlineLearningRatingsByCatId(catId) {
    return await RatingOnlineLearning.find({catId: catId}).lean().populate("catId", "title").exec();
  }

  async getOnlineResourcesRatingsByCatId(catId) {
    return await RatingOnlineResources.find({catId: catId}).lean().populate("catId", "title").exec();
  }

  async getMentalHealthRatingsByCatId(catId) {
    return await RatingMentalHealth.find({catId: catId}).lean().populate("catId", "title").exec();
  }

  async updateLastActivity(userId) {
    try {
      await User.findOneAndUpdate({_id: userId}, {lastActivity: Date.now()}).exec();
    } catch (err) {
      console.error(err);
    }
  }

  // Function to increment the rating count for a user
  async updateRatingCount(userId) {
    try {
      await User.findByIdAndUpdate({_id: userId}, {$inc: {ratingCount: 1}}).exec();
    } catch (err) {
      console.error(err);
    }
  }

  // Beverages
  async getAllBeverages() {
    try {
      return await Beverages.find({});
    } catch (error) {
      console.error(error);
    }
  }

  async addBeverage(brand, beverageData) {
    try {
      await Beverages.updateOne(
        {
          brand: brand,
          "products.name": {$ne: beverageData.name},
        },
        {$addToSet: {products: {$each: [beverageData]}}}
      )
        .lean()
        .exec();
    } catch (error) {
      console.error(error);
    }
  }

  async getBrands(brand) {
    try {
      return await Beverages.find({brand: brand});
    } catch (error) {
      console.error(error);
    }
  }

  async addBrand(brandData) {
    try {
      await Beverages.updateOne({brand: brandData.brand}, {$setOnInsert: brandData}, {upsert: true}).exec();
    } catch (error) {
      console.error(error);
    }
  }

  // Update User Background Color
  async updateUserBackgroundColor(userId, backgroundColor) {
    try {
      return await User.findOneAndUpdate({_id: userId}, {backgroundColor}, {new: true});
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // Get User Background Color
  async getUserBackgroundColor(userId) {
    try {
      const user = await User.findOne({_id: userId});
      if (user) {
        return await user.backgroundColor;
      }
      return null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async saveTextbook(textbookData) {
    const textbookEntry = new Textbook(textbookData);
    await textbookEntry.save();
    return true;
  }

  async getTextbookByISBN(resourceISBN) {
    return await Textbook.findOne({ISBN_13: resourceISBN});
  }

  // Survey
  async createSurvey(surveyData) {
    const surveyEntry = new Survey(surveyData);
    return surveyEntry.save();
  }

  async getSurvey(surveyId) {
    return await Survey.findOne({surveyId: surveyId}, "questions");
  }

  async submitSurvey(surveyData) {
    const completedSurvey = new SurveyResults(surveyData);
    return completedSurvey.save();
  }

  async getSurveyResults(surveyId) {
    return await Survey.findOne({surveyId: surveyId}, "questions", "timestamp");
  }
};
