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
    Paper.view.center = zoomAndOffset.newCenter;
    this.limitView();
    this.render();
  }

  limitView(){
    var newCenter = Paper.view.center.clone();
    if(Paper.view.bounds.left < this.viewBounds.left) newCenter.x = this.viewBounds.left + Paper.view.bounds.width / 2;
    if(Paper.view.bounds.right > this.viewBounds.right) newCenter.x = this.viewBounds.right - Paper.view.bounds.width / 2;
    if(Paper.view.bounds.top < this.viewBounds.top) newCenter.y = this.viewBounds.top + Paper.view.bounds.height / 2;
    if(Paper.view.bounds.bottom > this.viewBounds.bottom) newCenter.y = this.viewBounds.bottom - Paper.view.bounds.height / 2;
    Paper.view.center = newCenter;
    console.log({left:Paper.view.bounds.left, top:Paper.view.bounds.top, right:Paper.view.bounds.right, bottom:Paper.view.bounds.bottom});
  }

  newGame(){
    this.game = new Game();

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
    this.drawControls(this.game.vectorsForControls);
  }

  drawControls(vectors){
    this.controls.removeChildren();
    vectors
      .map(v => this.createControl(v))
      .forEach(control => this.controls.addChild(control));
  }

  createControl(victor){
    var circle = new Paper.Path.Circle({
      center: victorToPoint(victor.absolute).multiply(this.scale),
      fillColor: '#00ff00',
      strokeColor: 'black',
      strokeWidth: 2,
      opacity: 0.5,
      radius: this.scale/2,
      movePlayerData: victor.relative
    });
    return circle;
  }

  drawGrid(){
    var grid = new Paper.Group();
    this.backGround.addChild(grid);
    for(var x = this.viewBounds.top; x < this.viewBounds.bottom; x += this.scale){
      console.log(x);
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
