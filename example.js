var NeuroNet = require('./Netconstructor.js');
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

neuro.init({hidden:5, activation:'bipolar_sigmoid', hidden_sizes:[4,2,2,5,7]})
	 .train('data.json')
	 .save('nn.dat')
	 .then(()=>{
			outputResults(); 
			console.log(neuro);
		 }); 
	


