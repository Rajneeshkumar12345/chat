const User = require("../models/SignUp");

const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword })
        await user.save();
        res.json({ user });
        console.log("User register Successfully");
    } catch {
        res.status(400).json({ error: error.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            throw new Error("User not found");
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        console.log(isValidPassword, 'isValidPassword');
        if (!isValidPassword) {
            throw new Error("Invalid password");
        }
        res.json({ user });
        console.log("User login Successfully");
    } catch {
        res.status(400).json({ error: error.message });
    }
}