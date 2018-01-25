var NeuroNet = require('./Netconstructor.js');
var neuro = new NeuroNet();
neuro.init({hidden:4, hidden_size:3});
neuro.train([
    {input: [0, 0], output: 0},
    {input: [1, 0], output: 1},
    {input: [0, 1], output: 1},
    {input: [1, 1], output: 0},
]);