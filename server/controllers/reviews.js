const { response } = require('express');
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
  },

  updateReviewHelpful: (req, res) => {
    models.updateReviewHelpful(req.params.review_id)
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.send(err)
    })
  },

  // postReview: (req, res) => {
  //   models.postReview(req.params.data)
  //   .then(response => {
  //     res.send(response)
  //   })
  //   .catch(err => {
  //     res.send(err)
  //   })
  // }
}