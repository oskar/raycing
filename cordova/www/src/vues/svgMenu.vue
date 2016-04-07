<template>
  <div>
    <div class="titleText" :class="{ 'show': showTitle }" :style="{ 'opacity': showTitle ? 1 : 0 }">Raycing</div>

    <div class="svgMenu menuBottom"
        :class="{
          'menuBottom-big': menu === 'big',
          'menuBottom-small': menu === 'small',
          'menuBottom-hidden': menu === 'none'
        }">
      <svg viewbox="0 0 400 400">
        <path class="menuElement" d="
          M0 800
          L0 200
          C0 10 10 0 200 0
          C390 0 400 10 400 200
          L400 800
          Z
          " />
      </svg>
      <slot name="menuBottom"></slot>
    </div>

    <div v-on:click="back" :class="{ 'menuClickZone-enabled': backIsEnabled(), 'menuClickZone-small': smallButtons }" class="svgMenu menuClickZone menuClickZone-topLeft">
      <svg viewbox="0 0 400 400">
        <path class="menuElement" d="
          M0 0
          L300 0
          C320 0 320 50 250 75
          C180 100 140 140 140 140
          C100 180 100 180 75 250
          C50 320 0 320 0 300 Z
          " />
      </svg>
      <svg class="icon icon-top" viewbox="0 0 200 300">
        <path d="
                 M60 0
                 l-60 150 l60 150 h20
                 l-60 -150 l60 -150 h-20
                 m60 0
                 l-60 150 l40 100 h20
                 l-40 -100 l60 -150 h-20
                 m60 0
                 l-60 150 l20 50 h20
                 l-20 -50 l60 -150 h-20
                 "/>
      </svg>
    </div>

    <div v-link="{ path: '/settings' }" :class="{ 'menuClickZone-small': smallButtons }" class="svgMenu menuClickZone menuClickZone-topRight menuClickZone-enabled" style="transform: rotate(0.25turn) translate(0, -100%);">
      <svg viewbox="0 0 400 400">
        <path class="menuElement" d="
          M0 0
          L300 0
          C320 0 320 50 250 75
          C180 100 140 140 140 140
          C100 180 100 180 75 250
          C50 320 0 320 0 300 Z
          " />
      </svg>

      <svg class="icon icon-top" viewbox="0 0 44 44">
        <path d="M44,24.707v-5.5l-6.574-2.738c-0.184-0.516-0.377-1.015-0.613-1.505l2.656-6.606l-3.891-3.889l-6.549,2.696   c-0.498-0.242-1.008-0.445-1.535-0.634L24.707,0h-5.5l-2.718,6.509c-0.548,0.194-1.075,0.397-1.595,0.646L8.357,4.528L4.469,8.416   l2.665,6.478c-0.259,0.532-0.467,1.074-0.667,1.633L0,19.293v5.5l6.472,2.697c0.199,0.559,0.413,1.1,0.67,1.633l-2.615,6.52   l3.888,3.889l6.494-2.676c0.522,0.248,1.054,0.447,1.601,0.635L19.293,44h5.5l2.721-6.543c0.523-0.193,1.039-0.396,1.533-0.633   l6.596,2.643l3.889-3.889l-2.709-6.562c0.232-0.494,0.418-0.994,0.602-1.504L44,24.707z M21.957,31.583   c-5.289,0-9.582-4.292-9.582-9.583s4.293-9.583,9.582-9.583c5.292,0,9.583,4.293,9.583,9.583S27.248,31.583,21.957,31.583z"/>
      </svg>
    </div>
  </div>
</template>

<script lang="babel">
  export default {
    props: [ 'menu', 'smallButtons', 'showTitle'],
    methods: {
      backIsEnabled() {
        return this.$route.path !== '/'
      },
      back() {
        if(this.backIsEnabled()) {
          history.back();
        }
      }
    }
  }
</script>

<style lang="less">
  @import 'services/color';

  .titleText {
    position: absolute;
    top: 30%;
    width: 100%;
    text-align: center;
    font-size: 10vh;
    transition: opacity 2s;
    visibility: hidden;
  }

  .titleText.show {
    visibility: visible;
  }

  .menuClickZone {
    position: absolute;
    width: 30vw;
    transition: transform 0.5s;
    transform-origin: top left;
  }

  .menuClickZone-topLeft{
    top: -10px;
    left: -10px;
  }

  .menuClickZone-topLeft.menuClickZone-small {
    transform: scale(0.5);
  }

  .menuClickZone-topRight{
    top: -10px;
    right: -10px;
  }

  /*
   * This has to be "!important" to override the style declaration on the menuClickZone-topRight
   * element. That in turn has to be there in order for the rotation of the element not to be
   * animated on page load.
  **/
  .menuClickZone-topRight.menuClickZone-small {
    transform: rotate(0.25turn) translate(0, -100%) scale(0.5)!important;
  }

  .menuClickZone .icon {
    opacity: 0.1;
    color: @iconColor;
  }

  .menuClickZone-enabled .icon{
    opacity: 1;
  }

  .menuClickZone-enabled .icon:hover{
    cursor: pointer;
    color: @iconHoverColor;
  }

  .menuBottom {
    position: absolute;
    top: 75vh;
    width: 100%;
    text-align: center;
    color: @menuTextColor;
    transition: transform 0.5s;
  }

  .menuBottom-hidden {
    transform: translate(0, 25vh);
  }

  .menuBottom-small {
    transform: translate(0, 10vh);
  }

  .menuBottom-big {
    transform: translate(0, -55vh);
  }

  .menuBottom > * {
    position: absolute;
    top: 0;
    left: 25%;
    width: 50%;
  }

  .menuElement{
    position: absolute;
    fill: @menuFill;
    stroke: @menuStroke;
    stroke-width: 2;
    vector-effect: non-scaling-stroke;
  }

  .icon path{
    vector-effect: non-scaling-stroke;
    fill: currentColor;
  }

  .icon-top{
    position: absolute;
    left: 10%;
    top: 10%;
    width: 20%;
  }

  .svgMenu {
    pointer-events: none;
  }

  .svgMenu > * {
    pointer-events: auto;
  }
</style>
