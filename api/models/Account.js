/**
 * Account.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

 module.exports = {
 	attributes: {
 		fullname:{
 			type:'string',
 			required:true,
 			minLength:2
 		},
 		email:{
 			type:'string',
 			isEmail:true,
 			allowNull: true
 		},
 		phone:{
 			type:'string',
 			maxLength:10,
 			allowNull:true,
 			regex: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im,
 			
 		},
 		pass_hash:{
 			type:'string',
 			required:true
 		},
 		active_phone:{
 			type:'boolean',
 			defaultsTo:false
 		},
 		active_email:{
 			type:'boolean',
 			defaultsTo:false
 		}
 	}

 };

