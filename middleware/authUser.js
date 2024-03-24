const jwt = require('jsonwebtoken');

const checkLogin = (req, res, next) => {
  const token = req.cookies["tokenCookie"];
  if (token) {
    // res.redirect('/');
    jwt.verify(token, process.env.SECRET_KEY, (err) => {
      if (err) {
        //if token is not valid redirect to login page
        res.redirect('/login');
      } else {
        //if token is verified then redirect to Homepage
        res.status(200).redirect('/');
      }
    });
  } else {
    next();
  }
};

const authRole = (data) => (req, res, next) => {
  const token = req.cookies["tokenCookie"];
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (data.includes(decodedToken.role)) {
        res.name = decodedToken.name;
        next();
      } else {
      }
    });
  } else {
    res.redirect('/');
  }
};

const createToken = (id, role, email, name) => {
  return jwt.sign({id, role, email, name}, process.env.SECRET_KEY);
};

module.exports = {authRole, createToken, checkLogin};
