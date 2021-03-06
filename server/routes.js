var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
//products
// router.get('/products', controller.products.get);
// router.get('/products/:product_id/styles', controller.xx.get);
// router.get('/products/:product_id/related', controller.xx.get);
// router.get('/cart', controller.xx.get);
// router.post('/cart', controller.xx.get);


//qa






//reviews
//console.log(controller.reviews.getReviewsC)
router.get('/:product_id/reviews/', controller.reviews.getReviewsC);
router.get('/:product_id/reviews/meta', controller.reviews.getMetaData)
router.put('/:review_id/helpful', controller.reviews.updateReviewHelpful);
router.put('/:product_id/report', controller.reviews.reportReview);
router.post('/reviews', controller.reviews.postReview);

router.get("/loaderio-12d49e83f3cab9566bec04d226dd1c7a", (req, res) => {
  res.send("loaderio-12d49e83f3cab9566bec04d226dd1c7a")
});

module.exports = router;