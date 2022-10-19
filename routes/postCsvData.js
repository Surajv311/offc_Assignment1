const express = require("express");
const router = express.Router();
const csvtojson = require("csvtojson");
const dbModel = require("../models/employee_db");
const csvFilePath = "./csvdata/data.csv";
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });

// ...organisations/{orgId}/members/upload
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

////////////////////////////////////////////////////
// router.post("/:id/members/upload", async (req, res) => {
//   csvtojson()
//     // .fromFile(csvFilePath)
//     .fromFile(req.body.data.csv)
//     .then((data) => {
//       console.log(data);
//       // for (var attributename in data) {
//       //   console.log(attributename + ": " + myobject[attributename]);
//       // }
//       dbModel
//         .insertMany(data)
//         .then((result) => {
//           res.status(200).json(result);
//           console.log(result);
//         })
//         .catch((err) => {
//           res.status(500).json({
//             error: "Unable to insert employee csv data to collection",
//           });
//           console.log(err);
//           // dbModel
//           //   .insertMany(data)
//           //   .then(function () {
//           //     console.log("Data inserted");
//           //   })
//           //   .catch(function (e) {
//           //     console.log(e);
//         });
//     });
// });
