
	module.exports = function(input,output, step){	
	//this.selfCheck(input, output);

	this.run(input);		
	
	//calculationg deltas for output
	let layers = this.nodes.length - 1;
	
	output.forEach((o,index)=>{
		this.b_deltas[layers][index] = (o - this.nodes[layers][index]) * this.der(this.nodes[layers][index]); //nodes[layer][index] if val of activation function (input_nodes[...][...])
		this.square_errors.push((o - this.nodes[layers][index])**2);
	})
	
	for (let i = layers; i > 0; i--) {
		let rows =  this.nodes[i].length - 1;
		
		for (let j = rows; j >=0; j--){
			let prevRows = this.nodes[i-1].length-1;
			let b_delta = this.b_deltas[i][j];
			
			for (let k = prevRows; k >=0; k--){
				this.w_deltas[i-1][k][j] += this.nodes[i-1][k] * b_delta;
				this.b_deltas[i-1][k] += this.weights[i-1][k][j] * b_delta * this.der(this.nodes[i-1][k]);
			}
			
		}
		
	}	
	
	if(step % this.options.batch === 0) this.applyTrainUpdate();
}