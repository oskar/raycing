<template>
    <svg-menu :small-menu="true" :small-buttons="true">
      <div class="text-medium editorMenuBottom" slot="menuBottom">
        <div>
          <span class="cursor-pointer">-</span>
          <span>Brushsize</span>
          <span class="cursor-pointer">+</span>
        </div>
        <div class="mapEditorSteps">
          <span
            v-for="tool in model.tools" class="cursor-pointer"
            :class="{ 'currentTool' : tool === model.selectedTool }"
            :style="{ color: tool.color }"
            v-on:click="selectTool(tool)">{{tool.name}}</span>
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

  var tools = [
    { name: 'Track', color: 'purple', path: new Paper.Path() },
    { name: 'Startzone', color: 'green', path: new Paper.Path() },
    { name: 'Endzone', color: 'yellow', path: new Paper.Path() }
  ];

  var model = {
    selectedTool: getTool('Track'),
    tools
  };

  var course = new Paper.Group(...tools.map(t => t.path));
  view.addCourse(course);

  var mouseControls = new Paper.Tool();
  mouseControls.onMouseDown = event => {
    audio.playClick();
    if(model.selectedTool.path.area < 50){
      removePath(model.selectedTool.path);
      var path = new Paper.Path.Circle(event.point, brushsize);
      path.fillColor = model.selectedTool.color;
      path.simplify();
      model.selectedTool.path = path;
      course.addChild(model.selectedTool.path);
    }
    isAdding = model.selectedTool.path.contains(event.point);
  };

  mouseControls.onMouseDrag = event => {
    console.log(model.selectedTool, model.selectedTool.color);
    var editCircle = new Paper.Path.Circle(event.point, brushsize);

    var newPath = isAdding ? model.selectedTool.path.unite(editCircle) : model.selectedTool.path.subtract(editCircle);
    removePath(editCircle);
    removePath(model.selectedTool.path);
    newPath.fillColor = model.selectedTool.color;
    model.selectedTool.path = newPath;
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

  export default {
    data() {
      return { model }
    },
    components: {
      svgMenu: require('./svgMenu.vue')
    },
    methods: {
      selectTool(tool){
        this.model.selectedTool = tool;
      }
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

  .text-medium {
    font-size: 2vw;
  }

  .currentTool {
    text-decoration: underline;
  }

  .mapEditorSteps > * + * {
    margin-left: 1vw;
  }
</style>
