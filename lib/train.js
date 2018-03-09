
	module.exports = function(input,output, step){	
	//this.selfCheck(input, output);

	let nodes = this.nodes;
	this.run(input,nodes);		
	
	//calculationg deltas for output
	let layers = nodes.length - 1;
	
	output.forEach((o,index)=>{
		this.b_deltas[layers][index] = (o - nodes[layers][index]) * nodes[layers][index] * (1 - nodes[layers][index]);
		this.square_errors.push((o - nodes[layers][index])**2);
	})
	
	for (let i = layers; i > 0; i--) {
		let rows =  nodes[i].length - 1;
		
		for (let j = rows; j >=0; j--){
			let prevRows = nodes[i-1].length-1;
			
			for (let k = prevRows; k >=0; k--){
				if (isNaN(this.b_deltas[i-1][k])) this.b_deltas[i-1][k] = 0;
				this.w_deltas[i-1][k][j] += nodes[i-1][k] * this.b_deltas[i][j];
				this.b_deltas[i-1][k] += this.weights[i-1][k][j] * nodes[i-1][k]*(1-nodes[i-1][k]) * this.b_deltas[i][j];
			}
			
		}
		
	}	
	
	if(step % this.options.batch === 0) this.applyTrainUpdate();
}