var Car = require('./car');
var Victor = require('victor');
var Bacon = require('baconjs');

var scale = 20;

var move = document.querySelector('#move');
var moveButton = document.querySelector('#moveButton');
var p1Container = document.querySelector('#p1Container');

var moveKeyupStream = Bacon.fromEvent(move, "keyup").map(() => move.value).toProperty(move.value).log();
var moveButtonClickStream = Bacon.fromEvent(moveButton, "click").log();

function parseToIntegerBase10(stringArray){
  return stringArray.map(string => parseInt(string, 10));
}

moveKeyupStream
  .sampledBy(moveButtonClickStream)
  .map(value => value.split(','))
  .filter(array => array.length === 2)
  .map(parseToIntegerBase10)
  .map(Victor.fromArray)
  .onValue(moveAsVictor => {
    p1.move(moveAsVictor);
    appendPosition(p1Container, p1.position.x, p1.position.y);
  });

function appendPosition(playerContainer, x, y){
  var newPosition = document.createElement('span');
  newPosition.className = 'position';
  newPosition.style.top = y * scale + "px";
  newPosition.style.left = x * scale + "px";
  playerContainer.appendChild(newPosition);
}

var p1 = new Car(new Victor(10,10), new Victor(0,2));

appendPosition(p1Container, p1.position.x, p1.position.y);
