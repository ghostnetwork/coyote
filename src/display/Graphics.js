
(function(exports){
  'use strict';

  exports.create = function(canvas) { 
    this.prototype = Function.prototype;
    var _canvas = canvas;
    var _context = _canvas.getContext('2d');
    var origFillStyle;

    var that = { 
      get canvas(){return _canvas;},
      get context(){return _context;}
    };

    that.drawFilledRect = function(rect, fillStyle) {
      pushFillStyle(fillStyle);
      _context.fillRect(rect.x, rect.y, rect.width, rect.height);
      popFillStyle();
    };

    that.clearRect = function(rect) {
      _context.clearRect(rect.x, rect.y, rect.width, rect.height);
    };

    that.strokeRect = function(rect) {
      _context.strokeRect(rect.x, rect.y, rect.width, rect.height);
    };

    function pushFillStyle(fillStyle) {
      origFillStyle = _context.fillStyle;
      _context.fillStyle = fillStyle;
    }

    function popFillStyle(fillStyle) {
      _context.fillStyle = origFillStyle;
    }

    return that;
  };
  
  // pseudo-static functions look like this:
  exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.Graphics = function(canvas){return Graphics.create(canvas)}
  : exports);
