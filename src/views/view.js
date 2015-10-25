var Paper = require('paper');
var changeCenter = require('./utils').changeCenter;
var changeZoom = require('./utils').changeZoom;

var canvas = document.createElement('canvas');

var width = document.body.clientWidth;
var height = document.body.clientHeight;

initPaper(canvas, width, height);

var background = new Paper.Group();
var mouseControls;

Paper.view.draw();

var outerBounds = new Paper.Rectangle(0, 0, width * 2, height * 2);
background.addChild(createGrid(outerBounds));
var initialBounds = Paper.view.bounds.clone();

function initPaper(canvas, width, height){
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  document.body.appendChild(canvas);
  Paper.setup(canvas);
}

function createGrid(viewBounds){
  var grid = new Paper.Group();
  for(var x = viewBounds.left; x < viewBounds.right; x += 20){
    var line = new Paper.Path.Line({
      segments: [[x, viewBounds.top], [x, viewBounds.bottom]],
      strokeColor: 'lightblue',
      strokeWidth: 1
    });
    grid.addChild(line);
  }
  for(var y = viewBounds.top; y < viewBounds.bottom; y += 20){
    var line = new Paper.Path.Line({
      segments: [[viewBounds.left, y], [viewBounds.right, y]],
      strokeColor: 'lightblue',
      strokeWidth: 1
    });
    grid.addChild(line);
  }

  return grid;
}

export function setView(bounds){
  bounds = bounds.expand(50);
  var aspectRatio = width/height;
  var size = bounds.size.clone();
  var newRatio = size.width/size.height;
  if(newRatio !== aspectRatio){
    if(newRatio < aspectRatio){
      size.width = size.width * aspectRatio/newRatio;
    } else {
      size.height = size.height * newRatio/aspectRatio;
    }
  }
  size = size.multiply(1.4);
  Paper.view.center = bounds.center;
  var newZoom = Paper.view.viewSize.width/size.width;
  Paper.view.zoom = newZoom > 1 ? newZoom : 1;
  console.log('New view:', Paper.view.center, Paper.view.zoom);
}

export function reset(){
  setView(initialBounds);
}
