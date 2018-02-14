module.exports = function (){
	var rand = require('random-seed').create();
	var weights = {};
	var options = this.options;
	
	function initial_widrow (weights) {
		
		for (let j = 0; j < options.hidden_sizes[0]; j++){ //widrow weights for between input and first hidden
			let total_hidden = options.hidden_sizes[0];
			let beta = 0.7 * (total_hidden) ** (1 / options.input);
			let square_sum = 0;
			for (let k = 0; k < options.input; k++){
				square_sum += (weights[`i${k}_h0_${j}`]) ** 2
			}
			for (let k = 0; k < options.input; k++){
				weights[`i${k}_h0_${j}`] = (beta * weights[`i${k}_h0_${j}`]) / (Math.sqrt(square_sum));
			}
		}
		
		for (let i = 1; i < options.hidden; i++){ //widrow weights for between hidden layers
			for (let j = 0; j < options.hidden_sizes[i]; j++){
				let total_hidden = options.hidden_sizes[i];
				let prev_hidden = options.hidden_sizes[i - 1];
				let beta = 0.7 * (total_hidden) ** (1 / prev_hidden);
				let square_sum = 0;
				for (let k = 0; k < prev_hidden; k++){
					square_sum += (weights[`h${i-1}_${k}_h${i}_${j}`]) ** 2
				}
				for (let k = 0; k < prev_hidden; k++){
					weights[`h${i-1}_${k}_h${i}_${j}`] = (beta * weights[`h${i-1}_${k}_h${i}_${j}`]) / (Math.sqrt(square_sum));
				}
			}
		}
		
		return weights;
	}
	
	
	//made weights for connections of inputs and first hidden layer
	for (let i = 0; i < options.input; i++){
		for (let j = 0; j < options.hidden_sizes[0]; j++){
			weights[`i${i}_h0_${j}`] = rand.floatBetween(0.01, 1) - 0.5
		}
	}
	
	//made weights for connections of inner hidden layers if thera are more than 1
	for (let i = 0; i < options.hidden - 1; i++){ 
		for (let j = 0; j < options.hidden_sizes[i]; j++){
			for (let k = 0; k < options.hidden_sizes[i+1]; k++){
				weights[`h${i}_${j}_h${i+1}_${k}`] = rand.floatBetween(0.01, 1) - 0.5
			}	
		}
	}
	
	//made connections between last hidden layer and output
	for (let i = 0; i < options.hidden_sizes[options.hidden-1]; i++){
		for (let j =0; j < options.output; j++){
			weights[`h${options.hidden-1}_${i}_o${j}`] = rand.floatBetween(0.01, 1) - 0.5
		}
	}
	
	//made bias for all hidden
	for (let i = 0; i < options.hidden; i++){
		for (let j = 0; j < options.hidden_sizes[i]; j++){
			weights[`bias_h${i}_${j}`] = rand.floatBetween(0.01, 1) - 0.5
		}
	}
	
	//made bias for all outputs
	for (let i =0; i < options.output; i++){
			weights[`bias_o${i}`] = rand.floatBetween(0.01, 1) - 0.5
	}
	
	if (this.options.initial_weights == 'widrow') weights = initial_widrow(weights)
	
	return weights;
}