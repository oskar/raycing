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
    for(var y = 1; y >= -1; y--){
      for(var x = -1; x <= 1; x++){
        var playerRelativeVector = new Paper.Point(this.scale * x, this.scale * y).clone().add(player.direction);
        var absoluteVector = playerRelativeVector.clone().add(player.position);
        if(this.isPossiblePosition(absoluteVector)) {
          vectorsForControls.push({
            relative: playerRelativeVector,
            absolute: absoluteVector
          });
        }
      }
    }

    if(vectorsForControls.length === 0) {
      player.isAlive = false;
    } else {
      this.vectorsForControlsStream.push(vectorsForControls);
    }
  }

  addPlayer(point){
    var direction = new Paper.Point(0, 0);
    this.players.push(new Car(point, direction));
  }

  movePlayer(vector){
    this.currentPlayer.move(vector);
    this.playerPositionStream.push({playerIndex: this.currentPlayerIndex, position: this.currentPlayer.position});
    var player = this.currentPlayer;

    if(this.isInZone(this.end, player.position)){
      var moves = player.positions.length - 1;
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

  isPossiblePosition(v) {
    var carsOnThisPosition = this.players.filter(p => p.position.clone().subtract(v).length === 0);
    var noOtherCars = carsOnThisPosition.length === 0;
    var isOnTrack = this.track.contains(v);
    return noOtherCars && isOnTrack;
  }

  isInZone(zone, position){
    return zone.contains(position);
  }
}
