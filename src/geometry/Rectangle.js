
(function(exports){
  'use strict';

  var Rectangle = function(x,y,width,height) { 
    this.prototype = Function.prototype;
    var _x = x
      , _y = y
      , _width = width
      , _height = height;

    var that = {
      get x(){return _x;},
      get y(){return _y;},
      get width(){return _width;},
      get height(){return _height;},
      get size(){return new Size(_width, _height);}
    }

    that.moveTo = function(point) {that.moveToXY(point.x, point.y);};
    that.moveToXY = function(x, y) {_x = x; _y = y;}
    
    that.contains = function(point) {
      var okX = (point.x >= _x && point.x <= _x + _width)
      var okY = (point.y >= that.y && point.y <= _y + _height);
      var result = okX && okY;
      return result;
    }

    that.toString = function() {return _x + ', ' + _y + ', ' + _width + ', ' + _height};
    
    return that;
  };

  exports.create = function(x, y, width, height) {return new Rectangle(x, y, width, height);};
  exports.Empty = exports.create(0, 0, 0, 0);

})(typeof exports === 'undefined'
  ? this.Rectangle = function(x,y,width,height){return Rectangle.create(x,y,width,height)}
  : exports);
