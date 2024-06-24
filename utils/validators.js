const { check, validationResult } = require("express-validator");

const validateLogin = [
    check("email").isEmail().withMessage("Email is required."),
    check("password").isLength({ min: 6 }).withMessage("Password is required."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];
const createNewUserValidator = [
    check("email").isEmail().withMessage("Email is required."),
    check("password").isLength({ min: 6 }).withMessage("Password is required."),
    check("name").isLength({ min: 3 }).withMessage("Name is required."),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateGetUser = [
    check("userId").isNumeric().withMessage("User Id is required and must be of type Number"),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateUpdateUserCompletely = [
    check("name").isLength({ min: 3 }).withMessage("Name is required."),
    check("age").isNumeric().withMessage("Age is required."),
    check("city").isLength({ min: 3 }).withMessage("City is required."),
    check("zipCode").isNumeric().withMessage("Zip Code is required."),
    (req, res, next) => {
        const errors = validationResult(req);
        const allowedFields = ["name", "age", "city", "zipCode"];
        const receivedFields = Object.keys(req.body);
        const otherFields = receivedFields.filter((field) => !allowedFields.includes(field));
        if (otherFields.length > 0) {
            return res.status(400).json({ message: "Invalid field(s) provided.", fields: otherFields });
        }
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

const validateUpdateUserPartially = [
    check("name").optional().isLength({ min: 3 }).withMessage("Name must be at least 3 characters long."),
    check("age").optional().isNumeric().withMessage("Age must be a number."),
    check("city").optional().isLength({ min: 3 }).withMessage("City must be at least 3 characters long."),
    check("zipCode").optional().isNumeric().withMessage("Zip Code must be a number."),
    (req, res, next) => {
        const errors = validationResult(req);
        const allowedFields = ["name", "age", "city", "zipCode"];
        const receivedFields = Object.keys(req.body);
        const otherFields = receivedFields.filter((field) => !allowedFields.includes(field));
        if (otherFields.length > 0) {
            return res.status(400).json({ message: "Invalid field(s) provided.", fields: otherFields });
        }
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = {
    validateLogin,
    createNewUserValidator,
    validateUpdateUserCompletely,
    validateGetUser,
    validateUpdateUserPartially
};