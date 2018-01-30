
var activation =  {
	sigmoid: x => 1 / (1 + Math.exp(-x)),
	derivative_sigmoid: x => {
						const fx = activation.sigmoid(x);
						return fx * (1 - fx)
					}
};

module.exports = activation;