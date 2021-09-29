const pool = require('./dbConnection.js')

const getReviews = (product_id) => {
  //need to translate reviews id to have distinct difference in joins.
  // to_timestamp(reviews.date / 1000) AS date translate date into readable
  // translate characteristics data into easier use

pool.pool.query(`SELECT DISTINCT
reviews.id AS reviews_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, to_timestamp(reviews.date / 1000) AS date, reviews.reviewer_name, reviews.helpfulness, reviews.reported, reviews_characteristics.value AS characteristics_value, reviews_characteristics.characteristic_id AS characteristics_id, characteristics.name AS characteristics_name, products.name AS product_name, reviews_photos.url AS photo_url, reviews_photos.id AS photo_id
FROM reviews LEFT JOIN reviews_photos
    ON reviews_photos.review_id = reviews.id,
reviews_characteristics, characteristics, products
WHERE reviews.product_id = ${product_id}
AND reviews_characteristics.review_id = reviews.id
AND characteristics.id = reviews_characteristics.characteristic_id
AND reviews.product_id = products.id;`), (err, res) => {
  if (err) {
    console.log('Error getting reviews', err)
  } else {
    console.log('response from get reviews', res)
  }
}
}
console.log(getReviews(pool));
/* need:
reviews id
ratings
summary
recommend
response
body
data
helpfullness
reported
characteristics (all)
photos
*/