const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
    } catch (error) {
        console.error("MongoDB connection failed.");
        process.exit(1);
    }
};
module.exports = connectDB;