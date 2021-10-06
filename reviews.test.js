const app = require('./server/index.js')
const request = require('supertest')
const routes = require('./server/routes.js')



describe("GET :product_id/reviews", () => {
  test("It should respond with an array of reviews",  (done) => {
    request(app)
    .get('/37313/reviews')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .then(response => {
      expect(response.statusCode).toBe(200)
      done();
    })
    .catch(err => done(err))
  });
});








 // expect(response.body).toContain({
    //   "product": 37313,
    //   "page": 1,
    //   "count": 5,
    //   "results": [
    //     {
    //       "review_id": 214829,
    //       "rating": 2,
    //       "summary": "Et quos molestias rerum provident recusandae omnis in itaque nihil.",
    //       "recommend": true,
    //       "response": "null",
    //       "body": "Suscipit pariatur quia facere. Nobis aut iste repellat accusantium est nulla eaque quia veniam. Omnis non eligendi tempora reprehenderit tenetur. Minima asperiores et id natus ut odit assumenda perferendis. Qui impedit porro et culpa rerum praesentium et sit suscipit. In est maiores fugiat facilis ex qui.",
    //       "date": "2020-08-17T20:50:07.000Z",
    //       "reviewer_name": "Percival.Hartmann66",
    //       "helpfulness": 13,
    //       "reported": false,
    //       "photos": [
    //         {
    //           "id": 101672,
    //           "url": "https://images.unsplash.com/photo-1554260570-9140fd3b7614?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
    //         }
    //       ]
    //     }
    //   ]
    // });