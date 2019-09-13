const Blog = require('../models/blog');
const { check } = require('express-validator/check');
const constant = require('../constant.js');
const util = require('util')
var moment = require('moment');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Welcom to Controller Greetings from the Test controller!');

};


//==========================
exports.index = function (req, res) {
    var moment = require('moment');
    //let userid = session.userid;   
    //console.log(session); 
    let dataObj = {};
    dataObj.title = 'Blog - '+constant.SITE_TITLE;
    Blog.find(function (err, result) {
       if(err){
             req.flash('error',constant.MSG_SOMETHING_WRONG);
             res.redirect('/dashboard');
         }else {           
            dataObj.moment = moment;
            dataObj.error = req.flash('error');
            dataObj.success = req.flash('success');
            res.render('blog/list', { dataSet: dataObj, resultSet:result, moment:moment });                 
         }

    });
};
exports.addBlog = function(req,res){
  session = req.session;
  let userid = session.userid;   
    if(req.method=='POST'){
        
        //console.log(req.body); 
        req.checkBody("subject", "Required").notEmpty();
        req.checkBody("title", "Required").notEmpty();
        req.checkBody("description", "Required").notEmpty();
       
        var errors = req.validationErrors();
        if(errors){
            req.flash('error', constant.REQUIRED_FIELDS);
            res.redirect('/');
        }else{          
            let newBlog = new Blog();
            newBlog.course_id   = req.body.subject;
            newBlog.title = req.body.title;
            newBlog.message  = req.body.description;
            newBlog.user_id = userid;  
            newBlog.status = 0;           
            newBlog.createdAt = Date.now();
            newBlog.updatedAt = Date.now();

            newBlog.save(function(err) {
                if (err){
                  console.log('Error in Saving bbs: '+err);  
                  res.send({"result":false});
                }
                req.flash('success',constant.MSG_SAVED_RECORD);
                res.redirect('/blogs');
            });

        }


    }else{
       var dataObj = {};
       dataObj.title = constant.SITE_TITLE;
       dataObj.error = req.flash('error');
       dataObj.success = req.flash('success');
       //console.log('PK'); 
       res.render('blog/add', {dataSet:dataObj});
    }
}

//===========================