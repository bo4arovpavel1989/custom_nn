var activation = require('./activation.js');

function NeuroNet(){
	this.data;
	this.weights;
	this.options;
	this.defaults = {
		hidden:1,
		hidden_size:2,
		input:2,
		output:1,
		activation:'sigmoid'
	};
}

NeuroNet.prototype.setData = function(d){
	this.data=d;
}

NeuroNet.prototype.setWeights = function(w){
	this.weights=w;
}

NeuroNet.prototype.init = function(options){
	this.options = options || {};
	for (let opt in this.defaults){
		if(!this.options[opt]) this.options[opt]=this.defaults[opt]
	}
	this.weights = this.weights || this.getInitialWeights(this.options);
}

NeuroNet.prototype.getInitialWeights = function (options){
	var random = require('seed-random')(1337);
	var weights = {};
	
	//made weights for connections of inputs and first hidden layer
	for (let i = 0; i < options.input; i++){
		for (let j = 0; j < options.hidden_size; j++){
			weights[`i${i}_h0_${j}`] = random();
		}
	}
	
	//made weights for connections of inner hidden layers if thera are more than 1
	for (let i = 0; i < options.hidden - 1; i++){ 
		for (let j = 0; j < options.hidden_size; j++){
			for (let k = 0; k < options.hidden_size; k++){
				weights[`h${i}_${j}_h${i+1}_${k}`] = random();
			}	
		}
	}
	
	//made connections between last hidden layer and output
	for (let i = 0; i < options.hidden_size; i++){
		for (let j =0; j < options.output; j++){
			weights[`h${options.hidden-1}_${i}_o${j}`] = random();
		}
	}
	
	//made bias for all hidden
	for (let i = 0; i < options.hidden; i++){
		for (let j = 0; j < options.hidden_size; j++){
			weights[`bias_h${i}_${j}`] = random();
		}
	}
	
	//made bias for all outputs
	for (let i =0; i < options.output; i++){
			weights[`bias_o${i}`] = random();
	}
	
	console.log(weights);
	
	return weights;
}

NeuroNet.prototype.train = function(data){
	var weight_deltas = {};
	var nodes = {};
	
	for (let w in this.weights){
		weight_deltas[w] = 0;
	}
	//start calculation first hidden layer. coz it always exists
	for (var {input, output} of data) {
	  for (let j = 0; j < this.options.hidden_size; j++){
		var h_input=0;
		for (let k =0; k < input.length; k++){
			h_input += this.weights[`i${k}_h0_${j}`]
		}	
		h_input += this.weights[`bias_h0_${j}`];
		nodes[`h0_${j}`] = activation[this.options.activation](h_input);  
	  }           
    }
	console.log(nodes);
    return weight_deltas;
}

module.exports = NeuroNet;