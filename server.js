require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.once("open", () => console.log("Connected to db"));
app.listen(3000, () => console.log("Server listening to port 3000"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const postOrganisation = require("./routes/postOrganisation");
app.use("/", postOrganisation);

const postCsvData = require("./routes/postCsvData");
app.use("/organisations", postCsvData);

const getOrganisation = require("./routes/getOrganisation");
app.use("/", getOrganisation);

// app.post("/post", function (req, res) {
//   console.log(req.body.file);
//   res.redirect(307, "/organisations");
// });

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
