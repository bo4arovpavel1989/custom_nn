module.exports = function(input,nodes,inputs){
	this.selfCheck(input);
	
	var activation = require('./activation.js');
	var act = activation[this.options.activation],
		der = activation[`derivative_${this.options.activation}`];
	var output = [];
	nodes = nodes || {};
	inputs = inputs || {};
	
	//start calculation first hidden layer. coz it always exists
		for (let j = 0; j < this.options.hidden_sizes[0]; j++){
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
			for (let k = 0; k < this.options.hidden_sizes[j]; k++){
				let h_input = 0;
				for (let m = 0; m < this.options.hidden_sizes[j+1]; m++){
					h_input += this.weights[`h${j}_${m}_h${j+1}_${k}`]*nodes[`h${j}_${m}`];
				}
				h_input += this.weights[`bias_h${j+1}_${k}`];
				inputs[`h${j+1}_${k}`] = h_input;
				nodes[`h${j+1}_${k}`] = act(h_input);
			}
		}	
		
		//start calculation output layer.
		for (let j = 0; j < this.options.output; j++) {
			let o_input = 0;
			for (let k = 0; k < this.options.hidden_sizes[this.options.hidden - 1]; k++){
				o_input += this.weights[`h${this.options.hidden - 1}_${k}_o${j}`]*nodes[`h${this.options.hidden - 1}_${k}`];
			}
			o_input += this.weights[`bias_o${j}`];
			inputs[`o${j}`] = o_input;
			nodes[`o${j}`] = act(o_input);
			output.push(act(o_input));
		}
		
		return output;
}