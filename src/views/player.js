var Paper = require('paper');

export default class Player{
  constructor(config, position){
    this.color = config.color;
    this.name = config.name;
    this.path = new Paper.Path({
      strokeColor: 'white',
      strokeWidth: 1
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
    circle.strokeColor = 'white';
    circle.strokeWidth = 0.5;
    return circle;
  }
}
