function* abc() {

  console.log(1);

  yield empty;

  console.log(2);

  yield empty;
}

function empty(fn) {

	fn(null,3);
}

var ss = abc();

var one = ss.next();

thunkToPromise(one.value).then(function(data){
 
	ss.next(data);	
})

function thunkToPromise(fn) {
  var ctx = this;
  return new Promise(function(resolve, reject) {
    fn.call(ctx, function(err, res) {
     
      if (err) return reject(err);
      if (arguments.length > 2) res = slice.call(arguments, 1);
      resolve(res);
    });
  });
}
