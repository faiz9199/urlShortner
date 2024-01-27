const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const app = express();
const PORT = process.env.PORT || 4000;
require('dotenv').config()
app.use(bodyParser.json());
app.use(express.urlencoded({extended: false}))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

const urlRoutes = require("./routes/urlRoutes");
const staticRoutes = require('./routes/staticRoutes')

app.use("/url", urlRoutes);
app.use('/', staticRoutes)

app.listen(PORT, () => {
  console.log(`Server listening on port:${PORT}`);
});
