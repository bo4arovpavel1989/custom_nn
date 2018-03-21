var fs = require('fs');
var q = require('q');

var load = function(path){
	var defer = q.defer();
	fs.readFile(path, 'utf8', (err,data)=>{
		if (err) defer.reject(err);
		else {
			try{
				Object.assign(this,JSON.parse(data));
				defer.resolve(true);
			} catch(e){
				defer.reject(e);
			}	
		}
	});
	
	return defer.promise;
};

var save = function(path){
	var defer = q.defer();
	fs.writeFile(path, JSON.stringify(this), 'utf8', (err) => {
		if (err) defer.reject(err);
		else defer.resolve(true);
	});
	
	return defer.promise;
};

var getCSVData = function(data){
	let dataArray = [];
	data = data.split('\r\n');
	data.forEach((line,index)=>{
		dataArray[index] = {input:[],output:[]};
		line = line.split(';');
		if (line.length !== this.options.input + this.options.output)
			throw new Error ('Data is inconsistent! Line #' + index +': ' + line)
		
		line.forEach((num,index2)=>{
			if (index2 < this.options.input)
				dataArray[index].input.push(parseFloat(num))
			else 
				dataArray[index].output.push(10*parseFloat(num))
		});
	});
	
	return dataArray;
}

module.exports.load = load;
module.exports.save = save;
module.exports.getCSVData = getCSVData;
