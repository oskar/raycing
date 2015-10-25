var Paper = require('paper');
var view = require('./view');

export default class MapEditor{
  constructor(callback){
    this.callback = callback;
    this.track = new Paper.Path();
    this.track.strokeColor = 'black';
    this.start = new Paper.Path();
    this.start.strokeColor = 'black';
    this.end = new Paper.Path();
    this.end.strokeColor = 'black';
    this.steps = [this.track, this.start, this.end];
    this.currentStep = 0;

    this.mouseControls = new Paper.Tool();
    this.mouseControls.onMouseDrag = e => this.onMouseDrag(e);
    this.mouseControls.onMouseUp = e => this.onMouseUp(e);

    this.elements = new Paper.Group();
    this.elements.addChild(this.track);
    this.elements.addChild(this.start);
    this.elements.addChild(this.end);
  }

  onMouseDrag(event) {
    this.steps[this.currentStep].add(event.point);
  }

  onMouseUp(event) {
    this.steps[this.currentStep].simplify(5);
    this.steps[this.currentStep].closed = true;
    this.currentStep++;
    if(this.currentStep === this.steps.length) {
      this.done();
    }
  }

  done(){
    this.mouseControls.remove();

    var track = this.track;
    track.closed = true;
    track.fillColor = 'grey';
    track.strokeColor = 'black';
    track.opacity = '0.7';
    var startArea = this.start.intersect(this.track);
    startArea.fillColor = 'green';
    startArea.strokeColor = 'black';
    startArea.opacity = '0.7';
    var endArea = this.end.intersect(this.track);
    endArea.fillColor = 'yellow';
    endArea.strokeColor = 'black';
    endArea.opacity = '0.7';

    var map = {
      track: track,
      start: startArea,
      end: endArea
    }

    view.setView(this.track.bounds);
    this.start.remove();
    this.end.remove();
    Paper.view.draw();
    var dataURL = document.querySelector('canvas').toDataURL("image/png");
    
    this.elements.remove();
    var key = 'map-' + (new Date()).toISOString();
    var value = {
      dataURL,
      map: this.paperToStorage(map)
    };
    localStorage.setItem(key, JSON.stringify(value));
    this.callback({ view: 'Menu' });
  }

  paperToStorage(map){
    return {
      track: map.track.segments,
      start: map.start.segments,
      end: map.end.segments,
    }
  }

  dispose(){
    this.elements.remove();
  }
}
