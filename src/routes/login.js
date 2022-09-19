const express = require("express");
const User = require("../models/userSchema");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const router = express.Router();
const secret = "RESTAPI";


router.post("/register", body("email").isEmail(), async (req, res) => {
    let details = req.body
    console.log(details);
    let fields = ["name", "email", "password"];
    for(let i of Object.keys(details)) {
        if(!fields.includes(i)) {
            return res.status(400).json({
                status: "Failed to Register",
                message : "Please enter correct field names in the body"
            })
        }
    }
    let { name, email, password } = req.body;
    if(!name || !email || !password) {
        return res.status(400).json({
            status: "Failed to Register",
            message : "Name, Email and password are required"
        })
    }
    const errors = await validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            status : "Failed to Register",
            message: "Email should be in correct format"
        });
    }
    if(password.length<6) {
        return res.status(400).json({
            status : "Failed to Register",
            message: "Password should contain more than 6 characters"
        });
    }
    const userList = await User.find();
    let len = userList.length
    bcrypt.hash(password, 10, async function (err, hash) {
        if (err) {
            return res.status(500).json({
                status: "Failed to Register",
                message: err.message
            })
        }
        try {
            const user = await User.create({
                name,
                email,
                userid: "06PPD00" + (len+1),
                password: hash
            });
            return res.json({
                status: "Registration successful",
                data: user
            })
        }
        catch(e) {
            return res.status(200).json({
                status : "Failed to Register",
                message: e.message
            })
        }

    });
});

router.post("/login", body("email").isEmail(), async (req, res) => {
    try {
        let fields = ["email", "password"];
        let details = req.body;
        for(let i of Object.keys(details)) {
            if(!fields.includes(i) || Object.keys(details).length != 2 ) {
                return res.status(400).json({
                    status: "Failed to Register",
                    message : "Please check the field names. Only email and password are requred."
                })
            }
        }
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(
                { 
                    status: "Failed to login",
                    message: "Please enter correct Format of email"
                });
        }

        const {email, password } = req.body;
        const data = await User.findOne({email});

        if(!data){
            return res.json({
                status: "Failed to Login",
                message : "User NOT Found with email '" + email + "'. Please register before logging in"
            })
        }

        if(await bcrypt.compare(password, data.password)) {
            let token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: data._id
                }, secret);

                res.json({
                status:  "Sucessfully Logged in",
                message: "Sucessfully Logged in",
                token: "test " + token 
            });
        } 
        else {
            res.json({
                status:  "Failed to login",
                message: "Wrong Password"
            })
        }
    }

    catch (e) {
        res.status(400).json({
            status: "Failed to Login",
            message: e.message
        });
    }
});


module.exports = router;