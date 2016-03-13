<template>
  <div>
    <div class="settingsMenuBottom text-medium" slot="menuBottom">
      <div>
        <span v-on:click="toggleIsMuted" :class="{ 'selected': model.isMuted }" class="mainMenuButton mainMenuButton-mute">
          <svg class="icon" viewbox="0 0 250 225">
            <path d="M10 85 v50 l10 5 l50 25 l50 50 l5 -5 v-200 l-5 -5 l-50 50 l-50 25 -10 5"/>
            <path class="soundOn" d="M140 92.5 a10 10 0 1 1 0 40 v10 a10 10 0 1 0 0 -60 v10 m0 -30 a10 10 0 1 1 0 100 v10 a10 10 0 1 0 0 -120 v10 "/>
            <path class="soundOff" d=" M180 112.5 l-40 50 l10 10 l40 -50 l40 50 l10 -10 l-40 -50 l40 -50 l-10 -10 l-40 50 l-40 -50 l-10 10 l40 50 "/>
          </svg>
          <span>Sounds</span>
        </span>
      </div>
      <div>
        <span v-on:click="toggleStarsVisibility" :class="{ 'selected': model.starsVisibility }" class="mainMenuButton">Stars</span>
      </div>
    </div>
  </div>
</template>

<script lang="babel">
  import * as storage from './services/storage';
  import * as audio from './services/audio';
  import * as view from './services/view';
  import svgMenu from './svgMenu.vue';

  var model = {
    isMuted: false,
    starsVisibility: false
  };

  export default {
    props: [ 'menu', 'smallButtons', 'showTitle' ],
    created() {
      model.isMuted = storage.GetIsMuted();
      model.starsVisibility = storage.GetEnableStars();
      this.menu = 'small';
      this.smallButtons = false;
      this.showTitle = true;
    },
    data() {
      return { model }
    },
    components: {
      svgMenu
    },
    methods: {
      toggleIsMuted(){
        this.model.isMuted = audio.ToggleIsMuted();
      },
      toggleStarsVisibility() {
        this.model.starsVisibility = view.toggleStarsVisibility();
      }
    }
  }
</script>

<style>
  .settingsMenuBottom {
    padding-top: 2vh;
    display: flex;
    justify-content: center;
  }

  .settingsMenuBottom > * + * {
    margin-left: 4vw;
  }

  .mainMenuButton-mute .soundOff {
    display: none;
  }

  .mainMenuButton-mute.selected .soundOff {
    display: initial;
  }

  .mainMenuButton-mute.selected .soundOn {
    display: none;
  }
</style>
