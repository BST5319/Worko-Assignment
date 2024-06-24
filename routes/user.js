const { Router } = require("express");
const { handleLogin, handleLogout } = require("../controllers/authController");
const verifyJWT = require("../middlewares/verifyJWT");
const {
    createNewUserValidator,
    validateLogin,
    validateUpdateUserCompletely,
    validateGetUser,
    validateUpdateUserPartially
} = require("../utils/validators");
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUserCompletely,
    updateUserPartially,
    deleteUser
} = require("../controllers/userController");
const router = Router();

router
    .post("/login", validateLogin, handleLogin)
    .post("/create-new-user", createNewUserValidator, createUser)
    .get("/logout", handleLogout)
    .use(verifyJWT)
    .get("/list-users", getAllUsers)
    .get("/:userId", validateGetUser, getUserById)
    .put("/:userId", validateUpdateUserCompletely, updateUserCompletely)
    .patch("/:userId", validateUpdateUserPartially, updateUserPartially)
    .delete("/:userId", validateGetUser, deleteUser);


module.exports = router;    