module.exports = function (options){
	var random = require('seed-random')();
	var weights = {};
	
	function initial_widrow (weights) {
		for (let i = 0; i < this.options.hidden; i++){
			var total_hidden = this.options.hidden_sizes[i];
			var beta = 0.7 * (total_hidden) ** (1 / this.options.input);
			var old = random() - 0.5;
			var old_module = 0, square_sum = 0;
			if (i > 0) {
				for (let j = 0; j < total_hidden; j++){
					square_sum += weights[`h${i - 1}`]
				}
			}
		}
	}
	
	
	//made weights for connections of inputs and first hidden layer
	for (let i = 0; i < options.input; i++){
		for (let j = 0; j < options.hidden_sizes[0]; j++){
			weights[`i${i}_h0_${j}`] = random() - 0.5;
		}
	}
	
	//made weights for connections of inner hidden layers if thera are more than 1
	for (let i = 0; i < options.hidden - 1; i++){ 
		for (let j = 0; j < options.hidden_sizes[i]; j++){
			for (let k = 0; k < options.hidden_sizes[i+1]; k++){
				weights[`h${i}_${j}_h${i+1}_${k}`] = random() - 0.5;
			}	
		}
	}
	
	//made connections between last hidden layer and output
	for (let i = 0; i < options.hidden_sizes[options.hidden-1]; i++){
		for (let j =0; j < options.output; j++){
			weights[`h${options.hidden-1}_${i}_o${j}`] = random() - 0.5;
		}
	}
	
	//made bias for all hidden
	for (let i = 0; i < options.hidden; i++){
		for (let j = 0; j < options.hidden_sizes[i]; j++){
			weights[`bias_h${i}_${j}`] = random() - 0.5;
		}
	}
	
	//made bias for all outputs
	for (let i =0; i < options.output; i++){
			weights[`bias_o${i}`] = random() - 0.5;
	}
	
	return weights;
}