module.exports = function(input, output){
	if(this.options){		
		if (this.options.hidden != this.options.hidden_sizes.length) {
			throw new Error('Error setting hidden layers properties!');
		}
		
		if(input){
			if (input.length != this.options.input) {
				throw new Error('Wrong length of input!');
			}
		}
		
		if(output){					if(output.length != this.options.output) {
				throw new Error('Wrong length of output!');
			}

		}
	} else {
		console.log('Net is not inited yet!');
	}
}