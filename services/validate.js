const validateLoginForm = async (req, res, next) => {
  const { mobileNumber, password } = req.body;
  if (!mobileNumber) {
    res.status(400).send({ message: "mobileNumber is required" });
    console.log("mobileNumber is required");
    return;
  }
  if (!password) {
    res.status(400).send({ message: "password is required" });
    console.log("password is required");
    return;
  }
  req.user = { mobileNumber, password };
  console.log("login form is valid");
  next();
};

const validateSignupForm = async (req, res, next) => {
  const { mobileNumber, password, name,age,aadharNumber,dob } = req.body;
  if (!mobileNumber) {
    res.status(400).send({ message: "mobileNumber is required" });
    console.log("mobileNumber is required");
    return;
  }
  if (!password) {
    res.status(400).send({ message: "password is required" });
    console.log("password is required");
    return;
  }
  if (!name) {
    res.status(400).send({ message: "name is required" });
    console.log("name is required");
    return;
  }
  if (!age) {
    res.status(400).send({ message: "age is required" });
    console.log("age is required");
    return;
  }
  if (!aadharNumber) {
    res.status(400).send({ message: "aadharNumber is required" });
    console.log("aadharNumber is required");
    return;
  }
  if (!dob) {
    res.status(400).send({ message: "dob is required" });
    console.log("dob is required");
    return;
  }
  req.user = { mobileNumber, password, name,age,aadharNumber,dob };
  console.log("signup form is valid");
  next();
};

const validateUpdateForm = async (req, res, next) => {
  if (!req.body) {
    res.status(400).send({ message: "update form is required" });
    console.log("update form is required");
    return;
  }
  const updateUser = {};
  if (req.body.mobileNumber) {
    updateUser.mobileNumber = req.body.mobileNumber;
  }
  if (req.body.name) {
    updateUser.name = req.body.name;
  }
  if (req.body.password) {
    updateUser.password = req.body.password;
  }
  if (req.body.age) {
    updateUser.age = req.body.age;
  }
  if (req.body.dob) {
    updateUser.dob = req.body.dob;
  }
  if (req.body.aadharNumber) {
    updateUser.aadharNumber = req.body.aadharNumber;
  }
  req.updateUser = updateUser;
  console.log("update form is valid");
  next();
};

const validateAdmin = async (req, res, next) => {
  const user = req.user;
  if (user.role != "Admin") next({ message: "not a admin" });
  next();
};

module.exports = {
  validateLoginForm,
  validateSignupForm,
  validateUpdateForm,
  validateAdmin,
};
