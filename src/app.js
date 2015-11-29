require('./app.css');

var view = require('./views/view');
var attachFastClick = require('fastclick');

var FreeplayMenu = require('./views/freeplayMenu/freeplayMenu');
var GameGui = require('./views/gameGui/gameGui');
var MainMenu = require('./views/mainMenu/mainMenu');
var MapEditor = require('./views/mapEditor/mapEditor');
var PuzzleMenu = require('./views/puzzleMenu/puzzleMenu');
var SettingsMenu = require('./views/settingsMenu/settingsMenu');

[].forEach.call(document.querySelectorAll('.menuClickZone-topRight svg'),
  svg => svg.addEventListener('click', () => onDone({ view: 'Settings' })));

  [].forEach.call(document.querySelectorAll('.menuClickZone-topLeft svg'),
    svg => svg.addEventListener('click', () => goBack()));

var currentView = new MainMenu(data => onDone(data));
var visitedViews = [currentView];

function onDone(data){
  visitedViews.push(currentView);
  currentView.dispose();
  view.reset();

  switch(data.view){
    case 'Freeplay menu':
      currentView = new FreeplayMenu(data => onDone(data), data.params);
      break;
    case 'Game':
      currentView = new GameGui(data => onDone(data), data.params);
      break;
    case 'Main menu':
      currentView = new MainMenu(data => onDone(data), data.params);
      visitedViews = [currentView];
      break;
    case 'Create map':
      currentView = new MapEditor(data => onDone(data), data.params);
      break;
    case 'Puzzle menu':
      currentView = new PuzzleMenu(data => onDone(data), data.params);
      break;
    case 'Settings':
      currentView = new SettingsMenu(data => onDone(data), data.params);
      break;
    default:
      currentView = new MainMenu(data => onDone(data), data.params);
      break;
  }
}

function goBack(){
  currentView.dispose();
  view.reset();
  currentView = visitedViews.pop();
  currentView.show();
}

window.addEventListener('load', () => {
  attachFastClick.attach(document.body);
}, false);
