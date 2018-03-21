var NeuroNet = require('./../Netconstructor.js');

var neuro = new NeuroNet();

neuro.init({est_error:0.001,hidden:[5],input:10,output:1,activation:'leaky-relu',batch:1,console_logging:{step:1}})
	 .train('poker-data.JSON')
	 .save('pokernet.dat')
	 .then(()=>{
	 })
	 .catch((e)=>{
		 console.log(e)
	 })
	 
	
	



