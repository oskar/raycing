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
  export default {
    data() {
      return {
        tools: [
          {
            name: 'track',
            color: 'purple',
            path: this.track,
            element: document.querySelector('#createTrackButton'),
            init: newCircle => newCircle
          },
          {
            name: 'start',
            color: 'green',
            path: this.start,
            element: document.querySelector('#createStartButton'),
            init: newCircle => this.getTool('track').path.intersect(newCircle)
          },
          {
            name: 'end',
            color: 'yellow',
            path: this.end,
            element: document.querySelector('#createEndButton'),
            init: newCircle => this.getTool('track').path.intersect(newCircle)
          }
        ]
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
