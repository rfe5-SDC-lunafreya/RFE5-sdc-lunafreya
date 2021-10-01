const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  id: String,
  question_id: String,
  body: String,
  date_written: String,
  answerer_name: String,
  answerer_email: String,
  reported: String,
  helpful: String,
});

const AnswerModel = mongoose.model("answer", AnswerSchema);

module.exports = AnswerModel;
