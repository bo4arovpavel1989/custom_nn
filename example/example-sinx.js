var NeuroNet = require('./../Netconstructor.js');

var neuro = new NeuroNet();

neuro.init({est_error:0.001,hidden:2,csv:true,activation:'bipolar_sigmoid',hidden_sizes:[3,2],batch:10,max_epoch:99999999})
	 .train('sinx_plus_cosy.csv')
	 .save('sinx.dat')
	 .then(()=>{
		  outputResults();
	 })
	 
	
	



