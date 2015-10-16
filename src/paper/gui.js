var Paper = require('paper');
var Victor = require('victor');
var css = require('./app.css');
var Player = require('./player');
var Game = require('../game');
var victorToPoint = require('./utils').victorToPoint;
var changeCenter = require('./utils').changeCenter;
var changeZoom = require('./utils').changeZoom;

export default class Gui{
  constructor(canvas){
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
    this.scale = 20;
    this.viewBounds = new Paper.Rectangle(0, 0, 2000, 2000);
    this.maxZoom = this.width / this.viewBounds.width;
    this.initPaper();
    this.game;
    this.players;
    this.players = [];
    this.backGround = new Paper.Group();
    this.controls = new Paper.Group();
    this.course = new Paper.Group();
    this.foreGround = new Paper.Group([this.controls]);

    var tool = new Paper.Tool();
    tool.onMouseDown = e => this.onMouseDown(e);
    tool.onMouseDrag = e => this.onMouseDrag(e);

    this.drawGrid();
    this.newGame();
  }

  get scaleVector(){
    return new Victor(this.scale, this.scale);
  }

  get currentPlayer(){
    return this.players[this.game.currentPlayerIndex];
  }

  initPaper(){
    var body = document.body;
    var canvas = document.createElement('canvas');
    canvas.setAttribute('width', this.width);
    canvas.setAttribute('height', this.height);
    body.appendChild(canvas);
    canvas.addEventListener('mousewheel', e => {
      e.preventDefault();
      this.mousewheel(e);
    });

    Paper.setup(canvas);
  }

  onMouseDown(event){
    var item = event.getItem();
    if(!item){
      return;
    }
    var itemClicked = item.hitTest(event.point).item;
    if(itemClicked && itemClicked.movePlayerData){
      this.movePlayer(itemClicked.movePlayerData);
    }
  }

  onMouseDrag(event){
    var offset = changeCenter(Paper.view.center, event.delta, 0.6);
    Paper.view.scrollBy(offset);
    this.limitView();
  }

  mousewheel(e){
    var mousePosition = new Paper.Point(e.offsetX, e.offsetY);
    var viewPosition = Paper.view.viewToProject(mousePosition);
    var zoomAndOffset = changeZoom(Paper.view.zoom, e.deltaY, Paper.view.center, viewPosition);
    Paper.view.zoom = Math.max(zoomAndOffset.newZoom, this.maxZoom);
    Paper.view.center = Paper.view.center.add(zoomAndOffset.offset);
    this.limitView();
  }

  limitView(){
    var newCenter = Paper.view.center.clone();
    if(Paper.view.bounds.left < this.viewBounds.left) newCenter.x = this.viewBounds.left + Paper.view.bounds.width / 2;
    if(Paper.view.bounds.right > this.viewBounds.right) newCenter.x = this.viewBounds.right - Paper.view.bounds.width / 2;
    if(Paper.view.bounds.top < this.viewBounds.top) newCenter.y = this.viewBounds.top + Paper.view.bounds.height / 2;
    if(Paper.view.bounds.bottom > this.viewBounds.bottom) newCenter.y = this.viewBounds.bottom - Paper.view.bounds.height / 2;
    Paper.view.center = newCenter;
    this.render();
  }

  newGame(){
    this.game = new Game();

    var track = new Paper.Path(this.game.track);
    track.closed = true;
    track.fillColor = 'grey';
    track.strokeColor = 'black';
    track.opacity = '0.7';
    this.course.addChild(track);

    var startArea = new Paper.Path.Rectangle(this.game.start);
    startArea.fillColor = 'green';
    startArea.strokeColor = 'black';
    startArea.opacity = '0.7';
    this.course.addChild(startArea);

    var endArea = new Paper.Path.Rectangle(this.game.end);
    endArea.fillColor = 'yellow';
    endArea.strokeColor = 'black';
    endArea.opacity = '0.7';
    this.course.addChild(endArea);

    var colors = ['#ff0000', '#0000ff'];
    this.players = this.game.players.map(player => new Player(colors.pop(), victorToPoint(player.position).multiply(this.scale)));
    this.players.forEach(p => this.foreGround.addChild(p.groups));
    this.nextTurn();
    this.render();
  }

  movePlayer(relativeVector){
    var guiPlayer = this.players[this.game.currentPlayerIndex];
    var player = this.game.movePlayer(relativeVector);
    if(player.isInEndZone){
      this.endGame();
    }
    guiPlayer.addPosition(victorToPoint(player.position).multiply(this.scale));
    this.nextTurn();
    this.render();
  }

  nextTurn(){
    this.controls.removeChildren();
    this.game.vectorsForControls
      .map(v => this.createControl(v))
      .forEach(control => this.controls.addChild(control));
  }

  createControl(victor){
    var circle = this.currentPlayer.createPositionElement(victorToPoint(victor.absolute).multiply(this.scale));
    circle.opacity = 0.5;
    circle.movePlayerData = victor.relative;
    return circle;
  }

  drawGrid(){
    var grid = new Paper.Group();
    this.backGround.addChild(grid);
    for(var x = this.viewBounds.top; x < this.viewBounds.bottom; x += this.scale){
      var line = new Paper.Path.Line({
        segments: [[x, 0], [x, this.viewBounds.height]],
        strokeColor: 'lightblue',
        strokeWidth: 1
      });
      grid.addChild(line);
    }
    for(var y = this.viewBounds.left; y < this.viewBounds.right; y += this.scale){
      var line = new Paper.Path.Line({
        segments: [[0, y], [this.viewBounds.width, y]],
        strokeColor: 'lightblue',
        strokeWidth: 1
      });
      grid.addChild(line);
    }
  }

  render(){
    Paper.view.draw();
  }
}
