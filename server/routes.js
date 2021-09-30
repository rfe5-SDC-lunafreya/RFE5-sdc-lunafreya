var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes
//products
router.get('/products', controller.products.getAll);
router.get('/products/:product_id', controller.products.getOne);
router.get('/products/:product_id/styles', controller.products.getStyles);
router.get('/products/:product_id/related', controller.products.getRelated);
// router.post('/cart', controller.xx.get);


//qa






//reviews

module.exports = router;