var _, Displayable;

(function(exports){
  'use strict';

  var Box = function(spec) {
    this.prototype = Function.prototype;
    var fillStyle = existy(spec) && existy(spec.fillStyle) ? spec.fillStyle : undefined;
    var that = Displayable.create(spec);

    var _borderColor = 'black'
      , _fillStyle = fillStyle
      , _hasBorder = true; // TODO: temporary; lose this

    that.clearDisplay = function(graphics) {graphics.drawFilledRect(that.bounds, _fillStyle);}
    that.drawBorder = function(graphics) {
      if (not(_hasBorder)) return;

      graphics.context.save();
      graphics.context.lineWidth = 2;
      graphics.context.strokeStyle = _borderColor;
      var pad = 0
        , x = that.bounds.x + pad
        , y = that.bounds.y + pad
        , width = that.bounds.width - (pad * 2)
        , height = that.bounds.height - (pad * 2);
      graphics.context.strokeRect(x, y, width, height);
      graphics.context.restore();
    }

    that.updateDisplayForAcceptingDrop = function(accepts) {updateBorderColorForDrop(accepts)};
    function updateBorderColorForDrop(accepts) {_borderColor = accepts ? 'yellow' : 'black';}

    Object.defineProperty(that, 'fillStyle', {get : function() {return fillStyle;},enumerable : true});
    Object.defineProperty(that, 'hasBorder', {
      get : function() {return _hasBorder;},
      set : function(hb){ _hasBorder = hb; },
      enumerable : true,
      configurable : true
    });
    
    return that;
  };

  if (typeof require !== 'undefined') {
    if (isNotRunningInBrowser()) { 
      _ = require('underscore');
      Displayable = require('./Displayable');
    }
  }
  
  exports.create = function(spec){return new Box(spec);};
})(typeof exports === 'undefined'
  ? this.Box = function(spec){return Box.create(spec)}
  : exports);
