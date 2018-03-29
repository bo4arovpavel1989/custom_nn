/*
	This examples shows net calculating tic tac results. 
	
	The database (csv-tic.csv) encodes 80% 0f the complete set of possible board configurations at the end of tic-tac-toe games, 
	where "X" is assumed to have played first. The target concept is "win for X" (i.e., 1 when "X" has one of 8 possible ways to create a "three-in-a-row").
	Attribute Information:

	1. top-left-square: {1, 0, 0.5} //1 for X, 0 for o and 0.5 for blank cell
	2. top-middle-square: {1, 0, 0.5}
	3. top-right-square: {1, 0, 0.5}
	4. middle-left-square: {1, 0, 0.5}
	5. middle-middle-square: {1, 0, 0.5}
	6. middle-right-square: {1, 0, 0.5}
	7. bottom-left-square: {1, 0, 0.5}
	8. bottom-middle-square: {1, 0, 0.5}
	9. bottom-right-square: {1, 0, 0.5}
	10. Class: {positive,negative} (1, 0)
	
	The test database (test.csv) encodes rest part of possible board configuration.
	
*/
var NeuroNet = require('./../Netconstructor.js');

var neuro = new NeuroNet();

neuro.init({csv:true,hidden:[5,3],input:9,est_error:0.01, output:1,l2:0.001,activation:'sigmoid',batch:10,test:100,console_logging:{show_test_error:true,step:10}})
	 .train('csv-tic.csv','test.csv') //first argument - string of relative path to training data, second - relative path to test data
	 .save('tic-tac-net.dat')
	
	



