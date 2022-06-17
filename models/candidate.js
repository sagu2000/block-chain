const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;
const candidateSchema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: "user",
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive"],
  },
  partyName: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const Candidate = mongoose.model("candidate", candidateSchema);
module.exports = { Candidate };
