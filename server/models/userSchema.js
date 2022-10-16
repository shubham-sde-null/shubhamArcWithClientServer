const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter your name"],
    uppercase: true,
    trim: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("email id is invalid");
      }
    },
  },
  phone: {
    type: Number,
    required: [true, "please enter your phone number"],
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
});
userSchema.pre("save", async function (next) {
  if (this.isModified("password") && this.isModified("phone")) {
    console.log("password is encrypted");
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
    // this.phone = await bcrypt.hash(this.phone, 8);
  }
  next();
});
const User = mongoose.model("ABC", userSchema);
module.exports = User;
