const mongoose = require("mongoose");

const AnswerPhotoSchema = new mongoose.Schema({
  id: String,
  answer_id: String,
  url: String,
});

const AnswerPhotoModel = mongoose.model("answer_photo", AnswerPhotoSchema);

module.exports = AnswerPhotoModel;
