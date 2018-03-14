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

module.exports.load = load;
module.exports.save = save;
