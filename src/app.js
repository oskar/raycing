var Vue = require('vue');

var mainMenu = require('./views/mainMenu.vue');

var attachFastClick = require('fastclick');

new Vue({
  el: 'body',
  components: {
    mainMenu
  }
});

window.addEventListener('load', () => {
  attachFastClick.attach(document.body);
}, false);
