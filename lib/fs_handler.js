var fs = require('fs');
var q = require('q');

var load = function(path){
	var self = this;
	var defer = q.defer();
	
	fs.readFile(path, 'utf8', (err,data)=>{
		if (err) defer.reject(err);
		else {
			try{
				data = JSON.parse(data);
				let data_error = false;
				
				if(data.options) {
					for (let opt in data.options){
						self.options[opt]=data.options[opt];
					}	
				}
				else {
					data_error = true;
					defer.reject('No options found!'); 	
				}	
				
				if(data.weights) self.weights = data.weights;
				else {
					data_error = true;
					defer.reject('No weights found!');
				}	
				
				if(data.error)self.error = data.error;
				else data_error = true;
				
				if(data.min_error)self.min_error = data.min_error;
				else data_error = true;
				
				if(!data_error) defer.resolve(true);
			} catch(e){
				defer.reject(e);
			}	
		}
	});
	
	return defer.promise;
};

var save = function(path){
	var defer = q.defer();
	fs.writeFile(path, JSON.stringify({options:this.options,weights:this.weights,biases:this.biases,error:this.error,min_error:this.min_error}), 'utf8', (err) => {
		if (err) defer.reject(err);
		else defer.resolve(true);
	});
	
	return defer.promise;
};

module.exports.load = load;
module.exports.save = save;
