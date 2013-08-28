var _, Displayable;

if (typeof module === 'undefined')
  var module = {"exports":{}};

(function(exports){
  'use strict';

  var FullsizeCanvas = function() {
    this.prototype = Function.prototype;
    var that = Displayable.create();
    that['name'] = 'FullsizeCanvas';

    if (typeof document !== 'undefined') initialize();

    function initialize() {
      that.initialize();
      // resize the canvas to fill browser window dynamically
      window.addEventListener('resize', resizeCanvas, false);
      resizeCanvas();
    }

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      that.refresh();
    }
    
    return that;
  };

  if (typeof require !== 'undefined') {
    require('verdoux');

    if (isNotRunningInBrowser()) { 
      _ = require('underscore');
      Displayable = require('./Displayable.js');
    }
  }

  exports.create = function() {return new FullsizeCanvas();};

})(typeof exports === 'undefined'
  ? this.FullsizeCanvas = function(){
      return FullsizeCanvas.create();
    }
  : exports);
