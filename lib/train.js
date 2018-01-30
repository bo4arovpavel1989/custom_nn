module.exports = function(data){
	var activation = require('./activation.js');
	var act = activation[this.options.activation],
		der = activation[`derivative_${this.options.activation}`];
	var weight_deltas = {};
	var nodes = {};
	var inputs = {};
	
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
			inputs[`h0_${j}`] = h_input;
			nodes[`h0_${j}`] = act(h_input);  
		}  

		//start calculation other hidden layer.
		for (let j = 0; j < this.options.hidden - 1; j++){
			for (let k = 0; k < this.options.hidden_size; k++){
				let h_input = 0;
				for (let m = 0; m < this.options.hidden_size; m++){
					h_input += this.weights[`h${j}_${m}_h${j+1}_${k}`]*nodes[`h${j}_${m}`];
				}
				h_input += this.weights[`bias_h${j+1}_${k}`];
				inputs[`h${j+1}_${k}`] = h_input;
				nodes[`h${j+1}_${k}`] = act(h_input);
			}
		}	
		
		//start calculation output layer.
		for (let j = 0; j < output.length; j++) {
			let o_input = 0;
			for (let k = 0; k < this.options.hidden_size; k++){
				o_input += this.weights[`h${this.options.hidden - 1}_${k}_o${j}`]*nodes[`h${this.options.hidden - 1}_${k}`];
			}
			o_input += this.weights[`bias_o${j}`];
			inputs[`o${j}`] = o_input;
			nodes[`o${j}`] = act(o_input);
		}
		
		//calculationg deltas for output and last hidden layer
		var o_delta = [];
		var h_delta={};
		var avg_delta={};
		
		output.forEach((o,index)=>{
			o_delta[index] = (o - nodes[`o${index}`])*der(inputs[`o${index}`]);
		});
		
				
		for (let j = 0; j < output.length; j++){
			weight_deltas[`bias_o${j}`] += o_delta[j];
			for (let k = 0; k < this.options.hidden_size; k++){
				if(isNaN(h_delta[`h${this.options.hidden - 1}_${k}`])) h_delta[`h${this.options.hidden - 1}_${k}`] = 0;
				
				weight_deltas[`h${this.options.hidden - 1}_${k}_o${j}`] += nodes[`h${this.options.hidden - 1}_${k}`]*o_delta[j];
				
				h_delta[`h${this.options.hidden - 1}_${k}`] += der(inputs[`h${this.options.hidden - 1}_${k}`]) * o_delta[j];
				
			}
		}
		
		
		//calculationg deltas for other hidden layers	
		for (let j = this.options.hidden - 1; j > 0; j--){
			for (let k = 0; k < this.options.hidden_size; k++){
				weight_deltas[`bias_h${j}_${k}`] += h_delta[`h${j}_${k}`];
				for (let m = 0; m < this.options.hidden_size; m ++){
					if(isNaN(h_delta[`h${j-1}_${k}`])) h_delta[`h${j-1}_${k}`] = 0;
					
					weight_deltas[`h${j-1}_${k}_h${j}_${m}`] += nodes[`h${j - 1}_${k}`]*h_delta[`h${j}_${m}`];
					
					h_delta[`h${j-1}_${k}`] += der(inputs[`h${j-1}_${k}`]) * h_delta[`h${j}_${m}`];
					
				}
			}
		}
		
		//calculationg deltas for input layers;
		for (let j = 0; j < this.options.hidden_size; j++){
			weight_deltas[`bias_h0_${j}`] += h_delta[`h0_${j}`];
			for (let k = 0; k < input.length; k++){
				weight_deltas[`i${k}_h0_${j}`] += input[k] * h_delta[`h0_${j}`];
			}
		}
    }
	
	
    this.weight_deltas = weight_deltas;
	this.applyTrainUpdate();
}
