require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var FixedWidthBox = require('../../../src/display/FixedWidthBox');
var Rectangle = require('../../../src/geometry/Rectangle');

var WIDTH_FIXTURE = 100;

describe('FixedWidthBox', function(){
  'use strict';

  var fixedWidthBox;
  var spec;
  var bounds;

  beforeEach(function() {
    bounds = Rectangle.create(0, 0, WIDTH_FIXTURE, 200);
    spec = {name:'FixedWidthBoxSpec', bounds:bounds, fillStyle:'black'};
    fixedWidthBox = FixedWidthBox.create(spec);
    (fixedWidthBox.bounds.width).should.equal(WIDTH_FIXTURE);
  });

  it('should be able to be created', function(){
    assert(existy(fixedWidthBox));
  });

  it('should not change its width when receiving a resized event', function(){
    var width = fixedWidthBox.bounds.width;
    (width).should.equal(WIDTH_FIXTURE);

    var height = fixedWidthBox.bounds.height;
    var resizedBounds = Rectangle.create(10, 10, WIDTH_FIXTURE - 10, height - 10);
    fixedWidthBox.emit('resized', resizedBounds);
    width = fixedWidthBox.bounds.width;
    (width).should.equal(WIDTH_FIXTURE);
  });
});
