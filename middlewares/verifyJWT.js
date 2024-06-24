const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {

    const cookies = req.cookies;
    const token = cookies.token;
    if (!token) {
        return res.status(403).json({ message: "Token is required" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded._id;
        // console.log(decoded._id);
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};
module.exports = verifyJWT;