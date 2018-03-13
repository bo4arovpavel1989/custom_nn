const _ = require('lodash');

function NeuroNet(){
	this.weights;
	this.biases;
	this.w_deltas;
	this.b_deltas;
	this.errors;
	this.nodes;
	this.options;
	this.error;
	this.square_errors;
	this.act;
	this.der;
	this.lr;
	this.defaults = {
		hidden:1,
		hidden_sizes:[2],
		input:2,
		output:1,
		learn_rate: 0.3,
		batch:1,
		activation:'sigmoid', //'sigmoid', 'bipolar_sigmoid'
		initial_weights:'standard', //'standard', 'widrow'
		max_epoch: 20000,
		est_error: 0.005,
		console_logging: {
			show: true,
			step: 1000,
			show_iter: true,
			show_error: true,
			show_weights: false,
			show_w_deltas: false
		}
	};
}

NeuroNet.prototype.setData = function(d){
	if (typeof(d) == 'object') return d;
	else if (typeof(d) == 'string') {
		var fs = require('fs')
		var data = fs.readFileSync(d,'utf-8');
		return JSON.parse(data);
	}
}

NeuroNet.prototype.load = require('./lib/fs_handler.js').load;

NeuroNet.prototype.save = require('./lib/fs_handler.js').save;

NeuroNet.prototype.init = function(options){
	var activation = require('./lib/activation.js');
	
	this.options = options || {};
	
	for (let opt in this.defaults){
		if(typeof(this.options[opt]) == 'object') {
			for (let inner_opt in this.defaults[opt]) {
				if(!this.options[opt][inner_opt]) this.options[opt][inner_opt] = this.defaults[opt][inner_opt]; //defaults for console-logging options
			}
		}
		else if(!this.options[opt]) this.options[opt]=this.defaults[opt] //defaualts for other options
	}
	
	this.setLayers();
	this.weights = this.weights || this.getInitialWeights();
	this.biases = this.biases || this.getInitialBiases();
	//TODO make zero_w_deltas and aero_b_deltas init
	
	this.act = activation[this.options.activation],
	this.der = activation[`derivative_${this.options.activation}`];
	this.lr = this.options.learn_rate;
	
	return this;
}

NeuroNet.prototype.getInitialWeights = require('./lib/get_initial_weights.js');

NeuroNet.prototype.getInitialBiases = require('./lib/get_initial_biases.js');

NeuroNet.prototype.selfCheck = require('./lib/self_check.js');

NeuroNet.prototype.setLayers = require('./lib/set_layers.js');

NeuroNet.prototype.run = require('./lib/run.js');

NeuroNet.prototype.show_progress = require('./lib/show_progress.js')

NeuroNet.prototype.train_once = require('./lib/train.js');

NeuroNet.prototype.train = function(data){
		var goalReached = false;
		var iter = 0;
		
		data = this.setData(data);
		
		while(!goalReached && iter <= this.options.max_epoch){
			iter++;
			
			this.square_errors = [];
			
			for (let step = data.length - 1; step >=0; step--){
				this.train_once(data[step].input, data[step].output, step);
			}
			
			this.error = _.mean(this.square_errors);
			this.show_progress(iter);
										
			if (this.error < this.options.est_error) { 
				console.log(this.error)
				goalReached = true;
			}	
		}
		
	return this;
}



NeuroNet.prototype.applyTrainUpdate = function (){ 
	for (let i = 0; i < this.weights.length; i++){
		for (let j = this.weights[i].length-1;j>=0;j--){
			this.biases[i][j] += this.lr * this.b_deltas[i][j];
			this.b_deltas[i][j] = 0;
			for (let k = this.weights[i][j].length-1;k>=0;k--){
				this.weights[i][j][k] += this.lr * this.w_deltas[i][j][k];
				this.w_deltas[i][j][k] = 0;
			}
		}
	}
	for (let i = this.biases[this.biases.length-1].length-1;i>=0;i--){ //apply biases of output layer
		this.biases[this.biases.length-1][i] += this.lr * this.b_deltas[this.biases.length-1][i];
		this.b_deltas[this.biases.length-1][i] = 0;
	}
}

module.exports = NeuroNet;