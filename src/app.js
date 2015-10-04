var Victor = require('victor');
var Bacon = require('baconjs');
var Car = require('./car');
var Gui = require('./gui');

var gui = new Gui();

var game = {
  players: [
    new Car(new Victor(10,10), new Victor(2,0)),
    new Car(new Victor(10,8), new Victor(2,0))
  ],
  start: function() {
    this.currentPlayer.push(this.players[this.currentPlayerIndex]);
  },
  currentPlayerIndex: 0,
  currentPlayer: new Bacon.Bus()
}

game.players.map(player => gui.addPlayer(player));

var nextControlsPositionStream = game.currentPlayer
  .map(player => player.position.clone().add(player.direction))
  .log();

nextControlsPositionStream.onValue(vector => gui.drawControls(vector));

game.start();

/*
moveKeyupStream
  .sampledBy(moveButtonClickStream)
  .map(value => value.split(','))
  .filter(array => array.length === 2)
  .map(parseToIntegerBase10)
  .map(Victor.fromArray)
  .onValue(move => {
    gui_appendMove(p1Container, game.p1.position, move);
    game.p1.move(move);
    gui_appendPosition(p1Container, game.p1.position);
  });
*/
