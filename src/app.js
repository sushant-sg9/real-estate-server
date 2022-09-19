const express = require("express");
const app = express();
const propertyRoutes = require("./routes/propertyRoutes");
const userRoutes = require("./routes/user");
const loginRoutes = require("./routes/login");
const cors = require("cors");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

app.use("/", userRoutes);
app.use("/",loginRoutes);

// app.use("/properties", propertyRoutes);

module.exports = app;
