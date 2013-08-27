
(function(exports){
  'use strict';

  exports.create = function(width, height) { 
    this.prototype = Function.prototype;
    var _width = width;
    var _height = height;

    var that = {
      get width(){return _width;},
      get height(){return _height;}
    };

    that.toString = function() {return _width + 'x' + _height;};

    return that;
  };
  
  // pseudo-static functions look like this:
  exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.Size = function(width, height){return Size.create(width, height)}
  : exports);
