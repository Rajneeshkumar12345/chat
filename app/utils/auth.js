const jwt = require("jsonwebtoken");

exports.authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    console.log(token, "this is a token");
    if (!token) {
      throw new Error("Unauthorized");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    console.log(req.user, decoded.user, "Authentication");
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
