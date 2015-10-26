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
  if(isSameBounds(Paper.view.bounds, bounds)) return;
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
  var newZoom = Paper.view.viewSize.width/size.width;
  newZoom = newZoom > 1 ? newZoom : 1;
  console.log('New view:', bounds.center, newZoom);
  animateView(bounds.center, newZoom);
}

export function reset(){
  setView(initialBounds);
}

function isSameBounds(view1, view2){
  var diff = view1.center.subtract(view2.center).length
  return diff < 1;
}

function animateView(center, zoom){
  var totalTime = 0.5;
  var deltaCenter = center.clone().subtract(Paper.view.center).divide(totalTime);
  var deltaZoom = (zoom - Paper.view.zoom) / totalTime;
  var elapsedTime = 0;
  var animating = true;
  Paper.view.onFrame = event => {
    if(!animating) return;
    elapsedTime += event.delta;
    if(elapsedTime > totalTime){
      Paper.view.center = center;
      Paper.view.zoom = zoom;
      animating = false;
      return;
    }
    if(event.delta > 0){
      Paper.view.center = Paper.view.center.add(deltaCenter.multiply(event.delta));
      Paper.view.zoom = Paper.view.zoom + (deltaZoom * event.delta);
    }
  }
}
