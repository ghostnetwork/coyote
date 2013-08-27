var _, DragDrop, EventDispatcher;

if (typeof module === 'undefined')
  var module = {"exports":{}};

(function(exports){
  'use strict';

  var FullsizeCanvas = function() {
    this.prototype = Function.prototype;
    var that = EventDispatcher.create()
      , canvas
      , displayList = []
      , dragDrop = DragDrop.create()
      , graphics;

    that.addChild = function(child) {
      if (notExisty(child)) throw new Error('child must be existy');
      displayList.push(child);
      return that;
    };

    that.removeChild = function(child) {
      var index = displayList.indexOf(child);
      if (index >= 0) displayList.splice(index, 1);
    };

    that.refresh = render;

    that.initialize = function() {
      canvas = document.getElementById('canvas');
      graphics = new Graphics(canvas);

      configureMouseListeners();

      // resize the canvas to fill browser window dynamically
      window.addEventListener('resize', resizeCanvas, false);
      resizeCanvas();

      return that;
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render();
    }

    function render() {
      graphics.context.clearRect(0, 0, canvas.width, canvas.height);
      displayList.forEach(function(item) {
        item.render(graphics);
      });
    };

    function configureMouseListeners() {
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
        dragDrop.dragEnd();
      });
    }

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

    Object.defineProperty(that, 'graphics', {
      get : function() {return graphics;},
      enumerable : true
    });

    Object.defineProperty(that, 'childCount', {
      get : function() {return displayList.length;},
      enumerable : true
    });

    Object.defineProperty(that, 'dragDrop', {
      get : function() {return dragDrop;},
      enumerable : true
    });

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

  exports.create = function() {return new FullsizeCanvas();};

})(typeof exports === 'undefined'
  ? this.FullsizeCanvas = function(){
      return FullsizeCanvas.create();
    }
  : exports);
