
var activation =  {
	sigmoid: x => 1 / (1 + Math.exp(-x)),
	derivative_sigmoid: fx => fx * (1 - fx),
	bipolar_sigmoid:  x => (2 / (1 + Math.exp(-x))) - 1,	
	derivative_bipolar_sigmoid: fx =>  0.5 * (1 + fx) * (1 - fx),
	relu: x => x > 0 ? x : 0,
	derivative_relu: fx => 	fx > 0 ? 1 : 0,
	leaky_relu:  x => x > 0 ? x : 0.01 * x,
	derivative_leaky_relu: fx => fx > 0 ? 1 : 0.01
};

module.exports = activation;