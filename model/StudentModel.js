const mongoose = require("mongoose");

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    maxlength: [12, "Please no can not be more than 12."],
  },
  regd_no: String,
  gender: String,
  address: String,
});

module.exports = Student = mongoose.model("student", StudentSchema);
