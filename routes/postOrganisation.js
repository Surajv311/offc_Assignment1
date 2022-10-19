require("dotenv").config();

const express = require("express");
const router = express.Router();
const orgModel = require("../models/org_db");
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;

router.post("/organisations", async (req, res) => {
  console.log("Posting organisation data into db");

  const data = new orgModel({
    id: req.body.id,
    org_name: req.body.org_name,
  });

  db.collection("org_datas")
    .insertOne(data)
    .then((result) => {
      res.status(200).json(result);
      console.log(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Unable to insert data to collection" });
      console.log(err);
    });
});

module.exports = router;
