var Car = require('./car');
var Victor = require('victor');
var Bacon = require('baconjs');

var scale = 20;

var move = document.querySelector('#move');
var moveButton = document.querySelector('#moveButton');
var p1Container = document.querySelector('#p1Container');

var moveKeyupStream = Bacon.fromEvent(move, "keyup").map(() => move.value).toProperty(move.value);
var moveButtonClickStream = Bacon.fromEvent(moveButton, "click");

function parseToIntegerBase10(stringArray){
  return stringArray.map(string => parseInt(string, 10));
}

moveKeyupStream
  .sampledBy(moveButtonClickStream)
  .map(value => value.split(','))
  .filter(array => array.length === 2)
  .map(parseToIntegerBase10)
  .map(Victor.fromArray)
  .onValue(move => {
    appendMove(p1Container, p1.position, move);
    p1.move(move);
    appendPosition(p1Container, p1.position);
  });

function appendMove(playerContainer, position, move){
  var top = Math.min(position.y, position.y + move.y);
  var left = Math.min(position.x, position.x + move.x);
  var height = Math.abs(move.y);
  var width = Math.abs(move.x);

  var hasTopToTheLeft = (move.x > 0 && move.y > 0) || (move.x < 0 && move.y < 0);
  var orientationClass = hasTopToTheLeft ? 'top-left' : 'top-right';

  var moveElement = document.createElement('span');
  moveElement.className = 'move ' + orientationClass;
  moveElement.style.top = top * scale + "px";
  moveElement.style.left = left * scale + "px";
  moveElement.style.width = width * scale + "px";
  moveElement.style.height = height * scale + "px";
  playerContainer.appendChild(moveElement);
}

function appendPosition(playerContainer, position){
  var newPosition = document.createElement('span');
  newPosition.className = 'position';
  newPosition.style.top = position.y * scale + "px";
  newPosition.style.left = position.x * scale + "px";
  playerContainer.appendChild(newPosition);
}

var p1 = new Car(new Victor(10,10), new Victor(0,2));

appendPosition(p1Container, p1.position);
