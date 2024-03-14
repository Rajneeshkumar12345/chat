const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/SignUp");
const Cart = require("../models/Carts")
const Product = require("../models/Products")

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, phone, password: hashedPassword })
    await user.save();
    res.json({ user });
    console.log("User register Successfully");
  } catch {
    res.status(400).json({ error: error.message });
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Invalid password");
    }

    jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "9h" }, (err, token) => {
      if (err) {
        return res.status(500).json({ error: "Something went wrong, please try again later" });
      }
      res.status(200).json({
        success: "You are logged in successfully!",
        user: user,
        auth: token,
      });
    });

    console.log("User login successfully");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


function sendEmail({ recipient_email, OTP }) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mail_configs = {
      from: process.env.MY_EMAIL,
      to: recipient_email,
      subject: "PASSWORD RECOVERY",
      html: `<!DOCTYPE html>
          <html lang="en" >
          <head>
            <meta charset="UTF-8">
            <title>CodePen - OTP Email Template</title>          
          </head>
          <body>
          <!-- partial:index.partial.html -->
          <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:50px auto;width:70%;padding:20px 0">
              <div style="border-bottom:1px solid #eee">
                <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Something Inc</a>
              </div>
              <p style="font-size:1.1em">Hi,</p>
              <p>Thank you for choosing us. Use the following OTP to complete your Password Recovery Procedure. OTP is valid for 5 minutes</p>
              <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${OTP}</h2>
              <p style="font-size:0.9em;">Regards,<br />Somthing Inc</p>
              <hr style="border:none;border-top:1px solid #eee" />
              <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                <p>Somthing Inc</p>
                <p>1600 Amphitheatre Parkway</p>
                <p>California</p>
              </div>
            </div>
          </div>
          <!-- partial -->
            
          </body>
          </html>`,
    };

    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}
exports.recoveryMail = (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
}


exports.getProducts = async (req, res) => {
  const product = await Product.findOne();
  return product;
}

exports.getProductById = async id => {
  const product = await Product.findById();
  return product;
}

exports.createProduct = async (req, res) => {
  const { name, price } = req.body;
  console.log(name, price)

  try {

    //return res.status(200).json({body:req.file});

    let payload = {
      name: req.body.name,
      price: req.body.price,
      image: req.file.originalname
    }


    let product = await Product.create(payload);
    res.status(200).json({
      status: true,
      data: product
    })
  } catch (error) {
    console.log(error, "hiiiiiiii");
    return res.status(500).json({
      error: error,
      status: false
    })
  }
  // const newproduct = await Product.create(payload);
  // return newproduct;
}

exports.removeProduct = async id => {
  const product = await Product.findByIdAndRemove(id);
  return product
}


exports.cart = async (req, res) => {
  const carts = await Cart.find().populate({
    path: "items.productId",
    select: "name price total"
  });;
  return carts[0];
}