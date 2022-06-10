const router = require("express").Router();
const { User } = require("../models/user");
const {
  authenticateJWT,
  checkUserInDb,
  getUserFromDb,
  comparePassword,
  signJwt,
  uploadUser,
  updateUser,
} = require("../services/auth");
const {
  validateLoginForm,
  validateSignupForm,
  validateUpdateForm,
} = require("../services/validate");

router.get("/", authenticateJWT, async (req, res, next) => {
  const user = await User.findById(req.user._id);
  const { mobileNumber, name, _id, role, aadharNumber, age, dob } = user;
  res.send({
    mobileNumber,
    name,
    _id,
    token: req.user.token,
    role,
    aadharNumber,
    age,
    dob,
  });
});

// signin
router.post(
  "/signin",
  validateLoginForm, //copy body to user
  getUserFromDb, //get hash password from mobileNumber
  comparePassword, //check password
  signJwt, //get user with token
  (req, res) => {
    console.log("user signin", req.user);
    const { mobileNumber, name, _id, token, role, aadharNumber, age, dob } =
      req.user;
    res.send({
      mobileNumber,
      name,
      _id,
      token,
      role,
      aadharNumber,
      age,
      dob,
    });
  }
);

// signup
router.post(
  "/signup",
  validateSignupForm, //copy body to user
  checkUserInDb, //check whether mobileNumber  exist
  uploadUser, //upload user
  signJwt, //get token
  (req, res) => {
    console.log("user signup", req.user);
    const { mobileNumber, name, _id, token, role, aadharNumber, age, dob } =
      req.user;
    res.send({
      mobileNumber,
      name,
      _id,
      token,
      role,
      aadharNumber,
      age,
      dob,
    });
  }
);

// user update
router.put(
  "/update",
  validateUpdateForm, //validate and copy body to updateUser
  authenticateJWT, //get user with token
  updateUser, //updateUser wit provided fields
  signJwt, //refresh token
  (req, res) => {
    console.log("user signup", req.user);
    const { mobileNumber, name, _id, token, role, aadharNumber, age, dob } =
      req.user;
    res.send({
      mobileNumber,
      name,
      _id,
      token,
      role,
      aadharNumber,
      age,
      dob,
    });
  }
);

module.exports = router;
