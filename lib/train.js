
	module.exports = function(input,output){	
	//this.selfCheck(input, output);
	let nodes=[];
	let node_inputs={};
	let b_deltas = this.b_deltas; //bias deltas
	let w_deltas = this.w_deltas; //weight deltas
	
	this.run(input,nodes, node_inputs);		
	//calculationg deltas for output
	console.log(nodes[nodes.length - 1])
	output.forEach((o,index)=>{
		b_deltas[nodes.length - 1][index] = (o - nodes[nodes.length - 1][index])*this.der(node_inputs[nodes.length - 1][index]);
		this.square.errors.push((o - nodes[nodes.length - 1][index])**2)
	})
	
	for (let i = nodes.length - 1; i > 0; i--) {
		for (let j = 0; j < nodes[i].length; j++){
			this.b_deltas[i][j] += this.lr * b_deltas[i][j];
			for (let k = 0; k < nodes[i-1].length; k++){
				this.w_deltas[i-1][k][j] += this.lr * nodes[i-1][k] * b_deltas[i][j];
				b_deltas[i-1][j] += this.weights[i-1][k][j] * this.der(node_inputs[i-1][k]) * b_deltas[i][j];
			}
		}
	}	
}