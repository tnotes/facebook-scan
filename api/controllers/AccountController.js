/**
 * AccountController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const fs = require('fs');
 const verify_email_template = fs.readFileSync('./api/templates/verify-email.html','UTF-8');
 const verify_phone_template = fs.readFileSync('./api/templates/verify-phone.txt','UTF-8');

 const forgot_email_template = fs.readFileSync('./api/templates/forgot-email.html','UTF-8');
 const forgot_phone_template = fs.readFileSync('./api/templates/forgot-phone.txt','UTF-8');
 
 const {head:{title},domain} = require('../../nuxt.config');
 module.exports = {
 	register:async function(req,res){
 		try{
 			let {fullname,email,phone,password} = req.body;
 			if(!email && !phone) throw 'Email or Phone not found';

 			if(email){
 				let find_exists = await Account.find({email});
 				if(find_exists.length > 0) throw 'Duplicate Email';
 			}
 			if(phone){
 				let find_exists = await Account.find({phone});
 				if(find_exists.length > 0) throw 'Duplicate Phone';
 			}

 			let pass_hash = await Security.encode(password);

 			let {id} = await Account.create({fullname,email,phone,pass_hash}).fetch();

 			req.session.userId = id;

 			return res.ok();

 		}catch(error){
 			
 			return res.send({error})
 		}
 	},
 	login:async function(req,res){
 		try{
 			let {email,phone,password} = req.body;
 			let find = {};
 			if(!email && !phone) throw 'Not found device';
 			if(email){
 				let find_email = await Account.find({email});
 				if(find_email.length === 0) throw 'User not found';
 				find = find_email[0];
 			}

 			if(phone){
 				let find_phone = await Account.find({phone});
 				if(find_phone.length === 0) throw 'User not found';
 				find = find_phone[0];
 			}

 			
 			let password_user = await Security.decode(find.pass_hash);

 			if(password !== password_user) throw 'Login failed';
 			req.session.userId = find.id;

 			return res.ok();

 		}catch(error){
 			if(!error) error = 'Not Found';
 			return res.send({error});
 		}
 	},
 	change_password:async function(req,res){
 		try{
 			let {session:{userId},body:{old_password,new_password}} = req.body;
 			let user = await Account.find({userId});
 			if(user.length) throw 'Không tìm thấy tài khoản';
 			let password = await Security.decode(user[0].pass_hash);
 			if(password !== old_password) throw 'Mật khẩu cũ không chính xác.';
 			let pass_hash = await Security.encode(new_password);
 			await Account.update({userId}).set({pass_hash});
 			return res.ok();
 		}catch(error){
 			return res.send({error})
 		}
 	},
 	'verify/send':async function(req,res){
 		try{
 			let {session:{userId},body:{way}} = req;
 			if(!userId) throw 'Not logged in';
 			if((way !== 'email') && (way !== 'phone')) throw 'Not found device';
 			let code = Math.floor(Math.random() * 1000000).toString();
 			if(way === 'email'){
 				let find_active = await Account.find({id:userId,active_email:false});
 				if(find_active.length === 0) throw 'Không tìm thấy Email';
 				let verify_template = verify_email_template.replace(/\{\{code\}\}/g,code).replace(/\{\{title\}\}/g,title).replace(/\{\{domain\}\}/g,domain);
 				await Mail(find_active[0].email,'Xác thực tài khoản sử dụng',verify_template);
 				
 			}else if(way === 'phone'){
 				let find_active = await Account.find({id:userId,active_phone:false});
 				if(find_active.length === 0) throw 'Không tìm thấy Số điện thoại.';
 				let verify_template = verify_phone_template.replace(/\{\{code\}\}/g,code).replace(/\{\{title\}\}/g,title);
 				await Phone(find_active[0].phone, verify_template);
 				
 			}
 			let code_hash = await Security.encode(code);
 			await Verify.destroy({userId,type:'verify',way});
 			await Verify.create({userId,type:'verify',way,code_hash});
 			return res.ok();
 			
 		}catch(error){
 			return res.send({error});
 		}
 	},
 	'verify/activate':async function(req,res){
 		let {session:{userId},query:{way,code}} = req;
 		try{
 			if(!userId) throw 'Bạn phải thực hiện đăng nhập trước khi xác thực tài khoản';
 			if((way !== 'email') && (way !== 'phone')) throw 'Not found device';
 			let find_code = await Verify.find({userId,way,type:'verify'});
 			if(find_code.length === 0) throw 'Bạn đã nhập sai quá nhiều lần.';
 			let {code_hash,time} = find_code[0];
 			let code_auth = await Security.decode(code_hash);
 			if(code_auth === code){
 				await Verify.destroy({userId,way,type:'verify'});
 				if(way === 'email'){
 					await Account.update({id:userId}).set({active_email:true});
 				}else if(way === 'phone'){
 					await Account.update({id:userId}).set({active_phone:true});
 				};
 				return res.ok();
 			}else{
 				if(time < 5) {
 					time+=1;
 					await Verify.update({userId,way,type:'verify'}).set({time});
 				}else{
 					await Verify.destroy({userId,way,type:'verify'});
 				}
 				throw 'Mã xác thực không chính xác.'

 			}

 		}catch(error){
 			return res.send({error})
 		}
 	},
 	'forgot/send':async function(req,res){
 		try{
 			let {email,phone} = req.body;
 			if(!email && !phone) throw 'Not found device';
 			let way = email?'email':(phone?'phone':null);
 			let code = Math.floor(Math.random() * 1000000).toString();
 			let userId = null;
 			if(email){
 				let user = await Account.find({email});
 				if(user.length === 0) throw 'Tài khoản liên kết Email này không tồn tại.';
 				userId = user[0].id;
 				let forgot_template = forgot_email_template.replace(/\{\{code\}\}/g,code).replace(/\{\{title\}\}/g,title).replace(/\{\{domain\}\}/g,domain);
 				await Mail(email,'Khôi phục mật khẩu tài khoản '+title,forgot_template);
 			}else if(phone){
 				let user = await Account.find({phone});
 				if(user.length === 0) throw 'Tài khoản liên kết với Số điện thoại này không tồn tại.';
 				userId = user[0].id;
 				let forgot_template = forgot_phone_template.replace(/\{\{code\}\}/g,code).replace(/\{\{title\}\}/g,title).replace(/\{\{domain\}\}/g,domain);
 				await Phone(phone,forgot_template);
 				
 			}
 			
 			
 			let code_hash = await Security.encode(code);
 			await Verify.destroy({userId,type:'forgot',way});
 			await Verify.create({userId,type:'forgot',way,code_hash});
 			req.session.userId_hash = await Security.encode(userId);
 			return res.ok();
 		}catch(error){
 			return res.send({error})
 		}
 	},
 	'forgot/activate':async function(req,res){
 		try{
 			let {session:{userId_hash},query:{way,code}} = req;
 			if(!userId_hash) throw 'Vui lòng nhập mã xác nhận trên thiết bị đã yêu cầu.'
 			let userId = await Security.decode(id);
 			let forgot_code = await Verify.find({type:'forgot',way,userId,code});
 			if(forgot_code.length === 0) throw 'Mã xác thực không chính xác.';
 			await Verify.destroy({type:'forgot',userId});
 			return res.ok();
 		}catch(error){
 			return res.send({error});
 		}
 	},
 	'forgot/new_password':async function(req,res){
 		try{
 			let {session:{userId_hash},body:{new_password}} = req;
 			if(!userId_hash) throw 'Vui lòng nhập mật khẩu mới trên thiết bị đã yêu cầu.'
 			let userId = await Security.decode(userId_hash);
 			let forgot_code = await Verify.find({type:'forgot',userId});
 			if(forgot_code.length > 0) throw 'Chưa điền mã xác thực';
 			let password = await Security.encode(new_password);
 			await Account.update({userId}).set({password});
 			return res.ok();
 		}catch(error){
 			return res.send({error});
 		}
 	}

 };

