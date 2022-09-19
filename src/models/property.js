const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  PPID: {
    type: String,
    unique: true,
    required: true,
  },
  Property: {
    required: true,
    type: String,
  },
  Contact: {
    required: true,
    type: Number,
  },
  Area: {
    required: true,
    type: Number,
  },
  Views: {
    type: Number,
    required: true,
  },
  Status: {
    type: String,
    default: "Unsold",
    required: true,
  },
  Duration: {
    type: Number,
    required: true,
  }
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;