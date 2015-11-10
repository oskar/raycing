require('./app.css');

var audio = require('./audio');
var view = require('./views/view');
var Menu = require('./views/menu');
var MapEditor = require('./views/mapEditor');
var GameGui = require('./views/gameGui');
var attachFastClick = require('fastclick');

var currentView = new Menu(data => onDone(data));

function onDone(data){
  view.reset();
  currentView.dispose();

  switch(data.view){
    case 'Create map':
      currentView = new MapEditor(data => onDone(data), data.params);
      break;
    case 'Game':
      currentView = new GameGui(data => onDone(data), data.params);
      break;
    default:
      currentView = new Menu(data => onDone(data), data.params);
      break;
  }
}

window.addEventListener('load', () => {
  attachFastClick.attach(document.body);
}, false);
