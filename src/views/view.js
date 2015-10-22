var Paper = require('paper');
var changeCenter = require('./utils').changeCenter;
var changeZoom = require('./utils').changeZoom;

var canvas = document.createElement('canvas');

var width = document.body.clientWidth;
var height = document.body.clientHeight;

var viewBounds = new Paper.Rectangle(0, 0, height * 2, width * 2);

var maxZoom = width / viewBounds.width;

initPaper(canvas, width, height);

var background = new Paper.Group();
background.addChild(createGrid(viewBounds));

var mouseControls;

Paper.view.draw();

function initPaper(canvas, width, height){
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  document.body.appendChild(canvas);
  Paper.setup(canvas);
}

function createGrid(viewBounds){
  var grid = new Paper.Group();
  background.addChild(grid);
  for(var x = viewBounds.top; x < viewBounds.bottom; x += 20){
    var line = new Paper.Path.Line({
      segments: [[x, 0], [x, viewBounds.width]],
      strokeColor: 'lightblue',
      strokeWidth: 1
    });
    grid.addChild(line);
  }
  for(var y = viewBounds.left; y < viewBounds.right; y += 20){
    var line = new Paper.Path.Line({
      segments: [[0, y], [viewBounds.height, y]],
      strokeColor: 'lightblue',
      strokeWidth: 1
    });
    grid.addChild(line);
  }

  return grid;
}

function onMouseDrag(event){
  var offset = changeCenter(Paper.view.center, event.delta, 0.6);
  Paper.view.scrollBy(offset.multiply(-1));
  limitView();
}

function mousewheel(e){
  var mousePosition = new Paper.Point(e.offsetX, e.offsetY);
  var viewPosition = Paper.view.viewToProject(mousePosition);
  var zoomAndOffset = changeZoom(Paper.view.zoom, e.deltaY, Paper.view.center, viewPosition);
  Paper.view.zoom = Math.max(zoomAndOffset.newZoom, maxZoom);
  Paper.view.center = Paper.view.center.add(zoomAndOffset.offset);
  limitView();
}

function limitView(){
  var newCenter = Paper.view.center.clone();
  if(Paper.view.bounds.left < viewBounds.left) newCenter.x = viewBounds.left + Paper.view.bounds.width / 2;
  if(Paper.view.bounds.right > viewBounds.right) newCenter.x = viewBounds.right - Paper.view.bounds.width / 2;
  if(Paper.view.bounds.top < viewBounds.top) newCenter.y = viewBounds.top + Paper.view.bounds.height / 2;
  if(Paper.view.bounds.bottom > viewBounds.bottom) newCenter.y = viewBounds.bottom - Paper.view.bounds.height / 2;
  Paper.view.center = newCenter;
}

export function createGameControls(){
  mouseControls = new Paper.Tool();
  //mouseControls.onMouseDrag = e => onMouseDrag(e);
  canvas.addEventListener('mousewheel', e => {
    e.preventDefault();
    mousewheel(e);
  });

  return mouseControls;
};

export function removeMouseWheelListener(){
  canvas.removeEventListener('mousewheel');
}
