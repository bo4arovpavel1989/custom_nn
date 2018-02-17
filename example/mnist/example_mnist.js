var NeuroNet = require('./../../Netconstructor.js');
var mnist = require('./mnist.js')
const set = mnist.set(1000, 20);

const trainingSet = set.training;
var testSet = set.test;

var neuro = new NeuroNet();



var outputResults = () => 
    testSet.forEach((item) => 
                 console.log(`${item.input[0]} XOR ${item.input[1]} => ${neuro.run(item.input)} (expected ${item.output})`));

neuro.init({input:784,hidden_sizes:[392],output:10,console_logging:{step:1}})
	 .train(trainingSet)
	 .save('mnist_net.dat')
	 .then(()=>{
			outputResults(); 
		 }); 
	



