
module.exports = function(input){
	this.nodes[0] = input;
	
	for (let i = 1; i < this.nodes.length; i++){
		for (let j = this.nodes[i].length - 1; j >= 0;j--){
			let neuron = this.biases[i][j];
			
			for (let k = this.nodes[i-1].length - 1; k >=0; k--){ 
				neuron += this.weights[i-1][k][j] * this.nodes[i-1][k];
			}
			
			this.nodes[i][j] = this.act(neuron);
		}
	}
	
	return this.nodes[this.nodes.length-1];
}