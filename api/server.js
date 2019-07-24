const express = require("express");
const { bouncer } = require("express-error-bouncer");
const routes = require("../routes");

require("dotenv").config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello API");
});

app.use("/api", routes);
app.use(bouncer);
module.exports = app;
