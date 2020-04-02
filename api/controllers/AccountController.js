/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const fs = require('fs');

 module.exports = {
 	login:async function(req,res){
 		
 		let password_file = fs.readFileSync('./password.txt','UTF-8');
 		
 		let status = (req.query.password.trim() || '') == password_file.trim();
 		return res.send({status});

 	},
 	'change-password':async function(req,res){
 		if(req.body.password){
 			fs.writeFileSync('./password.txt',req.body.password);
 			return res.send({status:true})
 		}else{
 			return res.send({status:false})
 		}
 		
 	}
 };

