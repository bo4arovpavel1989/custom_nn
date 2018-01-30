function NeuroNet(){
	this.data;
	this.weights;
	this.weight_deltas;
	this.options;
	this.defaults = {
		hidden:1,
		hidden_size:2,
		input:2,
		output:1,
		activation:'sigmoid'
	};
}

NeuroNet.prototype.setData = function(d){
	this.data=d;
}

NeuroNet.prototype.setWeights = function(w){
	this.weights=w;
}

NeuroNet.prototype.init = function(options){
	this.options = options || {};
	for (let opt in this.defaults){
		if(!this.options[opt]) this.options[opt]=this.defaults[opt]
	}
	this.weights = this.weights || this.getInitialWeights(this.options);
}

NeuroNet.prototype.getInitialWeights = require('./lib/get_initial_weights.js');

NeuroNet.prototype.nn = require('./lib/nn.js');

NeuroNet.prototype.train = require('./lib/train.js');

NeuroNet.prototype.applyTrainUpdate = function (){ 
    Object.keys(this.weights).forEach(key => this.weights[key] += this.weight_deltas[key]);
}

module.exports = NeuroNet;