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

  describe('#addChild', function(){
    it('should throw if child is notExisty', function(){
      (function(){
        var child;
        fullsizeCanvas.addChild(child);
      }).should.throw();
    });

    it('should be able to add a child to the display list', function(){
        var expected = fullsizeCanvas.childCount + 1;
        var name = 'phos­phorus';
        var child = {"name":name};
        fullsizeCanvas.addChild(child);
        var result = fullsizeCanvas.childCount;
        (result).should.equal(expected);
    });
  });

  describe('#removeChild', function(){
    it('should ignore if child is notExisty', function(){
      var expected = 0;
      var child;
      fullsizeCanvas.removeChild(child);
      var result = fullsizeCanvas.childCount;
      (result).should.equal(expected);
    });

    it('should ignore if child is not on displayList', function(){
      var nameA = 'sulfur'
        , nameB = 'chlorine';
      var childA = {"name":nameA}
        , childB = {"name":nameB};

      fullsizeCanvas.addChild(childA);
      var expected = 1;
      var result = fullsizeCanvas.childCount;
      (result).should.equal(expected);
      
      fullsizeCanvas.removeChild(childB);
      result = fullsizeCanvas.childCount;
      (result).should.equal(expected);
    });

    it('should be able to remove an existing child from the display list', function(){
      var nameA = 'argon'
        , nameB = 'potas­sium';
      var childA = {"name":nameA}
        , childB = {"name":nameB};

      fullsizeCanvas.addChild(childA).addChild(childB);
      var expected = 2;
      var result = fullsizeCanvas.childCount;
      (result).should.equal(expected);
      
      fullsizeCanvas.removeChild(childB);
      expected = 1;
      result = fullsizeCanvas.childCount;
      (result).should.equal(expected);
    });
  });
});
