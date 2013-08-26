
(function(exports){
  'use strict';

  exports.create = function() { 
    this.prototype = Function.prototype;
    var _listeners = [];
    var that = {};

    that.addEventListener = function(type, listener) {
    	var allListeners = _listeners[type];
    	if (!allListeners) {
    		_listeners[type] = [listener];
    	}
    	else  {
	    	_listeners.push(listener);
    	}
    }

    that.removeEventListener = function(type, listener) {
    	var observers = _listeners[type];
    	if (!observers) return;

    	observers.forEach(function(item, index) {
    	  if (item == listener) {
    	  	if (observers.length == 1) {delete(_listeners[type]);}
    	  	else {observers.splice(index, 1);}
    	  	return;
    	  }
    	});
    }

    that.emit = function(type, payload) {
    	var observers = _listeners[type];
    	if (!observers) return;
    	
    	observers.forEach(function(item, index) {
    	  item(payload);
    	});
    }
    return that;
  };
  
  // pseudo-static functions look like this:
  exports.test = function(arg){return arg;};

})(typeof exports === 'undefined'
  ? this.EventDispatcher = function(){return EventDispatcher.create()}
  : exports);
