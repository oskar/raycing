<template>
    <svg-menu :no-menu="true" :small-menu="false" :small-buttons="true"></svg-menu>
</template>

<script lang="babel">
  import * as view from './services/view';
  import * as storage from './services/storage';
  import * as animation from './services/animation';
  import * as audio from './services/audio';
  import Paper from 'paper';
  import Game from '../game/game';
  import Player from './player';
  import svgMenu from './svgMenu.vue'

  var course;
  var game;
  var controls;
  var controlAnimations;
  var players;
  var playerConfigs;
  var foreGround;
  var mouseControls;
  var mousewheelListener;
  var gestureendListener;

  function created() {
    var numberOfPlayers = parseInt(this.$route.params.playerCount);
    var jsonMap = storage.Get(this.$route.params.key).map;
    var track = Paper.project.importJSON(jsonMap.Track);
    var start = Paper.project.importJSON(jsonMap.Startzone);
    var end = Paper.project.importJSON(jsonMap.Endzone);

    track.fillColor = 'purple';
    start.fillColor = 'green';
    end.fillColor = 'yellow';

    course = new Paper.Group(track, start, end);
    view.addCourse(course);

    controls = new Paper.Group();
    controlAnimations = [];
    players = [];
    playerConfigs = [
      { name: 'Yellow', color: '#ffff00' },
      { name: 'Blue', color: '#0000ff' },
      { name: 'Red', color: '#ff0000' },
      { name: 'Green', color: '#00ff00' },
    ];

    foreGround = new Paper.Group([controls]);

    mouseControls = new Paper.Tool();
    mouseControls.onMouseDown = e => onMouseDown(e);
    mouseControls.activate();

    mousewheelListener = document.addEventListener('mousewheel', event => {
      if(event.wheelDelta === 0) return;
      mousewheel(event.wheelDelta < 0);
    });

    gestureendListener = document.addEventListener('gestureend', e => mousewheel(e.scale < 1), false);

    // start game
    game = new Game(track, start, end, numberOfPlayers);
    game.vectorsForControlsStream.onValue(controls => drawControls(controls));
    game.playerPositionStream.onValue(playerAndPosition => addPlayerPosition(playerAndPosition.playerIndex, playerAndPosition.position));
    game.gameEndedStream.onValue(endState => endGame(endState));

    for (var i = 0; i < numberOfPlayers; i++) {
      players.push(new Player(playerConfigs.pop()));
    }

    players.forEach(p => foreGround.appendBottom(p.elements));

    game.startGame();
  }

  function destroyed() {
    course.remove();
    foreGround.remove();
    mouseControls.remove();

    document.removeEventListener('gestureend', gestureendListener);
    document.removeEventListener('mosewheel', mousewheelListener);
  }

  function drawControls(positions) {
    clearControls();
    var circles = positions.map(position => createControl(position));
    controlAnimations = circles.map(circle => animation.add(elapsedTime => {
      circle.scale(1 + (Math.sin(elapsedTime * 10) / 100));
    }));
    circles.forEach(circle => controls.addChild(circle));

    setViewToControls();
  }

  function createControl(position) {
    var currentPlayer = players[game.currentPlayerIndex];
    var circle = currentPlayer.createPositionElement(position, currentPlayer.radius);
    circle.movePlayerData = position;
    circle.opacity = 0.5;
    return circle;
  }

  function clearControls() {
    controls.removeChildren();
    controlAnimations.forEach(animation => animation.remove());
  }

  function setViewToControls() {
    var bounds = controls.bounds;

    if(game.currentPlayer.position) {
      bounds = bounds.include(game.currentPlayer.position);
    }

    view.setView(bounds.expand(200));
  }

  function setViewToTrack() {
    view.setView(game.track.bounds);
  }

  function addPlayerPosition(playerIndex, position) {
    players[playerIndex].addPosition(position);
  }

  function endGame(endState) {
    clearControls();

    var text = '';
    if(endState.winningPlayerIndex < 0) {
      text = 'Everybody crashed, you all lost!';
    }
    else {
      var winner = 'Player ' + (endState.winningPlayerIndex + 1);
      text = 'Game over, ' + winner + ' won in ' + endState.moves + ' moves!';
    }

    // yeah..
    alert(text);
  }

  function onMouseDown(event) {
    audio.playClick();
    var item = event.getItem();
    if(!item){
      return;
    }
    var itemClicked = item.hitTest(event.point).item;
    if(itemClicked && itemClicked.movePlayerData){
      game.movePlayer(itemClicked.movePlayerData);
    }
  }

  function mousewheel(shouldZoomOut){
    if(shouldZoomOut) {
      setViewToTrack();
    } else {
      setViewToControls();
    }
  }

  export default {
    created,
    destroyed,
    data() {
      return {

      }
    },
    components: {
      svgMenu
    },
    methods: {

    }
  }
</script>
