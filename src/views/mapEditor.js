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
    var startZone = this.start.intersect(this.track);
    var endZone = this.end.intersect(this.track);
    var map = {
      track: this.track,
      start: startZone,
      end: endZone
    }
    this.start.remove();
    this.end.remove();
    view.setView(this.track.bounds);
    Paper.view.draw();

    var dataURL = document.querySelector('canvas').toDataURL("image/png");
    this.elements.remove();
    localStorage.setItem('map-' + (new Date()).toISOString(), JSON.stringify({ dataURL, map }));
    this.callback({ view: 'Menu' });
  }

  paperToStorage(map){
    return {
      track: map.track[1].segments,
      start: map.start[1].segments,
      end: map.end[1].segments,
    }
  }

  dispose(){
    this.elements.remove();
  }
}
