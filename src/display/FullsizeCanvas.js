(function(exports){
  'use strict';

  exports.create = function() { 
    this.prototype = Function.prototype;
    var that = EventDispatcher.create()
      , canvas
      , displayList = []
      , dragStart
      , dragTarget
      , graphics
      , isDragging = false
      , offset;

    that.addChild = function(child) {
      displayList.push(child);
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

      return that; // provides chaining
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
      //-----------------------------------------------------------------------------
      canvas.addEventListener('mousedown', function(event) {
        childContainsMouseEventPoint(event, function(child, theOffset, theDragStart) {
          isDragging = true;
          dragTarget = child;
          offset = theOffset;
          dragStart = theDragStart;
        });
      });

      canvas.addEventListener('mousemove', function(event) {
        if (isDragging) {
          var dragOffset = new Point(event.clientX - dragStart.x, event.clientY - dragStart.y);
          var newX = dragTarget.bounds.x + dragOffset.x;
          var newY = dragTarget.bounds.y + dragOffset.y;
          var newPoint = new Point(newX, newY);
          dragTarget.moveTo(graphics, newPoint);
          dragStart.moveTo(new Point(event.clientX, event.clientY));
          render();
        }
      });
      canvas.addEventListener('mouseup', function(event) {
        console.log('mouseup: ' + event.clientX + ', ' + event.clientY);
        isDragging = false;
      });
      //-----------------------------------------------------------------------------
    }

    function childContainsMouseEventPoint(event, callback) {
      var point = new Point(event.clientX, event.clientY);

      displayList.forEach(function(item) {
        if (item.bounds.contains(point)) {
          var theOffset = new Point(point.x - item.bounds.x, point.y - item.bounds.y);
          var theDragStart = new Point(event.clientX, event.clientY);
          callback(item, theOffset, theDragStart);
        }
      });
    }

    Object.defineProperty(that, 'graphics', {
      get : function() {return graphics;},
      enumerable : true
    });
    return that;
  };

  
  // pseudo-static functions look like this:
  exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.FullsizeCanvas = function(){
      return FullsizeCanvas.create();
    }
  : exports);
