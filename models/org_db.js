const mongoose = require("mongoose");

const org_schema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },

  org_name: {
    type: String,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Org_Data", org_schema);
