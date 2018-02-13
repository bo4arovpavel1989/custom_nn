
var activation =  {
	sigmoid: x => 1 / (1 + Math.exp(-x)),
	derivative_sigmoid: x => {
						const fx = activation.sigmoid(x);
						return fx * (1 - fx)
					},
	bipolar_sigmoid:  x => ((2 / (1 + Math.exp(-x))) - 1),	
	derivative_bipolar_sigmoid: x => {
						const fx = activation.bipolar_sigmoid(x);
						return 0.5 * (1 + fx) * (1 - fx)
					}
};

module.exports = activation;