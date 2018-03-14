var NeuroNet = require('./../Netconstructor.js');

var neuro = new NeuroNet();

var outputResults = () => 
    data.forEach((item) => 
                 console.log(`${item.input[0]} XOR ${item.input[1]} => ${neuro.run(item.input)} (expected ${item.output})`));

neuro.init({hidden:1,est_error:0.001,activation:'bipolar_sigmoid',hidden_sizes:[2],batch:1})
	 .train('data.json')
	 .save('nn.dat')
	 .then(()=>{
			outputResults(); 
		 }); 
	



