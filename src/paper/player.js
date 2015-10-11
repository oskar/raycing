var Paper = require('paper');

export default class Player{
  constructor(color, position){
    this.positions = new Paper.Group();
    this.color = color;
    this.path = new Paper.Path({
      strokeColor: this.color,
      strokeWidth: 3
    });
    this.groups = new Paper.Group([this.positions, this.path]);

    this.addPosition(position);
  }

  addPosition(position){
    this.path.add(position);
    this.path.smooth();

    var circle = new Paper.Path.Circle(position, 5);
    circle.fillColor = this.color;
    this.positions.addChild(circle);
  }
}
