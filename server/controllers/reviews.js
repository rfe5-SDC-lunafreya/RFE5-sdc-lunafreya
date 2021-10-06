const { response } = require('express');
const models = require('../models/reviews.js');
const funcs = require('../../reviews_database_service/helpers.js');
const reviews = require('../models/reviews.js');

module.exports = {
  getReviewsC: (req, res) => {
    const sort = req.query.sort;
    const count = req.query.count;
    const page = req.query.page;
    console.log(req.params.product_id)

    models.getReviews(req.params.product_id)
      .then(data => {
        console.log('DATA OUTPUT', data)
          var final = funcs.organizeReviews(data, count, page);
          data = final;
        return data;
      })
      .then(newReviews => {
        if(sort || count) {
          funcs.handleSortAndCount(newReviews, sort, count)
        }
        return newReviews;
      })
      .then(newReviews => {
        //console.log('newReviews', newReviews)
        res.status(200).send(newReviews);
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
    var product_id = req.params.product_id

    models.getMetaData(product_id)
    .then(data => {
      console.log('CONTROLLER DATA', data.characteristics)
      var characteristics = funcs.organizeCharacteristics(data.characteristics)
      var returnedMeta = funcs.organizeMeta(data.reviewStuff, characteristics, product_id)

      return returnedMeta;
    })
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.send(err)
    })
  },

  postReview: (req, res) => {
    console.log('req', req.body)
    models.postReview(req.body)
    .then(response => {
      res.send(response)
    })
    .catch(err => {
      res.send(err)
    })
  }
}