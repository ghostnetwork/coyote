require('verdoux');
var _ = require('underscore');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var EventDispatcher = require('../../../src/event/EventDispatcher');

describe('EventDispatcher', function(){
  'use strict';

  var eventDispatcher;

  beforeEach(function() {
    eventDispatcher = EventDispatcher.create();
  });

  it('should be able to be created', function(){
    assert(existy(eventDispatcher));
  });

  describe('#addEventListener', function(){
    it('should throw if type is notExisty', function(){
      (function(){
        var type;
        var listener = function(){};
        eventDispatcher.addEventListener(type, listener);
      }).should.throw();
    });

    it('should throw if listener is notExisty', function(){
      (function(){
        var type = 'cal­cium';
        var listener;
        eventDispatcher.addEventListener(type, listener);
      }).should.throw();
    });

    it('should be able to add an event listener', function(){
      var type = 'scan­dium';
      var listener = function(){return {"type":type};};
      var expected = 1;
      eventDispatcher.addEventListener(type, listener);
      var result = eventDispatcher.listeners(type);
      (result.length).should.equal(expected);
    });

    it('should be able to add multiple listeners for a single event type', function(){
      var type = 'tita­nium';
      var listenerA = function(){return 'i am A';};
      var listenerB = function(){return 'i am B';};
      var expected = 2;
      eventDispatcher.addEventListener(type, listenerA);
      eventDispatcher.addEventListener(type, listenerB);
      var result = eventDispatcher.listeners(type);
      (result.length).should.equal(expected);
    });
  });

  describe('#removeEventListener', function(){
    it('should throw if type is notExisty', function(){
      (function(){
        var type;
        var listener = function(){return type;};
        eventDispatcher.removeEventListener(type, listener);
      }).should.throw();
    });

    it('should throw if listener is notExisty', function(){
      (function(){
        var type = 'vana­dium';
        var listener;
        eventDispatcher.removeEventListener(type, listener);
      }).should.throw();
    });

    it('should be able to remove an event listener', function(){
      var type = 'chrom­ium';
      var listener = function(){return type;};
      eventDispatcher.addEventListener(type, listener);
      var result = eventDispatcher.listeners(type);
      var expected = 1;
      (result.length).should.equal(expected);

      eventDispatcher.removeEventListener(type, listener);
      result = eventDispatcher.listeners(type);
      assert(notExisty(result));
    });

    it('should not remove there are no listeners of the given type', function(){
      var type = 'manga­nese';
      var listener = function(){return 'not dead yet';};
      eventDispatcher.addEventListener(type, listener);
      var result = eventDispatcher.listeners(type);
      var expected = 1;
      (result.length).should.equal(expected);

      var typeB = 'iron';
      eventDispatcher.removeEventListener(typeB, listener);
      result = eventDispatcher.listeners(type);
      (result.length).should.equal(expected);
    });

    it('should not remove the listener if it has not been previously added', function(){
      var type = 'cobalt';
      var listener = function(){return 'not dead yet';};
      eventDispatcher.addEventListener(type, listener);
      var result = eventDispatcher.listeners(type);
      var expected = 1;
      (result.length).should.equal(expected);

      var listenerB = function(){return 'dead. really dead.';};
      eventDispatcher.removeEventListener(type, listenerB);
      result = eventDispatcher.listeners(type);
      (result.length).should.equal(expected);
    });
  });

  describe('#emit', function(){
    it('should not emit event if type is notExisty', function(done){
      var type = 'nickel';
      var listener = function(){
        fail('should not have emitted an event');
        done();
      };
      eventDispatcher.addEventListener(type, listener);
      var result = eventDispatcher.listeners(type);
      var expected = 1;
      (result.length).should.equal(expected);

      var notExistyType;
      var payload = 'i like music';
      eventDispatcher.emit(notExistyType, payload);
      setTimeout(function() {
        done();
      }, 1000);
    });

    it('should emit an event to a listener', function(done){
      var payload = 'tesla';
      var type = 'copper';
      var listener = function(thing) {
        assert(existy(thing));
        (thing).should.equal(payload);
        done();
      };
      eventDispatcher.addEventListener(type, listener);
      var result = eventDispatcher.listeners(type);
      var expected = 1;
      (result.length).should.equal(expected);

      eventDispatcher.emit(type, payload);
    });
  });
});
