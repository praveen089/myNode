const express = require('express');
const router = express.Router();

const login_controller = require('../controllers/login_controller');
const product_controller = require('../controllers/product.controller');
const blogController = require('../controllers/blogController');
const filesController = require('../controllers/filesController');


router.get('/', login_controller.index);
router.post('/login', login_controller.index);
router.get('/register', login_controller.register);
router.post('/register', login_controller.register);
router.get('/dashboard', login_controller.dashboard);
router.get('/profile', login_controller.profile);
router.get('/profile/edit', login_controller.profileEdit);
router.post('/profile/edit', login_controller.profileUpdate);
router.get('/changepass', login_controller.changepass);
router.post('/changepass', login_controller.changepass);
router.get('/users', login_controller.users);
router.get('/logout', login_controller.logout);



//-------------Products---------
// a simple test url to check that all of our files are communicating correctly.
router.get('/test', product_controller.test);
//router.get('/add', product_controller.product_add);
//router.get('/:id', product_controller.product_details);
router.put('/products/:id/update', product_controller.product_update);
router.delete('/:id/delete', product_controller.product_delete);

router.get('/products', product_controller.index);
router.get('/products/add', product_controller.addProduct);
router.post('/products/add', product_controller.addProduct);
router.post('/products/update', product_controller.product_edit);
router.post('/products/delete', product_controller.product_delete);



router.get('/blogs', blogController.index);
router.get('/blogs/add', blogController.addBlog);
router.post('/blogs/add', blogController.addBlog);
//console.log('Allam');
router.get('/uploads', filesController.index);
router.post('/uploads', filesController.addFile);


module.exports = router;