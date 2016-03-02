import Paper from 'paper';

export default class Player{
  constructor(config){
    this.color = config.color;
    this.name = config.name;
    this.radius = 5;
    this.positions = [];
    this.path = new Paper.Path({
      strokeColor: this.color,
      strokeWidth: 0.5
    });
    this.circles = new Paper.Group();
    this.elements = new Paper.Group([this.path, this.circles]);
  }

  addPosition(position){
    this.path.add(position);
    this.path.smooth();

    this.circles.removeChildren();
    this.positions.push(position);
    this.positions
      .map((p, index) => this.createPositionElement(p, this.radius * (index + 1) / this.positions.length))
      .forEach(circle => this.circles.addChild(circle));
  }

  createPositionElement(position, radius){
    var circle = new Paper.Path.Circle(position, radius);
    circle.fillColor = 'black';
    circle.strokeColor = this.color;
    circle.strokeWidth = 0.5;
    return circle;
  }
}
