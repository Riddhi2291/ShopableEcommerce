const { mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
      index: true,
    },
    role: {
      type: String,
      default: "subscriber",
    },
    address: String,
  },
  { timestamp: true }
);
module.exports = mongoose.model("user", userSchema);
