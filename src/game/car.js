var Paper = require('paper');

export default class Car {
  constructor(scale, startPosition){
    this.scale = scale;
    this.positions = [];
    this.isAlive = true;
    this.isInEndZone = false;

    if(startPosition) {
      this.positions.push(startPosition);
    }
  }

  get position() {
    if(this.positions.length > 0) {
      return this.positions[this.positions.length - 1];
    }

    return null;
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

        possibleMoves.push({
          relative: direction,
          absolute: position
        });
      }
    }

    return possibleMoves;
  }

  move(vector) {
    this.positions.push(this.position.clone().add(vector));
    this.direction = vector;
  }
}
