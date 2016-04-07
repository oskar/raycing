/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _view = __webpack_require__(3);
	
	var _view2 = _interopRequireDefault(_view);
	
	var _vueRouter = __webpack_require__(8);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	var _svgMenu = __webpack_require__(9);
	
	var _svgMenu2 = _interopRequireDefault(_svgMenu);
	
	var _fastclick = __webpack_require__(16);
	
	var _fastclick2 = _interopRequireDefault(_fastclick);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.config.debug = true;
	_vue2.default.use(_vueRouter2.default);
	
	window.addEventListener('load', function () {
	  _fastclick2.default.attach(document.body);
	}, false);
	
	var App = _vue2.default.extend({
	  data: function data() {
	    return {
	      svgMenu: {
	        menu: 'medium',
	        smallButtons: false,
	        showTitle: false
	      }
	    };
	  },
	  components: {
	    svgMenu: _svgMenu2.default
	  }
	});
	
	var router = new _vueRouter2.default();
	
	router.map({
	  '/': { component: __webpack_require__(17) },
	  '/free': { component: __webpack_require__(22) },
	  '/puzzle': { component: __webpack_require__(22) },
	  '/editor/key/:key': { component: __webpack_require__(27) },
	  '/editor/size/:size': { component: __webpack_require__(27) },
	  '/play/:key/:playerCount': { component: __webpack_require__(33) },
	  '/settings': { component: __webpack_require__(45) }
	});
	
	router.start(App, 'body');

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * Vue.js v1.0.13
	 * (c) 2015 Evan You
	 * Released under the MIT License.
	 */
	'use strict';
	
	function set(obj, key, val) {
	  if (hasOwn(obj, key)) {
	    obj[key] = val;
	    return;
	  }
	  if (obj._isVue) {
	    set(obj._data, key, val);
	    return;
	  }
	  var ob = obj.__ob__;
	  if (!ob) {
	    obj[key] = val;
	    return;
	  }
	  ob.convert(key, val);
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._proxy(key);
	      vm._digest();
	    }
	  }
	  return val;
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 */
	
	function del(obj, key) {
	  if (!hasOwn(obj, key)) {
	    return;
	  }
	  delete obj[key];
	  var ob = obj.__ob__;
	  if (!ob) {
	    return;
	  }
	  ob.dep.notify();
	  if (ob.vms) {
	    var i = ob.vms.length;
	    while (i--) {
	      var vm = ob.vms[i];
	      vm._unproxy(key);
	      vm._digest();
	    }
	  }
	}
	
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	/**
	 * Check whether the object has the property.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @return {Boolean}
	 */
	
	function hasOwn(obj, key) {
	  return hasOwnProperty.call(obj, key);
	}
	
	/**
	 * Check if an expression is a literal value.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	var literalValueRE = /^\s?(true|false|[\d\.]+|'[^']*'|"[^"]*")\s?$/;
	
	function isLiteral(exp) {
	  return literalValueRE.test(exp);
	}
	
	/**
	 * Check if a string starts with $ or _
	 *
	 * @param {String} str
	 * @return {Boolean}
	 */
	
	function isReserved(str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F;
	}
	
	/**
	 * Guard text output, make sure undefined outputs
	 * empty string
	 *
	 * @param {*} value
	 * @return {String}
	 */
	
	function _toString(value) {
	  return value == null ? '' : value.toString();
	}
	
	/**
	 * Check and convert possible numeric strings to numbers
	 * before setting back to data
	 *
	 * @param {*} value
	 * @return {*|Number}
	 */
	
	function toNumber(value) {
	  if (typeof value !== 'string') {
	    return value;
	  } else {
	    var parsed = Number(value);
	    return isNaN(parsed) ? value : parsed;
	  }
	}
	
	/**
	 * Convert string boolean literals into real booleans.
	 *
	 * @param {*} value
	 * @return {*|Boolean}
	 */
	
	function toBoolean(value) {
	  return value === 'true' ? true : value === 'false' ? false : value;
	}
	
	/**
	 * Strip quotes from a string
	 *
	 * @param {String} str
	 * @return {String | false}
	 */
	
	function stripQuotes(str) {
	  var a = str.charCodeAt(0);
	  var b = str.charCodeAt(str.length - 1);
	  return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
	}
	
	/**
	 * Camelize a hyphen-delmited string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var camelizeRE = /-(\w)/g;
	
	function camelize(str) {
	  return str.replace(camelizeRE, toUpper);
	}
	
	function toUpper(_, c) {
	  return c ? c.toUpperCase() : '';
	}
	
	/**
	 * Hyphenate a camelCase string.
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var hyphenateRE = /([a-z\d])([A-Z])/g;
	
	function hyphenate(str) {
	  return str.replace(hyphenateRE, '$1-$2').toLowerCase();
	}
	
	/**
	 * Converts hyphen/underscore/slash delimitered names into
	 * camelized classNames.
	 *
	 * e.g. my-component => MyComponent
	 *      some_else    => SomeElse
	 *      some/comp    => SomeComp
	 *
	 * @param {String} str
	 * @return {String}
	 */
	
	var classifyRE = /(?:^|[-_\/])(\w)/g;
	
	function classify(str) {
	  return str.replace(classifyRE, toUpper);
	}
	
	/**
	 * Simple bind, faster than native
	 *
	 * @param {Function} fn
	 * @param {Object} ctx
	 * @return {Function}
	 */
	
	function bind$1(fn, ctx) {
	  return function (a) {
	    var l = arguments.length;
	    return l ? l > 1 ? fn.apply(ctx, arguments) : fn.call(ctx, a) : fn.call(ctx);
	  };
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 *
	 * @param {Array-like} list
	 * @param {Number} [start] - start index
	 * @return {Array}
	 */
	
	function toArray(list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret;
	}
	
	/**
	 * Mix properties into target object.
	 *
	 * @param {Object} to
	 * @param {Object} from
	 */
	
	function extend(to, from) {
	  var keys = Object.keys(from);
	  var i = keys.length;
	  while (i--) {
	    to[keys[i]] = from[keys[i]];
	  }
	  return to;
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	function isObject(obj) {
	  return obj !== null && typeof obj === 'object';
	}
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var toString = Object.prototype.toString;
	var OBJECT_STRING = '[object Object]';
	
	function isPlainObject(obj) {
	  return toString.call(obj) === OBJECT_STRING;
	}
	
	/**
	 * Array type check.
	 *
	 * @param {*} obj
	 * @return {Boolean}
	 */
	
	var isArray = Array.isArray;
	
	/**
	 * Define a non-enumerable property
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 * @param {Boolean} [enumerable]
	 */
	
	function def(obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Debounce a function so it only gets called after the
	 * input stops arriving after the given wait period.
	 *
	 * @param {Function} func
	 * @param {Number} wait
	 * @return {Function} - the debounced function
	 */
	
	function _debounce(func, wait) {
	  var timeout, args, context, timestamp, result;
	  var later = function later() {
	    var last = Date.now() - timestamp;
	    if (last < wait && last >= 0) {
	      timeout = setTimeout(later, wait - last);
	    } else {
	      timeout = null;
	      result = func.apply(context, args);
	      if (!timeout) context = args = null;
	    }
	  };
	  return function () {
	    context = this;
	    args = arguments;
	    timestamp = Date.now();
	    if (!timeout) {
	      timeout = setTimeout(later, wait);
	    }
	    return result;
	  };
	}
	
	/**
	 * Manual indexOf because it's slightly faster than
	 * native.
	 *
	 * @param {Array} arr
	 * @param {*} obj
	 */
	
	function indexOf(arr, obj) {
	  var i = arr.length;
	  while (i--) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	}
	
	/**
	 * Make a cancellable version of an async callback.
	 *
	 * @param {Function} fn
	 * @return {Function}
	 */
	
	function cancellable(fn) {
	  var cb = function cb() {
	    if (!cb.cancelled) {
	      return fn.apply(this, arguments);
	    }
	  };
	  cb.cancel = function () {
	    cb.cancelled = true;
	  };
	  return cb;
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 *
	 * @param {*} a
	 * @param {*} b
	 * @return {Boolean}
	 */
	
	function looseEqual(a, b) {
	  /* eslint-disable eqeqeq */
	  return a == b || (isObject(a) && isObject(b) ? JSON.stringify(a) === JSON.stringify(b) : false);
	  /* eslint-enable eqeqeq */
	}
	
	var hasProto = ('__proto__' in {});
	
	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined' && Object.prototype.toString.call(window) !== '[object Object]';
	
	var isIE9 = inBrowser && navigator.userAgent.toLowerCase().indexOf('msie 9.0') > 0;
	
	var isAndroid = inBrowser && navigator.userAgent.toLowerCase().indexOf('android') > 0;
	
	var transitionProp = undefined;
	var transitionEndEvent = undefined;
	var animationProp = undefined;
	var animationEndEvent = undefined;
	
	// Transition property/event sniffing
	if (inBrowser && !isIE9) {
	  var isWebkitTrans = window.ontransitionend === undefined && window.onwebkittransitionend !== undefined;
	  var isWebkitAnim = window.onanimationend === undefined && window.onwebkitanimationend !== undefined;
	  transitionProp = isWebkitTrans ? 'WebkitTransition' : 'transition';
	  transitionEndEvent = isWebkitTrans ? 'webkitTransitionEnd' : 'transitionend';
	  animationProp = isWebkitAnim ? 'WebkitAnimation' : 'animation';
	  animationEndEvent = isWebkitAnim ? 'webkitAnimationEnd' : 'animationend';
	}
	
	/**
	 * Defer a task to execute it asynchronously. Ideally this
	 * should be executed as a microtask, so we leverage
	 * MutationObserver if it's available, and fallback to
	 * setTimeout(0).
	 *
	 * @param {Function} cb
	 * @param {Object} ctx
	 */
	
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	  function nextTickHandler() {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks = [];
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	  /* istanbul ignore if */
	  if (typeof MutationObserver !== 'undefined') {
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(counter);
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = counter;
	    };
	  } else {
	    timerFunc = setTimeout;
	  }
	  return function (cb, ctx) {
	    var func = ctx ? function () {
	      cb.call(ctx);
	    } : cb;
	    callbacks.push(func);
	    if (pending) return;
	    pending = true;
	    timerFunc(nextTickHandler, 0);
	  };
	})();
	
	function Cache(limit) {
	  this.size = 0;
	  this.limit = limit;
	  this.head = this.tail = undefined;
	  this._keymap = Object.create(null);
	}
	
	var p = Cache.prototype;
	
	/**
	 * Put <value> into the cache associated with <key>.
	 * Returns the entry which was removed to make room for
	 * the new entry. Otherwise undefined is returned.
	 * (i.e. if there was enough room already).
	 *
	 * @param {String} key
	 * @param {*} value
	 * @return {Entry|undefined}
	 */
	
	p.put = function (key, value) {
	  var entry = {
	    key: key,
	    value: value
	  };
	  this._keymap[key] = entry;
	  if (this.tail) {
	    this.tail.newer = entry;
	    entry.older = this.tail;
	  } else {
	    this.head = entry;
	  }
	  this.tail = entry;
	  if (this.size === this.limit) {
	    return this.shift();
	  } else {
	    this.size++;
	  }
	};
	
	/**
	 * Purge the least recently used (oldest) entry from the
	 * cache. Returns the removed entry or undefined if the
	 * cache was empty.
	 */
	
	p.shift = function () {
	  var entry = this.head;
	  if (entry) {
	    this.head = this.head.newer;
	    this.head.older = undefined;
	    entry.newer = entry.older = undefined;
	    this._keymap[entry.key] = undefined;
	  }
	  return entry;
	};
	
	/**
	 * Get and register recent use of <key>. Returns the value
	 * associated with <key> or undefined if not in cache.
	 *
	 * @param {String} key
	 * @param {Boolean} returnEntry
	 * @return {Entry|*}
	 */
	
	p.get = function (key, returnEntry) {
	  var entry = this._keymap[key];
	  if (entry === undefined) return;
	  if (entry === this.tail) {
	    return returnEntry ? entry : entry.value;
	  }
	  // HEAD--------------TAIL
	  //   <.older   .newer>
	  //  <--- add direction --
	  //   A  B  C  <D>  E
	  if (entry.newer) {
	    if (entry === this.head) {
	      this.head = entry.newer;
	    }
	    entry.newer.older = entry.older; // C <-- E.
	  }
	  if (entry.older) {
	    entry.older.newer = entry.newer; // C. --> E
	  }
	  entry.newer = undefined; // D --x
	  entry.older = this.tail; // D. --> E
	  if (this.tail) {
	    this.tail.newer = entry; // E. <-- D
	  }
	  this.tail = entry;
	  return returnEntry ? entry : entry.value;
	};
	
	var cache$1 = new Cache(1000);
	var filterTokenRE = /[^\s'"]+|'[^']*'|"[^"]*"/g;
	var reservedArgRE = /^in$|^-?\d+/;
	
	/**
	 * Parser state
	 */
	
	var str;
	var dir;
	var c;
	var prev;
	var i;
	var l;
	var lastFilterIndex;
	var inSingle;
	var inDouble;
	var curly;
	var square;
	var paren;
	/**
	 * Push a filter to the current directive object
	 */
	
	function pushFilter() {
	  var exp = str.slice(lastFilterIndex, i).trim();
	  var filter;
	  if (exp) {
	    filter = {};
	    var tokens = exp.match(filterTokenRE);
	    filter.name = tokens[0];
	    if (tokens.length > 1) {
	      filter.args = tokens.slice(1).map(processFilterArg);
	    }
	  }
	  if (filter) {
	    (dir.filters = dir.filters || []).push(filter);
	  }
	  lastFilterIndex = i + 1;
	}
	
	/**
	 * Check if an argument is dynamic and strip quotes.
	 *
	 * @param {String} arg
	 * @return {Object}
	 */
	
	function processFilterArg(arg) {
	  if (reservedArgRE.test(arg)) {
	    return {
	      value: toNumber(arg),
	      dynamic: false
	    };
	  } else {
	    var stripped = stripQuotes(arg);
	    var dynamic = stripped === arg;
	    return {
	      value: dynamic ? arg : stripped,
	      dynamic: dynamic
	    };
	  }
	}
	
	/**
	 * Parse a directive value and extract the expression
	 * and its filters into a descriptor.
	 *
	 * Example:
	 *
	 * "a + 1 | uppercase" will yield:
	 * {
	 *   expression: 'a + 1',
	 *   filters: [
	 *     { name: 'uppercase', args: null }
	 *   ]
	 * }
	 *
	 * @param {String} str
	 * @return {Object}
	 */
	
	function parseDirective(s) {
	
	  var hit = cache$1.get(s);
	  if (hit) {
	    return hit;
	  }
	
	  // reset parser state
	  str = s;
	  inSingle = inDouble = false;
	  curly = square = paren = 0;
	  lastFilterIndex = 0;
	  dir = {};
	
	  for (i = 0, l = str.length; i < l; i++) {
	    prev = c;
	    c = str.charCodeAt(i);
	    if (inSingle) {
	      // check single quote
	      if (c === 0x27 && prev !== 0x5C) inSingle = !inSingle;
	    } else if (inDouble) {
	      // check double quote
	      if (c === 0x22 && prev !== 0x5C) inDouble = !inDouble;
	    } else if (c === 0x7C && // pipe
	    str.charCodeAt(i + 1) !== 0x7C && str.charCodeAt(i - 1) !== 0x7C) {
	      if (dir.expression == null) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        dir.expression = str.slice(0, i).trim();
	      } else {
	        // already has filter
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22:
	          inDouble = true;break; // "
	        case 0x27:
	          inSingle = true;break; // '
	        case 0x28:
	          paren++;break; // (
	        case 0x29:
	          paren--;break; // )
	        case 0x5B:
	          square++;break; // [
	        case 0x5D:
	          square--;break; // ]
	        case 0x7B:
	          curly++;break; // {
	        case 0x7D:
	          curly--;break; // }
	      }
	    }
	  }
	
	  if (dir.expression == null) {
	    dir.expression = str.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }
	
	  cache$1.put(s, dir);
	  return dir;
	}
	
	var directive = Object.freeze({
	  parseDirective: parseDirective
	});
	
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var cache = undefined;
	var tagRE = undefined;
	var htmlRE = undefined;
	/**
	 * Escape a string so it can be used in a RegExp
	 * constructor.
	 *
	 * @param {String} str
	 */
	
	function escapeRegex(str) {
	  return str.replace(regexEscapeRE, '\\$&');
	}
	
	function compileRegex() {
	  var open = escapeRegex(config.delimiters[0]);
	  var close = escapeRegex(config.delimiters[1]);
	  var unsafeOpen = escapeRegex(config.unsafeDelimiters[0]);
	  var unsafeClose = escapeRegex(config.unsafeDelimiters[1]);
	  tagRE = new RegExp(unsafeOpen + '(.+?)' + unsafeClose + '|' + open + '(.+?)' + close, 'g');
	  htmlRE = new RegExp('^' + unsafeOpen + '.*' + unsafeClose + '$');
	  // reset cache
	  cache = new Cache(1000);
	}
	
	/**
	 * Parse a template text string into an array of tokens.
	 *
	 * @param {String} text
	 * @return {Array<Object> | null}
	 *               - {String} type
	 *               - {String} value
	 *               - {Boolean} [html]
	 *               - {Boolean} [oneTime]
	 */
	
	function parseText(text) {
	  if (!cache) {
	    compileRegex();
	  }
	  var hit = cache.get(text);
	  if (hit) {
	    return hit;
	  }
	  text = text.replace(/\n/g, '');
	  if (!tagRE.test(text)) {
	    return null;
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index, html, value, first, oneTime;
	  /* eslint-disable no-cond-assign */
	  while (match = tagRE.exec(text)) {
	    /* eslint-enable no-cond-assign */
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push({
	        value: text.slice(lastIndex, index)
	      });
	    }
	    // tag token
	    html = htmlRE.test(match[0]);
	    value = html ? match[1] : match[2];
	    first = value.charCodeAt(0);
	    oneTime = first === 42; // *
	    value = oneTime ? value.slice(1) : value;
	    tokens.push({
	      tag: true,
	      value: value.trim(),
	      html: html,
	      oneTime: oneTime
	    });
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push({
	      value: text.slice(lastIndex)
	    });
	  }
	  cache.put(text, tokens);
	  return tokens;
	}
	
	/**
	 * Format a list of tokens into an expression.
	 * e.g. tokens parsed from 'a {{b}} c' can be serialized
	 * into one single expression as '"a " + b + " c"'.
	 *
	 * @param {Array} tokens
	 * @return {String}
	 */
	
	function tokensToExp(tokens) {
	  if (tokens.length > 1) {
	    return tokens.map(function (token) {
	      return formatToken(token);
	    }).join('+');
	  } else {
	    return formatToken(tokens[0], true);
	  }
	}
	
	/**
	 * Format a single token.
	 *
	 * @param {Object} token
	 * @param {Boolean} single
	 * @return {String}
	 */
	
	function formatToken(token, single) {
	  return token.tag ? inlineFilters(token.value, single) : '"' + token.value + '"';
	}
	
	/**
	 * For an attribute with multiple interpolation tags,
	 * e.g. attr="some-{{thing | filter}}", in order to combine
	 * the whole thing into a single watchable expression, we
	 * have to inline those filters. This function does exactly
	 * that. This is a bit hacky but it avoids heavy changes
	 * to directive parser and watcher mechanism.
	 *
	 * @param {String} exp
	 * @param {Boolean} single
	 * @return {String}
	 */
	
	var filterRE$1 = /[^|]\|[^|]/;
	function inlineFilters(exp, single) {
	  if (!filterRE$1.test(exp)) {
	    return single ? exp : '(' + exp + ')';
	  } else {
	    var dir = parseDirective(exp);
	    if (!dir.filters) {
	      return '(' + exp + ')';
	    } else {
	      return 'this._applyFilters(' + dir.expression + // value
	      ',null,' + // oldValue (null for read)
	      JSON.stringify(dir.filters) + // filter descriptors
	      ',false)'; // write?
	    }
	  }
	}
	
	var text$1 = Object.freeze({
	  compileRegex: compileRegex,
	  parseText: parseText,
	  tokensToExp: tokensToExp
	});
	
	var delimiters = ['{{', '}}'];
	var unsafeDelimiters = ['{{{', '}}}'];
	
	var config = Object.defineProperties({
	
	  /**
	   * Whether to print debug messages.
	   * Also enables stack trace for warnings.
	   *
	   * @type {Boolean}
	   */
	
	  debug: false,
	
	  /**
	   * Whether to suppress warnings.
	   *
	   * @type {Boolean}
	   */
	
	  silent: false,
	
	  /**
	   * Whether to use async rendering.
	   */
	
	  async: true,
	
	  /**
	   * Whether to warn against errors caught when evaluating
	   * expressions.
	   */
	
	  warnExpressionErrors: true,
	
	  /**
	   * Whether or not to handle fully object properties which
	   * are already backed by getters and seters. Depending on
	   * use case and environment, this might introduce non-neglible
	   * performance penalties.
	   */
	  convertAllProperties: false,
	
	  /**
	   * Internal flag to indicate the delimiters have been
	   * changed.
	   *
	   * @type {Boolean}
	   */
	
	  _delimitersChanged: true,
	
	  /**
	   * List of asset types that a component can own.
	   *
	   * @type {Array}
	   */
	
	  _assetTypes: ['component', 'directive', 'elementDirective', 'filter', 'transition', 'partial'],
	
	  /**
	   * prop binding modes
	   */
	
	  _propBindingModes: {
	    ONE_WAY: 0,
	    TWO_WAY: 1,
	    ONE_TIME: 2
	  },
	
	  /**
	   * Max circular updates allowed in a batcher flush cycle.
	   */
	
	  _maxUpdateCount: 100
	
	}, {
	  delimiters: { /**
	                 * Interpolation delimiters. Changing these would trigger
	                 * the text parser to re-compile the regular expressions.
	                 *
	                 * @type {Array<String>}
	                 */
	
	    get: function get() {
	      return delimiters;
	    },
	    set: function set(val) {
	      delimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  },
	  unsafeDelimiters: {
	    get: function get() {
	      return unsafeDelimiters;
	    },
	    set: function set(val) {
	      unsafeDelimiters = val;
	      compileRegex();
	    },
	    configurable: true,
	    enumerable: true
	  }
	});
	
	var warn = undefined;
	
	if (process.env.NODE_ENV !== 'production') {
	  (function () {
	    var hasConsole = typeof console !== 'undefined';
	    warn = function (msg, e) {
	      if (hasConsole && (!config.silent || config.debug)) {
	        console.warn('[Vue warn]: ' + msg);
	        /* istanbul ignore if */
	        if (config.debug) {
	          if (e) {
	            throw e;
	          } else {
	            console.warn(new Error('Warning Stack Trace').stack);
	          }
	        }
	      }
	    };
	  })();
	}
	
	/**
	 * Append with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function appendWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    target.appendChild(el);
	  }, vm, cb);
	}
	
	/**
	 * InsertBefore with transition.
	 *
	 * @param {Element} el
	 * @param {Element} target
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function beforeWithTransition(el, target, vm, cb) {
	  applyTransition(el, 1, function () {
	    before(el, target);
	  }, vm, cb);
	}
	
	/**
	 * Remove with transition.
	 *
	 * @param {Element} el
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function removeWithTransition(el, vm, cb) {
	  applyTransition(el, -1, function () {
	    remove(el);
	  }, vm, cb);
	}
	
	/**
	 * Apply transitions with an operation callback.
	 *
	 * @param {Element} el
	 * @param {Number} direction
	 *                  1: enter
	 *                 -1: leave
	 * @param {Function} op - the actual DOM operation
	 * @param {Vue} vm
	 * @param {Function} [cb]
	 */
	
	function applyTransition(el, direction, op, vm, cb) {
	  var transition = el.__v_trans;
	  if (!transition ||
	  // skip if there are no js hooks and CSS transition is
	  // not supported
	  !transition.hooks && !transitionEndEvent ||
	  // skip transitions for initial compile
	  !vm._isCompiled ||
	  // if the vm is being manipulated by a parent directive
	  // during the parent's compilation phase, skip the
	  // animation.
	  vm.$parent && !vm.$parent._isCompiled) {
	    op();
	    if (cb) cb();
	    return;
	  }
	  var action = direction > 0 ? 'enter' : 'leave';
	  transition[action](op, cb);
	}
	
	/**
	 * Query an element selector if it's not an element already.
	 *
	 * @param {String|Element} el
	 * @return {Element}
	 */
	
	function query(el) {
	  if (typeof el === 'string') {
	    var selector = el;
	    el = document.querySelector(el);
	    if (!el) {
	      process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + selector);
	    }
	  }
	  return el;
	}
	
	/**
	 * Check if a node is in the document.
	 * Note: document.documentElement.contains should work here
	 * but always returns false for comment nodes in phantomjs,
	 * making unit tests difficult. This is fixed by doing the
	 * contains() check on the node's parentNode instead of
	 * the node itself.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function inDoc(node) {
	  var doc = document.documentElement;
	  var parent = node && node.parentNode;
	  return doc === node || doc === parent || !!(parent && parent.nodeType === 1 && doc.contains(parent));
	}
	
	/**
	 * Get and remove an attribute from a node.
	 *
	 * @param {Node} node
	 * @param {String} _attr
	 */
	
	function getAttr(node, _attr) {
	  var val = node.getAttribute(_attr);
	  if (val !== null) {
	    node.removeAttribute(_attr);
	  }
	  return val;
	}
	
	/**
	 * Get an attribute with colon or v-bind: prefix.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {String|null}
	 */
	
	function getBindAttr(node, name) {
	  var val = getAttr(node, ':' + name);
	  if (val === null) {
	    val = getAttr(node, 'v-bind:' + name);
	  }
	  return val;
	}
	
	/**
	 * Check the presence of a bind attribute.
	 *
	 * @param {Node} node
	 * @param {String} name
	 * @return {Boolean}
	 */
	
	function hasBindAttr(node, name) {
	  return node.hasAttribute(name) || node.hasAttribute(':' + name) || node.hasAttribute('v-bind:' + name);
	}
	
	/**
	 * Insert el before target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function before(el, target) {
	  target.parentNode.insertBefore(el, target);
	}
	
	/**
	 * Insert el after target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function after(el, target) {
	  if (target.nextSibling) {
	    before(el, target.nextSibling);
	  } else {
	    target.parentNode.appendChild(el);
	  }
	}
	
	/**
	 * Remove el from DOM
	 *
	 * @param {Element} el
	 */
	
	function remove(el) {
	  el.parentNode.removeChild(el);
	}
	
	/**
	 * Prepend el to target
	 *
	 * @param {Element} el
	 * @param {Element} target
	 */
	
	function prepend(el, target) {
	  if (target.firstChild) {
	    before(el, target.firstChild);
	  } else {
	    target.appendChild(el);
	  }
	}
	
	/**
	 * Replace target with el
	 *
	 * @param {Element} target
	 * @param {Element} el
	 */
	
	function replace(target, el) {
	  var parent = target.parentNode;
	  if (parent) {
	    parent.replaceChild(el, target);
	  }
	}
	
	/**
	 * Add event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	function on$1(el, event, cb) {
	  el.addEventListener(event, cb);
	}
	
	/**
	 * Remove event listener shorthand.
	 *
	 * @param {Element} el
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	function off(el, event, cb) {
	  el.removeEventListener(event, cb);
	}
	
	/**
	 * In IE9, setAttribute('class') will result in empty class
	 * if the element also has the :class attribute; However in
	 * PhantomJS, setting `className` does not work on SVG elements...
	 * So we have to do a conditional check here.
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function setClass(el, cls) {
	  /* istanbul ignore if */
	  if (isIE9 && !(el instanceof SVGElement)) {
	    el.className = cls;
	  } else {
	    el.setAttribute('class', cls);
	  }
	}
	
	/**
	 * Add class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function addClass(el, cls) {
	  if (el.classList) {
	    el.classList.add(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      setClass(el, (cur + cls).trim());
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for IE & SVG
	 *
	 * @param {Element} el
	 * @param {String} cls
	 */
	
	function removeClass(el, cls) {
	  if (el.classList) {
	    el.classList.remove(cls);
	  } else {
	    var cur = ' ' + (el.getAttribute('class') || '') + ' ';
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    setClass(el, cur.trim());
	  }
	  if (!el.className) {
	    el.removeAttribute('class');
	  }
	}
	
	/**
	 * Extract raw content inside an element into a temporary
	 * container div
	 *
	 * @param {Element} el
	 * @param {Boolean} asFragment
	 * @return {Element}
	 */
	
	function extractContent(el, asFragment) {
	  var child;
	  var rawContent;
	  /* istanbul ignore if */
	  if (isTemplate(el) && el.content instanceof DocumentFragment) {
	    el = el.content;
	  }
	  if (el.hasChildNodes()) {
	    trimNode(el);
	    rawContent = asFragment ? document.createDocumentFragment() : document.createElement('div');
	    /* eslint-disable no-cond-assign */
	    while (child = el.firstChild) {
	      /* eslint-enable no-cond-assign */
	      rawContent.appendChild(child);
	    }
	  }
	  return rawContent;
	}
	
	/**
	 * Trim possible empty head/tail textNodes inside a parent.
	 *
	 * @param {Node} node
	 */
	
	function trimNode(node) {
	  trim(node, node.firstChild);
	  trim(node, node.lastChild);
	}
	
	function trim(parent, node) {
	  if (node && node.nodeType === 3 && !node.data.trim()) {
	    parent.removeChild(node);
	  }
	}
	
	/**
	 * Check if an element is a template tag.
	 * Note if the template appears inside an SVG its tagName
	 * will be in lowercase.
	 *
	 * @param {Element} el
	 */
	
	function isTemplate(el) {
	  return el.tagName && el.tagName.toLowerCase() === 'template';
	}
	
	/**
	 * Create an "anchor" for performing dom insertion/removals.
	 * This is used in a number of scenarios:
	 * - fragment instance
	 * - v-html
	 * - v-if
	 * - v-for
	 * - component
	 *
	 * @param {String} content
	 * @param {Boolean} persist - IE trashes empty textNodes on
	 *                            cloneNode(true), so in certain
	 *                            cases the anchor needs to be
	 *                            non-empty to be persisted in
	 *                            templates.
	 * @return {Comment|Text}
	 */
	
	function createAnchor(content, persist) {
	  var anchor = config.debug ? document.createComment(content) : document.createTextNode(persist ? ' ' : '');
	  anchor.__vue_anchor = true;
	  return anchor;
	}
	
	/**
	 * Find a component ref attribute that starts with $.
	 *
	 * @param {Element} node
	 * @return {String|undefined}
	 */
	
	var refRE = /^v-ref:/;
	
	function findRef(node) {
	  if (node.hasAttributes()) {
	    var attrs = node.attributes;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      var name = attrs[i].name;
	      if (refRE.test(name)) {
	        return camelize(name.replace(refRE, ''));
	      }
	    }
	  }
	}
	
	/**
	 * Map a function to a range of nodes .
	 *
	 * @param {Node} node
	 * @param {Node} end
	 * @param {Function} op
	 */
	
	function mapNodeRange(node, end, op) {
	  var next;
	  while (node !== end) {
	    next = node.nextSibling;
	    op(node);
	    node = next;
	  }
	  op(end);
	}
	
	/**
	 * Remove a range of nodes with transition, store
	 * the nodes in a fragment with correct ordering,
	 * and call callback when done.
	 *
	 * @param {Node} start
	 * @param {Node} end
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Function} cb
	 */
	
	function removeNodeRange(start, end, vm, frag, cb) {
	  var done = false;
	  var removed = 0;
	  var nodes = [];
	  mapNodeRange(start, end, function (node) {
	    if (node === end) done = true;
	    nodes.push(node);
	    removeWithTransition(node, vm, onRemoved);
	  });
	  function onRemoved() {
	    removed++;
	    if (done && removed >= nodes.length) {
	      for (var i = 0; i < nodes.length; i++) {
	        frag.appendChild(nodes[i]);
	      }
	      cb && cb();
	    }
	  }
	}
	
	var commonTagRE = /^(div|p|span|img|a|b|i|br|ul|ol|li|h1|h2|h3|h4|h5|h6|code|pre|table|th|td|tr|form|label|input|select|option|nav|article|section|header|footer)$/;
	var reservedTagRE = /^(slot|partial|component)$/;
	
	/**
	 * Check if an element is a component, if yes return its
	 * component id.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Object|undefined}
	 */
	
	function checkComponentAttr(el, options) {
	  var tag = el.tagName.toLowerCase();
	  var hasAttrs = el.hasAttributes();
	  if (!commonTagRE.test(tag) && !reservedTagRE.test(tag)) {
	    if (resolveAsset(options, 'components', tag)) {
	      return { id: tag };
	    } else {
	      var is = hasAttrs && getIsBinding(el);
	      if (is) {
	        return is;
	      } else if (process.env.NODE_ENV !== 'production') {
	        if (tag.indexOf('-') > -1 || /HTMLUnknownElement/.test(el.toString()) &&
	        // Chrome returns unknown for several HTML5 elements.
	        // https://code.google.com/p/chromium/issues/detail?id=540526
	        !/^(data|time|rtc|rb)$/.test(tag)) {
	          warn('Unknown custom element: <' + tag + '> - did you ' + 'register the component correctly?');
	        }
	      }
	    }
	  } else if (hasAttrs) {
	    return getIsBinding(el);
	  }
	}
	
	/**
	 * Get "is" binding from an element.
	 *
	 * @param {Element} el
	 * @return {Object|undefined}
	 */
	
	function getIsBinding(el) {
	  // dynamic syntax
	  var exp = getAttr(el, 'is');
	  if (exp != null) {
	    return { id: exp };
	  } else {
	    exp = getBindAttr(el, 'is');
	    if (exp != null) {
	      return { id: exp, dynamic: true };
	    }
	  }
	}
	
	/**
	 * Set a prop's initial value on a vm and its data object.
	 *
	 * @param {Vue} vm
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function initProp(vm, prop, value) {
	  var key = prop.path;
	  value = coerceProp(prop, value);
	  vm[key] = vm._data[key] = assertProp(prop, value) ? value : undefined;
	}
	
	/**
	 * Assert whether a prop is valid.
	 *
	 * @param {Object} prop
	 * @param {*} value
	 */
	
	function assertProp(prop, value) {
	  // if a prop is not provided and is not required,
	  // skip the check.
	  if (prop.raw === null && !prop.required) {
	    return true;
	  }
	  var options = prop.options;
	  var type = options.type;
	  var valid = true;
	  var expectedType;
	  if (type) {
	    if (type === String) {
	      expectedType = 'string';
	      valid = typeof value === expectedType;
	    } else if (type === Number) {
	      expectedType = 'number';
	      valid = typeof value === 'number';
	    } else if (type === Boolean) {
	      expectedType = 'boolean';
	      valid = typeof value === 'boolean';
	    } else if (type === Function) {
	      expectedType = 'function';
	      valid = typeof value === 'function';
	    } else if (type === Object) {
	      expectedType = 'object';
	      valid = isPlainObject(value);
	    } else if (type === Array) {
	      expectedType = 'array';
	      valid = isArray(value);
	    } else {
	      valid = value instanceof type;
	    }
	  }
	  if (!valid) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid prop: type check failed for ' + prop.path + '="' + prop.raw + '".' + ' Expected ' + formatType(expectedType) + ', got ' + formatValue(value) + '.');
	    return false;
	  }
	  var validator = options.validator;
	  if (validator) {
	    if (!validator.call(null, value)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop: custom validator check failed for ' + prop.path + '="' + prop.raw + '"');
	      return false;
	    }
	  }
	  return true;
	}
	
	/**
	 * Force parsing value with coerce option.
	 *
	 * @param {*} value
	 * @param {Object} options
	 * @return {*}
	 */
	
	function coerceProp(prop, value) {
	  var coerce = prop.options.coerce;
	  if (!coerce) {
	    return value;
	  }
	  // coerce is a function
	  return coerce(value);
	}
	
	function formatType(val) {
	  return val ? val.charAt(0).toUpperCase() + val.slice(1) : 'custom type';
	}
	
	function formatValue(val) {
	  return Object.prototype.toString.call(val).slice(8, -1);
	}
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 *
	 * All strategy functions follow the same signature:
	 *
	 * @param {*} parentVal
	 * @param {*} childVal
	 * @param {Vue} [vm]
	 */
	
	var strats = config.optionMergeStrategies = Object.create(null);
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	
	function mergeData(to, from) {
	  var key, toVal, fromVal;
	  for (key in from) {
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isObject(toVal) && isObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to;
	}
	
	/**
	 * Data
	 */
	
	strats.data = function (parentVal, childVal, vm) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal;
	    }
	    if (typeof childVal !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('The "data" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	      return parentVal;
	    }
	    if (!parentVal) {
	      return childVal;
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn() {
	      return mergeData(childVal.call(this), parentVal.call(this));
	    };
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn() {
	      // instance merge
	      var instanceData = typeof childVal === 'function' ? childVal.call(vm) : childVal;
	      var defaultData = typeof parentVal === 'function' ? parentVal.call(vm) : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData);
	      } else {
	        return defaultData;
	      }
	    };
	  }
	};
	
	/**
	 * El
	 */
	
	strats.el = function (parentVal, childVal, vm) {
	  if (!vm && childVal && typeof childVal !== 'function') {
	    process.env.NODE_ENV !== 'production' && warn('The "el" option should be a function ' + 'that returns a per-instance value in component ' + 'definitions.');
	    return;
	  }
	  var ret = childVal || parentVal;
	  // invoke the element factory if this is instance merge
	  return vm && typeof ret === 'function' ? ret.call(vm) : ret;
	};
	
	/**
	 * Hooks and param attributes are merged as arrays.
	 */
	
	strats.init = strats.created = strats.ready = strats.attached = strats.detached = strats.beforeCompile = strats.compiled = strats.beforeDestroy = strats.destroyed = function (parentVal, childVal) {
	  return childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
	};
	
	/**
	 * 0.11 deprecation warning
	 */
	
	strats.paramAttributes = function () {
	  /* istanbul ignore next */
	  process.env.NODE_ENV !== 'production' && warn('"paramAttributes" option has been deprecated in 0.12. ' + 'Use "props" instead.');
	};
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	
	function mergeAssets(parentVal, childVal) {
	  var res = Object.create(parentVal);
	  return childVal ? extend(res, guardArrayAssets(childVal)) : res;
	}
	
	config._assetTypes.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Events & Watchers.
	 *
	 * Events & watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	
	strats.watch = strats.events = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent ? parent.concat(child) : [child];
	  }
	  return ret;
	};
	
	/**
	 * Other object hashes.
	 */
	
	strats.props = strats.methods = strats.computed = function (parentVal, childVal) {
	  if (!childVal) return parentVal;
	  if (!parentVal) return childVal;
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret;
	};
	
	/**
	 * Default strategy.
	 */
	
	var defaultStrat = function defaultStrat(parentVal, childVal) {
	  return childVal === undefined ? parentVal : childVal;
	};
	
	/**
	 * Make sure component options get converted to actual
	 * constructors.
	 *
	 * @param {Object} options
	 */
	
	function guardComponents(options) {
	  if (options.components) {
	    var components = options.components = guardArrayAssets(options.components);
	    var def;
	    var ids = Object.keys(components);
	    for (var i = 0, l = ids.length; i < l; i++) {
	      var key = ids[i];
	      if (commonTagRE.test(key) || reservedTagRE.test(key)) {
	        process.env.NODE_ENV !== 'production' && warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + key);
	        continue;
	      }
	      def = components[key];
	      if (isPlainObject(def)) {
	        components[key] = Vue.extend(def);
	      }
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 *
	 * @param {Object} options
	 */
	
	function guardProps(options) {
	  var props = options.props;
	  var i, val;
	  if (isArray(props)) {
	    options.props = {};
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        options.props[val] = null;
	      } else if (val.name) {
	        options.props[val.name] = val;
	      }
	    }
	  } else if (isPlainObject(props)) {
	    var keys = Object.keys(props);
	    i = keys.length;
	    while (i--) {
	      val = props[keys[i]];
	      if (typeof val === 'function') {
	        props[keys[i]] = { type: val };
	      }
	    }
	  }
	}
	
	/**
	 * Guard an Array-format assets option and converted it
	 * into the key-value Object format.
	 *
	 * @param {Object|Array} assets
	 * @return {Object}
	 */
	
	function guardArrayAssets(assets) {
	  if (isArray(assets)) {
	    var res = {};
	    var i = assets.length;
	    var asset;
	    while (i--) {
	      asset = assets[i];
	      var id = typeof asset === 'function' ? asset.options && asset.options.name || asset.id : asset.name || asset.id;
	      if (!id) {
	        process.env.NODE_ENV !== 'production' && warn('Array-syntax assets must provide a "name" or "id" field.');
	      } else {
	        res[id] = asset;
	      }
	    }
	    return res;
	  }
	  return assets;
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 *
	 * @param {Object} parent
	 * @param {Object} child
	 * @param {Vue} [vm] - if vm is present, indicates this is
	 *                     an instantiation merge.
	 */
	
	function mergeOptions(parent, child, vm) {
	  guardComponents(child);
	  guardProps(child);
	  var options = {};
	  var key;
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField(key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options;
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 *
	 * @param {Object} options
	 * @param {String} type
	 * @param {String} id
	 * @return {Object|Function}
	 */
	
	function resolveAsset(options, type, id) {
	  var assets = options[type];
	  var camelizedId;
	  return assets[id] ||
	  // camelCase ID
	  assets[camelizedId = camelize(id)] ||
	  // Pascal Case ID
	  assets[camelizedId.charAt(0).toUpperCase() + camelizedId.slice(1)];
	}
	
	/**
	 * Assert asset exists
	 */
	
	function assertAsset(val, type, id) {
	  if (!val) {
	    process.env.NODE_ENV !== 'production' && warn('Failed to resolve ' + type + ': ' + id);
	  }
	}
	
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto)
	
	/**
	 * Intercept mutating methods and emit events
	 */
	
	;['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator() {
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break;
	      case 'unshift':
	        inserted = args;
	        break;
	      case 'splice':
	        inserted = args.slice(2);
	        break;
	    }
	    if (inserted) ob.observeArray(inserted);
	    // notify change
	    ob.dep.notify();
	    return result;
	  });
	});
	
	/**
	 * Swap the element at the given index with a new value
	 * and emits corresponding event.
	 *
	 * @param {Number} index
	 * @param {*} val
	 * @return {*} - replaced element
	 */
	
	def(arrayProto, '$set', function $set(index, val) {
	  if (index >= this.length) {
	    this.length = Number(index) + 1;
	  }
	  return this.splice(index, 1, val)[0];
	});
	
	/**
	 * Convenience method to remove the element at given index.
	 *
	 * @param {Number} index
	 * @param {*} val
	 */
	
	def(arrayProto, '$remove', function $remove(item) {
	  /* istanbul ignore if */
	  if (!this.length) return;
	  var index = indexOf(this, item);
	  if (index > -1) {
	    return this.splice(index, 1);
	  }
	});
	
	var uid$3 = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 *
	 * @constructor
	 */
	function Dep() {
	  this.id = uid$3++;
	  this.subs = [];
	}
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	
	/**
	 * Add a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.addSub = function (sub) {
	  this.subs.push(sub);
	};
	
	/**
	 * Remove a directive subscriber.
	 *
	 * @param {Directive} sub
	 */
	
	Dep.prototype.removeSub = function (sub) {
	  this.subs.$remove(sub);
	};
	
	/**
	 * Add self as a dependency to the target watcher.
	 */
	
	Dep.prototype.depend = function () {
	  Dep.target.addDep(this);
	};
	
	/**
	 * Notify all subscribers of a new value.
	 */
	
	Dep.prototype.notify = function () {
	  // stablize the subscriber list first
	  var subs = toArray(this.subs);
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 *
	 * @param {Array|Object} value
	 * @constructor
	 */
	
	function Observer(value) {
	  this.value = value;
	  this.dep = new Dep();
	  def(value, '__ob__', this);
	  if (isArray(value)) {
	    var augment = hasProto ? protoAugment : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	}
	
	// Instance methods
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 *
	 * @param {Object} obj
	 */
	
	Observer.prototype.walk = function (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0, l = keys.length; i < l; i++) {
	    this.convert(keys[i], obj[keys[i]]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 *
	 * @param {Array} items
	 */
	
	Observer.prototype.observeArray = function (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	/**
	 * Convert a property into getter/setter so we can emit
	 * the events when the property is accessed/changed.
	 *
	 * @param {String} key
	 * @param {*} val
	 */
	
	Observer.prototype.convert = function (key, val) {
	  defineReactive(this.value, key, val);
	};
	
	/**
	 * Add an owner vm, so that when $set/$delete mutations
	 * happen we can notify owner vms to proxy the keys and
	 * digest the watchers. This is only called when the object
	 * is observed as an instance's root $data.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.addVm = function (vm) {
	  (this.vms || (this.vms = [])).push(vm);
	};
	
	/**
	 * Remove an owner vm. This is called when the object is
	 * swapped out as an instance's $data object.
	 *
	 * @param {Vue} vm
	 */
	
	Observer.prototype.removeVm = function (vm) {
	  this.vms.$remove(vm);
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function protoAugment(target, src) {
	  target.__proto__ = src;
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 *
	 * @param {Object|Array} target
	 * @param {Object} proto
	 */
	
	function copyAugment(target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 *
	 * @param {*} value
	 * @param {Vue} [vm]
	 * @return {Observer|undefined}
	 * @static
	 */
	
	function observe(value, vm) {
	  if (!value || typeof value !== 'object') {
	    return;
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if ((isArray(value) || isPlainObject(value)) && Object.isExtensible(value) && !value._isVue) {
	    ob = new Observer(value);
	  }
	  if (ob && vm) {
	    ob.addVm(vm);
	  }
	  return ob;
	}
	
	/**
	 * Define a reactive property on an Object.
	 *
	 * @param {Object} obj
	 * @param {String} key
	 * @param {*} val
	 */
	
	function defineReactive(obj, key, val) {
	  var dep = new Dep();
	
	  // cater for pre-defined getter/setters
	  var getter, setter;
	  if (config.convertAllProperties) {
	    var property = Object.getOwnPropertyDescriptor(obj, key);
	    if (property && property.configurable === false) {
	      return;
	    }
	    getter = property && property.get;
	    setter = property && property.set;
	  }
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter() {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (isArray(value)) {
	          for (var e, i = 0, l = value.length; i < l; i++) {
	            e = value[i];
	            e && e.__ob__ && e.__ob__.dep.depend();
	          }
	        }
	      }
	      return value;
	    },
	    set: function reactiveSetter(newVal) {
	      var value = getter ? getter.call(obj) : val;
	      if (newVal === value) {
	        return;
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	var util = Object.freeze({
		defineReactive: defineReactive,
		set: set,
		del: del,
		hasOwn: hasOwn,
		isLiteral: isLiteral,
		isReserved: isReserved,
		_toString: _toString,
		toNumber: toNumber,
		toBoolean: toBoolean,
		stripQuotes: stripQuotes,
		camelize: camelize,
		hyphenate: hyphenate,
		classify: classify,
		bind: bind$1,
		toArray: toArray,
		extend: extend,
		isObject: isObject,
		isPlainObject: isPlainObject,
		def: def,
		debounce: _debounce,
		indexOf: indexOf,
		cancellable: cancellable,
		looseEqual: looseEqual,
		isArray: isArray,
		hasProto: hasProto,
		inBrowser: inBrowser,
		isIE9: isIE9,
		isAndroid: isAndroid,
		get transitionProp () { return transitionProp; },
		get transitionEndEvent () { return transitionEndEvent; },
		get animationProp () { return animationProp; },
		get animationEndEvent () { return animationEndEvent; },
		nextTick: nextTick,
		query: query,
		inDoc: inDoc,
		getAttr: getAttr,
		getBindAttr: getBindAttr,
		hasBindAttr: hasBindAttr,
		before: before,
		after: after,
		remove: remove,
		prepend: prepend,
		replace: replace,
		on: on$1,
		off: off,
		setClass: setClass,
		addClass: addClass,
		removeClass: removeClass,
		extractContent: extractContent,
		trimNode: trimNode,
		isTemplate: isTemplate,
		createAnchor: createAnchor,
		findRef: findRef,
		mapNodeRange: mapNodeRange,
		removeNodeRange: removeNodeRange,
		mergeOptions: mergeOptions,
		resolveAsset: resolveAsset,
		assertAsset: assertAsset,
		checkComponentAttr: checkComponentAttr,
		initProp: initProp,
		assertProp: assertProp,
		coerceProp: coerceProp,
		commonTagRE: commonTagRE,
		reservedTagRE: reservedTagRE,
		get warn () { return warn; }
	});
	
	var uid = 0;
	
	function initMixin (Vue) {
	
	  /**
	   * The main init sequence. This is called for every
	   * instance, including ones that are created from extended
	   * constructors.
	   *
	   * @param {Object} options - this options object should be
	   *                           the result of merging class
	   *                           options and the options passed
	   *                           in to the constructor.
	   */
	
	  Vue.prototype._init = function (options) {
	
	    options = options || {};
	
	    this.$el = null;
	    this.$parent = options.parent;
	    this.$root = this.$parent ? this.$parent.$root : this;
	    this.$children = [];
	    this.$refs = {}; // child vm references
	    this.$els = {}; // element references
	    this._watchers = []; // all watchers as an array
	    this._directives = []; // all directives
	
	    // a uid
	    this._uid = uid++;
	
	    // a flag to avoid this being observed
	    this._isVue = true;
	
	    // events bookkeeping
	    this._events = {}; // registered callbacks
	    this._eventsCount = {}; // for $broadcast optimization
	
	    // fragment instance properties
	    this._isFragment = false;
	    this._fragment = // @type {DocumentFragment}
	    this._fragmentStart = // @type {Text|Comment}
	    this._fragmentEnd = null; // @type {Text|Comment}
	
	    // lifecycle state
	    this._isCompiled = this._isDestroyed = this._isReady = this._isAttached = this._isBeingDestroyed = false;
	    this._unlinkFn = null;
	
	    // context:
	    // if this is a transcluded component, context
	    // will be the common parent vm of this instance
	    // and its host.
	    this._context = options._context || this.$parent;
	
	    // scope:
	    // if this is inside an inline v-for, the scope
	    // will be the intermediate scope created for this
	    // repeat fragment. this is used for linking props
	    // and container directives.
	    this._scope = options._scope;
	
	    // fragment:
	    // if this instance is compiled inside a Fragment, it
	    // needs to reigster itself as a child of that fragment
	    // for attach/detach to work properly.
	    this._frag = options._frag;
	    if (this._frag) {
	      this._frag.children.push(this);
	    }
	
	    // push self into parent / transclusion host
	    if (this.$parent) {
	      this.$parent.$children.push(this);
	    }
	
	    // merge options.
	    options = this.$options = mergeOptions(this.constructor.options, options, this);
	
	    // set ref
	    this._updateRef();
	
	    // initialize data as empty object.
	    // it will be filled up in _initScope().
	    this._data = {};
	
	    // call init hook
	    this._callHook('init');
	
	    // initialize data observation and scope inheritance.
	    this._initState();
	
	    // setup event system and option events.
	    this._initEvents();
	
	    // call created hook
	    this._callHook('created');
	
	    // if `el` option is passed, start compilation.
	    if (options.el) {
	      this.$mount(options.el);
	    }
	  };
	}
	
	var pathCache = new Cache(1000);
	
	// actions
	var APPEND = 0;
	var PUSH = 1;
	var INC_SUB_PATH_DEPTH = 2;
	var PUSH_SUB_PATH = 3;
	
	// states
	var BEFORE_PATH = 0;
	var IN_PATH = 1;
	var BEFORE_IDENT = 2;
	var IN_IDENT = 3;
	var IN_SUB_PATH = 4;
	var IN_SINGLE_QUOTE = 5;
	var IN_DOUBLE_QUOTE = 6;
	var AFTER_PATH = 7;
	var ERROR = 8;
	
	var pathStateMachine = [];
	
	pathStateMachine[BEFORE_PATH] = {
	  'ws': [BEFORE_PATH],
	  'ident': [IN_IDENT, APPEND],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[IN_PATH] = {
	  'ws': [IN_PATH],
	  '.': [BEFORE_IDENT],
	  '[': [IN_SUB_PATH],
	  'eof': [AFTER_PATH]
	};
	
	pathStateMachine[BEFORE_IDENT] = {
	  'ws': [BEFORE_IDENT],
	  'ident': [IN_IDENT, APPEND]
	};
	
	pathStateMachine[IN_IDENT] = {
	  'ident': [IN_IDENT, APPEND],
	  '0': [IN_IDENT, APPEND],
	  'number': [IN_IDENT, APPEND],
	  'ws': [IN_PATH, PUSH],
	  '.': [BEFORE_IDENT, PUSH],
	  '[': [IN_SUB_PATH, PUSH],
	  'eof': [AFTER_PATH, PUSH]
	};
	
	pathStateMachine[IN_SUB_PATH] = {
	  "'": [IN_SINGLE_QUOTE, APPEND],
	  '"': [IN_DOUBLE_QUOTE, APPEND],
	  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
	  ']': [IN_PATH, PUSH_SUB_PATH],
	  'eof': ERROR,
	  'else': [IN_SUB_PATH, APPEND]
	};
	
	pathStateMachine[IN_SINGLE_QUOTE] = {
	  "'": [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_SINGLE_QUOTE, APPEND]
	};
	
	pathStateMachine[IN_DOUBLE_QUOTE] = {
	  '"': [IN_SUB_PATH, APPEND],
	  'eof': ERROR,
	  'else': [IN_DOUBLE_QUOTE, APPEND]
	};
	
	/**
	 * Determine the type of a character in a keypath.
	 *
	 * @param {Char} ch
	 * @return {String} type
	 */
	
	function getPathCharType(ch) {
	  if (ch === undefined) {
	    return 'eof';
	  }
	
	  var code = ch.charCodeAt(0);
	
	  switch (code) {
	    case 0x5B: // [
	    case 0x5D: // ]
	    case 0x2E: // .
	    case 0x22: // "
	    case 0x27: // '
	    case 0x30:
	      // 0
	      return ch;
	
	    case 0x5F: // _
	    case 0x24:
	      // $
	      return 'ident';
	
	    case 0x20: // Space
	    case 0x09: // Tab
	    case 0x0A: // Newline
	    case 0x0D: // Return
	    case 0xA0: // No-break space
	    case 0xFEFF: // Byte Order Mark
	    case 0x2028: // Line Separator
	    case 0x2029:
	      // Paragraph Separator
	      return 'ws';
	  }
	
	  // a-z, A-Z
	  if (code >= 0x61 && code <= 0x7A || code >= 0x41 && code <= 0x5A) {
	    return 'ident';
	  }
	
	  // 1-9
	  if (code >= 0x31 && code <= 0x39) {
	    return 'number';
	  }
	
	  return 'else';
	}
	
	/**
	 * Format a subPath, return its plain form if it is
	 * a literal string or number. Otherwise prepend the
	 * dynamic indicator (*).
	 *
	 * @param {String} path
	 * @return {String}
	 */
	
	function formatSubPath(path) {
	  var trimmed = path.trim();
	  // invalid leading 0
	  if (path.charAt(0) === '0' && isNaN(path)) {
	    return false;
	  }
	  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed;
	}
	
	/**
	 * Parse a string path into an array of segments
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parse(path) {
	  var keys = [];
	  var index = -1;
	  var mode = BEFORE_PATH;
	  var subPathDepth = 0;
	  var c, newChar, key, type, transition, action, typeMap;
	
	  var actions = [];
	
	  actions[PUSH] = function () {
	    if (key !== undefined) {
	      keys.push(key);
	      key = undefined;
	    }
	  };
	
	  actions[APPEND] = function () {
	    if (key === undefined) {
	      key = newChar;
	    } else {
	      key += newChar;
	    }
	  };
	
	  actions[INC_SUB_PATH_DEPTH] = function () {
	    actions[APPEND]();
	    subPathDepth++;
	  };
	
	  actions[PUSH_SUB_PATH] = function () {
	    if (subPathDepth > 0) {
	      subPathDepth--;
	      mode = IN_SUB_PATH;
	      actions[APPEND]();
	    } else {
	      subPathDepth = 0;
	      key = formatSubPath(key);
	      if (key === false) {
	        return false;
	      } else {
	        actions[PUSH]();
	      }
	    }
	  };
	
	  function maybeUnescapeQuote() {
	    var nextChar = path[index + 1];
	    if (mode === IN_SINGLE_QUOTE && nextChar === "'" || mode === IN_DOUBLE_QUOTE && nextChar === '"') {
	      index++;
	      newChar = '\\' + nextChar;
	      actions[APPEND]();
	      return true;
	    }
	  }
	
	  while (mode != null) {
	    index++;
	    c = path[index];
	
	    if (c === '\\' && maybeUnescapeQuote()) {
	      continue;
	    }
	
	    type = getPathCharType(c);
	    typeMap = pathStateMachine[mode];
	    transition = typeMap[type] || typeMap['else'] || ERROR;
	
	    if (transition === ERROR) {
	      return; // parse error
	    }
	
	    mode = transition[0];
	    action = actions[transition[1]];
	    if (action) {
	      newChar = transition[2];
	      newChar = newChar === undefined ? c : newChar;
	      if (action() === false) {
	        return;
	      }
	    }
	
	    if (mode === AFTER_PATH) {
	      keys.raw = path;
	      return keys;
	    }
	  }
	}
	
	/**
	 * External parse that check for a cache hit first
	 *
	 * @param {String} path
	 * @return {Array|undefined}
	 */
	
	function parsePath(path) {
	  var hit = pathCache.get(path);
	  if (!hit) {
	    hit = parse(path);
	    if (hit) {
	      pathCache.put(path, hit);
	    }
	  }
	  return hit;
	}
	
	/**
	 * Get from an object from a path string
	 *
	 * @param {Object} obj
	 * @param {String} path
	 */
	
	function getPath(obj, path) {
	  return parseExpression(path).get(obj);
	}
	
	/**
	 * Warn against setting non-existent root path on a vm.
	 */
	
	var warnNonExistent;
	if (process.env.NODE_ENV !== 'production') {
	  warnNonExistent = function (path) {
	    warn('You are setting a non-existent path "' + path.raw + '" ' + 'on a vm instance. Consider pre-initializing the property ' + 'with the "data" option for more reliable reactivity ' + 'and better performance.');
	  };
	}
	
	/**
	 * Set on an object from a path
	 *
	 * @param {Object} obj
	 * @param {String | Array} path
	 * @param {*} val
	 */
	
	function setPath(obj, path, val) {
	  var original = obj;
	  if (typeof path === 'string') {
	    path = parse(path);
	  }
	  if (!path || !isObject(obj)) {
	    return false;
	  }
	  var last, key;
	  for (var i = 0, l = path.length; i < l; i++) {
	    last = obj;
	    key = path[i];
	    if (key.charAt(0) === '*') {
	      key = parseExpression(key.slice(1)).get.call(original, original);
	    }
	    if (i < l - 1) {
	      obj = obj[key];
	      if (!isObject(obj)) {
	        obj = {};
	        if (process.env.NODE_ENV !== 'production' && last._isVue) {
	          warnNonExistent(path);
	        }
	        set(last, key, obj);
	      }
	    } else {
	      if (isArray(obj)) {
	        obj.$set(key, val);
	      } else if (key in obj) {
	        obj[key] = val;
	      } else {
	        if (process.env.NODE_ENV !== 'production' && obj._isVue) {
	          warnNonExistent(path);
	        }
	        set(obj, key, val);
	      }
	    }
	  }
	  return true;
	}
	
	var path = Object.freeze({
	  parsePath: parsePath,
	  getPath: getPath,
	  setPath: setPath
	});
	
	var expressionCache = new Cache(1000);
	
	var allowedKeywords = 'Math,Date,this,true,false,null,undefined,Infinity,NaN,' + 'isNaN,isFinite,decodeURI,decodeURIComponent,encodeURI,' + 'encodeURIComponent,parseInt,parseFloat';
	var allowedKeywordsRE = new RegExp('^(' + allowedKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	// keywords that don't make sense inside expressions
	var improperKeywords = 'break,case,class,catch,const,continue,debugger,default,' + 'delete,do,else,export,extends,finally,for,function,if,' + 'import,in,instanceof,let,return,super,switch,throw,try,' + 'var,while,with,yield,enum,await,implements,package,' + 'proctected,static,interface,private,public';
	var improperKeywordsRE = new RegExp('^(' + improperKeywords.replace(/,/g, '\\b|') + '\\b)');
	
	var wsRE = /\s/g;
	var newlineRE = /\n/g;
	var saveRE = /[\{,]\s*[\w\$_]+\s*:|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|new |typeof |void /g;
	var restoreRE = /"(\d+)"/g;
	var pathTestRE = /^[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?'\]|\[".*?"\]|\[\d+\]|\[[A-Za-z_$][\w$]*\])*$/;
	var identRE = /[^\w$\.](?:[A-Za-z_$][\w$]*)/g;
	var booleanLiteralRE = /^(?:true|false)$/;
	
	/**
	 * Save / Rewrite / Restore
	 *
	 * When rewriting paths found in an expression, it is
	 * possible for the same letter sequences to be found in
	 * strings and Object literal property keys. Therefore we
	 * remove and store these parts in a temporary array, and
	 * restore them after the path rewrite.
	 */
	
	var saved = [];
	
	/**
	 * Save replacer
	 *
	 * The save regex can match two possible cases:
	 * 1. An opening object literal
	 * 2. A string
	 * If matched as a plain string, we need to escape its
	 * newlines, since the string needs to be preserved when
	 * generating the function body.
	 *
	 * @param {String} str
	 * @param {String} isString - str if matched as a string
	 * @return {String} - placeholder with index
	 */
	
	function save(str, isString) {
	  var i = saved.length;
	  saved[i] = isString ? str.replace(newlineRE, '\\n') : str;
	  return '"' + i + '"';
	}
	
	/**
	 * Path rewrite replacer
	 *
	 * @param {String} raw
	 * @return {String}
	 */
	
	function rewrite(raw) {
	  var c = raw.charAt(0);
	  var path = raw.slice(1);
	  if (allowedKeywordsRE.test(path)) {
	    return raw;
	  } else {
	    path = path.indexOf('"') > -1 ? path.replace(restoreRE, restore) : path;
	    return c + 'scope.' + path;
	  }
	}
	
	/**
	 * Restore replacer
	 *
	 * @param {String} str
	 * @param {String} i - matched save index
	 * @return {String}
	 */
	
	function restore(str, i) {
	  return saved[i];
	}
	
	/**
	 * Rewrite an expression, prefixing all path accessors with
	 * `scope.` and generate getter/setter functions.
	 *
	 * @param {String} exp
	 * @return {Function}
	 */
	
	function compileGetter(exp) {
	  if (improperKeywordsRE.test(exp)) {
	    process.env.NODE_ENV !== 'production' && warn('Avoid using reserved keywords in expression: ' + exp);
	  }
	  // reset state
	  saved.length = 0;
	  // save strings and object literal keys
	  var body = exp.replace(saveRE, save).replace(wsRE, '');
	  // rewrite all paths
	  // pad 1 space here becaue the regex matches 1 extra char
	  body = (' ' + body).replace(identRE, rewrite).replace(restoreRE, restore);
	  return makeGetterFn(body);
	}
	
	/**
	 * Build a getter function. Requires eval.
	 *
	 * We isolate the try/catch so it doesn't affect the
	 * optimization of the parse function when it is not called.
	 *
	 * @param {String} body
	 * @return {Function|undefined}
	 */
	
	function makeGetterFn(body) {
	  try {
	    return new Function('scope', 'return ' + body + ';');
	  } catch (e) {
	    process.env.NODE_ENV !== 'production' && warn('Invalid expression. ' + 'Generated function body: ' + body);
	  }
	}
	
	/**
	 * Compile a setter function for the expression.
	 *
	 * @param {String} exp
	 * @return {Function|undefined}
	 */
	
	function compileSetter(exp) {
	  var path = parsePath(exp);
	  if (path) {
	    return function (scope, val) {
	      setPath(scope, path, val);
	    };
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid setter expression: ' + exp);
	  }
	}
	
	/**
	 * Parse an expression into re-written getter/setters.
	 *
	 * @param {String} exp
	 * @param {Boolean} needSet
	 * @return {Function}
	 */
	
	function parseExpression(exp, needSet) {
	  exp = exp.trim();
	  // try cache
	  var hit = expressionCache.get(exp);
	  if (hit) {
	    if (needSet && !hit.set) {
	      hit.set = compileSetter(hit.exp);
	    }
	    return hit;
	  }
	  var res = { exp: exp };
	  res.get = isSimplePath(exp) && exp.indexOf('[') < 0
	  // optimized super simple getter
	  ? makeGetterFn('scope.' + exp)
	  // dynamic getter
	  : compileGetter(exp);
	  if (needSet) {
	    res.set = compileSetter(exp);
	  }
	  expressionCache.put(exp, res);
	  return res;
	}
	
	/**
	 * Check if an expression is a simple path.
	 *
	 * @param {String} exp
	 * @return {Boolean}
	 */
	
	function isSimplePath(exp) {
	  return pathTestRE.test(exp) &&
	  // don't treat true/false as paths
	  !booleanLiteralRE.test(exp) &&
	  // Math constants e.g. Math.PI, Math.E etc.
	  exp.slice(0, 5) !== 'Math.';
	}
	
	var expression = Object.freeze({
	  parseExpression: parseExpression,
	  isSimplePath: isSimplePath
	});
	
	// we have two separate queues: one for directive updates
	// and one for user watcher registered via $watch().
	// we want to guarantee directive updates to be called
	// before user watchers so that when user watchers are
	// triggered, the DOM would have already been in updated
	// state.
	var queue = [];
	var userQueue = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var internalQueueDepleted = false;
	
	/**
	 * Reset the batcher's state.
	 */
	
	function resetBatcherState() {
	  queue = [];
	  userQueue = [];
	  has = {};
	  circular = {};
	  waiting = internalQueueDepleted = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	
	function flushBatcherQueue() {
	  runBatcherQueue(queue);
	  internalQueueDepleted = true;
	  runBatcherQueue(userQueue);
	  // dev tool hook
	  /* istanbul ignore if */
	  if (process.env.NODE_ENV !== 'production') {
	    if (inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	      window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('flush');
	    }
	  }
	  resetBatcherState();
	}
	
	/**
	 * Run the watchers in a single queue.
	 *
	 * @param {Array} queue
	 */
	
	function runBatcherQueue(queue) {
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (var i = 0; i < queue.length; i++) {
	    var watcher = queue[i];
	    var id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if (process.env.NODE_ENV !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > config._maxUpdateCount) {
	        queue.splice(has[id], 1);
	        warn('You may have an infinite update loop for watcher ' + 'with expression: ' + watcher.expression);
	      }
	    }
	  }
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 *
	 * @param {Watcher} watcher
	 *   properties:
	 *   - {Number} id
	 *   - {Function} run
	 */
	
	function pushWatcher(watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    // if an internal watcher is pushed, but the internal
	    // queue is already depleted, we run it immediately.
	    if (internalQueueDepleted && !watcher.user) {
	      watcher.run();
	      return;
	    }
	    // push watcher into appropriate queue
	    var q = watcher.user ? userQueue : queue;
	    has[id] = q.length;
	    q.push(watcher);
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushBatcherQueue);
	    }
	  }
	}
	
	var uid$2 = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 *
	 * @param {Vue} vm
	 * @param {String} expression
	 * @param {Function} cb
	 * @param {Object} options
	 *                 - {Array} filters
	 *                 - {Boolean} twoWay
	 *                 - {Boolean} deep
	 *                 - {Boolean} user
	 *                 - {Boolean} sync
	 *                 - {Boolean} lazy
	 *                 - {Function} [preProcess]
	 *                 - {Function} [postProcess]
	 * @constructor
	 */
	function Watcher(vm, expOrFn, cb, options) {
	  // mix in options
	  if (options) {
	    extend(this, options);
	  }
	  var isFn = typeof expOrFn === 'function';
	  this.vm = vm;
	  vm._watchers.push(this);
	  this.expression = isFn ? expOrFn.toString() : expOrFn;
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = Object.create(null);
	  this.newDeps = null;
	  this.prevError = null; // for async error stacks
	  // parse expression for getter/setter
	  if (isFn) {
	    this.getter = expOrFn;
	    this.setter = undefined;
	  } else {
	    var res = parseExpression(expOrFn, this.twoWay);
	    this.getter = res.get;
	    this.setter = res.set;
	  }
	  this.value = this.lazy ? undefined : this.get();
	  // state for avoiding false triggers for deep and Array
	  // watchers during vm._digest()
	  this.queued = this.shallow = false;
	}
	
	/**
	 * Add a dependency to this directive.
	 *
	 * @param {Dep} dep
	 */
	
	Watcher.prototype.addDep = function (dep) {
	  var id = dep.id;
	  if (!this.newDeps[id]) {
	    this.newDeps[id] = dep;
	    if (!this.deps[id]) {
	      this.deps[id] = dep;
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	
	Watcher.prototype.get = function () {
	  this.beforeGet();
	  var scope = this.scope || this.vm;
	  var value;
	  try {
	    value = this.getter.call(scope, scope);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating expression "' + this.expression + '". ' + (config.debug ? '' : 'Turn on debug mode to see stack trace.'), e);
	    }
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  if (this.preProcess) {
	    value = this.preProcess(value);
	  }
	  if (this.filters) {
	    value = scope._applyFilters(value, null, this.filters, false);
	  }
	  if (this.postProcess) {
	    value = this.postProcess(value);
	  }
	  this.afterGet();
	  return value;
	};
	
	/**
	 * Set the corresponding value with the setter.
	 *
	 * @param {*} value
	 */
	
	Watcher.prototype.set = function (value) {
	  var scope = this.scope || this.vm;
	  if (this.filters) {
	    value = scope._applyFilters(value, this.value, this.filters, true);
	  }
	  try {
	    this.setter.call(scope, scope, value);
	  } catch (e) {
	    if (process.env.NODE_ENV !== 'production' && config.warnExpressionErrors) {
	      warn('Error when evaluating setter "' + this.expression + '"', e);
	    }
	  }
	  // two-way sync for v-for alias
	  var forContext = scope.$forContext;
	  if (forContext && forContext.alias === this.expression) {
	    if (forContext.filters) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using two-way binding on ' + 'a v-for alias (' + this.expression + '), and the ' + 'v-for has filters. This will not work properly. ' + 'Either remove the filters or use an array of ' + 'objects and bind to object properties instead.');
	      return;
	    }
	    forContext._withLock(function () {
	      if (scope.$key) {
	        // original is an object
	        forContext.rawValue[scope.$key] = value;
	      } else {
	        forContext.rawValue.$set(scope.$index, value);
	      }
	    });
	  }
	};
	
	/**
	 * Prepare for dependency collection.
	 */
	
	Watcher.prototype.beforeGet = function () {
	  Dep.target = this;
	  this.newDeps = Object.create(null);
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	
	Watcher.prototype.afterGet = function () {
	  Dep.target = null;
	  var ids = Object.keys(this.deps);
	  var i = ids.length;
	  while (i--) {
	    var id = ids[i];
	    if (!this.newDeps[id]) {
	      this.deps[id].removeSub(this);
	    }
	  }
	  this.deps = this.newDeps;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 *
	 * @param {Boolean} shallow
	 */
	
	Watcher.prototype.update = function (shallow) {
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync || !config.async) {
	    this.run();
	  } else {
	    // if queued, only overwrite shallow with non-shallow,
	    // but not the other way around.
	    this.shallow = this.queued ? shallow ? this.shallow : false : !!shallow;
	    this.queued = true;
	    // record before-push error stack in debug mode
	    /* istanbul ignore if */
	    if (process.env.NODE_ENV !== 'production' && config.debug) {
	      this.prevError = new Error('[vue] async stack trace');
	    }
	    pushWatcher(this);
	  }
	};
	
	/**
	 * Batcher job interface.
	 * Will be called by the batcher.
	 */
	
	Watcher.prototype.run = function () {
	  if (this.active) {
	    var value = this.get();
	    if (value !== this.value ||
	    // Deep watchers and watchers on Object/Arrays should fire even
	    // when the value is the same, because the value may
	    // have mutated; but only do so if this is a
	    // non-shallow update (caused by a vm digest).
	    (isObject(value) || this.deep) && !this.shallow) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      // in debug + async mode, when a watcher callbacks
	      // throws, we also throw the saved before-push error
	      // so the full cross-tick stack trace is available.
	      var prevError = this.prevError;
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && config.debug && prevError) {
	        this.prevError = null;
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          nextTick(function () {
	            throw prevError;
	          }, 0);
	          throw e;
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	    this.queued = this.shallow = false;
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	
	Watcher.prototype.evaluate = function () {
	  // avoid overwriting another watcher that is being
	  // collected.
	  var current = Dep.target;
	  this.value = this.get();
	  this.dirty = false;
	  Dep.target = current;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	
	Watcher.prototype.depend = function () {
	  var depIds = Object.keys(this.deps);
	  var i = depIds.length;
	  while (i--) {
	    this.deps[depIds[i]].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subcriber list.
	 */
	
	Watcher.prototype.teardown = function () {
	  if (this.active) {
	    // remove self from vm's watcher list
	    // we can skip this if the vm if being destroyed
	    // which can improve teardown performance.
	    if (!this.vm._isBeingDestroyed) {
	      this.vm._watchers.$remove(this);
	    }
	    var depIds = Object.keys(this.deps);
	    var i = depIds.length;
	    while (i--) {
	      this.deps[depIds[i]].removeSub(this);
	    }
	    this.active = false;
	    this.vm = this.cb = this.value = null;
	  }
	};
	
	/**
	 * Recrusively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 *
	 * @param {*} val
	 */
	
	function traverse(val) {
	  var i, keys;
	  if (isArray(val)) {
	    i = val.length;
	    while (i--) traverse(val[i]);
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) traverse(val[keys[i]]);
	  }
	}
	
	var cloak = {
	  bind: function bind() {
	    var el = this.el;
	    this.vm.$once('pre-hook:compiled', function () {
	      el.removeAttribute('v-cloak');
	    });
	  }
	};
	
	var ref = {
	  bind: function bind() {
	    process.env.NODE_ENV !== 'production' && warn('v-ref:' + this.arg + ' must be used on a child ' + 'component. Found on <' + this.el.tagName.toLowerCase() + '>.');
	  }
	};
	
	var ON = 700;
	var MODEL = 800;
	var BIND = 850;
	var TRANSITION = 1100;
	var EL = 1500;
	var COMPONENT = 1500;
	var PARTIAL = 1750;
	var SLOT = 1750;
	var FOR = 2000;
	var IF = 2000;
	
	var el = {
	
	  priority: EL,
	
	  bind: function bind() {
	    /* istanbul ignore if */
	    if (!this.arg) {
	      return;
	    }
	    var id = this.id = camelize(this.arg);
	    var refs = (this._scope || this.vm).$els;
	    if (hasOwn(refs, id)) {
	      refs[id] = this.el;
	    } else {
	      defineReactive(refs, id, this.el);
	    }
	  },
	
	  unbind: function unbind() {
	    var refs = (this._scope || this.vm).$els;
	    if (refs[this.id] === this.el) {
	      refs[this.id] = null;
	    }
	  }
	};
	
	var prefixes = ['-webkit-', '-moz-', '-ms-'];
	var camelPrefixes = ['Webkit', 'Moz', 'ms'];
	var importantRE = /!important;?$/;
	var propCache = Object.create(null);
	
	var testEl = null;
	
	var style = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (typeof value === 'string') {
	      this.el.style.cssText = value;
	    } else if (isArray(value)) {
	      this.handleObject(value.reduce(extend, {}));
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  handleObject: function handleObject(value) {
	    // cache object styles so that only changed props
	    // are actually updated.
	    var cache = this.cache || (this.cache = {});
	    var name, val;
	    for (name in cache) {
	      if (!(name in value)) {
	        this.handleSingle(name, null);
	        delete cache[name];
	      }
	    }
	    for (name in value) {
	      val = value[name];
	      if (val !== cache[name]) {
	        cache[name] = val;
	        this.handleSingle(name, val);
	      }
	    }
	  },
	
	  handleSingle: function handleSingle(prop, value) {
	    prop = normalize(prop);
	    if (!prop) return; // unsupported prop
	    // cast possible numbers/booleans into strings
	    if (value != null) value += '';
	    if (value) {
	      var isImportant = importantRE.test(value) ? 'important' : '';
	      if (isImportant) {
	        value = value.replace(importantRE, '').trim();
	      }
	      this.el.style.setProperty(prop, value, isImportant);
	    } else {
	      this.el.style.removeProperty(prop);
	    }
	  }
	
	};
	
	/**
	 * Normalize a CSS property name.
	 * - cache result
	 * - auto prefix
	 * - camelCase -> dash-case
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function normalize(prop) {
	  if (propCache[prop]) {
	    return propCache[prop];
	  }
	  var res = prefix(prop);
	  propCache[prop] = propCache[res] = res;
	  return res;
	}
	
	/**
	 * Auto detect the appropriate prefix for a CSS property.
	 * https://gist.github.com/paulirish/523692
	 *
	 * @param {String} prop
	 * @return {String}
	 */
	
	function prefix(prop) {
	  prop = hyphenate(prop);
	  var camel = camelize(prop);
	  var upper = camel.charAt(0).toUpperCase() + camel.slice(1);
	  if (!testEl) {
	    testEl = document.createElement('div');
	  }
	  if (camel in testEl.style) {
	    return prop;
	  }
	  var i = prefixes.length;
	  var prefixed;
	  while (i--) {
	    prefixed = camelPrefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixes[i] + prop;
	    }
	  }
	}
	
	// xlink
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	var xlinkRE = /^xlink:/;
	
	// check for attributes that prohibit interpolations
	var disallowedInterpAttrRE = /^v-|^:|^@|^(is|transition|transition-mode|debounce|track-by|stagger|enter-stagger|leave-stagger)$/;
	
	// these attributes should also set their corresponding properties
	// because they only affect the initial state of the element
	var attrWithPropsRE = /^(value|checked|selected|muted)$/;
	
	// these attributes should set a hidden property for
	// binding v-model to object values
	var modelProps = {
	  value: '_value',
	  'true-value': '_trueValue',
	  'false-value': '_falseValue'
	};
	
	var bind = {
	
	  priority: BIND,
	
	  bind: function bind() {
	    var attr = this.arg;
	    var tag = this.el.tagName;
	    // should be deep watch on object mode
	    if (!attr) {
	      this.deep = true;
	    }
	    // handle interpolation bindings
	    if (this.descriptor.interp) {
	      // only allow binding on native attributes
	      if (disallowedInterpAttrRE.test(attr) || attr === 'name' && (tag === 'PARTIAL' || tag === 'SLOT')) {
	        process.env.NODE_ENV !== 'production' && warn(attr + '="' + this.descriptor.raw + '": ' + 'attribute interpolation is not allowed in Vue.js ' + 'directives and special attributes.');
	        this.el.removeAttribute(attr);
	        this.invalid = true;
	      }
	
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production') {
	        var raw = attr + '="' + this.descriptor.raw + '": ';
	        // warn src
	        if (attr === 'src') {
	          warn(raw + 'interpolation in "src" attribute will cause ' + 'a 404 request. Use v-bind:src instead.');
	        }
	
	        // warn style
	        if (attr === 'style') {
	          warn(raw + 'interpolation in "style" attribute will cause ' + 'the attribute to be discarded in Internet Explorer. ' + 'Use v-bind:style instead.');
	        }
	      }
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) {
	      return;
	    }
	    var attr = this.arg;
	    if (this.arg) {
	      this.handleSingle(attr, value);
	    } else {
	      this.handleObject(value || {});
	    }
	  },
	
	  // share object handler with v-bind:class
	  handleObject: style.handleObject,
	
	  handleSingle: function handleSingle(attr, value) {
	    var el = this.el;
	    var interp = this.descriptor.interp;
	    if (!interp && attrWithPropsRE.test(attr) && attr in el) {
	      el[attr] = attr === 'value' ? value == null // IE9 will set input.value to "null" for null...
	      ? '' : value : value;
	    }
	    // set model props
	    var modelProp = modelProps[attr];
	    if (!interp && modelProp) {
	      el[modelProp] = value;
	      // update v-model if present
	      var model = el.__v_model;
	      if (model) {
	        model.listener();
	      }
	    }
	    // do not set value attribute for textarea
	    if (attr === 'value' && el.tagName === 'TEXTAREA') {
	      el.removeAttribute(attr);
	      return;
	    }
	    // update attribute
	    if (value != null && value !== false) {
	      if (attr === 'class') {
	        // handle edge case #1960:
	        // class interpolation should not overwrite Vue transition class
	        if (el.__v_trans) {
	          value += ' ' + el.__v_trans.id + '-transition';
	        }
	        setClass(el, value);
	      } else if (xlinkRE.test(attr)) {
	        el.setAttributeNS(xlinkNS, attr, value);
	      } else {
	        el.setAttribute(attr, value);
	      }
	    } else {
	      el.removeAttribute(attr);
	    }
	  }
	};
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  'delete': 46,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40
	};
	
	function keyFilter(handler, keys) {
	  var codes = keys.map(function (key) {
	    var charCode = key.charCodeAt(0);
	    if (charCode > 47 && charCode < 58) {
	      return parseInt(key, 10);
	    }
	    if (key.length === 1) {
	      charCode = key.toUpperCase().charCodeAt(0);
	      if (charCode > 64 && charCode < 91) {
	        return charCode;
	      }
	    }
	    return keyCodes[key];
	  });
	  return function keyHandler(e) {
	    if (codes.indexOf(e.keyCode) > -1) {
	      return handler.call(this, e);
	    }
	  };
	}
	
	function stopFilter(handler) {
	  return function stopHandler(e) {
	    e.stopPropagation();
	    return handler.call(this, e);
	  };
	}
	
	function preventFilter(handler) {
	  return function preventHandler(e) {
	    e.preventDefault();
	    return handler.call(this, e);
	  };
	}
	
	var on = {
	
	  acceptStatement: true,
	  priority: ON,
	
	  bind: function bind() {
	    // deal with iframes
	    if (this.el.tagName === 'IFRAME' && this.arg !== 'load') {
	      var self = this;
	      this.iframeBind = function () {
	        on$1(self.el.contentWindow, self.arg, self.handler);
	      };
	      this.on('load', this.iframeBind);
	    }
	  },
	
	  update: function update(handler) {
	    // stub a noop for v-on with no value,
	    // e.g. @mousedown.prevent
	    if (!this.descriptor.raw) {
	      handler = function () {};
	    }
	
	    if (typeof handler !== 'function') {
	      process.env.NODE_ENV !== 'production' && warn('v-on:' + this.arg + '="' + this.expression + '" expects a function value, ' + 'got ' + handler);
	      return;
	    }
	
	    // apply modifiers
	    if (this.modifiers.stop) {
	      handler = stopFilter(handler);
	    }
	    if (this.modifiers.prevent) {
	      handler = preventFilter(handler);
	    }
	    // key filter
	    var keys = Object.keys(this.modifiers).filter(function (key) {
	      return key !== 'stop' && key !== 'prevent';
	    });
	    if (keys.length) {
	      handler = keyFilter(handler, keys);
	    }
	
	    this.reset();
	    this.handler = handler;
	
	    if (this.iframeBind) {
	      this.iframeBind();
	    } else {
	      on$1(this.el, this.arg, this.handler);
	    }
	  },
	
	  reset: function reset() {
	    var el = this.iframeBind ? this.el.contentWindow : this.el;
	    if (this.handler) {
	      off(el, this.arg, this.handler);
	    }
	  },
	
	  unbind: function unbind() {
	    this.reset();
	  }
	};
	
	var checkbox = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      return el.hasOwnProperty('_value') ? el._value : self.params.number ? toNumber(el.value) : el.value;
	    };
	
	    function getBooleanValue() {
	      var val = el.checked;
	      if (val && el.hasOwnProperty('_trueValue')) {
	        return el._trueValue;
	      }
	      if (!val && el.hasOwnProperty('_falseValue')) {
	        return el._falseValue;
	      }
	      return val;
	    }
	
	    this.listener = function () {
	      var model = self._watcher.value;
	      if (isArray(model)) {
	        var val = self.getValue();
	        if (el.checked) {
	          if (indexOf(model, val) < 0) {
	            model.push(val);
	          }
	        } else {
	          model.$remove(val);
	        }
	      } else {
	        self.set(getBooleanValue());
	      }
	    };
	
	    this.on('change', this.listener);
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    if (isArray(value)) {
	      el.checked = indexOf(value, this.getValue()) > -1;
	    } else {
	      if (el.hasOwnProperty('_trueValue')) {
	        el.checked = looseEqual(value, el._trueValue);
	      } else {
	        el.checked = !!value;
	      }
	    }
	  }
	};
	
	var select = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    // method to force update DOM using latest value.
	    this.forceUpdate = function () {
	      if (self._watcher) {
	        self.update(self._watcher.get());
	      }
	    };
	
	    // check if this is a multiple select
	    var multiple = this.multiple = el.hasAttribute('multiple');
	
	    // attach listener
	    this.listener = function () {
	      var value = getValue(el, multiple);
	      value = self.params.number ? isArray(value) ? value.map(toNumber) : toNumber(value) : value;
	      self.set(value);
	    };
	    this.on('change', this.listener);
	
	    // if has initial value, set afterBind
	    var initValue = getValue(el, multiple, true);
	    if (multiple && initValue.length || !multiple && initValue !== null) {
	      this.afterBind = this.listener;
	    }
	
	    // All major browsers except Firefox resets
	    // selectedIndex with value -1 to 0 when the element
	    // is appended to a new parent, therefore we have to
	    // force a DOM update whenever that happens...
	    this.vm.$on('hook:attached', this.forceUpdate);
	  },
	
	  update: function update(value) {
	    var el = this.el;
	    el.selectedIndex = -1;
	    var multi = this.multiple && isArray(value);
	    var options = el.options;
	    var i = options.length;
	    var op, val;
	    while (i--) {
	      op = options[i];
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      /* eslint-disable eqeqeq */
	      op.selected = multi ? indexOf$1(value, val) > -1 : looseEqual(value, val);
	      /* eslint-enable eqeqeq */
	    }
	  },
	
	  unbind: function unbind() {
	    /* istanbul ignore next */
	    this.vm.$off('hook:attached', this.forceUpdate);
	  }
	};
	
	/**
	 * Get select value
	 *
	 * @param {SelectElement} el
	 * @param {Boolean} multi
	 * @param {Boolean} init
	 * @return {Array|*}
	 */
	
	function getValue(el, multi, init) {
	  var res = multi ? [] : null;
	  var op, val, selected;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    op = el.options[i];
	    selected = init ? op.hasAttribute('selected') : op.selected;
	    if (selected) {
	      val = op.hasOwnProperty('_value') ? op._value : op.value;
	      if (multi) {
	        res.push(val);
	      } else {
	        return val;
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Native Array.indexOf uses strict equal, but in this
	 * case we need to match string/numbers with custom equal.
	 *
	 * @param {Array} arr
	 * @param {*} val
	 */
	
	function indexOf$1(arr, val) {
	  var i = arr.length;
	  while (i--) {
	    if (looseEqual(arr[i], val)) {
	      return i;
	    }
	  }
	  return -1;
	}
	
	var radio = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	
	    this.getValue = function () {
	      // value overwrite via v-bind:value
	      if (el.hasOwnProperty('_value')) {
	        return el._value;
	      }
	      var val = el.value;
	      if (self.params.number) {
	        val = toNumber(val);
	      }
	      return val;
	    };
	
	    this.listener = function () {
	      self.set(self.getValue());
	    };
	    this.on('change', this.listener);
	
	    if (el.hasAttribute('checked')) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    this.el.checked = looseEqual(value, this.getValue());
	  }
	};
	
	var text$2 = {
	
	  bind: function bind() {
	    var self = this;
	    var el = this.el;
	    var isRange = el.type === 'range';
	    var lazy = this.params.lazy;
	    var number = this.params.number;
	    var debounce = this.params.debounce;
	
	    // handle composition events.
	    //   http://blog.evanyou.me/2014/01/03/composition-event/
	    // skip this for Android because it handles composition
	    // events quite differently. Android doesn't trigger
	    // composition events for language input methods e.g.
	    // Chinese, but instead triggers them for spelling
	    // suggestions... (see Discussion/#162)
	    var composing = false;
	    if (!isAndroid && !isRange) {
	      this.on('compositionstart', function () {
	        composing = true;
	      });
	      this.on('compositionend', function () {
	        composing = false;
	        // in IE11 the "compositionend" event fires AFTER
	        // the "input" event, so the input handler is blocked
	        // at the end... have to call it here.
	        //
	        // #1327: in lazy mode this is unecessary.
	        if (!lazy) {
	          self.listener();
	        }
	      });
	    }
	
	    // prevent messing with the input when user is typing,
	    // and force update on blur.
	    this.focused = false;
	    if (!isRange) {
	      this.on('focus', function () {
	        self.focused = true;
	      });
	      this.on('blur', function () {
	        self.focused = false;
	        // do not sync value after fragment removal (#2017)
	        if (!self._frag || self._frag.inserted) {
	          self.rawListener();
	        }
	      });
	    }
	
	    // Now attach the main listener
	    this.listener = this.rawListener = function () {
	      if (composing || !self._bound) {
	        return;
	      }
	      var val = number || isRange ? toNumber(el.value) : el.value;
	      self.set(val);
	      // force update on next tick to avoid lock & same value
	      // also only update when user is not typing
	      nextTick(function () {
	        if (self._bound && !self.focused) {
	          self.update(self._watcher.value);
	        }
	      });
	    };
	
	    // apply debounce
	    if (debounce) {
	      this.listener = _debounce(this.listener, debounce);
	    }
	
	    // Support jQuery events, since jQuery.trigger() doesn't
	    // trigger native events in some cases and some plugins
	    // rely on $.trigger()
	    //
	    // We want to make sure if a listener is attached using
	    // jQuery, it is also removed with jQuery, that's why
	    // we do the check for each directive instance and
	    // store that check result on itself. This also allows
	    // easier test coverage control by unsetting the global
	    // jQuery variable in tests.
	    this.hasjQuery = typeof jQuery === 'function';
	    if (this.hasjQuery) {
	      jQuery(el).on('change', this.listener);
	      if (!lazy) {
	        jQuery(el).on('input', this.listener);
	      }
	    } else {
	      this.on('change', this.listener);
	      if (!lazy) {
	        this.on('input', this.listener);
	      }
	    }
	
	    // IE9 doesn't fire input event on backspace/del/cut
	    if (!lazy && isIE9) {
	      this.on('cut', function () {
	        nextTick(self.listener);
	      });
	      this.on('keyup', function (e) {
	        if (e.keyCode === 46 || e.keyCode === 8) {
	          self.listener();
	        }
	      });
	    }
	
	    // set initial value if present
	    if (el.hasAttribute('value') || el.tagName === 'TEXTAREA' && el.value.trim()) {
	      this.afterBind = this.listener;
	    }
	  },
	
	  update: function update(value) {
	    this.el.value = _toString(value);
	  },
	
	  unbind: function unbind() {
	    var el = this.el;
	    if (this.hasjQuery) {
	      jQuery(el).off('change', this.listener);
	      jQuery(el).off('input', this.listener);
	    }
	  }
	};
	
	var handlers = {
	  text: text$2,
	  radio: radio,
	  select: select,
	  checkbox: checkbox
	};
	
	var model = {
	
	  priority: MODEL,
	  twoWay: true,
	  handlers: handlers,
	  params: ['lazy', 'number', 'debounce'],
	
	  /**
	   * Possible elements:
	   *   <select>
	   *   <textarea>
	   *   <input type="*">
	   *     - text
	   *     - checkbox
	   *     - radio
	   *     - number
	   */
	
	  bind: function bind() {
	    // friendly warning...
	    this.checkFilters();
	    if (this.hasRead && !this.hasWrite) {
	      process.env.NODE_ENV !== 'production' && warn('It seems you are using a read-only filter with ' + 'v-model. You might want to use a two-way filter ' + 'to ensure correct behavior.');
	    }
	    var el = this.el;
	    var tag = el.tagName;
	    var handler;
	    if (tag === 'INPUT') {
	      handler = handlers[el.type] || handlers.text;
	    } else if (tag === 'SELECT') {
	      handler = handlers.select;
	    } else if (tag === 'TEXTAREA') {
	      handler = handlers.text;
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-model does not support element type: ' + tag);
	      return;
	    }
	    el.__v_model = this;
	    handler.bind.call(this);
	    this.update = handler.update;
	    this._unbind = handler.unbind;
	  },
	
	  /**
	   * Check read/write filter stats.
	   */
	
	  checkFilters: function checkFilters() {
	    var filters = this.filters;
	    if (!filters) return;
	    var i = filters.length;
	    while (i--) {
	      var filter = resolveAsset(this.vm.$options, 'filters', filters[i].name);
	      if (typeof filter === 'function' || filter.read) {
	        this.hasRead = true;
	      }
	      if (filter.write) {
	        this.hasWrite = true;
	      }
	    }
	  },
	
	  unbind: function unbind() {
	    this.el.__v_model = null;
	    this._unbind && this._unbind();
	  }
	};
	
	var show = {
	
	  bind: function bind() {
	    // check else block
	    var next = this.el.nextElementSibling;
	    if (next && getAttr(next, 'v-else') !== null) {
	      this.elseEl = next;
	    }
	  },
	
	  update: function update(value) {
	    this.apply(this.el, value);
	    if (this.elseEl) {
	      this.apply(this.elseEl, !value);
	    }
	  },
	
	  apply: function apply(el, value) {
	    if (inDoc(el)) {
	      applyTransition(el, value ? 1 : -1, toggle, this.vm);
	    } else {
	      toggle();
	    }
	    function toggle() {
	      el.style.display = value ? '' : 'none';
	    }
	  }
	};
	
	var templateCache = new Cache(1000);
	var idSelectorCache = new Cache(1000);
	
	var map = {
	  efault: [0, '', ''],
	  legend: [1, '<fieldset>', '</fieldset>'],
	  tr: [2, '<table><tbody>', '</tbody></table>'],
	  col: [2, '<table><tbody></tbody><colgroup>', '</colgroup></table>']
	};
	
	map.td = map.th = [3, '<table><tbody><tr>', '</tr></tbody></table>'];
	
	map.option = map.optgroup = [1, '<select multiple="multiple">', '</select>'];
	
	map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, '<table>', '</table>'];
	
	map.g = map.defs = map.symbol = map.use = map.image = map.text = map.circle = map.ellipse = map.line = map.path = map.polygon = map.polyline = map.rect = [1, '<svg ' + 'xmlns="http://www.w3.org/2000/svg" ' + 'xmlns:xlink="http://www.w3.org/1999/xlink" ' + 'xmlns:ev="http://www.w3.org/2001/xml-events"' + 'version="1.1">', '</svg>'];
	
	/**
	 * Check if a node is a supported template node with a
	 * DocumentFragment content.
	 *
	 * @param {Node} node
	 * @return {Boolean}
	 */
	
	function isRealTemplate(node) {
	  return isTemplate(node) && node.content instanceof DocumentFragment;
	}
	
	var tagRE$1 = /<([\w:]+)/;
	var entityRE = /&#?\w+?;/;
	
	/**
	 * Convert a string template to a DocumentFragment.
	 * Determines correct wrapping by tag types. Wrapping
	 * strategy found in jQuery & component/domify.
	 *
	 * @param {String} templateString
	 * @param {Boolean} raw
	 * @return {DocumentFragment}
	 */
	
	function stringToFragment(templateString, raw) {
	  // try a cache hit first
	  var hit = templateCache.get(templateString);
	  if (hit) {
	    return hit;
	  }
	
	  var frag = document.createDocumentFragment();
	  var tagMatch = templateString.match(tagRE$1);
	  var entityMatch = entityRE.test(templateString);
	
	  if (!tagMatch && !entityMatch) {
	    // text only, return a single text node.
	    frag.appendChild(document.createTextNode(templateString));
	  } else {
	
	    var tag = tagMatch && tagMatch[1];
	    var wrap = map[tag] || map.efault;
	    var depth = wrap[0];
	    var prefix = wrap[1];
	    var suffix = wrap[2];
	    var node = document.createElement('div');
	
	    if (!raw) {
	      templateString = templateString.trim();
	    }
	    node.innerHTML = prefix + templateString + suffix;
	    while (depth--) {
	      node = node.lastChild;
	    }
	
	    var child;
	    /* eslint-disable no-cond-assign */
	    while (child = node.firstChild) {
	      /* eslint-enable no-cond-assign */
	      frag.appendChild(child);
	    }
	  }
	
	  templateCache.put(templateString, frag);
	  return frag;
	}
	
	/**
	 * Convert a template node to a DocumentFragment.
	 *
	 * @param {Node} node
	 * @return {DocumentFragment}
	 */
	
	function nodeToFragment(node) {
	  // if its a template tag and the browser supports it,
	  // its content is already a document fragment.
	  if (isRealTemplate(node)) {
	    trimNode(node.content);
	    return node.content;
	  }
	  // script template
	  if (node.tagName === 'SCRIPT') {
	    return stringToFragment(node.textContent);
	  }
	  // normal node, clone it to avoid mutating the original
	  var clonedNode = cloneNode(node);
	  var frag = document.createDocumentFragment();
	  var child;
	  /* eslint-disable no-cond-assign */
	  while (child = clonedNode.firstChild) {
	    /* eslint-enable no-cond-assign */
	    frag.appendChild(child);
	  }
	  trimNode(frag);
	  return frag;
	}
	
	// Test for the presence of the Safari template cloning bug
	// https://bugs.webkit.org/showug.cgi?id=137755
	var hasBrokenTemplate = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var a = document.createElement('div');
	    a.innerHTML = '<template>1</template>';
	    return !a.cloneNode(true).firstChild.innerHTML;
	  } else {
	    return false;
	  }
	})();
	
	// Test for IE10/11 textarea placeholder clone bug
	var hasTextareaCloneBug = (function () {
	  /* istanbul ignore else */
	  if (inBrowser) {
	    var t = document.createElement('textarea');
	    t.placeholder = 't';
	    return t.cloneNode(true).value === 't';
	  } else {
	    return false;
	  }
	})();
	
	/**
	 * 1. Deal with Safari cloning nested <template> bug by
	 *    manually cloning all template instances.
	 * 2. Deal with IE10/11 textarea placeholder bug by setting
	 *    the correct value after cloning.
	 *
	 * @param {Element|DocumentFragment} node
	 * @return {Element|DocumentFragment}
	 */
	
	function cloneNode(node) {
	  if (!node.querySelectorAll) {
	    return node.cloneNode();
	  }
	  var res = node.cloneNode(true);
	  var i, original, cloned;
	  /* istanbul ignore if */
	  if (hasBrokenTemplate) {
	    var tempClone = res;
	    if (isRealTemplate(node)) {
	      node = node.content;
	      tempClone = res.content;
	    }
	    original = node.querySelectorAll('template');
	    if (original.length) {
	      cloned = tempClone.querySelectorAll('template');
	      i = cloned.length;
	      while (i--) {
	        cloned[i].parentNode.replaceChild(cloneNode(original[i]), cloned[i]);
	      }
	    }
	  }
	  /* istanbul ignore if */
	  if (hasTextareaCloneBug) {
	    if (node.tagName === 'TEXTAREA') {
	      res.value = node.value;
	    } else {
	      original = node.querySelectorAll('textarea');
	      if (original.length) {
	        cloned = res.querySelectorAll('textarea');
	        i = cloned.length;
	        while (i--) {
	          cloned[i].value = original[i].value;
	        }
	      }
	    }
	  }
	  return res;
	}
	
	/**
	 * Process the template option and normalizes it into a
	 * a DocumentFragment that can be used as a partial or a
	 * instance template.
	 *
	 * @param {*} template
	 *        Possible values include:
	 *        - DocumentFragment object
	 *        - Node object of type Template
	 *        - id selector: '#some-template-id'
	 *        - template string: '<div><span>{{msg}}</span></div>'
	 * @param {Boolean} shouldClone
	 * @param {Boolean} raw
	 *        inline HTML interpolation. Do not check for id
	 *        selector and keep whitespace in the string.
	 * @return {DocumentFragment|undefined}
	 */
	
	function parseTemplate(template, shouldClone, raw) {
	  var node, frag;
	
	  // if the template is already a document fragment,
	  // do nothing
	  if (template instanceof DocumentFragment) {
	    trimNode(template);
	    return shouldClone ? cloneNode(template) : template;
	  }
	
	  if (typeof template === 'string') {
	    // id selector
	    if (!raw && template.charAt(0) === '#') {
	      // id selector can be cached too
	      frag = idSelectorCache.get(template);
	      if (!frag) {
	        node = document.getElementById(template.slice(1));
	        if (node) {
	          frag = nodeToFragment(node);
	          // save selector to cache
	          idSelectorCache.put(template, frag);
	        }
	      }
	    } else {
	      // normal string template
	      frag = stringToFragment(template, raw);
	    }
	  } else if (template.nodeType) {
	    // a direct node
	    frag = nodeToFragment(template);
	  }
	
	  return frag && shouldClone ? cloneNode(frag) : frag;
	}
	
	var template = Object.freeze({
	  cloneNode: cloneNode,
	  parseTemplate: parseTemplate
	});
	
	/**
	 * Abstraction for a partially-compiled fragment.
	 * Can optionally compile content with a child scope.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 * @param {DocumentFragment} frag
	 * @param {Vue} [host]
	 * @param {Object} [scope]
	 */
	function Fragment(linker, vm, frag, host, scope, parentFrag) {
	  this.children = [];
	  this.childFrags = [];
	  this.vm = vm;
	  this.scope = scope;
	  this.inserted = false;
	  this.parentFrag = parentFrag;
	  if (parentFrag) {
	    parentFrag.childFrags.push(this);
	  }
	  this.unlink = linker(vm, frag, host, scope, this);
	  var single = this.single = frag.childNodes.length === 1 &&
	  // do not go single mode if the only node is an anchor
	  !frag.childNodes[0].__vue_anchor;
	  if (single) {
	    this.node = frag.childNodes[0];
	    this.before = singleBefore;
	    this.remove = singleRemove;
	  } else {
	    this.node = createAnchor('fragment-start');
	    this.end = createAnchor('fragment-end');
	    this.frag = frag;
	    prepend(this.node, frag);
	    frag.appendChild(this.end);
	    this.before = multiBefore;
	    this.remove = multiRemove;
	  }
	  this.node.__vfrag__ = this;
	}
	
	/**
	 * Call attach/detach for all components contained within
	 * this fragment. Also do so recursively for all child
	 * fragments.
	 *
	 * @param {Function} hook
	 */
	
	Fragment.prototype.callHook = function (hook) {
	  var i, l;
	  for (i = 0, l = this.children.length; i < l; i++) {
	    hook(this.children[i]);
	  }
	  for (i = 0, l = this.childFrags.length; i < l; i++) {
	    this.childFrags[i].callHook(hook);
	  }
	};
	
	/**
	 * Destroy the fragment.
	 */
	
	Fragment.prototype.destroy = function () {
	  if (this.parentFrag) {
	    this.parentFrag.childFrags.$remove(this);
	  }
	  this.unlink();
	};
	
	/**
	 * Insert fragment before target, single node version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function singleBefore(target, withTransition) {
	  this.inserted = true;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  method(this.node, target, this.vm);
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, single node version
	 */
	
	function singleRemove() {
	  this.inserted = false;
	  var shouldCallRemove = inDoc(this.node);
	  var self = this;
	  self.callHook(destroyChild);
	  removeWithTransition(this.node, this.vm, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Insert fragment before target, multi-nodes version
	 *
	 * @param {Node} target
	 * @param {Boolean} withTransition
	 */
	
	function multiBefore(target, withTransition) {
	  this.inserted = true;
	  var vm = this.vm;
	  var method = withTransition !== false ? beforeWithTransition : before;
	  mapNodeRange(this.node, this.end, function (node) {
	    method(node, target, vm);
	  });
	  if (inDoc(this.node)) {
	    this.callHook(attach);
	  }
	}
	
	/**
	 * Remove fragment, multi-nodes version
	 */
	
	function multiRemove() {
	  this.inserted = false;
	  var self = this;
	  var shouldCallRemove = inDoc(this.node);
	  self.callHook(destroyChild);
	  removeNodeRange(this.node, this.end, this.vm, this.frag, function () {
	    if (shouldCallRemove) {
	      self.callHook(detach);
	    }
	    self.destroy();
	  });
	}
	
	/**
	 * Call attach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function attach(child) {
	  if (!child._isAttached) {
	    child._callHook('attached');
	  }
	}
	
	/**
	 * Call destroy for all contained instances,
	 * with remove:false and defer:true.
	 * Defer is necessary because we need to
	 * keep the children to call detach hooks
	 * on them.
	 *
	 * @param {Vue} child
	 */
	
	function destroyChild(child) {
	  child.$destroy(false, true);
	}
	
	/**
	 * Call detach hook for a Vue instance.
	 *
	 * @param {Vue} child
	 */
	
	function detach(child) {
	  if (child._isAttached) {
	    child._callHook('detached');
	  }
	}
	
	var linkerCache = new Cache(5000);
	
	/**
	 * A factory that can be used to create instances of a
	 * fragment. Caches the compiled linker if possible.
	 *
	 * @param {Vue} vm
	 * @param {Element|String} el
	 */
	function FragmentFactory(vm, el) {
	  this.vm = vm;
	  var template;
	  var isString = typeof el === 'string';
	  if (isString || isTemplate(el)) {
	    template = parseTemplate(el, true);
	  } else {
	    template = document.createDocumentFragment();
	    template.appendChild(el);
	  }
	  this.template = template;
	  // linker can be cached, but only for components
	  var linker;
	  var cid = vm.constructor.cid;
	  if (cid > 0) {
	    var cacheId = cid + (isString ? el : el.outerHTML);
	    linker = linkerCache.get(cacheId);
	    if (!linker) {
	      linker = compile(template, vm.$options, true);
	      linkerCache.put(cacheId, linker);
	    }
	  } else {
	    linker = compile(template, vm.$options, true);
	  }
	  this.linker = linker;
	}
	
	/**
	 * Create a fragment instance with given host and scope.
	 *
	 * @param {Vue} host
	 * @param {Object} scope
	 * @param {Fragment} parentFrag
	 */
	
	FragmentFactory.prototype.create = function (host, scope, parentFrag) {
	  var frag = cloneNode(this.template);
	  return new Fragment(this.linker, this.vm, frag, host, scope, parentFrag);
	};
	
	var vIf = {
	
	  priority: IF,
	
	  bind: function bind() {
	    var el = this.el;
	    if (!el.__vue__) {
	      // check else block
	      var next = el.nextElementSibling;
	      if (next && getAttr(next, 'v-else') !== null) {
	        remove(next);
	        this.elseFactory = new FragmentFactory(this.vm, next);
	      }
	      // check main block
	      this.anchor = createAnchor('v-if');
	      replace(el, this.anchor);
	      this.factory = new FragmentFactory(this.vm, el);
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('v-if="' + this.expression + '" cannot be ' + 'used on an instance root element.');
	      this.invalid = true;
	    }
	  },
	
	  update: function update(value) {
	    if (this.invalid) return;
	    if (value) {
	      if (!this.frag) {
	        this.insert();
	      }
	    } else {
	      this.remove();
	    }
	  },
	
	  insert: function insert() {
	    if (this.elseFrag) {
	      this.elseFrag.remove();
	      this.elseFrag = null;
	    }
	    this.frag = this.factory.create(this._host, this._scope, this._frag);
	    this.frag.before(this.anchor);
	  },
	
	  remove: function remove() {
	    if (this.frag) {
	      this.frag.remove();
	      this.frag = null;
	    }
	    if (this.elseFactory && !this.elseFrag) {
	      this.elseFrag = this.elseFactory.create(this._host, this._scope, this._frag);
	      this.elseFrag.before(this.anchor);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};
	
	var uid$1 = 0;
	
	var vFor = {
	
	  priority: FOR,
	
	  params: ['track-by', 'stagger', 'enter-stagger', 'leave-stagger'],
	
	  bind: function bind() {
	    // support "item in items" syntax
	    var inMatch = this.expression.match(/(.*) in (.*)/);
	    if (inMatch) {
	      var itMatch = inMatch[1].match(/\((.*),(.*)\)/);
	      if (itMatch) {
	        this.iterator = itMatch[1].trim();
	        this.alias = itMatch[2].trim();
	      } else {
	        this.alias = inMatch[1].trim();
	      }
	      this.expression = inMatch[2];
	    }
	
	    if (!this.alias) {
	      process.env.NODE_ENV !== 'production' && warn('Alias is required in v-for.');
	      return;
	    }
	
	    // uid as a cache identifier
	    this.id = '__v-for__' + ++uid$1;
	
	    // check if this is an option list,
	    // so that we know if we need to update the <select>'s
	    // v-model when the option list has changed.
	    // because v-model has a lower priority than v-for,
	    // the v-model is not bound here yet, so we have to
	    // retrive it in the actual updateModel() function.
	    var tag = this.el.tagName;
	    this.isOption = (tag === 'OPTION' || tag === 'OPTGROUP') && this.el.parentNode.tagName === 'SELECT';
	
	    // setup anchor nodes
	    this.start = createAnchor('v-for-start');
	    this.end = createAnchor('v-for-end');
	    replace(this.el, this.end);
	    before(this.start, this.end);
	
	    // cache
	    this.cache = Object.create(null);
	
	    // fragment factory
	    this.factory = new FragmentFactory(this.vm, this.el);
	  },
	
	  update: function update(data) {
	    this.diff(data);
	    this.updateRef();
	    this.updateModel();
	  },
	
	  /**
	   * Diff, based on new data and old data, determine the
	   * minimum amount of DOM manipulations needed to make the
	   * DOM reflect the new data Array.
	   *
	   * The algorithm diffs the new data Array by storing a
	   * hidden reference to an owner vm instance on previously
	   * seen data. This allows us to achieve O(n) which is
	   * better than a levenshtein distance based algorithm,
	   * which is O(m * n).
	   *
	   * @param {Array} data
	   */
	
	  diff: function diff(data) {
	    // check if the Array was converted from an Object
	    var item = data[0];
	    var convertedFromObject = this.fromObject = isObject(item) && hasOwn(item, '$key') && hasOwn(item, '$value');
	
	    var trackByKey = this.params.trackBy;
	    var oldFrags = this.frags;
	    var frags = this.frags = new Array(data.length);
	    var alias = this.alias;
	    var iterator = this.iterator;
	    var start = this.start;
	    var end = this.end;
	    var inDocument = inDoc(start);
	    var init = !oldFrags;
	    var i, l, frag, key, value, primitive;
	
	    // First pass, go through the new Array and fill up
	    // the new frags array. If a piece of data has a cached
	    // instance for it, we reuse it. Otherwise build a new
	    // instance.
	    for (i = 0, l = data.length; i < l; i++) {
	      item = data[i];
	      key = convertedFromObject ? item.$key : null;
	      value = convertedFromObject ? item.$value : item;
	      primitive = !isObject(value);
	      frag = !init && this.getCachedFrag(value, i, key);
	      if (frag) {
	        // reusable fragment
	        frag.reused = true;
	        // update $index
	        frag.scope.$index = i;
	        // update $key
	        if (key) {
	          frag.scope.$key = key;
	        }
	        // update iterator
	        if (iterator) {
	          frag.scope[iterator] = key !== null ? key : i;
	        }
	        // update data for track-by, object repeat &
	        // primitive values.
	        if (trackByKey || convertedFromObject || primitive) {
	          frag.scope[alias] = value;
	        }
	      } else {
	        // new isntance
	        frag = this.create(value, alias, i, key);
	        frag.fresh = !init;
	      }
	      frags[i] = frag;
	      if (init) {
	        frag.before(end);
	      }
	    }
	
	    // we're done for the initial render.
	    if (init) {
	      return;
	    }
	
	    // Second pass, go through the old fragments and
	    // destroy those who are not reused (and remove them
	    // from cache)
	    var removalIndex = 0;
	    var totalRemoved = oldFrags.length - frags.length;
	    for (i = 0, l = oldFrags.length; i < l; i++) {
	      frag = oldFrags[i];
	      if (!frag.reused) {
	        this.deleteCachedFrag(frag);
	        this.remove(frag, removalIndex++, totalRemoved, inDocument);
	      }
	    }
	
	    // Final pass, move/insert new fragments into the
	    // right place.
	    var targetPrev, prevEl, currentPrev;
	    var insertionIndex = 0;
	    for (i = 0, l = frags.length; i < l; i++) {
	      frag = frags[i];
	      // this is the frag that we should be after
	      targetPrev = frags[i - 1];
	      prevEl = targetPrev ? targetPrev.staggerCb ? targetPrev.staggerAnchor : targetPrev.end || targetPrev.node : start;
	      if (frag.reused && !frag.staggerCb) {
	        currentPrev = findPrevFrag(frag, start, this.id);
	        if (currentPrev !== targetPrev && (!currentPrev ||
	        // optimization for moving a single item.
	        // thanks to suggestions by @livoras in #1807
	        findPrevFrag(currentPrev, start, this.id) !== targetPrev)) {
	          this.move(frag, prevEl);
	        }
	      } else {
	        // new instance, or still in stagger.
	        // insert with updated stagger index.
	        this.insert(frag, insertionIndex++, prevEl, inDocument);
	      }
	      frag.reused = frag.fresh = false;
	    }
	  },
	
	  /**
	   * Create a new fragment instance.
	   *
	   * @param {*} value
	   * @param {String} alias
	   * @param {Number} index
	   * @param {String} [key]
	   * @return {Fragment}
	   */
	
	  create: function create(value, alias, index, key) {
	    var host = this._host;
	    // create iteration scope
	    var parentScope = this._scope || this.vm;
	    var scope = Object.create(parentScope);
	    // ref holder for the scope
	    scope.$refs = Object.create(parentScope.$refs);
	    scope.$els = Object.create(parentScope.$els);
	    // make sure point $parent to parent scope
	    scope.$parent = parentScope;
	    // for two-way binding on alias
	    scope.$forContext = this;
	    // define scope properties
	    defineReactive(scope, alias, value);
	    defineReactive(scope, '$index', index);
	    if (key) {
	      defineReactive(scope, '$key', key);
	    } else if (scope.$key) {
	      // avoid accidental fallback
	      def(scope, '$key', null);
	    }
	    if (this.iterator) {
	      defineReactive(scope, this.iterator, key !== null ? key : index);
	    }
	    var frag = this.factory.create(host, scope, this._frag);
	    frag.forId = this.id;
	    this.cacheFrag(value, frag, index, key);
	    return frag;
	  },
	
	  /**
	   * Update the v-ref on owner vm.
	   */
	
	  updateRef: function updateRef() {
	    var ref = this.descriptor.ref;
	    if (!ref) return;
	    var hash = (this._scope || this.vm).$refs;
	    var refs;
	    if (!this.fromObject) {
	      refs = this.frags.map(findVmFromFrag);
	    } else {
	      refs = {};
	      this.frags.forEach(function (frag) {
	        refs[frag.scope.$key] = findVmFromFrag(frag);
	      });
	    }
	    hash[ref] = refs;
	  },
	
	  /**
	   * For option lists, update the containing v-model on
	   * parent <select>.
	   */
	
	  updateModel: function updateModel() {
	    if (this.isOption) {
	      var parent = this.start.parentNode;
	      var model = parent && parent.__v_model;
	      if (model) {
	        model.forceUpdate();
	      }
	    }
	  },
	
	  /**
	   * Insert a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Node} prevEl
	   * @param {Boolean} inDocument
	   */
	
	  insert: function insert(frag, index, prevEl, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	    }
	    var staggerAmount = this.getStagger(frag, index, null, 'enter');
	    if (inDocument && staggerAmount) {
	      // create an anchor and insert it synchronously,
	      // so that we can resolve the correct order without
	      // worrying about some elements not inserted yet
	      var anchor = frag.staggerAnchor;
	      if (!anchor) {
	        anchor = frag.staggerAnchor = createAnchor('stagger-anchor');
	        anchor.__vfrag__ = frag;
	      }
	      after(anchor, prevEl);
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.before(anchor);
	        remove(anchor);
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.before(prevEl.nextSibling);
	    }
	  },
	
	  /**
	   * Remove a fragment. Handles staggering.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {Boolean} inDocument
	   */
	
	  remove: function remove(frag, index, total, inDocument) {
	    if (frag.staggerCb) {
	      frag.staggerCb.cancel();
	      frag.staggerCb = null;
	      // it's not possible for the same frag to be removed
	      // twice, so if we have a pending stagger callback,
	      // it means this frag is queued for enter but removed
	      // before its transition started. Since it is already
	      // destroyed, we can just leave it in detached state.
	      return;
	    }
	    var staggerAmount = this.getStagger(frag, index, total, 'leave');
	    if (inDocument && staggerAmount) {
	      var op = frag.staggerCb = cancellable(function () {
	        frag.staggerCb = null;
	        frag.remove();
	      });
	      setTimeout(op, staggerAmount);
	    } else {
	      frag.remove();
	    }
	  },
	
	  /**
	   * Move a fragment to a new position.
	   * Force no transition.
	   *
	   * @param {Fragment} frag
	   * @param {Node} prevEl
	   */
	
	  move: function move(frag, prevEl) {
	    frag.before(prevEl.nextSibling, false);
	  },
	
	  /**
	   * Cache a fragment using track-by or the object key.
	   *
	   * @param {*} value
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {String} [key]
	   */
	
	  cacheFrag: function cacheFrag(value, frag, index, key) {
	    var trackByKey = this.params.trackBy;
	    var cache = this.cache;
	    var primitive = !isObject(value);
	    var id;
	    if (key || trackByKey || primitive) {
	      id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      if (!cache[id]) {
	        cache[id] = frag;
	      } else if (trackByKey !== '$index') {
	        process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	      }
	    } else {
	      id = this.id;
	      if (hasOwn(value, id)) {
	        if (value[id] === null) {
	          value[id] = frag;
	        } else {
	          process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	        }
	      } else {
	        def(value, id, frag);
	      }
	    }
	    frag.raw = value;
	  },
	
	  /**
	   * Get a cached fragment from the value/index/key
	   *
	   * @param {*} value
	   * @param {Number} index
	   * @param {String} key
	   * @return {Fragment}
	   */
	
	  getCachedFrag: function getCachedFrag(value, index, key) {
	    var trackByKey = this.params.trackBy;
	    var primitive = !isObject(value);
	    var frag;
	    if (key || trackByKey || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      frag = this.cache[id];
	    } else {
	      frag = value[this.id];
	    }
	    if (frag && (frag.reused || frag.fresh)) {
	      process.env.NODE_ENV !== 'production' && this.warnDuplicate(value);
	    }
	    return frag;
	  },
	
	  /**
	   * Delete a fragment from cache.
	   *
	   * @param {Fragment} frag
	   */
	
	  deleteCachedFrag: function deleteCachedFrag(frag) {
	    var value = frag.raw;
	    var trackByKey = this.params.trackBy;
	    var scope = frag.scope;
	    var index = scope.$index;
	    // fix #948: avoid accidentally fall through to
	    // a parent repeater which happens to have $key.
	    var key = hasOwn(scope, '$key') && scope.$key;
	    var primitive = !isObject(value);
	    if (trackByKey || key || primitive) {
	      var id = trackByKey ? trackByKey === '$index' ? index : value[trackByKey] : key || value;
	      this.cache[id] = null;
	    } else {
	      value[this.id] = null;
	      frag.raw = null;
	    }
	  },
	
	  /**
	   * Get the stagger amount for an insertion/removal.
	   *
	   * @param {Fragment} frag
	   * @param {Number} index
	   * @param {Number} total
	   * @param {String} type
	   */
	
	  getStagger: function getStagger(frag, index, total, type) {
	    type = type + 'Stagger';
	    var trans = frag.node.__v_trans;
	    var hooks = trans && trans.hooks;
	    var hook = hooks && (hooks[type] || hooks.stagger);
	    return hook ? hook.call(frag, index, total) : index * parseInt(this.params[type] || this.params.stagger, 10);
	  },
	
	  /**
	   * Pre-process the value before piping it through the
	   * filters. This is passed to and called by the watcher.
	   */
	
	  _preProcess: function _preProcess(value) {
	    // regardless of type, store the un-filtered raw value.
	    this.rawValue = value;
	    return value;
	  },
	
	  /**
	   * Post-process the value after it has been piped through
	   * the filters. This is passed to and called by the watcher.
	   *
	   * It is necessary for this to be called during the
	   * wathcer's dependency collection phase because we want
	   * the v-for to update when the source Object is mutated.
	   */
	
	  _postProcess: function _postProcess(value) {
	    if (isArray(value)) {
	      return value;
	    } else if (isPlainObject(value)) {
	      // convert plain object to array.
	      var keys = Object.keys(value);
	      var i = keys.length;
	      var res = new Array(i);
	      var key;
	      while (i--) {
	        key = keys[i];
	        res[i] = {
	          $key: key,
	          $value: value[key]
	        };
	      }
	      return res;
	    } else {
	      if (typeof value === 'number') {
	        value = range(value);
	      }
	      return value || [];
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.descriptor.ref) {
	      (this._scope || this.vm).$refs[this.descriptor.ref] = null;
	    }
	    if (this.frags) {
	      var i = this.frags.length;
	      var frag;
	      while (i--) {
	        frag = this.frags[i];
	        this.deleteCachedFrag(frag);
	        frag.destroy();
	      }
	    }
	  }
	};
	
	/**
	 * Helper to find the previous element that is a fragment
	 * anchor. This is necessary because a destroyed frag's
	 * element could still be lingering in the DOM before its
	 * leaving transition finishes, but its inserted flag
	 * should have been set to false so we can skip them.
	 *
	 * If this is a block repeat, we want to make sure we only
	 * return frag that is bound to this v-for. (see #929)
	 *
	 * @param {Fragment} frag
	 * @param {Comment|Text} anchor
	 * @param {String} id
	 * @return {Fragment}
	 */
	
	function findPrevFrag(frag, anchor, id) {
	  var el = frag.node.previousSibling;
	  /* istanbul ignore if */
	  if (!el) return;
	  frag = el.__vfrag__;
	  while ((!frag || frag.forId !== id || !frag.inserted) && el !== anchor) {
	    el = el.previousSibling;
	    /* istanbul ignore if */
	    if (!el) return;
	    frag = el.__vfrag__;
	  }
	  return frag;
	}
	
	/**
	 * Find a vm from a fragment.
	 *
	 * @param {Fragment} frag
	 * @return {Vue|undefined}
	 */
	
	function findVmFromFrag(frag) {
	  var node = frag.node;
	  // handle multi-node frag
	  if (frag.end) {
	    while (!node.__vue__ && node !== frag.end && node.nextSibling) {
	      node = node.nextSibling;
	    }
	  }
	  return node.__vue__;
	}
	
	/**
	 * Create a range array from given number.
	 *
	 * @param {Number} n
	 * @return {Array}
	 */
	
	function range(n) {
	  var i = -1;
	  var ret = new Array(n);
	  while (++i < n) {
	    ret[i] = i;
	  }
	  return ret;
	}
	
	if (process.env.NODE_ENV !== 'production') {
	  vFor.warnDuplicate = function (value) {
	    warn('Duplicate value found in v-for="' + this.descriptor.raw + '": ' + JSON.stringify(value) + '. Use track-by="$index" if ' + 'you are expecting duplicate values.');
	  };
	}
	
	var html = {
	
	  bind: function bind() {
	    // a comment node means this is a binding for
	    // {{{ inline unescaped html }}}
	    if (this.el.nodeType === 8) {
	      // hold nodes
	      this.nodes = [];
	      // replace the placeholder with proper anchor
	      this.anchor = createAnchor('v-html');
	      replace(this.el, this.anchor);
	    }
	  },
	
	  update: function update(value) {
	    value = _toString(value);
	    if (this.nodes) {
	      this.swap(value);
	    } else {
	      this.el.innerHTML = value;
	    }
	  },
	
	  swap: function swap(value) {
	    // remove old nodes
	    var i = this.nodes.length;
	    while (i--) {
	      remove(this.nodes[i]);
	    }
	    // convert new value to a fragment
	    // do not attempt to retrieve from id selector
	    var frag = parseTemplate(value, true, true);
	    // save a reference to these nodes so we can remove later
	    this.nodes = toArray(frag.childNodes);
	    before(frag, this.anchor);
	  }
	};
	
	var text = {
	
	  bind: function bind() {
	    this.attr = this.el.nodeType === 3 ? 'data' : 'textContent';
	  },
	
	  update: function update(value) {
	    this.el[this.attr] = _toString(value);
	  }
	};
	
	// must export plain object
	var publicDirectives = {
	  text: text,
	  html: html,
	  'for': vFor,
	  'if': vIf,
	  show: show,
	  model: model,
	  on: on,
	  bind: bind,
	  el: el,
	  ref: ref,
	  cloak: cloak
	};
	
	var queue$1 = [];
	var queued = false;
	
	/**
	 * Push a job into the queue.
	 *
	 * @param {Function} job
	 */
	
	function pushJob(job) {
	  queue$1.push(job);
	  if (!queued) {
	    queued = true;
	    nextTick(flush);
	  }
	}
	
	/**
	 * Flush the queue, and do one forced reflow before
	 * triggering transitions.
	 */
	
	function flush() {
	  // Force layout
	  var f = document.documentElement.offsetHeight;
	  for (var i = 0; i < queue$1.length; i++) {
	    queue$1[i]();
	  }
	  queue$1 = [];
	  queued = false;
	  // dummy return, so js linters don't complain about
	  // unused variable f
	  return f;
	}
	
	var TYPE_TRANSITION = 1;
	var TYPE_ANIMATION = 2;
	var transDurationProp = transitionProp + 'Duration';
	var animDurationProp = animationProp + 'Duration';
	
	/**
	 * A Transition object that encapsulates the state and logic
	 * of the transition.
	 *
	 * @param {Element} el
	 * @param {String} id
	 * @param {Object} hooks
	 * @param {Vue} vm
	 */
	function Transition(el, id, hooks, vm) {
	  this.id = id;
	  this.el = el;
	  this.enterClass = id + '-enter';
	  this.leaveClass = id + '-leave';
	  this.hooks = hooks;
	  this.vm = vm;
	  // async state
	  this.pendingCssEvent = this.pendingCssCb = this.cancel = this.pendingJsCb = this.op = this.cb = null;
	  this.justEntered = false;
	  this.entered = this.left = false;
	  this.typeCache = {};
	  // bind
	  var self = this;['enterNextTick', 'enterDone', 'leaveNextTick', 'leaveDone'].forEach(function (m) {
	    self[m] = bind$1(self[m], self);
	  });
	}
	
	var p$1 = Transition.prototype;
	
	/**
	 * Start an entering transition.
	 *
	 * 1. enter transition triggered
	 * 2. call beforeEnter hook
	 * 3. add enter class
	 * 4. insert/show element
	 * 5. call enter hook (with possible explicit js callback)
	 * 6. reflow
	 * 7. based on transition type:
	 *    - transition:
	 *        remove class now, wait for transitionend,
	 *        then done if there's no explicit js callback.
	 *    - animation:
	 *        wait for animationend, remove class,
	 *        then done if there's no explicit js callback.
	 *    - no css transition:
	 *        done now if there's no explicit js callback.
	 * 8. wait for either done or js callback, then call
	 *    afterEnter hook.
	 *
	 * @param {Function} op - insert/show the element
	 * @param {Function} [cb]
	 */
	
	p$1.enter = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeEnter');
	  this.cb = cb;
	  addClass(this.el, this.enterClass);
	  op();
	  this.entered = false;
	  this.callHookWithCb('enter');
	  if (this.entered) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.enterCancelled;
	  pushJob(this.enterNextTick);
	};
	
	/**
	 * The "nextTick" phase of an entering transition, which is
	 * to be pushed into a queue and executed after a reflow so
	 * that removing the class can trigger a CSS transition.
	 */
	
	p$1.enterNextTick = function () {
	
	  // Important hack:
	  // in Chrome, if a just-entered element is applied the
	  // leave class while its interpolated property still has
	  // a very small value (within one frame), Chrome will
	  // skip the leave transition entirely and not firing the
	  // transtionend event. Therefore we need to protected
	  // against such cases using a one-frame timeout.
	  this.justEntered = true;
	  var self = this;
	  setTimeout(function () {
	    self.justEntered = false;
	  }, 17);
	
	  var enterDone = this.enterDone;
	  var type = this.getCssTransitionType(this.enterClass);
	  if (!this.pendingJsCb) {
	    if (type === TYPE_TRANSITION) {
	      // trigger transition by removing enter class now
	      removeClass(this.el, this.enterClass);
	      this.setupCssCb(transitionEndEvent, enterDone);
	    } else if (type === TYPE_ANIMATION) {
	      this.setupCssCb(animationEndEvent, enterDone);
	    } else {
	      enterDone();
	    }
	  } else if (type === TYPE_TRANSITION) {
	    removeClass(this.el, this.enterClass);
	  }
	};
	
	/**
	 * The "cleanup" phase of an entering transition.
	 */
	
	p$1.enterDone = function () {
	  this.entered = true;
	  this.cancel = this.pendingJsCb = null;
	  removeClass(this.el, this.enterClass);
	  this.callHook('afterEnter');
	  if (this.cb) this.cb();
	};
	
	/**
	 * Start a leaving transition.
	 *
	 * 1. leave transition triggered.
	 * 2. call beforeLeave hook
	 * 3. add leave class (trigger css transition)
	 * 4. call leave hook (with possible explicit js callback)
	 * 5. reflow if no explicit js callback is provided
	 * 6. based on transition type:
	 *    - transition or animation:
	 *        wait for end event, remove class, then done if
	 *        there's no explicit js callback.
	 *    - no css transition:
	 *        done if there's no explicit js callback.
	 * 7. wait for either done or js callback, then call
	 *    afterLeave hook.
	 *
	 * @param {Function} op - remove/hide the element
	 * @param {Function} [cb]
	 */
	
	p$1.leave = function (op, cb) {
	  this.cancelPending();
	  this.callHook('beforeLeave');
	  this.op = op;
	  this.cb = cb;
	  addClass(this.el, this.leaveClass);
	  this.left = false;
	  this.callHookWithCb('leave');
	  if (this.left) {
	    return; // user called done synchronously.
	  }
	  this.cancel = this.hooks && this.hooks.leaveCancelled;
	  // only need to handle leaveDone if
	  // 1. the transition is already done (synchronously called
	  //    by the user, which causes this.op set to null)
	  // 2. there's no explicit js callback
	  if (this.op && !this.pendingJsCb) {
	    // if a CSS transition leaves immediately after enter,
	    // the transitionend event never fires. therefore we
	    // detect such cases and end the leave immediately.
	    if (this.justEntered) {
	      this.leaveDone();
	    } else {
	      pushJob(this.leaveNextTick);
	    }
	  }
	};
	
	/**
	 * The "nextTick" phase of a leaving transition.
	 */
	
	p$1.leaveNextTick = function () {
	  var type = this.getCssTransitionType(this.leaveClass);
	  if (type) {
	    var event = type === TYPE_TRANSITION ? transitionEndEvent : animationEndEvent;
	    this.setupCssCb(event, this.leaveDone);
	  } else {
	    this.leaveDone();
	  }
	};
	
	/**
	 * The "cleanup" phase of a leaving transition.
	 */
	
	p$1.leaveDone = function () {
	  this.left = true;
	  this.cancel = this.pendingJsCb = null;
	  this.op();
	  removeClass(this.el, this.leaveClass);
	  this.callHook('afterLeave');
	  if (this.cb) this.cb();
	  this.op = null;
	};
	
	/**
	 * Cancel any pending callbacks from a previously running
	 * but not finished transition.
	 */
	
	p$1.cancelPending = function () {
	  this.op = this.cb = null;
	  var hasPending = false;
	  if (this.pendingCssCb) {
	    hasPending = true;
	    off(this.el, this.pendingCssEvent, this.pendingCssCb);
	    this.pendingCssEvent = this.pendingCssCb = null;
	  }
	  if (this.pendingJsCb) {
	    hasPending = true;
	    this.pendingJsCb.cancel();
	    this.pendingJsCb = null;
	  }
	  if (hasPending) {
	    removeClass(this.el, this.enterClass);
	    removeClass(this.el, this.leaveClass);
	  }
	  if (this.cancel) {
	    this.cancel.call(this.vm, this.el);
	    this.cancel = null;
	  }
	};
	
	/**
	 * Call a user-provided synchronous hook function.
	 *
	 * @param {String} type
	 */
	
	p$1.callHook = function (type) {
	  if (this.hooks && this.hooks[type]) {
	    this.hooks[type].call(this.vm, this.el);
	  }
	};
	
	/**
	 * Call a user-provided, potentially-async hook function.
	 * We check for the length of arguments to see if the hook
	 * expects a `done` callback. If true, the transition's end
	 * will be determined by when the user calls that callback;
	 * otherwise, the end is determined by the CSS transition or
	 * animation.
	 *
	 * @param {String} type
	 */
	
	p$1.callHookWithCb = function (type) {
	  var hook = this.hooks && this.hooks[type];
	  if (hook) {
	    if (hook.length > 1) {
	      this.pendingJsCb = cancellable(this[type + 'Done']);
	    }
	    hook.call(this.vm, this.el, this.pendingJsCb);
	  }
	};
	
	/**
	 * Get an element's transition type based on the
	 * calculated styles.
	 *
	 * @param {String} className
	 * @return {Number}
	 */
	
	p$1.getCssTransitionType = function (className) {
	  /* istanbul ignore if */
	  if (!transitionEndEvent ||
	  // skip CSS transitions if page is not visible -
	  // this solves the issue of transitionend events not
	  // firing until the page is visible again.
	  // pageVisibility API is supported in IE10+, same as
	  // CSS transitions.
	  document.hidden ||
	  // explicit js-only transition
	  this.hooks && this.hooks.css === false ||
	  // element is hidden
	  isHidden(this.el)) {
	    return;
	  }
	  var type = this.typeCache[className];
	  if (type) return type;
	  var inlineStyles = this.el.style;
	  var computedStyles = window.getComputedStyle(this.el);
	  var transDuration = inlineStyles[transDurationProp] || computedStyles[transDurationProp];
	  if (transDuration && transDuration !== '0s') {
	    type = TYPE_TRANSITION;
	  } else {
	    var animDuration = inlineStyles[animDurationProp] || computedStyles[animDurationProp];
	    if (animDuration && animDuration !== '0s') {
	      type = TYPE_ANIMATION;
	    }
	  }
	  if (type) {
	    this.typeCache[className] = type;
	  }
	  return type;
	};
	
	/**
	 * Setup a CSS transitionend/animationend callback.
	 *
	 * @param {String} event
	 * @param {Function} cb
	 */
	
	p$1.setupCssCb = function (event, cb) {
	  this.pendingCssEvent = event;
	  var self = this;
	  var el = this.el;
	  var onEnd = this.pendingCssCb = function (e) {
	    if (e.target === el) {
	      off(el, event, onEnd);
	      self.pendingCssEvent = self.pendingCssCb = null;
	      if (!self.pendingJsCb && cb) {
	        cb();
	      }
	    }
	  };
	  on$1(el, event, onEnd);
	};
	
	/**
	 * Check if an element is hidden - in that case we can just
	 * skip the transition alltogether.
	 *
	 * @param {Element} el
	 * @return {Boolean}
	 */
	
	function isHidden(el) {
	  return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
	}
	
	var transition = {
	
	  priority: TRANSITION,
	
	  update: function update(id, oldId) {
	    var el = this.el;
	    // resolve on owner vm
	    var hooks = resolveAsset(this.vm.$options, 'transitions', id);
	    id = id || 'v';
	    // apply on closest vm
	    el.__v_trans = new Transition(el, id, hooks, this.el.__vue__ || this.vm);
	    if (oldId) {
	      removeClass(el, oldId + '-transition');
	    }
	    addClass(el, id + '-transition');
	  }
	};
	
	var bindingModes = config._propBindingModes;
	
	var propDef = {
	
	  bind: function bind() {
	
	    var child = this.vm;
	    var parent = child._context;
	    // passed in from compiler directly
	    var prop = this.descriptor.prop;
	    var childKey = prop.path;
	    var parentKey = prop.parentPath;
	    var twoWay = prop.mode === bindingModes.TWO_WAY;
	
	    var parentWatcher = this.parentWatcher = new Watcher(parent, parentKey, function (val) {
	      val = coerceProp(prop, val);
	      if (assertProp(prop, val)) {
	        child[childKey] = val;
	      }
	    }, {
	      twoWay: twoWay,
	      filters: prop.filters,
	      // important: props need to be observed on the
	      // v-for scope if present
	      scope: this._scope
	    });
	
	    // set the child initial value.
	    initProp(child, prop, parentWatcher.value);
	
	    // setup two-way binding
	    if (twoWay) {
	      // important: defer the child watcher creation until
	      // the created hook (after data observation)
	      var self = this;
	      child.$once('pre-hook:created', function () {
	        self.childWatcher = new Watcher(child, childKey, function (val) {
	          parentWatcher.set(val);
	        }, {
	          // ensure sync upward before parent sync down.
	          // this is necessary in cases e.g. the child
	          // mutates a prop array, then replaces it. (#1683)
	          sync: true
	        });
	      });
	    }
	  },
	
	  unbind: function unbind() {
	    this.parentWatcher.teardown();
	    if (this.childWatcher) {
	      this.childWatcher.teardown();
	    }
	  }
	};
	
	var component = {
	
	  priority: COMPONENT,
	
	  params: ['keep-alive', 'transition-mode', 'inline-template'],
	
	  /**
	   * Setup. Two possible usages:
	   *
	   * - static:
	   *   <comp> or <div v-component="comp">
	   *
	   * - dynamic:
	   *   <component :is="view">
	   */
	
	  bind: function bind() {
	    if (!this.el.__vue__) {
	      // keep-alive cache
	      this.keepAlive = this.params.keepAlive;
	      if (this.keepAlive) {
	        this.cache = {};
	      }
	      // check inline-template
	      if (this.params.inlineTemplate) {
	        // extract inline template as a DocumentFragment
	        this.inlineTemplate = extractContent(this.el, true);
	      }
	      // component resolution related state
	      this.pendingComponentCb = this.Component = null;
	      // transition related state
	      this.pendingRemovals = 0;
	      this.pendingRemovalCb = null;
	      // create a ref anchor
	      this.anchor = createAnchor('v-component');
	      replace(this.el, this.anchor);
	      // remove is attribute.
	      // this is removed during compilation, but because compilation is
	      // cached, when the component is used elsewhere this attribute
	      // will remain at link time.
	      this.el.removeAttribute('is');
	      // remove ref, same as above
	      if (this.descriptor.ref) {
	        this.el.removeAttribute('v-ref:' + hyphenate(this.descriptor.ref));
	      }
	      // if static, build right now.
	      if (this.literal) {
	        this.setComponent(this.expression);
	      }
	    } else {
	      process.env.NODE_ENV !== 'production' && warn('cannot mount component "' + this.expression + '" ' + 'on already mounted element: ' + this.el);
	    }
	  },
	
	  /**
	   * Public update, called by the watcher in the dynamic
	   * literal scenario, e.g. <component :is="view">
	   */
	
	  update: function update(value) {
	    if (!this.literal) {
	      this.setComponent(value);
	    }
	  },
	
	  /**
	   * Switch dynamic components. May resolve the component
	   * asynchronously, and perform transition based on
	   * specified transition mode. Accepts a few additional
	   * arguments specifically for vue-router.
	   *
	   * The callback is called when the full transition is
	   * finished.
	   *
	   * @param {String} value
	   * @param {Function} [cb]
	   */
	
	  setComponent: function setComponent(value, cb) {
	    this.invalidatePending();
	    if (!value) {
	      // just remove current
	      this.unbuild(true);
	      this.remove(this.childVM, cb);
	      this.childVM = null;
	    } else {
	      var self = this;
	      this.resolveComponent(value, function () {
	        self.mountComponent(cb);
	      });
	    }
	  },
	
	  /**
	   * Resolve the component constructor to use when creating
	   * the child vm.
	   */
	
	  resolveComponent: function resolveComponent(id, cb) {
	    var self = this;
	    this.pendingComponentCb = cancellable(function (Component) {
	      self.ComponentName = Component.options.name || id;
	      self.Component = Component;
	      cb();
	    });
	    this.vm._resolveComponent(id, this.pendingComponentCb);
	  },
	
	  /**
	   * Create a new instance using the current constructor and
	   * replace the existing instance. This method doesn't care
	   * whether the new component and the old one are actually
	   * the same.
	   *
	   * @param {Function} [cb]
	   */
	
	  mountComponent: function mountComponent(cb) {
	    // actual mount
	    this.unbuild(true);
	    var self = this;
	    var activateHook = this.Component.options.activate;
	    var cached = this.getCached();
	    var newComponent = this.build();
	    if (activateHook && !cached) {
	      this.waitingFor = newComponent;
	      activateHook.call(newComponent, function () {
	        if (self.waitingFor !== newComponent) {
	          return;
	        }
	        self.waitingFor = null;
	        self.transition(newComponent, cb);
	      });
	    } else {
	      // update ref for kept-alive component
	      if (cached) {
	        newComponent._updateRef();
	      }
	      this.transition(newComponent, cb);
	    }
	  },
	
	  /**
	   * When the component changes or unbinds before an async
	   * constructor is resolved, we need to invalidate its
	   * pending callback.
	   */
	
	  invalidatePending: function invalidatePending() {
	    if (this.pendingComponentCb) {
	      this.pendingComponentCb.cancel();
	      this.pendingComponentCb = null;
	    }
	  },
	
	  /**
	   * Instantiate/insert a new child vm.
	   * If keep alive and has cached instance, insert that
	   * instance; otherwise build a new one and cache it.
	   *
	   * @param {Object} [extraOptions]
	   * @return {Vue} - the created instance
	   */
	
	  build: function build(extraOptions) {
	    var cached = this.getCached();
	    if (cached) {
	      return cached;
	    }
	    if (this.Component) {
	      // default options
	      var options = {
	        name: this.ComponentName,
	        el: cloneNode(this.el),
	        template: this.inlineTemplate,
	        // make sure to add the child with correct parent
	        // if this is a transcluded component, its parent
	        // should be the transclusion host.
	        parent: this._host || this.vm,
	        // if no inline-template, then the compiled
	        // linker can be cached for better performance.
	        _linkerCachable: !this.inlineTemplate,
	        _ref: this.descriptor.ref,
	        _asComponent: true,
	        _isRouterView: this._isRouterView,
	        // if this is a transcluded component, context
	        // will be the common parent vm of this instance
	        // and its host.
	        _context: this.vm,
	        // if this is inside an inline v-for, the scope
	        // will be the intermediate scope created for this
	        // repeat fragment. this is used for linking props
	        // and container directives.
	        _scope: this._scope,
	        // pass in the owner fragment of this component.
	        // this is necessary so that the fragment can keep
	        // track of its contained components in order to
	        // call attach/detach hooks for them.
	        _frag: this._frag
	      };
	      // extra options
	      // in 1.0.0 this is used by vue-router only
	      /* istanbul ignore if */
	      if (extraOptions) {
	        extend(options, extraOptions);
	      }
	      var child = new this.Component(options);
	      if (this.keepAlive) {
	        this.cache[this.Component.cid] = child;
	      }
	      /* istanbul ignore if */
	      if (process.env.NODE_ENV !== 'production' && this.el.hasAttribute('transition') && child._isFragment) {
	        warn('Transitions will not work on a fragment instance. ' + 'Template: ' + child.$options.template);
	      }
	      return child;
	    }
	  },
	
	  /**
	   * Try to get a cached instance of the current component.
	   *
	   * @return {Vue|undefined}
	   */
	
	  getCached: function getCached() {
	    return this.keepAlive && this.cache[this.Component.cid];
	  },
	
	  /**
	   * Teardown the current child, but defers cleanup so
	   * that we can separate the destroy and removal steps.
	   *
	   * @param {Boolean} defer
	   */
	
	  unbuild: function unbuild(defer) {
	    if (this.waitingFor) {
	      this.waitingFor.$destroy();
	      this.waitingFor = null;
	    }
	    var child = this.childVM;
	    if (!child || this.keepAlive) {
	      if (child) {
	        // remove ref
	        child._updateRef(true);
	      }
	      return;
	    }
	    // the sole purpose of `deferCleanup` is so that we can
	    // "deactivate" the vm right now and perform DOM removal
	    // later.
	    child.$destroy(false, defer);
	  },
	
	  /**
	   * Remove current destroyed child and manually do
	   * the cleanup after removal.
	   *
	   * @param {Function} cb
	   */
	
	  remove: function remove(child, cb) {
	    var keepAlive = this.keepAlive;
	    if (child) {
	      // we may have a component switch when a previous
	      // component is still being transitioned out.
	      // we want to trigger only one lastest insertion cb
	      // when the existing transition finishes. (#1119)
	      this.pendingRemovals++;
	      this.pendingRemovalCb = cb;
	      var self = this;
	      child.$remove(function () {
	        self.pendingRemovals--;
	        if (!keepAlive) child._cleanup();
	        if (!self.pendingRemovals && self.pendingRemovalCb) {
	          self.pendingRemovalCb();
	          self.pendingRemovalCb = null;
	        }
	      });
	    } else if (cb) {
	      cb();
	    }
	  },
	
	  /**
	   * Actually swap the components, depending on the
	   * transition mode. Defaults to simultaneous.
	   *
	   * @param {Vue} target
	   * @param {Function} [cb]
	   */
	
	  transition: function transition(target, cb) {
	    var self = this;
	    var current = this.childVM;
	    // for devtool inspection
	    if (process.env.NODE_ENV !== 'production') {
	      if (current) current._inactive = true;
	      target._inactive = false;
	    }
	    this.childVM = target;
	    switch (self.params.transitionMode) {
	      case 'in-out':
	        target.$before(self.anchor, function () {
	          self.remove(current, cb);
	        });
	        break;
	      case 'out-in':
	        self.remove(current, function () {
	          target.$before(self.anchor, cb);
	        });
	        break;
	      default:
	        self.remove(current);
	        target.$before(self.anchor, cb);
	    }
	  },
	
	  /**
	   * Unbind.
	   */
	
	  unbind: function unbind() {
	    this.invalidatePending();
	    // Do not defer cleanup when unbinding
	    this.unbuild();
	    // destroy all keep-alive cached instances
	    if (this.cache) {
	      for (var key in this.cache) {
	        this.cache[key].$destroy();
	      }
	      this.cache = null;
	    }
	  }
	};
	
	var vClass = {
	
	  deep: true,
	
	  update: function update(value) {
	    if (value && typeof value === 'string') {
	      this.handleObject(stringToObject(value));
	    } else if (isPlainObject(value)) {
	      this.handleObject(value);
	    } else if (isArray(value)) {
	      this.handleArray(value);
	    } else {
	      this.cleanup();
	    }
	  },
	
	  handleObject: function handleObject(value) {
	    this.cleanup(value);
	    var keys = this.prevKeys = Object.keys(value);
	    for (var i = 0, l = keys.length; i < l; i++) {
	      var key = keys[i];
	      if (value[key]) {
	        addClass(this.el, key);
	      } else {
	        removeClass(this.el, key);
	      }
	    }
	  },
	
	  handleArray: function handleArray(value) {
	    this.cleanup(value);
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (value[i]) {
	        addClass(this.el, value[i]);
	      }
	    }
	    this.prevKeys = value.slice();
	  },
	
	  cleanup: function cleanup(value) {
	    if (this.prevKeys) {
	      var i = this.prevKeys.length;
	      while (i--) {
	        var key = this.prevKeys[i];
	        if (key && (!value || !contains$1(value, key))) {
	          removeClass(this.el, key);
	        }
	      }
	    }
	  }
	};
	
	function stringToObject(value) {
	  var res = {};
	  var keys = value.trim().split(/\s+/);
	  var i = keys.length;
	  while (i--) {
	    res[keys[i]] = true;
	  }
	  return res;
	}
	
	function contains$1(value, key) {
	  return isArray(value) ? value.indexOf(key) > -1 : hasOwn(value, key);
	}
	
	var internalDirectives = {
	  style: style,
	  'class': vClass,
	  component: component,
	  prop: propDef,
	  transition: transition
	};
	
	var propBindingModes = config._propBindingModes;
	var empty = {};
	
	// regexes
	var identRE$1 = /^[$_a-zA-Z]+[\w$]*$/;
	var settablePathRE = /^[A-Za-z_$][\w$]*(\.[A-Za-z_$][\w$]*|\[[^\[\]]+\])*$/;
	
	/**
	 * Compile props on a root element and return
	 * a props link function.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Array} propOptions
	 * @return {Function} propsLinkFn
	 */
	
	function compileProps(el, propOptions) {
	  var props = [];
	  var names = Object.keys(propOptions);
	  var i = names.length;
	  var options, name, attr, value, path, parsed, prop;
	  while (i--) {
	    name = names[i];
	    options = propOptions[name] || empty;
	
	    if (process.env.NODE_ENV !== 'production' && name === '$data') {
	      warn('Do not use $data as prop.');
	      continue;
	    }
	
	    // props could contain dashes, which will be
	    // interpreted as minus calculations by the parser
	    // so we need to camelize the path here
	    path = camelize(name);
	    if (!identRE$1.test(path)) {
	      process.env.NODE_ENV !== 'production' && warn('Invalid prop key: "' + name + '". Prop keys ' + 'must be valid identifiers.');
	      continue;
	    }
	
	    prop = {
	      name: name,
	      path: path,
	      options: options,
	      mode: propBindingModes.ONE_WAY,
	      raw: null
	    };
	
	    attr = hyphenate(name);
	    // first check dynamic version
	    if ((value = getBindAttr(el, attr)) === null) {
	      if ((value = getBindAttr(el, attr + '.sync')) !== null) {
	        prop.mode = propBindingModes.TWO_WAY;
	      } else if ((value = getBindAttr(el, attr + '.once')) !== null) {
	        prop.mode = propBindingModes.ONE_TIME;
	      }
	    }
	    if (value !== null) {
	      // has dynamic binding!
	      prop.raw = value;
	      parsed = parseDirective(value);
	      value = parsed.expression;
	      prop.filters = parsed.filters;
	      // check binding type
	      if (isLiteral(value)) {
	        // for expressions containing literal numbers and
	        // booleans, there's no need to setup a prop binding,
	        // so we can optimize them as a one-time set.
	        prop.optimizedLiteral = true;
	      } else {
	        prop.dynamic = true;
	        // check non-settable path for two-way bindings
	        if (process.env.NODE_ENV !== 'production' && prop.mode === propBindingModes.TWO_WAY && !settablePathRE.test(value)) {
	          prop.mode = propBindingModes.ONE_WAY;
	          warn('Cannot bind two-way prop with non-settable ' + 'parent path: ' + value);
	        }
	      }
	      prop.parentPath = value;
	
	      // warn required two-way
	      if (process.env.NODE_ENV !== 'production' && options.twoWay && prop.mode !== propBindingModes.TWO_WAY) {
	        warn('Prop "' + name + '" expects a two-way binding type.');
	      }
	    } else if ((value = getAttr(el, attr)) !== null) {
	      // has literal binding!
	      prop.raw = value;
	    } else if (options.required) {
	      // warn missing required
	      process.env.NODE_ENV !== 'production' && warn('Missing required prop: ' + name);
	    }
	    // push prop
	    props.push(prop);
	  }
	  return makePropsLinkFn(props);
	}
	
	/**
	 * Build a function that applies props to a vm.
	 *
	 * @param {Array} props
	 * @return {Function} propsLinkFn
	 */
	
	function makePropsLinkFn(props) {
	  return function propsLinkFn(vm, scope) {
	    // store resolved props info
	    vm._props = {};
	    var i = props.length;
	    var prop, path, options, value, raw;
	    while (i--) {
	      prop = props[i];
	      raw = prop.raw;
	      path = prop.path;
	      options = prop.options;
	      vm._props[path] = prop;
	      if (raw === null) {
	        // initialize absent prop
	        initProp(vm, prop, getDefault(vm, options));
	      } else if (prop.dynamic) {
	        // dynamic prop
	        if (vm._context) {
	          if (prop.mode === propBindingModes.ONE_TIME) {
	            // one time binding
	            value = (scope || vm._context).$get(prop.parentPath);
	            initProp(vm, prop, value);
	          } else {
	            // dynamic binding
	            vm._bindDir({
	              name: 'prop',
	              def: propDef,
	              prop: prop
	            }, null, null, scope); // el, host, scope
	          }
	        } else {
	            process.env.NODE_ENV !== 'production' && warn('Cannot bind dynamic prop on a root instance' + ' with no parent: ' + prop.name + '="' + raw + '"');
	          }
	      } else if (prop.optimizedLiteral) {
	        // optimized literal, cast it and just set once
	        var stripped = stripQuotes(raw);
	        value = stripped === raw ? toBoolean(toNumber(raw)) : stripped;
	        initProp(vm, prop, value);
	      } else {
	        // string literal, but we need to cater for
	        // Boolean props with no value
	        value = options.type === Boolean && raw === '' ? true : raw;
	        initProp(vm, prop, value);
	      }
	    }
	  };
	}
	
	/**
	 * Get the default value of a prop.
	 *
	 * @param {Vue} vm
	 * @param {Object} options
	 * @return {*}
	 */
	
	function getDefault(vm, options) {
	  // no default, return undefined
	  if (!hasOwn(options, 'default')) {
	    // absent boolean value defaults to false
	    return options.type === Boolean ? false : undefined;
	  }
	  var def = options['default'];
	  // warn against non-factory defaults for Object & Array
	  if (isObject(def)) {
	    process.env.NODE_ENV !== 'production' && warn('Object/Array as default prop values will be shared ' + 'across multiple instances. Use a factory function ' + 'to return the default value instead.');
	  }
	  // call factory function for non-Function types
	  return typeof def === 'function' && options.type !== Function ? def.call(vm) : def;
	}
	
	// special binding prefixes
	var bindRE = /^v-bind:|^:/;
	var onRE = /^v-on:|^@/;
	var argRE = /:(.*)$/;
	var modifierRE = /\.[^\.]+/g;
	var transitionRE = /^(v-bind:|:)?transition$/;
	
	// terminal directives
	var terminalDirectives = ['for', 'if'];
	
	// default directive priority
	var DEFAULT_PRIORITY = 1000;
	
	/**
	 * Compile a template and return a reusable composite link
	 * function, which recursively contains more link functions
	 * inside. This top level compile function would normally
	 * be called on instance root nodes, but can also be used
	 * for partial compilation if the partial argument is true.
	 *
	 * The returned composite link function, when called, will
	 * return an unlink function that tearsdown all directives
	 * created during the linking phase.
	 *
	 * @param {Element|DocumentFragment} el
	 * @param {Object} options
	 * @param {Boolean} partial
	 * @return {Function}
	 */
	
	function compile(el, options, partial) {
	  // link function for the node itself.
	  var nodeLinkFn = partial || !options._asComponent ? compileNode(el, options) : null;
	  // link function for the childNodes
	  var childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && el.tagName !== 'SCRIPT' && el.hasChildNodes() ? compileNodeList(el.childNodes, options) : null;
	
	  /**
	   * A composite linker function to be called on a already
	   * compiled piece of DOM, which instantiates all directive
	   * instances.
	   *
	   * @param {Vue} vm
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host] - host vm of transcluded content
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - link context fragment
	   * @return {Function|undefined}
	   */
	
	  return function compositeLinkFn(vm, el, host, scope, frag) {
	    // cache childNodes before linking parent, fix #657
	    var childNodes = toArray(el.childNodes);
	    // link
	    var dirs = linkAndCapture(function compositeLinkCapturer() {
	      if (nodeLinkFn) nodeLinkFn(vm, el, host, scope, frag);
	      if (childLinkFn) childLinkFn(vm, childNodes, host, scope, frag);
	    }, vm);
	    return makeUnlinkFn(vm, dirs);
	  };
	}
	
	/**
	 * Apply a linker to a vm/element pair and capture the
	 * directives created during the process.
	 *
	 * @param {Function} linker
	 * @param {Vue} vm
	 */
	
	function linkAndCapture(linker, vm) {
	  var originalDirCount = vm._directives.length;
	  linker();
	  var dirs = vm._directives.slice(originalDirCount);
	  dirs.sort(directiveComparator);
	  for (var i = 0, l = dirs.length; i < l; i++) {
	    dirs[i]._bind();
	  }
	  return dirs;
	}
	
	/**
	 * Directive priority sort comparator
	 *
	 * @param {Object} a
	 * @param {Object} b
	 */
	
	function directiveComparator(a, b) {
	  a = a.descriptor.def.priority || DEFAULT_PRIORITY;
	  b = b.descriptor.def.priority || DEFAULT_PRIORITY;
	  return a > b ? -1 : a === b ? 0 : 1;
	}
	
	/**
	 * Linker functions return an unlink function that
	 * tearsdown all directives instances generated during
	 * the process.
	 *
	 * We create unlink functions with only the necessary
	 * information to avoid retaining additional closures.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Vue} [context]
	 * @param {Array} [contextDirs]
	 * @return {Function}
	 */
	
	function makeUnlinkFn(vm, dirs, context, contextDirs) {
	  return function unlink(destroying) {
	    teardownDirs(vm, dirs, destroying);
	    if (context && contextDirs) {
	      teardownDirs(context, contextDirs);
	    }
	  };
	}
	
	/**
	 * Teardown partial linked directives.
	 *
	 * @param {Vue} vm
	 * @param {Array} dirs
	 * @param {Boolean} destroying
	 */
	
	function teardownDirs(vm, dirs, destroying) {
	  var i = dirs.length;
	  while (i--) {
	    dirs[i]._teardown();
	    if (!destroying) {
	      vm._directives.$remove(dirs[i]);
	    }
	  }
	}
	
	/**
	 * Compile link props on an instance.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} props
	 * @param {Object} [scope]
	 * @return {Function}
	 */
	
	function compileAndLinkProps(vm, el, props, scope) {
	  var propsLinkFn = compileProps(el, props);
	  var propDirs = linkAndCapture(function () {
	    propsLinkFn(vm, scope);
	  }, vm);
	  return makeUnlinkFn(vm, propDirs);
	}
	
	/**
	 * Compile the root element of an instance.
	 *
	 * 1. attrs on context container (context scope)
	 * 2. attrs on the component template root node, if
	 *    replace:true (child scope)
	 *
	 * If this is a fragment instance, we only need to compile 1.
	 *
	 * @param {Vue} vm
	 * @param {Element} el
	 * @param {Object} options
	 * @param {Object} contextOptions
	 * @return {Function}
	 */
	
	function compileRoot(el, options, contextOptions) {
	  var containerAttrs = options._containerAttrs;
	  var replacerAttrs = options._replacerAttrs;
	  var contextLinkFn, replacerLinkFn;
	
	  // only need to compile other attributes for
	  // non-fragment instances
	  if (el.nodeType !== 11) {
	    // for components, container and replacer need to be
	    // compiled separately and linked in different scopes.
	    if (options._asComponent) {
	      // 2. container attributes
	      if (containerAttrs && contextOptions) {
	        contextLinkFn = compileDirectives(containerAttrs, contextOptions);
	      }
	      if (replacerAttrs) {
	        // 3. replacer attributes
	        replacerLinkFn = compileDirectives(replacerAttrs, options);
	      }
	    } else {
	      // non-component, just compile as a normal element.
	      replacerLinkFn = compileDirectives(el.attributes, options);
	    }
	  } else if (process.env.NODE_ENV !== 'production' && containerAttrs) {
	    // warn container directives for fragment instances
	    var names = containerAttrs.filter(function (attr) {
	      // allow vue-loader/vueify scoped css attributes
	      return attr.name.indexOf('_v-') < 0 &&
	      // allow event listeners
	      !onRE.test(attr.name) &&
	      // allow slots
	      attr.name !== 'slot';
	    }).map(function (attr) {
	      return '"' + attr.name + '"';
	    });
	    if (names.length) {
	      var plural = names.length > 1;
	      warn('Attribute' + (plural ? 's ' : ' ') + names.join(', ') + (plural ? ' are' : ' is') + ' ignored on component ' + '<' + options.el.tagName.toLowerCase() + '> because ' + 'the component is a fragment instance: ' + 'http://vuejs.org/guide/components.html#Fragment_Instance');
	    }
	  }
	
	  return function rootLinkFn(vm, el, scope) {
	    // link context scope dirs
	    var context = vm._context;
	    var contextDirs;
	    if (context && contextLinkFn) {
	      contextDirs = linkAndCapture(function () {
	        contextLinkFn(context, el, null, scope);
	      }, context);
	    }
	
	    // link self
	    var selfDirs = linkAndCapture(function () {
	      if (replacerLinkFn) replacerLinkFn(vm, el);
	    }, vm);
	
	    // return the unlink function that tearsdown context
	    // container directives.
	    return makeUnlinkFn(vm, selfDirs, context, contextDirs);
	  };
	}
	
	/**
	 * Compile a node and return a nodeLinkFn based on the
	 * node type.
	 *
	 * @param {Node} node
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileNode(node, options) {
	  var type = node.nodeType;
	  if (type === 1 && node.tagName !== 'SCRIPT') {
	    return compileElement(node, options);
	  } else if (type === 3 && node.data.trim()) {
	    return compileTextNode(node, options);
	  } else {
	    return null;
	  }
	}
	
	/**
	 * Compile an element and return a nodeLinkFn.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|null}
	 */
	
	function compileElement(el, options) {
	  // preprocess textareas.
	  // textarea treats its text content as the initial value.
	  // just bind it as an attr directive for value.
	  if (el.tagName === 'TEXTAREA') {
	    var tokens = parseText(el.value);
	    if (tokens) {
	      el.setAttribute(':value', tokensToExp(tokens));
	      el.value = '';
	    }
	  }
	  var linkFn;
	  var hasAttrs = el.hasAttributes();
	  // check terminal directives (for & if)
	  if (hasAttrs) {
	    linkFn = checkTerminalDirectives(el, options);
	  }
	  // check element directives
	  if (!linkFn) {
	    linkFn = checkElementDirectives(el, options);
	  }
	  // check component
	  if (!linkFn) {
	    linkFn = checkComponent(el, options);
	  }
	  // normal directives
	  if (!linkFn && hasAttrs) {
	    linkFn = compileDirectives(el.attributes, options);
	  }
	  return linkFn;
	}
	
	/**
	 * Compile a textNode and return a nodeLinkFn.
	 *
	 * @param {TextNode} node
	 * @param {Object} options
	 * @return {Function|null} textNodeLinkFn
	 */
	
	function compileTextNode(node, options) {
	  // skip marked text nodes
	  if (node._skip) {
	    return removeText;
	  }
	
	  var tokens = parseText(node.wholeText);
	  if (!tokens) {
	    return null;
	  }
	
	  // mark adjacent text nodes as skipped,
	  // because we are using node.wholeText to compile
	  // all adjacent text nodes together. This fixes
	  // issues in IE where sometimes it splits up a single
	  // text node into multiple ones.
	  var next = node.nextSibling;
	  while (next && next.nodeType === 3) {
	    next._skip = true;
	    next = next.nextSibling;
	  }
	
	  var frag = document.createDocumentFragment();
	  var el, token;
	  for (var i = 0, l = tokens.length; i < l; i++) {
	    token = tokens[i];
	    el = token.tag ? processTextToken(token, options) : document.createTextNode(token.value);
	    frag.appendChild(el);
	  }
	  return makeTextNodeLinkFn(tokens, frag, options);
	}
	
	/**
	 * Linker for an skipped text node.
	 *
	 * @param {Vue} vm
	 * @param {Text} node
	 */
	
	function removeText(vm, node) {
	  remove(node);
	}
	
	/**
	 * Process a single text token.
	 *
	 * @param {Object} token
	 * @param {Object} options
	 * @return {Node}
	 */
	
	function processTextToken(token, options) {
	  var el;
	  if (token.oneTime) {
	    el = document.createTextNode(token.value);
	  } else {
	    if (token.html) {
	      el = document.createComment('v-html');
	      setTokenType('html');
	    } else {
	      // IE will clean up empty textNodes during
	      // frag.cloneNode(true), so we have to give it
	      // something here...
	      el = document.createTextNode(' ');
	      setTokenType('text');
	    }
	  }
	  function setTokenType(type) {
	    if (token.descriptor) return;
	    var parsed = parseDirective(token.value);
	    token.descriptor = {
	      name: type,
	      def: publicDirectives[type],
	      expression: parsed.expression,
	      filters: parsed.filters
	    };
	  }
	  return el;
	}
	
	/**
	 * Build a function that processes a textNode.
	 *
	 * @param {Array<Object>} tokens
	 * @param {DocumentFragment} frag
	 */
	
	function makeTextNodeLinkFn(tokens, frag) {
	  return function textNodeLinkFn(vm, el, host, scope) {
	    var fragClone = frag.cloneNode(true);
	    var childNodes = toArray(fragClone.childNodes);
	    var token, value, node;
	    for (var i = 0, l = tokens.length; i < l; i++) {
	      token = tokens[i];
	      value = token.value;
	      if (token.tag) {
	        node = childNodes[i];
	        if (token.oneTime) {
	          value = (scope || vm).$eval(value);
	          if (token.html) {
	            replace(node, parseTemplate(value, true));
	          } else {
	            node.data = value;
	          }
	        } else {
	          vm._bindDir(token.descriptor, node, host, scope);
	        }
	      }
	    }
	    replace(el, fragClone);
	  };
	}
	
	/**
	 * Compile a node list and return a childLinkFn.
	 *
	 * @param {NodeList} nodeList
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function compileNodeList(nodeList, options) {
	  var linkFns = [];
	  var nodeLinkFn, childLinkFn, node;
	  for (var i = 0, l = nodeList.length; i < l; i++) {
	    node = nodeList[i];
	    nodeLinkFn = compileNode(node, options);
	    childLinkFn = !(nodeLinkFn && nodeLinkFn.terminal) && node.tagName !== 'SCRIPT' && node.hasChildNodes() ? compileNodeList(node.childNodes, options) : null;
	    linkFns.push(nodeLinkFn, childLinkFn);
	  }
	  return linkFns.length ? makeChildLinkFn(linkFns) : null;
	}
	
	/**
	 * Make a child link function for a node's childNodes.
	 *
	 * @param {Array<Function>} linkFns
	 * @return {Function} childLinkFn
	 */
	
	function makeChildLinkFn(linkFns) {
	  return function childLinkFn(vm, nodes, host, scope, frag) {
	    var node, nodeLinkFn, childrenLinkFn;
	    for (var i = 0, n = 0, l = linkFns.length; i < l; n++) {
	      node = nodes[n];
	      nodeLinkFn = linkFns[i++];
	      childrenLinkFn = linkFns[i++];
	      // cache childNodes before linking parent, fix #657
	      var childNodes = toArray(node.childNodes);
	      if (nodeLinkFn) {
	        nodeLinkFn(vm, node, host, scope, frag);
	      }
	      if (childrenLinkFn) {
	        childrenLinkFn(vm, childNodes, host, scope, frag);
	      }
	    }
	  };
	}
	
	/**
	 * Check for element directives (custom elements that should
	 * be resovled as terminal directives).
	 *
	 * @param {Element} el
	 * @param {Object} options
	 */
	
	function checkElementDirectives(el, options) {
	  var tag = el.tagName.toLowerCase();
	  if (commonTagRE.test(tag)) return;
	  // special case: give named slot a higher priority
	  // than unnamed slots
	  if (tag === 'slot' && hasBindAttr(el, 'name')) {
	    tag = '_namedSlot';
	  }
	  var def = resolveAsset(options, 'elementDirectives', tag);
	  if (def) {
	    return makeTerminalNodeLinkFn(el, tag, '', options, def);
	  }
	}
	
	/**
	 * Check if an element is a component. If yes, return
	 * a component link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function|undefined}
	 */
	
	function checkComponent(el, options) {
	  var component = checkComponentAttr(el, options);
	  if (component) {
	    var ref = findRef(el);
	    var descriptor = {
	      name: 'component',
	      ref: ref,
	      expression: component.id,
	      def: internalDirectives.component,
	      modifiers: {
	        literal: !component.dynamic
	      }
	    };
	    var componentLinkFn = function componentLinkFn(vm, el, host, scope, frag) {
	      if (ref) {
	        defineReactive((scope || vm).$refs, ref, null);
	      }
	      vm._bindDir(descriptor, el, host, scope, frag);
	    };
	    componentLinkFn.terminal = true;
	    return componentLinkFn;
	  }
	}
	
	/**
	 * Check an element for terminal directives in fixed order.
	 * If it finds one, return a terminal link function.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Function} terminalLinkFn
	 */
	
	function checkTerminalDirectives(el, options) {
	  // skip v-pre
	  if (getAttr(el, 'v-pre') !== null) {
	    return skip;
	  }
	  // skip v-else block, but only if following v-if
	  if (el.hasAttribute('v-else')) {
	    var prev = el.previousElementSibling;
	    if (prev && prev.hasAttribute('v-if')) {
	      return skip;
	    }
	  }
	  var value, dirName;
	  for (var i = 0, l = terminalDirectives.length; i < l; i++) {
	    dirName = terminalDirectives[i];
	    /* eslint-disable no-cond-assign */
	    if (value = el.getAttribute('v-' + dirName)) {
	      return makeTerminalNodeLinkFn(el, dirName, value, options);
	    }
	    /* eslint-enable no-cond-assign */
	  }
	}
	
	function skip() {}
	skip.terminal = true;
	
	/**
	 * Build a node link function for a terminal directive.
	 * A terminal link function terminates the current
	 * compilation recursion and handles compilation of the
	 * subtree in the directive.
	 *
	 * @param {Element} el
	 * @param {String} dirName
	 * @param {String} value
	 * @param {Object} options
	 * @param {Object} [def]
	 * @return {Function} terminalLinkFn
	 */
	
	function makeTerminalNodeLinkFn(el, dirName, value, options, def) {
	  var parsed = parseDirective(value);
	  var descriptor = {
	    name: dirName,
	    expression: parsed.expression,
	    filters: parsed.filters,
	    raw: value,
	    // either an element directive, or if/for
	    def: def || publicDirectives[dirName]
	  };
	  // check ref for v-for and router-view
	  if (dirName === 'for' || dirName === 'router-view') {
	    descriptor.ref = findRef(el);
	  }
	  var fn = function terminalNodeLinkFn(vm, el, host, scope, frag) {
	    if (descriptor.ref) {
	      defineReactive((scope || vm).$refs, descriptor.ref, null);
	    }
	    vm._bindDir(descriptor, el, host, scope, frag);
	  };
	  fn.terminal = true;
	  return fn;
	}
	
	/**
	 * Compile the directives on an element and return a linker.
	 *
	 * @param {Array|NamedNodeMap} attrs
	 * @param {Object} options
	 * @return {Function}
	 */
	
	function compileDirectives(attrs, options) {
	  var i = attrs.length;
	  var dirs = [];
	  var attr, name, value, rawName, rawValue, dirName, arg, modifiers, dirDef, tokens;
	  while (i--) {
	    attr = attrs[i];
	    name = rawName = attr.name;
	    value = rawValue = attr.value;
	    tokens = parseText(value);
	    // reset arg
	    arg = null;
	    // check modifiers
	    modifiers = parseModifiers(name);
	    name = name.replace(modifierRE, '');
	
	    // attribute interpolations
	    if (tokens) {
	      value = tokensToExp(tokens);
	      arg = name;
	      pushDir('bind', publicDirectives.bind, true);
	      // warn against mixing mustaches with v-bind
	      if (process.env.NODE_ENV !== 'production') {
	        if (name === 'class' && Array.prototype.some.call(attrs, function (attr) {
	          return attr.name === ':class' || attr.name === 'v-bind:class';
	        })) {
	          warn('class="' + rawValue + '": Do not mix mustache interpolation ' + 'and v-bind for "class" on the same element. Use one or the other.');
	        }
	      }
	    } else
	
	      // special attribute: transition
	      if (transitionRE.test(name)) {
	        modifiers.literal = !bindRE.test(name);
	        pushDir('transition', internalDirectives.transition);
	      } else
	
	        // event handlers
	        if (onRE.test(name)) {
	          arg = name.replace(onRE, '');
	          pushDir('on', publicDirectives.on);
	        } else
	
	          // attribute bindings
	          if (bindRE.test(name)) {
	            dirName = name.replace(bindRE, '');
	            if (dirName === 'style' || dirName === 'class') {
	              pushDir(dirName, internalDirectives[dirName]);
	            } else {
	              arg = dirName;
	              pushDir('bind', publicDirectives.bind);
	            }
	          } else
	
	            // normal directives
	            if (name.indexOf('v-') === 0) {
	              // check arg
	              arg = (arg = name.match(argRE)) && arg[1];
	              if (arg) {
	                name = name.replace(argRE, '');
	              }
	              // extract directive name
	              dirName = name.slice(2);
	
	              // skip v-else (when used with v-show)
	              if (dirName === 'else') {
	                continue;
	              }
	
	              dirDef = resolveAsset(options, 'directives', dirName);
	
	              if (process.env.NODE_ENV !== 'production') {
	                assertAsset(dirDef, 'directive', dirName);
	              }
	
	              if (dirDef) {
	                pushDir(dirName, dirDef);
	              }
	            }
	  }
	
	  /**
	   * Push a directive.
	   *
	   * @param {String} dirName
	   * @param {Object|Function} def
	   * @param {Boolean} [interp]
	   */
	
	  function pushDir(dirName, def, interp) {
	    var parsed = parseDirective(value);
	    dirs.push({
	      name: dirName,
	      attr: rawName,
	      raw: rawValue,
	      def: def,
	      arg: arg,
	      modifiers: modifiers,
	      expression: parsed.expression,
	      filters: parsed.filters,
	      interp: interp
	    });
	  }
	
	  if (dirs.length) {
	    return makeNodeLinkFn(dirs);
	  }
	}
	
	/**
	 * Parse modifiers from directive attribute name.
	 *
	 * @param {String} name
	 * @return {Object}
	 */
	
	function parseModifiers(name) {
	  var res = Object.create(null);
	  var match = name.match(modifierRE);
	  if (match) {
	    var i = match.length;
	    while (i--) {
	      res[match[i].slice(1)] = true;
	    }
	  }
	  return res;
	}
	
	/**
	 * Build a link function for all directives on a single node.
	 *
	 * @param {Array} directives
	 * @return {Function} directivesLinkFn
	 */
	
	function makeNodeLinkFn(directives) {
	  return function nodeLinkFn(vm, el, host, scope, frag) {
	    // reverse apply because it's sorted low to high
	    var i = directives.length;
	    while (i--) {
	      vm._bindDir(directives[i], el, host, scope, frag);
	    }
	  };
	}
	
	var specialCharRE = /[^\w\-:\.]/;
	
	/**
	 * Process an element or a DocumentFragment based on a
	 * instance option object. This allows us to transclude
	 * a template node/fragment before the instance is created,
	 * so the processed fragment can then be cloned and reused
	 * in v-for.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transclude(el, options) {
	  // extract container attributes to pass them down
	  // to compiler, because they need to be compiled in
	  // parent scope. we are mutating the options object here
	  // assuming the same object will be used for compile
	  // right after this.
	  if (options) {
	    options._containerAttrs = extractAttrs(el);
	  }
	  // for template tags, what we want is its content as
	  // a documentFragment (for fragment instances)
	  if (isTemplate(el)) {
	    el = parseTemplate(el);
	  }
	  if (options) {
	    if (options._asComponent && !options.template) {
	      options.template = '<slot></slot>';
	    }
	    if (options.template) {
	      options._content = extractContent(el);
	      el = transcludeTemplate(el, options);
	    }
	  }
	  if (el instanceof DocumentFragment) {
	    // anchors for fragment instance
	    // passing in `persist: true` to avoid them being
	    // discarded by IE during template cloning
	    prepend(createAnchor('v-start', true), el);
	    el.appendChild(createAnchor('v-end', true));
	  }
	  return el;
	}
	
	/**
	 * Process the template option.
	 * If the replace option is true this will swap the $el.
	 *
	 * @param {Element} el
	 * @param {Object} options
	 * @return {Element|DocumentFragment}
	 */
	
	function transcludeTemplate(el, options) {
	  var template = options.template;
	  var frag = parseTemplate(template, true);
	  if (frag) {
	    var replacer = frag.firstChild;
	    var tag = replacer.tagName && replacer.tagName.toLowerCase();
	    if (options.replace) {
	      /* istanbul ignore if */
	      if (el === document.body) {
	        process.env.NODE_ENV !== 'production' && warn('You are mounting an instance with a template to ' + '<body>. This will replace <body> entirely. You ' + 'should probably use `replace: false` here.');
	      }
	      // there are many cases where the instance must
	      // become a fragment instance: basically anything that
	      // can create more than 1 root nodes.
	      if (
	      // multi-children template
	      frag.childNodes.length > 1 ||
	      // non-element template
	      replacer.nodeType !== 1 ||
	      // single nested component
	      tag === 'component' || resolveAsset(options, 'components', tag) || hasBindAttr(replacer, 'is') ||
	      // element directive
	      resolveAsset(options, 'elementDirectives', tag) ||
	      // for block
	      replacer.hasAttribute('v-for') ||
	      // if block
	      replacer.hasAttribute('v-if')) {
	        return frag;
	      } else {
	        options._replacerAttrs = extractAttrs(replacer);
	        mergeAttrs(el, replacer);
	        return replacer;
	      }
	    } else {
	      el.appendChild(frag);
	      return el;
	    }
	  } else {
	    process.env.NODE_ENV !== 'production' && warn('Invalid template option: ' + template);
	  }
	}
	
	/**
	 * Helper to extract a component container's attributes
	 * into a plain object array.
	 *
	 * @param {Element} el
	 * @return {Array}
	 */
	
	function extractAttrs(el) {
	  if (el.nodeType === 1 && el.hasAttributes()) {
	    return toArray(el.attributes);
	  }
	}
	
	/**
	 * Merge the attributes of two elements, and make sure
	 * the class names are merged properly.
	 *
	 * @param {Element} from
	 * @param {Element} to
	 */
	
	function mergeAttrs(from, to) {
	  var attrs = from.attributes;
	  var i = attrs.length;
	  var name, value;
	  while (i--) {
	    name = attrs[i].name;
	    value = attrs[i].value;
	    if (!to.hasAttribute(name) && !specialCharRE.test(name)) {
	      to.setAttribute(name, value);
	    } else if (name === 'class') {
	      value.split(/\s+/).forEach(function (cls) {
	        addClass(to, cls);
	      });
	    }
	  }
	}
	
	var compiler = Object.freeze({
		compile: compile,
		compileAndLinkProps: compileAndLinkProps,
		compileRoot: compileRoot,
		transclude: transclude
	});
	
	function stateMixin (Vue) {
	
	  /**
	   * Accessor for `$data` property, since setting $data
	   * requires observing the new object and updating
	   * proxied properties.
	   */
	
	  Object.defineProperty(Vue.prototype, '$data', {
	    get: function get() {
	      return this._data;
	    },
	    set: function set(newData) {
	      if (newData !== this._data) {
	        this._setData(newData);
	      }
	    }
	  });
	
	  /**
	   * Setup the scope of an instance, which contains:
	   * - observed data
	   * - computed properties
	   * - user methods
	   * - meta properties
	   */
	
	  Vue.prototype._initState = function () {
	    this._initProps();
	    this._initMeta();
	    this._initMethods();
	    this._initData();
	    this._initComputed();
	  };
	
	  /**
	   * Initialize props.
	   */
	
	  Vue.prototype._initProps = function () {
	    var options = this.$options;
	    var el = options.el;
	    var props = options.props;
	    if (props && !el) {
	      process.env.NODE_ENV !== 'production' && warn('Props will not be compiled if no `el` option is ' + 'provided at instantiation.');
	    }
	    // make sure to convert string selectors into element now
	    el = options.el = query(el);
	    this._propsUnlinkFn = el && el.nodeType === 1 && props
	    // props must be linked in proper scope if inside v-for
	    ? compileAndLinkProps(this, el, props, this._scope) : null;
	  };
	
	  /**
	   * Initialize the data.
	   */
	
	  Vue.prototype._initData = function () {
	    var propsData = this._data;
	    var optionsDataFn = this.$options.data;
	    var optionsData = optionsDataFn && optionsDataFn();
	    if (optionsData) {
	      this._data = optionsData;
	      for (var prop in propsData) {
	        if (process.env.NODE_ENV !== 'production' && hasOwn(optionsData, prop)) {
	          warn('Data field "' + prop + '" is already defined ' + 'as a prop. Use prop default value instead.');
	        }
	        if (this._props[prop].raw !== null || !hasOwn(optionsData, prop)) {
	          set(optionsData, prop, propsData[prop]);
	        }
	      }
	    }
	    var data = this._data;
	    // proxy data on instance
	    var keys = Object.keys(data);
	    var i, key;
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      this._proxy(key);
	    }
	    // observe data
	    observe(data, this);
	  };
	
	  /**
	   * Swap the instance's $data. Called in $data's setter.
	   *
	   * @param {Object} newData
	   */
	
	  Vue.prototype._setData = function (newData) {
	    newData = newData || {};
	    var oldData = this._data;
	    this._data = newData;
	    var keys, key, i;
	    // unproxy keys not present in new data
	    keys = Object.keys(oldData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!(key in newData)) {
	        this._unproxy(key);
	      }
	    }
	    // proxy keys not already proxied,
	    // and trigger change for changed values
	    keys = Object.keys(newData);
	    i = keys.length;
	    while (i--) {
	      key = keys[i];
	      if (!hasOwn(this, key)) {
	        // new property
	        this._proxy(key);
	      }
	    }
	    oldData.__ob__.removeVm(this);
	    observe(newData, this);
	    this._digest();
	  };
	
	  /**
	   * Proxy a property, so that
	   * vm.prop === vm._data.prop
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._proxy = function (key) {
	    if (!isReserved(key)) {
	      // need to store ref to self here
	      // because these getter/setters might
	      // be called by child scopes via
	      // prototype inheritance.
	      var self = this;
	      Object.defineProperty(self, key, {
	        configurable: true,
	        enumerable: true,
	        get: function proxyGetter() {
	          return self._data[key];
	        },
	        set: function proxySetter(val) {
	          self._data[key] = val;
	        }
	      });
	    }
	  };
	
	  /**
	   * Unproxy a property.
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype._unproxy = function (key) {
	    if (!isReserved(key)) {
	      delete this[key];
	    }
	  };
	
	  /**
	   * Force update on every watcher in scope.
	   */
	
	  Vue.prototype._digest = function () {
	    for (var i = 0, l = this._watchers.length; i < l; i++) {
	      this._watchers[i].update(true); // shallow updates
	    }
	  };
	
	  /**
	   * Setup computed properties. They are essentially
	   * special getter/setters
	   */
	
	  function noop() {}
	  Vue.prototype._initComputed = function () {
	    var computed = this.$options.computed;
	    if (computed) {
	      for (var key in computed) {
	        var userDef = computed[key];
	        var def = {
	          enumerable: true,
	          configurable: true
	        };
	        if (typeof userDef === 'function') {
	          def.get = makeComputedGetter(userDef, this);
	          def.set = noop;
	        } else {
	          def.get = userDef.get ? userDef.cache !== false ? makeComputedGetter(userDef.get, this) : bind$1(userDef.get, this) : noop;
	          def.set = userDef.set ? bind$1(userDef.set, this) : noop;
	        }
	        Object.defineProperty(this, key, def);
	      }
	    }
	  };
	
	  function makeComputedGetter(getter, owner) {
	    var watcher = new Watcher(owner, getter, null, {
	      lazy: true
	    });
	    return function computedGetter() {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value;
	    };
	  }
	
	  /**
	   * Setup instance methods. Methods must be bound to the
	   * instance since they might be passed down as a prop to
	   * child components.
	   */
	
	  Vue.prototype._initMethods = function () {
	    var methods = this.$options.methods;
	    if (methods) {
	      for (var key in methods) {
	        this[key] = bind$1(methods[key], this);
	      }
	    }
	  };
	
	  /**
	   * Initialize meta information like $index, $key & $value.
	   */
	
	  Vue.prototype._initMeta = function () {
	    var metas = this.$options._meta;
	    if (metas) {
	      for (var key in metas) {
	        defineReactive(this, key, metas[key]);
	      }
	    }
	  };
	}
	
	var eventRE = /^v-on:|^@/;
	
	function eventsMixin (Vue) {
	
	  /**
	   * Setup the instance's option events & watchers.
	   * If the value is a string, we pull it from the
	   * instance's methods by name.
	   */
	
	  Vue.prototype._initEvents = function () {
	    var options = this.$options;
	    if (options._asComponent) {
	      registerComponentEvents(this, options.el);
	    }
	    registerCallbacks(this, '$on', options.events);
	    registerCallbacks(this, '$watch', options.watch);
	  };
	
	  /**
	   * Register v-on events on a child component
	   *
	   * @param {Vue} vm
	   * @param {Element} el
	   */
	
	  function registerComponentEvents(vm, el) {
	    var attrs = el.attributes;
	    var name, handler;
	    for (var i = 0, l = attrs.length; i < l; i++) {
	      name = attrs[i].name;
	      if (eventRE.test(name)) {
	        name = name.replace(eventRE, '');
	        handler = (vm._scope || vm._context).$eval(attrs[i].value, true);
	        vm.$on(name.replace(eventRE), handler);
	      }
	    }
	  }
	
	  /**
	   * Register callbacks for option events and watchers.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {Object} hash
	   */
	
	  function registerCallbacks(vm, action, hash) {
	    if (!hash) return;
	    var handlers, key, i, j;
	    for (key in hash) {
	      handlers = hash[key];
	      if (isArray(handlers)) {
	        for (i = 0, j = handlers.length; i < j; i++) {
	          register(vm, action, key, handlers[i]);
	        }
	      } else {
	        register(vm, action, key, handlers);
	      }
	    }
	  }
	
	  /**
	   * Helper to register an event/watch callback.
	   *
	   * @param {Vue} vm
	   * @param {String} action
	   * @param {String} key
	   * @param {Function|String|Object} handler
	   * @param {Object} [options]
	   */
	
	  function register(vm, action, key, handler, options) {
	    var type = typeof handler;
	    if (type === 'function') {
	      vm[action](key, handler, options);
	    } else if (type === 'string') {
	      var methods = vm.$options.methods;
	      var method = methods && methods[handler];
	      if (method) {
	        vm[action](key, method, options);
	      } else {
	        process.env.NODE_ENV !== 'production' && warn('Unknown method: "' + handler + '" when ' + 'registering callback for ' + action + ': "' + key + '".');
	      }
	    } else if (handler && type === 'object') {
	      register(vm, action, key, handler.handler, handler);
	    }
	  }
	
	  /**
	   * Setup recursive attached/detached calls
	   */
	
	  Vue.prototype._initDOMHooks = function () {
	    this.$on('hook:attached', onAttached);
	    this.$on('hook:detached', onDetached);
	  };
	
	  /**
	   * Callback to recursively call attached hook on children
	   */
	
	  function onAttached() {
	    if (!this._isAttached) {
	      this._isAttached = true;
	      this.$children.forEach(callAttach);
	    }
	  }
	
	  /**
	   * Iterator to call attached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callAttach(child) {
	    if (!child._isAttached && inDoc(child.$el)) {
	      child._callHook('attached');
	    }
	  }
	
	  /**
	   * Callback to recursively call detached hook on children
	   */
	
	  function onDetached() {
	    if (this._isAttached) {
	      this._isAttached = false;
	      this.$children.forEach(callDetach);
	    }
	  }
	
	  /**
	   * Iterator to call detached hook
	   *
	   * @param {Vue} child
	   */
	
	  function callDetach(child) {
	    if (child._isAttached && !inDoc(child.$el)) {
	      child._callHook('detached');
	    }
	  }
	
	  /**
	   * Trigger all handlers for a hook
	   *
	   * @param {String} hook
	   */
	
	  Vue.prototype._callHook = function (hook) {
	    this.$emit('pre-hook:' + hook);
	    var handlers = this.$options[hook];
	    if (handlers) {
	      for (var i = 0, j = handlers.length; i < j; i++) {
	        handlers[i].call(this);
	      }
	    }
	    this.$emit('hook:' + hook);
	  };
	}
	
	function noop() {}
	
	/**
	 * A directive links a DOM element with a piece of data,
	 * which is the result of evaluating an expression.
	 * It registers a watcher with the expression and calls
	 * the DOM update function when a change is triggered.
	 *
	 * @param {String} name
	 * @param {Node} el
	 * @param {Vue} vm
	 * @param {Object} descriptor
	 *                 - {String} name
	 *                 - {Object} def
	 *                 - {String} expression
	 *                 - {Array<Object>} [filters]
	 *                 - {Boolean} literal
	 *                 - {String} attr
	 *                 - {String} raw
	 * @param {Object} def - directive definition object
	 * @param {Vue} [host] - transclusion host component
	 * @param {Object} [scope] - v-for scope
	 * @param {Fragment} [frag] - owner fragment
	 * @constructor
	 */
	function Directive(descriptor, vm, el, host, scope, frag) {
	  this.vm = vm;
	  this.el = el;
	  // copy descriptor properties
	  this.descriptor = descriptor;
	  this.name = descriptor.name;
	  this.expression = descriptor.expression;
	  this.arg = descriptor.arg;
	  this.modifiers = descriptor.modifiers;
	  this.filters = descriptor.filters;
	  this.literal = this.modifiers && this.modifiers.literal;
	  // private
	  this._locked = false;
	  this._bound = false;
	  this._listeners = null;
	  // link context
	  this._host = host;
	  this._scope = scope;
	  this._frag = frag;
	  // store directives on node in dev mode
	  if (process.env.NODE_ENV !== 'production' && this.el) {
	    this.el._vue_directives = this.el._vue_directives || [];
	    this.el._vue_directives.push(this);
	  }
	}
	
	/**
	 * Initialize the directive, mixin definition properties,
	 * setup the watcher, call definition bind() and update()
	 * if present.
	 *
	 * @param {Object} def
	 */
	
	Directive.prototype._bind = function () {
	  var name = this.name;
	  var descriptor = this.descriptor;
	
	  // remove attribute
	  if ((name !== 'cloak' || this.vm._isCompiled) && this.el && this.el.removeAttribute) {
	    var attr = descriptor.attr || 'v-' + name;
	    this.el.removeAttribute(attr);
	  }
	
	  // copy def properties
	  var def = descriptor.def;
	  if (typeof def === 'function') {
	    this.update = def;
	  } else {
	    extend(this, def);
	  }
	
	  // setup directive params
	  this._setupParams();
	
	  // initial bind
	  if (this.bind) {
	    this.bind();
	  }
	  this._bound = true;
	
	  if (this.literal) {
	    this.update && this.update(descriptor.raw);
	  } else if ((this.expression || this.modifiers) && (this.update || this.twoWay) && !this._checkStatement()) {
	    // wrapped updater for context
	    var dir = this;
	    if (this.update) {
	      this._update = function (val, oldVal) {
	        if (!dir._locked) {
	          dir.update(val, oldVal);
	        }
	      };
	    } else {
	      this._update = noop;
	    }
	    var preProcess = this._preProcess ? bind$1(this._preProcess, this) : null;
	    var postProcess = this._postProcess ? bind$1(this._postProcess, this) : null;
	    var watcher = this._watcher = new Watcher(this.vm, this.expression, this._update, // callback
	    {
	      filters: this.filters,
	      twoWay: this.twoWay,
	      deep: this.deep,
	      preProcess: preProcess,
	      postProcess: postProcess,
	      scope: this._scope
	    });
	    // v-model with inital inline value need to sync back to
	    // model instead of update to DOM on init. They would
	    // set the afterBind hook to indicate that.
	    if (this.afterBind) {
	      this.afterBind();
	    } else if (this.update) {
	      this.update(watcher.value);
	    }
	  }
	};
	
	/**
	 * Setup all param attributes, e.g. track-by,
	 * transition-mode, etc...
	 */
	
	Directive.prototype._setupParams = function () {
	  if (!this.params) {
	    return;
	  }
	  var params = this.params;
	  // swap the params array with a fresh object.
	  this.params = Object.create(null);
	  var i = params.length;
	  var key, val, mappedKey;
	  while (i--) {
	    key = params[i];
	    mappedKey = camelize(key);
	    val = getBindAttr(this.el, key);
	    if (val != null) {
	      // dynamic
	      this._setupParamWatcher(mappedKey, val);
	    } else {
	      // static
	      val = getAttr(this.el, key);
	      if (val != null) {
	        this.params[mappedKey] = val === '' ? true : val;
	      }
	    }
	  }
	};
	
	/**
	 * Setup a watcher for a dynamic param.
	 *
	 * @param {String} key
	 * @param {String} expression
	 */
	
	Directive.prototype._setupParamWatcher = function (key, expression) {
	  var self = this;
	  var called = false;
	  var unwatch = (this._scope || this.vm).$watch(expression, function (val, oldVal) {
	    self.params[key] = val;
	    // since we are in immediate mode,
	    // only call the param change callbacks if this is not the first update.
	    if (called) {
	      var cb = self.paramWatchers && self.paramWatchers[key];
	      if (cb) {
	        cb.call(self, val, oldVal);
	      }
	    } else {
	      called = true;
	    }
	  }, {
	    immediate: true,
	    user: false
	  });(this._paramUnwatchFns || (this._paramUnwatchFns = [])).push(unwatch);
	};
	
	/**
	 * Check if the directive is a function caller
	 * and if the expression is a callable one. If both true,
	 * we wrap up the expression and use it as the event
	 * handler.
	 *
	 * e.g. on-click="a++"
	 *
	 * @return {Boolean}
	 */
	
	Directive.prototype._checkStatement = function () {
	  var expression = this.expression;
	  if (expression && this.acceptStatement && !isSimplePath(expression)) {
	    var fn = parseExpression(expression).get;
	    var scope = this._scope || this.vm;
	    var handler = function handler(e) {
	      scope.$event = e;
	      fn.call(scope, scope);
	      scope.$event = null;
	    };
	    if (this.filters) {
	      handler = scope._applyFilters(handler, null, this.filters);
	    }
	    this.update(handler);
	    return true;
	  }
	};
	
	/**
	 * Set the corresponding value with the setter.
	 * This should only be used in two-way directives
	 * e.g. v-model.
	 *
	 * @param {*} value
	 * @public
	 */
	
	Directive.prototype.set = function (value) {
	  /* istanbul ignore else */
	  if (this.twoWay) {
	    this._withLock(function () {
	      this._watcher.set(value);
	    });
	  } else if (process.env.NODE_ENV !== 'production') {
	    warn('Directive.set() can only be used inside twoWay' + 'directives.');
	  }
	};
	
	/**
	 * Execute a function while preventing that function from
	 * triggering updates on this directive instance.
	 *
	 * @param {Function} fn
	 */
	
	Directive.prototype._withLock = function (fn) {
	  var self = this;
	  self._locked = true;
	  fn.call(self);
	  nextTick(function () {
	    self._locked = false;
	  });
	};
	
	/**
	 * Convenience method that attaches a DOM event listener
	 * to the directive element and autometically tears it down
	 * during unbind.
	 *
	 * @param {String} event
	 * @param {Function} handler
	 */
	
	Directive.prototype.on = function (event, handler) {
	  on$1(this.el, event, handler);(this._listeners || (this._listeners = [])).push([event, handler]);
	};
	
	/**
	 * Teardown the watcher and call unbind.
	 */
	
	Directive.prototype._teardown = function () {
	  if (this._bound) {
	    this._bound = false;
	    if (this.unbind) {
	      this.unbind();
	    }
	    if (this._watcher) {
	      this._watcher.teardown();
	    }
	    var listeners = this._listeners;
	    var i;
	    if (listeners) {
	      i = listeners.length;
	      while (i--) {
	        off(this.el, listeners[i][0], listeners[i][1]);
	      }
	    }
	    var unwatchFns = this._paramUnwatchFns;
	    if (unwatchFns) {
	      i = unwatchFns.length;
	      while (i--) {
	        unwatchFns[i]();
	      }
	    }
	    if (process.env.NODE_ENV !== 'production' && this.el) {
	      this.el._vue_directives.$remove(this);
	    }
	    this.vm = this.el = this._watcher = this._listeners = null;
	  }
	};
	
	function lifecycleMixin (Vue) {
	
	  /**
	   * Update v-ref for component.
	   *
	   * @param {Boolean} remove
	   */
	
	  Vue.prototype._updateRef = function (remove) {
	    var ref = this.$options._ref;
	    if (ref) {
	      var refs = (this._scope || this._context).$refs;
	      if (remove) {
	        if (refs[ref] === this) {
	          refs[ref] = null;
	        }
	      } else {
	        refs[ref] = this;
	      }
	    }
	  };
	
	  /**
	   * Transclude, compile and link element.
	   *
	   * If a pre-compiled linker is available, that means the
	   * passed in element will be pre-transcluded and compiled
	   * as well - all we need to do is to call the linker.
	   *
	   * Otherwise we need to call transclude/compile/link here.
	   *
	   * @param {Element} el
	   * @return {Element}
	   */
	
	  Vue.prototype._compile = function (el) {
	    var options = this.$options;
	
	    // transclude and init element
	    // transclude can potentially replace original
	    // so we need to keep reference; this step also injects
	    // the template and caches the original attributes
	    // on the container node and replacer node.
	    var original = el;
	    el = transclude(el, options);
	    this._initElement(el);
	
	    // handle v-pre on root node (#2026)
	    if (el.nodeType === 1 && getAttr(el, 'v-pre') !== null) {
	      return;
	    }
	
	    // root is always compiled per-instance, because
	    // container attrs and props can be different every time.
	    var contextOptions = this._context && this._context.$options;
	    var rootLinker = compileRoot(el, options, contextOptions);
	
	    // compile and link the rest
	    var contentLinkFn;
	    var ctor = this.constructor;
	    // component compilation can be cached
	    // as long as it's not using inline-template
	    if (options._linkerCachable) {
	      contentLinkFn = ctor.linker;
	      if (!contentLinkFn) {
	        contentLinkFn = ctor.linker = compile(el, options);
	      }
	    }
	
	    // link phase
	    // make sure to link root with prop scope!
	    var rootUnlinkFn = rootLinker(this, el, this._scope);
	    var contentUnlinkFn = contentLinkFn ? contentLinkFn(this, el) : compile(el, options)(this, el);
	
	    // register composite unlink function
	    // to be called during instance destruction
	    this._unlinkFn = function () {
	      rootUnlinkFn();
	      // passing destroying: true to avoid searching and
	      // splicing the directives
	      contentUnlinkFn(true);
	    };
	
	    // finally replace original
	    if (options.replace) {
	      replace(original, el);
	    }
	
	    this._isCompiled = true;
	    this._callHook('compiled');
	    return el;
	  };
	
	  /**
	   * Initialize instance element. Called in the public
	   * $mount() method.
	   *
	   * @param {Element} el
	   */
	
	  Vue.prototype._initElement = function (el) {
	    if (el instanceof DocumentFragment) {
	      this._isFragment = true;
	      this.$el = this._fragmentStart = el.firstChild;
	      this._fragmentEnd = el.lastChild;
	      // set persisted text anchors to empty
	      if (this._fragmentStart.nodeType === 3) {
	        this._fragmentStart.data = this._fragmentEnd.data = '';
	      }
	      this._fragment = el;
	    } else {
	      this.$el = el;
	    }
	    this.$el.__vue__ = this;
	    this._callHook('beforeCompile');
	  };
	
	  /**
	   * Create and bind a directive to an element.
	   *
	   * @param {String} name - directive name
	   * @param {Node} node   - target node
	   * @param {Object} desc - parsed directive descriptor
	   * @param {Object} def  - directive definition object
	   * @param {Vue} [host] - transclusion host component
	   * @param {Object} [scope] - v-for scope
	   * @param {Fragment} [frag] - owner fragment
	   */
	
	  Vue.prototype._bindDir = function (descriptor, node, host, scope, frag) {
	    this._directives.push(new Directive(descriptor, this, node, host, scope, frag));
	  };
	
	  /**
	   * Teardown an instance, unobserves the data, unbind all the
	   * directives, turn off all the event listeners, etc.
	   *
	   * @param {Boolean} remove - whether to remove the DOM node.
	   * @param {Boolean} deferCleanup - if true, defer cleanup to
	   *                                 be called later
	   */
	
	  Vue.prototype._destroy = function (remove, deferCleanup) {
	    if (this._isBeingDestroyed) {
	      if (!deferCleanup) {
	        this._cleanup();
	      }
	      return;
	    }
	
	    var destroyReady;
	    var pendingRemoval;
	
	    var self = this;
	    // Cleanup should be called either synchronously or asynchronoysly as
	    // callback of this.$remove(), or if remove and deferCleanup are false.
	    // In any case it should be called after all other removing, unbinding and
	    // turning of is done
	    var cleanupIfPossible = function cleanupIfPossible() {
	      if (destroyReady && !pendingRemoval && !deferCleanup) {
	        self._cleanup();
	      }
	    };
	
	    // remove DOM element
	    if (remove && this.$el) {
	      pendingRemoval = true;
	      this.$remove(function () {
	        pendingRemoval = false;
	        cleanupIfPossible();
	      });
	    }
	
	    this._callHook('beforeDestroy');
	    this._isBeingDestroyed = true;
	    var i;
	    // remove self from parent. only necessary
	    // if parent is not being destroyed as well.
	    var parent = this.$parent;
	    if (parent && !parent._isBeingDestroyed) {
	      parent.$children.$remove(this);
	      // unregister ref (remove: true)
	      this._updateRef(true);
	    }
	    // destroy all children.
	    i = this.$children.length;
	    while (i--) {
	      this.$children[i].$destroy();
	    }
	    // teardown props
	    if (this._propsUnlinkFn) {
	      this._propsUnlinkFn();
	    }
	    // teardown all directives. this also tearsdown all
	    // directive-owned watchers.
	    if (this._unlinkFn) {
	      this._unlinkFn();
	    }
	    i = this._watchers.length;
	    while (i--) {
	      this._watchers[i].teardown();
	    }
	    // remove reference to self on $el
	    if (this.$el) {
	      this.$el.__vue__ = null;
	    }
	
	    destroyReady = true;
	    cleanupIfPossible();
	  };
	
	  /**
	   * Clean up to ensure garbage collection.
	   * This is called after the leave transition if there
	   * is any.
	   */
	
	  Vue.prototype._cleanup = function () {
	    if (this._isDestroyed) {
	      return;
	    }
	    // remove self from owner fragment
	    // do it in cleanup so that we can call $destroy with
	    // defer right when a fragment is about to be removed.
	    if (this._frag) {
	      this._frag.children.$remove(this);
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (this._data.__ob__) {
	      this._data.__ob__.removeVm(this);
	    }
	    // Clean up references to private properties and other
	    // instances. preserve reference to _data so that proxy
	    // accessors still work. The only potential side effect
	    // here is that mutating the instance after it's destroyed
	    // may affect the state of other components that are still
	    // observing the same object, but that seems to be a
	    // reasonable responsibility for the user rather than
	    // always throwing an error on them.
	    this.$el = this.$parent = this.$root = this.$children = this._watchers = this._context = this._scope = this._directives = null;
	    // call the last hook...
	    this._isDestroyed = true;
	    this._callHook('destroyed');
	    // turn off all instance listeners.
	    this.$off();
	  };
	}
	
	function miscMixin (Vue) {
	
	  /**
	   * Apply a list of filter (descriptors) to a value.
	   * Using plain for loops here because this will be called in
	   * the getter of any watcher with filters so it is very
	   * performance sensitive.
	   *
	   * @param {*} value
	   * @param {*} [oldValue]
	   * @param {Array} filters
	   * @param {Boolean} write
	   * @return {*}
	   */
	
	  Vue.prototype._applyFilters = function (value, oldValue, filters, write) {
	    var filter, fn, args, arg, offset, i, l, j, k;
	    for (i = 0, l = filters.length; i < l; i++) {
	      filter = filters[i];
	      fn = resolveAsset(this.$options, 'filters', filter.name);
	      if (process.env.NODE_ENV !== 'production') {
	        assertAsset(fn, 'filter', filter.name);
	      }
	      if (!fn) continue;
	      fn = write ? fn.write : fn.read || fn;
	      if (typeof fn !== 'function') continue;
	      args = write ? [value, oldValue] : [value];
	      offset = write ? 2 : 1;
	      if (filter.args) {
	        for (j = 0, k = filter.args.length; j < k; j++) {
	          arg = filter.args[j];
	          args[j + offset] = arg.dynamic ? this.$get(arg.value) : arg.value;
	        }
	      }
	      value = fn.apply(this, args);
	    }
	    return value;
	  };
	
	  /**
	   * Resolve a component, depending on whether the component
	   * is defined normally or using an async factory function.
	   * Resolves synchronously if already resolved, otherwise
	   * resolves asynchronously and caches the resolved
	   * constructor on the factory.
	   *
	   * @param {String} id
	   * @param {Function} cb
	   */
	
	  Vue.prototype._resolveComponent = function (id, cb) {
	    var factory = resolveAsset(this.$options, 'components', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(factory, 'component', id);
	    }
	    if (!factory) {
	      return;
	    }
	    // async component factory
	    if (!factory.options) {
	      if (factory.resolved) {
	        // cached
	        cb(factory.resolved);
	      } else if (factory.requested) {
	        // pool callbacks
	        factory.pendingCallbacks.push(cb);
	      } else {
	        factory.requested = true;
	        var cbs = factory.pendingCallbacks = [cb];
	        factory(function resolve(res) {
	          if (isPlainObject(res)) {
	            res = Vue.extend(res);
	          }
	          // cache resolved
	          factory.resolved = res;
	          // invoke callbacks
	          for (var i = 0, l = cbs.length; i < l; i++) {
	            cbs[i](res);
	          }
	        }, function reject(reason) {
	          process.env.NODE_ENV !== 'production' && warn('Failed to resolve async component: ' + id + '. ' + (reason ? '\nReason: ' + reason : ''));
	        });
	      }
	    } else {
	      // normal component
	      cb(factory);
	    }
	  };
	}
	
	function globalAPI (Vue) {
	
	  /**
	   * Expose useful internals
	   */
	
	  Vue.util = util;
	  Vue.config = config;
	  Vue.set = set;
	  Vue['delete'] = del;
	  Vue.nextTick = nextTick;
	
	  /**
	   * The following are exposed for advanced usage / plugins
	   */
	
	  Vue.compiler = compiler;
	  Vue.FragmentFactory = FragmentFactory;
	  Vue.internalDirectives = internalDirectives;
	  Vue.parsers = {
	    path: path,
	    text: text$1,
	    template: template,
	    directive: directive,
	    expression: expression
	  };
	
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	
	  Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   *
	   * @param {Object} extendOptions
	   */
	
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var isFirstExtend = Super.cid === 0;
	    if (isFirstExtend && extendOptions._Ctor) {
	      return extendOptions._Ctor;
	    }
	    var name = extendOptions.name || Super.options.name;
	    if (process.env.NODE_ENV !== 'production') {
	      if (!/^[a-zA-Z][\w-]+$/.test(name)) {
	        warn('Invalid component name: ' + name);
	        name = null;
	      }
	    }
	    var Sub = createClass(name || 'VueComponent');
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(Super.options, extendOptions);
	    Sub['super'] = Super;
	    // allow further extension
	    Sub.extend = Super.extend;
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    config._assetTypes.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	    // cache constructor
	    if (isFirstExtend) {
	      extendOptions._Ctor = Sub;
	    }
	    return Sub;
	  };
	
	  /**
	   * A function that returns a sub-class constructor with the
	   * given name. This gives us much nicer output when
	   * logging instances in the console.
	   *
	   * @param {String} name
	   * @return {Function}
	   */
	
	  function createClass(name) {
	    return new Function('return function ' + classify(name) + ' (options) { this._init(options) }')();
	  }
	
	  /**
	   * Plugin system
	   *
	   * @param {Object} plugin
	   */
	
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return;
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this;
	  };
	
	  /**
	   * Apply a global mixin by merging it into the default
	   * options.
	   */
	
	  Vue.mixin = function (mixin) {
	    Vue.options = mergeOptions(Vue.options, mixin);
	  };
	
	  /**
	   * Create asset registration methods with the following
	   * signature:
	   *
	   * @param {String} id
	   * @param {*} definition
	   */
	
	  config._assetTypes.forEach(function (type) {
	    Vue[type] = function (id, definition) {
	      if (!definition) {
	        return this.options[type + 's'][id];
	      } else {
	        /* istanbul ignore if */
	        if (process.env.NODE_ENV !== 'production') {
	          if (type === 'component' && (commonTagRE.test(id) || reservedTagRE.test(id))) {
	            warn('Do not use built-in or reserved HTML elements as component ' + 'id: ' + id);
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = id;
	          definition = Vue.extend(definition);
	        }
	        this.options[type + 's'][id] = definition;
	        return definition;
	      }
	    };
	  });
	}
	
	var filterRE = /[^|]\|[^|]/;
	
	function dataAPI (Vue) {
	
	  /**
	   * Get the value from an expression on this vm.
	   *
	   * @param {String} exp
	   * @param {Boolean} [asStatement]
	   * @return {*}
	   */
	
	  Vue.prototype.$get = function (exp, asStatement) {
	    var res = parseExpression(exp);
	    if (res) {
	      if (asStatement && !isSimplePath(exp)) {
	        var self = this;
	        return function statementHandler() {
	          self.$arguments = toArray(arguments);
	          res.get.call(self, self);
	          self.$arguments = null;
	        };
	      } else {
	        try {
	          return res.get.call(this, this);
	        } catch (e) {}
	      }
	    }
	  };
	
	  /**
	   * Set the value from an expression on this vm.
	   * The expression must be a valid left-hand
	   * expression in an assignment.
	   *
	   * @param {String} exp
	   * @param {*} val
	   */
	
	  Vue.prototype.$set = function (exp, val) {
	    var res = parseExpression(exp, true);
	    if (res && res.set) {
	      res.set.call(this, this, val);
	    }
	  };
	
	  /**
	   * Delete a property on the VM
	   *
	   * @param {String} key
	   */
	
	  Vue.prototype.$delete = function (key) {
	    del(this._data, key);
	  };
	
	  /**
	   * Watch an expression, trigger callback when its
	   * value changes.
	   *
	   * @param {String|Function} expOrFn
	   * @param {Function} cb
	   * @param {Object} [options]
	   *                 - {Boolean} deep
	   *                 - {Boolean} immediate
	   * @return {Function} - unwatchFn
	   */
	
	  Vue.prototype.$watch = function (expOrFn, cb, options) {
	    var vm = this;
	    var parsed;
	    if (typeof expOrFn === 'string') {
	      parsed = parseDirective(expOrFn);
	      expOrFn = parsed.expression;
	    }
	    var watcher = new Watcher(vm, expOrFn, cb, {
	      deep: options && options.deep,
	      sync: options && options.sync,
	      filters: parsed && parsed.filters,
	      user: !options || options.user !== false
	    });
	    if (options && options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn() {
	      watcher.teardown();
	    };
	  };
	
	  /**
	   * Evaluate a text directive, including filters.
	   *
	   * @param {String} text
	   * @param {Boolean} [asStatement]
	   * @return {String}
	   */
	
	  Vue.prototype.$eval = function (text, asStatement) {
	    // check for filters.
	    if (filterRE.test(text)) {
	      var dir = parseDirective(text);
	      // the filter regex check might give false positive
	      // for pipes inside strings, so it's possible that
	      // we don't get any filters here
	      var val = this.$get(dir.expression, asStatement);
	      return dir.filters ? this._applyFilters(val, null, dir.filters) : val;
	    } else {
	      // no filter
	      return this.$get(text, asStatement);
	    }
	  };
	
	  /**
	   * Interpolate a piece of template text.
	   *
	   * @param {String} text
	   * @return {String}
	   */
	
	  Vue.prototype.$interpolate = function (text) {
	    var tokens = parseText(text);
	    var vm = this;
	    if (tokens) {
	      if (tokens.length === 1) {
	        return vm.$eval(tokens[0].value) + '';
	      } else {
	        return tokens.map(function (token) {
	          return token.tag ? vm.$eval(token.value) : token.value;
	        }).join('');
	      }
	    } else {
	      return text;
	    }
	  };
	
	  /**
	   * Log instance data as a plain JS object
	   * so that it is easier to inspect in console.
	   * This method assumes console is available.
	   *
	   * @param {String} [path]
	   */
	
	  Vue.prototype.$log = function (path) {
	    var data = path ? getPath(this._data, path) : this._data;
	    if (data) {
	      data = clean(data);
	    }
	    // include computed fields
	    if (!path) {
	      for (var key in this.$options.computed) {
	        data[key] = clean(this[key]);
	      }
	    }
	    console.log(data);
	  };
	
	  /**
	   * "clean" a getter/setter converted object into a plain
	   * object copy.
	   *
	   * @param {Object} - obj
	   * @return {Object}
	   */
	
	  function clean(obj) {
	    return JSON.parse(JSON.stringify(obj));
	  }
	}
	
	function domAPI (Vue) {
	
	  /**
	   * Convenience on-instance nextTick. The callback is
	   * auto-bound to the instance, and this avoids component
	   * modules having to rely on the global Vue.
	   *
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$nextTick = function (fn) {
	    nextTick(fn, this);
	  };
	
	  /**
	   * Append instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$appendTo = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, append, appendWithTransition);
	  };
	
	  /**
	   * Prepend instance to target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$prependTo = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.hasChildNodes()) {
	      this.$before(target.firstChild, cb, withTransition);
	    } else {
	      this.$appendTo(target, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Insert instance before target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$before = function (target, cb, withTransition) {
	    return insert(this, target, cb, withTransition, beforeWithCb, beforeWithTransition);
	  };
	
	  /**
	   * Insert instance after target
	   *
	   * @param {Node} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$after = function (target, cb, withTransition) {
	    target = query(target);
	    if (target.nextSibling) {
	      this.$before(target.nextSibling, cb, withTransition);
	    } else {
	      this.$appendTo(target.parentNode, cb, withTransition);
	    }
	    return this;
	  };
	
	  /**
	   * Remove instance from DOM
	   *
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition] - defaults to true
	   */
	
	  Vue.prototype.$remove = function (cb, withTransition) {
	    if (!this.$el.parentNode) {
	      return cb && cb();
	    }
	    var inDocument = this._isAttached && inDoc(this.$el);
	    // if we are not in document, no need to check
	    // for transitions
	    if (!inDocument) withTransition = false;
	    var self = this;
	    var realCb = function realCb() {
	      if (inDocument) self._callHook('detached');
	      if (cb) cb();
	    };
	    if (this._isFragment) {
	      removeNodeRange(this._fragmentStart, this._fragmentEnd, this, this._fragment, realCb);
	    } else {
	      var op = withTransition === false ? removeWithCb : removeWithTransition;
	      op(this.$el, this, realCb);
	    }
	    return this;
	  };
	
	  /**
	   * Shared DOM insertion function.
	   *
	   * @param {Vue} vm
	   * @param {Element} target
	   * @param {Function} [cb]
	   * @param {Boolean} [withTransition]
	   * @param {Function} op1 - op for non-transition insert
	   * @param {Function} op2 - op for transition insert
	   * @return vm
	   */
	
	  function insert(vm, target, cb, withTransition, op1, op2) {
	    target = query(target);
	    var targetIsDetached = !inDoc(target);
	    var op = withTransition === false || targetIsDetached ? op1 : op2;
	    var shouldCallHook = !targetIsDetached && !vm._isAttached && !inDoc(vm.$el);
	    if (vm._isFragment) {
	      mapNodeRange(vm._fragmentStart, vm._fragmentEnd, function (node) {
	        op(node, target, vm);
	      });
	      cb && cb();
	    } else {
	      op(vm.$el, target, vm, cb);
	    }
	    if (shouldCallHook) {
	      vm._callHook('attached');
	    }
	    return vm;
	  }
	
	  /**
	   * Check for selectors
	   *
	   * @param {String|Element} el
	   */
	
	  function query(el) {
	    return typeof el === 'string' ? document.querySelector(el) : el;
	  }
	
	  /**
	   * Append operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function append(el, target, vm, cb) {
	    target.appendChild(el);
	    if (cb) cb();
	  }
	
	  /**
	   * InsertBefore operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Node} target
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function beforeWithCb(el, target, vm, cb) {
	    before(el, target);
	    if (cb) cb();
	  }
	
	  /**
	   * Remove operation that takes a callback.
	   *
	   * @param {Node} el
	   * @param {Vue} vm - unused
	   * @param {Function} [cb]
	   */
	
	  function removeWithCb(el, vm, cb) {
	    remove(el);
	    if (cb) cb();
	  }
	}
	
	function eventsAPI (Vue) {
	
	  /**
	   * Listen on the given `event` with `fn`.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$on = function (event, fn) {
	    (this._events[event] || (this._events[event] = [])).push(fn);
	    modifyListenerCount(this, event, 1);
	    return this;
	  };
	
	  /**
	   * Adds an `event` listener that will be invoked a single
	   * time then automatically removed.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$once = function (event, fn) {
	    var self = this;
	    function on() {
	      self.$off(event, on);
	      fn.apply(this, arguments);
	    }
	    on.fn = fn;
	    this.$on(event, on);
	    return this;
	  };
	
	  /**
	   * Remove the given callback for `event` or all
	   * registered callbacks.
	   *
	   * @param {String} event
	   * @param {Function} fn
	   */
	
	  Vue.prototype.$off = function (event, fn) {
	    var cbs;
	    // all
	    if (!arguments.length) {
	      if (this.$parent) {
	        for (event in this._events) {
	          cbs = this._events[event];
	          if (cbs) {
	            modifyListenerCount(this, event, -cbs.length);
	          }
	        }
	      }
	      this._events = {};
	      return this;
	    }
	    // specific event
	    cbs = this._events[event];
	    if (!cbs) {
	      return this;
	    }
	    if (arguments.length === 1) {
	      modifyListenerCount(this, event, -cbs.length);
	      this._events[event] = null;
	      return this;
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        modifyListenerCount(this, event, -1);
	        cbs.splice(i, 1);
	        break;
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Trigger an event on self.
	   *
	   * @param {String} event
	   * @return {Boolean} shouldPropagate
	   */
	
	  Vue.prototype.$emit = function (event) {
	    var cbs = this._events[event];
	    var shouldPropagate = !cbs;
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        var res = cbs[i].apply(this, args);
	        if (res === true) {
	          shouldPropagate = true;
	        }
	      }
	    }
	    return shouldPropagate;
	  };
	
	  /**
	   * Recursively broadcast an event to all children instances.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$broadcast = function (event) {
	    // if no child has registered for this event,
	    // then there's no need to broadcast.
	    if (!this._eventsCount[event]) return;
	    var children = this.$children;
	    for (var i = 0, l = children.length; i < l; i++) {
	      var child = children[i];
	      var shouldPropagate = child.$emit.apply(child, arguments);
	      if (shouldPropagate) {
	        child.$broadcast.apply(child, arguments);
	      }
	    }
	    return this;
	  };
	
	  /**
	   * Recursively propagate an event up the parent chain.
	   *
	   * @param {String} event
	   * @param {...*} additional arguments
	   */
	
	  Vue.prototype.$dispatch = function () {
	    this.$emit.apply(this, arguments);
	    var parent = this.$parent;
	    while (parent) {
	      var shouldPropagate = parent.$emit.apply(parent, arguments);
	      parent = shouldPropagate ? parent.$parent : null;
	    }
	    return this;
	  };
	
	  /**
	   * Modify the listener counts on all parents.
	   * This bookkeeping allows $broadcast to return early when
	   * no child has listened to a certain event.
	   *
	   * @param {Vue} vm
	   * @param {String} event
	   * @param {Number} count
	   */
	
	  var hookRE = /^hook:/;
	  function modifyListenerCount(vm, event, count) {
	    var parent = vm.$parent;
	    // hooks do not get broadcasted so no need
	    // to do bookkeeping for them
	    if (!parent || !count || hookRE.test(event)) return;
	    while (parent) {
	      parent._eventsCount[event] = (parent._eventsCount[event] || 0) + count;
	      parent = parent.$parent;
	    }
	  }
	}
	
	function lifecycleAPI (Vue) {
	
	  /**
	   * Set instance target element and kick off the compilation
	   * process. The passed in `el` can be a selector string, an
	   * existing Element, or a DocumentFragment (for block
	   * instances).
	   *
	   * @param {Element|DocumentFragment|string} el
	   * @public
	   */
	
	  Vue.prototype.$mount = function (el) {
	    if (this._isCompiled) {
	      process.env.NODE_ENV !== 'production' && warn('$mount() should be called only once.');
	      return;
	    }
	    el = query(el);
	    if (!el) {
	      el = document.createElement('div');
	    }
	    this._compile(el);
	    this._initDOMHooks();
	    if (inDoc(this.$el)) {
	      this._callHook('attached');
	      ready.call(this);
	    } else {
	      this.$once('hook:attached', ready);
	    }
	    return this;
	  };
	
	  /**
	   * Mark an instance as ready.
	   */
	
	  function ready() {
	    this._isAttached = true;
	    this._isReady = true;
	    this._callHook('ready');
	  }
	
	  /**
	   * Teardown the instance, simply delegate to the internal
	   * _destroy.
	   */
	
	  Vue.prototype.$destroy = function (remove, deferCleanup) {
	    this._destroy(remove, deferCleanup);
	  };
	
	  /**
	   * Partially compile a piece of DOM and return a
	   * decompile function.
	   *
	   * @param {Element|DocumentFragment} el
	   * @param {Vue} [host]
	   * @return {Function}
	   */
	
	  Vue.prototype.$compile = function (el, host, scope, frag) {
	    return compile(el, this.$options, true)(this, el, host, scope, frag);
	  };
	}
	
	/**
	 * The exposed Vue constructor.
	 *
	 * API conventions:
	 * - public API methods/properties are prefixed with `$`
	 * - internal methods/properties are prefixed with `_`
	 * - non-prefixed properties are assumed to be proxied user
	 *   data.
	 *
	 * @constructor
	 * @param {Object} [options]
	 * @public
	 */
	
	function Vue(options) {
	  this._init(options);
	}
	
	// install internals
	initMixin(Vue);
	stateMixin(Vue);
	eventsMixin(Vue);
	lifecycleMixin(Vue);
	miscMixin(Vue);
	
	// install APIs
	globalAPI(Vue);
	dataAPI(Vue);
	domAPI(Vue);
	eventsAPI(Vue);
	lifecycleAPI(Vue);
	
	var convertArray = vFor._postProcess;
	
	/**
	 * Limit filter for arrays
	 *
	 * @param {Number} n
	 * @param {Number} offset (Decimal expected)
	 */
	
	function limitBy(arr, n, offset) {
	  offset = offset ? parseInt(offset, 10) : 0;
	  return typeof n === 'number' ? arr.slice(offset, offset + n) : arr;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String} search
	 * @param {String} [delimiter]
	 * @param {String} ...dataKeys
	 */
	
	function filterBy(arr, search, delimiter) {
	  arr = convertArray(arr);
	  if (search == null) {
	    return arr;
	  }
	  if (typeof search === 'function') {
	    return arr.filter(search);
	  }
	  // cast to lowercase string
	  search = ('' + search).toLowerCase();
	  // allow optional `in` delimiter
	  // because why not
	  var n = delimiter === 'in' ? 3 : 2;
	  // extract and flatten keys
	  var keys = toArray(arguments, n).reduce(function (prev, cur) {
	    return prev.concat(cur);
	  }, []);
	  var res = [];
	  var item, key, val, j;
	  for (var i = 0, l = arr.length; i < l; i++) {
	    item = arr[i];
	    val = item && item.$value || item;
	    j = keys.length;
	    if (j) {
	      while (j--) {
	        key = keys[j];
	        if (key === '$key' && contains(item.$key, search) || contains(getPath(val, key), search)) {
	          res.push(item);
	          break;
	        }
	      }
	    } else if (contains(item, search)) {
	      res.push(item);
	    }
	  }
	  return res;
	}
	
	/**
	 * Filter filter for arrays
	 *
	 * @param {String} sortKey
	 * @param {String} reverse
	 */
	
	function orderBy(arr, sortKey, reverse) {
	  arr = convertArray(arr);
	  if (!sortKey) {
	    return arr;
	  }
	  var order = reverse && reverse < 0 ? -1 : 1;
	  // sort on a copy to avoid mutating original array
	  return arr.slice().sort(function (a, b) {
	    if (sortKey !== '$key') {
	      if (isObject(a) && '$value' in a) a = a.$value;
	      if (isObject(b) && '$value' in b) b = b.$value;
	    }
	    a = isObject(a) ? getPath(a, sortKey) : a;
	    b = isObject(b) ? getPath(b, sortKey) : b;
	    return a === b ? 0 : a > b ? order : -order;
	  });
	}
	
	/**
	 * String contain helper
	 *
	 * @param {*} val
	 * @param {String} search
	 */
	
	function contains(val, search) {
	  var i;
	  if (isPlainObject(val)) {
	    var keys = Object.keys(val);
	    i = keys.length;
	    while (i--) {
	      if (contains(val[keys[i]], search)) {
	        return true;
	      }
	    }
	  } else if (isArray(val)) {
	    i = val.length;
	    while (i--) {
	      if (contains(val[i], search)) {
	        return true;
	      }
	    }
	  } else if (val != null) {
	    return val.toString().toLowerCase().indexOf(search) > -1;
	  }
	}
	
	var digitsRE = /(\d{3})(?=\d)/g;
	
	// asset collections must be a plain object.
	var filters = {
	
	  orderBy: orderBy,
	  filterBy: filterBy,
	  limitBy: limitBy,
	
	  /**
	   * Stringify value.
	   *
	   * @param {Number} indent
	   */
	
	  json: {
	    read: function read(value, indent) {
	      return typeof value === 'string' ? value : JSON.stringify(value, null, Number(indent) || 2);
	    },
	    write: function write(value) {
	      try {
	        return JSON.parse(value);
	      } catch (e) {
	        return value;
	      }
	    }
	  },
	
	  /**
	   * 'abc' => 'Abc'
	   */
	
	  capitalize: function capitalize(value) {
	    if (!value && value !== 0) return '';
	    value = value.toString();
	    return value.charAt(0).toUpperCase() + value.slice(1);
	  },
	
	  /**
	   * 'abc' => 'ABC'
	   */
	
	  uppercase: function uppercase(value) {
	    return value || value === 0 ? value.toString().toUpperCase() : '';
	  },
	
	  /**
	   * 'AbC' => 'abc'
	   */
	
	  lowercase: function lowercase(value) {
	    return value || value === 0 ? value.toString().toLowerCase() : '';
	  },
	
	  /**
	   * 12345 => $12,345.00
	   *
	   * @param {String} sign
	   */
	
	  currency: function currency(value, _currency) {
	    value = parseFloat(value);
	    if (!isFinite(value) || !value && value !== 0) return '';
	    _currency = _currency != null ? _currency : '$';
	    var stringified = Math.abs(value).toFixed(2);
	    var _int = stringified.slice(0, -3);
	    var i = _int.length % 3;
	    var head = i > 0 ? _int.slice(0, i) + (_int.length > 3 ? ',' : '') : '';
	    var _float = stringified.slice(-3);
	    var sign = value < 0 ? '-' : '';
	    return _currency + sign + head + _int.slice(i).replace(digitsRE, '$1,') + _float;
	  },
	
	  /**
	   * 'item' => 'items'
	   *
	   * @params
	   *  an array of strings corresponding to
	   *  the single, double, triple ... forms of the word to
	   *  be pluralized. When the number to be pluralized
	   *  exceeds the length of the args, it will use the last
	   *  entry in the array.
	   *
	   *  e.g. ['single', 'double', 'triple', 'multiple']
	   */
	
	  pluralize: function pluralize(value) {
	    var args = toArray(arguments, 1);
	    return args.length > 1 ? args[value % 10 - 1] || args[args.length - 1] : args[0] + (value === 1 ? '' : 's');
	  },
	
	  /**
	   * Debounce a handler function.
	   *
	   * @param {Function} handler
	   * @param {Number} delay = 300
	   * @return {Function}
	   */
	
	  debounce: function debounce(handler, delay) {
	    if (!handler) return;
	    if (!delay) {
	      delay = 300;
	    }
	    return _debounce(handler, delay);
	  }
	};
	
	var partial = {
	
	  priority: PARTIAL,
	
	  params: ['name'],
	
	  // watch changes to name for dynamic partials
	  paramWatchers: {
	    name: function name(value) {
	      vIf.remove.call(this);
	      if (value) {
	        this.insert(value);
	      }
	    }
	  },
	
	  bind: function bind() {
	    this.anchor = createAnchor('v-partial');
	    replace(this.el, this.anchor);
	    this.insert(this.params.name);
	  },
	
	  insert: function insert(id) {
	    var partial = resolveAsset(this.vm.$options, 'partials', id);
	    if (process.env.NODE_ENV !== 'production') {
	      assertAsset(partial, 'partial', id);
	    }
	    if (partial) {
	      this.factory = new FragmentFactory(this.vm, partial);
	      vIf.insert.call(this);
	    }
	  },
	
	  unbind: function unbind() {
	    if (this.frag) {
	      this.frag.destroy();
	    }
	  }
	};
	
	// This is the elementDirective that handles <content>
	// transclusions. It relies on the raw content of an
	// instance being stored as `$options._content` during
	// the transclude phase.
	
	// We are exporting two versions, one for named and one
	// for unnamed, because the unnamed slots must be compiled
	// AFTER all named slots have selected their content. So
	// we need to give them different priorities in the compilation
	// process. (See #1965)
	
	var slot = {
	
	  priority: SLOT,
	
	  bind: function bind() {
	    var host = this.vm;
	    var raw = host.$options._content;
	    if (!raw) {
	      this.fallback();
	      return;
	    }
	    var context = host._context;
	    var slotName = this.params && this.params.name;
	    if (!slotName) {
	      // Default slot
	      this.tryCompile(extractFragment(raw.childNodes, raw, true), context, host);
	    } else {
	      // Named slot
	      var selector = '[slot="' + slotName + '"]';
	      var nodes = raw.querySelectorAll(selector);
	      if (nodes.length) {
	        this.tryCompile(extractFragment(nodes, raw), context, host);
	      } else {
	        this.fallback();
	      }
	    }
	  },
	
	  tryCompile: function tryCompile(content, context, host) {
	    if (content.hasChildNodes()) {
	      this.compile(content, context, host);
	    } else {
	      this.fallback();
	    }
	  },
	
	  compile: function compile(content, context, host) {
	    if (content && context) {
	      var scope = host ? host._scope : this._scope;
	      this.unlink = context.$compile(content, host, scope, this._frag);
	    }
	    if (content) {
	      replace(this.el, content);
	    } else {
	      remove(this.el);
	    }
	  },
	
	  fallback: function fallback() {
	    this.compile(extractContent(this.el, true), this.vm);
	  },
	
	  unbind: function unbind() {
	    if (this.unlink) {
	      this.unlink();
	    }
	  }
	};
	
	var namedSlot = extend(extend({}, slot), {
	  priority: slot.priority + 1,
	  params: ['name']
	});
	
	/**
	 * Extract qualified content nodes from a node list.
	 *
	 * @param {NodeList} nodes
	 * @param {Element} parent
	 * @param {Boolean} main
	 * @return {DocumentFragment}
	 */
	
	function extractFragment(nodes, parent, main) {
	  var frag = document.createDocumentFragment();
	  for (var i = 0, l = nodes.length; i < l; i++) {
	    var node = nodes[i];
	    // if this is the main outlet, we want to skip all
	    // previously selected nodes;
	    // otherwise, we want to mark the node as selected.
	    // clone the node so the original raw content remains
	    // intact. this ensures proper re-compilation in cases
	    // where the outlet is inside a conditional block
	    if (main && !node.__v_selected) {
	      append(node);
	    } else if (!main && node.parentNode === parent) {
	      node.__v_selected = true;
	      append(node);
	    }
	  }
	  return frag;
	
	  function append(node) {
	    if (isTemplate(node) && !node.hasAttribute('v-if') && !node.hasAttribute('v-for')) {
	      node = parseTemplate(node);
	    }
	    node = cloneNode(node);
	    frag.appendChild(node);
	  }
	}
	
	var elementDirectives = {
	  slot: slot,
	  _namedSlot: namedSlot, // same as slot but with higher priority
	  partial: partial
	};
	
	Vue.version = '1.0.13';
	
	/**
	 * Vue and every constructor that extends Vue has an
	 * associated options object, which can be accessed during
	 * compilation steps as `this.constructor.options`.
	 *
	 * These can be seen as the default options of every
	 * Vue instance.
	 */
	
	Vue.options = {
	  directives: publicDirectives,
	  elementDirectives: elementDirectives,
	  filters: filters,
	  transitions: {},
	  components: {},
	  partials: {},
	  replace: true
	};
	
	// devtools global hook
	/* istanbul ignore if */
	if (process.env.NODE_ENV !== 'production' && inBrowser) {
	  if (window.__VUE_DEVTOOLS_GLOBAL_HOOK__) {
	    window.__VUE_DEVTOOLS_GLOBAL_HOOK__.emit('init', Vue);
	  } else if (/Chrome\/\d+/.test(navigator.userAgent)) {
	    console.log('Download the Vue Devtools for a better development experience:\n' + 'https://github.com/vuejs/vue-devtools');
	  }
	}
	
	module.exports = Vue;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.setView = setView;
	exports.reset = reset;
	exports.setViewToOuterBounds = setViewToOuterBounds;
	exports.addCourse = addCourse;
	exports.toggleStarsVisibility = toggleStarsVisibility;
	
	var _paper = __webpack_require__(4);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	var _utils = __webpack_require__(5);
	
	var _utils2 = _interopRequireDefault(_utils);
	
	var _animation = __webpack_require__(6);
	
	var animation = _interopRequireWildcard(_animation);
	
	var _storage = __webpack_require__(7);
	
	var storage = _interopRequireWildcard(_storage);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var canvas = document.getElementById('canvas');
	canvas.setAttribute('keepalive', true);
	
	var width = document.body.clientWidth;
	var height = document.body.clientHeight;
	
	canvas.setAttribute('width', width);
	canvas.setAttribute('height', height);
	_paper2.default.setup(canvas);
	animation.init();
	
	var maxWidth = 4000;
	var maxHeight = maxWidth * height / width;
	
	var outerBounds = new _paper2.default.Rectangle(0, 0, maxWidth, maxHeight);
	var initialBounds = new _paper2.default.Rectangle(maxWidth / 2 - width / 2, maxHeight / 2 - height / 2, width, height);
	
	setView(initialBounds);
	
	var course = new _paper2.default.Group(createGrid(outerBounds));
	course.clipped = true;
	
	_paper2.default.view.draw();
	
	function setView(bounds) {
	  if (isSameBounds(_paper2.default.view.bounds, bounds)) return;
	  var aspectRatio = width / height;
	  var size = bounds.size.clone();
	  var newRatio = size.width / size.height;
	  if (newRatio !== aspectRatio) {
	    if (newRatio < aspectRatio) {
	      size.width = size.width * aspectRatio / newRatio;
	    } else {
	      size.height = size.height * newRatio / aspectRatio;
	    }
	  }
	  var newZoom = _paper2.default.view.viewSize.width / size.width;
	  animateView(bounds.center, newZoom);
	  _paper2.default.view.draw();
	}
	
	function reset() {
	  setView(initialBounds);
	}
	
	function setViewToOuterBounds() {
	  setView(outerBounds);
	}
	
	function addCourse(element) {
	  course.appendBottom(element);
	}
	
	function createGrid(viewBounds) {
	  var grid = new _paper2.default.Group();
	  for (var x = viewBounds.left; x < viewBounds.right; x += 20) {
	    var line = new _paper2.default.Path.Rectangle(new _paper2.default.Point(x - 0.5, viewBounds.top), new _paper2.default.Point(x + 0.5, viewBounds.bottom));
	    line.fillColor = 'white';
	
	    grid.addChild(line);
	  }
	  for (var y = viewBounds.top; y < viewBounds.bottom; y += 20) {
	    var line = new _paper2.default.Path.Rectangle(new _paper2.default.Point(viewBounds.left, y), new _paper2.default.Point(viewBounds.right, y + 1));
	    line.fillColor = 'white';
	
	    grid.addChild(line);
	  }
	
	  return grid;
	}
	
	function isSameBounds(view1, view2) {
	  return Math.abs(view1.area - view2.area) < 1;
	}
	
	function animateView(center, zoom) {
	  var animationDuration = 0.3;
	  var startCenter = _paper2.default.view.center.clone();
	  var deltaCenter = center.clone().subtract(startCenter);
	  var startZoom = _paper2.default.view.zoom;
	  var deltaZoom = zoom - startZoom;
	  animation.add(function (elapsedTime) {
	    if (elapsedTime > animationDuration) {
	      _paper2.default.view.center = center;
	      _paper2.default.view.zoom = zoom;
	      return false;
	    } else {
	      var easeValue = elapsedTime / animationDuration;
	      var dtCenter = deltaCenter.multiply(easeValue);
	      _paper2.default.view.center = startCenter.add(dtCenter);
	      var dtZoom = deltaZoom * easeValue;
	      _paper2.default.view.zoom = startZoom + dtZoom;
	    }
	  });
	}
	
	var stars = [];
	
	createStars();
	if (storage.GetEnableStars()) {
	  enableStars();
	} else {
	  disableStars();
	}
	
	function createStars() {
	  for (var i = 0; i < 100; i++) {
	    var star = createStar();
	    stars.push(star);
	  }
	}
	
	function enableStars() {
	  stars.forEach(function (star) {
	    star.circle.visible = true;
	    star.animationRemover = animation.add(star.animation);
	  });
	}
	
	function disableStars() {
	  stars.forEach(function (star) {
	    star.circle.visible = false;
	    if (star.animationRemover) {
	      star.animationRemover.remove();
	    }
	  });
	}
	
	function toggleStarsVisibility() {
	  var starsEnabled = !storage.GetEnableStars();
	  storage.SetEnableStars(starsEnabled);
	
	  if (starsEnabled) {
	    enableStars();
	  } else {
	    disableStars();
	  }
	
	  return starsEnabled;
	}
	
	function createStar() {
	  // a random position anywhere in space
	  var start = new _paper2.default.Point.random().multiply(outerBounds.bottomRight);
	
	  // distance from earth in pixels
	  var distance = 4 + Math.random() * 11;
	
	  var circle = new _paper2.default.Path.Circle(start, 5 / distance);
	  circle.fillColor = 'white';
	  circle.position = start;
	
	  // the speed of a star is lower if its far away. this is known science fact.
	  var velocity = new _paper2.default.Point(10 / distance, 0);
	
	  return {
	    circle: circle,
	    velocity: velocity,
	    animation: function animation(elapsedTime) {
	      circle.position = circle.position.add(velocity);
	      if (!outerBounds.contains(circle.position)) {
	        circle.position.x = 0;
	      }
	    }
	  };
	}

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * Paper.js v0.9.25 - The Swiss Army Knife of Vector Graphics Scripting.
	 * http://paperjs.org/
	 *
	 * Copyright (c) 2011 - 2014, Juerg Lehni & Jonathan Puckey
	 * http://scratchdisk.com/ & http://jonathanpuckey.com/
	 *
	 * Distributed under the MIT license. See LICENSE file for details.
	 *
	 * All rights reserved.
	 *
	 * Date: Sun Oct 25 11:23:38 2015 +0100
	 *
	 ***
	 *
	 * Straps.js - Class inheritance library with support for bean-style accessors
	 *
	 * Copyright (c) 2006 - 2013 Juerg Lehni
	 * http://scratchdisk.com/
	 *
	 * Distributed under the MIT license.
	 *
	 ***
	 *
	 * Acorn.js
	 * http://marijnhaverbeke.nl/acorn/
	 *
	 * Acorn is a tiny, fast JavaScript parser written in JavaScript,
	 * created by Marijn Haverbeke and released under an MIT license.
	 *
	 */
	
	var paper = new function(undefined) {
	
	var Base = new function() {
		var hidden = /^(statics|enumerable|beans|preserve)$/,
	
			forEach = [].forEach || function(iter, bind) {
				for (var i = 0, l = this.length; i < l; i++)
					iter.call(bind, this[i], i, this);
			},
	
			forIn = function(iter, bind) {
				for (var i in this)
					if (this.hasOwnProperty(i))
						iter.call(bind, this[i], i, this);
			},
	
			create = Object.create || function(proto) {
				return { __proto__: proto };
			},
	
			describe = Object.getOwnPropertyDescriptor || function(obj, name) {
				var get = obj.__lookupGetter__ && obj.__lookupGetter__(name);
				return get
						? { get: get, set: obj.__lookupSetter__(name),
							enumerable: true, configurable: true }
						: obj.hasOwnProperty(name)
							? { value: obj[name], enumerable: true,
								configurable: true, writable: true }
							: null;
			},
	
			_define = Object.defineProperty || function(obj, name, desc) {
				if ((desc.get || desc.set) && obj.__defineGetter__) {
					if (desc.get)
						obj.__defineGetter__(name, desc.get);
					if (desc.set)
						obj.__defineSetter__(name, desc.set);
				} else {
					obj[name] = desc.value;
				}
				return obj;
			},
	
			define = function(obj, name, desc) {
				delete obj[name];
				return _define(obj, name, desc);
			};
	
		function inject(dest, src, enumerable, beans, preserve) {
			var beansNames = {};
	
			function field(name, val) {
				val = val || (val = describe(src, name))
						&& (val.get ? val : val.value);
				if (typeof val === 'string' && val[0] === '#')
					val = dest[val.substring(1)] || val;
				var isFunc = typeof val === 'function',
					res = val,
					prev = preserve || isFunc && !val.base
							? (val && val.get ? name in dest : dest[name])
							: null,
					bean;
				if (!preserve || !prev) {
					if (isFunc && prev)
						val.base = prev;
					if (isFunc && beans !== false
							&& (bean = name.match(/^([gs]et|is)(([A-Z])(.*))$/)))
						beansNames[bean[3].toLowerCase() + bean[4]] = bean[2];
					if (!res || isFunc || !res.get || typeof res.get !== 'function'
							|| !Base.isPlainObject(res))
						res = { value: res, writable: true };
					if ((describe(dest, name)
							|| { configurable: true }).configurable) {
						res.configurable = true;
						res.enumerable = enumerable;
					}
					define(dest, name, res);
				}
			}
			if (src) {
				for (var name in src) {
					if (src.hasOwnProperty(name) && !hidden.test(name))
						field(name);
				}
				for (var name in beansNames) {
					var part = beansNames[name],
						set = dest['set' + part],
						get = dest['get' + part] || set && dest['is' + part];
					if (get && (beans === true || get.length === 0))
						field(name, { get: get, set: set });
				}
			}
			return dest;
		}
	
		function each(obj, iter, bind) {
			if (obj)
				('length' in obj && !obj.getLength
						&& typeof obj.length === 'number'
					? forEach
					: forIn).call(obj, iter, bind = bind || obj);
			return bind;
		}
	
		function set(obj, props, exclude) {
			for (var key in props)
				if (props.hasOwnProperty(key) && !(exclude && exclude[key]))
					obj[key] = props[key];
			return obj;
		}
	
		return inject(function Base() {
			for (var i = 0, l = arguments.length; i < l; i++)
				set(this, arguments[i]);
		}, {
			inject: function(src) {
				if (src) {
					var statics = src.statics === true ? src : src.statics,
						beans = src.beans,
						preserve = src.preserve;
					if (statics !== src)
						inject(this.prototype, src, src.enumerable, beans, preserve);
					inject(this, statics, true, beans, preserve);
				}
				for (var i = 1, l = arguments.length; i < l; i++)
					this.inject(arguments[i]);
				return this;
			},
	
			extend: function() {
				var base = this,
					ctor,
					proto;
				for (var i = 0, l = arguments.length; i < l; i++)
					if (ctor = arguments[i].initialize)
						break;
				ctor = ctor || function() {
					base.apply(this, arguments);
				};
				proto = ctor.prototype = create(this.prototype);
				define(proto, 'constructor',
						{ value: ctor, writable: true, configurable: true });
				inject(ctor, this, true);
				if (arguments.length)
					this.inject.apply(ctor, arguments);
				ctor.base = base;
				return ctor;
			}
		}, true).inject({
			inject: function() {
				for (var i = 0, l = arguments.length; i < l; i++) {
					var src = arguments[i];
					if (src)
						inject(this, src, src.enumerable, src.beans, src.preserve);
				}
				return this;
			},
	
			extend: function() {
				var res = create(this);
				return res.inject.apply(res, arguments);
			},
	
			each: function(iter, bind) {
				return each(this, iter, bind);
			},
	
			set: function(props) {
				return set(this, props);
			},
	
			clone: function() {
				return new this.constructor(this);
			},
	
			statics: {
				each: each,
				create: create,
				define: define,
				describe: describe,
				set: set,
	
				clone: function(obj) {
					return set(new obj.constructor(), obj);
				},
	
				isPlainObject: function(obj) {
					var ctor = obj != null && obj.constructor;
					return ctor && (ctor === Object || ctor === Base
							|| ctor.name === 'Object');
				},
	
				pick: function(a, b) {
					return a !== undefined ? a : b;
				}
			}
		});
	};
	
	if (true)
		module.exports = Base;
	
	Base.inject({
		toString: function() {
			return this._id != null
				?  (this._class || 'Object') + (this._name
					? " '" + this._name + "'"
					: ' @' + this._id)
				: '{ ' + Base.each(this, function(value, key) {
					if (!/^_/.test(key)) {
						var type = typeof value;
						this.push(key + ': ' + (type === 'number'
								? Formatter.instance.number(value)
								: type === 'string' ? "'" + value + "'" : value));
					}
				}, []).join(', ') + ' }';
		},
	
		getClassName: function() {
			return this._class || '';
		},
	
		exportJSON: function(options) {
			return Base.exportJSON(this, options);
		},
	
		toJSON: function() {
			return Base.serialize(this);
		},
	
		_set: function(props, exclude, dontCheck) {
			if (props && (dontCheck || Base.isPlainObject(props))) {
				var keys = Object.keys(props._filtering || props);
				for (var i = 0, l = keys.length; i < l; i++) {
					var key = keys[i];
					if (!(exclude && exclude[key])) {
						var value = props[key];
						if (value !== undefined)
							this[key] = value;
					}
				}
				return true;
			}
		},
	
		statics: {
	
			exports: {
				enumerable: true
			},
	
			extend: function extend() {
				var res = extend.base.apply(this, arguments),
					name = res.prototype._class;
				if (name && !Base.exports[name])
					Base.exports[name] = res;
				return res;
			},
	
			equals: function(obj1, obj2) {
				if (obj1 === obj2)
					return true;
				if (obj1 && obj1.equals)
					return obj1.equals(obj2);
				if (obj2 && obj2.equals)
					return obj2.equals(obj1);
				if (obj1 && obj2
						&& typeof obj1 === 'object' && typeof obj2 === 'object') {
					if (Array.isArray(obj1) && Array.isArray(obj2)) {
						var length = obj1.length;
						if (length !== obj2.length)
							return false;
						while (length--) {
							if (!Base.equals(obj1[length], obj2[length]))
								return false;
						}
					} else {
						var keys = Object.keys(obj1),
							length = keys.length;
						if (length !== Object.keys(obj2).length)
							return false;
						while (length--) {
							var key = keys[length];
							if (!(obj2.hasOwnProperty(key)
									&& Base.equals(obj1[key], obj2[key])))
								return false;
						}
					}
					return true;
				}
				return false;
			},
	
			read: function(list, start, options, length) {
				if (this === Base) {
					var value = this.peek(list, start);
					list.__index++;
					return value;
				}
				var proto = this.prototype,
					readIndex = proto._readIndex,
					index = start || readIndex && list.__index || 0;
				if (!length)
					length = list.length - index;
				var obj = list[index];
				if (obj instanceof this
					|| options && options.readNull && obj == null && length <= 1) {
					if (readIndex)
						list.__index = index + 1;
					return obj && options && options.clone ? obj.clone() : obj;
				}
				obj = Base.create(this.prototype);
				if (readIndex)
					obj.__read = true;
				obj = obj.initialize.apply(obj, index > 0 || length < list.length
					? Array.prototype.slice.call(list, index, index + length)
					: list) || obj;
				if (readIndex) {
					list.__index = index + obj.__read;
					obj.__read = undefined;
				}
				return obj;
			},
	
			peek: function(list, start) {
				return list[list.__index = start || list.__index || 0];
			},
	
			remain: function(list) {
				return list.length - (list.__index || 0);
			},
	
			readAll: function(list, start, options) {
				var res = [],
					entry;
				for (var i = start || 0, l = list.length; i < l; i++) {
					res.push(Array.isArray(entry = list[i])
							? this.read(entry, 0, options)
							: this.read(list, i, options, 1));
				}
				return res;
			},
	
			readNamed: function(list, name, start, options, length) {
				var value = this.getNamed(list, name),
					hasObject = value !== undefined;
				if (hasObject) {
					var filtered = list._filtered;
					if (!filtered) {
						filtered = list._filtered = Base.create(list[0]);
						filtered._filtering = list[0];
					}
					filtered[name] = undefined;
				}
				return this.read(hasObject ? [value] : list, start, options, length);
			},
	
			getNamed: function(list, name) {
				var arg = list[0];
				if (list._hasObject === undefined)
					list._hasObject = list.length === 1 && Base.isPlainObject(arg);
				if (list._hasObject)
					return name ? arg[name] : list._filtered || arg;
			},
	
			hasNamed: function(list, name) {
				return !!this.getNamed(list, name);
			},
	
			isPlainValue: function(obj, asString) {
				return this.isPlainObject(obj) || Array.isArray(obj)
						|| asString && typeof obj === 'string';
			},
	
			serialize: function(obj, options, compact, dictionary) {
				options = options || {};
	
				var root = !dictionary,
					res;
				if (root) {
					options.formatter = new Formatter(options.precision);
					dictionary = {
						length: 0,
						definitions: {},
						references: {},
						add: function(item, create) {
							var id = '#' + item._id,
								ref = this.references[id];
							if (!ref) {
								this.length++;
								var res = create.call(item),
									name = item._class;
								if (name && res[0] !== name)
									res.unshift(name);
								this.definitions[id] = res;
								ref = this.references[id] = [id];
							}
							return ref;
						}
					};
				}
				if (obj && obj._serialize) {
					res = obj._serialize(options, dictionary);
					var name = obj._class;
					if (name && !compact && !res._compact && res[0] !== name)
						res.unshift(name);
				} else if (Array.isArray(obj)) {
					res = [];
					for (var i = 0, l = obj.length; i < l; i++)
						res[i] = Base.serialize(obj[i], options, compact,
								dictionary);
					if (compact)
						res._compact = true;
				} else if (Base.isPlainObject(obj)) {
					res = {};
					var keys = Object.keys(obj);
					for (var i = 0, l = keys.length; i < l; i++) {
						var key = keys[i];
						res[key] = Base.serialize(obj[key], options, compact,
								dictionary);
					}
				} else if (typeof obj === 'number') {
					res = options.formatter.number(obj, options.precision);
				} else {
					res = obj;
				}
				return root && dictionary.length > 0
						? [['dictionary', dictionary.definitions], res]
						: res;
			},
	
			deserialize: function(json, create, _data, _isDictionary) {
				var res = json,
					isRoot = !_data;
				_data = _data || {};
				if (Array.isArray(json)) {
					var type = json[0],
						isDictionary = type === 'dictionary';
					if (json.length == 1 && /^#/.test(type))
						return _data.dictionary[type];
					type = Base.exports[type];
					res = [];
					if (_isDictionary)
						_data.dictionary = res;
					for (var i = type ? 1 : 0, l = json.length; i < l; i++)
						res.push(Base.deserialize(json[i], create, _data,
								isDictionary));
					if (type) {
						var args = res;
						if (create) {
							res = create(type, args);
						} else {
							res = Base.create(type.prototype);
							type.apply(res, args);
						}
					}
				} else if (Base.isPlainObject(json)) {
					res = {};
					if (_isDictionary)
						_data.dictionary = res;
					for (var key in json)
						res[key] = Base.deserialize(json[key], create, _data);
				}
				return isRoot && json && json.length && json[0][0] === 'dictionary'
						? res[1]
						: res;
			},
	
			exportJSON: function(obj, options) {
				var json = Base.serialize(obj, options);
				return options && options.asString === false
						? json
						: JSON.stringify(json);
			},
	
			importJSON: function(json, target) {
				return Base.deserialize(
						typeof json === 'string' ? JSON.parse(json) : json,
						function(type, args) {
							var obj = target && target.constructor === type
									? target
									: Base.create(type.prototype),
								isTarget = obj === target;
							if (args.length === 1 && obj instanceof Item
									&& (isTarget || !(obj instanceof Layer))) {
								var arg = args[0];
								if (Base.isPlainObject(arg))
									arg.insert = false;
							}
							type.apply(obj, args);
							if (isTarget)
								target = null;
							return obj;
						});
			},
	
			splice: function(list, items, index, remove) {
				var amount = items && items.length,
					append = index === undefined;
				index = append ? list.length : index;
				if (index > list.length)
					index = list.length;
				for (var i = 0; i < amount; i++)
					items[i]._index = index + i;
				if (append) {
					list.push.apply(list, items);
					return [];
				} else {
					var args = [index, remove];
					if (items)
						args.push.apply(args, items);
					var removed = list.splice.apply(list, args);
					for (var i = 0, l = removed.length; i < l; i++)
						removed[i]._index = undefined;
					for (var i = index + amount, l = list.length; i < l; i++)
						list[i]._index = i;
					return removed;
				}
			},
	
			capitalize: function(str) {
				return str.replace(/\b[a-z]/g, function(match) {
					return match.toUpperCase();
				});
			},
	
			camelize: function(str) {
				return str.replace(/-(.)/g, function(all, chr) {
					return chr.toUpperCase();
				});
			},
	
			hyphenate: function(str) {
				return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
			}
		}
	});
	
	var Emitter = {
		on: function(type, func) {
			if (typeof type !== 'string') {
				Base.each(type, function(value, key) {
					this.on(key, value);
				}, this);
			} else {
				var types = this._eventTypes,
					entry = types && types[type],
					handlers = this._callbacks = this._callbacks || {};
				handlers = handlers[type] = handlers[type] || [];
				if (handlers.indexOf(func) === -1) {
					handlers.push(func);
					if (entry && entry.install && handlers.length === 1)
						entry.install.call(this, type);
				}
			}
			return this;
		},
	
		off: function(type, func) {
			if (typeof type !== 'string') {
				Base.each(type, function(value, key) {
					this.off(key, value);
				}, this);
				return;
			}
			var types = this._eventTypes,
				entry = types && types[type],
				handlers = this._callbacks && this._callbacks[type],
				index;
			if (handlers) {
				if (!func || (index = handlers.indexOf(func)) !== -1
						&& handlers.length === 1) {
					if (entry && entry.uninstall)
						entry.uninstall.call(this, type);
					delete this._callbacks[type];
				} else if (index !== -1) {
					handlers.splice(index, 1);
				}
			}
			return this;
		},
	
		once: function(type, func) {
			return this.on(type, function() {
				func.apply(this, arguments);
				this.off(type, func);
			});
		},
	
		emit: function(type, event) {
			var handlers = this._callbacks && this._callbacks[type];
			if (!handlers)
				return false;
			var args = [].slice.call(arguments, 1);
			handlers = handlers.slice();
			for (var i = 0, l = handlers.length; i < l; i++) {
				if (handlers[i].apply(this, args) === false) {
					if (event && event.stop)
						event.stop();
					break;
				}
			}
			return true;
		},
	
		responds: function(type) {
			return !!(this._callbacks && this._callbacks[type]);
		},
	
		attach: '#on',
		detach: '#off',
		fire: '#emit',
	
		_installEvents: function(install) {
			var handlers = this._callbacks,
				key = install ? 'install' : 'uninstall';
			for (var type in handlers) {
				if (handlers[type].length > 0) {
					var types = this._eventTypes,
						entry = types && types[type],
						func = entry && entry[key];
					if (func)
						func.call(this, type);
				}
			}
		},
	
		statics: {
			inject: function inject(src) {
				var events = src._events;
				if (events) {
					var types = {};
					Base.each(events, function(entry, key) {
						var isString = typeof entry === 'string',
							name = isString ? entry : key,
							part = Base.capitalize(name),
							type = name.substring(2).toLowerCase();
						types[type] = isString ? {} : entry;
						name = '_' + name;
						src['get' + part] = function() {
							return this[name];
						};
						src['set' + part] = function(func) {
							var prev = this[name];
							if (prev)
								this.off(type, prev);
							if (func)
								this.on(type, func);
							this[name] = func;
						};
					});
					src._eventTypes = types;
				}
				return inject.base.apply(this, arguments);
			}
		}
	};
	
	var PaperScope = Base.extend({
		_class: 'PaperScope',
	
		initialize: function PaperScope() {
			paper = this;
			this.settings = new Base({
				applyMatrix: true,
				handleSize: 4,
				hitTolerance: 0
			});
			this.project = null;
			this.projects = [];
			this.tools = [];
			this.palettes = [];
			this._id = PaperScope._id++;
			PaperScope._scopes[this._id] = this;
			var proto = PaperScope.prototype;
			if (!this.support) {
				var ctx = CanvasProvider.getContext(1, 1);
				proto.support = {
					nativeDash: 'setLineDash' in ctx || 'mozDash' in ctx,
					nativeBlendModes: BlendMode.nativeModes
				};
				CanvasProvider.release(ctx);
			}
	
			if (!this.browser) {
				var agent = navigator.userAgent.toLowerCase(),
					platform = (/(win)/.exec(agent)
							|| /(mac)/.exec(agent)
							|| /(linux)/.exec(agent)
							|| [])[0],
					browser = proto.browser = { platform: platform };
				if (platform)
					browser[platform] = true;
				agent.replace(
					/(opera|chrome|safari|webkit|firefox|msie|trident|atom)\/?\s*([.\d]+)(?:.*version\/([.\d]+))?(?:.*rv\:([.\d]+))?/g,
					function(all, n, v1, v2, rv) {
						if (!browser.chrome) {
							var v = n === 'opera' ? v2 : v1;
							if (n === 'trident') {
								v = rv;
								n = 'msie';
							}
							browser.version = v;
							browser.versionNumber = parseFloat(v);
							browser.name = n;
							browser[n] = true;
						}
					}
				);
				if (browser.chrome)
					delete browser.webkit;
				if (browser.atom)
					delete browser.chrome;
			}
		},
	
		version: "0.9.25",
	
		getView: function() {
			return this.project && this.project.getView();
		},
	
		getPaper: function() {
			return this;
		},
	
		execute: function(code, url, options) {
			paper.PaperScript.execute(code, this, url, options);
			View.updateFocus();
		},
	
		install: function(scope) {
			var that = this;
			Base.each(['project', 'view', 'tool'], function(key) {
				Base.define(scope, key, {
					configurable: true,
					get: function() {
						return that[key];
					}
				});
			});
			for (var key in this)
				if (!/^_/.test(key) && this[key])
					scope[key] = this[key];
		},
	
		setup: function(element) {
			paper = this;
			this.project = new Project(element);
			return this;
		},
	
		activate: function() {
			paper = this;
		},
	
		clear: function() {
			for (var i = this.projects.length - 1; i >= 0; i--)
				this.projects[i].remove();
			for (var i = this.tools.length - 1; i >= 0; i--)
				this.tools[i].remove();
			for (var i = this.palettes.length - 1; i >= 0; i--)
				this.palettes[i].remove();
		},
	
		remove: function() {
			this.clear();
			delete PaperScope._scopes[this._id];
		},
	
		statics: new function() {
			function handleAttribute(name) {
				name += 'Attribute';
				return function(el, attr) {
					return el[name](attr) || el[name]('data-paper-' + attr);
				};
			}
	
			return {
				_scopes: {},
				_id: 0,
	
				get: function(id) {
					return this._scopes[id] || null;
				},
	
				getAttribute: handleAttribute('get'),
				hasAttribute: handleAttribute('has')
			};
		}
	});
	
	var PaperScopeItem = Base.extend(Emitter, {
	
		initialize: function(activate) {
			this._scope = paper;
			this._index = this._scope[this._list].push(this) - 1;
			if (activate || !this._scope[this._reference])
				this.activate();
		},
	
		activate: function() {
			if (!this._scope)
				return false;
			var prev = this._scope[this._reference];
			if (prev && prev !== this)
				prev.emit('deactivate');
			this._scope[this._reference] = this;
			this.emit('activate', prev);
			return true;
		},
	
		isActive: function() {
			return this._scope[this._reference] === this;
		},
	
		remove: function() {
			if (this._index == null)
				return false;
			Base.splice(this._scope[this._list], null, this._index, 1);
			if (this._scope[this._reference] == this)
				this._scope[this._reference] = null;
			this._scope = null;
			return true;
		}
	});
	
	var Formatter = Base.extend({
		initialize: function(precision) {
			this.precision = precision || 5;
			this.multiplier = Math.pow(10, this.precision);
		},
	
		number: function(val) {
			return Math.round(val * this.multiplier) / this.multiplier;
		},
	
		pair: function(val1, val2, separator) {
			return this.number(val1) + (separator || ',') + this.number(val2);
		},
	
		point: function(val, separator) {
			return this.number(val.x) + (separator || ',') + this.number(val.y);
		},
	
		size: function(val, separator) {
			return this.number(val.width) + (separator || ',')
					+ this.number(val.height);
		},
	
		rectangle: function(val, separator) {
			return this.point(val, separator) + (separator || ',')
					+ this.size(val, separator);
		}
	});
	
	Formatter.instance = new Formatter();
	
	var Numerical = new function() {
	
		var abscissas = [
			[  0.5773502691896257645091488],
			[0,0.7745966692414833770358531],
			[  0.3399810435848562648026658,0.8611363115940525752239465],
			[0,0.5384693101056830910363144,0.9061798459386639927976269],
			[  0.2386191860831969086305017,0.6612093864662645136613996,0.9324695142031520278123016],
			[0,0.4058451513773971669066064,0.7415311855993944398638648,0.9491079123427585245261897],
			[  0.1834346424956498049394761,0.5255324099163289858177390,0.7966664774136267395915539,0.9602898564975362316835609],
			[0,0.3242534234038089290385380,0.6133714327005903973087020,0.8360311073266357942994298,0.9681602395076260898355762],
			[  0.1488743389816312108848260,0.4333953941292471907992659,0.6794095682990244062343274,0.8650633666889845107320967,0.9739065285171717200779640],
			[0,0.2695431559523449723315320,0.5190961292068118159257257,0.7301520055740493240934163,0.8870625997680952990751578,0.9782286581460569928039380],
			[  0.1252334085114689154724414,0.3678314989981801937526915,0.5873179542866174472967024,0.7699026741943046870368938,0.9041172563704748566784659,0.9815606342467192506905491],
			[0,0.2304583159551347940655281,0.4484927510364468528779129,0.6423493394403402206439846,0.8015780907333099127942065,0.9175983992229779652065478,0.9841830547185881494728294],
			[  0.1080549487073436620662447,0.3191123689278897604356718,0.5152486363581540919652907,0.6872929048116854701480198,0.8272013150697649931897947,0.9284348836635735173363911,0.9862838086968123388415973],
			[0,0.2011940939974345223006283,0.3941513470775633698972074,0.5709721726085388475372267,0.7244177313601700474161861,0.8482065834104272162006483,0.9372733924007059043077589,0.9879925180204854284895657],
			[  0.0950125098376374401853193,0.2816035507792589132304605,0.4580167776572273863424194,0.6178762444026437484466718,0.7554044083550030338951012,0.8656312023878317438804679,0.9445750230732325760779884,0.9894009349916499325961542]
		];
	
		var weights = [
			[1],
			[0.8888888888888888888888889,0.5555555555555555555555556],
			[0.6521451548625461426269361,0.3478548451374538573730639],
			[0.5688888888888888888888889,0.4786286704993664680412915,0.2369268850561890875142640],
			[0.4679139345726910473898703,0.3607615730481386075698335,0.1713244923791703450402961],
			[0.4179591836734693877551020,0.3818300505051189449503698,0.2797053914892766679014678,0.1294849661688696932706114],
			[0.3626837833783619829651504,0.3137066458778872873379622,0.2223810344533744705443560,0.1012285362903762591525314],
			[0.3302393550012597631645251,0.3123470770400028400686304,0.2606106964029354623187429,0.1806481606948574040584720,0.0812743883615744119718922],
			[0.2955242247147528701738930,0.2692667193099963550912269,0.2190863625159820439955349,0.1494513491505805931457763,0.0666713443086881375935688],
			[0.2729250867779006307144835,0.2628045445102466621806889,0.2331937645919904799185237,0.1862902109277342514260976,0.1255803694649046246346943,0.0556685671161736664827537],
			[0.2491470458134027850005624,0.2334925365383548087608499,0.2031674267230659217490645,0.1600783285433462263346525,0.1069393259953184309602547,0.0471753363865118271946160],
			[0.2325515532308739101945895,0.2262831802628972384120902,0.2078160475368885023125232,0.1781459807619457382800467,0.1388735102197872384636018,0.0921214998377284479144218,0.0404840047653158795200216],
			[0.2152638534631577901958764,0.2051984637212956039659241,0.1855383974779378137417166,0.1572031671581935345696019,0.1215185706879031846894148,0.0801580871597602098056333,0.0351194603317518630318329],
			[0.2025782419255612728806202,0.1984314853271115764561183,0.1861610000155622110268006,0.1662692058169939335532009,0.1395706779261543144478048,0.1071592204671719350118695,0.0703660474881081247092674,0.0307532419961172683546284],
			[0.1894506104550684962853967,0.1826034150449235888667637,0.1691565193950025381893121,0.1495959888165767320815017,0.1246289712555338720524763,0.0951585116824927848099251,0.0622535239386478928628438,0.0271524594117540948517806]
		];
	
		var abs = Math.abs,
			sqrt = Math.sqrt,
			pow = Math.pow,
			EPSILON = 1e-12,
			MACHINE_EPSILON = 1.12e-16;
	
		function clip(value, min, max) {
			return value < min ? min : value > max ? max : value;
		}
	
		return {
			TOLERANCE: 1e-6,
			EPSILON: EPSILON,
			MACHINE_EPSILON: MACHINE_EPSILON,
			CURVETIME_EPSILON: 4e-7,
			GEOMETRIC_EPSILON: 2e-7,
			WINDING_EPSILON: 2e-7,
			TRIGONOMETRIC_EPSILON: 1e-7,
			CLIPPING_EPSILON: 1e-7,
			KAPPA: 4 * (sqrt(2) - 1) / 3,
	
			isZero: function(val) {
				return val >= -EPSILON && val <= EPSILON;
			},
	
			integrate: function(f, a, b, n) {
				var x = abscissas[n - 2],
					w = weights[n - 2],
					A = (b - a) * 0.5,
					B = A + a,
					i = 0,
					m = (n + 1) >> 1,
					sum = n & 1 ? w[i++] * f(B) : 0;
				while (i < m) {
					var Ax = A * x[i];
					sum += w[i++] * (f(B + Ax) + f(B - Ax));
				}
				return A * sum;
			},
	
			findRoot: function(f, df, x, a, b, n, tolerance) {
				for (var i = 0; i < n; i++) {
					var fx = f(x),
						dx = fx / df(x),
						nx = x - dx;
					if (abs(dx) < tolerance)
						return nx;
					if (fx > 0) {
						b = x;
						x = nx <= a ? (a + b) * 0.5 : nx;
					} else {
						a = x;
						x = nx >= b ? (a + b) * 0.5 : nx;
					}
				}
				return x;
			},
	
			solveQuadratic: function(a, b, c, roots, min, max) {
				var count = 0,
					eMin = min - EPSILON,
					eMax = max + EPSILON,
					x1, x2 = Infinity,
					B = b,
					D;
				b /= -2;
				D = b * b - a * c;
				if (D !== 0 && abs(D) < MACHINE_EPSILON) {
					var gmC = pow(abs(a * b * c), 1 / 3);
					if (gmC < 1e-8) {
						var mult = pow(10,
								abs(Math.floor(Math.log(gmC) * Math.LOG10E)));
						if (!isFinite(mult))
							mult = 0;
						a *= mult;
						b *= mult;
						c *= mult;
						D = b * b - a * c;
					}
				}
				if (abs(a) < EPSILON) {
					if (abs(B) < EPSILON)
						return abs(c) < EPSILON ? -1 : 0;
					x1 = -c / B;
				} else if (D >= -MACHINE_EPSILON) {
					var Q = D < 0 ? 0 : sqrt(D),
						R = b + (b < 0 ? -Q : Q);
					if (R === 0) {
						x1 = c / a;
						x2 = -x1;
					} else {
						x1 = R / a;
						x2 = c / R;
					}
				}
				if (isFinite(x1) && (min == null || x1 > eMin && x1 < eMax))
					roots[count++] = min == null ? x1 : clip(x1, min, max);
				if (x2 !== x1
						&& isFinite(x2) && (min == null || x2 > eMin && x2 < eMax))
					roots[count++] = min == null ? x2 : clip(x2, min, max);
				return count;
			},
	
			solveCubic: function(a, b, c, d, roots, min, max) {
				var count = 0,
					x, b1, c2;
				if (abs(a) < EPSILON) {
					a = b;
					b1 = c;
					c2 = d;
					x = Infinity;
				} else if (abs(d) < EPSILON) {
					b1 = b;
					c2 = c;
					x = 0;
				} else {
					var ec = 1 + MACHINE_EPSILON,
						x0, q, qd, t, r, s, tmp;
					x = -(b / a) / 3;
					tmp = a * x,
					b1 = tmp + b,
					c2 = b1 * x + c,
					qd = (tmp + b1) * x + c2,
					q = c2 * x + d;
					t = q /a;
					r = pow(abs(t), 1/3);
					s = t < 0 ? -1 : 1;
					t = -qd / a;
					r = t > 0 ? 1.3247179572 * Math.max(r, sqrt(t)) : r;
					x0 = x - s * r;
					if (x0 !== x) {
						do {
							x = x0;
							tmp = a * x,
							b1 = tmp + b,
							c2 = b1 * x + c,
							qd = (tmp + b1) * x + c2,
							q = c2 * x + d;
							x0 = qd === 0 ? x : x - q / qd / ec;
							if (x0 === x) {
								x = x0;
								break;
							}
						} while (s * x0 > s * x);
						if (abs(a) * x * x > abs(d / x)) {
							c2 = -d / x;
							b1 = (c2 - c) / x;
						}
					}
				}
				var count = Numerical.solveQuadratic(a, b1, c2, roots, min, max);
				if (isFinite(x) && (count === 0 || x !== roots[count - 1])
						&& (min == null || x > min - EPSILON && x < max + EPSILON))
					roots[count++] = min == null ? x : clip(x, min, max);
				return count;
			}
		};
	};
	
	var UID = {
		_id: 1,
		_pools: {},
	
		get: function(ctor) {
			if (ctor) {
				var name = ctor._class,
					pool = this._pools[name];
				if (!pool)
					pool = this._pools[name] = { _id: 1 };
				return pool._id++;
			} else {
				return this._id++;
			}
		}
	};
	
	var Point = Base.extend({
		_class: 'Point',
		_readIndex: true,
	
		initialize: function Point(arg0, arg1) {
			var type = typeof arg0;
			if (type === 'number') {
				var hasY = typeof arg1 === 'number';
				this.x = arg0;
				this.y = hasY ? arg1 : arg0;
				if (this.__read)
					this.__read = hasY ? 2 : 1;
			} else if (type === 'undefined' || arg0 === null) {
				this.x = this.y = 0;
				if (this.__read)
					this.__read = arg0 === null ? 1 : 0;
			} else {
				if (Array.isArray(arg0)) {
					this.x = arg0[0];
					this.y = arg0.length > 1 ? arg0[1] : arg0[0];
				} else if (arg0.x != null) {
					this.x = arg0.x;
					this.y = arg0.y;
				} else if (arg0.width != null) {
					this.x = arg0.width;
					this.y = arg0.height;
				} else if (arg0.angle != null) {
					this.x = arg0.length;
					this.y = 0;
					this.setAngle(arg0.angle);
				} else {
					this.x = this.y = 0;
					if (this.__read)
						this.__read = 0;
				}
				if (this.__read)
					this.__read = 1;
			}
		},
	
		set: function(x, y) {
			this.x = x;
			this.y = y;
			return this;
		},
	
		equals: function(point) {
			return this === point || point
					&& (this.x === point.x && this.y === point.y
						|| Array.isArray(point)
							&& this.x === point[0] && this.y === point[1])
					|| false;
		},
	
		clone: function() {
			return new Point(this.x, this.y);
		},
	
		toString: function() {
			var f = Formatter.instance;
			return '{ x: ' + f.number(this.x) + ', y: ' + f.number(this.y) + ' }';
		},
	
		_serialize: function(options) {
			var f = options.formatter;
			return [f.number(this.x), f.number(this.y)];
		},
	
		getLength: function() {
			return Math.sqrt(this.x * this.x + this.y * this.y);
		},
	
		setLength: function(length) {
			if (this.isZero()) {
				var angle = this._angle || 0;
				this.set(
					Math.cos(angle) * length,
					Math.sin(angle) * length
				);
			} else {
				var scale = length / this.getLength();
				if (Numerical.isZero(scale))
					this.getAngle();
				this.set(
					this.x * scale,
					this.y * scale
				);
			}
		},
		getAngle: function() {
			return this.getAngleInRadians.apply(this, arguments) * 180 / Math.PI;
		},
	
		setAngle: function(angle) {
			this.setAngleInRadians.call(this, angle * Math.PI / 180);
		},
	
		getAngleInDegrees: '#getAngle',
		setAngleInDegrees: '#setAngle',
	
		getAngleInRadians: function() {
			if (!arguments.length) {
				return this.isZero()
						? this._angle || 0
						: this._angle = Math.atan2(this.y, this.x);
			} else {
				var point = Point.read(arguments),
					div = this.getLength() * point.getLength();
				if (Numerical.isZero(div)) {
					return NaN;
				} else {
					var a = this.dot(point) / div;
					return Math.acos(a < -1 ? -1 : a > 1 ? 1 : a);
				}
			}
		},
	
		setAngleInRadians: function(angle) {
			this._angle = angle;
			if (!this.isZero()) {
				var length = this.getLength();
				this.set(
					Math.cos(angle) * length,
					Math.sin(angle) * length
				);
			}
		},
	
		getQuadrant: function() {
			return this.x >= 0 ? this.y >= 0 ? 1 : 4 : this.y >= 0 ? 2 : 3;
		}
	}, {
		beans: false,
	
		getDirectedAngle: function() {
			var point = Point.read(arguments);
			return Math.atan2(this.cross(point), this.dot(point)) * 180 / Math.PI;
		},
	
		getDistance: function() {
			var point = Point.read(arguments),
				x = point.x - this.x,
				y = point.y - this.y,
				d = x * x + y * y,
				squared = Base.read(arguments);
			return squared ? d : Math.sqrt(d);
		},
	
		normalize: function(length) {
			if (length === undefined)
				length = 1;
			var current = this.getLength(),
				scale = current !== 0 ? length / current : 0,
				point = new Point(this.x * scale, this.y * scale);
			if (scale >= 0)
				point._angle = this._angle;
			return point;
		},
	
		rotate: function(angle, center) {
			if (angle === 0)
				return this.clone();
			angle = angle * Math.PI / 180;
			var point = center ? this.subtract(center) : this,
				sin = Math.sin(angle),
				cos = Math.cos(angle);
			point = new Point(
				point.x * cos - point.y * sin,
				point.x * sin + point.y * cos
			);
			return center ? point.add(center) : point;
		},
	
		transform: function(matrix) {
			return matrix ? matrix._transformPoint(this) : this;
		},
	
		add: function() {
			var point = Point.read(arguments);
			return new Point(this.x + point.x, this.y + point.y);
		},
	
		subtract: function() {
			var point = Point.read(arguments);
			return new Point(this.x - point.x, this.y - point.y);
		},
	
		multiply: function() {
			var point = Point.read(arguments);
			return new Point(this.x * point.x, this.y * point.y);
		},
	
		divide: function() {
			var point = Point.read(arguments);
			return new Point(this.x / point.x, this.y / point.y);
		},
	
		modulo: function() {
			var point = Point.read(arguments);
			return new Point(this.x % point.x, this.y % point.y);
		},
	
		negate: function() {
			return new Point(-this.x, -this.y);
		},
	
		isInside: function() {
			return Rectangle.read(arguments).contains(this);
		},
	
		isClose: function() {
			var point = Point.read(arguments),
				tolerance = Base.read(arguments);
			return this.getDistance(point) < tolerance;
		},
	
		isCollinear: function() {
			var point = Point.read(arguments);
			return Point.isCollinear(this.x, this.y, point.x, point.y);
		},
	
		isColinear: '#isCollinear',
	
		isOrthogonal: function() {
			var point = Point.read(arguments);
			return Point.isOrthogonal(this.x, this.y, point.x, point.y);
		},
	
		isZero: function() {
			return Numerical.isZero(this.x) && Numerical.isZero(this.y);
		},
	
		isNaN: function() {
			return isNaN(this.x) || isNaN(this.y);
		},
	
		dot: function() {
			var point = Point.read(arguments);
			return this.x * point.x + this.y * point.y;
		},
	
		cross: function() {
			var point = Point.read(arguments);
			return this.x * point.y - this.y * point.x;
		},
	
		project: function() {
			var point = Point.read(arguments),
				scale = point.isZero() ? 0 : this.dot(point) / point.dot(point);
			return new Point(
				point.x * scale,
				point.y * scale
			);
		},
	
		statics: {
			min: function() {
				var point1 = Point.read(arguments),
					point2 = Point.read(arguments);
				return new Point(
					Math.min(point1.x, point2.x),
					Math.min(point1.y, point2.y)
				);
			},
	
			max: function() {
				var point1 = Point.read(arguments),
					point2 = Point.read(arguments);
				return new Point(
					Math.max(point1.x, point2.x),
					Math.max(point1.y, point2.y)
				);
			},
	
			random: function() {
				return new Point(Math.random(), Math.random());
			},
	
			isCollinear: function(x1, y1, x2, y2) {
				return Math.abs(x1 * y2 - y1 * x2)
						<= Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
							* 1e-7;
			},
	
			isOrthogonal: function(x1, y1, x2, y2) {
				return Math.abs(x1 * x2 + y1 * y2)
						<= Math.sqrt((x1 * x1 + y1 * y1) * (x2 * x2 + y2 * y2))
							* 1e-7;
			}
		}
	}, Base.each(['round', 'ceil', 'floor', 'abs'], function(name) {
		var op = Math[name];
		this[name] = function() {
			return new Point(op(this.x), op(this.y));
		};
	}, {}));
	
	var LinkedPoint = Point.extend({
		initialize: function Point(x, y, owner, setter) {
			this._x = x;
			this._y = y;
			this._owner = owner;
			this._setter = setter;
		},
	
		set: function(x, y, _dontNotify) {
			this._x = x;
			this._y = y;
			if (!_dontNotify)
				this._owner[this._setter](this);
			return this;
		},
	
		getX: function() {
			return this._x;
		},
	
		setX: function(x) {
			this._x = x;
			this._owner[this._setter](this);
		},
	
		getY: function() {
			return this._y;
		},
	
		setY: function(y) {
			this._y = y;
			this._owner[this._setter](this);
		}
	});
	
	var Size = Base.extend({
		_class: 'Size',
		_readIndex: true,
	
		initialize: function Size(arg0, arg1) {
			var type = typeof arg0;
			if (type === 'number') {
				var hasHeight = typeof arg1 === 'number';
				this.width = arg0;
				this.height = hasHeight ? arg1 : arg0;
				if (this.__read)
					this.__read = hasHeight ? 2 : 1;
			} else if (type === 'undefined' || arg0 === null) {
				this.width = this.height = 0;
				if (this.__read)
					this.__read = arg0 === null ? 1 : 0;
			} else {
				if (Array.isArray(arg0)) {
					this.width = arg0[0];
					this.height = arg0.length > 1 ? arg0[1] : arg0[0];
				} else if (arg0.width != null) {
					this.width = arg0.width;
					this.height = arg0.height;
				} else if (arg0.x != null) {
					this.width = arg0.x;
					this.height = arg0.y;
				} else {
					this.width = this.height = 0;
					if (this.__read)
						this.__read = 0;
				}
				if (this.__read)
					this.__read = 1;
			}
		},
	
		set: function(width, height) {
			this.width = width;
			this.height = height;
			return this;
		},
	
		equals: function(size) {
			return size === this || size && (this.width === size.width
					&& this.height === size.height
					|| Array.isArray(size) && this.width === size[0]
						&& this.height === size[1]) || false;
		},
	
		clone: function() {
			return new Size(this.width, this.height);
		},
	
		toString: function() {
			var f = Formatter.instance;
			return '{ width: ' + f.number(this.width)
					+ ', height: ' + f.number(this.height) + ' }';
		},
	
		_serialize: function(options) {
			var f = options.formatter;
			return [f.number(this.width),
					f.number(this.height)];
		},
	
		add: function() {
			var size = Size.read(arguments);
			return new Size(this.width + size.width, this.height + size.height);
		},
	
		subtract: function() {
			var size = Size.read(arguments);
			return new Size(this.width - size.width, this.height - size.height);
		},
	
		multiply: function() {
			var size = Size.read(arguments);
			return new Size(this.width * size.width, this.height * size.height);
		},
	
		divide: function() {
			var size = Size.read(arguments);
			return new Size(this.width / size.width, this.height / size.height);
		},
	
		modulo: function() {
			var size = Size.read(arguments);
			return new Size(this.width % size.width, this.height % size.height);
		},
	
		negate: function() {
			return new Size(-this.width, -this.height);
		},
	
		isZero: function() {
			return Numerical.isZero(this.width) && Numerical.isZero(this.height);
		},
	
		isNaN: function() {
			return isNaN(this.width) || isNaN(this.height);
		},
	
		statics: {
			min: function(size1, size2) {
				return new Size(
					Math.min(size1.width, size2.width),
					Math.min(size1.height, size2.height));
			},
	
			max: function(size1, size2) {
				return new Size(
					Math.max(size1.width, size2.width),
					Math.max(size1.height, size2.height));
			},
	
			random: function() {
				return new Size(Math.random(), Math.random());
			}
		}
	}, Base.each(['round', 'ceil', 'floor', 'abs'], function(name) {
		var op = Math[name];
		this[name] = function() {
			return new Size(op(this.width), op(this.height));
		};
	}, {}));
	
	var LinkedSize = Size.extend({
		initialize: function Size(width, height, owner, setter) {
			this._width = width;
			this._height = height;
			this._owner = owner;
			this._setter = setter;
		},
	
		set: function(width, height, _dontNotify) {
			this._width = width;
			this._height = height;
			if (!_dontNotify)
				this._owner[this._setter](this);
			return this;
		},
	
		getWidth: function() {
			return this._width;
		},
	
		setWidth: function(width) {
			this._width = width;
			this._owner[this._setter](this);
		},
	
		getHeight: function() {
			return this._height;
		},
	
		setHeight: function(height) {
			this._height = height;
			this._owner[this._setter](this);
		}
	});
	
	var Rectangle = Base.extend({
		_class: 'Rectangle',
		_readIndex: true,
		beans: true,
	
		initialize: function Rectangle(arg0, arg1, arg2, arg3) {
			var type = typeof arg0,
				read = 0;
			if (type === 'number') {
				this.x = arg0;
				this.y = arg1;
				this.width = arg2;
				this.height = arg3;
				read = 4;
			} else if (type === 'undefined' || arg0 === null) {
				this.x = this.y = this.width = this.height = 0;
				read = arg0 === null ? 1 : 0;
			} else if (arguments.length === 1) {
				if (Array.isArray(arg0)) {
					this.x = arg0[0];
					this.y = arg0[1];
					this.width = arg0[2];
					this.height = arg0[3];
					read = 1;
				} else if (arg0.x !== undefined || arg0.width !== undefined) {
					this.x = arg0.x || 0;
					this.y = arg0.y || 0;
					this.width = arg0.width || 0;
					this.height = arg0.height || 0;
					read = 1;
				} else if (arg0.from === undefined && arg0.to === undefined) {
					this.x = this.y = this.width = this.height = 0;
					this._set(arg0);
					read = 1;
				}
			}
			if (!read) {
				var point = Point.readNamed(arguments, 'from'),
					next = Base.peek(arguments);
				this.x = point.x;
				this.y = point.y;
				if (next && next.x !== undefined || Base.hasNamed(arguments, 'to')) {
					var to = Point.readNamed(arguments, 'to');
					this.width = to.x - point.x;
					this.height = to.y - point.y;
					if (this.width < 0) {
						this.x = to.x;
						this.width = -this.width;
					}
					if (this.height < 0) {
						this.y = to.y;
						this.height = -this.height;
					}
				} else {
					var size = Size.read(arguments);
					this.width = size.width;
					this.height = size.height;
				}
				read = arguments.__index;
			}
			if (this.__read)
				this.__read = read;
		},
	
		set: function(x, y, width, height) {
			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;
			return this;
		},
	
		clone: function() {
			return new Rectangle(this.x, this.y, this.width, this.height);
		},
	
		equals: function(rect) {
			var rt = Base.isPlainValue(rect)
					? Rectangle.read(arguments)
					: rect;
			return rt === this
					|| rt && this.x === rt.x && this.y === rt.y
						&& this.width === rt.width && this.height === rt.height
					|| false;
		},
	
		toString: function() {
			var f = Formatter.instance;
			return '{ x: ' + f.number(this.x)
					+ ', y: ' + f.number(this.y)
					+ ', width: ' + f.number(this.width)
					+ ', height: ' + f.number(this.height)
					+ ' }';
		},
	
		_serialize: function(options) {
			var f = options.formatter;
			return [f.number(this.x),
					f.number(this.y),
					f.number(this.width),
					f.number(this.height)];
		},
	
		getPoint: function(_dontLink) {
			var ctor = _dontLink ? Point : LinkedPoint;
			return new ctor(this.x, this.y, this, 'setPoint');
		},
	
		setPoint: function() {
			var point = Point.read(arguments);
			this.x = point.x;
			this.y = point.y;
		},
	
		getSize: function(_dontLink) {
			var ctor = _dontLink ? Size : LinkedSize;
			return new ctor(this.width, this.height, this, 'setSize');
		},
	
		setSize: function() {
			var size = Size.read(arguments);
			if (this._fixX)
				this.x += (this.width - size.width) * this._fixX;
			if (this._fixY)
				this.y += (this.height - size.height) * this._fixY;
			this.width = size.width;
			this.height = size.height;
			this._fixW = 1;
			this._fixH = 1;
		},
	
		getLeft: function() {
			return this.x;
		},
	
		setLeft: function(left) {
			if (!this._fixW)
				this.width -= left - this.x;
			this.x = left;
			this._fixX = 0;
		},
	
		getTop: function() {
			return this.y;
		},
	
		setTop: function(top) {
			if (!this._fixH)
				this.height -= top - this.y;
			this.y = top;
			this._fixY = 0;
		},
	
		getRight: function() {
			return this.x + this.width;
		},
	
		setRight: function(right) {
			if (this._fixX !== undefined && this._fixX !== 1)
				this._fixW = 0;
			if (this._fixW)
				this.x = right - this.width;
			else
				this.width = right - this.x;
			this._fixX = 1;
		},
	
		getBottom: function() {
			return this.y + this.height;
		},
	
		setBottom: function(bottom) {
			if (this._fixY !== undefined && this._fixY !== 1)
				this._fixH = 0;
			if (this._fixH)
				this.y = bottom - this.height;
			else
				this.height = bottom - this.y;
			this._fixY = 1;
		},
	
		getCenterX: function() {
			return this.x + this.width * 0.5;
		},
	
		setCenterX: function(x) {
			this.x = x - this.width * 0.5;
			this._fixX = 0.5;
		},
	
		getCenterY: function() {
			return this.y + this.height * 0.5;
		},
	
		setCenterY: function(y) {
			this.y = y - this.height * 0.5;
			this._fixY = 0.5;
		},
	
		getCenter: function(_dontLink) {
			var ctor = _dontLink ? Point : LinkedPoint;
			return new ctor(this.getCenterX(), this.getCenterY(), this, 'setCenter');
		},
	
		setCenter: function() {
			var point = Point.read(arguments);
			this.setCenterX(point.x);
			this.setCenterY(point.y);
			return this;
		},
	
		getArea: function() {
			return this.width * this.height;
		},
	
		isEmpty: function() {
			return this.width === 0 || this.height === 0;
		},
	
		contains: function(arg) {
			return arg && arg.width !== undefined
					|| (Array.isArray(arg) ? arg : arguments).length == 4
					? this._containsRectangle(Rectangle.read(arguments))
					: this._containsPoint(Point.read(arguments));
		},
	
		_containsPoint: function(point) {
			var x = point.x,
				y = point.y;
			return x >= this.x && y >= this.y
					&& x <= this.x + this.width
					&& y <= this.y + this.height;
		},
	
		_containsRectangle: function(rect) {
			var x = rect.x,
				y = rect.y;
			return x >= this.x && y >= this.y
					&& x + rect.width <= this.x + this.width
					&& y + rect.height <= this.y + this.height;
		},
	
		intersects: function() {
			var rect = Rectangle.read(arguments);
			return rect.x + rect.width > this.x
					&& rect.y + rect.height > this.y
					&& rect.x < this.x + this.width
					&& rect.y < this.y + this.height;
		},
	
		touches: function() {
			var rect = Rectangle.read(arguments);
			return rect.x + rect.width >= this.x
					&& rect.y + rect.height >= this.y
					&& rect.x <= this.x + this.width
					&& rect.y <= this.y + this.height;
		},
	
		intersect: function() {
			var rect = Rectangle.read(arguments),
				x1 = Math.max(this.x, rect.x),
				y1 = Math.max(this.y, rect.y),
				x2 = Math.min(this.x + this.width, rect.x + rect.width),
				y2 = Math.min(this.y + this.height, rect.y + rect.height);
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},
	
		unite: function() {
			var rect = Rectangle.read(arguments),
				x1 = Math.min(this.x, rect.x),
				y1 = Math.min(this.y, rect.y),
				x2 = Math.max(this.x + this.width, rect.x + rect.width),
				y2 = Math.max(this.y + this.height, rect.y + rect.height);
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},
	
		include: function() {
			var point = Point.read(arguments);
			var x1 = Math.min(this.x, point.x),
				y1 = Math.min(this.y, point.y),
				x2 = Math.max(this.x + this.width, point.x),
				y2 = Math.max(this.y + this.height, point.y);
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},
	
		expand: function() {
			var amount = Size.read(arguments),
				hor = amount.width,
				ver = amount.height;
			return new Rectangle(this.x - hor / 2, this.y - ver / 2,
					this.width + hor, this.height + ver);
		},
	
		scale: function(hor, ver) {
			return this.expand(this.width * hor - this.width,
					this.height * (ver === undefined ? hor : ver) - this.height);
		}
	}, Base.each([
			['Top', 'Left'], ['Top', 'Right'],
			['Bottom', 'Left'], ['Bottom', 'Right'],
			['Left', 'Center'], ['Top', 'Center'],
			['Right', 'Center'], ['Bottom', 'Center']
		],
		function(parts, index) {
			var part = parts.join('');
			var xFirst = /^[RL]/.test(part);
			if (index >= 4)
				parts[1] += xFirst ? 'Y' : 'X';
			var x = parts[xFirst ? 0 : 1],
				y = parts[xFirst ? 1 : 0],
				getX = 'get' + x,
				getY = 'get' + y,
				setX = 'set' + x,
				setY = 'set' + y,
				get = 'get' + part,
				set = 'set' + part;
			this[get] = function(_dontLink) {
				var ctor = _dontLink ? Point : LinkedPoint;
				return new ctor(this[getX](), this[getY](), this, set);
			};
			this[set] = function() {
				var point = Point.read(arguments);
				this[setX](point.x);
				this[setY](point.y);
			};
		}, {
			beans: true
		}
	));
	
	var LinkedRectangle = Rectangle.extend({
		initialize: function Rectangle(x, y, width, height, owner, setter) {
			this.set(x, y, width, height, true);
			this._owner = owner;
			this._setter = setter;
		},
	
		set: function(x, y, width, height, _dontNotify) {
			this._x = x;
			this._y = y;
			this._width = width;
			this._height = height;
			if (!_dontNotify)
				this._owner[this._setter](this);
			return this;
		}
	},
	new function() {
		var proto = Rectangle.prototype;
	
		return Base.each(['x', 'y', 'width', 'height'], function(key) {
			var part = Base.capitalize(key);
			var internal = '_' + key;
			this['get' + part] = function() {
				return this[internal];
			};
	
			this['set' + part] = function(value) {
				this[internal] = value;
				if (!this._dontNotify)
					this._owner[this._setter](this);
			};
		}, Base.each(['Point', 'Size', 'Center',
				'Left', 'Top', 'Right', 'Bottom', 'CenterX', 'CenterY',
				'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
				'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'],
			function(key) {
				var name = 'set' + key;
				this[name] = function() {
					this._dontNotify = true;
					proto[name].apply(this, arguments);
					this._dontNotify = false;
					this._owner[this._setter](this);
				};
			}, {
				isSelected: function() {
					return this._owner._boundsSelected;
				},
	
				setSelected: function(selected) {
					var owner = this._owner;
					if (owner.setSelected) {
						owner._boundsSelected = selected;
						owner.setSelected(selected || owner._selectedSegmentState > 0);
					}
				}
			})
		);
	});
	
	var Matrix = Base.extend({
		_class: 'Matrix',
	
		initialize: function Matrix(arg) {
			var count = arguments.length,
				ok = true;
			if (count === 6) {
				this.set.apply(this, arguments);
			} else if (count === 1) {
				if (arg instanceof Matrix) {
					this.set(arg._a, arg._c, arg._b, arg._d, arg._tx, arg._ty);
				} else if (Array.isArray(arg)) {
					this.set.apply(this, arg);
				} else {
					ok = false;
				}
			} else if (count === 0) {
				this.reset();
			} else {
				ok = false;
			}
			if (!ok)
				throw new Error('Unsupported matrix parameters');
		},
	
		set: function(a, c, b, d, tx, ty, _dontNotify) {
			this._a = a;
			this._c = c;
			this._b = b;
			this._d = d;
			this._tx = tx;
			this._ty = ty;
			if (!_dontNotify)
				this._changed();
			return this;
		},
	
		_serialize: function(options) {
			return Base.serialize(this.getValues(), options);
		},
	
		_changed: function() {
			var owner = this._owner;
			if (owner) {
				if (owner._applyMatrix) {
					owner.transform(null, true);
				} else {
					owner._changed(9);
				}
			}
		},
	
		clone: function() {
			return new Matrix(this._a, this._c, this._b, this._d,
					this._tx, this._ty);
		},
	
		equals: function(mx) {
			return mx === this || mx && this._a === mx._a && this._b === mx._b
					&& this._c === mx._c && this._d === mx._d
					&& this._tx === mx._tx && this._ty === mx._ty
					|| false;
		},
	
		toString: function() {
			var f = Formatter.instance;
			return '[[' + [f.number(this._a), f.number(this._b),
						f.number(this._tx)].join(', ') + '], ['
					+ [f.number(this._c), f.number(this._d),
						f.number(this._ty)].join(', ') + ']]';
		},
	
		reset: function(_dontNotify) {
			this._a = this._d = 1;
			this._c = this._b = this._tx = this._ty = 0;
			if (!_dontNotify)
				this._changed();
			return this;
		},
	
		apply: function(recursively, _setApplyMatrix) {
			var owner = this._owner;
			if (owner) {
				owner.transform(null, true, Base.pick(recursively, true),
						_setApplyMatrix);
				return this.isIdentity();
			}
			return false;
		},
	
		translate: function() {
			var point = Point.read(arguments),
				x = point.x,
				y = point.y;
			this._tx += x * this._a + y * this._b;
			this._ty += x * this._c + y * this._d;
			this._changed();
			return this;
		},
	
		scale: function() {
			var scale = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true });
			if (center)
				this.translate(center);
			this._a *= scale.x;
			this._c *= scale.x;
			this._b *= scale.y;
			this._d *= scale.y;
			if (center)
				this.translate(center.negate());
			this._changed();
			return this;
		},
	
		rotate: function(angle ) {
			angle *= Math.PI / 180;
			var center = Point.read(arguments, 1),
				x = center.x,
				y = center.y,
				cos = Math.cos(angle),
				sin = Math.sin(angle),
				tx = x - x * cos + y * sin,
				ty = y - x * sin - y * cos,
				a = this._a,
				b = this._b,
				c = this._c,
				d = this._d;
			this._a = cos * a + sin * b;
			this._b = -sin * a + cos * b;
			this._c = cos * c + sin * d;
			this._d = -sin * c + cos * d;
			this._tx += tx * a + ty * b;
			this._ty += tx * c + ty * d;
			this._changed();
			return this;
		},
	
		shear: function() {
			var shear = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true });
			if (center)
				this.translate(center);
			var a = this._a,
				c = this._c;
			this._a += shear.y * this._b;
			this._c += shear.y * this._d;
			this._b += shear.x * a;
			this._d += shear.x * c;
			if (center)
				this.translate(center.negate());
			this._changed();
			return this;
		},
	
		skew: function() {
			var skew = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true }),
				toRadians = Math.PI / 180,
				shear = new Point(Math.tan(skew.x * toRadians),
					Math.tan(skew.y * toRadians));
			return this.shear(shear, center);
		},
	
		concatenate: function(mx) {
			var a1 = this._a,
				b1 = this._b,
				c1 = this._c,
				d1 = this._d,
				a2 = mx._a,
				b2 = mx._b,
				c2 = mx._c,
				d2 = mx._d,
				tx2 = mx._tx,
				ty2 = mx._ty;
			this._a = a2 * a1 + c2 * b1;
			this._b = b2 * a1 + d2 * b1;
			this._c = a2 * c1 + c2 * d1;
			this._d = b2 * c1 + d2 * d1;
			this._tx += tx2 * a1 + ty2 * b1;
			this._ty += tx2 * c1 + ty2 * d1;
			this._changed();
			return this;
		},
	
		preConcatenate: function(mx) {
			var a1 = this._a,
				b1 = this._b,
				c1 = this._c,
				d1 = this._d,
				tx1 = this._tx,
				ty1 = this._ty,
				a2 = mx._a,
				b2 = mx._b,
				c2 = mx._c,
				d2 = mx._d,
				tx2 = mx._tx,
				ty2 = mx._ty;
			this._a = a2 * a1 + b2 * c1;
			this._b = a2 * b1 + b2 * d1;
			this._c = c2 * a1 + d2 * c1;
			this._d = c2 * b1 + d2 * d1;
			this._tx = a2 * tx1 + b2 * ty1 + tx2;
			this._ty = c2 * tx1 + d2 * ty1 + ty2;
			this._changed();
			return this;
		},
	
		chain: function(mx) {
			var a1 = this._a,
				b1 = this._b,
				c1 = this._c,
				d1 = this._d,
				tx1 = this._tx,
				ty1 = this._ty,
				a2 = mx._a,
				b2 = mx._b,
				c2 = mx._c,
				d2 = mx._d,
				tx2 = mx._tx,
				ty2 = mx._ty;
			return new Matrix(
					a2 * a1 + c2 * b1,
					a2 * c1 + c2 * d1,
					b2 * a1 + d2 * b1,
					b2 * c1 + d2 * d1,
					tx1 + tx2 * a1 + ty2 * b1,
					ty1 + tx2 * c1 + ty2 * d1);
		},
	
		isIdentity: function() {
			return this._a === 1 && this._c === 0 && this._b === 0 && this._d === 1
					&& this._tx === 0 && this._ty === 0;
		},
	
		orNullIfIdentity: function() {
			return this.isIdentity() ? null : this;
		},
	
		isInvertible: function() {
			return !!this._getDeterminant();
		},
	
		isSingular: function() {
			return !this._getDeterminant();
		},
	
		transform: function( src, dst, count) {
			return arguments.length < 3
				? this._transformPoint(Point.read(arguments))
				: this._transformCoordinates(src, dst, count);
		},
	
		_transformPoint: function(point, dest, _dontNotify) {
			var x = point.x,
				y = point.y;
			if (!dest)
				dest = new Point();
			return dest.set(
				x * this._a + y * this._b + this._tx,
				x * this._c + y * this._d + this._ty,
				_dontNotify
			);
		},
	
		_transformCoordinates: function(src, dst, count) {
			var i = 0,
				j = 0,
				max = 2 * count;
			while (i < max) {
				var x = src[i++],
					y = src[i++];
				dst[j++] = x * this._a + y * this._b + this._tx;
				dst[j++] = x * this._c + y * this._d + this._ty;
			}
			return dst;
		},
	
		_transformCorners: function(rect) {
			var x1 = rect.x,
				y1 = rect.y,
				x2 = x1 + rect.width,
				y2 = y1 + rect.height,
				coords = [ x1, y1, x2, y1, x2, y2, x1, y2 ];
			return this._transformCoordinates(coords, coords, 4);
		},
	
		_transformBounds: function(bounds, dest, _dontNotify) {
			var coords = this._transformCorners(bounds),
				min = coords.slice(0, 2),
				max = min.slice();
			for (var i = 2; i < 8; i++) {
				var val = coords[i],
					j = i & 1;
				if (val < min[j])
					min[j] = val;
				else if (val > max[j])
					max[j] = val;
			}
			if (!dest)
				dest = new Rectangle();
			return dest.set(min[0], min[1], max[0] - min[0], max[1] - min[1],
					_dontNotify);
		},
	
		inverseTransform: function() {
			return this._inverseTransform(Point.read(arguments));
		},
	
		_getDeterminant: function() {
			var det = this._a * this._d - this._b * this._c;
			return isFinite(det) && !Numerical.isZero(det)
					&& isFinite(this._tx) && isFinite(this._ty)
					? det : null;
		},
	
		_inverseTransform: function(point, dest, _dontNotify) {
			var det = this._getDeterminant();
			if (!det)
				return null;
			var x = point.x - this._tx,
				y = point.y - this._ty;
			if (!dest)
				dest = new Point();
			return dest.set(
				(x * this._d - y * this._b) / det,
				(y * this._a - x * this._c) / det,
				_dontNotify
			);
		},
	
		decompose: function() {
			var a = this._a, b = this._b, c = this._c, d = this._d;
			if (Numerical.isZero(a * d - b * c))
				return null;
	
			var scaleX = Math.sqrt(a * a + b * b);
			a /= scaleX;
			b /= scaleX;
	
			var shear = a * c + b * d;
			c -= a * shear;
			d -= b * shear;
	
			var scaleY = Math.sqrt(c * c + d * d);
			c /= scaleY;
			d /= scaleY;
			shear /= scaleY;
	
			if (a * d < b * c) {
				a = -a;
				b = -b;
				shear = -shear;
				scaleX = -scaleX;
			}
	
			return {
				scaling: new Point(scaleX, scaleY),
				rotation: -Math.atan2(b, a) * 180 / Math.PI,
				shearing: shear
			};
		},
	
		getValues: function() {
			return [ this._a, this._c, this._b, this._d, this._tx, this._ty ];
		},
	
		getTranslation: function() {
			return new Point(this._tx, this._ty);
		},
	
		getScaling: function() {
			return (this.decompose() || {}).scaling;
		},
	
		getRotation: function() {
			return (this.decompose() || {}).rotation;
		},
	
		inverted: function() {
			var det = this._getDeterminant();
			return det && new Matrix(
					this._d / det,
					-this._c / det,
					-this._b / det,
					this._a / det,
					(this._b * this._ty - this._d * this._tx) / det,
					(this._c * this._tx - this._a * this._ty) / det);
		},
	
		shiftless: function() {
			return new Matrix(this._a, this._c, this._b, this._d, 0, 0);
		},
	
		applyToContext: function(ctx) {
			ctx.transform(this._a, this._c, this._b, this._d, this._tx, this._ty);
		}
	}, Base.each(['a', 'c', 'b', 'd', 'tx', 'ty'], function(name) {
		var part = Base.capitalize(name),
			prop = '_' + name;
		this['get' + part] = function() {
			return this[prop];
		};
		this['set' + part] = function(value) {
			this[prop] = value;
			this._changed();
		};
	}, {}));
	
	var Line = Base.extend({
		_class: 'Line',
	
		initialize: function Line(arg0, arg1, arg2, arg3, arg4) {
			var asVector = false;
			if (arguments.length >= 4) {
				this._px = arg0;
				this._py = arg1;
				this._vx = arg2;
				this._vy = arg3;
				asVector = arg4;
			} else {
				this._px = arg0.x;
				this._py = arg0.y;
				this._vx = arg1.x;
				this._vy = arg1.y;
				asVector = arg2;
			}
			if (!asVector) {
				this._vx -= this._px;
				this._vy -= this._py;
			}
		},
	
		getPoint: function() {
			return new Point(this._px, this._py);
		},
	
		getVector: function() {
			return new Point(this._vx, this._vy);
		},
	
		getLength: function() {
			return this.getVector().getLength();
		},
	
		intersect: function(line, isInfinite) {
			return Line.intersect(
					this._px, this._py, this._vx, this._vy,
					line._px, line._py, line._vx, line._vy,
					true, isInfinite);
		},
	
		getSide: function(point, isInfinite) {
			return Line.getSide(
					this._px, this._py, this._vx, this._vy,
					point.x, point.y, true, isInfinite);
		},
	
		getDistance: function(point) {
			return Math.abs(Line.getSignedDistance(
					this._px, this._py, this._vx, this._vy,
					point.x, point.y, true));
		},
	
		isCollinear: function(line) {
			return Point.isCollinear(this._vx, this._vy, line._vx, line._vy);
		},
	
		isOrthogonal: function(line) {
			return Point.isOrthogonal(this._vx, this._vy, line._vx, line._vy);
		},
	
		statics: {
			intersect: function(p1x, p1y, v1x, v1y, p2x, p2y, v2x, v2y, asVector,
					isInfinite) {
				if (!asVector) {
					v1x -= p1x;
					v1y -= p1y;
					v2x -= p2x;
					v2y -= p2y;
				}
				var cross = v1x * v2y - v1y * v2x;
				if (!Numerical.isZero(cross)) {
					var dx = p1x - p2x,
						dy = p1y - p2y,
						u1 = (v2x * dy - v2y * dx) / cross,
						u2 = (v1x * dy - v1y * dx) / cross,
						epsilon = 1e-12,
						uMin = -epsilon,
						uMax = 1 + epsilon;
					if (isInfinite
							|| uMin < u1 && u1 < uMax && uMin < u2 && u2 < uMax) {
						if (!isInfinite) {
							u1 = u1 <= 0 ? 0 : u1 >= 1 ? 1 : u1;
						}
						return new Point(
								p1x + u1 * v1x,
								p1y + u1 * v1y);
					}
				}
			},
	
			getSide: function(px, py, vx, vy, x, y, asVector, isInfinite) {
				if (!asVector) {
					vx -= px;
					vy -= py;
				}
				var v2x = x - px,
					v2y = y - py,
					ccw = v2x * vy - v2y * vx;
				if (ccw === 0 && !isInfinite) {
					ccw = (v2x * vx + v2x * vx) / (vx * vx + vy * vy);
					if (ccw >= 0 && ccw <= 1)
						ccw = 0;
				}
				return ccw < 0 ? -1 : ccw > 0 ? 1 : 0;
			},
	
			getSignedDistance: function(px, py, vx, vy, x, y, asVector) {
				if (!asVector) {
					vx -= px;
					vy -= py;
				}
				return vx === 0 ? vy > 0 ? x - px : px - x
					 : vy === 0 ? vx < 0 ? y - py : py - y
					 : ((x-px) * vy - (y-py) * vx) / Math.sqrt(vx * vx + vy * vy);
			}
		}
	});
	
	var Project = PaperScopeItem.extend({
		_class: 'Project',
		_list: 'projects',
		_reference: 'project',
	
		initialize: function Project(element) {
			PaperScopeItem.call(this, true);
			this.layers = [];
			this._activeLayer = null;
			this.symbols = [];
			this._currentStyle = new Style(null, null, this);
			this._view = View.create(this,
					element || CanvasProvider.getCanvas(1, 1));
			this._selectedItems = {};
			this._selectedItemCount = 0;
			this._updateVersion = 0;
		},
	
		_serialize: function(options, dictionary) {
			return Base.serialize(this.layers, options, true, dictionary);
		},
	
		clear: function() {
			for (var i = this.layers.length - 1; i >= 0; i--)
				this.layers[i].remove();
			this.symbols = [];
		},
	
		isEmpty: function() {
			return this.layers.length === 0;
		},
	
		remove: function remove() {
			if (!remove.base.call(this))
				return false;
			if (this._view)
				this._view.remove();
			return true;
		},
	
		getView: function() {
			return this._view;
		},
	
		getCurrentStyle: function() {
			return this._currentStyle;
		},
	
		setCurrentStyle: function(style) {
			this._currentStyle.initialize(style);
		},
	
		getIndex: function() {
			return this._index;
		},
	
		getOptions: function() {
			return this._scope.settings;
		},
	
		getActiveLayer: function() {
			return this._activeLayer || new Layer({ project: this });
		},
	
		getSelectedItems: function() {
			var items = [];
			for (var id in this._selectedItems) {
				var item = this._selectedItems[id];
				if (item.isInserted())
					items.push(item);
			}
			return items;
		},
	
		insertChild: function(index, item, _preserve) {
			if (item instanceof Layer) {
				item._remove(false, true);
				Base.splice(this.layers, [item], index, 0);
				item._setProject(this, true);
				if (this._changes)
					item._changed(5);
				if (!this._activeLayer)
					this._activeLayer = item;
			} else if (item instanceof Item) {
				(this._activeLayer
					|| this.insertChild(index, new Layer(Item.NO_INSERT)))
						.insertChild(index, item, _preserve);
			} else {
				item = null;
			}
			return item;
		},
	
		addChild: function(item, _preserve) {
			return this.insertChild(undefined, item, _preserve);
		},
	
		_updateSelection: function(item) {
			var id = item._id,
				selectedItems = this._selectedItems;
			if (item._selected) {
				if (selectedItems[id] !== item) {
					this._selectedItemCount++;
					selectedItems[id] = item;
				}
			} else if (selectedItems[id] === item) {
				this._selectedItemCount--;
				delete selectedItems[id];
			}
		},
	
		selectAll: function() {
			var layers = this.layers;
			for (var i = 0, l = layers.length; i < l; i++)
				layers[i].setFullySelected(true);
		},
	
		deselectAll: function() {
			var selectedItems = this._selectedItems;
			for (var i in selectedItems)
				selectedItems[i].setFullySelected(false);
		},
	
		hitTest: function() {
			var point = Point.read(arguments),
				options = HitResult.getOptions(Base.read(arguments));
			for (var i = this.layers.length - 1; i >= 0; i--) {
				var res = this.layers[i]._hitTest(point, options);
				if (res) return res;
			}
			return null;
		},
	
		getItems: function(match) {
			return Item._getItems(this.layers, match);
		},
	
		getItem: function(match) {
			return Item._getItems(this.layers, match, null, null, true)[0] || null;
		},
	
		importJSON: function(json) {
			this.activate();
			var layer = this._activeLayer;
			return Base.importJSON(json, layer && layer.isEmpty() && layer);
		},
	
		draw: function(ctx, matrix, pixelRatio) {
			this._updateVersion++;
			ctx.save();
			matrix.applyToContext(ctx);
			var param = new Base({
				offset: new Point(0, 0),
				pixelRatio: pixelRatio,
				viewMatrix: matrix.isIdentity() ? null : matrix,
				matrices: [new Matrix()],
				updateMatrix: true
			});
			for (var i = 0, layers = this.layers, l = layers.length; i < l; i++)
				layers[i].draw(ctx, param);
			ctx.restore();
	
			if (this._selectedItemCount > 0) {
				ctx.save();
				ctx.strokeWidth = 1;
				var items = this._selectedItems,
					size = this._scope.settings.handleSize,
					version = this._updateVersion;
				for (var id in items)
					items[id]._drawSelection(ctx, matrix, size, items, version);
				ctx.restore();
			}
		}
	});
	
	var Symbol = Base.extend({
		_class: 'Symbol',
	
		initialize: function Symbol(item, dontCenter) {
			this._id = UID.get();
			this.project = paper.project;
			this.project.symbols.push(this);
			if (item)
				this.setDefinition(item, dontCenter);
		},
	
		_serialize: function(options, dictionary) {
			return dictionary.add(this, function() {
				return Base.serialize([this._class, this._definition],
						options, false, dictionary);
			});
		},
	
		_changed: function(flags) {
			if (flags & 8) {
				Item._clearBoundsCache(this);
			}
			if (flags & 1) {
				this.project._needsUpdate = true;
			}
		},
	
		getDefinition: function() {
			return this._definition;
		},
	
		setDefinition: function(item, _dontCenter) {
			if (item._parentSymbol)
				item = item.clone();
			if (this._definition)
				this._definition._parentSymbol = null;
			this._definition = item;
			item.remove();
			item.setSelected(false);
			if (!_dontCenter)
				item.setPosition(new Point());
			item._parentSymbol = this;
			this._changed(9);
		},
	
		place: function(position) {
			return new PlacedSymbol(this, position);
		},
	
		clone: function() {
			return new Symbol(this._definition.clone(false));
		},
	
		equals: function(symbol) {
			return symbol === this
					|| symbol && this.definition.equals(symbol.definition)
					|| false;
		}
	});
	
	var Item = Base.extend(Emitter, {
		statics: {
			extend: function extend(src) {
				if (src._serializeFields)
					src._serializeFields = new Base(
							this.prototype._serializeFields, src._serializeFields);
				return extend.base.apply(this, arguments);
			},
	
			NO_INSERT: { insert: false }
		},
	
		_class: 'Item',
		_applyMatrix: true,
		_canApplyMatrix: true,
		_boundsSelected: false,
		_selectChildren: false,
		_serializeFields: {
			name: null,
			applyMatrix: null,
			matrix: new Matrix(),
			pivot: null,
			locked: false,
			visible: true,
			blendMode: 'normal',
			opacity: 1,
			guide: false,
			selected: false,
			clipMask: false,
			data: {}
		},
	
		initialize: function Item() {
		},
	
		_initialize: function(props, point) {
			var hasProps = props && Base.isPlainObject(props),
				internal = hasProps && props.internal === true,
				matrix = this._matrix = new Matrix(),
				project = hasProps && props.project || paper.project;
			if (!internal)
				this._id = UID.get();
			this._applyMatrix = this._canApplyMatrix && paper.settings.applyMatrix;
			if (point)
				matrix.translate(point);
			matrix._owner = this;
			this._style = new Style(project._currentStyle, this, project);
			if (!this._project) {
				if (internal || hasProps && props.insert === false) {
					this._setProject(project);
				} else if (hasProps && props.parent) {
					this.setParent(props.parent);
				} else {
					(project._activeLayer || new Layer()).addChild(this);
				}
			}
			if (hasProps && props !== Item.NO_INSERT)
				this._set(props, { insert: true, project: true, parent: true },
						true);
			return hasProps;
		},
	
		_events: Base.each(['onMouseDown', 'onMouseUp', 'onMouseDrag', 'onClick',
				'onDoubleClick', 'onMouseMove', 'onMouseEnter', 'onMouseLeave'],
			function(name) {
				this[name] = {
					install: function(type) {
						this.getView()._installEvent(type);
					},
	
					uninstall: function(type) {
						this.getView()._uninstallEvent(type);
					}
				};
			}, {
				onFrame: {
					install: function() {
						this.getView()._animateItem(this, true);
					},
	
					uninstall: function() {
						this.getView()._animateItem(this, false);
					}
				},
	
				onLoad: {}
			}
		),
	
		_serialize: function(options, dictionary) {
			var props = {},
				that = this;
	
			function serialize(fields) {
				for (var key in fields) {
					var value = that[key];
					if (!Base.equals(value, key === 'leading'
							? fields.fontSize * 1.2 : fields[key])) {
						props[key] = Base.serialize(value, options,
								key !== 'data', dictionary);
					}
				}
			}
	
			serialize(this._serializeFields);
			if (!(this instanceof Group))
				serialize(this._style._defaults);
			return [ this._class, props ];
		},
	
		_changed: function(flags) {
			var symbol = this._parentSymbol,
				cacheParent = this._parent || symbol,
				project = this._project;
			if (flags & 8) {
				this._bounds = this._position = this._decomposed =
						this._globalMatrix = this._currentPath = undefined;
			}
			if (cacheParent
					&& (flags & 40)) {
				Item._clearBoundsCache(cacheParent);
			}
			if (flags & 2) {
				Item._clearBoundsCache(this);
			}
			if (project) {
				if (flags & 1) {
					project._needsUpdate = true;
				}
				if (project._changes) {
					var entry = project._changesById[this._id];
					if (entry) {
						entry.flags |= flags;
					} else {
						entry = { item: this, flags: flags };
						project._changesById[this._id] = entry;
						project._changes.push(entry);
					}
				}
			}
			if (symbol)
				symbol._changed(flags);
		},
	
		set: function(props) {
			if (props)
				this._set(props);
			return this;
		},
	
		getId: function() {
			return this._id;
		},
	
		getName: function() {
			return this._name;
		},
	
		setName: function(name, unique) {
	
			if (this._name)
				this._removeNamed();
			if (name === (+name) + '')
				throw new Error(
						'Names consisting only of numbers are not supported.');
			var parent = this._parent;
			if (name && parent) {
				var children = parent._children,
					namedChildren = parent._namedChildren,
					orig = name,
					i = 1;
				while (unique && children[name])
					name = orig + ' ' + (i++);
				(namedChildren[name] = namedChildren[name] || []).push(this);
				children[name] = this;
			}
			this._name = name || undefined;
			this._changed(128);
		},
	
		getStyle: function() {
			return this._style;
		},
	
		setStyle: function(style) {
			this.getStyle().set(style);
		}
	}, Base.each(['locked', 'visible', 'blendMode', 'opacity', 'guide'],
		function(name) {
			var part = Base.capitalize(name),
				name = '_' + name;
			this['get' + part] = function() {
				return this[name];
			};
			this['set' + part] = function(value) {
				if (value != this[name]) {
					this[name] = value;
					this._changed(name === '_locked'
							? 128 : 129);
				}
			};
		},
	{}), {
		beans: true,
	
		_locked: false,
	
		_visible: true,
	
		_blendMode: 'normal',
	
		_opacity: 1,
	
		_guide: false,
	
		isSelected: function() {
			if (this._selectChildren) {
				var children = this._children;
				for (var i = 0, l = children.length; i < l; i++)
					if (children[i].isSelected())
						return true;
			}
			return this._selected;
		},
	
		setSelected: function(selected, noChildren) {
			if (!noChildren && this._selectChildren) {
				var children = this._children;
				for (var i = 0, l = children.length; i < l; i++)
					children[i].setSelected(selected);
			}
			if ((selected = !!selected) ^ this._selected) {
				this._selected = selected;
				this._project._updateSelection(this);
				this._changed(129);
			}
		},
	
		_selected: false,
	
		isFullySelected: function() {
			var children = this._children;
			if (children && this._selected) {
				for (var i = 0, l = children.length; i < l; i++)
					if (!children[i].isFullySelected())
						return false;
				return true;
			}
			return this._selected;
		},
	
		setFullySelected: function(selected) {
			var children = this._children;
			if (children) {
				for (var i = 0, l = children.length; i < l; i++)
					children[i].setFullySelected(selected);
			}
			this.setSelected(selected, true);
		},
	
		isClipMask: function() {
			return this._clipMask;
		},
	
		setClipMask: function(clipMask) {
			if (this._clipMask != (clipMask = !!clipMask)) {
				this._clipMask = clipMask;
				if (clipMask) {
					this.setFillColor(null);
					this.setStrokeColor(null);
				}
				this._changed(129);
				if (this._parent)
					this._parent._changed(1024);
			}
		},
	
		_clipMask: false,
	
		getData: function() {
			if (!this._data)
				this._data = {};
			return this._data;
		},
	
		setData: function(data) {
			this._data = data;
		},
	
		getPosition: function(_dontLink) {
			var position = this._position,
				ctor = _dontLink ? Point : LinkedPoint;
			if (!position) {
				var pivot = this._pivot;
				position = this._position = pivot
						? this._matrix._transformPoint(pivot)
						: this.getBounds().getCenter(true);
			}
			return new ctor(position.x, position.y, this, 'setPosition');
		},
	
		setPosition: function() {
			this.translate(Point.read(arguments).subtract(this.getPosition(true)));
		},
	
		getPivot: function(_dontLink) {
			var pivot = this._pivot;
			if (pivot) {
				var ctor = _dontLink ? Point : LinkedPoint;
				pivot = new ctor(pivot.x, pivot.y, this, 'setPivot');
			}
			return pivot;
		},
	
		setPivot: function() {
			this._pivot = Point.read(arguments, 0, { clone: true, readNull: true });
			this._position = undefined;
		},
	
		_pivot: null,
	}, Base.each(['bounds', 'strokeBounds', 'handleBounds', 'roughBounds',
			'internalBounds', 'internalRoughBounds'],
		function(key) {
			var getter = 'get' + Base.capitalize(key),
				match = key.match(/^internal(.*)$/),
				internalGetter = match ? 'get' + match[1] : null;
			this[getter] = function(_matrix) {
				var boundsGetter = this._boundsGetter,
					name = !internalGetter && (typeof boundsGetter === 'string'
							? boundsGetter : boundsGetter && boundsGetter[getter])
							|| getter,
					bounds = this._getCachedBounds(name, _matrix, this,
							internalGetter);
				return key === 'bounds'
						? new LinkedRectangle(bounds.x, bounds.y, bounds.width,
								bounds.height, this, 'setBounds')
						: bounds;
			};
		},
	{
		beans: true,
	
		_getBounds: function(getter, matrix, cacheItem) {
			var children = this._children;
			if (!children || children.length == 0)
				return new Rectangle();
			Item._updateBoundsCache(this, cacheItem);
			var x1 = Infinity,
				x2 = -x1,
				y1 = x1,
				y2 = x2;
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i];
				if (child._visible && !child.isEmpty()) {
					var rect = child._getCachedBounds(getter,
							matrix && matrix.chain(child._matrix), cacheItem);
					x1 = Math.min(rect.x, x1);
					y1 = Math.min(rect.y, y1);
					x2 = Math.max(rect.x + rect.width, x2);
					y2 = Math.max(rect.y + rect.height, y2);
				}
			}
			return isFinite(x1)
					? new Rectangle(x1, y1, x2 - x1, y2 - y1)
					: new Rectangle();
		},
	
		setBounds: function() {
			var rect = Rectangle.read(arguments),
				bounds = this.getBounds(),
				matrix = new Matrix(),
				center = rect.getCenter();
			matrix.translate(center);
			if (rect.width != bounds.width || rect.height != bounds.height) {
				matrix.scale(
						bounds.width != 0 ? rect.width / bounds.width : 1,
						bounds.height != 0 ? rect.height / bounds.height : 1);
			}
			center = bounds.getCenter();
			matrix.translate(-center.x, -center.y);
			this.transform(matrix);
		},
	
		_getCachedBounds: function(getter, matrix, cacheItem, internalGetter) {
			matrix = matrix && matrix.orNullIfIdentity();
			var _matrix = internalGetter ? null : this._matrix.orNullIfIdentity(),
				cache = (!matrix || matrix.equals(_matrix)) && getter;
			Item._updateBoundsCache(this._parent || this._parentSymbol, cacheItem);
			if (cache && this._bounds && this._bounds[cache])
				return this._bounds[cache].clone();
			var bounds = this._getBounds(internalGetter || getter,
					matrix || _matrix, cacheItem);
			if (cache) {
				if (!this._bounds)
					this._bounds = {};
				var cached = this._bounds[cache] = bounds.clone();
				cached._internal = !!internalGetter;
			}
			return bounds;
		},
	
		statics: {
			_updateBoundsCache: function(parent, item) {
				if (parent) {
					var id = item._id,
						ref = parent._boundsCache = parent._boundsCache || {
							ids: {},
							list: []
						};
					if (!ref.ids[id]) {
						ref.list.push(item);
						ref.ids[id] = item;
					}
				}
			},
	
			_clearBoundsCache: function(item) {
				var cache = item._boundsCache;
				if (cache) {
					item._bounds = item._position = item._boundsCache = undefined;
					for (var i = 0, list = cache.list, l = list.length; i < l; i++){
						var other = list[i];
						if (other !== item) {
							other._bounds = other._position = undefined;
							if (other._boundsCache)
								Item._clearBoundsCache(other);
						}
					}
				}
			}
		}
	
	}), {
		beans: true,
	
		_decompose: function() {
			return this._decomposed = this._matrix.decompose();
		},
	
		getRotation: function() {
			var decomposed = this._decomposed || this._decompose();
			return decomposed && decomposed.rotation;
		},
	
		setRotation: function(rotation) {
			var current = this.getRotation();
			if (current != null && rotation != null) {
				var decomposed = this._decomposed;
				this.rotate(rotation - current);
				decomposed.rotation = rotation;
				this._decomposed = decomposed;
			}
		},
	
		getScaling: function(_dontLink) {
			var decomposed = this._decomposed || this._decompose(),
				scaling = decomposed && decomposed.scaling,
				ctor = _dontLink ? Point : LinkedPoint;
			return scaling && new ctor(scaling.x, scaling.y, this, 'setScaling');
		},
	
		setScaling: function() {
			var current = this.getScaling();
			if (current) {
				var scaling = Point.read(arguments, 0, { clone: true }),
					decomposed = this._decomposed;
				this.scale(scaling.x / current.x, scaling.y / current.y);
				decomposed.scaling = scaling;
				this._decomposed = decomposed;
			}
		},
	
		getMatrix: function() {
			return this._matrix;
		},
	
		setMatrix: function() {
			var matrix = this._matrix;
			matrix.initialize.apply(matrix, arguments);
			if (this._applyMatrix) {
				this.transform(null, true);
			} else {
				this._changed(9);
			}
		},
	
		getGlobalMatrix: function(_dontClone) {
			var matrix = this._globalMatrix,
				updateVersion = this._project._updateVersion;
			if (matrix && matrix._updateVersion !== updateVersion)
				matrix = null;
			if (!matrix) {
				matrix = this._globalMatrix = this._matrix.clone();
				var parent = this._parent;
				if (parent)
					matrix.preConcatenate(parent.getGlobalMatrix(true));
				matrix._updateVersion = updateVersion;
			}
			return _dontClone ? matrix : matrix.clone();
		},
	
		getApplyMatrix: function() {
			return this._applyMatrix;
		},
	
		setApplyMatrix: function(apply) {
			if (this._applyMatrix = this._canApplyMatrix && !!apply)
				this.transform(null, true);
		},
	
		getTransformContent: '#getApplyMatrix',
		setTransformContent: '#setApplyMatrix',
	}, {
		getProject: function() {
			return this._project;
		},
	
		_setProject: function(project, installEvents) {
			if (this._project !== project) {
				if (this._project)
					this._installEvents(false);
				this._project = project;
				var children = this._children;
				for (var i = 0, l = children && children.length; i < l; i++)
					children[i]._setProject(project);
				installEvents = true;
			}
			if (installEvents)
				this._installEvents(true);
		},
	
		getView: function() {
			return this._project.getView();
		},
	
		_installEvents: function _installEvents(install) {
			_installEvents.base.call(this, install);
			var children = this._children;
			for (var i = 0, l = children && children.length; i < l; i++)
				children[i]._installEvents(install);
		},
	
		getLayer: function() {
			var parent = this;
			while (parent = parent._parent) {
				if (parent instanceof Layer)
					return parent;
			}
			return null;
		},
	
		getParent: function() {
			return this._parent;
		},
	
		setParent: function(item) {
			return item.addChild(this);
		},
	
		getChildren: function() {
			return this._children;
		},
	
		setChildren: function(items) {
			this.removeChildren();
			this.addChildren(items);
		},
	
		getFirstChild: function() {
			return this._children && this._children[0] || null;
		},
	
		getLastChild: function() {
			return this._children && this._children[this._children.length - 1]
					|| null;
		},
	
		getNextSibling: function() {
			return this._parent && this._parent._children[this._index + 1] || null;
		},
	
		getPreviousSibling: function() {
			return this._parent && this._parent._children[this._index - 1] || null;
		},
	
		getIndex: function() {
			return this._index;
		},
	
		equals: function(item) {
			return item === this || item && this._class === item._class
					&& this._style.equals(item._style)
					&& this._matrix.equals(item._matrix)
					&& this._locked === item._locked
					&& this._visible === item._visible
					&& this._blendMode === item._blendMode
					&& this._opacity === item._opacity
					&& this._clipMask === item._clipMask
					&& this._guide === item._guide
					&& this._equals(item)
					|| false;
		},
	
		_equals: function(item) {
			return Base.equals(this._children, item._children);
		},
	
		clone: function(insert) {
			return this._clone(new this.constructor(Item.NO_INSERT), insert);
		},
	
		_clone: function(copy, insert, includeMatrix) {
			var keys = ['_locked', '_visible', '_blendMode', '_opacity',
					'_clipMask', '_guide'],
				children = this._children;
			copy.setStyle(this._style);
			for (var i = 0, l = children && children.length; i < l; i++) {
				copy.addChild(children[i].clone(false), true);
			}
			for (var i = 0, l = keys.length; i < l; i++) {
				var key = keys[i];
				if (this.hasOwnProperty(key))
					copy[key] = this[key];
			}
			if (includeMatrix !== false)
				copy._matrix.initialize(this._matrix);
			copy.setApplyMatrix(this._applyMatrix);
			copy.setPivot(this._pivot);
			copy.setSelected(this._selected);
			copy._data = this._data ? Base.clone(this._data) : null;
			if (insert || insert === undefined)
				copy.insertAbove(this);
			if (this._name)
				copy.setName(this._name, true);
			return copy;
		},
	
		copyTo: function(itemOrProject) {
			return itemOrProject.addChild(this.clone(false));
		},
	
		rasterize: function(resolution) {
			var bounds = this.getStrokeBounds(),
				scale = (resolution || this.getView().getResolution()) / 72,
				topLeft = bounds.getTopLeft().floor(),
				bottomRight = bounds.getBottomRight().ceil(),
				size = new Size(bottomRight.subtract(topLeft)),
				canvas = CanvasProvider.getCanvas(size.multiply(scale)),
				ctx = canvas.getContext('2d'),
				matrix = new Matrix().scale(scale).translate(topLeft.negate());
			ctx.save();
			matrix.applyToContext(ctx);
			this.draw(ctx, new Base({ matrices: [matrix] }));
			ctx.restore();
			var raster = new Raster(Item.NO_INSERT);
			raster.setCanvas(canvas);
			raster.transform(new Matrix().translate(topLeft.add(size.divide(2)))
					.scale(1 / scale));
			raster.insertAbove(this);
			return raster;
		},
	
		contains: function() {
			return !!this._contains(
					this._matrix._inverseTransform(Point.read(arguments)));
		},
	
		_contains: function(point) {
			if (this._children) {
				for (var i = this._children.length - 1; i >= 0; i--) {
					if (this._children[i].contains(point))
						return true;
				}
				return false;
			}
			return point.isInside(this.getInternalBounds());
		},
	
		isInside: function() {
			return Rectangle.read(arguments).contains(this.getBounds());
		},
	
		_asPathItem: function() {
			return new Path.Rectangle({
				rectangle: this.getInternalBounds(),
				matrix: this._matrix,
				insert: false,
			});
		},
	
		intersects: function(item, _matrix) {
			if (!(item instanceof Item))
				return false;
			return this._asPathItem().getIntersections(item._asPathItem(), null,
					_matrix || item._matrix, true).length > 0;
		},
	
		hitTest: function() {
			return this._hitTest(
					Point.read(arguments),
					HitResult.getOptions(Base.read(arguments)));
		},
	
		_hitTest: function(point, options) {
			if (this._locked || !this._visible || this._guide && !options.guides
					|| this.isEmpty())
				return null;
	
			var matrix = this._matrix,
				parentTotalMatrix = options._totalMatrix,
				view = this.getView(),
				totalMatrix = options._totalMatrix = parentTotalMatrix
						? parentTotalMatrix.chain(matrix)
						: this.getGlobalMatrix().preConcatenate(view._matrix),
				tolerancePadding = options._tolerancePadding = new Size(
							Path._getPenPadding(1, totalMatrix.inverted())
						).multiply(
							Math.max(options.tolerance, 1e-6)
						);
			point = matrix._inverseTransform(point);
	
			if (!this._children && !this.getInternalRoughBounds()
					.expand(tolerancePadding.multiply(2))._containsPoint(point))
				return null;
			var checkSelf = !(options.guides && !this._guide
					|| options.selected && !this._selected
					|| options.type && options.type !== Base.hyphenate(this._class)
					|| options.class && !(this instanceof options.class)),
				that = this,
				res;
	
			function checkBounds(type, part) {
				var pt = bounds['get' + part]();
				if (point.subtract(pt).divide(tolerancePadding).length <= 1)
					return new HitResult(type, that,
							{ name: Base.hyphenate(part), point: pt });
			}
	
			if (checkSelf && (options.center || options.bounds) && this._parent) {
				var bounds = this.getInternalBounds();
				if (options.center)
					res = checkBounds('center', 'Center');
				if (!res && options.bounds) {
					var points = [
						'TopLeft', 'TopRight', 'BottomLeft', 'BottomRight',
						'LeftCenter', 'TopCenter', 'RightCenter', 'BottomCenter'
					];
					for (var i = 0; i < 8 && !res; i++)
						res = checkBounds('bounds', points[i]);
				}
			}
	
			var children = !res && this._children;
			if (children) {
				var opts = this._getChildHitTestOptions(options);
				for (var i = children.length - 1; i >= 0 && !res; i--)
					res = children[i]._hitTest(point, opts);
			}
			if (!res && checkSelf)
				res = this._hitTestSelf(point, options);
			if (res && res.point)
				res.point = matrix.transform(res.point);
			options._totalMatrix = parentTotalMatrix;
			return res;
		},
	
		_getChildHitTestOptions: function(options) {
			return options;
		},
	
		_hitTestSelf: function(point, options) {
			if (options.fill && this.hasFill() && this._contains(point))
				return new HitResult('fill', this);
		},
	
		matches: function(name, compare) {
			function matchObject(obj1, obj2) {
				for (var i in obj1) {
					if (obj1.hasOwnProperty(i)) {
						var val1 = obj1[i],
							val2 = obj2[i];
						if (Base.isPlainObject(val1) && Base.isPlainObject(val2)) {
							if (!matchObject(val1, val2))
								return false;
						} else if (!Base.equals(val1, val2)) {
							return false;
						}
					}
				}
				return true;
			}
			var type = typeof name;
			if (type === 'object') {
				for (var key in name) {
					if (name.hasOwnProperty(key) && !this.matches(key, name[key]))
						return false;
				}
			} else if (type === 'function') {
				return name(this);
			} else {
				var value = /^(empty|editable)$/.test(name)
						? this['is' + Base.capitalize(name)]()
						: name === 'type'
							? Base.hyphenate(this._class)
							: this[name];
				if (/^(constructor|class)$/.test(name)) {
					if (!(this instanceof compare))
						return false;
				} else if (compare instanceof RegExp) {
					if (!compare.test(value))
						return false;
				} else if (typeof compare === 'function') {
					if (!compare(value))
						return false;
				} else if (Base.isPlainObject(compare)) {
					if (!matchObject(compare, value))
						return false;
				} else if (!Base.equals(value, compare)) {
					return false;
				}
			}
			return true;
		},
	
		getItems: function(match) {
			return Item._getItems(this._children, match, this._matrix);
		},
	
		getItem: function(match) {
			return Item._getItems(this._children, match, this._matrix, null, true)
					[0] || null;
		},
	
		statics: {
			_getItems: function _getItems(children, match, matrix, param,
					firstOnly) {
				if (!param && typeof match === 'object') {
					var overlapping = match.overlapping,
						inside = match.inside,
						bounds = overlapping || inside,
						rect = bounds && Rectangle.read([bounds]);
					param = {
						items: [],
						inside: !!inside,
						overlapping: !!overlapping,
						rect: rect,
						path: overlapping && new Path.Rectangle({
							rectangle: rect,
							insert: false
						})
					};
					if (bounds)
						match = Base.set({}, match,
								{ inside: true, overlapping: true });
				}
				var items = param && param.items,
					rect = param && param.rect;
				matrix = rect && (matrix || new Matrix());
				for (var i = 0, l = children && children.length; i < l; i++) {
					var child = children[i],
						childMatrix = matrix && matrix.chain(child._matrix),
						add = true;
					if (rect) {
						var bounds = child.getBounds(childMatrix);
						if (!rect.intersects(bounds))
							continue;
						if (!(param.inside && rect.contains(bounds))
								&& !(param.overlapping && (bounds.contains(rect)
									|| param.path.intersects(child, childMatrix))))
							add = false;
					}
					if (add && child.matches(match)) {
						items.push(child);
						if (firstOnly)
							break;
					}
					_getItems(child._children, match,
							childMatrix, param,
							firstOnly);
					if (firstOnly && items.length > 0)
						break;
				}
				return items;
			}
		}
	}, {
	
		importJSON: function(json) {
			var res = Base.importJSON(json, this);
			return res !== this
					? this.addChild(res)
					: res;
		},
	
		addChild: function(item, _preserve) {
			return this.insertChild(undefined, item, _preserve);
		},
	
		insertChild: function(index, item, _preserve) {
			var res = item ? this.insertChildren(index, [item], _preserve) : null;
			return res && res[0];
		},
	
		addChildren: function(items, _preserve) {
			return this.insertChildren(this._children.length, items, _preserve);
		},
	
		insertChildren: function(index, items, _preserve, _proto) {
			var children = this._children;
			if (children && items && items.length > 0) {
				items = Array.prototype.slice.apply(items);
				for (var i = items.length - 1; i >= 0; i--) {
					var item = items[i];
					if (_proto && !(item instanceof _proto)) {
						items.splice(i, 1);
					} else {
						var shift = item._parent === this && item._index < index;
						if (item._remove(false, true) && shift)
							index--;
					}
				}
				Base.splice(children, items, index, 0);
				var project = this._project,
					notifySelf = project && project._changes;
				for (var i = 0, l = items.length; i < l; i++) {
					var item = items[i];
					item._parent = this;
					item._setProject(this._project, true);
					if (item._name)
						item.setName(item._name);
					if (notifySelf)
						this._changed(5);
				}
				this._changed(11);
			} else {
				items = null;
			}
			return items;
		},
	
		_insertSibling: function(index, item, _preserve) {
			return this._parent
					? this._parent.insertChild(index, item, _preserve)
					: null;
		},
	
		insertAbove: function(item, _preserve) {
			return item._insertSibling(item._index + 1, this, _preserve);
		},
	
		insertBelow: function(item, _preserve) {
			return item._insertSibling(item._index, this, _preserve);
		},
	
		sendToBack: function() {
			return (this._parent || this instanceof Layer && this._project)
					.insertChild(0, this);
		},
	
		bringToFront: function() {
			return (this._parent || this instanceof Layer && this._project)
					.addChild(this);
		},
	
		appendTop: '#addChild',
	
		appendBottom: function(item) {
			return this.insertChild(0, item);
		},
	
		moveAbove: '#insertAbove',
	
		moveBelow: '#insertBelow',
	
		reduce: function() {
			if (this._children && this._children.length === 1) {
				var child = this._children[0].reduce();
				child.insertAbove(this);
				child.setStyle(this._style);
				this.remove();
				return child;
			}
			return this;
		},
	
		_removeNamed: function() {
			var parent = this._parent;
			if (parent) {
				var children = parent._children,
					namedChildren = parent._namedChildren,
					name = this._name,
					namedArray = namedChildren[name],
					index = namedArray ? namedArray.indexOf(this) : -1;
				if (index !== -1) {
					if (children[name] == this)
						delete children[name];
					namedArray.splice(index, 1);
					if (namedArray.length) {
						children[name] = namedArray[namedArray.length - 1];
					} else {
						delete namedChildren[name];
					}
				}
			}
		},
	
		_remove: function(notifySelf, notifyParent) {
			var parent = this._parent;
			if (parent) {
				if (this._name)
					this._removeNamed();
				if (this._index != null)
					Base.splice(parent._children, null, this._index, 1);
				this._installEvents(false);
				if (notifySelf) {
					var project = this._project;
					if (project && project._changes)
						this._changed(5);
				}
				if (notifyParent)
					parent._changed(11);
				this._parent = null;
				return true;
			}
			return false;
		},
	
		remove: function() {
			return this._remove(true, true);
		},
	
		replaceWith: function(item) {
			var ok = item && item.insertBelow(this);
			if (ok)
				this.remove();
			return ok;
		},
	
		removeChildren: function(from, to) {
			if (!this._children)
				return null;
			from = from || 0;
			to = Base.pick(to, this._children.length);
			var removed = Base.splice(this._children, null, from, to - from);
			for (var i = removed.length - 1; i >= 0; i--) {
				removed[i]._remove(true, false);
			}
			if (removed.length > 0)
				this._changed(11);
			return removed;
		},
	
		clear: '#removeChildren',
	
		reverseChildren: function() {
			if (this._children) {
				this._children.reverse();
				for (var i = 0, l = this._children.length; i < l; i++)
					this._children[i]._index = i;
				this._changed(11);
			}
		},
	
		isEmpty: function() {
			return !this._children || this._children.length === 0;
		},
	
		isEditable: function() {
			var item = this;
			while (item) {
				if (!item._visible || item._locked)
					return false;
				item = item._parent;
			}
			return true;
		},
	
		hasFill: function() {
			return this.getStyle().hasFill();
		},
	
		hasStroke: function() {
			return this.getStyle().hasStroke();
		},
	
		hasShadow: function() {
			return this.getStyle().hasShadow();
		},
	
		_getOrder: function(item) {
			function getList(item) {
				var list = [];
				do {
					list.unshift(item);
				} while (item = item._parent);
				return list;
			}
			var list1 = getList(this),
				list2 = getList(item);
			for (var i = 0, l = Math.min(list1.length, list2.length); i < l; i++) {
				if (list1[i] != list2[i]) {
					return list1[i]._index < list2[i]._index ? 1 : -1;
				}
			}
			return 0;
		},
	
		hasChildren: function() {
			return this._children && this._children.length > 0;
		},
	
		isInserted: function() {
			return this._parent ? this._parent.isInserted() : false;
		},
	
		isAbove: function(item) {
			return this._getOrder(item) === -1;
		},
	
		isBelow: function(item) {
			return this._getOrder(item) === 1;
		},
	
		isParent: function(item) {
			return this._parent === item;
		},
	
		isChild: function(item) {
			return item && item._parent === this;
		},
	
		isDescendant: function(item) {
			var parent = this;
			while (parent = parent._parent) {
				if (parent == item)
					return true;
			}
			return false;
		},
	
		isAncestor: function(item) {
			return item ? item.isDescendant(this) : false;
		},
	
		isSibling: function(item) {
			return this._parent === item._parent;
		},
	
		isGroupedWith: function(item) {
			var parent = this._parent;
			while (parent) {
				if (parent._parent
					&& /^(Group|Layer|CompoundPath)$/.test(parent._class)
					&& item.isDescendant(parent))
						return true;
				parent = parent._parent;
			}
			return false;
		},
	
		translate: function() {
			var mx = new Matrix();
			return this.transform(mx.translate.apply(mx, arguments));
		},
	
		rotate: function(angle ) {
			return this.transform(new Matrix().rotate(angle,
					Point.read(arguments, 1, { readNull: true })
						|| this.getPosition(true)));
		}
	}, Base.each(['scale', 'shear', 'skew'], function(name) {
		this[name] = function() {
			var point = Point.read(arguments),
				center = Point.read(arguments, 0, { readNull: true });
			return this.transform(new Matrix()[name](point,
					center || this.getPosition(true)));
		};
	}, {
	
	}), {
		transform: function(matrix, _applyMatrix, _applyRecursively,
				_setApplyMatrix) {
			if (matrix && matrix.isIdentity())
				matrix = null;
			var _matrix = this._matrix,
				applyMatrix = (_applyMatrix || this._applyMatrix)
						&& ((!_matrix.isIdentity() || matrix)
							|| _applyMatrix && _applyRecursively && this._children);
			if (!matrix && !applyMatrix)
				return this;
			if (matrix)
				_matrix.preConcatenate(matrix);
			if (applyMatrix = applyMatrix && this._transformContent(_matrix,
						_applyRecursively, _setApplyMatrix)) {
				var pivot = this._pivot,
					style = this._style,
					fillColor = style.getFillColor(true),
					strokeColor = style.getStrokeColor(true);
				if (pivot)
					_matrix._transformPoint(pivot, pivot, true);
				if (fillColor)
					fillColor.transform(_matrix);
				if (strokeColor)
					strokeColor.transform(_matrix);
				_matrix.reset(true);
				if (_setApplyMatrix && this._canApplyMatrix)
					this._applyMatrix = true;
			}
			var bounds = this._bounds,
				position = this._position;
			this._changed(9);
			var decomp = bounds && matrix && matrix.decompose();
			if (decomp && !decomp.shearing && decomp.rotation % 90 === 0) {
				for (var key in bounds) {
					var rect = bounds[key];
					if (applyMatrix || !rect._internal)
						matrix._transformBounds(rect, rect);
				}
				var getter = this._boundsGetter,
					rect = bounds[getter && getter.getBounds || getter || 'getBounds'];
				if (rect)
					this._position = rect.getCenter(true);
				this._bounds = bounds;
			} else if (matrix && position) {
				this._position = matrix._transformPoint(position, position);
			}
			return this;
		},
	
		_transformContent: function(matrix, applyRecursively, setApplyMatrix) {
			var children = this._children;
			if (children) {
				for (var i = 0, l = children.length; i < l; i++)
					children[i].transform(matrix, true, applyRecursively,
							setApplyMatrix);
				return true;
			}
		},
	
		globalToLocal: function() {
			return this.getGlobalMatrix(true)._inverseTransform(
					Point.read(arguments));
		},
	
		localToGlobal: function() {
			return this.getGlobalMatrix(true)._transformPoint(
					Point.read(arguments));
		},
	
		parentToLocal: function() {
			return this._matrix._inverseTransform(Point.read(arguments));
		},
	
		localToParent: function() {
			return this._matrix._transformPoint(Point.read(arguments));
		},
	
		fitBounds: function(rectangle, fill) {
			rectangle = Rectangle.read(arguments);
			var bounds = this.getBounds(),
				itemRatio = bounds.height / bounds.width,
				rectRatio = rectangle.height / rectangle.width,
				scale = (fill ? itemRatio > rectRatio : itemRatio < rectRatio)
						? rectangle.width / bounds.width
						: rectangle.height / bounds.height,
				newBounds = new Rectangle(new Point(),
						new Size(bounds.width * scale, bounds.height * scale));
			newBounds.setCenter(rectangle.getCenter());
			this.setBounds(newBounds);
		},
	
		_setStyles: function(ctx) {
			var style = this._style,
				fillColor = style.getFillColor(),
				strokeColor = style.getStrokeColor(),
				shadowColor = style.getShadowColor();
			if (fillColor)
				ctx.fillStyle = fillColor.toCanvasStyle(ctx);
			if (strokeColor) {
				var strokeWidth = style.getStrokeWidth();
				if (strokeWidth > 0) {
					ctx.strokeStyle = strokeColor.toCanvasStyle(ctx);
					ctx.lineWidth = strokeWidth;
					var strokeJoin = style.getStrokeJoin(),
						strokeCap = style.getStrokeCap(),
						miterLimit = style.getMiterLimit();
					if (strokeJoin)
						ctx.lineJoin = strokeJoin;
					if (strokeCap)
						ctx.lineCap = strokeCap;
					if (miterLimit)
						ctx.miterLimit = miterLimit;
					if (paper.support.nativeDash) {
						var dashArray = style.getDashArray(),
							dashOffset = style.getDashOffset();
						if (dashArray && dashArray.length) {
							if ('setLineDash' in ctx) {
								ctx.setLineDash(dashArray);
								ctx.lineDashOffset = dashOffset;
							} else {
								ctx.mozDash = dashArray;
								ctx.mozDashOffset = dashOffset;
							}
						}
					}
				}
			}
			if (shadowColor) {
				var shadowBlur = style.getShadowBlur();
				if (shadowBlur > 0) {
					ctx.shadowColor = shadowColor.toCanvasStyle(ctx);
					ctx.shadowBlur = shadowBlur;
					var offset = this.getShadowOffset();
					ctx.shadowOffsetX = offset.x;
					ctx.shadowOffsetY = offset.y;
				}
			}
		},
	
		draw: function(ctx, param, parentStrokeMatrix) {
			var updateVersion = this._updateVersion = this._project._updateVersion;
			if (!this._visible || this._opacity === 0)
				return;
			var matrices = param.matrices,
				viewMatrix = param.viewMatrix,
				matrix = this._matrix,
				globalMatrix = matrices[matrices.length - 1].chain(matrix);
			if (!globalMatrix.isInvertible())
				return;
	
			function getViewMatrix(matrix) {
				return viewMatrix ? viewMatrix.chain(matrix) : matrix;
			}
	
			matrices.push(globalMatrix);
			if (param.updateMatrix) {
				globalMatrix._updateVersion = updateVersion;
				this._globalMatrix = globalMatrix;
			}
	
			var blendMode = this._blendMode,
				opacity = this._opacity,
				normalBlend = blendMode === 'normal',
				nativeBlend = BlendMode.nativeModes[blendMode],
				direct = normalBlend && opacity === 1
						|| param.dontStart
						|| param.clip
						|| (nativeBlend || normalBlend && opacity < 1)
							&& this._canComposite(),
				pixelRatio = param.pixelRatio || 1,
				mainCtx, itemOffset, prevOffset;
			if (!direct) {
				var bounds = this.getStrokeBounds(getViewMatrix(globalMatrix));
				if (!bounds.width || !bounds.height)
					return;
				prevOffset = param.offset;
				itemOffset = param.offset = bounds.getTopLeft().floor();
				mainCtx = ctx;
				ctx = CanvasProvider.getContext(bounds.getSize().ceil().add(1)
						.multiply(pixelRatio));
				if (pixelRatio !== 1)
					ctx.scale(pixelRatio, pixelRatio);
			}
			ctx.save();
			var strokeMatrix = parentStrokeMatrix
					? parentStrokeMatrix.chain(matrix)
					: !this.getStrokeScaling(true) && getViewMatrix(globalMatrix),
				clip = !direct && param.clipItem,
				transform = !strokeMatrix || clip;
			if (direct) {
				ctx.globalAlpha = opacity;
				if (nativeBlend)
					ctx.globalCompositeOperation = blendMode;
			} else if (transform) {
				ctx.translate(-itemOffset.x, -itemOffset.y);
			}
			if (transform)
				(direct ? matrix : getViewMatrix(globalMatrix)).applyToContext(ctx);
			if (clip)
				param.clipItem.draw(ctx, param.extend({ clip: true }));
			if (strokeMatrix) {
				ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
				var offset = param.offset;
				if (offset)
					ctx.translate(-offset.x, -offset.y);
			}
			this._draw(ctx, param, strokeMatrix);
			ctx.restore();
			matrices.pop();
			if (param.clip && !param.dontFinish)
				ctx.clip();
			if (!direct) {
				BlendMode.process(blendMode, ctx, mainCtx, opacity,
						itemOffset.subtract(prevOffset).multiply(pixelRatio));
				CanvasProvider.release(ctx);
				param.offset = prevOffset;
			}
		},
	
		_isUpdated: function(updateVersion) {
			var parent = this._parent;
			if (parent instanceof CompoundPath)
				return parent._isUpdated(updateVersion);
			var updated = this._updateVersion === updateVersion;
			if (!updated && parent && parent._visible
					&& parent._isUpdated(updateVersion)) {
				this._updateVersion = updateVersion;
				updated = true;
			}
			return updated;
		},
	
		_drawSelection: function(ctx, matrix, size, selectedItems, updateVersion) {
			if ((this._drawSelected || this._boundsSelected)
					&& this._isUpdated(updateVersion)) {
				var color = this.getSelectedColor(true)
						|| this.getLayer().getSelectedColor(true),
					mx = matrix.chain(this.getGlobalMatrix(true));
				ctx.strokeStyle = ctx.fillStyle = color
						? color.toCanvasStyle(ctx) : '#009dec';
				if (this._drawSelected)
					this._drawSelected(ctx, mx, selectedItems);
				if (this._boundsSelected) {
					var half = size / 2,
						coords = mx._transformCorners(this.getInternalBounds());
					ctx.beginPath();
					for (var i = 0; i < 8; i++)
						ctx[i === 0 ? 'moveTo' : 'lineTo'](coords[i], coords[++i]);
					ctx.closePath();
					ctx.stroke();
					for (var i = 0; i < 8; i++)
						ctx.fillRect(coords[i] - half, coords[++i] - half,
								size, size);
				}
			}
		},
	
		_canComposite: function() {
			return false;
		}
	}, Base.each(['down', 'drag', 'up', 'move'], function(name) {
		this['removeOn' + Base.capitalize(name)] = function() {
			var hash = {};
			hash[name] = true;
			return this.removeOn(hash);
		};
	}, {
	
		removeOn: function(obj) {
			for (var name in obj) {
				if (obj[name]) {
					var key = 'mouse' + name,
						project = this._project,
						sets = project._removeSets = project._removeSets || {};
					sets[key] = sets[key] || {};
					sets[key][this._id] = this;
				}
			}
			return this;
		}
	}));
	
	var Group = Item.extend({
		_class: 'Group',
		_selectChildren: true,
		_serializeFields: {
			children: []
		},
	
		initialize: function Group(arg) {
			this._children = [];
			this._namedChildren = {};
			if (!this._initialize(arg))
				this.addChildren(Array.isArray(arg) ? arg : arguments);
		},
	
		_changed: function _changed(flags) {
			_changed.base.call(this, flags);
			if (flags & 1026) {
				this._clipItem = undefined;
			}
		},
	
		_getClipItem: function() {
			var clipItem = this._clipItem;
			if (clipItem === undefined) {
				clipItem = null;
				for (var i = 0, l = this._children.length; i < l; i++) {
					var child = this._children[i];
					if (child._clipMask) {
						clipItem = child;
						break;
					}
				}
				this._clipItem = clipItem;
			}
			return clipItem;
		},
	
		isClipped: function() {
			return !!this._getClipItem();
		},
	
		setClipped: function(clipped) {
			var child = this.getFirstChild();
			if (child)
				child.setClipMask(clipped);
		},
	
		_draw: function(ctx, param) {
			var clip = param.clip,
				clipItem = !clip && this._getClipItem(),
				draw = true;
			param = param.extend({ clipItem: clipItem, clip: false });
			if (clip) {
				if (this._currentPath) {
					ctx.currentPath = this._currentPath;
					draw = false;
				} else {
					ctx.beginPath();
					param.dontStart = param.dontFinish = true;
				}
			} else if (clipItem) {
				clipItem.draw(ctx, param.extend({ clip: true }));
			}
			if (draw) {
				for (var i = 0, l = this._children.length; i < l; i++) {
					var item = this._children[i];
					if (item !== clipItem)
						item.draw(ctx, param);
				}
			}
			if (clip) {
				this._currentPath = ctx.currentPath;
			}
		}
	});
	
	var Layer = Group.extend({
		_class: 'Layer',
	
		initialize: function Layer(arg) {
			var props = Base.isPlainObject(arg)
					? new Base(arg)
					: { children: Array.isArray(arg) ? arg : arguments },
				insert = props.insert;
			props.insert = false;
			Group.call(this, props);
			if (insert || insert === undefined) {
				this._project.addChild(this);
				this.activate();
			}
		},
	
		_remove: function _remove(notifySelf, notifyParent) {
			if (this._parent)
				return _remove.base.call(this, notifySelf, notifyParent);
			if (this._index != null) {
				var project = this._project;
				if (project._activeLayer === this)
					project._activeLayer = this.getNextSibling()
							|| this.getPreviousSibling();
				Base.splice(project.layers, null, this._index, 1);
				this._installEvents(false);
				if (notifySelf && project._changes)
					this._changed(5);
				if (notifyParent) {
					project._needsUpdate = true;
				}
				return true;
			}
			return false;
		},
	
		getNextSibling: function getNextSibling() {
			return this._parent ? getNextSibling.base.call(this)
					: this._project.layers[this._index + 1] || null;
		},
	
		getPreviousSibling: function getPreviousSibling() {
			return this._parent ? getPreviousSibling.base.call(this)
					: this._project.layers[this._index - 1] || null;
		},
	
		isInserted: function isInserted() {
			return this._parent ? isInserted.base.call(this) : this._index != null;
		},
	
		activate: function() {
			this._project._activeLayer = this;
		},
	
		_insertSibling: function _insertSibling(index, item, _preserve) {
			return !this._parent
					? this._project.insertChild(index, item, _preserve)
					: _insertSibling.base.call(this, index, item, _preserve);
		}
	});
	
	var Shape = Item.extend({
		_class: 'Shape',
		_applyMatrix: false,
		_canApplyMatrix: false,
		_boundsSelected: true,
		_serializeFields: {
			type: null,
			size: null,
			radius: null
		},
	
		initialize: function Shape(props) {
			this._initialize(props);
		},
	
		_equals: function(item) {
			return this._type === item._type
				&& this._size.equals(item._size)
				&& Base.equals(this._radius, item._radius);
		},
	
		clone: function(insert) {
			var copy = new Shape(Item.NO_INSERT);
			copy.setType(this._type);
			copy.setSize(this._size);
			copy.setRadius(this._radius);
			return this._clone(copy, insert);
		},
	
		getType: function() {
			return this._type;
		},
	
		setType: function(type) {
			this._type = type;
		},
	
		getShape: '#getType',
		setShape: '#setType',
	
		getSize: function() {
			var size = this._size;
			return new LinkedSize(size.width, size.height, this, 'setSize');
		},
	
		setSize: function() {
			var size = Size.read(arguments);
			if (!this._size) {
				this._size = size.clone();
			} else if (!this._size.equals(size)) {
				var type = this._type,
					width = size.width,
					height = size.height;
				if (type === 'rectangle') {
					var radius = Size.min(this._radius, size.divide(2));
					this._radius.set(radius.width, radius.height);
				} else if (type === 'circle') {
					width = height = (width + height) / 2;
					this._radius = width / 2;
				} else if (type === 'ellipse') {
					this._radius.set(width / 2, height / 2);
				}
				this._size.set(width, height);
				this._changed(9);
			}
		},
	
		getRadius: function() {
			var rad = this._radius;
			return this._type === 'circle'
					? rad
					: new LinkedSize(rad.width, rad.height, this, 'setRadius');
		},
	
		setRadius: function(radius) {
			var type = this._type;
			if (type === 'circle') {
				if (radius === this._radius)
					return;
				var size = radius * 2;
				this._radius = radius;
				this._size.set(size, size);
			} else {
				radius = Size.read(arguments);
				if (!this._radius) {
					this._radius = radius.clone();
				} else {
					if (this._radius.equals(radius))
						return;
					this._radius.set(radius.width, radius.height);
					if (type === 'rectangle') {
						var size = Size.max(this._size, radius.multiply(2));
						this._size.set(size.width, size.height);
					} else if (type === 'ellipse') {
						this._size.set(radius.width * 2, radius.height * 2);
					}
				}
			}
			this._changed(9);
		},
	
		isEmpty: function() {
			return false;
		},
	
		toPath: function(insert) {
			var path = this._clone(new Path[Base.capitalize(this._type)]({
				center: new Point(),
				size: this._size,
				radius: this._radius,
				insert: false
			}), insert);
			if (paper.settings.applyMatrix)
				path.setApplyMatrix(true);
			return path;
		},
	
		_draw: function(ctx, param, strokeMatrix) {
			var style = this._style,
				hasFill = style.hasFill(),
				hasStroke = style.hasStroke(),
				dontPaint = param.dontFinish || param.clip,
				untransformed = !strokeMatrix;
			if (hasFill || hasStroke || dontPaint) {
				var type = this._type,
					radius = this._radius,
					isCircle = type === 'circle';
				if (!param.dontStart)
					ctx.beginPath();
				if (untransformed && isCircle) {
					ctx.arc(0, 0, radius, 0, Math.PI * 2, true);
				} else {
					var rx = isCircle ? radius : radius.width,
						ry = isCircle ? radius : radius.height,
						size = this._size,
						width = size.width,
						height = size.height;
					if (untransformed && type === 'rectangle' && rx === 0 && ry === 0) {
						ctx.rect(-width / 2, -height / 2, width, height);
					} else {
						var x = width / 2,
							y = height / 2,
							kappa = 1 - 0.5522847498307936,
							cx = rx * kappa,
							cy = ry * kappa,
							c = [
								-x, -y + ry,
								-x, -y + cy,
								-x + cx, -y,
								-x + rx, -y,
								x - rx, -y,
								x - cx, -y,
								x, -y + cy,
								x, -y + ry,
								x, y - ry,
								x, y - cy,
								x - cx, y,
								x - rx, y,
								-x + rx, y,
								-x + cx, y,
								-x, y - cy,
								-x, y - ry
							];
						if (strokeMatrix)
							strokeMatrix.transform(c, c, 32);
						ctx.moveTo(c[0], c[1]);
						ctx.bezierCurveTo(c[2], c[3], c[4], c[5], c[6], c[7]);
						if (x !== rx)
							ctx.lineTo(c[8], c[9]);
						ctx.bezierCurveTo(c[10], c[11], c[12], c[13], c[14], c[15]);
						if (y !== ry)
							ctx.lineTo(c[16], c[17]);
						ctx.bezierCurveTo(c[18], c[19], c[20], c[21], c[22], c[23]);
						if (x !== rx)
							ctx.lineTo(c[24], c[25]);
						ctx.bezierCurveTo(c[26], c[27], c[28], c[29], c[30], c[31]);
					}
				}
				ctx.closePath();
			}
			if (!dontPaint && (hasFill || hasStroke)) {
				this._setStyles(ctx);
				if (hasFill) {
					ctx.fill(style.getWindingRule());
					ctx.shadowColor = 'rgba(0,0,0,0)';
				}
				if (hasStroke)
					ctx.stroke();
			}
		},
	
		_canComposite: function() {
			return !(this.hasFill() && this.hasStroke());
		},
	
		_getBounds: function(getter, matrix) {
			var rect = new Rectangle(this._size).setCenter(0, 0);
			if (getter !== 'getBounds' && this.hasStroke())
				rect = rect.expand(this.getStrokeWidth());
			return matrix ? matrix._transformBounds(rect) : rect;
		}
	},
	new function() {
		function getCornerCenter(that, point, expand) {
			var radius = that._radius;
			if (!radius.isZero()) {
				var halfSize = that._size.divide(2);
				for (var i = 0; i < 4; i++) {
					var dir = new Point(i & 1 ? 1 : -1, i > 1 ? 1 : -1),
						corner = dir.multiply(halfSize),
						center = corner.subtract(dir.multiply(radius)),
						rect = new Rectangle(corner, center);
					if ((expand ? rect.expand(expand) : rect).contains(point))
						return center;
				}
			}
		}
	
		function getEllipseRadius(point, radius) {
			var angle = point.getAngleInRadians(),
				width = radius.width * 2,
				height = radius.height * 2,
				x = width * Math.sin(angle),
				y = height * Math.cos(angle);
			return width * height / (2 * Math.sqrt(x * x + y * y));
		}
	
		return {
			_contains: function _contains(point) {
				if (this._type === 'rectangle') {
					var center = getCornerCenter(this, point);
					return center
							? point.subtract(center).divide(this._radius)
								.getLength() <= 1
							: _contains.base.call(this, point);
				} else {
					return point.divide(this.size).getLength() <= 0.5;
				}
			},
	
			_hitTestSelf: function _hitTestSelf(point, options) {
				var hit = false;
				if (this.hasStroke()) {
					var type = this._type,
						radius = this._radius,
						strokeWidth = this.getStrokeWidth() + 2 * options.tolerance;
					if (type === 'rectangle') {
						var center = getCornerCenter(this, point, strokeWidth);
						if (center) {
							var pt = point.subtract(center);
							hit = 2 * Math.abs(pt.getLength()
									- getEllipseRadius(pt, radius)) <= strokeWidth;
						} else {
							var rect = new Rectangle(this._size).setCenter(0, 0),
								outer = rect.expand(strokeWidth),
								inner = rect.expand(-strokeWidth);
							hit = outer._containsPoint(point)
									&& !inner._containsPoint(point);
						}
					} else {
						if (type === 'ellipse')
							radius = getEllipseRadius(point, radius);
						hit = 2 * Math.abs(point.getLength() - radius)
								<= strokeWidth;
					}
				}
				return hit
						? new HitResult('stroke', this)
						: _hitTestSelf.base.apply(this, arguments);
			}
		};
	}, {
	
	statics: new function() {
		function createShape(type, point, size, radius, args) {
			var item = new Shape(Base.getNamed(args));
			item._type = type;
			item._size = size;
			item._radius = radius;
			return item.translate(point);
		}
	
		return {
			Circle: function() {
				var center = Point.readNamed(arguments, 'center'),
					radius = Base.readNamed(arguments, 'radius');
				return createShape('circle', center, new Size(radius * 2), radius,
						arguments);
			},
	
			Rectangle: function() {
				var rect = Rectangle.readNamed(arguments, 'rectangle'),
					radius = Size.min(Size.readNamed(arguments, 'radius'),
							rect.getSize(true).divide(2));
				return createShape('rectangle', rect.getCenter(true),
						rect.getSize(true), radius, arguments);
			},
	
			Ellipse: function() {
				var ellipse = Shape._readEllipse(arguments),
					radius = ellipse.radius;
				return createShape('ellipse', ellipse.center, radius.multiply(2),
						radius, arguments);
			},
	
			_readEllipse: function(args) {
				var center,
					radius;
				if (Base.hasNamed(args, 'radius')) {
					center = Point.readNamed(args, 'center');
					radius = Size.readNamed(args, 'radius');
				} else {
					var rect = Rectangle.readNamed(args, 'rectangle');
					center = rect.getCenter(true);
					radius = rect.getSize(true).divide(2);
				}
				return { center: center, radius: radius };
			}
		};
	}});
	
	var Raster = Item.extend({
		_class: 'Raster',
		_applyMatrix: false,
		_canApplyMatrix: false,
		_boundsGetter: 'getBounds',
		_boundsSelected: true,
		_serializeFields: {
			crossOrigin: null,
			source: null
		},
	
		initialize: function Raster(object, position) {
			if (!this._initialize(object,
					position !== undefined && Point.read(arguments, 1))) {
				if (typeof object === 'string') {
					this.setSource(object);
				} else {
					this.setImage(object);
				}
			}
			if (!this._size) {
				this._size = new Size();
				this._loaded = false;
			}
		},
	
		_equals: function(item) {
			return this.getSource() === item.getSource();
		},
	
		clone: function(insert) {
			var copy = new Raster(Item.NO_INSERT),
				image = this._image,
				canvas = this._canvas;
			if (image) {
				copy.setImage(image);
			} else if (canvas) {
				var copyCanvas = CanvasProvider.getCanvas(this._size);
				copyCanvas.getContext('2d').drawImage(canvas, 0, 0);
				copy.setImage(copyCanvas);
			}
			copy._crossOrigin = this._crossOrigin;
			return this._clone(copy, insert);
		},
	
		getSize: function() {
			var size = this._size;
			return new LinkedSize(size ? size.width : 0, size ? size.height : 0,
					this, 'setSize');
		},
	
		setSize: function() {
			var size = Size.read(arguments);
			if (!size.equals(this._size)) {
				if (size.width > 0 && size.height > 0) {
					var element = this.getElement();
					this.setImage(CanvasProvider.getCanvas(size));
					if (element)
						this.getContext(true).drawImage(element, 0, 0,
								size.width, size.height);
				} else {
					if (this._canvas)
						CanvasProvider.release(this._canvas);
					this._size = size.clone();
				}
			}
		},
	
		getWidth: function() {
			return this._size ? this._size.width : 0;
		},
	
		setWidth: function(width) {
			this.setSize(width, this.getHeight());
		},
	
		getHeight: function() {
			return this._size ? this._size.height : 0;
		},
	
		setHeight: function(height) {
			this.setSize(this.getWidth(), height);
		},
	
		isEmpty: function() {
			var size = this._size;
			return !size || size.width === 0 && size.height === 0;
		},
	
		getResolution: function() {
			var matrix = this._matrix,
				orig = new Point(0, 0).transform(matrix),
				u = new Point(1, 0).transform(matrix).subtract(orig),
				v = new Point(0, 1).transform(matrix).subtract(orig);
			return new Size(
				72 / u.getLength(),
				72 / v.getLength()
			);
		},
	
		getPpi: '#getResolution',
	
		getImage: function() {
			return this._image;
		},
	
		setImage: function(image) {
			if (this._canvas)
				CanvasProvider.release(this._canvas);
			if (image && image.getContext) {
				this._image = null;
				this._canvas = image;
				this._loaded = true;
			} else {
				this._image = image;
				this._canvas = null;
				this._loaded = image && image.complete;
			}
			this._size = new Size(
					image ? image.naturalWidth || image.width : 0,
					image ? image.naturalHeight || image.height : 0);
			this._context = null;
			this._changed(521);
		},
	
		getCanvas: function() {
			if (!this._canvas) {
				var ctx = CanvasProvider.getContext(this._size);
				try {
					if (this._image)
						ctx.drawImage(this._image, 0, 0);
					this._canvas = ctx.canvas;
				} catch (e) {
					CanvasProvider.release(ctx);
				}
			}
			return this._canvas;
		},
	
		setCanvas: '#setImage',
	
		getContext: function(modify) {
			if (!this._context)
				this._context = this.getCanvas().getContext('2d');
			if (modify) {
				this._image = null;
				this._changed(513);
			}
			return this._context;
		},
	
		setContext: function(context) {
			this._context = context;
		},
	
		getSource: function() {
			return this._image && this._image.src || this.toDataURL();
		},
	
		setSource: function(src) {
			var that = this,
				crossOrigin = this._crossOrigin,
				image;
	
			function loaded() {
				var view = that.getView();
				if (view) {
					paper = view._scope;
					that.setImage(image);
					that.emit('load');
					view.update();
				}
			}
	
			image = document.getElementById(src) || new Image();
			if (crossOrigin)
				image.crossOrigin = crossOrigin;
			if (image.naturalWidth && image.naturalHeight) {
				setTimeout(loaded, 0);
			} else {
				DomEvent.add(image, { load: loaded });
				if (!image.src)
					image.src = src;
			}
			this.setImage(image);
		},
	
		getCrossOrigin: function() {
			return this._image && this._image.crossOrigin || this._crossOrigin || '';
		},
	
		setCrossOrigin: function(crossOrigin) {
			this._crossOrigin = crossOrigin;
			if (this._image)
				this._image.crossOrigin = crossOrigin;
		},
	
		getElement: function() {
			return this._canvas || this._loaded && this._image;
		}
	}, {
		beans: false,
	
		getSubCanvas: function() {
			var rect = Rectangle.read(arguments),
				ctx = CanvasProvider.getContext(rect.getSize());
			ctx.drawImage(this.getCanvas(), rect.x, rect.y,
					rect.width, rect.height, 0, 0, rect.width, rect.height);
			return ctx.canvas;
		},
	
		getSubRaster: function() {
			var rect = Rectangle.read(arguments),
				raster = new Raster(Item.NO_INSERT);
			raster.setImage(this.getSubCanvas(rect));
			raster.translate(rect.getCenter().subtract(this.getSize().divide(2)));
			raster._matrix.preConcatenate(this._matrix);
			raster.insertAbove(this);
			return raster;
		},
	
		toDataURL: function() {
			var src = this._image && this._image.src;
			if (/^data:/.test(src))
				return src;
			var canvas = this.getCanvas();
			return canvas ? canvas.toDataURL.apply(canvas, arguments) : null;
		},
	
		drawImage: function(image ) {
			var point = Point.read(arguments, 1);
			this.getContext(true).drawImage(image, point.x, point.y);
		},
	
		getAverageColor: function(object) {
			var bounds, path;
			if (!object) {
				bounds = this.getBounds();
			} else if (object instanceof PathItem) {
				path = object;
				bounds = object.getBounds();
			} else if (object.width) {
				bounds = new Rectangle(object);
			} else if (object.x) {
				bounds = new Rectangle(object.x - 0.5, object.y - 0.5, 1, 1);
			}
			var sampleSize = 32,
				width = Math.min(bounds.width, sampleSize),
				height = Math.min(bounds.height, sampleSize);
			var ctx = Raster._sampleContext;
			if (!ctx) {
				ctx = Raster._sampleContext = CanvasProvider.getContext(
						new Size(sampleSize));
			} else {
				ctx.clearRect(0, 0, sampleSize + 1, sampleSize + 1);
			}
			ctx.save();
			var matrix = new Matrix()
					.scale(width / bounds.width, height / bounds.height)
					.translate(-bounds.x, -bounds.y);
			matrix.applyToContext(ctx);
			if (path)
				path.draw(ctx, new Base({ clip: true, matrices: [matrix] }));
			this._matrix.applyToContext(ctx);
			var element = this.getElement(),
				size = this._size;
			if (element)
				ctx.drawImage(element, -size.width / 2, -size.height / 2);
			ctx.restore();
			var pixels = ctx.getImageData(0.5, 0.5, Math.ceil(width),
					Math.ceil(height)).data,
				channels = [0, 0, 0],
				total = 0;
			for (var i = 0, l = pixels.length; i < l; i += 4) {
				var alpha = pixels[i + 3];
				total += alpha;
				alpha /= 255;
				channels[0] += pixels[i] * alpha;
				channels[1] += pixels[i + 1] * alpha;
				channels[2] += pixels[i + 2] * alpha;
			}
			for (var i = 0; i < 3; i++)
				channels[i] /= total;
			return total ? Color.read(channels) : null;
		},
	
		getPixel: function() {
			var point = Point.read(arguments);
			var data = this.getContext().getImageData(point.x, point.y, 1, 1).data;
			return new Color('rgb', [data[0] / 255, data[1] / 255, data[2] / 255],
					data[3] / 255);
		},
	
		setPixel: function() {
			var point = Point.read(arguments),
				color = Color.read(arguments),
				components = color._convert('rgb'),
				alpha = color._alpha,
				ctx = this.getContext(true),
				imageData = ctx.createImageData(1, 1),
				data = imageData.data;
			data[0] = components[0] * 255;
			data[1] = components[1] * 255;
			data[2] = components[2] * 255;
			data[3] = alpha != null ? alpha * 255 : 255;
			ctx.putImageData(imageData, point.x, point.y);
		},
	
		createImageData: function() {
			var size = Size.read(arguments);
			return this.getContext().createImageData(size.width, size.height);
		},
	
		getImageData: function() {
			var rect = Rectangle.read(arguments);
			if (rect.isEmpty())
				rect = new Rectangle(this._size);
			return this.getContext().getImageData(rect.x, rect.y,
					rect.width, rect.height);
		},
	
		setImageData: function(data ) {
			var point = Point.read(arguments, 1);
			this.getContext(true).putImageData(data, point.x, point.y);
		},
	
		_getBounds: function(getter, matrix) {
			var rect = new Rectangle(this._size).setCenter(0, 0);
			return matrix ? matrix._transformBounds(rect) : rect;
		},
	
		_hitTestSelf: function(point) {
			if (this._contains(point)) {
				var that = this;
				return new HitResult('pixel', that, {
					offset: point.add(that._size.divide(2)).round(),
					color: {
						get: function() {
							return that.getPixel(this.offset);
						}
					}
				});
			}
		},
	
		_draw: function(ctx) {
			var element = this.getElement();
			if (element) {
				ctx.globalAlpha = this._opacity;
				ctx.drawImage(element,
						-this._size.width / 2, -this._size.height / 2);
			}
		},
	
		_canComposite: function() {
			return true;
		}
	});
	
	var PlacedSymbol = Item.extend({
		_class: 'PlacedSymbol',
		_applyMatrix: false,
		_canApplyMatrix: false,
		_boundsGetter: { getBounds: 'getStrokeBounds' },
		_boundsSelected: true,
		_serializeFields: {
			symbol: null
		},
	
		initialize: function PlacedSymbol(arg0, arg1) {
			if (!this._initialize(arg0,
					arg1 !== undefined && Point.read(arguments, 1)))
				this.setSymbol(arg0 instanceof Symbol ? arg0 : new Symbol(arg0));
		},
	
		_equals: function(item) {
			return this._symbol === item._symbol;
		},
	
		getSymbol: function() {
			return this._symbol;
		},
	
		setSymbol: function(symbol) {
			this._symbol = symbol;
			this._changed(9);
		},
	
		clone: function(insert) {
			var copy = new PlacedSymbol(Item.NO_INSERT);
			copy.setSymbol(this._symbol);
			return this._clone(copy, insert);
		},
	
		isEmpty: function() {
			return this._symbol._definition.isEmpty();
		},
	
		_getBounds: function(getter, matrix, cacheItem) {
			var definition = this.symbol._definition;
			return definition._getCachedBounds(getter,
					matrix && matrix.chain(definition._matrix), cacheItem);
		},
	
		_hitTestSelf: function(point, options) {
			var res = this._symbol._definition._hitTest(point, options);
			if (res)
				res.item = this;
			return res;
		},
	
		_draw: function(ctx, param) {
			this.symbol._definition.draw(ctx, param);
		}
	
	});
	
	var HitResult = Base.extend({
		_class: 'HitResult',
	
		initialize: function HitResult(type, item, values) {
			this.type = type;
			this.item = item;
			if (values) {
				values.enumerable = true;
				this.inject(values);
			}
		},
	
		statics: {
			getOptions: function(options) {
				return new Base({
					type: null,
					tolerance: paper.settings.hitTolerance,
					fill: !options,
					stroke: !options,
					segments: !options,
					handles: false,
					ends: false,
					center: false,
					bounds: false,
					guides: false,
					selected: false
				}, options);
			}
		}
	});
	
	var Segment = Base.extend({
		_class: 'Segment',
		beans: true,
	
		initialize: function Segment(arg0, arg1, arg2, arg3, arg4, arg5) {
			var count = arguments.length,
				point, handleIn, handleOut;
			if (count === 0) {
			} else if (count === 1) {
				if ('point' in arg0) {
					point = arg0.point;
					handleIn = arg0.handleIn;
					handleOut = arg0.handleOut;
				} else {
					point = arg0;
				}
			} else if (count === 2 && typeof arg0 === 'number') {
				point = arguments;
			} else if (count <= 3) {
				point = arg0;
				handleIn = arg1;
				handleOut = arg2;
			} else {
				point = arg0 !== undefined ? [ arg0, arg1 ] : null;
				handleIn = arg2 !== undefined ? [ arg2, arg3 ] : null;
				handleOut = arg4 !== undefined ? [ arg4, arg5 ] : null;
			}
			new SegmentPoint(point, this, '_point');
			new SegmentPoint(handleIn, this, '_handleIn');
			new SegmentPoint(handleOut, this, '_handleOut');
		},
	
		_serialize: function(options) {
			return Base.serialize(this.hasHandles()
					? [this._point, this._handleIn, this._handleOut]
					: this._point,
					options, true);
		},
	
		_changed: function(point) {
			var path = this._path;
			if (!path)
				return;
			var curves = path._curves,
				index = this._index,
				curve;
			if (curves) {
				if ((!point || point === this._point || point === this._handleIn)
						&& (curve = index > 0 ? curves[index - 1] : path._closed
							? curves[curves.length - 1] : null))
					curve._changed();
				if ((!point || point === this._point || point === this._handleOut)
						&& (curve = curves[index]))
					curve._changed();
			}
			path._changed(25);
		},
	
		getPoint: function() {
			return this._point;
		},
	
		setPoint: function() {
			var point = Point.read(arguments);
			this._point.set(point.x, point.y);
		},
	
		getHandleIn: function() {
			return this._handleIn;
		},
	
		setHandleIn: function() {
			var point = Point.read(arguments);
			this._handleIn.set(point.x, point.y);
		},
	
		getHandleOut: function() {
			return this._handleOut;
		},
	
		setHandleOut: function() {
			var point = Point.read(arguments);
			this._handleOut.set(point.x, point.y);
		},
	
		hasHandles: function() {
			return !this._handleIn.isZero() || !this._handleOut.isZero();
		},
	
		clearHandles: function() {
			this._handleIn.set(0, 0);
			this._handleOut.set(0, 0);
		},
	
		_selectionState: 0,
	
		isSelected: function(_point) {
			var state = this._selectionState;
			return !_point ? !!(state & 7)
				: _point === this._point ? !!(state & 4)
				: _point === this._handleIn ? !!(state & 1)
				: _point === this._handleOut ? !!(state & 2)
				: false;
		},
	
		setSelected: function(selected, _point) {
			var path = this._path,
				selected = !!selected,
				state = this._selectionState,
				oldState = state,
				flag = !_point ? 7
						: _point === this._point ? 4
						: _point === this._handleIn ? 1
						: _point === this._handleOut ? 2
						: 0;
			if (selected) {
				state |= flag;
			} else {
				state &= ~flag;
			}
			this._selectionState = state;
			if (path && state !== oldState) {
				path._updateSelection(this, oldState, state);
				path._changed(129);
			}
		},
	
		getIndex: function() {
			return this._index !== undefined ? this._index : null;
		},
	
		getPath: function() {
			return this._path || null;
		},
	
		getCurve: function() {
			var path = this._path,
				index = this._index;
			if (path) {
				if (index > 0 && !path._closed
						&& index === path._segments.length - 1)
					index--;
				return path.getCurves()[index] || null;
			}
			return null;
		},
	
		getLocation: function() {
			var curve = this.getCurve();
			return curve
					? new CurveLocation(curve, this === curve._segment1 ? 0 : 1)
					: null;
		},
	
		getNext: function() {
			var segments = this._path && this._path._segments;
			return segments && (segments[this._index + 1]
					|| this._path._closed && segments[0]) || null;
		},
	
		getPrevious: function() {
			var segments = this._path && this._path._segments;
			return segments && (segments[this._index - 1]
					|| this._path._closed && segments[segments.length - 1]) || null;
		},
	
		isFirst: function() {
			return this._index === 0;
		},
	
		isLast: function() {
			var path = this._path;
			return path && this._index === path._segments.length - 1 || false;
		},
	
		reverse: function() {
			var handleIn = this._handleIn,
				handleOut = this._handleOut,
				inX = handleIn._x,
				inY = handleIn._y;
			handleIn.set(handleOut._x, handleOut._y);
			handleOut.set(inX, inY);
		},
	
		reversed: function() {
			return new Segment(this._point, this._handleOut, this._handleIn);
		},
	
		remove: function() {
			return this._path ? !!this._path.removeSegment(this._index) : false;
		},
	
		clone: function() {
			return new Segment(this._point, this._handleIn, this._handleOut);
		},
	
		equals: function(segment) {
			return segment === this || segment && this._class === segment._class
					&& this._point.equals(segment._point)
					&& this._handleIn.equals(segment._handleIn)
					&& this._handleOut.equals(segment._handleOut)
					|| false;
		},
	
		toString: function() {
			var parts = [ 'point: ' + this._point ];
			if (!this._handleIn.isZero())
				parts.push('handleIn: ' + this._handleIn);
			if (!this._handleOut.isZero())
				parts.push('handleOut: ' + this._handleOut);
			return '{ ' + parts.join(', ') + ' }';
		},
	
		transform: function(matrix) {
			this._transformCoordinates(matrix, new Array(6), true);
			this._changed();
		},
	
		_transformCoordinates: function(matrix, coords, change) {
			var point = this._point,
				handleIn = !change || !this._handleIn.isZero()
						? this._handleIn : null,
				handleOut = !change || !this._handleOut.isZero()
						? this._handleOut : null,
				x = point._x,
				y = point._y,
				i = 2;
			coords[0] = x;
			coords[1] = y;
			if (handleIn) {
				coords[i++] = handleIn._x + x;
				coords[i++] = handleIn._y + y;
			}
			if (handleOut) {
				coords[i++] = handleOut._x + x;
				coords[i++] = handleOut._y + y;
			}
			if (matrix) {
				matrix._transformCoordinates(coords, coords, i / 2);
				x = coords[0];
				y = coords[1];
				if (change) {
					point._x = x;
					point._y = y;
					i  = 2;
					if (handleIn) {
						handleIn._x = coords[i++] - x;
						handleIn._y = coords[i++] - y;
					}
					if (handleOut) {
						handleOut._x = coords[i++] - x;
						handleOut._y = coords[i++] - y;
					}
				} else {
					if (!handleIn) {
						coords[i++] = x;
						coords[i++] = y;
					}
					if (!handleOut) {
						coords[i++] = x;
						coords[i++] = y;
					}
				}
			}
			return coords;
		}
	});
	
	var SegmentPoint = Point.extend({
		initialize: function SegmentPoint(point, owner, key) {
			var x, y, selected;
			if (!point) {
				x = y = 0;
			} else if ((x = point[0]) !== undefined) {
				y = point[1];
			} else {
				var pt = point;
				if ((x = pt.x) === undefined) {
					pt = Point.read(arguments);
					x = pt.x;
				}
				y = pt.y;
				selected = pt.selected;
			}
			this._x = x;
			this._y = y;
			this._owner = owner;
			owner[key] = this;
			if (selected)
				this.setSelected(true);
		},
	
		set: function(x, y) {
			this._x = x;
			this._y = y;
			this._owner._changed(this);
			return this;
		},
	
		_serialize: function(options) {
			var f = options.formatter,
				x = f.number(this._x),
				y = f.number(this._y);
			return this.isSelected()
					? { x: x, y: y, selected: true }
					: [x, y];
		},
	
		getX: function() {
			return this._x;
		},
	
		setX: function(x) {
			this._x = x;
			this._owner._changed(this);
		},
	
		getY: function() {
			return this._y;
		},
	
		setY: function(y) {
			this._y = y;
			this._owner._changed(this);
		},
	
		isZero: function() {
			return Numerical.isZero(this._x) && Numerical.isZero(this._y);
		},
	
		setSelected: function(selected) {
			this._owner.setSelected(selected, this);
		},
	
		isSelected: function() {
			return this._owner.isSelected(this);
		}
	});
	
	var Curve = Base.extend({
		_class: 'Curve',
	
		initialize: function Curve(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
			var count = arguments.length,
				seg1, seg2,
				point1, point2,
				handle1, handle2;
			if (count === 3) {
				this._path = arg0;
				seg1 = arg1;
				seg2 = arg2;
			} else if (count === 0) {
				seg1 = new Segment();
				seg2 = new Segment();
			} else if (count === 1) {
				if ('segment1' in arg0) {
					seg1 = new Segment(arg0.segment1);
					seg2 = new Segment(arg0.segment2);
				} else if ('point1' in arg0) {
					point1 = arg0.point1;
					handle1 = arg0.handle1;
					handle2 = arg0.handle2;
					point2 = arg0.point2;
				} else if (Array.isArray(arg0)) {
					point1 = [arg0[0], arg0[1]];
					point2 = [arg0[6], arg0[7]];
					handle1 = [arg0[2] - arg0[0], arg0[3] - arg0[1]];
					handle2 = [arg0[4] - arg0[6], arg0[5] - arg0[7]];
				}
			} else if (count === 2) {
				seg1 = new Segment(arg0);
				seg2 = new Segment(arg1);
			} else if (count === 4) {
				point1 = arg0;
				handle1 = arg1;
				handle2 = arg2;
				point2 = arg3;
			} else if (count === 8) {
				point1 = [arg0, arg1];
				point2 = [arg6, arg7];
				handle1 = [arg2 - arg0, arg3 - arg1];
				handle2 = [arg4 - arg6, arg5 - arg7];
			}
			this._segment1 = seg1 || new Segment(point1, null, handle1);
			this._segment2 = seg2 || new Segment(point2, handle2, null);
		},
	
		_serialize: function(options) {
			return Base.serialize(this.hasHandles()
					? [this.getPoint1(), this.getHandle1(), this.getHandle2(),
						this.getPoint2()]
					: [this.getPoint1(), this.getPoint2()],
					options, true);
		},
	
		_changed: function() {
			this._length = this._bounds = undefined;
		},
	
		clone: function() {
			return new Curve(this._segment1, this._segment2);
		},
	
		toString: function() {
			var parts = [ 'point1: ' + this._segment1._point ];
			if (!this._segment1._handleOut.isZero())
				parts.push('handle1: ' + this._segment1._handleOut);
			if (!this._segment2._handleIn.isZero())
				parts.push('handle2: ' + this._segment2._handleIn);
			parts.push('point2: ' + this._segment2._point);
			return '{ ' + parts.join(', ') + ' }';
		},
	
		remove: function() {
			var removed = false;
			if (this._path) {
				var segment2 = this._segment2,
					handleOut = segment2._handleOut;
				removed = segment2.remove();
				if (removed)
					this._segment1._handleOut.set(handleOut.x, handleOut.y);
			}
			return removed;
		},
	
		getPoint1: function() {
			return this._segment1._point;
		},
	
		setPoint1: function() {
			var point = Point.read(arguments);
			this._segment1._point.set(point.x, point.y);
		},
	
		getPoint2: function() {
			return this._segment2._point;
		},
	
		setPoint2: function() {
			var point = Point.read(arguments);
			this._segment2._point.set(point.x, point.y);
		},
	
		getHandle1: function() {
			return this._segment1._handleOut;
		},
	
		setHandle1: function() {
			var point = Point.read(arguments);
			this._segment1._handleOut.set(point.x, point.y);
		},
	
		getHandle2: function() {
			return this._segment2._handleIn;
		},
	
		setHandle2: function() {
			var point = Point.read(arguments);
			this._segment2._handleIn.set(point.x, point.y);
		},
	
		getSegment1: function() {
			return this._segment1;
		},
	
		getSegment2: function() {
			return this._segment2;
		},
	
		getPath: function() {
			return this._path;
		},
	
		getIndex: function() {
			return this._segment1._index;
		},
	
		getNext: function() {
			var curves = this._path && this._path._curves;
			return curves && (curves[this._segment1._index + 1]
					|| this._path._closed && curves[0]) || null;
		},
	
		getPrevious: function() {
			var curves = this._path && this._path._curves;
			return curves && (curves[this._segment1._index - 1]
					|| this._path._closed && curves[curves.length - 1]) || null;
		},
	
		isFirst: function() {
			return this._segment1._index === 0;
		},
	
		isLast: function() {
			var path = this._path;
			return path && this._segment1._index === path._curves.length - 1
					|| false;
		},
	
		isSelected: function() {
			return this.getPoint1().isSelected()
					&& this.getHandle2().isSelected()
					&& this.getHandle2().isSelected()
					&& this.getPoint2().isSelected();
		},
	
		setSelected: function(selected) {
			this.getPoint1().setSelected(selected);
			this.getHandle1().setSelected(selected);
			this.getHandle2().setSelected(selected);
			this.getPoint2().setSelected(selected);
		},
	
		getValues: function(matrix) {
			return Curve.getValues(this._segment1, this._segment2, matrix);
		},
	
		getPoints: function() {
			var coords = this.getValues(),
				points = [];
			for (var i = 0; i < 8; i += 2)
				points.push(new Point(coords[i], coords[i + 1]));
			return points;
		},
	
		getLength: function() {
			if (this._length == null)
				this._length = Curve.getLength(this.getValues(), 0, 1);
			return this._length;
		},
	
		getArea: function() {
			return Curve.getArea(this.getValues());
		},
	
		getLine: function() {
			return new Line(this._segment1._point, this._segment2._point);
		},
	
		getPart: function(from, to) {
			return new Curve(Curve.getPart(this.getValues(), from, to));
		},
	
		getPartLength: function(from, to) {
			return Curve.getLength(this.getValues(), from, to);
		},
	
		getIntersections: function(curve) {
			return Curve._getIntersections(this.getValues(),
					curve && curve !== this ? curve.getValues() : null,
					this, curve, [], {});
		},
	
		_getParameter: function(offset, isParameter) {
			return isParameter
					? offset
					: offset && offset.curve === this
						? offset.parameter
						: offset === undefined && isParameter === undefined
							? 0.5
							: this.getParameterAt(offset, 0);
		},
	
		divide: function(offset, isParameter, _setHandles) {
			var parameter = this._getParameter(offset, isParameter),
				tMin = 4e-7,
				tMax = 1 - tMin,
				res = null;
			if (parameter >= tMin && parameter <= tMax) {
				var parts = Curve.subdivide(this.getValues(), parameter),
					left = parts[0],
					right = parts[1],
					setHandles = _setHandles || this.hasHandles(),
					segment1 = this._segment1,
					segment2 = this._segment2,
					path = this._path;
				if (setHandles) {
					segment1._handleOut.set(left[2] - left[0],
							left[3] - left[1]);
					segment2._handleIn.set(right[4] - right[6],
							right[5] - right[7]);
				}
				var x = left[6], y = left[7],
					segment = new Segment(new Point(x, y),
							setHandles && new Point(left[4] - x, left[5] - y),
							setHandles && new Point(right[2] - x, right[3] - y));
				if (path) {
					path.insert(segment1._index + 1, segment);
					res = this.getNext();
				} else {
					this._segment2 = segment;
					res = new Curve(segment, segment2);
				}
			}
			return res;
		},
	
		split: function(offset, isParameter) {
			return this._path
				? this._path.split(this._segment1._index,
						this._getParameter(offset, isParameter))
				: null;
		},
	
		reversed: function() {
			return new Curve(this._segment2.reversed(), this._segment1.reversed());
		},
	
		clearHandles: function() {
			this._segment1._handleOut.set(0, 0);
			this._segment2._handleIn.set(0, 0);
		},
	
	statics: {
		getValues: function(segment1, segment2, matrix) {
			var p1 = segment1._point,
				h1 = segment1._handleOut,
				h2 = segment2._handleIn,
				p2 = segment2._point,
				values = [
					p1._x, p1._y,
					p1._x + h1._x, p1._y + h1._y,
					p2._x + h2._x, p2._y + h2._y,
					p2._x, p2._y
				];
			if (matrix)
				matrix._transformCoordinates(values, values, 4);
			return values;
		},
	
		subdivide: function(v, t) {
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7];
			if (t === undefined)
				t = 0.5;
			var u = 1 - t,
				p3x = u * p1x + t * c1x, p3y = u * p1y + t * c1y,
				p4x = u * c1x + t * c2x, p4y = u * c1y + t * c2y,
				p5x = u * c2x + t * p2x, p5y = u * c2y + t * p2y,
				p6x = u * p3x + t * p4x, p6y = u * p3y + t * p4y,
				p7x = u * p4x + t * p5x, p7y = u * p4y + t * p5y,
				p8x = u * p6x + t * p7x, p8y = u * p6y + t * p7y;
			return [
				[p1x, p1y, p3x, p3y, p6x, p6y, p8x, p8y],
				[p8x, p8y, p7x, p7y, p5x, p5y, p2x, p2y]
			];
		},
	
		solveCubic: function (v, coord, val, roots, min, max) {
			var p1 = v[coord],
				c1 = v[coord + 2],
				c2 = v[coord + 4],
				p2 = v[coord + 6],
				c = 3 * (c1 - p1),
				b = 3 * (c2 - c1) - c,
				a = p2 - p1 - c - b;
			return Numerical.solveCubic(a, b, c, p1 - val, roots, min, max);
		},
	
		getParameterOf: function(v, point) {
			var p1 = new Point(v[0], v[1]),
				p2 = new Point(v[6], v[7]),
				epsilon = 1e-12,
				t = point.isClose(p1, epsilon) ? 0
				  : point.isClose(p2, epsilon) ? 1
				  : null;
			if (t !== null)
				return t;
			var coords = [point.x, point.y],
				roots = [],
				geomEpsilon = 2e-7;
			for (var c = 0; c < 2; c++) {
				var count = Curve.solveCubic(v, c, coords[c], roots, 0, 1);
				for (var i = 0; i < count; i++) {
					t = roots[i];
					if (point.isClose(Curve.getPoint(v, t), geomEpsilon))
						return t;
				}
			}
			return point.isClose(p1, geomEpsilon) ? 0
				 : point.isClose(p2, geomEpsilon) ? 1
				 : null;
		},
	
		getNearestParameter: function(v, point) {
			if (Curve.isStraight(v)) {
				var p1x = v[0], p1y = v[1],
					p2x = v[6], p2y = v[7],
					vx = p2x - p1x, vy = p2y - p1y,
					det = vx * vx + vy * vy;
				if (det === 0)
					return 0;
				var u = ((point.x - p1x) * vx + (point.y - p1y) * vy) / det;
				return u < 1e-12 ? 0
					 : u > 0.999999999999 ? 1
					 : Curve.getParameterOf(v,
						new Point(p1x + u * vx, p1y + u * vy));
			}
	
			var count = 100,
				minDist = Infinity,
				minT = 0;
	
			function refine(t) {
				if (t >= 0 && t <= 1) {
					var dist = point.getDistance(Curve.getPoint(v, t), true);
					if (dist < minDist) {
						minDist = dist;
						minT = t;
						return true;
					}
				}
			}
	
			for (var i = 0; i <= count; i++)
				refine(i / count);
	
			var step = 1 / (count * 2);
			while (step > 4e-7) {
				if (!refine(minT - step) && !refine(minT + step))
					step /= 2;
			}
			return minT;
		},
	
		getPart: function(v, from, to) {
			var flip = from > to;
			if (flip) {
				var tmp = from;
				from = to;
				to = tmp;
			}
			if (from > 0)
				v = Curve.subdivide(v, from)[1];
			if (to < 1)
				v = Curve.subdivide(v, (to - from) / (1 - from))[0];
			return flip
					? [v[6], v[7], v[4], v[5], v[2], v[3], v[0], v[1]]
					: v;
		},
	
		hasHandles: function(v) {
			var isZero = Numerical.isZero;
			return !(isZero(v[0] - v[2]) && isZero(v[1] - v[3])
					&& isZero(v[4] - v[6]) && isZero(v[5] - v[7]));
		},
	
		isFlatEnough: function(v, tolerance) {
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7],
				ux = 3 * c1x - 2 * p1x - p2x,
				uy = 3 * c1y - 2 * p1y - p2y,
				vx = 3 * c2x - 2 * p2x - p1x,
				vy = 3 * c2y - 2 * p2y - p1y;
			return Math.max(ux * ux, vx * vx) + Math.max(uy * uy, vy * vy)
					< 10 * tolerance * tolerance;
		},
	
		getArea: function(v) {
			var p1x = v[0], p1y = v[1],
				p2x = v[6], p2y = v[7],
				h1x = (v[2] + p1x) / 2,
				h1y = (v[3] + p1y) / 2,
				h2x = (v[4] + v[6]) / 2,
				h2y = (v[5] + v[7]) / 2;
			return 6 * ((p1x - h1x) * (h1y + p1y)
					  + (h1x - h2x) * (h2y + h1y)
					  + (h2x - p2x) * (p2y + h2y)) / 10;
		},
	
		getBounds: function(v) {
			var min = v.slice(0, 2),
				max = min.slice(),
				roots = [0, 0];
			for (var i = 0; i < 2; i++)
				Curve._addBounds(v[i], v[i + 2], v[i + 4], v[i + 6],
						i, 0, min, max, roots);
			return new Rectangle(min[0], min[1], max[0] - min[0], max[1] - min[1]);
		},
	
		_addBounds: function(v0, v1, v2, v3, coord, padding, min, max, roots) {
			function add(value, padding) {
				var left = value - padding,
					right = value + padding;
				if (left < min[coord])
					min[coord] = left;
				if (right > max[coord])
					max[coord] = right;
			}
			var a = 3 * (v1 - v2) - v0 + v3,
				b = 2 * (v0 + v2) - 4 * v1,
				c = v1 - v0,
				count = Numerical.solveQuadratic(a, b, c, roots),
				tMin = 4e-7,
				tMax = 1 - tMin;
			add(v3, 0);
			for (var i = 0; i < count; i++) {
				var t = roots[i],
					u = 1 - t;
				if (tMin < t && t < tMax)
					add(u * u * u * v0
						+ 3 * u * u * t * v1
						+ 3 * u * t * t * v2
						+ t * t * t * v3,
						padding);
			}
		}
	}}, Base.each(
		['getBounds', 'getStrokeBounds', 'getHandleBounds', 'getRoughBounds'],
		function(name) {
			this[name] = function() {
				if (!this._bounds)
					this._bounds = {};
				var bounds = this._bounds[name];
				if (!bounds) {
					var path = this._path;
					bounds = this._bounds[name] = Path[name](
							[this._segment1, this._segment2], false,
							path && path.getStyle());
				}
				return bounds.clone();
			};
		},
	{
	
	}), Base.each({
		isStraight: function(l, h1, h2) {
			if (h1.isZero() && h2.isZero()) {
				return true;
			} else if (l.isZero()) {
				return false;
			} else if (h1.isCollinear(l) && h2.isCollinear(l)) {
				var div = l.dot(l),
					p1 = l.dot(h1) / div,
					p2 = l.dot(h2) / div;
				return p1 >= 0 && p1 <= 1 && p2 <= 0 && p2 >= -1;
			}
			return false;
		},
	
		isLinear: function(l, h1, h2) {
			var third = l.divide(3);
			return h1.equals(third) && h2.negate().equals(third);
		}
	}, function(test, name) {
		this[name] = function() {
			var seg1 = this._segment1,
				seg2 = this._segment2;
			return test(seg2._point.subtract(seg1._point),
					seg1._handleOut, seg2._handleIn);
		};
	
		this.statics[name] = function(v) {
			var p1x = v[0], p1y = v[1],
				p2x = v[6], p2y = v[7];
			return test(new Point(p2x - p1x, p2y - p1y),
					new Point(v[2] - p1x, v[3] - p1y),
					new Point(v[4] - p2x, v[5] - p2y));
		};
	}, {
		statics: {},
	
		hasHandles: function() {
			return !this._segment1._handleOut.isZero()
					|| !this._segment2._handleIn.isZero();
		},
	
		isCollinear: function(curve) {
			return curve && this.isStraight() && curve.isStraight()
					&& this.getLine().isCollinear(curve.getLine());
		},
	
		isHorizontal: function() {
			return this.isStraight() && Math.abs(this.getTangentAt(0.5, true).y)
					< 1e-7;
		},
	
		isVertical: function() {
			return this.isStraight() && Math.abs(this.getTangentAt(0.5, true).x)
					< 1e-7;
		}
	}), {
		beans: false,
	
		getParameterAt: function(offset, start) {
			return Curve.getParameterAt(this.getValues(), offset, start);
		},
	
		getParameterOf: function() {
			return Curve.getParameterOf(this.getValues(), Point.read(arguments));
		},
	
		getLocationAt: function(offset, isParameter) {
			var t = isParameter ? offset : this.getParameterAt(offset);
			return t != null && t >= 0 && t <= 1
					? new CurveLocation(this, t)
					: null;
		},
	
		getLocationOf: function() {
			return this.getLocationAt(this.getParameterOf(Point.read(arguments)),
					true);
		},
	
		getOffsetOf: function() {
			var loc = this.getLocationOf.apply(this, arguments);
			return loc ? loc.getOffset() : null;
		},
	
		getNearestLocation: function() {
			var point = Point.read(arguments),
				values = this.getValues(),
				t = Curve.getNearestParameter(values, point),
				pt = Curve.getPoint(values, t);
			return new CurveLocation(this, t, pt, null, point.getDistance(pt));
		},
	
		getNearestPoint: function() {
			return this.getNearestLocation.apply(this, arguments).getPoint();
		}
	
	},
	new function() {
		var methods = ['getPoint', 'getTangent', 'getNormal', 'getWeightedTangent',
			'getWeightedNormal', 'getCurvature'];
		return Base.each(methods,
		function(name) {
			this[name + 'At'] = function(offset, isParameter) {
				var values = this.getValues();
				return Curve[name](values, isParameter ? offset
						: Curve.getParameterAt(values, offset, 0));
			};
		}, {
			statics: {
				evaluateMethods: methods
			}
		})
	},
	new function() {
	
		function getLengthIntegrand(v) {
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7],
	
				ax = 9 * (c1x - c2x) + 3 * (p2x - p1x),
				bx = 6 * (p1x + c2x) - 12 * c1x,
				cx = 3 * (c1x - p1x),
	
				ay = 9 * (c1y - c2y) + 3 * (p2y - p1y),
				by = 6 * (p1y + c2y) - 12 * c1y,
				cy = 3 * (c1y - p1y);
	
			return function(t) {
				var dx = (ax * t + bx) * t + cx,
					dy = (ay * t + by) * t + cy;
				return Math.sqrt(dx * dx + dy * dy);
			};
		}
	
		function getIterations(a, b) {
			return Math.max(2, Math.min(16, Math.ceil(Math.abs(b - a) * 32)));
		}
	
		function evaluate(v, t, type, normalized) {
			if (t == null || t < 0 || t > 1)
				return null;
			var p1x = v[0], p1y = v[1],
				c1x = v[2], c1y = v[3],
				c2x = v[4], c2y = v[5],
				p2x = v[6], p2y = v[7],
				tMin = 4e-7,
				tMax = 1 - tMin,
				x, y;
	
			if (type === 0 && (t < tMin || t > tMax)) {
				var isZero = t < tMin;
				x = isZero ? p1x : p2x;
				y = isZero ? p1y : p2y;
			} else {
				var cx = 3 * (c1x - p1x),
					bx = 3 * (c2x - c1x) - cx,
					ax = p2x - p1x - cx - bx,
	
					cy = 3 * (c1y - p1y),
					by = 3 * (c2y - c1y) - cy,
					ay = p2y - p1y - cy - by;
				if (type === 0) {
					x = ((ax * t + bx) * t + cx) * t + p1x;
					y = ((ay * t + by) * t + cy) * t + p1y;
				} else {
					if (t < tMin) {
						x = cx;
						y = cy;
					} else if (t > tMax) {
						x = 3 * (p2x - c2x);
						y = 3 * (p2y - c2y);
					} else {
						x = (3 * ax * t + 2 * bx) * t + cx;
						y = (3 * ay * t + 2 * by) * t + cy;
					}
					if (normalized) {
						if (x === 0 && y === 0 && (t < tMin || t > tMax)) {
							x = c2x - c1x;
							y = c2y - c1y;
						}
						var len = Math.sqrt(x * x + y * y);
						if (len) {
							x /= len;
							y /= len;
						}
					}
					if (type === 3) {
						var x2 = 6 * ax * t + 2 * bx,
							y2 = 6 * ay * t + 2 * by,
							d = Math.pow(x * x + y * y, 3 / 2);
						x = d !== 0 ? (x * y2 - y * x2) / d : 0;
						y = 0;
					}
				}
			}
			return type === 2 ? new Point(y, -x) : new Point(x, y);
		}
	
		return { statics: {
	
			getLength: function(v, a, b) {
				if (a === undefined)
					a = 0;
				if (b === undefined)
					b = 1;
				if (a === 0 && b === 1 && Curve.isStraight(v)) {
					var dx = v[6] - v[0],
						dy = v[7] - v[1];
					return Math.sqrt(dx * dx + dy * dy);
				}
				var ds = getLengthIntegrand(v);
				return Numerical.integrate(ds, a, b, getIterations(a, b));
			},
	
			getParameterAt: function(v, offset, start) {
				if (start === undefined)
					start = offset < 0 ? 1 : 0
				if (offset === 0)
					return start;
				var abs = Math.abs,
					forward = offset > 0,
					a = forward ? start : 0,
					b = forward ? 1 : start,
					ds = getLengthIntegrand(v),
					rangeLength = Numerical.integrate(ds, a, b,
							getIterations(a, b));
				if (abs(offset - rangeLength) < 1e-12) {
					return forward ? b : a;
				} else if (abs(offset) > rangeLength) {
					return null;
				}
				var guess = offset / rangeLength,
					length = 0;
				function f(t) {
					length += Numerical.integrate(ds, start, t,
							getIterations(start, t));
					start = t;
					return length - offset;
				}
				return Numerical.findRoot(f, ds, start + guess, a, b, 32,
						1e-12);
			},
	
			getPoint: function(v, t) {
				return evaluate(v, t, 0, false);
			},
	
			getTangent: function(v, t) {
				return evaluate(v, t, 1, true);
			},
	
			getWeightedTangent: function(v, t) {
				return evaluate(v, t, 1, false);
			},
	
			getNormal: function(v, t) {
				return evaluate(v, t, 2, true);
			},
	
			getWeightedNormal: function(v, t) {
				return evaluate(v, t, 2, false);
			},
	
			getCurvature: function(v, t) {
				return evaluate(v, t, 3, false).x;
			}
		}};
	},
	new function() {
	
		function addLocation(locations, param, v1, c1, t1, p1, v2, c2, t2, p2,
				overlap) {
			var startConnected = param.startConnected,
				endConnected = param.endConnected,
				tMin = 4e-7,
				tMax = 1 - tMin;
			if (t1 == null)
				t1 = Curve.getParameterOf(v1, p1);
			if (t1 !== null && t1 >= (startConnected ? tMin : 0) &&
				t1 <= (endConnected ? tMax : 1)) {
				if (t2 == null)
					t2 = Curve.getParameterOf(v2, p2);
				if (t2 !== null && t2 >= (endConnected ? tMin : 0) &&
					t2 <= (startConnected ? tMax : 1)) {
					var renormalize = param.renormalize;
					if (renormalize) {
						var res = renormalize(t1, t2);
						t1 = res[0];
						t2 = res[1];
					}
					var loc1 = new CurveLocation(c1, t1,
							p1 || Curve.getPoint(v1, t1), overlap),
						loc2 = new CurveLocation(c2, t2,
							p2 || Curve.getPoint(v2, t2), overlap),
						flip = loc1.getPath() === loc2.getPath()
							&& loc1.getIndex() > loc2.getIndex(),
						loc = flip ? loc2 : loc1,
						include = param.include;
					loc1._intersection = loc2;
					loc2._intersection = loc1;
					if (!include || include(loc)) {
						CurveLocation.insert(locations, loc, true);
					}
				}
			}
		}
	
		function addCurveIntersections(v1, v2, c1, c2, locations, param,
				tMin, tMax, uMin, uMax, oldTDiff, reverse, recursion) {
			if (++recursion >= 24)
				return;
			var q0x = v2[0], q0y = v2[1], q3x = v2[6], q3y = v2[7],
				getSignedDistance = Line.getSignedDistance,
				d1 = getSignedDistance(q0x, q0y, q3x, q3y, v2[2], v2[3]),
				d2 = getSignedDistance(q0x, q0y, q3x, q3y, v2[4], v2[5]),
				factor = d1 * d2 > 0 ? 3 / 4 : 4 / 9,
				dMin = factor * Math.min(0, d1, d2),
				dMax = factor * Math.max(0, d1, d2),
				dp0 = getSignedDistance(q0x, q0y, q3x, q3y, v1[0], v1[1]),
				dp1 = getSignedDistance(q0x, q0y, q3x, q3y, v1[2], v1[3]),
				dp2 = getSignedDistance(q0x, q0y, q3x, q3y, v1[4], v1[5]),
				dp3 = getSignedDistance(q0x, q0y, q3x, q3y, v1[6], v1[7]),
				hull = getConvexHull(dp0, dp1, dp2, dp3),
				top = hull[0],
				bottom = hull[1],
				tMinClip,
				tMaxClip;
			if ((tMinClip = clipConvexHull(top, bottom, dMin, dMax)) == null ||
				(tMaxClip = clipConvexHull(top.reverse(), bottom.reverse(),
					dMin, dMax)) == null)
				return;
			v1 = Curve.getPart(v1, tMinClip, tMaxClip);
			var tDiff = tMaxClip - tMinClip,
				tMinNew = tMin + (tMax - tMin) * tMinClip,
				tMaxNew = tMin + (tMax - tMin) * tMaxClip;
			if (oldTDiff > 0.5 && tDiff > 0.5) {
				if (tMaxNew - tMinNew > uMax - uMin) {
					var parts = Curve.subdivide(v1, 0.5),
						t = tMinNew + (tMaxNew - tMinNew) / 2;
					addCurveIntersections(
						v2, parts[0], c2, c1, locations, param,
						uMin, uMax, tMinNew, t, tDiff, !reverse, recursion);
					addCurveIntersections(
						v2, parts[1], c2, c1, locations, param,
						uMin, uMax, t, tMaxNew, tDiff, !reverse, recursion);
				} else {
					var parts = Curve.subdivide(v2, 0.5),
						t = uMin + (uMax - uMin) / 2;
					addCurveIntersections(
						parts[0], v1, c2, c1, locations, param,
						uMin, t, tMinNew, tMaxNew, tDiff, !reverse, recursion);
					addCurveIntersections(
						parts[1], v1, c2, c1, locations, param,
						t, uMax, tMinNew, tMaxNew, tDiff, !reverse, recursion);
				}
			} else if (Math.max(uMax - uMin, tMaxNew - tMinNew)
					< 1e-7) {
				var t1 = tMinNew + (tMaxNew - tMinNew) / 2,
					t2 = uMin + (uMax - uMin) / 2;
				v1 = c1.getValues();
				v2 = c2.getValues();
				addLocation(locations, param,
					reverse ? v2 : v1, reverse ? c2 : c1, reverse ? t2 : t1, null,
					reverse ? v1 : v2, reverse ? c1 : c2, reverse ? t1 : t2, null);
			} else if (tDiff > 1e-12) {
				addCurveIntersections(v2, v1, c2, c1, locations, param,
						uMin, uMax, tMinNew, tMaxNew, tDiff, !reverse, recursion);
			}
		}
	
		function getConvexHull(dq0, dq1, dq2, dq3) {
			var p0 = [ 0, dq0 ],
				p1 = [ 1 / 3, dq1 ],
				p2 = [ 2 / 3, dq2 ],
				p3 = [ 1, dq3 ],
				dist1 = dq1 - (2 * dq0 + dq3) / 3,
				dist2 = dq2 - (dq0 + 2 * dq3) / 3,
				hull;
			if (dist1 * dist2 < 0) {
				hull = [[p0, p1, p3], [p0, p2, p3]];
			} else {
				var distRatio = dist1 / dist2;
				hull = [
					distRatio >= 2 ? [p0, p1, p3]
					: distRatio <= .5 ? [p0, p2, p3]
					: [p0, p1, p2, p3],
					[p0, p3]
				];
			}
			return (dist1 || dist2) < 0 ? hull.reverse() : hull;
		}
	
		function clipConvexHull(hullTop, hullBottom, dMin, dMax) {
			if (hullTop[0][1] < dMin) {
				return clipConvexHullPart(hullTop, true, dMin);
			} else if (hullBottom[0][1] > dMax) {
				return clipConvexHullPart(hullBottom, false, dMax);
			} else {
				return hullTop[0][0];
			}
		}
	
		function clipConvexHullPart(part, top, threshold) {
			var px = part[0][0],
				py = part[0][1];
			for (var i = 1, l = part.length; i < l; i++) {
				var qx = part[i][0],
					qy = part[i][1];
				if (top ? qy >= threshold : qy <= threshold) {
					return qy === threshold ? qx
							: px + (threshold - py) * (qx - px) / (qy - py);
				}
				px = qx;
				py = qy;
			}
			return null;
		}
	
		function addCurveLineIntersections(v1, v2, c1, c2, locations, param) {
			var flip = Curve.isStraight(v1),
				vc = flip ? v2 : v1,
				vl = flip ? v1 : v2,
				lx1 = vl[0], ly1 = vl[1],
				lx2 = vl[6], ly2 = vl[7],
				ldx = lx2 - lx1,
				ldy = ly2 - ly1,
				angle = Math.atan2(-ldy, ldx),
				sin = Math.sin(angle),
				cos = Math.cos(angle),
				rvc = [];
			for(var i = 0; i < 8; i += 2) {
				var x = vc[i] - lx1,
					y = vc[i + 1] - ly1;
				rvc.push(
					x * cos - y * sin,
					x * sin + y * cos);
			}
			var roots = [],
				count = Curve.solveCubic(rvc, 1, 0, roots, 0, 1);
			for (var i = 0; i < count; i++) {
				var tc = roots[i],
					pc = Curve.getPoint(vc, tc),
					tl = Curve.getParameterOf(vl, pc);
				if (tl !== null) {
					var pl = Curve.getPoint(vl, tl),
						t1 = flip ? tl : tc,
						t2 = flip ? tc : tl;
					if (!param.endConnected || t2 > Numerical.CURVETIME_EPSILON) {
						addLocation(locations, param,
								v1, c1, t1, flip ? pl : pc,
								v2, c2, t2, flip ? pc : pl);
					}
				}
			}
		}
	
		function addLineIntersection(v1, v2, c1, c2, locations, param) {
			var pt = Line.intersect(
					v1[0], v1[1], v1[6], v1[7],
					v2[0], v2[1], v2[6], v2[7]);
			if (pt) {
				addLocation(locations, param, v1, c1, null, pt, v2, c2, null, pt);
			}
		}
	
		return { statics: {
			_getIntersections: function(v1, v2, c1, c2, locations, param) {
				if (!v2) {
					return Curve._getSelfIntersection(v1, c1, locations, param);
				}
				var c1p1x = v1[0], c1p1y = v1[1],
					c1p2x = v1[6], c1p2y = v1[7],
					c2p1x = v2[0], c2p1y = v2[1],
					c2p2x = v2[6], c2p2y = v2[7],
					c1s1x = (3 * v1[2] + c1p1x) / 4,
					c1s1y = (3 * v1[3] + c1p1y) / 4,
					c1s2x = (3 * v1[4] + c1p2x) / 4,
					c1s2y = (3 * v1[5] + c1p2y) / 4,
					c2s1x = (3 * v2[2] + c2p1x) / 4,
					c2s1y = (3 * v2[3] + c2p1y) / 4,
					c2s2x = (3 * v2[4] + c2p2x) / 4,
					c2s2y = (3 * v2[5] + c2p2y) / 4,
					min = Math.min,
					max = Math.max;
				if (!(	max(c1p1x, c1s1x, c1s2x, c1p2x) >=
						min(c2p1x, c2s1x, c2s2x, c2p2x) &&
						min(c1p1x, c1s1x, c1s2x, c1p2x) <=
						max(c2p1x, c2s1x, c2s2x, c2p2x) &&
						max(c1p1y, c1s1y, c1s2y, c1p2y) >=
						min(c2p1y, c2s1y, c2s2y, c2p2y) &&
						min(c1p1y, c1s1y, c1s2y, c1p2y) <=
						max(c2p1y, c2s1y, c2s2y, c2p2y)))
					return locations;
				if (!param.startConnected && !param.endConnected) {
					var overlaps = Curve.getOverlaps(v1, v2);
					if (overlaps) {
						for (var i = 0; i < 2; i++) {
							var overlap = overlaps[i];
							addLocation(locations, param,
								v1, c1, overlap[0], null,
								v2, c2, overlap[1], null, true);
						}
						return locations;
					}
				}
	
				var straight1 = Curve.isStraight(v1),
					straight2 = Curve.isStraight(v2),
					straight = straight1 && straight2,
					epsilon = 1e-12,
					before = locations.length;
				(straight
					? addLineIntersection
					: straight1 || straight2
						? addCurveLineIntersections
						: addCurveIntersections)(
							v1, v2, c1, c2, locations, param,
							0, 1, 0, 1, 0, false, 0);
				if (straight && locations.length > before)
					return locations;
				var c1p1 = new Point(c1p1x, c1p1y),
					c1p2 = new Point(c1p2x, c1p2y),
					c2p1 = new Point(c2p1x, c2p1y),
					c2p2 = new Point(c2p2x, c2p2y);
				if (c1p1.isClose(c2p1, epsilon))
					addLocation(locations, param, v1, c1, 0, c1p1, v2, c2, 0, c2p1);
				if (!param.startConnected && c1p1.isClose(c2p2, epsilon))
					addLocation(locations, param, v1, c1, 0, c1p1, v2, c2, 1, c2p2);
				if (!param.endConnected && c1p2.isClose(c2p1, epsilon))
					addLocation(locations, param, v1, c1, 1, c1p2, v2, c2, 0, c2p1);
				if (c1p2.isClose(c2p2, epsilon))
					addLocation(locations, param, v1, c1, 1, c1p2, v2, c2, 1, c2p2);
				return locations;
			},
	
			_getSelfIntersection: function(v1, c1, locations, param) {
				var p1x = v1[0], p1y = v1[1],
					h1x = v1[2], h1y = v1[3],
					h2x = v1[4], h2y = v1[5],
					p2x = v1[6], p2y = v1[7];
				var line = new Line(p1x, p1y, p2x, p2y, false),
					side1 = line.getSide(new Point(h1x, h1y), true),
					side2 = line.getSide(new Point(h2x, h2y), true);
				if (side1 === side2) {
					var edgeSum = (p1x - h2x) * (h1y - p2y)
								+ (h1x - p2x) * (h2y - p1y);
					if (edgeSum * side1 > 0)
						return locations;
				}
				var ax = p2x - 3 * h2x + 3 * h1x - p1x,
					bx = h2x - 2 * h1x + p1x,
					cx = h1x - p1x,
					ay = p2y - 3 * h2y + 3 * h1y - p1y,
					by = h2y - 2 * h1y + p1y,
					cy = h1y - p1y,
					ac = ay * cx - ax * cy,
					ab = ay * bx - ax * by,
					bc = by * cx - bx * cy;
				if (ac * ac - 4 * ab * bc < 0) {
					var roots = [],
						tSplit,
						count = Numerical.solveCubic(
								ax * ax	 + ay * ay,
								3 * (ax * bx + ay * by),
								2 * (bx * bx + by * by) + ax * cx + ay * cy,
								bx * cx + by * cy,
								roots, 0, 1);
					if (count > 0) {
						for (var i = 0, maxCurvature = 0; i < count; i++) {
							var curvature = Math.abs(
									c1.getCurvatureAt(roots[i], true));
							if (curvature > maxCurvature) {
								maxCurvature = curvature;
								tSplit = roots[i];
							}
						}
						var parts = Curve.subdivide(v1, tSplit);
						param.endConnected = true;
						param.renormalize = function(t1, t2) {
							return [t1 * tSplit, t2 * (1 - tSplit) + tSplit];
						};
						Curve._getIntersections(parts[0], parts[1], c1, c1,
								locations, param);
					}
				}
				return locations;
			},
	
			getOverlaps: function(v1, v2) {
				var abs = Math.abs,
					timeEpsilon = 4e-7,
					geomEpsilon = 2e-7,
					straight1 = Curve.isStraight(v1),
					straight2 = Curve.isStraight(v2),
					straight =	straight1 && straight2;
	
				function getLineLengthSquared(v) {
					var x = v[6] - v[0],
						y = v[7] - v[1];
					return x * x + y * y;
				}
	
				if (straight) {
					var flip = getLineLengthSquared(v1) < getLineLengthSquared(v2),
						l1 = flip ? v2 : v1,
						l2 = flip ? v1 : v2,
						line = new Line(l1[0], l1[1], l1[6], l1[7]);
					if (line.getDistance(new Point(l2[0], l2[1])) > geomEpsilon ||
						line.getDistance(new Point(l2[6], l2[7])) > geomEpsilon)
						return null;
				} else if (straight1 ^ straight2) {
					return null;
				}
	
				var v = [v1, v2],
					pairs = [];
				for (var i = 0, t1 = 0;
						i < 2 && pairs.length < 2;
						i += t1 === 0 ? 0 : 1, t1 = t1 ^ 1) {
					var t2 = Curve.getParameterOf(v[i ^ 1], new Point(
							v[i][t1 === 0 ? 0 : 6],
							v[i][t1 === 0 ? 1 : 7]));
					if (t2 != null) {
						var pair = i === 0 ? [t1, t2] : [t2, t1];
						if (pairs.length === 0 ||
							abs(pair[0] - pairs[0][0]) > timeEpsilon &&
							abs(pair[1] - pairs[0][1]) > timeEpsilon)
							pairs.push(pair);
					}
					if (i === 1 && pairs.length === 0)
						break;
				}
				if (pairs.length !== 2) {
					pairs = null;
				} else if (!straight) {
					var o1 = Curve.getPart(v1, pairs[0][0], pairs[1][0]),
						o2 = Curve.getPart(v2, pairs[0][1], pairs[1][1]);
					if (abs(o2[2] - o1[2]) > geomEpsilon ||
						abs(o2[3] - o1[3]) > geomEpsilon ||
						abs(o2[4] - o1[4]) > geomEpsilon ||
						abs(o2[5] - o1[5]) > geomEpsilon)
						pairs = null;
				}
				return pairs;
			}
		}};
	});
	
	var CurveLocation = Base.extend({
		_class: 'CurveLocation',
		beans: true,
	
		initialize: function CurveLocation(curve, parameter, point,
				_overlap, _distance) {
			if (parameter > 0.9999996) {
				var next = curve.getNext();
				if (next) {
					parameter = 0;
					curve = next;
				}
			}
			this._id = UID.get(CurveLocation);
			this._setCurve(curve);
			this._parameter = parameter;
			this._point = point || curve.getPointAt(parameter, true);
			this._overlap = _overlap;
			this._distance = _distance;
			this._intersection = this._next = this._prev = null;
		},
	
		_setCurve: function(curve) {
			var path = curve._path;
			this._version = path ? path._version : 0;
			this._curve = curve;
			this._segment = null;
			this._segment1 = curve._segment1;
			this._segment2 = curve._segment2;
		},
	
		_setSegment: function(segment) {
			this._setCurve(segment.getCurve());
			this._segment = segment;
			this._parameter = segment === this._segment1 ? 0 : 1;
			this._point = segment._point.clone();
		},
	
		getSegment: function() {
			var curve = this.getCurve(),
				segment = this._segment;
			if (!segment) {
				var parameter = this.getParameter();
				if (parameter === 0) {
					segment = curve._segment1;
				} else if (parameter === 1) {
					segment = curve._segment2;
				} else if (parameter != null) {
					segment = curve.getPartLength(0, parameter)
						< curve.getPartLength(parameter, 1)
							? curve._segment1
							: curve._segment2;
				}
				this._segment = segment;
			}
			return segment;
		},
	
		getCurve: function() {
			var curve = this._curve,
				path = curve && curve._path,
				that = this;
			if (path && path._version !== this._version) {
				curve = this._parameter = this._curve = this._offset = null;
			}
	
			function trySegment(segment) {
				var curve = segment && segment.getCurve();
				if (curve && (that._parameter = curve.getParameterOf(that._point))
						!= null) {
					that._setCurve(curve);
					that._segment = segment;
					return curve;
				}
			}
	
			return curve
				|| trySegment(this._segment)
				|| trySegment(this._segment1)
				|| trySegment(this._segment2.getPrevious());
		},
	
		getPath: function() {
			var curve = this.getCurve();
			return curve && curve._path;
		},
	
		getIndex: function() {
			var curve = this.getCurve();
			return curve && curve.getIndex();
		},
	
		getParameter: function() {
			var curve = this.getCurve(),
				parameter = this._parameter;
			return curve && parameter == null
				? this._parameter = curve.getParameterOf(this._point)
				: parameter;
		},
	
		getPoint: function() {
			return this._point;
		},
	
		getOffset: function() {
			var offset = this._offset;
			if (offset == null) {
				offset = 0;
				var path = this.getPath(),
					index = this.getIndex();
				if (path && index != null) {
					var curves = path.getCurves();
					for (var i = 0; i < index; i++)
						offset += curves[i].getLength();
				}
				this._offset = offset += this.getCurveOffset();
			}
			return offset;
		},
	
		getCurveOffset: function() {
			var curve = this.getCurve(),
				parameter = this.getParameter();
			return parameter != null && curve && curve.getPartLength(0, parameter);
		},
	
		getIntersection: function() {
			return this._intersection;
		},
	
		getDistance: function() {
			return this._distance;
		},
	
		divide: function() {
			var curve = this.getCurve(),
				res = null;
			if (curve) {
				res = curve.divide(this.getParameter(), true);
				if (res)
					this._setSegment(res._segment1);
			}
			return res;
		},
	
		split: function() {
			var curve = this.getCurve();
			return curve ? curve.split(this.getParameter(), true) : null;
		},
	
		equals: function(loc, _ignoreOther) {
			var res = this === loc,
				epsilon = 2e-7;
			if (!res && loc instanceof CurveLocation
					&& this.getPath() === loc.getPath()
					&& this.getPoint().isClose(loc.getPoint(), epsilon)) {
				var c1 = this.getCurve(),
					c2 = loc.getCurve(),
					abs = Math.abs,
					diff = abs(
						((c1.isLast() && c2.isFirst() ? -1 : c1.getIndex())
								+ this.getParameter()) -
						((c2.isLast() && c1.isFirst() ? -1 : c2.getIndex())
								+ loc.getParameter()));
				res = (diff < 4e-7
					|| ((diff = abs(this.getOffset() - loc.getOffset())) < epsilon
						|| abs(this.getPath().getLength() - diff) < epsilon))
					&& (_ignoreOther
						|| (!this._intersection && !loc._intersection
							|| this._intersection && this._intersection.equals(
									loc._intersection, true)));
			}
			return res;
		},
	
		toString: function() {
			var parts = [],
				point = this.getPoint(),
				f = Formatter.instance;
			if (point)
				parts.push('point: ' + point);
			var index = this.getIndex();
			if (index != null)
				parts.push('index: ' + index);
			var parameter = this.getParameter();
			if (parameter != null)
				parts.push('parameter: ' + f.number(parameter));
			if (this._distance != null)
				parts.push('distance: ' + f.number(this._distance));
			return '{ ' + parts.join(', ') + ' }';
		},
	
		isTouching: function() {
			var inter = this._intersection;
			if (inter && this.getTangent().isCollinear(inter.getTangent())) {
				var curve1 = this.getCurve(),
					curve2 = inter.getCurve();
				return !(curve1.isStraight() && curve2.isStraight()
						&& curve1.getLine().intersect(curve2.getLine()));
			}
			return false;
		},
	
		isCrossing: function() {
			var inter = this._intersection;
			if (!inter)
				return false;
			var t1 = this.getParameter(),
				t2 = inter.getParameter(),
				tMin = 4e-7,
				tMax = 1 - tMin;
			if (t1 >= tMin && t1 <= tMax || t2 >= tMin && t2 <= tMax)
				return !this.isTouching();
			var c2 = this.getCurve(),
				c1 = c2.getPrevious(),
				c4 = inter.getCurve(),
				c3 = c4.getPrevious(),
				PI = Math.PI;
			if (!c1 || !c3)
				return false;
	
			function isInRange(angle, min, max) {
				return min < max
					? angle > min && angle < max
					: angle > min && angle <= PI || angle >= -PI && angle < max;
			}
	
			var a1 = c1.getTangentAt(tMax, true).negate().getAngleInRadians(),
				a2 = c2.getTangentAt(tMin, true).getAngleInRadians(),
				a3 = c3.getTangentAt(tMax, true).negate().getAngleInRadians(),
				a4 = c4.getTangentAt(tMin, true).getAngleInRadians();
	
			return (isInRange(a3, a1, a2) ^ isInRange(a4, a1, a2))
				&& (isInRange(a3, a2, a1) ^ isInRange(a4, a2, a1));
		},
	
		isOverlap: function() {
			return !!this._overlap;
		}
	}, Base.each(Curve.evaluateMethods, function(name) {
		var get = name + 'At';
		this[name] = function() {
			var parameter = this.getParameter(),
				curve = this.getCurve();
			return parameter != null && curve && curve[get](parameter, true);
		};
	}, {
		preserve: true
	}),
	new function() {
	
		function insert(locations, loc, merge) {
			var length = locations.length,
				l = 0,
				r = length - 1;
	
			function search(index, dir) {
				for (var i = index + dir; i >= -1 && i <= length; i += dir) {
					var loc2 = locations[((i % length) + length) % length];
					if (!loc.getPoint().isClose(loc2.getPoint(),
							2e-7))
						break;
					if (loc.equals(loc2))
						return loc2;
				}
				return null;
			}
	
			while (l <= r) {
				var m = (l + r) >>> 1,
					loc2 = locations[m],
					found;
				if (merge && (found = loc.equals(loc2) ? loc2
						: (search(m, -1) || search(m, 1)))) {
					if (loc._overlap) {
						found._overlap = found._intersection._overlap = true;
					}
					return found;
				}
			var path1 = loc.getPath(),
				path2 = loc2.getPath(),
				diff = path1 === path2
					? (loc.getIndex() + loc.getParameter())
					- (loc2.getIndex() + loc2.getParameter())
					: path1._id - path2._id;
				if (diff < 0) {
					r = m - 1;
				} else {
					l = m + 1;
				}
			}
			locations.splice(l, 0, loc);
			return loc;
		}
	
		return { statics: {
			insert: insert,
	
			expand: function(locations) {
				var expanded = locations.slice();
				for (var i = 0, l = locations.length; i < l; i++) {
					insert(expanded, locations[i]._intersection, false);
				}
				return expanded;
			}
		}};
	});
	
	var PathItem = Item.extend({
		_class: 'PathItem',
	
		initialize: function PathItem() {
		},
	
		getIntersections: function(path, include, _matrix, _returnFirst) {
			var self = this === path || !path,
				matrix1 = this._matrix.orNullIfIdentity(),
				matrix2 = self ? matrix1
					: (_matrix || path._matrix).orNullIfIdentity();
			if (!self && !this.getBounds(matrix1).touches(path.getBounds(matrix2)))
				return [];
			var curves1 = this.getCurves(),
				curves2 = self ? curves1 : path.getCurves(),
				length1 = curves1.length,
				length2 = self ? length1 : curves2.length,
				values2 = [],
				arrays = [],
				locations,
				path;
			for (var i = 0; i < length2; i++)
				values2[i] = curves2[i].getValues(matrix2);
			for (var i = 0; i < length1; i++) {
				var curve1 = curves1[i],
					values1 = self ? values2[i] : curve1.getValues(matrix1),
					path1 = curve1.getPath();
				if (path1 !== path) {
					path = path1;
					locations = [];
					arrays.push(locations);
				}
				if (self) {
					Curve._getSelfIntersection(values1, curve1, locations, {
						include: include,
						startConnected: length1 === 1 &&
								curve1.getPoint1().equals(curve1.getPoint2())
					});
				}
				for (var j = self ? i + 1 : 0; j < length2; j++) {
					if (_returnFirst && locations.length)
						return locations;
					var curve2 = curves2[j];
					Curve._getIntersections(
						values1, values2[j], curve1, curve2, locations,
						{
							include: include,
							startConnected: self && curve1.getPrevious() === curve2,
							endConnected: self && curve1.getNext() === curve2
						}
					);
				}
			}
			locations = [];
			for (var i = 0, l = arrays.length; i < l; i++) {
				locations.push.apply(locations, arrays[i]);
			}
			return locations;
		},
	
		getCrossings: function(path) {
			return this.getIntersections(path, function(inter) {
				return inter.isCrossing();
			});
		},
	
		_asPathItem: function() {
			return this;
		},
	
		setPathData: function(data) {
	
			var parts = data.match(/[mlhvcsqtaz][^mlhvcsqtaz]*/ig),
				coords,
				relative = false,
				previous,
				control,
				current = new Point(),
				start = new Point();
	
			function getCoord(index, coord) {
				var val = +coords[index];
				if (relative)
					val += current[coord];
				return val;
			}
	
			function getPoint(index) {
				return new Point(
					getCoord(index, 'x'),
					getCoord(index + 1, 'y')
				);
			}
	
			this.clear();
	
			for (var i = 0, l = parts && parts.length; i < l; i++) {
				var part = parts[i],
					command = part[0],
					lower = command.toLowerCase();
				coords = part.match(/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g);
				var length = coords && coords.length;
				relative = command === lower;
				if (previous === 'z' && !/[mz]/.test(lower))
					this.moveTo(current = start);
				switch (lower) {
				case 'm':
				case 'l':
					var move = lower === 'm';
					for (var j = 0; j < length; j += 2)
						this[j === 0 && move ? 'moveTo' : 'lineTo'](
								current = getPoint(j));
					control = current;
					if (move)
						start = current;
					break;
				case 'h':
				case 'v':
					var coord = lower === 'h' ? 'x' : 'y';
					for (var j = 0; j < length; j++) {
						current[coord] = getCoord(j, coord);
						this.lineTo(current);
					}
					control = current;
					break;
				case 'c':
					for (var j = 0; j < length; j += 6) {
						this.cubicCurveTo(
								getPoint(j),
								control = getPoint(j + 2),
								current = getPoint(j + 4));
					}
					break;
				case 's':
					for (var j = 0; j < length; j += 4) {
						this.cubicCurveTo(
								/[cs]/.test(previous)
										? current.multiply(2).subtract(control)
										: current,
								control = getPoint(j),
								current = getPoint(j + 2));
						previous = lower;
					}
					break;
				case 'q':
					for (var j = 0; j < length; j += 4) {
						this.quadraticCurveTo(
								control = getPoint(j),
								current = getPoint(j + 2));
					}
					break;
				case 't':
					for (var j = 0; j < length; j += 2) {
						this.quadraticCurveTo(
								control = (/[qt]/.test(previous)
										? current.multiply(2).subtract(control)
										: current),
								current = getPoint(j));
						previous = lower;
					}
					break;
				case 'a':
					for (var j = 0; j < length; j += 7) {
						this.arcTo(current = getPoint(j + 5),
								new Size(+coords[j], +coords[j + 1]),
								+coords[j + 2], +coords[j + 4], +coords[j + 3]);
					}
					break;
				case 'z':
					this.closePath(true);
					break;
				}
				previous = lower;
			}
		},
	
		_canComposite: function() {
			return !(this.hasFill() && this.hasStroke());
		},
	
		_contains: function(point) {
			var winding = this._getWinding(point, false, true);
			return !!(this.getWindingRule() === 'evenodd' ? winding & 1 : winding);
		}
	
	});
	
	var Path = PathItem.extend({
		_class: 'Path',
		_serializeFields: {
			segments: [],
			closed: false
		},
	
		initialize: function Path(arg) {
			this._closed = false;
			this._segments = [];
			this._version = 0;
			var segments = Array.isArray(arg)
				? typeof arg[0] === 'object'
					? arg
					: arguments
				: arg && (arg.size === undefined && (arg.x !== undefined
						|| arg.point !== undefined))
					? arguments
					: null;
			if (segments && segments.length > 0) {
				this.setSegments(segments);
			} else {
				this._curves = undefined;
				this._selectedSegmentState = 0;
				if (!segments && typeof arg === 'string') {
					this.setPathData(arg);
					arg = null;
				}
			}
			this._initialize(!segments && arg);
		},
	
		_equals: function(item) {
			return this._closed === item._closed
					&& Base.equals(this._segments, item._segments);
		},
	
		clone: function(insert) {
			var copy = new Path(Item.NO_INSERT);
			copy.setSegments(this._segments);
			copy._closed = this._closed;
			if (this._clockwise !== undefined)
				copy._clockwise = this._clockwise;
			return this._clone(copy, insert);
		},
	
		_changed: function _changed(flags) {
			_changed.base.call(this, flags);
			if (flags & 8) {
				var parent = this._parent;
				if (parent)
					parent._currentPath = undefined;
				this._length = this._area = this._clockwise = this._monoCurves =
						undefined;
				if (flags & 16) {
					this._version++;
				} else if (this._curves) {
				   for (var i = 0, l = this._curves.length; i < l; i++)
						this._curves[i]._changed();
				}
			} else if (flags & 32) {
				this._bounds = undefined;
			}
		},
	
		getStyle: function() {
			var parent = this._parent;
			return (parent instanceof CompoundPath ? parent : this)._style;
		},
	
		getSegments: function() {
			return this._segments;
		},
	
		setSegments: function(segments) {
			var fullySelected = this.isFullySelected();
			this._segments.length = 0;
			this._selectedSegmentState = 0;
			this._curves = undefined;
			if (segments && segments.length > 0)
				this._add(Segment.readAll(segments));
			if (fullySelected)
				this.setFullySelected(true);
		},
	
		getFirstSegment: function() {
			return this._segments[0];
		},
	
		getLastSegment: function() {
			return this._segments[this._segments.length - 1];
		},
	
		getCurves: function() {
			var curves = this._curves,
				segments = this._segments;
			if (!curves) {
				var length = this._countCurves();
				curves = this._curves = new Array(length);
				for (var i = 0; i < length; i++)
					curves[i] = new Curve(this, segments[i],
						segments[i + 1] || segments[0]);
			}
			return curves;
		},
	
		getFirstCurve: function() {
			return this.getCurves()[0];
		},
	
		getLastCurve: function() {
			var curves = this.getCurves();
			return curves[curves.length - 1];
		},
	
		isClosed: function() {
			return this._closed;
		},
	
		setClosed: function(closed) {
			if (this._closed != (closed = !!closed)) {
				this._closed = closed;
				if (this._curves) {
					var length = this._curves.length = this._countCurves();
					if (closed)
						this._curves[length - 1] = new Curve(this,
							this._segments[length - 1], this._segments[0]);
				}
				this._changed(25);
			}
		}
	}, {
		beans: true,
	
		getPathData: function(_matrix, _precision) {
			var segments = this._segments,
				length = segments.length,
				f = new Formatter(_precision),
				coords = new Array(6),
				first = true,
				curX, curY,
				prevX, prevY,
				inX, inY,
				outX, outY,
				parts = [];
	
			function addSegment(segment, skipLine) {
				segment._transformCoordinates(_matrix, coords, false);
				curX = coords[0];
				curY = coords[1];
				if (first) {
					parts.push('M' + f.pair(curX, curY));
					first = false;
				} else {
					inX = coords[2];
					inY = coords[3];
					if (inX === curX && inY === curY
							&& outX === prevX && outY === prevY) {
						if (!skipLine)
							parts.push('l' + f.pair(curX - prevX, curY - prevY));
					} else {
						parts.push('c' + f.pair(outX - prevX, outY - prevY)
								+ ' ' + f.pair(inX - prevX, inY - prevY)
								+ ' ' + f.pair(curX - prevX, curY - prevY));
					}
				}
				prevX = curX;
				prevY = curY;
				outX = coords[4];
				outY = coords[5];
			}
	
			if (length === 0)
				return '';
	
			for (var i = 0; i < length; i++)
				addSegment(segments[i]);
			if (this._closed && length > 0) {
				addSegment(segments[0], true);
				parts.push('z');
			}
			return parts.join('');
		}
	}, {
	
		isEmpty: function() {
			return this._segments.length === 0;
		},
	
		_transformContent: function(matrix) {
			var coords = new Array(6);
			for (var i = 0, l = this._segments.length; i < l; i++)
				this._segments[i]._transformCoordinates(matrix, coords, true);
			return true;
		},
	
		_add: function(segs, index) {
			var segments = this._segments,
				curves = this._curves,
				amount = segs.length,
				append = index == null,
				index = append ? segments.length : index;
			for (var i = 0; i < amount; i++) {
				var segment = segs[i];
				if (segment._path)
					segment = segs[i] = segment.clone();
				segment._path = this;
				segment._index = index + i;
				if (segment._selectionState)
					this._updateSelection(segment, 0, segment._selectionState);
			}
			if (append) {
				segments.push.apply(segments, segs);
			} else {
				segments.splice.apply(segments, [index, 0].concat(segs));
				for (var i = index + amount, l = segments.length; i < l; i++)
					segments[i]._index = i;
			}
			if (curves) {
				var total = this._countCurves(),
					from = index + amount - 1 === total ? index - 1 : index,
					start = from,
					to = Math.min(from + amount, total);
				if (segs._curves) {
					curves.splice.apply(curves, [from, 0].concat(segs._curves));
					start += segs._curves.length;
				}
				for (var i = start; i < to; i++)
					curves.splice(i, 0, new Curve(this, null, null));
				this._adjustCurves(from, to);
			}
			this._changed(25);
			return segs;
		},
	
		_adjustCurves: function(from, to) {
			var segments = this._segments,
				curves = this._curves,
				curve;
			for (var i = from; i < to; i++) {
				curve = curves[i];
				curve._path = this;
				curve._segment1 = segments[i];
				curve._segment2 = segments[i + 1] || segments[0];
				curve._changed();
			}
			if (curve = curves[this._closed && from === 0 ? segments.length - 1
					: from - 1]) {
				curve._segment2 = segments[from] || segments[0];
				curve._changed();
			}
			if (curve = curves[to]) {
				curve._segment1 = segments[to];
				curve._changed();
			}
		},
	
		_countCurves: function() {
			var length = this._segments.length;
			return !this._closed && length > 0 ? length - 1 : length;
		},
	
		add: function(segment1 ) {
			return arguments.length > 1 && typeof segment1 !== 'number'
				? this._add(Segment.readAll(arguments))
				: this._add([ Segment.read(arguments) ])[0];
		},
	
		insert: function(index, segment1 ) {
			return arguments.length > 2 && typeof segment1 !== 'number'
				? this._add(Segment.readAll(arguments, 1), index)
				: this._add([ Segment.read(arguments, 1) ], index)[0];
		},
	
		addSegment: function() {
			return this._add([ Segment.read(arguments) ])[0];
		},
	
		insertSegment: function(index ) {
			return this._add([ Segment.read(arguments, 1) ], index)[0];
		},
	
		addSegments: function(segments) {
			return this._add(Segment.readAll(segments));
		},
	
		insertSegments: function(index, segments) {
			return this._add(Segment.readAll(segments), index);
		},
	
		removeSegment: function(index) {
			return this.removeSegments(index, index + 1)[0] || null;
		},
	
		removeSegments: function(from, to, _includeCurves) {
			from = from || 0;
			to = Base.pick(to, this._segments.length);
			var segments = this._segments,
				curves = this._curves,
				count = segments.length,
				removed = segments.splice(from, to - from),
				amount = removed.length;
			if (!amount)
				return removed;
			for (var i = 0; i < amount; i++) {
				var segment = removed[i];
				if (segment._selectionState)
					this._updateSelection(segment, segment._selectionState, 0);
				segment._index = segment._path = null;
			}
			for (var i = from, l = segments.length; i < l; i++)
				segments[i]._index = i;
			if (curves) {
				var index = from > 0 && to === count + (this._closed ? 1 : 0)
						? from - 1
						: from,
					curves = curves.splice(index, amount);
				if (_includeCurves)
					removed._curves = curves.slice(1);
				this._adjustCurves(index, index);
			}
			this._changed(25);
			return removed;
		},
	
		clear: '#removeSegments',
	
		hasHandles: function() {
			var segments = this._segments;
			for (var i = 0, l = segments.length; i < l; i++) {
				if (segments[i].hasHandles())
					return true;
			}
			return false;
		},
	
		clearHandles: function() {
			var segments = this._segments;
			for (var i = 0, l = segments.length; i < l; i++)
				segments[i].clearHandles();
		},
	
		getLength: function() {
			if (this._length == null) {
				var curves = this.getCurves(),
					length = 0;
				for (var i = 0, l = curves.length; i < l; i++)
					length += curves[i].getLength();
				this._length = length;
			}
			return this._length;
		},
	
		getArea: function() {
			if (this._area == null) {
				var segments = this._segments,
					count = segments.length,
					last = count - 1,
					area = 0;
				for (var i = 0, l = this._closed ? count : last; i < l; i++) {
					area += Curve.getArea(Curve.getValues(
							segments[i], segments[i < last ? i + 1 : 0]));
				}
				this._area = area;
			}
			return this._area;
		},
	
		isClockwise: function() {
			if (this._clockwise !== undefined)
				return this._clockwise;
			return this.getArea() >= 0;
		},
	
		setClockwise: function(clockwise) {
			if (this.isClockwise() != (clockwise = !!clockwise))
				this.reverse();
			this._clockwise = clockwise;
		},
	
		isFullySelected: function() {
			var length = this._segments.length;
			return this._selected && length > 0 && this._selectedSegmentState
					=== length * 7;
		},
	
		setFullySelected: function(selected) {
			if (selected)
				this._selectSegments(true);
			this.setSelected(selected);
		},
	
		setSelected: function setSelected(selected) {
			if (!selected)
				this._selectSegments(false);
			setSelected.base.call(this, selected);
		},
	
		_selectSegments: function(selected) {
			var length = this._segments.length;
			this._selectedSegmentState = selected
					? length * 7 : 0;
			for (var i = 0; i < length; i++)
				this._segments[i]._selectionState = selected
						? 7 : 0;
		},
	
		_updateSelection: function(segment, oldState, newState) {
			segment._selectionState = newState;
			var total = this._selectedSegmentState += newState - oldState;
			if (total > 0)
				this.setSelected(true);
		},
	
		flatten: function(maxDistance) {
			var iterator = new PathIterator(this, 64, 0.1),
				pos = 0,
				step = iterator.length / Math.ceil(iterator.length / maxDistance),
				end = iterator.length + (this._closed ? -step : step) / 2;
			var segments = [];
			while (pos <= end) {
				segments.push(new Segment(iterator.getPointAt(pos)));
				pos += step;
			}
			this.setSegments(segments);
		},
	
		reduce: function() {
			var curves = this.getCurves();
			for (var i = curves.length - 1; i >= 0; i--) {
				var curve = curves[i];
				if (!curve.hasHandles() && (curve.getLength() === 0
						|| curve.isCollinear(curve.getNext())))
					curve.remove();
			}
			return this;
		},
	
		simplify: function(tolerance) {
			if (this._segments.length > 2) {
				var fitter = new PathFitter(this, tolerance || 2.5);
				this.setSegments(fitter.fit());
			}
		},
	
		split: function(index, parameter) {
			if (parameter === null)
				return null;
			if (arguments.length === 1) {
				var arg = index;
				if (typeof arg === 'number')
					arg = this.getLocationAt(arg);
				if (!arg)
					return null
				index = arg.index;
				parameter = arg.parameter;
			}
			var tMin = 4e-7,
				tMax = 1 - tMin;
			if (parameter >= tMax) {
				index++;
				parameter--;
			}
			var curves = this.getCurves();
			if (index >= 0 && index < curves.length) {
				if (parameter >= tMin) {
					curves[index++].divide(parameter, true);
				}
				var segs = this.removeSegments(index, this._segments.length, true),
					path;
				if (this._closed) {
					this.setClosed(false);
					path = this;
				} else {
					path = new Path(Item.NO_INSERT);
					path.insertAbove(this, true);
					this._clone(path);
				}
				path._add(segs, 0);
				this.addSegment(segs[0]);
				return path;
			}
			return null;
		},
	
		reverse: function() {
			this._segments.reverse();
			for (var i = 0, l = this._segments.length; i < l; i++) {
				var segment = this._segments[i];
				var handleIn = segment._handleIn;
				segment._handleIn = segment._handleOut;
				segment._handleOut = handleIn;
				segment._index = i;
			}
			this._curves = null;
			if (this._clockwise !== undefined)
				this._clockwise = !this._clockwise;
			this._changed(9);
		},
	
		join: function(path) {
			if (path) {
				var segments = path._segments,
					last1 = this.getLastSegment(),
					last2 = path.getLastSegment();
				if (!last2)
					return this;
				if (last1 && last1._point.equals(last2._point))
					path.reverse();
				var first2 = path.getFirstSegment();
				if (last1 && last1._point.equals(first2._point)) {
					last1.setHandleOut(first2._handleOut);
					this._add(segments.slice(1));
				} else {
					var first1 = this.getFirstSegment();
					if (first1 && first1._point.equals(first2._point))
						path.reverse();
					last2 = path.getLastSegment();
					if (first1 && first1._point.equals(last2._point)) {
						first1.setHandleIn(last2._handleIn);
						this._add(segments.slice(0, segments.length - 1), 0);
					} else {
						this._add(segments.slice());
					}
				}
				if (path._closed)
					this._add([segments[0]]);
				path.remove();
			}
			var first = this.getFirstSegment(),
				last = this.getLastSegment();
			if (first !== last && first._point.equals(last._point)) {
				first.setHandleIn(last._handleIn);
				last.remove();
				this.setClosed(true);
			}
			return this;
		},
	
		toShape: function(insert) {
			if (!this._closed)
				return null;
	
			var segments = this._segments,
				type,
				size,
				radius,
				topCenter;
	
			function isCollinear(i, j) {
				var seg1 = segments[i],
					seg2 = seg1.getNext(),
					seg3 = segments[j],
					seg4 = seg3.getNext();
				return seg1._handleOut.isZero() && seg2._handleIn.isZero()
						&& seg3._handleOut.isZero() && seg4._handleIn.isZero()
						&& seg2._point.subtract(seg1._point).isCollinear(
							seg4._point.subtract(seg3._point));
			}
	
			function isOrthogonal(i) {
				var seg2 = segments[i],
					seg1 = seg2.getPrevious(),
					seg3 = seg2.getNext();
				return seg1._handleOut.isZero() && seg2._handleIn.isZero()
						&& seg2._handleOut.isZero() && seg3._handleIn.isZero()
						&& seg2._point.subtract(seg1._point).isOrthogonal(
							seg3._point.subtract(seg2._point));
			}
	
			function isArc(i) {
				var seg1 = segments[i],
					seg2 = seg1.getNext(),
					handle1 = seg1._handleOut,
					handle2 = seg2._handleIn,
					kappa = 0.5522847498307936;
				if (handle1.isOrthogonal(handle2)) {
					var pt1 = seg1._point,
						pt2 = seg2._point,
						corner = new Line(pt1, handle1, true).intersect(
								new Line(pt2, handle2, true), true);
					return corner && Numerical.isZero(handle1.getLength() /
							corner.subtract(pt1).getLength() - kappa)
						&& Numerical.isZero(handle2.getLength() /
							corner.subtract(pt2).getLength() - kappa);
				}
				return false;
			}
	
			function getDistance(i, j) {
				return segments[i]._point.getDistance(segments[j]._point);
			}
	
			if (!this.hasHandles() && segments.length === 4
					&& isCollinear(0, 2) && isCollinear(1, 3) && isOrthogonal(1)) {
				type = Shape.Rectangle;
				size = new Size(getDistance(0, 3), getDistance(0, 1));
				topCenter = segments[1]._point.add(segments[2]._point).divide(2);
			} else if (segments.length === 8 && isArc(0) && isArc(2) && isArc(4)
					&& isArc(6) && isCollinear(1, 5) && isCollinear(3, 7)) {
				type = Shape.Rectangle;
				size = new Size(getDistance(1, 6), getDistance(0, 3));
				radius = size.subtract(new Size(getDistance(0, 7),
						getDistance(1, 2))).divide(2);
				topCenter = segments[3]._point.add(segments[4]._point).divide(2);
			} else if (segments.length === 4
					&& isArc(0) && isArc(1) && isArc(2) && isArc(3)) {
				if (Numerical.isZero(getDistance(0, 2) - getDistance(1, 3))) {
					type = Shape.Circle;
					radius = getDistance(0, 2) / 2;
				} else {
					type = Shape.Ellipse;
					radius = new Size(getDistance(2, 0) / 2, getDistance(3, 1) / 2);
				}
				topCenter = segments[1]._point;
			}
	
			if (type) {
				var center = this.getPosition(true),
					shape = this._clone(new type({
						center: center,
						size: size,
						radius: radius,
						insert: false
					}), insert, false);
				shape.rotate(topCenter.subtract(center).getAngle() + 90);
				return shape;
			}
			return null;
		},
	
		_hitTestSelf: function(point, options) {
			var that = this,
				style = this.getStyle(),
				segments = this._segments,
				numSegments = segments.length,
				closed = this._closed,
				tolerancePadding = options._tolerancePadding,
				strokePadding = tolerancePadding,
				join, cap, miterLimit,
				area, loc, res,
				hitStroke = options.stroke && style.hasStroke(),
				hitFill = options.fill && style.hasFill(),
				hitCurves = options.curves,
				radius = hitStroke
						? style.getStrokeWidth() / 2
						: hitFill && options.tolerance > 0 || hitCurves
							? 0 : null;
			if (radius !== null) {
				if (radius > 0) {
					join = style.getStrokeJoin();
					cap = style.getStrokeCap();
					miterLimit = radius * style.getMiterLimit();
					strokePadding = tolerancePadding.add(new Point(radius, radius));
				} else {
					join = cap = 'round';
				}
			}
	
			function isCloseEnough(pt, padding) {
				return point.subtract(pt).divide(padding).length <= 1;
			}
	
			function checkSegmentPoint(seg, pt, name) {
				if (!options.selected || pt.isSelected()) {
					var anchor = seg._point;
					if (pt !== anchor)
						pt = pt.add(anchor);
					if (isCloseEnough(pt, strokePadding)) {
						return new HitResult(name, that, {
							segment: seg,
							point: pt
						});
					}
				}
			}
	
			function checkSegmentPoints(seg, ends) {
				return (ends || options.segments)
					&& checkSegmentPoint(seg, seg._point, 'segment')
					|| (!ends && options.handles) && (
						checkSegmentPoint(seg, seg._handleIn, 'handle-in') ||
						checkSegmentPoint(seg, seg._handleOut, 'handle-out'));
			}
	
			function addToArea(point) {
				area.add(point);
			}
	
			function checkSegmentStroke(segment) {
				if (join !== 'round' || cap !== 'round') {
					area = new Path({ internal: true, closed: true });
					if (closed || segment._index > 0
							&& segment._index < numSegments - 1) {
						if (join !== 'round' && (segment._handleIn.isZero()
								|| segment._handleOut.isZero()))
							Path._addBevelJoin(segment, join, radius, miterLimit,
									addToArea, true);
					} else if (cap !== 'round') {
						Path._addSquareCap(segment, cap, radius, addToArea, true);
					}
					if (!area.isEmpty()) {
						var loc;
						return area.contains(point)
							|| (loc = area.getNearestLocation(point))
								&& isCloseEnough(loc.getPoint(), tolerancePadding);
					}
				}
				return isCloseEnough(segment._point, strokePadding);
			}
	
			if (options.ends && !options.segments && !closed) {
				if (res = checkSegmentPoints(segments[0], true)
						|| checkSegmentPoints(segments[numSegments - 1], true))
					return res;
			} else if (options.segments || options.handles) {
				for (var i = 0; i < numSegments; i++)
					if (res = checkSegmentPoints(segments[i]))
						return res;
			}
			if (radius !== null) {
				loc = this.getNearestLocation(point);
				if (loc) {
					var parameter = loc.getParameter();
					if (parameter === 0 || parameter === 1 && numSegments > 1) {
						if (!checkSegmentStroke(loc.getSegment()))
							loc = null;
					} else if (!isCloseEnough(loc.getPoint(), strokePadding)) {
						loc = null;
					}
				}
				if (!loc && join === 'miter' && numSegments > 1) {
					for (var i = 0; i < numSegments; i++) {
						var segment = segments[i];
						if (point.getDistance(segment._point) <= miterLimit
								&& checkSegmentStroke(segment)) {
							loc = segment.getLocation();
							break;
						}
					}
				}
			}
			return !loc && hitFill && this._contains(point)
					|| loc && !hitStroke && !hitCurves
						? new HitResult('fill', this)
						: loc
							? new HitResult(hitStroke ? 'stroke' : 'curve', this, {
								location: loc,
								point: loc.getPoint()
							})
							: null;
		}
	
	}, Base.each(Curve.evaluateMethods,
		function(name) {
			this[name + 'At'] = function(offset, isParameter) {
				var loc = this.getLocationAt(offset, isParameter);
				return loc && loc[name]();
			};
		},
	{
		beans: false,
	
		getLocationOf: function() {
			var point = Point.read(arguments),
				curves = this.getCurves();
			for (var i = 0, l = curves.length; i < l; i++) {
				var loc = curves[i].getLocationOf(point);
				if (loc)
					return loc;
			}
			return null;
		},
	
		getOffsetOf: function() {
			var loc = this.getLocationOf.apply(this, arguments);
			return loc ? loc.getOffset() : null;
		},
	
		getLocationAt: function(offset, isParameter) {
			var curves = this.getCurves(),
				length = 0;
			if (isParameter) {
				var index = ~~offset,
					curve = curves[index];
				return curve ? curve.getLocationAt(offset - index, true) : null;
			}
			for (var i = 0, l = curves.length; i < l; i++) {
				var start = length,
					curve = curves[i];
				length += curve.getLength();
				if (length > offset) {
					return curve.getLocationAt(offset - start);
				}
			}
			if (curves.length > 0 && offset <= this.getLength())
				return new CurveLocation(curves[curves.length - 1], 1);
			return null;
		},
	
		getNearestLocation: function() {
			var point = Point.read(arguments),
				curves = this.getCurves(),
				minDist = Infinity,
				minLoc = null;
			for (var i = 0, l = curves.length; i < l; i++) {
				var loc = curves[i].getNearestLocation(point);
				if (loc._distance < minDist) {
					minDist = loc._distance;
					minLoc = loc;
				}
			}
			return minLoc;
		},
	
		getNearestPoint: function() {
			return this.getNearestLocation.apply(this, arguments).getPoint();
		}
	}),
	new function() {
	
		function drawHandles(ctx, segments, matrix, size) {
			var half = size / 2;
	
			function drawHandle(index) {
				var hX = coords[index],
					hY = coords[index + 1];
				if (pX != hX || pY != hY) {
					ctx.beginPath();
					ctx.moveTo(pX, pY);
					ctx.lineTo(hX, hY);
					ctx.stroke();
					ctx.beginPath();
					ctx.arc(hX, hY, half, 0, Math.PI * 2, true);
					ctx.fill();
				}
			}
	
			var coords = new Array(6);
			for (var i = 0, l = segments.length; i < l; i++) {
				var segment = segments[i];
				segment._transformCoordinates(matrix, coords, false);
				var state = segment._selectionState,
					pX = coords[0],
					pY = coords[1];
				if (state & 1)
					drawHandle(2);
				if (state & 2)
					drawHandle(4);
				ctx.fillRect(pX - half, pY - half, size, size);
				if (!(state & 4)) {
					var fillStyle = ctx.fillStyle;
					ctx.fillStyle = '#ffffff';
					ctx.fillRect(pX - half + 1, pY - half + 1, size - 2, size - 2);
					ctx.fillStyle = fillStyle;
				}
			}
		}
	
		function drawSegments(ctx, path, matrix) {
			var segments = path._segments,
				length = segments.length,
				coords = new Array(6),
				first = true,
				curX, curY,
				prevX, prevY,
				inX, inY,
				outX, outY;
	
			function drawSegment(segment) {
				if (matrix) {
					segment._transformCoordinates(matrix, coords, false);
					curX = coords[0];
					curY = coords[1];
				} else {
					var point = segment._point;
					curX = point._x;
					curY = point._y;
				}
				if (first) {
					ctx.moveTo(curX, curY);
					first = false;
				} else {
					if (matrix) {
						inX = coords[2];
						inY = coords[3];
					} else {
						var handle = segment._handleIn;
						inX = curX + handle._x;
						inY = curY + handle._y;
					}
					if (inX === curX && inY === curY
							&& outX === prevX && outY === prevY) {
						ctx.lineTo(curX, curY);
					} else {
						ctx.bezierCurveTo(outX, outY, inX, inY, curX, curY);
					}
				}
				prevX = curX;
				prevY = curY;
				if (matrix) {
					outX = coords[4];
					outY = coords[5];
				} else {
					var handle = segment._handleOut;
					outX = prevX + handle._x;
					outY = prevY + handle._y;
				}
			}
	
			for (var i = 0; i < length; i++)
				drawSegment(segments[i]);
			if (path._closed && length > 0)
				drawSegment(segments[0]);
		}
	
		return {
			_draw: function(ctx, param, strokeMatrix) {
				var dontStart = param.dontStart,
					dontPaint = param.dontFinish || param.clip,
					style = this.getStyle(),
					hasFill = style.hasFill(),
					hasStroke = style.hasStroke(),
					dashArray = style.getDashArray(),
					dashLength = !paper.support.nativeDash && hasStroke
							&& dashArray && dashArray.length;
	
				if (!dontStart)
					ctx.beginPath();
	
				if (!dontStart && this._currentPath) {
					ctx.currentPath = this._currentPath;
				} else if (hasFill || hasStroke && !dashLength || dontPaint) {
					drawSegments(ctx, this, strokeMatrix);
					if (this._closed)
						ctx.closePath();
					if (!dontStart)
						this._currentPath = ctx.currentPath;
				}
	
				function getOffset(i) {
					return dashArray[((i % dashLength) + dashLength) % dashLength];
				}
	
				if (!dontPaint && (hasFill || hasStroke)) {
					this._setStyles(ctx);
					if (hasFill) {
						ctx.fill(style.getWindingRule());
						ctx.shadowColor = 'rgba(0,0,0,0)';
					}
					if (hasStroke) {
						if (dashLength) {
							if (!dontStart)
								ctx.beginPath();
							var iterator = new PathIterator(this, 32, 0.25,
									strokeMatrix),
								length = iterator.length,
								from = -style.getDashOffset(), to,
								i = 0;
							from = from % length;
							while (from > 0) {
								from -= getOffset(i--) + getOffset(i--);
							}
							while (from < length) {
								to = from + getOffset(i++);
								if (from > 0 || to > 0)
									iterator.drawPart(ctx,
											Math.max(from, 0), Math.max(to, 0));
								from = to + getOffset(i++);
							}
						}
						ctx.stroke();
					}
				}
			},
	
			_drawSelected: function(ctx, matrix) {
				ctx.beginPath();
				drawSegments(ctx, this, matrix);
				ctx.stroke();
				drawHandles(ctx, this._segments, matrix, paper.settings.handleSize);
			}
		};
	},
	new function() {
		function getFirstControlPoints(rhs) {
			var n = rhs.length,
				x = [],
				tmp = [],
				b = 2;
			x[0] = rhs[0] / b;
			for (var i = 1; i < n; i++) {
				tmp[i] = 1 / b;
				b = (i < n - 1 ? 4 : 2) - tmp[i];
				x[i] = (rhs[i] - x[i - 1]) / b;
			}
			for (var i = 1; i < n; i++) {
				x[n - i - 1] -= tmp[n - i] * x[n - i];
			}
			return x;
		}
	
		return {
			smooth: function() {
				var segments = this._segments,
					size = segments.length,
					closed = this._closed,
					n = size,
					overlap = 0;
				if (size <= 2)
					return;
				if (closed) {
					overlap = Math.min(size, 4);
					n += Math.min(size, overlap) * 2;
				}
				var knots = [];
				for (var i = 0; i < size; i++)
					knots[i + overlap] = segments[i]._point;
				if (closed) {
					for (var i = 0; i < overlap; i++) {
						knots[i] = segments[i + size - overlap]._point;
						knots[i + size + overlap] = segments[i]._point;
					}
				} else {
					n--;
				}
				var rhs = [];
	
				for (var i = 1; i < n - 1; i++)
					rhs[i] = 4 * knots[i]._x + 2 * knots[i + 1]._x;
				rhs[0] = knots[0]._x + 2 * knots[1]._x;
				rhs[n - 1] = 3 * knots[n - 1]._x;
				var x = getFirstControlPoints(rhs);
	
				for (var i = 1; i < n - 1; i++)
					rhs[i] = 4 * knots[i]._y + 2 * knots[i + 1]._y;
				rhs[0] = knots[0]._y + 2 * knots[1]._y;
				rhs[n - 1] = 3 * knots[n - 1]._y;
				var y = getFirstControlPoints(rhs);
	
				if (closed) {
					for (var i = 0, j = size; i < overlap; i++, j++) {
						var f1 = i / overlap,
							f2 = 1 - f1,
							ie = i + overlap,
							je = j + overlap;
						x[j] = x[i] * f1 + x[j] * f2;
						y[j] = y[i] * f1 + y[j] * f2;
						x[je] = x[ie] * f2 + x[je] * f1;
						y[je] = y[ie] * f2 + y[je] * f1;
					}
					n--;
				}
				var handleIn = null;
				for (var i = overlap; i <= n - overlap; i++) {
					var segment = segments[i - overlap];
					if (handleIn)
						segment.setHandleIn(handleIn.subtract(segment._point));
					if (i < n) {
						segment.setHandleOut(
								new Point(x[i], y[i]).subtract(segment._point));
						handleIn = i < n - 1
								? new Point(
									2 * knots[i + 1]._x - x[i + 1],
									2 * knots[i + 1]._y - y[i + 1])
								: new Point(
									(knots[n]._x + x[n - 1]) / 2,
									(knots[n]._y + y[n - 1]) / 2);
					}
				}
				if (closed && handleIn) {
					var segment = this._segments[0];
					segment.setHandleIn(handleIn.subtract(segment._point));
				}
			}
		};
	},
	new function() {
		function getCurrentSegment(that) {
			var segments = that._segments;
			if (segments.length === 0)
				throw new Error('Use a moveTo() command first');
			return segments[segments.length - 1];
		}
	
		return {
			moveTo: function() {
				var segments = this._segments;
				if (segments.length === 1)
					this.removeSegment(0);
				if (!segments.length)
					this._add([ new Segment(Point.read(arguments)) ]);
			},
	
			moveBy: function() {
				throw new Error('moveBy() is unsupported on Path items.');
			},
	
			lineTo: function() {
				this._add([ new Segment(Point.read(arguments)) ]);
			},
	
			cubicCurveTo: function() {
				var handle1 = Point.read(arguments),
					handle2 = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this);
				current.setHandleOut(handle1.subtract(current._point));
				this._add([ new Segment(to, handle2.subtract(to)) ]);
			},
	
			quadraticCurveTo: function() {
				var handle = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.cubicCurveTo(
					handle.add(current.subtract(handle).multiply(1 / 3)),
					handle.add(to.subtract(handle).multiply(1 / 3)),
					to
				);
			},
	
			curveTo: function() {
				var through = Point.read(arguments),
					to = Point.read(arguments),
					t = Base.pick(Base.read(arguments), 0.5),
					t1 = 1 - t,
					current = getCurrentSegment(this)._point,
					handle = through.subtract(current.multiply(t1 * t1))
						.subtract(to.multiply(t * t)).divide(2 * t * t1);
				if (handle.isNaN())
					throw new Error(
						'Cannot put a curve through points with parameter = ' + t);
				this.quadraticCurveTo(handle, to);
			},
	
			arcTo: function() {
				var current = getCurrentSegment(this),
					from = current._point,
					to = Point.read(arguments),
					through,
					peek = Base.peek(arguments),
					clockwise = Base.pick(peek, true),
					center, extent, vector, matrix;
				if (typeof clockwise === 'boolean') {
					var middle = from.add(to).divide(2),
					through = middle.add(middle.subtract(from).rotate(
							clockwise ? -90 : 90));
				} else if (Base.remain(arguments) <= 2) {
					through = to;
					to = Point.read(arguments);
				} else {
					var radius = Size.read(arguments);
					if (radius.isZero())
						return this.lineTo(to);
					var rotation = Base.read(arguments),
						clockwise = !!Base.read(arguments),
						large = !!Base.read(arguments),
						middle = from.add(to).divide(2),
						pt = from.subtract(middle).rotate(-rotation),
						x = pt.x,
						y = pt.y,
						abs = Math.abs,
						rx = abs(radius.width),
						ry = abs(radius.height),
						rxSq = rx * rx,
						rySq = ry * ry,
						xSq =  x * x,
						ySq =  y * y;
					var factor = Math.sqrt(xSq / rxSq + ySq / rySq);
					if (factor > 1) {
						rx *= factor;
						ry *= factor;
						rxSq = rx * rx;
						rySq = ry * ry;
					}
					factor = (rxSq * rySq - rxSq * ySq - rySq * xSq) /
							(rxSq * ySq + rySq * xSq);
					if (abs(factor) < 1e-12)
						factor = 0;
					if (factor < 0)
						throw new Error(
								'Cannot create an arc with the given arguments');
					center = new Point(rx * y / ry, -ry * x / rx)
							.multiply((large === clockwise ? -1 : 1)
								* Math.sqrt(factor))
							.rotate(rotation).add(middle);
					matrix = new Matrix().translate(center).rotate(rotation)
							.scale(rx, ry);
					vector = matrix._inverseTransform(from);
					extent = vector.getDirectedAngle(matrix._inverseTransform(to));
					if (!clockwise && extent > 0)
						extent -= 360;
					else if (clockwise && extent < 0)
						extent += 360;
				}
				if (through) {
					var l1 = new Line(from.add(through).divide(2),
								through.subtract(from).rotate(90), true),
						l2 = new Line(through.add(to).divide(2),
								to.subtract(through).rotate(90), true),
						line = new Line(from, to),
						throughSide = line.getSide(through);
					center = l1.intersect(l2, true);
					if (!center) {
						if (!throughSide)
							return this.lineTo(to);
						throw new Error(
								'Cannot create an arc with the given arguments');
					}
					vector = from.subtract(center);
					extent = vector.getDirectedAngle(to.subtract(center));
					var centerSide = line.getSide(center);
					if (centerSide === 0) {
						extent = throughSide * Math.abs(extent);
					} else if (throughSide === centerSide) {
						extent += extent < 0 ? 360 : -360;
					}
				}
				var ext = Math.abs(extent),
					count = ext >= 360 ? 4 : Math.ceil(ext / 90),
					inc = extent / count,
					half = inc * Math.PI / 360,
					z = 4 / 3 * Math.sin(half) / (1 + Math.cos(half)),
					segments = [];
				for (var i = 0; i <= count; i++) {
					var pt = to,
						out = null;
					if (i < count) {
						out = vector.rotate(90).multiply(z);
						if (matrix) {
							pt = matrix._transformPoint(vector);
							out = matrix._transformPoint(vector.add(out))
									.subtract(pt);
						} else {
							pt = center.add(vector);
						}
					}
					if (i === 0) {
						current.setHandleOut(out);
					} else {
						var _in = vector.rotate(-90).multiply(z);
						if (matrix) {
							_in = matrix._transformPoint(vector.add(_in))
									.subtract(pt);
						}
						segments.push(new Segment(pt, _in, out));
					}
					vector = vector.rotate(inc);
				}
				this._add(segments);
			},
	
			lineBy: function() {
				var to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.lineTo(current.add(to));
			},
	
			curveBy: function() {
				var through = Point.read(arguments),
					to = Point.read(arguments),
					parameter = Base.read(arguments),
					current = getCurrentSegment(this)._point;
				this.curveTo(current.add(through), current.add(to), parameter);
			},
	
			cubicCurveBy: function() {
				var handle1 = Point.read(arguments),
					handle2 = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.cubicCurveTo(current.add(handle1), current.add(handle2),
						current.add(to));
			},
	
			quadraticCurveBy: function() {
				var handle = Point.read(arguments),
					to = Point.read(arguments),
					current = getCurrentSegment(this)._point;
				this.quadraticCurveTo(current.add(handle), current.add(to));
			},
	
			arcBy: function() {
				var current = getCurrentSegment(this)._point,
					point = current.add(Point.read(arguments)),
					clockwise = Base.pick(Base.peek(arguments), true);
				if (typeof clockwise === 'boolean') {
					this.arcTo(point, clockwise);
				} else {
					this.arcTo(point, current.add(Point.read(arguments)));
				}
			},
	
			closePath: function(join) {
				this.setClosed(true);
				if (join)
					this.join();
			}
		};
	}, {
	
		_getBounds: function(getter, matrix) {
			return Path[getter](this._segments, this._closed, this.getStyle(),
					matrix);
		},
	
	statics: {
		getBounds: function(segments, closed, style, matrix, strokePadding) {
			var first = segments[0];
			if (!first)
				return new Rectangle();
			var coords = new Array(6),
				prevCoords = first._transformCoordinates(matrix, new Array(6), false),
				min = prevCoords.slice(0, 2),
				max = min.slice(),
				roots = new Array(2);
	
			function processSegment(segment) {
				segment._transformCoordinates(matrix, coords, false);
				for (var i = 0; i < 2; i++) {
					Curve._addBounds(
						prevCoords[i],
						prevCoords[i + 4],
						coords[i + 2],
						coords[i],
						i, strokePadding ? strokePadding[i] : 0, min, max, roots);
				}
				var tmp = prevCoords;
				prevCoords = coords;
				coords = tmp;
			}
	
			for (var i = 1, l = segments.length; i < l; i++)
				processSegment(segments[i]);
			if (closed)
				processSegment(first);
			return new Rectangle(min[0], min[1], max[0] - min[0], max[1] - min[1]);
		},
	
		getStrokeBounds: function(segments, closed, style, matrix) {
			if (!style.hasStroke())
				return Path.getBounds(segments, closed, style, matrix);
			var length = segments.length - (closed ? 0 : 1),
				radius = style.getStrokeWidth() / 2,
				padding = Path._getPenPadding(radius, matrix),
				bounds = Path.getBounds(segments, closed, style, matrix, padding),
				join = style.getStrokeJoin(),
				cap = style.getStrokeCap(),
				miterLimit = radius * style.getMiterLimit();
			var joinBounds = new Rectangle(new Size(padding).multiply(2));
	
			function add(point) {
				bounds = bounds.include(matrix
					? matrix._transformPoint(point, point) : point);
			}
	
			function addRound(segment) {
				bounds = bounds.unite(joinBounds.setCenter(matrix
					? matrix._transformPoint(segment._point) : segment._point));
			}
	
			function addJoin(segment, join) {
				var handleIn = segment._handleIn,
					handleOut = segment._handleOut;
				if (join === 'round' || !handleIn.isZero() && !handleOut.isZero()
						&& handleIn.isCollinear(handleOut)) {
					addRound(segment);
				} else {
					Path._addBevelJoin(segment, join, radius, miterLimit, add);
				}
			}
	
			function addCap(segment, cap) {
				if (cap === 'round') {
					addRound(segment);
				} else {
					Path._addSquareCap(segment, cap, radius, add);
				}
			}
	
			for (var i = 1; i < length; i++)
				addJoin(segments[i], join);
			if (closed) {
				addJoin(segments[0], join);
			} else if (length > 0) {
				addCap(segments[0], cap);
				addCap(segments[segments.length - 1], cap);
			}
			return bounds;
		},
	
		_getPenPadding: function(radius, matrix) {
			if (!matrix)
				return [radius, radius];
			var mx = matrix.shiftless(),
				hor = mx.transform(new Point(radius, 0)),
				ver = mx.transform(new Point(0, radius)),
				phi = hor.getAngleInRadians(),
				a = hor.getLength(),
				b = ver.getLength();
			var sin = Math.sin(phi),
				cos = Math.cos(phi),
				tan = Math.tan(phi),
				tx = -Math.atan(b * tan / a),
				ty = Math.atan(b / (tan * a));
			return [Math.abs(a * Math.cos(tx) * cos - b * Math.sin(tx) * sin),
					Math.abs(b * Math.sin(ty) * cos + a * Math.cos(ty) * sin)];
		},
	
		_addBevelJoin: function(segment, join, radius, miterLimit, addPoint, area) {
			var curve2 = segment.getCurve(),
				curve1 = curve2.getPrevious(),
				point = curve2.getPointAt(0, true),
				normal1 = curve1.getNormalAt(1, true),
				normal2 = curve2.getNormalAt(0, true),
				step = normal1.getDirectedAngle(normal2) < 0 ? -radius : radius;
			normal1.setLength(step);
			normal2.setLength(step);
			if (area) {
				addPoint(point);
				addPoint(point.add(normal1));
			}
			if (join === 'miter') {
				var corner = new Line(
						point.add(normal1),
						new Point(-normal1.y, normal1.x), true
					).intersect(new Line(
						point.add(normal2),
						new Point(-normal2.y, normal2.x), true
					), true);
				if (corner && point.getDistance(corner) <= miterLimit) {
					addPoint(corner);
					if (!area)
						return;
				}
			}
			if (!area)
				addPoint(point.add(normal1));
			addPoint(point.add(normal2));
		},
	
		_addSquareCap: function(segment, cap, radius, addPoint, area) {
			var point = segment._point,
				loc = segment.getLocation(),
				normal = loc.getNormal().multiply(radius);
			if (area) {
				addPoint(point.subtract(normal));
				addPoint(point.add(normal));
			}
			if (cap === 'square')
				point = point.add(normal.rotate(loc.getParameter() === 0 ? -90 : 90));
			addPoint(point.add(normal));
			addPoint(point.subtract(normal));
		},
	
		getHandleBounds: function(segments, closed, style, matrix, strokePadding,
				joinPadding) {
			var coords = new Array(6),
				x1 = Infinity,
				x2 = -x1,
				y1 = x1,
				y2 = x2;
			for (var i = 0, l = segments.length; i < l; i++) {
				var segment = segments[i];
				segment._transformCoordinates(matrix, coords, false);
				for (var j = 0; j < 6; j += 2) {
					var padding = j === 0 ? joinPadding : strokePadding,
						paddingX = padding ? padding[0] : 0,
						paddingY = padding ? padding[1] : 0,
						x = coords[j],
						y = coords[j + 1],
						xn = x - paddingX,
						xx = x + paddingX,
						yn = y - paddingY,
						yx = y + paddingY;
					if (xn < x1) x1 = xn;
					if (xx > x2) x2 = xx;
					if (yn < y1) y1 = yn;
					if (yx > y2) y2 = yx;
				}
			}
			return new Rectangle(x1, y1, x2 - x1, y2 - y1);
		},
	
		getRoughBounds: function(segments, closed, style, matrix) {
			var strokeRadius = style.hasStroke() ? style.getStrokeWidth() / 2 : 0,
				joinRadius = strokeRadius;
			if (strokeRadius > 0) {
				if (style.getStrokeJoin() === 'miter')
					joinRadius = strokeRadius * style.getMiterLimit();
				if (style.getStrokeCap() === 'square')
					joinRadius = Math.max(joinRadius, strokeRadius * Math.sqrt(2));
			}
			return Path.getHandleBounds(segments, closed, style, matrix,
					Path._getPenPadding(strokeRadius, matrix),
					Path._getPenPadding(joinRadius, matrix));
		}
	}});
	
	Path.inject({ statics: new function() {
	
		var kappa = 0.5522847498307936,
			ellipseSegments = [
				new Segment([-1, 0], [0, kappa ], [0, -kappa]),
				new Segment([0, -1], [-kappa, 0], [kappa, 0 ]),
				new Segment([1, 0], [0, -kappa], [0, kappa ]),
				new Segment([0, 1], [kappa, 0 ], [-kappa, 0])
			];
	
		function createPath(segments, closed, args) {
			var props = Base.getNamed(args),
				path = new Path(props && props.insert === false && Item.NO_INSERT);
			path._add(segments);
			path._closed = closed;
			return path.set(props);
		}
	
		function createEllipse(center, radius, args) {
			var segments = new Array(4);
			for (var i = 0; i < 4; i++) {
				var segment = ellipseSegments[i];
				segments[i] = new Segment(
					segment._point.multiply(radius).add(center),
					segment._handleIn.multiply(radius),
					segment._handleOut.multiply(radius)
				);
			}
			return createPath(segments, true, args);
		}
	
		return {
			Line: function() {
				return createPath([
					new Segment(Point.readNamed(arguments, 'from')),
					new Segment(Point.readNamed(arguments, 'to'))
				], false, arguments);
			},
	
			Circle: function() {
				var center = Point.readNamed(arguments, 'center'),
					radius = Base.readNamed(arguments, 'radius');
				return createEllipse(center, new Size(radius), arguments);
			},
	
			Rectangle: function() {
				var rect = Rectangle.readNamed(arguments, 'rectangle'),
					radius = Size.readNamed(arguments, 'radius', 0,
							{ readNull: true }),
					bl = rect.getBottomLeft(true),
					tl = rect.getTopLeft(true),
					tr = rect.getTopRight(true),
					br = rect.getBottomRight(true),
					segments;
				if (!radius || radius.isZero()) {
					segments = [
						new Segment(bl),
						new Segment(tl),
						new Segment(tr),
						new Segment(br)
					];
				} else {
					radius = Size.min(radius, rect.getSize(true).divide(2));
					var rx = radius.width,
						ry = radius.height,
						hx = rx * kappa,
						hy = ry * kappa;
					segments = [
						new Segment(bl.add(rx, 0), null, [-hx, 0]),
						new Segment(bl.subtract(0, ry), [0, hy]),
						new Segment(tl.add(0, ry), null, [0, -hy]),
						new Segment(tl.add(rx, 0), [-hx, 0], null),
						new Segment(tr.subtract(rx, 0), null, [hx, 0]),
						new Segment(tr.add(0, ry), [0, -hy], null),
						new Segment(br.subtract(0, ry), null, [0, hy]),
						new Segment(br.subtract(rx, 0), [hx, 0])
					];
				}
				return createPath(segments, true, arguments);
			},
	
			RoundRectangle: '#Rectangle',
	
			Ellipse: function() {
				var ellipse = Shape._readEllipse(arguments);
				return createEllipse(ellipse.center, ellipse.radius, arguments);
			},
	
			Oval: '#Ellipse',
	
			Arc: function() {
				var from = Point.readNamed(arguments, 'from'),
					through = Point.readNamed(arguments, 'through'),
					to = Point.readNamed(arguments, 'to'),
					props = Base.getNamed(arguments),
					path = new Path(props && props.insert === false
							&& Item.NO_INSERT);
				path.moveTo(from);
				path.arcTo(through, to);
				return path.set(props);
			},
	
			RegularPolygon: function() {
				var center = Point.readNamed(arguments, 'center'),
					sides = Base.readNamed(arguments, 'sides'),
					radius = Base.readNamed(arguments, 'radius'),
					step = 360 / sides,
					three = !(sides % 3),
					vector = new Point(0, three ? -radius : radius),
					offset = three ? -1 : 0.5,
					segments = new Array(sides);
				for (var i = 0; i < sides; i++)
					segments[i] = new Segment(center.add(
						vector.rotate((i + offset) * step)));
				return createPath(segments, true, arguments);
			},
	
			Star: function() {
				var center = Point.readNamed(arguments, 'center'),
					points = Base.readNamed(arguments, 'points') * 2,
					radius1 = Base.readNamed(arguments, 'radius1'),
					radius2 = Base.readNamed(arguments, 'radius2'),
					step = 360 / points,
					vector = new Point(0, -1),
					segments = new Array(points);
				for (var i = 0; i < points; i++)
					segments[i] = new Segment(center.add(vector.rotate(step * i)
							.multiply(i % 2 ? radius2 : radius1)));
				return createPath(segments, true, arguments);
			}
		};
	}});
	
	var CompoundPath = PathItem.extend({
		_class: 'CompoundPath',
		_serializeFields: {
			children: []
		},
	
		initialize: function CompoundPath(arg) {
			this._children = [];
			this._namedChildren = {};
			if (!this._initialize(arg)) {
				if (typeof arg === 'string') {
					this.setPathData(arg);
				} else {
					this.addChildren(Array.isArray(arg) ? arg : arguments);
				}
			}
		},
	
		insertChildren: function insertChildren(index, items, _preserve) {
			for (var i = items.length - 1; i >= 0; i--) {
				var item = items[i];
				if (item instanceof CompoundPath) {
					items.splice.apply(items, [i, 1].concat(item.removeChildren()));
					item.remove();
				}
			}
			items = insertChildren.base.call(this, index, items, _preserve, Path);
			for (var i = 0, l = !_preserve && items && items.length; i < l; i++) {
				var item = items[i];
				if (item._clockwise === undefined)
					item.setClockwise(item._index === 0);
			}
			return items;
		},
	
		reverse: function() {
			var children = this._children;
			for (var i = 0, l = children.length; i < l; i++)
				children[i].reverse();
		},
	
		smooth: function() {
			for (var i = 0, l = this._children.length; i < l; i++)
				this._children[i].smooth();
		},
	
		reduce: function reduce() {
			var children = this._children;
			for (var i = children.length - 1; i >= 0; i--) {
				var path = children[i].reduce();
				if (path.isEmpty())
					children.splice(i, 1);
			}
			if (children.length === 0) {
				var path = new Path(Item.NO_INSERT);
				path.insertAbove(this);
				path.setStyle(this._style);
				this.remove();
				return path;
			}
			return reduce.base.call(this);
		},
	
		isClockwise: function() {
			var child = this.getFirstChild();
			return child && child.isClockwise();
		},
	
		setClockwise: function(clockwise) {
			if (this.isClockwise() !== !!clockwise)
				this.reverse();
		},
	
		getFirstSegment: function() {
			var first = this.getFirstChild();
			return first && first.getFirstSegment();
		},
	
		getLastSegment: function() {
			var last = this.getLastChild();
			return last && last.getLastSegment();
		},
	
		getCurves: function() {
			var children = this._children,
				curves = [];
			for (var i = 0, l = children.length; i < l; i++)
				curves.push.apply(curves, children[i].getCurves());
			return curves;
		},
	
		getFirstCurve: function() {
			var first = this.getFirstChild();
			return first && first.getFirstCurve();
		},
	
		getLastCurve: function() {
			var last = this.getLastChild();
			return last && last.getFirstCurve();
		},
	
		getArea: function() {
			var children = this._children,
				area = 0;
			for (var i = 0, l = children.length; i < l; i++)
				area += children[i].getArea();
			return area;
		}
	}, {
		beans: true,
	
		getPathData: function(_matrix, _precision) {
			var children = this._children,
				paths = [];
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i],
					mx = child._matrix;
				paths.push(child.getPathData(_matrix && !mx.isIdentity()
						? _matrix.chain(mx) : _matrix, _precision));
			}
			return paths.join(' ');
		}
	}, {
		_getChildHitTestOptions: function(options) {
			return options.class === Path || options.type === 'path'
					? options
					: new Base(options, { fill: false });
		},
	
		_draw: function(ctx, param, strokeMatrix) {
			var children = this._children;
			if (children.length === 0)
				return;
	
			if (this._currentPath) {
				ctx.currentPath = this._currentPath;
			} else {
				param = param.extend({ dontStart: true, dontFinish: true });
				ctx.beginPath();
				for (var i = 0, l = children.length; i < l; i++)
					children[i].draw(ctx, param, strokeMatrix);
				this._currentPath = ctx.currentPath;
			}
	
			if (!param.clip) {
				this._setStyles(ctx);
				var style = this._style;
				if (style.hasFill()) {
					ctx.fill(style.getWindingRule());
					ctx.shadowColor = 'rgba(0,0,0,0)';
				}
				if (style.hasStroke())
					ctx.stroke();
			}
		},
	
		_drawSelected: function(ctx, matrix, selectedItems) {
			var children = this._children;
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i],
					mx = child._matrix;
				if (!selectedItems[child._id])
					child._drawSelected(ctx, mx.isIdentity() ? matrix
							: matrix.chain(mx));
			}
		}
	},
	new function() {
		function getCurrentPath(that, check) {
			var children = that._children;
			if (check && children.length === 0)
				throw new Error('Use a moveTo() command first');
			return children[children.length - 1];
		}
	
		var fields = {
			moveTo: function() {
				var current = getCurrentPath(this),
					path = current && current.isEmpty() ? current
							: new Path(Item.NO_INSERT);
				if (path !== current)
					this.addChild(path);
				path.moveTo.apply(path, arguments);
			},
	
			moveBy: function() {
				var current = getCurrentPath(this, true),
					last = current && current.getLastSegment(),
					point = Point.read(arguments);
				this.moveTo(last ? point.add(last._point) : point);
			},
	
			closePath: function(join) {
				getCurrentPath(this, true).closePath(join);
			}
		};
	
		Base.each(['lineTo', 'cubicCurveTo', 'quadraticCurveTo', 'curveTo', 'arcTo',
				'lineBy', 'cubicCurveBy', 'quadraticCurveBy', 'curveBy', 'arcBy'],
				function(key) {
					fields[key] = function() {
						var path = getCurrentPath(this, true);
						path[key].apply(path, arguments);
					};
				}
		);
	
		return fields;
	});
	
	PathItem.inject(new function() {
		var operators = {
			unite: function(w) {
				return w === 1 || w === 0;
			},
	
			intersect: function(w) {
				return w === 2;
			},
	
			subtract: function(w) {
				return w === 1;
			},
	
			exclude: function(w) {
				return w === 1;
			}
		};
	
		function preparePath(path, resolve) {
			var res = path.clone(false).reduce().transform(null, true, true);
			return resolve ? res.resolveCrossings().reorient() : res;
		}
	
		function finishBoolean(ctor, paths, path1, path2, reduce) {
			var result = new ctor(Item.NO_INSERT);
			result.addChildren(paths, true);
			if (reduce)
				result = result.reduce();
			result.insertAbove(path2 && path1.isSibling(path2)
					&& path1.getIndex() < path2.getIndex()
						? path2 : path1);
			result.setStyle(path1._style);
			return result;
		}
	
		function computeBoolean(path1, path2, operation) {
			if (!path1._children && !path1._closed)
				return computeOpenBoolean(path1, path2, operation);
			var _path1 = preparePath(path1, true),
				_path2 = path2 && path1 !== path2 && preparePath(path2, true);
			if (_path2 && /^(subtract|exclude)$/.test(operation)
					^ (_path2.isClockwise() !== _path1.isClockwise()))
				_path2.reverse();
			var intersections = CurveLocation.expand(
				_path1.getIntersections(_path2, function(inter) {
					return _path2 && inter.isOverlap() || inter.isCrossing();
				})
			);
			divideLocations(intersections);
	
			var segments = [],
				monoCurves = [];
	
			function collect(paths) {
				for (var i = 0, l = paths.length; i < l; i++) {
					var path = paths[i];
					segments.push.apply(segments, path._segments);
					monoCurves.push.apply(monoCurves, path._getMonoCurves());
				}
			}
	
			collect(_path1._children || [_path1]);
			if (_path2)
				collect(_path2._children || [_path2]);
			for (var i = 0, l = intersections.length; i < l; i++) {
				propagateWinding(intersections[i]._segment, _path1, _path2,
						monoCurves, operation);
			}
			for (var i = 0, l = segments.length; i < l; i++) {
				var segment = segments[i];
				if (segment._winding == null) {
					propagateWinding(segment, _path1, _path2, monoCurves,
							operation);
				}
			}
			return finishBoolean(CompoundPath, tracePaths(segments, operation),
					path1, path2, true);
		}
	
		function computeOpenBoolean(path1, path2, operation) {
			if (!path2 || !path2._children && !path2._closed
					|| !/^(subtract|intersect)$/.test(operation))
				return null;
			var _path1 = preparePath(path1, false),
				_path2 = preparePath(path2, false),
				intersections = _path1.getIntersections(_path2, function(inter) {
					return inter.isOverlap() || inter.isCrossing();
				}),
				sub = operation === 'subtract',
				paths = [];
	
			function addPath(path) {
				if (_path2.contains(path.getPointAt(path.getLength() / 2)) ^ sub) {
					paths.unshift(path);
					return true;
				}
			}
	
			for (var i = intersections.length - 1; i >= 0; i--) {
				var path = intersections[i].split();
				if (path) {
					if (addPath(path))
						path.getFirstSegment().setHandleIn(0, 0);
					_path1.getLastSegment().setHandleOut(0, 0);
				}
			}
			addPath(_path1);
			return finishBoolean(Group, paths, path1, path2);
		}
	
		function linkIntersections(from, to) {
			var prev = from;
			while (prev) {
				if (prev === to)
					return;
				prev = prev._prev;
			}
			while (from._next && from._next !== to)
				from = from._next;
			if (!from._next) {
				while (to._prev)
					to = to._prev;
				from._next = to;
				to._prev = from;
			}
		}
	
		function divideLocations(locations) {
			var tMin = 4e-7,
				tMax = 1 - tMin,
				noHandles = false,
				clearSegments = [],
				prevCurve,
				prevT;
	
			for (var i = locations.length - 1; i >= 0; i--) {
				var loc = locations[i],
					curve = loc._curve,
					t = loc._parameter,
					origT = t;
				if (curve !== prevCurve) {
					noHandles = !curve.hasHandles();
				} else if (prevT > 0) {
					t /= prevT;
				}
				var segment;
				if (t < tMin) {
					segment = curve._segment1;
				} else if (t > tMax) {
					segment = curve._segment2;
				} else {
					segment = curve.divide(t, true, true)._segment1;
					if (noHandles)
						clearSegments.push(segment);
				}
				loc._setSegment(segment);
				var inter = segment._intersection,
					dest = loc._intersection;
				if (inter) {
					linkIntersections(inter, dest);
					var other = inter;
					while (other) {
						linkIntersections(other._intersection, inter);
						other = other._next;
					}
				} else {
					segment._intersection = dest;
				}
				prevCurve = curve;
				prevT = origT;
			}
			for (var i = 0, l = clearSegments.length; i < l; i++) {
				clearSegments[i].clearHandles();
			}
		}
	
		function getWinding(point, curves, horizontal, testContains) {
			var epsilon = 2e-7,
				tMin = 4e-7,
				tMax = 1 - tMin,
				px = point.x,
				py = point.y,
				windLeft = 0,
				windRight = 0,
				roots = [],
				abs = Math.abs;
			if (horizontal) {
				var yTop = -Infinity,
					yBottom = Infinity,
					yBefore = py - epsilon,
					yAfter = py + epsilon;
				for (var i = 0, l = curves.length; i < l; i++) {
					var values = curves[i].values;
					if (Curve.solveCubic(values, 0, px, roots, 0, 1) > 0) {
						for (var j = roots.length - 1; j >= 0; j--) {
							var y = Curve.getPoint(values, roots[j]).y;
							if (y < yBefore && y > yTop) {
								yTop = y;
							} else if (y > yAfter && y < yBottom) {
								yBottom = y;
							}
						}
					}
				}
				yTop = (yTop + py) / 2;
				yBottom = (yBottom + py) / 2;
				if (yTop > -Infinity)
					windLeft = getWinding(new Point(px, yTop), curves, false,
							testContains);
				if (yBottom < Infinity)
					windRight = getWinding(new Point(px, yBottom), curves, false,
							testContains);
			} else {
				var xBefore = px - epsilon,
					xAfter = px + epsilon;
				var startCounted = false,
					prevCurve,
					prevT;
				for (var i = 0, l = curves.length; i < l; i++) {
					var curve = curves[i],
						values = curve.values,
						winding = curve.winding;
					if (winding && (winding === 1
							&& py >= values[1] && py <= values[7]
							|| py >= values[7] && py <= values[1])
						&& Curve.solveCubic(values, 1, py, roots, 0, 1) === 1) {
						var t = roots[0];
						if (!(
							t > tMax && startCounted && curve.next !== curves[i + 1]
							|| t < tMin && prevT > tMax
								&& curve.previous === prevCurve)) {
							var x = Curve.getPoint(values, t).x,
								slope = Curve.getTangent(values, t).y,
								counted = false;
							if (Numerical.isZero(slope) && !Curve.isStraight(values)
									|| t < tMin && slope * Curve.getTangent(
										curve.previous.values, 1).y < 0
									|| t > tMax && slope * Curve.getTangent(
										curve.next.values, 0).y < 0) {
								if (testContains && x >= xBefore && x <= xAfter) {
									++windLeft;
									++windRight;
									counted = true;
								}
							} else if (x <= xBefore) {
								windLeft += winding;
								counted = true;
							} else if (x >= xAfter) {
								windRight += winding;
								counted = true;
							}
							if (curve.previous !== curves[i - 1])
								startCounted = t < tMin && counted;
						}
						prevCurve = curve;
						prevT = t;
					}
				}
			}
			return Math.max(abs(windLeft), abs(windRight));
		}
	
		function propagateWinding(segment, path1, path2, monoCurves, operation) {
			var epsilon = 2e-7,
				chain = [],
				start = segment,
				totalLength = 0,
				windingSum = 0;
			do {
				var curve = segment.getCurve(),
					length = curve.getLength();
				chain.push({ segment: segment, curve: curve, length: length });
				totalLength += length;
				segment = segment.getNext();
			} while (segment && !segment._intersection && segment !== start);
			for (var i = 0; i < 3; i++) {
				var length = totalLength * (i + 1) / 4;
				for (var k = 0, m = chain.length; k < m; k++) {
					var node = chain[k],
						curveLength = node.length;
					if (length <= curveLength) {
						if (length < epsilon || curveLength - length < epsilon)
							length = curveLength / 2;
						var curve = node.curve,
							path = curve._path,
							parent = path._parent,
							pt = curve.getPointAt(length),
							hor = curve.isHorizontal();
						if (parent instanceof CompoundPath)
							path = parent;
						windingSum += operation === 'subtract' && path2
							&& (path === path1 && path2._getWinding(pt, hor)
							|| path === path2 && !path1._getWinding(pt, hor))
							? 0
							: getWinding(pt, monoCurves, hor);
						break;
					}
					length -= curveLength;
				}
			}
			var winding = Math.round(windingSum / 3);
			for (var j = chain.length - 1; j >= 0; j--)
				chain[j].segment._winding = winding;
		}
	
		function tracePaths(segments, operation) {
			var paths = [],
				start,
				otherStart,
				operator = operators[operation],
				overlapWinding = {
					unite: { 1: 2 },
					intersect: { 2: 1 }
				}[operation];
	
			function isValid(seg, adjusted) {
				if (seg._visited)
					return false;
				if (!operator)
					return true;
				var winding = seg._winding,
					inter = seg._intersection;
				if (inter && adjusted && overlapWinding && inter.isOverlap())
					winding = overlapWinding[winding] || winding;
				return operator(winding);
			}
	
			function isStart(seg) {
				return seg === start || seg === otherStart;
			}
	
			function findBestIntersection(inter, strict) {
				if (!inter._next)
					return inter;
				while (inter) {
					var seg = inter._segment,
						nextSeg = seg.getNext(),
						nextInter = nextSeg._intersection;
					if (isStart(nextSeg)
						|| !seg._visited && !nextSeg._visited
						&& (!operator
							|| (!strict || isValid(seg))
							&& (!(strict && nextInter && nextInter.isOverlap())
								&& isValid(nextSeg)
								|| !strict && nextInter
								&& isValid(nextInter._segment))
						))
						return inter;
					inter = inter._next;
				}
				return null;
			}
	
			function findStartSegment(inter, next) {
				while (inter) {
					var seg = inter._segment;
					if (isStart(seg))
						return seg;
					inter = inter[next ? '_next' : '_prev'];
				}
			}
	
			for (var i = 0, l = segments.length; i < l; i++) {
				var seg = segments[i],
					path = null,
					finished = false;
				if (!isValid(seg, true))
					continue;
				start = otherStart = null;
				while (!finished) {
					var inter = seg._intersection,
						handleIn = path && seg._handleIn;
					inter = inter && (findBestIntersection(inter, true)
							|| findBestIntersection(inter, false)) || inter;
					var other = inter && inter._segment;
					if (other && isValid(other))
						seg = other;
					if (seg._visited) {
						finished = isStart(seg);
						if (!finished && inter) {
							var found = findStartSegment(inter, true)
								|| findStartSegment(inter, false);
							if (found) {
								seg = found;
								finished = true;
							}
						}
						break;
					}
					if (!path) {
						path = new Path(Item.NO_INSERT);
						start = seg;
						otherStart = other;
					}
					path.add(new Segment(seg._point, handleIn, seg._handleOut));
					seg._visited = true;
					seg = seg.getNext();
					finished = isStart(seg);
				}
				if (finished) {
					path.firstSegment.setHandleIn(seg._handleIn);
					path.setClosed(true);
				} else if (path) {
					console.error('Boolean operation resulted in open path',
							'segments =', path._segments.length,
							'length =', path.getLength());
					path = null;
				}
				if (path && (path._segments.length > 8
						|| !Numerical.isZero(path.getArea()))) {
					paths.push(path);
					path = null;
				}
			}
			return paths;
		}
	
		return {
			_getWinding: function(point, horizontal, testContains) {
				return getWinding(point, this._getMonoCurves(),
						horizontal, testContains);
			},
	
			unite: function(path) {
				return computeBoolean(this, path, 'unite');
			},
	
			intersect: function(path) {
				return computeBoolean(this, path, 'intersect');
			},
	
			subtract: function(path) {
				return computeBoolean(this, path, 'subtract');
			},
	
			exclude: function(path) {
				return computeBoolean(this, path, 'exclude');
			},
	
			divide: function(path) {
				return finishBoolean(Group,
						[this.subtract(path), this.intersect(path)],
						this, path, true);
			},
	
			resolveCrossings: function() {
				var crossings = this.getCrossings();
				if (!crossings.length)
					return this;
				divideLocations(CurveLocation.expand(crossings));
				var paths = this._children || [this],
					segments = [];
				for (var i = 0, l = paths.length; i < l; i++) {
					segments.push.apply(segments, paths[i]._segments);
				}
				return finishBoolean(CompoundPath, tracePaths(segments),
						this, null, false);
			}
		};
	});
	
	Path.inject({
		_getMonoCurves: function() {
			var monoCurves = this._monoCurves,
				prevCurve;
	
			function insertCurve(v) {
				var y0 = v[1],
					y1 = v[7],
					curve = {
						values: v,
						winding: y0 === y1
							? 0
							: y0 > y1
								? -1
								: 1,
						previous: prevCurve,
						next: null
					};
				if (prevCurve)
					prevCurve.next = curve;
				monoCurves.push(curve);
				prevCurve = curve;
			}
	
			function handleCurve(v) {
				if (Curve.getLength(v) === 0)
					return;
				var y0 = v[1],
					y1 = v[3],
					y2 = v[5],
					y3 = v[7];
				if (Curve.isStraight(v)) {
					insertCurve(v);
				} else {
					var a = 3 * (y1 - y2) - y0 + y3,
						b = 2 * (y0 + y2) - 4 * y1,
						c = y1 - y0,
						tMin = 4e-7,
						tMax = 1 - tMin,
						roots = [],
						n = Numerical.solveQuadratic(a, b, c, roots, tMin, tMax);
					if (n === 0) {
						insertCurve(v);
					} else {
						roots.sort();
						var t = roots[0],
							parts = Curve.subdivide(v, t);
						insertCurve(parts[0]);
						if (n > 1) {
							t = (roots[1] - t) / (1 - t);
							parts = Curve.subdivide(parts[1], t);
							insertCurve(parts[0]);
						}
						insertCurve(parts[1]);
					}
				}
			}
	
			if (!monoCurves) {
				monoCurves = this._monoCurves = [];
				var curves = this.getCurves(),
					segments = this._segments;
				for (var i = 0, l = curves.length; i < l; i++)
					handleCurve(curves[i].getValues());
				if (!this._closed && segments.length > 1) {
					var p1 = segments[segments.length - 1]._point,
						p2 = segments[0]._point,
						p1x = p1._x, p1y = p1._y,
						p2x = p2._x, p2y = p2._y;
					handleCurve([p1x, p1y, p1x, p1y, p2x, p2y, p2x, p2y]);
				}
				if (monoCurves.length > 0) {
					var first = monoCurves[0],
						last = monoCurves[monoCurves.length - 1];
					first.previous = last;
					last.next = first;
				}
			}
			return monoCurves;
		},
	
		getInteriorPoint: function() {
			var bounds = this.getBounds(),
				point = bounds.getCenter(true);
			if (!this.contains(point)) {
				var curves = this._getMonoCurves(),
					roots = [],
					y = point.y,
					xIntercepts = [];
				for (var i = 0, l = curves.length; i < l; i++) {
					var values = curves[i].values;
					if ((curves[i].winding === 1
							&& y >= values[1] && y <= values[7]
							|| y >= values[7] && y <= values[1])
							&& Curve.solveCubic(values, 1, y, roots, 0, 1) > 0) {
						for (var j = roots.length - 1; j >= 0; j--)
							xIntercepts.push(Curve.getPoint(values, roots[j]).x);
					}
					if (xIntercepts.length > 1)
						break;
				}
				point.x = (xIntercepts[0] + xIntercepts[1]) / 2;
			}
			return point;
		},
	
		reorient: function() {
			this.setClockwise(true);
			return this;
		}
	});
	
	CompoundPath.inject({
		_getMonoCurves: function() {
			var children = this._children,
				monoCurves = [];
			for (var i = 0, l = children.length; i < l; i++)
				monoCurves.push.apply(monoCurves, children[i]._getMonoCurves());
			return monoCurves;
		},
	
		reorient: function() {
			var children = this.removeChildren().sort(function(a, b) {
				return b.getBounds().getArea() - a.getBounds().getArea();
			});
			if (children.length > 0) {
				this.addChildren(children);
				var clockwise = children[0].isClockwise();
				for (var i = 1, l = children.length; i < l; i++) {
					var point = children[i].getInteriorPoint(),
						counters = 0;
					for (var j = i - 1; j >= 0; j--) {
						if (children[j].contains(point))
							counters++;
					}
					children[i].setClockwise(counters % 2 === 0 && clockwise);
				}
			}
			return this;
		}
	});
	
	var PathIterator = Base.extend({
		_class: 'PathIterator',
	
		initialize: function(path, maxRecursion, tolerance, matrix) {
			var curves = [],
				parts = [],
				length = 0,
				minDifference = 1 / (maxRecursion || 32),
				segments = path._segments,
				segment1 = segments[0],
				segment2;
	
			function addCurve(segment1, segment2) {
				var curve = Curve.getValues(segment1, segment2, matrix);
				curves.push(curve);
				computeParts(curve, segment1._index, 0, 1);
			}
	
			function computeParts(curve, index, minT, maxT) {
				if ((maxT - minT) > minDifference
						&& !Curve.isFlatEnough(curve, tolerance || 0.25)) {
					var split = Curve.subdivide(curve, 0.5),
						halfT = (minT + maxT) / 2;
					computeParts(split[0], index, minT, halfT);
					computeParts(split[1], index, halfT, maxT);
				} else {
					var x = curve[6] - curve[0],
						y = curve[7] - curve[1],
						dist = Math.sqrt(x * x + y * y);
					if (dist > 1e-6) {
						length += dist;
						parts.push({
							offset: length,
							value: maxT,
							index: index
						});
					}
				}
			}
	
			for (var i = 1, l = segments.length; i < l; i++) {
				segment2 = segments[i];
				addCurve(segment1, segment2);
				segment1 = segment2;
			}
			if (path._closed)
				addCurve(segment2, segments[0]);
	
			this.curves = curves;
			this.parts = parts;
			this.length = length;
			this.index = 0;
		},
	
		getParameterAt: function(offset) {
			var i, j = this.index;
			for (;;) {
				i = j;
				if (j == 0 || this.parts[--j].offset < offset)
					break;
			}
			for (var l = this.parts.length; i < l; i++) {
				var part = this.parts[i];
				if (part.offset >= offset) {
					this.index = i;
					var prev = this.parts[i - 1];
					var prevVal = prev && prev.index == part.index ? prev.value : 0,
						prevLen = prev ? prev.offset : 0;
					return {
						value: prevVal + (part.value - prevVal)
							* (offset - prevLen) / (part.offset - prevLen),
						index: part.index
					};
				}
			}
			var part = this.parts[this.parts.length - 1];
			return {
				value: 1,
				index: part.index
			};
		},
	
		drawPart: function(ctx, from, to) {
			from = this.getParameterAt(from);
			to = this.getParameterAt(to);
			for (var i = from.index; i <= to.index; i++) {
				var curve = Curve.getPart(this.curves[i],
						i == from.index ? from.value : 0,
						i == to.index ? to.value : 1);
				if (i == from.index)
					ctx.moveTo(curve[0], curve[1]);
				ctx.bezierCurveTo.apply(ctx, curve.slice(2));
			}
		}
	}, Base.each(Curve.evaluateMethods,
		function(name) {
			this[name + 'At'] = function(offset, weighted) {
				var param = this.getParameterAt(offset);
				return Curve[name](this.curves[param.index], param.value, weighted);
			};
		}, {})
	);
	
	var PathFitter = Base.extend({
		initialize: function(path, error) {
			var points = this.points = [],
				segments = path._segments,
				prev;
			for (var i = 0, l = segments.length; i < l; i++) {
				var point = segments[i].point.clone();
				if (!prev || !prev.equals(point)) {
					points.push(point);
					prev = point;
				}
			}
	
			if (path._closed) {
				this.closed = true;
				points.unshift(points[points.length - 1]);
				points.push(points[1]);
			}
	
			this.error = error;
		},
	
		fit: function() {
			var points = this.points,
				length = points.length,
				segments = this.segments = length > 0
						? [new Segment(points[0])] : [];
			if (length > 1)
				this.fitCubic(0, length - 1,
					points[1].subtract(points[0]).normalize(),
					points[length - 2].subtract(points[length - 1]).normalize());
	
			if (this.closed) {
				segments.shift();
				segments.pop();
			}
	
			return segments;
		},
	
		fitCubic: function(first, last, tan1, tan2) {
			if (last - first == 1) {
				var pt1 = this.points[first],
					pt2 = this.points[last],
					dist = pt1.getDistance(pt2) / 3;
				this.addCurve([pt1, pt1.add(tan1.normalize(dist)),
						pt2.add(tan2.normalize(dist)), pt2]);
				return;
			}
			var uPrime = this.chordLengthParameterize(first, last),
				maxError = Math.max(this.error, this.error * this.error),
				split,
				parametersInOrder = true;
			for (var i = 0; i <= 4; i++) {
				var curve = this.generateBezier(first, last, uPrime, tan1, tan2);
				var max = this.findMaxError(first, last, curve, uPrime);
				if (max.error < this.error && parametersInOrder) {
					this.addCurve(curve);
					return;
				}
				split = max.index;
				if (max.error >= maxError)
					break;
				parametersInOrder = this.reparameterize(first, last, uPrime, curve);
				maxError = max.error;
			}
			var V1 = this.points[split - 1].subtract(this.points[split]),
				V2 = this.points[split].subtract(this.points[split + 1]),
				tanCenter = V1.add(V2).divide(2).normalize();
			this.fitCubic(first, split, tan1, tanCenter);
			this.fitCubic(split, last, tanCenter.negate(), tan2);
		},
	
		addCurve: function(curve) {
			var prev = this.segments[this.segments.length - 1];
			prev.setHandleOut(curve[1].subtract(curve[0]));
			this.segments.push(
					new Segment(curve[3], curve[2].subtract(curve[3])));
		},
	
		generateBezier: function(first, last, uPrime, tan1, tan2) {
			var epsilon = 1e-12,
				pt1 = this.points[first],
				pt2 = this.points[last],
				C = [[0, 0], [0, 0]],
				X = [0, 0];
	
			for (var i = 0, l = last - first + 1; i < l; i++) {
				var u = uPrime[i],
					t = 1 - u,
					b = 3 * u * t,
					b0 = t * t * t,
					b1 = b * t,
					b2 = b * u,
					b3 = u * u * u,
					a1 = tan1.normalize(b1),
					a2 = tan2.normalize(b2),
					tmp = this.points[first + i]
						.subtract(pt1.multiply(b0 + b1))
						.subtract(pt2.multiply(b2 + b3));
				C[0][0] += a1.dot(a1);
				C[0][1] += a1.dot(a2);
				C[1][0] = C[0][1];
				C[1][1] += a2.dot(a2);
				X[0] += a1.dot(tmp);
				X[1] += a2.dot(tmp);
			}
	
			var detC0C1 = C[0][0] * C[1][1] - C[1][0] * C[0][1],
				alpha1, alpha2;
			if (Math.abs(detC0C1) > epsilon) {
				var detC0X	= C[0][0] * X[1]	- C[1][0] * X[0],
					detXC1	= X[0]	  * C[1][1] - X[1]	  * C[0][1];
				alpha1 = detXC1 / detC0C1;
				alpha2 = detC0X / detC0C1;
			} else {
				var c0 = C[0][0] + C[0][1],
					c1 = C[1][0] + C[1][1];
				if (Math.abs(c0) > epsilon) {
					alpha1 = alpha2 = X[0] / c0;
				} else if (Math.abs(c1) > epsilon) {
					alpha1 = alpha2 = X[1] / c1;
				} else {
					alpha1 = alpha2 = 0;
				}
			}
	
			var segLength = pt2.getDistance(pt1),
				eps = epsilon * segLength,
				handle1,
				handle2;
			if (alpha1 < eps || alpha2 < eps) {
				alpha1 = alpha2 = segLength / 3;
			} else {
				var line = pt2.subtract(pt1);
				handle1 = tan1.normalize(alpha1);
				handle2 = tan2.normalize(alpha2);
				if (handle1.dot(line) - handle2.dot(line) > segLength * segLength) {
					alpha1 = alpha2 = segLength / 3;
					handle1 = handle2 = null;
				}
			}
	
			return [pt1, pt1.add(handle1 || tan1.normalize(alpha1)),
					pt2.add(handle2 || tan2.normalize(alpha2)), pt2];
		},
	
		reparameterize: function(first, last, u, curve) {
			for (var i = first; i <= last; i++) {
				u[i - first] = this.findRoot(curve, this.points[i], u[i - first]);
			}
			for (var i = 1, l = u.length; i < l; i++) {
				if (u[i] <= u[i - 1])
					return false;
			}
			return true;
		},
	
		findRoot: function(curve, point, u) {
			var curve1 = [],
				curve2 = [];
			for (var i = 0; i <= 2; i++) {
				curve1[i] = curve[i + 1].subtract(curve[i]).multiply(3);
			}
			for (var i = 0; i <= 1; i++) {
				curve2[i] = curve1[i + 1].subtract(curve1[i]).multiply(2);
			}
			var pt = this.evaluate(3, curve, u),
				pt1 = this.evaluate(2, curve1, u),
				pt2 = this.evaluate(1, curve2, u),
				diff = pt.subtract(point),
				df = pt1.dot(pt1) + diff.dot(pt2);
			if (Math.abs(df) < 1e-6)
				return u;
			return u - diff.dot(pt1) / df;
		},
	
		evaluate: function(degree, curve, t) {
			var tmp = curve.slice();
			for (var i = 1; i <= degree; i++) {
				for (var j = 0; j <= degree - i; j++) {
					tmp[j] = tmp[j].multiply(1 - t).add(tmp[j + 1].multiply(t));
				}
			}
			return tmp[0];
		},
	
		chordLengthParameterize: function(first, last) {
			var u = [0];
			for (var i = first + 1; i <= last; i++) {
				u[i - first] = u[i - first - 1]
						+ this.points[i].getDistance(this.points[i - 1]);
			}
			for (var i = 1, m = last - first; i <= m; i++) {
				u[i] /= u[m];
			}
			return u;
		},
	
		findMaxError: function(first, last, curve, u) {
			var index = Math.floor((last - first + 1) / 2),
				maxDist = 0;
			for (var i = first + 1; i < last; i++) {
				var P = this.evaluate(3, curve, u[i - first]);
				var v = P.subtract(this.points[i]);
				var dist = v.x * v.x + v.y * v.y;
				if (dist >= maxDist) {
					maxDist = dist;
					index = i;
				}
			}
			return {
				error: maxDist,
				index: index
			};
		}
	});
	
	var TextItem = Item.extend({
		_class: 'TextItem',
		_boundsSelected: true,
		_applyMatrix: false,
		_canApplyMatrix: false,
		_serializeFields: {
			content: null
		},
		_boundsGetter: 'getBounds',
	
		initialize: function TextItem(arg) {
			this._content = '';
			this._lines = [];
			var hasProps = arg && Base.isPlainObject(arg)
					&& arg.x === undefined && arg.y === undefined;
			this._initialize(hasProps && arg, !hasProps && Point.read(arguments));
		},
	
		_equals: function(item) {
			return this._content === item._content;
		},
	
		_clone: function _clone(copy, insert, includeMatrix) {
			copy.setContent(this._content);
			return _clone.base.call(this, copy, insert, includeMatrix);
		},
	
		getContent: function() {
			return this._content;
		},
	
		setContent: function(content) {
			this._content = '' + content;
			this._lines = this._content.split(/\r\n|\n|\r/mg);
			this._changed(265);
		},
	
		isEmpty: function() {
			return !this._content;
		},
	
		getCharacterStyle: '#getStyle',
		setCharacterStyle: '#setStyle',
	
		getParagraphStyle: '#getStyle',
		setParagraphStyle: '#setStyle'
	});
	
	var PointText = TextItem.extend({
		_class: 'PointText',
	
		initialize: function PointText() {
			TextItem.apply(this, arguments);
		},
	
		clone: function(insert) {
			return this._clone(new PointText(Item.NO_INSERT), insert);
		},
	
		getPoint: function() {
			var point = this._matrix.getTranslation();
			return new LinkedPoint(point.x, point.y, this, 'setPoint');
		},
	
		setPoint: function() {
			var point = Point.read(arguments);
			this.translate(point.subtract(this._matrix.getTranslation()));
		},
	
		_draw: function(ctx) {
			if (!this._content)
				return;
			this._setStyles(ctx);
			var style = this._style,
				lines = this._lines,
				leading = style.getLeading(),
				shadowColor = ctx.shadowColor;
			ctx.font = style.getFontStyle();
			ctx.textAlign = style.getJustification();
			for (var i = 0, l = lines.length; i < l; i++) {
				ctx.shadowColor = shadowColor;
				var line = lines[i];
				if (style.hasFill()) {
					ctx.fillText(line, 0, 0);
					ctx.shadowColor = 'rgba(0,0,0,0)';
				}
				if (style.hasStroke())
					ctx.strokeText(line, 0, 0);
				ctx.translate(0, leading);
			}
		},
	
		_getBounds: function(getter, matrix) {
			var style = this._style,
				lines = this._lines,
				numLines = lines.length,
				justification = style.getJustification(),
				leading = style.getLeading(),
				width = this.getView().getTextWidth(style.getFontStyle(), lines),
				x = 0;
			if (justification !== 'left')
				x -= width / (justification === 'center' ? 2: 1);
			var bounds = new Rectangle(x,
						numLines ? - 0.75 * leading : 0,
						width, numLines * leading);
			return matrix ? matrix._transformBounds(bounds, bounds) : bounds;
		}
	});
	
	var Color = Base.extend(new function() {
		var types = {
			gray: ['gray'],
			rgb: ['red', 'green', 'blue'],
			hsb: ['hue', 'saturation', 'brightness'],
			hsl: ['hue', 'saturation', 'lightness'],
			gradient: ['gradient', 'origin', 'destination', 'highlight']
		};
	
		var componentParsers = {},
			colorCache = {},
			colorCtx;
	
		function fromCSS(string) {
			var match = string.match(/^#(\w{1,2})(\w{1,2})(\w{1,2})$/),
				components;
			if (match) {
				components = [0, 0, 0];
				for (var i = 0; i < 3; i++) {
					var value = match[i + 1];
					components[i] = parseInt(value.length == 1
							? value + value : value, 16) / 255;
				}
			} else if (match = string.match(/^rgba?\((.*)\)$/)) {
				components = match[1].split(',');
				for (var i = 0, l = components.length; i < l; i++) {
					var value = +components[i];
					components[i] = i < 3 ? value / 255 : value;
				}
			} else {
				var cached = colorCache[string];
				if (!cached) {
					if (!colorCtx) {
						colorCtx = CanvasProvider.getContext(1, 1);
						colorCtx.globalCompositeOperation = 'copy';
					}
					colorCtx.fillStyle = 'rgba(0,0,0,0)';
					colorCtx.fillStyle = string;
					colorCtx.fillRect(0, 0, 1, 1);
					var data = colorCtx.getImageData(0, 0, 1, 1).data;
					cached = colorCache[string] = [
						data[0] / 255,
						data[1] / 255,
						data[2] / 255
					];
				}
				components = cached.slice();
			}
			return components;
		}
	
		var hsbIndices = [
			[0, 3, 1],
			[2, 0, 1],
			[1, 0, 3],
			[1, 2, 0],
			[3, 1, 0],
			[0, 1, 2]
		];
	
		var converters = {
			'rgb-hsb': function(r, g, b) {
				var max = Math.max(r, g, b),
					min = Math.min(r, g, b),
					delta = max - min,
					h = delta === 0 ? 0
						:	( max == r ? (g - b) / delta + (g < b ? 6 : 0)
							: max == g ? (b - r) / delta + 2
							:			 (r - g) / delta + 4) * 60;
				return [h, max === 0 ? 0 : delta / max, max];
			},
	
			'hsb-rgb': function(h, s, b) {
				h = (((h / 60) % 6) + 6) % 6;
				var i = Math.floor(h),
					f = h - i,
					i = hsbIndices[i],
					v = [
						b,
						b * (1 - s),
						b * (1 - s * f),
						b * (1 - s * (1 - f))
					];
				return [v[i[0]], v[i[1]], v[i[2]]];
			},
	
			'rgb-hsl': function(r, g, b) {
				var max = Math.max(r, g, b),
					min = Math.min(r, g, b),
					delta = max - min,
					achromatic = delta === 0,
					h = achromatic ? 0
						:	( max == r ? (g - b) / delta + (g < b ? 6 : 0)
							: max == g ? (b - r) / delta + 2
							:			 (r - g) / delta + 4) * 60,
					l = (max + min) / 2,
					s = achromatic ? 0 : l < 0.5
							? delta / (max + min)
							: delta / (2 - max - min);
				return [h, s, l];
			},
	
			'hsl-rgb': function(h, s, l) {
				h = (((h / 360) % 1) + 1) % 1;
				if (s === 0)
					return [l, l, l];
				var t3s = [ h + 1 / 3, h, h - 1 / 3 ],
					t2 = l < 0.5 ? l * (1 + s) : l + s - l * s,
					t1 = 2 * l - t2,
					c = [];
				for (var i = 0; i < 3; i++) {
					var t3 = t3s[i];
					if (t3 < 0) t3 += 1;
					if (t3 > 1) t3 -= 1;
					c[i] = 6 * t3 < 1
						? t1 + (t2 - t1) * 6 * t3
						: 2 * t3 < 1
							? t2
							: 3 * t3 < 2
								? t1 + (t2 - t1) * ((2 / 3) - t3) * 6
								: t1;
				}
				return c;
			},
	
			'rgb-gray': function(r, g, b) {
				return [r * 0.2989 + g * 0.587 + b * 0.114];
			},
	
			'gray-rgb': function(g) {
				return [g, g, g];
			},
	
			'gray-hsb': function(g) {
				return [0, 0, g];
			},
	
			'gray-hsl': function(g) {
				return [0, 0, g];
			},
	
			'gradient-rgb': function() {
				return [];
			},
	
			'rgb-gradient': function() {
				return [];
			}
	
		};
	
		return Base.each(types, function(properties, type) {
			componentParsers[type] = [];
			Base.each(properties, function(name, index) {
				var part = Base.capitalize(name),
					hasOverlap = /^(hue|saturation)$/.test(name),
					parser = componentParsers[type][index] = name === 'gradient'
						? function(value) {
							var current = this._components[0];
							value = Gradient.read(Array.isArray(value) ? value
									: arguments, 0, { readNull: true });
							if (current !== value) {
								if (current)
									current._removeOwner(this);
								if (value)
									value._addOwner(this);
							}
							return value;
						}
						: type === 'gradient'
							? function() {
								return Point.read(arguments, 0, {
										readNull: name === 'highlight',
										clone: true
								});
							}
							: function(value) {
								return value == null || isNaN(value) ? 0 : value;
							};
	
				this['get' + part] = function() {
					return this._type === type
						|| hasOverlap && /^hs[bl]$/.test(this._type)
							? this._components[index]
							: this._convert(type)[index];
				};
	
				this['set' + part] = function(value) {
					if (this._type !== type
							&& !(hasOverlap && /^hs[bl]$/.test(this._type))) {
						this._components = this._convert(type);
						this._properties = types[type];
						this._type = type;
					}
					this._components[index] = parser.call(this, value);
					this._changed();
				};
			}, this);
		}, {
			_class: 'Color',
			_readIndex: true,
	
			initialize: function Color(arg) {
				var slice = Array.prototype.slice,
					args = arguments,
					read = 0,
					type,
					components,
					alpha,
					values;
				if (Array.isArray(arg)) {
					args = arg;
					arg = args[0];
				}
				var argType = arg != null && typeof arg;
				if (argType === 'string' && arg in types) {
					type = arg;
					arg = args[1];
					if (Array.isArray(arg)) {
						components = arg;
						alpha = args[2];
					} else {
						if (this.__read)
							read = 1;
						args = slice.call(args, 1);
						argType = typeof arg;
					}
				}
				if (!components) {
					values = argType === 'number'
							? args
							: argType === 'object' && arg.length != null
								? arg
								: null;
					if (values) {
						if (!type)
							type = values.length >= 3
									? 'rgb'
									: 'gray';
						var length = types[type].length;
						alpha = values[length];
						if (this.__read)
							read += values === arguments
								? length + (alpha != null ? 1 : 0)
								: 1;
						if (values.length > length)
							values = slice.call(values, 0, length);
					} else if (argType === 'string') {
						type = 'rgb';
						components = fromCSS(arg);
						if (components.length === 4) {
							alpha = components[3];
							components.length--;
						}
					} else if (argType === 'object') {
						if (arg.constructor === Color) {
							type = arg._type;
							components = arg._components.slice();
							alpha = arg._alpha;
							if (type === 'gradient') {
								for (var i = 1, l = components.length; i < l; i++) {
									var point = components[i];
									if (point)
										components[i] = point.clone();
								}
							}
						} else if (arg.constructor === Gradient) {
							type = 'gradient';
							values = args;
						} else {
							type = 'hue' in arg
								? 'lightness' in arg
									? 'hsl'
									: 'hsb'
								: 'gradient' in arg || 'stops' in arg
										|| 'radial' in arg
									? 'gradient'
									: 'gray' in arg
										? 'gray'
										: 'rgb';
							var properties = types[type],
								parsers = componentParsers[type];
							this._components = components = [];
							for (var i = 0, l = properties.length; i < l; i++) {
								var value = arg[properties[i]];
								if (value == null && i === 0 && type === 'gradient'
										&& 'stops' in arg) {
									value = {
										stops: arg.stops,
										radial: arg.radial
									};
								}
								value = parsers[i].call(this, value);
								if (value != null)
									components[i] = value;
							}
							alpha = arg.alpha;
						}
					}
					if (this.__read && type)
						read = 1;
				}
				this._type = type || 'rgb';
				this._id = UID.get(Color);
				if (!components) {
					this._components = components = [];
					var parsers = componentParsers[this._type];
					for (var i = 0, l = parsers.length; i < l; i++) {
						var value = parsers[i].call(this, values && values[i]);
						if (value != null)
							components[i] = value;
					}
				}
				this._components = components;
				this._properties = types[this._type];
				this._alpha = alpha;
				if (this.__read)
					this.__read = read;
			},
	
			_serialize: function(options, dictionary) {
				var components = this.getComponents();
				return Base.serialize(
						/^(gray|rgb)$/.test(this._type)
							? components
							: [this._type].concat(components),
						options, true, dictionary);
			},
	
			_changed: function() {
				this._canvasStyle = null;
				if (this._owner)
					this._owner._changed(65);
			},
	
			_convert: function(type) {
				var converter;
				return this._type === type
						? this._components.slice()
						: (converter = converters[this._type + '-' + type])
							? converter.apply(this, this._components)
							: converters['rgb-' + type].apply(this,
								converters[this._type + '-rgb'].apply(this,
									this._components));
			},
	
			convert: function(type) {
				return new Color(type, this._convert(type), this._alpha);
			},
	
			getType: function() {
				return this._type;
			},
	
			setType: function(type) {
				this._components = this._convert(type);
				this._properties = types[type];
				this._type = type;
			},
	
			getComponents: function() {
				var components = this._components.slice();
				if (this._alpha != null)
					components.push(this._alpha);
				return components;
			},
	
			getAlpha: function() {
				return this._alpha != null ? this._alpha : 1;
			},
	
			setAlpha: function(alpha) {
				this._alpha = alpha == null ? null : Math.min(Math.max(alpha, 0), 1);
				this._changed();
			},
	
			hasAlpha: function() {
				return this._alpha != null;
			},
	
			equals: function(color) {
				var col = Base.isPlainValue(color, true)
						? Color.read(arguments)
						: color;
				return col === this || col && this._class === col._class
						&& this._type === col._type
						&& this._alpha === col._alpha
						&& Base.equals(this._components, col._components)
						|| false;
			},
	
			toString: function() {
				var properties = this._properties,
					parts = [],
					isGradient = this._type === 'gradient',
					f = Formatter.instance;
				for (var i = 0, l = properties.length; i < l; i++) {
					var value = this._components[i];
					if (value != null)
						parts.push(properties[i] + ': '
								+ (isGradient ? value : f.number(value)));
				}
				if (this._alpha != null)
					parts.push('alpha: ' + f.number(this._alpha));
				return '{ ' + parts.join(', ') + ' }';
			},
	
			toCSS: function(hex) {
				var components = this._convert('rgb'),
					alpha = hex || this._alpha == null ? 1 : this._alpha;
				function convert(val) {
					return Math.round((val < 0 ? 0 : val > 1 ? 1 : val) * 255);
				}
				components = [
					convert(components[0]),
					convert(components[1]),
					convert(components[2])
				];
				if (alpha < 1)
					components.push(alpha < 0 ? 0 : alpha);
				return hex
						? '#' + ((1 << 24) + (components[0] << 16)
							+ (components[1] << 8)
							+ components[2]).toString(16).slice(1)
						: (components.length == 4 ? 'rgba(' : 'rgb(')
							+ components.join(',') + ')';
			},
	
			toCanvasStyle: function(ctx) {
				if (this._canvasStyle)
					return this._canvasStyle;
				if (this._type !== 'gradient')
					return this._canvasStyle = this.toCSS();
				var components = this._components,
					gradient = components[0],
					stops = gradient._stops,
					origin = components[1],
					destination = components[2],
					canvasGradient;
				if (gradient._radial) {
					var radius = destination.getDistance(origin),
						highlight = components[3];
					if (highlight) {
						var vector = highlight.subtract(origin);
						if (vector.getLength() > radius)
							highlight = origin.add(vector.normalize(radius - 0.1));
					}
					var start = highlight || origin;
					canvasGradient = ctx.createRadialGradient(start.x, start.y,
							0, origin.x, origin.y, radius);
				} else {
					canvasGradient = ctx.createLinearGradient(origin.x, origin.y,
							destination.x, destination.y);
				}
				for (var i = 0, l = stops.length; i < l; i++) {
					var stop = stops[i];
					canvasGradient.addColorStop(stop._rampPoint,
							stop._color.toCanvasStyle());
				}
				return this._canvasStyle = canvasGradient;
			},
	
			transform: function(matrix) {
				if (this._type === 'gradient') {
					var components = this._components;
					for (var i = 1, l = components.length; i < l; i++) {
						var point = components[i];
						matrix._transformPoint(point, point, true);
					}
					this._changed();
				}
			},
	
			statics: {
				_types: types,
	
				random: function() {
					var random = Math.random;
					return new Color(random(), random(), random());
				}
			}
		});
	},
	new function() {
		var operators = {
			add: function(a, b) {
				return a + b;
			},
	
			subtract: function(a, b) {
				return a - b;
			},
	
			multiply: function(a, b) {
				return a * b;
			},
	
			divide: function(a, b) {
				return a / b;
			}
		};
	
		return Base.each(operators, function(operator, name) {
			this[name] = function(color) {
				color = Color.read(arguments);
				var type = this._type,
					components1 = this._components,
					components2 = color._convert(type);
				for (var i = 0, l = components1.length; i < l; i++)
					components2[i] = operator(components1[i], components2[i]);
				return new Color(type, components2,
						this._alpha != null
								? operator(this._alpha, color.getAlpha())
								: null);
			};
		}, {
		});
	});
	
	var Gradient = Base.extend({
		_class: 'Gradient',
	
		initialize: function Gradient(stops, radial) {
			this._id = UID.get();
			if (stops && this._set(stops))
				stops = radial = null;
			if (!this._stops)
				this.setStops(stops || ['white', 'black']);
			if (this._radial == null)
				this.setRadial(typeof radial === 'string' && radial === 'radial'
						|| radial || false);
		},
	
		_serialize: function(options, dictionary) {
			return dictionary.add(this, function() {
				return Base.serialize([this._stops, this._radial],
						options, true, dictionary);
			});
		},
	
		_changed: function() {
			for (var i = 0, l = this._owners && this._owners.length; i < l; i++)
				this._owners[i]._changed();
		},
	
		_addOwner: function(color) {
			if (!this._owners)
				this._owners = [];
			this._owners.push(color);
		},
	
		_removeOwner: function(color) {
			var index = this._owners ? this._owners.indexOf(color) : -1;
			if (index != -1) {
				this._owners.splice(index, 1);
				if (this._owners.length === 0)
					this._owners = undefined;
			}
		},
	
		clone: function() {
			var stops = [];
			for (var i = 0, l = this._stops.length; i < l; i++)
				stops[i] = this._stops[i].clone();
			return new Gradient(stops, this._radial);
		},
	
		getStops: function() {
			return this._stops;
		},
	
		setStops: function(stops) {
			if (this.stops) {
				for (var i = 0, l = this._stops.length; i < l; i++)
					this._stops[i]._owner = undefined;
			}
			if (stops.length < 2)
				throw new Error(
						'Gradient stop list needs to contain at least two stops.');
			this._stops = GradientStop.readAll(stops, 0, { clone: true });
			for (var i = 0, l = this._stops.length; i < l; i++) {
				var stop = this._stops[i];
				stop._owner = this;
				if (stop._defaultRamp)
					stop.setRampPoint(i / (l - 1));
			}
			this._changed();
		},
	
		getRadial: function() {
			return this._radial;
		},
	
		setRadial: function(radial) {
			this._radial = radial;
			this._changed();
		},
	
		equals: function(gradient) {
			if (gradient === this)
				return true;
			if (gradient && this._class === gradient._class
					&& this._stops.length === gradient._stops.length) {
				for (var i = 0, l = this._stops.length; i < l; i++) {
					if (!this._stops[i].equals(gradient._stops[i]))
						return false;
				}
				return true;
			}
			return false;
		}
	});
	
	var GradientStop = Base.extend({
		_class: 'GradientStop',
	
		initialize: function GradientStop(arg0, arg1) {
			if (arg0) {
				var color, rampPoint;
				if (arg1 === undefined && Array.isArray(arg0)) {
					color = arg0[0];
					rampPoint = arg0[1];
				} else if (arg0.color) {
					color = arg0.color;
					rampPoint = arg0.rampPoint;
				} else {
					color = arg0;
					rampPoint = arg1;
				}
				this.setColor(color);
				this.setRampPoint(rampPoint);
			}
		},
	
		clone: function() {
			return new GradientStop(this._color.clone(), this._rampPoint);
		},
	
		_serialize: function(options, dictionary) {
			return Base.serialize([this._color, this._rampPoint], options, true,
					dictionary);
		},
	
		_changed: function() {
			if (this._owner)
				this._owner._changed(65);
		},
	
		getRampPoint: function() {
			return this._rampPoint;
		},
	
		setRampPoint: function(rampPoint) {
			this._defaultRamp = rampPoint == null;
			this._rampPoint = rampPoint || 0;
			this._changed();
		},
	
		getColor: function() {
			return this._color;
		},
	
		setColor: function(color) {
			this._color = Color.read(arguments);
			if (this._color === color)
				this._color = color.clone();
			this._color._owner = this;
			this._changed();
		},
	
		equals: function(stop) {
			return stop === this || stop && this._class === stop._class
					&& this._color.equals(stop._color)
					&& this._rampPoint == stop._rampPoint
					|| false;
		}
	});
	
	var Style = Base.extend(new function() {
		var defaults = {
			fillColor: undefined,
			strokeColor: undefined,
			strokeWidth: 1,
			strokeCap: 'butt',
			strokeJoin: 'miter',
			strokeScaling: true,
			miterLimit: 10,
			dashOffset: 0,
			dashArray: [],
			windingRule: 'nonzero',
			shadowColor: undefined,
			shadowBlur: 0,
			shadowOffset: new Point(),
			selectedColor: undefined,
			fontFamily: 'sans-serif',
			fontWeight: 'normal',
			fontSize: 12,
			font: 'sans-serif',
			leading: null,
			justification: 'left'
		};
	
		var flags = {
			strokeWidth: 97,
			strokeCap: 97,
			strokeJoin: 97,
			strokeScaling: 105,
			miterLimit: 97,
			fontFamily: 9,
			fontWeight: 9,
			fontSize: 9,
			font: 9,
			leading: 9,
			justification: 9
		};
	
		var item = { beans: true },
			fields = {
				_defaults: defaults,
				_textDefaults: new Base(defaults, {
					fillColor: new Color()
				}),
				beans: true
			};
	
		Base.each(defaults, function(value, key) {
			var isColor = /Color$/.test(key),
				isPoint = key === 'shadowOffset',
				part = Base.capitalize(key),
				flag = flags[key],
				set = 'set' + part,
				get = 'get' + part;
	
			fields[set] = function(value) {
				var owner = this._owner,
					children = owner && owner._children;
				if (children && children.length > 0
						&& !(owner instanceof CompoundPath)) {
					for (var i = 0, l = children.length; i < l; i++)
						children[i]._style[set](value);
				} else {
					var old = this._values[key];
					if (old !== value) {
						if (isColor) {
							if (old)
								old._owner = undefined;
							if (value && value.constructor === Color) {
								if (value._owner)
									value = value.clone();
								value._owner = owner;
							}
						}
						this._values[key] = value;
						if (owner)
							owner._changed(flag || 65);
					}
				}
			};
	
			fields[get] = function(_dontMerge) {
				var owner = this._owner,
					children = owner && owner._children,
					value;
				if (!children || children.length === 0 || _dontMerge
						|| owner instanceof CompoundPath) {
					var value = this._values[key];
					if (value === undefined) {
						value = this._defaults[key];
						if (value && value.clone)
							value = value.clone();
					} else {
						var ctor = isColor ? Color : isPoint ? Point : null;
						if (ctor && !(value && value.constructor === ctor)) {
							this._values[key] = value = ctor.read([value], 0,
									{ readNull: true, clone: true });
							if (value && isColor)
								value._owner = owner;
						}
					}
					return value;
				}
				for (var i = 0, l = children.length; i < l; i++) {
					var childValue = children[i]._style[get]();
					if (i === 0) {
						value = childValue;
					} else if (!Base.equals(value, childValue)) {
						return undefined;
					}
				}
				return value;
			};
	
			item[get] = function(_dontMerge) {
				return this._style[get](_dontMerge);
			};
	
			item[set] = function(value) {
				this._style[set](value);
			};
		});
	
		Item.inject(item);
		return fields;
	}, {
		_class: 'Style',
	
		initialize: function Style(style, _owner, _project) {
			this._values = {};
			this._owner = _owner;
			this._project = _owner && _owner._project || _project || paper.project;
			if (_owner instanceof TextItem)
				this._defaults = this._textDefaults;
			if (style)
				this.set(style);
		},
	
		set: function(style) {
			var isStyle = style instanceof Style,
				values = isStyle ? style._values : style;
			if (values) {
				for (var key in values) {
					if (key in this._defaults) {
						var value = values[key];
						this[key] = value && isStyle && value.clone
								? value.clone() : value;
					}
				}
			}
		},
	
		equals: function(style) {
			return style === this || style && this._class === style._class
					&& Base.equals(this._values, style._values)
					|| false;
		},
	
		hasFill: function() {
			return !!this.getFillColor();
		},
	
		hasStroke: function() {
			return !!this.getStrokeColor() && this.getStrokeWidth() > 0;
		},
	
		hasShadow: function() {
			return !!this.getShadowColor() && this.getShadowBlur() > 0;
		},
	
		getView: function() {
			return this._project.getView();
		},
	
		getFontStyle: function() {
			var fontSize = this.getFontSize();
			return this.getFontWeight()
					+ ' ' + fontSize + (/[a-z]/i.test(fontSize + '') ? ' ' : 'px ')
					+ this.getFontFamily();
		},
	
		getFont: '#getFontFamily',
		setFont: '#setFontFamily',
	
		getLeading: function getLeading() {
			var leading = getLeading.base.call(this),
				fontSize = this.getFontSize();
			if (/pt|em|%|px/.test(fontSize))
				fontSize = this.getView().getPixelSize(fontSize);
			return leading != null ? leading : fontSize * 1.2;
		}
	
	});
	
	var DomElement = new function() {
		function handlePrefix(el, name, set, value) {
			var prefixes = ['', 'webkit', 'moz', 'Moz', 'ms', 'o'],
				suffix = name[0].toUpperCase() + name.substring(1);
			for (var i = 0; i < 6; i++) {
				var prefix = prefixes[i],
					key = prefix ? prefix + suffix : name;
				if (key in el) {
					if (set) {
						el[key] = value;
					} else {
						return el[key];
					}
					break;
				}
			}
		}
	
		return {
			getStyles: function(el) {
				var doc = el && el.nodeType !== 9 ? el.ownerDocument : el,
					view = doc && doc.defaultView;
				return view && view.getComputedStyle(el, '');
			},
	
			getBounds: function(el, viewport) {
				var doc = el.ownerDocument,
					body = doc.body,
					html = doc.documentElement,
					rect;
				try {
					rect = el.getBoundingClientRect();
				} catch (e) {
					rect = { left: 0, top: 0, width: 0, height: 0 };
				}
				var x = rect.left - (html.clientLeft || body.clientLeft || 0),
					y = rect.top - (html.clientTop || body.clientTop || 0);
				if (!viewport) {
					var view = doc.defaultView;
					x += view.pageXOffset || html.scrollLeft || body.scrollLeft;
					y += view.pageYOffset || html.scrollTop || body.scrollTop;
				}
				return new Rectangle(x, y, rect.width, rect.height);
			},
	
			getViewportBounds: function(el) {
				var doc = el.ownerDocument,
					view = doc.defaultView,
					html = doc.documentElement;
				return new Rectangle(0, 0,
					view.innerWidth || html.clientWidth,
					view.innerHeight || html.clientHeight
				);
			},
	
			getOffset: function(el, viewport) {
				return DomElement.getBounds(el, viewport).getPoint();
			},
	
			getSize: function(el) {
				return DomElement.getBounds(el, true).getSize();
			},
	
			isInvisible: function(el) {
				return DomElement.getSize(el).equals(new Size(0, 0));
			},
	
			isInView: function(el) {
				return !DomElement.isInvisible(el)
						&& DomElement.getViewportBounds(el).intersects(
							DomElement.getBounds(el, true));
			},
	
			getPrefixed: function(el, name) {
				return handlePrefix(el, name);
			},
	
			setPrefixed: function(el, name, value) {
				if (typeof name === 'object') {
					for (var key in name)
						handlePrefix(el, key, true, name[key]);
				} else {
					handlePrefix(el, name, true, value);
				}
			}
		};
	};
	
	var DomEvent = {
		add: function(el, events) {
			for (var type in events) {
				var func = events[type],
					parts = type.split(/[\s,]+/g);
				for (var i = 0, l = parts.length; i < l; i++)
					el.addEventListener(parts[i], func, false);
			}
		},
	
		remove: function(el, events) {
			for (var type in events) {
				var func = events[type],
					parts = type.split(/[\s,]+/g);
				for (var i = 0, l = parts.length; i < l; i++)
					el.removeEventListener(parts[i], func, false);
			}
		},
	
		getPoint: function(event) {
			var pos = event.targetTouches
					? event.targetTouches.length
						? event.targetTouches[0]
						: event.changedTouches[0]
					: event;
			return new Point(
				pos.pageX || pos.clientX + document.documentElement.scrollLeft,
				pos.pageY || pos.clientY + document.documentElement.scrollTop
			);
		},
	
		getTarget: function(event) {
			return event.target || event.srcElement;
		},
	
		getRelatedTarget: function(event) {
			return event.relatedTarget || event.toElement;
		},
	
		getOffset: function(event, target) {
			return DomEvent.getPoint(event).subtract(DomElement.getOffset(
					target || DomEvent.getTarget(event)));
		},
	
		stop: function(event) {
			event.stopPropagation();
			event.preventDefault();
		}
	};
	
	DomEvent.requestAnimationFrame = new function() {
		var nativeRequest = DomElement.getPrefixed(window, 'requestAnimationFrame'),
			requested = false,
			callbacks = [],
			focused = true,
			timer;
	
		DomEvent.add(window, {
			focus: function() {
				focused = true;
			},
			blur: function() {
				focused = false;
			}
		});
	
		function handleCallbacks() {
			for (var i = callbacks.length - 1; i >= 0; i--) {
				var entry = callbacks[i],
					func = entry[0],
					el = entry[1];
				if (!el || (PaperScope.getAttribute(el, 'keepalive') == 'true'
						|| focused) && DomElement.isInView(el)) {
					callbacks.splice(i, 1);
					func();
				}
			}
			if (nativeRequest) {
				if (callbacks.length) {
					nativeRequest(handleCallbacks);
				} else {
					requested = false;
				}
			}
		}
	
		return function(callback, element) {
			callbacks.push([callback, element]);
			if (nativeRequest) {
				if (!requested) {
					nativeRequest(handleCallbacks);
					requested = true;
				}
			} else if (!timer) {
				timer = setInterval(handleCallbacks, 1000 / 60);
			}
		};
	};
	
	var View = Base.extend(Emitter, {
		_class: 'View',
	
		initialize: function View(project, element) {
			this._project = project;
			this._scope = project._scope;
			this._element = element;
			var size;
			if (!this._pixelRatio)
				this._pixelRatio = window.devicePixelRatio || 1;
			this._id = element.getAttribute('id');
			if (this._id == null)
				element.setAttribute('id', this._id = 'view-' + View._id++);
			DomEvent.add(element, this._viewEvents);
			var none = 'none';
			DomElement.setPrefixed(element.style, {
				userSelect: none,
				touchAction: none,
				touchCallout: none,
				contentZooming: none,
				userDrag: none,
				tapHighlightColor: 'rgba(0,0,0,0)'
			});
	
			function getSize(name) {
				return element[name] || parseInt(element.getAttribute(name), 10);
			};
	
			function getCanvasSize() {
				var size = DomElement.getSize(element);
				return size.isNaN() || size.isZero()
						? new Size(getSize('width'), getSize('height'))
						: size;
			};
	
			if (PaperScope.hasAttribute(element, 'resize')) {
				var that = this;
				DomEvent.add(window, this._windowEvents = {
					resize: function() {
						that.setViewSize(getCanvasSize());
					}
				});
			}
			this._setViewSize(size = getCanvasSize());
			if (PaperScope.hasAttribute(element, 'stats')
					&& typeof Stats !== 'undefined') {
				this._stats = new Stats();
				var stats = this._stats.domElement,
					style = stats.style,
					offset = DomElement.getOffset(element);
				style.position = 'absolute';
				style.left = offset.x + 'px';
				style.top = offset.y + 'px';
				document.body.appendChild(stats);
			}
			View._views.push(this);
			View._viewsById[this._id] = this;
			this._viewSize = size;
			(this._matrix = new Matrix())._owner = this;
			this._zoom = 1;
			if (!View._focused)
				View._focused = this;
			this._frameItems = {};
			this._frameItemCount = 0;
		},
	
		remove: function() {
			if (!this._project)
				return false;
			if (View._focused === this)
				View._focused = null;
			View._views.splice(View._views.indexOf(this), 1);
			delete View._viewsById[this._id];
			if (this._project._view === this)
				this._project._view = null;
			DomEvent.remove(this._element, this._viewEvents);
			DomEvent.remove(window, this._windowEvents);
			this._element = this._project = null;
			this.off('frame');
			this._animate = false;
			this._frameItems = {};
			return true;
		},
	
		_events: Base.each(['onResize', 'onMouseDown', 'onMouseUp', 'onMouseMove'],
			function(name) {
				this[name] = {
					install: function(type) {
						this._installEvent(type);
					},
	
					uninstall: function(type) {
						this._uninstallEvent(type);
					}
				};
			}, {
				onFrame: {
					install: function() {
						this.play();
					},
	
					uninstall: function() {
						this.pause();
					}
				}
			}
		),
	
		_animate: false,
		_time: 0,
		_count: 0,
	
		_requestFrame: function() {
			var that = this;
			DomEvent.requestAnimationFrame(function() {
				that._requested = false;
				if (!that._animate)
					return;
				that._requestFrame();
				that._handleFrame();
			}, this._element);
			this._requested = true;
		},
	
		_handleFrame: function() {
			paper = this._scope;
			var now = Date.now() / 1000,
				delta = this._before ? now - this._before : 0;
			this._before = now;
			this._handlingFrame = true;
			this.emit('frame', new Base({
				delta: delta,
				time: this._time += delta,
				count: this._count++
			}));
			if (this._stats)
				this._stats.update();
			this._handlingFrame = false;
			this.update();
		},
	
		_animateItem: function(item, animate) {
			var items = this._frameItems;
			if (animate) {
				items[item._id] = {
					item: item,
					time: 0,
					count: 0
				};
				if (++this._frameItemCount === 1)
					this.on('frame', this._handleFrameItems);
			} else {
				delete items[item._id];
				if (--this._frameItemCount === 0) {
					this.off('frame', this._handleFrameItems);
				}
			}
		},
	
		_handleFrameItems: function(event) {
			for (var i in this._frameItems) {
				var entry = this._frameItems[i];
				entry.item.emit('frame', new Base(event, {
					time: entry.time += event.delta,
					count: entry.count++
				}));
			}
		},
	
		_update: function() {
			this._project._needsUpdate = true;
			if (this._handlingFrame)
				return;
			if (this._animate) {
				this._handleFrame();
			} else {
				this.update();
			}
		},
	
		_changed: function(flags) {
			if (flags & 1)
				this._project._needsUpdate = true;
		},
	
		_transform: function(matrix) {
			this._matrix.concatenate(matrix);
			this._bounds = null;
			this._update();
		},
	
		getElement: function() {
			return this._element;
		},
	
		getPixelRatio: function() {
			return this._pixelRatio;
		},
	
		getResolution: function() {
			return this._pixelRatio * 72;
		},
	
		getViewSize: function() {
			var size = this._viewSize;
			return new LinkedSize(size.width, size.height, this, 'setViewSize');
		},
	
		setViewSize: function() {
			var size = Size.read(arguments),
				delta = size.subtract(this._viewSize);
			if (delta.isZero())
				return;
			this._viewSize.set(size.width, size.height);
			this._setViewSize(size);
			this._bounds = null;
			this.emit('resize', {
				size: size,
				delta: delta
			});
			this._update();
		},
	
		_setViewSize: function(size) {
			var element = this._element;
			element.width = size.width;
			element.height = size.height;
		},
	
		getBounds: function() {
			if (!this._bounds)
				this._bounds = this._matrix.inverted()._transformBounds(
						new Rectangle(new Point(), this._viewSize));
			return this._bounds;
		},
	
		getSize: function() {
			return this.getBounds().getSize();
		},
	
		getCenter: function() {
			return this.getBounds().getCenter();
		},
	
		setCenter: function() {
			var center = Point.read(arguments);
			this.scrollBy(center.subtract(this.getCenter()));
		},
	
		getZoom: function() {
			return this._zoom;
		},
	
		setZoom: function(zoom) {
			this._transform(new Matrix().scale(zoom / this._zoom,
				this.getCenter()));
			this._zoom = zoom;
		},
	
		isVisible: function() {
			return DomElement.isInView(this._element);
		},
	
		scrollBy: function() {
			this._transform(new Matrix().translate(Point.read(arguments).negate()));
		},
	
		play: function() {
			this._animate = true;
			if (!this._requested)
				this._requestFrame();
		},
	
		pause: function() {
			this._animate = false;
		},
	
		draw: function() {
			this.update();
		},
	
		projectToView: function() {
			return this._matrix._transformPoint(Point.read(arguments));
		},
	
		viewToProject: function() {
			return this._matrix._inverseTransform(Point.read(arguments));
		}
	
	}, {
		statics: {
			_views: [],
			_viewsById: {},
			_id: 0,
	
			create: function(project, element) {
				if (typeof element === 'string')
					element = document.getElementById(element);
				return new CanvasView(project, element);
			}
		}
	},
	new function() {
		var tool,
			prevFocus,
			tempFocus,
			dragging = false;
	
		function getView(event) {
			var target = DomEvent.getTarget(event);
			return target.getAttribute && View._viewsById[target.getAttribute('id')];
		}
	
		function viewToProject(view, event) {
			return view.viewToProject(DomEvent.getOffset(event, view._element));
		}
	
		function updateFocus() {
			if (!View._focused || !View._focused.isVisible()) {
				for (var i = 0, l = View._views.length; i < l; i++) {
					var view = View._views[i];
					if (view && view.isVisible()) {
						View._focused = tempFocus = view;
						break;
					}
				}
			}
		}
	
		function handleMouseMove(view, point, event) {
			view._handleEvent('mousemove', point, event);
			var tool = view._scope.tool;
			if (tool) {
				tool._handleEvent(dragging && tool.responds('mousedrag')
						? 'mousedrag' : 'mousemove', point, event);
			}
			view.update();
			return tool;
		}
	
		var navigator = window.navigator,
			mousedown, mousemove, mouseup;
		if (navigator.pointerEnabled || navigator.msPointerEnabled) {
			mousedown = 'pointerdown MSPointerDown';
			mousemove = 'pointermove MSPointerMove';
			mouseup = 'pointerup pointercancel MSPointerUp MSPointerCancel';
		} else {
			mousedown = 'touchstart';
			mousemove = 'touchmove';
			mouseup = 'touchend touchcancel';
			if (!('ontouchstart' in window && navigator.userAgent.match(
					/mobile|tablet|ip(ad|hone|od)|android|silk/i))) {
				mousedown += ' mousedown';
				mousemove += ' mousemove';
				mouseup += ' mouseup';
			}
		}
	
		var viewEvents = {
			'selectstart dragstart': function(event) {
				if (dragging)
					event.preventDefault();
			}
		};
	
		var docEvents = {
			mouseout: function(event) {
				var view = View._focused,
					target = DomEvent.getRelatedTarget(event);
				if (view && (!target || target.nodeName === 'HTML'))
					handleMouseMove(view, viewToProject(view, event), event);
			},
	
			scroll: updateFocus
		};
	
		viewEvents[mousedown] = function(event) {
			var view = View._focused = getView(event),
				point = viewToProject(view, event);
			dragging = true;
			view._handleEvent('mousedown', point, event);
			if (tool = view._scope.tool)
				tool._handleEvent('mousedown', point, event);
			view.update();
		};
	
		docEvents[mousemove] = function(event) {
			var view = View._focused;
			if (!dragging) {
				var target = getView(event);
				if (target) {
					if (view !== target)
						handleMouseMove(view, viewToProject(view, event), event);
					prevFocus = view;
					view = View._focused = tempFocus = target;
				} else if (tempFocus && tempFocus === view) {
					view = View._focused = prevFocus;
					updateFocus();
				}
			}
			if (view) {
				var point = viewToProject(view, event);
				if (dragging || view.getBounds().contains(point))
					tool = handleMouseMove(view, point, event);
			}
		};
	
		docEvents[mouseup] = function(event) {
			var view = View._focused;
			if (!view || !dragging)
				return;
			var point = viewToProject(view, event);
			dragging = false;
			view._handleEvent('mouseup', point, event);
			if (tool)
				tool._handleEvent('mouseup', point, event);
			view.update();
		};
	
		DomEvent.add(document, docEvents);
	
		DomEvent.add(window, {
			load: updateFocus
		});
	
		var mouseFlags = {
			mousedown: {
				mousedown: 1,
				mousedrag: 1,
				click: 1,
				doubleclick: 1
			},
			mouseup: {
				mouseup: 1,
				mousedrag: 1,
				click: 1,
				doubleclick: 1
			},
			mousemove: {
				mousedrag: 1,
				mousemove: 1,
				mouseenter: 1,
				mouseleave: 1
			}
		};
	
		return {
			_viewEvents: viewEvents,
	
			_handleEvent: function() {},
	
			_installEvent: function(type) {
				var counters = this._eventCounters;
				if (counters) {
					for (var key in mouseFlags) {
						counters[key] = (counters[key] || 0)
								+ (mouseFlags[key][type] || 0);
					}
				}
			},
	
			_uninstallEvent: function(type) {
				var counters = this._eventCounters;
				if (counters) {
					for (var key in mouseFlags)
						counters[key] -= mouseFlags[key][type] || 0;
				}
			},
	
			statics: {
				updateFocus: updateFocus
			}
		};
	});
	
	var CanvasView = View.extend({
		_class: 'CanvasView',
	
		initialize: function CanvasView(project, canvas) {
			if (!(canvas instanceof HTMLCanvasElement)) {
				var size = Size.read(arguments, 1);
				if (size.isZero())
					throw new Error(
							'Cannot create CanvasView with the provided argument: '
							+ [].slice.call(arguments, 1));
				canvas = CanvasProvider.getCanvas(size);
			}
			this._context = canvas.getContext('2d');
			this._eventCounters = {};
			this._pixelRatio = 1;
			if (!/^off|false$/.test(PaperScope.getAttribute(canvas, 'hidpi'))) {
				var deviceRatio = window.devicePixelRatio || 1,
					backingStoreRatio = DomElement.getPrefixed(this._context,
							'backingStorePixelRatio') || 1;
				this._pixelRatio = deviceRatio / backingStoreRatio;
			}
			View.call(this, project, canvas);
		},
	
		_setViewSize: function(size) {
			var element = this._element,
				pixelRatio = this._pixelRatio,
				width = size.width,
				height = size.height;
			element.width = width * pixelRatio;
			element.height = height * pixelRatio;
			if (pixelRatio !== 1) {
				if (!PaperScope.hasAttribute(element, 'resize')) {
					var style = element.style;
					style.width = width + 'px';
					style.height = height + 'px';
				}
				this._context.scale(pixelRatio, pixelRatio);
			}
		},
	
		getPixelSize: function(size) {
			var browser = paper.browser,
				pixels;
			if (browser && browser.firefox) {
				var parent = this._element.parentNode,
					temp = document.createElement('div');
				temp.style.fontSize = size;
				parent.appendChild(temp);
				pixels = parseFloat(DomElement.getStyles(temp).fontSize);
				parent.removeChild(temp);
			} else {
				var ctx = this._context,
					prevFont = ctx.font;
				ctx.font = size + ' serif';
				pixels = parseFloat(ctx.font);
				ctx.font = prevFont;
			}
			return pixels;
		},
	
		getTextWidth: function(font, lines) {
			var ctx = this._context,
				prevFont = ctx.font,
				width = 0;
			ctx.font = font;
			for (var i = 0, l = lines.length; i < l; i++)
				width = Math.max(width, ctx.measureText(lines[i]).width);
			ctx.font = prevFont;
			return width;
		},
	
		update: function(force) {
			var project = this._project;
			if (!project || !force && !project._needsUpdate)
				return false;
			var ctx = this._context,
				size = this._viewSize;
			ctx.clearRect(0, 0, size.width + 1, size.height + 1);
			project.draw(ctx, this._matrix, this._pixelRatio);
			project._needsUpdate = false;
			return true;
		}
	},
	new function() {
		var downPoint,
			lastPoint,
			overPoint,
			downItem,
			lastItem,
			overItem,
			dragItem,
			dblClick,
			clickTime;
	
		function callEvent(view, type, event, point, target, lastPoint) {
			var item = target,
				mouseEvent;
	
			function call(obj) {
				if (obj.responds(type)) {
					if (!mouseEvent) {
						mouseEvent = new MouseEvent(type, event, point, target,
								lastPoint ? point.subtract(lastPoint) : null);
					}
					if (obj.emit(type, mouseEvent) && mouseEvent.isStopped) {
						event.preventDefault();
						return true;
					}
				}
			}
	
			while (item) {
				if (call(item))
					return true;
				item = item.getParent();
			}
			if (call(view))
				return true;
			return false;
		}
	
		return {
			_handleEvent: function(type, point, event) {
				if (!this._eventCounters[type])
					return;
				var project = this._project,
					hit = project.hitTest(point, {
						tolerance: 0,
						fill: true,
						stroke: true
					}),
					item = hit && hit.item,
					stopped = false;
				switch (type) {
				case 'mousedown':
					stopped = callEvent(this, type, event, point, item);
					dblClick = lastItem == item && (Date.now() - clickTime < 300);
					downItem = lastItem = item;
					downPoint = lastPoint = overPoint = point;
					dragItem = !stopped && item;
					while (dragItem && !dragItem.responds('mousedrag'))
						dragItem = dragItem._parent;
					break;
				case 'mouseup':
					stopped = callEvent(this, type, event, point, item, downPoint);
					if (dragItem) {
						if (lastPoint && !lastPoint.equals(point))
							callEvent(this, 'mousedrag', event, point, dragItem,
									lastPoint);
						if (item !== dragItem) {
							overPoint = point;
							callEvent(this, 'mousemove', event, point, item,
									overPoint);
						}
					}
					if (!stopped && item && item === downItem) {
						clickTime = Date.now();
						callEvent(this, dblClick && downItem.responds('doubleclick')
								? 'doubleclick' : 'click', event, downPoint, item);
						dblClick = false;
					}
					downItem = dragItem = null;
					break;
				case 'mousemove':
					if (dragItem)
						stopped = callEvent(this, 'mousedrag', event, point,
								dragItem, lastPoint);
					if (!stopped) {
						if (item !== overItem)
							overPoint = point;
						stopped = callEvent(this, type, event, point, item,
								overPoint);
					}
					lastPoint = overPoint = point;
					if (item !== overItem) {
						callEvent(this, 'mouseleave', event, point, overItem);
						overItem = item;
						callEvent(this, 'mouseenter', event, point, item);
					}
					break;
				}
				return stopped;
			}
		};
	});
	
	var Event = Base.extend({
		_class: 'Event',
	
		initialize: function Event(event) {
			this.event = event;
		},
	
		isPrevented: false,
		isStopped: false,
	
		preventDefault: function() {
			this.isPrevented = true;
			this.event.preventDefault();
		},
	
		stopPropagation: function() {
			this.isStopped = true;
			this.event.stopPropagation();
		},
	
		stop: function() {
			this.stopPropagation();
			this.preventDefault();
		},
	
		getModifiers: function() {
			return Key.modifiers;
		}
	});
	
	var KeyEvent = Event.extend({
		_class: 'KeyEvent',
	
		initialize: function KeyEvent(down, key, character, event) {
			Event.call(this, event);
			this.type = down ? 'keydown' : 'keyup';
			this.key = key;
			this.character = character;
		},
	
		toString: function() {
			return "{ type: '" + this.type
					+ "', key: '" + this.key
					+ "', character: '" + this.character
					+ "', modifiers: " + this.getModifiers()
					+ " }";
		}
	});
	
	var Key = new function() {
	
		var specialKeys = {
			8: 'backspace',
			9: 'tab',
			13: 'enter',
			16: 'shift',
			17: 'control',
			18: 'option',
			19: 'pause',
			20: 'caps-lock',
			27: 'escape',
			32: 'space',
			35: 'end',
			36: 'home',
			37: 'left',
			38: 'up',
			39: 'right',
			40: 'down',
			46: 'delete',
			91: 'command',
			93: 'command',
			224: 'command'
		},
	
		specialChars = {
			9: true,
			13: true,
			32: true
		},
	
		modifiers = new Base({
			shift: false,
			control: false,
			option: false,
			command: false,
			capsLock: false,
			space: false
		}),
	
		charCodeMap = {},
		keyMap = {},
		commandFixMap,
		downCode;
	
		function handleKey(down, keyCode, charCode, event) {
			var character = charCode ? String.fromCharCode(charCode) : '',
				specialKey = specialKeys[keyCode],
				key = specialKey || character.toLowerCase(),
				type = down ? 'keydown' : 'keyup',
				view = View._focused,
				scope = view && view.isVisible() && view._scope,
				tool = scope && scope.tool,
				name;
			keyMap[key] = down;
			if (down) {
				charCodeMap[keyCode] = charCode;
			} else {
				delete charCodeMap[keyCode];
			}
			if (specialKey && (name = Base.camelize(specialKey)) in modifiers) {
				modifiers[name] = down;
				var browser = paper.browser;
				if (name === 'command' && browser && browser.mac) {
					if (down) {
						commandFixMap = {};
					} else {
						for (var code in commandFixMap) {
							if (code in charCodeMap)
								handleKey(false, code, commandFixMap[code], event);
						}
						commandFixMap = null;
					}
				}
			} else if (down && commandFixMap) {
				commandFixMap[keyCode] = charCode;
			}
			if (tool && tool.responds(type)) {
				paper = scope;
				tool.emit(type, new KeyEvent(down, key, character, event));
				if (view)
					view.update();
			}
		}
	
		DomEvent.add(document, {
			keydown: function(event) {
				var code = event.which || event.keyCode;
				if (code in specialKeys || modifiers.command) {
					handleKey(true, code,
							code in specialChars || modifiers.command ? code : 0,
							event);
				} else {
					downCode = code;
				}
			},
	
			keypress: function(event) {
				if (downCode != null) {
					handleKey(true, downCode, event.which || event.keyCode, event);
					downCode = null;
				}
			},
	
			keyup: function(event) {
				var code = event.which || event.keyCode;
				if (code in charCodeMap)
					handleKey(false, code, charCodeMap[code], event);
			}
		});
	
		DomEvent.add(window, {
			blur: function(event) {
				for (var code in charCodeMap)
					handleKey(false, code, charCodeMap[code], event);
			}
		});
	
		return {
			modifiers: modifiers,
	
			isDown: function(key) {
				return !!keyMap[key];
			}
		};
	};
	
	var MouseEvent = Event.extend({
		_class: 'MouseEvent',
	
		initialize: function MouseEvent(type, event, point, target, delta) {
			Event.call(this, event);
			this.type = type;
			this.point = point;
			this.target = target;
			this.delta = delta;
		},
	
		toString: function() {
			return "{ type: '" + this.type
					+ "', point: " + this.point
					+ ', target: ' + this.target
					+ (this.delta ? ', delta: ' + this.delta : '')
					+ ', modifiers: ' + this.getModifiers()
					+ ' }';
		}
	});
	
	var ToolEvent = Event.extend({
		_class: 'ToolEvent',
		_item: null,
	
		initialize: function ToolEvent(tool, type, event) {
			this.tool = tool;
			this.type = type;
			this.event = event;
		},
	
		_choosePoint: function(point, toolPoint) {
			return point ? point : toolPoint ? toolPoint.clone() : null;
		},
	
		getPoint: function() {
			return this._choosePoint(this._point, this.tool._point);
		},
	
		setPoint: function(point) {
			this._point = point;
		},
	
		getLastPoint: function() {
			return this._choosePoint(this._lastPoint, this.tool._lastPoint);
		},
	
		setLastPoint: function(lastPoint) {
			this._lastPoint = lastPoint;
		},
	
		getDownPoint: function() {
			return this._choosePoint(this._downPoint, this.tool._downPoint);
		},
	
		setDownPoint: function(downPoint) {
			this._downPoint = downPoint;
		},
	
		getMiddlePoint: function() {
			if (!this._middlePoint && this.tool._lastPoint) {
				return this.tool._point.add(this.tool._lastPoint).divide(2);
			}
			return this._middlePoint;
		},
	
		setMiddlePoint: function(middlePoint) {
			this._middlePoint = middlePoint;
		},
	
		getDelta: function() {
			return !this._delta && this.tool._lastPoint
					? this.tool._point.subtract(this.tool._lastPoint)
					: this._delta;
		},
	
		setDelta: function(delta) {
			this._delta = delta;
		},
	
		getCount: function() {
			return /^mouse(down|up)$/.test(this.type)
					? this.tool._downCount
					: this.tool._count;
		},
	
		setCount: function(count) {
			this.tool[/^mouse(down|up)$/.test(this.type) ? 'downCount' : 'count']
				= count;
		},
	
		getItem: function() {
			if (!this._item) {
				var result = this.tool._scope.project.hitTest(this.getPoint());
				if (result) {
					var item = result.item,
						parent = item._parent;
					while (/^(Group|CompoundPath)$/.test(parent._class)) {
						item = parent;
						parent = parent._parent;
					}
					this._item = item;
				}
			}
			return this._item;
		},
	
		setItem: function(item) {
			this._item = item;
		},
	
		toString: function() {
			return '{ type: ' + this.type
					+ ', point: ' + this.getPoint()
					+ ', count: ' + this.getCount()
					+ ', modifiers: ' + this.getModifiers()
					+ ' }';
		}
	});
	
	var Tool = PaperScopeItem.extend({
		_class: 'Tool',
		_list: 'tools',
		_reference: 'tool',
		_events: [ 'onActivate', 'onDeactivate', 'onEditOptions',
				'onMouseDown', 'onMouseUp', 'onMouseDrag', 'onMouseMove',
				'onKeyDown', 'onKeyUp' ],
	
		initialize: function Tool(props) {
			PaperScopeItem.call(this);
			this._firstMove = true;
			this._count = 0;
			this._downCount = 0;
			this._set(props);
		},
	
		getMinDistance: function() {
			return this._minDistance;
		},
	
		setMinDistance: function(minDistance) {
			this._minDistance = minDistance;
			if (minDistance != null && this._maxDistance != null
					&& minDistance > this._maxDistance) {
				this._maxDistance = minDistance;
			}
		},
	
		getMaxDistance: function() {
			return this._maxDistance;
		},
	
		setMaxDistance: function(maxDistance) {
			this._maxDistance = maxDistance;
			if (this._minDistance != null && maxDistance != null
					&& maxDistance < this._minDistance) {
				this._minDistance = maxDistance;
			}
		},
	
		getFixedDistance: function() {
			return this._minDistance == this._maxDistance
				? this._minDistance : null;
		},
	
		setFixedDistance: function(distance) {
			this._minDistance = this._maxDistance = distance;
		},
	
		_updateEvent: function(type, point, minDistance, maxDistance, start,
				needsChange, matchMaxDistance) {
			if (!start) {
				if (minDistance != null || maxDistance != null) {
					var minDist = minDistance != null ? minDistance : 0,
						vector = point.subtract(this._point),
						distance = vector.getLength();
					if (distance < minDist)
						return false;
					if (maxDistance != null && maxDistance != 0) {
						if (distance > maxDistance) {
							point = this._point.add(vector.normalize(maxDistance));
						} else if (matchMaxDistance) {
							return false;
						}
					}
				}
				if (needsChange && point.equals(this._point))
					return false;
			}
			this._lastPoint = start && type == 'mousemove' ? point : this._point;
			this._point = point;
			switch (type) {
			case 'mousedown':
				this._lastPoint = this._downPoint;
				this._downPoint = this._point;
				this._downCount++;
				break;
			case 'mouseup':
				this._lastPoint = this._downPoint;
				break;
			}
			this._count = start ? 0 : this._count + 1;
			return true;
		},
	
		_fireEvent: function(type, event) {
			var sets = paper.project._removeSets;
			if (sets) {
				if (type === 'mouseup')
					sets.mousedrag = null;
				var set = sets[type];
				if (set) {
					for (var id in set) {
						var item = set[id];
						for (var key in sets) {
							var other = sets[key];
							if (other && other != set)
								delete other[item._id];
						}
						item.remove();
					}
					sets[type] = null;
				}
			}
			return this.responds(type)
					&& this.emit(type, new ToolEvent(this, type, event));
		},
	
		_handleEvent: function(type, point, event) {
			paper = this._scope;
			var called = false;
			switch (type) {
			case 'mousedown':
				this._updateEvent(type, point, null, null, true, false, false);
				called = this._fireEvent(type, event);
				break;
			case 'mousedrag':
				var needsChange = false,
					matchMaxDistance = false;
				while (this._updateEvent(type, point, this.minDistance,
						this.maxDistance, false, needsChange, matchMaxDistance)) {
					called = this._fireEvent(type, event) || called;
					needsChange = true;
					matchMaxDistance = true;
				}
				break;
			case 'mouseup':
				if (!point.equals(this._point)
						&& this._updateEvent('mousedrag', point, this.minDistance,
								this.maxDistance, false, false, false)) {
					called = this._fireEvent('mousedrag', event);
				}
				this._updateEvent(type, point, null, this.maxDistance, false,
						false, false);
				called = this._fireEvent(type, event) || called;
				this._updateEvent(type, point, null, null, true, false, false);
				this._firstMove = true;
				break;
			case 'mousemove':
				while (this._updateEvent(type, point, this.minDistance,
						this.maxDistance, this._firstMove, true, false)) {
					called = this._fireEvent(type, event) || called;
					this._firstMove = false;
				}
				break;
			}
			if (called)
				event.preventDefault();
			return called;
		}
	
	});
	
	var Http = {
		request: function(method, url, callback, async) {
			async = (async === undefined) ? true : async;
			var xhr = new (window.ActiveXObject || XMLHttpRequest)(
						'Microsoft.XMLHTTP');
			xhr.open(method.toUpperCase(), url, async);
			if ('overrideMimeType' in xhr)
				xhr.overrideMimeType('text/plain');
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					var status = xhr.status;
					if (status === 0 || status === 200) {
						callback.call(xhr, xhr.responseText);
					} else {
						throw new Error('Could not load ' + url + ' (Error '
								+ status + ')');
					}
				}
			};
			return xhr.send(null);
		}
	};
	
	var CanvasProvider = {
		canvases: [],
	
		getCanvas: function(width, height) {
			var canvas,
				clear = true;
			if (typeof width === 'object') {
				height = width.height;
				width = width.width;
			}
			if (this.canvases.length) {
				canvas = this.canvases.pop();
			} else {
				canvas = document.createElement('canvas');
			}
			var ctx = canvas.getContext('2d');
			if (canvas.width === width && canvas.height === height) {
				if (clear)
					ctx.clearRect(0, 0, width + 1, height + 1);
			} else {
				canvas.width = width;
				canvas.height = height;
			}
			ctx.save();
			return canvas;
		},
	
		getContext: function(width, height) {
			return this.getCanvas(width, height).getContext('2d');
		},
	
		release: function(obj) {
			var canvas = obj.canvas ? obj.canvas : obj;
			canvas.getContext('2d').restore();
			this.canvases.push(canvas);
		}
	};
	
	var BlendMode = new function() {
		var min = Math.min,
			max = Math.max,
			abs = Math.abs,
			sr, sg, sb, sa,
			br, bg, bb, ba,
			dr, dg, db;
	
		function getLum(r, g, b) {
			return 0.2989 * r + 0.587 * g + 0.114 * b;
		}
	
		function setLum(r, g, b, l) {
			var d = l - getLum(r, g, b);
			dr = r + d;
			dg = g + d;
			db = b + d;
			var l = getLum(dr, dg, db),
				mn = min(dr, dg, db),
				mx = max(dr, dg, db);
			if (mn < 0) {
				var lmn = l - mn;
				dr = l + (dr - l) * l / lmn;
				dg = l + (dg - l) * l / lmn;
				db = l + (db - l) * l / lmn;
			}
			if (mx > 255) {
				var ln = 255 - l,
					mxl = mx - l;
				dr = l + (dr - l) * ln / mxl;
				dg = l + (dg - l) * ln / mxl;
				db = l + (db - l) * ln / mxl;
			}
		}
	
		function getSat(r, g, b) {
			return max(r, g, b) - min(r, g, b);
		}
	
		function setSat(r, g, b, s) {
			var col = [r, g, b],
				mx = max(r, g, b),
				mn = min(r, g, b),
				md;
			mn = mn === r ? 0 : mn === g ? 1 : 2;
			mx = mx === r ? 0 : mx === g ? 1 : 2;
			md = min(mn, mx) === 0 ? max(mn, mx) === 1 ? 2 : 1 : 0;
			if (col[mx] > col[mn]) {
				col[md] = (col[md] - col[mn]) * s / (col[mx] - col[mn]);
				col[mx] = s;
			} else {
				col[md] = col[mx] = 0;
			}
			col[mn] = 0;
			dr = col[0];
			dg = col[1];
			db = col[2];
		}
	
		var modes = {
			multiply: function() {
				dr = br * sr / 255;
				dg = bg * sg / 255;
				db = bb * sb / 255;
			},
	
			screen: function() {
				dr = br + sr - (br * sr / 255);
				dg = bg + sg - (bg * sg / 255);
				db = bb + sb - (bb * sb / 255);
			},
	
			overlay: function() {
				dr = br < 128 ? 2 * br * sr / 255 : 255 - 2 * (255 - br) * (255 - sr) / 255;
				dg = bg < 128 ? 2 * bg * sg / 255 : 255 - 2 * (255 - bg) * (255 - sg) / 255;
				db = bb < 128 ? 2 * bb * sb / 255 : 255 - 2 * (255 - bb) * (255 - sb) / 255;
			},
	
			'soft-light': function() {
				var t = sr * br / 255;
				dr = t + br * (255 - (255 - br) * (255 - sr) / 255 - t) / 255;
				t = sg * bg / 255;
				dg = t + bg * (255 - (255 - bg) * (255 - sg) / 255 - t) / 255;
				t = sb * bb / 255;
				db = t + bb * (255 - (255 - bb) * (255 - sb) / 255 - t) / 255;
			},
	
			'hard-light': function() {
				dr = sr < 128 ? 2 * sr * br / 255 : 255 - 2 * (255 - sr) * (255 - br) / 255;
				dg = sg < 128 ? 2 * sg * bg / 255 : 255 - 2 * (255 - sg) * (255 - bg) / 255;
				db = sb < 128 ? 2 * sb * bb / 255 : 255 - 2 * (255 - sb) * (255 - bb) / 255;
			},
	
			'color-dodge': function() {
				dr = br === 0 ? 0 : sr === 255 ? 255 : min(255, 255 * br / (255 - sr));
				dg = bg === 0 ? 0 : sg === 255 ? 255 : min(255, 255 * bg / (255 - sg));
				db = bb === 0 ? 0 : sb === 255 ? 255 : min(255, 255 * bb / (255 - sb));
			},
	
			'color-burn': function() {
				dr = br === 255 ? 255 : sr === 0 ? 0 : max(0, 255 - (255 - br) * 255 / sr);
				dg = bg === 255 ? 255 : sg === 0 ? 0 : max(0, 255 - (255 - bg) * 255 / sg);
				db = bb === 255 ? 255 : sb === 0 ? 0 : max(0, 255 - (255 - bb) * 255 / sb);
			},
	
			darken: function() {
				dr = br < sr ? br : sr;
				dg = bg < sg ? bg : sg;
				db = bb < sb ? bb : sb;
			},
	
			lighten: function() {
				dr = br > sr ? br : sr;
				dg = bg > sg ? bg : sg;
				db = bb > sb ? bb : sb;
			},
	
			difference: function() {
				dr = br - sr;
				if (dr < 0)
					dr = -dr;
				dg = bg - sg;
				if (dg < 0)
					dg = -dg;
				db = bb - sb;
				if (db < 0)
					db = -db;
			},
	
			exclusion: function() {
				dr = br + sr * (255 - br - br) / 255;
				dg = bg + sg * (255 - bg - bg) / 255;
				db = bb + sb * (255 - bb - bb) / 255;
			},
	
			hue: function() {
				setSat(sr, sg, sb, getSat(br, bg, bb));
				setLum(dr, dg, db, getLum(br, bg, bb));
			},
	
			saturation: function() {
				setSat(br, bg, bb, getSat(sr, sg, sb));
				setLum(dr, dg, db, getLum(br, bg, bb));
			},
	
			luminosity: function() {
				setLum(br, bg, bb, getLum(sr, sg, sb));
			},
	
			color: function() {
				setLum(sr, sg, sb, getLum(br, bg, bb));
			},
	
			add: function() {
				dr = min(br + sr, 255);
				dg = min(bg + sg, 255);
				db = min(bb + sb, 255);
			},
	
			subtract: function() {
				dr = max(br - sr, 0);
				dg = max(bg - sg, 0);
				db = max(bb - sb, 0);
			},
	
			average: function() {
				dr = (br + sr) / 2;
				dg = (bg + sg) / 2;
				db = (bb + sb) / 2;
			},
	
			negation: function() {
				dr = 255 - abs(255 - sr - br);
				dg = 255 - abs(255 - sg - bg);
				db = 255 - abs(255 - sb - bb);
			}
		};
	
		var nativeModes = this.nativeModes = Base.each([
			'source-over', 'source-in', 'source-out', 'source-atop',
			'destination-over', 'destination-in', 'destination-out',
			'destination-atop', 'lighter', 'darker', 'copy', 'xor'
		], function(mode) {
			this[mode] = true;
		}, {});
	
		var ctx = CanvasProvider.getContext(1, 1);
		Base.each(modes, function(func, mode) {
			var darken = mode === 'darken',
				ok = false;
			ctx.save();
			try {
				ctx.fillStyle = darken ? '#300' : '#a00';
				ctx.fillRect(0, 0, 1, 1);
				ctx.globalCompositeOperation = mode;
				if (ctx.globalCompositeOperation === mode) {
					ctx.fillStyle = darken ? '#a00' : '#300';
					ctx.fillRect(0, 0, 1, 1);
					ok = ctx.getImageData(0, 0, 1, 1).data[0] !== darken ? 170 : 51;
				}
			} catch (e) {}
			ctx.restore();
			nativeModes[mode] = ok;
		});
		CanvasProvider.release(ctx);
	
		this.process = function(mode, srcContext, dstContext, alpha, offset) {
			var srcCanvas = srcContext.canvas,
				normal = mode === 'normal';
			if (normal || nativeModes[mode]) {
				dstContext.save();
				dstContext.setTransform(1, 0, 0, 1, 0, 0);
				dstContext.globalAlpha = alpha;
				if (!normal)
					dstContext.globalCompositeOperation = mode;
				dstContext.drawImage(srcCanvas, offset.x, offset.y);
				dstContext.restore();
			} else {
				var process = modes[mode];
				if (!process)
					return;
				var dstData = dstContext.getImageData(offset.x, offset.y,
						srcCanvas.width, srcCanvas.height),
					dst = dstData.data,
					src = srcContext.getImageData(0, 0,
						srcCanvas.width, srcCanvas.height).data;
				for (var i = 0, l = dst.length; i < l; i += 4) {
					sr = src[i];
					br = dst[i];
					sg = src[i + 1];
					bg = dst[i + 1];
					sb = src[i + 2];
					bb = dst[i + 2];
					sa = src[i + 3];
					ba = dst[i + 3];
					process();
					var a1 = sa * alpha / 255,
						a2 = 1 - a1;
					dst[i] = a1 * dr + a2 * br;
					dst[i + 1] = a1 * dg + a2 * bg;
					dst[i + 2] = a1 * db + a2 * bb;
					dst[i + 3] = sa * alpha + a2 * ba;
				}
				dstContext.putImageData(dstData, offset.x, offset.y);
			}
		};
	};
	
	var SVGStyles = Base.each({
		fillColor: ['fill', 'color'],
		strokeColor: ['stroke', 'color'],
		strokeWidth: ['stroke-width', 'number'],
		strokeCap: ['stroke-linecap', 'string'],
		strokeJoin: ['stroke-linejoin', 'string'],
		strokeScaling: ['vector-effect', 'lookup', {
			true: 'none',
			false: 'non-scaling-stroke'
		}, function(item, value) {
			return !value
					&& (item instanceof PathItem
						|| item instanceof Shape
						|| item instanceof TextItem);
		}],
		miterLimit: ['stroke-miterlimit', 'number'],
		dashArray: ['stroke-dasharray', 'array'],
		dashOffset: ['stroke-dashoffset', 'number'],
		fontFamily: ['font-family', 'string'],
		fontWeight: ['font-weight', 'string'],
		fontSize: ['font-size', 'number'],
		justification: ['text-anchor', 'lookup', {
			left: 'start',
			center: 'middle',
			right: 'end'
		}],
		opacity: ['opacity', 'number'],
		blendMode: ['mix-blend-mode', 'string']
	}, function(entry, key) {
		var part = Base.capitalize(key),
			lookup = entry[2];
		this[key] = {
			type: entry[1],
			property: key,
			attribute: entry[0],
			toSVG: lookup,
			fromSVG: lookup && Base.each(lookup, function(value, name) {
				this[value] = name;
			}, {}),
			exportFilter: entry[3],
			get: 'get' + part,
			set: 'set' + part
		};
	}, {});
	
	var SVGNamespaces = {
		href: 'http://www.w3.org/1999/xlink',
		xlink: 'http://www.w3.org/2000/xmlns'
	};
	
	new function() {
		var formatter;
	
		function setAttributes(node, attrs) {
			for (var key in attrs) {
				var val = attrs[key],
					namespace = SVGNamespaces[key];
				if (typeof val === 'number')
					val = formatter.number(val);
				if (namespace) {
					node.setAttributeNS(namespace, key, val);
				} else {
					node.setAttribute(key, val);
				}
			}
			return node;
		}
	
		function createElement(tag, attrs) {
			return setAttributes(
				document.createElementNS('http://www.w3.org/2000/svg', tag), attrs);
		}
	
		function getTransform(matrix, coordinates, center) {
			var attrs = new Base(),
				trans = matrix.getTranslation();
			if (coordinates) {
				matrix = matrix.shiftless();
				var point = matrix._inverseTransform(trans);
				attrs[center ? 'cx' : 'x'] = point.x;
				attrs[center ? 'cy' : 'y'] = point.y;
				trans = null;
			}
			if (!matrix.isIdentity()) {
				var decomposed = matrix.decompose();
				if (decomposed && !decomposed.shearing) {
					var parts = [],
						angle = decomposed.rotation,
						scale = decomposed.scaling;
					if (trans && !trans.isZero())
						parts.push('translate(' + formatter.point(trans) + ')');
					if (!Numerical.isZero(scale.x - 1)
							|| !Numerical.isZero(scale.y - 1))
						parts.push('scale(' + formatter.point(scale) +')');
					if (angle)
						parts.push('rotate(' + formatter.number(angle) + ')');
					attrs.transform = parts.join(' ');
				} else {
					attrs.transform = 'matrix(' + matrix.getValues().join(',') + ')';
				}
			}
			return attrs;
		}
	
		function exportGroup(item, options) {
			var attrs = getTransform(item._matrix),
				children = item._children;
			var node = createElement('g', attrs);
			for (var i = 0, l = children.length; i < l; i++) {
				var child = children[i];
				var childNode = exportSVG(child, options);
				if (childNode) {
					if (child.isClipMask()) {
						var clip = createElement('clipPath');
						clip.appendChild(childNode);
						setDefinition(child, clip, 'clip');
						setAttributes(node, {
							'clip-path': 'url(#' + clip.id + ')'
						});
					} else {
						node.appendChild(childNode);
					}
				}
			}
			return node;
		}
	
		function exportRaster(item, options) {
			var attrs = getTransform(item._matrix, true),
				size = item.getSize(),
				image = item.getImage();
			attrs.x -= size.width / 2;
			attrs.y -= size.height / 2;
			attrs.width = size.width;
			attrs.height = size.height;
			attrs.href = options.embedImages === false && image && image.src
					|| item.toDataURL();
			return createElement('image', attrs);
		}
	
		function exportPath(item, options) {
			var matchShapes = options.matchShapes;
			if (matchShapes) {
				var shape = item.toShape(false);
				if (shape)
					return exportShape(shape, options);
			}
			var segments = item._segments,
				type,
				attrs = getTransform(item._matrix);
			if (segments.length === 0)
				return null;
			if (matchShapes && !item.hasHandles()) {
				if (segments.length >= 3) {
					type = item._closed ? 'polygon' : 'polyline';
					var parts = [];
					for(var i = 0, l = segments.length; i < l; i++)
						parts.push(formatter.point(segments[i]._point));
					attrs.points = parts.join(' ');
				} else {
					type = 'line';
					var first = segments[0]._point,
						last = segments[segments.length - 1]._point;
					attrs.set({
						x1: first.x,
						y1: first.y,
						x2: last.x,
						y2: last.y
					});
				}
			} else {
				type = 'path';
				attrs.d = item.getPathData(null, options.precision);
			}
			return createElement(type, attrs);
		}
	
		function exportShape(item) {
			var type = item._type,
				radius = item._radius,
				attrs = getTransform(item._matrix, true, type !== 'rectangle');
			if (type === 'rectangle') {
				type = 'rect';
				var size = item._size,
					width = size.width,
					height = size.height;
				attrs.x -= width / 2;
				attrs.y -= height / 2;
				attrs.width = width;
				attrs.height = height;
				if (radius.isZero())
					radius = null;
			}
			if (radius) {
				if (type === 'circle') {
					attrs.r = radius;
				} else {
					attrs.rx = radius.width;
					attrs.ry = radius.height;
				}
			}
			return createElement(type, attrs);
		}
	
		function exportCompoundPath(item, options) {
			var attrs = getTransform(item._matrix);
			var data = item.getPathData(null, options.precision);
			if (data)
				attrs.d = data;
			return createElement('path', attrs);
		}
	
		function exportPlacedSymbol(item, options) {
			var attrs = getTransform(item._matrix, true),
				symbol = item.getSymbol(),
				symbolNode = getDefinition(symbol, 'symbol'),
				definition = symbol.getDefinition(),
				bounds = definition.getBounds();
			if (!symbolNode) {
				symbolNode = createElement('symbol', {
					viewBox: formatter.rectangle(bounds)
				});
				symbolNode.appendChild(exportSVG(definition, options));
				setDefinition(symbol, symbolNode, 'symbol');
			}
			attrs.href = '#' + symbolNode.id;
			attrs.x += bounds.x;
			attrs.y += bounds.y;
			attrs.width = formatter.number(bounds.width);
			attrs.height = formatter.number(bounds.height);
			attrs.overflow = 'visible';
			return createElement('use', attrs);
		}
	
		function exportGradient(color) {
			var gradientNode = getDefinition(color, 'color');
			if (!gradientNode) {
				var gradient = color.getGradient(),
					radial = gradient._radial,
					origin = color.getOrigin().transform(),
					destination = color.getDestination().transform(),
					attrs;
				if (radial) {
					attrs = {
						cx: origin.x,
						cy: origin.y,
						r: origin.getDistance(destination)
					};
					var highlight = color.getHighlight();
					if (highlight) {
						highlight = highlight.transform();
						attrs.fx = highlight.x;
						attrs.fy = highlight.y;
					}
				} else {
					attrs = {
						x1: origin.x,
						y1: origin.y,
						x2: destination.x,
						y2: destination.y
					};
				}
				attrs.gradientUnits = 'userSpaceOnUse';
				gradientNode = createElement(
						(radial ? 'radial' : 'linear') + 'Gradient', attrs);
				var stops = gradient._stops;
				for (var i = 0, l = stops.length; i < l; i++) {
					var stop = stops[i],
						stopColor = stop._color,
						alpha = stopColor.getAlpha();
					attrs = {
						offset: stop._rampPoint,
						'stop-color': stopColor.toCSS(true)
					};
					if (alpha < 1)
						attrs['stop-opacity'] = alpha;
					gradientNode.appendChild(createElement('stop', attrs));
				}
				setDefinition(color, gradientNode, 'color');
			}
			return 'url(#' + gradientNode.id + ')';
		}
	
		function exportText(item) {
			var node = createElement('text', getTransform(item._matrix, true));
			node.textContent = item._content;
			return node;
		}
	
		var exporters = {
			Group: exportGroup,
			Layer: exportGroup,
			Raster: exportRaster,
			Path: exportPath,
			Shape: exportShape,
			CompoundPath: exportCompoundPath,
			PlacedSymbol: exportPlacedSymbol,
			PointText: exportText
		};
	
		function applyStyle(item, node, isRoot) {
			var attrs = {},
				parent = !isRoot && item.getParent();
	
			if (item._name != null)
				attrs.id = item._name;
	
			Base.each(SVGStyles, function(entry) {
				var get = entry.get,
					type = entry.type,
					value = item[get]();
				if (entry.exportFilter
						? entry.exportFilter(item, value)
						: !parent || !Base.equals(parent[get](), value)) {
					if (type === 'color' && value != null) {
						var alpha = value.getAlpha();
						if (alpha < 1)
							attrs[entry.attribute + '-opacity'] = alpha;
					}
					attrs[entry.attribute] = value == null
						? 'none'
						: type === 'number'
							? formatter.number(value)
							: type === 'color'
								? value.gradient
									? exportGradient(value, item)
									: value.toCSS(true)
								: type === 'array'
									? value.join(',')
									: type === 'lookup'
										? entry.toSVG[value]
										: value;
				}
			});
	
			if (attrs.opacity === 1)
				delete attrs.opacity;
	
			if (!item._visible)
				attrs.visibility = 'hidden';
	
			return setAttributes(node, attrs);
		}
	
		var definitions;
		function getDefinition(item, type) {
			if (!definitions)
				definitions = { ids: {}, svgs: {} };
			return item && definitions.svgs[type + '-' + item._id];
		}
	
		function setDefinition(item, node, type) {
			if (!definitions)
				getDefinition();
			var id = definitions.ids[type] = (definitions.ids[type] || 0) + 1;
			node.id = type + '-' + id;
			definitions.svgs[type + '-' + item._id] = node;
		}
	
		function exportDefinitions(node, options) {
			var svg = node,
				defs = null;
			if (definitions) {
				svg = node.nodeName.toLowerCase() === 'svg' && node;
				for (var i in definitions.svgs) {
					if (!defs) {
						if (!svg) {
							svg = createElement('svg');
							svg.appendChild(node);
						}
						defs = svg.insertBefore(createElement('defs'),
								svg.firstChild);
					}
					defs.appendChild(definitions.svgs[i]);
				}
				definitions = null;
			}
			return options.asString
					? new XMLSerializer().serializeToString(svg)
					: svg;
		}
	
		function exportSVG(item, options, isRoot) {
			var exporter = exporters[item._class],
				node = exporter && exporter(item, options);
			if (node) {
				var onExport = options.onExport;
				if (onExport)
					node = onExport(item, node, options) || node;
				var data = JSON.stringify(item._data);
				if (data && data !== '{}' && data !== 'null')
					node.setAttribute('data-paper-data', data);
			}
			return node && applyStyle(item, node, isRoot);
		}
	
		function setOptions(options) {
			if (!options)
				options = {};
			formatter = new Formatter(options.precision);
			return options;
		}
	
		Item.inject({
			exportSVG: function(options) {
				options = setOptions(options);
				return exportDefinitions(exportSVG(this, options, true), options);
			}
		});
	
		Project.inject({
			exportSVG: function(options) {
				options = setOptions(options);
				var layers = this.layers,
					view = this.getView(),
					size = view.getViewSize(),
					node = createElement('svg', {
						x: 0,
						y: 0,
						width: size.width,
						height: size.height,
						version: '1.1',
						xmlns: 'http://www.w3.org/2000/svg',
						'xmlns:xlink': 'http://www.w3.org/1999/xlink'
					}),
					parent = node,
					matrix = view._matrix;
				if (!matrix.isIdentity())
					parent = node.appendChild(
							createElement('g', getTransform(matrix)));
				for (var i = 0, l = layers.length; i < l; i++)
					parent.appendChild(exportSVG(layers[i], options, true));
				return exportDefinitions(node, options);
			}
		});
	};
	
	new function() {
	
		function getValue(node, name, isString, allowNull) {
			var namespace = SVGNamespaces[name],
				value = namespace
					? node.getAttributeNS(namespace, name)
					: node.getAttribute(name);
			if (value === 'null')
				value = null;
			return value == null
					? allowNull
						? null
						: isString
							? ''
							: 0
					: isString
						? value
						: parseFloat(value);
		}
	
		function getPoint(node, x, y, allowNull) {
			x = getValue(node, x, false, allowNull);
			y = getValue(node, y, false, allowNull);
			return allowNull && (x == null || y == null) ? null
					: new Point(x, y);
		}
	
		function getSize(node, w, h, allowNull) {
			w = getValue(node, w, false, allowNull);
			h = getValue(node, h, false, allowNull);
			return allowNull && (w == null || h == null) ? null
					: new Size(w, h);
		}
	
		function convertValue(value, type, lookup) {
			return value === 'none'
					? null
					: type === 'number'
						? parseFloat(value)
						: type === 'array'
							? value ? value.split(/[\s,]+/g).map(parseFloat) : []
							: type === 'color'
								? getDefinition(value) || value
								: type === 'lookup'
									? lookup[value]
									: value;
		}
	
		function importGroup(node, type, options, isRoot) {
			var nodes = node.childNodes,
				isClip = type === 'clippath',
				item = new Group(),
				project = item._project,
				currentStyle = project._currentStyle,
				children = [];
			if (!isClip) {
				item = applyAttributes(item, node, isRoot);
				project._currentStyle = item._style.clone();
			}
			if (isRoot) {
				var defs = node.querySelectorAll('defs');
				for (var i = 0, l = defs.length; i < l; i++) {
					importSVG(defs[i], options, false);
				}
			}
			for (var i = 0, l = nodes.length; i < l; i++) {
				var childNode = nodes[i],
					child;
				if (childNode.nodeType === 1
						&& childNode.nodeName.toLowerCase() !== 'defs'
						&& (child = importSVG(childNode, options, false))
						&& !(child instanceof Symbol))
					children.push(child);
			}
			item.addChildren(children);
			if (isClip)
				item = applyAttributes(item.reduce(), node, isRoot);
			project._currentStyle = currentStyle;
			if (isClip || type === 'defs') {
				item.remove();
				item = null;
			}
			return item;
		}
	
		function importPoly(node, type) {
			var coords = node.getAttribute('points').match(
						/[+-]?(?:\d*\.\d+|\d+\.?)(?:[eE][+-]?\d+)?/g),
				points = [];
			for (var i = 0, l = coords.length; i < l; i += 2)
				points.push(new Point(
						parseFloat(coords[i]),
						parseFloat(coords[i + 1])));
			var path = new Path(points);
			if (type === 'polygon')
				path.closePath();
			return path;
		}
	
		function importPath(node) {
			var data = node.getAttribute('d'),
				param = { pathData: data };
			return (data.match(/m/gi) || []).length > 1 || /z\S+/i.test(data)
					? new CompoundPath(param)
					: new Path(param);
		}
	
		function importGradient(node, type) {
			var id = (getValue(node, 'href', true) || '').substring(1),
				isRadial = type === 'radialgradient',
				gradient;
			if (id) {
				gradient = definitions[id].getGradient();
			} else {
				var nodes = node.childNodes,
					stops = [];
				for (var i = 0, l = nodes.length; i < l; i++) {
					var child = nodes[i];
					if (child.nodeType === 1)
						stops.push(applyAttributes(new GradientStop(), child));
				}
				gradient = new Gradient(stops, isRadial);
			}
			var origin, destination, highlight;
			if (isRadial) {
				origin = getPoint(node, 'cx', 'cy');
				destination = origin.add(getValue(node, 'r'), 0);
				highlight = getPoint(node, 'fx', 'fy', true);
			} else {
				origin = getPoint(node, 'x1', 'y1');
				destination = getPoint(node, 'x2', 'y2');
			}
			applyAttributes(
				new Color(gradient, origin, destination, highlight), node);
			return null;
		}
	
		var importers = {
			'#document': function (node, type, options, isRoot) {
				var nodes = node.childNodes;
				for (var i = 0, l = nodes.length; i < l; i++) {
					var child = nodes[i];
					if (child.nodeType === 1) {
						var next = child.nextSibling;
						document.body.appendChild(child);
						var item = importSVG(child, options, isRoot);
						if (next) {
							node.insertBefore(child, next);
						} else {
							node.appendChild(child);
						}
						return item;
					}
				}
			},
			g: importGroup,
			svg: importGroup,
			clippath: importGroup,
			polygon: importPoly,
			polyline: importPoly,
			path: importPath,
			lineargradient: importGradient,
			radialgradient: importGradient,
	
			image: function (node) {
				var raster = new Raster(getValue(node, 'href', true));
				raster.on('load', function() {
					var size = getSize(node, 'width', 'height');
					this.setSize(size);
					var center = this._matrix._transformPoint(
							getPoint(node, 'x', 'y').add(size.divide(2)));
					this.translate(center);
				});
				return raster;
			},
	
			symbol: function(node, type, options, isRoot) {
				return new Symbol(importGroup(node, type, options, isRoot), true);
			},
	
			defs: importGroup,
	
			use: function(node) {
				var id = (getValue(node, 'href', true) || '').substring(1),
					definition = definitions[id],
					point = getPoint(node, 'x', 'y');
				return definition
						? definition instanceof Symbol
							? definition.place(point)
							: definition.clone().translate(point)
						: null;
			},
	
			circle: function(node) {
				return new Shape.Circle(getPoint(node, 'cx', 'cy'),
						getValue(node, 'r'));
			},
	
			ellipse: function(node) {
				return new Shape.Ellipse({
					center: getPoint(node, 'cx', 'cy'),
					radius: getSize(node, 'rx', 'ry')
				});
			},
	
			rect: function(node) {
				var point = getPoint(node, 'x', 'y'),
					size = getSize(node, 'width', 'height'),
					radius = getSize(node, 'rx', 'ry');
				return new Shape.Rectangle(new Rectangle(point, size), radius);
			},
	
			line: function(node) {
				return new Path.Line(getPoint(node, 'x1', 'y1'),
						getPoint(node, 'x2', 'y2'));
			},
	
			text: function(node) {
				var text = new PointText(getPoint(node, 'x', 'y')
						.add(getPoint(node, 'dx', 'dy')));
				text.setContent(node.textContent.trim() || '');
				return text;
			}
		};
	
		function applyTransform(item, value, name, node) {
			var transforms = (node.getAttribute(name) || '').split(/\)\s*/g),
				matrix = new Matrix();
			for (var i = 0, l = transforms.length; i < l; i++) {
				var transform = transforms[i];
				if (!transform)
					break;
				var parts = transform.split(/\(\s*/),
					command = parts[0],
					v = parts[1].split(/[\s,]+/g);
				for (var j = 0, m = v.length; j < m; j++)
					v[j] = parseFloat(v[j]);
				switch (command) {
				case 'matrix':
					matrix.concatenate(
							new Matrix(v[0], v[1], v[2], v[3], v[4], v[5]));
					break;
				case 'rotate':
					matrix.rotate(v[0], v[1], v[2]);
					break;
				case 'translate':
					matrix.translate(v[0], v[1]);
					break;
				case 'scale':
					matrix.scale(v);
					break;
				case 'skewX':
					matrix.skew(v[0], 0);
					break;
				case 'skewY':
					matrix.skew(0, v[0]);
					break;
				}
			}
			item.transform(matrix);
		}
	
		function applyOpacity(item, value, name) {
			var color = item[name === 'fill-opacity' ? 'getFillColor'
					: 'getStrokeColor']();
			if (color)
				color.setAlpha(parseFloat(value));
		}
	
		var attributes = Base.set(Base.each(SVGStyles, function(entry) {
			this[entry.attribute] = function(item, value) {
				item[entry.set](convertValue(value, entry.type, entry.fromSVG));
				if (entry.type === 'color' && item instanceof Shape) {
					var color = item[entry.get]();
					if (color)
						color.transform(new Matrix().translate(
								item.getPosition(true).negate()));
				}
			};
		}, {}), {
			id: function(item, value) {
				definitions[value] = item;
				if (item.setName)
					item.setName(value);
			},
	
			'clip-path': function(item, value) {
				var clip = getDefinition(value);
				if (clip) {
					clip = clip.clone();
					clip.setClipMask(true);
					if (item instanceof Group) {
						item.insertChild(0, clip);
					} else {
						return new Group(clip, item);
					}
				}
			},
	
			gradientTransform: applyTransform,
			transform: applyTransform,
	
			'fill-opacity': applyOpacity,
			'stroke-opacity': applyOpacity,
	
			visibility: function(item, value) {
				item.setVisible(value === 'visible');
			},
	
			display: function(item, value) {
				item.setVisible(value !== null);
			},
	
			'stop-color': function(item, value) {
				if (item.setColor)
					item.setColor(value);
			},
	
			'stop-opacity': function(item, value) {
				if (item._color)
					item._color.setAlpha(parseFloat(value));
			},
	
			offset: function(item, value) {
				var percentage = value.match(/(.*)%$/);
				item.setRampPoint(percentage
						? percentage[1] / 100
						: parseFloat(value));
			},
	
			viewBox: function(item, value, name, node, styles) {
				var rect = new Rectangle(convertValue(value, 'array')),
					size = getSize(node, 'width', 'height', true);
				if (item instanceof Group) {
					var scale = size ? rect.getSize().divide(size) : 1,
						matrix = new Matrix().translate(rect.getPoint()).scale(scale);
					item.transform(matrix.inverted());
				} else if (item instanceof Symbol) {
					if (size)
						rect.setSize(size);
					var clip = getAttribute(node, 'overflow', styles) != 'visible',
						group = item._definition;
					if (clip && !rect.contains(group.getBounds())) {
						clip = new Shape.Rectangle(rect).transform(group._matrix);
						clip.setClipMask(true);
						group.addChild(clip);
					}
				}
			}
		});
	
		function getAttribute(node, name, styles) {
			var attr = node.attributes[name],
				value = attr && attr.value;
			if (!value) {
				var style = Base.camelize(name);
				value = node.style[style];
				if (!value && styles.node[style] !== styles.parent[style])
					value = styles.node[style];
			}
			return !value
					? undefined
					: value === 'none'
						? null
						: value;
		}
	
		function applyAttributes(item, node, isRoot) {
			var styles = {
				node: DomElement.getStyles(node) || {},
				parent: !isRoot && DomElement.getStyles(node.parentNode) || {}
			};
			Base.each(attributes, function(apply, name) {
				var value = getAttribute(node, name, styles);
				if (value !== undefined)
					item = Base.pick(apply(item, value, name, node, styles), item);
			});
			return item;
		}
	
		var definitions = {};
		function getDefinition(value) {
			var match = value && value.match(/\((?:#|)([^)']+)/);
			return match && definitions[match[1]];
		}
	
		function importSVG(source, options, isRoot) {
			if (!source)
				return null;
			if (!options) {
				options = {};
			} else if (typeof options === 'function') {
				options = { onLoad: options };
			}
	
			var node = source,
				scope = paper;
	
			function onLoadCallback(svg) {
				paper = scope;
				var item = importSVG(svg, options, isRoot),
					onLoad = options.onLoad,
					view = scope.project && scope.getView();
				if (onLoad)
					onLoad.call(this, item);
				view.update();
			}
	
			if (isRoot) {
				if (typeof source === 'string' && !/^.*</.test(source)) {
					node = document.getElementById(source);
					if (node) {
						source = null;
					} else {
						return Http.request('get', source, onLoadCallback);
					}
				} else if (typeof File !== 'undefined' && source instanceof File) {
					var reader = new FileReader();
					reader.onload = function() {
						onLoadCallback(reader.result);
					};
					return reader.readAsText(source);
				}
			}
	
			if (typeof source === 'string')
				node = new DOMParser().parseFromString(source, 'image/svg+xml');
			if (!node.nodeName)
				throw new Error('Unsupported SVG source: ' + source);
			var type = node.nodeName.toLowerCase(),
				importer = importers[type],
				item,
				data = node.getAttribute && node.getAttribute('data-paper-data'),
				settings = scope.settings,
				applyMatrix = settings.applyMatrix;
			settings.applyMatrix = false;
			item = importer && importer(node, type, options, isRoot) || null;
			settings.applyMatrix = applyMatrix;
			if (item) {
				if (type !== '#document' && !(item instanceof Group))
					item = applyAttributes(item, node, isRoot);
				var onImport = options.onImport;
				if (onImport)
					item = onImport(node, item, options) || item;
				if (options.expandShapes && item instanceof Shape) {
					item.remove();
					item = item.toPath();
				}
				if (data)
					item._data = JSON.parse(data);
			}
			if (isRoot) {
				definitions = {};
				if (item && Base.pick(options.applyMatrix, applyMatrix))
					item.matrix.apply(true, true);
			}
			return item;
		}
	
		Item.inject({
			importSVG: function(node, options) {
				return this.addChild(importSVG(node, options, true));
			}
		});
	
		Project.inject({
			importSVG: function(node, options) {
				this.activate();
				return importSVG(node, options, true);
			}
		});
	};
	
	Base.exports.PaperScript = (function() {
		var exports, define,
			scope = this;
	!function(e,r){return"object"==typeof exports&&"object"==typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):(r(e.acorn||(e.acorn={})),void 0)}(this,function(e){"use strict";function r(e){fr=e||{};for(var r in mr)Object.prototype.hasOwnProperty.call(fr,r)||(fr[r]=mr[r]);hr=fr.sourceFile||null}function t(e,r){var t=vr(dr,e);r+=" ("+t.line+":"+t.column+")";var n=new SyntaxError(r);throw n.pos=e,n.loc=t,n.raisedAt=br,n}function n(e){function r(e){if(1==e.length)return t+="return str === "+JSON.stringify(e[0])+";";t+="switch(str){";for(var r=0;r<e.length;++r)t+="case "+JSON.stringify(e[r])+":";t+="return true}return false;"}e=e.split(" ");var t="",n=[];e:for(var a=0;a<e.length;++a){for(var o=0;o<n.length;++o)if(n[o][0].length==e[a].length){n[o].push(e[a]);continue e}n.push([e[a]])}if(n.length>3){n.sort(function(e,r){return r.length-e.length}),t+="switch(str.length){";for(var a=0;a<n.length;++a){var i=n[a];t+="case "+i[0].length+":",r(i)}t+="}"}else r(e);return new Function("str",t)}function a(){this.line=Ar,this.column=br-Sr}function o(){Ar=1,br=Sr=0,Er=!0,u()}function i(e,r){gr=br,fr.locations&&(kr=new a),wr=e,u(),Cr=r,Er=e.beforeExpr}function s(){var e=fr.onComment&&fr.locations&&new a,r=br,n=dr.indexOf("*/",br+=2);if(-1===n&&t(br-2,"Unterminated comment"),br=n+2,fr.locations){Kt.lastIndex=r;for(var o;(o=Kt.exec(dr))&&o.index<br;)++Ar,Sr=o.index+o[0].length}fr.onComment&&fr.onComment(!0,dr.slice(r+2,n),r,br,e,fr.locations&&new a)}function c(){for(var e=br,r=fr.onComment&&fr.locations&&new a,t=dr.charCodeAt(br+=2);pr>br&&10!==t&&13!==t&&8232!==t&&8233!==t;)++br,t=dr.charCodeAt(br);fr.onComment&&fr.onComment(!1,dr.slice(e+2,br),e,br,r,fr.locations&&new a)}function u(){for(;pr>br;){var e=dr.charCodeAt(br);if(32===e)++br;else if(13===e){++br;var r=dr.charCodeAt(br);10===r&&++br,fr.locations&&(++Ar,Sr=br)}else if(10===e||8232===e||8233===e)++br,fr.locations&&(++Ar,Sr=br);else if(e>8&&14>e)++br;else if(47===e){var r=dr.charCodeAt(br+1);if(42===r)s();else{if(47!==r)break;c()}}else if(160===e)++br;else{if(!(e>=5760&&Jt.test(String.fromCharCode(e))))break;++br}}}function l(){var e=dr.charCodeAt(br+1);return e>=48&&57>=e?E(!0):(++br,i(xt))}function f(){var e=dr.charCodeAt(br+1);return Er?(++br,k()):61===e?x(Et,2):x(wt,1)}function d(){var e=dr.charCodeAt(br+1);return 61===e?x(Et,2):x(Dt,1)}function p(e){var r=dr.charCodeAt(br+1);return r===e?x(124===e?Lt:Ut,2):61===r?x(Et,2):x(124===e?Rt:Tt,1)}function h(){var e=dr.charCodeAt(br+1);return 61===e?x(Et,2):x(Vt,1)}function m(e){var r=dr.charCodeAt(br+1);return r===e?45==r&&62==dr.charCodeAt(br+2)&&Gt.test(dr.slice(Lr,br))?(br+=3,c(),u(),g()):x(St,2):61===r?x(Et,2):x(At,1)}function v(e){var r=dr.charCodeAt(br+1),t=1;return r===e?(t=62===e&&62===dr.charCodeAt(br+2)?3:2,61===dr.charCodeAt(br+t)?x(Et,t+1):x(jt,t)):33==r&&60==e&&45==dr.charCodeAt(br+2)&&45==dr.charCodeAt(br+3)?(br+=4,c(),u(),g()):(61===r&&(t=61===dr.charCodeAt(br+2)?3:2),x(Ot,t))}function b(e){var r=dr.charCodeAt(br+1);return 61===r?x(qt,61===dr.charCodeAt(br+2)?3:2):x(61===e?Ct:It,1)}function y(e){switch(e){case 46:return l();case 40:return++br,i(mt);case 41:return++br,i(vt);case 59:return++br,i(yt);case 44:return++br,i(bt);case 91:return++br,i(ft);case 93:return++br,i(dt);case 123:return++br,i(pt);case 125:return++br,i(ht);case 58:return++br,i(gt);case 63:return++br,i(kt);case 48:var r=dr.charCodeAt(br+1);if(120===r||88===r)return C();case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return E(!1);case 34:case 39:return A(e);case 47:return f(e);case 37:case 42:return d();case 124:case 38:return p(e);case 94:return h();case 43:case 45:return m(e);case 60:case 62:return v(e);case 61:case 33:return b(e);case 126:return x(It,1)}return!1}function g(e){if(e?br=yr+1:yr=br,fr.locations&&(xr=new a),e)return k();if(br>=pr)return i(Br);var r=dr.charCodeAt(br);if(Qt(r)||92===r)return L();var n=y(r);if(n===!1){var o=String.fromCharCode(r);if("\\"===o||$t.test(o))return L();t(br,"Unexpected character '"+o+"'")}return n}function x(e,r){var t=dr.slice(br,br+r);br+=r,i(e,t)}function k(){for(var e,r,n="",a=br;;){br>=pr&&t(a,"Unterminated regular expression");var o=dr.charAt(br);if(Gt.test(o)&&t(a,"Unterminated regular expression"),e)e=!1;else{if("["===o)r=!0;else if("]"===o&&r)r=!1;else if("/"===o&&!r)break;e="\\"===o}++br}var n=dr.slice(a,br);++br;var s=I();return s&&!/^[gmsiy]*$/.test(s)&&t(a,"Invalid regexp flag"),i(jr,new RegExp(n,s))}function w(e,r){for(var t=br,n=0,a=0,o=null==r?1/0:r;o>a;++a){var i,s=dr.charCodeAt(br);if(i=s>=97?s-97+10:s>=65?s-65+10:s>=48&&57>=s?s-48:1/0,i>=e)break;++br,n=n*e+i}return br===t||null!=r&&br-t!==r?null:n}function C(){br+=2;var e=w(16);return null==e&&t(yr+2,"Expected hexadecimal number"),Qt(dr.charCodeAt(br))&&t(br,"Identifier directly after number"),i(Or,e)}function E(e){var r=br,n=!1,a=48===dr.charCodeAt(br);e||null!==w(10)||t(r,"Invalid number"),46===dr.charCodeAt(br)&&(++br,w(10),n=!0);var o=dr.charCodeAt(br);(69===o||101===o)&&(o=dr.charCodeAt(++br),(43===o||45===o)&&++br,null===w(10)&&t(r,"Invalid number"),n=!0),Qt(dr.charCodeAt(br))&&t(br,"Identifier directly after number");var s,c=dr.slice(r,br);return n?s=parseFloat(c):a&&1!==c.length?/[89]/.test(c)||Tr?t(r,"Invalid number"):s=parseInt(c,8):s=parseInt(c,10),i(Or,s)}function A(e){br++;for(var r="";;){br>=pr&&t(yr,"Unterminated string constant");var n=dr.charCodeAt(br);if(n===e)return++br,i(Dr,r);if(92===n){n=dr.charCodeAt(++br);var a=/^[0-7]+/.exec(dr.slice(br,br+3));for(a&&(a=a[0]);a&&parseInt(a,8)>255;)a=a.slice(0,a.length-1);if("0"===a&&(a=null),++br,a)Tr&&t(br-2,"Octal literal in strict mode"),r+=String.fromCharCode(parseInt(a,8)),br+=a.length-1;else switch(n){case 110:r+="\n";break;case 114:r+="\r";break;case 120:r+=String.fromCharCode(S(2));break;case 117:r+=String.fromCharCode(S(4));break;case 85:r+=String.fromCharCode(S(8));break;case 116:r+="	";break;case 98:r+="\b";break;case 118:r+="";break;case 102:r+="\f";break;case 48:r+="\0";break;case 13:10===dr.charCodeAt(br)&&++br;case 10:fr.locations&&(Sr=br,++Ar);break;default:r+=String.fromCharCode(n)}}else(13===n||10===n||8232===n||8233===n)&&t(yr,"Unterminated string constant"),r+=String.fromCharCode(n),++br}}function S(e){var r=w(16,e);return null===r&&t(yr,"Bad character escape sequence"),r}function I(){Bt=!1;for(var e,r=!0,n=br;;){var a=dr.charCodeAt(br);if(Yt(a))Bt&&(e+=dr.charAt(br)),++br;else{if(92!==a)break;Bt||(e=dr.slice(n,br)),Bt=!0,117!=dr.charCodeAt(++br)&&t(br,"Expecting Unicode escape sequence \\uXXXX"),++br;var o=S(4),i=String.fromCharCode(o);i||t(br-1,"Invalid Unicode escape"),(r?Qt(o):Yt(o))||t(br-4,"Invalid Unicode escape"),e+=i}r=!1}return Bt?e:dr.slice(n,br)}function L(){var e=I(),r=Fr;return Bt||(Wt(e)?r=lt[e]:(fr.forbidReserved&&(3===fr.ecmaVersion?Mt:zt)(e)||Tr&&Xt(e))&&t(yr,"The keyword '"+e+"' is reserved")),i(r,e)}function U(){Ir=yr,Lr=gr,Ur=kr,g()}function R(e){if(Tr=e,br=Lr,fr.locations)for(;Sr>br;)Sr=dr.lastIndexOf("\n",Sr-2)+1,--Ar;u(),g()}function V(){this.type=null,this.start=yr,this.end=null}function T(){this.start=xr,this.end=null,null!==hr&&(this.source=hr)}function q(){var e=new V;return fr.locations&&(e.loc=new T),fr.ranges&&(e.range=[yr,0]),e}function O(e){var r=new V;return r.start=e.start,fr.locations&&(r.loc=new T,r.loc.start=e.loc.start),fr.ranges&&(r.range=[e.range[0],0]),r}function j(e,r){return e.type=r,e.end=Lr,fr.locations&&(e.loc.end=Ur),fr.ranges&&(e.range[1]=Lr),e}function D(e){return fr.ecmaVersion>=5&&"ExpressionStatement"===e.type&&"Literal"===e.expression.type&&"use strict"===e.expression.value}function F(e){return wr===e?(U(),!0):void 0}function B(){return!fr.strictSemicolons&&(wr===Br||wr===ht||Gt.test(dr.slice(Lr,yr)))}function M(){F(yt)||B()||X()}function z(e){wr===e?U():X()}function X(){t(yr,"Unexpected token")}function N(e){"Identifier"!==e.type&&"MemberExpression"!==e.type&&t(e.start,"Assigning to rvalue"),Tr&&"Identifier"===e.type&&Nt(e.name)&&t(e.start,"Assigning to "+e.name+" in strict mode")}function W(e){Ir=Lr=br,fr.locations&&(Ur=new a),Rr=Tr=null,Vr=[],g();var r=e||q(),t=!0;for(e||(r.body=[]);wr!==Br;){var n=J();r.body.push(n),t&&D(n)&&R(!0),t=!1}return j(r,"Program")}function J(){(wr===wt||wr===Et&&"/="==Cr)&&g(!0);var e=wr,r=q();switch(e){case Mr:case Nr:U();var n=e===Mr;F(yt)||B()?r.label=null:wr!==Fr?X():(r.label=lr(),M());for(var a=0;a<Vr.length;++a){var o=Vr[a];if(null==r.label||o.name===r.label.name){if(null!=o.kind&&(n||"loop"===o.kind))break;if(r.label&&n)break}}return a===Vr.length&&t(r.start,"Unsyntactic "+e.keyword),j(r,n?"BreakStatement":"ContinueStatement");case Wr:return U(),M(),j(r,"DebuggerStatement");case Pr:return U(),Vr.push(Zt),r.body=J(),Vr.pop(),z(tt),r.test=P(),M(),j(r,"DoWhileStatement");case _r:if(U(),Vr.push(Zt),z(mt),wr===yt)return $(r,null);if(wr===rt){var i=q();return U(),G(i,!0),j(i,"VariableDeclaration"),1===i.declarations.length&&F(ut)?_(r,i):$(r,i)}var i=K(!1,!0);return F(ut)?(N(i),_(r,i)):$(r,i);case Gr:return U(),cr(r,!0);case Kr:return U(),r.test=P(),r.consequent=J(),r.alternate=F(Hr)?J():null,j(r,"IfStatement");case Qr:return Rr||t(yr,"'return' outside of function"),U(),F(yt)||B()?r.argument=null:(r.argument=K(),M()),j(r,"ReturnStatement");case Yr:U(),r.discriminant=P(),r.cases=[],z(pt),Vr.push(en);for(var s,c;wr!=ht;)if(wr===zr||wr===Jr){var u=wr===zr;s&&j(s,"SwitchCase"),r.cases.push(s=q()),s.consequent=[],U(),u?s.test=K():(c&&t(Ir,"Multiple default clauses"),c=!0,s.test=null),z(gt)}else s||X(),s.consequent.push(J());return s&&j(s,"SwitchCase"),U(),Vr.pop(),j(r,"SwitchStatement");case Zr:return U(),Gt.test(dr.slice(Lr,yr))&&t(Lr,"Illegal newline after throw"),r.argument=K(),M(),j(r,"ThrowStatement");case et:if(U(),r.block=H(),r.handler=null,wr===Xr){var l=q();U(),z(mt),l.param=lr(),Tr&&Nt(l.param.name)&&t(l.param.start,"Binding "+l.param.name+" in strict mode"),z(vt),l.guard=null,l.body=H(),r.handler=j(l,"CatchClause")}return r.guardedHandlers=qr,r.finalizer=F($r)?H():null,r.handler||r.finalizer||t(r.start,"Missing catch or finally clause"),j(r,"TryStatement");case rt:return U(),G(r),M(),j(r,"VariableDeclaration");case tt:return U(),r.test=P(),Vr.push(Zt),r.body=J(),Vr.pop(),j(r,"WhileStatement");case nt:return Tr&&t(yr,"'with' in strict mode"),U(),r.object=P(),r.body=J(),j(r,"WithStatement");case pt:return H();case yt:return U(),j(r,"EmptyStatement");default:var f=Cr,d=K();if(e===Fr&&"Identifier"===d.type&&F(gt)){for(var a=0;a<Vr.length;++a)Vr[a].name===f&&t(d.start,"Label '"+f+"' is already declared");var p=wr.isLoop?"loop":wr===Yr?"switch":null;return Vr.push({name:f,kind:p}),r.body=J(),Vr.pop(),r.label=d,j(r,"LabeledStatement")}return r.expression=d,M(),j(r,"ExpressionStatement")}}function P(){z(mt);var e=K();return z(vt),e}function H(e){var r,t=q(),n=!0,a=!1;for(t.body=[],z(pt);!F(ht);){var o=J();t.body.push(o),n&&e&&D(o)&&(r=a,R(a=!0)),n=!1}return a&&!r&&R(!1),j(t,"BlockStatement")}function $(e,r){return e.init=r,z(yt),e.test=wr===yt?null:K(),z(yt),e.update=wr===vt?null:K(),z(vt),e.body=J(),Vr.pop(),j(e,"ForStatement")}function _(e,r){return e.left=r,e.right=K(),z(vt),e.body=J(),Vr.pop(),j(e,"ForInStatement")}function G(e,r){for(e.declarations=[],e.kind="var";;){var n=q();if(n.id=lr(),Tr&&Nt(n.id.name)&&t(n.id.start,"Binding "+n.id.name+" in strict mode"),n.init=F(Ct)?K(!0,r):null,e.declarations.push(j(n,"VariableDeclarator")),!F(bt))break}return e}function K(e,r){var t=Q(r);if(!e&&wr===bt){var n=O(t);for(n.expressions=[t];F(bt);)n.expressions.push(Q(r));return j(n,"SequenceExpression")}return t}function Q(e){var r=Y(e);if(wr.isAssign){var t=O(r);return t.operator=Cr,t.left=r,U(),t.right=Q(e),N(r),j(t,"AssignmentExpression")}return r}function Y(e){var r=Z(e);if(F(kt)){var t=O(r);return t.test=r,t.consequent=K(!0),z(gt),t.alternate=K(!0,e),j(t,"ConditionalExpression")}return r}function Z(e){return er(rr(),-1,e)}function er(e,r,t){var n=wr.binop;if(null!=n&&(!t||wr!==ut)&&n>r){var a=O(e);a.left=e,a.operator=Cr,U(),a.right=er(rr(),n,t);var o=j(a,/&&|\|\|/.test(a.operator)?"LogicalExpression":"BinaryExpression");return er(o,r,t)}return e}function rr(){if(wr.prefix){var e=q(),r=wr.isUpdate;return e.operator=Cr,e.prefix=!0,Er=!0,U(),e.argument=rr(),r?N(e.argument):Tr&&"delete"===e.operator&&"Identifier"===e.argument.type&&t(e.start,"Deleting local variable in strict mode"),j(e,r?"UpdateExpression":"UnaryExpression")}for(var n=tr();wr.postfix&&!B();){var e=O(n);e.operator=Cr,e.prefix=!1,e.argument=n,N(n),U(),n=j(e,"UpdateExpression")}return n}function tr(){return nr(ar())}function nr(e,r){if(F(xt)){var t=O(e);return t.object=e,t.property=lr(!0),t.computed=!1,nr(j(t,"MemberExpression"),r)}if(F(ft)){var t=O(e);return t.object=e,t.property=K(),t.computed=!0,z(dt),nr(j(t,"MemberExpression"),r)}if(!r&&F(mt)){var t=O(e);return t.callee=e,t.arguments=ur(vt,!1),nr(j(t,"CallExpression"),r)}return e}function ar(){switch(wr){case ot:var e=q();return U(),j(e,"ThisExpression");case Fr:return lr();case Or:case Dr:case jr:var e=q();return e.value=Cr,e.raw=dr.slice(yr,gr),U(),j(e,"Literal");case it:case st:case ct:var e=q();return e.value=wr.atomValue,e.raw=wr.keyword,U(),j(e,"Literal");case mt:var r=xr,t=yr;U();var n=K();return n.start=t,n.end=gr,fr.locations&&(n.loc.start=r,n.loc.end=kr),fr.ranges&&(n.range=[t,gr]),z(vt),n;case ft:var e=q();return U(),e.elements=ur(dt,!0,!0),j(e,"ArrayExpression");case pt:return ir();case Gr:var e=q();return U(),cr(e,!1);case at:return or();default:X()}}function or(){var e=q();return U(),e.callee=nr(ar(),!0),e.arguments=F(mt)?ur(vt,!1):qr,j(e,"NewExpression")}function ir(){var e=q(),r=!0,n=!1;for(e.properties=[],U();!F(ht);){if(r)r=!1;else if(z(bt),fr.allowTrailingCommas&&F(ht))break;var a,o={key:sr()},i=!1;if(F(gt)?(o.value=K(!0),a=o.kind="init"):fr.ecmaVersion>=5&&"Identifier"===o.key.type&&("get"===o.key.name||"set"===o.key.name)?(i=n=!0,a=o.kind=o.key.name,o.key=sr(),wr!==mt&&X(),o.value=cr(q(),!1)):X(),"Identifier"===o.key.type&&(Tr||n))for(var s=0;s<e.properties.length;++s){var c=e.properties[s];if(c.key.name===o.key.name){var u=a==c.kind||i&&"init"===c.kind||"init"===a&&("get"===c.kind||"set"===c.kind);u&&!Tr&&"init"===a&&"init"===c.kind&&(u=!1),u&&t(o.key.start,"Redefinition of property")}}e.properties.push(o)}return j(e,"ObjectExpression")}function sr(){return wr===Or||wr===Dr?ar():lr(!0)}function cr(e,r){wr===Fr?e.id=lr():r?X():e.id=null,e.params=[];var n=!0;for(z(mt);!F(vt);)n?n=!1:z(bt),e.params.push(lr());var a=Rr,o=Vr;if(Rr=!0,Vr=[],e.body=H(!0),Rr=a,Vr=o,Tr||e.body.body.length&&D(e.body.body[0]))for(var i=e.id?-1:0;i<e.params.length;++i){var s=0>i?e.id:e.params[i];if((Xt(s.name)||Nt(s.name))&&t(s.start,"Defining '"+s.name+"' in strict mode"),i>=0)for(var c=0;i>c;++c)s.name===e.params[c].name&&t(s.start,"Argument name clash in strict mode")}return j(e,r?"FunctionDeclaration":"FunctionExpression")}function ur(e,r,t){for(var n=[],a=!0;!F(e);){if(a)a=!1;else if(z(bt),r&&fr.allowTrailingCommas&&F(e))break;t&&wr===bt?n.push(null):n.push(K(!0))}return n}function lr(e){var r=q();return r.name=wr===Fr?Cr:e&&!fr.forbidReserved&&wr.keyword||X(),Er=!1,U(),j(r,"Identifier")}e.version="0.4.0";var fr,dr,pr,hr;e.parse=function(e,t){return dr=String(e),pr=dr.length,r(t),o(),W(fr.program)};var mr=e.defaultOptions={ecmaVersion:5,strictSemicolons:!1,allowTrailingCommas:!0,forbidReserved:!1,locations:!1,onComment:null,ranges:!1,program:null,sourceFile:null},vr=e.getLineInfo=function(e,r){for(var t=1,n=0;;){Kt.lastIndex=n;var a=Kt.exec(e);if(!(a&&a.index<r))break;++t,n=a.index+a[0].length}return{line:t,column:r-n}};e.tokenize=function(e,t){function n(e){return g(e),a.start=yr,a.end=gr,a.startLoc=xr,a.endLoc=kr,a.type=wr,a.value=Cr,a}dr=String(e),pr=dr.length,r(t),o();var a={};return n.jumpTo=function(e,r){if(br=e,fr.locations){Ar=1,Sr=Kt.lastIndex=0;for(var t;(t=Kt.exec(dr))&&t.index<e;)++Ar,Sr=t.index+t[0].length}Er=r,u()},n};var br,yr,gr,xr,kr,wr,Cr,Er,Ar,Sr,Ir,Lr,Ur,Rr,Vr,Tr,qr=[],Or={type:"num"},jr={type:"regexp"},Dr={type:"string"},Fr={type:"name"},Br={type:"eof"},Mr={keyword:"break"},zr={keyword:"case",beforeExpr:!0},Xr={keyword:"catch"},Nr={keyword:"continue"},Wr={keyword:"debugger"},Jr={keyword:"default"},Pr={keyword:"do",isLoop:!0},Hr={keyword:"else",beforeExpr:!0},$r={keyword:"finally"},_r={keyword:"for",isLoop:!0},Gr={keyword:"function"},Kr={keyword:"if"},Qr={keyword:"return",beforeExpr:!0},Yr={keyword:"switch"},Zr={keyword:"throw",beforeExpr:!0},et={keyword:"try"},rt={keyword:"var"},tt={keyword:"while",isLoop:!0},nt={keyword:"with"},at={keyword:"new",beforeExpr:!0},ot={keyword:"this"},it={keyword:"null",atomValue:null},st={keyword:"true",atomValue:!0},ct={keyword:"false",atomValue:!1},ut={keyword:"in",binop:7,beforeExpr:!0},lt={"break":Mr,"case":zr,"catch":Xr,"continue":Nr,"debugger":Wr,"default":Jr,"do":Pr,"else":Hr,"finally":$r,"for":_r,"function":Gr,"if":Kr,"return":Qr,"switch":Yr,"throw":Zr,"try":et,"var":rt,"while":tt,"with":nt,"null":it,"true":st,"false":ct,"new":at,"in":ut,"instanceof":{keyword:"instanceof",binop:7,beforeExpr:!0},"this":ot,"typeof":{keyword:"typeof",prefix:!0,beforeExpr:!0},"void":{keyword:"void",prefix:!0,beforeExpr:!0},"delete":{keyword:"delete",prefix:!0,beforeExpr:!0}},ft={type:"[",beforeExpr:!0},dt={type:"]"},pt={type:"{",beforeExpr:!0},ht={type:"}"},mt={type:"(",beforeExpr:!0},vt={type:")"},bt={type:",",beforeExpr:!0},yt={type:";",beforeExpr:!0},gt={type:":",beforeExpr:!0},xt={type:"."},kt={type:"?",beforeExpr:!0},wt={binop:10,beforeExpr:!0},Ct={isAssign:!0,beforeExpr:!0},Et={isAssign:!0,beforeExpr:!0},At={binop:9,prefix:!0,beforeExpr:!0},St={postfix:!0,prefix:!0,isUpdate:!0},It={prefix:!0,beforeExpr:!0},Lt={binop:1,beforeExpr:!0},Ut={binop:2,beforeExpr:!0},Rt={binop:3,beforeExpr:!0},Vt={binop:4,beforeExpr:!0},Tt={binop:5,beforeExpr:!0},qt={binop:6,beforeExpr:!0},Ot={binop:7,beforeExpr:!0},jt={binop:8,beforeExpr:!0},Dt={binop:10,beforeExpr:!0};e.tokTypes={bracketL:ft,bracketR:dt,braceL:pt,braceR:ht,parenL:mt,parenR:vt,comma:bt,semi:yt,colon:gt,dot:xt,question:kt,slash:wt,eq:Ct,name:Fr,eof:Br,num:Or,regexp:jr,string:Dr};for(var Ft in lt)e.tokTypes["_"+Ft]=lt[Ft];var Bt,Mt=n("abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile"),zt=n("class enum extends super const export import"),Xt=n("implements interface let package private protected public static yield"),Nt=n("eval arguments"),Wt=n("break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this"),Jt=/[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/,Pt="\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05d0-\u05ea\u05f0-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u08a0\u08a2-\u08ac\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097f\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c33\u0c35-\u0c39\u0c3d\u0c58\u0c59\u0c60\u0c61\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d05-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d60\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e87\u0e88\u0e8a\u0e8d\u0e94-\u0e97\u0e99-\u0e9f\u0ea1-\u0ea3\u0ea5\u0ea7\u0eaa\u0eab\u0ead-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f4\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f0\u1700-\u170c\u170e-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1877\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191c\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19c1-\u19c7\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4b\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1ce9-\u1cec\u1cee-\u1cf1\u1cf5\u1cf6\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2119-\u211d\u2124\u2126\u2128\u212a-\u212d\u212f-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2c2e\u2c30-\u2c5e\u2c60-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u2e2f\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309d-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312d\u3131-\u318e\u31a0-\u31ba\u31f0-\u31ff\u3400-\u4db5\u4e00-\u9fcc\ua000-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua697\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua78e\ua790-\ua793\ua7a0-\ua7aa\ua7f8-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa80-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uabc0-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc",Ht="\u0300-\u036f\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u0620-\u0649\u0672-\u06d3\u06e7-\u06e8\u06fb-\u06fc\u0730-\u074a\u0800-\u0814\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0840-\u0857\u08e4-\u08fe\u0900-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962-\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09d7\u09df-\u09e0\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2-\u0ae3\u0ae6-\u0aef\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b56\u0b57\u0b5f-\u0b60\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c01-\u0c03\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62-\u0c63\u0c66-\u0c6f\u0c82\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2-\u0ce3\u0ce6-\u0cef\u0d02\u0d03\u0d46-\u0d48\u0d57\u0d62-\u0d63\u0d66-\u0d6f\u0d82\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0df2\u0df3\u0e34-\u0e3a\u0e40-\u0e45\u0e50-\u0e59\u0eb4-\u0eb9\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f41-\u0f47\u0f71-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u1000-\u1029\u1040-\u1049\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u170e-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17b2\u17dd\u17e0-\u17e9\u180b-\u180d\u1810-\u1819\u1920-\u192b\u1930-\u193b\u1951-\u196d\u19b0-\u19c0\u19c8-\u19c9\u19d0-\u19d9\u1a00-\u1a15\u1a20-\u1a53\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1b46-\u1b4b\u1b50-\u1b59\u1b6b-\u1b73\u1bb0-\u1bb9\u1be6-\u1bf3\u1c00-\u1c22\u1c40-\u1c49\u1c5b-\u1c7d\u1cd0-\u1cd2\u1d00-\u1dbe\u1e01-\u1f15\u200c\u200d\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2d81-\u2d96\u2de0-\u2dff\u3021-\u3028\u3099\u309a\ua640-\ua66d\ua674-\ua67d\ua69f\ua6f0-\ua6f1\ua7f8-\ua800\ua806\ua80b\ua823-\ua827\ua880-\ua881\ua8b4-\ua8c4\ua8d0-\ua8d9\ua8f3-\ua8f7\ua900-\ua909\ua926-\ua92d\ua930-\ua945\ua980-\ua983\ua9b3-\ua9c0\uaa00-\uaa27\uaa40-\uaa41\uaa4c-\uaa4d\uaa50-\uaa59\uaa7b\uaae0-\uaae9\uaaf2-\uaaf3\uabc0-\uabe1\uabec\uabed\uabf0-\uabf9\ufb20-\ufb28\ufe00-\ufe0f\ufe20-\ufe26\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f",$t=new RegExp("["+Pt+"]"),_t=new RegExp("["+Pt+Ht+"]"),Gt=/[\n\r\u2028\u2029]/,Kt=/\r\n|[\n\r\u2028\u2029]/g,Qt=e.isIdentifierStart=function(e){return 65>e?36===e:91>e?!0:97>e?95===e:123>e?!0:e>=170&&$t.test(String.fromCharCode(e))},Yt=e.isIdentifierChar=function(e){return 48>e?36===e:58>e?!0:65>e?!1:91>e?!0:97>e?95===e:123>e?!0:e>=170&&_t.test(String.fromCharCode(e))},Zt={kind:"loop"},en={kind:"switch"}});
	
		var binaryOperators = {
			'+': '__add',
			'-': '__subtract',
			'*': '__multiply',
			'/': '__divide',
			'%': '__modulo',
			'==': 'equals',
			'!=': 'equals'
		};
	
		var unaryOperators = {
			'-': '__negate',
			'+': null
		};
	
		var fields = Base.each(
			['add', 'subtract', 'multiply', 'divide', 'modulo', 'negate'],
			function(name) {
				this['__' + name] = '#' + name;
			},
			{}
		);
		Point.inject(fields);
		Size.inject(fields);
		Color.inject(fields);
	
		function __$__(left, operator, right) {
			var handler = binaryOperators[operator];
			if (left && left[handler]) {
				var res = left[handler](right);
				return operator === '!=' ? !res : res;
			}
			switch (operator) {
			case '+': return left + right;
			case '-': return left - right;
			case '*': return left * right;
			case '/': return left / right;
			case '%': return left % right;
			case '==': return left == right;
			case '!=': return left != right;
			}
		}
	
		function $__(operator, value) {
			var handler = unaryOperators[operator];
			if (handler && value && value[handler])
				return value[handler]();
			switch (operator) {
			case '+': return +value;
			case '-': return -value;
			}
		}
	
		function parse(code, options) {
			return scope.acorn.parse(code, options);
		}
	
		function compile(code, url, options) {
			if (!code)
				return '';
			options = options || {};
			url = url || '';
	
			var insertions = [];
	
			function getOffset(offset) {
				for (var i = 0, l = insertions.length; i < l; i++) {
					var insertion = insertions[i];
					if (insertion[0] >= offset)
						break;
					offset += insertion[1];
				}
				return offset;
			}
	
			function getCode(node) {
				return code.substring(getOffset(node.range[0]),
						getOffset(node.range[1]));
			}
	
			function getBetween(left, right) {
				return code.substring(getOffset(left.range[1]),
						getOffset(right.range[0]));
			}
	
			function replaceCode(node, str) {
				var start = getOffset(node.range[0]),
					end = getOffset(node.range[1]),
					insert = 0;
				for (var i = insertions.length - 1; i >= 0; i--) {
					if (start > insertions[i][0]) {
						insert = i + 1;
						break;
					}
				}
				insertions.splice(insert, 0, [start, str.length - end + start]);
				code = code.substring(0, start) + str + code.substring(end);
			}
	
			function walkAST(node, parent) {
				if (!node)
					return;
				for (var key in node) {
					if (key === 'range' || key === 'loc')
						continue;
					var value = node[key];
					if (Array.isArray(value)) {
						for (var i = 0, l = value.length; i < l; i++)
							walkAST(value[i], node);
					} else if (value && typeof value === 'object') {
						walkAST(value, node);
					}
				}
				switch (node.type) {
				case 'UnaryExpression':
					if (node.operator in unaryOperators
							&& node.argument.type !== 'Literal') {
						var arg = getCode(node.argument);
						replaceCode(node, '$__("' + node.operator + '", '
								+ arg + ')');
					}
					break;
				case 'BinaryExpression':
					if (node.operator in binaryOperators
							&& node.left.type !== 'Literal') {
						var left = getCode(node.left),
							right = getCode(node.right),
							between = getBetween(node.left, node.right),
							operator = node.operator;
						replaceCode(node, '__$__(' + left + ','
								+ between.replace(new RegExp('\\' + operator),
									'"' + operator + '"')
								+ ', ' + right + ')');
					}
					break;
				case 'UpdateExpression':
				case 'AssignmentExpression':
					var parentType = parent && parent.type;
					if (!(
							parentType === 'ForStatement'
							|| parentType === 'BinaryExpression'
								&& /^[=!<>]/.test(parent.operator)
							|| parentType === 'MemberExpression' && parent.computed
					)) {
						if (node.type === 'UpdateExpression') {
							var arg = getCode(node.argument),
								exp = '__$__(' + arg + ', "' + node.operator[0]
										+ '", 1)',
								str = arg + ' = ' + exp;
							if (!node.prefix
									&& (parentType === 'AssignmentExpression'
										|| parentType === 'VariableDeclarator')) {
								if (getCode(parent.left || parent.id) === arg)
									str = exp;
								str = arg + '; ' + str;
							}
							replaceCode(node, str);
						} else {
							if (/^.=$/.test(node.operator)
									&& node.left.type !== 'Literal') {
								var left = getCode(node.left),
									right = getCode(node.right);
								replaceCode(node, left + ' = __$__(' + left + ', "'
										+ node.operator[0] + '", ' + right + ')');
							}
						}
					}
					break;
				}
			}
			var sourceMap = null,
				browser = paper.browser,
				version = browser.versionNumber,
				lineBreaks = /\r\n|\n|\r/mg;
			if (browser.chrome && version >= 30
					|| browser.webkit && version >= 537.76
					|| browser.firefox && version >= 23) {
				var offset = 0;
				if (window.location.href.indexOf(url) === 0) {
					var html = document.getElementsByTagName('html')[0].innerHTML;
					offset = html.substr(0, html.indexOf(code) + 1).match(
							lineBreaks).length + 1;
				}
				var mappings = ['AAAA'];
				mappings.length = (code.match(lineBreaks) || []).length + 1 + offset;
				sourceMap = {
					version: 3,
					file: url,
					names:[],
					mappings: mappings.join(';AACA'),
					sourceRoot: '',
					sources: [url]
				};
				var source = options.source || !url && code;
				if (source)
					sourceMap.sourcesContent = [source];
			}
			walkAST(parse(code, { ranges: true }));
			if (sourceMap) {
				code = new Array(offset + 1).join('\n') + code
						+ "\n//# sourceMappingURL=data:application/json;base64,"
						+ (btoa(unescape(encodeURIComponent(
							JSON.stringify(sourceMap)))))
						+ "\n//# sourceURL=" + (url || 'paperscript');
			}
			return code;
		}
	
		function execute(code, scope, url, options) {
			paper = scope;
			var view = scope.getView(),
				tool = /\s+on(?:Key|Mouse)(?:Up|Down|Move|Drag)\b/.test(code)
						? new Tool()
						: null,
				toolHandlers = tool ? tool._events : [],
				handlers = ['onFrame', 'onResize'].concat(toolHandlers),
				params = [],
				args = [],
				func;
			code = compile(code, url, options);
			function expose(scope, hidden) {
				for (var key in scope) {
					if ((hidden || !/^_/.test(key)) && new RegExp('([\\b\\s\\W]|^)'
							+ key.replace(/\$/g, '\\$') + '\\b').test(code)) {
						params.push(key);
						args.push(scope[key]);
					}
				}
			}
			expose({ __$__: __$__, $__: $__, paper: scope, view: view, tool: tool },
					true);
			expose(scope);
			handlers = Base.each(handlers, function(key) {
				if (new RegExp('\\s+' + key + '\\b').test(code)) {
					params.push(key);
					this.push(key + ': ' + key);
				}
			}, []).join(', ');
			if (handlers)
				code += '\nreturn { ' + handlers + ' };';
			var browser = paper.browser;
			if (browser.chrome || browser.firefox) {
				var script = document.createElement('script'),
					head = document.head || document.getElementsByTagName('head')[0];
				if (browser.firefox)
					code = '\n' + code;
				script.appendChild(document.createTextNode(
					'paper._execute = function(' + params + ') {' + code + '\n}'
				));
				head.appendChild(script);
				func = paper._execute;
				delete paper._execute;
				head.removeChild(script);
			} else {
				func = Function(params, code);
			}
			var res = func.apply(scope, args) || {};
			Base.each(toolHandlers, function(key) {
				var value = res[key];
				if (value)
					tool[key] = value;
			});
			if (view) {
				if (res.onResize)
					view.setOnResize(res.onResize);
				view.emit('resize', {
					size: view.size,
					delta: new Point()
				});
				if (res.onFrame)
					view.setOnFrame(res.onFrame);
				view.update();
			}
		}
	
		function loadScript(script) {
			if (/^text\/(?:x-|)paperscript$/.test(script.type)
					&& PaperScope.getAttribute(script, 'ignore') !== 'true') {
				var canvasId = PaperScope.getAttribute(script, 'canvas'),
					canvas = document.getElementById(canvasId),
					src = script.src || script.getAttribute('data-src'),
					async = PaperScope.hasAttribute(script, 'async'),
					scopeAttribute = 'data-paper-scope';
				if (!canvas)
					throw new Error('Unable to find canvas with id "'
							+ canvasId + '"');
				var scope = PaperScope.get(canvas.getAttribute(scopeAttribute))
							|| new PaperScope().setup(canvas);
				canvas.setAttribute(scopeAttribute, scope._id);
				if (src) {
					Http.request('get', src, function(code) {
						execute(code, scope, src);
					}, async);
				} else {
					execute(script.innerHTML, scope, script.baseURI);
				}
				script.setAttribute('data-paper-ignore', 'true');
				return scope;
			}
		}
	
		function loadAll() {
			Base.each(document.getElementsByTagName('script'), loadScript);
		}
	
		function load(script) {
			return script ? loadScript(script) : loadAll();
		}
	
		if (document.readyState === 'complete') {
			setTimeout(loadAll);
		} else {
			DomEvent.add(window, { load: loadAll });
		}
	
		return {
			compile: compile,
			execute: execute,
			load: load,
			parse: parse
		};
	
	}).call(this);
	
	paper = new (PaperScope.inject(Base.exports, {
		enumerable: true,
		Base: Base,
		Numerical: Numerical,
		Key: Key
	}))();
	
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (paper), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	} else if (typeof module === 'object' && module) {
		module.exports = paper;
	}
	
	return paper;
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.changeCenter = changeCenter;
	exports.changeZoom = changeZoom;
	
	var _paper = __webpack_require__(4);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function changeCenter(oldCenter, offset, factor) {
	  offset = offset.multiply(factor);
	  return offset;
	}
	
	function changeZoom(oldZoom, delta, center, position) {
	  var factor = 1.05;
	  var newZoom = delta < 0 ? oldZoom * factor : oldZoom / factor;
	  var beta = oldZoom / newZoom;
	  var pc = position.subtract(center);
	  var offset = position.subtract(pc.multiply(beta)).subtract(center);
	  return { newZoom: newZoom, offset: offset };
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.init = init;
	exports.add = add;
	
	var _paper = __webpack_require__(4);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var animations = [];
	
	function _remove(animation) {
	  animations = animations.filter(function (a) {
	    return a !== animation;
	  });
	}
	
	function onFrame(event) {
	  if (event.delta === 0) return;
	  animations.forEach(function (animation) {
	    animation.elapsedTime += event.delta;
	    var continueAnimation = animation.callback(animation.elapsedTime);
	    if (continueAnimation === false) {
	      _remove(animation);
	    }
	  });
	}
	
	function init() {
	  _paper2.default.view.onFrame = onFrame;
	}
	
	function add(callback) {
	  var animation = {
	    callback: callback,
	    elapsedTime: 0
	  };
	  animations.push(animation);
	  return {
	    remove: function remove() {
	      return _remove(animation);
	    }
	  };
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.GetMaps = GetMaps;
	exports.Get = Get;
	exports.AddMap = AddMap;
	exports.RemoveMap = RemoveMap;
	exports.SetNbrOfPlayers = SetNbrOfPlayers;
	exports.GetNbrOfPlayers = GetNbrOfPlayers;
	exports.GetIsMuted = GetIsMuted;
	exports.SetIsMuted = SetIsMuted;
	exports.GetEnableStars = GetEnableStars;
	exports.SetEnableStars = SetEnableStars;
	function GetUserConfig() {
	  var config = localStorage.getItem('UserConfig');
	  if (!config) {
	    config = {};
	    SetUserConfig(config);
	  }
	  return JSON.parse(config);
	}
	
	function SetUserConfig(config) {
	  localStorage.setItem('UserConfig', JSON.stringify(config));;
	}
	
	function GetUserConfigValue(key, defaultValue) {
	  var config = GetUserConfig();
	
	  if (config[key] === undefined) {
	    config[key] = defaultValue;
	    SetUserConfig(config);
	  }
	
	  return config[key];
	}
	
	function SetUserConfigValue(key, value) {
	  var config = GetUserConfig();
	  config[key] = value;
	  SetUserConfig(config);
	}
	
	function GetMaps() {
	  var maps = [];
	  for (var i = 0; i < localStorage.length; i++) {
	    var key = localStorage.key(i);
	    if (key.indexOf('map') === 0) {
	      maps.push(JSON.parse(localStorage.getItem(key)));
	    }
	  }
	
	  return maps;
	}
	
	function Get(key) {
	  return JSON.parse(localStorage.getItem(key));
	}
	
	function AddMap(map) {
	  localStorage.setItem(map.key, JSON.stringify(map));
	}
	
	function RemoveMap(map) {
	  localStorage.removeItem(map.key);
	}
	
	function SetNbrOfPlayers(nbrOfPlayers) {
	  SetUserConfigValue('nbrOfPlayers', nbrOfPlayers);
	}
	
	function GetNbrOfPlayers() {
	  return GetUserConfigValue('nbrOfPlayers', 2);
	}
	
	function GetIsMuted() {
	  return GetUserConfigValue('isMuted', false);
	}
	
	function SetIsMuted(isMuted) {
	  SetUserConfigValue('isMuted', isMuted);
	}
	
	function GetEnableStars() {
	  return GetUserConfigValue('enableStars', true);
	}
	
	function SetEnableStars(enableStars) {
	  SetUserConfigValue('enableStars', enableStars);
	}

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	var babelHelpers = {};
	
	babelHelpers.classCallCheck = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};
	function Target(path, matcher, delegate) {
	  this.path = path;
	  this.matcher = matcher;
	  this.delegate = delegate;
	}
	
	Target.prototype = {
	  to: function to(target, callback) {
	    var delegate = this.delegate;
	
	    if (delegate && delegate.willAddRoute) {
	      target = delegate.willAddRoute(this.matcher.target, target);
	    }
	
	    this.matcher.add(this.path, target);
	
	    if (callback) {
	      if (callback.length === 0) {
	        throw new Error("You must have an argument in the function passed to `to`");
	      }
	      this.matcher.addChild(this.path, target, callback, this.delegate);
	    }
	    return this;
	  }
	};
	
	function Matcher(target) {
	  this.routes = {};
	  this.children = {};
	  this.target = target;
	}
	
	Matcher.prototype = {
	  add: function add(path, handler) {
	    this.routes[path] = handler;
	  },
	
	  addChild: function addChild(path, target, callback, delegate) {
	    var matcher = new Matcher(target);
	    this.children[path] = matcher;
	
	    var match = generateMatch(path, matcher, delegate);
	
	    if (delegate && delegate.contextEntered) {
	      delegate.contextEntered(target, match);
	    }
	
	    callback(match);
	  }
	};
	
	function generateMatch(startingPath, matcher, delegate) {
	  return function (path, nestedCallback) {
	    var fullPath = startingPath + path;
	
	    if (nestedCallback) {
	      nestedCallback(generateMatch(fullPath, matcher, delegate));
	    } else {
	      return new Target(startingPath + path, matcher, delegate);
	    }
	  };
	}
	
	function addRoute(routeArray, path, handler) {
	  var len = 0;
	  for (var i = 0, l = routeArray.length; i < l; i++) {
	    len += routeArray[i].path.length;
	  }
	
	  path = path.substr(len);
	  var route = { path: path, handler: handler };
	  routeArray.push(route);
	}
	
	function eachRoute(baseRoute, matcher, callback, binding) {
	  var routes = matcher.routes;
	
	  for (var path in routes) {
	    if (routes.hasOwnProperty(path)) {
	      var routeArray = baseRoute.slice();
	      addRoute(routeArray, path, routes[path]);
	
	      if (matcher.children[path]) {
	        eachRoute(routeArray, matcher.children[path], callback, binding);
	      } else {
	        callback.call(binding, routeArray);
	      }
	    }
	  }
	}
	
	function map (callback, addRouteCallback) {
	  var matcher = new Matcher();
	
	  callback(generateMatch("", matcher, this.delegate));
	
	  eachRoute([], matcher, function (route) {
	    if (addRouteCallback) {
	      addRouteCallback(this, route);
	    } else {
	      this.add(route);
	    }
	  }, this);
	}
	
	var specials = ['/', '.', '*', '+', '?', '|', '(', ')', '[', ']', '{', '}', '\\'];
	
	var escapeRegex = new RegExp('(\\' + specials.join('|\\') + ')', 'g');
	
	function isArray(test) {
	  return Object.prototype.toString.call(test) === "[object Array]";
	}
	
	// A Segment represents a segment in the original route description.
	// Each Segment type provides an `eachChar` and `regex` method.
	//
	// The `eachChar` method invokes the callback with one or more character
	// specifications. A character specification consumes one or more input
	// characters.
	//
	// The `regex` method returns a regex fragment for the segment. If the
	// segment is a dynamic of star segment, the regex fragment also includes
	// a capture.
	//
	// A character specification contains:
	//
	// * `validChars`: a String with a list of all valid characters, or
	// * `invalidChars`: a String with a list of all invalid characters
	// * `repeat`: true if the character specification can repeat
	
	function StaticSegment(string) {
	  this.string = string;
	}
	StaticSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    var string = this.string,
	        ch;
	
	    for (var i = 0, l = string.length; i < l; i++) {
	      ch = string.charAt(i);
	      callback({ validChars: ch });
	    }
	  },
	
	  regex: function regex() {
	    return this.string.replace(escapeRegex, '\\$1');
	  },
	
	  generate: function generate() {
	    return this.string;
	  }
	};
	
	function DynamicSegment(name) {
	  this.name = name;
	}
	DynamicSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "/", repeat: true });
	  },
	
	  regex: function regex() {
	    return "([^/]+)";
	  },
	
	  generate: function generate(params) {
	    return params[this.name];
	  }
	};
	
	function StarSegment(name) {
	  this.name = name;
	}
	StarSegment.prototype = {
	  eachChar: function eachChar(callback) {
	    callback({ invalidChars: "", repeat: true });
	  },
	
	  regex: function regex() {
	    return "(.+)";
	  },
	
	  generate: function generate(params) {
	    return params[this.name];
	  }
	};
	
	function EpsilonSegment() {}
	EpsilonSegment.prototype = {
	  eachChar: function eachChar() {},
	  regex: function regex() {
	    return "";
	  },
	  generate: function generate() {
	    return "";
	  }
	};
	
	function parse(route, names, specificity) {
	  // normalize route as not starting with a "/". Recognition will
	  // also normalize.
	  if (route.charAt(0) === "/") {
	    route = route.substr(1);
	  }
	
	  var segments = route.split("/"),
	      results = [];
	
	  // A routes has specificity determined by the order that its different segments
	  // appear in. This system mirrors how the magnitude of numbers written as strings
	  // works.
	  // Consider a number written as: "abc". An example would be "200". Any other number written
	  // "xyz" will be smaller than "abc" so long as `a > z`. For instance, "199" is smaller
	  // then "200", even though "y" and "z" (which are both 9) are larger than "0" (the value
	  // of (`b` and `c`). This is because the leading symbol, "2", is larger than the other
	  // leading symbol, "1".
	  // The rule is that symbols to the left carry more weight than symbols to the right
	  // when a number is written out as a string. In the above strings, the leading digit
	  // represents how many 100's are in the number, and it carries more weight than the middle
	  // number which represents how many 10's are in the number.
	  // This system of number magnitude works well for route specificity, too. A route written as
	  // `a/b/c` will be more specific than `x/y/z` as long as `a` is more specific than
	  // `x`, irrespective of the other parts.
	  // Because of this similarity, we assign each type of segment a number value written as a
	  // string. We can find the specificity of compound routes by concatenating these strings
	  // together, from left to right. After we have looped through all of the segments,
	  // we convert the string to a number.
	  specificity.val = '';
	
	  for (var i = 0, l = segments.length; i < l; i++) {
	    var segment = segments[i],
	        match;
	
	    if (match = segment.match(/^:([^\/]+)$/)) {
	      results.push(new DynamicSegment(match[1]));
	      names.push(match[1]);
	      specificity.val += '3';
	    } else if (match = segment.match(/^\*([^\/]+)$/)) {
	      results.push(new StarSegment(match[1]));
	      specificity.val += '2';
	      names.push(match[1]);
	    } else if (segment === "") {
	      results.push(new EpsilonSegment());
	      specificity.val += '1';
	    } else {
	      results.push(new StaticSegment(segment));
	      specificity.val += '4';
	    }
	  }
	
	  specificity.val = +specificity.val;
	
	  return results;
	}
	
	// A State has a character specification and (`charSpec`) and a list of possible
	// subsequent states (`nextStates`).
	//
	// If a State is an accepting state, it will also have several additional
	// properties:
	//
	// * `regex`: A regular expression that is used to extract parameters from paths
	//   that reached this accepting state.
	// * `handlers`: Information on how to convert the list of captures into calls
	//   to registered handlers with the specified parameters
	// * `types`: How many static, dynamic or star segments in this route. Used to
	//   decide which route to use if multiple registered routes match a path.
	//
	// Currently, State is implemented naively by looping over `nextStates` and
	// comparing a character specification against a character. A more efficient
	// implementation would use a hash of keys pointing at one or more next states.
	
	function State(charSpec) {
	  this.charSpec = charSpec;
	  this.nextStates = [];
	}
	
	State.prototype = {
	  get: function get(charSpec) {
	    var nextStates = this.nextStates;
	
	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      var child = nextStates[i];
	
	      var isEqual = child.charSpec.validChars === charSpec.validChars;
	      isEqual = isEqual && child.charSpec.invalidChars === charSpec.invalidChars;
	
	      if (isEqual) {
	        return child;
	      }
	    }
	  },
	
	  put: function put(charSpec) {
	    var state;
	
	    // If the character specification already exists in a child of the current
	    // state, just return that state.
	    if (state = this.get(charSpec)) {
	      return state;
	    }
	
	    // Make a new state for the character spec
	    state = new State(charSpec);
	
	    // Insert the new state as a child of the current state
	    this.nextStates.push(state);
	
	    // If this character specification repeats, insert the new state as a child
	    // of itself. Note that this will not trigger an infinite loop because each
	    // transition during recognition consumes a character.
	    if (charSpec.repeat) {
	      state.nextStates.push(state);
	    }
	
	    // Return the new state
	    return state;
	  },
	
	  // Find a list of child states matching the next character
	  match: function match(ch) {
	    // DEBUG "Processing `" + ch + "`:"
	    var nextStates = this.nextStates,
	        child,
	        charSpec,
	        chars;
	
	    // DEBUG "  " + debugState(this)
	    var returned = [];
	
	    for (var i = 0, l = nextStates.length; i < l; i++) {
	      child = nextStates[i];
	
	      charSpec = child.charSpec;
	
	      if (typeof (chars = charSpec.validChars) !== 'undefined') {
	        if (chars.indexOf(ch) !== -1) {
	          returned.push(child);
	        }
	      } else if (typeof (chars = charSpec.invalidChars) !== 'undefined') {
	        if (chars.indexOf(ch) === -1) {
	          returned.push(child);
	        }
	      }
	    }
	
	    return returned;
	  }
	
	  /** IF DEBUG
	  , debug: function() {
	    var charSpec = this.charSpec,
	        debug = "[",
	        chars = charSpec.validChars || charSpec.invalidChars;
	     if (charSpec.invalidChars) { debug += "^"; }
	    debug += chars;
	    debug += "]";
	     if (charSpec.repeat) { debug += "+"; }
	     return debug;
	  }
	  END IF **/
	};
	
	/** IF DEBUG
	function debug(log) {
	  console.log(log);
	}
	
	function debugState(state) {
	  return state.nextStates.map(function(n) {
	    if (n.nextStates.length === 0) { return "( " + n.debug() + " [accepting] )"; }
	    return "( " + n.debug() + " <then> " + n.nextStates.map(function(s) { return s.debug() }).join(" or ") + " )";
	  }).join(", ")
	}
	END IF **/
	
	// Sort the routes by specificity
	function sortSolutions(states) {
	  return states.sort(function (a, b) {
	    return b.specificity.val - a.specificity.val;
	  });
	}
	
	function recognizeChar(states, ch) {
	  var nextStates = [];
	
	  for (var i = 0, l = states.length; i < l; i++) {
	    var state = states[i];
	
	    nextStates = nextStates.concat(state.match(ch));
	  }
	
	  return nextStates;
	}
	
	var oCreate = Object.create || function (proto) {
	  function F() {}
	  F.prototype = proto;
	  return new F();
	};
	
	function RecognizeResults(queryParams) {
	  this.queryParams = queryParams || {};
	}
	RecognizeResults.prototype = oCreate({
	  splice: Array.prototype.splice,
	  slice: Array.prototype.slice,
	  push: Array.prototype.push,
	  length: 0,
	  queryParams: null
	});
	
	function findHandler(state, path, queryParams) {
	  var handlers = state.handlers,
	      regex = state.regex;
	  var captures = path.match(regex),
	      currentCapture = 1;
	  var result = new RecognizeResults(queryParams);
	
	  for (var i = 0, l = handlers.length; i < l; i++) {
	    var handler = handlers[i],
	        names = handler.names,
	        params = {};
	
	    for (var j = 0, m = names.length; j < m; j++) {
	      params[names[j]] = captures[currentCapture++];
	    }
	
	    result.push({ handler: handler.handler, params: params, isDynamic: !!names.length });
	  }
	
	  return result;
	}
	
	function addSegment(currentState, segment) {
	  segment.eachChar(function (ch) {
	    var state;
	
	    currentState = currentState.put(ch);
	  });
	
	  return currentState;
	}
	
	function decodeQueryParamPart(part) {
	  // http://www.w3.org/TR/html401/interact/forms.html#h-17.13.4.1
	  part = part.replace(/\+/gm, '%20');
	  return decodeURIComponent(part);
	}
	
	// The main interface
	
	var RouteRecognizer = function RouteRecognizer() {
	  this.rootState = new State();
	  this.names = {};
	};
	
	RouteRecognizer.prototype = {
	  add: function add(routes, options) {
	    var currentState = this.rootState,
	        regex = "^",
	        specificity = {},
	        handlers = [],
	        allSegments = [],
	        name;
	
	    var isEmpty = true;
	
	    for (var i = 0, l = routes.length; i < l; i++) {
	      var route = routes[i],
	          names = [];
	
	      var segments = parse(route.path, names, specificity);
	
	      allSegments = allSegments.concat(segments);
	
	      for (var j = 0, m = segments.length; j < m; j++) {
	        var segment = segments[j];
	
	        if (segment instanceof EpsilonSegment) {
	          continue;
	        }
	
	        isEmpty = false;
	
	        // Add a "/" for the new segment
	        currentState = currentState.put({ validChars: "/" });
	        regex += "/";
	
	        // Add a representation of the segment to the NFA and regex
	        currentState = addSegment(currentState, segment);
	        regex += segment.regex();
	      }
	
	      var handler = { handler: route.handler, names: names };
	      handlers.push(handler);
	    }
	
	    if (isEmpty) {
	      currentState = currentState.put({ validChars: "/" });
	      regex += "/";
	    }
	
	    currentState.handlers = handlers;
	    currentState.regex = new RegExp(regex + "$");
	    currentState.specificity = specificity;
	
	    if (name = options && options.as) {
	      this.names[name] = {
	        segments: allSegments,
	        handlers: handlers
	      };
	    }
	  },
	
	  handlersFor: function handlersFor(name) {
	    var route = this.names[name],
	        result = [];
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }
	
	    for (var i = 0, l = route.handlers.length; i < l; i++) {
	      result.push(route.handlers[i]);
	    }
	
	    return result;
	  },
	
	  hasRoute: function hasRoute(name) {
	    return !!this.names[name];
	  },
	
	  generate: function generate(name, params) {
	    var route = this.names[name],
	        output = "";
	    if (!route) {
	      throw new Error("There is no route named " + name);
	    }
	
	    var segments = route.segments;
	
	    for (var i = 0, l = segments.length; i < l; i++) {
	      var segment = segments[i];
	
	      if (segment instanceof EpsilonSegment) {
	        continue;
	      }
	
	      output += "/";
	      output += segment.generate(params);
	    }
	
	    if (output.charAt(0) !== '/') {
	      output = '/' + output;
	    }
	
	    if (params && params.queryParams) {
	      output += this.generateQueryString(params.queryParams);
	    }
	
	    return output;
	  },
	
	  generateQueryString: function generateQueryString(params) {
	    var pairs = [];
	    var keys = [];
	    for (var key in params) {
	      if (params.hasOwnProperty(key)) {
	        keys.push(key);
	      }
	    }
	    keys.sort();
	    for (var i = 0, len = keys.length; i < len; i++) {
	      key = keys[i];
	      var value = params[key];
	      if (value == null) {
	        continue;
	      }
	      var pair = encodeURIComponent(key);
	      if (isArray(value)) {
	        for (var j = 0, l = value.length; j < l; j++) {
	          var arrayPair = key + '[]' + '=' + encodeURIComponent(value[j]);
	          pairs.push(arrayPair);
	        }
	      } else {
	        pair += "=" + encodeURIComponent(value);
	        pairs.push(pair);
	      }
	    }
	
	    if (pairs.length === 0) {
	      return '';
	    }
	
	    return "?" + pairs.join("&");
	  },
	
	  parseQueryString: function parseQueryString(queryString) {
	    var pairs = queryString.split("&"),
	        queryParams = {};
	    for (var i = 0; i < pairs.length; i++) {
	      var pair = pairs[i].split('='),
	          key = decodeQueryParamPart(pair[0]),
	          keyLength = key.length,
	          isArray = false,
	          value;
	      if (pair.length === 1) {
	        value = 'true';
	      } else {
	        //Handle arrays
	        if (keyLength > 2 && key.slice(keyLength - 2) === '[]') {
	          isArray = true;
	          key = key.slice(0, keyLength - 2);
	          if (!queryParams[key]) {
	            queryParams[key] = [];
	          }
	        }
	        value = pair[1] ? decodeQueryParamPart(pair[1]) : '';
	      }
	      if (isArray) {
	        queryParams[key].push(value);
	      } else {
	        queryParams[key] = value;
	      }
	    }
	    return queryParams;
	  },
	
	  recognize: function recognize(path) {
	    var states = [this.rootState],
	        pathLen,
	        i,
	        l,
	        queryStart,
	        queryParams = {},
	        isSlashDropped = false;
	
	    queryStart = path.indexOf('?');
	    if (queryStart !== -1) {
	      var queryString = path.substr(queryStart + 1, path.length);
	      path = path.substr(0, queryStart);
	      queryParams = this.parseQueryString(queryString);
	    }
	
	    path = decodeURI(path);
	
	    // DEBUG GROUP path
	
	    if (path.charAt(0) !== "/") {
	      path = "/" + path;
	    }
	
	    pathLen = path.length;
	    if (pathLen > 1 && path.charAt(pathLen - 1) === "/") {
	      path = path.substr(0, pathLen - 1);
	      isSlashDropped = true;
	    }
	
	    for (i = 0, l = path.length; i < l; i++) {
	      states = recognizeChar(states, path.charAt(i));
	      if (!states.length) {
	        break;
	      }
	    }
	
	    // END DEBUG GROUP
	
	    var solutions = [];
	    for (i = 0, l = states.length; i < l; i++) {
	      if (states[i].handlers) {
	        solutions.push(states[i]);
	      }
	    }
	
	    states = sortSolutions(solutions);
	
	    var state = solutions[0];
	
	    if (state && state.handlers) {
	      // if a trailing slash was dropped and a star segment is the last segment
	      // specified, put the trailing slash back
	      if (isSlashDropped && state.regex.source.slice(-5) === "(.+)$") {
	        path = path + "/";
	      }
	      return findHandler(state, path, queryParams);
	    }
	  }
	};
	
	RouteRecognizer.prototype.map = map;
	
	RouteRecognizer.VERSION = '0.1.9';
	
	var genQuery = RouteRecognizer.prototype.generateQueryString;
	
	// export default for holding the Vue reference
	var exports$1 = {};
	/**
	 * Warn stuff.
	 *
	 * @param {String} msg
	 */
	
	function warn(msg) {
	  /* istanbul ignore next */
	  if (window.console) {
	    console.warn('[vue-router] ' + msg);
	    /* istanbul ignore if */
	    if (!exports$1.Vue || exports$1.Vue.config.debug) {
	      console.warn(new Error('warning stack trace:').stack);
	    }
	  }
	}
	
	/**
	 * Resolve a relative path.
	 *
	 * @param {String} base
	 * @param {String} relative
	 * @param {Boolean} append
	 * @return {String}
	 */
	
	function resolvePath(base, relative, append) {
	  var query = base.match(/(\?.*)$/);
	  if (query) {
	    query = query[1];
	    base = base.slice(0, -query.length);
	  }
	  // a query!
	  if (relative.charAt(0) === '?') {
	    return base + relative;
	  }
	  var stack = base.split('/');
	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop();
	  }
	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/');
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];
	    if (segment === '.') {
	      continue;
	    } else if (segment === '..') {
	      stack.pop();
	    } else {
	      stack.push(segment);
	    }
	  }
	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('');
	  }
	  return stack.join('/');
	}
	
	/**
	 * Forgiving check for a promise
	 *
	 * @param {Object} p
	 * @return {Boolean}
	 */
	
	function isPromise(p) {
	  return p && typeof p.then === 'function';
	}
	
	/**
	 * Retrive a route config field from a component instance
	 * OR a component contructor.
	 *
	 * @param {Function|Vue} component
	 * @param {String} name
	 * @return {*}
	 */
	
	function getRouteConfig(component, name) {
	  var options = component && (component.$options || component.options);
	  return options && options.route && options.route[name];
	}
	
	/**
	 * Resolve an async component factory. Have to do a dirty
	 * mock here because of Vue core's internal API depends on
	 * an ID check.
	 *
	 * @param {Object} handler
	 * @param {Function} cb
	 */
	
	var resolver = undefined;
	
	function resolveAsyncComponent(handler, cb) {
	  if (!resolver) {
	    resolver = {
	      resolve: exports$1.Vue.prototype._resolveComponent,
	      $options: {
	        components: {
	          _: handler.component
	        }
	      }
	    };
	  } else {
	    resolver.$options.components._ = handler.component;
	  }
	  resolver.resolve('_', function (Component) {
	    handler.component = Component;
	    cb(Component);
	  });
	}
	
	/**
	 * Map the dynamic segments in a path to params.
	 *
	 * @param {String} path
	 * @param {Object} params
	 * @param {Object} query
	 */
	
	function mapParams(path, params, query) {
	  if (params === undefined) params = {};
	
	  path = path.replace(/:([^\/]+)/g, function (_, key) {
	    var val = params[key];
	    if (!val) {
	      warn('param "' + key + '" not found when generating ' + 'path for "' + path + '" with params ' + JSON.stringify(params));
	    }
	    return val || '';
	  });
	  if (query) {
	    path += genQuery(query);
	  }
	  return path;
	}
	
	var hashRE = /#.*$/;
	
	var HTML5History = (function () {
	  function HTML5History(_ref) {
	    var root = _ref.root;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HTML5History);
	
	    if (root) {
	      // make sure there's the starting slash
	      if (root.charAt(0) !== '/') {
	        root = '/' + root;
	      }
	      // remove trailing slash
	      this.root = root.replace(/\/$/, '');
	      this.rootRE = new RegExp('^\\' + this.root);
	    } else {
	      this.root = null;
	    }
	    this.onChange = onChange;
	    // check base tag
	    var baseEl = document.querySelector('base');
	    this.base = baseEl && baseEl.getAttribute('href');
	  }
	
	  HTML5History.prototype.start = function start() {
	    var _this = this;
	
	    this.listener = function (e) {
	      var url = decodeURI(location.pathname + location.search);
	      if (_this.root) {
	        url = url.replace(_this.rootRE, '');
	      }
	      _this.onChange(url, e && e.state, location.hash);
	    };
	    window.addEventListener('popstate', this.listener);
	    this.listener();
	  };
	
	  HTML5History.prototype.stop = function stop() {
	    window.removeEventListener('popstate', this.listener);
	  };
	
	  HTML5History.prototype.go = function go(path, replace, append) {
	    var url = this.formatPath(path, append);
	    if (replace) {
	      history.replaceState({}, '', url);
	    } else {
	      // record scroll position by replacing current state
	      history.replaceState({
	        pos: {
	          x: window.pageXOffset,
	          y: window.pageYOffset
	        }
	      }, '');
	      // then push new state
	      history.pushState({}, '', url);
	    }
	    var hashMatch = path.match(hashRE);
	    var hash = hashMatch && hashMatch[0];
	    path = url
	    // strip hash so it doesn't mess up params
	    .replace(hashRE, '')
	    // remove root before matching
	    .replace(this.rootRE, '');
	    this.onChange(path, null, hash);
	  };
	
	  HTML5History.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/'
	    // absolute path
	    ? this.root ? this.root + '/' + path.replace(/^\//, '') : path : resolvePath(this.base || location.pathname, path, append);
	  };
	
	  return HTML5History;
	})();
	
	var HashHistory = (function () {
	  function HashHistory(_ref) {
	    var hashbang = _ref.hashbang;
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, HashHistory);
	
	    this.hashbang = hashbang;
	    this.onChange = onChange;
	  }
	
	  HashHistory.prototype.start = function start() {
	    var self = this;
	    this.listener = function () {
	      var path = location.hash;
	      var raw = path.replace(/^#!?/, '');
	      // always
	      if (raw.charAt(0) !== '/') {
	        raw = '/' + raw;
	      }
	      var formattedPath = self.formatPath(raw);
	      if (formattedPath !== path) {
	        location.replace(formattedPath);
	        return;
	      }
	      // determine query
	      // note it's possible to have queries in both the actual URL
	      // and the hash fragment itself.
	      var query = location.search && path.indexOf('?') > -1 ? '&' + location.search.slice(1) : location.search;
	      self.onChange(decodeURI(path.replace(/^#!?/, '') + query));
	    };
	    window.addEventListener('hashchange', this.listener);
	    this.listener();
	  };
	
	  HashHistory.prototype.stop = function stop() {
	    window.removeEventListener('hashchange', this.listener);
	  };
	
	  HashHistory.prototype.go = function go(path, replace, append) {
	    path = this.formatPath(path, append);
	    if (replace) {
	      location.replace(path);
	    } else {
	      location.hash = path;
	    }
	  };
	
	  HashHistory.prototype.formatPath = function formatPath(path, append) {
	    var isAbsoloute = path.charAt(0) === '/';
	    var prefix = '#' + (this.hashbang ? '!' : '');
	    return isAbsoloute ? prefix + path : prefix + resolvePath(location.hash.replace(/^#!?/, ''), path, append);
	  };
	
	  return HashHistory;
	})();
	
	var AbstractHistory = (function () {
	  function AbstractHistory(_ref) {
	    var onChange = _ref.onChange;
	    babelHelpers.classCallCheck(this, AbstractHistory);
	
	    this.onChange = onChange;
	    this.currentPath = '/';
	  }
	
	  AbstractHistory.prototype.start = function start() {
	    this.onChange('/');
	  };
	
	  AbstractHistory.prototype.stop = function stop() {
	    // noop
	  };
	
	  AbstractHistory.prototype.go = function go(path, replace, append) {
	    path = this.currentPath = this.formatPath(path, append);
	    this.onChange(path);
	  };
	
	  AbstractHistory.prototype.formatPath = function formatPath(path, append) {
	    return path.charAt(0) === '/' ? path : resolvePath(this.currentPath, path, append);
	  };
	
	  return AbstractHistory;
	})();
	
	/**
	 * Determine the reusability of an existing router view.
	 *
	 * @param {Directive} view
	 * @param {Object} handler
	 * @param {Transition} transition
	 */
	
	function canReuse(view, handler, transition) {
	  var component = view.childVM;
	  if (!component || !handler) {
	    return false;
	  }
	  // important: check view.Component here because it may
	  // have been changed in activate hook
	  if (view.Component !== handler.component) {
	    return false;
	  }
	  var canReuseFn = getRouteConfig(component, 'canReuse');
	  return typeof canReuseFn === 'boolean' ? canReuseFn : canReuseFn ? canReuseFn.call(component, {
	    to: transition.to,
	    from: transition.from
	  }) : true; // defaults to true
	}
	
	/**
	 * Check if a component can deactivate.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function canDeactivate(view, transition, next) {
	  var fromComponent = view.childVM;
	  var hook = getRouteConfig(fromComponent, 'canDeactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHook(hook, fromComponent, next, {
	      expectBoolean: true
	    });
	  }
	}
	
	/**
	 * Check if a component can activate.
	 *
	 * @param {Object} handler
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function canActivate(handler, transition, next) {
	  resolveAsyncComponent(handler, function (Component) {
	    // have to check due to async-ness
	    if (transition.aborted) {
	      return;
	    }
	    // determine if this component can be activated
	    var hook = getRouteConfig(Component, 'canActivate');
	    if (!hook) {
	      next();
	    } else {
	      transition.callHook(hook, null, next, {
	        expectBoolean: true
	      });
	    }
	  });
	}
	
	/**
	 * Call deactivate hooks for existing router-views.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Function} next
	 */
	
	function deactivate(view, transition, next) {
	  var component = view.childVM;
	  var hook = getRouteConfig(component, 'deactivate');
	  if (!hook) {
	    next();
	  } else {
	    transition.callHooks(hook, component, next);
	  }
	}
	
	/**
	 * Activate / switch component for a router-view.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 * @param {Number} depth
	 * @param {Function} [cb]
	 */
	
	function activate(view, transition, depth, cb, reuse) {
	  var handler = transition.activateQueue[depth];
	  if (!handler) {
	    // fix 1.0.0-alpha.3 compat
	    if (view._bound) {
	      view.setComponent(null);
	    }
	    cb && cb();
	    return;
	  }
	
	  var Component = view.Component = handler.component;
	  var activateHook = getRouteConfig(Component, 'activate');
	  var dataHook = getRouteConfig(Component, 'data');
	  var waitForData = getRouteConfig(Component, 'waitForData');
	
	  view.depth = depth;
	  view.activated = false;
	
	  var component = undefined;
	  var loading = !!(dataHook && !waitForData);
	
	  // "reuse" is a flag passed down when the parent view is
	  // either reused via keep-alive or as a child of a kept-alive view.
	  // of course we can only reuse if the current kept-alive instance
	  // is of the correct type.
	  reuse = reuse && view.childVM && view.childVM.constructor === Component;
	
	  if (reuse) {
	    // just reuse
	    component = view.childVM;
	    component.$loadingRouteData = loading;
	  } else {
	    // unbuild current component. this step also destroys
	    // and removes all nested child views.
	    view.unbuild(true);
	    // handle keep-alive.
	    // if the view has keep-alive, the child vm is not actually
	    // destroyed - its nested views will still be in router's
	    // view list. We need to removed these child views and
	    // cache them on the child vm.
	    if (view.keepAlive) {
	      var views = transition.router._views;
	      var i = views.indexOf(view);
	      if (i > 0) {
	        transition.router._views = views.slice(i);
	        if (view.childVM) {
	          view.childVM._routerViews = views.slice(0, i);
	        }
	      }
	    }
	
	    // build the new component. this will also create the
	    // direct child view of the current one. it will register
	    // itself as view.childView.
	    component = view.build({
	      _meta: {
	        $loadingRouteData: loading
	      }
	    });
	    // handle keep-alive.
	    // when a kept-alive child vm is restored, we need to
	    // add its cached child views into the router's view list,
	    // and also properly update current view's child view.
	    if (view.keepAlive) {
	      component.$loadingRouteData = loading;
	      var cachedViews = component._routerViews;
	      if (cachedViews) {
	        transition.router._views = cachedViews.concat(transition.router._views);
	        view.childView = cachedViews[cachedViews.length - 1];
	        component._routerViews = null;
	      }
	    }
	  }
	
	  // cleanup the component in case the transition is aborted
	  // before the component is ever inserted.
	  var cleanup = function cleanup() {
	    component.$destroy();
	  };
	
	  // actually insert the component and trigger transition
	  var insert = function insert() {
	    if (reuse) {
	      cb && cb();
	      return;
	    }
	    var router = transition.router;
	    if (router._rendered || router._transitionOnLoad) {
	      view.transition(component);
	    } else {
	      // no transition on first render, manual transition
	      /* istanbul ignore if */
	      if (view.setCurrent) {
	        // 0.12 compat
	        view.setCurrent(component);
	      } else {
	        // 1.0
	        view.childVM = component;
	      }
	      component.$before(view.anchor, null, false);
	    }
	    cb && cb();
	  };
	
	  // called after activation hook is resolved
	  var afterActivate = function afterActivate() {
	    view.activated = true;
	    // activate the child view
	    if (view.childView) {
	      activate(view.childView, transition, depth + 1, null, reuse || view.keepAlive);
	    }
	    if (dataHook && waitForData) {
	      // wait until data loaded to insert
	      loadData(component, transition, dataHook, insert, cleanup);
	    } else {
	      // load data and insert at the same time
	      if (dataHook) {
	        loadData(component, transition, dataHook);
	      }
	      insert();
	    }
	  };
	
	  if (activateHook) {
	    transition.callHooks(activateHook, component, afterActivate, {
	      cleanup: cleanup
	    });
	  } else {
	    afterActivate();
	  }
	}
	
	/**
	 * Reuse a view, just reload data if necessary.
	 *
	 * @param {Directive} view
	 * @param {Transition} transition
	 */
	
	function reuse(view, transition) {
	  var component = view.childVM;
	  var dataHook = getRouteConfig(component, 'data');
	  if (dataHook) {
	    loadData(component, transition, dataHook);
	  }
	}
	
	/**
	 * Asynchronously load and apply data to component.
	 *
	 * @param {Vue} component
	 * @param {Transition} transition
	 * @param {Function} hook
	 * @param {Function} cb
	 * @param {Function} cleanup
	 */
	
	function loadData(component, transition, hook, cb, cleanup) {
	  component.$loadingRouteData = true;
	  transition.callHooks(hook, component, function (data, onError) {
	    // merge data from multiple data hooks
	    if (Array.isArray(data) && data._needMerge) {
	      data = data.reduce(function (res, obj) {
	        if (isPlainObject(obj)) {
	          Object.keys(obj).forEach(function (key) {
	            res[key] = obj[key];
	          });
	        }
	        return res;
	      }, Object.create(null));
	    }
	    // handle promise sugar syntax
	    var promises = [];
	    if (isPlainObject(data)) {
	      Object.keys(data).forEach(function (key) {
	        var val = data[key];
	        if (isPromise(val)) {
	          promises.push(val.then(function (resolvedVal) {
	            component.$set(key, resolvedVal);
	          }));
	        } else {
	          component.$set(key, val);
	        }
	      });
	    }
	    if (!promises.length) {
	      component.$loadingRouteData = false;
	      cb && cb();
	    } else {
	      promises[0].constructor.all(promises).then(function (_) {
	        component.$loadingRouteData = false;
	        cb && cb();
	      }, onError);
	    }
	  }, {
	    cleanup: cleanup,
	    expectData: true
	  });
	}
	
	function isPlainObject(obj) {
	  return Object.prototype.toString.call(obj) === '[object Object]';
	}
	
	/**
	 * A RouteTransition object manages the pipeline of a
	 * router-view switching process. This is also the object
	 * passed into user route hooks.
	 *
	 * @param {Router} router
	 * @param {Route} to
	 * @param {Route} from
	 */
	
	var RouteTransition = (function () {
	  function RouteTransition(router, to, from) {
	    babelHelpers.classCallCheck(this, RouteTransition);
	
	    this.router = router;
	    this.to = to;
	    this.from = from;
	    this.next = null;
	    this.aborted = false;
	    this.done = false;
	
	    // start by determine the queues
	
	    // the deactivate queue is an array of router-view
	    // directive instances that need to be deactivated,
	    // deepest first.
	    this.deactivateQueue = router._views;
	
	    // check the default handler of the deepest match
	    var matched = to.matched ? Array.prototype.slice.call(to.matched) : [];
	
	    // the activate queue is an array of route handlers
	    // that need to be activated
	    this.activateQueue = matched.map(function (match) {
	      return match.handler;
	    });
	  }
	
	  /**
	   * Abort current transition and return to previous location.
	   */
	
	  RouteTransition.prototype.abort = function abort() {
	    if (!this.aborted) {
	      this.aborted = true;
	      // if the root path throws an error during validation
	      // on initial load, it gets caught in an infinite loop.
	      var abortingOnLoad = !this.from.path && this.to.path === '/';
	      if (!abortingOnLoad) {
	        this.router.replace(this.from.path || '/');
	      }
	    }
	  };
	
	  /**
	   * Abort current transition and redirect to a new location.
	   *
	   * @param {String} path
	   */
	
	  RouteTransition.prototype.redirect = function redirect(path) {
	    if (!this.aborted) {
	      this.aborted = true;
	      if (typeof path === 'string') {
	        path = mapParams(path, this.to.params, this.to.query);
	      } else {
	        path.params = path.params || this.to.params;
	        path.query = path.query || this.to.query;
	      }
	      this.router.replace(path);
	    }
	  };
	
	  /**
	   * A router view transition's pipeline can be described as
	   * follows, assuming we are transitioning from an existing
	   * <router-view> chain [Component A, Component B] to a new
	   * chain [Component A, Component C]:
	   *
	   *  A    A
	   *  | => |
	   *  B    C
	   *
	   * 1. Reusablity phase:
	   *   -> canReuse(A, A)
	   *   -> canReuse(B, C)
	   *   -> determine new queues:
	   *      - deactivation: [B]
	   *      - activation: [C]
	   *
	   * 2. Validation phase:
	   *   -> canDeactivate(B)
	   *   -> canActivate(C)
	   *
	   * 3. Activation phase:
	   *   -> deactivate(B)
	   *   -> activate(C)
	   *
	   * Each of these steps can be asynchronous, and any
	   * step can potentially abort the transition.
	   *
	   * @param {Function} cb
	   */
	
	  RouteTransition.prototype.start = function start(cb) {
	    var transition = this;
	    var daq = this.deactivateQueue;
	    var aq = this.activateQueue;
	    var rdaq = daq.slice().reverse();
	    var reuseQueue = undefined;
	
	    // 1. Reusability phase
	    var i = undefined;
	    for (i = 0; i < rdaq.length; i++) {
	      if (!canReuse(rdaq[i], aq[i], transition)) {
	        break;
	      }
	    }
	    if (i > 0) {
	      reuseQueue = rdaq.slice(0, i);
	      daq = rdaq.slice(i).reverse();
	      aq = aq.slice(i);
	    }
	
	    // 2. Validation phase
	    transition.runQueue(daq, canDeactivate, function () {
	      transition.runQueue(aq, canActivate, function () {
	        transition.runQueue(daq, deactivate, function () {
	          // 3. Activation phase
	
	          // Update router current route
	          transition.router._onTransitionValidated(transition);
	
	          // trigger reuse for all reused views
	          reuseQueue && reuseQueue.forEach(function (view) {
	            reuse(view, transition);
	          });
	
	          // the root of the chain that needs to be replaced
	          // is the top-most non-reusable view.
	          if (daq.length) {
	            var view = daq[daq.length - 1];
	            var depth = reuseQueue ? reuseQueue.length : 0;
	            activate(view, transition, depth, cb);
	          } else {
	            cb();
	          }
	        });
	      });
	    });
	  };
	
	  /**
	   * Asynchronously and sequentially apply a function to a
	   * queue.
	   *
	   * @param {Array} queue
	   * @param {Function} fn
	   * @param {Function} cb
	   */
	
	  RouteTransition.prototype.runQueue = function runQueue(queue, fn, cb) {
	    var transition = this;
	    step(0);
	    function step(index) {
	      if (index >= queue.length) {
	        cb();
	      } else {
	        fn(queue[index], transition, function () {
	          step(index + 1);
	        });
	      }
	    }
	  };
	
	  /**
	   * Call a user provided route transition hook and handle
	   * the response (e.g. if the user returns a promise).
	   *
	   * If the user neither expects an argument nor returns a
	   * promise, the hook is assumed to be synchronous.
	   *
	   * @param {Function} hook
	   * @param {*} [context]
	   * @param {Function} [cb]
	   * @param {Object} [options]
	   *                 - {Boolean} expectBoolean
	   *                 - {Boolean} expectData
	   *                 - {Function} cleanup
	   */
	
	  RouteTransition.prototype.callHook = function callHook(hook, context, cb) {
	    var _ref = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];
	
	    var _ref$expectBoolean = _ref.expectBoolean;
	    var expectBoolean = _ref$expectBoolean === undefined ? false : _ref$expectBoolean;
	    var _ref$expectData = _ref.expectData;
	    var expectData = _ref$expectData === undefined ? false : _ref$expectData;
	    var cleanup = _ref.cleanup;
	
	    var transition = this;
	    var nextCalled = false;
	
	    // abort the transition
	    var abort = function abort() {
	      cleanup && cleanup();
	      transition.abort();
	    };
	
	    // handle errors
	    var onError = function onError(err) {
	      // cleanup indicates an after-activation hook,
	      // so instead of aborting we just let the transition
	      // finish.
	      cleanup ? next() : abort();
	      if (err && !transition.router._suppress) {
	        warn('Uncaught error during transition: ');
	        throw err instanceof Error ? err : new Error(err);
	      }
	    };
	
	    // advance the transition to the next step
	    var next = function next(data) {
	      if (nextCalled) {
	        warn('transition.next() should be called only once.');
	        return;
	      }
	      nextCalled = true;
	      if (transition.aborted) {
	        cleanup && cleanup();
	        return;
	      }
	      cb && cb(data, onError);
	    };
	
	    // expose a clone of the transition object, so that each
	    // hook gets a clean copy and prevent the user from
	    // messing with the internals.
	    var exposed = {
	      to: transition.to,
	      from: transition.from,
	      abort: abort,
	      next: next,
	      redirect: function redirect() {
	        transition.redirect.apply(transition, arguments);
	      }
	    };
	
	    // actually call the hook
	    var res = undefined;
	    try {
	      res = hook.call(context, exposed);
	    } catch (err) {
	      return onError(err);
	    }
	
	    // handle boolean/promise return values
	    var resIsPromise = isPromise(res);
	    if (expectBoolean) {
	      if (typeof res === 'boolean') {
	        res ? next() : abort();
	      } else if (resIsPromise) {
	        res.then(function (ok) {
	          ok ? next() : abort();
	        }, onError);
	      } else if (!hook.length) {
	        next(res);
	      }
	    } else if (resIsPromise) {
	      res.then(next, onError);
	    } else if (expectData && isPlainOjbect(res) || !hook.length) {
	      next(res);
	    }
	  };
	
	  /**
	   * Call a single hook or an array of async hooks in series.
	   *
	   * @param {Array} hooks
	   * @param {*} context
	   * @param {Function} cb
	   * @param {Object} [options]
	   */
	
	  RouteTransition.prototype.callHooks = function callHooks(hooks, context, cb, options) {
	    var _this = this;
	
	    if (Array.isArray(hooks)) {
	      (function () {
	        var res = [];
	        res._needMerge = true;
	        var onError = undefined;
	        _this.runQueue(hooks, function (hook, _, next) {
	          if (!_this.aborted) {
	            _this.callHook(hook, context, function (r, onError) {
	              if (r) res.push(r);
	              onError = onError;
	              next();
	            }, options);
	          }
	        }, function () {
	          cb(res, onError);
	        });
	      })();
	    } else {
	      this.callHook(hooks, context, cb, options);
	    }
	  };
	
	  return RouteTransition;
	})();
	
	function isPlainOjbect(val) {
	  return Object.prototype.toString.call(val) === '[object Object]';
	}
	
	var internalKeysRE = /^(component|subRoutes)$/;
	
	/**
	 * Route Context Object
	 *
	 * @param {String} path
	 * @param {Router} router
	 */
	
	var Route = function Route(path, router) {
	  var _this = this;
	
	  babelHelpers.classCallCheck(this, Route);
	
	  var matched = router._recognizer.recognize(path);
	  if (matched) {
	    // copy all custom fields from route configs
	    [].forEach.call(matched, function (match) {
	      for (var key in match.handler) {
	        if (!internalKeysRE.test(key)) {
	          _this[key] = match.handler[key];
	        }
	      }
	    });
	    // set query and params
	    this.query = matched.queryParams;
	    this.params = [].reduce.call(matched, function (prev, cur) {
	      if (cur.params) {
	        for (var key in cur.params) {
	          prev[key] = cur.params[key];
	        }
	      }
	      return prev;
	    }, {});
	  }
	  // expose path and router
	  this.path = path;
	  this.router = router;
	  // for internal use
	  this.matched = matched || router._notFoundHandler;
	  // Important: freeze self to prevent observation
	  Object.freeze(this);
	};
	
	function applyOverride (Vue) {
	
	  var _ = Vue.util;
	
	  // override Vue's init and destroy process to keep track of router instances
	  var init = Vue.prototype._init;
	  Vue.prototype._init = function (options) {
	    var root = options._parent || options.parent || this;
	    var route = root.$route;
	    if (route) {
	      route.router._children.push(this);
	      if (!this.$route) {
	        /* istanbul ignore if */
	        if (this._defineMeta) {
	          // 0.12
	          this._defineMeta('$route', route);
	        } else {
	          // 1.0
	          _.defineReactive(this, '$route', route);
	        }
	      }
	    }
	    init.call(this, options);
	  };
	
	  var destroy = Vue.prototype._destroy;
	  Vue.prototype._destroy = function () {
	    if (!this._isBeingDestroyed) {
	      var route = this.$root.$route;
	      if (route) {
	        route.router._children.$remove(this);
	      }
	      destroy.apply(this, arguments);
	    }
	  };
	
	  // 1.0 only: enable route mixins
	  var strats = Vue.config.optionMergeStrategies;
	  var hooksToMergeRE = /^(data|activate|deactivate)$/;
	
	  if (strats) {
	    strats.route = function (parentVal, childVal) {
	      if (!childVal) return parentVal;
	      if (!parentVal) return childVal;
	      var ret = {};
	      _.extend(ret, parentVal);
	      for (var key in childVal) {
	        var a = ret[key];
	        var b = childVal[key];
	        // for data, activate and deactivate, we need to merge them into
	        // arrays similar to lifecycle hooks.
	        if (a && hooksToMergeRE.test(key)) {
	          ret[key] = (_.isArray(a) ? a : [a]).concat(b);
	        } else {
	          ret[key] = b;
	        }
	      }
	      return ret;
	    };
	  }
	}
	
	function View (Vue) {
	
	  var _ = Vue.util;
	  var componentDef =
	  // 0.12
	  Vue.directive('_component') ||
	  // 1.0
	  Vue.internalDirectives.component;
	  // <router-view> extends the internal component directive
	  var viewDef = _.extend({}, componentDef);
	
	  // with some overrides
	  _.extend(viewDef, {
	
	    _isRouterView: true,
	
	    bind: function bind() {
	      var route = this.vm.$route;
	      /* istanbul ignore if */
	      if (!route) {
	        warn('<router-view> can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // force dynamic directive so v-component doesn't
	      // attempt to build right now
	      this._isDynamicLiteral = true;
	      // finally, init by delegating to v-component
	      componentDef.bind.call(this);
	
	      // all we need to do here is registering this view
	      // in the router. actual component switching will be
	      // managed by the pipeline.
	      var router = this.router = route.router;
	      router._views.unshift(this);
	
	      // note the views are in reverse order.
	      var parentView = router._views[1];
	      if (parentView) {
	        // register self as a child of the parent view,
	        // instead of activating now. This is so that the
	        // child's activate hook is called after the
	        // parent's has resolved.
	        parentView.childView = this;
	      }
	
	      // handle late-rendered view
	      // two possibilities:
	      // 1. root view rendered after transition has been
	      //    validated;
	      // 2. child view rendered after parent view has been
	      //    activated.
	      var transition = route.router._currentTransition;
	      if (!parentView && transition.done || parentView && parentView.activated) {
	        var depth = parentView ? parentView.depth + 1 : 0;
	        activate(this, transition, depth);
	      }
	    },
	
	    unbind: function unbind() {
	      this.router._views.$remove(this);
	      componentDef.unbind.call(this);
	    }
	  });
	
	  Vue.elementDirective('router-view', viewDef);
	}
	
	var trailingSlashRE = /\/$/;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	var queryStringRE = /\?.*$/;
	
	// install v-link, which provides navigation support for
	// HTML5 history mode
	function Link (Vue) {
	
	  var _ = Vue.util;
	
	  Vue.directive('link', {
	
	    bind: function bind() {
	      var _this = this;
	
	      var vm = this.vm;
	      /* istanbul ignore if */
	      if (!vm.$route) {
	        warn('v-link can only be used inside a ' + 'router-enabled app.');
	        return;
	      }
	      // no need to handle click if link expects to be opened
	      // in a new window/tab.
	      /* istanbul ignore if */
	      if (this.el.tagName === 'A' && this.el.getAttribute('target') === '_blank') {
	        return;
	      }
	      // handle click
	      var router = vm.$route.router;
	      this.handler = function (e) {
	        // don't redirect with control keys
	        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
	        // don't redirect when preventDefault called
	        if (e.defaultPrevented) return;
	        // don't redirect on right click
	        if (e.button !== 0) return;
	
	        var target = _this.target;
	        var go = function go(target) {
	          e.preventDefault();
	          if (target != null) {
	            router.go(target);
	          }
	        };
	
	        if (_this.el.tagName === 'A' || e.target === _this.el) {
	          // v-link on <a v-link="'path'">
	          go(target);
	        } else {
	          // v-link delegate on <div v-link>
	          var el = e.target;
	          while (el && el.tagName !== 'A' && el !== _this.el) {
	            el = el.parentNode;
	          }
	          if (!el) return;
	          if (el.tagName !== 'A' || !el.href) {
	            // allow not anchor
	            go(target);
	          } else if (sameOrigin(el)) {
	            go({
	              path: el.pathname,
	              replace: target && target.replace,
	              append: target && target.append
	            });
	          }
	        }
	      };
	      this.el.addEventListener('click', this.handler);
	      // manage active link class
	      this.unwatch = vm.$watch('$route.path', _.bind(this.updateClasses, this));
	    },
	
	    update: function update(path) {
	      var router = this.vm.$route.router;
	      var append = undefined;
	      this.target = path;
	      if (_.isObject(path)) {
	        append = path.append;
	        this.exact = path.exact;
	        this.prevActiveClass = this.activeClass;
	        this.activeClass = path.activeClass;
	      }
	      path = this.path = router._stringifyPath(path);
	      this.activeRE = path && !this.exact ? new RegExp('^' + path.replace(/\/$/, '').replace(regexEscapeRE, '\\$&') + '(\\/|$)') : null;
	      this.updateClasses(this.vm.$route.path);
	      var isAbsolute = path.charAt(0) === '/';
	      // do not format non-hash relative paths
	      var href = path && (router.mode === 'hash' || isAbsolute) ? router.history.formatPath(path, append) : path;
	      if (this.el.tagName === 'A') {
	        if (href) {
	          this.el.href = href;
	        } else {
	          this.el.removeAttribute('href');
	        }
	      }
	    },
	
	    updateClasses: function updateClasses(path) {
	      var el = this.el;
	      var router = this.vm.$route.router;
	      var activeClass = this.activeClass || router._linkActiveClass;
	      // clear old class
	      if (this.prevActiveClass !== activeClass) {
	        _.removeClass(el, this.prevActiveClass);
	      }
	      // remove query string before matching
	      var dest = this.path.replace(queryStringRE, '');
	      path = path.replace(queryStringRE, '');
	      // add new class
	      if (this.exact) {
	        if (dest === path ||
	        // also allow additional trailing slash
	        dest.charAt(dest.length - 1) !== '/' && dest === path.replace(trailingSlashRE, '')) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      } else {
	        if (this.activeRE && this.activeRE.test(path)) {
	          _.addClass(el, activeClass);
	        } else {
	          _.removeClass(el, activeClass);
	        }
	      }
	    },
	
	    unbind: function unbind() {
	      this.el.removeEventListener('click', this.handler);
	      this.unwatch && this.unwatch();
	    }
	  });
	
	  function sameOrigin(link) {
	    return link.protocol === location.protocol && link.hostname === location.hostname && link.port === location.port;
	  }
	}
	
	var historyBackends = {
	  abstract: AbstractHistory,
	  hash: HashHistory,
	  html5: HTML5History
	};
	
	// late bind during install
	var Vue = undefined;
	
	/**
	 * Router constructor
	 *
	 * @param {Object} [options]
	 */
	
	var Router = (function () {
	  function Router() {
	    var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	    var _ref$hashbang = _ref.hashbang;
	    var hashbang = _ref$hashbang === undefined ? true : _ref$hashbang;
	    var _ref$abstract = _ref.abstract;
	    var abstract = _ref$abstract === undefined ? false : _ref$abstract;
	    var _ref$history = _ref.history;
	    var history = _ref$history === undefined ? false : _ref$history;
	    var _ref$saveScrollPosition = _ref.saveScrollPosition;
	    var saveScrollPosition = _ref$saveScrollPosition === undefined ? false : _ref$saveScrollPosition;
	    var _ref$transitionOnLoad = _ref.transitionOnLoad;
	    var transitionOnLoad = _ref$transitionOnLoad === undefined ? false : _ref$transitionOnLoad;
	    var _ref$suppressTransitionError = _ref.suppressTransitionError;
	    var suppressTransitionError = _ref$suppressTransitionError === undefined ? false : _ref$suppressTransitionError;
	    var _ref$root = _ref.root;
	    var root = _ref$root === undefined ? null : _ref$root;
	    var _ref$linkActiveClass = _ref.linkActiveClass;
	    var linkActiveClass = _ref$linkActiveClass === undefined ? 'v-link-active' : _ref$linkActiveClass;
	    babelHelpers.classCallCheck(this, Router);
	
	    /* istanbul ignore if */
	    if (!Router.installed) {
	      throw new Error('Please install the Router with Vue.use() before ' + 'creating an instance.');
	    }
	
	    // Vue instances
	    this.app = null;
	    this._views = [];
	    this._children = [];
	
	    // route recognizer
	    this._recognizer = new RouteRecognizer();
	    this._guardRecognizer = new RouteRecognizer();
	
	    // state
	    this._started = false;
	    this._startCb = null;
	    this._currentRoute = {};
	    this._currentTransition = null;
	    this._previousTransition = null;
	    this._notFoundHandler = null;
	    this._notFoundRedirect = null;
	    this._beforeEachHooks = [];
	    this._afterEachHooks = [];
	
	    // feature detection
	    this._hasPushState = typeof window !== 'undefined' && window.history && window.history.pushState;
	
	    // trigger transition on initial render?
	    this._rendered = false;
	    this._transitionOnLoad = transitionOnLoad;
	
	    // history mode
	    this._abstract = abstract;
	    this._hashbang = hashbang;
	    this._history = this._hasPushState && history;
	
	    // other options
	    this._saveScrollPosition = saveScrollPosition;
	    this._linkActiveClass = linkActiveClass;
	    this._suppress = suppressTransitionError;
	
	    // create history object
	    var inBrowser = Vue.util.inBrowser;
	    this.mode = !inBrowser || this._abstract ? 'abstract' : this._history ? 'html5' : 'hash';
	
	    var History = historyBackends[this.mode];
	    var self = this;
	    this.history = new History({
	      root: root,
	      hashbang: this._hashbang,
	      onChange: function onChange(path, state, anchor) {
	        self._match(path, state, anchor);
	      }
	    });
	  }
	
	  /**
	   * Allow directly passing components to a route
	   * definition.
	   *
	   * @param {String} path
	   * @param {Object} handler
	   */
	
	  // API ===================================================
	
	  /**
	  * Register a map of top-level paths.
	  *
	  * @param {Object} map
	  */
	
	  Router.prototype.map = function map(_map) {
	    for (var route in _map) {
	      this.on(route, _map[route]);
	    }
	  };
	
	  /**
	   * Register a single root-level path
	   *
	   * @param {String} rootPath
	   * @param {Object} handler
	   *                 - {String} component
	   *                 - {Object} [subRoutes]
	   *                 - {Boolean} [forceRefresh]
	   *                 - {Function} [before]
	   *                 - {Function} [after]
	   */
	
	  Router.prototype.on = function on(rootPath, handler) {
	    if (rootPath === '*') {
	      this._notFound(handler);
	    } else {
	      this._addRoute(rootPath, handler, []);
	    }
	  };
	
	  /**
	   * Set redirects.
	   *
	   * @param {Object} map
	   */
	
	  Router.prototype.redirect = function redirect(map) {
	    for (var path in map) {
	      this._addRedirect(path, map[path]);
	    }
	  };
	
	  /**
	   * Set aliases.
	   *
	   * @param {Object} map
	   */
	
	  Router.prototype.alias = function alias(map) {
	    for (var path in map) {
	      this._addAlias(path, map[path]);
	    }
	  };
	
	  /**
	   * Set global before hook.
	   *
	   * @param {Function} fn
	   */
	
	  Router.prototype.beforeEach = function beforeEach(fn) {
	    this._beforeEachHooks.push(fn);
	  };
	
	  /**
	   * Set global after hook.
	   *
	   * @param {Function} fn
	   */
	
	  Router.prototype.afterEach = function afterEach(fn) {
	    this._afterEachHooks.push(fn);
	  };
	
	  /**
	   * Navigate to a given path.
	   * The path can be an object describing a named path in
	   * the format of { name: '...', params: {}, query: {}}
	   * The path is assumed to be already decoded, and will
	   * be resolved against root (if provided)
	   *
	   * @param {String|Object} path
	   * @param {Boolean} [replace]
	   */
	
	  Router.prototype.go = function go(path) {
	    var replace = false;
	    var append = false;
	    if (Vue.util.isObject(path)) {
	      replace = path.replace;
	      append = path.append;
	    }
	    path = this._stringifyPath(path);
	    if (path) {
	      this.history.go(path, replace, append);
	    }
	  };
	
	  /**
	   * Short hand for replacing current path
	   *
	   * @param {String} path
	   */
	
	  Router.prototype.replace = function replace(path) {
	    if (typeof path === 'string') {
	      path = { path: path };
	    }
	    path.replace = true;
	    this.go(path);
	  };
	
	  /**
	   * Start the router.
	   *
	   * @param {VueConstructor} App
	   * @param {String|Element} container
	   * @param {Function} [cb]
	   */
	
	  Router.prototype.start = function start(App, container, cb) {
	    /* istanbul ignore if */
	    if (this._started) {
	      warn('already started.');
	      return;
	    }
	    this._started = true;
	    this._startCb = cb;
	    if (!this.app) {
	      /* istanbul ignore if */
	      if (!App || !container) {
	        throw new Error('Must start vue-router with a component and a ' + 'root container.');
	      }
	      this._appContainer = container;
	      var Ctor = this._appConstructor = typeof App === 'function' ? App : Vue.extend(App);
	      // give it a name for better debugging
	      Ctor.options.name = Ctor.options.name || 'RouterApp';
	    }
	    this.history.start();
	  };
	
	  /**
	   * Stop listening to route changes.
	   */
	
	  Router.prototype.stop = function stop() {
	    this.history.stop();
	    this._started = false;
	  };
	
	  // Internal methods ======================================
	
	  /**
	  * Add a route containing a list of segments to the internal
	  * route recognizer. Will be called recursively to add all
	  * possible sub-routes.
	  *
	  * @param {String} path
	  * @param {Object} handler
	  * @param {Array} segments
	  */
	
	  Router.prototype._addRoute = function _addRoute(path, handler, segments) {
	    guardComponent(path, handler);
	    handler.path = path;
	    handler.fullPath = (segments.reduce(function (path, segment) {
	      return path + segment.path;
	    }, '') + path).replace('//', '/');
	    segments.push({
	      path: path,
	      handler: handler
	    });
	    this._recognizer.add(segments, {
	      as: handler.name
	    });
	    // add sub routes
	    if (handler.subRoutes) {
	      for (var subPath in handler.subRoutes) {
	        // recursively walk all sub routes
	        this._addRoute(subPath, handler.subRoutes[subPath],
	        // pass a copy in recursion to avoid mutating
	        // across branches
	        segments.slice());
	      }
	    }
	  };
	
	  /**
	   * Set the notFound route handler.
	   *
	   * @param {Object} handler
	   */
	
	  Router.prototype._notFound = function _notFound(handler) {
	    guardComponent('*', handler);
	    this._notFoundHandler = [{ handler: handler }];
	  };
	
	  /**
	   * Add a redirect record.
	   *
	   * @param {String} path
	   * @param {String} redirectPath
	   */
	
	  Router.prototype._addRedirect = function _addRedirect(path, redirectPath) {
	    if (path === '*') {
	      this._notFoundRedirect = redirectPath;
	    } else {
	      this._addGuard(path, redirectPath, this.replace);
	    }
	  };
	
	  /**
	   * Add an alias record.
	   *
	   * @param {String} path
	   * @param {String} aliasPath
	   */
	
	  Router.prototype._addAlias = function _addAlias(path, aliasPath) {
	    this._addGuard(path, aliasPath, this._match);
	  };
	
	  /**
	   * Add a path guard.
	   *
	   * @param {String} path
	   * @param {String} mappedPath
	   * @param {Function} handler
	   */
	
	  Router.prototype._addGuard = function _addGuard(path, mappedPath, _handler) {
	    var _this = this;
	
	    this._guardRecognizer.add([{
	      path: path,
	      handler: function handler(match, query) {
	        var realPath = mapParams(mappedPath, match.params, query);
	        _handler.call(_this, realPath);
	      }
	    }]);
	  };
	
	  /**
	   * Check if a path matches any redirect records.
	   *
	   * @param {String} path
	   * @return {Boolean} - if true, will skip normal match.
	   */
	
	  Router.prototype._checkGuard = function _checkGuard(path) {
	    var matched = this._guardRecognizer.recognize(path);
	    if (matched) {
	      matched[0].handler(matched[0], matched.queryParams);
	      return true;
	    } else if (this._notFoundRedirect) {
	      matched = this._recognizer.recognize(path);
	      if (!matched) {
	        this.replace(this._notFoundRedirect);
	        return true;
	      }
	    }
	  };
	
	  /**
	   * Match a URL path and set the route context on vm,
	   * triggering view updates.
	   *
	   * @param {String} path
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */
	
	  Router.prototype._match = function _match(path, state, anchor) {
	    var _this2 = this;
	
	    if (this._checkGuard(path)) {
	      return;
	    }
	
	    var currentRoute = this._currentRoute;
	    var currentTransition = this._currentTransition;
	
	    if (currentTransition) {
	      if (currentTransition.to.path === path) {
	        // do nothing if we have an active transition going to the same path
	        return;
	      } else if (currentRoute.path === path) {
	        // We are going to the same path, but we also have an ongoing but
	        // not-yet-validated transition. Abort that transition and reset to
	        // prev transition.
	        currentTransition.aborted = true;
	        this._currentTransition = this._prevTransition;
	        return;
	      } else {
	        // going to a totally different path. abort ongoing transition.
	        currentTransition.aborted = true;
	      }
	    }
	
	    // construct new route and transition context
	    var route = new Route(path, this);
	    var transition = new RouteTransition(this, route, currentRoute);
	
	    // current transition is updated right now.
	    // however, current route will only be updated after the transition has
	    // been validated.
	    this._prevTransition = currentTransition;
	    this._currentTransition = transition;
	
	    if (!this.app) {
	      // initial render
	      this.app = new this._appConstructor({
	        el: this._appContainer,
	        _meta: {
	          $route: route
	        }
	      });
	    }
	
	    // check global before hook
	    var beforeHooks = this._beforeEachHooks;
	    var startTransition = function startTransition() {
	      transition.start(function () {
	        _this2._postTransition(route, state, anchor);
	      });
	    };
	
	    if (beforeHooks.length) {
	      transition.runQueue(beforeHooks, function (hook, _, next) {
	        if (transition === _this2._currentTransition) {
	          transition.callHook(hook, null, next, {
	            expectBoolean: true
	          });
	        }
	      }, startTransition);
	    } else {
	      startTransition();
	    }
	
	    if (!this._rendered && this._startCb) {
	      this._startCb.call(null);
	    }
	
	    // HACK:
	    // set rendered to true after the transition start, so
	    // that components that are acitvated synchronously know
	    // whether it is the initial render.
	    this._rendered = true;
	  };
	
	  /**
	   * Set current to the new transition.
	   * This is called by the transition object when the
	   * validation of a route has succeeded.
	   *
	   * @param {Transition} transition
	   */
	
	  Router.prototype._onTransitionValidated = function _onTransitionValidated(transition) {
	    // set current route
	    var route = this._currentRoute = transition.to;
	    // update route context for all children
	    if (this.app.$route !== route) {
	      this.app.$route = route;
	      this._children.forEach(function (child) {
	        child.$route = route;
	      });
	    }
	    // call global after hook
	    if (this._afterEachHooks.length) {
	      this._afterEachHooks.forEach(function (hook) {
	        return hook.call(null, {
	          to: transition.to,
	          from: transition.from
	        });
	      });
	    }
	    this._currentTransition.done = true;
	  };
	
	  /**
	   * Handle stuff after the transition.
	   *
	   * @param {Route} route
	   * @param {Object} [state]
	   * @param {String} [anchor]
	   */
	
	  Router.prototype._postTransition = function _postTransition(route, state, anchor) {
	    // handle scroll positions
	    // saved scroll positions take priority
	    // then we check if the path has an anchor
	    var pos = state && state.pos;
	    if (pos && this._saveScrollPosition) {
	      Vue.nextTick(function () {
	        window.scrollTo(pos.x, pos.y);
	      });
	    } else if (anchor) {
	      Vue.nextTick(function () {
	        var el = document.getElementById(anchor.slice(1));
	        if (el) {
	          window.scrollTo(window.scrollX, el.offsetTop);
	        }
	      });
	    }
	  };
	
	  /**
	   * Normalize named route object / string paths into
	   * a string.
	   *
	   * @param {Object|String|Number} path
	   * @return {String}
	   */
	
	  Router.prototype._stringifyPath = function _stringifyPath(path) {
	    if (path && typeof path === 'object') {
	      if (path.name) {
	        var params = path.params || {};
	        if (path.query) {
	          params.queryParams = path.query;
	        }
	        return this._recognizer.generate(path.name, params);
	      } else if (path.path) {
	        var fullPath = path.path;
	        if (path.query) {
	          var query = this._recognizer.generateQueryString(path.query);
	          if (fullPath.indexOf('?') > -1) {
	            fullPath += '&' + query.slice(1);
	          } else {
	            fullPath += query;
	          }
	        }
	        return fullPath;
	      } else {
	        return '';
	      }
	    } else {
	      return path ? path + '' : '';
	    }
	  };
	
	  return Router;
	})();
	
	function guardComponent(path, handler) {
	  var comp = handler.component;
	  if (Vue.util.isPlainObject(comp)) {
	    comp = handler.component = Vue.extend(comp);
	  }
	  /* istanbul ignore if */
	  if (typeof comp !== 'function') {
	    handler.component = null;
	    warn('invalid component for route "' + path + '".');
	  }
	}
	
	/* Installation */
	
	Router.installed = false;
	
	/**
	 * Installation interface.
	 * Install the necessary directives.
	 */
	
	Router.install = function (externalVue) {
	  /* istanbul ignore if */
	  if (Router.installed) {
	    warn('already installed.');
	    return;
	  }
	  Vue = externalVue;
	  applyOverride(Vue);
	  View(Vue);
	  Link(Vue);
	  exports$1.Vue = Vue;
	  Router.installed = true;
	};
	
	// auto install
	/* istanbul ignore if */
	if (typeof window !== 'undefined' && window.Vue) {
	  window.Vue.use(Router);
	}
	
	module.exports = Router;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(10)
	__vue_script__ = __webpack_require__(14)
	__vue_template__ = __webpack_require__(15)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/johannes/git/raycing/cordova/www/src/vues/svgMenu.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7a6285f5&file=svgMenu.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./svgMenu.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-7a6285f5&file=svgMenu.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./svgMenu.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, "\n  .titleText {\n    position: absolute;\n    top: 30%;\n    width: 100%;\n    text-align: center;\n    font-size: 10vh;\n    -webkit-transition: opacity 2s;\n    transition: opacity 2s;\n    visibility: hidden;\n  }\n\n  .titleText.show {\n    visibility: visible;\n  }\n\n  .menuClickZone {\n    position: absolute;\n    width: 30vw;\n    -webkit-transition: -webkit-transform 0.5s;\n    transition: -webkit-transform 0.5s;\n    transition: transform 0.5s;\n    transition: transform 0.5s, -webkit-transform 0.5s;\n    -webkit-transform-origin: top left;\n            transform-origin: top left;\n  }\n\n  .menuClickZone-topLeft{\n    top: -10px;\n    left: -10px;\n  }\n\n  .menuClickZone-topLeft.menuClickZone-small {\n    -webkit-transform: scale(0.5);\n            transform: scale(0.5);\n  }\n\n  .menuClickZone-topRight{\n    top: -10px;\n    right: -10px;\n  }\n\n  /*\n   * This has to be \"!important\" to override the style declaration on the menuClickZone-topRight\n   * element. That in turn has to be there in order for the rotation of the element not to be\n   * animated on page load.\n  **/\n  .menuClickZone-topRight.menuClickZone-small {\n    -webkit-transform: rotate(0.25turn) translate(0, -100%) scale(0.5)!important;\n            transform: rotate(0.25turn) translate(0, -100%) scale(0.5)!important;\n  }\n\n  .menuClickZone .icon {\n    opacity: 0.1;\n    color: white;\n  }\n\n  .menuClickZone-enabled .icon{\n    opacity: 1;\n  }\n\n  .menuClickZone-enabled .icon:hover{\n    cursor: pointer;\n    color: gray;\n  }\n\n  .menuBottom {\n    position: absolute;\n    top: 75vh;\n    width: 100%;\n    text-align: center;\n    color: white;\n    -webkit-transition: -webkit-transform 0.5s;\n    transition: -webkit-transform 0.5s;\n    transition: transform 0.5s;\n    transition: transform 0.5s, -webkit-transform 0.5s;\n  }\n\n  .menuBottom-hidden {\n    -webkit-transform: translate(0, 25vh);\n            transform: translate(0, 25vh);\n  }\n\n  .menuBottom-small {\n    -webkit-transform: translate(0, 10vh);\n            transform: translate(0, 10vh);\n  }\n\n  .menuBottom-big {\n    -webkit-transform: translate(0, -55vh);\n            transform: translate(0, -55vh);\n  }\n\n  .menuBottom > * {\n    position: absolute;\n    top: 0;\n    left: 25%;\n    width: 50%;\n  }\n\n  .menuElement{\n    position: absolute;\n    fill: rgba(0, 128, 128, 0.2);\n    stroke: white;\n    stroke-width: 2;\n    vector-effect: non-scaling-stroke;\n  }\n\n  .icon path{\n    vector-effect: non-scaling-stroke;\n    fill: currentColor;\n  }\n\n  .icon-top{\n    position: absolute;\n    left: 10%;\n    top: 10%;\n    width: 20%;\n  }\n\n  .svgMenu {\n    pointer-events: none;\n  }\n\n  .svgMenu > * {\n    pointer-events: auto;\n  }\n", "", {"version":3,"sources":["/./cordova/www/src/vues/svgMenu.vue.style"],"names":[],"mappings":";EAqFA;IACA,mBAAA;IACA,SAAA;IACA,YAAA;IACA,mBAAA;IACA,gBAAA;IACA,+BAAA;IAAA,uBAAA;IACA,mBAAA;GACA;;EAEA;IACA,oBAAA;GACA;;EAEA;IACA,mBAAA;IACA,YAAA;IACA,2CAAA;IAAA,mCAAA;IAAA,2BAAA;IAAA,mDAAA;IACA,mCAAA;YAAA,2BAAA;GACA;;EAEA;IACA,WAAA;IACA,YAAA;GACA;;EAEA;IACA,8BAAA;YAAA,sBAAA;GACA;;EAEA;IACA,WAAA;IACA,aAAA;GACA;;EAEA;;;;KAIA;EACA;IACA,6EAAA;YAAA,qEAAA;GACA;;EAEA;IACA,aAAA;IACA,aAAA;GACA;;EAEA;IACA,WAAA;GACA;;EAEA;IACA,gBAAA;IACA,YAAA;GACA;;EAEA;IACA,mBAAA;IACA,UAAA;IACA,YAAA;IACA,mBAAA;IACA,aAAA;IACA,2CAAA;IAAA,mCAAA;IAAA,2BAAA;IAAA,mDAAA;GACA;;EAEA;IACA,sCAAA;YAAA,8BAAA;GACA;;EAEA;IACA,sCAAA;YAAA,8BAAA;GACA;;EAEA;IACA,uCAAA;YAAA,+BAAA;GACA;;EAEA;IACA,mBAAA;IACA,OAAA;IACA,UAAA;IACA,WAAA;GACA;;EAEA;IACA,mBAAA;IACA,6BAAA;IACA,cAAA;IACA,gBAAA;IACA,kCAAA;GACA;;EAEA;IACA,kCAAA;IACA,mBAAA;GACA;;EAEA;IACA,mBAAA;IACA,UAAA;IACA,SAAA;IACA,WAAA;GACA;;EAEA;IACA,qBAAA;GACA;;EAEA;IACA,qBAAA;GACA","file":"svgMenu.vue","sourcesContent":["<template>\n  <div>\n    <div class=\"titleText\" :class=\"{ 'show': showTitle }\" :style=\"{ 'opacity': showTitle ? 1 : 0 }\">Raycing</div>\n\n    <div class=\"svgMenu menuBottom\"\n        :class=\"{\n          'menuBottom-big': menu === 'big',\n          'menuBottom-small': menu === 'small',\n          'menuBottom-hidden': menu === 'none'\n        }\">\n      <svg viewbox=\"0 0 400 400\">\n        <path class=\"menuElement\" d=\"\n          M0 800\n          L0 200\n          C0 10 10 0 200 0\n          C390 0 400 10 400 200\n          L400 800\n          Z\n          \" />\n      </svg>\n      <slot name=\"menuBottom\"></slot>\n    </div>\n\n    <div v-on:click=\"back\" :class=\"{ 'menuClickZone-enabled': backIsEnabled(), 'menuClickZone-small': smallButtons }\" class=\"svgMenu menuClickZone menuClickZone-topLeft\">\n      <svg viewbox=\"0 0 400 400\">\n        <path class=\"menuElement\" d=\"\n          M0 0\n          L300 0\n          C320 0 320 50 250 75\n          C180 100 140 140 140 140\n          C100 180 100 180 75 250\n          C50 320 0 320 0 300 Z\n          \" />\n      </svg>\n      <svg class=\"icon icon-top\" viewbox=\"0 0 200 300\">\n        <path d=\"\n                 M60 0\n                 l-60 150 l60 150 h20\n                 l-60 -150 l60 -150 h-20\n                 m60 0\n                 l-60 150 l40 100 h20\n                 l-40 -100 l60 -150 h-20\n                 m60 0\n                 l-60 150 l20 50 h20\n                 l-20 -50 l60 -150 h-20\n                 \"/>\n      </svg>\n    </div>\n\n    <div v-link=\"{ path: '/settings' }\" :class=\"{ 'menuClickZone-small': smallButtons }\" class=\"svgMenu menuClickZone menuClickZone-topRight menuClickZone-enabled\" style=\"transform: rotate(0.25turn) translate(0, -100%);\">\n      <svg viewbox=\"0 0 400 400\">\n        <path class=\"menuElement\" d=\"\n          M0 0\n          L300 0\n          C320 0 320 50 250 75\n          C180 100 140 140 140 140\n          C100 180 100 180 75 250\n          C50 320 0 320 0 300 Z\n          \" />\n      </svg>\n\n      <svg class=\"icon icon-top\" viewbox=\"0 0 44 44\">\n        <path d=\"M44,24.707v-5.5l-6.574-2.738c-0.184-0.516-0.377-1.015-0.613-1.505l2.656-6.606l-3.891-3.889l-6.549,2.696   c-0.498-0.242-1.008-0.445-1.535-0.634L24.707,0h-5.5l-2.718,6.509c-0.548,0.194-1.075,0.397-1.595,0.646L8.357,4.528L4.469,8.416   l2.665,6.478c-0.259,0.532-0.467,1.074-0.667,1.633L0,19.293v5.5l6.472,2.697c0.199,0.559,0.413,1.1,0.67,1.633l-2.615,6.52   l3.888,3.889l6.494-2.676c0.522,0.248,1.054,0.447,1.601,0.635L19.293,44h5.5l2.721-6.543c0.523-0.193,1.039-0.396,1.533-0.633   l6.596,2.643l3.889-3.889l-2.709-6.562c0.232-0.494,0.418-0.994,0.602-1.504L44,24.707z M21.957,31.583   c-5.289,0-9.582-4.292-9.582-9.583s4.293-9.583,9.582-9.583c5.292,0,9.583,4.293,9.583,9.583S27.248,31.583,21.957,31.583z\"/>\n      </svg>\n    </div>\n  </div>\n</template>\n\n<script lang=\"babel\">\n  export default {\n    props: [ 'menu', 'smallButtons', 'showTitle'],\n    methods: {\n      backIsEnabled() {\n        return this.$route.path !== '/'\n      },\n      back() {\n        if(this.backIsEnabled()) {\n          history.back();\n        }\n      }\n    }\n  }\n</script>\n\n<style>\n  .titleText {\n    position: absolute;\n    top: 30%;\n    width: 100%;\n    text-align: center;\n    font-size: 10vh;\n    transition: opacity 2s;\n    visibility: hidden;\n  }\n\n  .titleText.show {\n    visibility: visible;\n  }\n\n  .menuClickZone {\n    position: absolute;\n    width: 30vw;\n    transition: transform 0.5s;\n    transform-origin: top left;\n  }\n\n  .menuClickZone-topLeft{\n    top: -10px;\n    left: -10px;\n  }\n\n  .menuClickZone-topLeft.menuClickZone-small {\n    transform: scale(0.5);\n  }\n\n  .menuClickZone-topRight{\n    top: -10px;\n    right: -10px;\n  }\n\n  /*\n   * This has to be \"!important\" to override the style declaration on the menuClickZone-topRight\n   * element. That in turn has to be there in order for the rotation of the element not to be\n   * animated on page load.\n  **/\n  .menuClickZone-topRight.menuClickZone-small {\n    transform: rotate(0.25turn) translate(0, -100%) scale(0.5)!important;\n  }\n\n  .menuClickZone .icon {\n    opacity: 0.1;\n    color: white;\n  }\n\n  .menuClickZone-enabled .icon{\n    opacity: 1;\n  }\n\n  .menuClickZone-enabled .icon:hover{\n    cursor: pointer;\n    color: gray;\n  }\n\n  .menuBottom {\n    position: absolute;\n    top: 75vh;\n    width: 100%;\n    text-align: center;\n    color: white;\n    transition: transform 0.5s;\n  }\n\n  .menuBottom-hidden {\n    transform: translate(0, 25vh);\n  }\n\n  .menuBottom-small {\n    transform: translate(0, 10vh);\n  }\n\n  .menuBottom-big {\n    transform: translate(0, -55vh);\n  }\n\n  .menuBottom > * {\n    position: absolute;\n    top: 0;\n    left: 25%;\n    width: 50%;\n  }\n\n  .menuElement{\n    position: absolute;\n    fill: rgba(0, 128, 128, 0.2);\n    stroke: white;\n    stroke-width: 2;\n    vector-effect: non-scaling-stroke;\n  }\n\n  .icon path{\n    vector-effect: non-scaling-stroke;\n    fill: currentColor;\n  }\n\n  .icon-top{\n    position: absolute;\n    left: 10%;\n    top: 10%;\n    width: 20%;\n  }\n\n  .svgMenu {\n    pointer-events: none;\n  }\n\n  .svgMenu > * {\n    pointer-events: auto;\n  }\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 12 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div>
	//     <div class="titleText" :class="{ 'show': showTitle }" :style="{ 'opacity': showTitle ? 1 : 0 }">Raycing</div>
	
	//     <div class="svgMenu menuBottom"
	//         :class="{
	//           'menuBottom-big': menu === 'big',
	//           'menuBottom-small': menu === 'small',
	//           'menuBottom-hidden': menu === 'none'
	//         }">
	//       <svg viewbox="0 0 400 400">
	//         <path class="menuElement" d="
	//           M0 800
	//           L0 200
	//           C0 10 10 0 200 0
	//           C390 0 400 10 400 200
	//           L400 800
	//           Z
	//           " />
	//       </svg>
	//       <slot name="menuBottom"></slot>
	//     </div>
	
	//     <div v-on:click="back" :class="{ 'menuClickZone-enabled': backIsEnabled(), 'menuClickZone-small': smallButtons }" class="svgMenu menuClickZone menuClickZone-topLeft">
	//       <svg viewbox="0 0 400 400">
	//         <path class="menuElement" d="
	//           M0 0
	//           L300 0
	//           C320 0 320 50 250 75
	//           C180 100 140 140 140 140
	//           C100 180 100 180 75 250
	//           C50 320 0 320 0 300 Z
	//           " />
	//       </svg>
	//       <svg class="icon icon-top" viewbox="0 0 200 300">
	//         <path d="
	//                  M60 0
	//                  l-60 150 l60 150 h20
	//                  l-60 -150 l60 -150 h-20
	//                  m60 0
	//                  l-60 150 l40 100 h20
	//                  l-40 -100 l60 -150 h-20
	//                  m60 0
	//                  l-60 150 l20 50 h20
	//                  l-20 -50 l60 -150 h-20
	//                  "/>
	//       </svg>
	//     </div>
	
	//     <div v-link="{ path: '/settings' }" :class="{ 'menuClickZone-small': smallButtons }" class="svgMenu menuClickZone menuClickZone-topRight menuClickZone-enabled" style="transform: rotate(0.25turn) translate(0, -100%);">
	//       <svg viewbox="0 0 400 400">
	//         <path class="menuElement" d="
	//           M0 0
	//           L300 0
	//           C320 0 320 50 250 75
	//           C180 100 140 140 140 140
	//           C100 180 100 180 75 250
	//           C50 320 0 320 0 300 Z
	//           " />
	//       </svg>
	
	//       <svg class="icon icon-top" viewbox="0 0 44 44">
	//         <path d="M44,24.707v-5.5l-6.574-2.738c-0.184-0.516-0.377-1.015-0.613-1.505l2.656-6.606l-3.891-3.889l-6.549,2.696   c-0.498-0.242-1.008-0.445-1.535-0.634L24.707,0h-5.5l-2.718,6.509c-0.548,0.194-1.075,0.397-1.595,0.646L8.357,4.528L4.469,8.416   l2.665,6.478c-0.259,0.532-0.467,1.074-0.667,1.633L0,19.293v5.5l6.472,2.697c0.199,0.559,0.413,1.1,0.67,1.633l-2.615,6.52   l3.888,3.889l6.494-2.676c0.522,0.248,1.054,0.447,1.601,0.635L19.293,44h5.5l2.721-6.543c0.523-0.193,1.039-0.396,1.533-0.633   l6.596,2.643l3.889-3.889l-2.709-6.562c0.232-0.494,0.418-0.994,0.602-1.504L44,24.707z M21.957,31.583   c-5.289,0-9.582-4.292-9.582-9.583s4.293-9.583,9.582-9.583c5.292,0,9.583,4.293,9.583,9.583S27.248,31.583,21.957,31.583z"/>
	//       </svg>
	//     </div>
	//   </div>
	// </template>
	
	// <script lang="babel">
	exports.default = {
	  props: ['menu', 'smallButtons', 'showTitle'],
	  methods: {
	    backIsEnabled: function backIsEnabled() {
	      return this.$route.path !== '/';
	    },
	    back: function back() {
	      if (this.backIsEnabled()) {
	        history.back();
	      }
	    }
	  }
	};
	// </script>

	// <style>
	//   .titleText {
	//     position: absolute;
	//     top: 30%;
	//     width: 100%;
	//     text-align: center;
	//     font-size: 10vh;
	//     transition: opacity 2s;
	//     visibility: hidden;
	//   }

	//   .titleText.show {
	//     visibility: visible;
	//   }

	//   .menuClickZone {
	//     position: absolute;
	//     width: 30vw;
	//     transition: transform 0.5s;
	//     transform-origin: top left;
	//   }

	//   .menuClickZone-topLeft{
	//     top: -10px;
	//     left: -10px;
	//   }

	//   .menuClickZone-topLeft.menuClickZone-small {
	//     transform: scale(0.5);
	//   }

	//   .menuClickZone-topRight{
	//     top: -10px;
	//     right: -10px;
	//   }

	//   /*
	//    * This has to be "!important" to override the style declaration on the menuClickZone-topRight
	//    * element. That in turn has to be there in order for the rotation of the element not to be
	//    * animated on page load.
	//   **/
	//   .menuClickZone-topRight.menuClickZone-small {
	//     transform: rotate(0.25turn) translate(0, -100%) scale(0.5)!important;
	//   }

	//   .menuClickZone .icon {
	//     opacity: 0.1;
	//     color: white;
	//   }

	//   .menuClickZone-enabled .icon{
	//     opacity: 1;
	//   }

	//   .menuClickZone-enabled .icon:hover{
	//     cursor: pointer;
	//     color: gray;
	//   }

	//   .menuBottom {
	//     position: absolute;
	//     top: 75vh;
	//     width: 100%;
	//     text-align: center;
	//     color: white;
	//     transition: transform 0.5s;
	//   }

	//   .menuBottom-hidden {
	//     transform: translate(0, 25vh);
	//   }

	//   .menuBottom-small {
	//     transform: translate(0, 10vh);
	//   }

	//   .menuBottom-big {
	//     transform: translate(0, -55vh);
	//   }

	//   .menuBottom > * {
	//     position: absolute;
	//     top: 0;
	//     left: 25%;
	//     width: 50%;
	//   }

	//   .menuElement{
	//     position: absolute;
	//     fill: rgba(0, 128, 128, 0.2);
	//     stroke: white;
	//     stroke-width: 2;
	//     vector-effect: non-scaling-stroke;
	//   }

	//   .icon path{
	//     vector-effect: non-scaling-stroke;
	//     fill: currentColor;
	//   }

	//   .icon-top{
	//     position: absolute;
	//     left: 10%;
	//     top: 10%;
	//     width: 20%;
	//   }

	//   .svgMenu {
	//     pointer-events: none;
	//   }

	//   .svgMenu > * {
	//     pointer-events: auto;
	//   }
	// </style>

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = "\n  <div>\n    <div class=\"titleText\" :class=\"{ 'show': showTitle }\" :style=\"{ 'opacity': showTitle ? 1 : 0 }\">Raycing</div>\n\n    <div class=\"svgMenu menuBottom\"\n        :class=\"{\n          'menuBottom-big': menu === 'big',\n          'menuBottom-small': menu === 'small',\n          'menuBottom-hidden': menu === 'none'\n        }\">\n      <svg viewbox=\"0 0 400 400\">\n        <path class=\"menuElement\" d=\"\n          M0 800\n          L0 200\n          C0 10 10 0 200 0\n          C390 0 400 10 400 200\n          L400 800\n          Z\n          \" />\n      </svg>\n      <slot name=\"menuBottom\"></slot>\n    </div>\n\n    <div v-on:click=\"back\" :class=\"{ 'menuClickZone-enabled': backIsEnabled(), 'menuClickZone-small': smallButtons }\" class=\"svgMenu menuClickZone menuClickZone-topLeft\">\n      <svg viewbox=\"0 0 400 400\">\n        <path class=\"menuElement\" d=\"\n          M0 0\n          L300 0\n          C320 0 320 50 250 75\n          C180 100 140 140 140 140\n          C100 180 100 180 75 250\n          C50 320 0 320 0 300 Z\n          \" />\n      </svg>\n      <svg class=\"icon icon-top\" viewbox=\"0 0 200 300\">\n        <path d=\"\n                 M60 0\n                 l-60 150 l60 150 h20\n                 l-60 -150 l60 -150 h-20\n                 m60 0\n                 l-60 150 l40 100 h20\n                 l-40 -100 l60 -150 h-20\n                 m60 0\n                 l-60 150 l20 50 h20\n                 l-20 -50 l60 -150 h-20\n                 \"/>\n      </svg>\n    </div>\n\n    <div v-link=\"{ path: '/settings' }\" :class=\"{ 'menuClickZone-small': smallButtons }\" class=\"svgMenu menuClickZone menuClickZone-topRight menuClickZone-enabled\" style=\"transform: rotate(0.25turn) translate(0, -100%);\">\n      <svg viewbox=\"0 0 400 400\">\n        <path class=\"menuElement\" d=\"\n          M0 0\n          L300 0\n          C320 0 320 50 250 75\n          C180 100 140 140 140 140\n          C100 180 100 180 75 250\n          C50 320 0 320 0 300 Z\n          \" />\n      </svg>\n\n      <svg class=\"icon icon-top\" viewbox=\"0 0 44 44\">\n        <path d=\"M44,24.707v-5.5l-6.574-2.738c-0.184-0.516-0.377-1.015-0.613-1.505l2.656-6.606l-3.891-3.889l-6.549,2.696   c-0.498-0.242-1.008-0.445-1.535-0.634L24.707,0h-5.5l-2.718,6.509c-0.548,0.194-1.075,0.397-1.595,0.646L8.357,4.528L4.469,8.416   l2.665,6.478c-0.259,0.532-0.467,1.074-0.667,1.633L0,19.293v5.5l6.472,2.697c0.199,0.559,0.413,1.1,0.67,1.633l-2.615,6.52   l3.888,3.889l6.494-2.676c0.522,0.248,1.054,0.447,1.601,0.635L19.293,44h5.5l2.721-6.543c0.523-0.193,1.039-0.396,1.533-0.633   l6.596,2.643l3.889-3.889l-2.709-6.562c0.232-0.494,0.418-0.994,0.602-1.504L44,24.707z M21.957,31.583   c-5.289,0-9.582-4.292-9.582-9.583s4.293-9.583,9.582-9.583c5.292,0,9.583,4.293,9.583,9.583S27.248,31.583,21.957,31.583z\"/>\n      </svg>\n    </div>\n  </div>\n";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;;(function () {
		'use strict';
	
		/**
		 * @preserve FastClick: polyfill to remove click delays on browsers with touch UIs.
		 *
		 * @codingstandard ftlabs-jsv2
		 * @copyright The Financial Times Limited [All Rights Reserved]
		 * @license MIT License (see LICENSE.txt)
		 */
	
		/*jslint browser:true, node:true*/
		/*global define, Event, Node*/
	
	
		/**
		 * Instantiate fast-clicking listeners on the specified layer.
		 *
		 * @constructor
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		function FastClick(layer, options) {
			var oldOnClick;
	
			options = options || {};
	
			/**
			 * Whether a click is currently being tracked.
			 *
			 * @type boolean
			 */
			this.trackingClick = false;
	
	
			/**
			 * Timestamp for when click tracking started.
			 *
			 * @type number
			 */
			this.trackingClickStart = 0;
	
	
			/**
			 * The element being tracked for a click.
			 *
			 * @type EventTarget
			 */
			this.targetElement = null;
	
	
			/**
			 * X-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartX = 0;
	
	
			/**
			 * Y-coordinate of touch start event.
			 *
			 * @type number
			 */
			this.touchStartY = 0;
	
	
			/**
			 * ID of the last touch, retrieved from Touch.identifier.
			 *
			 * @type number
			 */
			this.lastTouchIdentifier = 0;
	
	
			/**
			 * Touchmove boundary, beyond which a click will be cancelled.
			 *
			 * @type number
			 */
			this.touchBoundary = options.touchBoundary || 10;
	
	
			/**
			 * The FastClick layer.
			 *
			 * @type Element
			 */
			this.layer = layer;
	
			/**
			 * The minimum time between tap(touchstart and touchend) events
			 *
			 * @type number
			 */
			this.tapDelay = options.tapDelay || 200;
	
			/**
			 * The maximum time for a tap
			 *
			 * @type number
			 */
			this.tapTimeout = options.tapTimeout || 700;
	
			if (FastClick.notNeeded(layer)) {
				return;
			}
	
			// Some old versions of Android don't have Function.prototype.bind
			function bind(method, context) {
				return function() { return method.apply(context, arguments); };
			}
	
	
			var methods = ['onMouse', 'onClick', 'onTouchStart', 'onTouchMove', 'onTouchEnd', 'onTouchCancel'];
			var context = this;
			for (var i = 0, l = methods.length; i < l; i++) {
				context[methods[i]] = bind(context[methods[i]], context);
			}
	
			// Set up event handlers as required
			if (deviceIsAndroid) {
				layer.addEventListener('mouseover', this.onMouse, true);
				layer.addEventListener('mousedown', this.onMouse, true);
				layer.addEventListener('mouseup', this.onMouse, true);
			}
	
			layer.addEventListener('click', this.onClick, true);
			layer.addEventListener('touchstart', this.onTouchStart, false);
			layer.addEventListener('touchmove', this.onTouchMove, false);
			layer.addEventListener('touchend', this.onTouchEnd, false);
			layer.addEventListener('touchcancel', this.onTouchCancel, false);
	
			// Hack is required for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
			// which is how FastClick normally stops click events bubbling to callbacks registered on the FastClick
			// layer when they are cancelled.
			if (!Event.prototype.stopImmediatePropagation) {
				layer.removeEventListener = function(type, callback, capture) {
					var rmv = Node.prototype.removeEventListener;
					if (type === 'click') {
						rmv.call(layer, type, callback.hijacked || callback, capture);
					} else {
						rmv.call(layer, type, callback, capture);
					}
				};
	
				layer.addEventListener = function(type, callback, capture) {
					var adv = Node.prototype.addEventListener;
					if (type === 'click') {
						adv.call(layer, type, callback.hijacked || (callback.hijacked = function(event) {
							if (!event.propagationStopped) {
								callback(event);
							}
						}), capture);
					} else {
						adv.call(layer, type, callback, capture);
					}
				};
			}
	
			// If a handler is already declared in the element's onclick attribute, it will be fired before
			// FastClick's onClick handler. Fix this by pulling out the user-defined handler function and
			// adding it as listener.
			if (typeof layer.onclick === 'function') {
	
				// Android browser on at least 3.2 requires a new reference to the function in layer.onclick
				// - the old one won't work if passed to addEventListener directly.
				oldOnClick = layer.onclick;
				layer.addEventListener('click', function(event) {
					oldOnClick(event);
				}, false);
				layer.onclick = null;
			}
		}
	
		/**
		* Windows Phone 8.1 fakes user agent string to look like Android and iPhone.
		*
		* @type boolean
		*/
		var deviceIsWindowsPhone = navigator.userAgent.indexOf("Windows Phone") >= 0;
	
		/**
		 * Android requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsAndroid = navigator.userAgent.indexOf('Android') > 0 && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent) && !deviceIsWindowsPhone;
	
	
		/**
		 * iOS 4 requires an exception for select elements.
		 *
		 * @type boolean
		 */
		var deviceIsIOS4 = deviceIsIOS && (/OS 4_\d(_\d)?/).test(navigator.userAgent);
	
	
		/**
		 * iOS 6.0-7.* requires the target element to be manually derived
		 *
		 * @type boolean
		 */
		var deviceIsIOSWithBadTarget = deviceIsIOS && (/OS [6-7]_\d/).test(navigator.userAgent);
	
		/**
		 * BlackBerry requires exceptions.
		 *
		 * @type boolean
		 */
		var deviceIsBlackBerry10 = navigator.userAgent.indexOf('BB10') > 0;
	
		/**
		 * Determine whether a given element requires a native click.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element needs a native click
		 */
		FastClick.prototype.needsClick = function(target) {
			switch (target.nodeName.toLowerCase()) {
	
			// Don't send a synthetic click to disabled inputs (issue #62)
			case 'button':
			case 'select':
			case 'textarea':
				if (target.disabled) {
					return true;
				}
	
				break;
			case 'input':
	
				// File inputs need real clicks on iOS 6 due to a browser bug (issue #68)
				if ((deviceIsIOS && target.type === 'file') || target.disabled) {
					return true;
				}
	
				break;
			case 'label':
			case 'iframe': // iOS8 homescreen apps can prevent events bubbling into frames
			case 'video':
				return true;
			}
	
			return (/\bneedsclick\b/).test(target.className);
		};
	
	
		/**
		 * Determine whether a given element requires a call to focus to simulate click into element.
		 *
		 * @param {EventTarget|Element} target Target DOM element
		 * @returns {boolean} Returns true if the element requires a call to focus to simulate native click.
		 */
		FastClick.prototype.needsFocus = function(target) {
			switch (target.nodeName.toLowerCase()) {
			case 'textarea':
				return true;
			case 'select':
				return !deviceIsAndroid;
			case 'input':
				switch (target.type) {
				case 'button':
				case 'checkbox':
				case 'file':
				case 'image':
				case 'radio':
				case 'submit':
					return false;
				}
	
				// No point in attempting to focus disabled inputs
				return !target.disabled && !target.readOnly;
			default:
				return (/\bneedsfocus\b/).test(target.className);
			}
		};
	
	
		/**
		 * Send a click event to the specified element.
		 *
		 * @param {EventTarget|Element} targetElement
		 * @param {Event} event
		 */
		FastClick.prototype.sendClick = function(targetElement, event) {
			var clickEvent, touch;
	
			// On some Android devices activeElement needs to be blurred otherwise the synthetic click will have no effect (#24)
			if (document.activeElement && document.activeElement !== targetElement) {
				document.activeElement.blur();
			}
	
			touch = event.changedTouches[0];
	
			// Synthesise a click event, with an extra attribute so it can be tracked
			clickEvent = document.createEvent('MouseEvents');
			clickEvent.initMouseEvent(this.determineEventType(targetElement), true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
			clickEvent.forwardedTouchEvent = true;
			targetElement.dispatchEvent(clickEvent);
		};
	
		FastClick.prototype.determineEventType = function(targetElement) {
	
			//Issue #159: Android Chrome Select Box does not open with a synthetic click event
			if (deviceIsAndroid && targetElement.tagName.toLowerCase() === 'select') {
				return 'mousedown';
			}
	
			return 'click';
		};
	
	
		/**
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.focus = function(targetElement) {
			var length;
	
			// Issue #160: on iOS 7, some input elements (e.g. date datetime month) throw a vague TypeError on setSelectionRange. These elements don't have an integer value for the selectionStart and selectionEnd properties, but unfortunately that can't be used for detection because accessing the properties also throws a TypeError. Just check the type instead. Filed as Apple bug #15122724.
			if (deviceIsIOS && targetElement.setSelectionRange && targetElement.type.indexOf('date') !== 0 && targetElement.type !== 'time' && targetElement.type !== 'month') {
				length = targetElement.value.length;
				targetElement.setSelectionRange(length, length);
			} else {
				targetElement.focus();
			}
		};
	
	
		/**
		 * Check whether the given target element is a child of a scrollable layer and if so, set a flag on it.
		 *
		 * @param {EventTarget|Element} targetElement
		 */
		FastClick.prototype.updateScrollParent = function(targetElement) {
			var scrollParent, parentElement;
	
			scrollParent = targetElement.fastClickScrollParent;
	
			// Attempt to discover whether the target element is contained within a scrollable layer. Re-check if the
			// target element was moved to another parent.
			if (!scrollParent || !scrollParent.contains(targetElement)) {
				parentElement = targetElement;
				do {
					if (parentElement.scrollHeight > parentElement.offsetHeight) {
						scrollParent = parentElement;
						targetElement.fastClickScrollParent = parentElement;
						break;
					}
	
					parentElement = parentElement.parentElement;
				} while (parentElement);
			}
	
			// Always update the scroll top tracker if possible.
			if (scrollParent) {
				scrollParent.fastClickLastScrollTop = scrollParent.scrollTop;
			}
		};
	
	
		/**
		 * @param {EventTarget} targetElement
		 * @returns {Element|EventTarget}
		 */
		FastClick.prototype.getTargetElementFromEventTarget = function(eventTarget) {
	
			// On some older browsers (notably Safari on iOS 4.1 - see issue #56) the event target may be a text node.
			if (eventTarget.nodeType === Node.TEXT_NODE) {
				return eventTarget.parentNode;
			}
	
			return eventTarget;
		};
	
	
		/**
		 * On touch start, record the position and scroll offset.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchStart = function(event) {
			var targetElement, touch, selection;
	
			// Ignore multiple touches, otherwise pinch-to-zoom is prevented if both fingers are on the FastClick element (issue #111).
			if (event.targetTouches.length > 1) {
				return true;
			}
	
			targetElement = this.getTargetElementFromEventTarget(event.target);
			touch = event.targetTouches[0];
	
			if (deviceIsIOS) {
	
				// Only trusted events will deselect text on iOS (issue #49)
				selection = window.getSelection();
				if (selection.rangeCount && !selection.isCollapsed) {
					return true;
				}
	
				if (!deviceIsIOS4) {
	
					// Weird things happen on iOS when an alert or confirm dialog is opened from a click event callback (issue #23):
					// when the user next taps anywhere else on the page, new touchstart and touchend events are dispatched
					// with the same identifier as the touch event that previously triggered the click that triggered the alert.
					// Sadly, there is an issue on iOS 4 that causes some normal touch events to have the same identifier as an
					// immediately preceeding touch event (issue #52), so this fix is unavailable on that platform.
					// Issue 120: touch.identifier is 0 when Chrome dev tools 'Emulate touch events' is set with an iOS device UA string,
					// which causes all touch events to be ignored. As this block only applies to iOS, and iOS identifiers are always long,
					// random integers, it's safe to to continue if the identifier is 0 here.
					if (touch.identifier && touch.identifier === this.lastTouchIdentifier) {
						event.preventDefault();
						return false;
					}
	
					this.lastTouchIdentifier = touch.identifier;
	
					// If the target element is a child of a scrollable layer (using -webkit-overflow-scrolling: touch) and:
					// 1) the user does a fling scroll on the scrollable layer
					// 2) the user stops the fling scroll with another tap
					// then the event.target of the last 'touchend' event will be the element that was under the user's finger
					// when the fling scroll was started, causing FastClick to send a click event to that layer - unless a check
					// is made to ensure that a parent layer was not scrolled before sending a synthetic click (issue #42).
					this.updateScrollParent(targetElement);
				}
			}
	
			this.trackingClick = true;
			this.trackingClickStart = event.timeStamp;
			this.targetElement = targetElement;
	
			this.touchStartX = touch.pageX;
			this.touchStartY = touch.pageY;
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				event.preventDefault();
			}
	
			return true;
		};
	
	
		/**
		 * Based on a touchmove event object, check whether the touch has moved past a boundary since it started.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.touchHasMoved = function(event) {
			var touch = event.changedTouches[0], boundary = this.touchBoundary;
	
			if (Math.abs(touch.pageX - this.touchStartX) > boundary || Math.abs(touch.pageY - this.touchStartY) > boundary) {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Update the last position.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchMove = function(event) {
			if (!this.trackingClick) {
				return true;
			}
	
			// If the touch has moved, cancel the click tracking
			if (this.targetElement !== this.getTargetElementFromEventTarget(event.target) || this.touchHasMoved(event)) {
				this.trackingClick = false;
				this.targetElement = null;
			}
	
			return true;
		};
	
	
		/**
		 * Attempt to find the labelled control for the given label element.
		 *
		 * @param {EventTarget|HTMLLabelElement} labelElement
		 * @returns {Element|null}
		 */
		FastClick.prototype.findControl = function(labelElement) {
	
			// Fast path for newer browsers supporting the HTML5 control attribute
			if (labelElement.control !== undefined) {
				return labelElement.control;
			}
	
			// All browsers under test that support touch events also support the HTML5 htmlFor attribute
			if (labelElement.htmlFor) {
				return document.getElementById(labelElement.htmlFor);
			}
	
			// If no for attribute exists, attempt to retrieve the first labellable descendant element
			// the list of which is defined here: http://www.w3.org/TR/html5/forms.html#category-label
			return labelElement.querySelector('button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea');
		};
	
	
		/**
		 * On touch end, determine whether to send a click event at once.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onTouchEnd = function(event) {
			var forElement, trackingClickStart, targetTagName, scrollParent, touch, targetElement = this.targetElement;
	
			if (!this.trackingClick) {
				return true;
			}
	
			// Prevent phantom clicks on fast double-tap (issue #36)
			if ((event.timeStamp - this.lastClickTime) < this.tapDelay) {
				this.cancelNextClick = true;
				return true;
			}
	
			if ((event.timeStamp - this.trackingClickStart) > this.tapTimeout) {
				return true;
			}
	
			// Reset to prevent wrong click cancel on input (issue #156).
			this.cancelNextClick = false;
	
			this.lastClickTime = event.timeStamp;
	
			trackingClickStart = this.trackingClickStart;
			this.trackingClick = false;
			this.trackingClickStart = 0;
	
			// On some iOS devices, the targetElement supplied with the event is invalid if the layer
			// is performing a transition or scroll, and has to be re-detected manually. Note that
			// for this to function correctly, it must be called *after* the event target is checked!
			// See issue #57; also filed as rdar://13048589 .
			if (deviceIsIOSWithBadTarget) {
				touch = event.changedTouches[0];
	
				// In certain cases arguments of elementFromPoint can be negative, so prevent setting targetElement to null
				targetElement = document.elementFromPoint(touch.pageX - window.pageXOffset, touch.pageY - window.pageYOffset) || targetElement;
				targetElement.fastClickScrollParent = this.targetElement.fastClickScrollParent;
			}
	
			targetTagName = targetElement.tagName.toLowerCase();
			if (targetTagName === 'label') {
				forElement = this.findControl(targetElement);
				if (forElement) {
					this.focus(targetElement);
					if (deviceIsAndroid) {
						return false;
					}
	
					targetElement = forElement;
				}
			} else if (this.needsFocus(targetElement)) {
	
				// Case 1: If the touch started a while ago (best guess is 100ms based on tests for issue #36) then focus will be triggered anyway. Return early and unset the target element reference so that the subsequent click will be allowed through.
				// Case 2: Without this exception for input elements tapped when the document is contained in an iframe, then any inputted text won't be visible even though the value attribute is updated as the user types (issue #37).
				if ((event.timeStamp - trackingClickStart) > 100 || (deviceIsIOS && window.top !== window && targetTagName === 'input')) {
					this.targetElement = null;
					return false;
				}
	
				this.focus(targetElement);
				this.sendClick(targetElement, event);
	
				// Select elements need the event to go through on iOS 4, otherwise the selector menu won't open.
				// Also this breaks opening selects when VoiceOver is active on iOS6, iOS7 (and possibly others)
				if (!deviceIsIOS || targetTagName !== 'select') {
					this.targetElement = null;
					event.preventDefault();
				}
	
				return false;
			}
	
			if (deviceIsIOS && !deviceIsIOS4) {
	
				// Don't send a synthetic click event if the target element is contained within a parent layer that was scrolled
				// and this tap is being used to stop the scrolling (usually initiated by a fling - issue #42).
				scrollParent = targetElement.fastClickScrollParent;
				if (scrollParent && scrollParent.fastClickLastScrollTop !== scrollParent.scrollTop) {
					return true;
				}
			}
	
			// Prevent the actual click from going though - unless the target node is marked as requiring
			// real clicks or if it is in the whitelist in which case only non-programmatic clicks are permitted.
			if (!this.needsClick(targetElement)) {
				event.preventDefault();
				this.sendClick(targetElement, event);
			}
	
			return false;
		};
	
	
		/**
		 * On touch cancel, stop tracking the click.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.onTouchCancel = function() {
			this.trackingClick = false;
			this.targetElement = null;
		};
	
	
		/**
		 * Determine mouse events which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onMouse = function(event) {
	
			// If a target element was never set (because a touch event was never fired) allow the event
			if (!this.targetElement) {
				return true;
			}
	
			if (event.forwardedTouchEvent) {
				return true;
			}
	
			// Programmatically generated events targeting a specific element should be permitted
			if (!event.cancelable) {
				return true;
			}
	
			// Derive and check the target element to see whether the mouse event needs to be permitted;
			// unless explicitly enabled, prevent non-touch click events from triggering actions,
			// to prevent ghost/doubleclicks.
			if (!this.needsClick(this.targetElement) || this.cancelNextClick) {
	
				// Prevent any user-added listeners declared on FastClick element from being fired.
				if (event.stopImmediatePropagation) {
					event.stopImmediatePropagation();
				} else {
	
					// Part of the hack for browsers that don't support Event#stopImmediatePropagation (e.g. Android 2)
					event.propagationStopped = true;
				}
	
				// Cancel the event
				event.stopPropagation();
				event.preventDefault();
	
				return false;
			}
	
			// If the mouse event is permitted, return true for the action to go through.
			return true;
		};
	
	
		/**
		 * On actual clicks, determine whether this is a touch-generated click, a click action occurring
		 * naturally after a delay after a touch (which needs to be cancelled to avoid duplication), or
		 * an actual click which should be permitted.
		 *
		 * @param {Event} event
		 * @returns {boolean}
		 */
		FastClick.prototype.onClick = function(event) {
			var permitted;
	
			// It's possible for another FastClick-like library delivered with third-party code to fire a click event before FastClick does (issue #44). In that case, set the click-tracking flag back to false and return early. This will cause onTouchEnd to return early.
			if (this.trackingClick) {
				this.targetElement = null;
				this.trackingClick = false;
				return true;
			}
	
			// Very odd behaviour on iOS (issue #18): if a submit element is present inside a form and the user hits enter in the iOS simulator or clicks the Go button on the pop-up OS keyboard the a kind of 'fake' click event will be triggered with the submit-type input element as the target.
			if (event.target.type === 'submit' && event.detail === 0) {
				return true;
			}
	
			permitted = this.onMouse(event);
	
			// Only unset targetElement if the click is not permitted. This will ensure that the check for !targetElement in onMouse fails and the browser's click doesn't go through.
			if (!permitted) {
				this.targetElement = null;
			}
	
			// If clicks are permitted, return true for the action to go through.
			return permitted;
		};
	
	
		/**
		 * Remove all FastClick's event listeners.
		 *
		 * @returns {void}
		 */
		FastClick.prototype.destroy = function() {
			var layer = this.layer;
	
			if (deviceIsAndroid) {
				layer.removeEventListener('mouseover', this.onMouse, true);
				layer.removeEventListener('mousedown', this.onMouse, true);
				layer.removeEventListener('mouseup', this.onMouse, true);
			}
	
			layer.removeEventListener('click', this.onClick, true);
			layer.removeEventListener('touchstart', this.onTouchStart, false);
			layer.removeEventListener('touchmove', this.onTouchMove, false);
			layer.removeEventListener('touchend', this.onTouchEnd, false);
			layer.removeEventListener('touchcancel', this.onTouchCancel, false);
		};
	
	
		/**
		 * Check whether FastClick is needed.
		 *
		 * @param {Element} layer The layer to listen on
		 */
		FastClick.notNeeded = function(layer) {
			var metaViewport;
			var chromeVersion;
			var blackberryVersion;
			var firefoxVersion;
	
			// Devices that don't support touch don't need FastClick
			if (typeof window.ontouchstart === 'undefined') {
				return true;
			}
	
			// Chrome version - zero for other browsers
			chromeVersion = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (chromeVersion) {
	
				if (deviceIsAndroid) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// Chrome on Android with user-scalable="no" doesn't need FastClick (issue #89)
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// Chrome 32 and above with width=device-width or less don't need FastClick
						if (chromeVersion > 31 && document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
	
				// Chrome desktop doesn't need FastClick (issue #15)
				} else {
					return true;
				}
			}
	
			if (deviceIsBlackBerry10) {
				blackberryVersion = navigator.userAgent.match(/Version\/([0-9]*)\.([0-9]*)/);
	
				// BlackBerry 10.3+ does not require Fastclick library.
				// https://github.com/ftlabs/fastclick/issues/251
				if (blackberryVersion[1] >= 10 && blackberryVersion[2] >= 3) {
					metaViewport = document.querySelector('meta[name=viewport]');
	
					if (metaViewport) {
						// user-scalable=no eliminates click delay.
						if (metaViewport.content.indexOf('user-scalable=no') !== -1) {
							return true;
						}
						// width=device-width (or less than device-width) eliminates click delay.
						if (document.documentElement.scrollWidth <= window.outerWidth) {
							return true;
						}
					}
				}
			}
	
			// IE10 with -ms-touch-action: none or manipulation, which disables double-tap-to-zoom (issue #97)
			if (layer.style.msTouchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			// Firefox version - zero for other browsers
			firefoxVersion = +(/Firefox\/([0-9]+)/.exec(navigator.userAgent) || [,0])[1];
	
			if (firefoxVersion >= 27) {
				// Firefox 27+ does not have tap delay if the content is not zoomable - https://bugzilla.mozilla.org/show_bug.cgi?id=922896
	
				metaViewport = document.querySelector('meta[name=viewport]');
				if (metaViewport && (metaViewport.content.indexOf('user-scalable=no') !== -1 || document.documentElement.scrollWidth <= window.outerWidth)) {
					return true;
				}
			}
	
			// IE11: prefixed -ms-touch-action is no longer supported and it's recomended to use non-prefixed version
			// http://msdn.microsoft.com/en-us/library/windows/apps/Hh767313.aspx
			if (layer.style.touchAction === 'none' || layer.style.touchAction === 'manipulation') {
				return true;
			}
	
			return false;
		};
	
	
		/**
		 * Factory method for creating a FastClick object
		 *
		 * @param {Element} layer The layer to listen on
		 * @param {Object} [options={}] The options to override the defaults
		 */
		FastClick.attach = function(layer, options) {
			return new FastClick(layer, options);
		};
	
	
		if (true) {
	
			// AMD. Register as an anonymous module.
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return FastClick;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof module !== 'undefined' && module.exports) {
			module.exports = FastClick.attach;
			module.exports.FastClick = FastClick;
		} else {
			window.FastClick = FastClick;
		}
	}());


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(18)
	__vue_script__ = __webpack_require__(20)
	__vue_template__ = __webpack_require__(21)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/johannes/git/raycing/cordova/www/src/vues/main.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-426b1f17&file=main.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./main.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-426b1f17&file=main.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./main.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, "\n  .mainMenuBottom {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding-top: 7vh;\n  }\n\n  .mainMenuButton {\n    font-size: 2vw;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n\n  .mainMenuButton:hover {\n    cursor: pointer;\n    color: gray;\n  }\n\n  .mainMenuButton .icon{\n    display: inline;\n    opacity: 1;\n  }\n\n  .mainMenuButton-puzzle .icon{\n    margin-right: 1vw;\n  }\n\n  .mainMenuButton-free svg {\n    margin-right: 2.5vw;\n    -webkit-transform: rotate(30deg);\n            transform: rotate(30deg);\n  }\n\n  .mainMenuButton svg{\n    width: 7vw;\n    height: 7vw;\n  }\n", "", {"version":3,"sources":["/./cordova/www/src/vues/main.vue.style"],"names":[],"mappings":";EAmGA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,yBAAA;IAAA,gCAAA;QAAA,sBAAA;YAAA,wBAAA;IACA,iBAAA;GACA;;EAEA;IACA,eAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,0BAAA;IAAA,4BAAA;QAAA,uBAAA;YAAA,oBAAA;GACA;;EAEA;IACA,gBAAA;IACA,YAAA;GACA;;EAEA;IACA,gBAAA;IACA,WAAA;GACA;;EAEA;IACA,kBAAA;GACA;;EAEA;IACA,oBAAA;IACA,iCAAA;YAAA,yBAAA;GACA;;EAEA;IACA,WAAA;IACA,YAAA;GACA","file":"main.vue","sourcesContent":["<template>\n  <div class=\"mainMenuBottom\">\n    <span v-link=\"{ path: '/puzzle' }\" class=\"mainMenuButton mainMenuButton-puzzle\">\n      <svg class=\"icon\" viewbox=\"0 0 450 450\">\n        <path\n              d=\"\n                 M425 425 m-71 -1\n                 q-5 -5 0 -10 a20 10 0 1 0 -30 0 q5 5 0 10\n                 h-60 q-10 0 -10 -10 v-60\n                 q-5 -5 -10 0 a10 20 0 1 1 0 -30 q5 5 10 0\n                 v-60 q0 -10 10 -10 h60\n                 q5 -5 0 -10 a20 10 0 1 1 30 0 q-5 5 0 10\n                 h60 q10 0 10 10 v60\n                 q-5 5 -10 0 a10 20 0 1 0 0 30 q5 -5 10 0\n                 v60 q0 10 -10 10 h-60\n\n                 M200 425 m-71 -1\n                 q-5 -5 0 -10 a20 10 0 1 0 -30 0 q5 5 0 10\n                 h-60 q-10 0 -10 -10 v-60\n                 q-5 -5 -10 0 a10 20 0 1 1 0 -30 q5 5 10 0\n                 v-60 q0 -10 10 -10 h60\n                 q5 -5 0 -10 a20 10 0 1 1 30 0 q-5 5 0 10\n                 h60 q10 0 10 10 v60\n                 q-5 5 -10 0 a10 20 0 1 0 0 30 q5 -5 10 0\n                 v60 q0 10 -10 10 h-60\n\n                 M425 200 m-71 -1\n                 q-5 -5 0 -10 a20 10 0 1 0 -30 0 q5 5 0 10\n                 h-60 q-10 0 -10 -10 v-60\n                 q-5 -5 -10 0 a10 20 0 1 1 0 -30 q5 5 10 0\n                 v-60 q0 -10 10 -10 h60\n                 q5 -5 0 -10 a20 10 0 1 1 30 0 q-5 5 0 10\n                 h60 q10 0 10 10 v60\n                 q-5 5 -10 0 a10 20 0 1 0 0 30 q5 -5 10 0\n                 v60 q0 10 -10 10 h-60\n                 \"/>\n      </svg>\n      <span>Puzzle<br>mode</span>\n    </span>\n\n    <span v-link=\"{ path: '/free' }\" class=\"mainMenuButton mainMenuButton-free\">\n      <svg class=\"icon\" viewbox=\"0 0 112 400\">\n        <path d=\"\n                 M15 1\n                 h-14\n                 v398\n                 h14\n                 v-398\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -150\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -210\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -150\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -210\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -150\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -210\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -150\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -210\n                 \"/>\n      </svg>\n      <span>Free<br>mode</span>\n    </span>\n  </div>\n</template>\n\n<script lang=\"babel\">\n  export default {\n    props: [ 'menu', 'smallButtons', 'showTitle' ],\n    created: function() {\n      this.menu = 'medium';\n      this.smallButtons = false;\n      setTimeout(() => this.showTitle = true);\n    }\n  }\n</script>\n\n<style>\n  .mainMenuBottom {\n    display: flex;\n    justify-content: center;\n    padding-top: 7vh;\n  }\n\n  .mainMenuButton {\n    font-size: 2vw;\n    display: flex;\n    align-items: center;\n  }\n\n  .mainMenuButton:hover {\n    cursor: pointer;\n    color: gray;\n  }\n\n  .mainMenuButton .icon{\n    display: inline;\n    opacity: 1;\n  }\n\n  .mainMenuButton-puzzle .icon{\n    margin-right: 1vw;\n  }\n\n  .mainMenuButton-free svg {\n    margin-right: 2.5vw;\n    transform: rotate(30deg);\n  }\n\n  .mainMenuButton svg{\n    width: 7vw;\n    height: 7vw;\n  }\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// <template>
	//   <div class="mainMenuBottom">
	//     <span v-link="{ path: '/puzzle' }" class="mainMenuButton mainMenuButton-puzzle">
	//       <svg class="icon" viewbox="0 0 450 450">
	//         <path
	//               d="
	//                  M425 425 m-71 -1
	//                  q-5 -5 0 -10 a20 10 0 1 0 -30 0 q5 5 0 10
	//                  h-60 q-10 0 -10 -10 v-60
	//                  q-5 -5 -10 0 a10 20 0 1 1 0 -30 q5 5 10 0
	//                  v-60 q0 -10 10 -10 h60
	//                  q5 -5 0 -10 a20 10 0 1 1 30 0 q-5 5 0 10
	//                  h60 q10 0 10 10 v60
	//                  q-5 5 -10 0 a10 20 0 1 0 0 30 q5 -5 10 0
	//                  v60 q0 10 -10 10 h-60
	
	//                  M200 425 m-71 -1
	//                  q-5 -5 0 -10 a20 10 0 1 0 -30 0 q5 5 0 10
	//                  h-60 q-10 0 -10 -10 v-60
	//                  q-5 -5 -10 0 a10 20 0 1 1 0 -30 q5 5 10 0
	//                  v-60 q0 -10 10 -10 h60
	//                  q5 -5 0 -10 a20 10 0 1 1 30 0 q-5 5 0 10
	//                  h60 q10 0 10 10 v60
	//                  q-5 5 -10 0 a10 20 0 1 0 0 30 q5 -5 10 0
	//                  v60 q0 10 -10 10 h-60
	
	//                  M425 200 m-71 -1
	//                  q-5 -5 0 -10 a20 10 0 1 0 -30 0 q5 5 0 10
	//                  h-60 q-10 0 -10 -10 v-60
	//                  q-5 -5 -10 0 a10 20 0 1 1 0 -30 q5 5 10 0
	//                  v-60 q0 -10 10 -10 h60
	//                  q5 -5 0 -10 a20 10 0 1 1 30 0 q-5 5 0 10
	//                  h60 q10 0 10 10 v60
	//                  q-5 5 -10 0 a10 20 0 1 0 0 30 q5 -5 10 0
	//                  v60 q0 10 -10 10 h-60
	//                  "/>
	//       </svg>
	//       <span>Puzzle<br>mode</span>
	//     </span>
	
	//     <span v-link="{ path: '/free' }" class="mainMenuButton mainMenuButton-free">
	//       <svg class="icon" viewbox="0 0 112 400">
	//         <path d="
	//                  M15 1
	//                  h-14
	//                  v398
	//                  h14
	//                  v-398
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  m30 -150
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  m30 -210
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  m30 -150
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  m30 -210
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  m30 -150
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  m30 -210
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  m30 -150
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  h30 v30 h-30 v-30 m0 60
	//                  m30 -210
	//                  "/>
	//       </svg>
	//       <span>Free<br>mode</span>
	//     </span>
	//   </div>
	// </template>
	
	// <script lang="babel">
	exports.default = {
	  props: ['menu', 'smallButtons', 'showTitle'],
	  created: function created() {
	    var _this = this;
	
	    this.menu = 'medium';
	    this.smallButtons = false;
	    setTimeout(function () {
	      return _this.showTitle = true;
	    });
	  }
	};
	// </script>

	// <style>
	//   .mainMenuBottom {
	//     display: flex;
	//     justify-content: center;
	//     padding-top: 7vh;
	//   }

	//   .mainMenuButton {
	//     font-size: 2vw;
	//     display: flex;
	//     align-items: center;
	//   }

	//   .mainMenuButton:hover {
	//     cursor: pointer;
	//     color: gray;
	//   }

	//   .mainMenuButton .icon{
	//     display: inline;
	//     opacity: 1;
	//   }

	//   .mainMenuButton-puzzle .icon{
	//     margin-right: 1vw;
	//   }

	//   .mainMenuButton-free svg {
	//     margin-right: 2.5vw;
	//     transform: rotate(30deg);
	//   }

	//   .mainMenuButton svg{
	//     width: 7vw;
	//     height: 7vw;
	//   }
	// </style>

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"mainMenuBottom\">\n    <span v-link=\"{ path: '/puzzle' }\" class=\"mainMenuButton mainMenuButton-puzzle\">\n      <svg class=\"icon\" viewbox=\"0 0 450 450\">\n        <path\n              d=\"\n                 M425 425 m-71 -1\n                 q-5 -5 0 -10 a20 10 0 1 0 -30 0 q5 5 0 10\n                 h-60 q-10 0 -10 -10 v-60\n                 q-5 -5 -10 0 a10 20 0 1 1 0 -30 q5 5 10 0\n                 v-60 q0 -10 10 -10 h60\n                 q5 -5 0 -10 a20 10 0 1 1 30 0 q-5 5 0 10\n                 h60 q10 0 10 10 v60\n                 q-5 5 -10 0 a10 20 0 1 0 0 30 q5 -5 10 0\n                 v60 q0 10 -10 10 h-60\n\n                 M200 425 m-71 -1\n                 q-5 -5 0 -10 a20 10 0 1 0 -30 0 q5 5 0 10\n                 h-60 q-10 0 -10 -10 v-60\n                 q-5 -5 -10 0 a10 20 0 1 1 0 -30 q5 5 10 0\n                 v-60 q0 -10 10 -10 h60\n                 q5 -5 0 -10 a20 10 0 1 1 30 0 q-5 5 0 10\n                 h60 q10 0 10 10 v60\n                 q-5 5 -10 0 a10 20 0 1 0 0 30 q5 -5 10 0\n                 v60 q0 10 -10 10 h-60\n\n                 M425 200 m-71 -1\n                 q-5 -5 0 -10 a20 10 0 1 0 -30 0 q5 5 0 10\n                 h-60 q-10 0 -10 -10 v-60\n                 q-5 -5 -10 0 a10 20 0 1 1 0 -30 q5 5 10 0\n                 v-60 q0 -10 10 -10 h60\n                 q5 -5 0 -10 a20 10 0 1 1 30 0 q-5 5 0 10\n                 h60 q10 0 10 10 v60\n                 q-5 5 -10 0 a10 20 0 1 0 0 30 q5 -5 10 0\n                 v60 q0 10 -10 10 h-60\n                 \"/>\n      </svg>\n      <span>Puzzle<br>mode</span>\n    </span>\n\n    <span v-link=\"{ path: '/free' }\" class=\"mainMenuButton mainMenuButton-free\">\n      <svg class=\"icon\" viewbox=\"0 0 112 400\">\n        <path d=\"\n                 M15 1\n                 h-14\n                 v398\n                 h14\n                 v-398\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -150\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -210\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -150\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -210\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -150\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -210\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -150\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 h30 v30 h-30 v-30 m0 60\n                 m30 -210\n                 \"/>\n      </svg>\n      <span>Free<br>mode</span>\n    </span>\n  </div>\n";

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(23)
	__vue_script__ = __webpack_require__(25)
	__vue_template__ = __webpack_require__(26)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/johannes/git/raycing/cordova/www/src/vues/free.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(24);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-318ac36c&file=free.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./free.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-318ac36c&file=free.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./free.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, "\n  .cursor-pointer {\n    cursor: pointer;\n  }\n\n  .text-small {\n    font-size: 1vw;\n  }\n\n  .text-medium {\n    font-size: 2vw;\n  }\n\n  .text-large {\n    font-size: 3vw;\n  }\n\n  .freeMenuBottom {\n    margin-top: 2vh;\n  }\n\n  .freeMenuBottom > * + * {\n    margin-top: 2vh;\n  }\n\n  .nbrOfPlayers > * + * {\n    margin-left: 4vw;\n  }\n\n  .selectedMap {\n    text-decoration: underline;\n  }\n", "", {"version":3,"sources":["/./cordova/www/src/vues/free.vue.style"],"names":[],"mappings":";EA2GA;IACA,gBAAA;GACA;;EAEA;IACA,eAAA;GACA;;EAEA;IACA,eAAA;GACA;;EAEA;IACA,eAAA;GACA;;EAEA;IACA,gBAAA;GACA;;EAEA;IACA,gBAAA;GACA;;EAEA;IACA,iBAAA;GACA;;EAEA;IACA,2BAAA;GACA","file":"free.vue","sourcesContent":["<template>\n  <div class=\"freeMenuBottom\" slot=\"menuBottom\">\n    <div>\n      <div class=\"text-small\">\n        Number of players (1-{{maxPlayerCount}})\n      </div>\n      <div class=\"text-large\">\n        <span v-on:click=\"decrementPlayerCount\" class=\"cursor-pointer\">-</span>\n        <span>{{playerCount}}</span>\n        <span v-on:click=\"incrementPlayerCount\" class=\"cursor-pointer\">+</span>\n      </div>\n    </div>\n    <div>\n      <div\n        v-for=\"map in maps\"\n        class=\"cursor-pointer text-medium\"\n        :class=\"{ 'selectedMap' : map === selectedMap }\"\n        v-on:click=\"selectMap(map)\">\n        {{map.key}}\n      </div>\n    </div>\n    <div>\n      <span v-on:click=\"editMap()\" class=\"text-medium cursor-pointer\">Edit map</span>\n    </div>\n    <div>\n      <span v-on:click=\"deleteMap()\" class=\"text-medium cursor-pointer\">Delete map</span>\n    </div>\n    <div>\n      <span v-on:click=\"playMap()\" class=\"text-medium cursor-pointer\">Play map</span>\n    </div>\n    <div>\n      <span v-link=\"'/editor/size/s'\" class=\"text-large cursor-pointer\">Create small map</span>\n    </div>\n    <div>\n      <span v-link=\"'/editor/size/l'\" class=\"text-large cursor-pointer\">Create large map</span>\n    </div>\n  </div>\n</template>\n\n<script lang=\"babel\">\n  import Paper from 'paper';\n  import * as storage from './services/storage.js';\n  import * as view from './services/view';\n\n  export default {\n    props: [ 'menu', 'smallButtons', 'showTitle' ],\n    destroyed(){\n      if(this.course) this.course.remove();\n    },\n    created(){\n      view.reset();\n      this.maps = storage.GetMaps();\n      this.menu = 'big';\n      this.smallButtons = false;\n      this.showTitle = false;\n    },\n    data() {\n      return {\n        selectedMap: null,\n        maxPlayerCount: 4,\n        playerCount: 1,\n        maps: []\n      }\n    },\n    methods: {\n      decrementPlayerCount(){\n        this.playerCount = this.normalizePlayerCount(this.playerCount - 1);\n      },\n      incrementPlayerCount(){\n        this.playerCount = this.normalizePlayerCount(this.playerCount + 1);\n      },\n      normalizePlayerCount(playerCount) {\n        return Math.max(1, Math.min(playerCount, this.maxPlayerCount));\n      },\n      selectMap(map){\n        this.selectedMap = map;\n        if(this.course) this.course.remove();\n        var track = Paper.project.importJSON(map.map.Track);\n        var start = Paper.project.importJSON(map.map.Startzone);\n        var end = Paper.project.importJSON(map.map.Endzone);\n        this.course = new Paper.Group(track, start, end);\n\n        view.addCourse(this.course);\n        view.setView(track.bounds.expand(200));\n      },\n      editMap(){\n        if(this.selectedMap) {\n          this.$route.router.go('/editor/key/' + this.selectedMap.key);\n        }\n      },\n      deleteMap(){\n        if(this.selectedMap) {\n          storage.RemoveMap(this.selectedMap);\n          if(this.course) this.course.remove();\n          this.maps = storage.GetMaps();\n        }\n      },\n      playMap(){\n        if(this.selectedMap) {\n          this.$route.router.go('/play/' + this.selectedMap.key + '/' + this.playerCount);\n        }\n      }\n    }\n  }\n</script>\n\n<style>\n  .cursor-pointer {\n    cursor: pointer;\n  }\n\n  .text-small {\n    font-size: 1vw;\n  }\n\n  .text-medium {\n    font-size: 2vw;\n  }\n\n  .text-large {\n    font-size: 3vw;\n  }\n\n  .freeMenuBottom {\n    margin-top: 2vh;\n  }\n\n  .freeMenuBottom > * + * {\n    margin-top: 2vh;\n  }\n\n  .nbrOfPlayers > * + * {\n    margin-left: 4vw;\n  }\n\n  .selectedMap {\n    text-decoration: underline;\n  }\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _paper = __webpack_require__(4);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	var _storage = __webpack_require__(7);
	
	var storage = _interopRequireWildcard(_storage);
	
	var _view = __webpack_require__(3);
	
	var view = _interopRequireWildcard(_view);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  props: ['menu', 'smallButtons', 'showTitle'],
	  destroyed: function destroyed() {
	    if (this.course) this.course.remove();
	  },
	  created: function created() {
	    view.reset();
	    this.maps = storage.GetMaps();
	    this.menu = 'big';
	    this.smallButtons = false;
	    this.showTitle = false;
	  },
	  data: function data() {
	    return {
	      selectedMap: null,
	      maxPlayerCount: 4,
	      playerCount: 1,
	      maps: []
	    };
	  },
	
	  methods: {
	    decrementPlayerCount: function decrementPlayerCount() {
	      this.playerCount = this.normalizePlayerCount(this.playerCount - 1);
	    },
	    incrementPlayerCount: function incrementPlayerCount() {
	      this.playerCount = this.normalizePlayerCount(this.playerCount + 1);
	    },
	    normalizePlayerCount: function normalizePlayerCount(playerCount) {
	      return Math.max(1, Math.min(playerCount, this.maxPlayerCount));
	    },
	    selectMap: function selectMap(map) {
	      this.selectedMap = map;
	      if (this.course) this.course.remove();
	      var track = _paper2.default.project.importJSON(map.map.Track);
	      var start = _paper2.default.project.importJSON(map.map.Startzone);
	      var end = _paper2.default.project.importJSON(map.map.Endzone);
	      this.course = new _paper2.default.Group(track, start, end);
	
	      view.addCourse(this.course);
	      view.setView(track.bounds.expand(200));
	    },
	    editMap: function editMap() {
	      if (this.selectedMap) {
	        this.$route.router.go('/editor/key/' + this.selectedMap.key);
	      }
	    },
	    deleteMap: function deleteMap() {
	      if (this.selectedMap) {
	        storage.RemoveMap(this.selectedMap);
	        if (this.course) this.course.remove();
	        this.maps = storage.GetMaps();
	      }
	    },
	    playMap: function playMap() {
	      if (this.selectedMap) {
	        this.$route.router.go('/play/' + this.selectedMap.key + '/' + this.playerCount);
	      }
	    }
	  }
	};
	// </script>

	// <style>
	//   .cursor-pointer {
	//     cursor: pointer;
	//   }

	//   .text-small {
	//     font-size: 1vw;
	//   }

	//   .text-medium {
	//     font-size: 2vw;
	//   }

	//   .text-large {
	//     font-size: 3vw;
	//   }

	//   .freeMenuBottom {
	//     margin-top: 2vh;
	//   }

	//   .freeMenuBottom > * + * {
	//     margin-top: 2vh;
	//   }

	//   .nbrOfPlayers > * + * {
	//     margin-left: 4vw;
	//   }

	//   .selectedMap {
	//     text-decoration: underline;
	//   }
	// </style>
	// <template>
	//   <div class="freeMenuBottom" slot="menuBottom">
	//     <div>
	//       <div class="text-small">
	//         Number of players (1-{{maxPlayerCount}})
	//       </div>
	//       <div class="text-large">
	//         <span v-on:click="decrementPlayerCount" class="cursor-pointer">-</span>
	//         <span>{{playerCount}}</span>
	//         <span v-on:click="incrementPlayerCount" class="cursor-pointer">+</span>
	//       </div>
	//     </div>
	//     <div>
	//       <div
	//         v-for="map in maps"
	//         class="cursor-pointer text-medium"
	//         :class="{ 'selectedMap' : map === selectedMap }"
	//         v-on:click="selectMap(map)">
	//         {{map.key}}
	//       </div>
	//     </div>
	//     <div>
	//       <span v-on:click="editMap()" class="text-medium cursor-pointer">Edit map</span>
	//     </div>
	//     <div>
	//       <span v-on:click="deleteMap()" class="text-medium cursor-pointer">Delete map</span>
	//     </div>
	//     <div>
	//       <span v-on:click="playMap()" class="text-medium cursor-pointer">Play map</span>
	//     </div>
	//     <div>
	//       <span v-link="'/editor/size/s'" class="text-large cursor-pointer">Create small map</span>
	//     </div>
	//     <div>
	//       <span v-link="'/editor/size/l'" class="text-large cursor-pointer">Create large map</span>
	//     </div>
	//   </div>
	// </template>

	// <script lang="babel">

/***/ },
/* 26 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"freeMenuBottom\" slot=\"menuBottom\">\n    <div>\n      <div class=\"text-small\">\n        Number of players (1-{{maxPlayerCount}})\n      </div>\n      <div class=\"text-large\">\n        <span v-on:click=\"decrementPlayerCount\" class=\"cursor-pointer\">-</span>\n        <span>{{playerCount}}</span>\n        <span v-on:click=\"incrementPlayerCount\" class=\"cursor-pointer\">+</span>\n      </div>\n    </div>\n    <div>\n      <div\n        v-for=\"map in maps\"\n        class=\"cursor-pointer text-medium\"\n        :class=\"{ 'selectedMap' : map === selectedMap }\"\n        v-on:click=\"selectMap(map)\">\n        {{map.key}}\n      </div>\n    </div>\n    <div>\n      <span v-on:click=\"editMap()\" class=\"text-medium cursor-pointer\">Edit map</span>\n    </div>\n    <div>\n      <span v-on:click=\"deleteMap()\" class=\"text-medium cursor-pointer\">Delete map</span>\n    </div>\n    <div>\n      <span v-on:click=\"playMap()\" class=\"text-medium cursor-pointer\">Play map</span>\n    </div>\n    <div>\n      <span v-link=\"'/editor/size/s'\" class=\"text-large cursor-pointer\">Create small map</span>\n    </div>\n    <div>\n      <span v-link=\"'/editor/size/l'\" class=\"text-large cursor-pointer\">Create large map</span>\n    </div>\n  </div>\n";

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(28)
	__vue_script__ = __webpack_require__(30)
	__vue_template__ = __webpack_require__(32)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/johannes/git/raycing/cordova/www/src/vues/editor.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(29);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1a99874b&file=editor.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./editor.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-1a99874b&file=editor.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./editor.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, "\n  .editorMenuBottom {\n    padding-top: 2vh;\n  }\n\n  .editorMenuBottom > * + * {\n    margin-top: 2vh;\n  }\n\n  .text-medium {\n    font-size: 2vw;\n  }\n\n  .currentTool {\n    text-decoration: underline;\n  }\n\n  .mapEditorSteps > * + * {\n    margin-left: 1vw;\n  }\n", "", {"version":3,"sources":["/./cordova/www/src/vues/editor.vue.style"],"names":[],"mappings":";EAiKA;IACA,iBAAA;GACA;;EAEA;IACA,gBAAA;GACA;;EAEA;IACA,eAAA;GACA;;EAEA;IACA,2BAAA;GACA;;EAEA;IACA,iBAAA;GACA","file":"editor.vue","sourcesContent":["<template>\n    <div>\n      <div class=\"text-medium editorMenuBottom\" slot=\"menuBottom\">\n        <div>\n          <span v-on:click=\"changeBrushSize(-1)\" class=\"cursor-pointer\">-</span>\n          <span>Brushsize ({{model.brushSize}})</span>\n          <span v-on:click=\"changeBrushSize(1)\" class=\"cursor-pointer\">+</span>\n        </div>\n        <div class=\"mapEditorSteps\">\n          <span\n            v-for=\"tool in model.tools\" class=\"cursor-pointer\"\n            :class=\"{ 'currentTool' : tool === model.selectedTool }\"\n            :style=\"{ color: tool.color }\"\n            v-on:click=\"selectTool(tool)\">{{tool.name}}</span>\n          <span v-on:click=\"done()\" class=\"cursor-pointer\">Save map</span>\n        </div>\n      </div>\n    </div>\n</template>\n\n<script lang=\"babel\">\n  import Paper from 'paper';\n  import * as view from './services/view';\n  import * as audio from './services/audio';\n  import * as storage from './services/storage';\n  import svgMenu from './svgMenu.vue'\n\n  var isAdding;\n  var brushSize;\n  var course;\n\n  var tools = [\n    { name: 'Track', color: 'purple', path: null },\n    { name: 'Startzone', color: 'green', path: null },\n    { name: 'Endzone', color: 'yellow', path: null }\n  ];\n\n  var model = {\n    selectedTool: getTool('Track'),\n    tools,\n    brushSize\n  };\n\n  var mouseControls;\n\n  function created(){\n    this.menu = 'small';\n    this.smallButtons = true;\n    this.showTitle = false;\n    isAdding = true;\n    model.brushSize = 40;\n    model.selectedTool = getTool('Track');\n\n    this.size = '';\n    if(this.$route.params.key){\n      var map = storage.Get(this.$route.params.key);\n      tools.forEach(t => t.path = Paper.project.importJSON(map.map[t.name]));\n      this.size = map.size;\n    } else {\n      this.size = this.$route.params.size;\n      tools.forEach(t => t.path = new Paper.Path());\n    }\n\n    if(this.size === 's'){\n      view.reset();\n    } else {\n      view.setViewToOuterBounds();\n    }\n\n    course = new Paper.Group(...tools.map(t => t.path));\n    view.addCourse(course);\n\n    mouseControls = new Paper.Tool();\n    mouseControls.onMouseDown = event => {\n      audio.playClick();\n      if(model.selectedTool.path.area < 50){\n        removePath(model.selectedTool.path);\n        var path = new Paper.Path.Circle(event.point, model.brushSize);\n        path.fillColor = model.selectedTool.color;\n        path.simplify();\n        model.selectedTool.path = path;\n        course.addChild(model.selectedTool.path);\n      }\n      isAdding = model.selectedTool.path.contains(event.point);\n    };\n\n    mouseControls.onMouseDrag = event => {\n      var editCircle = new Paper.Path.Circle(event.point, model.brushSize);\n\n      var newPath = isAdding ? model.selectedTool.path.unite(editCircle) : model.selectedTool.path.subtract(editCircle);\n      removePath(editCircle);\n      removePath(model.selectedTool.path);\n      newPath.fillColor = model.selectedTool.color;\n      model.selectedTool.path = newPath;\n    };\n  }\n\n  function destroyed(){\n    course.remove();\n    mouseControls.remove();\n  }\n\n  function getTool(name){\n    return tools.filter(tool => tool.name === name)[0]\n  }\n\n  function removePath(path){\n    path.remove();\n    if(path.removeSegments){\n      path.removeSegments();\n    } else {\n      path.children.forEach(c => c.removeSegments());\n      path.removeChildren();\n    };\n  }\n\n  function selectTool(tool){\n    model.selectedTool = tool;\n  }\n\n  function changeBrushSize(direction){\n    var brushInterval = 10;\n    var delta = brushInterval * direction;\n    this.model.brushSize = Math.min(Math.max(10, this.model.brushSize + delta), 70);\n  }\n\n  function done(){\n    var track = getTool('Track');\n    tools\n      .filter(tool => tool.name != 'Track')\n      .forEach(tool => {\n        var newPath = track.path.unite(tool.path);\n        track.path.remove();\n        track.path = newPath;\n      });\n    var map = {};\n    tools.forEach(tool => map[tool.name] = tool.path.toJSON());\n\n    var key = this.$route.params.key ? this.$route.params.key : 'map-' + (new Date()).toISOString();\n    storage.AddMap({ map, key, size: this.size });\n\n    destroyed();\n\n    history.back();\n  }\n\n  export default {\n    props: [ 'menu', 'smallButtons', 'showTitle' ],\n    created,\n    destroyed,\n    data() {\n      return { model }\n    },\n    components: {\n      svgMenu\n    },\n    methods: { selectTool, changeBrushSize, done }\n  }\n</script>\n\n<style>\n  .editorMenuBottom {\n    padding-top: 2vh;\n  }\n\n  .editorMenuBottom > * + * {\n    margin-top: 2vh;\n  }\n\n  .text-medium {\n    font-size: 2vw;\n  }\n\n  .currentTool {\n    text-decoration: underline;\n  }\n\n  .mapEditorSteps > * + * {\n    margin-left: 1vw;\n  }\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _paper = __webpack_require__(4);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	var _view = __webpack_require__(3);
	
	var view = _interopRequireWildcard(_view);
	
	var _audio = __webpack_require__(31);
	
	var audio = _interopRequireWildcard(_audio);
	
	var _storage = __webpack_require__(7);
	
	var storage = _interopRequireWildcard(_storage);
	
	var _svgMenu = __webpack_require__(9);
	
	var _svgMenu2 = _interopRequireDefault(_svgMenu);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // <template>
	//     <div>
	//       <div class="text-medium editorMenuBottom" slot="menuBottom">
	//         <div>
	//           <span v-on:click="changeBrushSize(-1)" class="cursor-pointer">-</span>
	//           <span>Brushsize ({{model.brushSize}})</span>
	//           <span v-on:click="changeBrushSize(1)" class="cursor-pointer">+</span>
	//         </div>
	//         <div class="mapEditorSteps">
	//           <span
	//             v-for="tool in model.tools" class="cursor-pointer"
	//             :class="{ 'currentTool' : tool === model.selectedTool }"
	//             :style="{ color: tool.color }"
	//             v-on:click="selectTool(tool)">{{tool.name}}</span>
	//           <span v-on:click="done()" class="cursor-pointer">Save map</span>
	//         </div>
	//       </div>
	//     </div>
	// </template>
	
	// <script lang="babel">
	
	var isAdding;
	var brushSize;
	var course;
	
	var tools = [{ name: 'Track', color: 'purple', path: null }, { name: 'Startzone', color: 'green', path: null }, { name: 'Endzone', color: 'yellow', path: null }];
	
	var model = {
	  selectedTool: getTool('Track'),
	  tools: tools,
	  brushSize: brushSize
	};
	
	var mouseControls;
	
	function created() {
	  this.menu = 'small';
	  this.smallButtons = true;
	  this.showTitle = false;
	  isAdding = true;
	  model.brushSize = 40;
	  model.selectedTool = getTool('Track');
	
	  this.size = '';
	  if (this.$route.params.key) {
	    var map = storage.Get(this.$route.params.key);
	    tools.forEach(function (t) {
	      return t.path = _paper2.default.project.importJSON(map.map[t.name]);
	    });
	    this.size = map.size;
	  } else {
	    this.size = this.$route.params.size;
	    tools.forEach(function (t) {
	      return t.path = new _paper2.default.Path();
	    });
	  }
	
	  if (this.size === 's') {
	    view.reset();
	  } else {
	    view.setViewToOuterBounds();
	  }
	
	  course = new (Function.prototype.bind.apply(_paper2.default.Group, [null].concat(_toConsumableArray(tools.map(function (t) {
	    return t.path;
	  })))))();
	  view.addCourse(course);
	
	  mouseControls = new _paper2.default.Tool();
	  mouseControls.onMouseDown = function (event) {
	    audio.playClick();
	    if (model.selectedTool.path.area < 50) {
	      removePath(model.selectedTool.path);
	      var path = new _paper2.default.Path.Circle(event.point, model.brushSize);
	      path.fillColor = model.selectedTool.color;
	      path.simplify();
	      model.selectedTool.path = path;
	      course.addChild(model.selectedTool.path);
	    }
	    isAdding = model.selectedTool.path.contains(event.point);
	  };
	
	  mouseControls.onMouseDrag = function (event) {
	    var editCircle = new _paper2.default.Path.Circle(event.point, model.brushSize);
	
	    var newPath = isAdding ? model.selectedTool.path.unite(editCircle) : model.selectedTool.path.subtract(editCircle);
	    removePath(editCircle);
	    removePath(model.selectedTool.path);
	    newPath.fillColor = model.selectedTool.color;
	    model.selectedTool.path = newPath;
	  };
	}
	
	function destroyed() {
	  course.remove();
	  mouseControls.remove();
	}
	
	function getTool(name) {
	  return tools.filter(function (tool) {
	    return tool.name === name;
	  })[0];
	}
	
	function removePath(path) {
	  path.remove();
	  if (path.removeSegments) {
	    path.removeSegments();
	  } else {
	    path.children.forEach(function (c) {
	      return c.removeSegments();
	    });
	    path.removeChildren();
	  };
	}
	
	function selectTool(tool) {
	  model.selectedTool = tool;
	}
	
	function changeBrushSize(direction) {
	  var brushInterval = 10;
	  var delta = brushInterval * direction;
	  this.model.brushSize = Math.min(Math.max(10, this.model.brushSize + delta), 70);
	}
	
	function done() {
	  var track = getTool('Track');
	  tools.filter(function (tool) {
	    return tool.name != 'Track';
	  }).forEach(function (tool) {
	    var newPath = track.path.unite(tool.path);
	    track.path.remove();
	    track.path = newPath;
	  });
	  var map = {};
	  tools.forEach(function (tool) {
	    return map[tool.name] = tool.path.toJSON();
	  });
	
	  var key = this.$route.params.key ? this.$route.params.key : 'map-' + new Date().toISOString();
	  storage.AddMap({ map: map, key: key, size: this.size });
	
	  destroyed();
	
	  history.back();
	}
	
	exports.default = {
	  props: ['menu', 'smallButtons', 'showTitle'],
	  created: created,
	  destroyed: destroyed,
	  data: function data() {
	    return { model: model };
	  },
	
	  components: {
	    svgMenu: _svgMenu2.default
	  },
	  methods: { selectTool: selectTool, changeBrushSize: changeBrushSize, done: done }
	};
	// </script>

	// <style>
	//   .editorMenuBottom {
	//     padding-top: 2vh;
	//   }

	//   .editorMenuBottom > * + * {
	//     margin-top: 2vh;
	//   }

	//   .text-medium {
	//     font-size: 2vw;
	//   }

	//   .currentTool {
	//     text-decoration: underline;
	//   }

	//   .mapEditorSteps > * + * {
	//     margin-left: 1vw;
	//   }
	// </style>

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ToggleIsMuted = ToggleIsMuted;
	exports.playClick = playClick;
	
	var _storage = __webpack_require__(7);
	
	var storage = _interopRequireWildcard(_storage);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	var context = new AudioContext();
	var masterGain = context.createGain();
	masterGain.connect(context.destination);
	masterGain.gain.value = storage.GetIsMuted() ? 0 : 0.5;
	
	function ToggleIsMuted() {
	  var isMuted = !storage.GetIsMuted();
	  storage.SetIsMuted(isMuted);
	  masterGain.gain.value = isMuted ? 0 : 0.5;
	  return isMuted;
	}
	
	var click;
	loadArrayBuffer('sounds/click2.wav', context, function (buffer) {
	  return click = buffer;
	});
	
	function playClick() {
	  var sound = createSourceAndGain(click);
	  sound.gainNode.gain.value = 0.5;
	  sound.source.start(0);
	}
	
	var intro;
	loadArrayBuffer('sounds/TimeGrid03.ogg', context, function (buffer) {
	  var _createSourceAndGain = createSourceAndGain(buffer);
	
	  var source = _createSourceAndGain.source;
	  var gainNode = _createSourceAndGain.gainNode;
	
	  gainNode.gain.value = 0.5;
	  source.loop = true;
	  source.start(0);
	});
	
	var ambientSounds = [];
	var ambientSoundUrls = ['sounds/sirens-of-amygdala.wav', //http://freesound.org/people/ERH/sounds/31041/
	'sounds/blaster-1.wav', //http://freesound.org/people/ERH/sounds/30304/
	'sounds/boom-2.wav', //http://freesound.org/people/ERH/sounds/30261/
	'sounds/boom-3.wav', //http://freesound.org/people/ERH/sounds/30262/
	'sounds/wind.ogg'];
	//http://freesound.org/people/Black%20Boe/sounds/22331/
	ambientSoundUrls.forEach(function (url, index) {
	  return loadArrayBuffer(url, context, function (buffer) {
	    ambientSounds.push(buffer);
	    if (index === 0) scheduleAmbientSound();
	  });
	});
	
	function scheduleAmbientSound() {
	  return;
	  var buffer = ambientSounds[Math.floor(Math.random() * ambientSounds.length)];
	  var duration = buffer.duration;
	  var fadeTime = randomInt(5, 15);
	  var silence = randomInt(5, 25);
	
	  var gain = random(0.2, 0.5);
	  var sound = createSourceAndGain(buffer);
	  var source = sound.source;
	  var gainNode = sound.gainNode;
	  var currTime = context.currentTime;
	  gainNode.gain.linearRampToValueAtTime(0, currTime);
	  gainNode.gain.linearRampToValueAtTime(gain, currTime + fadeTime);
	  source.start(0);
	  gainNode.gain.linearRampToValueAtTime(gain, currTime + duration - fadeTime);
	  gainNode.gain.linearRampToValueAtTime(0, currTime + duration);
	
	  setTimeout(function () {
	    return scheduleAmbientSound();
	  }, (duration - fadeTime + silence) * 1000);
	}
	
	function loadArrayBuffer(url, context, callback) {
	  var request = new XMLHttpRequest();
	  request.open('GET', url, true);
	  request.responseType = 'arraybuffer';
	  request.onload = function () {
	    return context.decodeAudioData(request.response, function (buffer) {
	      return callback(buffer);
	    }, function (error) {
	      return console.log(error);
	    });
	  };
	  request.send();
	}
	
	function createSourceAndGain(buffer) {
	  var gainNode = context.createGain();
	  gainNode.connect(masterGain);
	
	  var source = context.createBufferSource();
	  source.buffer = buffer;
	  source.connect(gainNode);
	  source.connect(masterGain);
	  return { source: source, gainNode: gainNode };
	}
	
	function randomInt(min, max) {
	  return Math.floor(random(min, max));
	}
	
	function random(min, max) {
	  return Math.random() * (max - min) + min;
	}

/***/ },
/* 32 */
/***/ function(module, exports) {

	module.exports = "\n    <div>\n      <div class=\"text-medium editorMenuBottom\" slot=\"menuBottom\">\n        <div>\n          <span v-on:click=\"changeBrushSize(-1)\" class=\"cursor-pointer\">-</span>\n          <span>Brushsize ({{model.brushSize}})</span>\n          <span v-on:click=\"changeBrushSize(1)\" class=\"cursor-pointer\">+</span>\n        </div>\n        <div class=\"mapEditorSteps\">\n          <span\n            v-for=\"tool in model.tools\" class=\"cursor-pointer\"\n            :class=\"{ 'currentTool' : tool === model.selectedTool }\"\n            :style=\"{ color: tool.color }\"\n            v-on:click=\"selectTool(tool)\">{{tool.name}}</span>\n          <span v-on:click=\"done()\" class=\"cursor-pointer\">Save map</span>\n        </div>\n      </div>\n    </div>\n";

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(34)
	__vue_script__ = __webpack_require__(36)
	__vue_template__ = __webpack_require__(44)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/johannes/git/raycing/cordova/www/src/vues/play.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(35);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-9a3121dc&file=play.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./play.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-9a3121dc&file=play.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./play.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, "\n  .playMenuBottom {\n    padding-top: 7vh;\n  }\n", "", {"version":3,"sources":["/./cordova/www/src/vues/play.vue.style"],"names":[],"mappings":";EAqLA;IACA,iBAAA;GACA","file":"play.vue","sourcesContent":["<template>\n  <div class=\"text-medium playMenuBottom\" slot=\"menuBottom\">{{model.text}}</div>\n</template>\n\n<script lang=\"babel\">\n  import * as view from './services/view';\n  import * as storage from './services/storage';\n  import * as animation from './services/animation';\n  import * as audio from './services/audio';\n  import Paper from 'paper';\n  import Game from '../game/game';\n  import Player from './player';\n  import svgMenu from './svgMenu.vue'\n\n  var model = {\n    text: ''\n  };\n  var course;\n  var game;\n  var controls;\n  var controlAnimations;\n  var players;\n  var playerConfigs;\n  var foreGround;\n  var mouseControls;\n  var mousewheelListener;\n  var gestureendListener;\n\n  function created() {\n    this.menu = 'none';\n    this.smallButtons = true;\n    this.showTitle = false;\n    model.text = '';\n    var numberOfPlayers = parseInt(this.$route.params.playerCount);\n    var jsonMap = storage.Get(this.$route.params.key).map;\n    var track = Paper.project.importJSON(jsonMap.Track);\n    var start = Paper.project.importJSON(jsonMap.Startzone);\n    var end = Paper.project.importJSON(jsonMap.Endzone);\n\n    track.fillColor = 'purple';\n    start.fillColor = 'green';\n    end.fillColor = 'yellow';\n\n    course = new Paper.Group(track, start, end);\n    view.addCourse(course);\n\n    controls = new Paper.Group();\n    controlAnimations = [];\n    players = [];\n    playerConfigs = [\n      { name: 'Yellow', color: '#ffff00' },\n      { name: 'Blue', color: '#0000ff' },\n      { name: 'Red', color: '#ff0000' },\n      { name: 'Green', color: '#00ff00' },\n    ];\n\n    foreGround = new Paper.Group([controls]);\n\n    mouseControls = new Paper.Tool();\n    mouseControls.onMouseDown = e => onMouseDown(e);\n    mouseControls.activate();\n\n    mousewheelListener = document.addEventListener('mousewheel', event => {\n      if(event.wheelDelta === 0) return;\n      mousewheel(event.wheelDelta < 0);\n    });\n\n    gestureendListener = document.addEventListener('gestureend', e => mousewheel(e.scale < 1), false);\n\n    // start game\n    game = new Game(track, start, end, numberOfPlayers);\n    game.vectorsForControlsStream.onValue(controls => drawControls(controls));\n    game.playerPositionStream.onValue(playerAndPosition => addPlayerPosition(playerAndPosition.playerIndex, playerAndPosition.position));\n    game.gameEndedStream.onValue(endGame.bind(this));\n\n    for (var i = 0; i < numberOfPlayers; i++) {\n      players.push(new Player(playerConfigs.pop()));\n    }\n\n    players.forEach(p => foreGround.appendBottom(p.elements));\n\n    game.startGame();\n  }\n\n  function destroyed() {\n    course.remove();\n    foreGround.remove();\n    mouseControls.remove();\n\n    document.removeEventListener('gestureend', gestureendListener);\n    document.removeEventListener('mosewheel', mousewheelListener);\n  }\n\n  function drawControls(positions) {\n    clearControls();\n    var circles = positions.map(position => createControl(position));\n    controlAnimations = circles.map(circle => animation.add(elapsedTime => {\n      circle.scale(1 + (Math.sin(elapsedTime * 10) / 100));\n    }));\n    circles.forEach(circle => controls.addChild(circle));\n\n    setViewToControls();\n  }\n\n  function createControl(position) {\n    var currentPlayer = players[game.currentPlayerIndex];\n    var circle = currentPlayer.createPositionElement(position, currentPlayer.radius);\n    circle.movePlayerData = position;\n    circle.opacity = 0.5;\n    return circle;\n  }\n\n  function clearControls() {\n    controls.removeChildren();\n    controlAnimations.forEach(animation => animation.remove());\n  }\n\n  function setViewToControls() {\n    var bounds = controls.bounds;\n\n    if(game.currentPlayer.position) {\n      bounds = bounds.include(game.currentPlayer.position);\n    }\n\n    view.setView(bounds.expand(200));\n  }\n\n  function setViewToTrack() {\n    view.setView(game.track.bounds);\n  }\n\n  function addPlayerPosition(playerIndex, position) {\n    players[playerIndex].addPosition(position);\n  }\n\n  function endGame(endState) {\n    clearControls();\n    this.menu = 'medium';\n    this.smallButtons = false;\n    model.text = endState.winningPlayerIndex < 0 ?\n      'Everybody crashed, you all lost!' :\n      `Game over, player ${endState.winningPlayerIndex + 1} won in ${endState.moves} moves!`;\n  }\n\n  function onMouseDown(event) {\n    audio.playClick();\n    var item = event.getItem();\n    if(!item){\n      return;\n    }\n    var itemClicked = item.hitTest(event.point).item;\n    if(itemClicked && itemClicked.movePlayerData){\n      game.movePlayer(itemClicked.movePlayerData);\n    }\n  }\n\n  function mousewheel(shouldZoomOut){\n    if(shouldZoomOut) {\n      setViewToTrack();\n    } else {\n      setViewToControls();\n    }\n  }\n\n  export default {\n    props: [ 'menu', 'smallButtons', 'showTitle' ],\n    created,\n    destroyed,\n    data() {\n      return { model }\n    },\n    components: {\n      svgMenu\n    },\n    methods: {\n\n    }\n  }\n</script>\n\n<style>\n  .playMenuBottom {\n    padding-top: 7vh;\n  }\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _view = __webpack_require__(3);
	
	var view = _interopRequireWildcard(_view);
	
	var _storage = __webpack_require__(7);
	
	var storage = _interopRequireWildcard(_storage);
	
	var _animation = __webpack_require__(6);
	
	var animation = _interopRequireWildcard(_animation);
	
	var _audio = __webpack_require__(31);
	
	var audio = _interopRequireWildcard(_audio);
	
	var _paper = __webpack_require__(4);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	var _game = __webpack_require__(37);
	
	var _game2 = _interopRequireDefault(_game);
	
	var _player = __webpack_require__(43);
	
	var _player2 = _interopRequireDefault(_player);
	
	var _svgMenu = __webpack_require__(9);
	
	var _svgMenu2 = _interopRequireDefault(_svgMenu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	// <template>
	//   <div class="text-medium playMenuBottom" slot="menuBottom">{{model.text}}</div>
	// </template>
	
	// <script lang="babel">
	
	var model = {
	  text: ''
	};
	var course;
	var game;
	var controls;
	var controlAnimations;
	var players;
	var playerConfigs;
	var foreGround;
	var mouseControls;
	var mousewheelListener;
	var gestureendListener;
	
	function created() {
	  this.menu = 'none';
	  this.smallButtons = true;
	  this.showTitle = false;
	  model.text = '';
	  var numberOfPlayers = parseInt(this.$route.params.playerCount);
	  var jsonMap = storage.Get(this.$route.params.key).map;
	  var track = _paper2.default.project.importJSON(jsonMap.Track);
	  var start = _paper2.default.project.importJSON(jsonMap.Startzone);
	  var end = _paper2.default.project.importJSON(jsonMap.Endzone);
	
	  track.fillColor = 'purple';
	  start.fillColor = 'green';
	  end.fillColor = 'yellow';
	
	  course = new _paper2.default.Group(track, start, end);
	  view.addCourse(course);
	
	  controls = new _paper2.default.Group();
	  controlAnimations = [];
	  players = [];
	  playerConfigs = [{ name: 'Yellow', color: '#ffff00' }, { name: 'Blue', color: '#0000ff' }, { name: 'Red', color: '#ff0000' }, { name: 'Green', color: '#00ff00' }];
	
	  foreGround = new _paper2.default.Group([controls]);
	
	  mouseControls = new _paper2.default.Tool();
	  mouseControls.onMouseDown = function (e) {
	    return onMouseDown(e);
	  };
	  mouseControls.activate();
	
	  mousewheelListener = document.addEventListener('mousewheel', function (event) {
	    if (event.wheelDelta === 0) return;
	    mousewheel(event.wheelDelta < 0);
	  });
	
	  gestureendListener = document.addEventListener('gestureend', function (e) {
	    return mousewheel(e.scale < 1);
	  }, false);
	
	  // start game
	  game = new _game2.default(track, start, end, numberOfPlayers);
	  game.vectorsForControlsStream.onValue(function (controls) {
	    return drawControls(controls);
	  });
	  game.playerPositionStream.onValue(function (playerAndPosition) {
	    return addPlayerPosition(playerAndPosition.playerIndex, playerAndPosition.position);
	  });
	  game.gameEndedStream.onValue(endGame.bind(this));
	
	  for (var i = 0; i < numberOfPlayers; i++) {
	    players.push(new _player2.default(playerConfigs.pop()));
	  }
	
	  players.forEach(function (p) {
	    return foreGround.appendBottom(p.elements);
	  });
	
	  game.startGame();
	}
	
	function destroyed() {
	  course.remove();
	  foreGround.remove();
	  mouseControls.remove();
	
	  document.removeEventListener('gestureend', gestureendListener);
	  document.removeEventListener('mosewheel', mousewheelListener);
	}
	
	function drawControls(positions) {
	  clearControls();
	  var circles = positions.map(function (position) {
	    return createControl(position);
	  });
	  controlAnimations = circles.map(function (circle) {
	    return animation.add(function (elapsedTime) {
	      circle.scale(1 + Math.sin(elapsedTime * 10) / 100);
	    });
	  });
	  circles.forEach(function (circle) {
	    return controls.addChild(circle);
	  });
	
	  setViewToControls();
	}
	
	function createControl(position) {
	  var currentPlayer = players[game.currentPlayerIndex];
	  var circle = currentPlayer.createPositionElement(position, currentPlayer.radius);
	  circle.movePlayerData = position;
	  circle.opacity = 0.5;
	  return circle;
	}
	
	function clearControls() {
	  controls.removeChildren();
	  controlAnimations.forEach(function (animation) {
	    return animation.remove();
	  });
	}
	
	function setViewToControls() {
	  var bounds = controls.bounds;
	
	  if (game.currentPlayer.position) {
	    bounds = bounds.include(game.currentPlayer.position);
	  }
	
	  view.setView(bounds.expand(200));
	}
	
	function setViewToTrack() {
	  view.setView(game.track.bounds);
	}
	
	function addPlayerPosition(playerIndex, position) {
	  players[playerIndex].addPosition(position);
	}
	
	function endGame(endState) {
	  clearControls();
	  this.menu = 'medium';
	  this.smallButtons = false;
	  model.text = endState.winningPlayerIndex < 0 ? 'Everybody crashed, you all lost!' : 'Game over, player ' + (endState.winningPlayerIndex + 1) + ' won in ' + endState.moves + ' moves!';
	}
	
	function onMouseDown(event) {
	  audio.playClick();
	  var item = event.getItem();
	  if (!item) {
	    return;
	  }
	  var itemClicked = item.hitTest(event.point).item;
	  if (itemClicked && itemClicked.movePlayerData) {
	    game.movePlayer(itemClicked.movePlayerData);
	  }
	}
	
	function mousewheel(shouldZoomOut) {
	  if (shouldZoomOut) {
	    setViewToTrack();
	  } else {
	    setViewToControls();
	  }
	}
	
	exports.default = {
	  props: ['menu', 'smallButtons', 'showTitle'],
	  created: created,
	  destroyed: destroyed,
	  data: function data() {
	    return { model: model };
	  },
	
	  components: {
	    svgMenu: _svgMenu2.default
	  },
	  methods: {}
	};
	// </script>

	// <style>
	//   .playMenuBottom {
	//     padding-top: 7vh;
	//   }
	// </style>

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _car = __webpack_require__(38);
	
	var _car2 = _interopRequireDefault(_car);
	
	var _paper = __webpack_require__(4);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	var _baconjs = __webpack_require__(39);
	
	var _baconjs2 = _interopRequireDefault(_baconjs);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Game = function () {
	  function Game(track, start, end, nbrOfPlayers) {
	    _classCallCheck(this, Game);
	
	    this.vectorsForControlsStream = new _baconjs2.default.Bus();
	    this.gameEndedStream = new _baconjs2.default.Bus();
	    this.playerPositionStream = new _baconjs2.default.Bus();
	    this.scale = 20;
	    this.players = [];
	    this.track = track;
	    this.start = start;
	    this.end = end;
	    this.currentPlayerIndex = 0;
	
	    for (var i = 0; i < nbrOfPlayers; i++) {
	      this.players.push(new _car2.default(this.scale));
	    }
	  }
	
	  _createClass(Game, [{
	    key: 'startGame',
	    value: function startGame() {
	      this.setVectorsForControls();
	    }
	  }, {
	    key: 'setVectorsForControls',
	    value: function setVectorsForControls() {
	      var _this = this;
	
	      var player = this.currentPlayer;
	      var vectorsForControls = [];
	
	      if (player.position) {
	        player.getPossibleMoves().forEach(function (position) {
	          if (!_this.isPositionOccupied(position) && _this.track.contains(position)) {
	            vectorsForControls.push(position);
	          }
	        });
	      } else {
	        vectorsForControls = this.getAllowedStartPositions();
	      }
	
	      if (vectorsForControls.length === 0) {
	        player.isAlive = false;
	      } else {
	        this.vectorsForControlsStream.push(vectorsForControls);
	      }
	    }
	  }, {
	    key: 'getAllowedStartPositions',
	    value: function getAllowedStartPositions() {
	      var scale = this.scale;
	      var bounds = this.start.bounds;
	
	      var x_start = Math.ceil(bounds.left / scale) * scale;
	      var x_end = Math.floor(bounds.right / scale) * scale;
	
	      var y_start = Math.ceil(bounds.top / scale) * scale;
	      var y_end = Math.floor(bounds.bottom / scale) * scale;
	
	      var startingPoints = [];
	
	      for (var x = x_start; x <= x_end; x += scale) {
	        for (var y = y_start; y <= y_end; y += scale) {
	          var point = new _paper2.default.Point(x, y);
	          if (this.start.contains(point) && !this.isPositionOccupied(point)) {
	            startingPoints.push(point);
	          }
	        }
	      }
	
	      return startingPoints;
	    }
	  }, {
	    key: 'movePlayer',
	    value: function movePlayer(position) {
	      var player = this.currentPlayer;
	      if (player.position) {
	        player.move(position);
	      } else {
	        player.setStartPosition(position);
	      }
	
	      this.playerPositionStream.push({ playerIndex: this.currentPlayerIndex, position: player.position });
	
	      if (this.isInZone(this.end, player.position)) {
	        var moves = player.moves;
	        this.gameEndedStream.push({ winningPlayerIndex: this.currentPlayerIndex, moves: moves });
	      } else {
	        this.nextTurn();
	      }
	    }
	  }, {
	    key: 'nextTurn',
	    value: function nextTurn() {
	      this.setNextPlayer();
	      this.setVectorsForControls();
	      if (this.players.filter(function (p) {
	        return p.isAlive;
	      }).length === 0) {
	        this.gameEndedStream.push({ winningPlayerIndex: -1 });
	      } else if (!this.currentPlayer.isAlive) {
	        this.nextTurn();
	      }
	    }
	  }, {
	    key: 'setNextPlayer',
	    value: function setNextPlayer() {
	      this.currentPlayerIndex++;
	      if (this.currentPlayerIndex === this.players.length) {
	        this.currentPlayerIndex = 0;
	      }
	    }
	  }, {
	    key: 'isPositionOccupied',
	    value: function isPositionOccupied(position) {
	      var carsOnThisPosition = this.players.filter(function (p) {
	        return p.position && p.position.clone().subtract(position).length === 0;
	      });
	      return carsOnThisPosition.length !== 0;
	    }
	  }, {
	    key: 'isInZone',
	    value: function isInZone(zone, position) {
	      return zone.contains(position);
	    }
	  }, {
	    key: 'currentPlayer',
	    get: function get() {
	      return this.players[this.currentPlayerIndex];
	    }
	  }]);
	
	  return Game;
	}();
	
	exports.default = Game;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _paper = __webpack_require__(4);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Car = function () {
	  function Car(scale) {
	    _classCallCheck(this, Car);
	
	    this.scale = scale;
	    this.positions = [];
	    this.isAlive = true;
	    this.isInEndZone = false;
	  }
	
	  _createClass(Car, [{
	    key: 'getPossibleMoves',
	    value: function getPossibleMoves() {
	      var possibleMoves = [];
	
	      for (var x = -1; x <= 1; x++) {
	        for (var y = -1; y <= 1; y++) {
	          var direction = new _paper2.default.Point(this.scale * x, this.scale * y).add(this.direction);
	          var position = direction.clone().add(this.position);
	
	          possibleMoves.push(position);
	        }
	      }
	
	      return possibleMoves;
	    }
	  }, {
	    key: 'move',
	    value: function move(position) {
	      if (!this.position) {
	        throw 'Cannot move, has no start position';
	      }
	
	      this.positions.push(position);
	    }
	  }, {
	    key: 'setStartPosition',
	    value: function setStartPosition(position) {
	      if (this.position) {
	        throw 'Cannot set start position, already has position';
	      }
	
	      this.positions.push(position);
	    }
	  }, {
	    key: 'position',
	    get: function get() {
	      if (this.positions.length > 0) {
	        return this.positions[this.positions.length - 1];
	      }
	
	      return null;
	    }
	  }, {
	    key: 'direction',
	    get: function get() {
	      if (this.positions.length < 2) {
	        return new _paper2.default.Point(0, 0);
	      }
	
	      var currentPosition = this.positions[this.positions.length - 1];
	      var previousPosition = this.positions[this.positions.length - 2];
	
	      return currentPosition.clone().subtract(previousPosition);
	    }
	  }, {
	    key: 'moves',
	    get: function get() {
	      return Math.max(this.positions.length - 1, 0);
	    }
	  }]);
	
	  return Car;
	}();
	
	exports.default = Car;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {(function() {
	var _slice = Array.prototype.slice;
	var Bacon = {
	  toString: function () {
	    return "Bacon";
	  }
	};
	
	Bacon.version = '0.7.83';
	
	var Exception = (typeof global !== "undefined" && global !== null ? global : this).Error;
	var nop = function () {};
	var latter = function (_, x) {
	  return x;
	};
	var former = function (x, _) {
	  return x;
	};
	var cloneArray = function (xs) {
	  return xs.slice(0);
	};
	var assert = function (message, condition) {
	  if (!condition) {
	    throw new Exception(message);
	  }
	};
	var assertObservableIsProperty = function (x) {
	  if ((x != null ? x._isObservable : void 0) && !(x != null ? x._isProperty : void 0)) {
	    throw new Exception("Observable is not a Property : " + x);
	  }
	};
	var assertEventStream = function (event) {
	  if (!(event != null ? event._isEventStream : void 0)) {
	    throw new Exception("not an EventStream : " + event);
	  }
	};
	
	var assertObservable = function (event) {
	  if (!(event != null ? event._isObservable : void 0)) {
	    throw new Exception("not an Observable : " + event);
	  }
	};
	var assertFunction = function (f) {
	  return assert("not a function : " + f, _.isFunction(f));
	};
	var isArray = function (xs) {
	  return xs instanceof Array;
	};
	var isObservable = function (x) {
	  return x && x._isObservable;
	};
	var assertArray = function (xs) {
	  if (!isArray(xs)) {
	    throw new Exception("not an array : " + xs);
	  }
	};
	var assertNoArguments = function (args) {
	  return assert("no arguments supported", args.length === 0);
	};
	var assertString = function (x) {
	  if (typeof x === "string") {
	    throw new Exception("not a string : " + x);
	  }
	};
	
	var extend = function (target) {
	  var length = arguments.length;
	  for (var i = 1; 1 < length ? i < length : i > length; 1 < length ? i++ : i--) {
	    for (var prop in arguments[i]) {
	      target[prop] = arguments[i][prop];
	    }
	  }
	  return target;
	};
	
	var inherit = function (child, parent) {
	  var hasProp = ({}).hasOwnProperty;
	  var ctor = function () {};
	  ctor.prototype = parent.prototype;
	  child.prototype = new ctor();
	  for (var key in parent) {
	    if (hasProp.call(parent, key)) {
	      child[key] = parent[key];
	    }
	  }
	  return child;
	};
	
	var _ = {
	  indexOf: (function () {
	    if (Array.prototype.indexOf) {
	      return function (xs, x) {
	        return xs.indexOf(x);
	      };
	    } else {
	      return function (xs, x) {
	        for (var i = 0, y; i < xs.length; i++) {
	          y = xs[i];
	          if (x === y) {
	            return i;
	          }
	        }
	        return -1;
	      };
	    }
	  })(),
	  indexWhere: function (xs, f) {
	    for (var i = 0, y; i < xs.length; i++) {
	      y = xs[i];
	      if (f(y)) {
	        return i;
	      }
	    }
	    return -1;
	  },
	  head: function (xs) {
	    return xs[0];
	  },
	  always: function (x) {
	    return function () {
	      return x;
	    };
	  },
	  negate: function (f) {
	    return function (x) {
	      return !f(x);
	    };
	  },
	  empty: function (xs) {
	    return xs.length === 0;
	  },
	  tail: function (xs) {
	    return xs.slice(1, xs.length);
	  },
	  filter: function (f, xs) {
	    var filtered = [];
	    for (var i = 0, x; i < xs.length; i++) {
	      x = xs[i];
	      if (f(x)) {
	        filtered.push(x);
	      }
	    }
	    return filtered;
	  },
	  map: function (f, xs) {
	    return (function () {
	      var result = [];
	      for (var i = 0, x; i < xs.length; i++) {
	        x = xs[i];
	        result.push(f(x));
	      }
	      return result;
	    })();
	  },
	  each: function (xs, f) {
	    for (var key in xs) {
	      if (Object.prototype.hasOwnProperty.call(xs, key)) {
	        var value = xs[key];
	        f(key, value);
	      }
	    }
	  },
	  toArray: function (xs) {
	    return isArray(xs) ? xs : [xs];
	  },
	  contains: function (xs, x) {
	    return _.indexOf(xs, x) !== -1;
	  },
	  id: function (x) {
	    return x;
	  },
	  last: function (xs) {
	    return xs[xs.length - 1];
	  },
	  all: function (xs) {
	    var f = arguments.length <= 1 || arguments[1] === undefined ? _.id : arguments[1];
	
	    for (var i = 0, x; i < xs.length; i++) {
	      x = xs[i];
	      if (!f(x)) {
	        return false;
	      }
	    }
	    return true;
	  },
	  any: function (xs) {
	    var f = arguments.length <= 1 || arguments[1] === undefined ? _.id : arguments[1];
	
	    for (var i = 0, x; i < xs.length; i++) {
	      x = xs[i];
	      if (f(x)) {
	        return true;
	      }
	    }
	    return false;
	  },
	  without: function (x, xs) {
	    return _.filter(function (y) {
	      return y !== x;
	    }, xs);
	  },
	  remove: function (x, xs) {
	    var i = _.indexOf(xs, x);
	    if (i >= 0) {
	      return xs.splice(i, 1);
	    }
	  },
	  fold: function (xs, seed, f) {
	    for (var i = 0, x; i < xs.length; i++) {
	      x = xs[i];
	      seed = f(seed, x);
	    }
	    return seed;
	  },
	  flatMap: function (f, xs) {
	    return _.fold(xs, [], function (ys, x) {
	      return ys.concat(f(x));
	    });
	  },
	  cached: function (f) {
	    var value = None;
	    return function () {
	      if (typeof value !== "undefined" && value !== null ? value._isNone : undefined) {
	        value = f();
	        f = undefined;
	      }
	      return value;
	    };
	  },
	  bind: function (fn, me) {
	    return function () {
	      return fn.apply(me, arguments);
	    };
	  },
	  isFunction: function (f) {
	    return typeof f === "function";
	  },
	  toString: function (obj) {
	    var internals, key, value;
	    var hasProp = ({}).hasOwnProperty;
	    try {
	      recursionDepth++;
	      if (obj == null) {
	        return "undefined";
	      } else if (_.isFunction(obj)) {
	        return "function";
	      } else if (isArray(obj)) {
	        if (recursionDepth > 5) {
	          return "[..]";
	        }
	        return "[" + _.map(_.toString, obj).toString() + "]";
	      } else if ((obj != null ? obj.toString : void 0) != null && obj.toString !== Object.prototype.toString) {
	        return obj.toString();
	      } else if (typeof obj === "object") {
	        if (recursionDepth > 5) {
	          return "{..}";
	        }
	        internals = (function () {
	          var results = [];
	          for (key in obj) {
	            if (!hasProp.call(obj, key)) continue;
	            value = (function () {
	              var error;
	              try {
	                return obj[key];
	              } catch (error) {
	                return error;
	              }
	            })();
	            results.push(_.toString(key) + ":" + _.toString(value));
	          }
	          return results;
	        })();
	        return "{" + internals + "}";
	      } else {
	        return obj;
	      }
	    } finally {
	      recursionDepth--;
	    }
	  }
	};
	
	var recursionDepth = 0;
	
	Bacon._ = _;
	
	var UpdateBarrier = Bacon.UpdateBarrier = (function () {
	  var rootEvent;
	  var waiterObs = [];
	  var waiters = {};
	  var afters = [];
	  var aftersIndex = 0;
	  var flushed = {};
	
	  var afterTransaction = function (f) {
	    if (rootEvent) {
	      return afters.push(f);
	    } else {
	      return f();
	    }
	  };
	
	  var whenDoneWith = function (obs, f) {
	    if (rootEvent) {
	      var obsWaiters = waiters[obs.id];
	      if (!(typeof obsWaiters !== "undefined" && obsWaiters !== null)) {
	        obsWaiters = waiters[obs.id] = [f];
	        return waiterObs.push(obs);
	      } else {
	        return obsWaiters.push(f);
	      }
	    } else {
	      return f();
	    }
	  };
	
	  var flush = function () {
	    while (waiterObs.length > 0) {
	      flushWaiters(0, true);
	    }
	    flushed = {};
	  };
	
	  var flushWaiters = function (index, deps) {
	    var obs = waiterObs[index];
	    var obsId = obs.id;
	    var obsWaiters = waiters[obsId];
	    waiterObs.splice(index, 1);
	    delete waiters[obsId];
	    if (deps && waiterObs.length > 0) {
	      flushDepsOf(obs);
	    }
	    for (var i = 0, f; i < obsWaiters.length; i++) {
	      f = obsWaiters[i];
	      f();
	    }
	  };
	
	  var flushDepsOf = function (obs) {
	    if (flushed[obs.id]) return;
	    var deps = obs.internalDeps();
	    for (var i = 0, dep; i < deps.length; i++) {
	      dep = deps[i];
	      flushDepsOf(dep);
	      if (waiters[dep.id]) {
	        var index = _.indexOf(waiterObs, dep);
	        flushWaiters(index, false);
	      }
	    }
	    flushed[obs.id] = true;
	  };
	
	  var inTransaction = function (event, context, f, args) {
	    if (rootEvent) {
	      return f.apply(context, args);
	    } else {
	      rootEvent = event;
	      try {
	        var result = f.apply(context, args);
	
	        flush();
	      } finally {
	        rootEvent = undefined;
	        while (aftersIndex < afters.length) {
	          var after = afters[aftersIndex];
	          aftersIndex++;
	          after();
	        }
	        aftersIndex = 0;
	        afters = [];
	      }
	      return result;
	    }
	  };
	
	  var currentEventId = function () {
	    return rootEvent ? rootEvent.id : undefined;
	  };
	
	  var wrappedSubscribe = function (obs, sink) {
	    var unsubd = false;
	    var shouldUnsub = false;
	    var doUnsub = function () {
	      shouldUnsub = true;
	      return shouldUnsub;
	    };
	    var unsub = function () {
	      unsubd = true;
	      return doUnsub();
	    };
	    doUnsub = obs.dispatcher.subscribe(function (event) {
	      return afterTransaction(function () {
	        if (!unsubd) {
	          var reply = sink(event);
	          if (reply === Bacon.noMore) {
	            return unsub();
	          }
	        }
	      });
	    });
	    if (shouldUnsub) {
	      doUnsub();
	    }
	    return unsub;
	  };
	
	  var hasWaiters = function () {
	    return waiterObs.length > 0;
	  };
	
	  return { whenDoneWith: whenDoneWith, hasWaiters: hasWaiters, inTransaction: inTransaction, currentEventId: currentEventId, wrappedSubscribe: wrappedSubscribe, afterTransaction: afterTransaction };
	})();
	
	function Source(obs, sync) {
	  var lazy = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
	
	  this.obs = obs;
	  this.sync = sync;
	  this.lazy = lazy;
	  this.queue = [];
	}
	
	extend(Source.prototype, {
	  _isSource: true,
	
	  subscribe: function (sink) {
	    return this.obs.dispatcher.subscribe(sink);
	  },
	  toString: function () {
	    return this.obs.toString();
	  },
	  markEnded: function () {
	    this.ended = true;
	    return true;
	  },
	  consume: function () {
	    if (this.lazy) {
	      return { value: _.always(this.queue[0]) };
	    } else {
	      return this.queue[0];
	    }
	  },
	  push: function (x) {
	    this.queue = [x];
	    return [x];
	  },
	  mayHave: function () {
	    return true;
	  },
	  hasAtLeast: function () {
	    return this.queue.length;
	  },
	  flatten: true
	});
	
	function ConsumingSource() {
	  Source.apply(this, arguments);
	}
	
	inherit(ConsumingSource, Source);
	extend(ConsumingSource.prototype, {
	  consume: function () {
	    return this.queue.shift();
	  },
	  push: function (x) {
	    return this.queue.push(x);
	  },
	  mayHave: function (c) {
	    return !this.ended || this.queue.length >= c;
	  },
	  hasAtLeast: function (c) {
	    return this.queue.length >= c;
	  },
	  flatten: false
	});
	
	function BufferingSource(obs) {
	  Source.call(this, obs, true);
	}
	
	inherit(BufferingSource, Source);
	extend(BufferingSource.prototype, {
	  consume: function () {
	    var values = this.queue;
	    this.queue = [];
	    return {
	      value: function () {
	        return values;
	      }
	    };
	  },
	  push: function (x) {
	    return this.queue.push(x.value());
	  },
	  hasAtLeast: function () {
	    return true;
	  }
	});
	
	Source.isTrigger = function (s) {
	  if (s != null ? s._isSource : void 0) {
	    return s.sync;
	  } else {
	    return s != null ? s._isEventStream : void 0;
	  }
	};
	
	Source.fromObservable = function (s) {
	  if (s != null ? s._isSource : void 0) {
	    return s;
	  } else if (s != null ? s._isProperty : void 0) {
	    return new Source(s, false);
	  } else {
	    return new ConsumingSource(s, true);
	  }
	};
	
	function Desc(context, method, args) {
	  this.context = context;
	  this.method = method;
	  this.args = args;
	}
	
	extend(Desc.prototype, {
	  _isDesc: true,
	  deps: function () {
	    if (!this.cached) {
	      this.cached = findDeps([this.context].concat(this.args));
	    }
	    return this.cached;
	  },
	  toString: function () {
	    return _.toString(this.context) + "." + _.toString(this.method) + "(" + _.map(_.toString, this.args) + ")";
	  }
	});
	
	var describe = function (context, method) {
	  var ref = context || method;
	  if (ref && ref._isDesc) {
	    return context || method;
	  } else {
	    for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	      args[_key - 2] = arguments[_key];
	    }
	
	    return new Desc(context, method, args);
	  }
	};
	
	var withDesc = function (desc, obs) {
	  obs.desc = desc;
	  return obs;
	};
	
	var findDeps = function (x) {
	  if (isArray(x)) {
	    return _.flatMap(findDeps, x);
	  } else if (isObservable(x)) {
	    return [x];
	  } else if (typeof x !== "undefined" && x !== null ? x._isSource : undefined) {
	    return [x.obs];
	  } else {
	    return [];
	  }
	};
	
	Bacon.Desc = Desc;
	Bacon.Desc.empty = new Bacon.Desc("", "", []);
	
	var withMethodCallSupport = function (wrapped) {
	  return function (f) {
	    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
	      args[_key2 - 1] = arguments[_key2];
	    }
	
	    if (typeof f === "object" && args.length) {
	      var context = f;
	      var methodName = args[0];
	      f = function () {
	        return context[methodName].apply(context, arguments);
	      };
	      args = args.slice(1);
	    }
	    return wrapped.apply(undefined, [f].concat(args));
	  };
	};
	
	var makeFunctionArgs = function (args) {
	  args = Array.prototype.slice.call(args);
	  return makeFunction_.apply(undefined, args);
	};
	
	var partiallyApplied = function (f, applied) {
	  return function () {
	    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	      args[_key3] = arguments[_key3];
	    }
	
	    return f.apply(undefined, applied.concat(args));
	  };
	};
	
	var toSimpleExtractor = function (args) {
	  return function (key) {
	    return function (value) {
	      if (!(typeof value !== "undefined" && value !== null)) {
	        return;
	      } else {
	        var fieldValue = value[key];
	        if (_.isFunction(fieldValue)) {
	          return fieldValue.apply(value, args);
	        } else {
	          return fieldValue;
	        }
	      }
	    };
	  };
	};
	
	var toFieldExtractor = function (f, args) {
	  var parts = f.slice(1).split(".");
	  var partFuncs = _.map(toSimpleExtractor(args), parts);
	  return function (value) {
	    for (var i = 0, f; i < partFuncs.length; i++) {
	      f = partFuncs[i];
	      value = f(value);
	    }
	    return value;
	  };
	};
	
	var isFieldKey = function (f) {
	  return typeof f === "string" && f.length > 1 && f.charAt(0) === ".";
	};
	
	var makeFunction_ = withMethodCallSupport(function (f) {
	  for (var _len4 = arguments.length, args = Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
	    args[_key4 - 1] = arguments[_key4];
	  }
	
	  if (_.isFunction(f)) {
	    if (args.length) {
	      return partiallyApplied(f, args);
	    } else {
	      return f;
	    }
	  } else if (isFieldKey(f)) {
	    return toFieldExtractor(f, args);
	  } else {
	    return _.always(f);
	  }
	});
	
	var makeFunction = function (f, args) {
	  return makeFunction_.apply(undefined, [f].concat(args));
	};
	
	var convertArgsToFunction = function (obs, f, args, method) {
	  if (typeof f !== "undefined" && f !== null ? f._isProperty : undefined) {
	    var sampled = f.sampledBy(obs, function (p, s) {
	      return [p, s];
	    });
	    return method.call(sampled, function (_ref) {
	      var p = _ref[0];
	      var s = _ref[1];
	      return p;
	    }).map(function (_ref2) {
	      var p = _ref2[0];
	      var s = _ref2[1];
	      return s;
	    });
	  } else {
	    f = makeFunction(f, args);
	    return method.call(obs, f);
	  }
	};
	
	var toCombinator = function (f) {
	  if (_.isFunction(f)) {
	    return f;
	  } else if (isFieldKey(f)) {
	    var key = toFieldKey(f);
	    return function (left, right) {
	      return left[key](right);
	    };
	  } else {
	    throw new Exception("not a function or a field key: " + f);
	  }
	};
	
	var toFieldKey = function (f) {
	  return f.slice(1);
	};
	
	function Some(value) {
	  this.value = value;
	}
	
	extend(Some.prototype, {
	  _isSome: true,
	  getOrElse: function () {
	    return this.value;
	  },
	  get: function () {
	    return this.value;
	  },
	  filter: function (f) {
	    if (f(this.value)) {
	      return new Some(this.value);
	    } else {
	      return None;
	    }
	  },
	  map: function (f) {
	    return new Some(f(this.value));
	  },
	  forEach: function (f) {
	    return f(this.value);
	  },
	  isDefined: true,
	  toArray: function () {
	    return [this.value];
	  },
	  inspect: function () {
	    return "Some(" + this.value + ")";
	  },
	  toString: function () {
	    return this.inspect();
	  }
	});
	
	var None = {
	  _isNone: true,
	  getOrElse: function (value) {
	    return value;
	  },
	  filter: function () {
	    return None;
	  },
	  map: function () {
	    return None;
	  },
	  forEach: function () {},
	  isDefined: false,
	  toArray: function () {
	    return [];
	  },
	  inspect: function () {
	    return "None";
	  },
	  toString: function () {
	    return this.inspect();
	  }
	};
	
	var toOption = function (v) {
	  if ((typeof v !== "undefined" && v !== null ? v._isSome : undefined) || (typeof v !== "undefined" && v !== null ? v._isNone : undefined)) {
	    return v;
	  } else {
	    return new Some(v);
	  }
	};
	
	Bacon.noMore = "<no-more>";
	Bacon.more = "<more>";
	
	var eventIdCounter = 0;
	
	function Event() {
	  this.id = ++eventIdCounter;
	}
	
	Event.prototype._isEvent = true;
	Event.prototype.isEvent = function () {
	  return true;
	};
	Event.prototype.isEnd = function () {
	  return false;
	};
	Event.prototype.isInitial = function () {
	  return false;
	};
	Event.prototype.isNext = function () {
	  return false;
	};
	Event.prototype.isError = function () {
	  return false;
	};
	Event.prototype.hasValue = function () {
	  return false;
	};
	Event.prototype.filter = function () {
	  return true;
	};
	Event.prototype.inspect = function () {
	  return this.toString();
	};
	Event.prototype.log = function () {
	  return this.toString();
	};
	
	function Next(valueF, eager) {
	  if (!(this instanceof Next)) {
	    return new Next(valueF, eager);
	  }
	
	  Event.call(this);
	
	  if (!eager && _.isFunction(valueF) || (valueF != null ? valueF._isNext : void 0)) {
	    this.valueF = valueF;
	    this.valueInternal = void 0;
	  } else {
	    this.valueF = void 0;
	    this.valueInternal = valueF;
	  }
	}
	
	inherit(Next, Event);
	
	Next.prototype.isNext = function () {
	  return true;
	};
	Next.prototype.hasValue = function () {
	  return true;
	};
	Next.prototype.value = function () {
	  var ref;
	  if ((ref = this.valueF) != null ? ref._isNext : void 0) {
	    this.valueInternal = this.valueF.value();
	    this.valueF = void 0;
	  } else if (this.valueF) {
	    this.valueInternal = this.valueF();
	    this.valueF = void 0;
	  }
	  return this.valueInternal;
	};
	
	Next.prototype.fmap = function (f) {
	  var event, value;
	  if (this.valueInternal) {
	    value = this.valueInternal;
	    return this.apply(function () {
	      return f(value);
	    });
	  } else {
	    event = this;
	    return this.apply(function () {
	      return f(event.value());
	    });
	  }
	};
	
	Next.prototype.apply = function (value) {
	  return new Next(value);
	};
	Next.prototype.filter = function (f) {
	  return f(this.value());
	};
	Next.prototype.toString = function () {
	  return _.toString(this.value());
	};
	Next.prototype.log = function () {
	  return this.value();
	};
	Next.prototype._isNext = true;
	
	function Initial(valueF, eager) {
	  if (!(this instanceof Initial)) {
	    return new Initial(valueF, eager);
	  }
	  Next.call(this, valueF, eager);
	}
	
	inherit(Initial, Next);
	Initial.prototype._isInitial = true;
	Initial.prototype.isInitial = function () {
	  return true;
	};
	Initial.prototype.isNext = function () {
	  return false;
	};
	Initial.prototype.apply = function (value) {
	  return new Initial(value);
	};
	Initial.prototype.toNext = function () {
	  return new Next(this);
	};
	
	function End() {
	  if (!(this instanceof End)) {
	    return new End();
	  }
	  Event.call(this);
	}
	
	inherit(End, Event);
	End.prototype.isEnd = function () {
	  return true;
	};
	End.prototype.fmap = function () {
	  return this;
	};
	End.prototype.apply = function () {
	  return this;
	};
	End.prototype.toString = function () {
	  return "<end>";
	};
	
	function Error(error) {
	  if (!(this instanceof Error)) {
	    return new Error(error);
	  }
	  this.error = error;
	  Event.call(this);
	}
	
	inherit(Error, Event);
	Error.prototype.isError = function () {
	  return true;
	};
	Error.prototype.fmap = function () {
	  return this;
	};
	Error.prototype.apply = function () {
	  return this;
	};
	Error.prototype.toString = function () {
	  return "<error> " + _.toString(this.error);
	};
	
	Bacon.Event = Event;
	Bacon.Initial = Initial;
	Bacon.Next = Next;
	Bacon.End = End;
	Bacon.Error = Error;
	
	var initialEvent = function (value) {
	  return new Initial(value, true);
	};
	var nextEvent = function (value) {
	  return new Next(value, true);
	};
	var endEvent = function () {
	  return new End();
	};
	var toEvent = function (x) {
	  if (x && x._isEvent) {
	    return x;
	  } else {
	    return nextEvent(x);
	  }
	};
	
	var idCounter = 0;
	var registerObs = function () {};
	
	function Observable(desc) {
	  this.desc = desc;
	  this.id = ++idCounter;
	  this.initialDesc = this.desc;
	}
	
	extend(Observable.prototype, {
	  _isObservable: true,
	
	  subscribe: function (sink) {
	    return UpdateBarrier.wrappedSubscribe(this, sink);
	  },
	
	  subscribeInternal: function (sink) {
	    return this.dispatcher.subscribe(sink);
	  },
	
	  onValue: function () {
	    var f = makeFunctionArgs(arguments);
	    return this.subscribe(function (event) {
	      if (event.hasValue()) {
	        return f(event.value());
	      }
	    });
	  },
	
	  onValues: function (f) {
	    return this.onValue(function (args) {
	      return f.apply(undefined, args);
	    });
	  },
	
	  onError: function () {
	    var f = makeFunctionArgs(arguments);
	    return this.subscribe(function (event) {
	      if (event.isError()) {
	        return f(event.error);
	      }
	    });
	  },
	
	  onEnd: function () {
	    var f = makeFunctionArgs(arguments);
	    return this.subscribe(function (event) {
	      if (event.isEnd()) {
	        return f();
	      }
	    });
	  },
	
	  name: function (name) {
	    this._name = name;
	    return this;
	  },
	
	  withDescription: function () {
	    this.desc = describe.apply(undefined, arguments);
	    return this;
	  },
	
	  toString: function () {
	    if (this._name) {
	      return this._name;
	    } else {
	      return this.desc.toString();
	    }
	  },
	
	  internalDeps: function () {
	    return this.initialDesc.deps();
	  }
	});
	
	Observable.prototype.assign = Observable.prototype.onValue;
	Observable.prototype.forEach = Observable.prototype.onValue;
	Observable.prototype.inspect = Observable.prototype.toString;
	
	Bacon.Observable = Observable;
	
	function CompositeUnsubscribe() {
	  var ss = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
	
	  this.unsubscribe = _.bind(this.unsubscribe, this);
	  this.unsubscribed = false;
	  this.subscriptions = [];
	  this.starting = [];
	  for (var i = 0, s; i < ss.length; i++) {
	    s = ss[i];
	    this.add(s);
	  }
	}
	
	extend(CompositeUnsubscribe.prototype, {
	  add: function (subscription) {
	    var _this2 = this;
	
	    if (this.unsubscribed) {
	      return;
	    }
	    var ended = false;
	    var unsub = nop;
	    this.starting.push(subscription);
	    var unsubMe = function () {
	      if (_this2.unsubscribed) {
	        return;
	      }
	      ended = true;
	      _this2.remove(unsub);
	      return _.remove(subscription, _this2.starting);
	    };
	    unsub = subscription(this.unsubscribe, unsubMe);
	    if (!(this.unsubscribed || ended)) {
	      this.subscriptions.push(unsub);
	    } else {
	      unsub();
	    }
	    _.remove(subscription, this.starting);
	    return unsub;
	  },
	
	  remove: function (unsub) {
	    if (this.unsubscribed) {
	      return;
	    }
	    if (_.remove(unsub, this.subscriptions) !== undefined) {
	      return unsub();
	    }
	  },
	
	  unsubscribe: function () {
	    if (this.unsubscribed) {
	      return;
	    }
	    this.unsubscribed = true;
	    var iterable = this.subscriptions;
	    for (var i = 0; i < iterable.length; i++) {
	      iterable[i]();
	    }
	    this.subscriptions = [];
	    this.starting = [];
	    return [];
	  },
	
	  count: function () {
	    if (this.unsubscribed) {
	      return 0;
	    }
	    return this.subscriptions.length + this.starting.length;
	  },
	
	  empty: function () {
	    return this.count() === 0;
	  }
	});
	
	Bacon.CompositeUnsubscribe = CompositeUnsubscribe;
	
	function Dispatcher(_subscribe, _handleEvent) {
	  this._subscribe = _subscribe;
	  this._handleEvent = _handleEvent;
	  this.subscribe = _.bind(this.subscribe, this);
	  this.handleEvent = _.bind(this.handleEvent, this);
	  this.pushing = false;
	  this.ended = false;
	  this.prevError = undefined;
	  this.unsubSrc = undefined;
	  this.subscriptions = [];
	  this.queue = [];
	}
	
	Dispatcher.prototype.hasSubscribers = function () {
	  return this.subscriptions.length > 0;
	};
	
	Dispatcher.prototype.removeSub = function (subscription) {
	  this.subscriptions = _.without(subscription, this.subscriptions);
	  return this.subscriptions;
	};
	
	Dispatcher.prototype.push = function (event) {
	  if (event.isEnd()) {
	    this.ended = true;
	  }
	  return UpdateBarrier.inTransaction(event, this, this.pushIt, [event]);
	};
	
	Dispatcher.prototype.pushToSubscriptions = function (event) {
	  try {
	    var tmp = this.subscriptions;
	    var len = tmp.length;
	    for (var i = 0; i < len; i++) {
	      var sub = tmp[i];
	      var reply = sub.sink(event);
	      if (reply === Bacon.noMore || event.isEnd()) {
	        this.removeSub(sub);
	      }
	    }
	    return true;
	  } catch (error) {
	    this.pushing = false;
	    this.queue = [];
	    throw error;
	  }
	};
	
	Dispatcher.prototype.pushIt = function (event) {
	  if (!this.pushing) {
	    if (event === this.prevError) {
	      return;
	    }
	    if (event.isError()) {
	      this.prevError = event;
	    }
	    this.pushing = true;
	    this.pushToSubscriptions(event);
	    this.pushing = false;
	    while (this.queue.length) {
	      event = this.queue.shift();
	      this.push(event);
	    }
	    if (this.hasSubscribers()) {
	      return Bacon.more;
	    } else {
	      this.unsubscribeFromSource();
	      return Bacon.noMore;
	    }
	  } else {
	    this.queue.push(event);
	    return Bacon.more;
	  }
	};
	
	Dispatcher.prototype.handleEvent = function (event) {
	  if (this._handleEvent) {
	    return this._handleEvent(event);
	  } else {
	    return this.push(event);
	  }
	};
	
	Dispatcher.prototype.unsubscribeFromSource = function () {
	  if (this.unsubSrc) {
	    this.unsubSrc();
	  }
	  this.unsubSrc = undefined;
	};
	
	Dispatcher.prototype.subscribe = function (sink) {
	  var subscription;
	  if (this.ended) {
	    sink(endEvent());
	    return nop;
	  } else {
	    assertFunction(sink);
	    subscription = {
	      sink: sink
	    };
	    this.subscriptions.push(subscription);
	    if (this.subscriptions.length === 1) {
	      this.unsubSrc = this._subscribe(this.handleEvent);
	      assertFunction(this.unsubSrc);
	    }
	    return (function (_this) {
	      return function () {
	        _this.removeSub(subscription);
	        if (!_this.hasSubscribers()) {
	          return _this.unsubscribeFromSource();
	        }
	      };
	    })(this);
	  }
	};
	
	Bacon.Dispatcher = Dispatcher;
	
	function EventStream(desc, subscribe, handler) {
	  if (!(this instanceof EventStream)) {
	    return new EventStream(desc, subscribe, handler);
	  }
	  if (_.isFunction(desc)) {
	    handler = subscribe;
	    subscribe = desc;
	    desc = Desc.empty;
	  }
	  Observable.call(this, desc);
	  assertFunction(subscribe);
	  this.dispatcher = new Dispatcher(subscribe, handler);
	  registerObs(this);
	}
	
	inherit(EventStream, Observable);
	extend(EventStream.prototype, {
	  _isEventStream: true,
	
	  toProperty: function (initValue_) {
	    var initValue = arguments.length === 0 ? None : toOption(function () {
	      return initValue_;
	    });
	    var disp = this.dispatcher;
	    var desc = new Bacon.Desc(this, "toProperty", [initValue_]);
	    return new Property(desc, function (sink) {
	      var initSent = false;
	      var subbed = false;
	      var unsub = nop;
	      var reply = Bacon.more;
	      var sendInit = function () {
	        if (!initSent) {
	          return initValue.forEach(function (value) {
	            initSent = true;
	            reply = sink(new Initial(value));
	            if (reply === Bacon.noMore) {
	              unsub();
	              unsub = nop;
	              return nop;
	            }
	          });
	        }
	      };
	
	      unsub = disp.subscribe(function (event) {
	        if (event.hasValue()) {
	          if (event.isInitial() && !subbed) {
	            initValue = new Some(function () {
	              return event.value();
	            });
	            return Bacon.more;
	          } else {
	            if (!event.isInitial()) {
	              sendInit();
	            }
	            initSent = true;
	            initValue = new Some(event);
	            return sink(event);
	          }
	        } else {
	          if (event.isEnd()) {
	            reply = sendInit();
	          }
	          if (reply !== Bacon.noMore) {
	            return sink(event);
	          }
	        }
	      });
	      subbed = true;
	      sendInit();
	      return unsub;
	    });
	  },
	
	  toEventStream: function () {
	    return this;
	  },
	
	  withHandler: function (handler) {
	    return new EventStream(new Bacon.Desc(this, "withHandler", [handler]), this.dispatcher.subscribe, handler);
	  }
	});
	
	Bacon.EventStream = EventStream;
	
	Bacon.never = function () {
	  return new EventStream(describe(Bacon, "never"), function (sink) {
	    sink(endEvent());
	    return nop;
	  });
	};
	
	Bacon.when = function () {
	  if (arguments.length === 0) {
	    return Bacon.never();
	  }
	  var len = arguments.length;
	  var usage = "when: expecting arguments in the form (Observable+,function)+";
	
	  assert(usage, len % 2 === 0);
	  var sources = [];
	  var pats = [];
	  var i = 0;
	  var patterns = [];
	  while (i < len) {
	    patterns[i] = arguments[i];
	    patterns[i + 1] = arguments[i + 1];
	    var patSources = _.toArray(arguments[i]);
	    var f = constantToFunction(arguments[i + 1]);
	    var pat = { f: f, ixs: [] };
	    var triggerFound = false;
	    for (var j = 0, s; j < patSources.length; j++) {
	      s = patSources[j];
	      var index = _.indexOf(sources, s);
	      if (!triggerFound) {
	        triggerFound = Source.isTrigger(s);
	      }
	      if (index < 0) {
	        sources.push(s);
	        index = sources.length - 1;
	      }
	      for (var k = 0, ix; k < pat.ixs.length; k++) {
	        ix = pat.ixs[k];
	        if (ix.index === index) {
	          ix.count++;
	        }
	      }
	      pat.ixs.push({ index: index, count: 1 });
	    }
	
	    assert("At least one EventStream required", triggerFound || !patSources.length);
	
	    if (patSources.length > 0) {
	      pats.push(pat);
	    }
	    i = i + 2;
	  }
	
	  if (!sources.length) {
	    return Bacon.never();
	  }
	
	  sources = _.map(Source.fromObservable, sources);
	  var needsBarrier = _.any(sources, function (s) {
	    return s.flatten;
	  }) && containsDuplicateDeps(_.map(function (s) {
	    return s.obs;
	  }, sources));
	
	  var desc = new Bacon.Desc(Bacon, "when", patterns);
	  var resultStream = new EventStream(desc, function (sink) {
	    var triggers = [];
	    var ends = false;
	    var match = function (p) {
	      for (var i1 = 0, i; i1 < p.ixs.length; i1++) {
	        i = p.ixs[i1];
	        if (!sources[i.index].hasAtLeast(i.count)) {
	          return false;
	        }
	      }
	      return true;
	    };
	    var cannotSync = function (source) {
	      return !source.sync || source.ended;
	    };
	    var cannotMatch = function (p) {
	      for (var i1 = 0, i; i1 < p.ixs.length; i1++) {
	        i = p.ixs[i1];
	        if (!sources[i.index].mayHave(i.count)) {
	          return true;
	        }
	      }
	    };
	    var nonFlattened = function (trigger) {
	      return !trigger.source.flatten;
	    };
	    var part = function (source) {
	      return function (unsubAll) {
	        var flushLater = function () {
	          return UpdateBarrier.whenDoneWith(resultStream, flush);
	        };
	        var flushWhileTriggers = function () {
	          if (triggers.length > 0) {
	            var reply = Bacon.more;
	            var trigger = triggers.pop();
	            for (var i1 = 0, p; i1 < pats.length; i1++) {
	              p = pats[i1];
	              if (match(p)) {
	                var events = (function () {
	                  var result = [];
	                  for (var i2 = 0, i; i2 < p.ixs.length; i2++) {
	                    i = p.ixs[i2];
	                    result.push(sources[i.index].consume());
	                  }
	                  return result;
	                })();
	                reply = sink(trigger.e.apply(function () {
	                  var _p;
	
	                  var values = (function () {
	                    var result = [];
	                    for (var i2 = 0, event; i2 < events.length; i2++) {
	                      event = events[i2];
	                      result.push(event.value());
	                    }
	                    return result;
	                  })();
	
	                  return (_p = p).f.apply(_p, values);
	                }));
	                if (triggers.length) {
	                  triggers = _.filter(nonFlattened, triggers);
	                }
	                if (reply === Bacon.noMore) {
	                  return reply;
	                } else {
	                  return flushWhileTriggers();
	                }
	              }
	            }
	          } else {
	            return Bacon.more;
	          }
	        };
	        var flush = function () {
	          var reply = flushWhileTriggers();
	          if (ends) {
	            if (_.all(sources, cannotSync) || _.all(pats, cannotMatch)) {
	              reply = Bacon.noMore;
	              sink(endEvent());
	            }
	          }
	          if (reply === Bacon.noMore) {
	            unsubAll();
	          }
	
	          return reply;
	        };
	        return source.subscribe(function (e) {
	          if (e.isEnd()) {
	            ends = true;
	            source.markEnded();
	            flushLater();
	          } else if (e.isError()) {
	            var reply = sink(e);
	          } else {
	            source.push(e);
	            if (source.sync) {
	              triggers.push({ source: source, e: e });
	              if (needsBarrier || UpdateBarrier.hasWaiters()) {
	                flushLater();
	              } else {
	                flush();
	              }
	            }
	          }
	          if (reply === Bacon.noMore) {
	            unsubAll();
	          }
	          return reply || Bacon.more;
	        });
	      };
	    };
	
	    return new Bacon.CompositeUnsubscribe((function () {
	      var result = [];
	      for (var i1 = 0, s; i1 < sources.length; i1++) {
	        s = sources[i1];
	        result.push(part(s));
	      }
	      return result;
	    })()).unsubscribe;
	  });
	  return resultStream;
	};
	
	var containsDuplicateDeps = function (observables) {
	  var state = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
	
	  var checkObservable = function (obs) {
	    if (_.contains(state, obs)) {
	      return true;
	    } else {
	      var deps = obs.internalDeps();
	      if (deps.length) {
	        state.push(obs);
	        return _.any(deps, checkObservable);
	      } else {
	        state.push(obs);
	        return false;
	      }
	    }
	  };
	
	  return _.any(observables, checkObservable);
	};
	
	var constantToFunction = function (f) {
	  if (_.isFunction(f)) {
	    return f;
	  } else {
	    return _.always(f);
	  }
	};
	
	Bacon.groupSimultaneous = function () {
	  for (var _len5 = arguments.length, streams = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	    streams[_key5] = arguments[_key5];
	  }
	
	  if (streams.length === 1 && isArray(streams[0])) {
	    streams = streams[0];
	  }
	  var sources = (function () {
	    var result = [];
	    for (var i = 0, s; i < streams.length; i++) {
	      s = streams[i];
	      result.push(new BufferingSource(s));
	    }
	    return result;
	  })();
	  return withDesc(new Bacon.Desc(Bacon, "groupSimultaneous", streams), Bacon.when(sources, function () {
	    for (var _len6 = arguments.length, xs = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	      xs[_key6] = arguments[_key6];
	    }
	
	    return xs;
	  }));
	};
	
	function PropertyDispatcher(property, subscribe, handleEvent) {
	  Dispatcher.call(this, subscribe, handleEvent);
	  this.property = property;
	  this.subscribe = _.bind(this.subscribe, this);
	  this.current = None;
	  this.currentValueRootId = undefined;
	  this.propertyEnded = false;
	}
	
	inherit(PropertyDispatcher, Dispatcher);
	extend(PropertyDispatcher.prototype, {
	  push: function (event) {
	    if (event.isEnd()) {
	      this.propertyEnded = true;
	    }
	    if (event.hasValue()) {
	      this.current = new Some(event);
	      this.currentValueRootId = UpdateBarrier.currentEventId();
	    }
	    return Dispatcher.prototype.push.call(this, event);
	  },
	
	  maybeSubSource: function (sink, reply) {
	    if (reply === Bacon.noMore) {
	      return nop;
	    } else if (this.propertyEnded) {
	      sink(endEvent());
	      return nop;
	    } else {
	      return Dispatcher.prototype.subscribe.call(this, sink);
	    }
	  },
	
	  subscribe: function (sink) {
	    var _this3 = this;
	
	    var initSent = false;
	
	    var reply = Bacon.more;
	
	    if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
	      var dispatchingId = UpdateBarrier.currentEventId();
	      var valId = this.currentValueRootId;
	      if (!this.propertyEnded && valId && dispatchingId && dispatchingId !== valId) {
	        UpdateBarrier.whenDoneWith(this.property, function () {
	          if (_this3.currentValueRootId === valId) {
	            return sink(initialEvent(_this3.current.get().value()));
	          }
	        });
	
	        return this.maybeSubSource(sink, reply);
	      } else {
	        UpdateBarrier.inTransaction(undefined, this, function () {
	          reply = sink(initialEvent(this.current.get().value()));
	          return reply;
	        }, []);
	        return this.maybeSubSource(sink, reply);
	      }
	    } else {
	      return this.maybeSubSource(sink, reply);
	    }
	  }
	});
	
	function Property(desc, subscribe, handler) {
	  Observable.call(this, desc);
	  assertFunction(subscribe);
	  this.dispatcher = new PropertyDispatcher(this, subscribe, handler);
	  registerObs(this);
	}
	
	inherit(Property, Observable);
	extend(Property.prototype, {
	  _isProperty: true,
	
	  changes: function () {
	    var _this4 = this;
	
	    return new EventStream(new Bacon.Desc(this, "changes", []), function (sink) {
	      return _this4.dispatcher.subscribe(function (event) {
	        if (!event.isInitial()) {
	          return sink(event);
	        }
	      });
	    });
	  },
	
	  withHandler: function (handler) {
	    return new Property(new Bacon.Desc(this, "withHandler", [handler]), this.dispatcher.subscribe, handler);
	  },
	
	  toProperty: function () {
	    assertNoArguments(arguments);
	    return this;
	  },
	
	  toEventStream: function () {
	    var _this5 = this;
	
	    return new EventStream(new Bacon.Desc(this, "toEventStream", []), function (sink) {
	      return _this5.dispatcher.subscribe(function (event) {
	        if (event.isInitial()) {
	          event = event.toNext();
	        }
	        return sink(event);
	      });
	    });
	  }
	});
	
	Bacon.Property = Property;
	
	Bacon.constant = function (value) {
	  return new Property(new Bacon.Desc(Bacon, "constant", [value]), function (sink) {
	    sink(initialEvent(value));
	    sink(endEvent());
	    return nop;
	  });
	};
	
	Bacon.fromBinder = function (binder) {
	  var eventTransformer = arguments.length <= 1 || arguments[1] === undefined ? _.id : arguments[1];
	
	  var desc = new Bacon.Desc(Bacon, "fromBinder", [binder, eventTransformer]);
	  return new EventStream(desc, function (sink) {
	    var unbound = false;
	    var shouldUnbind = false;
	    var unbind = function () {
	      if (!unbound) {
	        if (typeof unbinder !== "undefined" && unbinder !== null) {
	          unbinder();
	          return unbound = true;
	        } else {
	          return shouldUnbind = true;
	        }
	      }
	    };
	    var unbinder = binder(function () {
	      var ref;
	
	      for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
	        args[_key7] = arguments[_key7];
	      }
	
	      var value = eventTransformer.apply(this, args);
	      if (!(isArray(value) && ((ref = _.last(value)) != null ? ref._isEvent : undefined))) {
	        value = [value];
	      }
	      var reply = Bacon.more;
	      for (var i = 0, event; i < value.length; i++) {
	        event = value[i];
	        reply = sink(event = toEvent(event));
	        if (reply === Bacon.noMore || event.isEnd()) {
	          unbind();
	          return reply;
	        }
	      }
	      return reply;
	    });
	    if (shouldUnbind) {
	      unbind();
	    }
	    return unbind;
	  });
	};
	
	Bacon.Observable.prototype.map = function (p) {
	  for (var _len8 = arguments.length, args = Array(_len8 > 1 ? _len8 - 1 : 0), _key8 = 1; _key8 < _len8; _key8++) {
	    args[_key8 - 1] = arguments[_key8];
	  }
	
	  return convertArgsToFunction(this, p, args, function (f) {
	    return withDesc(new Bacon.Desc(this, "map", [f]), this.withHandler(function (event) {
	      return this.push(event.fmap(f));
	    }));
	  });
	};
	
	var argumentsToObservables = function (args) {
	  if (isArray(args[0])) {
	    return args[0];
	  } else {
	    return Array.prototype.slice.call(args);
	  }
	};
	
	var argumentsToObservablesAndFunction = function (args) {
	  if (_.isFunction(args[0])) {
	    return [argumentsToObservables(Array.prototype.slice.call(args, 1)), args[0]];
	  } else {
	    return [argumentsToObservables(Array.prototype.slice.call(args, 0, args.length - 1)), _.last(args)];
	  }
	};
	
	Bacon.combineAsArray = function () {
	  var streams = argumentsToObservables(arguments);
	  for (var index = 0, stream; index < streams.length; index++) {
	    stream = streams[index];
	    if (!isObservable(stream)) {
	      streams[index] = Bacon.constant(stream);
	    }
	  }
	  if (streams.length) {
	    var sources = (function () {
	      var result = [];
	      for (var i = 0, s; i < streams.length; i++) {
	        s = streams[i];
	        result.push(new Source(s, true));
	      }
	      return result;
	    })();
	    return withDesc(new Bacon.Desc(Bacon, "combineAsArray", streams), Bacon.when(sources, function () {
	      for (var _len9 = arguments.length, xs = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
	        xs[_key9] = arguments[_key9];
	      }
	
	      return xs;
	    }).toProperty());
	  } else {
	    return Bacon.constant([]);
	  }
	};
	
	Bacon.onValues = function () {
	  for (var _len10 = arguments.length, streams = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
	    streams[_key10] = arguments[_key10];
	  }
	
	  return Bacon.combineAsArray(streams.slice(0, streams.length - 1)).onValues(streams[streams.length - 1]);
	};
	
	Bacon.combineWith = function () {
	  var _argumentsToObservablesAndFunction = argumentsToObservablesAndFunction(arguments);
	
	  var streams = _argumentsToObservablesAndFunction[0];
	  var f = _argumentsToObservablesAndFunction[1];
	
	  var desc = new Bacon.Desc(Bacon, "combineWith", [f].concat(streams));
	  return withDesc(desc, Bacon.combineAsArray(streams).map(function (values) {
	    return f.apply(undefined, values);
	  }));
	};
	
	Bacon.Observable.prototype.combine = function (other, f) {
	  var combinator = toCombinator(f);
	  var desc = new Bacon.Desc(this, "combine", [other, f]);
	  return withDesc(desc, Bacon.combineAsArray(this, other).map(function (values) {
	    return combinator(values[0], values[1]);
	  }));
	};
	
	Bacon.Observable.prototype.withStateMachine = function (initState, f) {
	  var state = initState;
	  var desc = new Bacon.Desc(this, "withStateMachine", [initState, f]);
	  return withDesc(desc, this.withHandler(function (event) {
	    var fromF = f(state, event);
	    var newState = fromF[0];
	    var outputs = fromF[1];
	
	    state = newState;
	    var reply = Bacon.more;
	    for (var i = 0, output; i < outputs.length; i++) {
	      output = outputs[i];
	      reply = this.push(output);
	      if (reply === Bacon.noMore) {
	        return reply;
	      }
	    }
	    return reply;
	  }));
	};
	
	var equals = function (a, b) {
	  return a === b;
	};
	
	var isNone = function (object) {
	  return typeof object !== "undefined" && object !== null ? object._isNone : false;
	};
	
	Bacon.Observable.prototype.skipDuplicates = function () {
	  var isEqual = arguments.length <= 0 || arguments[0] === undefined ? equals : arguments[0];
	
	  var desc = new Bacon.Desc(this, "skipDuplicates", []);
	  return withDesc(desc, this.withStateMachine(None, function (prev, event) {
	    if (!event.hasValue()) {
	      return [prev, [event]];
	    } else if (event.isInitial() || isNone(prev) || !isEqual(prev.get(), event.value())) {
	      return [new Some(event.value()), [event]];
	    } else {
	      return [prev, []];
	    }
	  }));
	};
	
	Bacon.Observable.prototype.awaiting = function (other) {
	  var desc = new Bacon.Desc(this, "awaiting", [other]);
	  return withDesc(desc, Bacon.groupSimultaneous(this, other).map(function (values) {
	    return values[1].length === 0;
	  }).toProperty(false).skipDuplicates());
	};
	
	Bacon.Observable.prototype.not = function () {
	  return withDesc(new Bacon.Desc(this, "not", []), this.map(function (x) {
	    return !x;
	  }));
	};
	
	Bacon.Property.prototype.and = function (other) {
	  return withDesc(new Bacon.Desc(this, "and", [other]), this.combine(other, function (x, y) {
	    return x && y;
	  }));
	};
	
	Bacon.Property.prototype.or = function (other) {
	  return withDesc(new Bacon.Desc(this, "or", [other]), this.combine(other, function (x, y) {
	    return x || y;
	  }));
	};
	
	Bacon.scheduler = {
	  setTimeout: function (f, d) {
	    return setTimeout(f, d);
	  },
	  setInterval: function (f, i) {
	    return setInterval(f, i);
	  },
	  clearInterval: function (id) {
	    return clearInterval(id);
	  },
	  clearTimeout: function (id) {
	    return clearTimeout(id);
	  },
	  now: function () {
	    return new Date().getTime();
	  }
	};
	
	Bacon.EventStream.prototype.bufferWithTime = function (delay) {
	  return withDesc(new Bacon.Desc(this, "bufferWithTime", [delay]), this.bufferWithTimeOrCount(delay, Number.MAX_VALUE));
	};
	
	Bacon.EventStream.prototype.bufferWithCount = function (count) {
	  return withDesc(new Bacon.Desc(this, "bufferWithCount", [count]), this.bufferWithTimeOrCount(undefined, count));
	};
	
	Bacon.EventStream.prototype.bufferWithTimeOrCount = function (delay, count) {
	  var flushOrSchedule = function (buffer) {
	    if (buffer.values.length === count) {
	      return buffer.flush();
	    } else if (delay !== undefined) {
	      return buffer.schedule();
	    }
	  };
	  var desc = new Bacon.Desc(this, "bufferWithTimeOrCount", [delay, count]);
	  return withDesc(desc, this.buffer(delay, flushOrSchedule, flushOrSchedule));
	};
	
	Bacon.EventStream.prototype.buffer = function (delay) {
	  var onInput = arguments.length <= 1 || arguments[1] === undefined ? nop : arguments[1];
	  var onFlush = arguments.length <= 2 || arguments[2] === undefined ? nop : arguments[2];
	
	  var buffer = {
	    scheduled: null,
	    end: undefined,
	    values: [],
	    flush: function () {
	      if (this.scheduled) {
	        Bacon.scheduler.clearTimeout(this.scheduled);
	        this.scheduled = null;
	      }
	      if (this.values.length > 0) {
	        var valuesToPush = this.values;
	        this.values = [];
	        var reply = this.push(nextEvent(valuesToPush));
	        if (this.end != null) {
	          return this.push(this.end);
	        } else if (reply !== Bacon.noMore) {
	          return onFlush(this);
	        }
	      } else {
	        if (this.end != null) {
	          return this.push(this.end);
	        }
	      }
	    },
	    schedule: function () {
	      var _this6 = this;
	
	      if (!this.scheduled) {
	        return this.scheduled = delay(function () {
	          return _this6.flush();
	        });
	      }
	    }
	  };
	  var reply = Bacon.more;
	  if (!_.isFunction(delay)) {
	    var delayMs = delay;
	    delay = function (f) {
	      return Bacon.scheduler.setTimeout(f, delayMs);
	    };
	  }
	  return withDesc(new Bacon.Desc(this, "buffer", []), this.withHandler(function (event) {
	    var _this7 = this;
	
	    buffer.push = function (event) {
	      return _this7.push(event);
	    };
	    if (event.isError()) {
	      reply = this.push(event);
	    } else if (event.isEnd()) {
	      buffer.end = event;
	      if (!buffer.scheduled) {
	        buffer.flush();
	      }
	    } else {
	      buffer.values.push(event.value());
	
	      onInput(buffer);
	    }
	    return reply;
	  }));
	};
	
	Bacon.Observable.prototype.filter = function (f) {
	  assertObservableIsProperty(f);
	
	  for (var _len11 = arguments.length, args = Array(_len11 > 1 ? _len11 - 1 : 0), _key11 = 1; _key11 < _len11; _key11++) {
	    args[_key11 - 1] = arguments[_key11];
	  }
	
	  return convertArgsToFunction(this, f, args, function (f) {
	    return withDesc(new Bacon.Desc(this, "filter", [f]), this.withHandler(function (event) {
	      if (event.filter(f)) {
	        return this.push(event);
	      } else {
	        return Bacon.more;
	      }
	    }));
	  });
	};
	
	Bacon.once = function (value) {
	  return new EventStream(new Desc(Bacon, "once", [value]), function (sink) {
	    sink(toEvent(value));
	    sink(endEvent());
	    return nop;
	  });
	};
	
	Bacon.EventStream.prototype.concat = function (right) {
	  var left = this;
	  return new EventStream(new Bacon.Desc(left, "concat", [right]), function (sink) {
	    var unsubRight = nop;
	    var unsubLeft = left.dispatcher.subscribe(function (e) {
	      if (e.isEnd()) {
	        unsubRight = right.dispatcher.subscribe(sink);
	        return unsubRight;
	      } else {
	        return sink(e);
	      }
	    });
	    return function () {
	      return (unsubLeft(), unsubRight());
	    };
	  });
	};
	
	Bacon.Observable.prototype.flatMap = function () {
	  return flatMap_(this, makeSpawner(arguments));
	};
	
	Bacon.Observable.prototype.flatMapFirst = function () {
	  return flatMap_(this, makeSpawner(arguments), true);
	};
	
	var makeSpawner = function (args) {
	  if (args.length === 1 && isObservable(args[0])) {
	    return _.always(args[0]);
	  } else {
	    return makeFunctionArgs(args);
	  }
	};
	
	var makeObservable = function (x) {
	  if (isObservable(x)) {
	    return x;
	  } else {
	    return Bacon.once(x);
	  }
	};
	
	var flatMap_ = function (root, f, firstOnly, limit) {
	  var rootDep = [root];
	  var childDeps = [];
	  var desc = new Bacon.Desc(root, "flatMap" + (firstOnly ? "First" : ""), [f]);
	  var result = new EventStream(desc, function (sink) {
	    var composite = new CompositeUnsubscribe();
	    var queue = [];
	    var spawn = function (event) {
	      var child = makeObservable(f(event.value()));
	      childDeps.push(child);
	      return composite.add(function (unsubAll, unsubMe) {
	        return child.dispatcher.subscribe(function (event) {
	          if (event.isEnd()) {
	            _.remove(child, childDeps);
	            checkQueue();
	            checkEnd(unsubMe);
	            return Bacon.noMore;
	          } else {
	            if (typeof event !== "undefined" && event !== null ? event._isInitial : undefined) {
	              event = event.toNext();
	            }
	            var reply = sink(event);
	            if (reply === Bacon.noMore) {
	              unsubAll();
	            }
	            return reply;
	          }
	        });
	      });
	    };
	    var checkQueue = function () {
	      var event = queue.shift();
	      if (event) {
	        return spawn(event);
	      }
	    };
	    var checkEnd = function (unsub) {
	      unsub();
	      if (composite.empty()) {
	        return sink(endEvent());
	      }
	    };
	    composite.add(function (__, unsubRoot) {
	      return root.dispatcher.subscribe(function (event) {
	        if (event.isEnd()) {
	          return checkEnd(unsubRoot);
	        } else if (event.isError()) {
	          return sink(event);
	        } else if (firstOnly && composite.count() > 1) {
	          return Bacon.more;
	        } else {
	          if (composite.unsubscribed) {
	            return Bacon.noMore;
	          }
	          if (limit && composite.count() > limit) {
	            return queue.push(event);
	          } else {
	            return spawn(event);
	          }
	        }
	      });
	    });
	    return composite.unsubscribe;
	  });
	  result.internalDeps = function () {
	    if (childDeps.length) {
	      return rootDep.concat(childDeps);
	    } else {
	      return rootDep;
	    }
	  };
	  return result;
	};
	
	Bacon.Observable.prototype.flatMapWithConcurrencyLimit = function (limit) {
	  for (var _len12 = arguments.length, args = Array(_len12 > 1 ? _len12 - 1 : 0), _key12 = 1; _key12 < _len12; _key12++) {
	    args[_key12 - 1] = arguments[_key12];
	  }
	
	  var desc = new Bacon.Desc(this, "flatMapWithConcurrencyLimit", [limit].concat(args));
	  return withDesc(desc, flatMap_(this, makeSpawner(args), false, limit));
	};
	
	Bacon.Observable.prototype.flatMapConcat = function () {
	  var desc = new Bacon.Desc(this, "flatMapConcat", Array.prototype.slice.call(arguments, 0));
	  return withDesc(desc, this.flatMapWithConcurrencyLimit.apply(this, [1].concat(_slice.call(arguments))));
	};
	
	Bacon.later = function (delay, value) {
	  return withDesc(new Bacon.Desc(Bacon, "later", [delay, value]), Bacon.fromBinder(function (sink) {
	    var sender = function () {
	      return sink([value, endEvent()]);
	    };
	    var id = Bacon.scheduler.setTimeout(sender, delay);
	    return function () {
	      return Bacon.scheduler.clearTimeout(id);
	    };
	  }));
	};
	
	Bacon.Observable.prototype.bufferingThrottle = function (minimumInterval) {
	  var desc = new Bacon.Desc(this, "bufferingThrottle", [minimumInterval]);
	  return withDesc(desc, this.flatMapConcat(function (x) {
	    return Bacon.once(x).concat(Bacon.later(minimumInterval).filter(false));
	  }));
	};
	
	Bacon.Property.prototype.bufferingThrottle = function () {
	  return Bacon.Observable.prototype.bufferingThrottle.apply(this, arguments).toProperty();
	};
	
	function Bus() {
	  if (!(this instanceof Bus)) {
	    return new Bus();
	  }
	
	  this.unsubAll = _.bind(this.unsubAll, this);
	  this.subscribeAll = _.bind(this.subscribeAll, this);
	  this.guardedSink = _.bind(this.guardedSink, this);
	
	  this.sink = undefined;
	  this.subscriptions = [];
	  this.ended = false;
	  EventStream.call(this, new Bacon.Desc(Bacon, "Bus", []), this.subscribeAll);
	}
	
	inherit(Bus, EventStream);
	extend(Bus.prototype, {
	  unsubAll: function () {
	    var iterable = this.subscriptions;
	    for (var i = 0, sub; i < iterable.length; i++) {
	      sub = iterable[i];
	      if (typeof sub.unsub === "function") {
	        sub.unsub();
	      }
	    }
	  },
	
	  subscribeAll: function (newSink) {
	    if (this.ended) {
	      newSink(endEvent());
	    } else {
	      this.sink = newSink;
	      var iterable = cloneArray(this.subscriptions);
	      for (var i = 0, subscription; i < iterable.length; i++) {
	        subscription = iterable[i];
	        this.subscribeInput(subscription);
	      }
	    }
	    return this.unsubAll;
	  },
	
	  guardedSink: function (input) {
	    var _this8 = this;
	
	    return function (event) {
	      if (event.isEnd()) {
	        _this8.unsubscribeInput(input);
	        return Bacon.noMore;
	      } else {
	        return _this8.sink(event);
	      }
	    };
	  },
	
	  subscribeInput: function (subscription) {
	    subscription.unsub = subscription.input.dispatcher.subscribe(this.guardedSink(subscription.input));
	    return subscription.unsub;
	  },
	
	  unsubscribeInput: function (input) {
	    var iterable = this.subscriptions;
	    for (var i = 0, sub; i < iterable.length; i++) {
	      sub = iterable[i];
	      if (sub.input === input) {
	        if (typeof sub.unsub === "function") {
	          sub.unsub();
	        }
	        this.subscriptions.splice(i, 1);
	        return;
	      }
	    }
	  },
	
	  plug: function (input) {
	    var _this9 = this;
	
	    assertObservable(input);
	    if (this.ended) {
	      return;
	    }
	    var sub = { input: input };
	    this.subscriptions.push(sub);
	    if (typeof this.sink !== "undefined") {
	      this.subscribeInput(sub);
	    }
	    return function () {
	      return _this9.unsubscribeInput(input);
	    };
	  },
	
	  end: function () {
	    this.ended = true;
	    this.unsubAll();
	    if (typeof this.sink === "function") {
	      return this.sink(endEvent());
	    }
	  },
	
	  push: function (value) {
	    if (!this.ended && typeof this.sink === "function") {
	      return this.sink(nextEvent(value));
	    }
	  },
	
	  error: function (error) {
	    if (typeof this.sink === "function") {
	      return this.sink(new Error(error));
	    }
	  }
	});
	
	Bacon.Bus = Bus;
	
	var liftCallback = function (desc, wrapped) {
	  return withMethodCallSupport(function (f) {
	    var stream = partiallyApplied(wrapped, [function (values, callback) {
	      return f.apply(undefined, values.concat([callback]));
	    }]);
	
	    for (var _len13 = arguments.length, args = Array(_len13 > 1 ? _len13 - 1 : 0), _key13 = 1; _key13 < _len13; _key13++) {
	      args[_key13 - 1] = arguments[_key13];
	    }
	
	    return withDesc(new Bacon.Desc(Bacon, desc, [f].concat(args)), Bacon.combineAsArray(args).flatMap(stream));
	  });
	};
	
	Bacon.fromCallback = liftCallback("fromCallback", function (f) {
	  for (var _len14 = arguments.length, args = Array(_len14 > 1 ? _len14 - 1 : 0), _key14 = 1; _key14 < _len14; _key14++) {
	    args[_key14 - 1] = arguments[_key14];
	  }
	
	  return Bacon.fromBinder(function (handler) {
	    makeFunction(f, args)(handler);
	    return nop;
	  }, function (value) {
	    return [value, endEvent()];
	  });
	});
	
	Bacon.fromNodeCallback = liftCallback("fromNodeCallback", function (f) {
	  for (var _len15 = arguments.length, args = Array(_len15 > 1 ? _len15 - 1 : 0), _key15 = 1; _key15 < _len15; _key15++) {
	    args[_key15 - 1] = arguments[_key15];
	  }
	
	  return Bacon.fromBinder(function (handler) {
	    makeFunction(f, args)(handler);
	    return nop;
	  }, function (error, value) {
	    if (error) {
	      return [new Error(error), endEvent()];
	    }
	    return [value, endEvent()];
	  });
	});
	
	Bacon.combineTemplate = function (template) {
	  function current(ctxStack) {
	    return ctxStack[ctxStack.length - 1];
	  }
	  function setValue(ctxStack, key, value) {
	    current(ctxStack)[key] = value;
	    return value;
	  }
	  function applyStreamValue(key, index) {
	    return function (ctxStack, values) {
	      return setValue(ctxStack, key, values[index]);
	    };
	  }
	  function constantValue(key, value) {
	    return function (ctxStack) {
	      return setValue(ctxStack, key, value);
	    };
	  }
	
	  function mkContext(template) {
	    return isArray(template) ? [] : {};
	  }
	
	  function pushContext(key, value) {
	    return function (ctxStack) {
	      var newContext = mkContext(value);
	      setValue(ctxStack, key, newContext);
	      return ctxStack.push(newContext);
	    };
	  }
	
	  function compile(key, value) {
	    if (isObservable(value)) {
	      streams.push(value);
	      return funcs.push(applyStreamValue(key, streams.length - 1));
	    } else if (value && (value.constructor == Object || value.constructor == Array)) {
	      var popContext = function (ctxStack) {
	        return ctxStack.pop();
	      };
	      funcs.push(pushContext(key, value));
	      compileTemplate(value);
	      return funcs.push(popContext);
	    } else {
	      return funcs.push(constantValue(key, value));
	    }
	  }
	
	  function combinator(values) {
	    var rootContext = mkContext(template);
	    var ctxStack = [rootContext];
	    for (var i = 0, f; i < funcs.length; i++) {
	      f = funcs[i];
	      f(ctxStack, values);
	    }
	    return rootContext;
	  }
	
	  function compileTemplate(template) {
	    return _.each(template, compile);
	  }
	
	  var funcs = [];
	  var streams = [];
	
	  compileTemplate(template);
	
	  return withDesc(new Bacon.Desc(Bacon, "combineTemplate", [template]), Bacon.combineAsArray(streams).map(combinator));
	};
	
	var addPropertyInitValueToStream = function (property, stream) {
	  var justInitValue = new EventStream(describe(property, "justInitValue"), function (sink) {
	    var value = undefined;
	    var unsub = property.dispatcher.subscribe(function (event) {
	      if (!event.isEnd()) {
	        value = event;
	      }
	      return Bacon.noMore;
	    });
	    UpdateBarrier.whenDoneWith(justInitValue, function () {
	      if (typeof value !== "undefined" && value !== null) {
	        sink(value);
	      }
	      return sink(endEvent());
	    });
	    return unsub;
	  });
	  return justInitValue.concat(stream).toProperty();
	};
	
	Bacon.Observable.prototype.mapEnd = function () {
	  var f = makeFunctionArgs(arguments);
	  return withDesc(new Bacon.Desc(this, "mapEnd", [f]), this.withHandler(function (event) {
	    if (event.isEnd()) {
	      this.push(nextEvent(f(event)));
	      this.push(endEvent());
	      return Bacon.noMore;
	    } else {
	      return this.push(event);
	    }
	  }));
	};
	
	Bacon.Observable.prototype.skipErrors = function () {
	  return withDesc(new Bacon.Desc(this, "skipErrors", []), this.withHandler(function (event) {
	    if (event.isError()) {
	      return Bacon.more;
	    } else {
	      return this.push(event);
	    }
	  }));
	};
	
	Bacon.EventStream.prototype.takeUntil = function (stopper) {
	  var endMarker = {};
	  return withDesc(new Bacon.Desc(this, "takeUntil", [stopper]), Bacon.groupSimultaneous(this.mapEnd(endMarker), stopper.skipErrors()).withHandler(function (event) {
	    if (!event.hasValue()) {
	      return this.push(event);
	    } else {
	      var _event$value = event.value();
	
	      var data = _event$value[0];
	      var stopper = _event$value[1];
	
	      if (stopper.length) {
	        return this.push(endEvent());
	      } else {
	        var reply = Bacon.more;
	        for (var i = 0, value; i < data.length; i++) {
	          value = data[i];
	          if (value === endMarker) {
	            reply = this.push(endEvent());
	          } else {
	            reply = this.push(nextEvent(value));
	          }
	        }
	        return reply;
	      }
	    }
	  }));
	};
	
	Bacon.Property.prototype.takeUntil = function (stopper) {
	  var changes = this.changes().takeUntil(stopper);
	  return withDesc(new Bacon.Desc(this, "takeUntil", [stopper]), addPropertyInitValueToStream(this, changes));
	};
	
	Bacon.Observable.prototype.flatMapLatest = function () {
	  var f = makeSpawner(arguments);
	  var stream = this.toEventStream();
	  return withDesc(new Bacon.Desc(this, "flatMapLatest", [f]), stream.flatMap(function (value) {
	    return makeObservable(f(value)).takeUntil(stream);
	  }));
	};
	
	Bacon.Property.prototype.delayChanges = function (desc, f) {
	  return withDesc(desc, addPropertyInitValueToStream(this, f(this.changes())));
	};
	
	Bacon.EventStream.prototype.delay = function (delay) {
	  return withDesc(new Bacon.Desc(this, "delay", [delay]), this.flatMap(function (value) {
	    return Bacon.later(delay, value);
	  }));
	};
	
	Bacon.Property.prototype.delay = function (delay) {
	  return this.delayChanges(new Bacon.Desc(this, "delay", [delay]), function (changes) {
	    return changes.delay(delay);
	  });
	};
	
	Bacon.EventStream.prototype.debounce = function (delay) {
	  return withDesc(new Bacon.Desc(this, "debounce", [delay]), this.flatMapLatest(function (value) {
	    return Bacon.later(delay, value);
	  }));
	};
	
	Bacon.Property.prototype.debounce = function (delay) {
	  return this.delayChanges(new Bacon.Desc(this, "debounce", [delay]), function (changes) {
	    return changes.debounce(delay);
	  });
	};
	
	Bacon.EventStream.prototype.debounceImmediate = function (delay) {
	  return withDesc(new Bacon.Desc(this, "debounceImmediate", [delay]), this.flatMapFirst(function (value) {
	    return Bacon.once(value).concat(Bacon.later(delay).filter(false));
	  }));
	};
	
	Bacon.Observable.prototype.decode = function (cases) {
	  return withDesc(new Bacon.Desc(this, "decode", [cases]), this.combine(Bacon.combineTemplate(cases), function (key, values) {
	    return values[key];
	  }));
	};
	
	Bacon.Observable.prototype.scan = function (seed, f) {
	  var _this10 = this;
	
	  var resultProperty;
	  f = toCombinator(f);
	  var acc = toOption(seed);
	  var initHandled = false;
	  var subscribe = function (sink) {
	    var initSent = false;
	    var unsub = nop;
	    var reply = Bacon.more;
	    var sendInit = function () {
	      if (!initSent) {
	        return acc.forEach(function (value) {
	          initSent = initHandled = true;
	          reply = sink(new Initial(function () {
	            return value;
	          }));
	          if (reply === Bacon.noMore) {
	            unsub();
	            unsub = nop;
	            return unsub;
	          }
	        });
	      }
	    };
	    unsub = _this10.dispatcher.subscribe(function (event) {
	      if (event.hasValue()) {
	        if (initHandled && event.isInitial()) {
	          return Bacon.more;
	        } else {
	            if (!event.isInitial()) {
	              sendInit();
	            }
	            initSent = initHandled = true;
	            var prev = acc.getOrElse(undefined);
	            var next = f(prev, event.value());
	
	            acc = new Some(next);
	            return sink(event.apply(function () {
	              return next;
	            }));
	          }
	      } else {
	        if (event.isEnd()) {
	          reply = sendInit();
	        }
	        if (reply !== Bacon.noMore) {
	          return sink(event);
	        }
	      }
	    });
	    UpdateBarrier.whenDoneWith(resultProperty, sendInit);
	    return unsub;
	  };
	  resultProperty = new Property(new Bacon.Desc(this, "scan", [seed, f]), subscribe);
	  return resultProperty;
	};
	
	Bacon.Observable.prototype.diff = function (start, f) {
	  f = toCombinator(f);
	  return withDesc(new Bacon.Desc(this, "diff", [start, f]), this.scan([start], function (prevTuple, next) {
	    return [next, f(prevTuple[0], next)];
	  }).filter(function (tuple) {
	    return tuple.length === 2;
	  }).map(function (tuple) {
	    return tuple[1];
	  }));
	};
	
	Bacon.Observable.prototype.doAction = function () {
	  var f = makeFunctionArgs(arguments);
	  return withDesc(new Bacon.Desc(this, "doAction", [f]), this.withHandler(function (event) {
	    if (event.hasValue()) {
	      f(event.value());
	    }
	    return this.push(event);
	  }));
	};
	
	Bacon.Observable.prototype.doEnd = function () {
	  var f = makeFunctionArgs(arguments);
	  return withDesc(new Bacon.Desc(this, "doEnd", [f]), this.withHandler(function (event) {
	    if (event.isEnd()) {
	      f();
	    }
	    return this.push(event);
	  }));
	};
	
	Bacon.Observable.prototype.doError = function () {
	  var f = makeFunctionArgs(arguments);
	  return withDesc(new Bacon.Desc(this, "doError", [f]), this.withHandler(function (event) {
	    if (event.isError()) {
	      f(event.error);
	    }
	    return this.push(event);
	  }));
	};
	
	Bacon.Observable.prototype.doLog = function () {
	  for (var _len16 = arguments.length, args = Array(_len16), _key16 = 0; _key16 < _len16; _key16++) {
	    args[_key16] = arguments[_key16];
	  }
	
	  return withDesc(new Bacon.Desc(this, "doLog", args), this.withHandler(function (event) {
	    if (typeof console !== "undefined" && console !== null && typeof console.log === "function") {
	      console.log.apply(console, args.concat([event.log()]));
	    }
	    return this.push(event);
	  }));
	};
	
	Bacon.Observable.prototype.endOnError = function (f) {
	  if (!(typeof f !== "undefined" && f !== null)) {
	    f = true;
	  }
	
	  for (var _len17 = arguments.length, args = Array(_len17 > 1 ? _len17 - 1 : 0), _key17 = 1; _key17 < _len17; _key17++) {
	    args[_key17 - 1] = arguments[_key17];
	  }
	
	  return convertArgsToFunction(this, f, args, function (f) {
	    return withDesc(new Bacon.Desc(this, "endOnError", []), this.withHandler(function (event) {
	      if (event.isError() && f(event.error)) {
	        this.push(event);
	        return this.push(endEvent());
	      } else {
	        return this.push(event);
	      }
	    }));
	  });
	};
	
	Observable.prototype.errors = function () {
	  return withDesc(new Bacon.Desc(this, "errors", []), this.filter(function () {
	    return false;
	  }));
	};
	
	Bacon.Observable.prototype.take = function (count) {
	  if (count <= 0) {
	    return Bacon.never();
	  }
	  return withDesc(new Bacon.Desc(this, "take", [count]), this.withHandler(function (event) {
	    if (!event.hasValue()) {
	      return this.push(event);
	    } else {
	      count--;
	      if (count > 0) {
	        return this.push(event);
	      } else {
	        if (count === 0) {
	          this.push(event);
	        }
	        this.push(endEvent());
	        return Bacon.noMore;
	      }
	    }
	  }));
	};
	
	Bacon.Observable.prototype.first = function () {
	  return withDesc(new Bacon.Desc(this, "first", []), this.take(1));
	};
	
	Bacon.Observable.prototype.mapError = function () {
	  var f = makeFunctionArgs(arguments);
	  return withDesc(new Bacon.Desc(this, "mapError", [f]), this.withHandler(function (event) {
	    if (event.isError()) {
	      return this.push(nextEvent(f(event.error)));
	    } else {
	      return this.push(event);
	    }
	  }));
	};
	
	Bacon.Observable.prototype.flatMapError = function (fn) {
	  var desc = new Bacon.Desc(this, "flatMapError", [fn]);
	  return withDesc(desc, this.mapError(function (err) {
	    return new Error(err);
	  }).flatMap(function (x) {
	    if (x instanceof Error) {
	      return fn(x.error);
	    } else {
	      return Bacon.once(x);
	    }
	  }));
	};
	
	Bacon.EventStream.prototype.sampledBy = function (sampler, combinator) {
	  return withDesc(new Bacon.Desc(this, "sampledBy", [sampler, combinator]), this.toProperty().sampledBy(sampler, combinator));
	};
	
	Bacon.Property.prototype.sampledBy = function (sampler, combinator) {
	  var lazy = false;
	  if (typeof combinator !== "undefined" && combinator !== null) {
	    combinator = toCombinator(combinator);
	  } else {
	    lazy = true;
	    combinator = function (f) {
	      return f.value();
	    };
	  }
	  var thisSource = new Source(this, false, lazy);
	  var samplerSource = new Source(sampler, true, lazy);
	  var stream = Bacon.when([thisSource, samplerSource], combinator);
	  var result = sampler._isProperty ? stream.toProperty() : stream;
	  return withDesc(new Bacon.Desc(this, "sampledBy", [sampler, combinator]), result);
	};
	
	Bacon.Property.prototype.sample = function (interval) {
	  return withDesc(new Bacon.Desc(this, "sample", [interval]), this.sampledBy(Bacon.interval(interval, {})));
	};
	
	Bacon.Observable.prototype.map = function (p) {
	  if (p && p._isProperty) {
	    return p.sampledBy(this, former);
	  } else {
	    for (var _len18 = arguments.length, args = Array(_len18 > 1 ? _len18 - 1 : 0), _key18 = 1; _key18 < _len18; _key18++) {
	      args[_key18 - 1] = arguments[_key18];
	    }
	
	    return convertArgsToFunction(this, p, args, function (f) {
	      return withDesc(new Bacon.Desc(this, "map", [f]), this.withHandler(function (event) {
	        return this.push(event.fmap(f));
	      }));
	    });
	  }
	};
	
	Bacon.Observable.prototype.fold = function (seed, f) {
	  return withDesc(new Bacon.Desc(this, "fold", [seed, f]), this.scan(seed, f).sampledBy(this.filter(false).mapEnd().toProperty()));
	};
	
	Observable.prototype.reduce = Observable.prototype.fold;
	
	var eventMethods = [["addEventListener", "removeEventListener"], ["addListener", "removeListener"], ["on", "off"], ["bind", "unbind"]];
	
	var findHandlerMethods = function (target) {
	  var pair;
	  for (var i = 0; i < eventMethods.length; i++) {
	    pair = eventMethods[i];
	    var methodPair = [target[pair[0]], target[pair[1]]];
	    if (methodPair[0] && methodPair[1]) {
	      return methodPair;
	    }
	  }
	  for (var j = 0; j < eventMethods.length; j++) {
	    pair = eventMethods[j];
	    var addListener = target[pair[0]];
	    if (addListener) {
	      return [addListener, function () {}];
	    }
	  }
	  throw new Error("No suitable event methods in " + target);
	};
	
	Bacon.fromEventTarget = function (target, eventName, eventTransformer) {
	  var _findHandlerMethods = findHandlerMethods(target);
	
	  var sub = _findHandlerMethods[0];
	  var unsub = _findHandlerMethods[1];
	
	  var desc = new Bacon.Desc(Bacon, "fromEvent", [target, eventName]);
	  return withDesc(desc, Bacon.fromBinder(function (handler) {
	    sub.call(target, eventName, handler);
	    return function () {
	      return unsub.call(target, eventName, handler);
	    };
	  }, eventTransformer));
	};
	
	Bacon.fromEvent = Bacon.fromEventTarget;
	
	Bacon.fromPoll = function (delay, poll) {
	  var desc = new Bacon.Desc(Bacon, "fromPoll", [delay, poll]);
	  return withDesc(desc, Bacon.fromBinder(function (handler) {
	    var id = Bacon.scheduler.setInterval(handler, delay);
	    return function () {
	      return Bacon.scheduler.clearInterval(id);
	    };
	  }, poll));
	};
	
	function valueAndEnd(value) {
	  return [value, endEvent()];
	}
	
	Bacon.fromPromise = function (promise, abort) {
	  var eventTransformer = arguments.length <= 2 || arguments[2] === undefined ? valueAndEnd : arguments[2];
	
	  return withDesc(new Bacon.Desc(Bacon, "fromPromise", [promise]), Bacon.fromBinder(function (handler) {
	    var bound = promise.then(handler, function (e) {
	      return handler(new Error(e));
	    });
	    if (bound && typeof bound.done === "function") {
	      bound.done();
	    }
	
	    if (abort) {
	      return function () {
	        if (typeof promise.abort === "function") {
	          return promise.abort();
	        }
	      };
	    } else {
	      return function () {};
	    }
	  }, eventTransformer));
	};
	
	Bacon.Observable.prototype.groupBy = function (keyF) {
	  var limitF = arguments.length <= 1 || arguments[1] === undefined ? Bacon._.id : arguments[1];
	
	  var streams = {};
	  var src = this;
	  return src.filter(function (x) {
	    return !streams[keyF(x)];
	  }).map(function (x) {
	    var key = keyF(x);
	    var similar = src.filter(function (x) {
	      return keyF(x) === key;
	    });
	    var data = Bacon.once(x).concat(similar);
	    var limited = limitF(data, x).withHandler(function (event) {
	      this.push(event);
	      if (event.isEnd()) {
	        return delete streams[key];
	      }
	    });
	    streams[key] = limited;
	    return limited;
	  });
	};
	
	Bacon.fromArray = function (values) {
	  assertArray(values);
	  if (!values.length) {
	    return withDesc(new Bacon.Desc(Bacon, "fromArray", values), Bacon.never());
	  } else {
	    var i = 0;
	    return new EventStream(new Bacon.Desc(Bacon, "fromArray", [values]), function (sink) {
	      var unsubd = false;
	      var reply = Bacon.more;
	      var pushing = false;
	      var pushNeeded = false;
	      var push = function () {
	        pushNeeded = true;
	        if (pushing) {
	          return;
	        }
	        pushing = true;
	        while (pushNeeded) {
	          pushNeeded = false;
	          if (reply !== Bacon.noMore && !unsubd) {
	            var value = values[i++];
	            reply = sink(toEvent(value));
	            if (reply !== Bacon.noMore) {
	              if (i === values.length) {
	                sink(endEvent());
	              } else {
	                UpdateBarrier.afterTransaction(push);
	              }
	            }
	          }
	        }
	        pushing = false;
	        return pushing;
	      };
	
	      push();
	      return function () {
	        unsubd = true;
	        return unsubd;
	      };
	    });
	  }
	};
	
	Bacon.EventStream.prototype.holdWhen = function (valve) {
	  var onHold = false;
	  var bufferedValues = [];
	  var src = this;
	  return new EventStream(new Bacon.Desc(this, "holdWhen", [valve]), function (sink) {
	    var composite = new CompositeUnsubscribe();
	    var subscribed = false;
	    var endIfBothEnded = function (unsub) {
	      if (typeof unsub === "function") {
	        unsub();
	      }
	      if (composite.empty() && subscribed) {
	        return sink(endEvent());
	      }
	    };
	    composite.add(function (unsubAll, unsubMe) {
	      return valve.subscribeInternal(function (event) {
	        if (event.hasValue()) {
	          onHold = event.value();
	          if (!onHold) {
	            var toSend = bufferedValues;
	            bufferedValues = [];
	            return (function () {
	              var result = [];
	              for (var i = 0, value; i < toSend.length; i++) {
	                value = toSend[i];
	                result.push(sink(nextEvent(value)));
	              }
	              return result;
	            })();
	          }
	        } else if (event.isEnd()) {
	          return endIfBothEnded(unsubMe);
	        } else {
	          return sink(event);
	        }
	      });
	    });
	    composite.add(function (unsubAll, unsubMe) {
	      return src.subscribeInternal(function (event) {
	        if (onHold && event.hasValue()) {
	          return bufferedValues.push(event.value());
	        } else if (event.isEnd() && bufferedValues.length) {
	          return endIfBothEnded(unsubMe);
	        } else {
	          return sink(event);
	        }
	      });
	    });
	    subscribed = true;
	    endIfBothEnded();
	    return composite.unsubscribe;
	  });
	};
	
	Bacon.interval = function (delay) {
	  var value = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  return withDesc(new Bacon.Desc(Bacon, "interval", [delay, value]), Bacon.fromPoll(delay, function () {
	    return nextEvent(value);
	  }));
	};
	
	Bacon.$ = {};
	Bacon.$.asEventStream = function (eventName, selector, eventTransformer) {
	  var _this11 = this;
	
	  if (_.isFunction(selector)) {
	    eventTransformer = selector;
	    selector = undefined;
	  }
	
	  return withDesc(new Bacon.Desc(this.selector || this, "asEventStream", [eventName]), Bacon.fromBinder(function (handler) {
	    _this11.on(eventName, selector, handler);
	    return function () {
	      return _this11.off(eventName, selector, handler);
	    };
	  }, eventTransformer));
	};
	
	if (typeof jQuery !== "undefined" && jQuery) {
	  jQuery.fn.asEventStream = Bacon.$.asEventStream;
	}
	
	if (typeof Zepto !== "undefined" && Zepto) {
	  Zepto.fn.asEventStream = Bacon.$.asEventStream;
	}
	
	Bacon.Observable.prototype.last = function () {
	  var lastEvent;
	
	  return withDesc(new Bacon.Desc(this, "last", []), this.withHandler(function (event) {
	    if (event.isEnd()) {
	      if (lastEvent) {
	        this.push(lastEvent);
	      }
	      this.push(endEvent());
	      return Bacon.noMore;
	    } else {
	      lastEvent = event;
	    }
	  }));
	};
	
	Bacon.Observable.prototype.log = function () {
	  for (var _len19 = arguments.length, args = Array(_len19), _key19 = 0; _key19 < _len19; _key19++) {
	    args[_key19] = arguments[_key19];
	  }
	
	  this.subscribe(function (event) {
	    if (typeof console !== "undefined" && typeof console.log === "function") {
	      console.log.apply(console, args.concat([event.log()]));
	    }
	  });
	  return this;
	};
	
	Bacon.EventStream.prototype.merge = function (right) {
	  assertEventStream(right);
	  var left = this;
	  return withDesc(new Bacon.Desc(left, "merge", [right]), Bacon.mergeAll(this, right));
	};
	
	Bacon.mergeAll = function () {
	  var streams = argumentsToObservables(arguments);
	  if (streams.length) {
	    return new EventStream(new Bacon.Desc(Bacon, "mergeAll", streams), function (sink) {
	      var ends = 0;
	      var smartSink = function (obs) {
	        return function (unsubBoth) {
	          return obs.dispatcher.subscribe(function (event) {
	            if (event.isEnd()) {
	              ends++;
	              if (ends === streams.length) {
	                return sink(endEvent());
	              } else {
	                return Bacon.more;
	              }
	            } else {
	              var reply = sink(event);
	              if (reply === Bacon.noMore) {
	                unsubBoth();
	              }
	              return reply;
	            }
	          });
	        };
	      };
	      var sinks = _.map(smartSink, streams);
	      return new Bacon.CompositeUnsubscribe(sinks).unsubscribe;
	    });
	  } else {
	    return Bacon.never();
	  }
	};
	
	Bacon.repeatedly = function (delay, values) {
	  var index = 0;
	  return withDesc(new Bacon.Desc(Bacon, "repeatedly", [delay, values]), Bacon.fromPoll(delay, function () {
	    return values[index++ % values.length];
	  }));
	};
	
	Bacon.repeat = function (generator) {
	  var index = 0;
	  return Bacon.fromBinder(function (sink) {
	    var flag = false;
	    var reply = Bacon.more;
	    var unsub = function () {};
	    function handleEvent(event) {
	      if (event.isEnd()) {
	        if (!flag) {
	          return flag = true;
	        } else {
	          return subscribeNext();
	        }
	      } else {
	        return reply = sink(event);
	      }
	    };
	    function subscribeNext() {
	      var next;
	      flag = true;
	      while (flag && reply !== Bacon.noMore) {
	        next = generator(index++);
	        flag = false;
	        if (next) {
	          unsub = next.subscribeInternal(handleEvent);
	        } else {
	          sink(endEvent());
	        }
	      }
	      return flag = true;
	    };
	    subscribeNext();
	    return function () {
	      return unsub();
	    };
	  });
	};
	
	Bacon.retry = function (options) {
	  if (!_.isFunction(options.source)) {
	    throw new Exception("'source' option has to be a function");
	  }
	  var source = options.source;
	  var retries = options.retries || 0;
	  var maxRetries = options.maxRetries || retries;
	  var delay = options.delay || function () {
	    return 0;
	  };
	  var isRetryable = options.isRetryable || function () {
	    return true;
	  };
	  var finished = false;
	  var error = null;
	
	  return withDesc(new Bacon.Desc(Bacon, "retry", [options]), Bacon.repeat(function () {
	    function valueStream() {
	      return source().endOnError().withHandler(function (event) {
	        if (event.isError()) {
	          error = event;
	          if (!(isRetryable(error.error) && retries > 0)) {
	            finished = true;
	            return this.push(event);
	          }
	        } else {
	          if (event.hasValue()) {
	            error = null;
	            finished = true;
	          }
	          return this.push(event);
	        }
	      });
	    }
	
	    if (finished) {
	      return null;
	    } else if (error) {
	      var context = {
	        error: error.error,
	        retriesDone: maxRetries - retries
	      };
	      var pause = Bacon.later(delay(context)).filter(false);
	      retries = retries - 1;
	      return pause.concat(Bacon.once().flatMap(valueStream));
	    } else {
	      return valueStream();
	    }
	  }));
	};
	
	Bacon.sequentially = function (delay, values) {
	  var index = 0;
	  return withDesc(new Bacon.Desc(Bacon, "sequentially", [delay, values]), Bacon.fromPoll(delay, function () {
	    var value = values[index++];
	    if (index < values.length) {
	      return value;
	    } else if (index === values.length) {
	      return [value, endEvent()];
	    } else {
	      return endEvent();
	    }
	  }));
	};
	
	Bacon.Observable.prototype.skip = function (count) {
	  return withDesc(new Bacon.Desc(this, "skip", [count]), this.withHandler(function (event) {
	    if (!event.hasValue()) {
	      return this.push(event);
	    } else if (count > 0) {
	      count--;
	      return Bacon.more;
	    } else {
	      return this.push(event);
	    }
	  }));
	};
	
	Bacon.EventStream.prototype.skipUntil = function (starter) {
	  var started = starter.take(1).map(true).toProperty(false);
	  return withDesc(new Bacon.Desc(this, "skipUntil", [starter]), this.filter(started));
	};
	
	Bacon.EventStream.prototype.skipWhile = function (f) {
	  assertObservableIsProperty(f);
	  var ok = false;
	
	  for (var _len20 = arguments.length, args = Array(_len20 > 1 ? _len20 - 1 : 0), _key20 = 1; _key20 < _len20; _key20++) {
	    args[_key20 - 1] = arguments[_key20];
	  }
	
	  return convertArgsToFunction(this, f, args, function (f) {
	    return withDesc(new Bacon.Desc(this, "skipWhile", [f]), this.withHandler(function (event) {
	      if (ok || !event.hasValue() || !f(event.value())) {
	        if (event.hasValue()) {
	          ok = true;
	        }
	        return this.push(event);
	      } else {
	        return Bacon.more;
	      }
	    }));
	  });
	};
	
	Bacon.Observable.prototype.slidingWindow = function (n) {
	  var minValues = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	
	  return withDesc(new Bacon.Desc(this, "slidingWindow", [n, minValues]), this.scan([], function (window, value) {
	    return window.concat([value]).slice(-n);
	  }).filter(function (values) {
	    return values.length >= minValues;
	  }));
	};
	
	var spies = [];
	var registerObs = function (obs) {
	  if (spies.length) {
	    if (!registerObs.running) {
	      try {
	        registerObs.running = true;
	        spies.forEach(function (spy) {
	          spy(obs);
	        });
	      } finally {
	        delete registerObs.running;
	      }
	    }
	  }
	};
	
	Bacon.spy = function (spy) {
	  return spies.push(spy);
	};
	
	Bacon.Property.prototype.startWith = function (seed) {
	  return withDesc(new Bacon.Desc(this, "startWith", [seed]), this.scan(seed, function (prev, next) {
	    return next;
	  }));
	};
	
	Bacon.EventStream.prototype.startWith = function (seed) {
	  return withDesc(new Bacon.Desc(this, "startWith", [seed]), Bacon.once(seed).concat(this));
	};
	
	Bacon.Observable.prototype.takeWhile = function (f) {
	  assertObservableIsProperty(f);
	
	  for (var _len21 = arguments.length, args = Array(_len21 > 1 ? _len21 - 1 : 0), _key21 = 1; _key21 < _len21; _key21++) {
	    args[_key21 - 1] = arguments[_key21];
	  }
	
	  return convertArgsToFunction(this, f, args, function (f) {
	    return withDesc(new Bacon.Desc(this, "takeWhile", [f]), this.withHandler(function (event) {
	      if (event.filter(f)) {
	        return this.push(event);
	      } else {
	        this.push(endEvent());
	        return Bacon.noMore;
	      }
	    }));
	  });
	};
	
	Bacon.EventStream.prototype.throttle = function (delay) {
	  return withDesc(new Bacon.Desc(this, "throttle", [delay]), this.bufferWithTime(delay).map(function (values) {
	    return values[values.length - 1];
	  }));
	};
	
	Bacon.Property.prototype.throttle = function (delay) {
	  return this.delayChanges(new Bacon.Desc(this, "throttle", [delay]), function (changes) {
	    return changes.throttle(delay);
	  });
	};
	
	Observable.prototype.firstToPromise = function (PromiseCtr) {
	  var _this12 = this;
	
	  if (typeof PromiseCtr !== "function") {
	    if (typeof Promise === "function") {
	      PromiseCtr = Promise;
	    } else {
	      throw new Exception("There isn't default Promise, use shim or parameter");
	    }
	  }
	
	  return new PromiseCtr(function (resolve, reject) {
	    return _this12.subscribe(function (event) {
	      if (event.hasValue()) {
	        resolve(event.value());
	      }
	      if (event.isError()) {
	        reject(event.error);
	      }
	
	      return Bacon.noMore;
	    });
	  });
	};
	
	Observable.prototype.toPromise = function (PromiseCtr) {
	  return this.last().firstToPromise(PromiseCtr);
	};
	
	Bacon["try"] = function (f) {
	  return function (value) {
	    try {
	      return Bacon.once(f(value));
	    } catch (e) {
	      return new Bacon.Error(e);
	    }
	  };
	};
	
	Bacon.update = function (initial) {
	  function lateBindFirst(f) {
	    return function () {
	      for (var _len23 = arguments.length, args = Array(_len23), _key23 = 0; _key23 < _len23; _key23++) {
	        args[_key23] = arguments[_key23];
	      }
	
	      return function (i) {
	        return f.apply(undefined, [i].concat(args));
	      };
	    };
	  }
	
	  for (var _len22 = arguments.length, patterns = Array(_len22 > 1 ? _len22 - 1 : 0), _key22 = 1; _key22 < _len22; _key22++) {
	    patterns[_key22 - 1] = arguments[_key22];
	  }
	
	  var i = patterns.length - 1;
	  while (i > 0) {
	    if (!(patterns[i] instanceof Function)) {
	      patterns[i] = _.always(patterns[i]);
	    }
	    patterns[i] = lateBindFirst(patterns[i]);
	    i = i - 2;
	  }
	  return withDesc(new Bacon.Desc(Bacon, "update", [initial].concat(patterns)), Bacon.when.apply(Bacon, patterns).scan(initial, function (x, f) {
	    return f(x);
	  }));
	};
	
	Bacon.zipAsArray = function () {
	  for (var _len24 = arguments.length, args = Array(_len24), _key24 = 0; _key24 < _len24; _key24++) {
	    args[_key24] = arguments[_key24];
	  }
	
	  var streams = argumentsToObservables(args);
	  return withDesc(new Bacon.Desc(Bacon, "zipAsArray", streams), Bacon.zipWith(streams, function () {
	    for (var _len25 = arguments.length, xs = Array(_len25), _key25 = 0; _key25 < _len25; _key25++) {
	      xs[_key25] = arguments[_key25];
	    }
	
	    return xs;
	  }));
	};
	
	Bacon.zipWith = function () {
	  for (var _len26 = arguments.length, args = Array(_len26), _key26 = 0; _key26 < _len26; _key26++) {
	    args[_key26] = arguments[_key26];
	  }
	
	  var observablesAndFunction = argumentsToObservablesAndFunction(args);
	  var streams = observablesAndFunction[0];
	  var f = observablesAndFunction[1];
	
	  streams = _.map(function (s) {
	    return s.toEventStream();
	  }, streams);
	  return withDesc(new Bacon.Desc(Bacon, "zipWith", [f].concat(streams)), Bacon.when(streams, f));
	};
	
	Bacon.Observable.prototype.zip = function (other, f) {
	  return withDesc(new Bacon.Desc(this, "zip", [other]), Bacon.zipWith([this, other], f || Array));
	};
	
	if ("function" !== "undefined" && __webpack_require__(41) !== null && __webpack_require__(42) != null) {
	  !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return Bacon;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  if (typeof this !== "undefined" && this !== null) {
	    this.Bacon = Bacon;
	  }
	} else if (typeof module !== "undefined" && module !== null && module.exports != null) {
	  module.exports = Bacon;
	  Bacon.Bacon = Bacon;
	} else {
	    this.Bacon = Bacon;
	  }
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(40)(module)))

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 42 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _paper = __webpack_require__(4);
	
	var _paper2 = _interopRequireDefault(_paper);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Player = function () {
	  function Player(config) {
	    _classCallCheck(this, Player);
	
	    this.color = config.color;
	    this.name = config.name;
	    this.radius = 5;
	    this.positions = [];
	    this.path = new _paper2.default.Path({
	      strokeColor: this.color,
	      strokeWidth: 0.5
	    });
	    this.circles = new _paper2.default.Group();
	    this.elements = new _paper2.default.Group([this.path, this.circles]);
	  }
	
	  _createClass(Player, [{
	    key: 'addPosition',
	    value: function addPosition(position) {
	      var _this = this;
	
	      this.path.add(position);
	      this.path.smooth();
	
	      this.circles.removeChildren();
	      this.positions.push(position);
	      this.positions.map(function (p, index) {
	        return _this.createPositionElement(p, _this.radius * (index + 1) / _this.positions.length);
	      }).forEach(function (circle) {
	        return _this.circles.addChild(circle);
	      });
	    }
	  }, {
	    key: 'createPositionElement',
	    value: function createPositionElement(position, radius) {
	      var circle = new _paper2.default.Path.Circle(position, radius);
	      circle.fillColor = 'black';
	      circle.strokeColor = this.color;
	      circle.strokeWidth = 0.5;
	      return circle;
	    }
	  }]);
	
	  return Player;
	}();
	
	exports.default = Player;

/***/ },
/* 44 */
/***/ function(module, exports) {

	module.exports = "\n  <div class=\"text-medium playMenuBottom\" slot=\"menuBottom\">{{model.text}}</div>\n";

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__webpack_require__(46)
	__vue_script__ = __webpack_require__(48)
	__vue_template__ = __webpack_require__(49)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) { (typeof module.exports === "function" ? module.exports.options : module.exports).template = __vue_template__ }
	if (false) {(function () {  module.hot.accept()
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), true)
	  if (!hotAPI.compatible) return
	  var id = "/Users/johannes/git/raycing/cordova/www/src/vues/settings.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(47);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(13)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-78327d81&file=settings.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./settings.vue", function() {
				var newContent = require("!!./../../../../node_modules/css-loader/index.js?sourceMap!./../../../../node_modules/vue-loader/lib/style-rewriter.js?id=_v-78327d81&file=settings.vue!./../../../../node_modules/vue-loader/lib/selector.js?type=style&index=0!./settings.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(12)();
	// imports
	
	
	// module
	exports.push([module.id, "\n  .settingsMenuBottom {\n    padding-top: 2vh;\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n  }\n\n  .settingsMenuBottom > * + * {\n    margin-left: 4vw;\n  }\n\n  .mainMenuButton-mute .soundOff {\n    display: none;\n  }\n\n  .mainMenuButton-mute.selected .soundOff {\n    display: initial;\n  }\n\n  .mainMenuButton-mute.selected .soundOn {\n    display: none;\n  }\n", "", {"version":3,"sources":["/./cordova/www/src/vues/settings.vue.style"],"names":[],"mappings":";EA0DA;IACA,iBAAA;IACA,qBAAA;IAAA,sBAAA;IAAA,qBAAA;IAAA,cAAA;IACA,yBAAA;IAAA,gCAAA;QAAA,sBAAA;YAAA,wBAAA;GACA;;EAEA;IACA,iBAAA;GACA;;EAEA;IACA,cAAA;GACA;;EAEA;IACA,iBAAA;GACA;;EAEA;IACA,cAAA;GACA","file":"settings.vue","sourcesContent":["<template>\n  <div>\n    <div class=\"settingsMenuBottom text-medium\" slot=\"menuBottom\">\n      <div>\n        <span v-on:click=\"toggleIsMuted\" :class=\"{ 'selected': model.isMuted }\" class=\"mainMenuButton mainMenuButton-mute\">\n          <svg class=\"icon\" viewbox=\"0 0 250 225\">\n            <path d=\"M10 85 v50 l10 5 l50 25 l50 50 l5 -5 v-200 l-5 -5 l-50 50 l-50 25 -10 5\"/>\n            <path class=\"soundOn\" d=\"M140 92.5 a10 10 0 1 1 0 40 v10 a10 10 0 1 0 0 -60 v10 m0 -30 a10 10 0 1 1 0 100 v10 a10 10 0 1 0 0 -120 v10 \"/>\n            <path class=\"soundOff\" d=\" M180 112.5 l-40 50 l10 10 l40 -50 l40 50 l10 -10 l-40 -50 l40 -50 l-10 -10 l-40 50 l-40 -50 l-10 10 l40 50 \"/>\n          </svg>\n          <span>Sounds</span>\n        </span>\n      </div>\n      <div>\n        <span v-on:click=\"toggleStarsVisibility\" :class=\"{ 'selected': model.starsVisibility }\" class=\"mainMenuButton\">Stars</span>\n      </div>\n    </div>\n  </div>\n</template>\n\n<script lang=\"babel\">\n  import * as storage from './services/storage';\n  import * as audio from './services/audio';\n  import * as view from './services/view';\n  import svgMenu from './svgMenu.vue';\n\n  var model = {\n    isMuted: false,\n    starsVisibility: false\n  };\n\n  export default {\n    props: [ 'menu', 'smallButtons', 'showTitle' ],\n    created() {\n      model.isMuted = storage.GetIsMuted();\n      model.starsVisibility = storage.GetEnableStars();\n      this.menu = 'small';\n      this.smallButtons = false;\n      this.showTitle = true;\n    },\n    data() {\n      return { model }\n    },\n    components: {\n      svgMenu\n    },\n    methods: {\n      toggleIsMuted(){\n        this.model.isMuted = audio.ToggleIsMuted();\n      },\n      toggleStarsVisibility() {\n        this.model.starsVisibility = view.toggleStarsVisibility();\n      }\n    }\n  }\n</script>\n\n<style>\n  .settingsMenuBottom {\n    padding-top: 2vh;\n    display: flex;\n    justify-content: center;\n  }\n\n  .settingsMenuBottom > * + * {\n    margin-left: 4vw;\n  }\n\n  .mainMenuButton-mute .soundOff {\n    display: none;\n  }\n\n  .mainMenuButton-mute.selected .soundOff {\n    display: initial;\n  }\n\n  .mainMenuButton-mute.selected .soundOn {\n    display: none;\n  }\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _storage = __webpack_require__(7);
	
	var storage = _interopRequireWildcard(_storage);
	
	var _audio = __webpack_require__(31);
	
	var audio = _interopRequireWildcard(_audio);
	
	var _view = __webpack_require__(3);
	
	var view = _interopRequireWildcard(_view);
	
	var _svgMenu = __webpack_require__(9);
	
	var _svgMenu2 = _interopRequireDefault(_svgMenu);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	// <template>
	//   <div>
	//     <div class="settingsMenuBottom text-medium" slot="menuBottom">
	//       <div>
	//         <span v-on:click="toggleIsMuted" :class="{ 'selected': model.isMuted }" class="mainMenuButton mainMenuButton-mute">
	//           <svg class="icon" viewbox="0 0 250 225">
	//             <path d="M10 85 v50 l10 5 l50 25 l50 50 l5 -5 v-200 l-5 -5 l-50 50 l-50 25 -10 5"/>
	//             <path class="soundOn" d="M140 92.5 a10 10 0 1 1 0 40 v10 a10 10 0 1 0 0 -60 v10 m0 -30 a10 10 0 1 1 0 100 v10 a10 10 0 1 0 0 -120 v10 "/>
	//             <path class="soundOff" d=" M180 112.5 l-40 50 l10 10 l40 -50 l40 50 l10 -10 l-40 -50 l40 -50 l-10 -10 l-40 50 l-40 -50 l-10 10 l40 50 "/>
	//           </svg>
	//           <span>Sounds</span>
	//         </span>
	//       </div>
	//       <div>
	//         <span v-on:click="toggleStarsVisibility" :class="{ 'selected': model.starsVisibility }" class="mainMenuButton">Stars</span>
	//       </div>
	//     </div>
	//   </div>
	// </template>
	
	// <script lang="babel">
	
	var model = {
	  isMuted: false,
	  starsVisibility: false
	};
	
	exports.default = {
	  props: ['menu', 'smallButtons', 'showTitle'],
	  created: function created() {
	    model.isMuted = storage.GetIsMuted();
	    model.starsVisibility = storage.GetEnableStars();
	    this.menu = 'small';
	    this.smallButtons = false;
	    this.showTitle = true;
	  },
	  data: function data() {
	    return { model: model };
	  },
	
	  components: {
	    svgMenu: _svgMenu2.default
	  },
	  methods: {
	    toggleIsMuted: function toggleIsMuted() {
	      this.model.isMuted = audio.ToggleIsMuted();
	    },
	    toggleStarsVisibility: function toggleStarsVisibility() {
	      this.model.starsVisibility = view.toggleStarsVisibility();
	    }
	  }
	};
	// </script>

	// <style>
	//   .settingsMenuBottom {
	//     padding-top: 2vh;
	//     display: flex;
	//     justify-content: center;
	//   }

	//   .settingsMenuBottom > * + * {
	//     margin-left: 4vw;
	//   }

	//   .mainMenuButton-mute .soundOff {
	//     display: none;
	//   }

	//   .mainMenuButton-mute.selected .soundOff {
	//     display: initial;
	//   }

	//   .mainMenuButton-mute.selected .soundOn {
	//     display: none;
	//   }
	// </style>

/***/ },
/* 49 */
/***/ function(module, exports) {

	module.exports = "\n  <div>\n    <div class=\"settingsMenuBottom text-medium\" slot=\"menuBottom\">\n      <div>\n        <span v-on:click=\"toggleIsMuted\" :class=\"{ 'selected': model.isMuted }\" class=\"mainMenuButton mainMenuButton-mute\">\n          <svg class=\"icon\" viewbox=\"0 0 250 225\">\n            <path d=\"M10 85 v50 l10 5 l50 25 l50 50 l5 -5 v-200 l-5 -5 l-50 50 l-50 25 -10 5\"/>\n            <path class=\"soundOn\" d=\"M140 92.5 a10 10 0 1 1 0 40 v10 a10 10 0 1 0 0 -60 v10 m0 -30 a10 10 0 1 1 0 100 v10 a10 10 0 1 0 0 -120 v10 \"/>\n            <path class=\"soundOff\" d=\" M180 112.5 l-40 50 l10 10 l40 -50 l40 50 l10 -10 l-40 -50 l40 -50 l-10 -10 l-40 50 l-40 -50 l-10 10 l40 50 \"/>\n          </svg>\n          <span>Sounds</span>\n        </span>\n      </div>\n      <div>\n        <span v-on:click=\"toggleStarsVisibility\" :class=\"{ 'selected': model.starsVisibility }\" class=\"mainMenuButton\">Stars</span>\n      </div>\n    </div>\n  </div>\n";

/***/ }
/******/ ]);