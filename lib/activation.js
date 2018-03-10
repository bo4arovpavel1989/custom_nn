
var activation =  {
	sigmoid: x => 1 / (1 + Math.exp(-x)),
	derivative_sigmoid: fx => {
						return fx * (1 - fx)
					},
	bipolar_sigmoid:  x => ((2 / (1 + Math.exp(-x))) - 1),	
	derivative_bipolar_sigmoid: fx => {
						return 0.5 * (1 + fx) * (1 - fx)
					}
};

module.exports = activation;