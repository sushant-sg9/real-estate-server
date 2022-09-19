const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  ppid: {
    type: String,
    unique: true,
    required: true
  },
  property: {
    required: true,
    type: String
  },
  contact: {
    required: true,
    type: Number
  },
  area: {
    required: true,
    type: Number
  },
  views: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "Unsold",
    required: true
  },
  duration: {
    type: Number,
    required: true
  }
});

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;
