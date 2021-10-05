const db = require('../../reviews_database_service/dbConnection.js')
//? YUGE: to_timestamp(reviews.date / 1000) AS date


module.exports = {
  //? UNFORMATTED TOTAL DATA. MUST BE MANIPULATED FOR EXIT
  getReviews: function (product_id) {
    const data = db.pool
   console.log(product_id)
    return data.query(`SELECT DISTINCT reviews.product_id AS product, reviews.id AS reviews_id, reviews.rating, reviews.summary, reviews.recommend, reviews.response, reviews.body, to_timestamp(reviews.date / 1000) AS date, reviews.reviewer_name, reviews.helpfulness, reviews.reported, reviews_photos.url AS photo_url, reviews_photos.id AS photo_id
    FROM reviews LEFT JOIN reviews_photos
        ON reviews_photos.review_id = reviews.id, products
    WHERE reviews.product_id = ${product_id}
    AND reviews.product_id = products.id;` )
    .then(responseData => {
     // console.log(responseData.rows)
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
  },

  updateReviewHelpful: function (review_id) {
    const data = db.pool;
    return data.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id=${review_id}`)
    .then(response => {
      console.log(`posted review ${review_id} as helpful`, response)
    })
    .catch(err => {
      console.log(('ERROR adding helpful note', err))
    })
  },
// LEFT JOIN characteristics ON characteristics.product_id = reviews.product_id, reviews_characteristics, products
//AND reviews_characteristics.review_id = reviews.id
  // AND characteristics.id = reviews_characteristics.characteristic_id
  // AND reviews.product_id = products.id;`
  getMetaData: function (product_id) {
  const QS = `SELECT DISTINCT
  reviews.id AS reviews_id, reviews.rating, reviews.recommend FROM reviews WHERE reviews.product_id = ${product_id};`

    const data = db.pool
     return data.query(QS)
    .then(response => {
        console.log('ANDONE', response.rows)
        const QS = `SELECT characteristics.name AS characteristics_name, characteristics.id AS characteristics_id, reviews_characteristics.value AS characteristics_value FROM reviews_characteristics RIGHT OUTER JOIN characteristics ON reviews_characteristics.characteristic_id = characteristics.id WHERE characteristics.product_id = ${product_id} GROUP BY characteristics.name, characteristics.id, reviews_characteristics.value;`

       return data.query(QS)
        .then(responseData => {
          var returnable = {}
          returnable.reviewStuff = response.rows;
          returnable.characteristics = responseData.rows;
          // response.rows.push(responseData.rows)
          console.log('AND', response.rows)
          return returnable
        })
        .catch(err => {
          console.log('err here', err)
        })

      })
      .catch(err => {
        console.log('ERROR MODEL', err)
      })
    },

  // ?convert date?  ROUND(EXTRACT(EPOCH FROM NOW())::float*1000)

  //! Going to have to refurbish incoming data and break it into pieces to place in different tables.
  //review properties that start as base. Time from current moment of post. reported, a response to that review, and whether its helpful or not.
// ? how do i get the review id to insert into review_photos
  postReview: function (review) {
    const data = db.pool;
    const photos = function (review) {
      if (!review.photos) {
      return ''
    }
    var returnable = '';
    for (var i = 0; i < review.photos.length; i++) {
      const values = `(SELECT id, '${review.photos[i]}'),`
      returnable+= values;
    }
    // need to eliminate the comma from final insert
    returnable = returnable.slice(0, -1);
    return returnable
  }
  // console.log(photos(review))
    const reviewsQS = `INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES(${review.product_id}, ${review.rating}, ROUND(EXTRACT(EPOCH FROM NOW())::float*1000), '${review.summary}', '${review.body}', ${review.recommend}, FALSE, '${review.name}', '${review.email}', '', 0);`
    return data.query(reviewsQS)
    .then((res) => {
      console.log('successfully logged Review to db')
      const photosQS = `INSERT INTO reviews_photos(review_id, url) VALUES(${photos(review)});`
      return data.query(photosQS)
      .then(res => {
        const characteristicsQS = ``
      })
    })
    .catch(err => {
      console.log('ERROR POST', err)
    })
}
}





/*

(SELECT id, '[object Object]'),(SELECT id, '[object Object]'))


WITH reviews_insert AS (INSERT INTO reviews(product_id, rating, data, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES(2, 5, ROUND(EXTRACT(EPOCH FROM NOW())::float*1000), 'BLUE RULES', 'Blue key 4: has value 64, key 3: value 63, key 2: value 62, key 1: 61 ', true, FALSE, 'Bb Blue', 'bluesRoom@gmail.com', '', 0) RETURNING id),

photos_insert AS (INSERT INTO reviews_photos(review_id, url)

VALUES((SELECT id, '{1, 'Blue'}'),(SELECT id, '{2, 'Images'}')) FROM reviews_insert RETURNING * );

SELECT pg_catalog.setval(pg_get_serial_sequence('reviews', 'id'), MAX(id)) FROM reviews;
*/
