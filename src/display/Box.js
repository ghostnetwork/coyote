
(function(exports){
  'use strict';

  exports.create = function(bounds, fillStyle) { 
    this.prototype = Function.prototype;

    var _bounds = bounds;
    var _fillStyle = fillStyle;

    var that = { 
      get bounds(){return _bounds;},
      get fillStyle(){return _fillStyle;}
    };

    that.moveTo = function(graphics, point, doRender) {
      _bounds.moveTo(point);
      var shouldRender = (existy(doRender) && doRender);
      if (shouldRender)
        that.render(graphics);
      return that;
    };

    that.render = function(graphics) {
      graphics.context.save();
      graphics.drawFilledRect(_bounds, _fillStyle);
      graphics.context.restore();

      graphics.context.save();
      drawBorder(graphics);
      graphics.context.restore();
      return that;
    };

    function drawBorder(graphics) {
      graphics.context.save();
      graphics.context.lineWidth = 3;
      graphics.context.strokeStyle = 'black';
      var pad = 0;
      graphics.context.strokeRect(_bounds.x+pad, _bounds.y+pad, _bounds.width-pad*2, _bounds.height-pad*2);
      graphics.context.restore();
    }

    return that;
  };
  
  // pseudo-static functions look like this:
  exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.Box = function(bounds, fillStyle){return Box.create(bounds, fillStyle)}
  : exports);
