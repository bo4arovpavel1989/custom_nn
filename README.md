# custom_nn


custom_nn is a JavaScript neural network library. Here's an example of using it to approximate the XOR function:


```javascript
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


neuro.init()
	.train(data)
	.save('nn.dat')
	.then(()=>{outputResults()}); 
	
```	
 
## Methods


**neuro.init(options)**


neuro.init() takes a hash of options as its first argument. 

These options are DEFAULT:


```javascript
neuro.init({

	hidden:1,  //number of hidden layers

	hidden_sizes:[2], //sizes of each hidden layer

	input:2, //size of input array
	
	output:1, //size of output array

	learn_rate: 0.7, //learning rate
		
	activation:'sigmoid', //activation fucntion. available: 'sigmoid', 'bipolar_sigmoid'
		
	initial_weights:'standard', //initial weight set mode. available 'standard', 'widrow'
		
	max_epoch: 99999, //maximum numbers of epochs
		
	use_best: true, //save best resut if error threshold wasnt reached	
	est_error: 0.005, //error threshold
		
	min_e_result_data:'min_err_res_data.dat', //path to save data of best error if estimated error wasnt reached	
	
	console_logging: { //console logging options
			
		show: true, //turn console logging on/off
			
		step: 1000, //period of console logging
			
		show_iter: true, //show number of epoch
			
		show_error: true, //show current error
			
		show_weights: false, //show current weights
			
		show_w_deltas: false //show last weight deltas
	}})


```	
	The network will train until the training error has gone below the threshold (default 0.005) or the max number of epochs (default 99999) has been reached, whichever comes first.


	The learning rate is a parameter that influences how quickly the network trains. It's a number from 0 to 1. If the learning rate is close to 0 it will take longer to train. If the learning rate is closer to 1 it will train faster but it's in danger of training to a local minimum and performing badly on new data. The default learning rate is 0.7.


**neuro.train(data_source)**
	THe network starts training, using data from data_source. it can be filename either javascript object. Training ends wether error threshold or max_epoch number is reached. After training you can handle net whatever you want.
	
**neuro.save(filename)**
	Save current network in file. The method returns promise.
	
**neuro.load(filename)**
	Load saved network from file. The method returns promise.