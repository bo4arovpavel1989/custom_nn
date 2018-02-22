module.exports.o = function(o,index){
	this.o_delta[index] = (o - this.nodes[`o${index}`]) * this.der(this.inputs[`o${index}`]);
	this.square_errors.push((o - this.nodes[`o${index}`]) ** 2);
	return o;
}

module.exports.lo = function(){
	
}

module.exports.h = function(){
	
}

module.exports.i = function(){
	
}