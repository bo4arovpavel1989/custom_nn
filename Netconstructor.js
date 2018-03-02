var async = require('async');
var _thaw = require('thaw.js');

var _thaw2 = _interopRequireDefault(_thaw);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NeuroNet(){
	this.weights;
	this.biases;
	this.zero_w_deltas;
	this.zero_b_deltas;
	this.w_deltas;
	this.b_deltas;
	this.nodes;
	this.options;
	this.error;
	this.min_error;
	this.square_errors;
	this.act;
	this.der;
	this.o_delta;
	this.h_delta;
	this.lr;
	this.defaults = {
		hidden:1,
		hidden_sizes:[2],
		input:2,
		output:1,
		learn_rate: 0.7,
		activation:'sigmoid', //'sigmoid', 'bipolar_sigmoid'
		initial_weights:'standard', //'standard', 'widrow'
		max_epoch: 20000,
		use_best: true, //save best resut if goal wasnt reached
		est_error: 0.005,
		streams_num:400,
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
	var activation = require('./lib/activation.js');
	
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

NeuroNet.prototype.selfCheck = require('./lib/self_check.js');

NeuroNet.prototype.setLayers = require('./lib/set_layers.js');

NeuroNet.prototype.run = require('./lib/run.js');

NeuroNet.prototype.show_progress = require('./lib/show_progress.js')

NeuroNet.prototype.o_calc = require('./lib/layer_calc.js').o;

NeuroNet.prototype.lh_calc = require('./lib/layer_calc.js').lh;

NeuroNet.prototype.h_calc = require('./lib/layer_calc.js').h;

NeuroNet.prototype.i_calc = require('./lib/layer_calc.js').i;

NeuroNet.prototype.train_once = require('./lib/train.js');

NeuroNet.prototype.train = function(data){
	return new Promise(resolve=>{
		var goalReached = false;
		var best_weights = [];
		var best_biases = [];
		const _ = require('lodash');
		
		data = this.setData(data);

		let recursive  = (iter)=>{
		
			this.square_errors = [];
			
			this.w_deltas = this.zero_w_deltas;
			this.b_deltas = this.zero_b_deltas;
			
			var thawedTrain = new _thaw2.default(data,{
				each:(item)=>{
					this.train_once(item.input, item.output);
				},
				done:()=>{
					iter++;
					this.error = _.mean(this.square_errors);
					this.show_progress(iter);
					this.square_errors = [];
					
					if(!this.min_error) this.min_error = this.error;
						
					if (this.error < this.min_error) {
						this.min_error = this.error;
						best_weights = this.weights;
						best_biases = this.biases;
					}
					
					if (this.error < this.options.est_error) { 
						goalReached = true;
						resolve();
					}		
					
					this.applyTrainUpdate();
					
					this.w_deltas = this.zero_w_deltas;
					this.b_deltas = this.zero_b_deltas;
					
					if (iter >= this.options.max_epoch) {
							if (!goalReached && this.options.use_best) {
							console.log(`The goal wasnt reached. Best error result is ${this.min_error}.`)
							this.weights = best_weights;
							this.biases = best_biases;
							this.save(this.options.min_e_result_data) //save best result if goal wasnt reached
						}
						resolve();
					} else {
						if(!goalReached)
						recursive(iter);
					}
				
				}
			});
			
			thawedTrain.tick();
			/*
			async.eachOfLimit(data,this.options.streams_num, 
				
				(item, key, callback)=>{
					process.nextTick(()=>{
						this.train_once(item.input, item.output);
						callback();
					});
				},
				
				(err)=>{
					iter++;
					this.applyTrainUpdate();
					this.error = _.mean(this.square_errors);
					this.show_progress(iter);
					this.square_errors = [];
					
					if(!this.min_error) this.min_error = this.error;
						
					if (this.error < this.min_error) {
						this.min_error = this.error;
						best_weights = this.weights;
					}
					
					if (this.error < this.options.est_error) { 
						goalReached = true;
						resolve();
					}		
					for (let w in this.weights){
						this.weight_deltas[w] = 0;
					}
					if (iter >= this.options.max_epoch) {
							if (!goalReached && this.options.use_best) {
							console.log(`The goal wasnt reached. Best error result is ${this.min_error}.`)
							this.weights = best_weights;
							this.save(this.options.min_e_result_data) //save best result if goal wasnt reached
						}
						resolve();
					} else {
						recursive(iter);
					}
				
			})*/
		};
		
		
		recursive(0);
		
		
	})
	
}



NeuroNet.prototype.applyTrainUpdate = function (){ 
	for (let i = this.weights.length-1;i>=0;i--){
		for (let j = this.weights[i].lenght-1;j>=0;j--){
			this.biases[i][j] == this.b_deltas[i][j]
			for (let k = this.weights[i][j].length-1;k>=0;k--){
				this.weights[i][j][k] += this.w_deltas[i][j][k];
			}
		}
	}
	for (let i = this.biases[this.biases.length-1].length-1;i>=0;i--){
		this.biases[this.biases.length-1][i] += this.b_deltas[this.biases.length-1][i];
	}
}

module.exports = NeuroNet;