
	module.exports = function(input,output, step){	
	//this.selfCheck(input, output);

	this.run(input);		
	
	//calculationg deltas for output
	let layers = this.nodes.length - 1;
	
	output.forEach((o,index)=>{
		this.errors[layers][index] = (o - this.nodes[layers][index]); 
		this.square_errors.push((this.errors[layers][index])**2);
	})
	
	for (let i = layers; i > 0; i--) {
		let rows =  this.nodes[i].length;
		let prevRows = this.nodes[i-1].length;
		let w_sum = new Float32Array(prevRows); //sum of weights between prevRows and Raws
		
		for (let j = 0; j < rows; j++){
			let error = this.errors[i][j] * this.der(this.nodes[i][j]); //nodes[i][j] if value of activation function (input_nodes[...][...])
			this.b_deltas[i][j] += error;
		
			for (let k = 0; k < prevRows; k++){
				this.w_deltas[i-1][k][j] += this.nodes[i-1][k] * error;
				w_sum[k] += this.weights[i-1][k][j];
				
				if (j === rows-1) { //when i get the last iteration of rows
					this.errors[i-1][k] = w_sum[k] * error
				}	
				
			}
			
		}
		
	}	
	
	if(step % this.options.batch === 0) this.applyTrainUpdate();
}