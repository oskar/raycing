<template>
  <div>
    <svg-menu :big-menu="true">
      <div class="freeMenuBottom" slot="menuBottom">
        <div class="text-small">
          Number of players (1-{{maxPlayerCount}})
        </div>
        <div class="text-large">
          <span v-on:click="decrementPlayerCount" class="cursor-pointer">-</span>
          <span>
            {{playerCount}}
          </span>
          <span v-on:click="incrementPlayerCount" class="cursor-pointer">+</span>
        </div>
        <span v-link="'/editor'" class="text-large cursor-pointer">Create new map</span>
      </div>
    </svg-menu>
  </div>
</template>

<script lang="babel">
  export default {
    data() {
      return {
        maxPlayerCount: 4,
        playerCount: 1
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
    margin-top: 2vh;
  }

  .nbrOfPlayers > * + * {
    margin-left: 4vw;
  }
</style>
