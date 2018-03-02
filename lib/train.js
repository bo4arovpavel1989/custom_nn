
	module.exports = function(input,output){	
	//this.selfCheck(input, output);
	let nodes = this.nodes;
	let node_inputs = this.nodes;
	let errors = this.b_deltas; //bias deltas
	console.log(JSON.stringify(this.weights))
	this.run(input,nodes, node_inputs);		
	//calculationg deltas for output
	output.forEach((o,index)=>{
		errors[nodes.length - 1][index] = (o - nodes[nodes.length - 1][index])*this.der(node_inputs[nodes.length - 1][index]);
		this.square_errors.push((o - nodes[nodes.length - 1][index])**2)
	})
	
	for (let i = nodes.length - 1; i > 0; i--) {
		for (let j = 0; j < nodes[i].length; j++){
			//console.log( errors[i][j])
			this.b_deltas[i][j] += this.lr * errors[i][j];
			for (let k = 0; k < nodes[i-1].length; k++){
				this.w_deltas[i-1][k][j] += this.lr * nodes[i-1][k] * errors[i][j];
				errors[i-1][j] += this.weights[i-1][k][j] * this.der(node_inputs[i-1][k]) * errors[i][j];
				console.log('w - ' + this.weights[i-1][k][j]);
				console.log('der ' + this.der(node_inputs[i-1][k]));
				console.log('err ' + errors[i][j]);
			}
		}
	}	
	//console.log(this.w_deltas);
	//console.log(this.b_deltas);
}