const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models/user");

const jwtSecret = process.env.JWT_SECRET;

// signup middlewares
// make sure mobileNumber and name not exists
const checkUserInDb = async (req, res, next) => {
  try {
    const doc = await User.findOne({
      mobileNumber: req.user.mobileNumber,
      status: "Active",
    });
    if (doc) {
      res
        .status(400)
        .json({ message: "user with this mobileNumber already exists" });
      return;
    }
    next();
  } catch (error) {
    console.log("checkUserInDb", error);
    if (error.status) {
      next(error);
    } else {
      next({ message: error, status: 500 });
    }
  }
};

const uploadUser = async (req, res, next) => {
  try {
    const { name, mobileNumber, password, aadharNumber, age, dob } = req.user;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      mobileNumber,
      hashedPassword,
      role: "User",
      aadharNumber,
      age,
      dob,
    });
    await user.save();
    req.user = { ...req.user, ...user._doc };
    next();
  } catch (error) {
    console.log("uploadUser", error);
    if (error.status) {
      next(error);
    } else {
      next({ message: error, status: 500 });
    }
  }
};

//login middlewares
// get user from mobileNumber
const getUserFromDb = async (req, res, next) => {
  try {
    const user = await User.findOne({ mobileNumber: req.user.mobileNumber });
    if (!user) {
      res.status(400).json({ message: "no user found" });
      return;
    }
    req.user = { ...req.user, ...user._doc };
    next();
  } catch (error) {
    console.log("getUserFromDb", error);
    if (error.status) {
      next(error);
    } else {
      next({ message: error, status: 500 });
    }
  }
};

// compare hashed password get from db with login password
const comparePassword = async (req, res, next) => {
  try {
    const { hashedPassword, password } = req.user;
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      res.status(400).json({ message: "password is incorrect" });
      return;
    }
    next();
  } catch (error) {
    console.log("comparePassword", error);
    if (error.status) {
      next(error);
    } else {
      next({ message: error, status: 500 });
    }
  }
};

// get token(for both login and signup)
const signJwt = async (req, res, next) => {
  try {
    const { _id, role } = req.user;
    req.user.token = jwt.sign({ _id, role }, jwtSecret);
    next();
  } catch (error) {
    console.log("signjwt", error);
    if (error.status) {
      next(error);
    } else {
      next({ message: error, status: 500 });
    }
  }
};

//authentication middleware
// get user from token
const authenticateJWT = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(400).send({ message: "auth header not found" });
      return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(400).send({ message: "auth token not found" });
      return;
    }
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        res.status(400).send({ message: "jwt verify error" });
        return;
      }
      req.user = user;
      req.user.token = token;
      next();
    });
  } catch (error) {
    console.log("authenticateJWT", error);
    if (error.status) {
      next(error);
    } else {
      next({ message: error, status: 500 });
    }
  }
};

// user update middleware (requires authentication)
const updateUser = async (req, res, next) => {
  try {
    const doc = await User.findOne({ _id: req.user._id });
    const { mobileNumber, name, password, age, dob, aadharNumber } =
      req.updateUser;

    if (password) {
      doc.hashedPassword = await bcrypt.hash(password, 10);
      req.user.password = password;
    }
    if (mobileNumber) {
      req.user.mobileNumber = mobileNumber;
      doc.mobileNumber = mobileNumber;
    }
    if (name) {
      req.user.name = name;
      doc.name = name;
    }
    if (age) {
      req.user.age = age;
      doc.age = age;
    }
    if (aadharNumber) {
      req.user.aadharNumber = aadharNumber;
      doc.aadharNumber = aadharNumber;
    }
    if (dob) {
      req.user.dob = dob;
      doc.dob = dob;
    }
    await doc.save();
    next();
  } catch (error) {
    console.log("updateUser", error);
    if (error.status) {
      next(error);
    } else {
      next({ message: error, status: 500 });
    }
  }
};

module.exports = {
  checkUserInDb,
  uploadUser,
  getUserFromDb,
  comparePassword,
  signJwt,
  authenticateJWT,
  updateUser,
};
