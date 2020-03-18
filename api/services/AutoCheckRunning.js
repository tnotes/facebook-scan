const fs = require('fs');
let waitTime = time=>{
	return new Promise(resolve=>{
		setTimeout(function(){
			return resolve(time)
		},time)
	})
};
let old_mail = []
let auto_checking = async ()=>{
	await waitTime(20000);
	let status_document = await Status.find();
	let {status} = status_document[0] || {status:false};
	if(status){
		let result = await Scan.find();
		let new_email = result.map(({email})=>email);
		let unique = new_email.filter(function(obj) { return old_mail.indexOf(obj) == -1; });
		if(unique.length > 0) {
			old_mail = new_email;
		}else{
			let key = Math.floor(Math.random() * 10000000).toString();
			fs.writeFileSync('./key.txt',key);
			AutoScan(key);
		}
	}
	return await auto_checking();
};
auto_checking();