var _, DragDrop, EventDispatcher, Rectangle;

if (typeof module === 'undefined')
  var module = {"exports":{}};

(function(exports){
  'use strict';

  var Displayable = function(spec) { 
    this.prototype = Function.prototype;
    var name = existy(spec) && existy(spec.name) ? spec.name : undefined;
    var bounds = existy(spec) && existy(spec.bounds) ? spec.bounds : undefined;

    var that = EventDispatcher.create()
      , _bounds = bounds || Rectangle.create(0, 0, 0, 0)
      , displayList = []
      , dragDrop = DragDrop.create()
      , _fixedPosition = false
      , _name = name
      , _parent;

    that.on('addedToParent', function(parent) {_parent = parent;});
    that.on('removedFromParent', function(parent) {_parent = null;});
    that.on('resized', function(bounds){that.onResized(bounds);});
    that.on('movedTo', function(info){that.onMovedTo(info);});

    that.onResized = function(newBounds) {_bounds = newBounds;};
    that.onMovedTo = function(info) {
      var newPoint = info.point;
      var delta = info.delta;
      updateChildrenLocations(delta);
    };

    that.initialize = function() {
      if (typeof document !== 'undefined') {
        if (notExisty(exports.canvas)) {
          exports.canvas = document.getElementById('canvas');;
          exports.graphics = new Graphics(exports.canvas);
        }
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

    that.refresh = function(){
      eraseScreen();
      // renderChildren();
      that.render(exports.graphics);
    };

    that.render = function() {
      exports.graphics.context.save();
      that.clearDisplay();
      that.drawBorder();
      exports.graphics.context.restore();
      renderChildren();
      return that;
    };
    that.clearDisplay = function() {};
    that.drawBorder = function() {};

    that.moveTo = function(point, doRender) {
      if (_fixedPosition) return;

      var deltaX = point.x - that.bounds.x;
      var deltaY = point.y - that.bounds.y;
      var delta = Point.create(deltaX, deltaY);

      that.bounds.moveTo(point);
      if ((existy(doRender) && doRender)) that.render();
      
      that.emit('movedTo', {point:point, delta:delta});

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

      exports.canvas.addEventListener('mousedown', function(event) {
        isEventPointWithinAnyChildren(event, function(child, theOffset, theDragStart) {
          dragDrop.dragBegin(child, theOffset, theDragStart);
        });
      });

      exports.canvas.addEventListener('mousemove', function(event) {
        if (dragDrop.isDragging) {
          dragDrop.dragMove(event);
          eraseScreen();
          renderChildren();
        }
      });

      exports.canvas.addEventListener('mouseup', function(event) {
        dragDrop.dragEnd(event);
      });
    }

    function eraseScreen() {
      // exports.graphics.context.clearRect(0, 0, exports.canvas.width, exports.canvas.height);
      exports.graphics.context.clearRect(0, 0, _bounds.width, _bounds.height);
    }

    function renderChildren() {
      displayList.forEach(function(item) {
        item.render(exports.graphics);
      });
    }

    function updateChildrenLocations (delta) {
      displayList.forEach(function(child) {
        var childBounds = child.bounds;
        var x = childBounds.x + delta.x;
        var y = childBounds.y + delta.y;
        var newPoint = Point.create(x, y);
        child.moveTo(newPoint, true);
      })
    }

    // that.isEventPointWithinAnyChildren = isEventPointWithinAnyChildren;
    that.checkChildrenForHit = function(event, callback) {
      return isEventPointWithinAnyChildren(event, callback);
    };

    function isEventPointWithinAnyChildren(event, callback) {
      var wasFound = false;
      var point = new Point(event.clientX, event.clientY);

      // console.log(that.name + ' checking');

      displayList.forEach(function(item) {
        if (item.childCount > 0) {
          // console.log(item.name + ' isa container');

          wasFound = item.checkChildrenForHit(event, callback);
          // console.log(item.name + ' wasFound: ' + wasFound);
        }

        if (not(wasFound)) {
          if (item.bounds.contains(point)) {
            var theOffset = new Point(point.x - item.bounds.x, point.y - item.bounds.y);
            var theDragStart = new Point(event.clientX, event.clientY);
            callback(item, theOffset, theDragStart);
            // console.log(item.name + ' was hit');
            wasFound = true;
          } 
          else {
            // console.log(item.name + ' NOT hit');
            wasFound = false;
          }
        }
      });

      // console.log(that.name + ' --> wasFound: ' + wasFound);
      return wasFound;
    }

    function isDraggedItem(child) {return child !== dragDrop.draggedItem;}

    Object.defineProperty(that, 'graphics', {get : function() {return exports.graphics;},enumerable : true});
    Object.defineProperty(that, 'childCount', {get : function() {return displayList.length;},enumerable : true});
    Object.defineProperty(that, 'dragDrop', {get : function() {return dragDrop;},enumerable : true});
    Object.defineProperty(that, 'parent', {get : function() {return _parent;},enumerable : true});
    Object.defineProperty(that, 'name', {get : function() {return _name;},enumerable : true});
    Object.defineProperty(that, 'bounds', {
      get : function(){ return _bounds; },
      set : function(b){ _bounds = b; },
      enumerable : true,
      configurable : true
    });
    Object.defineProperty(that, 'fixedPosition', {
      get : function(){ return _fixedPosition; },
      set : function(b){ _fixedPosition = b; },
      enumerable : true,
      configurable : true
    });

    return that;
  };

  exports.canvas = null;
  exports.graphics = null;

  if (typeof require !== 'undefined') {
    if (isNotRunningInBrowser()) { 
      _ = require('underscore');
      DragDrop = require('./DragDrop.js');
      EventDispatcher = require('../event/EventDispatcher');
      Rectangle = require('../geometry/Rectangle');
    }
  }
  
  exports.create = function(spec){return new Displayable(spec);};

})(typeof exports === 'undefined'
  ? this.Displayable = function(spec){return Displayable.create(spec)}
  : exports);
