const express = require('express');
const router = express.Router();
//return 'hello';
// Require the controllers WHICH WE DID NOT CREATE YET!!
const product_controller = require('../controllers/product.controller');
const login_controller = require('../controllers/login_controller');


// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
//router.get('/add', product_controller.product_add);
router.post('/create', product_controller.product_create);
//router.get('/:id', product_controller.product_details);
router.put('/:id/update', product_controller.product_update);
router.delete('/:id/delete', product_controller.product_delete);

router.get('/list', product_controller.product_list);
router.post('/update', product_controller.product_edit);
router.post('/delete', product_controller.product_delete);

router.post('/login', login_controller.login);
module.exports = router;