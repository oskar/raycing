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
  }

  get currentPlayer(){
    return this.players[this.currentPlayerIndex];
  }

  startGame(){
    this.setVectorsForControls();
  }

  setVectorsForControls(){
    var player = this.currentPlayer;
    var allowedMoves = [];

    if(player.position) {
      console.log('Player has start position, calculating possible moves');
      player.getPossibleMoves().forEach(move => {
        if(this.isAllowedPosition(move)) {
          vectorsForControls.push(move);
        }
      });
    } else {
      console.log('Player doesnt have start position, calculating possible start positions');
      this.getAllowedStartPositions().forEach(move => {
        vectorsForControls.push(move);
      });

      console.log('Found ' + vectorsForControls.length + ' possible start positions');
      console.log(vectorsForControls);
    }

    if(allowedMoves.length === 0) {
      player.isAlive = false;
    } else {
      this.vectorsForControlsStream.push(allowedMoves);
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
        if(this.start.contains(point)) {
          startingPoints.push(point);
        }
      }
    }

    return startingPoints;
  }

  addPlayer(point){
    this.players.push(new Car(this.scale, point));
  }

  movePlayer(position){
    var player = this.currentPlayer;
    player.move(position);
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

  isAllowedPosition(position) {
    var carsOnThisPosition = this.players.filter(p => p.position && p.position.clone().subtract(position).length === 0);
    var noOtherCars = carsOnThisPosition.length === 0;
    var isOnTrack = this.track.contains(position);
    return noOtherCars && isOnTrack;
  }

  isInZone(zone, position){
    return zone.contains(position);
  }
}
