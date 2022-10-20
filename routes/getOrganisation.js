const express = require("express");
const router = express.Router();
const dbModel = require("../models/employee_db");
const mongoose = require("mongoose");
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true });
const db = mongoose.connection;

router.get("/organisations", (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const size = parseInt(req.query.size);

  var ans = [];
  var db_data = db
    .collection("employee_datas")
    .find()
    .skip(page * size)
    .limit(size);
  db_data
    .forEach((d) => ans.push(d))
    .then(() => {
      console.log(ans);
      res.status(200).json(ans);
    })
    .catch(() => {
      console.log("error- cannot GET the data & paginate it");
      res.status(500);
    });
});

module.exports = router;
