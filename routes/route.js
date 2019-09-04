const express = require('express');
const router = express.Router();

const login_controller = require('../controllers/login_controller');
const product_controller = require('../controllers/product.controller');


router.get('/', login_controller.index);
router.post('/login', login_controller.index);
router.get('/register', login_controller.register);
router.post('/register', login_controller.register);
router.get('/dashboard', login_controller.dashboard);
router.get('/profile', login_controller.profile);
router.get('/profile/edit', login_controller.profileEdit);
router.post('/profile/edit', login_controller.profileUpdate);
router.get('/logout', login_controller.logout);



//-------------Products---------
// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
//router.get('/add', product_controller.product_add);
router.post('/products/create', product_controller.product_create);
//router.get('/:id', product_controller.product_details);
router.put('/products/:id/update', product_controller.product_update);
router.delete('/:id/delete', product_controller.product_delete);

router.get('/products', product_controller.product_list);
router.post('/products/update', product_controller.product_edit);
router.post('/products/delete', product_controller.product_delete);


module.exports = router;