const Product = require('../models/product.model');
const { check } = require('express-validator/check');
const constant = require('../constant.js');
const util = require('util')
var moment = require('moment');

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

//==========================
exports.index = function (req, res) {
    var moment = require('moment');
    //let userid = session.userid;   
    //console.log(session); 
    let dataObj = {};
    dataObj.title = 'All Products - '+constant.SITE_TITLE;
    Product.find(function (err, result) {
       if(err){
             req.flash('error',constant.MSG_SOMETHING_WRONG);
             res.redirect('/dashboard');
         }else {           
            dataObj.moment = moment;
            dataObj.error = req.flash('error');
            dataObj.success = req.flash('success');
            res.render('products/list', { dataSet: dataObj, resultSet:result, moment:moment });                 
         }

    });
};
exports.addProduct = function(req,res){
    if(req.method=='POST'){
        
        //console.log(req.body); 
        req.checkBody("name", "Required").notEmpty();
        req.checkBody("category", "Required").notEmpty();
        req.checkBody("description", "Required").notEmpty();
        req.checkBody("status", "Required").notEmpty();
        req.checkBody("quantity", "Required").notEmpty();
        var errors = req.validationErrors();
        if(errors){
            req.flash('error', constant.REQUIRED_FIELDS);
            res.redirect('/');
        }else{          
            let newProduct = new Product();
            newProduct.name   = req.body.name;
            newProduct.category = req.body.category;
            newProduct.description  = req.body.description;
            newProduct.status = req.body.status;
            newProduct.quantity = req.body.quantity;
            newProduct.price = req.body.price;            
            newProduct.createdAt = Date.now();
            newProduct.updatedAt = Date.now();

            newProduct.save(function(err) {
                if (err){
                  console.log('Error in Saving bbs: '+err);  
                  res.send({"result":false});
                }
                req.flash('success',constant.MSG_SAVED_RECORD);
                res.redirect('/products');
            });

        }


    }else{
        var dataObj = {};
       dataObj.title = constant.SITE_TITLE;
       dataObj.error = req.flash('error');
       dataObj.success = req.flash('success');
       //console.log('PK'); 
       res.render('products/add', {dataSet:dataObj});
    }
}

//===========================