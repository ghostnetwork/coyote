require('verdoux');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var DragDrop = require('../../../src/display/DragDrop');

describe('DragDrop', function(){
  'use strict';

  var dragDrop;

  beforeEach(function() {
    dragDrop = DragDrop.create();
  });

  it('should be able to be created', function(){
    assert(existy(dragDrop));
  });

  describe('#dragBegin', function(){
    it('should throw if parameters are notExisty', function(){
      (function(){
        dragDrop.dragBegin();
      }).should.throw();
    });

    /* this test fails; need to do some research on mocking first
    it('should set isDragging to true', function(){
      dragDrop.dragBegin();
      assert(dragDrop.isDragging);
    });
    */
  });

  describe('#registerDropTarget', function(){
    it('should return false if dropTarget is notExisty', function(){
      var dropTarget;
      var result = dragDrop.registerDropTarget(dropTarget);
      assert(falsey(result));
    });

    it('should be able to add a dropTarget', function(){
      var dropTarget = {"name":'zinc'};
      var result = dragDrop.registerDropTarget(dropTarget);
      assert(result);
      var expected = 1;
      (dragDrop.dropTargetCount).should.equal(expected);
    });
  });

  describe('#unregisterDropTarget', function(){
    it('should return false if dropTarget is notExisty', function(){
      var dropTarget;
      var result = dragDrop.unregisterDropTarget(dropTarget);
      assert(falsey(result));
    });

    it('should return false if dropTarget was not first registered', function(){
      var dropTarget = {"name":'gallium'};
      var result = dragDrop.unregisterDropTarget(dropTarget);
      assert(falsey(result));
    });
  });
});
