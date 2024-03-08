const express = require("express");

const authControllers = require("../controllers/authControllers");
const authUtils = require("../utils/auth");

const router = express.Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/send_recovery_email", authControllers.recoveryMail);

router.get("/protected-route", authUtils.authenticate, (req, res) => {
    res.json({ message: "protected route accessed" });
})

module.exports = router;