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

	hidden:[2],  //array defining number of hidden layers and their sizes

	input:2, //size of input array
	
	output:1, //size of output array

	learn_rate: 0.3, //learning rate
		
	activation:'sigmoid', //activation fucntion. available: 'sigmoid', 'bipolar_sigmoid', 'relu', 'leaky_relu'
	
	moment:0.1, //momentum param for weight adjusting during training
	
	l2: 0, //L2 regularization coefficient. set zero if you dont use L2 regularization
	
	csv: false, //use this param to retrieve training and test data from csv. it will use first n (n = 'input' option) values as input and other as output values in each line of csv file
		
	initial_weights:'standard', //initial weight set mode. available 'standard' (random number netween -0.5 and 0.5), 'widrow' (Nguyen – Widrow method of weights init)
		
	max_epoch: 99999, //maximum numbers of epochs
	
	est_error: 0.005, //training error threshold
	
	test: 0, //number of epochs, when test_error is calculated. Bu default 0, that means test_error doesnt calculated
	
	console_logging: { //console logging options
			
		show: true, //turn console logging on/off
			
		step: 1000, //period of console logging
			
		show_iter: true, //show number of epoch
			
		show_error: true, //show current training error
		
		show_test_error: false, //show test error
			
		show_weights: false, //show current weights
			
		show_w_deltas: false //show last weight deltas
	}})


```	

The network will train until the training error has gone below the threshold (default 0.005) or the max number of epochs (default 99999) has been reached, whichever comes first.


The learning rate is a parameter that influences how quickly the network trains. It's a number from 0 to 1. If the learning rate is close to 0 it will take longer to train. If the learning rate is closer to 1 it will train faster but it's in danger of training to a local minimum and performing badly on new data. The default learning rate is 0.7.


**neuro.train(data_source, test_data_source)**
	THe network starts training, using data from data_source and test data from other source. it can be filename either javascript object. Training ends wether error threshold or max_epoch number is reached. After training you can handle net whatever you want.
	
**neuro.save(filename)**
	Save current network in file. The method returns promise.
	
**neuro.load(filename)**
	Load saved network from file. The method returns promise. When loading neoru net you dont need to init it. 
	
For more detailed info see examples in example folder.