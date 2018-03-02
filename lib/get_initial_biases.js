module.exports = function(){
	var rand = require('random-seed').create();
	
	let biases = JSON.parse(JSON.stringify(this.nodes));
	
	this.zero_b_deltas = JSON.parse(JSON.stringify(this.nodes));
	
	for (let i = 0; i < biases.length;i++){
		for (let j = 0; j < biases[i].length;j++){
			if (i === 0) {
				biases[i][j] = 0;
				this.zero_b_deltas[i][j] = 0;
			}	
			else {
				biases[i][j] = rand.floatBetween(0, 1) - 0.5;
				if (biases[i][j]===0) this.biases[i][j] = 0.0001;
				this.zero_b_deltas[i][j] = 0;
			}	
		}
	}
	return biases;
}