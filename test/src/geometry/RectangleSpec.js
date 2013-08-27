require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Point = require('../../../src/geometry/Point');
var Rectangle = require('../../../src/geometry/Rectangle');

var X_FIXTURE = 33;
var Y_FIXTURE = 44;
var WIDTH_FIXTURE = 55;
var HEIGHT_FIXTURE = 66;

describe('Rectangle', function(){
  'use strict';

  var rectangle;

  beforeEach(function() {
    rectangle = Rectangle.create(X_FIXTURE, Y_FIXTURE, WIDTH_FIXTURE, HEIGHT_FIXTURE);
  });

  it('should be able to be created', function(){
    assert(existy(rectangle));
  });

  it('should cache the values given at creation', function(){
    (rectangle.x).should.equal(X_FIXTURE);
    (rectangle.y).should.equal(Y_FIXTURE);
    (rectangle.width).should.equal(WIDTH_FIXTURE);
    (rectangle.height).should.equal(HEIGHT_FIXTURE);
  });

  /* 
  Same as in PointSpec.
  As moveToXY is called by moveTo, this one set of tests will provide coverage 
  for both methods.
  */
  describe('#moveTo', function(){
    it('should move the x and y coordinates to the given values', function(){
      var destX = X_FIXTURE * 2;
      var destY = Y_FIXTURE * 2;
      rectangle.moveTo(Point.create(destX, destY));
      (rectangle.x).should.equal(destX);
      (rectangle.y).should.equal(destY);
    });
  });

  describe('#contains', function(){
    it('should throw if given point is notExisty', function(){
      (function(){
        var point;
        rectangle.contains(point);
      }).should.throw();
    });

    it('should return false if the point is outside the rectangle, x-coordinate', function(){
      var x = X_FIXTURE - 1;
      var y = Y_FIXTURE;
      var result = rectangle.contains(Point.create(x, y));
      assert(falsey(result));
    });

    it('should return false if the point is outside the rectangle, y-coordinate', function(){
      var x = X_FIXTURE;
      var y = Y_FIXTURE - 1;
      var result = rectangle.contains(Point.create(x, y));
      assert(falsey(result));
    });

    it('should return false if the point is outside the rectangle, width bound', function(){
      var x = X_FIXTURE + WIDTH_FIXTURE + 1;
      var y = Y_FIXTURE;
      var result = rectangle.contains(Point.create(x, y));
      assert(falsey(result));
    });

    it('should return false if the point is outside the rectangle, height bound', function(){
      var x = X_FIXTURE;
      var y = Y_FIXTURE + HEIGHT_FIXTURE + 1;
      var result = rectangle.contains(Point.create(x, y));
      assert(falsey(result));
    });

    it('should return true if the point is within the rectangle', function(){
      var x = X_FIXTURE;
      var y = Y_FIXTURE;
      var result = rectangle.contains(Point.create(x, y));
      assert(result);

      x = X_FIXTURE + WIDTH_FIXTURE;
      result = rectangle.contains(Point.create(x, y));
      assert(result);

      y = Y_FIXTURE = HEIGHT_FIXTURE;
      result = rectangle.contains(Point.create(x, y));
      assert(result);
    });
  });
});
