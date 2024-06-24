require("dotenv").config();
const express = require("express");
const connectDB = require("./configs/DbConn");
const cookieParser = require("cookie-parser");
const { default: mongoose } = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;


connectDB();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.use("/worko/user", require("./routes/user"));


mongoose.connection.on("open", () => {
    console.log("Connected to DB Successfully.");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}.`);
    });
});