const microsoft = require('./email/microsoft');
(async ()=>{
	let check = await microsoft('samir12@live.be');
	console.log(check);
})();