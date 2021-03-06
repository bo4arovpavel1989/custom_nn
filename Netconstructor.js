const _ = require('lodash');
const fs = require('fs');
const activation = require('./lib/activation.js');

function NeuroNet(){
	this.weights;
	this.biases;
	this.beta; //for widrow weight init
	this.w_deltas;
	this.b_deltas;
	this.w_moment;
	this.errors;
	this.nodes;
	this.options;
	this.error;
	this.test_error;
	this.square_errors;
	this.act;
	this.der;
	this.lr;
	this.stop;
	this.data_size;
	this.defaults = {
		hidden:[2],
		input:2,
		output:1,
		learn_rate: 0.3,
		moment:0.1,
		l2:0, //l2 regularization coefficient
		batch:1,
		test:0, //calculate test error during training every n epoch. dy default n = 0, so it doesnt calculate at all
		csv:false,
		emergency_save:true, //save net if process was interrupted
		activation:'sigmoid', //'sigmoid', 'bipolar_sigmoid'
		initial_weights:'standard', //'standard', 'widrow'
		max_epoch: 20000,
		est_error: 0.005,
		console_logging: {
			show: true,
			step: 1000,
			show_iter: true,
			show_error: true,
			show_test_error: false,
			show_weights: false,
			show_w_deltas: false
		}
	};
}

NeuroNet.prototype.setData = function(d){
	if (typeof(d) === 'object')
		return d;
	else if (typeof(d) === 'string') {
		var data = fs.readFileSync(d,'utf-8');
		if(this.options.csv)
			return this.getCSVData(data);
		else
			return JSON.parse(data);
	}
}

NeuroNet.prototype.load = require('./lib/fs_handler.js').load;

NeuroNet.prototype.save = require('./lib/fs_handler.js').save;

NeuroNet.prototype.saveSync = require('./lib/fs_handler.js').saveSync;

NeuroNet.prototype.getCSVData = require('./lib/fs_handler.js').getCSVData;

NeuroNet.prototype.init = function(options){
	this.options = options || {};
	
	for (let opt in this.defaults){
		if(typeof(this.options[opt]) == 'object') {
			for (let inner_opt in this.defaults[opt]) {
				if(!this.options[opt][inner_opt])
					this.options[opt][inner_opt] = this.defaults[opt][inner_opt]; //defaults for array and object options
			}
		}
		else if(!this.options[opt]) 
			this.options[opt]=this.defaults[opt] //defaults for other options
	}
	
	this.setLayers();
	this.weights = this.weights || this.getInitialWeights();
	this.biases = this.biases || this.getInitialBiases();	
	this.act = activation[this.options.activation],
	this.der = activation[`derivative_${this.options.activation}`];
	this.lr = this.options.learn_rate;
	
	return this;
}

NeuroNet.prototype.getInitialWeights = require('./lib/get_initial_weights.js');

NeuroNet.prototype.getInitialBiases = require('./lib/get_initial_biases.js');

NeuroNet.prototype.setLayers = require('./lib/set_layers.js');

NeuroNet.prototype.run = require('./lib/run.js');

NeuroNet.prototype.show_progress = require('./lib/show_progress.js')

NeuroNet.prototype.train_once = require('./lib/train.js');

NeuroNet.prototype.train = function(data, testData){
		let goalReached = false;
		let iter = 0;
		let max_epoch = this.options.max_epoch;
		this.stop = false;
		
		data = this.setData(data);
		this.data_size = data.length;
		
		this.saveOnInterrupt();
		
		for (let iter = 0; iter <= max_epoch; iter++){
			this.square_errors = [];
			
			if(this.stop || goalReached) break;
			
			for (let step = data.length - 1; step >=0; step--){
				this.train_once(data[step].input, data[step].output, step);
			}
			
			this.error = _.mean(this.square_errors);
			
			if(this.options.test > 0 && iter % this.options.test === 0) 
				this.test(testData);
			
			this.show_progress(iter);
			
			if (this.error < this.options.est_error) 
				goalReached = true;
		}
		
	return this;
}

NeuroNet.prototype.test = function(data){
	data = this.setData(data);
	let square_errors = [];
	
	for (let step = data.length - 1; step >=0; step--){
		let output = this.run(data[step].input);
		let target = data[step].output;
		
		target.forEach((t,index) => {
			square_errors.push((t - output[index])**2)
		})
	}
	
	this.test_error = _.mean(square_errors);
		
	return this;
}

NeuroNet.prototype.applyTrainUpdate = function (){ 
	let l2 = this.options.l2,
		lr = this.lr,
		ds = this.data_size;

	for (let i = 0; i < this.weights.length; i++){
		
		for (let j = this.weights[i].length-1; j>=0; j--){
			this.biases[i][j] += lr * this.b_deltas[i][j];
			this.b_deltas[i][j] = 0.0;
			
			for (let k = this.weights[i][j].length-1; k>=0; k--){
				let adjust = this.w_moment[i][j][k];
				
				if(l2 > 0)
					adjust = lr * (this.w_deltas[i][j][k] + (l2/ds) * this.weights[i][j][k]) + this.options.moment * adjust;
				else 
					adjust = lr * this.w_deltas[i][j][k] + this.options.moment * adjust;
				
				this.w_moment[i][j][k] = adjust;
				this.weights[i][j][k] += adjust;
				this.w_deltas[i][j][k] = 0.0;
			}
		}
	}
	
	for (let i = this.biases[this.biases.length-1].length-1; i>=0; i--){ //apply biases of output layer
		this.biases[this.biases.length-1][i] += lr * this.b_deltas[this.biases.length-1][i];
		this.b_deltas[this.biases.length-1][i] = 0.0;
	}
}

NeuroNet.prototype.saveOnInterrupt = function(stop){
	if (process.platform === "win32") {
	  var rl = require("readline").createInterface({
		input: process.stdin,
		output: process.stdout
	  });

	  rl.on("SIGINT", function () {
		process.emit("SIGINT");
	  });
	}
	
	process.on('SIGINT', ()=>{
		this.stop = true;
		console.log('siginit')
		this.saveSync('emergency_save_net2.dat')
		process.exit();
	});
}

module.exports = NeuroNet;