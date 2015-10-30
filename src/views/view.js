var Paper = require('paper');
var changeCenter = require('./utils').changeCenter;
var changeZoom = require('./utils').changeZoom;
var animation = require('./animation');

var canvas = document.createElement('canvas');

var width = document.body.clientWidth;
var height = document.body.clientHeight;

initPaper(canvas, width, height);

var mouseControls;

var outerBounds = new Paper.Rectangle(0, 0, width * 2, height * 2);

var course = new Paper.Group(createGrid(outerBounds));
course.clipped = true;

var initialBounds = Paper.view.bounds.clone();

Paper.view.draw();

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

export function addCourse(element){
  course.appendBottom(element);
}

function initPaper(canvas, width, height){
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  document.body.appendChild(canvas);
  Paper.setup(canvas);
  animation.init();
}

function createGrid(viewBounds){
  var grid = new Paper.Group();
  for(var x = viewBounds.left; x < viewBounds.right; x += 20){
    var line = new Paper.Path.Rectangle(
      new Paper.Point(x - 0.5, viewBounds.top),
      new Paper.Point(x + 0.5, Paper.view.bounds.bottom)
    );
    line.fillColor = 'black';
    line.shadowColor = new Paper.Color(0,0,0);
    line.shadowBlur = 10;

    grid.addChild(line);
  }
  for(var y = viewBounds.top; y < viewBounds.bottom; y += 20){
    var line = new Paper.Path.Rectangle(
      new Paper.Point(viewBounds.left, y),
      new Paper.Point(Paper.view.bounds.right, y + 1)
    );
    line.fillColor = 'black';

    grid.addChild(line);
  }

  return grid;
}

function isSameBounds(view1, view2){
  var diff = view1.center.subtract(view2.center).length
  return diff < 1;
}

function animateView(center, zoom){
  var animationDuration = 0.3;
  var startCenter = Paper.view.center.clone();
  var deltaCenter = center.clone().subtract(startCenter);
  var startZoom = Paper.view.zoom;
  var deltaZoom = zoom - startZoom;
  animation.add(elapsedTime => {
    if(elapsedTime > animationDuration){
      Paper.view.center = center;
      Paper.view.zoom = zoom;
      return false;
    } else {
      var easeValue = elapsedTime/animationDuration;
      var dtCenter = deltaCenter.multiply(easeValue);
      Paper.view.center = startCenter.add(dtCenter);
      var dtZoom = deltaZoom * easeValue;
      Paper.view.zoom = startZoom + dtZoom;
    }
    return true;
  });
  // Paper.view.onFrame = event => {
  //   if(!animating) return;
  //   elapsedTime += event.delta;
  //   if(elapsedTime > animationDuration){
  //     Paper.view.center = center;
  //     Paper.view.zoom = zoom;
  //     animating = false;
  //     return;
  //   }
  //   if(event.delta > 0){
  //     var easeValue = elapsedTime/animationDuration;
  //     var dtCenter = deltaCenter.multiply(easeValue);
  //     Paper.view.center = startCenter.add(dtCenter);
  //     var dtZoom = deltaZoom * easeValue;
  //     Paper.view.zoom = startZoom + dtZoom;
  //   }
  // }
}
