module.exports = function(d){
	const _ = require('lodash');
	var self = this;
	var diff_arr = [];
	
	for (var {input, output} of d) {
		this.run(input).forEach((o,index)=>{
			diff_arr.push((o - output[index])**2);
		})
	}
	
	return _.mean(diff_arr);
};