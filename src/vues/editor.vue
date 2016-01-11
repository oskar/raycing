<template>
    <svg-menu :menu="'small'" :small-buttons="true">
      <div class="text-medium editorMenuBottom" slot="menuBottom">
        <div>
          <span v-on:click="changeBrushSize(-1)" class="cursor-pointer">-</span>
          <span>Brushsize ({{model.brushSize}})</span>
          <span v-on:click="changeBrushSize(1)" class="cursor-pointer">+</span>
        </div>
        <div class="mapEditorSteps">
          <span
            v-for="tool in model.tools" class="cursor-pointer"
            :class="{ 'currentTool' : tool === model.selectedTool }"
            :style="{ color: tool.color }"
            v-on:click="selectTool(tool)">{{tool.name}}</span>
          <span v-on:click="done()" class="cursor-pointer">Save map</span>
        </div>
      </div>
    </svg-menu>
</template>

<script lang="babel">
  import Paper from 'paper';
  import * as view from './services/view';
  import * as audio from './services/audio';
  import * as storage from './services/storage';

  var isAdding;
  var brushSize;
  var course;

  var tools = [
    { name: 'Track', color: 'purple', path: null },
    { name: 'Startzone', color: 'green', path: null },
    { name: 'Endzone', color: 'yellow', path: null }
  ];

  var model = {
    selectedTool: getTool('Track'),
    tools,
    brushSize
  };

  var mouseControls;

  function created(){
    isAdding = true;
    model.brushSize = 40;
    model.selectedTool = getTool('Track');

    this.size = '';
    if(this.$route.params.key){
      var map = storage.Get(this.$route.params.key);
      tools.forEach(t => t.path = Paper.project.importJSON(map.map[t.name]));
      this.size = map.size;
    } else {
      this.size = this.$route.params.size;
      tools.forEach(t => t.path = new Paper.Path());
    }

    if(this.size === 's'){
      view.reset();
    } else {
      view.setViewToOuterBounds();
    }

    console.log(this.size);

    course = new Paper.Group(...tools.map(t => t.path));
    view.addCourse(course);

    mouseControls = new Paper.Tool();
    mouseControls.onMouseDown = event => {
      audio.playClick();
      if(model.selectedTool.path.area < 50){
        removePath(model.selectedTool.path);
        var path = new Paper.Path.Circle(event.point, model.brushSize);
        path.fillColor = model.selectedTool.color;
        path.simplify();
        model.selectedTool.path = path;
        course.addChild(model.selectedTool.path);
      }
      isAdding = model.selectedTool.path.contains(event.point);
    };

    mouseControls.onMouseDrag = event => {
      var editCircle = new Paper.Path.Circle(event.point, model.brushSize);

      var newPath = isAdding ? model.selectedTool.path.unite(editCircle) : model.selectedTool.path.subtract(editCircle);
      removePath(editCircle);
      removePath(model.selectedTool.path);
      newPath.fillColor = model.selectedTool.color;
      model.selectedTool.path = newPath;
    };
  }

  function destroyed(){
    course.remove();
    mouseControls.remove();
  }

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

  function selectTool(tool){
    model.selectedTool = tool;
  }

  function changeBrushSize(direction){
    var brushInterval = 10;
    var delta = brushInterval * direction;
    this.model.brushSize = Math.min(Math.max(10, this.model.brushSize + delta), 70);
  }

  function done(){
    var track = getTool('Track');
    tools
      .filter(tool => tool.name != 'Track')
      .forEach(tool => {
        var newPath = track.path.unite(tool.path);
        track.path.remove();
        track.path = newPath;
      });
    var map = {};
    tools.forEach(tool => map[tool.name] = tool.path.toJSON());

    var key = this.$route.params.key ? this.$route.params.key : 'map-' + (new Date()).toISOString();
    storage.AddMap({ map, key, size: this.size });

    destroyed();

    history.back();
  }

  export default {
    created,
    destroyed,
    data() {
      return { model }
    },
    components: {
      svgMenu: require('./svgMenu.vue')
    },
    methods: { selectTool, changeBrushSize, done }
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
