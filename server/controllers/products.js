const models = require('../models');

module.exports = {
  getAll: function (req, res) {
    models.products.getAll((err, data) => {
      if(err) {
        res.send(err)
      } else {
        res.send(data)
      }
    })
  }
}