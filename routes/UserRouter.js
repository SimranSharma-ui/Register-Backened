const express = require("express");

const router = express.Router();

const { registerUser, loginUser ,getAllUsers } = require("../controller/Usercontroller");

router.post("/register", registerUser);


router.post("/login", loginUser);

router.get("/AllUsers",getAllUsers);

module.exports = router;
