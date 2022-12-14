const router = require("express").Router();
const properties = require("../models/propertySchema");
router.post("/", async function (req, res) {
  try {
    const details = Object.keys(req.body);
    const fields = ["property", "contact", "area"];
    const propertyId = "PPD" + Math.floor(Math.random() * 10000);
    const status = "Unsold";
    const duration = Math.floor(Math.random() * 100);
    const views = Math.floor(Math.random() * 100);
    for (let i = 0; i < fields.length; i++) {
      if (!details.includes(fields[i])) {
        return res.status(400).json({
          status: "Failed to Save Property",
          message: `Please enter value for ${fields[i]}`
        });
      }
    }
    const data = await properties.create({
      ...req.body,
      ppid: propertyId,
      status: status,
      duration: duration,
      views: views
    });
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

router.put("/:propertyId", async function (req, res) {
  try {
    const existing = await properties.find({ ppid: req.params.propertyId });
    if (!existing) {
      return res.status(500).json({
        status: "Not Found",
        message: "Property with given id does not exist"
      });
    }
    const data = await properties.updateOne(
      { ppid: req.params.propertyId },
      req.body
    );
    res.status(200).json({
      message: "Property updated successfully",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message
    });
  }
});

router.get("/", async (req, res) => {
  try {
    let data = await properties.find().sort({ status: -1 }).limit(10);
    res.json({
      status: "success",
      data: data
    });
  } catch (error) {
    res.status(500).json({
      status: "Server Error",
      message: error.message
    });
  }
});

router.get("/:propertyId", async (req, res) => {
  try {
    let data = await properties.findOne({ ppid: req.params.propertyId });
    if (!data) {
      return res.status(400).send({
        status: "Not Found",
        message: "No data found for the property Id"
      });
    }
    res.status(200).json({
      status: "success",
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
