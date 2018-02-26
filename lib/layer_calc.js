module.exports.o = function(o,index){
	this.o_delta[index] = (o - this.nodes[`o${index}`]) * this.der(this.inputs[`o${index}`]);
	this.square_errors.push((o - this.nodes[`o${index}`]) ** 2);
	return o;
}

module.exports.lh = function(j){
	this.weight_deltas[`bias_o${j}`] += this.lr * this.o_delta[j];
		for (let k = 0; k < this.options.hidden_sizes[this.options.hidden - 1]; k++){
			if(isNaN(this.h_delta[`h${this.options.hidden - 1}_${k}`])) this.h_delta[`h${this.options.hidden - 1}_${k}`] = 0;
			
			this.weight_deltas[`h${this.options.hidden - 1}_${k}_o${j}`] += this.lr * this.nodes[`h${this.options.hidden - 1}_${k}`] * this.o_delta[j];
			
			this.h_delta[`h${this.options.hidden - 1}_${k}`] += this.weights[`h${this.options.hidden - 1}_${k}_o${j}`] * this.der(this.inputs[`h${this.options.hidden - 1}_${k}`]) * this.o_delta[j];
			
		}
}

module.exports.h = function(){
	
}

module.exports.i = function(j,input){
	this.weight_deltas[`bias_h0_${j}`] += this.lr * this.h_delta[`h0_${j}`];
		for (let k = 0; k < this.options.input; k++){
			this.weight_deltas[`i${k}_h0_${j}`] += this.lr * input[k] * this.h_delta[`h0_${j}`];
		}
}