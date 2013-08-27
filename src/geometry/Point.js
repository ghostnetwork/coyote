
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

    that.moveToXY = function(x, y) {_x = x; _y = y;};
    that.moveTo = function(point) {that.moveToXY(point.x, point.y);};

    that.toString = function() {return x + ', ' + y;};
    
    return that;
  };
  
  // pseudo-static functions look like this:
  exports.pointFromRect = function(rect) {return Point.create(rect.x, rect.y);};

})(typeof exports === 'undefined'
  ? this.Point = function(x, y){return Point.create(x, y)}
  : exports);
