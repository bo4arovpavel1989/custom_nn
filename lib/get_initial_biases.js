module.exports = fucntion(){
	var rand = require('random-seed').create();
	let biases = this.layers;
	
	for (let i = 0; i < this.biases.length){
		for (let j = 0; j < this.biases[i].length){
			if (i === 0) this.biases[i][j] = 0;
			else {
				this.biases[i][j] = rand.floatBetween(0, 1) - 0.5;
				if (this.biases[i][j]===0) this.biases[i][j] = 0.0001;
			}	
		}
	}
	
	return biases;
}