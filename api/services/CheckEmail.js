const facebook = require('./email/facebook');
const microsoft = require('./email/microsoft');

module.exports = async (email)=>{
	let check_facebook = await facebook(email);
	let validate_data = await Domain.find();
	let validate = validate_data.map(e=>e.name);
	if(validate.find(e=>email.includes(e))){
		let check_microsoft = await microsoft(email);
		let check = check_microsoft && check_facebook;
		return check;
	}else{
		throw 'Không hỗ trợ.';
	}
};