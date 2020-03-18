const CryptoJS = require("crypto-js");
const CryptoRandomString = require('crypto-random-string');
const {crypt:{key,index}} = require('../../nuxt.config');
let encode = function(str){
    let start = CryptoRandomString({length: index, characters: 'qwertyuiopasdf+ghjklzxcvb/nm1234==567890QWERTYUI==OPA/SDFGHJKLZXCVBNM'});
    let end = CryptoRandomString({length: 100-index, characters: 'qwertyu==iopasdf+ghjklzxcvb/nm12345==67890QWERTYUIOPASD/FGHJKLZXCVBNM'});
    let center = CryptoJS.AES.encrypt(str, key).toString();
    if(center.slice(0,10) === 'U2FsdGVkX1')  center = center.slice(10);
    return start + center +end;

};

let decode = function(hash){
    let token_remake = 'U2FsdGVkX1'+hash.slice(index).slice(0,100-index);
    return CryptoJS.AES.decrypt(token_remake,key).toString(CryptoJS.enc.Utf8);
};
module.exports = {encode,decode};