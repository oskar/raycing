var Paper = require('paper');
var view = require('./view');

export default class MapEditor{
  constructor(onDone, params){
    this.onDone = onDone;
    this.course;
    if(params) {
      this.key = params.key;
      this.track = Paper.project.importJSON(params.map.track);
      this.start = Paper.project.importJSON(params.map.start);
      this.end = Paper.project.importJSON(params.map.end);
    } else {
      this.track = new Paper.Path();
      this.start = new Paper.Path();
      this.end = new Paper.Path();
    }
    this.track.fillColor = 'purple';
    this.start.fillColor = 'teal';
    this.end.fillColor = 'yellow';
    this.course = new Paper.Group(this.track, this.start, this.end);
    view.addCourse(this.course);

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
    if(this.track.isEmpty()){
      this.track = new Paper.Path.Circle(event.point, 40);
      this.track.fillColor = 'purple';
      this.course.addChild(this.track);
    }
    if(this.track.contains(event.point)) {
      this.isAdding = true;
    } else {
      this.isAdding = false;
    }
  }

  onDoubleClick(event) {
    if(!this.start.isEmpty() && this.start.contains(event.point)) {
      this.start.removeSegments();
    } else if(!this.end.isEmpty() && this.end.contains(event.point)) {
      this.end.removeSegments();
    } else if(this.start.isEmpty() && this.track.contains(event.point)) {
      this.start = new Paper.Path.Circle(event.point, 60).intersect(this.track);
      this.start.fillColor = 'teal';
      this.course.addChild(this.start);
    } else if(this.end.isEmpty() && this.track.contains(event.point)) {
      this.end = new Paper.Path.Circle(event.point, 60).intersect(this.track);
      this.end.fillColor = 'yellow';
      this.course.addChild(this.end);
    } else if(!this.start.isEmpty() && !this.end.isEmpty() && !this.track.contains(event.point)) {
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
    if(this.track.removeSegments){
      this.track.removeSegments();
    } else {
      this.track.children.forEach(c => c.removeSegments());
      this.track.removeChildren();
    };
    this.track = newTrack;
  }

  done(){
    var map = {
      track: this.track.toJSON(),
      start: this.start.toJSON(),
      end: this.end.toJSON()
    }

    view.setView(this.track.bounds);

    Paper.view.draw();
    setTimeout(() => this.mouseControls.remove());

    var dataURL = document.querySelector('canvas').toDataURL("image/png");

    this.course.remove();
    var key = this.key ? this.key : 'map-' + (new Date()).toISOString();
    var value = { dataURL, map, key };
    localStorage.setItem(key, JSON.stringify(value));
    this.onDone({ view: 'Menu' });
  }

  dispose(){
    this.course.remove();
  }
}
