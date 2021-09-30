const express = require("express");
const router = express.Router();

const QAController = require("./qa");

router.get("/questions", QAController.getQuestons);
router.post("/questions", QAController.createQuestion);
router.get(
  "/questions/:question_id/answers",
  QAController.getAnswersOfQuestion
);
router.post("/questions/:question_id/answers", QAController.createAnswer);

router.put(
  "/questions/:question_id/helpful",
  QAController.updateQuestionHelpful
);
router.put("/questions/:question_id/report", QAController.updateQuestionReport);

router.put("/answers/:answer_id/helpful", QAController.updateAnswerHelpful);
router.put("/answers/:answer_id/report", QAController.updateAnswerReport);

module.exports = router;
