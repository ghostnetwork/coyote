var _, DragDrop, EventDispatcher;

if (typeof module === 'undefined')
  var module = {"exports":{}};

(function(exports){
  'use strict';

  var Displayable = function(bounds) { 
    this.prototype = Function.prototype;
    var that = EventDispatcher.create()
      , _bounds = bounds
      , canvas
      , displayList = []
      , dragDrop = DragDrop.create()
      , graphics
      , _parent;

    that.on('addedToParent', function(parent) {_parent = parent;});
    that.on('removedFromParent', function(parent) {_parent = null;});

    that.initialize = function() {
      if (typeof document !== 'undefined') {
        canvas = document.getElementById('canvas');
        graphics = new Graphics(canvas);
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

      canvas.addEventListener('mousedown', function(event) {
        isEventPointWithinAnyChildren(event, function(child, theOffset, theDragStart) {
          dragDrop.dragBegin(child, theOffset, theDragStart);
        });
      });

      canvas.addEventListener('mousemove', function(event) {
        if (dragDrop.isDragging) {
          dragDrop.dragMove(event);
          render();
        }
      });

      canvas.addEventListener('mouseup', function(event) {
        dragDrop.dragEnd(event);
      });
    }

    function render() {
      graphics.context.clearRect(0, 0, canvas.width, canvas.height);

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

    return that;
  };

  if (typeof require !== 'undefined') {
    require('verdoux');

    if (isNotRunningInBrowser()) { 
      _ = require('underscore');
      DragDrop = require('./DragDrop.js');
      EventDispatcher = require('../event/EventDispatcher');
    }
  }
  
  exports.create = function(bounds){return new Displayable(bounds);};

})(typeof exports === 'undefined'
  ? this.Displayable = function(bounds){return Displayable.create(bounds)}
  : exports);
