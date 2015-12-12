export default class Car {
  constructor(startPosition, startDirection){
    this.positions = [startPosition];
    this.direction = startDirection;
    this.isAlive = true;
    this.isInEndZone = false;
  }

  get position(){
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
