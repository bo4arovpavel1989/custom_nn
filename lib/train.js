var Threads = require('webworker-threads');

module.exports = function(input,output){	
	this.selfCheck(input, output);
	this.run(input);
				
	//calculationg deltas for output
	this.o_delta = [];
	this.h_delta={};
		
	output.forEach((o,index)=>{
		let t = Threads.create();
		t.eval(this.o_calc(o,index)).eval('this.o_calc('+o+', '+index+')',(err,res)=>{
			this.destroy();
		});
	});
	
	//calculationg deltas for last hidden
	for (let j = 0; j < this.options.output; j++){
		let t = Threads.create();
		t.eval(this.lh_calc(j)).eval('this.lh_calc('+j+')',(err,res)=>{
			this.destroy();
		});
	}
				
	//calculationg deltas for other hidden layers	
	for (let j = this.options.hidden - 1; j > 0; j--){ //from last hidden to second hidden
		for (let k = 0; k < this.options.hidden_sizes[j]; k++){ //size of current hidden
			this.weight_deltas[`bias_h${j}_${k}`] += this.lr * this.h_delta[`h${j}_${k}`];
			for (let m = 0; m < this.options.hidden_sizes[j-1]; m++){ //size of previous hidden
				if(isNaN(this.h_delta[`h${j-1}_${m}`])) this.h_delta[`h${j-1}_${m}`] = 0;
				
				this.weight_deltas[`h${j-1}_${m}_h${j}_${k}`] += this.lr * this.nodes[`h${j - 1}_${m}`] * this.h_delta[`h${j}_${k}`];
				
				this.h_delta[`h${j-1}_${m}`] += this.weights[`h${j-1}_${m}_h${j}_${k}`] * this.der(this.inputs[`h${j-1}_${m}`]) * this.h_delta[`h${j}_${k}`];
			
			}
		}
	}
	
	//calculationg deltas for input layers;
	for (let j = 0; j < this.options.hidden_sizes[0]; j++){
		let t = Threads.create();
		t.eval(this.i_calc(j,input)).eval(`this.i_calc(${j},${input})`,(err,res)=>{
			this.destroy();
		});
	}
		
	//console.log(weight_deltas);
	
	return this;
}
