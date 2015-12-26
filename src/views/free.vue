<template>
  <div>
    <svg-menu :big-menu="true">
      <div class="freeMenuBottom" slot="menuBottom">
        <div>
          Number of players
        </div>
        <div class="nbrOfPlayers">
          <span v-on:click="decrementPlayerCount" class="freeButton">-</span>
          <span>
            {{playerCount}}
          </span>
            <span v-on:click="incrementPlayerCount" class="freeButton">+</span>
        </div>
      </div>
    </svg-menu>
  </div>
</template>

<script lang="babel">
  function normalizePlayerCount(playerCount) {
    var maxPlayerCount = 4;
    return Math.max(1, Math.min(playerCount, maxPlayerCount));
  }
  export default {
    data() {
      return {
        playerCount: 1
      }
    },
    components: {
      svgMenu: require('./svgMenu.vue')
    },
    methods: {
      decrementPlayerCount(){
        this.playerCount = normalizePlayerCount(this.playerCount - 1);
      },
      incrementPlayerCount(){
        this.playerCount = normalizePlayerCount(this.playerCount + 1);
      }
    }
  }
</script>

<style>
  .freeMenuBottom {
    margin-top: 2vh;
  }

  .nbrOfPlayers {
    font-size: 4vw;
  }

  .nbrOfPlayers > * + * {
    margin-left: 4vw;
  }

  .freeButton {
      cursor: pointer;
  }
</style>
