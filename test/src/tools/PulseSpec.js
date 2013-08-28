'use strict';

var assert = require('assert');
var Pulse = require('../../../src/tools/Pulse');

describe('Pulse', function(){
  var pulse;

  beforeEach(function() {
    pulse = Pulse.create();
  });

  it('should be able to be created', function(){
    assert(pulse !== null);
  });

  describe('#start', function(){
    it('should start emitting events when start is called', function(done){
      var counter = 0;
      pulse.addPulseEventListener(function() {
        if (counter++ === 0)
          done();
      });
      pulse.start(100);
    });
  });

  describe('#stop', function(){
    it('should stop emitting events when stop is called', function(done){
      var stopped = false;

      pulse.addPulseEventListener(function() {
        if (stopped) fail('should not have emitted event after stop');
      });
      pulse.start(100);

      setTimeout(function() {
        pulse.stop();
        stopped = true;

        setTimeout(function() {
          done();
        }, 500);
      }, 500);
    });
  });
});
