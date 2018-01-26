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
	
	for (var {input, output} of data) {
		
		//start calculation first hidden layer. coz it always exists
		for (let j = 0; j < this.options.hidden_size; j++){
			let h_input=0;
			for (let k =0; k < input.length; k++){
				h_input += this.weights[`i${k}_h0_${j}`]*input[k];
			}	
			h_input += this.weights[`bias_h0_${j}`];
			nodes[`h0_${j}`] = activation[this.options.activation](h_input);  
		}  

		//start calculation other hidden layer.
		for (let j = 0; j < this.options.hidden - 1; j++){
			for (let k = 0; k < this.options.hidden_size; k++){
				let h_input = 0;
				for (let m = 0; m < this.options.hidden_size; m++){
					h_input += this.weights[`h${j}_${m}_h${j+1}_${k}`]*nodes[`h${j}_${m}`];
				}
				h_input += this.weights[`bias_h${j+1}_${k}`];
				nodes[`h${j+1}_${k}`] = activation[this.options.activation](h_input);
			}
		}	
		
		//start calculation output layer.
		for (let j = 0; j < this.options.output; j++) {
			let o_input = 0;
			for (let k = 0; k < this.options.hidden_size; k++){
				o_input += this.weights[`h${this.options.hidden - 1}_${k}_o${j}`]*nodes[`h${this.options.hidden - 1}_${k}`];
			}
			o_input += this.weights[`bias_o${j}`];
			nodes[`o${j}`] = activation[this.options.activation](o_input);
		}
    }
	console.log(nodes);
    return weight_deltas;
}

module.exports = NeuroNet;