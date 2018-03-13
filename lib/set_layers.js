module.exports = function(){
	this.nodes = new Array(this.options.hidden + 2) //all hidden layers plus input plus output
	for (let i = 0; i < this.options.hidden + 2; i++){
		if (i === 0) this.nodes[i] = new Float32Array(this.options.input)
		else if ( i <= this.options.hidden) 	this.nodes[i] = new Float32Array(this.options.hidden_sizes[i-1])
		else this.nodes[i] = new Float32Array(this.options.output)	
	}
}