function NeuroNet(){
	this.data;
	this.weights;
	this.weight_deltas;
	this.options;
	this.error;
	this.min_error;
	this.defaults = {
		hidden:1,
		hidden_sizes:[2],
		input:2,
		output:1,
		activation:'sigmoid',
		max_iteration: 90000,
		use_best: true,
		est_error: 0.0005,
		min_e_result_data:'min_err_res_data.dat'
	};
}

NeuroNet.prototype.setData = function(d){
	this.data=d;
}

NeuroNet.prototype.load = require('./lib/fs_handler.js').load;

NeuroNet.prototype.save = require('./lib/fs_handler.js').save;

NeuroNet.prototype.init = function(options){
	this.options = options || {};
	for (let opt in this.defaults){
		if(!this.options[opt]) this.options[opt]=this.defaults[opt]
	}
	this.weights = this.weights || this.getInitialWeights(this.options);
	return this;
}

NeuroNet.prototype.getInitialWeights = require('./lib/get_initial_weights.js');

NeuroNet.prototype.selfCheck = require('./lib/self_check.js');

NeuroNet.prototype.run = require('./lib/run.js');

NeuroNet.prototype.train_once = require('./lib/train.js');

NeuroNet.prototype.train = function(data){
	var goalReached = false;
	var best_weights = {};
	
	for (var iter = 0; iter <= this.options.max_iteration; iter++){
		
		if(!this.min_error) this.min_error = this.error;
			
		if (this.error < this.min_error) {
			this.min_error = this.error;
			best_weights = this.weights;
		}
		
		if (this.error < this.options.est_error) { 
			goalReached = true;
			break;
		}		
		
		this.train_once(data);
	}
	
	if (!goalReached && this.options.use_best) {
		console.log(`The goal wasnt reached. Best error result is ${this.min_error}.`)
		this.weights = best_weights;
		this.save(this.options.min_e_result_data) //save best result if goal wasnt reached
	}	
	
	return this;
}



NeuroNet.prototype.applyTrainUpdate = function (){ 
    Object.keys(this.weights).forEach(key => this.weights[key] += this.weight_deltas[key]);
}

module.exports = NeuroNet;