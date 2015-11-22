require('./mapEditor.css')
var Paper = require('paper');
var view = require('../view');
var animation = require('../animation');
var audio = require('../../audio');
var ClickListenerHandler = require('../clickListenerHandler');
var storage = require('../../storage');

export default class MapEditor{
  constructor(onDone, params){
    this.onDone = onDone;

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
    this.tools = [
      {
        name: 'track',
        color: 'purple',
        path: this.track,
        element: document.querySelector('#createTrackButton'),
        init: newCircle => newCircle
      },
      {
        name: 'start',
        color: 'teal',
        path: this.start,
        element: document.querySelector('#createStartButton'),
        init: newCircle => this.getTool('track').path.intersect(newCircle)
      },
      {
        name: 'end',
        color: 'yellow',
        path: this.end,
        element: document.querySelector('#createEndButton'),
        init: newCircle => this.getTool('track').path.intersect(newCircle)
      }
    ];
    this.tools.forEach(tool => tool.path.fillColor = tool.color);

    this.course = new Paper.Group(this.track, this.start, this.end);
    view.addCourse(this.course);

    this.clickListenerHandler = new ClickListenerHandler();
    this.tools.forEach(tool =>
      this.clickListenerHandler.add(tool.element, () => this.selectedTool = tool.name));

    this.mapEditor = document.querySelector('#mapEditor');
    this.mapEditor.style.visibility = 'visible';

    this.mouseControls = new Paper.Tool();
    this.mouseControls.onMouseDown = e => {
      audio.playClick();
      this.onMouseDown(e);
    }
    this.mouseControls.onMouseDrag = e => this.onMouseDrag(e);

    this.saveMapButton = document.querySelector('#saveMapButton');
    this.saveMapButton.classList.add('disabled');
    this.clickListenerHandler.add(this.saveMapButton, () => this.done());
    this.exitMapEditorButton = document.querySelector('#exitMapEditorButton');
    this.clickListenerHandler.add(this.exitMapEditorButton, () => this.onDone({ view: 'Menu' }));

    this.brushButtons = ['#brushSize1', '#brushSize2', '#brushSize3']
      .map(buttonSelector => document.querySelector(buttonSelector));
    this.brushButtons
      .forEach((element, i) => this.clickListenerHandler.add(element, () => this.brushsize = i + 1));

    this.brushsize = 2;
    this.selectedTool = 'track';
  }

  get selectedTool(){
    return this.selectedTool_;
  }

  set selectedTool(value){
    this.selectedTool_ = value;
    this.setButtonStates();
  }

  get brushsize(){
    return this.brushsize_ * 20;
  }

  set brushsize(value){
    this.brushsize_ = value;
    this.brushButtons.forEach(element => element.classList.remove('selected'));
    this.brushButtons[value - 1].classList.add('selected');
  }

  getTool(name){
    return this.tools.filter(tool => tool.name === name)[0]
  }

  setButtonStates() {
    if(!this.getTool('track').path.isEmpty()) {
      this.getTool('start').element.classList.remove("disabled");
      this.getTool('end').element.classList.remove("disabled");
    }

    if(this.tools.filter(tool => tool.path.isEmpty()).length === 0) {
      this.saveMapButton.classList.remove('disabled');
    }

    this.tools.forEach(tool => tool.element.classList.remove("selected"));
    this.getTool(this.selectedTool).element.classList.add("selected");
  }

  onMouseDown(event) {
    var tool = this.getTool(this.selectedTool);
    if(tool.path.isEmpty()){
      var path = new Paper.Path.Circle(event.point, this.brushsize);
      tool.path = path;
      tool.path.fillColor = tool.color;
      tool.path.simplify();
      this.course.addChild(tool.path);
    }
    this.isAdding = tool.path.contains(event.point);
    this.setButtonStates();
  }

  onMouseDrag(event) {
    var editCircle = new Paper.Path.Circle(event.point, this.brushsize);
    var tool = this.getTool(this.selectedTool);

    var newPath = this.isAdding ? tool.path.unite(editCircle) : tool.path.subtract(editCircle);
    this.removePath(editCircle);
    this.removePath(tool.path);
    tool.path = newPath;
    tool.path.fillColor = tool.color;
    this.setButtonStates();
  }

  removePath(path){
    path.remove();
    if(path.removeSegments){
      path.removeSegments();
    } else {
      path.children.forEach(c => c.removeSegments());
      path.removeChildren();
    };
  }

  done(){
    var track = this.getTool('track');
    this.tools
      .filter(tool => tool.name != 'track')
      .forEach(tool => {
        var newPath = track.path.unite(tool.path);
        track.path.remove();
        track.path = newPath;
      });
    var map = {};
    this.tools.forEach(tool => map[tool.name] = tool.path.toJSON());

    var dataURL = document.querySelector('canvas').toDataURL("image/png");
    var key = this.key ? this.key : 'map-' + (new Date()).toISOString();
    storage.AddMap({ dataURL, map, key });
    this.onDone({ view: 'Menu' });
  }

  dispose(){
    this.course.remove();
    document.removeEventListener('gestureend', this.gestureendListener);
    document.removeEventListener('mosewheel', this.mousewheelListener);
    this.mouseControls.remove();
    this.clickListenerHandler.dispose();
    this.mapEditor.style.visibility = '';
  }
}
