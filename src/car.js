export default class Car {
  constructor(position, direction){
    this.positions = [position];
    this.currentPositionIndex = 0;
    this.direction = direction;
  }

  get position(){
    return this.positions[this.currentPositionIndex];
  }

  get lastPosition(){
    return this.positions[this.currentPositionIndex - 1];
  }

  set position(value){
    this.positions.push(value);
    this.currentPositionIndex++;
  }

  move(vector) {
    if(!this.isValidMove(this.direction, vector)) {
      return;
    }

    this.position = this.position.clone().add(vector);
    this.direction = vector;
  }

  isValidMove(direction, move) {
    return direction.absDistanceX(move) <= 1 &&
           direction.absDistanceY(move) <= 1;
  }
}
