
(function(exports){

  'use strict';

  var _
    , util;

  if (require != null) {
    require('verdoux');

    if (isNotRunningInBrowser()) { 
      _ = require('underscore');
      util = require('util');
    }
  }

  exports.create = function() {
    this.prototype = Function.prototype;
    var _listeners = [];
    var that = {};

    that.addEventListener = function(type, listener) {
      if (notExisty(type)) throw new Error('type must be existy');
      if (notExisty(listener)) throw new Error('listener must be existy');

      var allListeners = _listeners[type];

      if (!allListeners) {
        _listeners[type] = [listener];
      }
      else  {
        allListeners.push(listener);
      }
    };

    that.removeEventListener = function(type, listener) {
      if (notExisty(type)) throw new Error('type must be existy');
      if (notExisty(listener)) throw new Error('listener must be existy');
      
      var observers = _listeners[type];
      if (!observers) return;

      observers.forEach(function(item, index) {
        if (item == listener) {
          if (observers.length == 1) {delete(_listeners[type]);}
          else {observers.splice(index, 1);}
          return;
        }
      });
    };

    that.emit = function(type, payload) {
      var observers = _listeners[type];
      if (!observers) return;

      observers.forEach(function(item, index) {
        item(payload);
      });
    };

    that.listeners = function(type) {
      return _listeners[type];
    };
    return that;
  };

  // pseudo-static functions look like this:
  //exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
? this.EventDispatcher = function(){return EventDispatcher.create()}
: exports);
