var _, Box, Rectangle;

(function(exports){
  'use strict';

  var FixedSizeBox = function(spec) { 
    this.prototype = Function.prototype;
    var that = Box.create(spec);

    that.onResized = function(b) {
      that.bounds = Rectangle.create(b.x, b.y, that.bounds.width, that.bounds.height);
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
  
  exports.create = function(spec){return new FixedSizeBox(spec);};

})(typeof exports === 'undefined'
  ? this.FixedSizeBox = function(spec){return FixedSizeBox.create(spec)}
  : exports);
