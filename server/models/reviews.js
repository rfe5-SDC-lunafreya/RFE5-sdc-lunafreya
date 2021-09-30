const db = require('../../reviews_database_service/dbConnection.js')
//? YUGE: to_timestamp(reviews.date / 1000) AS date


module.exports = {
  //? NO CHARACTERISTICS OR REPORTED
  getReviews: function (product_id) {
    const data = db.pool
   console.log(product_id)
    return data.query(`SELECT DISTINCT
    reviews.id AS reviews_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, to_timestamp(reviews.date / 1000) AS date, reviews.reviewer_name, reviews.helpfulness, products.name AS product_name, reviews_photos.url AS photo_url, reviews_photos.id AS photo_id
    FROM reviews LEFT JOIN reviews_photos
        ON reviews_photos.review_id = reviews.id,
    reviews_characteristics, characteristics, products
    WHERE reviews.product_id = ${product_id}
    AND reviews_characteristics.review_id = reviews.id
    AND characteristics.id = reviews_characteristics.characteristic_id
    AND reviews.product_id = products.id;`)
    .then(responseData => {
      console.log('wumbo')
      console.log(responseData.rows)
      return responseData.rows;
    })
    .catch(err => {
      console.log('ERROR MODEL', err)
    })
  },

  reportReview: function(review_id) {
    const data = db.pool;
    console.log(review_id)
    return data.query(`UPDATE reviews SET reported = TRUE WHERE id=${review_id};`)
    .then(response => {
      console.log('successful report', response)
    })
    .catch(err => {
      console.log('ERROR reporting', err)
    })
  }


}

