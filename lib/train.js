const _ = require('lodash');

module.exports = function(data){
	var activation = require('./activation.js');
	var act = activation[this.options.activation],
		der = activation[`derivative_${this.options.activation}`];
	var lr = this.options.learn_rate;	
	var weight_deltas = {};
	var nodes = {};
	var inputs = {};
	var square_errors = [];
	
	for (let w in this.weights){
		weight_deltas[w] = 0;
	}
	
	//console.log(this.weights);
	
	for (var {input, output} of data) {
		this.selfCheck(input, output);
		this.run(input,nodes,inputs);
					
		//calculationg deltas for output and last hidden layer
		var o_delta = [];
		var h_delta={};
		var avg_delta={};
		
		output.forEach((o,index)=>{
			o_delta[index] = (o - nodes[`o${index}`]) * der(inputs[`o${index}`]);
			square_errors.push((o - nodes[`o${index}`]) ** 2);
		});
		
		for (let j = 0; j < output.length; j++){
			weight_deltas[`bias_o${j}`] += lr * o_delta[j];
			for (let k = 0; k < this.options.hidden_sizes[this.options.hidden - 1]; k++){
				if(isNaN(h_delta[`h${this.options.hidden - 1}_${k}`])) h_delta[`h${this.options.hidden - 1}_${k}`] = 0;
				
				weight_deltas[`h${this.options.hidden - 1}_${k}_o${j}`] += lr * nodes[`h${this.options.hidden - 1}_${k}`] * o_delta[j];
				
				h_delta[`h${this.options.hidden - 1}_${k}`] += this.weights[`h${this.options.hidden - 1}_${k}_o${j}`] * der(inputs[`h${this.options.hidden - 1}_${k}`]) * o_delta[j];
				
			}
		}
					
		//calculationg deltas for other hidden layers	
		for (let j = this.options.hidden - 1; j > 0; j--){ //from last hidden to second hidden
			for (let k = 0; k < this.options.hidden_sizes[j]; k++){ //size of current hidden
				weight_deltas[`bias_h${j}_${k}`] += lr * h_delta[`h${j}_${k}`];
				for (let m = 0; m < this.options.hidden_sizes[j-1]; m++){ //size of previous hidden
					if(isNaN(h_delta[`h${j-1}_${m}`])) h_delta[`h${j-1}_${m}`] = 0;
					
					weight_deltas[`h${j-1}_${m}_h${j}_${k}`] += lr * nodes[`h${j - 1}_${m}`] * h_delta[`h${j}_${k}`];
					
					h_delta[`h${j-1}_${m}`] += this.weights[`h${j-1}_${m}_h${j}_${k}`] * der(inputs[`h${j-1}_${m}`]) * h_delta[`h${j}_${k}`];
				
				}
			}
		}
		
		//calculationg deltas for input layers;
		for (let j = 0; j < this.options.hidden_sizes[0]; j++){
			weight_deltas[`bias_h0_${j}`] += lr * h_delta[`h0_${j}`];
			for (let k = 0; k < input.length; k++){
				weight_deltas[`i${k}_h0_${j}`] += lr * input[k] * h_delta[`h0_${j}`];
			}
		}
	}
			
	this.weight_deltas = weight_deltas;
	this.applyTrainUpdate();
	this.error = _.mean(square_errors);
	//console.log(weight_deltas);
	
	return this;
}
