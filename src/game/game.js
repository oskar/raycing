var Car = require('./car');
var Paper = require('paper');
var Bacon = require('baconjs');

export default class Game{
  constructor(map, nbrOfPlayers){
    this.vectorsForControlsStream = new Bacon.Bus();
    this.gameEndedStream = new Bacon.Bus();
    this.playerPositionStream = new Bacon.Bus();
    this.scale = 20;
    this.players = [];
    this.track = Paper.project.importJSON(map.track);
    this.start = Paper.project.importJSON(map.start);
    this.end = Paper.project.importJSON(map.end);
    this.currentPlayerIndex = 0;

    for (var i = 0; i < nbrOfPlayers; i++) {
      this.players.push(new Car(this.scale));
    }
  }

  get currentPlayer(){
    return this.players[this.currentPlayerIndex];
  }

  startGame(){
    this.setVectorsForControls();
  }

  setVectorsForControls(){
    var player = this.currentPlayer;
    var vectorsForControls = [];

    if(player.position) {
      player.getPossibleMoves().forEach(position => {
        if(!this.isPositionOccupied(position) && this.track.contains(position)) {
          vectorsForControls.push(position);
        }
      });
    } else {
      vectorsForControls = this.getAllowedStartPositions();
    }

    if(vectorsForControls.length === 0) {
      player.isAlive = false;
    } else {
      this.vectorsForControlsStream.push(vectorsForControls);
    }
  }

  getAllowedStartPositions() {
    var scale = this.scale;
    var bounds = this.start.bounds;

    var x_start = Math.ceil(bounds.left / scale) * scale;
    var x_end = Math.floor(bounds.right / scale) * scale;

    var y_start = Math.ceil(bounds.top / scale) * scale;
    var y_end = Math.floor(bounds.bottom / scale) * scale;

    var startingPoints = [];

    for (var x = x_start; x <= x_end; x += scale) {
      for (var y = y_start; y <= y_end; y += scale) {
        var point = new Paper.Point(x, y);
        if(this.start.contains(point) && !this.isPositionOccupied(point)) {
          startingPoints.push(point);
        }
      }
    }

    return startingPoints;
  }

  movePlayer(position){
    var player = this.currentPlayer;
    if(player.position) {
      player.move(position);
    }
    else {
      player.setStartPosition(position);
    }

    this.playerPositionStream.push({playerIndex: this.currentPlayerIndex, position: player.position});

    if(this.isInZone(this.end, player.position)){
      var moves = player.moves;
      this.gameEndedStream.push({ winningPlayerIndex: this.currentPlayerIndex, moves: moves });
    } else {
      this.nextTurn();
    }
  }

  nextTurn(){
    this.setNextPlayer();
    this.setVectorsForControls();
    if(this.players.filter(p => p.isAlive).length === 0) {
      this.gameEndedStream.push({ winningPlayerIndex: -1 });
    } else if(!this.currentPlayer.isAlive) {
      this.nextTurn();
    }
  }

  setNextPlayer(){
    this.currentPlayerIndex++;
    if(this.currentPlayerIndex === this.players.length) {
      this.currentPlayerIndex = 0;
    }
  }

  isPositionOccupied(position) {
    var carsOnThisPosition = this.players.filter(p => p.position && p.position.clone().subtract(position).length === 0);
    return carsOnThisPosition.length !== 0;
  }

  isInZone(zone, position){
    return zone.contains(position);
  }
}
