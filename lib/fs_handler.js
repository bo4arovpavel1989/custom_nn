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
				if(data.act) {
					for (let opt in data.options){
						self.options[opt]=data.options[opt];
					}
				}	
				if(data.weights) self.weights = data.weights;
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
	fs.writeFile(path, JSON.stringify({options:this.options,weights:this.weights}), 'utf8', (err) => {
		if (err) defer.reject(err);
		else defer.resolve(true);
	});
	
	return defer.promise;
};

module.exports.load = load;
module.exports.save = save;
