var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
//products
router.get('/products', controller.products.getAll);
// router.get('/products/:product_id/styles', controller.xx.get);
// router.get('/products/:product_id/related', controller.xx.get);
// router.get('/cart', controller.xx.get);
// router.post('/cart', controller.xx.get);


//qa






//reviews

module.exports = router;