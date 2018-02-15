module.exports = function(iter){
	if(this.options.console_logging.show && iter % this.options.console_logging.step == 0){
		if(this.options.console_logging.show_iter) console.log(`Epoch №${iter}`);
		if(this.options.console_logging.show_error) console.log(`Error: ${this.error}`);
		if(this.options.console_logging.show_weights) console.log(`Weights: ${JSON.stringify(this.weights)}`);
		if(this.options.console_logging.show_w_deltas) console.log(`Weight-deltas: ${JSON.stringify(this.weight_deltas)}`);
	}
}