var fullsizeCanvas;
var graphics;

function initialize() {
  fullsizeCanvas = FullsizeCanvas.create().initialize();
  testDragDrop();
  testHierarchicalBoxes();
  testFixedPositionBox();
  fullsizeCanvas.refresh();
}

function testPulse() {
  var pulse = new Pulse();
  pulse.addPulseEventListener(function() {
    fullsizeCanvas.refresh();
  });

  var period = 100;
  var numTimes = 4;
  pulse.start(period);
  setTimeout(function() {
    pulse.stop();
  }, period * numTimes);
}

function testDragDrop() {
  var bounds = new Rectangle(150, 50, 200, 200);
  var fillStyle = '#229977';
  var spec = {name:'big.box', bounds:bounds, fillStyle:fillStyle};
  var style = {width:3, color:'#ffaaff'};
  var box = Box.create(spec)
              .borderStyle(style)
              .on('accptedDrop', function(droppedItem) {
                fullsizeCanvas.refresh();
              });

  fullsizeCanvas.addChild(box);
  fullsizeCanvas.dragDrop.registerDropTarget(box);

  addDraggableBox();
}

function addDraggableBox() {
  var bounds = new Rectangle(50,125,50,50);
  var color = '#774422';
  var fillStyle = colorWithAlpha(color, 0.85);
  var spec = {name:'draggable.box', bounds:bounds, fillStyle:fillStyle};
  var box = Box.create(spec);

  fullsizeCanvas.addChild(box);
}

function testHierarchicalBoxes() {
  var containerBounds = Rectangle.create(400, 50, 400, 300);
  var color = '#224477';
  var fillStyle = colorWithAlpha(color, 0.85);
  var spec = {name:'container.box', bounds:containerBounds, fillStyle:fillStyle};
  var containerBox = Box.create(spec);

  var bounds = new Rectangle(410,60,25,25);
  var color = '#447722';
  var alpha = 0.85;
  var fillStyle = colorWithAlpha(color, alpha);
  var spec = {name:'inside.box', bounds:bounds, fillStyle:fillStyle};
  var box = Box.create(spec);
  containerBox.addChild(box);

  bounds = Rectangle.create(450,60,25,25);
  color = '#c7c700';
  fillStyle = colorWithAlpha(color, alpha);
  spec = {name:'noBorder.box', bounds:bounds, fillStyle:fillStyle};
  box = Box.create(spec).noBorder();
  containerBox.addChild(box);

  bounds = Rectangle.create(490,60,25,25);
  color = '#c70000';
  fillStyle = colorWithAlpha(color, alpha);
  spec = {name:'noBorder.box', bounds:bounds, fillStyle:fillStyle};
  var style = {width:3, color:'#ffaaff'};
  box = Box.create(spec).borderStyle(style);
  containerBox.addChild(box);

  fullsizeCanvas.addChild(containerBox);
}

function testFixedPositionBox() {
  var containerBounds = Rectangle.create(50, 275, 200, 200);
  var color = '#242477';
  var fillStyle = colorWithAlpha(color, 0.85);
  var spec = {name:'fixed.position.box', bounds:containerBounds, fillStyle:fillStyle};
  var containerBox = Box.create(spec);
  containerBox.fixedPosition = true;

  var bounds = new Rectangle(60,280,25,25);
  var color = '#447722';
  var fillStyle = colorWithAlpha(color, 0.85);
  var spec = {name:'moveable.inside.box', bounds:bounds, fillStyle:fillStyle};
  var box = Box.create(spec);
  containerBox.addChild(box);

  fullsizeCanvas.addChild(containerBox);
}

function testSize() {
  var bounds = new Rectangle(25,400,100,100);
  var size = bounds.size;
}