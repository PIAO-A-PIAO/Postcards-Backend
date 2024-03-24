"use strict";
require("dotenv").config();
const rateMaster = require("./controllers/RateMaster");
const express = require("express");
const app = express();
const helmet = require('helmet');
const logger = require('morgan');
const cors = require("cors");
// const {checkLogin} = require("./middleware/authUser");
const cookieParser = require("cookie-parser");
// const jwt = require("jsonwebtoken");

const config = require("./config/DbCon");
const port = process.env.PORT || 4000;
app.use(cors());
app.use(cookieParser());
app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const DbLogic = require("./controllers/DbLogic.js");
const db = new DbLogic();

//Authentication middleware to check if the user is logged in and is an admin
// const requireAdmin = (req, res, next) => {
//   console.log("requireAdmin middleware called!");
//   const loginToken = req.cookies.loginToken;
//   if (!loginToken) {
//     // Redirect to frontend login page if user not logged in
//     res.redirect("http://localhost:3000/login");
//   } else {
//     try {
//       // Verify and decode the JWT token
//       const decodedToken = jwt.verify(loginToken, process.env.SECRET_KEY);
//       if (decodedToken.role !== "Admin") {
//         // Redirect to frontend login page if user is not an admin
//         res.redirect("http://localhost:3000/login");
//       } else {
//         // User is logged in and is an admin, proceed to the next middleware or route handler
//         next();
//       }
//     } catch (err) {
//       // Redirect to frontend login page if token verification fails
//       res.redirect("http://localhost:3000/login");
//     }
//   }
// };

const blockNonLocalOrigins = (req, res, next) => {
  // const allowedOrigin = "http://localhost:3000";
  // if (req.headers.origin !== allowedOrigin) {
  //   return res.redirect(allowedOrigin);
  //   // return res.status(403).json({ error: "Access Forbidden" });
  // }
  next();
};

// Apply the middleware for all routes
app.use(blockNonLocalOrigins);

const statusCode = db.initialize(config.url);
if (statusCode === 2) {
  app.listen(port, () => {
    console.log(`server listening on: ${port}`);
  });
} else {
  console.log("Connection error and Failed to start server.");
}

//Rate
// TODO REMOVE ONCE CONVERTED
app.post("/rateMaster", rateMaster.rateMaster);
app.get("/fetchRatingsForUserById/:userId/:catId", rateMaster.getRatingsByUserIdForCat);
app.get("/fetchRatingsByCatId/:catId", rateMaster.getRatingsByCatId);

const categoryRouter = require("./routes/categoryRouter");
app.use("/category", categoryRouter);

const questionRouter = require("./routes/questionRouter");
app.use("/question", questionRouter);

// MyProducts
const myProductsRouter = require("./routes/myProductsRouter");
app.use("/my-products", myProductsRouter);

// Users
const userRouter = require("./routes/userRouter");
app.use("/user", userRouter);

// Universities
const universitiesRouter = require("./routes/universitiesRouter");
app.use("/universities", universitiesRouter);

// Generalized ratings endpoints
const ratingsRouter = require("./routes/ratingsRouter");
app.use("/ratings", ratingsRouter);

// All information regarding entertainment categories funnels through here
const entertainmentRouter = require("./routes/entertainmentRouter");
app.use("/entertainment", entertainmentRouter);

// All information regarding education categories funnels through here
const educationRouter = require("./routes/educationRouter");
app.use("/education", educationRouter);

// Retrieves context for categories (i.e FALL SEMESTER, YEAR 2023)
const contextRouter = require("./routes/contextRouter");
app.use("/context", contextRouter);

// Handles management of beverage content
const beveragesRouter = require("./routes/beveragesRouter");
app.use("/beverages", beveragesRouter);

// Handles management of textbook content
const textbookRouter = require("./routes/textbookRouter");
app.use("/textbook", textbookRouter);

// Handles management of survey content
const surveyRouter = require("./routes/surveyRouter");
app.use("/survey", surveyRouter);

app.use((req, res) => res.status(404).json({error: "Route not found"}));