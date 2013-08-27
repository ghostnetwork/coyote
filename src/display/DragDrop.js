
(function(exports){
  'use strict';

  exports.create = function() { 
    this.prototype = Function.prototype;
    
    var _draggedItem 
      , dragEventPointOffset
      , dragStartPoint
      , _isDragging = false;

    var that = { 
      get draggedItem(){return _draggedItem;},
      get isDragging(){return _isDragging;}
    };

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
    };

    that.dragEnd = function() {
      _isDragging = false;
    };

    return that;
  };
  
  // pseudo-static functions look like this:
  exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.DragDrop = function(){return DragDrop.create()}
  : exports);
