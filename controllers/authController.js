const User = require("../models/User");
const { compare } = require("bcrypt");
const { sign } = require("jsonwebtoken");


const cookieOptions = {
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: "none",
    httpOnly: true,
    secure: true
};

const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const match = await compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = sign({ _id: user._id }, process.env.JWT_SECRET);

        res.status(200)
            .cookie("token", token, cookieOptions)
            .json({ message: "Logged in successfully." });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

const handleLogout = (req, res) => {
    try {
        res.clearCookie("token").status(200).json({ message: "Logged out successfully." });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};
module.exports = { handleLogin, handleLogout };