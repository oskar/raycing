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
    var vectorsForControls = [];

    player.getPossibleMoves().forEach(move => {
      if(this.isAllowedPosition(move.absolute)) {
        vectorsForControls.push(move);
      }
    });

    if(vectorsForControls.length === 0) {
      player.isAlive = false;
    } else {
      this.vectorsForControlsStream.push(vectorsForControls);
    }
  }

  addPlayer(point){
    this.players.push(new Car(this.scale, point));
  }

  movePlayer(vector){
    this.currentPlayer.move(vector);
    this.playerPositionStream.push({playerIndex: this.currentPlayerIndex, position: this.currentPlayer.position});
    var player = this.currentPlayer;

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
    var carsOnThisPosition = this.players.filter(p => p.position.clone().subtract(position).length === 0);
    var noOtherCars = carsOnThisPosition.length === 0;
    var isOnTrack = this.track.contains(position);
    return noOtherCars && isOnTrack;
  }

  isInZone(zone, position){
    return zone.contains(position);
  }
}
