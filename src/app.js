var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);

var mainMenu = require('./views/mainMenu.vue');

var attachFastClick = require('fastclick');

window.addEventListener('load', () => {
  attachFastClick.attach(document.body);
}, false);

var App = Vue.extend({});

var router = new VueRouter();

router.map({
    '/': {
        component: mainMenu
    },
});

router.start(App, 'body');
