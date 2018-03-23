/*
	This example shows how to get traing data from json file. The net calculates XOR task.
*/

var NeuroNet = require('./../Netconstructor.js');

var neuro = new NeuroNet();

/*Function to caclulate XOR using trained net*/
var outputResults = () => 
    data.forEach((item) => 
                 console.log(`${item.input[0]} XOR ${item.input[1]} => ${neuro.run(item.input)} (expected ${item.output})`));

neuro.init()
	 .train('data.json') //use string argument as relative path to data source file
	 .save('nn.dat') //use string argument  as relative path to store trained net
	 .then(()=>{
			outputResults(); //call function from above after saving net
		 }); 
	



