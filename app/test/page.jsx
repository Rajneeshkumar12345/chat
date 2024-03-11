const express = require("express");
require("./db/config");
const User = require("./db/User");
const Product = require("./db/Product");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");
const port = 5000;

const Jwt = require("jsonwebtoken");
const jwtKey = "e-comm";

app.use(express.json());
// Enable CORS for all routes
app.use(cors());

// register API  ********************************
app.post("/register", async (req, resp) => {
  // App level middle ware
  try {
    const existUser = await User.findOne({ email: req.body.email });
    if (existUser) {
      return resp
        .status(400)
        .send({ error: "User with this email already exists" });
    }
    let user = new User(req.body);
    let result = await user.save();
    // Hide password before sending the response
    result = result.toObject();
    delete result.password;

    Jwt.sign({ user }, jwtKey, { expiresIn: "2h" }, (err, token) => {
      if (err) {
        resp.send({
          error: "Something went worng, Please try again after sometime",
        });
      }
      const naemee = resp.status(201).send({
        success: "You are successfully Signup !",
        user: result,
        auth: token,
      });
      console.log(naemee);
    });

    // Hide password before sending the response
    // result = result.toObject();
    // delete result.password;

    // resp
    //   .status(201)
    //   .send({ success: "You are successfully Signup !", user: result });
    console.log(result);
  } catch (error) {
    resp.status(500).send({ error: "Internal Server Error" });
    console.error("Error during user registration:", error);
  }
});

// login API  ********************************
app.post("/login", async (req, resp) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    // console.log(user);
    if (user) {
      // resp.send(user);
      Jwt.sign({ user }, jwtKey, { expiresIn: "9h" }, (err, token) => {
        if (err) {
          resp.send({
            error: "Something went worong, Please try after sometime",
          });
        }
        resp.status(200).send({
          success: "You are Logged in successfully !",
          user: user,
          auth: token,
        });
      });
    } else {
      // resp.send({ result: "Email or Password not matched" });
      resp.status(400).send({ error: "Email or Password not matched" });
    }
  } else {
    resp.status(500).send({ error: "Internal Server Error" });
    // resp.send({ result: "Email or Password not matched" });
  }
});

// add product API  ****************************************
app.post("/add-product", verifyToken, async (req, resp) => {
  let product = new Product(req.body);
  let result = await product.save();
  resp.send({ result });
});

// get product API  ********************************
// app.get("/products", verifyToken, async (req, resp) => {
//   let products = await Product.find();
//   if (products.length > 0) {
//     resp.send(products);
//   } else {
//     resp.send({ result: "No product find" });
//   }
// });
// get product API with pagination logic  ********************************
app.get("/products", verifyToken, async (req, resp) => {
  const page = parseInt(req.query.page) || 1; // Parse the page number from query parameters
  const pageSize = parseInt(req.query.pageSize) || 200; // Set a default pageSize or parse from query parameters

  const skip = (page - 1) * pageSize; // Calculate the number of documents to skip

  try {
    const products = await Product.find().skip(skip).limit(pageSize); // Fetch products for the current page
    const totalCount = await Product.countDocuments(); // Get the total count of products

    resp.send({
      products,
      totalCount,
      totalPages: Math.ceil(totalCount / pageSize),
      currentPage: page,
      pageSize,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    resp.status(500).send({ result: "Internal Server Error" });
  }
});

// delete product API  ********************************
app.delete("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.deleteOne({ _id: req.params.id });
  resp.send(result);
});

//get product for updating  API *************************
app.get("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ error: "No record find" });
  }
});

// when got product then update API *************************
app.put("/product/:id", verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  resp.send(result);
});

// Search API ******************************
app.get("/search/:key", verifyToken, async (req, resp) => {
  let result = await Product.find({
    $or: [
      { name: { $regex: req.params.key } },
      { price: { $regex: req.params.key } },
      { category: { $regex: req.params.key } },
      { company: { $regex: req.params.key } },
    ],
  });
  resp.send(result);
});

function verifyToken(req, resp, next) {
  let token = req.headers["authorization"];
  if (token) {
    token = token.split(" ")[1];
    // console.log("hiiiii", token);
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    });
  } else {
    resp.status(403).send({ result: "Please add token with headers" });
  }
}
const passwordResetTokens = {};
app.post("/forgot-password", async (req, resp) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return resp.status(404).json({ error: "User not found" });
    }
    const token = Math.random().toString(36).slice(2);
    passwordResetTokens[email] = token;
    console.log("Token", token);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "your-email@gmail.com",
        pass: "your-email-password",
      },
    });

    const mailOptions = {
      from: "your-email@gmail.com",
      to: email,
      subject: "Password Reset",
      text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: "Failed to send reset email" });
      }
      console.log("Email sent: " + info.response);
      resp.json({ success: "Reset email sent successfully" });
    });
  } catch (error) {
    console.error("Error during forgot password:", error);
    resp.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const connectDB = async () => {
//     mongoose.connect("mongodb://localhost:27017/e-comm");
//     const productSchema = new mongoose.Schema({});
//     const product = mongoose.model("product", productSchema);
//     const data = await product.find();
//     console.log(data);
// }

// connectDB();
