var Threads = require('webworker-threads');

let infinity = function (n){
	for (let j=0; j<5;j++){
		console.log(n);
	}
}

for (let i = 0; i < 5; i++){
	let t = Threads.create();
	t.eval(infinity(i)).eval('infinity('+i+')',function(){
		console.log('done');
		this.destroy()
	});
}