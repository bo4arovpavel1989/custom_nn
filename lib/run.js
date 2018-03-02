
module.exports = function(input,nodes){
	//this.selfCheck(input);
	
	nodes = this.nodes;
	node_inputs = this.nodes;
	
	nodes[0] = input;
	
	for (let i = 0; i < this.nodes.length - 1; i++){
		for (let j = this.nodes[i+1].length - 1; j >= 0;j--){
			for (let k this.nodes[i].length - 1; k >=0; k--){
				node_inputs[i+1][j] += this.weights[i][j][k] * nodes[i][k]
			}
			node_inputs[i+1][j] += this.biases[i+1][j];
			nodes[i+1][j] = this.act(node_inputs[i+1][j]);
		}
	}

	return nodes[nodes.length-1];
}