var _, Displayable, Rectangle;

if (typeof module === 'undefined')
  var module = {"exports":{}};

(function(exports){
  'use strict';

  var FullsizeCanvas = function() {
    this.prototype = Function.prototype;
    var that = Displayable.create({name:'FullsizeCanvas', bounds:Rectangle.Empty});

    if (typeof document !== 'undefined') initialize();

    function initialize() {
      that.initialize();

      that.on('postRender', function(graphics) {
        var style = {font:'24px Courier', color:'black'};
        graphics.drawText('coyote', Point.create(10, 20), style);
      });

      // resize the canvas to fill browser window dynamically
      window.addEventListener('resize', resizeCanvas, false);
      resizeCanvas();
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      that.emit('resized', Rectangle.create(0, 0, canvas.width, canvas.height));
      that.refresh();
    }
    
    return that;
  };

  if (typeof require !== 'undefined') {
    if (isNotRunningInBrowser()) { 
      _ = require('underscore');
      Displayable = require('./Displayable.js');
      Rectangle = require('../geometry/Rectangle.js');
    }
  }

  exports.create = function() {return new FullsizeCanvas();};

})(typeof exports === 'undefined'
  ? this.FullsizeCanvas = function(){
      return FullsizeCanvas.create();
    }
  : exports);
