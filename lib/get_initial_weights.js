module.exports = function (options){
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
	
	return weights;
}