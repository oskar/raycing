var Car = require('./car');
var Paper = require('paper');

export default class Game{
  constructor(map){
    this.scale = 20;
    this.players = [];
    this.start = map.start;
    this.end = map.end;
    this.track = map.track;
    this.currentPlayerIndex = 0;
  }

  get currentPlayer(){
    return this.players[this.currentPlayerIndex];
  }

  get vectorsForControls(){
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

    return vectorsForControls;
  }

  addPlayer(point, direction){
    this.players.push(new Car(point, direction));
  }

  movePlayer(vector){
    this.currentPlayer.move(vector);
    var player = this.currentPlayer;
    player.isInEndZone = this.isInZone(this.end, player.position);
    this.setNextPlayer();
    return player;
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
    return false;
    var isBetweenX = zone.topLeft.x <= position.x && position.x <= zone.bottomRight.x;
    var isBetweenY = zone.topLeft.y <= position.y && position.y <= zone.bottomRight.y;
    return isBetweenY && isBetweenX;
  }
}
