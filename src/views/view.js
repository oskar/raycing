var Paper = require('paper');
var changeCenter = require('./utils').changeCenter;
var changeZoom = require('./utils').changeZoom;

var canvas = document.createElement('canvas');

var width = document.body.clientWidth;
var height = document.body.clientHeight;
var aspectRatio = width/height;

var viewBounds = new Paper.Rectangle(0, 0, height * 4, width * 4);

initPaper(canvas, width, height);

var background = new Paper.Group();
background.addChild(createGrid(viewBounds));

var mouseControls;

Paper.view.center = viewBounds.center;

Paper.view.draw();

function initPaper(canvas, width, height){
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  document.body.appendChild(canvas);
  Paper.setup(canvas);
}

function createGrid(viewBounds){
  var grid = new Paper.Group();
  for(var x = viewBounds.top; x < viewBounds.bottom; x += 20){
    var line = new Paper.Path.Line({
      segments: [[x, viewBounds.left], [x, viewBounds.right]],
      strokeColor: 'lightblue',
      strokeWidth: 1
    });
    grid.addChild(line);
  }
  for(var y = viewBounds.left; y < viewBounds.right; y += 20){
    var line = new Paper.Path.Line({
      segments: [[viewBounds.top, y], [viewBounds.bottom, y]],
      strokeColor: 'lightblue',
      strokeWidth: 1
    });
    grid.addChild(line);
  }

  return grid;
}

export function setView(bounds){
  var size = bounds.size;
  var newRatio = size.width/size.height;
  if(newRatio < aspectRatio){
    size.width = size.width * aspectRatio/newRatio;
  } else {
    size.height = size.height * newRatio/aspectRatio;
  }
  size = size.multiply(1.2);
  Paper.view.viewSize = size;
  Paper.view.center = bounds.center;
}
