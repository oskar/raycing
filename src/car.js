export default class Car {
  constructor(position, direction){
    this.position = position;
    this.direction = direction;
  }

  move(vector){
    this.position.add(vector);
    this.direction = vector;
  }
}
