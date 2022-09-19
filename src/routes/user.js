const express = require("express");
const User = require("../models/userSchema");
const router = express.Router();

router.get("/users", async (req, res) => {
    // Write the code for fetch
    const users = await User.find();
    res.json({
        status: "Successfully Fetched",
        users
    })
});



router.put("/user/:id", async (req, res) => {

    try {
        const users = await User.updateOne({_id: req.params.id},
             {age: req.body.age, maritalStatus: req.body.maritalStatus}, 
             {runValidators:true });
        res.json({
            status: "Successfully updated",
            users
        })

    }catch(e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }

});

router.delete("/user/:id", async (req, res) => {
    try {
        const users = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            status: "Successfully deleted",
            users
        })

    }catch(e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }

});

module.exports = router;