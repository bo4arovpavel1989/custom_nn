module.exports = function (){
	var weights = new Array(this.nodes.length - 1) //number of weights is 1 less than number of layers
	this.beta = new Array(this.nodes.length - 1)
	
	for (let i = 0; i < weights.length; i++){
		if (i === 0)
			weights[i] = new Array(this.options.input)
		else 
			weights[i] = new Array(this.options.hidden[i-1]);
		
		for(let j = 0; j < weights[i].length; j++){
			if (i < weights.length - 1) 
				weights[i][j] = new Float32Array(this.options.hidden[i]);
			else 
				weights[i][j] = new Float32Array(this.options.output);
		}
	}
	
	this.w_deltas =  JSON.parse(JSON.stringify(weights))
	this.w_moment =  JSON.parse(JSON.stringify(weights))
	
	for (let i = 0; i < weights.length; i++){
		
		for (let j = 0; j < weights[i].length; j++){
			
			for (let k = 0; k < weights[i][j].length; k++){
				weights[i][j][k] = Math.random() - 0.5;
				if(weights[i][j][k] === 0)
					weights[i][j][k] = 0.0001;
				
				this.w_deltas[i][j][k] = 0.0;
				this.w_moment[i][j][k] = 0.0;
			}
		}
	}
	
	getWidrow = () => {
		for (let i = 1; i < this.nodes.length; i++){
			this.beta[i] = 0.7 * ((this.nodes[i].length)**(1/this.nodes[i-1].length))
			
			for (let j = 0; j < this.nodes[i].length; j++){
				let w_sq_sum = 0;
				
				for (let k = 0; k < this.nodes[i-1].length; k++){
					w_sq_sum += weights[i-1][k][j] ** 2;
				}
				
				w_sq_sum = Math.sqrt(w_sq_sum);
				
				for (let k = 0; k < this.nodes[i-1].length; k++){
					weights[i-1][k][j] = this.beta[i] * weights[i-1][k][j] / w_sq_sum;
				}
			}
		}
	}
	
	if (this.options.initial_weights === 'widrow') 
		getWidrow();
	
	return weights;
}