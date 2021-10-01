const { response } = require('express');
const models = require('../models/reviews.js');
const funcs = require('../../reviews_database_service/helpers.js');

module.exports = {
  getReviewsC: (req, res) => {
    const sort = req.query.sort;
    const count = req.query.count;
    console.log(req.params.product_id)
    models.getReviews(req.params.product_id)
      .then(data => {
        //console.log(funcs.organizePhotos(data))
        data.forEach(review => {
          var photosObj = funcs.organizePhotos(review)
          delete review.photo_url
          delete review.photo_id
          review.photo = photosObj
          console.log('REVIEW', review)
        })
        return data;
      })
      .then(newReviews => {
        if(sort || count) {
          funcs.handleSortAndCount(newReviews, sort, count)
        }
        return newReviews;
      })
      .then(newReviews => {
        console.log('newReviews', newReviews)
        res.send(newReviews);
      })
      .catch(err => {
        console.log('Wumbo', err)
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
  getMetaData: (req, res) => {
    console.log(req.params.product_id)
    models.getMetaData(req.params.product_id)
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.send(err)
    })
  },
  postReview: (req, res) => {
    console.log(req.body)
    models.postReview(req.body)
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.send(err)
    })
  }
}