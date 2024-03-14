const express = require("express");

const authControllers = require("../controllers/authControllers");
const authUtils = require("../utils/auth");
const multerInstace = require("../config/multer");


const router = express.Router();

router.post("/register", authControllers.register);
router.post("/login", authControllers.login);
router.post("/send_recovery_email", authControllers.recoveryMail);
// router.post("/cart", authControllers.cart);



router.post("/product",multerInstace.upload.single("image"),authControllers.createProduct);





// router.get("/", authControllers.getProducts);
// router.get("/:id", authControllers.getProductById);
// router.delete("/:id", authControllers.removeProduct);






router.get("/protected-route", authUtils.authenticate, (req, res) => {
    res.json({ message: "protected route accessed" });
})

module.exports = router;