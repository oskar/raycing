var Paper = require('paper');

export default class MapEditor{
  constructor(){
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
    this.elements.remove();
    this.mouseControls.remove();
    var map = {
      track: this.track,
      start: this.start.intersect(this.track),
      end: this.end.intersect(this.track)
    }
    this.callback(map);
  }

  onDone(callback){
    this.callback = callback;
  }
}
