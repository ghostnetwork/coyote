require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Size = require('../../../src/geometry/Size');

var WIDTH_FIXTURE = 123;
var HEIGHT_FIXTURE = 456;

describe('Size', function(){
  'use strict';

  var size;

  beforeEach(function() {
    size = Size.create(WIDTH_FIXTURE, HEIGHT_FIXTURE);
  });

  it('should be able to be created', function(){
    assert(existy(size));
  });

  it('should cache the values given to it at creation', function(){
    (size.width).should.equal(WIDTH_FIXTURE);
    (size.height).should.equal(HEIGHT_FIXTURE);
  });
});
