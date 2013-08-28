require('verdoux');
var _ = require('underscore');
var assert = require('assert');
var should = require('should');
var sinon = require('sinon');
var util = require('util');
var Displayable = require('../../../src/display/Displayable');

describe('Displayable', function(){
  'use strict';

  var displayable;

  beforeEach(function() {
    displayable = Displayable.create();
  });

  it('should be able to be created', function(){
    assert(existy(displayable));
  });

  describe('#addChild', function(){
    it('should throw if child is notExisty', function(){
      (function(){
        var child;
        displayable.addChild(child);
      }).should.throw();
    });

    it('should be able to add a child to the display list', function(){
      var expected = displayable.childCount + 1;
      var name = 'phos­phorus';
      var child = Displayable.create();
      child['name'] = name;
      displayable.addChild(child);
      var result = displayable.childCount;
      (result).should.equal(expected);
    });

    it('should emit an event when a child is added', function(done){
      var name = 'yttrium';
      var child = Displayable.create();
      child['name'] = name;
      
      child.once('addedToParent', function(parent) {done();});
      displayable.addChild(child);
    });
  });

  describe('#removeChild', function(){
    it('should ignore if child is notExisty', function(){
      var expected = 0;
      var child;
      displayable.removeChild(child);
      var result = displayable.childCount;
      (result).should.equal(expected);
    });

    it('should ignore if child is not on displayList', function(){
      var nameA = 'sulfur'
        , nameB = 'chlorine'
        , childA = Displayable.create()
        , childB = Displayable.create();
      childA['name'] = nameA;
      childB['name'] = nameB;

      displayable.addChild(childA);
      var expected = 1;
      var result = displayable.childCount;
      (result).should.equal(expected);
      
      displayable.removeChild(childB);
      result = displayable.childCount;
      (result).should.equal(expected);
    });

    it('should be able to remove an existing child from the display list', function(){
      var nameA = 'argon'
        , nameB = 'potas­sium'
        , childA = Displayable.create()
        , childB = Displayable.create();
      childA['name'] = nameA;
      childB['name'] = nameB;

      displayable.addChild(childA).addChild(childB);
      var expected = 2;
      var result = displayable.childCount;
      (result).should.equal(expected);
      
      displayable.removeChild(childB);
      expected = 1;
      result = displayable.childCount;
      (result).should.equal(expected);
    });

    it('should emit an event when a child is removed', function(done){
      var nameA = 'argon'
        , nameB = 'potas­sium'
        , childA = Displayable.create()
        , childB = Displayable.create();
      childA['name'] = nameA;
      childB['name'] = nameB;

      displayable.addChild(childA).addChild(childB);
      childB.once('removedFromParent', function(parent) {done();});
      displayable.removeChild(childB);
    });
  });
});
