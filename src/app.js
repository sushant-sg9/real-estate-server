const express = require("express");
const app = express();
const propertyRoutes = require("./routes/propertyRoutes");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// app.use("/properties", propertyRoutes);

module.exports = app;
