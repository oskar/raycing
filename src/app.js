require('./app.css');
require('./vues/services/view.js');

var Vue = require('vue');
Vue.config.debug = true;
var VueRouter = require('vue-router');
Vue.use(VueRouter);

var attachFastClick = require('fastclick');

window.addEventListener('load', () => {
  attachFastClick.attach(document.body);
}, false);

var App = Vue.extend({});

var router = new VueRouter();

router.map({
  '/': { component: require('./vues/main.vue') },
  '/free': { component: require('./vues/free.vue') },
  '/puzzle': { component: require('./vues/free.vue') },
  '/editor': { component: require('./vues/editor.vue') },
  '/editor/:key': { component: require('./vues/editor.vue') },
  '/play/:key/:playerCount': { component: require('./vues/play.vue') },
  '/settings': { component: require('./vues/settings.vue') },
});

router.start(App, 'body');
