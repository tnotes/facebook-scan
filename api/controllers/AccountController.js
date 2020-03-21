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
 		let status = (req.query.password || '') == password_file;
 		return res.send({status});

 	}
 };

