require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var FixedSizeBox = require('../../../src/display/FixedSizeBox');
var Rectangle = require('../../../src/geometry/Rectangle');

var HEIGHT_FIXTURE = 200;
var WIDTH_FIXTURE = 100;

describe('FixedSizeBox', function(){
  'use strict';

  var fixedSizeBox;
  var spec;
  var bounds;

  beforeEach(function() {
    bounds = Rectangle.create(0, 0, WIDTH_FIXTURE, HEIGHT_FIXTURE);
    spec = {name:'FixedSizeBoxSpec', bounds:bounds, fillStyle:'black'};
    fixedSizeBox = FixedSizeBox.create(spec);
    (fixedSizeBox.bounds.width).should.equal(WIDTH_FIXTURE);
  });

  it('should be able to be created', function(){
    assert(existy(fixedSizeBox));
  });

  it('should not change its size when receiving a resized event', function(){
    var width = fixedSizeBox.bounds.width;
    (width).should.equal(WIDTH_FIXTURE);

    var height = fixedSizeBox.bounds.height;
    (height).should.equal(HEIGHT_FIXTURE);

    var resizedBounds = Rectangle.create(10, 10, width - 10, height - 10);
    fixedSizeBox.emit('resized', resizedBounds);
    width = fixedSizeBox.bounds.width;
    (width).should.equal(WIDTH_FIXTURE);
    height = fixedSizeBox.bounds.height;
    (height).should.equal(HEIGHT_FIXTURE);
  });
});
