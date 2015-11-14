require('./app.css');

var view = require('./views/view');
var Menu = require('./views/menu/menu');
var MapEditor = require('./views/mapEditor/mapEditor');
var GameGui = require('./views/gameGui/gameGui');
var attachFastClick = require('fastclick');

var currentView = new Menu(data => onDone(data));

function onDone(data){
  view.reset();
  currentView.dispose();

  setTimeout(() => {
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
  });
}

window.addEventListener('load', () => {
  attachFastClick.attach(document.body);
}, false);
