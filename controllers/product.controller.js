const Product = require('../models/product.model');
//var flash = require('connect-flash');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Welcom to Controller Greetings from the Test controller!');

};

exports.product_create = function (req, res) {  //console.log(req.body); return false;
    let product = new Product(
        {
            name: req.body.product_name,
            price: req.body.product_price
        }
    );

    product.save(function (err) {
        if (err) {
            console.log(err);
            //return next(err);
        }        
        //req.flash('success', 'Product Added successfully');
        res.redirect('/products');
    })
};

// exports.product_details = function (req, res) {
//     Product.findById(req.params.id, function (err, product) {
//         if (err) return next(err);
//         res.send(product);
//     })
// };

exports.product_update = function (req, res) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};
//--------------------------------------------------
exports.product_list = function (req, res) {
    Product.find(function (err, product) {
        if (err) return next(err);
        res.render('product_view',{
              results: product
        });


    })
};
exports.product_edit = function (req, res) { //console.log(req.body); return false;
    Product.findByIdAndUpdate(req.body.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
       //req.flash("messages", { "success" : "Record udpated successfully" });
       //req.flash('success', 'Record udpated successfully');
       //res.locals.message = req.flash();

       req.session.sessionFlash = {
            type: 'success',
            message: 'Record udpated successfully.'
          }       
        res.redirect('/products');
    });
};

exports.product_delete = function (req, res) {
    Product.findByIdAndRemove(req.body.product_id, function (err) {
        if (err) return next(err);
       //res.send('Deleted successfully!');
       res.redirect('/products');
    })
};