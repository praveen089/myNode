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
					 var rememberme = req.body.rememberme;
					 if(rememberme){
					 	res.cookie('username', username);
					 	res.cookie('password', req.body.password);
					 }
					 
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
            newUser.address = '';
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
   // console.log(userid);
    let dataObj = {};
	dataObj.title = 'Profile - '+constant.SITE_TITLE;
	if(userid!=''){
		Login.findById( userid, function(err, result){
			//console.log('PK--->'+result.name);
	    	if(err){
					 req.flash('error',constant.MSG_SOMETHING_WRONG);
					 res.redirect('/');
				 } else {
					dataObj.username = result.name;
					dataObj.dataUser = result;
					//console.log(dataObj.username);
					dataObj.moment = moment;
					res.render('admin/profile', { dataSet: dataObj });				 
				 }

	    });
	}
    
};
	
exports.profileEdit = function(req, res){
	var moment = require('moment');
	session = req.session;
	let userid = req.session.userid;
	let dataObj = {};
	dataObj.title = 'Edit Profile - '+constant.SITE_TITLE;
	    Login.findById( userid, function(err, result){		    	
	    	 if(err){
					 req.flash('error',constant.MSG_SOMETHING_WRONG);
					 res.redirect('/');
				 } else {
				 	console.log(util.inspect(result, {showHidden: false, depth: null}));
					dataObj.name = result.name;
					dataObj.dataUser = result;				
					dataObj.moment = moment;
					dataObj.error = req.flash('error');
					dataObj.success = req.flash('success');
					res.render('admin/edit', { dataSet: dataObj });				 
				 }

	    });
	
};
exports.profileUpdate = function(req, res){
    	//console.log(req.body); 
    	req.checkBody("name", "Required").notEmpty();
    	req.checkBody("mobile", "Required").notEmpty();
    	req.checkBody("email", "Required").notEmpty();
    	var errors = req.validationErrors();
    	if(errors){
    		req.flash('error', constant.REQUIRED_FIELDS);
    		res.redirect('/profile/edit');
    	}else{
	    	var moment = require('moment');
			session = req.session;
			let userid = req.session.userid;
	    	let data = [];
	    	data.title = 'Edit Profile ';
	    	if(userid!=''){
		    	Login.findById( userid, function(err, setdata){	    		
		    		if(err){
		    			 req.flash('error',constant.MSG_SOMETHING_WRONG);
					 	 res.redirect('/');
		    		}else{
		    			setdata.name = req.body.name;
		    			setdata.mobile = req.body.mobile;
		    			setdata.email = req.body.email;
		    			setdata.address = req.body.address;	    			
						session.username = req.body.name;
						//console.log(util.inspect(setdata, {showHidden: false, depth: null}));
		    			setdata.save(function(){
		    				req.flash('success', constant.MSG_SAVED_RECORD);
		    				res.redirect('/profile/edit');
		    			});
		    		}
		    	});
	    	}

    	}		
	
};

exports.changepass = function(req, res){
	if(req.method=='POST'){
		req.checkBody('old_password', "Required").notEmpty();
		req.checkBody('password', "Required").notEmpty();
		req.checkBody('c_password', "Required").notEmpty();
		let errors = req.validationErrors();
		if(errors){
			req.flash('error', constant.REQUIRED_FIELDS);
			res.redirect('/changepass');
		}else{			
			session = req.session;
			let userid = req.session.userid;	    	
	    	Login.findById( userid, function(err, result){
	    		let old_password = req.body.old_password;
	    		if(old_password!= result.password){
	    			req.flash('error', constant.PASS_NOT_MATCH);
	    			res.redirect('/changepass');
	    		}else{
	    			result.password = req.body.password;
	    			session.username = req.body.name;
	    			result.save(function(){
	    				req.flash('success', constant.PASS_CHANGE_MSG);
	    				res.redirect('/logout');
	    			});
	    		}
	    	});

		}

	}else{
		var moment = require('moment');
		session = req.session;
		let userid = req.session.userid;
		let dataObj = {};
		dataObj.title = 'Change Password - '+constant.SITE_TITLE;
		    Login.findById( userid, function(err, result){		    	
		    	 if(err){
						 req.flash('error',constant.MSG_SOMETHING_WRONG);
						 res.redirect('/');
					 } else {
					 	//console.log(util.inspect(result, {showHidden: false, depth: null}));
						dataObj.name = result.name;
						dataObj.dataUser = result;				
						dataObj.moment = moment;
						dataObj.error = req.flash('error');
						dataObj.success = req.flash('success');
						res.render('admin/changepass', { dataSet: dataObj });				 
					 }

		    });
	}
	
	
};

exports.users= function(req, res){
	session = req.session;
	var moment = require('moment');
    let userid = session.userid;   
    //console.log(session);	
	let dataObj = {};
	dataObj.title = 'All Users - '+constant.SITE_TITLE;
	Login.find( function(err, result){		
	// console.log(result); return false;	
    	if(err){
				 req.flash('error',constant.MSG_SOMETHING_WRONG);
				 res.redirect('/dashboard');
			 } else {			
			 	dataObj.moment = moment;
			 	dataObj.error = req.flash('error');
				dataObj.success = req.flash('success');
				res.render('users/list', { dataSet: dataObj, resultSet:result, moment:moment });				 
			 }

	    });	 
};

exports.logout = function(req, res){
	 req.session.destroy();
  	 res.redirect('/');
};
	


