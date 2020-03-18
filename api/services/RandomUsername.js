const request = require('request-promise');
const cheerio = require('cheerio');
module.exports = async ()=>{
	let options = {
	    url:'https://api.name-fake.com/english-united-states/',
	    method:'GET',
	    headers:{
	    	'user-agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72',
	    }
	};
	let responseHTML = await request(options);
	let $ = cheerio.load(responseHTML);
	return $('div#copy3').text();
};