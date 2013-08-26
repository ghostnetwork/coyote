
(function(exports){
  'use strict';

  exports.create = function(x,y,width,height) { 
    this.prototype = Function.prototype;
    var _x = x
      , _y = y
      , _width = width
      , _height = height;

    var that = {
      get x(){return _x;},
      get y(){return _y;},
      get width(){return _width;},
      get height(){return _height;}
    }
    
    return that;
  };
  
  // pseudo-static functions look like this:
  exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.Rectangle = function(x,y,width,height){return Rectangle.create(x,y,width,height)}
  : exports);
