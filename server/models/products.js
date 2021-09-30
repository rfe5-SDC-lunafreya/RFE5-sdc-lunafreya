const db = require('../database/products/index.js');

module.exports = {
  getAll: function (callback) {
    var queryString = "SELECT * FROM products LIMIT 5";
    db.query(queryString, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });
  },
};

// getAll();
