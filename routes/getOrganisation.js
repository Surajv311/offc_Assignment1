const express = require("express");
const router = express.Router();
const dbModel = require("../models/employee_db");

const test_data = [
  { id: 1, data: "d1" },
  { id: 2, data: "d2" },
  { id: 3, data: "d3" },
  { id: 4, data: "d4" },
  { id: 5, data: "d5" },
  { id: 6, data: "d6" },
  { id: 1, data: "d1" },
  { id: 2, data: "d2" },
  { id: 3, data: "d3" },
  { id: 4, data: "d4" },
  { id: 5, data: "d5" },
  { id: 6, data: "d6" },
];

router.get("/organisations", paginateData(test_data), (req, res) => {
  res.json(res.paginateData);
});

function paginateData(data) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const size = parseInt(req.query.size);

    const startIndex = (page - 1) * size;
    const endIndex = page * size;

    const result = data.slice(startIndex, endIndex);
    // res.json(result);

    const results = {};

    // 0 indexing of data
    // if (endIndex < (await data.countDocuments().exec())) {
    if (endIndex < data.length) {
      results.next = {
        page: page + 1,
        size: size,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        size: size,
      };
    }

    try {
      //   results.results = await data.find().size(size).skip(startIndex).exec();
      //   res.paginatedResults = results;

      //////
      results.results = result;
      /////

      console.log(results);

      /////
      res.json(results);
      /////
      next();
    } catch (e) {
      res.status(500).json({ message: e.message });
      console.log(e);
    }
  };
}

module.exports = router;
