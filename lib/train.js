
	module.exports = function(input,output){	
	//this.selfCheck(input, output);
	let nodes = this.nodes;
	let errors = {}; //bias deltas
	this.run(input,nodes);		
	
	//calculationg deltas for output
	
	output.forEach((o,index)=>{
		errors[`${nodes.length - 1}.${index}`] = (o - nodes[nodes.length - 1][index]) * nodes[nodes.length - 1][index] * (1 - nodes[nodes.length - 1][index]);
		this.square_errors.push((o - nodes[nodes.length - 1][index])**2);
	})
	
	for (let i = nodes.length - 1; i > 0; i--) {
		for (let j = nodes[i].length - 1; j >=0; j--){
			this.b_deltas[i][j] += this.lr * errors[`${i}.${j}`];
			errors[`${i-1}.${j}`] = 0;
			for (let k = nodes[i-1].length-1; k >=0; k--){
				if (isNaN(errors[`${i-1}.${k}`])) errors[`${i-1}.${k}`] = 0;
				this.w_deltas[i-1][k][j] += this.lr * nodes[i-1][k] * errors[`${i}.${j}`];
				errors[`${i-1}.${k}`] += this.weights[i-1][k][j] * nodes[i-1][k]*(1-nodes[i-1][k]) * errors[`${i}.${j}`];
			}
		}
	}	
}