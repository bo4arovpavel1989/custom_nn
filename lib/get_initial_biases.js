module.exports = function(){
	
	let biases = JSON.parse(JSON.stringify(this.nodes));
	
	this.b_deltas = JSON.parse(JSON.stringify(this.nodes));
	
	this.errors = JSON.parse(JSON.stringify(this.nodes));
	
	for (let i = 0; i < biases.length;i++){
		for (let j = 0; j < biases[i].length;j++){
			if (i === 0) {
				biases[i][j] = 0;
				this.b_deltas[i][j] = 0.0;
			}	
			else {
				biases[i][j] = setBias(i);
				if (biases[i][j]===0) this.biases[i][j] = 0.0001;
				this.b_deltas[i][j] = 0.0;
			}	
		}
	}
	
	(function setBias(i) {
		if (this.options.initial_weights === 'widrow') 
			return Math.random() * 2 * this.beta[i] - this.beta[i];
		else return Math.random() - 0.5;
	}).bind(this)
	
	
	return biases;
}