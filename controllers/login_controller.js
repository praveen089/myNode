const Login = require('../models/login.model');
const { check } = require('express-validator/check');
const constant = require('../constant.js');
const util = require('util')
var moment = require('moment');

exports.index= function(req, res){
		//console.log(req.body);
	if(req.method == 'POST') {
		req.checkBody("username", "Required").notEmpty();
		req.checkBody("password", "Required").notEmpty();
		var errors = req.validationErrors();
		if(errors){
			req.flash('error', constant.INVALID_LOGIN_MSG);
			res.redirect('/');
		}else{

			var username = req.body. username;
			var password = req.body.password;
			//res.send(userName+'-------'+password);

			Login.findOne({'mobile': username, 'password': password}, function (err, result) {
				//console.log(result);
				if(!result) 
				{ 	
	            	 req.flash('error',constant.INVALID_LOGIN_MSG);                       	
	            	res.redirect('/');
	        	}else{
	        		 session = req.session;
					 session.userid = result._id;
					 session.username = result.name;
					 session.mobile = result.mobile;
					 session.email = result.email;
					 session.usertype = result.usertype;	
					 //res.send("Welcome! " +result.name);			 
	        		 res.redirect('/dashboard');
	        	}	
		       
		    })
		}


		//res.redirect('/products');
	}else{		
		if(req.cookies['cookieUser']){
		   var cookieUser = req.cookies['cookieUser'];
		   var cookiePass = req.cookies['cookiePass'];
	   }
	   var dataObj = {};
	   dataObj.title = constant.SITE_TITLE;
	   dataObj.error = req.flash('error');
	   dataObj.success = req.flash('success');
	   dataObj.cookieUser = cookieUser;
	   dataObj.cookiePass = cookiePass;

		res.render('admin/login', { dataSet: dataObj });
	}
	//res.send('Welcome to Controller is working!');
};

exports.register = function (req, res) {  //
	
    if(req.method=='POST'){
    	
    	//console.log(req.body); 
    	req.checkBody("name", "Required").notEmpty();
    	req.checkBody("mobile", "Required").notEmpty();
    	req.checkBody("email", "Required").notEmpty();
		req.checkBody("password", "Required").notEmpty();
		req.checkBody("confirm_password", "Required").notEmpty();
		var errors = req.validationErrors();
		if(errors){
			req.flash('error', constant.REQUIRED_FIELDS);
			res.redirect('/');
		}else{			
			let newUser = new Login();
	    	newUser.name   = req.body.name;
            newUser.mobile = req.body.mobile;
            newUser.email  = req.body.email;
            newUser.password = req.body.password;
            newUser.status = 1;
            newUser.usertype = 1;
            newUser.createdAt = Date.now();
		    newUser.updatedAt = Date.now();

		    newUser.save(function(err) {
				if (err){
				  console.log('Error in Saving bbs: '+err);  
				  res.send({"result":false});
				}
				req.flash('success',constant.MSG_SAVED_RECORD);
	  	        res.redirect('/');
			});

		}


    }else{
       var dataObj = {};
	   dataObj.title = constant.SITE_TITLE;
	   dataObj.error = req.flash('error');
	   dataObj.success = req.flash('success');
	   //console.log('PK'); 
       res.render('admin/signup', {dataSet:dataObj});
    }
    

};


exports.dashboard= function(req, res){
	session = req.session;
    let userid = session.userid;   
    //console.log(session);	
	let dataObj = {};
	dataObj.title = 'Dashboard - '+constant.SITE_TITLE;
	 res.render('dashboard',{dataSet: dataObj} );
};


exports.profile= function(req, res){
	// console.log(req.session.userid); 
	//console.log(util.inspect(req.session, {showHidden: false, depth: null}))
	// console.log(util.inspect(req.session, false, null, true /* enable colors */)); return false;
	
	var moment = require('moment');
	//session = req.session;
    let userid = req.session.userid;
    console.log(userid);
    let dataObj = {};
	dataObj.title = 'Profile - '+constant.SITE_TITLE;
    Login.findById( userid, function(err, result){
    	if(err){
				 req.flash('error',constant.MSG_SOMETHING_WRONG);
				 res.redirect('/');
			 } else {
				dataObj.username = result.username;
				dataObj.dataUser = result;
				//console.log(dataObj.username);
				dataObj.moment = moment;
				res.render('admin/profile', { dataSet: dataObj });				 
			 }

    });
	
	
};


