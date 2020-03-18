/**
 * ResultController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	count:async function(req,res){
		let {command} = req.query;
		let count = await Result.count().where({email:{contains:command || ''}});
		return res.send(count.toString());
	}
};

