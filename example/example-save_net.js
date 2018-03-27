/*
	This example shows how to init new net, train it and save by acheiving estimated error threshold. The net calculates XOR task
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

neuro.init({est_error:0.0000001,l2:0.001,hidden:[2,5,3],initial_weights:'widrow',batch:1,max_epoch:99999999}) //net init options. Takes an object as argument
	 .train(data) //Object as argument for training data
	 .save('nn.dat') //String asd argument for relative path to store net
	 .then(()=>{
		  outputResults(); //call function from above after saving net
	 })
	 
	
	



