module.exports = function(){
	this.layers = new Array(this.options.hidden + 2) //all hidden layers plus input plus output
	for (let i = 0; i < this.options.hidden + 2; i++){
		if (i === 0) this.layers[i] = new Array(this.options.input)
		else if ( i < this.options.hidden) 	this.layers[i] = new Array(this.options.hidden_sizes[i-1])
		else this.layers[i] = new Arrae(this.options.output)	
	}
}