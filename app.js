var R = require('ramda');
var NeuroNet = require('./Netconstructor.js');
var neuro = new NeuroNet();
var data = [
    {input: [0, 0], output: [0]},
    {input: [1, 0], output: [1]},
    {input: [0, 1], output: [1]},
    {input: [1, 1], output: [0]},
]

neuro.init();

var outputResults = () => 
    data.forEach((item) => 
                 console.log(`${item.input[0]} XOR ${item.input[1]} => ${neuro.nn(item.input)} (expected ${item.output})`));


R.times(() => neuro.train(data), 999999)


outputResults(); 