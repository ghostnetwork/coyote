
(function(exports){
  'use strict';

  exports.create = function(bounds) { 
    this.prototype = Function.prototype;
    var _bounds = bounds;
    var that = { get bounds(){return _bounds;}};
    return that;
  };
  
  // pseudo-static functions look like this:
  exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.Box = function(bounds){return Box.create(bounds)}
  : exports);
