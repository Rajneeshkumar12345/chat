const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./app/routes/authRoutes");


const app = express();
app.use(cors());
mongoose.connect(require("./app/config/keys").mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

app.use(express.json());


app.use("/api/auth", authRoutes);



// app.use("/", (req, res) => {
//     res.send(`<h1>Hello...</h1>`)
// })

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
