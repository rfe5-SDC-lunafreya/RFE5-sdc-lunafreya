const models = require('../models/reviews.js');

module.exports = {
  getReviewsC: (req, res) => {
    console.log(req.params.product_id)
    models.getReviews(req.params.product_id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.log('get CLAT', err)
        res.send(err)
      })
  },

  reportReview: (req, res) => {
    console.log(req.params)
    models.reportReview(req.params.review_id)
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.send(err)
    })
  }
}