const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  document: { type: String, unique: true, required: true },
  subscribe: {
    type: String,
    enum: ["Si", "No"]
  },
  captation: {
    type: String,
    enum: ["Telefonica", "Web", "Presencial"],
    required: true
  },
  address: String,
  zipcode: String,
  region: String,
  city: String,
  country: String,
  observations: String
});

module.exports = mongoose.model("user", userSchema);
