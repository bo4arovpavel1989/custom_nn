var NeuroNet = require('./../../Netconstructor.js');
var mnist = require('./mnist.js')
const set = mnist.set(8000, 2000);

const trainingSet = set.training;
var testSet = set.test;

var neuro = new NeuroNet();



var outputResults = () => 
    testSet.forEach((item) => 
                 console.log(`${item.input[0]} XOR ${item.input[1]} => ${neuro.run(item.input)} (expected ${item.output})`));

neuro.init({input:784,output:10})
	 .train(trainingSet)
	 .save('mnist_net.dat')
	 .then(()=>{
			outputResults(); 
		 }); 
	



