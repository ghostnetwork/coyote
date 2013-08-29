var _, Box, Rectangle;

(function(exports){
  'use strict';

  var FixedWidthBox = function(spec) { 
    this.prototype = Function.prototype;
    
    var name = existy(spec) && existy(spec.name) ? spec.name : undefined;
    var bounds = existy(spec) && existy(spec.bounds) ? spec.bounds : undefined;
    var fillStyle = existy(spec) && existy(spec.fillStyle) ? spec.fillStyle : undefined;
    
    var that = Box.create(name, bounds, fillStyle);

    that.onResized = function(b) {
      that.bounds = Rectangle.create(b.x, b.y, that.bounds.width, b.height);
    };

    return that;
  };

  if (typeof require !== 'undefined') {
    if (isNotRunningInBrowser()) { 
      _ = require('underscore');
      Box = require('./Box');
      Rectangle = require('../geometry/Rectangle');
    }
  }
  
  exports.create = function(spec){return new FixedWidthBox(spec);};

})(typeof exports === 'undefined'
  ? this.FixedWidthBox = function(spec){return FixedWidthBox.create(spec)}
  : exports);
