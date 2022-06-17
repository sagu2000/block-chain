const mongoose = require("mongoose");
const { Schema } = mongoose;
const userSchema = new Schema({
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive"],
  },
  name: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "User",
    enum: ["User", "Admin", "Candidate"],
  },
  aadharNumber: {
    type: Number,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  hashedPassword: String,
});
const User = mongoose.model("user", userSchema);
module.exports = { User };
