const express = require("express");
const app = express();
const propertyRoutes = require("./routes/property");
const loginRoutes = require("./routes/login");
const cors = require("cors");

// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

app.use("/", loginRoutes);

app.use("/properties", propertyRoutes);

module.exports = app;
