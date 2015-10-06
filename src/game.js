var Car = require('./car');
var Victor = require('victor');

export default class Game{
  constructor(){
    this.players = [
      new Car(new Victor(10,10), new Victor(2,0))
    ];
    this.currentPlayerIndex = 0;
  }

  get currentPlayer(){
    return this.players[this.currentPlayerIndex];
  }

  get vectorsForControls(){
    var player = this.currentPlayer;
    return [-1,0,1].map(x => [-1,0,1].map(y => {
      var playerRelativeVector = new Victor(x,y).clone().add(player.direction);
      var absoluteVector = playerRelativeVector.clone().add(player.position);
      if(this.isPossiblePosition(absoluteVector)) {
        vectorsForControls.push({
          relative: playerRelativeVector,
          absolute: absoluteVector
        });
      }
    }));
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
