export default class Car {
  constructor(position, direction){
    this.positions = [position];
    this.currentPositionIndex = 0;
    this.direction = direction;
    this.isAlive = true;
    this.isInEndZone = false;
  }

  get position(){
    return this.positions[this.currentPositionIndex];
  }

  set position(value){
    this.positions.push(value);
    this.currentPositionIndex++;
  }

  get moves() {
    return this.positions.length - 1;
  }

  move(vector) {
    this.position = this.position.clone().add(vector);
    this.direction = vector;
  }
}
