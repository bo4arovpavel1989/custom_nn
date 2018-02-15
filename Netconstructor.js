function NeuroNet(){
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
		learn_rate: 0.7,
		activation:'sigmoid', //'sigmoid', 'bipolar_sigmoid'
		initial_weights:'standard', //'standard', 'widrow'
		max_epoch: 99999,
		use_best: true, //save best resut if goal wasnt reached
		est_error: 0.005,
		console_logging: {
			show: true,
			step: 1000,
			show_iter: true,
			show_error: true,
			show_weights: false,
			show_w_deltas: false
		},
		min_e_result_data:'min_err_res_data.dat'
	};
}

NeuroNet.prototype.setData = function(d){
	if (typeof(d) == 'object') return d;
	else if (typeof(d) == 'string') {
		var fs = require('fs')
		var data = fs.readFileSync(d,'utf-8')
		console.log(data);
		console.log(typeof(data));
		return JSON.parse(data);
	}
}

NeuroNet.prototype.load = require('./lib/fs_handler.js').load;

NeuroNet.prototype.save = require('./lib/fs_handler.js').save;

NeuroNet.prototype.init = function(options){
	this.options = options || {};
	for (let opt in this.defaults){
		if(typeof(this.options[opt]) == 'object') {
			console.log(this.options[opt])
			for (let inner_opt in this.defaults[opt]) {
				if(!this.options[opt][inner_opt]) this.options[opt][inner_opt] = this.defaults[opt][inner_opt]; //defaults for console-logging options
			}
		}
		else if(!this.options[opt]) this.options[opt]=this.defaults[opt] //defaualts for other options
	}
	this.weights = this.weights || this.getInitialWeights();
	
	return this;
}

NeuroNet.prototype.getInitialWeights = require('./lib/get_initial_weights.js');

NeuroNet.prototype.selfCheck = require('./lib/self_check.js');

NeuroNet.prototype.run = require('./lib/run.js');

NeuroNet.prototype.show_progress = require('./lib/show_progress.js')

NeuroNet.prototype.train_once = require('./lib/train.js');

NeuroNet.prototype.train = function(data){
	var goalReached = false;
	var best_weights = {};
	
	data = this.setData(data);
	
	for (var iter = 0; iter <= this.options.max_epoch; iter++){
		
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
		
		this.show_progress(iter);
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