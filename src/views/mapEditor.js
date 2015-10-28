var Paper = require('paper');
var view = require('./view');

export default class MapEditor{
  constructor(callback){
    this.callback = callback;
    this.track = new Paper.Path();
    this.track.closed = true;
    this.track.strokeColor = 'white';
    this.start = new Paper.Path();
    this.start.strokeColor = 'teal';
    this.end = new Paper.Path();
    this.end.strokeColor = 'yellow';
    this.course = new Paper.Group(this.track, this.start, this.end);
    this.steps = [this.track, this.start, this.end];
    this.currentStep = 0;

    this.mouseControls = new Paper.Tool();
    this.mouseControls.onMouseDrag = e => this.onMouseDrag(e);
    this.mouseControls.onMouseUp = e => this.onMouseUp(e);
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

    view.addCourse(this.course);
    var track = this.track;
    var startArea = this.start.intersect(this.track);
    startArea.fillColor = 'teal';
    var endArea = this.end.intersect(this.track);
    endArea.fillColor = 'yellow';
    var map = {
      track: track,
      start: startArea,
      end: endArea
    }

    view.setView(this.track.bounds.expand(50));
    this.start.remove();
    this.end.remove();
    Paper.view.draw();
    var dataURL = document.querySelector('canvas').toDataURL("image/png");

    this.course.remove();
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
    this.course.remove();
  }
}
