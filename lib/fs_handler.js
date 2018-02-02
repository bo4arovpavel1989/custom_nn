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
				console.log(data);
				if(data.act) self.options.activation = data.act;
				if(data.weights) self.weights = data.weights;
				console.log(self);
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
	fs.writeFile(path, JSON.stringify({act:this.options.activation,weights:this.weights}), 'utf8', (err) => {
		if (err) defer.reject(err);
		else defer.resolve(true);
		return defer.promise;
	});
};

module.exports.load = load;
module.exports.save = save;
