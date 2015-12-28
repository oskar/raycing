<template>
  <div>
    <svg-menu :big-menu="true">
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
            class="cursor-pointer"
            v-on:click="selectMap(map.map)">
            {{$index + 1}}
            X
          </div>
        </div>
        <div>
          <span v-link="'/editor'" class="text-large cursor-pointer">Create new map</span>
        </div>
      </div>
    </svg-menu>
  </div>
</template>

<script lang="babel">
  var Paper = require('paper');
  var storage = require('./services/storage.js');
  var view = require('./services/view.js');
  export default {
    destroyed(){
      if(this.course) this.course.remove();
    },
    created(){
      this.maps = storage.GetMaps();
    },
    data() {
      return {
        selectedMap: null,
        maxPlayerCount: 4,
        playerCount: 1,
        maps: []
      }
    },
    components: {
      svgMenu: require('./svgMenu.vue')
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
        var track = Paper.project.importJSON(map.Track);
        var start = Paper.project.importJSON(map.Startzone);
        var end = Paper.project.importJSON(map.Endzone);
        this.course = new Paper.Group(track, start, end);

        view.addCourse(this.course);
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

  .text-large {
    font-size: 3vw;
  }

  .freeMenuBottom {
    padding-top: 2vh;
  }

  .freeMenuBottom > * + * {
    margin-top: 2vh;
  }

  .nbrOfPlayers > * + * {
    margin-left: 4vw;
  }
</style>
