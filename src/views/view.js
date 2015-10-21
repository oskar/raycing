var Paper = require('paper');

var canvas = document.createElement('canvas');
var width = document.body.clientWidth;
var height = document.body.clientHeight;

var viewBounds = new Paper.Rectangle(0, 0, height, width);

initPaper(canvas, width, height);

var background = new Paper.Group();
background.addChild(createGrid(viewBounds));

Paper.view.draw();

function initPaper(canvas, width, height){
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  document.body.appendChild(canvas);
  Paper.setup(canvas);
}

function createGrid(viewBounds){
  var grid = new Paper.Group();
  background.addChild(grid);
  for(var x = viewBounds.top; x < viewBounds.bottom; x += 20){
    var line = new Paper.Path.Line({
      segments: [[x, 0], [x, viewBounds.width]],
      strokeColor: 'lightblue',
      strokeWidth: 1
    });
    grid.addChild(line);
  }
  for(var y = viewBounds.left; y < viewBounds.right; y += 20){
    var line = new Paper.Path.Line({
      segments: [[0, y], [viewBounds.height, y]],
      strokeColor: 'lightblue',
      strokeWidth: 1
    });
    grid.addChild(line);
  }

  return grid;
}
