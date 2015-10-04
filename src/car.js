export default class Car {
  constructor(position, direction){
    this.position = position;
    this.direction = direction;
  }

  move(vector) {
    if(!this.isValidMove(this.direction, vector)) {
      return;
    }

    this.position.add(vector);
    this.direction = vector;
  }

  isValidMove(direction, move) {
    return direction.absDistanceX(move) <= 1 &&
           direction.absDistanceY(move) <= 1;
  }
}
