
	module.exports = function(input,output){	
	//this.selfCheck(input, output);
	let nodes = this.nodes;
	let errors = {}; //bias deltas
	this.run(input,nodes);		
	//calculationg deltas for output
	//console.log(nodes)
	output.forEach((o,index)=>{
		errors[`${nodes.length - 1}.${index}`] = (o - nodes[nodes.length - 1][index])*nodes[nodes.length - 1]*(1 - nodes[nodes.length - 1]);
		this.square_errors.push((o - nodes[nodes.length - 1][index])**2);
		//console.log(errors[`${nodes.length - 1}.${index}`])
	})
	
	for (let i = nodes.length - 1; i > 0; i--) {
		for (let j = 0; j < nodes[i].length; j++){
			console.log( errors[`${i}.${j}`])
			this.b_deltas[i][j] += this.lr * errors[`${i}.${j}`];
			errors[`${i-1}.${j}`] = errors[`${i-1}.${j}`] || 0;
			for (let k = 0; k < nodes[i-1].length; k++){
				this.w_deltas[i-1][k][j] += this.lr * nodes[i-1][k] * errors[`${i}.${j}`];
				errors[`${i-1}.${j}`] += this.weights[i-1][k][j] * nodes[i-1][k]*(1-nodes[i-1][k]) * errors[`${i}.${j}`];
			}
		}
	}	
	//console.log(this.w_deltas);
	//console.log(this.b_deltas);
}