var Paper = require('paper');

export default class Car {
  constructor(scale, startPosition){
    this.scale = scale;
    this.positions = [startPosition];
    this.isAlive = true;
    this.isInEndZone = false;
  }

  get position() {
    return this.positions[this.positions.length - 1];
  }

  get direction() {
    if(this.positions.length < 2) {
      return new Paper.Point(0, 0);
    }

    var currentPosition = this.positions[this.positions.length - 1];
    var previousPosition = this.positions[this.positions.length - 2];

    return currentPosition.clone().subtract(previousPosition);
  }

  get moves() {
    return this.positions.length - 1;
  }

  getPossibleMoves() {
    var possibleMoves = [];

    for(var x = -1; x <= 1; x++) {
      for(var y = -1; y <= 1; y++) {
        var direction = new Paper.Point(this.scale * x, this.scale * y).add(this.direction);
        var position = direction.clone().add(this.position);

        possibleMoves.push(position);
      }
    }

    return possibleMoves;
  }

  move(position) {
    this.positions.push(position);
  }
}
