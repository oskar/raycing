var Car = require('./car');
var Victor = require('victor');
var Bacon = require('baconjs');

var car = new Car(new Victor(0,0), new Victor(0,2));

var move = document.querySelector('#move');
var moveButton = document.querySelector('#moveButton');
var output = document.querySelector('#output');

var moveKeyupStream = Bacon.fromEvent(move, "keyup")
  .map(() => move.value).toProperty(move.value).log();
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
    car.move(moveAsVictor);
    output.innerText = car.position.toString();
  });

  output.innerText = car.position.toString();
