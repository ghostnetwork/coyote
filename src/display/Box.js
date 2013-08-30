var _, Displayable;

(function(exports){
  'use strict';

  var Box = function(spec) {
    this.prototype = Function.prototype;
    var fillStyle = existy(spec) && existy(spec.fillStyle) ? spec.fillStyle : undefined;
    var that = Displayable.create(spec);

    var _borderColor = 'black'
      , _borderStyle
      , cachedBorderStyle
      , _drawName
      , _drawNameStyle
      , _fillStyle = fillStyle
      , _hasBorder = true // TODO: temporary; lose this;
      ;

    that.noBorder = function(){_hasBorder = false; return that;};
    that.borderStyle = function(style){_borderStyle = style; return that;};

    that.clearDisplay = function() {that.graphics.drawFilledRect(that.bounds, _fillStyle);}
    that.drawBorder = function() {
      if (not(_hasBorder)) return;

      that.graphics.context.save();
      that.graphics.context.strokeStyle = getBorderColor();
      that.graphics.context.lineWidth = getBorderWidth();

      var pad = 0
        , x = that.bounds.x + pad
        , y = that.bounds.y + pad
        , width = that.bounds.width - (pad * 2)
        , height = that.bounds.height - (pad * 2);

      that.graphics.context.strokeRect(x, y, width, height);
      that.graphics.context.restore();
    }

    function getBorderColor() {
      return (existy(_borderStyle) && existy(_borderStyle.color)) ? _borderStyle.color : 'black';
    }

    function getBorderWidth() {
      return (existy(_borderStyle) && existy(_borderStyle.width)) ? _borderStyle.width : 2;
    }

    function changeBorderStyle(key, value) {
      if (notExisty(_borderStyle)) {
        _borderStyle = {};
      }
      _borderStyle[key] = value;
    }

    function saveBorderStyle() {
      cachedBorderStyle = _borderStyle;
      if (notExisty(cachedBorderStyle))
        cachedBorderStyle = {color:'black', width:2};
      else
        cachedBorderStyle = {color:_borderStyle.color, width:_borderStyle.width};
    }

    that.updateDisplayForAcceptingDrop = function(accepts) {updateBorderColorForDrop(accepts)};
    function updateBorderColorForDrop(accepts) {
      var color = 'black';
      if (accepts) {
        if (notExisty(cachedBorderStyle)) {
          saveBorderStyle();
        }
        color = 'yellow';
      }
      else {
        if (existy(cachedBorderStyle)) {
          _borderStyle = cachedBorderStyle;
          cachedBorderStyle = undefined;
        }
        color = _borderStyle.color;
      }
      changeBorderStyle('color', color);
    }

    that.drawName = function(shouldDrawName, drawNameStyle) {
      _drawName = shouldDrawName;
      _drawNameStyle = drawNameStyle;
      if (notExisty(_drawNameStyle))
        _drawNameStyle = {font:'12px Courier'};
      return that;
    };

    that.on('accptedDrop', function(draggedItem) {cachedBorderStyle = undefined;});
    that.on('postRender', function(graphics) {
      if (_drawName) {
        var x = that.bounds.x + 10
          , y = that.bounds.y + 18
          , point = Point.create(x, y);
        graphics.drawText(that.name, point, _drawNameStyle);
      }
    });

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
