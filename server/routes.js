
var controller = require("./controllers");
var router = require("express").Router();
const QAController = require("./controllers/qa");
//Connect controller methods to their corresponding routes
//products
// router.get('/products', controller.xx.get);
// router.get('/products/:product_id/styles', controller.xx.get);
// router.get('/products/:product_id/related', controller.xx.get);
// router.get('/cart', controller.xx.get);
// router.post('/cart', controller.xx.get);

//qa
router.get("/qa/questions", QAController.getQuestons);
router.post("/qa/questions", QAController.createQuestion);
router.get(
  "/qa/questions/:question_id/answers",
  QAController.getAnswersOfQuestion
);
router.post("/qa/questions/:question_id/answers", QAController.createAnswer);
router.put(
  "/qa/questions/:question_id/helpful",
  QAController.updateQuestionHelpful
);
router.put(
  "/qa/questions/:question_id/report",
  QAController.updateQuestionReport
);
router.put("/qa/answers/:answer_id/helpful", QAController.updateAnswerHelpful);
router.put("/qa/answers/:answer_id/report", QAController.updateAnswerReport);

module.exports = router;

//reviews


//Connect controller methods to their corresponding routes
//products
router.get('/products', controller.products.getAll);
router.get('/products/:product_id', controller.products.getOne);
router.get('/products/:product_id/styles', controller.products.getStyles);
router.get('/products/:product_id/related', controller.products.getRelated);
router.get('/cart', controller.products.getCart);
router.post('/cart', controller.products.postCart);

//qa






//reviews
//console.log(controller.reviews.getReviewsC)
router.get('/:product_id/reviews/', controller.reviews.getReviewsC);
router.put('/:review_id/helpful', controller.reviews.updateReviewHelpful);
router.put('/:review_id/report', controller.reviews.reportReview);
// router.post('/', xx.postReview);


module.exports = router;

