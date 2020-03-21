const facebook = require('./email/facebook');


module.exports = async (email)=>{
	let check_facebook = await facebook(email);
	console.log('check_facebook:'+check_facebook);
	return check_facebook;
};