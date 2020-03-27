const request = require('request-promise');
let get_location = async email=>{
	try{
		var headers = {
			'authority': 'm.facebook.com',
			'cache-control': 'max-age=0',
			'origin': 'https://m.facebook.com',
			'upgrade-insecure-requests': '1',
			'content-type': 'application/x-www-form-urlencoded',
			'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36',
			'sec-fetch-dest': 'document',
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'sec-fetch-site': 'same-origin',
			'sec-fetch-mode': 'navigate',
			'sec-fetch-user': '?1',
			'referer': 'https://m.facebook.com/login/identify/?ctx=recover&c&multiple_results=0&_rdr',
			'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
			'cookie': 'sb=XYZ9XsUlvT3QbH-34aTnyWy_; datr=XYZ9XqBKBxlkXSN6zpxa4YT0; dpr=3; m_pixel_ratio=3; wd=360x640; fr=1z9WaACEAk9k6U1oC..BefYZd.2u.AAA.0.0.BefYvJ.AWVr5yEW'
		};

		var dataString = 'lsd=AVoOagDn&jazoest=2719&email='+email+'&did_submit=T%C3%ACm+ki%E1%BA%BFm';

		var options = {
			url: 'https://m.facebook.com/login/identify/?ctx=recover&search_attempts=1&alternate_search=0',
			method: 'POST',
			headers: headers,
			body: dataString
		};
		let responseHTML = await request(options);
		return {failed:true};

	}catch(e){
		let {headers} = e.response;
		let url = headers.location;
		let cookie = headers['set-cookie'].reduce(((previous,current)=>previous+current.split(';')[0]+';'),'')
		return {url,cookie}
	}

};
let get_cookie = async (url,cookie,index = 1)=>{
	try{
		var headers = {
			'authority': 'm.facebook.com',
			'cache-control': 'max-age=0',
			'upgrade-insecure-requests': '1',
			'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36',
			'sec-fetch-dest': 'document',
			'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
			'sec-fetch-site': 'same-origin',
			'sec-fetch-mode': 'navigate',
			'sec-fetch-user': '?1',
			'referer': 'https://m.facebook.com/login/identify/?ctx=recover&c&multiple_results=0&_rdr',
			'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
			cookie
		};

		var options = {
			url,
			headers: headers
		};
		let responseHTML = await request(options);
		return responseHTML.includes('contact_point_selector_form') || responseHTML.includes('/recover/code/');
		
	}catch(e){
		return e.response.headers['set-cookie'].reduce(((previous,current)=>previous+current.split(';')[0]+';'),'')
	}
};
let check = async (email,cookie)=>{
	var headers = {
		'authority': 'm.facebook.com',
		'cache-control': 'max-age=0',
		'upgrade-insecure-requests': '1',
		'user-agent': 'Mozilla/5.0 (Linux; Android 5.0; SM-G900P Build/LRX21T) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Mobile Safari/537.36',
		'sec-fetch-dest': 'document',
		'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
		'sec-fetch-site': 'same-origin',
		'sec-fetch-mode': 'navigate',
		'sec-fetch-user': '?1',
		'referer': 'https://m.facebook.com/login/identify/?ctx=recover&c&multiple_results=0&_rdr',
		'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
		cookie
	};

	var options = {
		url: 'https://m.facebook.com/recover/code/?em%5B0%5D='+email+'&rm=send_email&fl=skip_initiate_view&src_flow=skip_initiate&hash=AUYwsU6PbKbGfJ79&_rdr',
		headers: headers
	};

	return true;

};
let check_finnay = async (email,index = 1)=>{
	let {failed,url,cookie} = await get_location(email);
	if(failed){
		return false;
	}else{
		let cookie_check = await get_cookie(url,cookie);
		if((cookie_check === false) && (index === 1)){
			index+=1;
			return await check_finnay(email,index);
		}else if((cookie_check === false) && (index > 1)){
			return false;
		}
		if(cookie_check){
			if(cookie_check === true){
				return true;
			}else{
				let result = await check(email,cookie_check);
				return result
			}
		}
	}
	

};
module.exports = check_finnay;










