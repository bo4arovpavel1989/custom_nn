
module.exports = function(input,nodes){
	//this.selfCheck(input);
	
	nodes = this.nodes;
	node_inputs = this.nodes;
	console.log(nodes);
	nodes[0] = input;
	
	for (let i = 1; i < this.nodes.length - 1; i++){
		for (let j = this.nodes[i].length - 1; j >= 0;j--){
			for (let k = this.nodes[i-1].length - 1; k >=0; k--){
				node_inputs[i][j] += this.weights[i-1][j][k] * nodes[i-1][k]
			}
			node_inputs[i][j] += this.biases[i][j];
			nodes[i][j] = this.act(node_inputs[i][j]);
		}
	}

	return nodes[nodes.length-1];
}