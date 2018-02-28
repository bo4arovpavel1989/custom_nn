
module.exports = function(input,nodes,inputs){
	//this.selfCheck(input);
	let output = [];
	nodes = nodes || {};
	inputs = inputs || {};
	
	//start calculation first hidden layer. coz it always exists
		for (let j = 0; j < this.options.hidden_sizes[0]; j++){
			let h_input=0;
			for (let k =0; k < input.length; k++){
				h_input += this.weights[`i${k}_h0_${j}`] * input[k];
			}	
			h_input += this.weights[`bias_h0_${j}`];
			inputs[`h0_${j}`] = h_input;
			nodes[`h0_${j}`] = this.act(h_input);  
		}  

		//start calculation other hidden layer.
		for (let j = 1; j < this.options.hidden; j++){
			for (let k = 0; k < this.options.hidden_sizes[j]; k++){
				let h_input = 0;
				for (let m = 0; m < this.options.hidden_sizes[j-1]; m++){
					h_input += this.weights[`h${j-1}_${m}_h${j}_${k}`] * nodes[`h${j-1}_${m}`];
				}
				h_input += this.weights[`bias_h${j}_${k}`];
				inputs[`h${j}_${k}`] = h_input;
				this.nodes[`h${j}_${k}`] = this.act(h_input);
			}
		}	
		
		//start calculation output layer.
		for (let j = 0; j < this.options.output; j++) {
			let o_input = 0;
			for (let k = 0; k < this.options.hidden_sizes[this.options.hidden - 1]; k++){
				o_input += this.weights[`h${this.options.hidden - 1}_${k}_o${j}`] * nodes[`h${this.options.hidden - 1}_${k}`];
			}
			o_input += this.weights[`bias_o${j}`];
			inputs[`o${j}`] = o_input;
			nodes[`o${j}`] = this.act(o_input);
			output.push(this.act(o_input));
		}
		
		return output;
}