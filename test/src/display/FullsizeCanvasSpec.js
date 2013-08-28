require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var EventDispatcher = require('../../../src/event/EventDispatcher');
var FullsizeCanvas = require('../../../src/display/FullsizeCanvas');

describe('FullsizeCanvas', function(){
  'use strict';

  var fullsizeCanvas;

  beforeEach(function() {
    fullsizeCanvas = FullsizeCanvas.create();
  });

  it('should be able to be created', function(){
    assert(existy(fullsizeCanvas));
  });
});
