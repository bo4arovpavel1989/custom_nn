module.exports = function (){
	var rand = require('random-seed').create();
	var weights = {};

	var weights = new Array(this.layers.length-1) //number of weights is 1 less than number of layers
	
	for (let i = 0; i < weights.length; i++){
		if (i === 0) weights[i] = new Array(this.options.input)
		else weights[i] = new Array(this.options.hidden_sizes[i-1])
	}
	
	for (let i = 0; i < weights.length; i++){
		for(let j = 0; j < weights[i].length; j++){
			if (i < weights.length - 1) weights[i][j] = new Array(this.options.hidden_sizes[i+1]);
			else weights[i][j] = new Array(this.options.output);
		}
	}
	
	for (let i = 0; i < weights.length; i++){
		for (let j = 0; j < weights[i].length; j++){
			for (let k = 0; k < weights[i][j].length; k++){
				weights[i][j][k] = rand.floatBetween(0, 1) - 0.5;
				if(weights[i][j][k] === 0) weights[i][j][k] = 0.0001;
			}
		}
	}
	
	
	return weights;
}