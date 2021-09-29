const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  id: String,
  product_id: String,
  body: String,
  date_written: Date,
  asker_name: String,
  asker_email: String,
  reported: String,
  helpful: String,
});

const QuestionModel = mongoose.model("question", QuestionSchema);

module.exports = QuestionModel;
