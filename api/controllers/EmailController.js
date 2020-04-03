/**
 * EmailController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const fs = require('fs');
 
 module.exports = {
 	scan:async function(req,res){
 		try{
 			let {email,fb_scan} = req.body;
 			if(!email) throw 'Email not valid';
 			await Email.destroy({email});
 			if(fb_scan){
 				let find_email = await Result.findOne({email});
 				let success = find_email ? true : false;
 				if(!success) success = await FB_scan(email);
 		 	    return res.send({success});
 			}else{
 				let success = await CheckEmail(email);
 				return res.send({success});
 			}
 			
 		}catch(error){
 			return res.send({success:null,error})
 		}

 	},
 	autoscan:async function(req,res){
 		try{
 			let {turnon} = req.body;
 			let status_find = await Status.find({});
 			if(status_find.length === 0) await Status.create({status:(turnon || false)})
 				let status_document = await Status.find({});
 			let {id,status} = status_document[0];
 			if(turnon && !status){
 				await Status.update({id}).set({status:true});
 				let key = Math.floor(Math.random() * 10000000).toString();
 				fs.writeFileSync('./key.txt',key);
 				AutoScan(key);
 				AutoScan(key);
 				AutoScan(key);
 				AutoScan(key);
 			}else{
 				await Status.update({id}).set({status:false});
 			}
 			return res.send({success:true})

 		}catch(error){
 			
 			return res.send({success:null,error})
 		}
 	},
 	generate:async function(req,res){
 		let username = await RandomUsername();
 		return res.send(username);
 	},
 	download:async function(req,res){
 		let {domain,hold} = req.body;
 		let data = await Result.find().where({email:{contains:domain}});
 		let list = data.reduce(((previous,current)=>previous+current.email+'\n'),'')
 		fs.writeFileSync('./email.txt',list);
 		if(hold === false) {
 			let remove_map = data.map(({email})=>Result.destroy({email}));
 			await Promise.all(remove_map);
 		}
 		return res.download('./email.txt');
 	},
 	

 };

