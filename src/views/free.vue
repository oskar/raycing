<template>
  <div>
    <svg-menu :big-menu="true">
      <div slot="menuBottom">
        Success
      </div>
    </svg-menu>
  </div>
</template>

<script lang="babel">
  export default {
    components: {
      svgMenu: require('./svgMenu.vue')
    }
  }
</script>

<style>

</style>
