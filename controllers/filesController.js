
//const { check } = require('express-validator/check');

const constant = require('../constant.js');
const util = require('util')
var moment = require('moment');

//var request = require('request');


/*configure the image with multer start*/
var multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/test');
  },
  filename: function (req, file, cb) {
    //cb(null, Date.now() + '.jpg');   
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage }).single('image');

//==========================

exports.index= function(req, res){
  
  let dataObj = {};
  var moment = require('moment');
  dataObj.title = 'Uploads - '+constant.SITE_TITLE;
  dataObj.moment = moment;
  dataObj.error = req.flash('error');
  dataObj.success = req.flash('success');  
   res.render('multiple/addFile',{dataSet: dataObj} );
};


exports.addFile= function(req, res){   
   let dataObj = {};
    dataObj.title = 'Uploads - '+constant.SITE_TITLE;
    dataObj.error = req.flash('error');
    dataObj.success = req.flash('success');  


    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          req.flash('error','A Multer error occurred when uploading.');
          res.redirect('/uploads');
        }else if (err) {
          // An unknown error occurred when uploading.
          req.flash('error','An unknown error occurred when uploading.');
          res.redirect('/uploads');
        }
        req.flash('success', req.file.filename+' file Upload Successfuly.->');
        res.redirect('/uploads');

        });


   
};






// app.post('/uploadfile', upload.single('myFile'), (req, res, next) => {
//   const file = req.file
//   if (!file) {
//     const error = new Error('Please upload a file')
//     error.httpStatusCode = 400
//     return next(error)
//   }
//     res.send(file)
  
// })
//===========================