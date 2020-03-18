const request = require('request-promise');
const {sms:{token}} = require('../../nuxt.config');
module.exports = async (phone,message = '')=>{
	if(phone.length !== 10) throw 'Số điện thoại không hợp lệ.';
	let options = {
		url:'http://14.170.242.221:8080',
		method:'POST',
		form:{phone,token,message}
	};
	return await request(options);
};