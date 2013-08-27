var EventDispatcher;

(function(exports){
  'use strict';

  exports.create = function(bounds, fillStyle) { 
    this.prototype = Function.prototype;
    var that = EventDispatcher.create();

    var _borderColor = 'black'
      , _bounds = bounds
      , _fillStyle = fillStyle
      , _parent;

    that.on('addedToParent', function(parent) {_parent = parent;});
    that.on('removedFromParent', function(parent) {_parent = null;});

    that.moveTo = function(graphics, point, doRender) {
      _bounds.moveTo(point);
      if ((existy(doRender) && doRender)) that.render(graphics);
      return that;
    };

    that.render = function(graphics) {
      graphics.context.save();
      clearDisplay(graphics);
      drawBorder(graphics);
      graphics.context.restore();
      return that;
    };

    //-----------------------------------------------------------------------------
    that.dropTargetWillAcceptDrop = function(draggedItem) {return existy(draggedItem);};
    that.updateDisplayForAcceptingDrop = function(accepts) {updateBorderColorForDrop(accepts)};
    that.acceptDroppedItem = function(droppedItem) {
      if (otherBoxIsMe(droppedItem)) return;
      var droppedItemParent = droppedItem.parent;
      droppedItem.parent.removeChild(droppedItem);
      droppedItemParent.refresh();
    };
    //-----------------------------------------------------------------------------

    function otherBoxIsMe(otherItem) {return (otherItem === that);}
    function updateBorderColorForDrop(accepts) {_borderColor = accepts ? 'yellow' : 'black';}
    function clearDisplay(graphics) {graphics.drawFilledRect(_bounds, _fillStyle);}

    function drawBorder(graphics) {
      graphics.context.save();
      graphics.context.lineWidth = 3;
      graphics.context.strokeStyle = _borderColor;
      var pad = 0;
      graphics.context.strokeRect(_bounds.x+pad, _bounds.y+pad, _bounds.width-pad*2, _bounds.height-pad*2);
      graphics.context.restore();
    }

    Object.defineProperty(that, 'bounds', {get : function() {return _bounds;},enumerable : true});
    Object.defineProperty(that, 'fillStyle', {get : function() {return fillStyle;},enumerable : true});
    Object.defineProperty(that, 'parent', {get : function() {return _parent;},enumerable : true});
    
    return that;
  };

  if (typeof require !== 'undefined') {
    require('verdoux');

    if (isNotRunningInBrowser()) { 
      EventDispatcher = require('../event/EventDispatcher');
    }
  }
  
  // pseudo-static functions look like this:
  //exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.Box = function(bounds, fillStyle){return Box.create(bounds, fillStyle)}
  : exports);
