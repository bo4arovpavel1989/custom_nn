
	module.exports = function(input,output, step){	
	//this.selfCheck(input, output);

	this.run(input);		
	
	//calculationg deltas for output
	let layers = this.nodes.length - 1;
	
	output.forEach((o,index)=>{
		this.errors[layers][index] = (o - this.nodes[layers][index]); //nodes[layer][index] if val of activation function (input_nodes[...][...])
		this.square_errors.push((this.errors[layers][index])**2);
	})
	
	for (let i = layers; i > 0; i--) {
		let rows =  this.nodes[i].length;
		let prevRows = this.nodes[i-1].length;
		
		for (let j = 0; j < rows; j++){
			let error = this.errors[i][j] * this.der(this.nodes[i][j]); //nodes[i][j] if valur of activation function (input_nodes[...][...])
			this.b_deltas[i][j] += error;
			
			for (let k = 0; k < prevRows; k++){
				if (j === 0) this.errors[i-1][k] = 0;
				this.w_deltas[i-1][k][j] += this.nodes[i-1][k] * error;
				this.errors[i-1][k] += this.weights[i-1][k][j] * error;
			}
			
		}
		
	}	
	
	if(step % this.options.batch === 0) this.applyTrainUpdate();
}