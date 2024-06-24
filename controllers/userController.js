const User = require("../models/User");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false }).select(["-__v", "-createdAt", "-updatedAt", "-_id", "-isDeleted"]);
        if (users.length === 0) {
            return res.status(404).json({ message: "No Data Found." });
        }
        return res.status(200).json({ users: users });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};
const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({ id: req.params.userId, isDeleted: false }).select(["-__v", "-createdAt", "-updatedAt", "-_id", "-isDeleted"]);
        if (!user) {
            return res.status(404).json({ message: "No Data Found with given id." });
        }
        return res.status(200).json({ user: user });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const createUser = async (req, res) => {
    try {
        const { email, password, name, age, city, zipCode } = req.body;
        const isDuplicate = await User.findOne({ email });
        if (isDuplicate) {
            return res.status(400).json({ message: "User already exists.Please user another email !!" });
        }
        const user = await User.create(req.body);
        return res.status(201).json({ message: "User created successfully" });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const updateUserCompletely = async (req, res) => {
    try {
        const { name, age, city, zipCode } = req.body;

        const updatedUser = await User.findOneAndUpdate({ id: req.params.userId }, { name, age, city, zipCode }, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "No Data Found with given id." });
        }
        return res.status(200).json({ message: "User updated successfully" });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const updateUserPartially = async (req, res) => {
    try {
        const { name, age, city, zipCode } = req.body;
        const updatedUser = await User.findOneAndUpdate({ id: req.params.userId }, { name, age, city, zipCode }, { new: true, runValidators: true });
        if (!updatedUser) {
            return res.status(404).json({ message: "No Data Found with given id." });
        }
        return res.status(200).json({ message: "User updated successfully" });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ id: req.params.userId }, { isDeleted: true }, { new: true });
        if (!user) {
            return res.status(404).json({ message: "No Data Found with given id." });
        }
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUserCompletely,
    updateUserPartially, deleteUser
};