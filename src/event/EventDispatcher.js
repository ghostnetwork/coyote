var _, util;

(function(exports){
  'use strict';
  
  var EventDispatcher = function() {
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

    that.on = function(type, listener) {
      that.addEventListener(type, listener);
      return that
    };

    that.once = function(type, listener) {
      function oneTimeListener() {
        that.removeEventListener(type, oneTimeListener);
        listener.apply(that, arguments);
      };

      oneTimeListener.listener = listener;
      that.on(type, oneTimeListener);
      return that
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

    that.off = function(type, listener) {
      that.removeEventListener(type, listener);
      return that
    };

    that.emit = function(type, payload) {
      var observers = _listeners[type];
      if (!observers) return;

      observers.forEach(function(item, index) {
        item(payload);
      });
      return that
    };

    that.listeners = function(type) {
      return _listeners[type];
    };
    return that;
  };

  if (typeof require !== 'undefined') {
    require('verdoux');

    if (isNotRunningInBrowser()) { 
      _ = require('underscore');
      util = require('util');
    }
  }

  exports.create = function() {return new EventDispatcher();};

})(typeof exports === 'undefined'
  ? this.EventDispatcher = function(){return EventDispatcher.create()}
  : exports);
