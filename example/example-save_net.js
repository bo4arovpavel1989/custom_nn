var NeuroNet = require('./../Netconstructor.js');

var neuro = new NeuroNet();

var data = [
    {input: [0, 0], output: [0]},
    {input: [1, 0], output: [1]},
    {input: [0, 1], output: [1]},
    {input: [1, 1], output: [0]}
]

var outputResults = () => 
    data.forEach((item) => 
                 console.log(`${item.input[0]} XOR ${item.input[1]} => ${neuro.run(item.input)} (expected ${item.output})`));

neuro.init({est_error:0.0001,hidden:[2,5,3],initial_weights:'widrow',batch:1,max_epoch:99999999})
	 .train(data)
	 .save('nn.dat')
	 .then(()=>{
		  outputResults();
	 })
	 
	
	



