var _, DragDrop, EventDispatcher, Rectangle;

if (typeof module === 'undefined')
  var module = {"exports":{}};

(function(exports){
  'use strict';

  var Displayable = function(name, bounds) { 
    this.prototype = Function.prototype;
    var that = EventDispatcher.create()
      , _bounds = bounds || Rectangle.create(0, 0, 0, 0)
      , _canvas
      , displayList = []
      , dragDrop = DragDrop.create()
      , graphics
      , _name = name
      , _parent;

    that.on('addedToParent', function(parent) {_parent = parent;});
    that.on('removedFromParent', function(parent) {_parent = null;});
    that.on('resized', function(b){_bounds = b;});

    that.initialize = function() {
      if (typeof document !== 'undefined') {
        console.log(_name + ' --> initialize');
        _canvas = document.getElementById('xcanvas');
        graphics = new Graphics(_canvas);
        configureMouseListeners();
      }
      return that;
    }

    that.addChild = function(child) {
      if (notExisty(child)) throw new Error('child must be existy');
      displayList.push(child);
      child.emit('addedToParent', that);
      return that;
    };

    that.removeChild = function(child) {
      var index = displayList.indexOf(child);
      if (index >= 0) {
        displayList.splice(index, 1);
        child.emit('removedFromParent', that);
      }
    };

    that.refresh = function(){render();}

    that.moveTo = function(graphics, point, doRender) {
      that.bounds.moveTo(point);
      if ((existy(doRender) && doRender)) that.render(graphics);
      return that;
    };

    //-----------------------------------------------------------------------------
    that.dropTargetWillAcceptDrop = function(draggedItem) {return existy(draggedItem);};
    that.updateDisplayForAcceptingDrop = function(accepts) {};
    that.acceptDroppedItem = function(droppedItem) {
      if (otherBoxIsMe(droppedItem)) return;

      var droppedItemParent = droppedItem.parent;
      droppedItemParent.removeChild(droppedItem);
      droppedItemParent.refresh();
    };
    //-----------------------------------------------------------------------------

    function otherBoxIsMe(otherItem) {return (otherItem === that);}

    var mouseListenersConfigured = false;
    function configureMouseListeners() {
      if (mouseListenersConfigured) {return;}
      mouseListenersConfigured = true;

      _canvas.addEventListener('mousedown', function(event) {
        isEventPointWithinAnyChildren(event, function(child, theOffset, theDragStart) {
          dragDrop.dragBegin(child, theOffset, theDragStart);
        });
      });

      _canvas.addEventListener('mousemove', function(event) {
        if (dragDrop.isDragging) {
          dragDrop.dragMove(event);
          render();
        }
      });

      _canvas.addEventListener('mouseup', function(event) {
        dragDrop.dragEnd(event);
      });
    }

    function render() {
      
      graphics.context.clearRect(0, 0, _canvas.width, _canvas.height);

      displayList.forEach(function(item) {
        item.render(graphics);
      });
    };

    function isEventPointWithinAnyChildren(event, callback) {
      var point = new Point(event.clientX, event.clientY);

      displayList.forEach(function(item) {
        if (item.bounds.contains(point)) {
          var theOffset = new Point(point.x - item.bounds.x, point.y - item.bounds.y);
          var theDragStart = new Point(event.clientX, event.clientY);
          callback(item, theOffset, theDragStart);
        }
      });
    }

    function isDraggedItem(child) {return child !== dragDrop.draggedItem;}

    Object.defineProperty(that, 'graphics', {get : function() {return graphics;},enumerable : true});
    Object.defineProperty(that, 'childCount', {get : function() {return displayList.length;},enumerable : true});
    Object.defineProperty(that, 'dragDrop', {get : function() {return dragDrop;},enumerable : true});
    Object.defineProperty(that, 'bounds', {get : function() {return _bounds;},enumerable : true});
    Object.defineProperty(that, 'parent', {get : function() {return _parent;},enumerable : true});
    Object.defineProperty(that, 'name', {get : function() {return _name;},enumerable : true});

    return that;
  };

  if (typeof require !== 'undefined') {
    if (isNotRunningInBrowser()) { 
      _ = require('underscore');
      DragDrop = require('./DragDrop.js');
      EventDispatcher = require('../event/EventDispatcher');
      Rectangle = require('../geometry/Rectangle');
    }
  }
  
  exports.create = function(name, bounds){return new Displayable(name, bounds);};

})(typeof exports === 'undefined'
  ? this.Displayable = function(name, bounds){return Displayable.create(name, bounds)}
  : exports);
