const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

require("dotenv").config();
const db = require("./models");
db.sequelize.sync();

app.get("/", (req, res) => res.send("API Running"));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/chargers", require("./routes/charger.routes"));

module.exports = app;
