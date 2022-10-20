const express = require("express");
const router = express.Router();
const csvtojson = require("csvtojson");
const dbModel = require("../models/employee_db");
const csvFilePath = "./csvdata/data.csv";
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

// to fix ~ organisations/{orgId}/members/upload
router.post("/:id/members/upload", async (req, res) => {
  csvtojson()
    .fromFile(csvFilePath)
    .then((data) => {
      console.log(data);
      dbModel
        .insertMany(data)
        .then(function () {
          console.log("Data inserted");
        })
        .catch(function (e) {
          console.log(e);
        });
    });
});

module.exports = router;
