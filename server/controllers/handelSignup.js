const jwt = require("jsonwebtoken");
const { postSign, getUserByEmail, getUsers, getUserByUsername } = require("../database/queries");
const signupSchema = require("../utils/validation/signupSchema");
const hashPassword = require("../utils/password/hashpassword");
const { CustomError } = require("../utils");

const postSignUp = (req, res, next) => {
  const { username, email, password } = req.body;

  signupSchema
    .validateAsync(req.body).then(() => getUserByUsername(username))
    .then((data) => {
      if (data.rowCount) {
        res.status(409).json("Sorry! This username is already in use");

        throw CustomError("Sorry! This username is already in use", 409);
     
      }
    })
    .then(() => getUserByEmail(email))
    .then((data) => {
      if (data.rowCount) {
        res.status(409).json("Sorry! This email is already in use");

        throw CustomError("Sorry! This email is already in use", 409);
     
      }
      return hashPassword(password);
    })
    .then((hashPassword) => postSign(username, email, hashPassword))
    .then((data) => {
      jwt.sign(
        { id: data.rows[0].id },
        process.env.PRIVATE_KEY,
        (err, token) => {
          if (err) {
            console.log(err);
          } else {
            res.cookie("id", token).redirect("/reddit");
          }
        }
      );
    }).catch((err) => {
      if (err.details) {
        res.status(400).json("Please Enter A valid Email or valid Password");

        next(CustomError(err.details[0].message, 400));
            } 
    });
};

module.exports = postSignUp;
