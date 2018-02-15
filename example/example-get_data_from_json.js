var NeuroNet = require('./../Netconstructor.js');

var neuro = new NeuroNet();

var outputResults = () => 
    data.forEach((item) => 
                 console.log(`${item.input[0]} XOR ${item.input[1]} => ${neuro.run(item.input)} (expected ${item.output})`));

neuro.init()
	 .train('data.json')
	 .save('nn.dat')
	 .then(()=>{
			outputResults(); 
		 }); 
	



