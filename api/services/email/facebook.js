const request = require('request-promise');
const cheerio = require('cheerio');
let filter_1 = async (email)=>{
	try{
		let options = {
			url:' https://m.facebook.com/login/device-based/regular/login/?refsrc=https%3A%2F%2Fm.facebook.com%2Frecover%2Fcode%2F&lwv=100&refid=8',
			method:'POST',
			headers:{
				'accept':'text/html,application/xhtml+xml,application/xml;q:0.9,image/webp,image/apng,*/*;q:0.8,application/signed-exchange;v:b3;q:0.9',
				'accept-language':'vi-VN,vi;q:0.9,fr-FR;q:0.8,fr;q:0.7,en-US;q:0.6,en;q:0.5',
				'cache-control':'max-age:0',
				'content-type':'application/x-www-form-urlencoded',
				//'cookie':'sb:I29cXi9cziBD5HaDFG8Wk76c; datr:I29cXolVzW1B-L6y9qnoBDTD; dpr:2; fr:1NR8Y9XptlKSfdAKE..BeXG8j.Kv.AAA.0.0.BeXHuM.AWVXSmQo; wd:980x1715; sfau:AYjNlfWna4szfNQRRi7JhlZ77sk7pK7UL4UVvhUrWY3QcaJ4E57Fqhsxk1mJdhSxkdfvcOUEVfwNClirngnC-KsSXtxES7BOrKf52JJA2tJ7F4Oe9cKHQqUYFrjF5jE8MWLUpdo_jCx9rSRO2CzwZDg-o7YyxFB4jE_Pn0sNIf9neii_fIyn96YCDzwdg2T32PI8NSNJ4yaYnPpXotR-b6TZ; sfiu:AYgRnETMkcnXgcu4KNOweRh042RZPzasTvacUeYc4y3sMUDYf6RjYRF7KwKTo6xOQGefhq0NeMlwDupfFrws6Gg22kcI6EKx4MxPeT4g5PxQHicJt1iwAxaDWjDATeENTnTwgqNz-62AfbNYDZMUNA5MV8uk3M3zcVeANhpJgGCgk9a3t5SbapkzfL3IhvHBUyg5TnBkPxo52lVxkMtUUXbX',
				'origin':'https://m.facebook.com',
				'referer':'https://m.facebook.com/?refsrc:https%3A%2F%2Fm.facebook.com%2Frecover%2Fcode%2F&_rdr',
				'sec-fetch-mode':'navigate',
				'sec-fetch-site':'same-origin',
				'sec-fetch-user':'?1',
				'upgrade-insecure-requests':'1',
				'user-agent':'Nokia6300/2.0 (04.20) Profile/MIDP-2.0 Configuration/CLDC-1.1 UNTRUSTED/1.0',
			},
			form:{
				'm_ts':'1581581109',
				'try_number':'0',
				'unrecognized_tries':'0',
				email,
				'pass':'aklsdf7682kiendeptrai',
				'login':'Đăng nhập',
			},
			resolveWithFullResponse:true
		};
		let {headers,body} = await request(options);
		let cookie = headers['set-cookie'].reduce(((previous,current)=>previous+current.split(';')[0]+';'),'');
		return {success:true,url:null,cookie};
	}catch(e){
		let location = e.response.headers.location;
		let cookie = e.response.headers['set-cookie'].reduce(((previous,current)=>previous+current.split(';')[0]+';'),'')
		let start = location.indexOf('&e=')+3;
		let end = location.indexOf('&',start);
		let code = parseInt(location.slice(start,end));
		let success = (code === 1348092) || (location.includes('facebook.com/recover/initiate')); 
		return {success,url:location,cookie}
		
	}
};
let filter_2 = async (url)=>{
	try{
		let options = {
			url,
			method:'GET',
			headers:{
				'cache-control':'max-age:0',
				'content-type':'application/x-www-form-urlencoded',
				'origin':'https://m.facebook.com',
				'referer':'https://m.facebook.com/',
				'sec-fetch-mode':'navigate',
				'sec-fetch-site':'same-origin',
				'sec-fetch-user':'?1',
				'upgrade-insecure-requests':'1',
				'user-agent':'Nokia6300/2.0 (04.20) Profile/MIDP-2.0 Configuration/CLDC-1.1 UNTRUSTED/1.0',
			}
		};
		let responseHTML = await request(options);
		let $ = cheerio.load(responseHTML);
		
		let recover_link = 'https://m.facebook.com'+$('#recover-button-mbasic').find('a').attr('href');
		return recover_link
	}catch(e){
		return false;
	}
};
let filter_3 = async ({cookie,recover_link})=>{
	try{
		let options = {
			url:recover_link,
			method:'GET',
			headers:{
				'cache-control':'max-age:0',
				'content-type':'application/x-www-form-urlencoded',
				'origin':'https://m.facebook.com',
				'referer':'https://m.facebook.com/',
				'sec-fetch-mode':'navigate',
				'sec-fetch-site':'same-origin',
				'sec-fetch-user':'?1',
				cookie,
				'upgrade-insecure-requests':'1',
				'user-agent':'Nokia6300/2.0 (04.20) Profile/MIDP-2.0 Configuration/CLDC-1.1 UNTRUSTED/1.0',
			}
		};
		let responseHTML = await request(options);
		return responseHTML.includes('send_email')// || responseHTML.includes('forgot-password-link');
	}catch(e){
		return false;
	}
};
module.exports = async function(email){
	let {success,url,cookie} = await filter_1(email);
	if(success){
		if(url === null) return true;
		let recover_link = await filter_2(url);
		return await filter_3({cookie,recover_link});
	}else{

		return false
	}
}