
module.exports = function(input,nodes,node_inputs){
	//this.selfCheck(input);
	nodes = nodes || this.nodes;
	nodes[0] = input;
	
	for (let i = 1; i < this.nodes.length; i++){
		for (let j = this.nodes[i].length - 1; j >= 0;j--){
			nodes[i][j] = nodes[i][j] || 0;
			for (let k = this.nodes[i-1].length - 1; k >=0; k--){ 
				nodes[i][j] += this.weights[i-1][k][j] * nodes[i-1][k];
			}
			nodes[i][j] += this.biases[i][j];
			nodes[i][j] = this.act(nodes[i][j]);
		}
	}
	return nodes[nodes.length-1];
}