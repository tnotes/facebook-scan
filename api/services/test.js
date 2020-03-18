const random = require('./RandomUsername');
const check_mail = require('./email/microsoft');
(async ()=>{
	let check = await check_mail('kienbkav@hotmail.com');
	console.log(check);
})();