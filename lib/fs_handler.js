var fs = require('fs');
var q = require('q');

var load = function(path){
	var defer = q.defer();
	fs.readFile(path, 'utf8', (err,data)=>{
		if (err)
			defer.reject(err);
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
		if (err) 
			defer.reject(err);
		else 
			defer.resolve(true);
	});
	
	return defer.promise;
};

var getCSVData = function(data){
	let dataArray = [];
	data = data.split('\r\n');
	
	data.forEach((line,index)=>{
		dataArray[index] = {input:[],output:[]};
		line = line.split(';');
		
		if (line.length > 1 && line.length !== this.options.input + this.options.output) //check consistency of non-empty line
			throw new Error ('Data is inconsistent! Line #' + index +': ' + line)
		
		if(line.length > 1) //skip empty line if any
			line.forEach((num,index2)=>{
				if (index2 < this.options.input)
					dataArray[index].input.push(parseFloat(num))
				else 
					dataArray[index].output.push(parseFloat(num))
			});
	});
	
	return dataArray;
}

module.exports.load = load;
module.exports.save = save;
module.exports.getCSVData = getCSVData;
