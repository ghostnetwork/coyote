
(function(exports){
  'use strict';

  exports.create = function() { 
    this.prototype = Function.prototype;
    
    var _draggedItem 
      , dragEventPointOffset
      , dragStartPoint
      , dropTargets = []
      , _isDragging = false
      , lastDropTarget;

    var that = { 
      get draggedItem(){return _draggedItem;},
      get isDragging(){return _isDragging;}
    };

    that.registerDropTarget = function(dropTarget) {
      if (notExisty(dropTarget)) return false;
      dropTargets.push(dropTarget);
      return true;
    };

    that.unregisterDropTarget = function(dropTarget) {
      if (notExisty(dropTarget)) return false;

      var index = dropTargets.indexOf(dropTarget);
      if (index >= 0){
        dropTargets.slice(index, 1);
        return true;
      }

      return false;
    }

    that.dragBegin = function(dragTarget, eventPointOffset, startPoint) {
      if (notExisty(dragTarget) || notExisty(eventPointOffset) || notExisty(startPoint))
        throw new TypeError('insufficient parameters for dragBegin');

      _draggedItem = dragTarget;
      dragEventPointOffset = eventPointOffset;
      dragStartPoint = startPoint;
      _isDragging = true;
    };

    that.dragMove = function(event) {
      var dragOffset = new Point(event.clientX - dragStartPoint.x, event.clientY - dragStartPoint.y);
      var newX = _draggedItem.bounds.x + dragOffset.x;
      var newY = _draggedItem.bounds.y + dragOffset.y;
      var newPoint = new Point(newX, newY);

      _draggedItem.moveTo(graphics, newPoint);
      dragStartPoint.moveTo(new Point(event.clientX, event.clientY));

      checkForDropTarget(event);
    };

    function checkForDropTarget(event) {
      isEventPointWithinAnyDropTargets(event, function(dropTarget) {
        if (existy(dropTarget))
          checkIfDropTargetWillAcceptDrop(dropTarget);
        else
          lastDropTargetClearDrop();
      });
    }

    function checkIfDropTargetWillAcceptDrop(dropTarget) {
      var willAccept = dropTarget.dropTargetWillAcceptDrop(_draggedItem);
      if (willAccept) {
        dropTarget.updateDisplayForAcceptingDrop(true);
      }
    }

    function lastDropTargetClearDrop() {
      if (existy(lastDropTarget))
        lastDropTarget.updateDisplayForAcceptingDrop(false);
    }

    that.dragEnd = function(event) {
      _isDragging = false;
      isEventPointWithinAnyDropTargets(event, function(dropTarget) {
        if (existy(dropTarget))
          dropTarget.acceptDroppedItem(_draggedItem);
        /*else
        // TODO: tell the draggedItem to return to its starting position
          console.log('no drop');*/
      });
    };

    function isEventPointWithinAnyDropTargets(event, callback) {
      var point = new Point(event.clientX, event.clientY);
      var foundDropTarget = false;

      dropTargets.forEach(function(dropTarget) {
        if (dropTarget.bounds.contains(point)) {
          foundDropTarget = true;
          lastDropTarget = dropTarget;
          callback(dropTarget);
        }
      });

      if (not(foundDropTarget)) {
        callback();
      }
    }

    Object.defineProperty(that, 'dropTargetCount', {
      get : function() {return dropTargets.length;},
      enumerable : true
    });

    return that;
  };
  
  // pseudo-static functions look like this:
  exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.DragDrop = function(){return DragDrop.create()}
  : exports);
