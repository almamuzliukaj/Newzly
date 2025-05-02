const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");

// Ngarkon variablat nga .env në rrënjë
require("dotenv").config(); // kjo duhet të jetë e para


const app = express();
app.use(cors());
app.use(express.json());

// Lidhja me MongoDB
mongoose.connect(process.env.MONGO_URI)

  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Rrugët API
app.use("/api/auth", authRoutes);

// Fillon serverin
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
