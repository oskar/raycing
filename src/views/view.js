var Paper = require('paper');
var changeCenter = require('./utils').changeCenter;
var changeZoom = require('./utils').changeZoom;
var animation = require('./animation');
var storage = require('../storage');

var canvas = document.getElementById('canvas');
canvas.setAttribute('keepalive', true);

var width = document.body.clientWidth;
var height = document.body.clientHeight;

initPaper(canvas, width, height);

var outerBounds = new Paper.Rectangle(0, 0, width, height);

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
  animateView(bounds.center, newZoom);
  Paper.view.draw();
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
    line.fillColor = 'white';

    grid.addChild(line);
  }
  for(var y = viewBounds.top; y < viewBounds.bottom; y += 20){
    var line = new Paper.Path.Rectangle(
      new Paper.Point(viewBounds.left, y),
      new Paper.Point(Paper.view.bounds.right, y + 1)
    );
    line.fillColor = 'white';

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
  });
}

var stars = [];

createStars();
if(storage.GetEnableStars()) {
  enableStars();
} else {
  disableStars();
}

function createStars() {
  for(var i = 0; i < 100; i++){
    var star = createStar();
    stars.push(star);
  }
}

function enableStars() {
  stars.forEach(star => {
    star.circle.visible = true;
    star.animationRemover = animation.add(star.animation);
  });
}

function disableStars() {
  stars.forEach(star => {
    star.circle.visible = false;
    if(star.animationRemover) {
      star.animationRemover.remove();
    }
  });
}

export function toggleStarsVisibility(){
  var starsEnabled = !storage.GetEnableStars();
  storage.SetEnableStars(starsEnabled);

  if(starsEnabled) {
    enableStars();
  } else {
    disableStars();
  }

  return starsEnabled;
}

function createStar() {
  // a random position anywhere in space
  var start = new Paper.Point.random().multiply(outerBounds.bottomRight);

  // distance from earth in pixels
  var distance = 4 + Math.random() * 11;

  var circle = new Paper.Path.Circle(start, 5 / distance);
  circle.fillColor = 'white';
  circle.position = start;

  // the speed of a star is lower if its far away. this is known science fact.
  var velocity = new Paper.Point(10 / distance, 0);

  return {
    circle: circle,
    velocity: velocity,
    animation: elapsedTime => {
      circle.position = circle.position.add(velocity);
      if(!outerBounds.contains(circle.position)){
        circle.position.x = 0;
      }
    }
  };
}
