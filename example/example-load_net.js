/*
	This example shows how to load previously saved net from file. The net calculates XOR task
*/

var NeuroNet = require('./../Netconstructor.js');

var neuro = new NeuroNet();

var data = [
    {input: [0, 0], output: [0]},
    {input: [1, 0], output: [1]},
    {input: [0, 1], output: [1]},
    {input: [1, 1], output: [0]}
]

/*Function to caclulate XOR using trained net*/
var outputResults = () => 
    data.forEach((item) => 
                 console.log(`${item.input[0]} XOR ${item.input[1]} => ${neuro.run(item.input)} (expected ${item.output})`));

neuro.load('nn.dat') //load net from file. string argument, defining relative path to file
	 .then(()=>{
		outputResults(); //call function from above after loading net
	 }); 
	



