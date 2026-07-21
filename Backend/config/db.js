const mongoose = require("mongoose");
require("dotenv").config();

const mongoUrl = process.env.mongoUrl || "mongodb://127.0.0.1:27017/daily_objects";
const connection = mongoose.connect(mongoUrl);

module.exports = connection;

