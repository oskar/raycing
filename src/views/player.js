var Paper = require('paper');

export default class Player{
  constructor(color, position){
    this.color = color;
    this.path = new Paper.Path({
      strokeColor: this.color,
      strokeWidth: 2
    });
    this.elements = new Paper.Group([this.path]);

    this.addPosition(position);
  }

  addPosition(position){
    this.path.add(position);
    this.path.smooth();
    var circle = this.createPositionElement(position);
    this.elements.addChild(circle);
  }

  createPositionElement(position){
    var circle = new Paper.Path.Circle(position, 5);
    circle.fillColor = this.color;
    return circle;
  }
}
