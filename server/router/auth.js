const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/userSchema");
router.get("/", (req, res, next) => {
    res.send("<h1>sending message from router</h1>");
});
router.post("/register", async(req, res, next) => {
    const { name, email, phone, password, cpassword } = req.body;
    if (!name || !email || !phone || !password || !cpassword) {
        res.status(401).json({ message: "please enter data properly" });
    }
    try {
        const userExists = await User.findOne({ email: email });
        if (userExists) {
            return res
                .status(422)
                .json({ message: "email already exists please use another email id" });
        } else if (password !== cpassword) {
            return res.status(422).json({
                message: "Invalid credentials you might have entered wrong email or password",
            });
        } else {
            const user = new User({ name, email, phone, password, cpassword });
            const userRegister = await user.save();
            console.log(userRegister);
            res.status(201).json({ message: "user registered successfully" });
        }
    } catch (err) {
        console.log(err);
    }
});
router.post("/signin", async(req, res, next) => {
    const { email, password } = req.body;
    const userLogin = await User.findOne({ email: email });
    console.log(userLogin);
    console.log("checking the output working or not");
    try {
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            if (!isMatch) {
                return res
                    .status(400)
                    .json({ message: "You have entered invalid credentials" });
            } else {
                return res.status(200).json({ message: "user logged in successfully" });
            }
        } else {
            return res.status(400).json({ error: "Invalid Credentials" });
        }
    } catch (err) {
        console.log(err);
    }
});
module.exports = router;