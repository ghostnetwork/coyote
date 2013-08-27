require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Point = require('../../../src/geometry/Point');

var X_FIXTURE = 100;
var Y_FIXTURE = 200;

describe('Point', function(){
  'use strict';

  var point, x, y;

  beforeEach(function() {
    x = X_FIXTURE;
    y = Y_FIXTURE;
    point = Point.create(x, y);
  });

  it('should be able to be created', function(){
    assert(existy(point));
  });

  it('should cache the values of the given x and y coordinates', function(){
    var resultX = point.x;
    assert(existy(resultX));
    (resultX).should.equal(X_FIXTURE);

    var resultY = point.y;
    assert(existy(resultY));
    (resultY).should.equal(Y_FIXTURE);
  });

  /* 
  As moveToXY is called by moveTo, this one set of tests will provide coverage 
  for both methods.
  */
  describe('#moveTo #moveToXY', function(){
    it('should move the x and y coordinates to the given values', function(){
      var pointX = 23;
      var pointY = 41;
      var destinationPoint = Point.create(pointX, pointY);
      point.moveTo(destinationPoint);

      (point.x).should.equal(pointX);
      (point.y).should.equal(pointY);
    });
  });
});
