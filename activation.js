module.exports = {
	sigmoid: x => 1 / (1 + Math.exp(-x)),
	derivative_sigmoid: x => {
						console.log(this);
						const fx = this.sigmoid(x);
						return fx * (1 - fx)
						}
}