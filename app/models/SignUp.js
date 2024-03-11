const mongoose = require("mongoose");

const SignUpSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
})
const User = mongoose.model("SignUp", SignUpSchema);
module.exports = User;