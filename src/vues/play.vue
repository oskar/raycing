<template>
    <svg-menu :small-menu="true" :small-buttons="true">
    </svg-menu>
</template>

<script lang="babel">
  import * as view from './services/view';
  import * as storage from './services/storage';
  import Paper from 'paper';
  import Game from '../game/game'

  var course;
  var game;

  function created() {
    var jsonMap = storage.Get(this.$route.params.key).map;
    var track = Paper.project.importJSON(jsonMap.Track);
    var start = Paper.project.importJSON(jsonMap.Startzone);
    var end = Paper.project.importJSON(jsonMap.Endzone);
    course = new Paper.Group(track, start, end);
    view.addCourse(course);

    // start game
    game = new Game(track, start, end, 1);
    // game.vectorsForControlsStream.onValue(controls => this.drawControls(controls));
    // game.playerPositionStream.onValue(playerAndPosition => this.addPlayerPosition(playerAndPosition.playerIndex, playerAndPosition.position));
    // game.gameEndedStream.onValue(endState => this.endGame(endState));
    // game.startGame();
  }

  function destroyed() {
    course.remove();
  }

  export default {
    created,
    destroyed,
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
