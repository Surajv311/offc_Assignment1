const mongoose = require("mongoose");
const emailvalidator = require("email-validator");
var validateDate = require("validate-date");

const employeeSchema = new mongoose.Schema({
  employee_id: {
    type: Number,
    required: true,
    unique: true,
    alias: "Employee ID",
  },

  first_name: {
    type: String,
    required: true,
    alias: "First Name",
    validate: {
      validator: checkName,
      message: (props) => `${props.value} is not a valid first name`,
    },
  },

  middle_name: {
    type: String,
    // not mandatory
    alias: "Middle Name",
  },

  last_name: {
    type: String,
    required: true,
    alias: "Last Name",
    validate: {
      validator: checkName,
      message: (props) => `${props.value} is not a valid last name`,
    },
  },

  email_id: {
    type: String,
    // not mandatory
    alias: "Email ID",
    validate: {
      validator: checkEmail,
      message: (props) => `${props.value} is not a valid email`,
    },
  },

  date_of_birth: {
    type: String,
    required: true,
    alias: "Date of Birth",
    validate: {
      validator: checkDate,
      message: (props) => `${props.value} is not a valid date`,
    },
  },

  gender: {
    type: String,
    required: true,
    alias: "Gender",
    validate: {
      validator: checkGender,
      message: (props) => `${props.value} is not a valid gender`,
    },
  },
});

function checkEmail(value) {
  if (emailvalidator.validate(value)) {
    return true;
  } else {
    return false;
  }
}

function checkName(value) {
  if (value.length >= 3) {
    return true;
  } else {
    return false;
  }
}

function checkDate(value) {
  if (validateDate(value, (responseType = "boolean"))) {
    return true;
  } else {
    return false;
  }
}

function checkGender(value) {
  var gender = value.toLowerCase();
  // converted to lowercase to check all the genders at once without worrying about small/capital letters
  if (gender == "male" || gender == "female" || gender == "other") {
    return true;
  } else {
    return false;
  }
}

module.exports = mongoose.model("Employee_Data", employeeSchema);
