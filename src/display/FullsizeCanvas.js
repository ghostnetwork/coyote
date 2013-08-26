(function(exports){
  'use strict';

  exports.create = function() { 
    this.prototype = Function.prototype;
    var that = EventDispatcher.create();

    that.initialize = function(renderer) {
      that.render = renderer;

      var canvas = document.getElementById('canvas'),
          context = canvas.getContext('2d');

      // resize the canvas to fill browser window dynamically
      window.addEventListener('resize', resizeCanvas, false);

      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        /**
        * Your drawings need to be inside this function otherwise they will be reset when 
        * you resize the browser window and the canvas goes will be cleared.
        */
        drawStuff();
      }
      resizeCanvas();

      function drawStuff() {
        // do your drawing stuff here
        console.log('invoking render');
        that.render();
      }
      return that; // provides chaining
    }

    that.render = function() {/* default does nothing */};

    return that;
  };
  
  // pseudo-static functions look like this:
  exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.FullsizeCanvas = function(){
      return FullsizeCanvas.create();
    }
  : exports);
