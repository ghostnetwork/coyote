require('verdoux');
var _ = require('underscore');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Box = require('../../../src/display/Box');
var Graphics = require('../../../src/display/Graphics');
var Point = require('../../../src/geometry/Point');
var Rectangle = require('../../../src/geometry/Rectangle');

describe('Box', function(){
  'use strict';

  var bounds;
  var fillStyle;
  var box;

  beforeEach(function() {
    fillStyle = 'blue'
    bounds = Rectangle.create(10, 20, 30, 40);
    box = Box.create(bounds, fillStyle);
  });

  it('should be able to be created', function(){
    assert(existy(box));
  });
});
