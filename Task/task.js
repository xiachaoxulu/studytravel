!(function(win) {



  function Task(resolver) {
    if (!resolver || (typeof resolver).toUpperCase() != 'FUNCTION') {
      throw 'task arg is function,and is must';
      return;
    }


    if (!(this instanceof Task)) return new Task(resolver);

    var self = this;
    //PENDING,FULFILLED,REJECTED
    self.statu = 'PENDING';
    self.callbackok = null;
    self.callbackreject = null;

    self.value = null;
    self.reason = null;

    function resolve(data) {
      self.statu = 'FULFILLED';
      self.value = data || {};
      self.callbackok && self.callbackok(self.value);
    }

    function reject(reason) {
      self.statu = 'REJECTED';
      self.reason = reason || {};
      self.callbackreject && self.callbackreject(self.reason);
    }


    resolver(resolve, reject);

  }

  
  Task.all = function(arr) {

    if (!(arr instanceof Array)) {
      throw 'arr must be Task Array';
      return;
    }

    return Task(function(resolve, reject) {
      var dataarr = {};
      var len = arr.length;
      for (var i = 0; i < len; i++) {
        (function(c) {
          console.log(arr[c]);
          arr[c].then(function(data) {
            dataarr[c] = data;
            len--;
            if (len == 0) {
              var data = new Array(len);
              for (var item in dataarr) {
                data[item] = dataarr[item];
              }
              resolve(data);
            }

          }, function(error) {
            reject(error);
          })
        })(i)
      }
    })
  }

  //创建一个成功状态的Task对象
  Task.resolve = function(value) {

    return new Task(function(resolve) {
      resolve(value);
    })
  }

  Task.prototype.then = function(onFulfilled, onRejected) {

    var task = this;

    return Task(function(resolve, reject) {

      function callback(value) {

        var ret = (typeof onFulfilled).toUpperCase() == 'FUNCTION' && onFulfilled(value) || value;

        if (isThenable(ret)) {
          ret.then(function(value) {
            resolve(value);
          }, function(reason) {
            reject(reason);
          });
        } else {
          resolve(ret);
        }
      }

      function errorback(reason) {
        reason = (typeof onRejected).toUpperCase() == 'FUNCTION' && onRejected(reason) || reason;
        reject(reason);
      }

      if (task.statu === 'PENDING') {
        task.callbackok = callback;
        task.callbackreject = errorback;
      } else if (task.statu === 'FULFILLED') {
        callback(task.value);
      } else if (task.statu === 'REJECTED') {
        errorback(task.reason);
      }

    });

  }

  var isThenable = function(obj) {
    return obj && typeof obj['then'] == 'function';
  }

  window.Task = Task;

})(window)
