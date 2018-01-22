function NeuroNet(){
	this.data;
	this.weights;
	this.options;
	this.defaults = {
		hidden:1,
		hidden_size:2,
		input:2,
		output:1
	};
}

NeuroNet.prototype.setData = function(d){
	this.data=d;
}

NeuroNet.prototype.setWeights = function(w){
	this.weights=w;
}

NeuroNet.prototype.init = function(options){
	this.options = options || this.defaults;
	this.weights = this.weights || this.getInitialWeights(this.options);
}

NeuroNet.prototype.getInitialWeights = function (options){
	var random = require('seed-random')(1337);
	var weights = {};
	
	for (let i = 0; i < options.input; i++){
		for (let j = 0; j < options.hidden_size; j++){
			weights[`i${i}_h0_${j}`] = random();
		}
	}
	
	for (let i = 0; i < options.hidden - 1; i++){ 
		for (let j = 0; j < options.hidden_size; j++){
			for (let k = 0; k < options.hidden_size; k++){
				weights[`h${i}_${j}_h${i+1}_${k}`] = random();
			}	
		}
	}
	
	for (let i = 0; i < options.hidden_size; i++){
		for (let j =0; j < options.output; j++){
			weights[`h${options.hidden-1}_${i}_o${j}`] = random();
		}
	}
	
	for (let i = 0; i < options.hidden; i++){
		for (let j = 0; j < options.hidden_size; j++){
			weights[`bias_h${i}_${j}`] = random();
		}
	}
	
	for (let i =0; i < options.output; i++){
			weights[`bias_o${i}`] = random();
	}
	
	console.log(weights);
	
	return weights;
}

module.exports = NeuroNet;