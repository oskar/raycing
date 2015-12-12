var Paper = require('paper');

export default class Car {
  constructor(startPosition){
    this.positions = [startPosition];
    this.direction = new Paper.Point(0, 0);
    this.isAlive = true;
    this.isInEndZone = false;
  }

  get position() {
    return this.positions[this.positions.length - 1];
  }

  get moves() {
    return this.positions.length - 1;
  }

  move(vector) {
    this.positions.push(this.position.clone().add(vector));
    this.direction = vector;
  }
}
