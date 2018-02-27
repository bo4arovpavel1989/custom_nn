module.exports = function(input,output){	
	this.selfCheck(input, output);
	let nodes={};
	let inputs={};
	this.run(input,nodes,inputs);		
	//calculationg deltas for output
	let o_delta = [];
	let h_delta={};
	
	output.forEach((o,index)=>{
		o_delta[index] = (o - nodes[`o${index}`]) * this.der(inputs[`o${index}`]);
		this.square_errors.push((o - nodes[`o${index}`]) ** 2);
	});
	
	//calculationg deltas for last hidden
	for (let j = 0; j < this.options.output; j++){
		this.weight_deltas[`bias_o${j}`] += this.lr * o_delta[j];
		for (let k = 0; k < this.options.hidden_sizes[this.options.hidden - 1]; k++){
			if(isNaN(h_delta[`h${this.options.hidden - 1}_${k}`])) h_delta[`h${this.options.hidden - 1}_${k}`] = 0;
			
			this.weight_deltas[`h${this.options.hidden - 1}_${k}_o${j}`] += this.lr * nodes[`h${this.options.hidden - 1}_${k}`] * o_delta[j];
			
			h_delta[`h${this.options.hidden - 1}_${k}`] += this.weights[`h${this.options.hidden - 1}_${k}_o${j}`] * this.der(inputs[`h${this.options.hidden - 1}_${k}`]) * o_delta[j];
			
		}
	}
				
	//calculationg deltas for other hidden layers	
	for (let j = this.options.hidden - 1; j > 0; j--){ //from last hidden to second hidden
		for (let k = 0; k < this.options.hidden_sizes[j]; k++){ //size of current hidden
			this.weight_deltas[`bias_h${j}_${k}`] += this.lr * h_delta[`h${j}_${k}`];
			for (let m = 0; m < this.options.hidden_sizes[j-1]; m++){ //size of previous hidden
				if(isNaN(h_delta[`h${j-1}_${m}`])) h_delta[`h${j-1}_${m}`] = 0;
				
				this.weight_deltas[`h${j-1}_${m}_h${j}_${k}`] += this.lr * nodes[`h${j - 1}_${m}`] * h_delta[`h${j}_${k}`];
				
				h_delta[`h${j-1}_${m}`] += this.weights[`h${j-1}_${m}_h${j}_${k}`] * this.der(inputs[`h${j-1}_${m}`]) * h_delta[`h${j}_${k}`];
			
			}
		}
	}
	
	//calculationg deltas for input layers;
	for (let j = 0; j < this.options.hidden_sizes[0]; j++){
		this.weight_deltas[`bias_h0_${j}`] += this.lr * h_delta[`h0_${j}`];
		for (let k = 0; k < this.options.input; k++){
			this.weight_deltas[`i${k}_h0_${j}`] += this.lr * input[k] * h_delta[`h0_${j}`];
		}
	}
	delete h_delta;
	delete o_delta;
	delete nodes;
	delete inputs;
}