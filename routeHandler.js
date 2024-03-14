const productRoutes = require("./app/controllers/authControllers")
module.exports = app => {
    app.use("/product", productRoutes.createProduct);
}