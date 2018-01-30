var R = require('ramda');
var NeuroNet = require('./Netconstructor.js');
var neuro = new NeuroNet();
var data = [
    {input: [0, 0], output: [0]},
    {input: [1, 0], output: [1]},
    {input: [0, 1], output: [1]},
    {input: [1, 1], output: [0]},
]

neuro.init({hidden:4});
neuro.train(data);

var calculateResults = () =>
    R.mean(data.map(({input: [i1, i2], output: y}) => Math.pow(y - neuro.nn([i1, i2]), 2)));

var outputResults = () => 
    data.forEach((item) => 
                 console.log(`${item.input[0]} XOR ${item.input[1]} => ${neuro.nn(item.input)} (expected ${item.output})`));


R.times(() => neuro.train(data), 999999)
				 
calculateResults();

outputResults(); 