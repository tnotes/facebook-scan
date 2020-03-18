const {head:{title},gmail:{user,pass}} = require('../../nuxt.config');
const nodemailer = require('nodemailer');
module.exports = async function(to,subject = '',html = ''){
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {user,pass}
	});
	let mailOptions = {
		to,
		subject,
		html,
		from: 'Nuxt.js <donotreply@bar.com>'
	};
	try{
		await transporter.sendMail(mailOptions);
		return true;

	}catch(e){
		return false;
	}
	
}