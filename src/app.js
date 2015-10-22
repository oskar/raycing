require('./views/view');
var Menu = require('./views/menu');
var MapEditor = require('./views/mapEditor');
var GameGui = require('./views/gameGui');

var currentView = new Menu(data => onDone(data));

function onDone(data){
  currentView.dispose();

  switch(data.view){
    case 'Create map':
      currentView = new MapEditor(data => onDone(data));
      break;
    case 'Game':
      currentView = new GameGui(data => onDone(data), data.params);
      break;
  }
}
