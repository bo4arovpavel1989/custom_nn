var NeuroNet = require('./../../Netconstructor.js');
var mnist = require('./mnist.js')
const set = mnist.set(8000, 200);

const trainingSet = set.training;
var testSet = set.test;

var neuro = new NeuroNet();

var get_i_with_max_val = function(arr){
	let i = 0;
	for (let j = 1; j < arr.length; j++){
		if(arr[j] > arr[i]) i = j;
	}
	return i;
}


var outputResults = () => 
    testSet.forEach((item) => 
                 console.log(`${item.input[0]} XOR ${item.input[1]} => ${get_i_with_max_val(neuro.run(item.input))} (expected ${get_i_with_max_val(item.output)})`));

/*
neuro.init({input:784,hidden_sizes:[392],output:10,console_logging:{step:1}})
	 .train(trainingSet)
	 .save('mnist_net.dat')
	 .then(()=>{
			outputResults(); 
		 }); 
	*/

neuro.init()
	 .load('mnist_net.dat')
	 .then(()=>{
		 outputResults(); 
	 })

