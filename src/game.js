var Car = require('./car');
var Victor = require('victor');

export default class Game{
  constructor(){
    this.players = [
      new Car(new Victor(100,100), new Victor(2,0))
    ];
    this.currentPlayerIndex = 0;
  }

  get currentPlayer(){
    return this.players[this.currentPlayerIndex];
  }

  get vectorsForControls(){
    var player = this.currentPlayer;
    var vectorsForControls = [];
    for(var x = -1; x <= 1; x++){
      for(var y = -1; y <= 1; y++){
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
    var position = this.currentPlayer.position;
    this.setNextPlayer();
    return position;
  }

  setNextPlayer(){
    this.currentPlayerIndex++;
    if(this.currentPlayerIndex === this.players.length) {
      this.currentPlayerIndex = 0;
    }
  }

  isPossiblePosition(v){
    return true;
  }
}
