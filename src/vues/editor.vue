<template>
    <svg-menu :small-menu="true" :small-buttons="true">
      <div class="text-medium editorMenuBottom" slot="menuBottom">
        <div>
          <span class="cursor-pointer">-</span>
          <span>Brushsize</span>
          <span class="cursor-pointer">+</span>
        </div>
        <div class="mapEditorSteps">
          <span class="cursor-pointer purple currentTool">Track</span>
          <span class="cursor-pointer green">Startzone</span>
          <span class="cursor-pointer yellow">Endzone</span>
          <span class="cursor-pointer">Save map</span>
        </div>
      </div>
    </svg-menu>
</template>

<script lang="babel">
  var Paper = require('paper');
  var view = require('./services/view.js');
  var audio = require('./services/audio.js');

  var isAdding = true;
  var brushsize = 40;

  var track = new Paper.Path();
  var start = new Paper.Path();
  var end = new Paper.Path();
  var tools = [
    {
      name: 'track',
      color: 'purple',
      path: track,
      element: document.querySelector('#createTrackButton'),
      init: newCircle => newCircle
    },
    {
      name: 'start',
      color: 'green',
      path: start,
      element: document.querySelector('#createStartButton'),
      init: newCircle => getTool('track').path.intersect(newCircle)
    },
    {
      name: 'end',
      color: 'yellow',
      path: end,
      element: document.querySelector('#createEndButton'),
      init: newCircle => getTool('track').path.intersect(newCircle)
    }
  ];
  var selectedTool = getTool('track');
  tools.forEach(tool => tool.path.fillColor = tool.color);

  var course = new Paper.Group(track, start, end);
  view.addCourse(course);

  var mouseControls = new Paper.Tool();
  mouseControls.onMouseDown = event => {
    audio.playClick();
    if(selectedTool.path.area < 50){
      removePath(selectedTool.path);
      var path = new Paper.Path.Circle(event.point, brushsize);
      path.fillColor = selectedTool.color;
      path.simplify();
      selectedTool.path = path;
      course.addChild(selectedTool.path);
    }
    isAdding = selectedTool.path.contains(event.point);
    setButtonStates();
  }
  mouseControls.onMouseDrag = event => {
    var editCircle = new Paper.Path.Circle(event.point, brushsize);

    var newPath = isAdding ? selectedTool.path.unite(editCircle) : selectedTool.path.subtract(editCircle);
    removePath(editCircle);
    removePath(selectedTool.path);
    newPath.fillColor = selectedTool.color;
    selectedTool.path = newPath;
    setButtonStates();
  };

  function getTool(name){
    return tools.filter(tool => tool.name === name)[0]
  }

  function removePath(path){
    path.remove();
    if(path.removeSegments){
      path.removeSegments();
    } else {
      path.children.forEach(c => c.removeSegments());
      path.removeChildren();
    };
  }

  function setButtonStates(){

  }

  export default {
    data() {
      return {
      }
    },
    components: {
      svgMenu: require('./svgMenu.vue')
    },
    methods: {
    }
  }
</script>

<style>
  .editorMenuBottom {
    padding-top: 2vh;
  }

  .editorMenuBottom > * + * {
    margin-top: 2vh;
  }

  .text-medium{
    font-size: 2vw;
  }

  .purple {
    color: purple;
  }

  .green {
    color: green;
  }

  .yellow {
    color: yellow;
  }

  .currentTool {
    text-decoration: underline;
  }
</style>
