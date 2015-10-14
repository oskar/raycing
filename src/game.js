var Car = require('./car');
var Victor = require('victor');

export default class Game{
  constructor(){
    this.players = [
      new Car(new Victor(3, 5), new Victor(2,0)),
      //new Car(new Victor(3, 7), new Victor(2,0))
    ];
    this.start = {
      topLeft: new Victor(2,2),
      bottomRight: new Victor(3,10)
    }
    this.end = {
      topLeft: new Victor(2,22),
      bottomRight: new Victor(10,30)
    }
    this.track = [
      [1,1],
      [50,1],
      [50,31],
      [1,31],
      [1,21],
      [40,21],
      [40,11],
      [1,11],
    ].map(s => new Victor(s[0], s[1]));
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
        var playerRelativeVector = new Victor(x,y).clone().add(player.direction);
        var absoluteVector = playerRelativeVector.clone().add(player.position);
        if(this.isPossiblePosition(absoluteVector)) {
          vectorsForControls.push({
            relative: playerRelativeVector,
            absolute: absoluteVector
          });
        }
      }
    }
    return vectorsForControls;
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
    var carsOnThisPosition = this.players.filter(p => p.position.clone().subtract(v).length() === 0);
    var noOtherCars = carsOnThisPosition.length === 0;
    return noOtherCars;
  }

  isInZone(zone, position){
    return false;
    var isBetweenX = zone.topLeft.x <= position.x && position.x <= zone.bottomRight.x;
    var isBetweenY = zone.topLeft.y <= position.y && position.y <= zone.bottomRight.y;
    return isBetweenY && isBetweenX;
  }
}
