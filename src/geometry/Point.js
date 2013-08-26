
(function(exports){
  'use strict';

  exports.create = function(x, y) { 
    this.prototype = Function.prototype;
    
    var _x = x
      , _y = y;

    var that = {
      get x(){return _x;},
      get y(){return _y;}
    };

    that.moveTo = function(point) {
      _x = point.x;
      _y = point.y;
    };

    that.toString = function() {return x + ', ' + y;};
    
    return that;
  };
  
  // pseudo-static functions look like this:
  exports.pointFromRect = function(rect) {return Point.create(rect.x, rect.y);};

})(typeof exports === 'undefined'
  ? this.Point = function(x, y){return Point.create(x, y)}
  : exports);
