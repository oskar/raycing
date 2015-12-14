var Paper = require('paper');

export default class Car {
  constructor(scale){
    this.scale = scale;
    this.positions = [];
    this.isAlive = true;
    this.isInEndZone = false;
  }

  get position() {
    if(this.positions.length > 0) {
      return this.positions[this.positions.length - 1];
    }

    return null;
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
    return Math.max(this.positions.length - 1, 0);
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
    if(!this.position) {
      throw 'Cannot move, has no start position';
    }

    this.positions.push(position);
  }

  setStartPosition(position) {
    if(this.position) {
      throw 'Cannot set start position, already has position';
    }

    this.positions.push(position);
  }
}
