module.exports = function(){
	this.nodes = new Array(this.options.hidden.length + 2) //all hidden layers plus input plus output
	
	for (let i = 0; i < this.options.hidden.length + 2; i++){
		if (i === 0)
			this.nodes[i] = new Float32Array(this.options.input)
		else if ( i <= this.options.hidden.length) 
			this.nodes[i] = new Float32Array(this.options.hidden[i-1])
		else 
			this.nodes[i] = new Float32Array(this.options.output)	
	}
	
}