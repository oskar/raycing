<template>
  <div class="freeMenuBottom" slot="menuBottom">
    <div>
      <div class="text-small">
        Number of players (1-{{maxPlayerCount}})
      </div>
      <div class="text-large">
        <span v-on:click="decrementPlayerCount" class="cursor-pointer">-</span>
        <span>{{playerCount}}</span>
        <span v-on:click="incrementPlayerCount" class="cursor-pointer">+</span>
      </div>
    </div>
    <div>
      <div
        v-for="map in maps"
        class="cursor-pointer text-medium"
        :class="{ 'selectedMap' : map === selectedMap }"
        v-on:click="selectMap(map)">
        {{map.key}}
      </div>
    </div>
    <div>
      <span v-on:click="editMap()" class="text-medium cursor-pointer">Edit map</span>
    </div>
    <div>
      <span v-on:click="deleteMap()" class="text-medium cursor-pointer">Delete map</span>
    </div>
    <div>
      <span v-on:click="playMap()" class="text-medium cursor-pointer">Play map</span>
    </div>
    <div>
      <span v-link="'/editor/size/s'" class="text-large cursor-pointer">Create small map</span>
    </div>
    <div>
      <span v-link="'/editor/size/l'" class="text-large cursor-pointer">Create large map</span>
    </div>
  </div>
</template>

<script lang="babel">
  import Paper from 'paper';
  import * as storage from './services/storage.js';
  import * as view from './services/view';

  export default {
    props: [ 'menu', 'smallButtons', 'showTitle' ],
    destroyed(){
      if(this.course) this.course.remove();
    },
    created(){
      view.reset();
      this.maps = storage.GetMaps();
      this.menu = 'big';
      this.smallButtons = false;
      this.showTitle = false;
    },
    data() {
      return {
        selectedMap: null,
        maxPlayerCount: 4,
        playerCount: 1,
        maps: []
      }
    },
    methods: {
      decrementPlayerCount(){
        this.playerCount = this.normalizePlayerCount(this.playerCount - 1);
      },
      incrementPlayerCount(){
        this.playerCount = this.normalizePlayerCount(this.playerCount + 1);
      },
      normalizePlayerCount(playerCount) {
        return Math.max(1, Math.min(playerCount, this.maxPlayerCount));
      },
      selectMap(map){
        this.selectedMap = map;
        if(this.course) this.course.remove();
        var track = Paper.project.importJSON(map.map.Track);
        var start = Paper.project.importJSON(map.map.Startzone);
        var end = Paper.project.importJSON(map.map.Endzone);
        this.course = new Paper.Group(track, start, end);

        view.addCourse(this.course);
        view.setView(track.bounds.expand(200));
      },
      editMap(){
        if(this.selectedMap) {
          this.$route.router.go('/editor/key/' + this.selectedMap.key);
        }
      },
      deleteMap(){
        if(this.selectedMap) {
          storage.RemoveMap(this.selectedMap);
          if(this.course) this.course.remove();
          this.maps = storage.GetMaps();
        }
      },
      playMap(){
        if(this.selectedMap) {
          this.$route.router.go('/play/' + this.selectedMap.key + '/' + this.playerCount);
        }
      }
    }
  }
</script>

<style>
  .cursor-pointer {
    cursor: pointer;
  }

  .text-small {
    font-size: 1vw;
  }

  .text-medium {
    font-size: 2vw;
  }

  .text-large {
    font-size: 3vw;
  }

  .freeMenuBottom {
    margin-top: 2vh;
  }

  .freeMenuBottom > * + * {
    margin-top: 2vh;
  }

  .nbrOfPlayers > * + * {
    margin-left: 4vw;
  }

  .selectedMap {
    text-decoration: underline;
  }
</style>
