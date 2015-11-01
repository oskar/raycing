var Paper = require('paper');
var view = require('./view');

export default class MapEditor{
  constructor(callback){
    this.callback = callback;
    this.course;
    this.track;
    this.start;
    this.end;

    this.mouseControls = new Paper.Tool();
    var lastClick;
    this.mouseControls.onMouseDown = e => {
      var now = Date.now();
      if(now - lastClick < 200) {
        this.onDoubleClick(e);
      } else {
        this.onMouseDown(e);
      }
      lastClick = now;
    }
    this.mouseControls.onMouseDrag = e => this.onMouseDrag(e);
  }

  onMouseDown(event) {
    if(!this.track){
      this.track = new Paper.Path.Circle(event.point, 40);
      this.track.fillColor = 'purple';
      this.course = new Paper.Group(this.track);
      view.addCourse(this.course);
    }
    if(this.track.contains(event.point)) {
      this.isAdding = true;
    } else {
      this.isAdding = false;
    }
  }

  onDoubleClick(event) {
    if(!this.start) {
      this.start = new Paper.Path.Circle(event.point, 60).intersect(this.track);
      this.start.fillColor = 'teal';
      this.course.addChild(this.start);
    } else {
      this.end = new Paper.Path.Circle(event.point, 60).intersect(this.track);
      this.end.fillColor = 'yellow';
      this.course.addChild(this.end);
      this.done();
    }
  }

  onMouseDrag(event) {
    var editCircle = new Paper.Path.Circle(event.point, 40);
    var newTrack;
    if(this.isAdding){
      newTrack = this.track.unite(editCircle);
    } else {
      newTrack = this.track.subtract(editCircle);
    }
    this.track.remove();
    this.track = newTrack;
  }

  done(){
    this.mouseControls.remove();

    var map = {
      track: this.track.toJSON(),
      start: this.start.toJSON(),
      end: this.end.toJSON()
    }

    view.setView(this.track.bounds.expand(100));

    var dataURL = document.querySelector('canvas').toDataURL("image/png");

    this.course.remove();
    var key = 'map-' + (new Date()).toISOString();
    var value = { dataURL, map };
    localStorage.setItem(key, JSON.stringify(value));
    this.callback({ view: 'Menu' });
  }

  dispose(){
    this.course.remove();
  }
}
