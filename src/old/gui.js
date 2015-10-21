var Paper = require('paper');
var css = require('./app.css');
var Player = require('./player');
var Game = require('../game');
var MapEditor = require('./mapEditor');
var changeCenter = require('./utils').changeCenter;
var changeZoom = require('./utils').changeZoom;

export default class Gui{
  constructor(canvas){
    this.width = document.body.clientWidth;
    this.height = document.body.clientHeight;
    this.viewBounds = new Paper.Rectangle(0, 0, 2000, 2000);
    this.maxZoom = this.width / this.viewBounds.width;
    this.initPaper();
    this.game;
    this.nbrOfPlayers = 2;
    this.players = [];
    this.colors = ['#ff0000', '#0000ff'];
    this.backGround = new Paper.Group();
    this.course = new Paper.Group();
    this.controls = new Paper.Group();
    this.foreGround = new Paper.Group([this.controls]);
    this.playerAddingControls;
    this.mouseControls;
    this.canvas;

    this.drawGrid();
    var mapEditor = new MapEditor();
    mapEditor.onDone(map => this.newGame(map));
  }

  get currentPlayer(){
    return this.players[this.game.currentPlayerIndex];
  }

  initPaper(){
    var body = document.body;
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('width', this.width);
    this.canvas.setAttribute('height', this.height);
    body.appendChild(this.canvas);
    Paper.setup(this.canvas);
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
  }

  addPlayerClickEvent(event){
    var x = Math.round(event.point.x / 20) * 20;
    var y = Math.round(event.point.y / 20) * 20;
    var point = new Paper.Point(x, y);
    if(this.game.start.contains(point)){
      this.game.addPlayer(point, new Paper.Point(0, 0));
      this.players.push(new Player(this.colors.pop(), point));
      if(this.players.length === this.nbrOfPlayers){
        this.startGame();
      }
    }
  }

  newGame(map){
    this.game = new Game(map);

    var track = this.game.track;
    track.closed = true;
    track.fillColor = 'grey';
    track.strokeColor = 'black';
    track.opacity = '0.7';
    this.course.addChild(track);

    var startArea = this.game.start;
    startArea.fillColor = 'green';
    startArea.strokeColor = 'black';
    startArea.opacity = '0.7';
    this.course.addChild(startArea);

    var endArea = this.game.end;
    endArea.fillColor = 'yellow';
    endArea.strokeColor = 'black';
    endArea.opacity = '0.7';
    this.course.addChild(endArea);
    this.playerAddingControls = new Paper.Tool();
    this.playerAddingControls.onMouseDown = e => this.addPlayerClickEvent(e);
  }

  startGame(){
    this.playerAddingControls.remove();
    this.players.forEach(p => this.foreGround.addChild(p.groups));
    this.mouseControls = new Paper.Tool();
    this.mouseControls.onMouseDown = e => this.onMouseDown(e);
    this.mouseControls.onMouseDrag = e => this.onMouseDrag(e);
    this.canvas.addEventListener('mousewheel', e => {
      e.preventDefault();
      this.mousewheel(e);
    });
    this.game.startGame();
    this.drawControls();
  }

  movePlayer(relativeVector){
    var guiPlayer = this.players[this.game.currentPlayerIndex];
    var player = this.game.movePlayer(relativeVector);
    if(player.isInEndZone){
      this.endGame(player);
    }
    guiPlayer.addPosition(player.position);
    this.nextTurn();
  }

  nextTurn(){
    this.game.nextTurn();
    this.controls.removeChildren();
    if(!this.game.currentPlayer.isAlive){
      this.nextTurn();
    }
    this.drawControls();
  }

  drawControls(){
    this.game.vectorsForControls
      .map(v => this.createControl(v))
      .forEach(control => this.controls.addChild(control));
  }

  createControl(controlObject){
    var circle = this.currentPlayer.createPositionElement(controlObject.absolute);
    circle.opacity = 0.5;
    circle.movePlayerData = controlObject.relative;
    return circle;
  }

  endGame(player){
    console.log(player);
  }

  drawGrid(){
    var grid = new Paper.Group();
    this.backGround.addChild(grid);
    for(var x = this.viewBounds.top; x < this.viewBounds.bottom; x += 20){
      var line = new Paper.Path.Line({
        segments: [[x, 0], [x, this.viewBounds.height]],
        strokeColor: 'lightblue',
        strokeWidth: 1
      });
      grid.addChild(line);
    }
    for(var y = this.viewBounds.left; y < this.viewBounds.right; y += 20){
      var line = new Paper.Path.Line({
        segments: [[0, y], [this.viewBounds.width, y]],
        strokeColor: 'lightblue',
        strokeWidth: 1
      });
      grid.addChild(line);
    }
  }
}
