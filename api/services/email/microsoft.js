const request = require('request-promise');
const cheerio = require('cheerio');
const get_canary = async ()=>{
	let options = {
		url:'https://account.live.com/password/reset',
		method:'GET',
		headers:{
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72',	
		},
		resolveWithFullResponse:true
	};
	let {body,headers} = await request(options);
	let cookie = headers['set-cookie'].reduce(((previous,value)=>previous+value.split(';')[0]+';'),'');
	let $ = cheerio.load(body);
	let canary =  $('input#canary').val();
	return {canary,cookie};
}
module.exports = async (email)=>{
	try{
		let {canary,cookie} = await get_canary();
		
		var headers = {
			'authority': 'account.live.com',
			'cache-control': 'max-age=0',
			'origin': 'https://account.live.com',
			'upgrade-insecure-requests': '1',
			'content-type': 'application/x-www-form-urlencoded',
			'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72',
			'sec-fetch-user': '?1',
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'sec-fetch-site': 'same-origin',
			'sec-fetch-mode': 'navigate',
			'referer': 'https://account.live.com/password/reset',
			'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
			cookie

		};

		var dataString = 'iAction=SignInName&iRU=https%3A%2F%2Faccount.live.com%2FSummaryPage.aspx&amtcxt=QwZysLtejEQANjL5Ty9uwEwHQM0Tyw7JoMmDSNRFxmmV6C6pEJrN86%2F3W%2FX2UZq807OzAaDVACZ5Rbph8FEmBgDUHJrYlBAxDKTB6%2FRWjO7mqugKuMuJhmXsTGdFxek13FMPnuYcB0JOt15cmYH5YG4DxwqpdnEqUDL%2BKGN2K7EWB7fzLT8SEiIhpFmj4CjCYswDBuP86ug844Ta5R6mZNbALAREfGe2PRWyj3%2Fh4Jg%3D%3A2%3A3&uaid=1d26aae5e4604470810500bbf05b9b1b&network_type=&isSigninNamePhone=False&canary='+canary+'&PhoneCountry=VN&iSigninName='+email;

		var options = {
			url: 'https://account.live.com/password/reset?uaid=1d26aae5e4604470810500bbf05b9b1b',
			method: 'POST',
			headers: headers,
			body: dataString
		};


		let responseHTML = await request(options);
		let $ = cheerio.load(responseHTML);
		let check = ($('input#iSigninName').val() || '').includes('@');
		return check;
	}catch(e){

		return null;
	}
};