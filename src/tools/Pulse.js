var _, EventDispatcher;

(function(exports){
  'use strict';

  if (typeof require !== 'undefined') {
    require('verdoux');

    if (isNotRunningInBrowser()) { 
      _ = require('underscore');
      EventDispatcher = require('../event/EventDispatcher');
    }
  }

  exports.create = function() { 
    this.prototype = Function.prototype;
    var timerId = null;
    var that = EventDispatcher.create();

    that.start = function(interval) {
      timerId = setInterval(function() {
        that.emit('pulse');
      }, interval);
    };

    that.stop = function() {
      clearInterval(timerId);
    };

    // Couple of convenience functions
    that.addPulseEventListener = function(listener) {that.addEventListener('pulse', listener);};
    that.removePulseEventListener = function(listener) {that.removeEventListener('pulse', listener);};

    return that;
  };
  
  // pseudo-static functions look like this:
  exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.Pulse = function(){return Pulse.create()}
  : exports);
