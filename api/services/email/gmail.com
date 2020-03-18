const request = require('request-promise');
module.exports = async (email)=>{
	let username = email.split('@')[0];
	var headers = {
		'authority': 'accounts.google.com',
		'x-same-domain': '1',
		'origin': 'https://accounts.google.com',
		'google-accounts-xsrf': '1',
		'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36 OPR/66.0.3515.72',
		'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
		'accept': '*/*',
		'sec-fetch-site': 'same-origin',
		'sec-fetch-mode': 'cors',
		'referer': 'https://accounts.google.com/ServiceLogin/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=AddSession&TL=APDPHBCbTZYM3eW-qiRRRDOs7-H1SpLjUhc8Jyy6cZTabR01RbeksgoRl7QWxV0Z',
		'accept-language': 'vi-VN,vi;q=0.9,fr-FR;q=0.8,fr;q=0.7,en-US;q=0.6,en;q=0.5',
		'cookie': 'ACCOUNT_CHOOSER=AFx_qI5MI_5h-RULkeory5UJ8edQ6JbzzbERUjU8qPO_KEwVchZ2a3sv4_vzpqQYZPdB253yLOmDCkyv963H3I4N_yp9nRWbwYm9vd865PpwzPMcoqmr2SwAiRoxxTsZzfiicbkHtaGwNfMAz6_4WZ8C7PxjkQHzlzegdqYEb2a4uske2vkjWofU14362TdKACSgOo4ZnDR5XDbaovW-_mAkgQX4eyjm5g; CONSENT=YES+VN.en+20171119-09-0; SEARCH_SAMESITE=CgQI_Y4B; 1P_JAR=2020-02-10-01; NID=197=KruYLrQK9iHLfTonENDk5cnl-q_rmudoo5RlB4Stm4zd1Y3TafsUNUh-i5ywbiTOVdte3s4cezAArs58zW1drp3AeelWmhl4uAE2D9AMs-1eEJop_dfLiH12UgvSR0WDHqX55R1YIKlx0fHOVGrZeII2Zx29hhrYEhdVNqRPoiwVs_XOrAojDpFi8JSOpLc; GAPS=1:klUUkOD9QaRw0-OSHkMwizLRXkU2JW6F0JXzRt45IcyPBem9GtLT_ol_pKbyNDW3npF3rkpDYjMbrDsJsPqiokWaJ07v9A:vBi9Y3mWnRlrf0zz'
	};

	var dataString = '$continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&service=mail&rm=false&ltmpl=default&scc=1&ss=1&osid=1&emr=1&f.req=%5B%22'+username+'%22%2C%22AEThLlxm_ew1B4YHE4Z_-XXbty5Q-RG_Eoy9WifpOkPcAvH4w0XIkZpyiHgwyphsgJ-7ShIWQc2Q5lBJSZFVCAD1erX7erwWh9Fyl1o8HZ9tZWvH-AuW_LuAKPx0538NDWIxTnwPq4qTLEADk5YH6LHq1YSQ-5_IWkETMnaubx1akE3RrvJkoGrq6XwRS8DtlxySMA8B5d-5pN5nsG4ryoFG5SOC0hCuOHb78hXnP-WnziUYsyQ6rLgbg2N1tIPpyfvb8f4t6k3QiwvofbVNQiV9HzGFqGNPtwmjPyss59CYLugKPoIWE9zocYH_nbbDt1uPblHZqUkS0C-HtW35CkX7HOTnLMgLD9npUIzVATasyGM45dT7QYLbhiHZS0Zaa_joo-N0-DI3LFpzL3gHHt1Em3s7wX5Q7dPIZXyaejzytI6WciiXUUJvN51HqM9o_0LvWLhN78GvKhjnindhYdAJgvQtfET2YChYwi7eWwrYfx0s6gmBEMq8_xnlaNBIssSPiDvR53fB_trNy-088U_kg_7GH3h9a6VJqB5Yeug_x4Yg93m05HF2c5qRzihooAiIqXFBBZuXvrw9EjdQ6zVNu3y_S9C_NEl9M_joXXEBgYI3fMTVhhOAczZwkP6PmNUr3pPck4E94jGlHposUcOhnA5_bsGUPOwYYvzagm6BbuisrpksDAogmty2DtlAQx3jDj9Aum2g%22%2C%5B%5D%2Cnull%2C%22VN%22%2Cnull%2Cnull%2C2%2Cfalse%2Ctrue%2C%5Bnull%2Cnull%2C%5B2%2C1%2Cnull%2C1%2C%22https%3A%2F%2Faccounts.google.com%2FServiceLogin%3Fservice%3Dmail%26passive%3Dtrue%26rm%3Dfalse%26continue%3Dhttps%253A%252F%252Fmail.google.com%252Fmail%252F%26ss%3D1%26scc%3D1%26ltmpl%3Ddefault%26ltmplcache%3D2%26emr%3D1%26osid%3D1%22%2Cnull%2C%5B%5D%2C4%2C%5B%5D%2C%22GlifWebSignIn%22%2Cnull%2C%5B%5D%5D%2C1%2C%5Bnull%2Cnull%2C%5B%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5D%2Cnull%2Cnull%2Cnull%2C%5B%5D%2C%5B%5D%5D%2Cnull%2Cnull%2Cnull%2Ctrue%5D%2C%22'+username+'%22%5D&bgRequest=%5B%22identifier%22%2C%22\u0021wMOlw-JCX2p_OvXj899YxcwmDmsyMgUCAAAAhlIAAAAgmQN76xS8ieIWq951z-n9L5f94mE6JUkOkAc4fCsAvEJ-ES8wTJpZnUgeAQ1HcAXoo-7gNHqSEtgAvU4MIg13zdyisTktTJsPHMuLn0ItTR0nnh0V0gS66_L7jcMNxmY3myt3nN4asg5rxh5dfDsBIWLiJKPSxtpPEAlxmoILzKa_Z6mhBjoGHEHwbSYd2hUTEbyeHcubit6sF1V6dGCmZHYF7t_iQ1t5xSN0QqfVFQ9RJas39FHKuLfZyB1Ysd1wGbuyHBgxy24N10liPFlLVey786F8baJbmuyS1L9igU3LDth5IByNCdKjiiXH6M9OMQJsdIj-v6c8hU2HoLJd1bs5qobs8noIHY6jLTJHvM-KRbMa4D3_HIyWpcmlwkJRoWPQD9U5BLBYZY9DVcOwLEq5M3wtQ0DcQY_2UmonThIelt5-fr95L4IaPUTyhhyrIGaKbhxj0H97ObQJntEMzbuM9C-jc8VesnI8kNmCAbK-EReLzRu_eH_cYjWUV3_yl3hb4SlzrZb6dk_lrH5L1moDEE7HKsUmU0Ili_7EOk4tgGcfLE1Dh4O455JD5U_LP82Kbz8MhtcSn_0CHlYaYuHQLIO7zr5tUIH0lmv-b7QHf-ingZwM6SviqzYJcOYqb_a5sQL8ifemPizfXv9Cys5tOFjM3GPYz7Z0TuE4XUDmjZRLv27Y3JpiuJaICkIwRvs9BgMIGSo9QzJHG13LFfl0SDqizXp6wDAGhmYeFEDdieICScrLIKz3yhh_UgLNmupwnGkXxGu0ZkjMvFi2TxYCU245YkhzDttSNMPtEWpJhHLdoqS1Ep1cSTJNKdi0WzGDAZtpzO9fD73GPpXIsHDddTqr0lJafcXg_kpohdoNccawbyKEt0hSOnY05u48hzeT3lIm-1Dzm6STjLkkKWMYKEHGjCUBWErshAhdPBT4TiMQD7mFtlnK7e7w4TQDn18GrcgMVOAcCQ8qgSIxpSG3ZvblSPnncW2vxYcOB6l9KFH4iu59DjM_zemU_VmiYgopeYiVxP5VXliKGaR35xyDBKzFx82kC7oazVXLKaxBxPVwjDj3hNOZ7VLmC9zewrrrKLdHMJhchudNBTo9DkafY4sBFERvF1RJ9RpkxWltYFeab3YmyrOa0u0Q9Uf7BmSYEqF6kyvRO4VehN0xK4MO9hDLSbETvxb3vZGh%22%5D&azt=AFoagUWV0pAL3JyG38ityoprb-8srIcXzA%3A1581297229556&cookiesDisabled=false&deviceinfo=%5Bnull%2Cnull%2Cnull%2C%5B%5D%2Cnull%2C%22VN%22%2Cnull%2Cnull%2C%5B%5D%2C%22GlifWebSignIn%22%2Cnull%2C%5Bnull%2Cnull%2C%5B%5D%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2Cnull%2C%5B%5D%2Cnull%2Cnull%2Cnull%2C%5B%5D%2C%5B%5D%5D%5D&gmscoreversion=undefined&';

	var options = {
		url: 'https://accounts.google.com/_/signin/sl/lookup?hl=vi&_reqid=529634&rt=j',
		method: 'POST',
		headers: headers,
		body: dataString
	};

	let response = await request(options);
	return !response.includes(username);
};