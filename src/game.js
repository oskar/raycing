var Car = require('./car');
var Paper = require('paper');

export default class Game{
  constructor(map){
    this.scale = 20;
    this.players = [];
    this.track = Paper.project.importJSON(map.track);
    this.start = Paper.project.importJSON(map.start);
    this.end = Paper.project.importJSON(map.end);
    this.currentPlayerIndex = 0;
    this.vectorsForControls = [];
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
    }

    this.vectorsForControls = vectorsForControls;
  }

  addPlayer(point, direction){
    this.players.push(new Car(point, direction));
  }

  movePlayer(vector){
    this.currentPlayer.move(vector);
    var player = this.currentPlayer;
    player.isInEndZone = this.isInZone(this.end, player.position);
    return player;
  }

  nextTurn(){
    this.setNextPlayer();
    this.setVectorsForControls();
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
