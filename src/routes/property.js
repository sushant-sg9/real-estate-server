const router = require("express").Router();
const properties = require("../models/propertySchema");
router.post("/", async function (req, res) {
  try {
    const details = Object.keys(req.body);
    const fields = [
      "property",
      "contact",
      "area",
      "views",
      "status",
      "duration"
    ];
    const propertyId = "PPD" + Math.floor(Math.random() * 10000);
    for (let i = 0; i < fields.length; i++) {
      if (!details.includes(fields[i])) {
        return res.status(400).json({
          status: "Failed to Save Property",
          message: `Please enter value for ${fields[i]}`
        });
      }
    }
    const data = await properties.create({ ...req.body, ppid: propertyId });
    res.status(200).json({
      message: "Property created successfully",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message
    });
  }
});

module.exports = router;
