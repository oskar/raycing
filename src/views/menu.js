var Paper = require('paper');

export default class Menu{
  constructor(onDone){
    this.onDone = onDone;
    this.maps = [
      {
        name: "Test 1"
      },
      {
        name: "Test 2"
      }
    ];

    this.mouseTools = new Paper.Tool();
    this.mouseTools.onMouseUp = event => this.onMouseUp(event);

    this.content = new Paper.Group();
    this.content.fillColor = 'black';

    var selectMapText = new Paper.PointText(new Paper.Point(200, 95));
    selectMapText.fontFamily = 'monospace';
    selectMapText.fontSize = '40px';
    selectMapText.content = 'Select map';

    this.content.addChild(selectMapText);

    var createMapText = new Paper.PointText(new Paper.Point(600, 95));
    createMapText.fontFamily = 'monospace';
    createMapText.fontSize = '40px';
    createMapText.content = 'Create map';
    createMapText.clickData = { view: 'Create map' };

    this.content.addChild(createMapText);

    this.maps.forEach((m, i) => {
      var mapGroup = new Paper.Group();
      mapGroup.clickData = { view: 'Game', params: m };
      var mapText = new Paper.PointText(new Paper.Point(200, 157 + 60 * i));
      mapText.fontSize = '20px';
      mapText.content = m.name;
      mapGroup.addChild(mapText);
      this.content.addChild(mapGroup);
    });

    Paper.view.draw();
  }

  onMouseUp(event){
    var clickData;
    var item = event.getItem();
    if(item){
      var itemClicked = item.hitTest(event.point).item;
      if(itemClicked){
        if(itemClicked.clickData){
          clickData = itemClicked.clickData;
        }
        if(itemClicked.parent && itemClicked.parent.clickData){
          clickData = itemClicked.parent.clickData;
        }
        if(clickData){
          this.onDone(clickData);
        }
      }
    }
  }

  dispose(){
    this.mouseTools.remove();
    this.content.remove();
  }
}
