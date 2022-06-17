const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;
const voteSchema = new Schema({
  userId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: "user",
  },
  candidateId: {
    type: SchemaTypes.ObjectId,
    required: true,
    ref: "candidate",
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Inactive"],
  },
});
const Vote = mongoose.model("vote", voteSchema);
module.exports = { Vote };
