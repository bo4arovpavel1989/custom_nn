var NeuroNet = require('./../../Netconstructor.js');
var mnist = require('./mnist.js')
const set = mnist.set(60000, 1000);

const trainingSet = set.training;
var testSet = set.test;

console.log(trainingSet.length)
var neuro = new NeuroNet();

var get_i_with_max_val = function(arr){
	let i = 0;
	for (let j = 1; j < arr.length; j++){
		if(arr[j] > arr[i]) i = j;
	}
	return i;
}

var right = 0;
var total = testSet.length;

var outputResults = () => 
    testSet.forEach((item) => {
                 console.log(`${get_i_with_max_val(neuro.run(item.input))} (expected ${get_i_with_max_val(item.output)})`);
				 if (get_i_with_max_val(neuro.run(item.input)) == get_i_with_max_val(item.output)) right++;
	})

	

neuro.init({input:784,hidden_sizes:[392],output:10,console_logging:{step:1}})
	 .train(trainingSet)
			outputResults(); 
			console.log((right/total) * 100)
	
/*
neuro.init()
	 .load('mnist_net.dat')
	 .then(()=>{
		 outputResults(); 
		 console.log((right/total) * 100)
	 })*/

