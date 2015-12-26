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
  '/': { component: require('./views/main.vue') },
  '/free': { component: require('./views/free.vue') },
  '/puzzle': { component: require('./views/free.vue') },
});

router.start(App, 'body');
