const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const {
  // getName,
  // authRole,
  createToken, // checkLogin,
} = require("../middleware/authUser");
const mailUser = process.env.MAILUSER;
const mailPwd = process.env.MAILPWD;
const DbLogic = require("./DbLogic.js");
const db = new DbLogic();
const {universitiesJSON} = require("./universitiesController");
const server_url = process.env.REACT_APP_API_URI;
let isLoggedIn = false;

exports.loginUser = async (req, res) => {
  const userEmail = req.body["userEmail"];
  const userPassword = req.body["userPassword"];

  db.findUser(userEmail)
    .then(function (result) {
      if (result === null || result === undefined || !result || userPassword === "" || userEmail === "" || userPassword === undefined || userEmail === undefined) {
        res.send({msg: "Invalid User Email or Password", isLoggedIn: false});
      } else {

        // Check input password with saved password
        bcrypt.compare(userPassword, result.password).then((data) => {
          if (data === true) {

            // Create user encrypted
            const token = createToken(result._id, result.role, result.email, result.name);
            isLoggedIn = true;

            res.send({
              msg: "User LoggedIn Successfully", token: token, isLoggedIn: true,
            });

          } else {
            res.send({msg: "Invalid Login Credentials", isLoggedIn: false});
          }
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

// Google OAuth Login/Register if account does not exist
exports.getUserToken = async (req, res) => {
  const email = req.body.email;
  const name = req.body.name;

  try {
    const User = db.getUserModel();
    let user = await User.findOne({email});

    if (!user) {
      user = new User({email, verified: true});
      await user.save();
    }

    const token = createToken(user._id, user.role, email, name);
    // Adds ObjectID to User object after it is created
    User.findOneAndUpdate({_id: user._id}, {token: token}).exec();
    isLoggedIn = true;

    res.send({
      msg: "User LoggedIn Successfully", token: token, isLoggedIn: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send({msg: "Internal Server Error"});
  }
};

const registerUser = async (data) => {
  if (data.school === undefined || data.school === null || data.school === "") {
    data.verified = true;
    return await db.addUser(data);
  } else {
    try {
      const response = await fetch(universitiesJSON());
      const universities = await response.json();
      const school = universities.find((university) => university.name === data.school);
      if (school) {
        const emailSuffix = data.email.split('@')[1].toLowerCase();
        if (school.domains.includes(emailSuffix)) {
          data.verified = true;
          return await db.addUser(data);
        } else {
          console.log("Invalid School Email");
          return false;
        }
      } else {
        console.log("Invalid School Name");
        return false;
      }
    } catch (error) {
      console.error('Error fetching JSON:', error);
      return false;
    }

  }
};

const rand = () => {
  return Math.random().toString(36).substring(2);
};

const generateVerificationToken = () => {
  return rand() + rand();
};

//send mail
const sendMail = async (to_email, msg) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "Gmail", host: 'smtp.gmail.com', port: 465, secure: true, // Note: `secure` is false when using STARTTLS on port 587
      auth: {
        user: mailUser, pass: mailPwd,
      }, tls: {
        rejectUnauthorized: false,
      },
    });

    let info = await transporter.sendMail({
      from: '"KnowQuest" <knowquestrating@gmail.com>', // Ensure this email is correctly formatted and verified in Gmail if necessary
      to: to_email,
      subject: "Verify your email for registration in KnowQuest",
      text: "KnowQuest Registration",
      html: "Hello " + to_email + "," + "<p>You can verify your email by clicking on the link given below:<br>" + msg + "</p>" + "<p>If you have any trouble, please contact us!</p>" + "<p>Best wishes,<br>KnowQuest team</p>",
    });

    console.log('Email sent successfully: %s', info.messageId);
    // Optionally log the preview URL, if available
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false; // Return false to indicate failure
  }
};


exports.sendVerificationLink = async (req, res) => {
  console.log("sendVerificationLink: Starting to process request");

  if (!req.body.userEmail || !req.body.userPassword) {
    console.log("sendVerificationLink: Required fields are missing");
    return res.status(400).json({message: "Please fill all the required fields!"});
  }

  const {userEmail, userPassword, subject, school, role} = req.body;
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(userPassword, salt);
  const userData = {
    email: userEmail, password: encryptedPassword, subject, school, role, verified: false,
  };

  const uniqueToken = generateVerificationToken();
  console.log(`sendVerificationLink: Generated token: ${uniqueToken}`);

  try {
    const validateUser = await db.findUser(userEmail);

    if (validateUser) {
      console.log("sendVerificationLink: User email already exists");
      return res.status(409).json({message: "User Email already exists, please try again!"});
    }

    const userTokenData = {email: userEmail, token: uniqueToken, data: userData};
    const result = await db.storeVerificationToken(userTokenData);

    if (result) {
      const verificationLink = `${server_url}/user/verifyMail/${uniqueToken}`;
      console.log(`sendVerificationLink: Verification link: ${verificationLink}`);

      const mailSent = await sendMail(userEmail, verificationLink);
      if (mailSent) {
        console.log("sendVerificationLink: Verification email sent successfully");
        return res.status(200).json({message: "Please check your inbox for a verification link"});
      } else {
        console.log("sendVerificationLink: Failed to send verification email");
        return res.status(500).json({message: "Failed to send verification email"});
      }
    } else {
      console.log("sendVerificationLink: Failed to store verification token in database");
      return res.status(500).json({message: "Failed to store verification token in database"});
    }
  } catch (error) {
    console.error("sendVerificationLink: Error", error);
    return res.status(500).json({message: "Internal server error while processing your request."});
  }
};


exports.verifyLink = (req, res) => {
  const urlToken = req.params.token;
  db.verifyToken(urlToken).then(async result => {
    if (result != null) {
      // Verified user mail and now registering user
      let response = await registerUser(result);
      if (response) {
        // Send HTML response with a success message and automatic redirection
        res.send(`
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="refresh" content="5;url=${process.env.REACT_APP_ORIGIN_URI}/login">
                        <title>Verification Successful</title>
                    </head>
                    <body>
                        <h1>Verification Done Successfully!</h1>
                        <p>Redirecting to login in 5 seconds...</p>
                        <script>
                            setTimeout(function() {
                                window.location.href = "${process.env.REACT_APP_ORIGIN_URI}/login";
                            }, 5000); // 5000 milliseconds = 5 seconds
                        </script>
                    </body>
                    </html>
                `);
      } else {
        // If user email already exists or any other issue with registration
        res.redirect(`${process.env.REACT_APP_ORIGIN_URI}/register?error=emailExists`);
      }
    } else {
      // Verification link is invalid
      res.redirect(`${process.env.REACT_APP_ORIGIN_URI}/register?error=invalidToken`);
    }
  });
};


exports.getAllUser = (req, res) => {
  db.getAllUser().then(function (result) {
    res.send(result);
  });
};

exports.getUserById = (req, res) => {
  const id = req.body.id;
  db.getUserById(id).then(function (result, err) {
    if (err) {
      console.error(err);
      return err;
    } else {
      res.send(result);
    }
  });
};

exports.getUserSchool = (req, res) => {
  const id = req.body.id;
  db.getUserById(id).then(function (result, err) {
    if (err) {
      console.error(err);
      return err;
    } else {
      if (result) {
        res.send(result.school);
      } else {
        res.send(undefined);
      }
    }
  });
};

exports.deleteUser = async (req, res) => {
  const id = req.body.id;
  db.deleteUser(id).then(function (result) {
    if (result) {
      res.status(200).send({msg: "User Deleted Successfully", status: true});
    } else {
      res.status(200).send({msg: "Error deleting User", status: false});
    }
  });
};

exports.updateBackgroundColor = async (req, res) => {
  try {
    const userId = req.body.userId;
    const backgroundColor = req.body.backgroundColor; // background color is provided in the request body
    await db.updateUserBackgroundColor(userId, backgroundColor);

    res.status(200).json({message: 'User background color updated successfully'});
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
};

exports.getUserBackgroundColor = async (req, res) => {
  try {
    const userId = req.body.userId;
    const backgroundColor = await db.getUserBackgroundColor(userId);

    res.status(200).json({backgroundColor: backgroundColor});
  } catch (error) {
    res.status(500).json({error: 'Internal Server Error'});
  }
}

exports.sendCode = async (req, res) => {
  alert("Checkpoint");

  console.log("sendVerificationLink: Starting to process request");

  if (!req.body.userEmail || !req.body.userPassword) {
    console.log("sendVerificationLink: Required fields are missing");
    return res.status(400).json({message: "Please fill all the required fields!"});
  }
}