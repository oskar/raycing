require('./app.css');

var view = require('./views/view');
var MainMenu = require('./views/mainMenu/mainMenu');
var FreeplayMenu = require('./views/freeplayMenu/freeplayMenu');
var PuzzleMenu = require('./views/puzzleMenu/puzzleMenu');
var MapEditor = require('./views/mapEditor/mapEditor');
var GameGui = require('./views/gameGui/gameGui');
var attachFastClick = require('fastclick');

var currentView = new MainMenu(data => onDone(data));

function onDone(data){
  currentView.dispose();
  view.reset();

  switch(data.view){
    case 'Main menu':
      currentView = new MainMenu(data => onDone(data), data.params);
      break;
    case 'Puzzle menu':
      currentView = new PuzzleMenu(data => onDone(data), data.params);
      break;
    case 'Freeplay menu':
      currentView = new FreeplayMenu(data => onDone(data), data.params);
      break;
    case 'Create map':
      currentView = new MapEditor(data => onDone(data), data.params);
      break;
    case 'Game':
      currentView = new GameGui(data => onDone(data), data.params);
      break;
    default:
      currentView = new FreeplayMenu(data => onDone(data), data.params);
      break;
  }
}

window.addEventListener('load', () => {
  attachFastClick.attach(document.body);
}, false);
