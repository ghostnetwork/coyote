var _, Displayable;

(function(exports){
  'use strict';

  // exports.create = function(bounds, fillStyle) { 
  var Box = function(bounds, fillStyle) {
    this.prototype = Function.prototype;
    var that = Displayable.create(bounds);

    var _borderColor = 'black'
      , _fillStyle = fillStyle;

    that.render = function(graphics) {
      graphics.context.save();
      clearDisplay(graphics);
      drawBorder(graphics);
      graphics.context.restore();
      return that;
    };

    that.updateDisplayForAcceptingDrop = function(accepts) {updateBorderColorForDrop(accepts)};
    function updateBorderColorForDrop(accepts) {_borderColor = accepts ? 'yellow' : 'black';}
    function clearDisplay(graphics) {graphics.drawFilledRect(that.bounds, _fillStyle);}

    function drawBorder(graphics) {
      graphics.context.save();
      graphics.context.lineWidth = 3;
      graphics.context.strokeStyle = _borderColor;
      var pad = 0
        , x = that.bounds.x + pad
        , y = that.bounds.y + pad
        , width = that.bounds.width - (pad * 2)
        , height = that.bounds.height - (pad * 2);
      graphics.context.strokeRect(x, y, width, height);
      graphics.context.restore();
    }

    Object.defineProperty(that, 'fillStyle', {get : function() {return fillStyle;},enumerable : true});
    
    return that;
  };

  if (typeof require !== 'undefined') {
    require('verdoux');

    if (isNotRunningInBrowser()) { 
      _ = require('underscore');
      Displayable = require('./Displayable');
    }
  }
  
  exports.create = function(bounds, fillStyle){return new Box(bounds, fillStyle);};
})(typeof exports === 'undefined'
  ? this.Box = function(bounds, fillStyle){return Box.create(bounds, fillStyle)}
  : exports);
