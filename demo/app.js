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
	
	var Bacon = __webpack_require__(1);
	var Gui = __webpack_require__(5);
	
	var gui = new Gui();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, module) {(function() {
	  var Bacon, BufferingSource, Bus, CompositeUnsubscribe, ConsumingSource, Desc, Dispatcher, End, Error, Event, EventStream, Exception, Initial, Next, None, Observable, Property, PropertyDispatcher, Some, Source, UpdateBarrier, _, addPropertyInitValueToStream, argumentsToObservables, argumentsToObservablesAndFunction, assert, assertArray, assertEventStream, assertFunction, assertNoArguments, assertObservable, assertObservableIsProperty, assertString, cloneArray, constantToFunction, containsDuplicateDeps, convertArgsToFunction, describe, endEvent, eventIdCounter, eventMethods, findDeps, findHandlerMethods, flatMap_, former, idCounter, initialEvent, isArray, isFieldKey, isObservable, latter, liftCallback, makeFunction, makeFunctionArgs, makeFunction_, makeObservable, makeSpawner, nextEvent, nop, partiallyApplied, recursionDepth, ref, registerObs, spys, toCombinator, toEvent, toFieldExtractor, toFieldKey, toOption, toSimpleExtractor, valueAndEnd, withDesc, withMethodCallSupport,
	    hasProp = {}.hasOwnProperty,
	    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	    slice = [].slice,
	    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	  Bacon = {
	    toString: function() {
	      return "Bacon";
	    }
	  };
	
	  Bacon.version = '0.7.74';
	
	  Exception = (typeof global !== "undefined" && global !== null ? global : this).Error;
	
	  nop = function() {};
	
	  latter = function(_, x) {
	    return x;
	  };
	
	  former = function(x, _) {
	    return x;
	  };
	
	  cloneArray = function(xs) {
	    return xs.slice(0);
	  };
	
	  assert = function(message, condition) {
	    if (!condition) {
	      throw new Exception(message);
	    }
	  };
	
	  assertObservableIsProperty = function(x) {
	    if (x instanceof Observable && !(x instanceof Property)) {
	      throw new Exception("Observable is not a Property : " + x);
	    }
	  };
	
	  assertEventStream = function(event) {
	    if (!(event instanceof EventStream)) {
	      throw new Exception("not an EventStream : " + event);
	    }
	  };
	
	  assertObservable = function(event) {
	    if (!(event instanceof Observable)) {
	      throw new Exception("not an Observable : " + event);
	    }
	  };
	
	  assertFunction = function(f) {
	    return assert("not a function : " + f, _.isFunction(f));
	  };
	
	  isArray = function(xs) {
	    return xs instanceof Array;
	  };
	
	  isObservable = function(x) {
	    return x instanceof Observable;
	  };
	
	  assertArray = function(xs) {
	    if (!isArray(xs)) {
	      throw new Exception("not an array : " + xs);
	    }
	  };
	
	  assertNoArguments = function(args) {
	    return assert("no arguments supported", args.length === 0);
	  };
	
	  assertString = function(x) {
	    if (typeof x !== "string") {
	      throw new Exception("not a string : " + x);
	    }
	  };
	
	  _ = {
	    indexOf: Array.prototype.indexOf ? function(xs, x) {
	      return xs.indexOf(x);
	    } : function(xs, x) {
	      var i, j, len1, y;
	      for (i = j = 0, len1 = xs.length; j < len1; i = ++j) {
	        y = xs[i];
	        if (x === y) {
	          return i;
	        }
	      }
	      return -1;
	    },
	    indexWhere: function(xs, f) {
	      var i, j, len1, y;
	      for (i = j = 0, len1 = xs.length; j < len1; i = ++j) {
	        y = xs[i];
	        if (f(y)) {
	          return i;
	        }
	      }
	      return -1;
	    },
	    head: function(xs) {
	      return xs[0];
	    },
	    always: function(x) {
	      return function() {
	        return x;
	      };
	    },
	    negate: function(f) {
	      return function(x) {
	        return !f(x);
	      };
	    },
	    empty: function(xs) {
	      return xs.length === 0;
	    },
	    tail: function(xs) {
	      return xs.slice(1, xs.length);
	    },
	    filter: function(f, xs) {
	      var filtered, j, len1, x;
	      filtered = [];
	      for (j = 0, len1 = xs.length; j < len1; j++) {
	        x = xs[j];
	        if (f(x)) {
	          filtered.push(x);
	        }
	      }
	      return filtered;
	    },
	    map: function(f, xs) {
	      var j, len1, results, x;
	      results = [];
	      for (j = 0, len1 = xs.length; j < len1; j++) {
	        x = xs[j];
	        results.push(f(x));
	      }
	      return results;
	    },
	    each: function(xs, f) {
	      var key, value;
	      for (key in xs) {
	        if (!hasProp.call(xs, key)) continue;
	        value = xs[key];
	        f(key, value);
	      }
	      return void 0;
	    },
	    toArray: function(xs) {
	      if (isArray(xs)) {
	        return xs;
	      } else {
	        return [xs];
	      }
	    },
	    contains: function(xs, x) {
	      return _.indexOf(xs, x) !== -1;
	    },
	    id: function(x) {
	      return x;
	    },
	    last: function(xs) {
	      return xs[xs.length - 1];
	    },
	    all: function(xs, f) {
	      var j, len1, x;
	      if (f == null) {
	        f = _.id;
	      }
	      for (j = 0, len1 = xs.length; j < len1; j++) {
	        x = xs[j];
	        if (!f(x)) {
	          return false;
	        }
	      }
	      return true;
	    },
	    any: function(xs, f) {
	      var j, len1, x;
	      if (f == null) {
	        f = _.id;
	      }
	      for (j = 0, len1 = xs.length; j < len1; j++) {
	        x = xs[j];
	        if (f(x)) {
	          return true;
	        }
	      }
	      return false;
	    },
	    without: function(x, xs) {
	      return _.filter((function(y) {
	        return y !== x;
	      }), xs);
	    },
	    remove: function(x, xs) {
	      var i;
	      i = _.indexOf(xs, x);
	      if (i >= 0) {
	        return xs.splice(i, 1);
	      }
	    },
	    fold: function(xs, seed, f) {
	      var j, len1, x;
	      for (j = 0, len1 = xs.length; j < len1; j++) {
	        x = xs[j];
	        seed = f(seed, x);
	      }
	      return seed;
	    },
	    flatMap: function(f, xs) {
	      return _.fold(xs, [], (function(ys, x) {
	        return ys.concat(f(x));
	      }));
	    },
	    cached: function(f) {
	      var value;
	      value = None;
	      return function() {
	        if (value === None) {
	          value = f();
	          f = void 0;
	        }
	        return value;
	      };
	    },
	    isFunction: function(f) {
	      return typeof f === "function";
	    },
	    toString: function(obj) {
	      var ex, internals, key, value;
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
	        } else if (((obj != null ? obj.toString : void 0) != null) && obj.toString !== Object.prototype.toString) {
	          return obj.toString();
	        } else if (typeof obj === "object") {
	          if (recursionDepth > 5) {
	            return "{..}";
	          }
	          internals = (function() {
	            var results;
	            results = [];
	            for (key in obj) {
	              if (!hasProp.call(obj, key)) continue;
	              value = (function() {
	                try {
	                  return obj[key];
	                } catch (_error) {
	                  ex = _error;
	                  return ex;
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
	
	  recursionDepth = 0;
	
	  Bacon._ = _;
	
	  UpdateBarrier = Bacon.UpdateBarrier = (function() {
	    var afterTransaction, afters, aftersIndex, currentEventId, flush, flushDepsOf, flushWaiters, hasWaiters, inTransaction, rootEvent, waiterObs, waiters, whenDoneWith, wrappedSubscribe;
	    rootEvent = void 0;
	    waiterObs = [];
	    waiters = {};
	    afters = [];
	    aftersIndex = 0;
	    afterTransaction = function(f) {
	      if (rootEvent) {
	        return afters.push(f);
	      } else {
	        return f();
	      }
	    };
	    whenDoneWith = function(obs, f) {
	      var obsWaiters;
	      if (rootEvent) {
	        obsWaiters = waiters[obs.id];
	        if (obsWaiters == null) {
	          obsWaiters = waiters[obs.id] = [f];
	          return waiterObs.push(obs);
	        } else {
	          return obsWaiters.push(f);
	        }
	      } else {
	        return f();
	      }
	    };
	    flush = function() {
	      while (waiterObs.length > 0) {
	        flushWaiters(0);
	      }
	      return void 0;
	    };
	    flushWaiters = function(index) {
	      var f, j, len1, obs, obsId, obsWaiters;
	      obs = waiterObs[index];
	      obsId = obs.id;
	      obsWaiters = waiters[obsId];
	      waiterObs.splice(index, 1);
	      delete waiters[obsId];
	      flushDepsOf(obs);
	      for (j = 0, len1 = obsWaiters.length; j < len1; j++) {
	        f = obsWaiters[j];
	        f();
	      }
	      return void 0;
	    };
	    flushDepsOf = function(obs) {
	      var dep, deps, index, j, len1;
	      deps = obs.internalDeps();
	      for (j = 0, len1 = deps.length; j < len1; j++) {
	        dep = deps[j];
	        flushDepsOf(dep);
	        if (waiters[dep.id]) {
	          index = _.indexOf(waiterObs, dep);
	          flushWaiters(index);
	        }
	      }
	      return void 0;
	    };
	    inTransaction = function(event, context, f, args) {
	      var after, result;
	      if (rootEvent) {
	        return f.apply(context, args);
	      } else {
	        rootEvent = event;
	        try {
	          result = f.apply(context, args);
	          flush();
	        } finally {
	          rootEvent = void 0;
	          while (aftersIndex < afters.length) {
	            after = afters[aftersIndex];
	            aftersIndex++;
	            after();
	          }
	          aftersIndex = 0;
	          afters = [];
	        }
	        return result;
	      }
	    };
	    currentEventId = function() {
	      if (rootEvent) {
	        return rootEvent.id;
	      } else {
	        return void 0;
	      }
	    };
	    wrappedSubscribe = function(obs, sink) {
	      var doUnsub, shouldUnsub, unsub, unsubd;
	      unsubd = false;
	      shouldUnsub = false;
	      doUnsub = function() {
	        return shouldUnsub = true;
	      };
	      unsub = function() {
	        unsubd = true;
	        return doUnsub();
	      };
	      doUnsub = obs.dispatcher.subscribe(function(event) {
	        return afterTransaction(function() {
	          var reply;
	          if (!unsubd) {
	            reply = sink(event);
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
	    hasWaiters = function() {
	      return waiterObs.length > 0;
	    };
	    return {
	      whenDoneWith: whenDoneWith,
	      hasWaiters: hasWaiters,
	      inTransaction: inTransaction,
	      currentEventId: currentEventId,
	      wrappedSubscribe: wrappedSubscribe,
	      afterTransaction: afterTransaction
	    };
	  })();
	
	  Source = (function() {
	    function Source(obs1, sync, lazy1) {
	      this.obs = obs1;
	      this.sync = sync;
	      this.lazy = lazy1 != null ? lazy1 : false;
	      this.queue = [];
	    }
	
	    Source.prototype.subscribe = function(sink) {
	      return this.obs.dispatcher.subscribe(sink);
	    };
	
	    Source.prototype.toString = function() {
	      return this.obs.toString();
	    };
	
	    Source.prototype.markEnded = function() {
	      return this.ended = true;
	    };
	
	    Source.prototype.consume = function() {
	      if (this.lazy) {
	        return {
	          value: _.always(this.queue[0])
	        };
	      } else {
	        return this.queue[0];
	      }
	    };
	
	    Source.prototype.push = function(x) {
	      return this.queue = [x];
	    };
	
	    Source.prototype.mayHave = function() {
	      return true;
	    };
	
	    Source.prototype.hasAtLeast = function() {
	      return this.queue.length;
	    };
	
	    Source.prototype.flatten = true;
	
	    return Source;
	
	  })();
	
	  ConsumingSource = (function(superClass) {
	    extend(ConsumingSource, superClass);
	
	    function ConsumingSource() {
	      return ConsumingSource.__super__.constructor.apply(this, arguments);
	    }
	
	    ConsumingSource.prototype.consume = function() {
	      return this.queue.shift();
	    };
	
	    ConsumingSource.prototype.push = function(x) {
	      return this.queue.push(x);
	    };
	
	    ConsumingSource.prototype.mayHave = function(c) {
	      return !this.ended || this.queue.length >= c;
	    };
	
	    ConsumingSource.prototype.hasAtLeast = function(c) {
	      return this.queue.length >= c;
	    };
	
	    ConsumingSource.prototype.flatten = false;
	
	    return ConsumingSource;
	
	  })(Source);
	
	  BufferingSource = (function(superClass) {
	    extend(BufferingSource, superClass);
	
	    function BufferingSource(obs) {
	      BufferingSource.__super__.constructor.call(this, obs, true);
	    }
	
	    BufferingSource.prototype.consume = function() {
	      var values;
	      values = this.queue;
	      this.queue = [];
	      return {
	        value: function() {
	          return values;
	        }
	      };
	    };
	
	    BufferingSource.prototype.push = function(x) {
	      return this.queue.push(x.value());
	    };
	
	    BufferingSource.prototype.hasAtLeast = function() {
	      return true;
	    };
	
	    return BufferingSource;
	
	  })(Source);
	
	  Source.isTrigger = function(s) {
	    if (s instanceof Source) {
	      return s.sync;
	    } else {
	      return s instanceof EventStream;
	    }
	  };
	
	  Source.fromObservable = function(s) {
	    if (s instanceof Source) {
	      return s;
	    } else if (s instanceof Property) {
	      return new Source(s, false);
	    } else {
	      return new ConsumingSource(s, true);
	    }
	  };
	
	  Desc = (function() {
	    function Desc(context1, method1, args1) {
	      this.context = context1;
	      this.method = method1;
	      this.args = args1;
	    }
	
	    Desc.prototype.deps = function() {
	      return this.cached || (this.cached = findDeps([this.context].concat(this.args)));
	    };
	
	    Desc.prototype.toString = function() {
	      return _.toString(this.context) + "." + _.toString(this.method) + "(" + _.map(_.toString, this.args) + ")";
	    };
	
	    return Desc;
	
	  })();
	
	  describe = function() {
	    var args, context, method;
	    context = arguments[0], method = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
	    if ((context || method) instanceof Desc) {
	      return context || method;
	    } else {
	      return new Desc(context, method, args);
	    }
	  };
	
	  withDesc = function(desc, obs) {
	    obs.desc = desc;
	    return obs;
	  };
	
	  findDeps = function(x) {
	    if (isArray(x)) {
	      return _.flatMap(findDeps, x);
	    } else if (isObservable(x)) {
	      return [x];
	    } else if (x instanceof Source) {
	      return [x.obs];
	    } else {
	      return [];
	    }
	  };
	
	  Bacon.Desc = Desc;
	
	  Bacon.Desc.empty = new Bacon.Desc("", "", []);
	
	  withMethodCallSupport = function(wrapped) {
	    return function() {
	      var args, context, f, methodName;
	      f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      if (typeof f === "object" && args.length) {
	        context = f;
	        methodName = args[0];
	        f = function() {
	          return context[methodName].apply(context, arguments);
	        };
	        args = args.slice(1);
	      }
	      return wrapped.apply(null, [f].concat(slice.call(args)));
	    };
	  };
	
	  makeFunctionArgs = function(args) {
	    args = Array.prototype.slice.call(args);
	    return makeFunction_.apply(null, args);
	  };
	
	  partiallyApplied = function(f, applied) {
	    return function() {
	      var args;
	      args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return f.apply(null, applied.concat(args));
	    };
	  };
	
	  toSimpleExtractor = function(args) {
	    return function(key) {
	      return function(value) {
	        var fieldValue;
	        if (value == null) {
	          return void 0;
	        } else {
	          fieldValue = value[key];
	          if (_.isFunction(fieldValue)) {
	            return fieldValue.apply(value, args);
	          } else {
	            return fieldValue;
	          }
	        }
	      };
	    };
	  };
	
	  toFieldExtractor = function(f, args) {
	    var partFuncs, parts;
	    parts = f.slice(1).split(".");
	    partFuncs = _.map(toSimpleExtractor(args), parts);
	    return function(value) {
	      var j, len1;
	      for (j = 0, len1 = partFuncs.length; j < len1; j++) {
	        f = partFuncs[j];
	        value = f(value);
	      }
	      return value;
	    };
	  };
	
	  isFieldKey = function(f) {
	    return (typeof f === "string") && f.length > 1 && f.charAt(0) === ".";
	  };
	
	  makeFunction_ = withMethodCallSupport(function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
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
	
	  makeFunction = function(f, args) {
	    return makeFunction_.apply(null, [f].concat(slice.call(args)));
	  };
	
	  convertArgsToFunction = function(obs, f, args, method) {
	    var sampled;
	    if (f instanceof Property) {
	      sampled = f.sampledBy(obs, function(p, s) {
	        return [p, s];
	      });
	      return method.call(sampled, function(arg) {
	        var p, s;
	        p = arg[0], s = arg[1];
	        return p;
	      }).map(function(arg) {
	        var p, s;
	        p = arg[0], s = arg[1];
	        return s;
	      });
	    } else {
	      f = makeFunction(f, args);
	      return method.call(obs, f);
	    }
	  };
	
	  toCombinator = function(f) {
	    var key;
	    if (_.isFunction(f)) {
	      return f;
	    } else if (isFieldKey(f)) {
	      key = toFieldKey(f);
	      return function(left, right) {
	        return left[key](right);
	      };
	    } else {
	      throw new Exception("not a function or a field key: " + f);
	    }
	  };
	
	  toFieldKey = function(f) {
	    return f.slice(1);
	  };
	
	  Some = (function() {
	    function Some(value1) {
	      this.value = value1;
	    }
	
	    Some.prototype.getOrElse = function() {
	      return this.value;
	    };
	
	    Some.prototype.get = function() {
	      return this.value;
	    };
	
	    Some.prototype.filter = function(f) {
	      if (f(this.value)) {
	        return new Some(this.value);
	      } else {
	        return None;
	      }
	    };
	
	    Some.prototype.map = function(f) {
	      return new Some(f(this.value));
	    };
	
	    Some.prototype.forEach = function(f) {
	      return f(this.value);
	    };
	
	    Some.prototype.isDefined = true;
	
	    Some.prototype.toArray = function() {
	      return [this.value];
	    };
	
	    Some.prototype.inspect = function() {
	      return "Some(" + this.value + ")";
	    };
	
	    Some.prototype.toString = function() {
	      return this.inspect();
	    };
	
	    return Some;
	
	  })();
	
	  None = {
	    getOrElse: function(value) {
	      return value;
	    },
	    filter: function() {
	      return None;
	    },
	    map: function() {
	      return None;
	    },
	    forEach: function() {},
	    isDefined: false,
	    toArray: function() {
	      return [];
	    },
	    inspect: function() {
	      return "None";
	    },
	    toString: function() {
	      return this.inspect();
	    }
	  };
	
	  toOption = function(v) {
	    if (v instanceof Some || v === None) {
	      return v;
	    } else {
	      return new Some(v);
	    }
	  };
	
	  Bacon.noMore = ["<no-more>"];
	
	  Bacon.more = ["<more>"];
	
	  eventIdCounter = 0;
	
	  Event = (function() {
	    function Event() {
	      this.id = ++eventIdCounter;
	    }
	
	    Event.prototype.isEvent = function() {
	      return true;
	    };
	
	    Event.prototype.isEnd = function() {
	      return false;
	    };
	
	    Event.prototype.isInitial = function() {
	      return false;
	    };
	
	    Event.prototype.isNext = function() {
	      return false;
	    };
	
	    Event.prototype.isError = function() {
	      return false;
	    };
	
	    Event.prototype.hasValue = function() {
	      return false;
	    };
	
	    Event.prototype.filter = function() {
	      return true;
	    };
	
	    Event.prototype.inspect = function() {
	      return this.toString();
	    };
	
	    Event.prototype.log = function() {
	      return this.toString();
	    };
	
	    return Event;
	
	  })();
	
	  Next = (function(superClass) {
	    extend(Next, superClass);
	
	    function Next(valueF, eager) {
	      if (!(this instanceof Next)) {
	        return new Next(valueF, eager);
	      }
	      Next.__super__.constructor.call(this);
	      if (!eager && _.isFunction(valueF) || valueF instanceof Next) {
	        this.valueF = valueF;
	        this.valueInternal = void 0;
	      } else {
	        this.valueF = void 0;
	        this.valueInternal = valueF;
	      }
	    }
	
	    Next.prototype.isNext = function() {
	      return true;
	    };
	
	    Next.prototype.hasValue = function() {
	      return true;
	    };
	
	    Next.prototype.value = function() {
	      if (this.valueF instanceof Next) {
	        this.valueInternal = this.valueF.value();
	        this.valueF = void 0;
	      } else if (this.valueF) {
	        this.valueInternal = this.valueF();
	        this.valueF = void 0;
	      }
	      return this.valueInternal;
	    };
	
	    Next.prototype.fmap = function(f) {
	      var event, value;
	      if (this.valueInternal) {
	        value = this.valueInternal;
	        return this.apply(function() {
	          return f(value);
	        });
	      } else {
	        event = this;
	        return this.apply(function() {
	          return f(event.value());
	        });
	      }
	    };
	
	    Next.prototype.apply = function(value) {
	      return new Next(value);
	    };
	
	    Next.prototype.filter = function(f) {
	      return f(this.value());
	    };
	
	    Next.prototype.toString = function() {
	      return _.toString(this.value());
	    };
	
	    Next.prototype.log = function() {
	      return this.value();
	    };
	
	    return Next;
	
	  })(Event);
	
	  Initial = (function(superClass) {
	    extend(Initial, superClass);
	
	    function Initial(valueF, eager) {
	      if (!(this instanceof Initial)) {
	        return new Initial(valueF, eager);
	      }
	      Initial.__super__.constructor.call(this, valueF, eager);
	    }
	
	    Initial.prototype.isInitial = function() {
	      return true;
	    };
	
	    Initial.prototype.isNext = function() {
	      return false;
	    };
	
	    Initial.prototype.apply = function(value) {
	      return new Initial(value);
	    };
	
	    Initial.prototype.toNext = function() {
	      return new Next(this);
	    };
	
	    return Initial;
	
	  })(Next);
	
	  End = (function(superClass) {
	    extend(End, superClass);
	
	    function End() {
	      if (!(this instanceof End)) {
	        return new End();
	      }
	    }
	
	    End.prototype.isEnd = function() {
	      return true;
	    };
	
	    End.prototype.fmap = function() {
	      return this;
	    };
	
	    End.prototype.apply = function() {
	      return this;
	    };
	
	    End.prototype.toString = function() {
	      return "<end>";
	    };
	
	    return End;
	
	  })(Event);
	
	  Error = (function(superClass) {
	    extend(Error, superClass);
	
	    function Error(error) {
	      if (!(this instanceof Error)) {
	        return new Error(error);
	      }
	      this.error = error;
	    }
	
	    Error.prototype.isError = function() {
	      return true;
	    };
	
	    Error.prototype.fmap = function() {
	      return this;
	    };
	
	    Error.prototype.apply = function() {
	      return this;
	    };
	
	    Error.prototype.toString = function() {
	      return "<error> " + _.toString(this.error);
	    };
	
	    return Error;
	
	  })(Event);
	
	  Bacon.Event = Event;
	
	  Bacon.Initial = Initial;
	
	  Bacon.Next = Next;
	
	  Bacon.End = End;
	
	  Bacon.Error = Error;
	
	  initialEvent = function(value) {
	    return new Initial(value, true);
	  };
	
	  nextEvent = function(value) {
	    return new Next(value, true);
	  };
	
	  endEvent = function() {
	    return new End();
	  };
	
	  toEvent = function(x) {
	    if (x instanceof Event) {
	      return x;
	    } else {
	      return nextEvent(x);
	    }
	  };
	
	  idCounter = 0;
	
	  registerObs = function() {};
	
	  Observable = (function() {
	    function Observable(desc1) {
	      this.desc = desc1;
	      this.id = ++idCounter;
	      this.initialDesc = this.desc;
	    }
	
	    Observable.prototype.subscribe = function(sink) {
	      return UpdateBarrier.wrappedSubscribe(this, sink);
	    };
	
	    Observable.prototype.subscribeInternal = function(sink) {
	      return this.dispatcher.subscribe(sink);
	    };
	
	    Observable.prototype.onValue = function() {
	      var f;
	      f = makeFunctionArgs(arguments);
	      return this.subscribe(function(event) {
	        if (event.hasValue()) {
	          return f(event.value());
	        }
	      });
	    };
	
	    Observable.prototype.onValues = function(f) {
	      return this.onValue(function(args) {
	        return f.apply(null, args);
	      });
	    };
	
	    Observable.prototype.onError = function() {
	      var f;
	      f = makeFunctionArgs(arguments);
	      return this.subscribe(function(event) {
	        if (event.isError()) {
	          return f(event.error);
	        }
	      });
	    };
	
	    Observable.prototype.onEnd = function() {
	      var f;
	      f = makeFunctionArgs(arguments);
	      return this.subscribe(function(event) {
	        if (event.isEnd()) {
	          return f();
	        }
	      });
	    };
	
	    Observable.prototype.name = function(name) {
	      this._name = name;
	      return this;
	    };
	
	    Observable.prototype.withDescription = function() {
	      this.desc = describe.apply(null, arguments);
	      return this;
	    };
	
	    Observable.prototype.toString = function() {
	      if (this._name) {
	        return this._name;
	      } else {
	        return this.desc.toString();
	      }
	    };
	
	    Observable.prototype.internalDeps = function() {
	      return this.initialDesc.deps();
	    };
	
	    return Observable;
	
	  })();
	
	  Observable.prototype.assign = Observable.prototype.onValue;
	
	  Observable.prototype.forEach = Observable.prototype.onValue;
	
	  Observable.prototype.inspect = Observable.prototype.toString;
	
	  Bacon.Observable = Observable;
	
	  CompositeUnsubscribe = (function() {
	    function CompositeUnsubscribe(ss) {
	      var j, len1, s;
	      if (ss == null) {
	        ss = [];
	      }
	      this.unsubscribe = bind(this.unsubscribe, this);
	      this.unsubscribed = false;
	      this.subscriptions = [];
	      this.starting = [];
	      for (j = 0, len1 = ss.length; j < len1; j++) {
	        s = ss[j];
	        this.add(s);
	      }
	    }
	
	    CompositeUnsubscribe.prototype.add = function(subscription) {
	      var ended, unsub, unsubMe;
	      if (this.unsubscribed) {
	        return;
	      }
	      ended = false;
	      unsub = nop;
	      this.starting.push(subscription);
	      unsubMe = (function(_this) {
	        return function() {
	          if (_this.unsubscribed) {
	            return;
	          }
	          ended = true;
	          _this.remove(unsub);
	          return _.remove(subscription, _this.starting);
	        };
	      })(this);
	      unsub = subscription(this.unsubscribe, unsubMe);
	      if (!(this.unsubscribed || ended)) {
	        this.subscriptions.push(unsub);
	      } else {
	        unsub();
	      }
	      _.remove(subscription, this.starting);
	      return unsub;
	    };
	
	    CompositeUnsubscribe.prototype.remove = function(unsub) {
	      if (this.unsubscribed) {
	        return;
	      }
	      if ((_.remove(unsub, this.subscriptions)) !== void 0) {
	        return unsub();
	      }
	    };
	
	    CompositeUnsubscribe.prototype.unsubscribe = function() {
	      var j, len1, ref, s;
	      if (this.unsubscribed) {
	        return;
	      }
	      this.unsubscribed = true;
	      ref = this.subscriptions;
	      for (j = 0, len1 = ref.length; j < len1; j++) {
	        s = ref[j];
	        s();
	      }
	      this.subscriptions = [];
	      return this.starting = [];
	    };
	
	    CompositeUnsubscribe.prototype.count = function() {
	      if (this.unsubscribed) {
	        return 0;
	      }
	      return this.subscriptions.length + this.starting.length;
	    };
	
	    CompositeUnsubscribe.prototype.empty = function() {
	      return this.count() === 0;
	    };
	
	    return CompositeUnsubscribe;
	
	  })();
	
	  Bacon.CompositeUnsubscribe = CompositeUnsubscribe;
	
	  Dispatcher = (function() {
	    Dispatcher.prototype.pushing = false;
	
	    Dispatcher.prototype.ended = false;
	
	    Dispatcher.prototype.prevError = void 0;
	
	    Dispatcher.prototype.unsubSrc = void 0;
	
	    function Dispatcher(_subscribe, _handleEvent) {
	      this._subscribe = _subscribe;
	      this._handleEvent = _handleEvent;
	      this.subscribe = bind(this.subscribe, this);
	      this.handleEvent = bind(this.handleEvent, this);
	      this.subscriptions = [];
	      this.queue = [];
	    }
	
	    Dispatcher.prototype.hasSubscribers = function() {
	      return this.subscriptions.length > 0;
	    };
	
	    Dispatcher.prototype.removeSub = function(subscription) {
	      return this.subscriptions = _.without(subscription, this.subscriptions);
	    };
	
	    Dispatcher.prototype.push = function(event) {
	      if (event.isEnd()) {
	        this.ended = true;
	      }
	      return UpdateBarrier.inTransaction(event, this, this.pushIt, [event]);
	    };
	
	    Dispatcher.prototype.pushToSubscriptions = function(event) {
	      var e, j, len1, reply, sub, tmp;
	      try {
	        tmp = this.subscriptions;
	        for (j = 0, len1 = tmp.length; j < len1; j++) {
	          sub = tmp[j];
	          reply = sub.sink(event);
	          if (reply === Bacon.noMore || event.isEnd()) {
	            this.removeSub(sub);
	          }
	        }
	        return true;
	      } catch (_error) {
	        e = _error;
	        this.pushing = false;
	        this.queue = [];
	        throw e;
	      }
	    };
	
	    Dispatcher.prototype.pushIt = function(event) {
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
	
	    Dispatcher.prototype.handleEvent = function(event) {
	      if (this._handleEvent) {
	        return this._handleEvent(event);
	      } else {
	        return this.push(event);
	      }
	    };
	
	    Dispatcher.prototype.unsubscribeFromSource = function() {
	      if (this.unsubSrc) {
	        this.unsubSrc();
	      }
	      return this.unsubSrc = void 0;
	    };
	
	    Dispatcher.prototype.subscribe = function(sink) {
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
	        return (function(_this) {
	          return function() {
	            _this.removeSub(subscription);
	            if (!_this.hasSubscribers()) {
	              return _this.unsubscribeFromSource();
	            }
	          };
	        })(this);
	      }
	    };
	
	    return Dispatcher;
	
	  })();
	
	  Bacon.Dispatcher = Dispatcher;
	
	  EventStream = (function(superClass) {
	    extend(EventStream, superClass);
	
	    function EventStream(desc, subscribe, handler) {
	      if (!(this instanceof EventStream)) {
	        return new EventStream(desc, subscribe, handler);
	      }
	      if (_.isFunction(desc)) {
	        handler = subscribe;
	        subscribe = desc;
	        desc = Desc.empty;
	      }
	      EventStream.__super__.constructor.call(this, desc);
	      assertFunction(subscribe);
	      this.dispatcher = new Dispatcher(subscribe, handler);
	      registerObs(this);
	    }
	
	    EventStream.prototype.toProperty = function(initValue_) {
	      var disp, initValue;
	      initValue = arguments.length === 0 ? None : toOption(function() {
	        return initValue_;
	      });
	      disp = this.dispatcher;
	      return new Property(new Bacon.Desc(this, "toProperty", [initValue_]), function(sink) {
	        var initSent, reply, sendInit, unsub;
	        initSent = false;
	        unsub = nop;
	        reply = Bacon.more;
	        sendInit = function() {
	          if (!initSent) {
	            return initValue.forEach(function(value) {
	              initSent = true;
	              reply = sink(new Initial(value));
	              if (reply === Bacon.noMore) {
	                unsub();
	                return unsub = nop;
	              }
	            });
	          }
	        };
	        unsub = disp.subscribe(function(event) {
	          if (event.hasValue()) {
	            if (initSent && event.isInitial()) {
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
	        sendInit();
	        return unsub;
	      });
	    };
	
	    EventStream.prototype.toEventStream = function() {
	      return this;
	    };
	
	    EventStream.prototype.withHandler = function(handler) {
	      return new EventStream(new Bacon.Desc(this, "withHandler", [handler]), this.dispatcher.subscribe, handler);
	    };
	
	    return EventStream;
	
	  })(Observable);
	
	  Bacon.EventStream = EventStream;
	
	  Bacon.never = function() {
	    return new EventStream(describe(Bacon, "never"), function(sink) {
	      sink(endEvent());
	      return nop;
	    });
	  };
	
	  Bacon.when = function() {
	    var f, i, index, ix, j, k, len, len1, len2, needsBarrier, pat, patSources, pats, patterns, ref, resultStream, s, sources, triggerFound, usage;
	    if (arguments.length === 0) {
	      return Bacon.never();
	    }
	    len = arguments.length;
	    usage = "when: expecting arguments in the form (Observable+,function)+";
	    assert(usage, len % 2 === 0);
	    sources = [];
	    pats = [];
	    i = 0;
	    patterns = [];
	    while (i < len) {
	      patterns[i] = arguments[i];
	      patterns[i + 1] = arguments[i + 1];
	      patSources = _.toArray(arguments[i]);
	      f = constantToFunction(arguments[i + 1]);
	      pat = {
	        f: f,
	        ixs: []
	      };
	      triggerFound = false;
	      for (j = 0, len1 = patSources.length; j < len1; j++) {
	        s = patSources[j];
	        index = _.indexOf(sources, s);
	        if (!triggerFound) {
	          triggerFound = Source.isTrigger(s);
	        }
	        if (index < 0) {
	          sources.push(s);
	          index = sources.length - 1;
	        }
	        ref = pat.ixs;
	        for (k = 0, len2 = ref.length; k < len2; k++) {
	          ix = ref[k];
	          if (ix.index === index) {
	            ix.count++;
	          }
	        }
	        pat.ixs.push({
	          index: index,
	          count: 1
	        });
	      }
	      assert("At least one EventStream required", triggerFound || (!patSources.length));
	      if (patSources.length > 0) {
	        pats.push(pat);
	      }
	      i = i + 2;
	    }
	    if (!sources.length) {
	      return Bacon.never();
	    }
	    sources = _.map(Source.fromObservable, sources);
	    needsBarrier = (_.any(sources, function(s) {
	      return s.flatten;
	    })) && (containsDuplicateDeps(_.map((function(s) {
	      return s.obs;
	    }), sources)));
	    return resultStream = new EventStream(new Bacon.Desc(Bacon, "when", patterns), function(sink) {
	      var cannotMatch, cannotSync, ends, match, nonFlattened, part, triggers;
	      triggers = [];
	      ends = false;
	      match = function(p) {
	        var l, len3, ref1;
	        ref1 = p.ixs;
	        for (l = 0, len3 = ref1.length; l < len3; l++) {
	          i = ref1[l];
	          if (!sources[i.index].hasAtLeast(i.count)) {
	            return false;
	          }
	        }
	        return true;
	      };
	      cannotSync = function(source) {
	        return !source.sync || source.ended;
	      };
	      cannotMatch = function(p) {
	        var l, len3, ref1;
	        ref1 = p.ixs;
	        for (l = 0, len3 = ref1.length; l < len3; l++) {
	          i = ref1[l];
	          if (!sources[i.index].mayHave(i.count)) {
	            return true;
	          }
	        }
	      };
	      nonFlattened = function(trigger) {
	        return !trigger.source.flatten;
	      };
	      part = function(source) {
	        return function(unsubAll) {
	          var flush, flushLater, flushWhileTriggers;
	          flushLater = function() {
	            return UpdateBarrier.whenDoneWith(resultStream, flush);
	          };
	          flushWhileTriggers = function() {
	            var events, l, len3, p, reply, trigger;
	            if (triggers.length > 0) {
	              reply = Bacon.more;
	              trigger = triggers.pop();
	              for (l = 0, len3 = pats.length; l < len3; l++) {
	                p = pats[l];
	                if (match(p)) {
	                  events = (function() {
	                    var len4, m, ref1, results;
	                    ref1 = p.ixs;
	                    results = [];
	                    for (m = 0, len4 = ref1.length; m < len4; m++) {
	                      i = ref1[m];
	                      results.push(sources[i.index].consume());
	                    }
	                    return results;
	                  })();
	                  reply = sink(trigger.e.apply(function() {
	                    var event, values;
	                    values = (function() {
	                      var len4, m, results;
	                      results = [];
	                      for (m = 0, len4 = events.length; m < len4; m++) {
	                        event = events[m];
	                        results.push(event.value());
	                      }
	                      return results;
	                    })();
	                    return p.f.apply(p, values);
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
	          flush = function() {
	            var reply;
	            reply = flushWhileTriggers();
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
	          return source.subscribe(function(e) {
	            var reply;
	            if (e.isEnd()) {
	              ends = true;
	              source.markEnded();
	              flushLater();
	            } else if (e.isError()) {
	              reply = sink(e);
	            } else {
	              source.push(e);
	              if (source.sync) {
	                triggers.push({
	                  source: source,
	                  e: e
	                });
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
	      return new Bacon.CompositeUnsubscribe((function() {
	        var l, len3, results;
	        results = [];
	        for (l = 0, len3 = sources.length; l < len3; l++) {
	          s = sources[l];
	          results.push(part(s));
	        }
	        return results;
	      })()).unsubscribe;
	    });
	  };
	
	  containsDuplicateDeps = function(observables, state) {
	    var checkObservable;
	    if (state == null) {
	      state = [];
	    }
	    checkObservable = function(obs) {
	      var deps;
	      if (_.contains(state, obs)) {
	        return true;
	      } else {
	        deps = obs.internalDeps();
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
	
	  constantToFunction = function(f) {
	    if (_.isFunction(f)) {
	      return f;
	    } else {
	      return _.always(f);
	    }
	  };
	
	  Bacon.groupSimultaneous = function() {
	    var s, sources, streams;
	    streams = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    if (streams.length === 1 && isArray(streams[0])) {
	      streams = streams[0];
	    }
	    sources = (function() {
	      var j, len1, results;
	      results = [];
	      for (j = 0, len1 = streams.length; j < len1; j++) {
	        s = streams[j];
	        results.push(new BufferingSource(s));
	      }
	      return results;
	    })();
	    return withDesc(new Bacon.Desc(Bacon, "groupSimultaneous", streams), Bacon.when(sources, (function() {
	      var xs;
	      xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return xs;
	    })));
	  };
	
	  PropertyDispatcher = (function(superClass) {
	    extend(PropertyDispatcher, superClass);
	
	    function PropertyDispatcher(property1, subscribe, handleEvent) {
	      this.property = property1;
	      this.subscribe = bind(this.subscribe, this);
	      PropertyDispatcher.__super__.constructor.call(this, subscribe, handleEvent);
	      this.current = None;
	      this.currentValueRootId = void 0;
	      this.propertyEnded = false;
	    }
	
	    PropertyDispatcher.prototype.push = function(event) {
	      if (event.isEnd()) {
	        this.propertyEnded = true;
	      }
	      if (event.hasValue()) {
	        this.current = new Some(event);
	        this.currentValueRootId = UpdateBarrier.currentEventId();
	      }
	      return PropertyDispatcher.__super__.push.call(this, event);
	    };
	
	    PropertyDispatcher.prototype.maybeSubSource = function(sink, reply) {
	      if (reply === Bacon.noMore) {
	        return nop;
	      } else if (this.propertyEnded) {
	        sink(endEvent());
	        return nop;
	      } else {
	        return Dispatcher.prototype.subscribe.call(this, sink);
	      }
	    };
	
	    PropertyDispatcher.prototype.subscribe = function(sink) {
	      var dispatchingId, initSent, reply, valId;
	      initSent = false;
	      reply = Bacon.more;
	      if (this.current.isDefined && (this.hasSubscribers() || this.propertyEnded)) {
	        dispatchingId = UpdateBarrier.currentEventId();
	        valId = this.currentValueRootId;
	        if (!this.propertyEnded && valId && dispatchingId && dispatchingId !== valId) {
	          UpdateBarrier.whenDoneWith(this.property, (function(_this) {
	            return function() {
	              if (_this.currentValueRootId === valId) {
	                return sink(initialEvent(_this.current.get().value()));
	              }
	            };
	          })(this));
	          return this.maybeSubSource(sink, reply);
	        } else {
	          UpdateBarrier.inTransaction(void 0, this, (function() {
	            return reply = sink(initialEvent(this.current.get().value()));
	          }), []);
	          return this.maybeSubSource(sink, reply);
	        }
	      } else {
	        return this.maybeSubSource(sink, reply);
	      }
	    };
	
	    return PropertyDispatcher;
	
	  })(Dispatcher);
	
	  Property = (function(superClass) {
	    extend(Property, superClass);
	
	    function Property(desc, subscribe, handler) {
	      Property.__super__.constructor.call(this, desc);
	      assertFunction(subscribe);
	      this.dispatcher = new PropertyDispatcher(this, subscribe, handler);
	      registerObs(this);
	    }
	
	    Property.prototype.changes = function() {
	      return new EventStream(new Bacon.Desc(this, "changes", []), (function(_this) {
	        return function(sink) {
	          return _this.dispatcher.subscribe(function(event) {
	            if (!event.isInitial()) {
	              return sink(event);
	            }
	          });
	        };
	      })(this));
	    };
	
	    Property.prototype.withHandler = function(handler) {
	      return new Property(new Bacon.Desc(this, "withHandler", [handler]), this.dispatcher.subscribe, handler);
	    };
	
	    Property.prototype.toProperty = function() {
	      assertNoArguments(arguments);
	      return this;
	    };
	
	    Property.prototype.toEventStream = function() {
	      return new EventStream(new Bacon.Desc(this, "toEventStream", []), (function(_this) {
	        return function(sink) {
	          return _this.dispatcher.subscribe(function(event) {
	            if (event.isInitial()) {
	              event = event.toNext();
	            }
	            return sink(event);
	          });
	        };
	      })(this));
	    };
	
	    return Property;
	
	  })(Observable);
	
	  Bacon.Property = Property;
	
	  Bacon.constant = function(value) {
	    return new Property(new Bacon.Desc(Bacon, "constant", [value]), function(sink) {
	      sink(initialEvent(value));
	      sink(endEvent());
	      return nop;
	    });
	  };
	
	  Bacon.fromBinder = function(binder, eventTransformer) {
	    if (eventTransformer == null) {
	      eventTransformer = _.id;
	    }
	    return new EventStream(new Bacon.Desc(Bacon, "fromBinder", [binder, eventTransformer]), function(sink) {
	      var shouldUnbind, unbind, unbinder, unbound;
	      unbound = false;
	      shouldUnbind = false;
	      unbind = function() {
	        if (!unbound) {
	          if (typeof unbinder !== "undefined" && unbinder !== null) {
	            unbinder();
	            return unbound = true;
	          } else {
	            return shouldUnbind = true;
	          }
	        }
	      };
	      unbinder = binder(function() {
	        var args, event, j, len1, reply, value;
	        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	        value = eventTransformer.apply(this, args);
	        if (!(isArray(value) && _.last(value) instanceof Event)) {
	          value = [value];
	        }
	        reply = Bacon.more;
	        for (j = 0, len1 = value.length; j < len1; j++) {
	          event = value[j];
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
	
	  eventMethods = [["addEventListener", "removeEventListener"], ["addListener", "removeListener"], ["on", "off"], ["bind", "unbind"]];
	
	  findHandlerMethods = function(target) {
	    var j, len1, methodPair, pair;
	    for (j = 0, len1 = eventMethods.length; j < len1; j++) {
	      pair = eventMethods[j];
	      methodPair = [target[pair[0]], target[pair[1]]];
	      if (methodPair[0] && methodPair[1]) {
	        return methodPair;
	      }
	    }
	    throw new Error("No suitable event methods in " + target);
	  };
	
	  Bacon.fromEventTarget = function(target, eventName, eventTransformer) {
	    var ref, sub, unsub;
	    ref = findHandlerMethods(target), sub = ref[0], unsub = ref[1];
	    return withDesc(new Bacon.Desc(Bacon, "fromEvent", [target, eventName]), Bacon.fromBinder(function(handler) {
	      sub.call(target, eventName, handler);
	      return function() {
	        return unsub.call(target, eventName, handler);
	      };
	    }, eventTransformer));
	  };
	
	  Bacon.fromEvent = Bacon.fromEventTarget;
	
	  Bacon.Observable.prototype.map = function() {
	    var args, p;
	    p = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return convertArgsToFunction(this, p, args, function(f) {
	      return withDesc(new Bacon.Desc(this, "map", [f]), this.withHandler(function(event) {
	        return this.push(event.fmap(f));
	      }));
	    });
	  };
	
	  argumentsToObservables = function(args) {
	    if (isArray(args[0])) {
	      return args[0];
	    } else {
	      return Array.prototype.slice.call(args);
	    }
	  };
	
	  argumentsToObservablesAndFunction = function(args) {
	    if (_.isFunction(args[0])) {
	      return [argumentsToObservables(Array.prototype.slice.call(args, 1)), args[0]];
	    } else {
	      return [argumentsToObservables(Array.prototype.slice.call(args, 0, args.length - 1)), _.last(args)];
	    }
	  };
	
	  Bacon.combineAsArray = function() {
	    var index, j, len1, s, sources, stream, streams;
	    streams = argumentsToObservables(arguments);
	    for (index = j = 0, len1 = streams.length; j < len1; index = ++j) {
	      stream = streams[index];
	      if (!(isObservable(stream))) {
	        streams[index] = Bacon.constant(stream);
	      }
	    }
	    if (streams.length) {
	      sources = (function() {
	        var k, len2, results;
	        results = [];
	        for (k = 0, len2 = streams.length; k < len2; k++) {
	          s = streams[k];
	          results.push(new Source(s, true));
	        }
	        return results;
	      })();
	      return withDesc(new Bacon.Desc(Bacon, "combineAsArray", streams), Bacon.when(sources, (function() {
	        var xs;
	        xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	        return xs;
	      })).toProperty());
	    } else {
	      return Bacon.constant([]);
	    }
	  };
	
	  Bacon.onValues = function() {
	    var f, j, streams;
	    streams = 2 <= arguments.length ? slice.call(arguments, 0, j = arguments.length - 1) : (j = 0, []), f = arguments[j++];
	    return Bacon.combineAsArray(streams).onValues(f);
	  };
	
	  Bacon.combineWith = function() {
	    var f, ref, streams;
	    ref = argumentsToObservablesAndFunction(arguments), streams = ref[0], f = ref[1];
	    return withDesc(new Bacon.Desc(Bacon, "combineWith", [f].concat(slice.call(streams))), Bacon.combineAsArray(streams).map(function(values) {
	      return f.apply(null, values);
	    }));
	  };
	
	  Bacon.Observable.prototype.combine = function(other, f) {
	    var combinator;
	    combinator = toCombinator(f);
	    return withDesc(new Bacon.Desc(this, "combine", [other, f]), Bacon.combineAsArray(this, other).map(function(values) {
	      return combinator(values[0], values[1]);
	    }));
	  };
	
	  Bacon.Observable.prototype.withStateMachine = function(initState, f) {
	    var state;
	    state = initState;
	    return withDesc(new Bacon.Desc(this, "withStateMachine", [initState, f]), this.withHandler(function(event) {
	      var fromF, j, len1, newState, output, outputs, reply;
	      fromF = f(state, event);
	      newState = fromF[0], outputs = fromF[1];
	      state = newState;
	      reply = Bacon.more;
	      for (j = 0, len1 = outputs.length; j < len1; j++) {
	        output = outputs[j];
	        reply = this.push(output);
	        if (reply === Bacon.noMore) {
	          return reply;
	        }
	      }
	      return reply;
	    }));
	  };
	
	  Bacon.Observable.prototype.skipDuplicates = function(isEqual) {
	    if (isEqual == null) {
	      isEqual = function(a, b) {
	        return a === b;
	      };
	    }
	    return withDesc(new Bacon.Desc(this, "skipDuplicates", []), this.withStateMachine(None, function(prev, event) {
	      if (!event.hasValue()) {
	        return [prev, [event]];
	      } else if (event.isInitial() || prev === None || !isEqual(prev.get(), event.value())) {
	        return [new Some(event.value()), [event]];
	      } else {
	        return [prev, []];
	      }
	    }));
	  };
	
	  Bacon.Observable.prototype.awaiting = function(other) {
	    return withDesc(new Bacon.Desc(this, "awaiting", [other]), Bacon.groupSimultaneous(this, other).map(function(arg) {
	      var myValues, otherValues;
	      myValues = arg[0], otherValues = arg[1];
	      return otherValues.length === 0;
	    }).toProperty(false).skipDuplicates());
	  };
	
	  Bacon.Observable.prototype.not = function() {
	    return withDesc(new Bacon.Desc(this, "not", []), this.map(function(x) {
	      return !x;
	    }));
	  };
	
	  Bacon.Property.prototype.and = function(other) {
	    return withDesc(new Bacon.Desc(this, "and", [other]), this.combine(other, function(x, y) {
	      return x && y;
	    }));
	  };
	
	  Bacon.Property.prototype.or = function(other) {
	    return withDesc(new Bacon.Desc(this, "or", [other]), this.combine(other, function(x, y) {
	      return x || y;
	    }));
	  };
	
	  Bacon.scheduler = {
	    setTimeout: function(f, d) {
	      return setTimeout(f, d);
	    },
	    setInterval: function(f, i) {
	      return setInterval(f, i);
	    },
	    clearInterval: function(id) {
	      return clearInterval(id);
	    },
	    clearTimeout: function(id) {
	      return clearTimeout(id);
	    },
	    now: function() {
	      return new Date().getTime();
	    }
	  };
	
	  Bacon.EventStream.prototype.bufferWithTime = function(delay) {
	    return withDesc(new Bacon.Desc(this, "bufferWithTime", [delay]), this.bufferWithTimeOrCount(delay, Number.MAX_VALUE));
	  };
	
	  Bacon.EventStream.prototype.bufferWithCount = function(count) {
	    return withDesc(new Bacon.Desc(this, "bufferWithCount", [count]), this.bufferWithTimeOrCount(void 0, count));
	  };
	
	  Bacon.EventStream.prototype.bufferWithTimeOrCount = function(delay, count) {
	    var flushOrSchedule;
	    flushOrSchedule = function(buffer) {
	      if (buffer.values.length === count) {
	        return buffer.flush();
	      } else if (delay !== void 0) {
	        return buffer.schedule();
	      }
	    };
	    return withDesc(new Bacon.Desc(this, "bufferWithTimeOrCount", [delay, count]), this.buffer(delay, flushOrSchedule, flushOrSchedule));
	  };
	
	  Bacon.EventStream.prototype.buffer = function(delay, onInput, onFlush) {
	    var buffer, delayMs, reply;
	    if (onInput == null) {
	      onInput = nop;
	    }
	    if (onFlush == null) {
	      onFlush = nop;
	    }
	    buffer = {
	      scheduled: null,
	      end: void 0,
	      values: [],
	      flush: function() {
	        var reply, valuesToPush;
	        if (this.scheduled) {
	          Bacon.scheduler.clearTimeout(this.scheduled);
	          this.scheduled = null;
	        }
	        if (this.values.length > 0) {
	          valuesToPush = this.values;
	          this.values = [];
	          reply = this.push(nextEvent(valuesToPush));
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
	      schedule: function() {
	        if (!this.scheduled) {
	          return this.scheduled = delay((function(_this) {
	            return function() {
	              return _this.flush();
	            };
	          })(this));
	        }
	      }
	    };
	    reply = Bacon.more;
	    if (!_.isFunction(delay)) {
	      delayMs = delay;
	      delay = function(f) {
	        return Bacon.scheduler.setTimeout(f, delayMs);
	      };
	    }
	    return withDesc(new Bacon.Desc(this, "buffer", []), this.withHandler(function(event) {
	      buffer.push = (function(_this) {
	        return function(event) {
	          return _this.push(event);
	        };
	      })(this);
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
	
	  Bacon.Observable.prototype.filter = function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    assertObservableIsProperty(f);
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDesc(new Bacon.Desc(this, "filter", [f]), this.withHandler(function(event) {
	        if (event.filter(f)) {
	          return this.push(event);
	        } else {
	          return Bacon.more;
	        }
	      }));
	    });
	  };
	
	  Bacon.once = function(value) {
	    return new EventStream(new Desc(Bacon, "once", [value]), function(sink) {
	      sink(toEvent(value));
	      sink(endEvent());
	      return nop;
	    });
	  };
	
	  Bacon.EventStream.prototype.concat = function(right) {
	    var left;
	    left = this;
	    return new EventStream(new Bacon.Desc(left, "concat", [right]), function(sink) {
	      var unsubLeft, unsubRight;
	      unsubRight = nop;
	      unsubLeft = left.dispatcher.subscribe(function(e) {
	        if (e.isEnd()) {
	          return unsubRight = right.dispatcher.subscribe(sink);
	        } else {
	          return sink(e);
	        }
	      });
	      return function() {
	        unsubLeft();
	        return unsubRight();
	      };
	    });
	  };
	
	  Bacon.Observable.prototype.flatMap = function() {
	    return flatMap_(this, makeSpawner(arguments));
	  };
	
	  Bacon.Observable.prototype.flatMapFirst = function() {
	    return flatMap_(this, makeSpawner(arguments), true);
	  };
	
	  flatMap_ = function(root, f, firstOnly, limit) {
	    var childDeps, result, rootDep;
	    rootDep = [root];
	    childDeps = [];
	    result = new EventStream(new Bacon.Desc(root, "flatMap" + (firstOnly ? "First" : ""), [f]), function(sink) {
	      var checkEnd, checkQueue, composite, queue, spawn;
	      composite = new CompositeUnsubscribe();
	      queue = [];
	      spawn = function(event) {
	        var child;
	        child = makeObservable(f(event.value()));
	        childDeps.push(child);
	        return composite.add(function(unsubAll, unsubMe) {
	          return child.dispatcher.subscribe(function(event) {
	            var reply;
	            if (event.isEnd()) {
	              _.remove(child, childDeps);
	              checkQueue();
	              checkEnd(unsubMe);
	              return Bacon.noMore;
	            } else {
	              if (event instanceof Initial) {
	                event = event.toNext();
	              }
	              reply = sink(event);
	              if (reply === Bacon.noMore) {
	                unsubAll();
	              }
	              return reply;
	            }
	          });
	        });
	      };
	      checkQueue = function() {
	        var event;
	        event = queue.shift();
	        if (event) {
	          return spawn(event);
	        }
	      };
	      checkEnd = function(unsub) {
	        unsub();
	        if (composite.empty()) {
	          return sink(endEvent());
	        }
	      };
	      composite.add(function(__, unsubRoot) {
	        return root.dispatcher.subscribe(function(event) {
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
	    result.internalDeps = function() {
	      if (childDeps.length) {
	        return rootDep.concat(childDeps);
	      } else {
	        return rootDep;
	      }
	    };
	    return result;
	  };
	
	  makeSpawner = function(args) {
	    if (args.length === 1 && isObservable(args[0])) {
	      return _.always(args[0]);
	    } else {
	      return makeFunctionArgs(args);
	    }
	  };
	
	  makeObservable = function(x) {
	    if (isObservable(x)) {
	      return x;
	    } else {
	      return Bacon.once(x);
	    }
	  };
	
	  Bacon.Observable.prototype.flatMapWithConcurrencyLimit = function() {
	    var args, limit;
	    limit = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return withDesc(new Bacon.Desc(this, "flatMapWithConcurrencyLimit", [limit].concat(slice.call(args))), flatMap_(this, makeSpawner(args), false, limit));
	  };
	
	  Bacon.Observable.prototype.flatMapConcat = function() {
	    return withDesc(new Bacon.Desc(this, "flatMapConcat", Array.prototype.slice.call(arguments, 0)), this.flatMapWithConcurrencyLimit.apply(this, [1].concat(slice.call(arguments))));
	  };
	
	  Bacon.later = function(delay, value) {
	    return withDesc(new Bacon.Desc(Bacon, "later", [delay, value]), Bacon.fromBinder(function(sink) {
	      var id, sender;
	      sender = function() {
	        return sink([value, endEvent()]);
	      };
	      id = Bacon.scheduler.setTimeout(sender, delay);
	      return function() {
	        return Bacon.scheduler.clearTimeout(id);
	      };
	    }));
	  };
	
	  Bacon.Observable.prototype.bufferingThrottle = function(minimumInterval) {
	    return withDesc(new Bacon.Desc(this, "bufferingThrottle", [minimumInterval]), this.flatMapConcat(function(x) {
	      return Bacon.once(x).concat(Bacon.later(minimumInterval).filter(false));
	    }));
	  };
	
	  Bacon.Property.prototype.bufferingThrottle = function() {
	    return Bacon.Observable.prototype.bufferingThrottle.apply(this, arguments).toProperty();
	  };
	
	  Bus = (function(superClass) {
	    extend(Bus, superClass);
	
	    function Bus() {
	      this.guardedSink = bind(this.guardedSink, this);
	      this.subscribeAll = bind(this.subscribeAll, this);
	      this.unsubAll = bind(this.unsubAll, this);
	      if (!(this instanceof Bus)) {
	        return new Bus();
	      }
	      this.sink = void 0;
	      this.subscriptions = [];
	      this.ended = false;
	      Bus.__super__.constructor.call(this, new Bacon.Desc(Bacon, "Bus", []), this.subscribeAll);
	    }
	
	    Bus.prototype.unsubAll = function() {
	      var j, len1, ref, sub;
	      ref = this.subscriptions;
	      for (j = 0, len1 = ref.length; j < len1; j++) {
	        sub = ref[j];
	        if (typeof sub.unsub === "function") {
	          sub.unsub();
	        }
	      }
	      return void 0;
	    };
	
	    Bus.prototype.subscribeAll = function(newSink) {
	      var j, len1, ref, subscription;
	      if (this.ended) {
	        newSink(endEvent());
	      } else {
	        this.sink = newSink;
	        ref = cloneArray(this.subscriptions);
	        for (j = 0, len1 = ref.length; j < len1; j++) {
	          subscription = ref[j];
	          this.subscribeInput(subscription);
	        }
	      }
	      return this.unsubAll;
	    };
	
	    Bus.prototype.guardedSink = function(input) {
	      return (function(_this) {
	        return function(event) {
	          if (event.isEnd()) {
	            _this.unsubscribeInput(input);
	            return Bacon.noMore;
	          } else {
	            return _this.sink(event);
	          }
	        };
	      })(this);
	    };
	
	    Bus.prototype.subscribeInput = function(subscription) {
	      return subscription.unsub = subscription.input.dispatcher.subscribe(this.guardedSink(subscription.input));
	    };
	
	    Bus.prototype.unsubscribeInput = function(input) {
	      var i, j, len1, ref, sub;
	      ref = this.subscriptions;
	      for (i = j = 0, len1 = ref.length; j < len1; i = ++j) {
	        sub = ref[i];
	        if (sub.input === input) {
	          if (typeof sub.unsub === "function") {
	            sub.unsub();
	          }
	          this.subscriptions.splice(i, 1);
	          return;
	        }
	      }
	    };
	
	    Bus.prototype.plug = function(input) {
	      var sub;
	      assertObservable(input);
	      if (this.ended) {
	        return;
	      }
	      sub = {
	        input: input
	      };
	      this.subscriptions.push(sub);
	      if ((this.sink != null)) {
	        this.subscribeInput(sub);
	      }
	      return (function(_this) {
	        return function() {
	          return _this.unsubscribeInput(input);
	        };
	      })(this);
	    };
	
	    Bus.prototype.end = function() {
	      this.ended = true;
	      this.unsubAll();
	      return typeof this.sink === "function" ? this.sink(endEvent()) : void 0;
	    };
	
	    Bus.prototype.push = function(value) {
	      if (!this.ended) {
	        return typeof this.sink === "function" ? this.sink(nextEvent(value)) : void 0;
	      }
	    };
	
	    Bus.prototype.error = function(error) {
	      return typeof this.sink === "function" ? this.sink(new Error(error)) : void 0;
	    };
	
	    return Bus;
	
	  })(EventStream);
	
	  Bacon.Bus = Bus;
	
	  liftCallback = function(desc, wrapped) {
	    return withMethodCallSupport(function() {
	      var args, f, stream;
	      f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	      stream = partiallyApplied(wrapped, [
	        function(values, callback) {
	          return f.apply(null, slice.call(values).concat([callback]));
	        }
	      ]);
	      return withDesc(new Bacon.Desc(Bacon, desc, [f].concat(slice.call(args))), Bacon.combineAsArray(args).flatMap(stream));
	    });
	  };
	
	  Bacon.fromCallback = liftCallback("fromCallback", function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return Bacon.fromBinder(function(handler) {
	      makeFunction(f, args)(handler);
	      return nop;
	    }, (function(value) {
	      return [value, endEvent()];
	    }));
	  });
	
	  Bacon.fromNodeCallback = liftCallback("fromNodeCallback", function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    return Bacon.fromBinder(function(handler) {
	      makeFunction(f, args)(handler);
	      return nop;
	    }, function(error, value) {
	      if (error) {
	        return [new Error(error), endEvent()];
	      }
	      return [value, endEvent()];
	    });
	  });
	
	  Bacon.combineTemplate = function(template) {
	    var applyStreamValue, combinator, compile, compileTemplate, constantValue, current, funcs, mkContext, pushContext, setValue, streams;
	    funcs = [];
	    streams = [];
	    current = function(ctxStack) {
	      return ctxStack[ctxStack.length - 1];
	    };
	    setValue = function(ctxStack, key, value) {
	      return current(ctxStack)[key] = value;
	    };
	    applyStreamValue = function(key, index) {
	      return function(ctxStack, values) {
	        return setValue(ctxStack, key, values[index]);
	      };
	    };
	    constantValue = function(key, value) {
	      return function(ctxStack) {
	        return setValue(ctxStack, key, value);
	      };
	    };
	    mkContext = function(template) {
	      if (isArray(template)) {
	        return [];
	      } else {
	        return {};
	      }
	    };
	    pushContext = function(key, value) {
	      return function(ctxStack) {
	        var newContext;
	        newContext = mkContext(value);
	        setValue(ctxStack, key, newContext);
	        return ctxStack.push(newContext);
	      };
	    };
	    compile = function(key, value) {
	      var popContext;
	      if (isObservable(value)) {
	        streams.push(value);
	        return funcs.push(applyStreamValue(key, streams.length - 1));
	      } else if (value === Object(value) && typeof value !== "function" && !(value instanceof RegExp) && !(value instanceof Date)) {
	        popContext = function(ctxStack) {
	          return ctxStack.pop();
	        };
	        funcs.push(pushContext(key, value));
	        compileTemplate(value);
	        return funcs.push(popContext);
	      } else {
	        return funcs.push(constantValue(key, value));
	      }
	    };
	    compileTemplate = function(template) {
	      return _.each(template, compile);
	    };
	    compileTemplate(template);
	    combinator = function(values) {
	      var ctxStack, f, j, len1, rootContext;
	      rootContext = mkContext(template);
	      ctxStack = [rootContext];
	      for (j = 0, len1 = funcs.length; j < len1; j++) {
	        f = funcs[j];
	        f(ctxStack, values);
	      }
	      return rootContext;
	    };
	    return withDesc(new Bacon.Desc(Bacon, "combineTemplate", [template]), Bacon.combineAsArray(streams).map(combinator));
	  };
	
	  addPropertyInitValueToStream = function(property, stream) {
	    var justInitValue;
	    justInitValue = new EventStream(describe(property, "justInitValue"), function(sink) {
	      var unsub, value;
	      value = void 0;
	      unsub = property.dispatcher.subscribe(function(event) {
	        if (!event.isEnd()) {
	          value = event;
	        }
	        return Bacon.noMore;
	      });
	      UpdateBarrier.whenDoneWith(justInitValue, function() {
	        if (value != null) {
	          sink(value);
	        }
	        return sink(endEvent());
	      });
	      return unsub;
	    });
	    return justInitValue.concat(stream).toProperty();
	  };
	
	  Bacon.Observable.prototype.mapEnd = function() {
	    var f;
	    f = makeFunctionArgs(arguments);
	    return withDesc(new Bacon.Desc(this, "mapEnd", [f]), this.withHandler(function(event) {
	      if (event.isEnd()) {
	        this.push(nextEvent(f(event)));
	        this.push(endEvent());
	        return Bacon.noMore;
	      } else {
	        return this.push(event);
	      }
	    }));
	  };
	
	  Bacon.Observable.prototype.skipErrors = function() {
	    return withDesc(new Bacon.Desc(this, "skipErrors", []), this.withHandler(function(event) {
	      if (event.isError()) {
	        return Bacon.more;
	      } else {
	        return this.push(event);
	      }
	    }));
	  };
	
	  Bacon.EventStream.prototype.takeUntil = function(stopper) {
	    var endMarker;
	    endMarker = {};
	    return withDesc(new Bacon.Desc(this, "takeUntil", [stopper]), Bacon.groupSimultaneous(this.mapEnd(endMarker), stopper.skipErrors()).withHandler(function(event) {
	      var data, j, len1, ref, reply, value;
	      if (!event.hasValue()) {
	        return this.push(event);
	      } else {
	        ref = event.value(), data = ref[0], stopper = ref[1];
	        if (stopper.length) {
	          return this.push(endEvent());
	        } else {
	          reply = Bacon.more;
	          for (j = 0, len1 = data.length; j < len1; j++) {
	            value = data[j];
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
	
	  Bacon.Property.prototype.takeUntil = function(stopper) {
	    var changes;
	    changes = this.changes().takeUntil(stopper);
	    return withDesc(new Bacon.Desc(this, "takeUntil", [stopper]), addPropertyInitValueToStream(this, changes));
	  };
	
	  Bacon.Observable.prototype.flatMapLatest = function() {
	    var f, stream;
	    f = makeSpawner(arguments);
	    stream = this.toEventStream();
	    return withDesc(new Bacon.Desc(this, "flatMapLatest", [f]), stream.flatMap(function(value) {
	      return makeObservable(f(value)).takeUntil(stream);
	    }));
	  };
	
	  Bacon.Property.prototype.delayChanges = function(desc, f) {
	    return withDesc(desc, addPropertyInitValueToStream(this, f(this.changes())));
	  };
	
	  Bacon.EventStream.prototype.delay = function(delay) {
	    return withDesc(new Bacon.Desc(this, "delay", [delay]), this.flatMap(function(value) {
	      return Bacon.later(delay, value);
	    }));
	  };
	
	  Bacon.Property.prototype.delay = function(delay) {
	    return this.delayChanges(new Bacon.Desc(this, "delay", [delay]), function(changes) {
	      return changes.delay(delay);
	    });
	  };
	
	  Bacon.EventStream.prototype.debounce = function(delay) {
	    return withDesc(new Bacon.Desc(this, "debounce", [delay]), this.flatMapLatest(function(value) {
	      return Bacon.later(delay, value);
	    }));
	  };
	
	  Bacon.Property.prototype.debounce = function(delay) {
	    return this.delayChanges(new Bacon.Desc(this, "debounce", [delay]), function(changes) {
	      return changes.debounce(delay);
	    });
	  };
	
	  Bacon.EventStream.prototype.debounceImmediate = function(delay) {
	    return withDesc(new Bacon.Desc(this, "debounceImmediate", [delay]), this.flatMapFirst(function(value) {
	      return Bacon.once(value).concat(Bacon.later(delay).filter(false));
	    }));
	  };
	
	  Bacon.Observable.prototype.decode = function(cases) {
	    return withDesc(new Bacon.Desc(this, "decode", [cases]), this.combine(Bacon.combineTemplate(cases), function(key, values) {
	      return values[key];
	    }));
	  };
	
	  Bacon.Observable.prototype.scan = function(seed, f) {
	    var acc, initHandled, resultProperty, subscribe;
	    f = toCombinator(f);
	    acc = toOption(seed);
	    initHandled = false;
	    subscribe = (function(_this) {
	      return function(sink) {
	        var initSent, reply, sendInit, unsub;
	        initSent = false;
	        unsub = nop;
	        reply = Bacon.more;
	        sendInit = function() {
	          if (!initSent) {
	            return acc.forEach(function(value) {
	              initSent = initHandled = true;
	              reply = sink(new Initial(function() {
	                return value;
	              }));
	              if (reply === Bacon.noMore) {
	                unsub();
	                return unsub = nop;
	              }
	            });
	          }
	        };
	        unsub = _this.dispatcher.subscribe(function(event) {
	          var next, prev;
	          if (event.hasValue()) {
	            if (initHandled && event.isInitial()) {
	              return Bacon.more;
	            } else {
	              if (!event.isInitial()) {
	                sendInit();
	              }
	              initSent = initHandled = true;
	              prev = acc.getOrElse(void 0);
	              next = f(prev, event.value());
	              acc = new Some(next);
	              return sink(event.apply(function() {
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
	    })(this);
	    return resultProperty = new Property(new Bacon.Desc(this, "scan", [seed, f]), subscribe);
	  };
	
	  Bacon.Observable.prototype.diff = function(start, f) {
	    f = toCombinator(f);
	    return withDesc(new Bacon.Desc(this, "diff", [start, f]), this.scan([start], function(prevTuple, next) {
	      return [next, f(prevTuple[0], next)];
	    }).filter(function(tuple) {
	      return tuple.length === 2;
	    }).map(function(tuple) {
	      return tuple[1];
	    }));
	  };
	
	  Bacon.Observable.prototype.doAction = function() {
	    var f;
	    f = makeFunctionArgs(arguments);
	    return withDesc(new Bacon.Desc(this, "doAction", [f]), this.withHandler(function(event) {
	      if (event.hasValue()) {
	        f(event.value());
	      }
	      return this.push(event);
	    }));
	  };
	
	  Bacon.Observable.prototype.doError = function() {
	    var f;
	    f = makeFunctionArgs(arguments);
	    return withDesc(new Bacon.Desc(this, "doError", [f]), this.withHandler(function(event) {
	      if (event.isError()) {
	        f(event.error);
	      }
	      return this.push(event);
	    }));
	  };
	
	  Bacon.Observable.prototype.doLog = function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    return withDesc(new Bacon.Desc(this, "doLog", args), this.withHandler(function(event) {
	      if (typeof console !== "undefined" && console !== null) {
	        if (typeof console.log === "function") {
	          console.log.apply(console, slice.call(args).concat([event.log()]));
	        }
	      }
	      return this.push(event);
	    }));
	  };
	
	  Bacon.Observable.prototype.endOnError = function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    if (f == null) {
	      f = true;
	    }
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDesc(new Bacon.Desc(this, "endOnError", []), this.withHandler(function(event) {
	        if (event.isError() && f(event.error)) {
	          this.push(event);
	          return this.push(endEvent());
	        } else {
	          return this.push(event);
	        }
	      }));
	    });
	  };
	
	  Observable.prototype.errors = function() {
	    return withDesc(new Bacon.Desc(this, "errors", []), this.filter(function() {
	      return false;
	    }));
	  };
	
	  valueAndEnd = (function(value) {
	    return [value, endEvent()];
	  });
	
	  Bacon.fromPromise = function(promise, abort, eventTransformer) {
	    if (eventTransformer == null) {
	      eventTransformer = valueAndEnd;
	    }
	    return withDesc(new Bacon.Desc(Bacon, "fromPromise", [promise]), Bacon.fromBinder(function(handler) {
	      var ref;
	      if ((ref = promise.then(handler, function(e) {
	        return handler(new Error(e));
	      })) != null) {
	        if (typeof ref.done === "function") {
	          ref.done();
	        }
	      }
	      return function() {
	        if (abort) {
	          return typeof promise.abort === "function" ? promise.abort() : void 0;
	        }
	      };
	    }, eventTransformer));
	  };
	
	  Bacon.Observable.prototype.mapError = function() {
	    var f;
	    f = makeFunctionArgs(arguments);
	    return withDesc(new Bacon.Desc(this, "mapError", [f]), this.withHandler(function(event) {
	      if (event.isError()) {
	        return this.push(nextEvent(f(event.error)));
	      } else {
	        return this.push(event);
	      }
	    }));
	  };
	
	  Bacon.Observable.prototype.flatMapError = function(fn) {
	    return withDesc(new Bacon.Desc(this, "flatMapError", [fn]), this.mapError(function(err) {
	      return new Error(err);
	    }).flatMap(function(x) {
	      if (x instanceof Error) {
	        return fn(x.error);
	      } else {
	        return Bacon.once(x);
	      }
	    }));
	  };
	
	  Bacon.EventStream.prototype.sampledBy = function(sampler, combinator) {
	    return withDesc(new Bacon.Desc(this, "sampledBy", [sampler, combinator]), this.toProperty().sampledBy(sampler, combinator));
	  };
	
	  Bacon.Property.prototype.sampledBy = function(sampler, combinator) {
	    var lazy, result, samplerSource, stream, thisSource;
	    if (combinator != null) {
	      combinator = toCombinator(combinator);
	    } else {
	      lazy = true;
	      combinator = function(f) {
	        return f.value();
	      };
	    }
	    thisSource = new Source(this, false, lazy);
	    samplerSource = new Source(sampler, true, lazy);
	    stream = Bacon.when([thisSource, samplerSource], combinator);
	    result = sampler instanceof Property ? stream.toProperty() : stream;
	    return withDesc(new Bacon.Desc(this, "sampledBy", [sampler, combinator]), result);
	  };
	
	  Bacon.Property.prototype.sample = function(interval) {
	    return withDesc(new Bacon.Desc(this, "sample", [interval]), this.sampledBy(Bacon.interval(interval, {})));
	  };
	
	  Bacon.Observable.prototype.map = function() {
	    var args, p;
	    p = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    if (p instanceof Property) {
	      return p.sampledBy(this, former);
	    } else {
	      return convertArgsToFunction(this, p, args, function(f) {
	        return withDesc(new Bacon.Desc(this, "map", [f]), this.withHandler(function(event) {
	          return this.push(event.fmap(f));
	        }));
	      });
	    }
	  };
	
	  Bacon.Observable.prototype.fold = function(seed, f) {
	    return withDesc(new Bacon.Desc(this, "fold", [seed, f]), this.scan(seed, f).sampledBy(this.filter(false).mapEnd().toProperty()));
	  };
	
	  Observable.prototype.reduce = Observable.prototype.fold;
	
	  Bacon.fromPoll = function(delay, poll) {
	    return withDesc(new Bacon.Desc(Bacon, "fromPoll", [delay, poll]), Bacon.fromBinder((function(handler) {
	      var id;
	      id = Bacon.scheduler.setInterval(handler, delay);
	      return function() {
	        return Bacon.scheduler.clearInterval(id);
	      };
	    }), poll));
	  };
	
	  Bacon.Observable.prototype.groupBy = function(keyF, limitF) {
	    var src, streams;
	    if (limitF == null) {
	      limitF = Bacon._.id;
	    }
	    streams = {};
	    src = this;
	    return src.filter(function(x) {
	      return !streams[keyF(x)];
	    }).map(function(x) {
	      var data, key, limited, similar;
	      key = keyF(x);
	      similar = src.filter(function(x) {
	        return keyF(x) === key;
	      });
	      data = Bacon.once(x).concat(similar);
	      limited = limitF(data, x).withHandler(function(event) {
	        this.push(event);
	        if (event.isEnd()) {
	          return delete streams[key];
	        }
	      });
	      return streams[key] = limited;
	    });
	  };
	
	  Bacon.fromArray = function(values) {
	    var i;
	    assertArray(values);
	    if (!values.length) {
	      return withDesc(new Bacon.Desc(Bacon, "fromArray", values), Bacon.never());
	    } else {
	      i = 0;
	      return new EventStream(new Bacon.Desc(Bacon, "fromArray", [values]), function(sink) {
	        var push, pushNeeded, pushing, reply, unsubd;
	        unsubd = false;
	        reply = Bacon.more;
	        pushing = false;
	        pushNeeded = false;
	        push = function() {
	          var value;
	          pushNeeded = true;
	          if (pushing) {
	            return;
	          }
	          pushing = true;
	          while (pushNeeded) {
	            pushNeeded = false;
	            if ((reply !== Bacon.noMore) && !unsubd) {
	              value = values[i++];
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
	          return pushing = false;
	        };
	        push();
	        return function() {
	          return unsubd = true;
	        };
	      });
	    }
	  };
	
	  Bacon.EventStream.prototype.holdWhen = function(valve) {
	    var bufferedValues, onHold, src;
	    onHold = false;
	    bufferedValues = [];
	    src = this;
	    return new EventStream(new Bacon.Desc(this, "holdWhen", [valve]), function(sink) {
	      var composite, endIfBothEnded, subscribed;
	      composite = new CompositeUnsubscribe();
	      subscribed = false;
	      endIfBothEnded = function(unsub) {
	        if (typeof unsub === "function") {
	          unsub();
	        }
	        if (composite.empty() && subscribed) {
	          return sink(endEvent());
	        }
	      };
	      composite.add(function(unsubAll, unsubMe) {
	        return valve.subscribeInternal(function(event) {
	          var j, len1, results, toSend, value;
	          if (event.hasValue()) {
	            onHold = event.value();
	            if (!onHold) {
	              toSend = bufferedValues;
	              bufferedValues = [];
	              results = [];
	              for (j = 0, len1 = toSend.length; j < len1; j++) {
	                value = toSend[j];
	                results.push(sink(nextEvent(value)));
	              }
	              return results;
	            }
	          } else if (event.isEnd()) {
	            return endIfBothEnded(unsubMe);
	          } else {
	            return sink(event);
	          }
	        });
	      });
	      composite.add(function(unsubAll, unsubMe) {
	        return src.subscribeInternal(function(event) {
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
	
	  Bacon.interval = function(delay, value) {
	    if (value == null) {
	      value = {};
	    }
	    return withDesc(new Bacon.Desc(Bacon, "interval", [delay, value]), Bacon.fromPoll(delay, function() {
	      return nextEvent(value);
	    }));
	  };
	
	  Bacon.$ = {};
	
	  Bacon.$.asEventStream = function(eventName, selector, eventTransformer) {
	    var ref;
	    if (_.isFunction(selector)) {
	      ref = [selector, void 0], eventTransformer = ref[0], selector = ref[1];
	    }
	    return withDesc(new Bacon.Desc(this.selector || this, "asEventStream", [eventName]), Bacon.fromBinder((function(_this) {
	      return function(handler) {
	        _this.on(eventName, selector, handler);
	        return function() {
	          return _this.off(eventName, selector, handler);
	        };
	      };
	    })(this), eventTransformer));
	  };
	
	  if ((ref = typeof jQuery !== "undefined" && jQuery !== null ? jQuery : typeof Zepto !== "undefined" && Zepto !== null ? Zepto : void 0) != null) {
	    ref.fn.asEventStream = Bacon.$.asEventStream;
	  }
	
	  Bacon.Observable.prototype.log = function() {
	    var args;
	    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    this.subscribe(function(event) {
	      return typeof console !== "undefined" && console !== null ? typeof console.log === "function" ? console.log.apply(console, slice.call(args).concat([event.log()])) : void 0 : void 0;
	    });
	    return this;
	  };
	
	  Bacon.EventStream.prototype.merge = function(right) {
	    var left;
	    assertEventStream(right);
	    left = this;
	    return withDesc(new Bacon.Desc(left, "merge", [right]), Bacon.mergeAll(this, right));
	  };
	
	  Bacon.mergeAll = function() {
	    var streams;
	    streams = argumentsToObservables(arguments);
	    if (streams.length) {
	      return new EventStream(new Bacon.Desc(Bacon, "mergeAll", streams), function(sink) {
	        var ends, sinks, smartSink;
	        ends = 0;
	        smartSink = function(obs) {
	          return function(unsubBoth) {
	            return obs.dispatcher.subscribe(function(event) {
	              var reply;
	              if (event.isEnd()) {
	                ends++;
	                if (ends === streams.length) {
	                  return sink(endEvent());
	                } else {
	                  return Bacon.more;
	                }
	              } else {
	                reply = sink(event);
	                if (reply === Bacon.noMore) {
	                  unsubBoth();
	                }
	                return reply;
	              }
	            });
	          };
	        };
	        sinks = _.map(smartSink, streams);
	        return new Bacon.CompositeUnsubscribe(sinks).unsubscribe;
	      });
	    } else {
	      return Bacon.never();
	    }
	  };
	
	  Bacon.repeatedly = function(delay, values) {
	    var index;
	    index = 0;
	    return withDesc(new Bacon.Desc(Bacon, "repeatedly", [delay, values]), Bacon.fromPoll(delay, function() {
	      return values[index++ % values.length];
	    }));
	  };
	
	  Bacon.repeat = function(generator) {
	    var index;
	    index = 0;
	    return Bacon.fromBinder(function(sink) {
	      var flag, handleEvent, reply, subscribeNext, unsub;
	      flag = false;
	      reply = Bacon.more;
	      unsub = function() {};
	      handleEvent = function(event) {
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
	      subscribeNext = function() {
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
	      return function() {
	        return unsub();
	      };
	    });
	  };
	
	  Bacon.retry = function(options) {
	    var delay, error, finished, isRetryable, maxRetries, retries, source;
	    if (!_.isFunction(options.source)) {
	      throw new Exception("'source' option has to be a function");
	    }
	    source = options.source;
	    retries = options.retries || 0;
	    maxRetries = options.maxRetries || retries;
	    delay = options.delay || function() {
	      return 0;
	    };
	    isRetryable = options.isRetryable || function() {
	      return true;
	    };
	    finished = false;
	    error = null;
	    return withDesc(new Bacon.Desc(Bacon, "retry", [options]), Bacon.repeat(function() {
	      var context, pause, valueStream;
	      if (finished) {
	        return null;
	      } else {
	        valueStream = function() {
	          return source().endOnError().withHandler(function(event) {
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
	        };
	        if (error) {
	          context = {
	            error: error.error,
	            retriesDone: maxRetries - retries
	          };
	          pause = Bacon.later(delay(context)).filter(false);
	          retries = retries - 1;
	          return pause.concat(Bacon.once().flatMap(valueStream));
	        } else {
	          return valueStream();
	        }
	      }
	    }));
	  };
	
	  Bacon.sequentially = function(delay, values) {
	    var index;
	    index = 0;
	    return withDesc(new Bacon.Desc(Bacon, "sequentially", [delay, values]), Bacon.fromPoll(delay, function() {
	      var value;
	      value = values[index++];
	      if (index < values.length) {
	        return value;
	      } else if (index === values.length) {
	        return [value, endEvent()];
	      } else {
	        return endEvent();
	      }
	    }));
	  };
	
	  Bacon.Observable.prototype.skip = function(count) {
	    return withDesc(new Bacon.Desc(this, "skip", [count]), this.withHandler(function(event) {
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
	
	  Bacon.Observable.prototype.take = function(count) {
	    if (count <= 0) {
	      return Bacon.never();
	    }
	    return withDesc(new Bacon.Desc(this, "take", [count]), this.withHandler(function(event) {
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
	
	  Bacon.EventStream.prototype.skipUntil = function(starter) {
	    var started;
	    started = starter.take(1).map(true).toProperty(false);
	    return withDesc(new Bacon.Desc(this, "skipUntil", [starter]), this.filter(started));
	  };
	
	  Bacon.EventStream.prototype.skipWhile = function() {
	    var args, f, ok;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    assertObservableIsProperty(f);
	    ok = false;
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDesc(new Bacon.Desc(this, "skipWhile", [f]), this.withHandler(function(event) {
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
	
	  Bacon.Observable.prototype.slidingWindow = function(n, minValues) {
	    if (minValues == null) {
	      minValues = 0;
	    }
	    return withDesc(new Bacon.Desc(this, "slidingWindow", [n, minValues]), this.scan([], (function(window, value) {
	      return window.concat([value]).slice(-n);
	    })).filter((function(values) {
	      return values.length >= minValues;
	    })));
	  };
	
	  Bacon.spy = function(spy) {
	    return spys.push(spy);
	  };
	
	  spys = [];
	
	  registerObs = function(obs) {
	    var j, len1, spy;
	    if (spys.length) {
	      if (!registerObs.running) {
	        try {
	          registerObs.running = true;
	          for (j = 0, len1 = spys.length; j < len1; j++) {
	            spy = spys[j];
	            spy(obs);
	          }
	        } finally {
	          delete registerObs.running;
	        }
	      }
	    }
	    return void 0;
	  };
	
	  Bacon.Property.prototype.startWith = function(seed) {
	    return withDesc(new Bacon.Desc(this, "startWith", [seed]), this.scan(seed, function(prev, next) {
	      return next;
	    }));
	  };
	
	  Bacon.EventStream.prototype.startWith = function(seed) {
	    return withDesc(new Bacon.Desc(this, "startWith", [seed]), Bacon.once(seed).concat(this));
	  };
	
	  Bacon.Observable.prototype.takeWhile = function() {
	    var args, f;
	    f = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    assertObservableIsProperty(f);
	    return convertArgsToFunction(this, f, args, function(f) {
	      return withDesc(new Bacon.Desc(this, "takeWhile", [f]), this.withHandler(function(event) {
	        if (event.filter(f)) {
	          return this.push(event);
	        } else {
	          this.push(endEvent());
	          return Bacon.noMore;
	        }
	      }));
	    });
	  };
	
	  Bacon["try"] = function(f) {
	    return function(value) {
	      var e;
	      try {
	        return Bacon.once(f(value));
	      } catch (_error) {
	        e = _error;
	        return new Bacon.Error(e);
	      }
	    };
	  };
	
	  Bacon.update = function() {
	    var i, initial, lateBindFirst, patterns;
	    initial = arguments[0], patterns = 2 <= arguments.length ? slice.call(arguments, 1) : [];
	    lateBindFirst = function(f) {
	      return function() {
	        var args;
	        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	        return function(i) {
	          return f.apply(null, [i].concat(args));
	        };
	      };
	    };
	    i = patterns.length - 1;
	    while (i > 0) {
	      if (!(patterns[i] instanceof Function)) {
	        patterns[i] = (function(x) {
	          return function() {
	            return x;
	          };
	        })(patterns[i]);
	      }
	      patterns[i] = lateBindFirst(patterns[i]);
	      i = i - 2;
	    }
	    return withDesc(new Bacon.Desc(Bacon, "update", [initial].concat(slice.call(patterns))), Bacon.when.apply(Bacon, patterns).scan(initial, (function(x, f) {
	      return f(x);
	    })));
	  };
	
	  Bacon.zipAsArray = function() {
	    var streams;
	    streams = argumentsToObservables(arguments);
	    return withDesc(new Bacon.Desc(Bacon, "zipAsArray", streams), Bacon.zipWith(streams, function() {
	      var xs;
	      xs = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	      return xs;
	    }));
	  };
	
	  Bacon.zipWith = function() {
	    var f, ref1, streams;
	    ref1 = argumentsToObservablesAndFunction(arguments), streams = ref1[0], f = ref1[1];
	    streams = _.map((function(s) {
	      return s.toEventStream();
	    }), streams);
	    return withDesc(new Bacon.Desc(Bacon, "zipWith", [f].concat(slice.call(streams))), Bacon.when(streams, f));
	  };
	
	  Bacon.Observable.prototype.zip = function(other, f) {
	    if (f == null) {
	      f = Array;
	    }
	    return withDesc(new Bacon.Desc(this, "zip", [other]), Bacon.zipWith([this, other], f));
	  };
	
	  
	
	Bacon.Observable.prototype.first = function () {
	  return withDesc(new Bacon.Desc(this, "first", []), this.take(1));
	};
	
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
	  var _this = this;
	
	  if (typeof PromiseCtr !== "function") {
	    if (typeof Promise === "function") {
	      PromiseCtr = Promise;
	    } else {
	      throw new Exception("There isn't default Promise, use shim or parameter");
	    }
	  }
	
	  return new PromiseCtr(function (resolve, reject) {
	    return _this.subscribe(function (event) {
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
	
	if (("function" !== "undefined" && __webpack_require__(3) !== null) && (__webpack_require__(4) != null)) {
	    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function() {
	      return Bacon;
	    }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    if (typeof this !== "undefined" && this !== null) {
	      this.Bacon = Bacon;
	    }
	  } else if ((typeof module !== "undefined" && module !== null) && (module.exports != null)) {
	    module.exports = Bacon;
	    Bacon.Bacon = Bacon;
	  } else {
	    this.Bacon = Bacon;
	  }
	
	}).call(this);
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(2)(module)))

/***/ },
/* 2 */
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
/* 3 */
/***/ function(module, exports) {

	module.exports = function() { throw new Error("define cannot be used indirect"); };


/***/ },
/* 4 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Game = __webpack_require__(6);
	var Victor = __webpack_require__(8);
	
	var Gui = (function () {
	  function Gui() {
	    var _this = this;
	
	    _classCallCheck(this, Gui);
	
	    this.scale = 20;
	    this.panValue = new Victor(0, 0); // Pan in pixels
	    this.body = document.querySelector('body');
	
	    this.body.draggable = true;
	    var img = document.createElement('img');
	    img.src = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
	    this.body.ondragstart = function (event) {
	      _this.lastDragPosition = new Victor(event.clientX, event.clientY);
	      event.dataTransfer.setDragImage(img, 0, 0);
	    };
	    this.body.addEventListener("drag", function (event) {
	      return _this.pan(new Victor(event.clientX, event.clientY));
	    });
	
	    this.html = document.querySelector('html');
	    this.controlsContainer = document.createElement('span');
	    this.controlsContainer.id = 'controls';
	    this.body.appendChild(this.controlsContainer);
	
	    document.addEventListener("mousewheel", function (event) {
	      return _this.modifyScale(event.wheelDelta);
	    });
	    this.controls = document.querySelector('#controls');
	    this.playerContainers = [];
	
	    this.colors = ['red', 'blue'];
	
	    this.game = new Game();
	    this.game.players.map(function (player) {
	      return _this.addPlayer(player);
	    });
	    this.nextTurn();
	  }
	
	  _createClass(Gui, [{
	    key: 'pan',
	    value: function pan(newDragPosition) {
	      // Wierd behaviour that sends 0,0 on drag end
	      if (newDragPosition.x === 0) return;
	      var vector = this.lastDragPosition.subtract(newDragPosition);
	      this.lastDragPosition = newDragPosition;
	      this.panValue.x += vector.x;
	      this.panValue.y += vector.y;
	      this.body.style.top = this.panValue.y + "px";
	      this.body.style.left = this.panValue.x + "px";
	    }
	  }, {
	    key: 'modifyScale',
	    value: function modifyScale(delta) {
	      if (delta > 20) delta = 20;
	      if (delta < -20) delta = -20;
	      var value = this.scale + delta / 7;
	      if (value < 5) value = 5;
	      if (value > 100) value = 100;
	      this.scale = value;
	      this.html.style.fontSize = Math.round(value) + "px";
	    }
	  }, {
	    key: 'addPlayer',
	    value: function addPlayer(player) {
	      var container = document.createElement('span');
	      container.style.backgroundColor = this.colors.pop();
	      this.body.appendChild(container);
	      this.playerContainers.push(container);
	      this.appendPosition(container, player.position);
	    }
	  }, {
	    key: 'appendPosition',
	    value: function appendPosition(playerContainer, position) {
	      var newPositionElement = document.createElement('span');
	      newPositionElement.className = 'position';
	      newPositionElement.style.top = this.getPixelPosition(position.y);
	      newPositionElement.style.left = this.getPixelPosition(position.x);
	      playerContainer.appendChild(newPositionElement);
	    }
	  }, {
	    key: 'appendMove',
	    value: function appendMove(playerContainer, position, move) {
	      var top = Math.min(position.y, position.y + move.y);
	      var left = Math.min(position.x, position.x + move.x);
	      var height = Math.abs(move.y);
	      var width = Math.abs(move.x);
	
	      var hasTopToTheLeft = move.x > 0 && move.y > 0 || move.x < 0 && move.y < 0;
	      var orientationClass = hasTopToTheLeft ? 'top-left' : 'top-right';
	
	      var moveElement = document.createElement('span');
	      moveElement.className = 'move ' + orientationClass;
	      moveElement.style.top = this.getPixelPosition(top);
	      moveElement.style.left = this.getPixelPosition(left);
	      moveElement.style.width = this.getPixelPosition(width);
	      moveElement.style.height = this.getPixelPosition(height);
	      playerContainer.appendChild(moveElement);
	    }
	  }, {
	    key: 'getPixelPosition',
	    value: function getPixelPosition(ordinate) {
	      return ordinate + "rem";
	    }
	  }, {
	    key: 'drawControls',
	    value: function drawControls(vectors) {
	      var _this2 = this;
	
	      while (this.controlsContainer.firstChild) {
	        this.controlsContainer.removeChild(this.controlsContainer.firstChild);
	      }
	
	      vectors.forEach(function (v) {
	        return _this2.createControl(v);
	      });
	    }
	  }, {
	    key: 'createControl',
	    value: function createControl(vectorObject) {
	      var _this3 = this;
	
	      var target = document.createElement('span');
	      target.attributes.x = vectorObject.relative.x;
	      target.attributes.y = vectorObject.relative.y;
	      target.style.top = this.getPixelPosition(vectorObject.absolute.y);
	      target.style.left = this.getPixelPosition(vectorObject.absolute.x);
	      target.addEventListener("click", function (e) {
	        var attributes = e.target.attributes;
	        var playerContainer = _this3.playerContainers[_this3.game.currentPlayerIndex];
	        var position = _this3.game.movePlayer(vectorObject.relative);
	        _this3.appendPosition(playerContainer, position);
	
	        _this3.nextTurn();
	      });
	      this.controlsContainer.appendChild(target);
	    }
	  }, {
	    key: 'nextTurn',
	    value: function nextTurn() {
	      this.drawControls(this.game.vectorsForControls);
	    }
	  }]);
	
	  return Gui;
	})();
	
	exports['default'] = Gui;
	module.exports = exports['default'];

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var Car = __webpack_require__(7);
	var Victor = __webpack_require__(8);
	
	var Game = (function () {
	  function Game() {
	    _classCallCheck(this, Game);
	
	    this.players = [new Car(new Victor(10, 10), new Victor(2, 0))];
	    this.currentPlayerIndex = 0;
	  }
	
	  _createClass(Game, [{
	    key: 'movePlayer',
	    value: function movePlayer(vector) {
	      this.currentPlayer.move(vector);
	      var position = this.currentPlayer.position;
	      this.setNextPlayer();
	      return position;
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
	    key: 'isPossiblePosition',
	    value: function isPossiblePosition(v) {
	      return true;
	    }
	  }, {
	    key: 'currentPlayer',
	    get: function get() {
	      return this.players[this.currentPlayerIndex];
	    }
	  }, {
	    key: 'vectorsForControls',
	    get: function get() {
	      var player = this.currentPlayer;
	      var vectorsForControls = [];
	      for (var x = -1; x <= 1; x++) {
	        for (var y = -1; y <= 1; y++) {
	          var playerRelativeVector = new Victor(x, y).clone().add(player.direction);
	          var absoluteVector = playerRelativeVector.clone().add(player.position);
	          if (this.isPossiblePosition(absoluteVector)) {
	            vectorsForControls.push({
	              relative: playerRelativeVector,
	              absolute: absoluteVector
	            });
	          }
	        }
	      }
	      return vectorsForControls;
	    }
	  }]);
	
	  return Game;
	})();
	
	exports['default'] = Game;
	module.exports = exports['default'];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Car = (function () {
	  function Car(position, direction) {
	    _classCallCheck(this, Car);
	
	    this.position = position;
	    this.direction = direction;
	  }
	
	  _createClass(Car, [{
	    key: "move",
	    value: function move(vector) {
	      if (!this.isValidMove(this.direction, vector)) {
	        return;
	      }
	
	      this.position.add(vector);
	      this.direction = vector;
	    }
	  }, {
	    key: "isValidMove",
	    value: function isValidMove(direction, move) {
	      return direction.absDistanceX(move) <= 1 && direction.absDistanceY(move) <= 1;
	    }
	  }]);
	
	  return Car;
	})();
	
	exports["default"] = Car;
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports) {

	exports = module.exports = Victor;
	
	/**
	 * # Victor - A JavaScript 2D vector class with methods for common vector operations
	 */
	
	/**
	 * Constructor. Will also work without the `new` keyword
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = Victor(42, 1337);
	 *
	 * @param {Number} x Value of the x axis
	 * @param {Number} y Value of the y axis
	 * @return {Victor}
	 * @api public
	 */
	function Victor (x, y) {
		if (!(this instanceof Victor)) {
			return new Victor(x, y);
		}
	
		/**
		 * The X axis
		 *
		 * ### Examples:
		 *     var vec = new Victor.fromArray(42, 21);
		 *
		 *     vec.x;
		 *     // => 42
		 *
		 * @api public
		 */
		this.x = x || 0;
	
		/**
		 * The Y axis
		 *
		 * ### Examples:
		 *     var vec = new Victor.fromArray(42, 21);
		 *
		 *     vec.y;
		 *     // => 21
		 *
		 * @api public
		 */
		this.y = y || 0;
	};
	
	/**
	 * # Static
	 */
	
	/**
	 * Creates a new instance from an array
	 *
	 * ### Examples:
	 *     var vec = Victor.fromArray([42, 21]);
	 *
	 *     vec.toString();
	 *     // => x:42, y:21
	 *
	 * @name Victor.fromArray
	 * @param {Array} array Array with the x and y values at index 0 and 1 respectively
	 * @return {Victor} The new instance
	 * @api public
	 */
	Victor.fromArray = function (arr) {
		return new Victor(arr[0] || 0, arr[1] || 0);
	};
	
	/**
	 * Creates a new instance from an object
	 *
	 * ### Examples:
	 *     var vec = Victor.fromObject({ x: 42, y: 21 });
	 *
	 *     vec.toString();
	 *     // => x:42, y:21
	 *
	 * @name Victor.fromObject
	 * @param {Object} obj Object with the values for x and y
	 * @return {Victor} The new instance
	 * @api public
	 */
	Victor.fromObject = function (obj) {
		return new Victor(obj.x || 0, obj.y || 0);
	};
	
	/**
	 * # Manipulation
	 *
	 * These functions are chainable.
	 */
	
	/**
	 * Adds another vector's X axis to this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.addX(vec2);
	 *     vec1.toString();
	 *     // => x:30, y:10
	 *
	 * @param {Victor} vector The other vector you want to add to this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addX = function (vec) {
		this.x += vec.x;
		return this;
	};
	
	/**
	 * Adds another vector's Y axis to this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.addY(vec2);
	 *     vec1.toString();
	 *     // => x:10, y:40
	 *
	 * @param {Victor} vector The other vector you want to add to this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addY = function (vec) {
		this.y += vec.y;
		return this;
	};
	
	/**
	 * Adds another vector to this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.add(vec2);
	 *     vec1.toString();
	 *     // => x:30, y:40
	 *
	 * @param {Victor} vector The other vector you want to add to this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.add = function (vec) {
		this.x += vec.x;
		this.y += vec.y;
		return this;
	};
	
	/**
	 * Adds the given scalar to both vector axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(1, 2);
	 *
	 *     vec.addScalar(2);
	 *     vec.toString();
	 *     // => x: 3, y: 4
	 *
	 * @param {Number} scalar The scalar to add
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addScalar = function (scalar) {
		this.x += scalar;
		this.y += scalar;
		return this;
	};
	
	/**
	 * Adds the given scalar to the X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(1, 2);
	 *
	 *     vec.addScalarX(2);
	 *     vec.toString();
	 *     // => x: 3, y: 2
	 *
	 * @param {Number} scalar The scalar to add
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addScalarX = function (scalar) {
		this.x += scalar;
		return this;
	};
	
	/**
	 * Adds the given scalar to the Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(1, 2);
	 *
	 *     vec.addScalarY(2);
	 *     vec.toString();
	 *     // => x: 1, y: 4
	 *
	 * @param {Number} scalar The scalar to add
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.addScalarY = function (scalar) {
		this.y += scalar;
		return this;
	};
	
	/**
	 * Subtracts the X axis of another vector from this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.subtractX(vec2);
	 *     vec1.toString();
	 *     // => x:80, y:50
	 *
	 * @param {Victor} vector The other vector you want subtract from this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractX = function (vec) {
		this.x -= vec.x;
		return this;
	};
	
	/**
	 * Subtracts the Y axis of another vector from this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.subtractY(vec2);
	 *     vec1.toString();
	 *     // => x:100, y:20
	 *
	 * @param {Victor} vector The other vector you want subtract from this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractY = function (vec) {
		this.y -= vec.y;
		return this;
	};
	
	/**
	 * Subtracts another vector from this one
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(20, 30);
	 *
	 *     vec1.subtract(vec2);
	 *     vec1.toString();
	 *     // => x:80, y:20
	 *
	 * @param {Victor} vector The other vector you want subtract from this one
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtract = function (vec) {
		this.x -= vec.x;
		this.y -= vec.y;
		return this;
	};
	
	/**
	 * Subtracts the given scalar from both axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 200);
	 *
	 *     vec.subtractScalar(20);
	 *     vec.toString();
	 *     // => x: 80, y: 180
	 *
	 * @param {Number} scalar The scalar to subtract
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractScalar = function (scalar) {
		this.x -= scalar;
		this.y -= scalar;
		return this;
	};
	
	/**
	 * Subtracts the given scalar from the X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 200);
	 *
	 *     vec.subtractScalarX(20);
	 *     vec.toString();
	 *     // => x: 80, y: 200
	 *
	 * @param {Number} scalar The scalar to subtract
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractScalarX = function (scalar) {
		this.x -= scalar;
		return this;
	};
	
	/**
	 * Subtracts the given scalar from the Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 200);
	 *
	 *     vec.subtractScalarY(20);
	 *     vec.toString();
	 *     // => x: 100, y: 180
	 *
	 * @param {Number} scalar The scalar to subtract
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.subtractScalarY = function (scalar) {
		this.y -= scalar;
		return this;
	};
	
	/**
	 * Divides the X axis by the x component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 0);
	 *
	 *     vec.divideX(vec2);
	 *     vec.toString();
	 *     // => x:50, y:50
	 *
	 * @param {Victor} vector The other vector you want divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideX = function (vector) {
		this.x /= vector.x;
		return this;
	};
	
	/**
	 * Divides the Y axis by the y component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(0, 2);
	 *
	 *     vec.divideY(vec2);
	 *     vec.toString();
	 *     // => x:100, y:25
	 *
	 * @param {Victor} vector The other vector you want divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideY = function (vector) {
		this.y /= vector.y;
		return this;
	};
	
	/**
	 * Divides both vector axis by a axis values of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 2);
	 *
	 *     vec.divide(vec2);
	 *     vec.toString();
	 *     // => x:50, y:25
	 *
	 * @param {Victor} vector The vector to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divide = function (vector) {
		this.x /= vector.x;
		this.y /= vector.y;
		return this;
	};
	
	/**
	 * Divides both vector axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.divideScalar(2);
	 *     vec.toString();
	 *     // => x:50, y:25
	 *
	 * @param {Number} The scalar to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideScalar = function (scalar) {
		if (scalar !== 0) {
			this.x /= scalar;
			this.y /= scalar;
		} else {
			this.x = 0;
			this.y = 0;
		}
	
		return this;
	};
	
	/**
	 * Divides the X axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.divideScalarX(2);
	 *     vec.toString();
	 *     // => x:50, y:50
	 *
	 * @param {Number} The scalar to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideScalarX = function (scalar) {
		if (scalar !== 0) {
			this.x /= scalar;
		} else {
			this.x = 0;
		}
		return this;
	};
	
	/**
	 * Divides the Y axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.divideScalarY(2);
	 *     vec.toString();
	 *     // => x:100, y:25
	 *
	 * @param {Number} The scalar to divide by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.divideScalarY = function (scalar) {
		if (scalar !== 0) {
			this.y /= scalar;
		} else {
			this.y = 0;
		}
		return this;
	};
	
	/**
	 * Inverts the X axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.invertX();
	 *     vec.toString();
	 *     // => x:-100, y:50
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.invertX = function () {
		this.x *= -1;
		return this;
	};
	
	/**
	 * Inverts the Y axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.invertY();
	 *     vec.toString();
	 *     // => x:100, y:-50
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.invertY = function () {
		this.y *= -1;
		return this;
	};
	
	/**
	 * Inverts both axis
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.invert();
	 *     vec.toString();
	 *     // => x:-100, y:-50
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.invert = function () {
		this.invertX();
		this.invertY();
		return this;
	};
	
	/**
	 * Multiplies the X axis by X component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 0);
	 *
	 *     vec.multiplyX(vec2);
	 *     vec.toString();
	 *     // => x:200, y:50
	 *
	 * @param {Victor} vector The vector to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyX = function (vector) {
		this.x *= vector.x;
		return this;
	};
	
	/**
	 * Multiplies the Y axis by Y component of given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(0, 2);
	 *
	 *     vec.multiplyX(vec2);
	 *     vec.toString();
	 *     // => x:100, y:100
	 *
	 * @param {Victor} vector The vector to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyY = function (vector) {
		this.y *= vector.y;
		return this;
	};
	
	/**
	 * Multiplies both vector axis by values from a given vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     var vec2 = new Victor(2, 2);
	 *
	 *     vec.multiply(vec2);
	 *     vec.toString();
	 *     // => x:200, y:100
	 *
	 * @param {Victor} vector The vector to multiply by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiply = function (vector) {
		this.x *= vector.x;
		this.y *= vector.y;
		return this;
	};
	
	/**
	 * Multiplies both vector axis by the given scalar value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.multiplyScalar(2);
	 *     vec.toString();
	 *     // => x:200, y:100
	 *
	 * @param {Number} The scalar to multiply by
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyScalar = function (scalar) {
		this.x *= scalar;
		this.y *= scalar;
		return this;
	};
	
	/**
	 * Multiplies the X axis by the given scalar
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.multiplyScalarX(2);
	 *     vec.toString();
	 *     // => x:200, y:50
	 *
	 * @param {Number} The scalar to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyScalarX = function (scalar) {
		this.x *= scalar;
		return this;
	};
	
	/**
	 * Multiplies the Y axis by the given scalar
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.multiplyScalarY(2);
	 *     vec.toString();
	 *     // => x:100, y:100
	 *
	 * @param {Number} The scalar to multiply the axis with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.multiplyScalarY = function (scalar) {
		this.y *= scalar;
		return this;
	};
	
	/**
	 * Normalize
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.normalize = function () {
		var length = this.length();
	
		if (length === 0) {
			this.x = 1;
			this.y = 0;
		} else {
			this.divide(Victor(length, length));
		}
		return this;
	};
	
	Victor.prototype.norm = Victor.prototype.normalize;
	
	/**
	 * If the absolute vector axis is greater than `max`, multiplies the axis by `factor`
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.limit(80, 0.9);
	 *     vec.toString();
	 *     // => x:90, y:50
	 *
	 * @param {Number} max The maximum value for both x and y axis
	 * @param {Number} factor Factor by which the axis are to be multiplied with
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.limit = function (max, factor) {
		if (Math.abs(this.x) > max){ this.x *= factor; }
		if (Math.abs(this.y) > max){ this.y *= factor; }
		return this;
	};
	
	/**
	 * Randomizes both vector axis with a value between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomize(new Victor(50, 60), new Victor(70, 80`));
	 *     vec.toString();
	 *     // => x:67, y:73
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomize = function (topLeft, bottomRight) {
		this.randomizeX(topLeft, bottomRight);
		this.randomizeY(topLeft, bottomRight);
	
		return this;
	};
	
	/**
	 * Randomizes the y axis with a value between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomizeX(new Victor(50, 60), new Victor(70, 80`));
	 *     vec.toString();
	 *     // => x:55, y:50
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomizeX = function (topLeft, bottomRight) {
		var min = Math.min(topLeft.x, bottomRight.x);
		var max = Math.max(topLeft.x, bottomRight.x);
		this.x = random(min, max);
		return this;
	};
	
	/**
	 * Randomizes the y axis with a value between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomizeY(new Victor(50, 60), new Victor(70, 80`));
	 *     vec.toString();
	 *     // => x:100, y:66
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomizeY = function (topLeft, bottomRight) {
		var min = Math.min(topLeft.y, bottomRight.y);
		var max = Math.max(topLeft.y, bottomRight.y);
		this.y = random(min, max);
		return this;
	};
	
	/**
	 * Randomly randomizes either axis between 2 vectors
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.randomizeAny(new Victor(50, 60), new Victor(70, 80));
	 *     vec.toString();
	 *     // => x:100, y:77
	 *
	 * @param {Victor} topLeft first vector
	 * @param {Victor} bottomRight second vector
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.randomizeAny = function (topLeft, bottomRight) {
		if (!! Math.round(Math.random())) {
			this.randomizeX(topLeft, bottomRight);
		} else {
			this.randomizeY(topLeft, bottomRight);
		}
		return this;
	};
	
	/**
	 * Rounds both axis to an integer value
	 *
	 * ### Examples:
	 *     var vec = new Victor(100.2, 50.9);
	 *
	 *     vec.unfloat();
	 *     vec.toString();
	 *     // => x:100, y:51
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.unfloat = function () {
		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		return this;
	};
	
	/**
	 * Rounds both axis to a certain precision
	 *
	 * ### Examples:
	 *     var vec = new Victor(100.2, 50.9);
	 *
	 *     vec.unfloat();
	 *     vec.toString();
	 *     // => x:100, y:51
	 *
	 * @param {Number} Precision (default: 8)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.toFixed = function (precision) {
		if (typeof precision === 'undefined') { precision = 8; }
		this.x = this.x.toFixed(precision);
		this.y = this.y.toFixed(precision);
		return this;
	};
	
	/**
	 * Performs a linear blend / interpolation of the X axis towards another vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 100);
	 *     var vec2 = new Victor(200, 200);
	 *
	 *     vec1.mixX(vec2, 0.5);
	 *     vec.toString();
	 *     // => x:150, y:100
	 *
	 * @param {Victor} vector The other vector
	 * @param {Number} amount The blend amount (optional, default: 0.5)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.mixX = function (vec, amount) {
		if (typeof amount === 'undefined') {
			amount = 0.5;
		}
	
		this.x = (1 - amount) * this.x + amount * vec.x;
		return this;
	};
	
	/**
	 * Performs a linear blend / interpolation of the Y axis towards another vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 100);
	 *     var vec2 = new Victor(200, 200);
	 *
	 *     vec1.mixY(vec2, 0.5);
	 *     vec.toString();
	 *     // => x:100, y:150
	 *
	 * @param {Victor} vector The other vector
	 * @param {Number} amount The blend amount (optional, default: 0.5)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.mixY = function (vec, amount) {
		if (typeof amount === 'undefined') {
			amount = 0.5;
		}
	
		this.y = (1 - amount) * this.y + amount * vec.y;
		return this;
	};
	
	/**
	 * Performs a linear blend / interpolation towards another vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 100);
	 *     var vec2 = new Victor(200, 200);
	 *
	 *     vec1.mix(vec2, 0.5);
	 *     vec.toString();
	 *     // => x:150, y:150
	 *
	 * @param {Victor} vector The other vector
	 * @param {Number} amount The blend amount (optional, default: 0.5)
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.mix = function (vec, amount) {
		this.mixX(vec, amount);
		this.mixY(vec, amount);
		return this;
	};
	
	/**
	 * # Products
	 */
	
	/**
	 * Creates a clone of this vector
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = vec1.clone();
	 *
	 *     vec2.toString();
	 *     // => x:10, y:10
	 *
	 * @return {Victor} A clone of the vector
	 * @api public
	 */
	Victor.prototype.clone = function () {
		return new Victor(this.x, this.y);
	};
	
	/**
	 * Copies another vector's X component in to its own
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 20);
	 *     var vec2 = vec1.copyX(vec1);
	 *
	 *     vec2.toString();
	 *     // => x:20, y:10
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.copyX = function (vec) {
		this.x = vec.x;
		return this;
	};
	
	/**
	 * Copies another vector's Y component in to its own
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 20);
	 *     var vec2 = vec1.copyY(vec1);
	 *
	 *     vec2.toString();
	 *     // => x:10, y:20
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.copyY = function (vec) {
		this.y = vec.y;
		return this;
	};
	
	/**
	 * Copies another vector's X and Y components in to its own
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *     var vec2 = new Victor(20, 20);
	 *     var vec2 = vec1.copy(vec1);
	 *
	 *     vec2.toString();
	 *     // => x:20, y:20
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.copy = function (vec) {
		this.copyX(vec);
		this.copyY(vec);
		return this;
	};
	
	/**
	 * Sets the vector to zero (0,0)
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(10, 10);
	 *		 var1.zero();
	 *     vec1.toString();
	 *     // => x:0, y:0
	 *
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.zero = function () {
		this.x = this.y = 0;
		return this;
	};
	
	/**
	 * Calculates the dot product of this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.dot(vec2);
	 *     // => 23000
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Dot product
	 * @api public
	 */
	Victor.prototype.dot = function (vec2) {
		return this.x * vec2.x + this.y * vec2.y;
	};
	
	Victor.prototype.cross = function (vec2) {
		return (this.x * vec2.y ) - (this.y * vec2.x );
	};
	
	/**
	 * Projects a vector onto another vector, setting itself to the result.
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 0);
	 *     var vec2 = new Victor(100, 100);
	 *
	 *     vec.projectOnto(vec2);
	 *     vec.toString();
	 *     // => x:50, y:50
	 *
	 * @param {Victor} vector The other vector you want to project this vector onto
	 * @return {Victor} `this` for chaining capabilities
	 * @api public
	 */
	Victor.prototype.projectOnto = function (vec2) {
	    var coeff = ( (this.x * vec2.x)+(this.y * vec2.y) ) / ((vec2.x*vec2.x)+(vec2.y*vec2.y));
	    this.x = coeff * vec2.x;
	    this.y = coeff * vec2.y;
	    return this;
	};
	
	
	Victor.prototype.horizontalAngle = function () {
		return Math.atan2(this.y, this.x);
	};
	
	Victor.prototype.horizontalAngleDeg = function () {
		return radian2degrees(this.horizontalAngle());
	};
	
	Victor.prototype.verticalAngle = function () {
		return Math.atan2(this.x, this.y);
	};
	
	Victor.prototype.verticalAngleDeg = function () {
		return radian2degrees(this.verticalAngle());
	};
	
	Victor.prototype.angle = Victor.prototype.horizontalAngle;
	Victor.prototype.angleDeg = Victor.prototype.horizontalAngleDeg;
	Victor.prototype.direction = Victor.prototype.horizontalAngle;
	
	Victor.prototype.rotate = function (angle) {
		var nx = (this.x * Math.cos(angle)) - (this.y * Math.sin(angle));
		var ny = (this.x * Math.sin(angle)) + (this.y * Math.cos(angle));
	
		this.x = nx;
		this.y = ny;
	
		return this;
	};
	
	Victor.prototype.rotateDeg = function (angle) {
		angle = degrees2radian(angle);
		return this.rotate(angle);
	};
	
	Victor.prototype.rotateTo = function(rotation) {
		return this.rotate(rotation-this.angle());
	};
	
	Victor.prototype.rotateToDeg = function(rotation) {
		rotation = degrees2radian(rotation);
		return this.rotateTo(rotation);
	};
	
	Victor.prototype.rotateBy = function (rotation) {
		var angle = this.angle() + rotation;
	
		return this.rotate(angle);
	};
	
	Victor.prototype.rotateByDeg = function (rotation) {
		rotation = degrees2radian(rotation);
		return this.rotateBy(rotation);
	};
	
	/**
	 * Calculates the distance of the X axis between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceX(vec2);
	 *     // => -100
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distanceX = function (vec) {
		return this.x - vec.x;
	};
	
	/**
	 * Same as `distanceX()` but always returns an absolute number
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.absDistanceX(vec2);
	 *     // => 100
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Absolute distance
	 * @api public
	 */
	Victor.prototype.absDistanceX = function (vec) {
		return Math.abs(this.distanceX(vec));
	};
	
	/**
	 * Calculates the distance of the Y axis between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceY(vec2);
	 *     // => -10
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distanceY = function (vec) {
		return this.y - vec.y;
	};
	
	/**
	 * Same as `distanceY()` but always returns an absolute number
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceY(vec2);
	 *     // => 10
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Absolute distance
	 * @api public
	 */
	Victor.prototype.absDistanceY = function (vec) {
		return Math.abs(this.distanceY(vec));
	};
	
	/**
	 * Calculates the euclidean distance between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distance(vec2);
	 *     // => 100.4987562112089
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distance = function (vec) {
		return Math.sqrt(this.distanceSq(vec));
	};
	
	/**
	 * Calculates the squared euclidean distance between this vector and another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(200, 60);
	 *
	 *     vec1.distanceSq(vec2);
	 *     // => 10100
	 *
	 * @param {Victor} vector The second vector
	 * @return {Number} Distance
	 * @api public
	 */
	Victor.prototype.distanceSq = function (vec) {
		var dx = this.distanceX(vec),
			dy = this.distanceY(vec);
	
		return dx * dx + dy * dy;
	};
	
	/**
	 * Calculates the length or magnitude of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.length();
	 *     // => 111.80339887498948
	 *
	 * @return {Number} Length / Magnitude
	 * @api public
	 */
	Victor.prototype.length = function () {
		return Math.sqrt(this.lengthSq());
	};
	
	/**
	 * Squared length / magnitude
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *
	 *     vec.lengthSq();
	 *     // => 12500
	 *
	 * @return {Number} Length / Magnitude
	 * @api public
	 */
	Victor.prototype.lengthSq = function () {
		return this.x * this.x + this.y * this.y;
	};
	
	Victor.prototype.magnitude = Victor.prototype.length;
	
	/**
	 * Returns a true if vector is (0, 0)
	 *
	 * ### Examples:
	 *     var vec = new Victor(100, 50);
	 *     vec.zero();
	 *
	 *     // => true
	 *
	 * @return {Boolean}
	 * @api public
	 */
	Victor.prototype.isZero = function() {
		return this.x === 0 && this.y === 0;
	};
	
	/**
	 * Returns a true if this vector is the same as another
	 *
	 * ### Examples:
	 *     var vec1 = new Victor(100, 50);
	 *     var vec2 = new Victor(100, 50);
	 *     vec1.isEqualTo(vec2);
	 *
	 *     // => true
	 *
	 * @return {Boolean}
	 * @api public
	 */
	Victor.prototype.isEqualTo = function(vec2) {
		return this.x === vec2.x && this.y === vec2.y;
	};
	
	/**
	 * # Utility Methods
	 */
	
	/**
	 * Returns an string representation of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(10, 20);
	 *
	 *     vec.toString();
	 *     // => x:10, y:20
	 *
	 * @return {String}
	 * @api public
	 */
	Victor.prototype.toString = function () {
		return 'x:' + this.x + ', y:' + this.y;
	};
	
	/**
	 * Returns an array representation of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(10, 20);
	 *
	 *     vec.toArray();
	 *     // => [10, 20]
	 *
	 * @return {Array}
	 * @api public
	 */
	Victor.prototype.toArray = function () {
		return [ this.x, this.y ];
	};
	
	/**
	 * Returns an object representation of the vector
	 *
	 * ### Examples:
	 *     var vec = new Victor(10, 20);
	 *
	 *     vec.toObject();
	 *     // => { x: 10, y: 20 }
	 *
	 * @return {Object}
	 * @api public
	 */
	Victor.prototype.toObject = function () {
		return { x: this.x, y: this.y };
	};
	
	
	var degrees = 180 / Math.PI;
	
	function random (min, max) {
	    return Math.floor(Math.random() * (max - min + 1) + min);
	}
	
	function radian2degrees (rad) {
		return rad * degrees;
	}
	
	function degrees2radian (deg) {
		return deg / degrees;
	}


/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMTI4MGMxMzFjODliNzI4NmEzZWEiLCJ3ZWJwYWNrOi8vLy4vc3JjL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9+L2JhY29uanMvZGlzdC9CYWNvbi5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtZGVmaW5lLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvZ3VpLmpzIiwid2VicGFjazovLy8uL3NyYy9nYW1lLmpzIiwid2VicGFjazovLy8uL3NyYy9jYXIuanMiLCJ3ZWJwYWNrOi8vLy4vfi92aWN0b3IvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7OztBQ3RDQSxLQUFJLEtBQUssR0FBRyxtQkFBTyxDQUFDLENBQVMsQ0FBQyxDQUFDO0FBQy9CLEtBQUksR0FBRyxHQUFHLG1CQUFPLENBQUMsQ0FBTyxDQUFDLENBQUM7O0FBRTNCLEtBQUksR0FBRyxHQUFHLElBQUksR0FBRyxFQUFFLEM7Ozs7OztpRUNIbkI7QUFDQTtBQUNBLGlCQUFnQjtBQUNoQix1Q0FBc0MsMEJBQTBCLHlEQUF5RCxFQUFFLGtCQUFrQiwwQkFBMEIsRUFBRSxtQ0FBbUMsOEJBQThCLG9DQUFvQyxjQUFjLEVBQUU7QUFDOVI7QUFDQSw2QkFBNEIsbUJBQW1CLGdDQUFnQyxHQUFHOztBQUVsRjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSx3Q0FBdUMsVUFBVTtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLHdDQUF1QyxVQUFVO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsVUFBVTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLFVBQVU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW1DLFVBQVU7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsVUFBVTtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLG9DQUFtQyxVQUFVO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxzQkFBcUIsR0FBRztBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1gsb0JBQW1CLGtCQUFrQjtBQUNyQyxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBMkMsVUFBVTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXFDLFVBQVU7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEMsVUFBVTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsMkJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBbUMsVUFBVTtBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0MsVUFBVTtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUFzQyxVQUFVO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUEyQyxVQUFVO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDLFVBQVU7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF1QyxVQUFVO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXVDLFVBQVU7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE2QyxVQUFVO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFtRCxVQUFVO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBdUQsVUFBVTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFxQjtBQUNyQjtBQUNBLG9CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEwQyxVQUFVO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0MsVUFBVTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0EsUUFBTztBQUNQOztBQUVBOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0MsVUFBVTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBMkMsVUFBVTtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsK0NBQThDLFVBQVU7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTBDLFVBQVU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0MsVUFBVTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1gsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBLFlBQVc7QUFDWDtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUNBQW9DLFVBQVU7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLHVDQUFzQyxVQUFVO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBd0MsVUFBVTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0wsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXNDLFVBQVU7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLDBDQUF5QyxVQUFVO0FBQ25EO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyR0FBMEc7QUFDMUc7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUErQyxVQUFVO0FBQ3pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQXlDLFVBQVU7QUFDbkQ7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQSxFQUFDOzs7Ozs7OztBQ3g0R0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNUQSw4QkFBNkIsbURBQW1EOzs7Ozs7O0FDQWhGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQSxLQUFJLElBQUksR0FBRyxtQkFBTyxDQUFDLENBQVEsQ0FBQyxDQUFDO0FBQzdCLEtBQUksTUFBTSxHQUFHLG1CQUFPLENBQUMsQ0FBUSxDQUFDLENBQUM7O0tBRVYsR0FBRztBQUNYLFlBRFEsR0FBRyxHQUNUOzs7MkJBRE0sR0FBRzs7QUFFcEIsU0FBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDaEIsU0FBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDakMsU0FBSSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDOztBQUUzQyxTQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFDM0IsU0FBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN4QyxRQUFHLENBQUMsR0FBRyxHQUFHLDRFQUE0RSxDQUFDO0FBQ3ZGLFNBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLGVBQUssRUFBSTtBQUMvQixhQUFLLGdCQUFnQixHQUFHLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ2pFLFlBQUssQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO01BQzNDLENBQUM7QUFDRixTQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sRUFBRSxlQUFLO2NBQUksTUFBSyxHQUFHLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7TUFBQSxDQUFDLENBQUM7O0FBRWhHLFNBQUksQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMzQyxTQUFJLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUM7QUFDdkQsU0FBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsR0FBRyxVQUFVLENBQUM7QUFDdkMsU0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7O0FBRTlDLGFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsZUFBSztjQUFJLE1BQUssV0FBVyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7TUFBQSxDQUFDLENBQUM7QUFDckYsU0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3BELFNBQUksQ0FBQyxnQkFBZ0IsR0FBRyxFQUFFLENBQUM7O0FBRTNCLFNBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7O0FBRTlCLFNBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztBQUN2QixTQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQU07Y0FBSSxNQUFLLFNBQVMsQ0FBQyxNQUFNLENBQUM7TUFBQSxDQUFDLENBQUM7QUFDeEQsU0FBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2pCOztnQkE3QmtCLEdBQUc7O1lBK0JuQixhQUFDLGVBQWUsRUFBQzs7QUFFbEIsV0FBRyxlQUFlLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxPQUFPO0FBQ25DLFdBQUksTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLENBQUM7QUFDN0QsV0FBSSxDQUFDLGdCQUFnQixHQUFHLGVBQWUsQ0FBQztBQUN4QyxXQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDO0FBQzVCLFdBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUM7QUFDNUIsV0FBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztBQUM3QyxXQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO01BQy9DOzs7WUFFVSxxQkFBQyxLQUFLLEVBQUM7QUFDaEIsV0FBRyxLQUFLLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFLENBQUM7QUFDMUIsV0FBRyxLQUFLLEdBQUcsQ0FBQyxFQUFFLEVBQUUsS0FBSyxHQUFHLENBQUMsRUFBRSxDQUFDO0FBQzVCLFdBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxHQUFDLENBQUMsQ0FBQztBQUNqQyxXQUFHLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxHQUFHLENBQUMsQ0FBQztBQUN4QixXQUFHLEtBQUssR0FBRyxHQUFHLEVBQUUsS0FBSyxHQUFHLEdBQUcsQ0FBQztBQUM1QixXQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixXQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUM7TUFDckQ7OztZQUVRLG1CQUFDLE1BQU0sRUFBQztBQUNmLFdBQUksU0FBUyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDL0MsZ0JBQVMsQ0FBQyxLQUFLLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUM7QUFDcEQsV0FBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDakMsV0FBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0QyxXQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDO01BQ2hEOzs7WUFFYSx3QkFBQyxlQUFlLEVBQUUsUUFBUSxFQUFDO0FBQ3ZDLFdBQUksa0JBQWtCLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4RCx5QkFBa0IsQ0FBQyxTQUFTLEdBQUcsVUFBVSxDQUFDO0FBQzFDLHlCQUFrQixDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNqRSx5QkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEUsc0JBQWUsQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsQ0FBQztNQUNqRDs7O1lBRVMsb0JBQUMsZUFBZSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUM7QUFDekMsV0FBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3BELFdBQUksSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUNyRCxXQUFJLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUM5QixXQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs7QUFFN0IsV0FBSSxlQUFlLEdBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQU0sSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFFLENBQUM7QUFDL0UsV0FBSSxnQkFBZ0IsR0FBRyxlQUFlLEdBQUcsVUFBVSxHQUFHLFdBQVcsQ0FBQzs7QUFFbEUsV0FBSSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUNqRCxrQkFBVyxDQUFDLFNBQVMsR0FBRyxPQUFPLEdBQUcsZ0JBQWdCLENBQUM7QUFDbkQsa0JBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNuRCxrQkFBVyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3JELGtCQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDdkQsa0JBQVcsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN6RCxzQkFBZSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsQ0FBQztNQUMxQzs7O1lBRWUsMEJBQUMsUUFBUSxFQUFDO0FBQ3hCLGNBQU8sUUFBUSxHQUFHLEtBQUssQ0FBQztNQUN6Qjs7O1lBRVcsc0JBQUMsT0FBTyxFQUFDOzs7QUFDbkIsY0FBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsVUFBVSxFQUFFO0FBQ3ZDLGFBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3ZFOztBQUVELGNBQU8sQ0FBQyxPQUFPLENBQUMsV0FBQztnQkFBSSxPQUFLLGFBQWEsQ0FBQyxDQUFDLENBQUM7UUFBQSxDQUFDLENBQUM7TUFDN0M7OztZQUVZLHVCQUFDLFlBQVksRUFBQzs7O0FBQ3pCLFdBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDNUMsYUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDOUMsYUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEdBQUcsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7QUFDOUMsYUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbEUsYUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFDbkUsYUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDLENBQUMsRUFBSztBQUN0QyxhQUFJLFVBQVUsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztBQUNyQyxhQUFJLGVBQWUsR0FBRyxPQUFLLGdCQUFnQixDQUFDLE9BQUssSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7QUFDMUUsYUFBSSxRQUFRLEdBQUcsT0FBSyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMzRCxnQkFBSyxjQUFjLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDOztBQUUvQyxnQkFBSyxRQUFRLEVBQUUsQ0FBQztRQUNqQixDQUFDLENBQUM7QUFDSCxXQUFJLENBQUMsaUJBQWlCLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO01BQzVDOzs7WUFFTyxvQkFBRTtBQUNSLFdBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO01BQ2pEOzs7VUFySGtCLEdBQUc7OztzQkFBSCxHQUFHOzs7Ozs7Ozs7Ozs7Ozs7OztBQ0h4QixLQUFJLEdBQUcsR0FBRyxtQkFBTyxDQUFDLENBQU8sQ0FBQyxDQUFDO0FBQzNCLEtBQUksTUFBTSxHQUFHLG1CQUFPLENBQUMsQ0FBUSxDQUFDLENBQUM7O0tBRVYsSUFBSTtBQUNaLFlBRFEsSUFBSSxHQUNWOzJCQURNLElBQUk7O0FBRXJCLFNBQUksQ0FBQyxPQUFPLEdBQUcsQ0FDYixJQUFJLEdBQUcsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUMsRUFBRSxDQUFDLEVBQUUsSUFBSSxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQzVDLENBQUM7QUFDRixTQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0lBQzdCOztnQkFOa0IsSUFBSTs7WUE4QmIsb0JBQUMsTUFBTSxFQUFDO0FBQ2hCLFdBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQ2hDLFdBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDO0FBQzNDLFdBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztBQUNyQixjQUFPLFFBQVEsQ0FBQztNQUNqQjs7O1lBRVkseUJBQUU7QUFDYixXQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztBQUMxQixXQUFHLElBQUksQ0FBQyxrQkFBa0IsS0FBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtBQUNsRCxhQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO1FBQzdCO01BQ0Y7OztZQUVpQiw0QkFBQyxDQUFDLEVBQUM7QUFDbkIsY0FBTyxJQUFJLENBQUM7TUFDYjs7O1VBdENnQixlQUFFO0FBQ2pCLGNBQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztNQUM5Qzs7O1VBRXFCLGVBQUU7QUFDdEIsV0FBSSxNQUFNLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztBQUNoQyxXQUFJLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztBQUM1QixZQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUM7QUFDMUIsY0FBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFDO0FBQzFCLGVBQUksb0JBQW9CLEdBQUcsSUFBSSxNQUFNLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDekUsZUFBSSxjQUFjLEdBQUcsb0JBQW9CLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUN2RSxlQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsRUFBRTtBQUMxQywrQkFBa0IsQ0FBQyxJQUFJLENBQUM7QUFDdEIsdUJBQVEsRUFBRSxvQkFBb0I7QUFDOUIsdUJBQVEsRUFBRSxjQUFjO2NBQ3pCLENBQUMsQ0FBQztZQUNKO1VBQ0Y7UUFDRjtBQUNELGNBQU8sa0JBQWtCLENBQUM7TUFDM0I7OztVQTVCa0IsSUFBSTs7O3NCQUFKLElBQUk7Ozs7Ozs7Ozs7Ozs7Ozs7O0tDSEosR0FBRztBQUNYLFlBRFEsR0FBRyxDQUNWLFFBQVEsRUFBRSxTQUFTLEVBQUM7MkJBRGIsR0FBRzs7QUFFcEIsU0FBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7QUFDekIsU0FBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDNUI7O2dCQUprQixHQUFHOztZQU1sQixjQUFDLE1BQU0sRUFBRTtBQUNYLFdBQUcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsTUFBTSxDQUFDLEVBQUU7QUFDNUMsZ0JBQU87UUFDUjs7QUFFRCxXQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQixXQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztNQUN6Qjs7O1lBRVUscUJBQUMsU0FBUyxFQUFFLElBQUksRUFBRTtBQUMzQixjQUFPLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUNqQyxTQUFTLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztNQUMxQzs7O1VBbEJrQixHQUFHOzs7c0JBQUgsR0FBRzs7Ozs7OztBQ0F4Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCLGFBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsTUFBTTtBQUNqQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFvQyxlQUFlO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUU7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0EsOEJBQTZCLGtCQUFrQjtBQUMvQyw4QkFBNkIsa0JBQWtCO0FBQy9DO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsT0FBTztBQUNsQixhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLHlDQUF3QyxlQUFlO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGFBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWSxPQUFPO0FBQ25CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFjO0FBQ2Q7QUFDQSxhQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDEyODBjMTMxYzg5YjcyODZhM2VhXG4gKiovIiwidmFyIEJhY29uID0gcmVxdWlyZSgnYmFjb25qcycpO1xudmFyIEd1aSA9IHJlcXVpcmUoJy4vZ3VpJyk7XG5cbnZhciBndWkgPSBuZXcgR3VpKCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9hcHAuanNcbiAqKi8iLCIoZnVuY3Rpb24oKSB7XG4gIHZhciBCYWNvbiwgQnVmZmVyaW5nU291cmNlLCBCdXMsIENvbXBvc2l0ZVVuc3Vic2NyaWJlLCBDb25zdW1pbmdTb3VyY2UsIERlc2MsIERpc3BhdGNoZXIsIEVuZCwgRXJyb3IsIEV2ZW50LCBFdmVudFN0cmVhbSwgRXhjZXB0aW9uLCBJbml0aWFsLCBOZXh0LCBOb25lLCBPYnNlcnZhYmxlLCBQcm9wZXJ0eSwgUHJvcGVydHlEaXNwYXRjaGVyLCBTb21lLCBTb3VyY2UsIFVwZGF0ZUJhcnJpZXIsIF8sIGFkZFByb3BlcnR5SW5pdFZhbHVlVG9TdHJlYW0sIGFyZ3VtZW50c1RvT2JzZXJ2YWJsZXMsIGFyZ3VtZW50c1RvT2JzZXJ2YWJsZXNBbmRGdW5jdGlvbiwgYXNzZXJ0LCBhc3NlcnRBcnJheSwgYXNzZXJ0RXZlbnRTdHJlYW0sIGFzc2VydEZ1bmN0aW9uLCBhc3NlcnROb0FyZ3VtZW50cywgYXNzZXJ0T2JzZXJ2YWJsZSwgYXNzZXJ0T2JzZXJ2YWJsZUlzUHJvcGVydHksIGFzc2VydFN0cmluZywgY2xvbmVBcnJheSwgY29uc3RhbnRUb0Z1bmN0aW9uLCBjb250YWluc0R1cGxpY2F0ZURlcHMsIGNvbnZlcnRBcmdzVG9GdW5jdGlvbiwgZGVzY3JpYmUsIGVuZEV2ZW50LCBldmVudElkQ291bnRlciwgZXZlbnRNZXRob2RzLCBmaW5kRGVwcywgZmluZEhhbmRsZXJNZXRob2RzLCBmbGF0TWFwXywgZm9ybWVyLCBpZENvdW50ZXIsIGluaXRpYWxFdmVudCwgaXNBcnJheSwgaXNGaWVsZEtleSwgaXNPYnNlcnZhYmxlLCBsYXR0ZXIsIGxpZnRDYWxsYmFjaywgbWFrZUZ1bmN0aW9uLCBtYWtlRnVuY3Rpb25BcmdzLCBtYWtlRnVuY3Rpb25fLCBtYWtlT2JzZXJ2YWJsZSwgbWFrZVNwYXduZXIsIG5leHRFdmVudCwgbm9wLCBwYXJ0aWFsbHlBcHBsaWVkLCByZWN1cnNpb25EZXB0aCwgcmVmLCByZWdpc3Rlck9icywgc3B5cywgdG9Db21iaW5hdG9yLCB0b0V2ZW50LCB0b0ZpZWxkRXh0cmFjdG9yLCB0b0ZpZWxkS2V5LCB0b09wdGlvbiwgdG9TaW1wbGVFeHRyYWN0b3IsIHZhbHVlQW5kRW5kLCB3aXRoRGVzYywgd2l0aE1ldGhvZENhbGxTdXBwb3J0LFxuICAgIGhhc1Byb3AgPSB7fS5oYXNPd25Qcm9wZXJ0eSxcbiAgICBleHRlbmQgPSBmdW5jdGlvbihjaGlsZCwgcGFyZW50KSB7IGZvciAodmFyIGtleSBpbiBwYXJlbnQpIHsgaWYgKGhhc1Byb3AuY2FsbChwYXJlbnQsIGtleSkpIGNoaWxkW2tleV0gPSBwYXJlbnRba2V5XTsgfSBmdW5jdGlvbiBjdG9yKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gY2hpbGQ7IH0gY3Rvci5wcm90b3R5cGUgPSBwYXJlbnQucHJvdG90eXBlOyBjaGlsZC5wcm90b3R5cGUgPSBuZXcgY3RvcigpOyBjaGlsZC5fX3N1cGVyX18gPSBwYXJlbnQucHJvdG90eXBlOyByZXR1cm4gY2hpbGQ7IH0sXG4gICAgc2xpY2UgPSBbXS5zbGljZSxcbiAgICBiaW5kID0gZnVuY3Rpb24oZm4sIG1lKXsgcmV0dXJuIGZ1bmN0aW9uKCl7IHJldHVybiBmbi5hcHBseShtZSwgYXJndW1lbnRzKTsgfTsgfTtcblxuICBCYWNvbiA9IHtcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCJCYWNvblwiO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi52ZXJzaW9uID0gJzAuNy43NCc7XG5cbiAgRXhjZXB0aW9uID0gKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsICE9PSBudWxsID8gZ2xvYmFsIDogdGhpcykuRXJyb3I7XG5cbiAgbm9wID0gZnVuY3Rpb24oKSB7fTtcblxuICBsYXR0ZXIgPSBmdW5jdGlvbihfLCB4KSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG5cbiAgZm9ybWVyID0gZnVuY3Rpb24oeCwgXykge1xuICAgIHJldHVybiB4O1xuICB9O1xuXG4gIGNsb25lQXJyYXkgPSBmdW5jdGlvbih4cykge1xuICAgIHJldHVybiB4cy5zbGljZSgwKTtcbiAgfTtcblxuICBhc3NlcnQgPSBmdW5jdGlvbihtZXNzYWdlLCBjb25kaXRpb24pIHtcbiAgICBpZiAoIWNvbmRpdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihtZXNzYWdlKTtcbiAgICB9XG4gIH07XG5cbiAgYXNzZXJ0T2JzZXJ2YWJsZUlzUHJvcGVydHkgPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggaW5zdGFuY2VvZiBPYnNlcnZhYmxlICYmICEoeCBpbnN0YW5jZW9mIFByb3BlcnR5KSkge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIk9ic2VydmFibGUgaXMgbm90IGEgUHJvcGVydHkgOiBcIiArIHgpO1xuICAgIH1cbiAgfTtcblxuICBhc3NlcnRFdmVudFN0cmVhbSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBFdmVudFN0cmVhbSkpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJub3QgYW4gRXZlbnRTdHJlYW0gOiBcIiArIGV2ZW50KTtcbiAgICB9XG4gIH07XG5cbiAgYXNzZXJ0T2JzZXJ2YWJsZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgaWYgKCEoZXZlbnQgaW5zdGFuY2VvZiBPYnNlcnZhYmxlKSkge1xuICAgICAgdGhyb3cgbmV3IEV4Y2VwdGlvbihcIm5vdCBhbiBPYnNlcnZhYmxlIDogXCIgKyBldmVudCk7XG4gICAgfVxuICB9O1xuXG4gIGFzc2VydEZ1bmN0aW9uID0gZnVuY3Rpb24oZikge1xuICAgIHJldHVybiBhc3NlcnQoXCJub3QgYSBmdW5jdGlvbiA6IFwiICsgZiwgXy5pc0Z1bmN0aW9uKGYpKTtcbiAgfTtcblxuICBpc0FycmF5ID0gZnVuY3Rpb24oeHMpIHtcbiAgICByZXR1cm4geHMgaW5zdGFuY2VvZiBBcnJheTtcbiAgfTtcblxuICBpc09ic2VydmFibGUgPSBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIHggaW5zdGFuY2VvZiBPYnNlcnZhYmxlO1xuICB9O1xuXG4gIGFzc2VydEFycmF5ID0gZnVuY3Rpb24oeHMpIHtcbiAgICBpZiAoIWlzQXJyYXkoeHMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGFuIGFycmF5IDogXCIgKyB4cyk7XG4gICAgfVxuICB9O1xuXG4gIGFzc2VydE5vQXJndW1lbnRzID0gZnVuY3Rpb24oYXJncykge1xuICAgIHJldHVybiBhc3NlcnQoXCJubyBhcmd1bWVudHMgc3VwcG9ydGVkXCIsIGFyZ3MubGVuZ3RoID09PSAwKTtcbiAgfTtcblxuICBhc3NlcnRTdHJpbmcgPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHR5cGVvZiB4ICE9PSBcInN0cmluZ1wiKSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGEgc3RyaW5nIDogXCIgKyB4KTtcbiAgICB9XG4gIH07XG5cbiAgXyA9IHtcbiAgICBpbmRleE9mOiBBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA/IGZ1bmN0aW9uKHhzLCB4KSB7XG4gICAgICByZXR1cm4geHMuaW5kZXhPZih4KTtcbiAgICB9IDogZnVuY3Rpb24oeHMsIHgpIHtcbiAgICAgIHZhciBpLCBqLCBsZW4xLCB5O1xuICAgICAgZm9yIChpID0gaiA9IDAsIGxlbjEgPSB4cy5sZW5ndGg7IGogPCBsZW4xOyBpID0gKytqKSB7XG4gICAgICAgIHkgPSB4c1tpXTtcbiAgICAgICAgaWYgKHggPT09IHkpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH0sXG4gICAgaW5kZXhXaGVyZTogZnVuY3Rpb24oeHMsIGYpIHtcbiAgICAgIHZhciBpLCBqLCBsZW4xLCB5O1xuICAgICAgZm9yIChpID0gaiA9IDAsIGxlbjEgPSB4cy5sZW5ndGg7IGogPCBsZW4xOyBpID0gKytqKSB7XG4gICAgICAgIHkgPSB4c1tpXTtcbiAgICAgICAgaWYgKGYoeSkpIHtcbiAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIC0xO1xuICAgIH0sXG4gICAgaGVhZDogZnVuY3Rpb24oeHMpIHtcbiAgICAgIHJldHVybiB4c1swXTtcbiAgICB9LFxuICAgIGFsd2F5czogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4geDtcbiAgICAgIH07XG4gICAgfSxcbiAgICBuZWdhdGU6IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiAhZih4KTtcbiAgICAgIH07XG4gICAgfSxcbiAgICBlbXB0eTogZnVuY3Rpb24oeHMpIHtcbiAgICAgIHJldHVybiB4cy5sZW5ndGggPT09IDA7XG4gICAgfSxcbiAgICB0YWlsOiBmdW5jdGlvbih4cykge1xuICAgICAgcmV0dXJuIHhzLnNsaWNlKDEsIHhzLmxlbmd0aCk7XG4gICAgfSxcbiAgICBmaWx0ZXI6IGZ1bmN0aW9uKGYsIHhzKSB7XG4gICAgICB2YXIgZmlsdGVyZWQsIGosIGxlbjEsIHg7XG4gICAgICBmaWx0ZXJlZCA9IFtdO1xuICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHhzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICB4ID0geHNbal07XG4gICAgICAgIGlmIChmKHgpKSB7XG4gICAgICAgICAgZmlsdGVyZWQucHVzaCh4KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZpbHRlcmVkO1xuICAgIH0sXG4gICAgbWFwOiBmdW5jdGlvbihmLCB4cykge1xuICAgICAgdmFyIGosIGxlbjEsIHJlc3VsdHMsIHg7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0geHMubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHggPSB4c1tqXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGYoeCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSxcbiAgICBlYWNoOiBmdW5jdGlvbih4cywgZikge1xuICAgICAgdmFyIGtleSwgdmFsdWU7XG4gICAgICBmb3IgKGtleSBpbiB4cykge1xuICAgICAgICBpZiAoIWhhc1Byb3AuY2FsbCh4cywga2V5KSkgY29udGludWU7XG4gICAgICAgIHZhbHVlID0geHNba2V5XTtcbiAgICAgICAgZihrZXksIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfSxcbiAgICB0b0FycmF5OiBmdW5jdGlvbih4cykge1xuICAgICAgaWYgKGlzQXJyYXkoeHMpKSB7XG4gICAgICAgIHJldHVybiB4cztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbeHNdO1xuICAgICAgfVxuICAgIH0sXG4gICAgY29udGFpbnM6IGZ1bmN0aW9uKHhzLCB4KSB7XG4gICAgICByZXR1cm4gXy5pbmRleE9mKHhzLCB4KSAhPT0gLTE7XG4gICAgfSxcbiAgICBpZDogZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfSxcbiAgICBsYXN0OiBmdW5jdGlvbih4cykge1xuICAgICAgcmV0dXJuIHhzW3hzLmxlbmd0aCAtIDFdO1xuICAgIH0sXG4gICAgYWxsOiBmdW5jdGlvbih4cywgZikge1xuICAgICAgdmFyIGosIGxlbjEsIHg7XG4gICAgICBpZiAoZiA9PSBudWxsKSB7XG4gICAgICAgIGYgPSBfLmlkO1xuICAgICAgfVxuICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHhzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICB4ID0geHNbal07XG4gICAgICAgIGlmICghZih4KSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSxcbiAgICBhbnk6IGZ1bmN0aW9uKHhzLCBmKSB7XG4gICAgICB2YXIgaiwgbGVuMSwgeDtcbiAgICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgICAgZiA9IF8uaWQ7XG4gICAgICB9XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0geHMubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHggPSB4c1tqXTtcbiAgICAgICAgaWYgKGYoeCkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgd2l0aG91dDogZnVuY3Rpb24oeCwgeHMpIHtcbiAgICAgIHJldHVybiBfLmZpbHRlcigoZnVuY3Rpb24oeSkge1xuICAgICAgICByZXR1cm4geSAhPT0geDtcbiAgICAgIH0pLCB4cyk7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uKHgsIHhzKSB7XG4gICAgICB2YXIgaTtcbiAgICAgIGkgPSBfLmluZGV4T2YoeHMsIHgpO1xuICAgICAgaWYgKGkgPj0gMCkge1xuICAgICAgICByZXR1cm4geHMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH0sXG4gICAgZm9sZDogZnVuY3Rpb24oeHMsIHNlZWQsIGYpIHtcbiAgICAgIHZhciBqLCBsZW4xLCB4O1xuICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHhzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICB4ID0geHNbal07XG4gICAgICAgIHNlZWQgPSBmKHNlZWQsIHgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlZWQ7XG4gICAgfSxcbiAgICBmbGF0TWFwOiBmdW5jdGlvbihmLCB4cykge1xuICAgICAgcmV0dXJuIF8uZm9sZCh4cywgW10sIChmdW5jdGlvbih5cywgeCkge1xuICAgICAgICByZXR1cm4geXMuY29uY2F0KGYoeCkpO1xuICAgICAgfSkpO1xuICAgIH0sXG4gICAgY2FjaGVkOiBmdW5jdGlvbihmKSB7XG4gICAgICB2YXIgdmFsdWU7XG4gICAgICB2YWx1ZSA9IE5vbmU7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gTm9uZSkge1xuICAgICAgICAgIHZhbHVlID0gZigpO1xuICAgICAgICAgIGYgPSB2b2lkIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgfTtcbiAgICB9LFxuICAgIGlzRnVuY3Rpb246IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgZiA9PT0gXCJmdW5jdGlvblwiO1xuICAgIH0sXG4gICAgdG9TdHJpbmc6IGZ1bmN0aW9uKG9iaikge1xuICAgICAgdmFyIGV4LCBpbnRlcm5hbHMsIGtleSwgdmFsdWU7XG4gICAgICB0cnkge1xuICAgICAgICByZWN1cnNpb25EZXB0aCsrO1xuICAgICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gXCJ1bmRlZmluZWRcIjtcbiAgICAgICAgfSBlbHNlIGlmIChfLmlzRnVuY3Rpb24ob2JqKSkge1xuICAgICAgICAgIHJldHVybiBcImZ1bmN0aW9uXCI7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgICAgaWYgKHJlY3Vyc2lvbkRlcHRoID4gNSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiWy4uXVwiO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gXCJbXCIgKyBfLm1hcChfLnRvU3RyaW5nLCBvYmopLnRvU3RyaW5nKCkgKyBcIl1cIjtcbiAgICAgICAgfSBlbHNlIGlmICgoKG9iaiAhPSBudWxsID8gb2JqLnRvU3RyaW5nIDogdm9pZCAwKSAhPSBudWxsKSAmJiBvYmoudG9TdHJpbmcgIT09IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gb2JqLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG9iaiA9PT0gXCJvYmplY3RcIikge1xuICAgICAgICAgIGlmIChyZWN1cnNpb25EZXB0aCA+IDUpIHtcbiAgICAgICAgICAgIHJldHVybiBcInsuLn1cIjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaW50ZXJuYWxzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlc3VsdHM7XG4gICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgICAgaWYgKCFoYXNQcm9wLmNhbGwob2JqLCBrZXkpKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgdmFsdWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpba2V5XTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIGV4ID0gX2Vycm9yO1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGV4O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKF8udG9TdHJpbmcoa2V5KSArIFwiOlwiICsgXy50b1N0cmluZyh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgICByZXR1cm4gXCJ7XCIgKyBpbnRlcm5hbHMgKyBcIn1cIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICB9XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICByZWN1cnNpb25EZXB0aC0tO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICByZWN1cnNpb25EZXB0aCA9IDA7XG5cbiAgQmFjb24uXyA9IF87XG5cbiAgVXBkYXRlQmFycmllciA9IEJhY29uLlVwZGF0ZUJhcnJpZXIgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFmdGVyVHJhbnNhY3Rpb24sIGFmdGVycywgYWZ0ZXJzSW5kZXgsIGN1cnJlbnRFdmVudElkLCBmbHVzaCwgZmx1c2hEZXBzT2YsIGZsdXNoV2FpdGVycywgaGFzV2FpdGVycywgaW5UcmFuc2FjdGlvbiwgcm9vdEV2ZW50LCB3YWl0ZXJPYnMsIHdhaXRlcnMsIHdoZW5Eb25lV2l0aCwgd3JhcHBlZFN1YnNjcmliZTtcbiAgICByb290RXZlbnQgPSB2b2lkIDA7XG4gICAgd2FpdGVyT2JzID0gW107XG4gICAgd2FpdGVycyA9IHt9O1xuICAgIGFmdGVycyA9IFtdO1xuICAgIGFmdGVyc0luZGV4ID0gMDtcbiAgICBhZnRlclRyYW5zYWN0aW9uID0gZnVuY3Rpb24oZikge1xuICAgICAgaWYgKHJvb3RFdmVudCkge1xuICAgICAgICByZXR1cm4gYWZ0ZXJzLnB1c2goZik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZigpO1xuICAgICAgfVxuICAgIH07XG4gICAgd2hlbkRvbmVXaXRoID0gZnVuY3Rpb24ob2JzLCBmKSB7XG4gICAgICB2YXIgb2JzV2FpdGVycztcbiAgICAgIGlmIChyb290RXZlbnQpIHtcbiAgICAgICAgb2JzV2FpdGVycyA9IHdhaXRlcnNbb2JzLmlkXTtcbiAgICAgICAgaWYgKG9ic1dhaXRlcnMgPT0gbnVsbCkge1xuICAgICAgICAgIG9ic1dhaXRlcnMgPSB3YWl0ZXJzW29icy5pZF0gPSBbZl07XG4gICAgICAgICAgcmV0dXJuIHdhaXRlck9icy5wdXNoKG9icyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIG9ic1dhaXRlcnMucHVzaChmKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGZsdXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICB3aGlsZSAod2FpdGVyT2JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZmx1c2hXYWl0ZXJzKDApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9O1xuICAgIGZsdXNoV2FpdGVycyA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICB2YXIgZiwgaiwgbGVuMSwgb2JzLCBvYnNJZCwgb2JzV2FpdGVycztcbiAgICAgIG9icyA9IHdhaXRlck9ic1tpbmRleF07XG4gICAgICBvYnNJZCA9IG9icy5pZDtcbiAgICAgIG9ic1dhaXRlcnMgPSB3YWl0ZXJzW29ic0lkXTtcbiAgICAgIHdhaXRlck9icy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgZGVsZXRlIHdhaXRlcnNbb2JzSWRdO1xuICAgICAgZmx1c2hEZXBzT2Yob2JzKTtcbiAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSBvYnNXYWl0ZXJzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICBmID0gb2JzV2FpdGVyc1tqXTtcbiAgICAgICAgZigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9O1xuICAgIGZsdXNoRGVwc09mID0gZnVuY3Rpb24ob2JzKSB7XG4gICAgICB2YXIgZGVwLCBkZXBzLCBpbmRleCwgaiwgbGVuMTtcbiAgICAgIGRlcHMgPSBvYnMuaW50ZXJuYWxEZXBzKCk7XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gZGVwcy5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgZGVwID0gZGVwc1tqXTtcbiAgICAgICAgZmx1c2hEZXBzT2YoZGVwKTtcbiAgICAgICAgaWYgKHdhaXRlcnNbZGVwLmlkXSkge1xuICAgICAgICAgIGluZGV4ID0gXy5pbmRleE9mKHdhaXRlck9icywgZGVwKTtcbiAgICAgICAgICBmbHVzaFdhaXRlcnMoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH07XG4gICAgaW5UcmFuc2FjdGlvbiA9IGZ1bmN0aW9uKGV2ZW50LCBjb250ZXh0LCBmLCBhcmdzKSB7XG4gICAgICB2YXIgYWZ0ZXIsIHJlc3VsdDtcbiAgICAgIGlmIChyb290RXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIGYuYXBwbHkoY29udGV4dCwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb290RXZlbnQgPSBldmVudDtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXN1bHQgPSBmLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgIGZsdXNoKCk7XG4gICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgcm9vdEV2ZW50ID0gdm9pZCAwO1xuICAgICAgICAgIHdoaWxlIChhZnRlcnNJbmRleCA8IGFmdGVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFmdGVyID0gYWZ0ZXJzW2FmdGVyc0luZGV4XTtcbiAgICAgICAgICAgIGFmdGVyc0luZGV4Kys7XG4gICAgICAgICAgICBhZnRlcigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhZnRlcnNJbmRleCA9IDA7XG4gICAgICAgICAgYWZ0ZXJzID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICB9O1xuICAgIGN1cnJlbnRFdmVudElkID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAocm9vdEV2ZW50KSB7XG4gICAgICAgIHJldHVybiByb290RXZlbnQuaWQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdm9pZCAwO1xuICAgICAgfVxuICAgIH07XG4gICAgd3JhcHBlZFN1YnNjcmliZSA9IGZ1bmN0aW9uKG9icywgc2luaykge1xuICAgICAgdmFyIGRvVW5zdWIsIHNob3VsZFVuc3ViLCB1bnN1YiwgdW5zdWJkO1xuICAgICAgdW5zdWJkID0gZmFsc2U7XG4gICAgICBzaG91bGRVbnN1YiA9IGZhbHNlO1xuICAgICAgZG9VbnN1YiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc2hvdWxkVW5zdWIgPSB0cnVlO1xuICAgICAgfTtcbiAgICAgIHVuc3ViID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHVuc3ViZCA9IHRydWU7XG4gICAgICAgIHJldHVybiBkb1Vuc3ViKCk7XG4gICAgICB9O1xuICAgICAgZG9VbnN1YiA9IG9icy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICByZXR1cm4gYWZ0ZXJUcmFuc2FjdGlvbihmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgcmVwbHk7XG4gICAgICAgICAgaWYgKCF1bnN1YmQpIHtcbiAgICAgICAgICAgIHJlcGx5ID0gc2luayhldmVudCk7XG4gICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICByZXR1cm4gdW5zdWIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBpZiAoc2hvdWxkVW5zdWIpIHtcbiAgICAgICAgZG9VbnN1YigpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVuc3ViO1xuICAgIH07XG4gICAgaGFzV2FpdGVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHdhaXRlck9icy5sZW5ndGggPiAwO1xuICAgIH07XG4gICAgcmV0dXJuIHtcbiAgICAgIHdoZW5Eb25lV2l0aDogd2hlbkRvbmVXaXRoLFxuICAgICAgaGFzV2FpdGVyczogaGFzV2FpdGVycyxcbiAgICAgIGluVHJhbnNhY3Rpb246IGluVHJhbnNhY3Rpb24sXG4gICAgICBjdXJyZW50RXZlbnRJZDogY3VycmVudEV2ZW50SWQsXG4gICAgICB3cmFwcGVkU3Vic2NyaWJlOiB3cmFwcGVkU3Vic2NyaWJlLFxuICAgICAgYWZ0ZXJUcmFuc2FjdGlvbjogYWZ0ZXJUcmFuc2FjdGlvblxuICAgIH07XG4gIH0pKCk7XG5cbiAgU291cmNlID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIFNvdXJjZShvYnMxLCBzeW5jLCBsYXp5MSkge1xuICAgICAgdGhpcy5vYnMgPSBvYnMxO1xuICAgICAgdGhpcy5zeW5jID0gc3luYztcbiAgICAgIHRoaXMubGF6eSA9IGxhenkxICE9IG51bGwgPyBsYXp5MSA6IGZhbHNlO1xuICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgIH1cblxuICAgIFNvdXJjZS5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgcmV0dXJuIHRoaXMub2JzLmRpc3BhdGNoZXIuc3Vic2NyaWJlKHNpbmspO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5vYnMudG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5tYXJrRW5kZWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5jb25zdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IF8uYWx3YXlzKHRoaXMucXVldWVbMF0pXG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWV1ZVswXTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgU291cmNlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUgPSBbeF07XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUubWF5SGF2ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIFNvdXJjZS5wcm90b3R5cGUuaGFzQXRMZWFzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUubGVuZ3RoO1xuICAgIH07XG5cbiAgICBTb3VyY2UucHJvdG90eXBlLmZsYXR0ZW4gPSB0cnVlO1xuXG4gICAgcmV0dXJuIFNvdXJjZTtcblxuICB9KSgpO1xuXG4gIENvbnN1bWluZ1NvdXJjZSA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKENvbnN1bWluZ1NvdXJjZSwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBDb25zdW1pbmdTb3VyY2UoKSB7XG4gICAgICByZXR1cm4gQ29uc3VtaW5nU291cmNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cblxuICAgIENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUuY29uc3VtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUuc2hpZnQoKTtcbiAgICB9O1xuXG4gICAgQ29uc3VtaW5nU291cmNlLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMucXVldWUucHVzaCh4KTtcbiAgICB9O1xuXG4gICAgQ29uc3VtaW5nU291cmNlLnByb3RvdHlwZS5tYXlIYXZlID0gZnVuY3Rpb24oYykge1xuICAgICAgcmV0dXJuICF0aGlzLmVuZGVkIHx8IHRoaXMucXVldWUubGVuZ3RoID49IGM7XG4gICAgfTtcblxuICAgIENvbnN1bWluZ1NvdXJjZS5wcm90b3R5cGUuaGFzQXRMZWFzdCA9IGZ1bmN0aW9uKGMpIHtcbiAgICAgIHJldHVybiB0aGlzLnF1ZXVlLmxlbmd0aCA+PSBjO1xuICAgIH07XG5cbiAgICBDb25zdW1pbmdTb3VyY2UucHJvdG90eXBlLmZsYXR0ZW4gPSBmYWxzZTtcblxuICAgIHJldHVybiBDb25zdW1pbmdTb3VyY2U7XG5cbiAgfSkoU291cmNlKTtcblxuICBCdWZmZXJpbmdTb3VyY2UgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChCdWZmZXJpbmdTb3VyY2UsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gQnVmZmVyaW5nU291cmNlKG9icykge1xuICAgICAgQnVmZmVyaW5nU291cmNlLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIG9icywgdHJ1ZSk7XG4gICAgfVxuXG4gICAgQnVmZmVyaW5nU291cmNlLnByb3RvdHlwZS5jb25zdW1lID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdmFsdWVzO1xuICAgICAgdmFsdWVzID0gdGhpcy5xdWV1ZTtcbiAgICAgIHRoaXMucXVldWUgPSBbXTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdmFsdWVzO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH07XG5cbiAgICBCdWZmZXJpbmdTb3VyY2UucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gdGhpcy5xdWV1ZS5wdXNoKHgudmFsdWUoKSk7XG4gICAgfTtcblxuICAgIEJ1ZmZlcmluZ1NvdXJjZS5wcm90b3R5cGUuaGFzQXRMZWFzdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIHJldHVybiBCdWZmZXJpbmdTb3VyY2U7XG5cbiAgfSkoU291cmNlKTtcblxuICBTb3VyY2UuaXNUcmlnZ2VyID0gZnVuY3Rpb24ocykge1xuICAgIGlmIChzIGluc3RhbmNlb2YgU291cmNlKSB7XG4gICAgICByZXR1cm4gcy5zeW5jO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gcyBpbnN0YW5jZW9mIEV2ZW50U3RyZWFtO1xuICAgIH1cbiAgfTtcblxuICBTb3VyY2UuZnJvbU9ic2VydmFibGUgPSBmdW5jdGlvbihzKSB7XG4gICAgaWYgKHMgaW5zdGFuY2VvZiBTb3VyY2UpIHtcbiAgICAgIHJldHVybiBzO1xuICAgIH0gZWxzZSBpZiAocyBpbnN0YW5jZW9mIFByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gbmV3IFNvdXJjZShzLCBmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgQ29uc3VtaW5nU291cmNlKHMsIHRydWUpO1xuICAgIH1cbiAgfTtcblxuICBEZXNjID0gKGZ1bmN0aW9uKCkge1xuICAgIGZ1bmN0aW9uIERlc2MoY29udGV4dDEsIG1ldGhvZDEsIGFyZ3MxKSB7XG4gICAgICB0aGlzLmNvbnRleHQgPSBjb250ZXh0MTtcbiAgICAgIHRoaXMubWV0aG9kID0gbWV0aG9kMTtcbiAgICAgIHRoaXMuYXJncyA9IGFyZ3MxO1xuICAgIH1cblxuICAgIERlc2MucHJvdG90eXBlLmRlcHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlZCB8fCAodGhpcy5jYWNoZWQgPSBmaW5kRGVwcyhbdGhpcy5jb250ZXh0XS5jb25jYXQodGhpcy5hcmdzKSkpO1xuICAgIH07XG5cbiAgICBEZXNjLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF8udG9TdHJpbmcodGhpcy5jb250ZXh0KSArIFwiLlwiICsgXy50b1N0cmluZyh0aGlzLm1ldGhvZCkgKyBcIihcIiArIF8ubWFwKF8udG9TdHJpbmcsIHRoaXMuYXJncykgKyBcIilcIjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIERlc2M7XG5cbiAgfSkoKTtcblxuICBkZXNjcmliZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBjb250ZXh0LCBtZXRob2Q7XG4gICAgY29udGV4dCA9IGFyZ3VtZW50c1swXSwgbWV0aG9kID0gYXJndW1lbnRzWzFdLCBhcmdzID0gMyA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDIpIDogW107XG4gICAgaWYgKChjb250ZXh0IHx8IG1ldGhvZCkgaW5zdGFuY2VvZiBEZXNjKSB7XG4gICAgICByZXR1cm4gY29udGV4dCB8fCBtZXRob2Q7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXcgRGVzYyhjb250ZXh0LCBtZXRob2QsIGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICB3aXRoRGVzYyA9IGZ1bmN0aW9uKGRlc2MsIG9icykge1xuICAgIG9icy5kZXNjID0gZGVzYztcbiAgICByZXR1cm4gb2JzO1xuICB9O1xuXG4gIGZpbmREZXBzID0gZnVuY3Rpb24oeCkge1xuICAgIGlmIChpc0FycmF5KHgpKSB7XG4gICAgICByZXR1cm4gXy5mbGF0TWFwKGZpbmREZXBzLCB4KTtcbiAgICB9IGVsc2UgaWYgKGlzT2JzZXJ2YWJsZSh4KSkge1xuICAgICAgcmV0dXJuIFt4XTtcbiAgICB9IGVsc2UgaWYgKHggaW5zdGFuY2VvZiBTb3VyY2UpIHtcbiAgICAgIHJldHVybiBbeC5vYnNdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLkRlc2MgPSBEZXNjO1xuXG4gIEJhY29uLkRlc2MuZW1wdHkgPSBuZXcgQmFjb24uRGVzYyhcIlwiLCBcIlwiLCBbXSk7XG5cbiAgd2l0aE1ldGhvZENhbGxTdXBwb3J0ID0gZnVuY3Rpb24od3JhcHBlZCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBjb250ZXh0LCBmLCBtZXRob2ROYW1lO1xuICAgICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgICAgaWYgKHR5cGVvZiBmID09PSBcIm9iamVjdFwiICYmIGFyZ3MubGVuZ3RoKSB7XG4gICAgICAgIGNvbnRleHQgPSBmO1xuICAgICAgICBtZXRob2ROYW1lID0gYXJnc1swXTtcbiAgICAgICAgZiA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBjb250ZXh0W21ldGhvZE5hbWVdLmFwcGx5KGNvbnRleHQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIGFyZ3MgPSBhcmdzLnNsaWNlKDEpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdyYXBwZWQuYXBwbHkobnVsbCwgW2ZdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3MpKSk7XG4gICAgfTtcbiAgfTtcblxuICBtYWtlRnVuY3Rpb25BcmdzID0gZnVuY3Rpb24oYXJncykge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzKTtcbiAgICByZXR1cm4gbWFrZUZ1bmN0aW9uXy5hcHBseShudWxsLCBhcmdzKTtcbiAgfTtcblxuICBwYXJ0aWFsbHlBcHBsaWVkID0gZnVuY3Rpb24oZiwgYXBwbGllZCkge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzO1xuICAgICAgYXJncyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgYXBwbGllZC5jb25jYXQoYXJncykpO1xuICAgIH07XG4gIH07XG5cbiAgdG9TaW1wbGVFeHRyYWN0b3IgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgIHZhciBmaWVsZFZhbHVlO1xuICAgICAgICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmllbGRWYWx1ZSA9IHZhbHVlW2tleV07XG4gICAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihmaWVsZFZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZpZWxkVmFsdWUuYXBwbHkodmFsdWUsIGFyZ3MpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfTtcbiAgfTtcblxuICB0b0ZpZWxkRXh0cmFjdG9yID0gZnVuY3Rpb24oZiwgYXJncykge1xuICAgIHZhciBwYXJ0RnVuY3MsIHBhcnRzO1xuICAgIHBhcnRzID0gZi5zbGljZSgxKS5zcGxpdChcIi5cIik7XG4gICAgcGFydEZ1bmNzID0gXy5tYXAodG9TaW1wbGVFeHRyYWN0b3IoYXJncyksIHBhcnRzKTtcbiAgICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBqLCBsZW4xO1xuICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHBhcnRGdW5jcy5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgZiA9IHBhcnRGdW5jc1tqXTtcbiAgICAgICAgdmFsdWUgPSBmKHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9O1xuICB9O1xuXG4gIGlzRmllbGRLZXkgPSBmdW5jdGlvbihmKSB7XG4gICAgcmV0dXJuICh0eXBlb2YgZiA9PT0gXCJzdHJpbmdcIikgJiYgZi5sZW5ndGggPiAxICYmIGYuY2hhckF0KDApID09PSBcIi5cIjtcbiAgfTtcblxuICBtYWtlRnVuY3Rpb25fID0gd2l0aE1ldGhvZENhbGxTdXBwb3J0KGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmO1xuICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGYpKSB7XG4gICAgICBpZiAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHBhcnRpYWxseUFwcGxpZWQoZiwgYXJncyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzRmllbGRLZXkoZikpIHtcbiAgICAgIHJldHVybiB0b0ZpZWxkRXh0cmFjdG9yKGYsIGFyZ3MpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gXy5hbHdheXMoZik7XG4gICAgfVxuICB9KTtcblxuICBtYWtlRnVuY3Rpb24gPSBmdW5jdGlvbihmLCBhcmdzKSB7XG4gICAgcmV0dXJuIG1ha2VGdW5jdGlvbl8uYXBwbHkobnVsbCwgW2ZdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3MpKSk7XG4gIH07XG5cbiAgY29udmVydEFyZ3NUb0Z1bmN0aW9uID0gZnVuY3Rpb24ob2JzLCBmLCBhcmdzLCBtZXRob2QpIHtcbiAgICB2YXIgc2FtcGxlZDtcbiAgICBpZiAoZiBpbnN0YW5jZW9mIFByb3BlcnR5KSB7XG4gICAgICBzYW1wbGVkID0gZi5zYW1wbGVkQnkob2JzLCBmdW5jdGlvbihwLCBzKSB7XG4gICAgICAgIHJldHVybiBbcCwgc107XG4gICAgICB9KTtcbiAgICAgIHJldHVybiBtZXRob2QuY2FsbChzYW1wbGVkLCBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgdmFyIHAsIHM7XG4gICAgICAgIHAgPSBhcmdbMF0sIHMgPSBhcmdbMV07XG4gICAgICAgIHJldHVybiBwO1xuICAgICAgfSkubWFwKGZ1bmN0aW9uKGFyZykge1xuICAgICAgICB2YXIgcCwgcztcbiAgICAgICAgcCA9IGFyZ1swXSwgcyA9IGFyZ1sxXTtcbiAgICAgICAgcmV0dXJuIHM7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbihmLCBhcmdzKTtcbiAgICAgIHJldHVybiBtZXRob2QuY2FsbChvYnMsIGYpO1xuICAgIH1cbiAgfTtcblxuICB0b0NvbWJpbmF0b3IgPSBmdW5jdGlvbihmKSB7XG4gICAgdmFyIGtleTtcbiAgICBpZiAoXy5pc0Z1bmN0aW9uKGYpKSB7XG4gICAgICByZXR1cm4gZjtcbiAgICB9IGVsc2UgaWYgKGlzRmllbGRLZXkoZikpIHtcbiAgICAgIGtleSA9IHRvRmllbGRLZXkoZik7XG4gICAgICByZXR1cm4gZnVuY3Rpb24obGVmdCwgcmlnaHQpIHtcbiAgICAgICAgcmV0dXJuIGxlZnRba2V5XShyaWdodCk7XG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXhjZXB0aW9uKFwibm90IGEgZnVuY3Rpb24gb3IgYSBmaWVsZCBrZXk6IFwiICsgZik7XG4gICAgfVxuICB9O1xuXG4gIHRvRmllbGRLZXkgPSBmdW5jdGlvbihmKSB7XG4gICAgcmV0dXJuIGYuc2xpY2UoMSk7XG4gIH07XG5cbiAgU29tZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBTb21lKHZhbHVlMSkge1xuICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlMTtcbiAgICB9XG5cbiAgICBTb21lLnByb3RvdHlwZS5nZXRPckVsc2UgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnZhbHVlO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbihmKSB7XG4gICAgICBpZiAoZih0aGlzLnZhbHVlKSkge1xuICAgICAgICByZXR1cm4gbmV3IFNvbWUodGhpcy52YWx1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gTm9uZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgU29tZS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIG5ldyBTb21lKGYodGhpcy52YWx1ZSkpO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIGYodGhpcy52YWx1ZSk7XG4gICAgfTtcblxuICAgIFNvbWUucHJvdG90eXBlLmlzRGVmaW5lZCA9IHRydWU7XG5cbiAgICBTb21lLnByb3RvdHlwZS50b0FycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gW3RoaXMudmFsdWVdO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCJTb21lKFwiICsgdGhpcy52YWx1ZSArIFwiKVwiO1xuICAgIH07XG5cbiAgICBTb21lLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMuaW5zcGVjdCgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gU29tZTtcblxuICB9KSgpO1xuXG4gIE5vbmUgPSB7XG4gICAgZ2V0T3JFbHNlOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH0sXG4gICAgZmlsdGVyOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBOb25lO1xuICAgIH0sXG4gICAgbWFwOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBOb25lO1xuICAgIH0sXG4gICAgZm9yRWFjaDogZnVuY3Rpb24oKSB7fSxcbiAgICBpc0RlZmluZWQ6IGZhbHNlLFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0sXG4gICAgaW5zcGVjdDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCJOb25lXCI7XG4gICAgfSxcbiAgICB0b1N0cmluZzogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy5pbnNwZWN0KCk7XG4gICAgfVxuICB9O1xuXG4gIHRvT3B0aW9uID0gZnVuY3Rpb24odikge1xuICAgIGlmICh2IGluc3RhbmNlb2YgU29tZSB8fCB2ID09PSBOb25lKSB7XG4gICAgICByZXR1cm4gdjtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG5ldyBTb21lKHYpO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi5ub01vcmUgPSBbXCI8bm8tbW9yZT5cIl07XG5cbiAgQmFjb24ubW9yZSA9IFtcIjxtb3JlPlwiXTtcblxuICBldmVudElkQ291bnRlciA9IDA7XG5cbiAgRXZlbnQgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gRXZlbnQoKSB7XG4gICAgICB0aGlzLmlkID0gKytldmVudElkQ291bnRlcjtcbiAgICB9XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaXNFdmVudCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5pc0VuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaXNJbml0aWFsID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5pc05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmlzRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmhhc1ZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfTtcblxuICAgIEV2ZW50LnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBFdmVudC5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgRXZlbnQucHJvdG90eXBlLmxvZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50O1xuXG4gIH0pKCk7XG5cbiAgTmV4dCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKE5leHQsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gTmV4dCh2YWx1ZUYsIGVhZ2VyKSB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgTmV4dCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBOZXh0KHZhbHVlRiwgZWFnZXIpO1xuICAgICAgfVxuICAgICAgTmV4dC5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzKTtcbiAgICAgIGlmICghZWFnZXIgJiYgXy5pc0Z1bmN0aW9uKHZhbHVlRikgfHwgdmFsdWVGIGluc3RhbmNlb2YgTmV4dCkge1xuICAgICAgICB0aGlzLnZhbHVlRiA9IHZhbHVlRjtcbiAgICAgICAgdGhpcy52YWx1ZUludGVybmFsID0gdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy52YWx1ZUYgPSB2b2lkIDA7XG4gICAgICAgIHRoaXMudmFsdWVJbnRlcm5hbCA9IHZhbHVlRjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBOZXh0LnByb3RvdHlwZS5pc05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS5oYXNWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy52YWx1ZUYgaW5zdGFuY2VvZiBOZXh0KSB7XG4gICAgICAgIHRoaXMudmFsdWVJbnRlcm5hbCA9IHRoaXMudmFsdWVGLnZhbHVlKCk7XG4gICAgICAgIHRoaXMudmFsdWVGID0gdm9pZCAwO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLnZhbHVlRikge1xuICAgICAgICB0aGlzLnZhbHVlSW50ZXJuYWwgPSB0aGlzLnZhbHVlRigpO1xuICAgICAgICB0aGlzLnZhbHVlRiA9IHZvaWQgMDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnZhbHVlSW50ZXJuYWw7XG4gICAgfTtcblxuICAgIE5leHQucHJvdG90eXBlLmZtYXAgPSBmdW5jdGlvbihmKSB7XG4gICAgICB2YXIgZXZlbnQsIHZhbHVlO1xuICAgICAgaWYgKHRoaXMudmFsdWVJbnRlcm5hbCkge1xuICAgICAgICB2YWx1ZSA9IHRoaXMudmFsdWVJbnRlcm5hbDtcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGYodmFsdWUpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGV2ZW50ID0gdGhpcztcbiAgICAgICAgcmV0dXJuIHRoaXMuYXBwbHkoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgcmV0dXJuIGYoZXZlbnQudmFsdWUoKSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS5hcHBseSA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gbmV3IE5leHQodmFsdWUpO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gZih0aGlzLnZhbHVlKCkpO1xuICAgIH07XG5cbiAgICBOZXh0LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIF8udG9TdHJpbmcodGhpcy52YWx1ZSgpKTtcbiAgICB9O1xuXG4gICAgTmV4dC5wcm90b3R5cGUubG9nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcy52YWx1ZSgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gTmV4dDtcblxuICB9KShFdmVudCk7XG5cbiAgSW5pdGlhbCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKEluaXRpYWwsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gSW5pdGlhbCh2YWx1ZUYsIGVhZ2VyKSB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgSW5pdGlhbCkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBJbml0aWFsKHZhbHVlRiwgZWFnZXIpO1xuICAgICAgfVxuICAgICAgSW5pdGlhbC5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCB2YWx1ZUYsIGVhZ2VyKTtcbiAgICB9XG5cbiAgICBJbml0aWFsLnByb3RvdHlwZS5pc0luaXRpYWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBJbml0aWFsLnByb3RvdHlwZS5pc05leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgSW5pdGlhbC5wcm90b3R5cGUuYXBwbHkgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIG5ldyBJbml0aWFsKHZhbHVlKTtcbiAgICB9O1xuXG4gICAgSW5pdGlhbC5wcm90b3R5cGUudG9OZXh0ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IE5leHQodGhpcyk7XG4gICAgfTtcblxuICAgIHJldHVybiBJbml0aWFsO1xuXG4gIH0pKE5leHQpO1xuXG4gIEVuZCA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKEVuZCwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBFbmQoKSB7XG4gICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgRW5kKSkge1xuICAgICAgICByZXR1cm4gbmV3IEVuZCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIEVuZC5wcm90b3R5cGUuaXNFbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG5cbiAgICBFbmQucHJvdG90eXBlLmZtYXAgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBFbmQucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRW5kLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFwiPGVuZD5cIjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEVuZDtcblxuICB9KShFdmVudCk7XG5cbiAgRXJyb3IgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChFcnJvciwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBFcnJvcihlcnJvcikge1xuICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIEVycm9yKSkge1xuICAgICAgICByZXR1cm4gbmV3IEVycm9yKGVycm9yKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZXJyb3IgPSBlcnJvcjtcbiAgICB9XG5cbiAgICBFcnJvci5wcm90b3R5cGUuaXNFcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIEVycm9yLnByb3RvdHlwZS5mbWFwID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRXJyb3IucHJvdG90eXBlLmFwcGx5ID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgRXJyb3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gXCI8ZXJyb3I+IFwiICsgXy50b1N0cmluZyh0aGlzLmVycm9yKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEVycm9yO1xuXG4gIH0pKEV2ZW50KTtcblxuICBCYWNvbi5FdmVudCA9IEV2ZW50O1xuXG4gIEJhY29uLkluaXRpYWwgPSBJbml0aWFsO1xuXG4gIEJhY29uLk5leHQgPSBOZXh0O1xuXG4gIEJhY29uLkVuZCA9IEVuZDtcblxuICBCYWNvbi5FcnJvciA9IEVycm9yO1xuXG4gIGluaXRpYWxFdmVudCA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIG5ldyBJbml0aWFsKHZhbHVlLCB0cnVlKTtcbiAgfTtcblxuICBuZXh0RXZlbnQgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBuZXcgTmV4dCh2YWx1ZSwgdHJ1ZSk7XG4gIH07XG5cbiAgZW5kRXZlbnQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEVuZCgpO1xuICB9O1xuXG4gIHRvRXZlbnQgPSBmdW5jdGlvbih4KSB7XG4gICAgaWYgKHggaW5zdGFuY2VvZiBFdmVudCkge1xuICAgICAgcmV0dXJuIHg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBuZXh0RXZlbnQoeCk7XG4gICAgfVxuICB9O1xuXG4gIGlkQ291bnRlciA9IDA7XG5cbiAgcmVnaXN0ZXJPYnMgPSBmdW5jdGlvbigpIHt9O1xuXG4gIE9ic2VydmFibGUgPSAoZnVuY3Rpb24oKSB7XG4gICAgZnVuY3Rpb24gT2JzZXJ2YWJsZShkZXNjMSkge1xuICAgICAgdGhpcy5kZXNjID0gZGVzYzE7XG4gICAgICB0aGlzLmlkID0gKytpZENvdW50ZXI7XG4gICAgICB0aGlzLmluaXRpYWxEZXNjID0gdGhpcy5kZXNjO1xuICAgIH1cblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHJldHVybiBVcGRhdGVCYXJyaWVyLndyYXBwZWRTdWJzY3JpYmUodGhpcywgc2luayk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLnN1YnNjcmliZUludGVybmFsID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoc2luayk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm9uVmFsdWUgPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBmO1xuICAgICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgIHJldHVybiBmKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub25WYWx1ZXMgPSBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gdGhpcy5vblZhbHVlKGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUub25FcnJvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGY7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICByZXR1cm4gZihldmVudC5lcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5vbkVuZCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGY7XG4gICAgICBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXMuc3Vic2NyaWJlKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgcmV0dXJuIGYoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIE9ic2VydmFibGUucHJvdG90eXBlLm5hbWUgPSBmdW5jdGlvbihuYW1lKSB7XG4gICAgICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS53aXRoRGVzY3JpcHRpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZGVzYyA9IGRlc2NyaWJlLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuXG4gICAgT2JzZXJ2YWJsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmICh0aGlzLl9uYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9uYW1lO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzYy50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBPYnNlcnZhYmxlLnByb3RvdHlwZS5pbnRlcm5hbERlcHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmluaXRpYWxEZXNjLmRlcHMoKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIE9ic2VydmFibGU7XG5cbiAgfSkoKTtcblxuICBPYnNlcnZhYmxlLnByb3RvdHlwZS5hc3NpZ24gPSBPYnNlcnZhYmxlLnByb3RvdHlwZS5vblZhbHVlO1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLmZvckVhY2ggPSBPYnNlcnZhYmxlLnByb3RvdHlwZS5vblZhbHVlO1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLmluc3BlY3QgPSBPYnNlcnZhYmxlLnByb3RvdHlwZS50b1N0cmluZztcblxuICBCYWNvbi5PYnNlcnZhYmxlID0gT2JzZXJ2YWJsZTtcblxuICBDb21wb3NpdGVVbnN1YnNjcmliZSA9IChmdW5jdGlvbigpIHtcbiAgICBmdW5jdGlvbiBDb21wb3NpdGVVbnN1YnNjcmliZShzcykge1xuICAgICAgdmFyIGosIGxlbjEsIHM7XG4gICAgICBpZiAoc3MgPT0gbnVsbCkge1xuICAgICAgICBzcyA9IFtdO1xuICAgICAgfVxuICAgICAgdGhpcy51bnN1YnNjcmliZSA9IGJpbmQodGhpcy51bnN1YnNjcmliZSwgdGhpcyk7XG4gICAgICB0aGlzLnVuc3Vic2NyaWJlZCA9IGZhbHNlO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICB0aGlzLnN0YXJ0aW5nID0gW107XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gc3MubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHMgPSBzc1tqXTtcbiAgICAgICAgdGhpcy5hZGQocyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgICAgdmFyIGVuZGVkLCB1bnN1YiwgdW5zdWJNZTtcbiAgICAgIGlmICh0aGlzLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBlbmRlZCA9IGZhbHNlO1xuICAgICAgdW5zdWIgPSBub3A7XG4gICAgICB0aGlzLnN0YXJ0aW5nLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgIHVuc3ViTWUgPSAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmIChfdGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZW5kZWQgPSB0cnVlO1xuICAgICAgICAgIF90aGlzLnJlbW92ZSh1bnN1Yik7XG4gICAgICAgICAgcmV0dXJuIF8ucmVtb3ZlKHN1YnNjcmlwdGlvbiwgX3RoaXMuc3RhcnRpbmcpO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcyk7XG4gICAgICB1bnN1YiA9IHN1YnNjcmlwdGlvbih0aGlzLnVuc3Vic2NyaWJlLCB1bnN1Yk1lKTtcbiAgICAgIGlmICghKHRoaXMudW5zdWJzY3JpYmVkIHx8IGVuZGVkKSkge1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMucHVzaCh1bnN1Yik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bnN1YigpO1xuICAgICAgfVxuICAgICAgXy5yZW1vdmUoc3Vic2NyaXB0aW9uLCB0aGlzLnN0YXJ0aW5nKTtcbiAgICAgIHJldHVybiB1bnN1YjtcbiAgICB9O1xuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKHVuc3ViKSB7XG4gICAgICBpZiAodGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKChfLnJlbW92ZSh1bnN1YiwgdGhpcy5zdWJzY3JpcHRpb25zKSkgIT09IHZvaWQgMCkge1xuICAgICAgICByZXR1cm4gdW5zdWIoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLnVuc3Vic2NyaWJlID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaiwgbGVuMSwgcmVmLCBzO1xuICAgICAgaWYgKHRoaXMudW5zdWJzY3JpYmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMudW5zdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICAgIHJlZiA9IHRoaXMuc3Vic2NyaXB0aW9ucztcbiAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgIHMgPSByZWZbal07XG4gICAgICAgIHMoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgcmV0dXJuIHRoaXMuc3RhcnRpbmcgPSBbXTtcbiAgICB9O1xuXG4gICAgQ29tcG9zaXRlVW5zdWJzY3JpYmUucHJvdG90eXBlLmNvdW50ID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy51bnN1YnNjcmliZWQpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zLmxlbmd0aCArIHRoaXMuc3RhcnRpbmcubGVuZ3RoO1xuICAgIH07XG5cbiAgICBDb21wb3NpdGVVbnN1YnNjcmliZS5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLmNvdW50KCkgPT09IDA7XG4gICAgfTtcblxuICAgIHJldHVybiBDb21wb3NpdGVVbnN1YnNjcmliZTtcblxuICB9KSgpO1xuXG4gIEJhY29uLkNvbXBvc2l0ZVVuc3Vic2NyaWJlID0gQ29tcG9zaXRlVW5zdWJzY3JpYmU7XG5cbiAgRGlzcGF0Y2hlciA9IChmdW5jdGlvbigpIHtcbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoaW5nID0gZmFsc2U7XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5lbmRlZCA9IGZhbHNlO1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUucHJldkVycm9yID0gdm9pZCAwO1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUudW5zdWJTcmMgPSB2b2lkIDA7XG5cbiAgICBmdW5jdGlvbiBEaXNwYXRjaGVyKF9zdWJzY3JpYmUsIF9oYW5kbGVFdmVudCkge1xuICAgICAgdGhpcy5fc3Vic2NyaWJlID0gX3N1YnNjcmliZTtcbiAgICAgIHRoaXMuX2hhbmRsZUV2ZW50ID0gX2hhbmRsZUV2ZW50O1xuICAgICAgdGhpcy5zdWJzY3JpYmUgPSBiaW5kKHRoaXMuc3Vic2NyaWJlLCB0aGlzKTtcbiAgICAgIHRoaXMuaGFuZGxlRXZlbnQgPSBiaW5kKHRoaXMuaGFuZGxlRXZlbnQsIHRoaXMpO1xuICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICB0aGlzLnF1ZXVlID0gW107XG4gICAgfVxuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUuaGFzU3Vic2NyaWJlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLnN1YnNjcmlwdGlvbnMubGVuZ3RoID4gMDtcbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUucmVtb3ZlU3ViID0gZnVuY3Rpb24oc3Vic2NyaXB0aW9uKSB7XG4gICAgICByZXR1cm4gdGhpcy5zdWJzY3JpcHRpb25zID0gXy53aXRob3V0KHN1YnNjcmlwdGlvbiwgdGhpcy5zdWJzY3JpcHRpb25zKTtcbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUucHVzaCA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICB0aGlzLmVuZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBVcGRhdGVCYXJyaWVyLmluVHJhbnNhY3Rpb24oZXZlbnQsIHRoaXMsIHRoaXMucHVzaEl0LCBbZXZlbnRdKTtcbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUucHVzaFRvU3Vic2NyaXB0aW9ucyA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICB2YXIgZSwgaiwgbGVuMSwgcmVwbHksIHN1YiwgdG1wO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdG1wID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgICBmb3IgKGogPSAwLCBsZW4xID0gdG1wLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgICAgIHN1YiA9IHRtcFtqXTtcbiAgICAgICAgICByZXBseSA9IHN1Yi5zaW5rKGV2ZW50KTtcbiAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSB8fCBldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN1YihzdWIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICBlID0gX2Vycm9yO1xuICAgICAgICB0aGlzLnB1c2hpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBEaXNwYXRjaGVyLnByb3RvdHlwZS5wdXNoSXQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKCF0aGlzLnB1c2hpbmcpIHtcbiAgICAgICAgaWYgKGV2ZW50ID09PSB0aGlzLnByZXZFcnJvcikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgdGhpcy5wcmV2RXJyb3IgPSBldmVudDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnB1c2hpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnB1c2hUb1N1YnNjcmlwdGlvbnMoZXZlbnQpO1xuICAgICAgICB0aGlzLnB1c2hpbmcgPSBmYWxzZTtcbiAgICAgICAgd2hpbGUgKHRoaXMucXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgZXZlbnQgPSB0aGlzLnF1ZXVlLnNoaWZ0KCk7XG4gICAgICAgICAgdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5oYXNTdWJzY3JpYmVycygpKSB7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy51bnN1YnNjcmliZUZyb21Tb3VyY2UoKTtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnF1ZXVlLnB1c2goZXZlbnQpO1xuICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUuaGFuZGxlRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKHRoaXMuX2hhbmRsZUV2ZW50KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oYW5kbGVFdmVudChldmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUudW5zdWJzY3JpYmVGcm9tU291cmNlID0gZnVuY3Rpb24oKSB7XG4gICAgICBpZiAodGhpcy51bnN1YlNyYykge1xuICAgICAgICB0aGlzLnVuc3ViU3JjKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy51bnN1YlNyYyA9IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgRGlzcGF0Y2hlci5wcm90b3R5cGUuc3Vic2NyaWJlID0gZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIHN1YnNjcmlwdGlvbjtcbiAgICAgIGlmICh0aGlzLmVuZGVkKSB7XG4gICAgICAgIHNpbmsoZW5kRXZlbnQoKSk7XG4gICAgICAgIHJldHVybiBub3A7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhc3NlcnRGdW5jdGlvbihzaW5rKTtcbiAgICAgICAgc3Vic2NyaXB0aW9uID0ge1xuICAgICAgICAgIHNpbms6IHNpbmtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zLnB1c2goc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICB0aGlzLnVuc3ViU3JjID0gdGhpcy5fc3Vic2NyaWJlKHRoaXMuaGFuZGxlRXZlbnQpO1xuICAgICAgICAgIGFzc2VydEZ1bmN0aW9uKHRoaXMudW5zdWJTcmMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfdGhpcy5yZW1vdmVTdWIoc3Vic2NyaXB0aW9uKTtcbiAgICAgICAgICAgIGlmICghX3RoaXMuaGFzU3Vic2NyaWJlcnMoKSkge1xuICAgICAgICAgICAgICByZXR1cm4gX3RoaXMudW5zdWJzY3JpYmVGcm9tU291cmNlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgfSkodGhpcyk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHJldHVybiBEaXNwYXRjaGVyO1xuXG4gIH0pKCk7XG5cbiAgQmFjb24uRGlzcGF0Y2hlciA9IERpc3BhdGNoZXI7XG5cbiAgRXZlbnRTdHJlYW0gPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChFdmVudFN0cmVhbSwgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBFdmVudFN0cmVhbShkZXNjLCBzdWJzY3JpYmUsIGhhbmRsZXIpIHtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBFdmVudFN0cmVhbSkpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShkZXNjLCBzdWJzY3JpYmUsIGhhbmRsZXIpO1xuICAgICAgfVxuICAgICAgaWYgKF8uaXNGdW5jdGlvbihkZXNjKSkge1xuICAgICAgICBoYW5kbGVyID0gc3Vic2NyaWJlO1xuICAgICAgICBzdWJzY3JpYmUgPSBkZXNjO1xuICAgICAgICBkZXNjID0gRGVzYy5lbXB0eTtcbiAgICAgIH1cbiAgICAgIEV2ZW50U3RyZWFtLl9fc3VwZXJfXy5jb25zdHJ1Y3Rvci5jYWxsKHRoaXMsIGRlc2MpO1xuICAgICAgYXNzZXJ0RnVuY3Rpb24oc3Vic2NyaWJlKTtcbiAgICAgIHRoaXMuZGlzcGF0Y2hlciA9IG5ldyBEaXNwYXRjaGVyKHN1YnNjcmliZSwgaGFuZGxlcik7XG4gICAgICByZWdpc3Rlck9icyh0aGlzKTtcbiAgICB9XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUudG9Qcm9wZXJ0eSA9IGZ1bmN0aW9uKGluaXRWYWx1ZV8pIHtcbiAgICAgIHZhciBkaXNwLCBpbml0VmFsdWU7XG4gICAgICBpbml0VmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09PSAwID8gTm9uZSA6IHRvT3B0aW9uKGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gaW5pdFZhbHVlXztcbiAgICAgIH0pO1xuICAgICAgZGlzcCA9IHRoaXMuZGlzcGF0Y2hlcjtcbiAgICAgIHJldHVybiBuZXcgUHJvcGVydHkobmV3IEJhY29uLkRlc2ModGhpcywgXCJ0b1Byb3BlcnR5XCIsIFtpbml0VmFsdWVfXSksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgdmFyIGluaXRTZW50LCByZXBseSwgc2VuZEluaXQsIHVuc3ViO1xuICAgICAgICBpbml0U2VudCA9IGZhbHNlO1xuICAgICAgICB1bnN1YiA9IG5vcDtcbiAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICBzZW5kSW5pdCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICghaW5pdFNlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBpbml0VmFsdWUuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICBpbml0U2VudCA9IHRydWU7XG4gICAgICAgICAgICAgIHJlcGx5ID0gc2luayhuZXcgSW5pdGlhbCh2YWx1ZSkpO1xuICAgICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgIHVuc3ViKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHVuc3ViID0gbm9wO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHVuc3ViID0gZGlzcC5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgaWYgKGluaXRTZW50ICYmIGV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFldmVudC5pc0luaXRpYWwoKSkge1xuICAgICAgICAgICAgICAgIHNlbmRJbml0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaW5pdFNlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICBpbml0VmFsdWUgPSBuZXcgU29tZShldmVudCk7XG4gICAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICAgICAgcmVwbHkgPSBzZW5kSW5pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHNlbmRJbml0KCk7XG4gICAgICAgIHJldHVybiB1bnN1YjtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICBFdmVudFN0cmVhbS5wcm90b3R5cGUudG9FdmVudFN0cmVhbSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIEV2ZW50U3RyZWFtLnByb3RvdHlwZS53aXRoSGFuZGxlciA9IGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0obmV3IEJhY29uLkRlc2ModGhpcywgXCJ3aXRoSGFuZGxlclwiLCBbaGFuZGxlcl0pLCB0aGlzLmRpc3BhdGNoZXIuc3Vic2NyaWJlLCBoYW5kbGVyKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIEV2ZW50U3RyZWFtO1xuXG4gIH0pKE9ic2VydmFibGUpO1xuXG4gIEJhY29uLkV2ZW50U3RyZWFtID0gRXZlbnRTdHJlYW07XG5cbiAgQmFjb24ubmV2ZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKGRlc2NyaWJlKEJhY29uLCBcIm5ldmVyXCIpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgcmV0dXJuIG5vcDtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi53aGVuID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGYsIGksIGluZGV4LCBpeCwgaiwgaywgbGVuLCBsZW4xLCBsZW4yLCBuZWVkc0JhcnJpZXIsIHBhdCwgcGF0U291cmNlcywgcGF0cywgcGF0dGVybnMsIHJlZiwgcmVzdWx0U3RyZWFtLCBzLCBzb3VyY2VzLCB0cmlnZ2VyRm91bmQsIHVzYWdlO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICB9XG4gICAgbGVuID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICB1c2FnZSA9IFwid2hlbjogZXhwZWN0aW5nIGFyZ3VtZW50cyBpbiB0aGUgZm9ybSAoT2JzZXJ2YWJsZSssZnVuY3Rpb24pK1wiO1xuICAgIGFzc2VydCh1c2FnZSwgbGVuICUgMiA9PT0gMCk7XG4gICAgc291cmNlcyA9IFtdO1xuICAgIHBhdHMgPSBbXTtcbiAgICBpID0gMDtcbiAgICBwYXR0ZXJucyA9IFtdO1xuICAgIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgICBwYXR0ZXJuc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgIHBhdHRlcm5zW2kgKyAxXSA9IGFyZ3VtZW50c1tpICsgMV07XG4gICAgICBwYXRTb3VyY2VzID0gXy50b0FycmF5KGFyZ3VtZW50c1tpXSk7XG4gICAgICBmID0gY29uc3RhbnRUb0Z1bmN0aW9uKGFyZ3VtZW50c1tpICsgMV0pO1xuICAgICAgcGF0ID0ge1xuICAgICAgICBmOiBmLFxuICAgICAgICBpeHM6IFtdXG4gICAgICB9O1xuICAgICAgdHJpZ2dlckZvdW5kID0gZmFsc2U7XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gcGF0U291cmNlcy5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgcyA9IHBhdFNvdXJjZXNbal07XG4gICAgICAgIGluZGV4ID0gXy5pbmRleE9mKHNvdXJjZXMsIHMpO1xuICAgICAgICBpZiAoIXRyaWdnZXJGb3VuZCkge1xuICAgICAgICAgIHRyaWdnZXJGb3VuZCA9IFNvdXJjZS5pc1RyaWdnZXIocyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIHNvdXJjZXMucHVzaChzKTtcbiAgICAgICAgICBpbmRleCA9IHNvdXJjZXMubGVuZ3RoIC0gMTtcbiAgICAgICAgfVxuICAgICAgICByZWYgPSBwYXQuaXhzO1xuICAgICAgICBmb3IgKGsgPSAwLCBsZW4yID0gcmVmLmxlbmd0aDsgayA8IGxlbjI7IGsrKykge1xuICAgICAgICAgIGl4ID0gcmVmW2tdO1xuICAgICAgICAgIGlmIChpeC5pbmRleCA9PT0gaW5kZXgpIHtcbiAgICAgICAgICAgIGl4LmNvdW50Kys7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHBhdC5peHMucHVzaCh7XG4gICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgIGNvdW50OiAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgYXNzZXJ0KFwiQXQgbGVhc3Qgb25lIEV2ZW50U3RyZWFtIHJlcXVpcmVkXCIsIHRyaWdnZXJGb3VuZCB8fCAoIXBhdFNvdXJjZXMubGVuZ3RoKSk7XG4gICAgICBpZiAocGF0U291cmNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHBhdHMucHVzaChwYXQpO1xuICAgICAgfVxuICAgICAgaSA9IGkgKyAyO1xuICAgIH1cbiAgICBpZiAoIXNvdXJjZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICB9XG4gICAgc291cmNlcyA9IF8ubWFwKFNvdXJjZS5mcm9tT2JzZXJ2YWJsZSwgc291cmNlcyk7XG4gICAgbmVlZHNCYXJyaWVyID0gKF8uYW55KHNvdXJjZXMsIGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBzLmZsYXR0ZW47XG4gICAgfSkpICYmIChjb250YWluc0R1cGxpY2F0ZURlcHMoXy5tYXAoKGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBzLm9icztcbiAgICB9KSwgc291cmNlcykpKTtcbiAgICByZXR1cm4gcmVzdWx0U3RyZWFtID0gbmV3IEV2ZW50U3RyZWFtKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcIndoZW5cIiwgcGF0dGVybnMpLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgY2Fubm90TWF0Y2gsIGNhbm5vdFN5bmMsIGVuZHMsIG1hdGNoLCBub25GbGF0dGVuZWQsIHBhcnQsIHRyaWdnZXJzO1xuICAgICAgdHJpZ2dlcnMgPSBbXTtcbiAgICAgIGVuZHMgPSBmYWxzZTtcbiAgICAgIG1hdGNoID0gZnVuY3Rpb24ocCkge1xuICAgICAgICB2YXIgbCwgbGVuMywgcmVmMTtcbiAgICAgICAgcmVmMSA9IHAuaXhzO1xuICAgICAgICBmb3IgKGwgPSAwLCBsZW4zID0gcmVmMS5sZW5ndGg7IGwgPCBsZW4zOyBsKyspIHtcbiAgICAgICAgICBpID0gcmVmMVtsXTtcbiAgICAgICAgICBpZiAoIXNvdXJjZXNbaS5pbmRleF0uaGFzQXRMZWFzdChpLmNvdW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH07XG4gICAgICBjYW5ub3RTeW5jID0gZnVuY3Rpb24oc291cmNlKSB7XG4gICAgICAgIHJldHVybiAhc291cmNlLnN5bmMgfHwgc291cmNlLmVuZGVkO1xuICAgICAgfTtcbiAgICAgIGNhbm5vdE1hdGNoID0gZnVuY3Rpb24ocCkge1xuICAgICAgICB2YXIgbCwgbGVuMywgcmVmMTtcbiAgICAgICAgcmVmMSA9IHAuaXhzO1xuICAgICAgICBmb3IgKGwgPSAwLCBsZW4zID0gcmVmMS5sZW5ndGg7IGwgPCBsZW4zOyBsKyspIHtcbiAgICAgICAgICBpID0gcmVmMVtsXTtcbiAgICAgICAgICBpZiAoIXNvdXJjZXNbaS5pbmRleF0ubWF5SGF2ZShpLmNvdW50KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgbm9uRmxhdHRlbmVkID0gZnVuY3Rpb24odHJpZ2dlcikge1xuICAgICAgICByZXR1cm4gIXRyaWdnZXIuc291cmNlLmZsYXR0ZW47XG4gICAgICB9O1xuICAgICAgcGFydCA9IGZ1bmN0aW9uKHNvdXJjZSkge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24odW5zdWJBbGwpIHtcbiAgICAgICAgICB2YXIgZmx1c2gsIGZsdXNoTGF0ZXIsIGZsdXNoV2hpbGVUcmlnZ2VycztcbiAgICAgICAgICBmbHVzaExhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4gVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgocmVzdWx0U3RyZWFtLCBmbHVzaCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmbHVzaFdoaWxlVHJpZ2dlcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBldmVudHMsIGwsIGxlbjMsIHAsIHJlcGx5LCB0cmlnZ2VyO1xuICAgICAgICAgICAgaWYgKHRyaWdnZXJzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgICAgICAgICB0cmlnZ2VyID0gdHJpZ2dlcnMucG9wKCk7XG4gICAgICAgICAgICAgIGZvciAobCA9IDAsIGxlbjMgPSBwYXRzLmxlbmd0aDsgbCA8IGxlbjM7IGwrKykge1xuICAgICAgICAgICAgICAgIHAgPSBwYXRzW2xdO1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaChwKSkge1xuICAgICAgICAgICAgICAgICAgZXZlbnRzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuNCwgbSwgcmVmMSwgcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgcmVmMSA9IHAuaXhzO1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgICAgIGZvciAobSA9IDAsIGxlbjQgPSByZWYxLmxlbmd0aDsgbSA8IGxlbjQ7IG0rKykge1xuICAgICAgICAgICAgICAgICAgICAgIGkgPSByZWYxW21dO1xuICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdHMucHVzaChzb3VyY2VzW2kuaW5kZXhdLmNvbnN1bWUoKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICAgICAgICAgICAgICB9KSgpO1xuICAgICAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKHRyaWdnZXIuZS5hcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50LCB2YWx1ZXM7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVuNCwgbSwgcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgICAgICAgICAgZm9yIChtID0gMCwgbGVuNCA9IGV2ZW50cy5sZW5ndGg7IG0gPCBsZW40OyBtKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnRzW21dO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzdWx0cztcbiAgICAgICAgICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHAuZi5hcHBseShwLCB2YWx1ZXMpO1xuICAgICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgICAgICAgaWYgKHRyaWdnZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0cmlnZ2VycyA9IF8uZmlsdGVyKG5vbkZsYXR0ZW5lZCwgdHJpZ2dlcnMpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZsdXNoV2hpbGVUcmlnZ2VycygpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfTtcbiAgICAgICAgICBmbHVzaCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgcmVwbHkgPSBmbHVzaFdoaWxlVHJpZ2dlcnMoKTtcbiAgICAgICAgICAgIGlmIChlbmRzKSB7XG4gICAgICAgICAgICAgIGlmIChfLmFsbChzb3VyY2VzLCBjYW5ub3RTeW5jKSB8fCBfLmFsbChwYXRzLCBjYW5ub3RNYXRjaCkpIHtcbiAgICAgICAgICAgICAgICByZXBseSA9IEJhY29uLm5vTW9yZTtcbiAgICAgICAgICAgICAgICBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICB1bnN1YkFsbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgICAgIH07XG4gICAgICAgICAgcmV0dXJuIHNvdXJjZS5zdWJzY3JpYmUoZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgaWYgKGUuaXNFbmQoKSkge1xuICAgICAgICAgICAgICBlbmRzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgc291cmNlLm1hcmtFbmRlZCgpO1xuICAgICAgICAgICAgICBmbHVzaExhdGVyKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGUuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgIHJlcGx5ID0gc2luayhlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNvdXJjZS5wdXNoKGUpO1xuICAgICAgICAgICAgICBpZiAoc291cmNlLnN5bmMpIHtcbiAgICAgICAgICAgICAgICB0cmlnZ2Vycy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgIHNvdXJjZTogc291cmNlLFxuICAgICAgICAgICAgICAgICAgZTogZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChuZWVkc0JhcnJpZXIgfHwgVXBkYXRlQmFycmllci5oYXNXYWl0ZXJzKCkpIHtcbiAgICAgICAgICAgICAgICAgIGZsdXNoTGF0ZXIoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZmx1c2goKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgIHVuc3ViQWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVwbHkgfHwgQmFjb24ubW9yZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgICByZXR1cm4gbmV3IEJhY29uLkNvbXBvc2l0ZVVuc3Vic2NyaWJlKChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGwsIGxlbjMsIHJlc3VsdHM7XG4gICAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgICAgZm9yIChsID0gMCwgbGVuMyA9IHNvdXJjZXMubGVuZ3RoOyBsIDwgbGVuMzsgbCsrKSB7XG4gICAgICAgICAgcyA9IHNvdXJjZXNbbF07XG4gICAgICAgICAgcmVzdWx0cy5wdXNoKHBhcnQocykpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgfSkoKSkudW5zdWJzY3JpYmU7XG4gICAgfSk7XG4gIH07XG5cbiAgY29udGFpbnNEdXBsaWNhdGVEZXBzID0gZnVuY3Rpb24ob2JzZXJ2YWJsZXMsIHN0YXRlKSB7XG4gICAgdmFyIGNoZWNrT2JzZXJ2YWJsZTtcbiAgICBpZiAoc3RhdGUgPT0gbnVsbCkge1xuICAgICAgc3RhdGUgPSBbXTtcbiAgICB9XG4gICAgY2hlY2tPYnNlcnZhYmxlID0gZnVuY3Rpb24ob2JzKSB7XG4gICAgICB2YXIgZGVwcztcbiAgICAgIGlmIChfLmNvbnRhaW5zKHN0YXRlLCBvYnMpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVwcyA9IG9icy5pbnRlcm5hbERlcHMoKTtcbiAgICAgICAgaWYgKGRlcHMubGVuZ3RoKSB7XG4gICAgICAgICAgc3RhdGUucHVzaChvYnMpO1xuICAgICAgICAgIHJldHVybiBfLmFueShkZXBzLCBjaGVja09ic2VydmFibGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN0YXRlLnB1c2gob2JzKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBfLmFueShvYnNlcnZhYmxlcywgY2hlY2tPYnNlcnZhYmxlKTtcbiAgfTtcblxuICBjb25zdGFudFRvRnVuY3Rpb24gPSBmdW5jdGlvbihmKSB7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihmKSkge1xuICAgICAgcmV0dXJuIGY7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBfLmFsd2F5cyhmKTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24uZ3JvdXBTaW11bHRhbmVvdXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcywgc291cmNlcywgc3RyZWFtcztcbiAgICBzdHJlYW1zID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgaWYgKHN0cmVhbXMubGVuZ3RoID09PSAxICYmIGlzQXJyYXkoc3RyZWFtc1swXSkpIHtcbiAgICAgIHN0cmVhbXMgPSBzdHJlYW1zWzBdO1xuICAgIH1cbiAgICBzb3VyY2VzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGosIGxlbjEsIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gc3RyZWFtcy5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgcyA9IHN0cmVhbXNbal07XG4gICAgICAgIHJlc3VsdHMucHVzaChuZXcgQnVmZmVyaW5nU291cmNlKHMpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImdyb3VwU2ltdWx0YW5lb3VzXCIsIHN0cmVhbXMpLCBCYWNvbi53aGVuKHNvdXJjZXMsIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciB4cztcbiAgICAgIHhzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICByZXR1cm4geHM7XG4gICAgfSkpKTtcbiAgfTtcblxuICBQcm9wZXJ0eURpc3BhdGNoZXIgPSAoZnVuY3Rpb24oc3VwZXJDbGFzcykge1xuICAgIGV4dGVuZChQcm9wZXJ0eURpc3BhdGNoZXIsIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gUHJvcGVydHlEaXNwYXRjaGVyKHByb3BlcnR5MSwgc3Vic2NyaWJlLCBoYW5kbGVFdmVudCkge1xuICAgICAgdGhpcy5wcm9wZXJ0eSA9IHByb3BlcnR5MTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlID0gYmluZCh0aGlzLnN1YnNjcmliZSwgdGhpcyk7XG4gICAgICBQcm9wZXJ0eURpc3BhdGNoZXIuX19zdXBlcl9fLmNvbnN0cnVjdG9yLmNhbGwodGhpcywgc3Vic2NyaWJlLCBoYW5kbGVFdmVudCk7XG4gICAgICB0aGlzLmN1cnJlbnQgPSBOb25lO1xuICAgICAgdGhpcy5jdXJyZW50VmFsdWVSb290SWQgPSB2b2lkIDA7XG4gICAgICB0aGlzLnByb3BlcnR5RW5kZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBQcm9wZXJ0eURpc3BhdGNoZXIucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgdGhpcy5wcm9wZXJ0eUVuZGVkID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IG5ldyBTb21lKGV2ZW50KTtcbiAgICAgICAgdGhpcy5jdXJyZW50VmFsdWVSb290SWQgPSBVcGRhdGVCYXJyaWVyLmN1cnJlbnRFdmVudElkKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gUHJvcGVydHlEaXNwYXRjaGVyLl9fc3VwZXJfXy5wdXNoLmNhbGwodGhpcywgZXZlbnQpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eURpc3BhdGNoZXIucHJvdG90eXBlLm1heWJlU3ViU291cmNlID0gZnVuY3Rpb24oc2luaywgcmVwbHkpIHtcbiAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgIHJldHVybiBub3A7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMucHJvcGVydHlFbmRlZCkge1xuICAgICAgICBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgICByZXR1cm4gbm9wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIERpc3BhdGNoZXIucHJvdG90eXBlLnN1YnNjcmliZS5jYWxsKHRoaXMsIHNpbmspO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBQcm9wZXJ0eURpc3BhdGNoZXIucHJvdG90eXBlLnN1YnNjcmliZSA9IGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciBkaXNwYXRjaGluZ0lkLCBpbml0U2VudCwgcmVwbHksIHZhbElkO1xuICAgICAgaW5pdFNlbnQgPSBmYWxzZTtcbiAgICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICAgIGlmICh0aGlzLmN1cnJlbnQuaXNEZWZpbmVkICYmICh0aGlzLmhhc1N1YnNjcmliZXJzKCkgfHwgdGhpcy5wcm9wZXJ0eUVuZGVkKSkge1xuICAgICAgICBkaXNwYXRjaGluZ0lkID0gVXBkYXRlQmFycmllci5jdXJyZW50RXZlbnRJZCgpO1xuICAgICAgICB2YWxJZCA9IHRoaXMuY3VycmVudFZhbHVlUm9vdElkO1xuICAgICAgICBpZiAoIXRoaXMucHJvcGVydHlFbmRlZCAmJiB2YWxJZCAmJiBkaXNwYXRjaGluZ0lkICYmIGRpc3BhdGNoaW5nSWQgIT09IHZhbElkKSB7XG4gICAgICAgICAgVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgodGhpcy5wcm9wZXJ0eSwgKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIGlmIChfdGhpcy5jdXJyZW50VmFsdWVSb290SWQgPT09IHZhbElkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoaW5pdGlhbEV2ZW50KF90aGlzLmN1cnJlbnQuZ2V0KCkudmFsdWUoKSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0pKHRoaXMpKTtcbiAgICAgICAgICByZXR1cm4gdGhpcy5tYXliZVN1YlNvdXJjZShzaW5rLCByZXBseSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgVXBkYXRlQmFycmllci5pblRyYW5zYWN0aW9uKHZvaWQgMCwgdGhpcywgKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGx5ID0gc2luayhpbml0aWFsRXZlbnQodGhpcy5jdXJyZW50LmdldCgpLnZhbHVlKCkpKTtcbiAgICAgICAgICB9KSwgW10pO1xuICAgICAgICAgIHJldHVybiB0aGlzLm1heWJlU3ViU291cmNlKHNpbmssIHJlcGx5KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMubWF5YmVTdWJTb3VyY2Uoc2luaywgcmVwbHkpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICByZXR1cm4gUHJvcGVydHlEaXNwYXRjaGVyO1xuXG4gIH0pKERpc3BhdGNoZXIpO1xuXG4gIFByb3BlcnR5ID0gKGZ1bmN0aW9uKHN1cGVyQ2xhc3MpIHtcbiAgICBleHRlbmQoUHJvcGVydHksIHN1cGVyQ2xhc3MpO1xuXG4gICAgZnVuY3Rpb24gUHJvcGVydHkoZGVzYywgc3Vic2NyaWJlLCBoYW5kbGVyKSB7XG4gICAgICBQcm9wZXJ0eS5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBkZXNjKTtcbiAgICAgIGFzc2VydEZ1bmN0aW9uKHN1YnNjcmliZSk7XG4gICAgICB0aGlzLmRpc3BhdGNoZXIgPSBuZXcgUHJvcGVydHlEaXNwYXRjaGVyKHRoaXMsIHN1YnNjcmliZSwgaGFuZGxlcik7XG4gICAgICByZWdpc3Rlck9icyh0aGlzKTtcbiAgICB9XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUuY2hhbmdlcyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShuZXcgQmFjb24uRGVzYyh0aGlzLCBcImNoYW5nZXNcIiwgW10pLCAoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIGlmICghZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNpbmsoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgfSkodGhpcykpO1xuICAgIH07XG5cbiAgICBQcm9wZXJ0eS5wcm90b3R5cGUud2l0aEhhbmRsZXIgPSBmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICByZXR1cm4gbmV3IFByb3BlcnR5KG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwid2l0aEhhbmRsZXJcIiwgW2hhbmRsZXJdKSwgdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZSwgaGFuZGxlcik7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS50b1Byb3BlcnR5ID0gZnVuY3Rpb24oKSB7XG4gICAgICBhc3NlcnROb0FyZ3VtZW50cyhhcmd1bWVudHMpO1xuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcblxuICAgIFByb3BlcnR5LnByb3RvdHlwZS50b0V2ZW50U3RyZWFtID0gZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwidG9FdmVudFN0cmVhbVwiLCBbXSksIChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oc2luaykge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnQudG9OZXh0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKSk7XG4gICAgfTtcblxuICAgIHJldHVybiBQcm9wZXJ0eTtcblxuICB9KShPYnNlcnZhYmxlKTtcblxuICBCYWNvbi5Qcm9wZXJ0eSA9IFByb3BlcnR5O1xuXG4gIEJhY29uLmNvbnN0YW50ID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IFByb3BlcnR5KG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImNvbnN0YW50XCIsIFt2YWx1ZV0pLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICBzaW5rKGluaXRpYWxFdmVudCh2YWx1ZSkpO1xuICAgICAgc2luayhlbmRFdmVudCgpKTtcbiAgICAgIHJldHVybiBub3A7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24uZnJvbUJpbmRlciA9IGZ1bmN0aW9uKGJpbmRlciwgZXZlbnRUcmFuc2Zvcm1lcikge1xuICAgIGlmIChldmVudFRyYW5zZm9ybWVyID09IG51bGwpIHtcbiAgICAgIGV2ZW50VHJhbnNmb3JtZXIgPSBfLmlkO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImZyb21CaW5kZXJcIiwgW2JpbmRlciwgZXZlbnRUcmFuc2Zvcm1lcl0pLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgc2hvdWxkVW5iaW5kLCB1bmJpbmQsIHVuYmluZGVyLCB1bmJvdW5kO1xuICAgICAgdW5ib3VuZCA9IGZhbHNlO1xuICAgICAgc2hvdWxkVW5iaW5kID0gZmFsc2U7XG4gICAgICB1bmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCF1bmJvdW5kKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB1bmJpbmRlciAhPT0gXCJ1bmRlZmluZWRcIiAmJiB1bmJpbmRlciAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdW5iaW5kZXIoKTtcbiAgICAgICAgICAgIHJldHVybiB1bmJvdW5kID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHNob3VsZFVuYmluZCA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgdW5iaW5kZXIgPSBiaW5kZXIoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzLCBldmVudCwgaiwgbGVuMSwgcmVwbHksIHZhbHVlO1xuICAgICAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgICAgIHZhbHVlID0gZXZlbnRUcmFuc2Zvcm1lci5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgaWYgKCEoaXNBcnJheSh2YWx1ZSkgJiYgXy5sYXN0KHZhbHVlKSBpbnN0YW5jZW9mIEV2ZW50KSkge1xuICAgICAgICAgIHZhbHVlID0gW3ZhbHVlXTtcbiAgICAgICAgfVxuICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSB2YWx1ZS5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgICBldmVudCA9IHZhbHVlW2pdO1xuICAgICAgICAgIHJlcGx5ID0gc2luayhldmVudCA9IHRvRXZlbnQoZXZlbnQpKTtcbiAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSB8fCBldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICB1bmJpbmQoKTtcbiAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcGx5O1xuICAgICAgfSk7XG4gICAgICBpZiAoc2hvdWxkVW5iaW5kKSB7XG4gICAgICAgIHVuYmluZCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHVuYmluZDtcbiAgICB9KTtcbiAgfTtcblxuICBldmVudE1ldGhvZHMgPSBbW1wiYWRkRXZlbnRMaXN0ZW5lclwiLCBcInJlbW92ZUV2ZW50TGlzdGVuZXJcIl0sIFtcImFkZExpc3RlbmVyXCIsIFwicmVtb3ZlTGlzdGVuZXJcIl0sIFtcIm9uXCIsIFwib2ZmXCJdLCBbXCJiaW5kXCIsIFwidW5iaW5kXCJdXTtcblxuICBmaW5kSGFuZGxlck1ldGhvZHMgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgICB2YXIgaiwgbGVuMSwgbWV0aG9kUGFpciwgcGFpcjtcbiAgICBmb3IgKGogPSAwLCBsZW4xID0gZXZlbnRNZXRob2RzLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgcGFpciA9IGV2ZW50TWV0aG9kc1tqXTtcbiAgICAgIG1ldGhvZFBhaXIgPSBbdGFyZ2V0W3BhaXJbMF1dLCB0YXJnZXRbcGFpclsxXV1dO1xuICAgICAgaWYgKG1ldGhvZFBhaXJbMF0gJiYgbWV0aG9kUGFpclsxXSkge1xuICAgICAgICByZXR1cm4gbWV0aG9kUGFpcjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiTm8gc3VpdGFibGUgZXZlbnQgbWV0aG9kcyBpbiBcIiArIHRhcmdldCk7XG4gIH07XG5cbiAgQmFjb24uZnJvbUV2ZW50VGFyZ2V0ID0gZnVuY3Rpb24odGFyZ2V0LCBldmVudE5hbWUsIGV2ZW50VHJhbnNmb3JtZXIpIHtcbiAgICB2YXIgcmVmLCBzdWIsIHVuc3ViO1xuICAgIHJlZiA9IGZpbmRIYW5kbGVyTWV0aG9kcyh0YXJnZXQpLCBzdWIgPSByZWZbMF0sIHVuc3ViID0gcmVmWzFdO1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJmcm9tRXZlbnRcIiwgW3RhcmdldCwgZXZlbnROYW1lXSksIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgc3ViLmNhbGwodGFyZ2V0LCBldmVudE5hbWUsIGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gdW5zdWIuY2FsbCh0YXJnZXQsIGV2ZW50TmFtZSwgaGFuZGxlcik7XG4gICAgICB9O1xuICAgIH0sIGV2ZW50VHJhbnNmb3JtZXIpKTtcbiAgfTtcblxuICBCYWNvbi5mcm9tRXZlbnQgPSBCYWNvbi5mcm9tRXZlbnRUYXJnZXQ7XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUubWFwID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIHA7XG4gICAgcCA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgcCwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwibWFwXCIsIFtmXSksIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudC5mbWFwKGYpKTtcbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfTtcblxuICBhcmd1bWVudHNUb09ic2VydmFibGVzID0gZnVuY3Rpb24oYXJncykge1xuICAgIGlmIChpc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICByZXR1cm4gYXJnc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICAgIH1cbiAgfTtcblxuICBhcmd1bWVudHNUb09ic2VydmFibGVzQW5kRnVuY3Rpb24gPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihhcmdzWzBdKSkge1xuICAgICAgcmV0dXJuIFthcmd1bWVudHNUb09ic2VydmFibGVzKEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MsIDEpKSwgYXJnc1swXV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBbYXJndW1lbnRzVG9PYnNlcnZhYmxlcyhBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmdzLCAwLCBhcmdzLmxlbmd0aCAtIDEpKSwgXy5sYXN0KGFyZ3MpXTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24uY29tYmluZUFzQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgaW5kZXgsIGosIGxlbjEsIHMsIHNvdXJjZXMsIHN0cmVhbSwgc3RyZWFtcztcbiAgICBzdHJlYW1zID0gYXJndW1lbnRzVG9PYnNlcnZhYmxlcyhhcmd1bWVudHMpO1xuICAgIGZvciAoaW5kZXggPSBqID0gMCwgbGVuMSA9IHN0cmVhbXMubGVuZ3RoOyBqIDwgbGVuMTsgaW5kZXggPSArK2opIHtcbiAgICAgIHN0cmVhbSA9IHN0cmVhbXNbaW5kZXhdO1xuICAgICAgaWYgKCEoaXNPYnNlcnZhYmxlKHN0cmVhbSkpKSB7XG4gICAgICAgIHN0cmVhbXNbaW5kZXhdID0gQmFjb24uY29uc3RhbnQoc3RyZWFtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN0cmVhbXMubGVuZ3RoKSB7XG4gICAgICBzb3VyY2VzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaywgbGVuMiwgcmVzdWx0cztcbiAgICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgICBmb3IgKGsgPSAwLCBsZW4yID0gc3RyZWFtcy5sZW5ndGg7IGsgPCBsZW4yOyBrKyspIHtcbiAgICAgICAgICBzID0gc3RyZWFtc1trXTtcbiAgICAgICAgICByZXN1bHRzLnB1c2gobmV3IFNvdXJjZShzLCB0cnVlKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgICB9KSgpO1xuICAgICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImNvbWJpbmVBc0FycmF5XCIsIHN0cmVhbXMpLCBCYWNvbi53aGVuKHNvdXJjZXMsIChmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHhzO1xuICAgICAgICB4cyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgICByZXR1cm4geHM7XG4gICAgICB9KSkudG9Qcm9wZXJ0eSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIEJhY29uLmNvbnN0YW50KFtdKTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24ub25WYWx1ZXMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZiwgaiwgc3RyZWFtcztcbiAgICBzdHJlYW1zID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDAsIGogPSBhcmd1bWVudHMubGVuZ3RoIC0gMSkgOiAoaiA9IDAsIFtdKSwgZiA9IGFyZ3VtZW50c1tqKytdO1xuICAgIHJldHVybiBCYWNvbi5jb21iaW5lQXNBcnJheShzdHJlYW1zKS5vblZhbHVlcyhmKTtcbiAgfTtcblxuICBCYWNvbi5jb21iaW5lV2l0aCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmLCByZWYsIHN0cmVhbXM7XG4gICAgcmVmID0gYXJndW1lbnRzVG9PYnNlcnZhYmxlc0FuZEZ1bmN0aW9uKGFyZ3VtZW50cyksIHN0cmVhbXMgPSByZWZbMF0sIGYgPSByZWZbMV07XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImNvbWJpbmVXaXRoXCIsIFtmXS5jb25jYXQoc2xpY2UuY2FsbChzdHJlYW1zKSkpLCBCYWNvbi5jb21iaW5lQXNBcnJheShzdHJlYW1zKS5tYXAoZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICByZXR1cm4gZi5hcHBseShudWxsLCB2YWx1ZXMpO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5jb21iaW5lID0gZnVuY3Rpb24ob3RoZXIsIGYpIHtcbiAgICB2YXIgY29tYmluYXRvcjtcbiAgICBjb21iaW5hdG9yID0gdG9Db21iaW5hdG9yKGYpO1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImNvbWJpbmVcIiwgW290aGVyLCBmXSksIEJhY29uLmNvbWJpbmVBc0FycmF5KHRoaXMsIG90aGVyKS5tYXAoZnVuY3Rpb24odmFsdWVzKSB7XG4gICAgICByZXR1cm4gY29tYmluYXRvcih2YWx1ZXNbMF0sIHZhbHVlc1sxXSk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLndpdGhTdGF0ZU1hY2hpbmUgPSBmdW5jdGlvbihpbml0U3RhdGUsIGYpIHtcbiAgICB2YXIgc3RhdGU7XG4gICAgc3RhdGUgPSBpbml0U3RhdGU7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwid2l0aFN0YXRlTWFjaGluZVwiLCBbaW5pdFN0YXRlLCBmXSksIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHZhciBmcm9tRiwgaiwgbGVuMSwgbmV3U3RhdGUsIG91dHB1dCwgb3V0cHV0cywgcmVwbHk7XG4gICAgICBmcm9tRiA9IGYoc3RhdGUsIGV2ZW50KTtcbiAgICAgIG5ld1N0YXRlID0gZnJvbUZbMF0sIG91dHB1dHMgPSBmcm9tRlsxXTtcbiAgICAgIHN0YXRlID0gbmV3U3RhdGU7XG4gICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICBmb3IgKGogPSAwLCBsZW4xID0gb3V0cHV0cy5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgb3V0cHV0ID0gb3V0cHV0c1tqXTtcbiAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2gob3V0cHV0KTtcbiAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXBseTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcER1cGxpY2F0ZXMgPSBmdW5jdGlvbihpc0VxdWFsKSB7XG4gICAgaWYgKGlzRXF1YWwgPT0gbnVsbCkge1xuICAgICAgaXNFcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJza2lwRHVwbGljYXRlc1wiLCBbXSksIHRoaXMud2l0aFN0YXRlTWFjaGluZShOb25lLCBmdW5jdGlvbihwcmV2LCBldmVudCkge1xuICAgICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHJldHVybiBbcHJldiwgW2V2ZW50XV07XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LmlzSW5pdGlhbCgpIHx8IHByZXYgPT09IE5vbmUgfHwgIWlzRXF1YWwocHJldi5nZXQoKSwgZXZlbnQudmFsdWUoKSkpIHtcbiAgICAgICAgcmV0dXJuIFtuZXcgU29tZShldmVudC52YWx1ZSgpKSwgW2V2ZW50XV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW3ByZXYsIFtdXTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuYXdhaXRpbmcgPSBmdW5jdGlvbihvdGhlcikge1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImF3YWl0aW5nXCIsIFtvdGhlcl0pLCBCYWNvbi5ncm91cFNpbXVsdGFuZW91cyh0aGlzLCBvdGhlcikubWFwKGZ1bmN0aW9uKGFyZykge1xuICAgICAgdmFyIG15VmFsdWVzLCBvdGhlclZhbHVlcztcbiAgICAgIG15VmFsdWVzID0gYXJnWzBdLCBvdGhlclZhbHVlcyA9IGFyZ1sxXTtcbiAgICAgIHJldHVybiBvdGhlclZhbHVlcy5sZW5ndGggPT09IDA7XG4gICAgfSkudG9Qcm9wZXJ0eShmYWxzZSkuc2tpcER1cGxpY2F0ZXMoKSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUubm90ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwibm90XCIsIFtdKSwgdGhpcy5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuICF4O1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5Qcm9wZXJ0eS5wcm90b3R5cGUuYW5kID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJhbmRcIiwgW290aGVyXSksIHRoaXMuY29tYmluZShvdGhlciwgZnVuY3Rpb24oeCwgeSkge1xuICAgICAgcmV0dXJuIHggJiYgeTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uUHJvcGVydHkucHJvdG90eXBlLm9yID0gZnVuY3Rpb24ob3RoZXIpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJvclwiLCBbb3RoZXJdKSwgdGhpcy5jb21iaW5lKG90aGVyLCBmdW5jdGlvbih4LCB5KSB7XG4gICAgICByZXR1cm4geCB8fCB5O1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5zY2hlZHVsZXIgPSB7XG4gICAgc2V0VGltZW91dDogZnVuY3Rpb24oZiwgZCkge1xuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZiwgZCk7XG4gICAgfSxcbiAgICBzZXRJbnRlcnZhbDogZnVuY3Rpb24oZiwgaSkge1xuICAgICAgcmV0dXJuIHNldEludGVydmFsKGYsIGkpO1xuICAgIH0sXG4gICAgY2xlYXJJbnRlcnZhbDogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHJldHVybiBjbGVhckludGVydmFsKGlkKTtcbiAgICB9LFxuICAgIGNsZWFyVGltZW91dDogZnVuY3Rpb24oaWQpIHtcbiAgICAgIHJldHVybiBjbGVhclRpbWVvdXQoaWQpO1xuICAgIH0sXG4gICAgbm93OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmJ1ZmZlcldpdGhUaW1lID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJidWZmZXJXaXRoVGltZVwiLCBbZGVsYXldKSwgdGhpcy5idWZmZXJXaXRoVGltZU9yQ291bnQoZGVsYXksIE51bWJlci5NQVhfVkFMVUUpKTtcbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuYnVmZmVyV2l0aENvdW50ID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJidWZmZXJXaXRoQ291bnRcIiwgW2NvdW50XSksIHRoaXMuYnVmZmVyV2l0aFRpbWVPckNvdW50KHZvaWQgMCwgY291bnQpKTtcbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuYnVmZmVyV2l0aFRpbWVPckNvdW50ID0gZnVuY3Rpb24oZGVsYXksIGNvdW50KSB7XG4gICAgdmFyIGZsdXNoT3JTY2hlZHVsZTtcbiAgICBmbHVzaE9yU2NoZWR1bGUgPSBmdW5jdGlvbihidWZmZXIpIHtcbiAgICAgIGlmIChidWZmZXIudmFsdWVzLmxlbmd0aCA9PT0gY291bnQpIHtcbiAgICAgICAgcmV0dXJuIGJ1ZmZlci5mbHVzaCgpO1xuICAgICAgfSBlbHNlIGlmIChkZWxheSAhPT0gdm9pZCAwKSB7XG4gICAgICAgIHJldHVybiBidWZmZXIuc2NoZWR1bGUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImJ1ZmZlcldpdGhUaW1lT3JDb3VudFwiLCBbZGVsYXksIGNvdW50XSksIHRoaXMuYnVmZmVyKGRlbGF5LCBmbHVzaE9yU2NoZWR1bGUsIGZsdXNoT3JTY2hlZHVsZSkpO1xuICB9O1xuXG4gIEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5idWZmZXIgPSBmdW5jdGlvbihkZWxheSwgb25JbnB1dCwgb25GbHVzaCkge1xuICAgIHZhciBidWZmZXIsIGRlbGF5TXMsIHJlcGx5O1xuICAgIGlmIChvbklucHV0ID09IG51bGwpIHtcbiAgICAgIG9uSW5wdXQgPSBub3A7XG4gICAgfVxuICAgIGlmIChvbkZsdXNoID09IG51bGwpIHtcbiAgICAgIG9uRmx1c2ggPSBub3A7XG4gICAgfVxuICAgIGJ1ZmZlciA9IHtcbiAgICAgIHNjaGVkdWxlZDogbnVsbCxcbiAgICAgIGVuZDogdm9pZCAwLFxuICAgICAgdmFsdWVzOiBbXSxcbiAgICAgIGZsdXNoOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHJlcGx5LCB2YWx1ZXNUb1B1c2g7XG4gICAgICAgIGlmICh0aGlzLnNjaGVkdWxlZCkge1xuICAgICAgICAgIEJhY29uLnNjaGVkdWxlci5jbGVhclRpbWVvdXQodGhpcy5zY2hlZHVsZWQpO1xuICAgICAgICAgIHRoaXMuc2NoZWR1bGVkID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy52YWx1ZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHZhbHVlc1RvUHVzaCA9IHRoaXMudmFsdWVzO1xuICAgICAgICAgIHRoaXMudmFsdWVzID0gW107XG4gICAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2gobmV4dEV2ZW50KHZhbHVlc1RvUHVzaCkpO1xuICAgICAgICAgIGlmICh0aGlzLmVuZCAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKHRoaXMuZW5kKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgIHJldHVybiBvbkZsdXNoKHRoaXMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAodGhpcy5lbmQgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaCh0aGlzLmVuZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2NoZWR1bGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRoaXMuc2NoZWR1bGVkKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuc2NoZWR1bGVkID0gZGVsYXkoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHJldHVybiBfdGhpcy5mbHVzaCgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KSh0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHJlcGx5ID0gQmFjb24ubW9yZTtcbiAgICBpZiAoIV8uaXNGdW5jdGlvbihkZWxheSkpIHtcbiAgICAgIGRlbGF5TXMgPSBkZWxheTtcbiAgICAgIGRlbGF5ID0gZnVuY3Rpb24oZikge1xuICAgICAgICByZXR1cm4gQmFjb24uc2NoZWR1bGVyLnNldFRpbWVvdXQoZiwgZGVsYXlNcyk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJidWZmZXJcIiwgW10pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBidWZmZXIucHVzaCA9IChmdW5jdGlvbihfdGhpcykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMucHVzaChldmVudCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgcmVwbHkgPSB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgIGJ1ZmZlci5lbmQgPSBldmVudDtcbiAgICAgICAgaWYgKCFidWZmZXIuc2NoZWR1bGVkKSB7XG4gICAgICAgICAgYnVmZmVyLmZsdXNoKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1ZmZlci52YWx1ZXMucHVzaChldmVudC52YWx1ZSgpKTtcbiAgICAgICAgb25JbnB1dChidWZmZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlcGx5O1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5maWx0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZjtcbiAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgYXNzZXJ0T2JzZXJ2YWJsZUlzUHJvcGVydHkoZik7XG4gICAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBmLCBhcmdzLCBmdW5jdGlvbihmKSB7XG4gICAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJmaWx0ZXJcIiwgW2ZdKSwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuZmlsdGVyKGYpKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgIH1cbiAgICAgIH0pKTtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5vbmNlID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKG5ldyBEZXNjKEJhY29uLCBcIm9uY2VcIiwgW3ZhbHVlXSksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHNpbmsodG9FdmVudCh2YWx1ZSkpO1xuICAgICAgc2luayhlbmRFdmVudCgpKTtcbiAgICAgIHJldHVybiBub3A7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmNvbmNhdCA9IGZ1bmN0aW9uKHJpZ2h0KSB7XG4gICAgdmFyIGxlZnQ7XG4gICAgbGVmdCA9IHRoaXM7XG4gICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShuZXcgQmFjb24uRGVzYyhsZWZ0LCBcImNvbmNhdFwiLCBbcmlnaHRdKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIHVuc3ViTGVmdCwgdW5zdWJSaWdodDtcbiAgICAgIHVuc3ViUmlnaHQgPSBub3A7XG4gICAgICB1bnN1YkxlZnQgPSBsZWZ0LmRpc3BhdGNoZXIuc3Vic2NyaWJlKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgaWYgKGUuaXNFbmQoKSkge1xuICAgICAgICAgIHJldHVybiB1bnN1YlJpZ2h0ID0gcmlnaHQuZGlzcGF0Y2hlci5zdWJzY3JpYmUoc2luayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIHNpbmsoZSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB1bnN1YkxlZnQoKTtcbiAgICAgICAgcmV0dXJuIHVuc3ViUmlnaHQoKTtcbiAgICAgIH07XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmbGF0TWFwXyh0aGlzLCBtYWtlU3Bhd25lcihhcmd1bWVudHMpKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwRmlyc3QgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZmxhdE1hcF8odGhpcywgbWFrZVNwYXduZXIoYXJndW1lbnRzKSwgdHJ1ZSk7XG4gIH07XG5cbiAgZmxhdE1hcF8gPSBmdW5jdGlvbihyb290LCBmLCBmaXJzdE9ubHksIGxpbWl0KSB7XG4gICAgdmFyIGNoaWxkRGVwcywgcmVzdWx0LCByb290RGVwO1xuICAgIHJvb3REZXAgPSBbcm9vdF07XG4gICAgY2hpbGREZXBzID0gW107XG4gICAgcmVzdWx0ID0gbmV3IEV2ZW50U3RyZWFtKG5ldyBCYWNvbi5EZXNjKHJvb3QsIFwiZmxhdE1hcFwiICsgKGZpcnN0T25seSA/IFwiRmlyc3RcIiA6IFwiXCIpLCBbZl0pLCBmdW5jdGlvbihzaW5rKSB7XG4gICAgICB2YXIgY2hlY2tFbmQsIGNoZWNrUXVldWUsIGNvbXBvc2l0ZSwgcXVldWUsIHNwYXduO1xuICAgICAgY29tcG9zaXRlID0gbmV3IENvbXBvc2l0ZVVuc3Vic2NyaWJlKCk7XG4gICAgICBxdWV1ZSA9IFtdO1xuICAgICAgc3Bhd24gPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgY2hpbGQ7XG4gICAgICAgIGNoaWxkID0gbWFrZU9ic2VydmFibGUoZihldmVudC52YWx1ZSgpKSk7XG4gICAgICAgIGNoaWxkRGVwcy5wdXNoKGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIGNvbXBvc2l0ZS5hZGQoZnVuY3Rpb24odW5zdWJBbGwsIHVuc3ViTWUpIHtcbiAgICAgICAgICByZXR1cm4gY2hpbGQuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciByZXBseTtcbiAgICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICAgIF8ucmVtb3ZlKGNoaWxkLCBjaGlsZERlcHMpO1xuICAgICAgICAgICAgICBjaGVja1F1ZXVlKCk7XG4gICAgICAgICAgICAgIGNoZWNrRW5kKHVuc3ViTWUpO1xuICAgICAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgSW5pdGlhbCkge1xuICAgICAgICAgICAgICAgIGV2ZW50ID0gZXZlbnQudG9OZXh0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgICAgaWYgKHJlcGx5ID09PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICB1bnN1YkFsbCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgY2hlY2tRdWV1ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZXZlbnQ7XG4gICAgICAgIGV2ZW50ID0gcXVldWUuc2hpZnQoKTtcbiAgICAgICAgaWYgKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHNwYXduKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNoZWNrRW5kID0gZnVuY3Rpb24odW5zdWIpIHtcbiAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgaWYgKGNvbXBvc2l0ZS5lbXB0eSgpKSB7XG4gICAgICAgICAgcmV0dXJuIHNpbmsoZW5kRXZlbnQoKSk7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBjb21wb3NpdGUuYWRkKGZ1bmN0aW9uKF9fLCB1bnN1YlJvb3QpIHtcbiAgICAgICAgcmV0dXJuIHJvb3QuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGNoZWNrRW5kKHVuc3ViUm9vdCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGZpcnN0T25seSAmJiBjb21wb3NpdGUuY291bnQoKSA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoY29tcG9zaXRlLnVuc3Vic2NyaWJlZCkge1xuICAgICAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGxpbWl0ICYmIGNvbXBvc2l0ZS5jb3VudCgpID4gbGltaXQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHF1ZXVlLnB1c2goZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNwYXduKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gY29tcG9zaXRlLnVuc3Vic2NyaWJlO1xuICAgIH0pO1xuICAgIHJlc3VsdC5pbnRlcm5hbERlcHMgPSBmdW5jdGlvbigpIHtcbiAgICAgIGlmIChjaGlsZERlcHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiByb290RGVwLmNvbmNhdChjaGlsZERlcHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJvb3REZXA7XG4gICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIG1ha2VTcGF3bmVyID0gZnVuY3Rpb24oYXJncykge1xuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiBpc09ic2VydmFibGUoYXJnc1swXSkpIHtcbiAgICAgIHJldHVybiBfLmFsd2F5cyhhcmdzWzBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG1ha2VGdW5jdGlvbkFyZ3MoYXJncyk7XG4gICAgfVxuICB9O1xuXG4gIG1ha2VPYnNlcnZhYmxlID0gZnVuY3Rpb24oeCkge1xuICAgIGlmIChpc09ic2VydmFibGUoeCkpIHtcbiAgICAgIHJldHVybiB4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQmFjb24ub25jZSh4KTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmxhdE1hcFdpdGhDb25jdXJyZW5jeUxpbWl0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGxpbWl0O1xuICAgIGxpbWl0ID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiZmxhdE1hcFdpdGhDb25jdXJyZW5jeUxpbWl0XCIsIFtsaW1pdF0uY29uY2F0KHNsaWNlLmNhbGwoYXJncykpKSwgZmxhdE1hcF8odGhpcywgbWFrZVNwYXduZXIoYXJncyksIGZhbHNlLCBsaW1pdCkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmZsYXRNYXBDb25jYXQgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJmbGF0TWFwQ29uY2F0XCIsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMCkpLCB0aGlzLmZsYXRNYXBXaXRoQ29uY3VycmVuY3lMaW1pdC5hcHBseSh0aGlzLCBbMV0uY29uY2F0KHNsaWNlLmNhbGwoYXJndW1lbnRzKSkpKTtcbiAgfTtcblxuICBCYWNvbi5sYXRlciA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZSkge1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJsYXRlclwiLCBbZGVsYXksIHZhbHVlXSksIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIGlkLCBzZW5kZXI7XG4gICAgICBzZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIHNpbmsoW3ZhbHVlLCBlbmRFdmVudCgpXSk7XG4gICAgICB9O1xuICAgICAgaWQgPSBCYWNvbi5zY2hlZHVsZXIuc2V0VGltZW91dChzZW5kZXIsIGRlbGF5KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLnNjaGVkdWxlci5jbGVhclRpbWVvdXQoaWQpO1xuICAgICAgfTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuYnVmZmVyaW5nVGhyb3R0bGUgPSBmdW5jdGlvbihtaW5pbXVtSW50ZXJ2YWwpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJidWZmZXJpbmdUaHJvdHRsZVwiLCBbbWluaW11bUludGVydmFsXSksIHRoaXMuZmxhdE1hcENvbmNhdChmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gQmFjb24ub25jZSh4KS5jb25jYXQoQmFjb24ubGF0ZXIobWluaW11bUludGVydmFsKS5maWx0ZXIoZmFsc2UpKTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uUHJvcGVydHkucHJvdG90eXBlLmJ1ZmZlcmluZ1Rocm90dGxlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmJ1ZmZlcmluZ1Rocm90dGxlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykudG9Qcm9wZXJ0eSgpO1xuICB9O1xuXG4gIEJ1cyA9IChmdW5jdGlvbihzdXBlckNsYXNzKSB7XG4gICAgZXh0ZW5kKEJ1cywgc3VwZXJDbGFzcyk7XG5cbiAgICBmdW5jdGlvbiBCdXMoKSB7XG4gICAgICB0aGlzLmd1YXJkZWRTaW5rID0gYmluZCh0aGlzLmd1YXJkZWRTaW5rLCB0aGlzKTtcbiAgICAgIHRoaXMuc3Vic2NyaWJlQWxsID0gYmluZCh0aGlzLnN1YnNjcmliZUFsbCwgdGhpcyk7XG4gICAgICB0aGlzLnVuc3ViQWxsID0gYmluZCh0aGlzLnVuc3ViQWxsLCB0aGlzKTtcbiAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBCdXMpKSB7XG4gICAgICAgIHJldHVybiBuZXcgQnVzKCk7XG4gICAgICB9XG4gICAgICB0aGlzLnNpbmsgPSB2b2lkIDA7XG4gICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSBbXTtcbiAgICAgIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgICAgIEJ1cy5fX3N1cGVyX18uY29uc3RydWN0b3IuY2FsbCh0aGlzLCBuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJCdXNcIiwgW10pLCB0aGlzLnN1YnNjcmliZUFsbCk7XG4gICAgfVxuXG4gICAgQnVzLnByb3RvdHlwZS51bnN1YkFsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGosIGxlbjEsIHJlZiwgc3ViO1xuICAgICAgcmVmID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZi5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgc3ViID0gcmVmW2pdO1xuICAgICAgICBpZiAodHlwZW9mIHN1Yi51bnN1YiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgc3ViLnVuc3ViKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUuc3Vic2NyaWJlQWxsID0gZnVuY3Rpb24obmV3U2luaykge1xuICAgICAgdmFyIGosIGxlbjEsIHJlZiwgc3Vic2NyaXB0aW9uO1xuICAgICAgaWYgKHRoaXMuZW5kZWQpIHtcbiAgICAgICAgbmV3U2luayhlbmRFdmVudCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2luayA9IG5ld1Npbms7XG4gICAgICAgIHJlZiA9IGNsb25lQXJyYXkodGhpcy5zdWJzY3JpcHRpb25zKTtcbiAgICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZi5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgICBzdWJzY3JpcHRpb24gPSByZWZbal07XG4gICAgICAgICAgdGhpcy5zdWJzY3JpYmVJbnB1dChzdWJzY3JpcHRpb24pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy51bnN1YkFsbDtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5ndWFyZGVkU2luayA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgICAgICBfdGhpcy51bnN1YnNjcmliZUlucHV0KGlucHV0KTtcbiAgICAgICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBfdGhpcy5zaW5rKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5zdWJzY3JpYmVJbnB1dCA9IGZ1bmN0aW9uKHN1YnNjcmlwdGlvbikge1xuICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbi51bnN1YiA9IHN1YnNjcmlwdGlvbi5pbnB1dC5kaXNwYXRjaGVyLnN1YnNjcmliZSh0aGlzLmd1YXJkZWRTaW5rKHN1YnNjcmlwdGlvbi5pbnB1dCkpO1xuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLnVuc3Vic2NyaWJlSW5wdXQgPSBmdW5jdGlvbihpbnB1dCkge1xuICAgICAgdmFyIGksIGosIGxlbjEsIHJlZiwgc3ViO1xuICAgICAgcmVmID0gdGhpcy5zdWJzY3JpcHRpb25zO1xuICAgICAgZm9yIChpID0gaiA9IDAsIGxlbjEgPSByZWYubGVuZ3RoOyBqIDwgbGVuMTsgaSA9ICsraikge1xuICAgICAgICBzdWIgPSByZWZbaV07XG4gICAgICAgIGlmIChzdWIuaW5wdXQgPT09IGlucHV0KSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBzdWIudW5zdWIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgc3ViLnVuc3ViKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIEJ1cy5wcm90b3R5cGUucGx1ZyA9IGZ1bmN0aW9uKGlucHV0KSB7XG4gICAgICB2YXIgc3ViO1xuICAgICAgYXNzZXJ0T2JzZXJ2YWJsZShpbnB1dCk7XG4gICAgICBpZiAodGhpcy5lbmRlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBzdWIgPSB7XG4gICAgICAgIGlucHV0OiBpbnB1dFxuICAgICAgfTtcbiAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucy5wdXNoKHN1Yik7XG4gICAgICBpZiAoKHRoaXMuc2luayAhPSBudWxsKSkge1xuICAgICAgICB0aGlzLnN1YnNjcmliZUlucHV0KHN1Yik7XG4gICAgICB9XG4gICAgICByZXR1cm4gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gX3RoaXMudW5zdWJzY3JpYmVJbnB1dChpbnB1dCk7XG4gICAgICAgIH07XG4gICAgICB9KSh0aGlzKTtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5lbmQgPSBmdW5jdGlvbigpIHtcbiAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgdGhpcy51bnN1YkFsbCgpO1xuICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLnNpbmsgPT09IFwiZnVuY3Rpb25cIiA/IHRoaXMuc2luayhlbmRFdmVudCgpKSA6IHZvaWQgMDtcbiAgICB9O1xuXG4gICAgQnVzLnByb3RvdHlwZS5wdXNoID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIGlmICghdGhpcy5lbmRlZCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuc2luayA9PT0gXCJmdW5jdGlvblwiID8gdGhpcy5zaW5rKG5leHRFdmVudCh2YWx1ZSkpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBCdXMucHJvdG90eXBlLmVycm9yID0gZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5zaW5rID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLnNpbmsobmV3IEVycm9yKGVycm9yKSkgOiB2b2lkIDA7XG4gICAgfTtcblxuICAgIHJldHVybiBCdXM7XG5cbiAgfSkoRXZlbnRTdHJlYW0pO1xuXG4gIEJhY29uLkJ1cyA9IEJ1cztcblxuICBsaWZ0Q2FsbGJhY2sgPSBmdW5jdGlvbihkZXNjLCB3cmFwcGVkKSB7XG4gICAgcmV0dXJuIHdpdGhNZXRob2RDYWxsU3VwcG9ydChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBhcmdzLCBmLCBzdHJlYW07XG4gICAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgICBzdHJlYW0gPSBwYXJ0aWFsbHlBcHBsaWVkKHdyYXBwZWQsIFtcbiAgICAgICAgZnVuY3Rpb24odmFsdWVzLCBjYWxsYmFjaykge1xuICAgICAgICAgIHJldHVybiBmLmFwcGx5KG51bGwsIHNsaWNlLmNhbGwodmFsdWVzKS5jb25jYXQoW2NhbGxiYWNrXSkpO1xuICAgICAgICB9XG4gICAgICBdKTtcbiAgICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgZGVzYywgW2ZdLmNvbmNhdChzbGljZS5jYWxsKGFyZ3MpKSksIEJhY29uLmNvbWJpbmVBc0FycmF5KGFyZ3MpLmZsYXRNYXAoc3RyZWFtKSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24uZnJvbUNhbGxiYWNrID0gbGlmdENhbGxiYWNrKFwiZnJvbUNhbGxiYWNrXCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmO1xuICAgIGYgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICByZXR1cm4gQmFjb24uZnJvbUJpbmRlcihmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICBtYWtlRnVuY3Rpb24oZiwgYXJncykoaGFuZGxlcik7XG4gICAgICByZXR1cm4gbm9wO1xuICAgIH0sIChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIFt2YWx1ZSwgZW5kRXZlbnQoKV07XG4gICAgfSkpO1xuICB9KTtcblxuICBCYWNvbi5mcm9tTm9kZUNhbGxiYWNrID0gbGlmdENhbGxiYWNrKFwiZnJvbU5vZGVDYWxsYmFja1wiLCBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZjtcbiAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgcmV0dXJuIEJhY29uLmZyb21CaW5kZXIoZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgbWFrZUZ1bmN0aW9uKGYsIGFyZ3MpKGhhbmRsZXIpO1xuICAgICAgcmV0dXJuIG5vcDtcbiAgICB9LCBmdW5jdGlvbihlcnJvciwgdmFsdWUpIHtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZXR1cm4gW25ldyBFcnJvcihlcnJvciksIGVuZEV2ZW50KCldO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFt2YWx1ZSwgZW5kRXZlbnQoKV07XG4gICAgfSk7XG4gIH0pO1xuXG4gIEJhY29uLmNvbWJpbmVUZW1wbGF0ZSA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgdmFyIGFwcGx5U3RyZWFtVmFsdWUsIGNvbWJpbmF0b3IsIGNvbXBpbGUsIGNvbXBpbGVUZW1wbGF0ZSwgY29uc3RhbnRWYWx1ZSwgY3VycmVudCwgZnVuY3MsIG1rQ29udGV4dCwgcHVzaENvbnRleHQsIHNldFZhbHVlLCBzdHJlYW1zO1xuICAgIGZ1bmNzID0gW107XG4gICAgc3RyZWFtcyA9IFtdO1xuICAgIGN1cnJlbnQgPSBmdW5jdGlvbihjdHhTdGFjaykge1xuICAgICAgcmV0dXJuIGN0eFN0YWNrW2N0eFN0YWNrLmxlbmd0aCAtIDFdO1xuICAgIH07XG4gICAgc2V0VmFsdWUgPSBmdW5jdGlvbihjdHhTdGFjaywga2V5LCB2YWx1ZSkge1xuICAgICAgcmV0dXJuIGN1cnJlbnQoY3R4U3RhY2spW2tleV0gPSB2YWx1ZTtcbiAgICB9O1xuICAgIGFwcGx5U3RyZWFtVmFsdWUgPSBmdW5jdGlvbihrZXksIGluZGV4KSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oY3R4U3RhY2ssIHZhbHVlcykge1xuICAgICAgICByZXR1cm4gc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgdmFsdWVzW2luZGV4XSk7XG4gICAgICB9O1xuICAgIH07XG4gICAgY29uc3RhbnRWYWx1ZSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbihjdHhTdGFjaykge1xuICAgICAgICByZXR1cm4gc2V0VmFsdWUoY3R4U3RhY2ssIGtleSwgdmFsdWUpO1xuICAgICAgfTtcbiAgICB9O1xuICAgIG1rQ29udGV4dCA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgICBpZiAoaXNBcnJheSh0ZW1wbGF0ZSkpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgIH07XG4gICAgcHVzaENvbnRleHQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oY3R4U3RhY2spIHtcbiAgICAgICAgdmFyIG5ld0NvbnRleHQ7XG4gICAgICAgIG5ld0NvbnRleHQgPSBta0NvbnRleHQodmFsdWUpO1xuICAgICAgICBzZXRWYWx1ZShjdHhTdGFjaywga2V5LCBuZXdDb250ZXh0KTtcbiAgICAgICAgcmV0dXJuIGN0eFN0YWNrLnB1c2gobmV3Q29udGV4dCk7XG4gICAgICB9O1xuICAgIH07XG4gICAgY29tcGlsZSA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBwb3BDb250ZXh0O1xuICAgICAgaWYgKGlzT2JzZXJ2YWJsZSh2YWx1ZSkpIHtcbiAgICAgICAgc3RyZWFtcy5wdXNoKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGZ1bmNzLnB1c2goYXBwbHlTdHJlYW1WYWx1ZShrZXksIHN0cmVhbXMubGVuZ3RoIC0gMSkpO1xuICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gT2JqZWN0KHZhbHVlKSAmJiB0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIiAmJiAhKHZhbHVlIGluc3RhbmNlb2YgUmVnRXhwKSAmJiAhKHZhbHVlIGluc3RhbmNlb2YgRGF0ZSkpIHtcbiAgICAgICAgcG9wQ29udGV4dCA9IGZ1bmN0aW9uKGN0eFN0YWNrKSB7XG4gICAgICAgICAgcmV0dXJuIGN0eFN0YWNrLnBvcCgpO1xuICAgICAgICB9O1xuICAgICAgICBmdW5jcy5wdXNoKHB1c2hDb250ZXh0KGtleSwgdmFsdWUpKTtcbiAgICAgICAgY29tcGlsZVRlbXBsYXRlKHZhbHVlKTtcbiAgICAgICAgcmV0dXJuIGZ1bmNzLnB1c2gocG9wQ29udGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZnVuY3MucHVzaChjb25zdGFudFZhbHVlKGtleSwgdmFsdWUpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbXBpbGVUZW1wbGF0ZSA9IGZ1bmN0aW9uKHRlbXBsYXRlKSB7XG4gICAgICByZXR1cm4gXy5lYWNoKHRlbXBsYXRlLCBjb21waWxlKTtcbiAgICB9O1xuICAgIGNvbXBpbGVUZW1wbGF0ZSh0ZW1wbGF0ZSk7XG4gICAgY29tYmluYXRvciA9IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgdmFyIGN0eFN0YWNrLCBmLCBqLCBsZW4xLCByb290Q29udGV4dDtcbiAgICAgIHJvb3RDb250ZXh0ID0gbWtDb250ZXh0KHRlbXBsYXRlKTtcbiAgICAgIGN0eFN0YWNrID0gW3Jvb3RDb250ZXh0XTtcbiAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSBmdW5jcy5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgICAgZiA9IGZ1bmNzW2pdO1xuICAgICAgICBmKGN0eFN0YWNrLCB2YWx1ZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJvb3RDb250ZXh0O1xuICAgIH07XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImNvbWJpbmVUZW1wbGF0ZVwiLCBbdGVtcGxhdGVdKSwgQmFjb24uY29tYmluZUFzQXJyYXkoc3RyZWFtcykubWFwKGNvbWJpbmF0b3IpKTtcbiAgfTtcblxuICBhZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtID0gZnVuY3Rpb24ocHJvcGVydHksIHN0cmVhbSkge1xuICAgIHZhciBqdXN0SW5pdFZhbHVlO1xuICAgIGp1c3RJbml0VmFsdWUgPSBuZXcgRXZlbnRTdHJlYW0oZGVzY3JpYmUocHJvcGVydHksIFwianVzdEluaXRWYWx1ZVwiKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIHVuc3ViLCB2YWx1ZTtcbiAgICAgIHZhbHVlID0gdm9pZCAwO1xuICAgICAgdW5zdWIgPSBwcm9wZXJ0eS5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoIWV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICB2YWx1ZSA9IGV2ZW50O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBCYWNvbi5ub01vcmU7XG4gICAgICB9KTtcbiAgICAgIFVwZGF0ZUJhcnJpZXIud2hlbkRvbmVXaXRoKGp1c3RJbml0VmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xuICAgICAgICAgIHNpbmsodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdW5zdWI7XG4gICAgfSk7XG4gICAgcmV0dXJuIGp1c3RJbml0VmFsdWUuY29uY2F0KHN0cmVhbSkudG9Qcm9wZXJ0eSgpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLm1hcEVuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmO1xuICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwibWFwRW5kXCIsIFtmXSksIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0VuZCgpKSB7XG4gICAgICAgIHRoaXMucHVzaChuZXh0RXZlbnQoZihldmVudCkpKTtcbiAgICAgICAgdGhpcy5wdXNoKGVuZEV2ZW50KCkpO1xuICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLnNraXBFcnJvcnMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJza2lwRXJyb3JzXCIsIFtdKSwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUudGFrZVVudGlsID0gZnVuY3Rpb24oc3RvcHBlcikge1xuICAgIHZhciBlbmRNYXJrZXI7XG4gICAgZW5kTWFya2VyID0ge307XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwidGFrZVVudGlsXCIsIFtzdG9wcGVyXSksIEJhY29uLmdyb3VwU2ltdWx0YW5lb3VzKHRoaXMubWFwRW5kKGVuZE1hcmtlciksIHN0b3BwZXIuc2tpcEVycm9ycygpKS53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgdmFyIGRhdGEsIGosIGxlbjEsIHJlZiwgcmVwbHksIHZhbHVlO1xuICAgICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVmID0gZXZlbnQudmFsdWUoKSwgZGF0YSA9IHJlZlswXSwgc3RvcHBlciA9IHJlZlsxXTtcbiAgICAgICAgaWYgKHN0b3BwZXIubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChlbmRFdmVudCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgICAgZm9yIChqID0gMCwgbGVuMSA9IGRhdGEubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGRhdGFbal07XG4gICAgICAgICAgICBpZiAodmFsdWUgPT09IGVuZE1hcmtlcikge1xuICAgICAgICAgICAgICByZXBseSA9IHRoaXMucHVzaChlbmRFdmVudCgpKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJlcGx5ID0gdGhpcy5wdXNoKG5leHRFdmVudCh2YWx1ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcmVwbHk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uUHJvcGVydHkucHJvdG90eXBlLnRha2VVbnRpbCA9IGZ1bmN0aW9uKHN0b3BwZXIpIHtcbiAgICB2YXIgY2hhbmdlcztcbiAgICBjaGFuZ2VzID0gdGhpcy5jaGFuZ2VzKCkudGFrZVVudGlsKHN0b3BwZXIpO1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInRha2VVbnRpbFwiLCBbc3RvcHBlcl0pLCBhZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtKHRoaXMsIGNoYW5nZXMpKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwTGF0ZXN0ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGYsIHN0cmVhbTtcbiAgICBmID0gbWFrZVNwYXduZXIoYXJndW1lbnRzKTtcbiAgICBzdHJlYW0gPSB0aGlzLnRvRXZlbnRTdHJlYW0oKTtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJmbGF0TWFwTGF0ZXN0XCIsIFtmXSksIHN0cmVhbS5mbGF0TWFwKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gbWFrZU9ic2VydmFibGUoZih2YWx1ZSkpLnRha2VVbnRpbChzdHJlYW0pO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5Qcm9wZXJ0eS5wcm90b3R5cGUuZGVsYXlDaGFuZ2VzID0gZnVuY3Rpb24oZGVzYywgZikge1xuICAgIHJldHVybiB3aXRoRGVzYyhkZXNjLCBhZGRQcm9wZXJ0eUluaXRWYWx1ZVRvU3RyZWFtKHRoaXMsIGYodGhpcy5jaGFuZ2VzKCkpKSk7XG4gIH07XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJkZWxheVwiLCBbZGVsYXldKSwgdGhpcy5mbGF0TWFwKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gQmFjb24ubGF0ZXIoZGVsYXksIHZhbHVlKTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uUHJvcGVydHkucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24oZGVsYXkpIHtcbiAgICByZXR1cm4gdGhpcy5kZWxheUNoYW5nZXMobmV3IEJhY29uLkRlc2ModGhpcywgXCJkZWxheVwiLCBbZGVsYXldKSwgZnVuY3Rpb24oY2hhbmdlcykge1xuICAgICAgcmV0dXJuIGNoYW5nZXMuZGVsYXkoZGVsYXkpO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5kZWJvdW5jZSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiZGVib3VuY2VcIiwgW2RlbGF5XSksIHRoaXMuZmxhdE1hcExhdGVzdChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIEJhY29uLmxhdGVyKGRlbGF5LCB2YWx1ZSk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLlByb3BlcnR5LnByb3RvdHlwZS5kZWJvdW5jZSA9IGZ1bmN0aW9uKGRlbGF5KSB7XG4gICAgcmV0dXJuIHRoaXMuZGVsYXlDaGFuZ2VzKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiZGVib3VuY2VcIiwgW2RlbGF5XSksIGZ1bmN0aW9uKGNoYW5nZXMpIHtcbiAgICAgIHJldHVybiBjaGFuZ2VzLmRlYm91bmNlKGRlbGF5KTtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuZGVib3VuY2VJbW1lZGlhdGUgPSBmdW5jdGlvbihkZWxheSkge1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImRlYm91bmNlSW1tZWRpYXRlXCIsIFtkZWxheV0pLCB0aGlzLmZsYXRNYXBGaXJzdChmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIEJhY29uLm9uY2UodmFsdWUpLmNvbmNhdChCYWNvbi5sYXRlcihkZWxheSkuZmlsdGVyKGZhbHNlKSk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmRlY29kZSA9IGZ1bmN0aW9uKGNhc2VzKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiZGVjb2RlXCIsIFtjYXNlc10pLCB0aGlzLmNvbWJpbmUoQmFjb24uY29tYmluZVRlbXBsYXRlKGNhc2VzKSwgZnVuY3Rpb24oa2V5LCB2YWx1ZXMpIHtcbiAgICAgIHJldHVybiB2YWx1ZXNba2V5XTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2NhbiA9IGZ1bmN0aW9uKHNlZWQsIGYpIHtcbiAgICB2YXIgYWNjLCBpbml0SGFuZGxlZCwgcmVzdWx0UHJvcGVydHksIHN1YnNjcmliZTtcbiAgICBmID0gdG9Db21iaW5hdG9yKGYpO1xuICAgIGFjYyA9IHRvT3B0aW9uKHNlZWQpO1xuICAgIGluaXRIYW5kbGVkID0gZmFsc2U7XG4gICAgc3Vic2NyaWJlID0gKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oc2luaykge1xuICAgICAgICB2YXIgaW5pdFNlbnQsIHJlcGx5LCBzZW5kSW5pdCwgdW5zdWI7XG4gICAgICAgIGluaXRTZW50ID0gZmFsc2U7XG4gICAgICAgIHVuc3ViID0gbm9wO1xuICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgIHNlbmRJbml0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgaWYgKCFpbml0U2VudCkge1xuICAgICAgICAgICAgcmV0dXJuIGFjYy5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgIGluaXRTZW50ID0gaW5pdEhhbmRsZWQgPSB0cnVlO1xuICAgICAgICAgICAgICByZXBseSA9IHNpbmsobmV3IEluaXRpYWwoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICAgIGlmIChyZXBseSA9PT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdW5zdWIgPSBub3A7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdW5zdWIgPSBfdGhpcy5kaXNwYXRjaGVyLnN1YnNjcmliZShmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHZhciBuZXh0LCBwcmV2O1xuICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICBpZiAoaW5pdEhhbmRsZWQgJiYgZXZlbnQuaXNJbml0aWFsKCkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIWV2ZW50LmlzSW5pdGlhbCgpKSB7XG4gICAgICAgICAgICAgICAgc2VuZEluaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpbml0U2VudCA9IGluaXRIYW5kbGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJldiA9IGFjYy5nZXRPckVsc2Uodm9pZCAwKTtcbiAgICAgICAgICAgICAgbmV4dCA9IGYocHJldiwgZXZlbnQudmFsdWUoKSk7XG4gICAgICAgICAgICAgIGFjYyA9IG5ldyBTb21lKG5leHQpO1xuICAgICAgICAgICAgICByZXR1cm4gc2luayhldmVudC5hcHBseShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dDtcbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgICByZXBseSA9IHNlbmRJbml0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmVwbHkgIT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgVXBkYXRlQmFycmllci53aGVuRG9uZVdpdGgocmVzdWx0UHJvcGVydHksIHNlbmRJbml0KTtcbiAgICAgICAgcmV0dXJuIHVuc3ViO1xuICAgICAgfTtcbiAgICB9KSh0aGlzKTtcbiAgICByZXR1cm4gcmVzdWx0UHJvcGVydHkgPSBuZXcgUHJvcGVydHkobmV3IEJhY29uLkRlc2ModGhpcywgXCJzY2FuXCIsIFtzZWVkLCBmXSksIHN1YnNjcmliZSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZGlmZiA9IGZ1bmN0aW9uKHN0YXJ0LCBmKSB7XG4gICAgZiA9IHRvQ29tYmluYXRvcihmKTtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJkaWZmXCIsIFtzdGFydCwgZl0pLCB0aGlzLnNjYW4oW3N0YXJ0XSwgZnVuY3Rpb24ocHJldlR1cGxlLCBuZXh0KSB7XG4gICAgICByZXR1cm4gW25leHQsIGYocHJldlR1cGxlWzBdLCBuZXh0KV07XG4gICAgfSkuZmlsdGVyKGZ1bmN0aW9uKHR1cGxlKSB7XG4gICAgICByZXR1cm4gdHVwbGUubGVuZ3RoID09PSAyO1xuICAgIH0pLm1hcChmdW5jdGlvbih0dXBsZSkge1xuICAgICAgcmV0dXJuIHR1cGxlWzFdO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5kb0FjdGlvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBmO1xuICAgIGYgPSBtYWtlRnVuY3Rpb25BcmdzKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiZG9BY3Rpb25cIiwgW2ZdKSwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKGV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgZihldmVudC52YWx1ZSgpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5kb0Vycm9yID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGY7XG4gICAgZiA9IG1ha2VGdW5jdGlvbkFyZ3MoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJkb0Vycm9yXCIsIFtmXSksIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgZihldmVudC5lcnJvcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZG9Mb2cgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncztcbiAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiZG9Mb2dcIiwgYXJncyksIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsKSB7XG4gICAgICAgIGlmICh0eXBlb2YgY29uc29sZS5sb2cgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgIGNvbnNvbGUubG9nLmFwcGx5KGNvbnNvbGUsIHNsaWNlLmNhbGwoYXJncykuY29uY2F0KFtldmVudC5sb2coKV0pKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmVuZE9uRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncywgZjtcbiAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgaWYgKGYgPT0gbnVsbCkge1xuICAgICAgZiA9IHRydWU7XG4gICAgfVxuICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiZW5kT25FcnJvclwiLCBbXSksIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSAmJiBmKGV2ZW50LmVycm9yKSkge1xuICAgICAgICAgIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChlbmRFdmVudCgpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfSkpO1xuICAgIH0pO1xuICB9O1xuXG4gIE9ic2VydmFibGUucHJvdG90eXBlLmVycm9ycyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImVycm9yc1wiLCBbXSksIHRoaXMuZmlsdGVyKGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pKTtcbiAgfTtcblxuICB2YWx1ZUFuZEVuZCA9IChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiBbdmFsdWUsIGVuZEV2ZW50KCldO1xuICB9KTtcblxuICBCYWNvbi5mcm9tUHJvbWlzZSA9IGZ1bmN0aW9uKHByb21pc2UsIGFib3J0LCBldmVudFRyYW5zZm9ybWVyKSB7XG4gICAgaWYgKGV2ZW50VHJhbnNmb3JtZXIgPT0gbnVsbCkge1xuICAgICAgZXZlbnRUcmFuc2Zvcm1lciA9IHZhbHVlQW5kRW5kO1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2MoQmFjb24sIFwiZnJvbVByb21pc2VcIiwgW3Byb21pc2VdKSwgQmFjb24uZnJvbUJpbmRlcihmdW5jdGlvbihoYW5kbGVyKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKChyZWYgPSBwcm9taXNlLnRoZW4oaGFuZGxlciwgZnVuY3Rpb24oZSkge1xuICAgICAgICByZXR1cm4gaGFuZGxlcihuZXcgRXJyb3IoZSkpO1xuICAgICAgfSkpICE9IG51bGwpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZWYuZG9uZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgcmVmLmRvbmUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoYWJvcnQpIHtcbiAgICAgICAgICByZXR1cm4gdHlwZW9mIHByb21pc2UuYWJvcnQgPT09IFwiZnVuY3Rpb25cIiA/IHByb21pc2UuYWJvcnQoKSA6IHZvaWQgMDtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9LCBldmVudFRyYW5zZm9ybWVyKSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUubWFwRXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZjtcbiAgICBmID0gbWFrZUZ1bmN0aW9uQXJncyhhcmd1bWVudHMpO1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcIm1hcEVycm9yXCIsIFtmXSksIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIGlmIChldmVudC5pc0Vycm9yKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChuZXh0RXZlbnQoZihldmVudC5lcnJvcikpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5mbGF0TWFwRXJyb3IgPSBmdW5jdGlvbihmbikge1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImZsYXRNYXBFcnJvclwiLCBbZm5dKSwgdGhpcy5tYXBFcnJvcihmdW5jdGlvbihlcnIpIHtcbiAgICAgIHJldHVybiBuZXcgRXJyb3IoZXJyKTtcbiAgICB9KS5mbGF0TWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgIGlmICh4IGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgcmV0dXJuIGZuKHguZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLm9uY2UoeCk7XG4gICAgICB9XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS5zYW1wbGVkQnkgPSBmdW5jdGlvbihzYW1wbGVyLCBjb21iaW5hdG9yKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwic2FtcGxlZEJ5XCIsIFtzYW1wbGVyLCBjb21iaW5hdG9yXSksIHRoaXMudG9Qcm9wZXJ0eSgpLnNhbXBsZWRCeShzYW1wbGVyLCBjb21iaW5hdG9yKSk7XG4gIH07XG5cbiAgQmFjb24uUHJvcGVydHkucHJvdG90eXBlLnNhbXBsZWRCeSA9IGZ1bmN0aW9uKHNhbXBsZXIsIGNvbWJpbmF0b3IpIHtcbiAgICB2YXIgbGF6eSwgcmVzdWx0LCBzYW1wbGVyU291cmNlLCBzdHJlYW0sIHRoaXNTb3VyY2U7XG4gICAgaWYgKGNvbWJpbmF0b3IgIT0gbnVsbCkge1xuICAgICAgY29tYmluYXRvciA9IHRvQ29tYmluYXRvcihjb21iaW5hdG9yKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGF6eSA9IHRydWU7XG4gICAgICBjb21iaW5hdG9yID0gZnVuY3Rpb24oZikge1xuICAgICAgICByZXR1cm4gZi52YWx1ZSgpO1xuICAgICAgfTtcbiAgICB9XG4gICAgdGhpc1NvdXJjZSA9IG5ldyBTb3VyY2UodGhpcywgZmFsc2UsIGxhenkpO1xuICAgIHNhbXBsZXJTb3VyY2UgPSBuZXcgU291cmNlKHNhbXBsZXIsIHRydWUsIGxhenkpO1xuICAgIHN0cmVhbSA9IEJhY29uLndoZW4oW3RoaXNTb3VyY2UsIHNhbXBsZXJTb3VyY2VdLCBjb21iaW5hdG9yKTtcbiAgICByZXN1bHQgPSBzYW1wbGVyIGluc3RhbmNlb2YgUHJvcGVydHkgPyBzdHJlYW0udG9Qcm9wZXJ0eSgpIDogc3RyZWFtO1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInNhbXBsZWRCeVwiLCBbc2FtcGxlciwgY29tYmluYXRvcl0pLCByZXN1bHQpO1xuICB9O1xuXG4gIEJhY29uLlByb3BlcnR5LnByb3RvdHlwZS5zYW1wbGUgPSBmdW5jdGlvbihpbnRlcnZhbCkge1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInNhbXBsZVwiLCBbaW50ZXJ2YWxdKSwgdGhpcy5zYW1wbGVkQnkoQmFjb24uaW50ZXJ2YWwoaW50ZXJ2YWwsIHt9KSkpO1xuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLm1hcCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBwO1xuICAgIHAgPSBhcmd1bWVudHNbMF0sIGFyZ3MgPSAyIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSkgOiBbXTtcbiAgICBpZiAocCBpbnN0YW5jZW9mIFByb3BlcnR5KSB7XG4gICAgICByZXR1cm4gcC5zYW1wbGVkQnkodGhpcywgZm9ybWVyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGNvbnZlcnRBcmdzVG9GdW5jdGlvbih0aGlzLCBwLCBhcmdzLCBmdW5jdGlvbihmKSB7XG4gICAgICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcIm1hcFwiLCBbZl0pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudC5mbWFwKGYpKTtcbiAgICAgICAgfSkpO1xuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIEJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmZvbGQgPSBmdW5jdGlvbihzZWVkLCBmKSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiZm9sZFwiLCBbc2VlZCwgZl0pLCB0aGlzLnNjYW4oc2VlZCwgZikuc2FtcGxlZEJ5KHRoaXMuZmlsdGVyKGZhbHNlKS5tYXBFbmQoKS50b1Byb3BlcnR5KCkpKTtcbiAgfTtcblxuICBPYnNlcnZhYmxlLnByb3RvdHlwZS5yZWR1Y2UgPSBPYnNlcnZhYmxlLnByb3RvdHlwZS5mb2xkO1xuXG4gIEJhY29uLmZyb21Qb2xsID0gZnVuY3Rpb24oZGVsYXksIHBvbGwpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2MoQmFjb24sIFwiZnJvbVBvbGxcIiwgW2RlbGF5LCBwb2xsXSksIEJhY29uLmZyb21CaW5kZXIoKGZ1bmN0aW9uKGhhbmRsZXIpIHtcbiAgICAgIHZhciBpZDtcbiAgICAgIGlkID0gQmFjb24uc2NoZWR1bGVyLnNldEludGVydmFsKGhhbmRsZXIsIGRlbGF5KTtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIEJhY29uLnNjaGVkdWxlci5jbGVhckludGVydmFsKGlkKTtcbiAgICAgIH07XG4gICAgfSksIHBvbGwpKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5ncm91cEJ5ID0gZnVuY3Rpb24oa2V5RiwgbGltaXRGKSB7XG4gICAgdmFyIHNyYywgc3RyZWFtcztcbiAgICBpZiAobGltaXRGID09IG51bGwpIHtcbiAgICAgIGxpbWl0RiA9IEJhY29uLl8uaWQ7XG4gICAgfVxuICAgIHN0cmVhbXMgPSB7fTtcbiAgICBzcmMgPSB0aGlzO1xuICAgIHJldHVybiBzcmMuZmlsdGVyKGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiAhc3RyZWFtc1trZXlGKHgpXTtcbiAgICB9KS5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgdmFyIGRhdGEsIGtleSwgbGltaXRlZCwgc2ltaWxhcjtcbiAgICAgIGtleSA9IGtleUYoeCk7XG4gICAgICBzaW1pbGFyID0gc3JjLmZpbHRlcihmdW5jdGlvbih4KSB7XG4gICAgICAgIHJldHVybiBrZXlGKHgpID09PSBrZXk7XG4gICAgICB9KTtcbiAgICAgIGRhdGEgPSBCYWNvbi5vbmNlKHgpLmNvbmNhdChzaW1pbGFyKTtcbiAgICAgIGxpbWl0ZWQgPSBsaW1pdEYoZGF0YSwgeCkud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgICAgICByZXR1cm4gZGVsZXRlIHN0cmVhbXNba2V5XTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gc3RyZWFtc1trZXldID0gbGltaXRlZDtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5mcm9tQXJyYXkgPSBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICB2YXIgaTtcbiAgICBhc3NlcnRBcnJheSh2YWx1ZXMpO1xuICAgIGlmICghdmFsdWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImZyb21BcnJheVwiLCB2YWx1ZXMpLCBCYWNvbi5uZXZlcigpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaSA9IDA7XG4gICAgICByZXR1cm4gbmV3IEV2ZW50U3RyZWFtKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcImZyb21BcnJheVwiLCBbdmFsdWVzXSksIGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgICAgdmFyIHB1c2gsIHB1c2hOZWVkZWQsIHB1c2hpbmcsIHJlcGx5LCB1bnN1YmQ7XG4gICAgICAgIHVuc3ViZCA9IGZhbHNlO1xuICAgICAgICByZXBseSA9IEJhY29uLm1vcmU7XG4gICAgICAgIHB1c2hpbmcgPSBmYWxzZTtcbiAgICAgICAgcHVzaE5lZWRlZCA9IGZhbHNlO1xuICAgICAgICBwdXNoID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHZhbHVlO1xuICAgICAgICAgIHB1c2hOZWVkZWQgPSB0cnVlO1xuICAgICAgICAgIGlmIChwdXNoaW5nKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHB1c2hpbmcgPSB0cnVlO1xuICAgICAgICAgIHdoaWxlIChwdXNoTmVlZGVkKSB7XG4gICAgICAgICAgICBwdXNoTmVlZGVkID0gZmFsc2U7XG4gICAgICAgICAgICBpZiAoKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpICYmICF1bnN1YmQpIHtcbiAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZXNbaSsrXTtcbiAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKHRvRXZlbnQodmFsdWUpKTtcbiAgICAgICAgICAgICAgaWYgKHJlcGx5ICE9PSBCYWNvbi5ub01vcmUpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSA9PT0gdmFsdWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgc2luayhlbmRFdmVudCgpKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgVXBkYXRlQmFycmllci5hZnRlclRyYW5zYWN0aW9uKHB1c2gpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gcHVzaGluZyA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICBwdXNoKCk7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gdW5zdWJkID0gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuaG9sZFdoZW4gPSBmdW5jdGlvbih2YWx2ZSkge1xuICAgIHZhciBidWZmZXJlZFZhbHVlcywgb25Ib2xkLCBzcmM7XG4gICAgb25Ib2xkID0gZmFsc2U7XG4gICAgYnVmZmVyZWRWYWx1ZXMgPSBbXTtcbiAgICBzcmMgPSB0aGlzO1xuICAgIHJldHVybiBuZXcgRXZlbnRTdHJlYW0obmV3IEJhY29uLkRlc2ModGhpcywgXCJob2xkV2hlblwiLCBbdmFsdmVdKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgdmFyIGNvbXBvc2l0ZSwgZW5kSWZCb3RoRW5kZWQsIHN1YnNjcmliZWQ7XG4gICAgICBjb21wb3NpdGUgPSBuZXcgQ29tcG9zaXRlVW5zdWJzY3JpYmUoKTtcbiAgICAgIHN1YnNjcmliZWQgPSBmYWxzZTtcbiAgICAgIGVuZElmQm90aEVuZGVkID0gZnVuY3Rpb24odW5zdWIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiB1bnN1YiA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgdW5zdWIoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29tcG9zaXRlLmVtcHR5KCkgJiYgc3Vic2NyaWJlZCkge1xuICAgICAgICAgIHJldHVybiBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgICAgY29tcG9zaXRlLmFkZChmdW5jdGlvbih1bnN1YkFsbCwgdW5zdWJNZSkge1xuICAgICAgICByZXR1cm4gdmFsdmUuc3Vic2NyaWJlSW50ZXJuYWwoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICB2YXIgaiwgbGVuMSwgcmVzdWx0cywgdG9TZW5kLCB2YWx1ZTtcbiAgICAgICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICAgICAgb25Ib2xkID0gZXZlbnQudmFsdWUoKTtcbiAgICAgICAgICAgIGlmICghb25Ib2xkKSB7XG4gICAgICAgICAgICAgIHRvU2VuZCA9IGJ1ZmZlcmVkVmFsdWVzO1xuICAgICAgICAgICAgICBidWZmZXJlZFZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgICByZXN1bHRzID0gW107XG4gICAgICAgICAgICAgIGZvciAoaiA9IDAsIGxlbjEgPSB0b1NlbmQubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgICAgICAgICAgdmFsdWUgPSB0b1NlbmRbal07XG4gICAgICAgICAgICAgICAgcmVzdWx0cy5wdXNoKHNpbmsobmV4dEV2ZW50KHZhbHVlKSkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiByZXN1bHRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgcmV0dXJuIGVuZElmQm90aEVuZGVkKHVuc3ViTWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc2luayhldmVudCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgY29tcG9zaXRlLmFkZChmdW5jdGlvbih1bnN1YkFsbCwgdW5zdWJNZSkge1xuICAgICAgICByZXR1cm4gc3JjLnN1YnNjcmliZUludGVybmFsKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKG9uSG9sZCAmJiBldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICByZXR1cm4gYnVmZmVyZWRWYWx1ZXMucHVzaChldmVudC52YWx1ZSgpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmlzRW5kKCkgJiYgYnVmZmVyZWRWYWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5kSWZCb3RoRW5kZWQodW5zdWJNZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBzaW5rKGV2ZW50KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBzdWJzY3JpYmVkID0gdHJ1ZTtcbiAgICAgIGVuZElmQm90aEVuZGVkKCk7XG4gICAgICByZXR1cm4gY29tcG9zaXRlLnVuc3Vic2NyaWJlO1xuICAgIH0pO1xuICB9O1xuXG4gIEJhY29uLmludGVydmFsID0gZnVuY3Rpb24oZGVsYXksIHZhbHVlKSB7XG4gICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgIHZhbHVlID0ge307XG4gICAgfVxuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJpbnRlcnZhbFwiLCBbZGVsYXksIHZhbHVlXSksIEJhY29uLmZyb21Qb2xsKGRlbGF5LCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBuZXh0RXZlbnQodmFsdWUpO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi4kID0ge307XG5cbiAgQmFjb24uJC5hc0V2ZW50U3RyZWFtID0gZnVuY3Rpb24oZXZlbnROYW1lLCBzZWxlY3RvciwgZXZlbnRUcmFuc2Zvcm1lcikge1xuICAgIHZhciByZWY7XG4gICAgaWYgKF8uaXNGdW5jdGlvbihzZWxlY3RvcikpIHtcbiAgICAgIHJlZiA9IFtzZWxlY3Rvciwgdm9pZCAwXSwgZXZlbnRUcmFuc2Zvcm1lciA9IHJlZlswXSwgc2VsZWN0b3IgPSByZWZbMV07XG4gICAgfVxuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLnNlbGVjdG9yIHx8IHRoaXMsIFwiYXNFdmVudFN0cmVhbVwiLCBbZXZlbnROYW1lXSksIEJhY29uLmZyb21CaW5kZXIoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oaGFuZGxlcikge1xuICAgICAgICBfdGhpcy5vbihldmVudE5hbWUsIHNlbGVjdG9yLCBoYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHJldHVybiBfdGhpcy5vZmYoZXZlbnROYW1lLCBzZWxlY3RvciwgaGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgICB9O1xuICAgIH0pKHRoaXMpLCBldmVudFRyYW5zZm9ybWVyKSk7XG4gIH07XG5cbiAgaWYgKChyZWYgPSB0eXBlb2YgalF1ZXJ5ICE9PSBcInVuZGVmaW5lZFwiICYmIGpRdWVyeSAhPT0gbnVsbCA/IGpRdWVyeSA6IHR5cGVvZiBaZXB0byAhPT0gXCJ1bmRlZmluZWRcIiAmJiBaZXB0byAhPT0gbnVsbCA/IFplcHRvIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgcmVmLmZuLmFzRXZlbnRTdHJlYW0gPSBCYWNvbi4kLmFzRXZlbnRTdHJlYW07XG4gIH1cblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS5sb2cgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncztcbiAgICBhcmdzID0gMSA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDApIDogW107XG4gICAgdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIHJldHVybiB0eXBlb2YgY29uc29sZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBjb25zb2xlICE9PSBudWxsID8gdHlwZW9mIGNvbnNvbGUubG9nID09PSBcImZ1bmN0aW9uXCIgPyBjb25zb2xlLmxvZy5hcHBseShjb25zb2xlLCBzbGljZS5jYWxsKGFyZ3MpLmNvbmNhdChbZXZlbnQubG9nKCldKSkgOiB2b2lkIDAgOiB2b2lkIDA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLm1lcmdlID0gZnVuY3Rpb24ocmlnaHQpIHtcbiAgICB2YXIgbGVmdDtcbiAgICBhc3NlcnRFdmVudFN0cmVhbShyaWdodCk7XG4gICAgbGVmdCA9IHRoaXM7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKGxlZnQsIFwibWVyZ2VcIiwgW3JpZ2h0XSksIEJhY29uLm1lcmdlQWxsKHRoaXMsIHJpZ2h0KSk7XG4gIH07XG5cbiAgQmFjb24ubWVyZ2VBbGwgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyZWFtcztcbiAgICBzdHJlYW1zID0gYXJndW1lbnRzVG9PYnNlcnZhYmxlcyhhcmd1bWVudHMpO1xuICAgIGlmIChzdHJlYW1zLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG5ldyBFdmVudFN0cmVhbShuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJtZXJnZUFsbFwiLCBzdHJlYW1zKSwgZnVuY3Rpb24oc2luaykge1xuICAgICAgICB2YXIgZW5kcywgc2lua3MsIHNtYXJ0U2luaztcbiAgICAgICAgZW5kcyA9IDA7XG4gICAgICAgIHNtYXJ0U2luayA9IGZ1bmN0aW9uKG9icykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbih1bnN1YkJvdGgpIHtcbiAgICAgICAgICAgIHJldHVybiBvYnMuZGlzcGF0Y2hlci5zdWJzY3JpYmUoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgdmFyIHJlcGx5O1xuICAgICAgICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgICAgICAgIGVuZHMrKztcbiAgICAgICAgICAgICAgICBpZiAoZW5kcyA9PT0gc3RyZWFtcy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBzaW5rKGVuZEV2ZW50KCkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gQmFjb24ubW9yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVwbHkgPSBzaW5rKGV2ZW50KTtcbiAgICAgICAgICAgICAgICBpZiAocmVwbHkgPT09IEJhY29uLm5vTW9yZSkge1xuICAgICAgICAgICAgICAgICAgdW5zdWJCb3RoKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiByZXBseTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgc2lua3MgPSBfLm1hcChzbWFydFNpbmssIHN0cmVhbXMpO1xuICAgICAgICByZXR1cm4gbmV3IEJhY29uLkNvbXBvc2l0ZVVuc3Vic2NyaWJlKHNpbmtzKS51bnN1YnNjcmliZTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gQmFjb24ubmV2ZXIoKTtcbiAgICB9XG4gIH07XG5cbiAgQmFjb24ucmVwZWF0ZWRseSA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZXMpIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgaW5kZXggPSAwO1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJyZXBlYXRlZGx5XCIsIFtkZWxheSwgdmFsdWVzXSksIEJhY29uLmZyb21Qb2xsKGRlbGF5LCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB2YWx1ZXNbaW5kZXgrKyAlIHZhbHVlcy5sZW5ndGhdO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5yZXBlYXQgPSBmdW5jdGlvbihnZW5lcmF0b3IpIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgaW5kZXggPSAwO1xuICAgIHJldHVybiBCYWNvbi5mcm9tQmluZGVyKGZ1bmN0aW9uKHNpbmspIHtcbiAgICAgIHZhciBmbGFnLCBoYW5kbGVFdmVudCwgcmVwbHksIHN1YnNjcmliZU5leHQsIHVuc3ViO1xuICAgICAgZmxhZyA9IGZhbHNlO1xuICAgICAgcmVwbHkgPSBCYWNvbi5tb3JlO1xuICAgICAgdW5zdWIgPSBmdW5jdGlvbigpIHt9O1xuICAgICAgaGFuZGxlRXZlbnQgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICBpZiAoZXZlbnQuaXNFbmQoKSkge1xuICAgICAgICAgIGlmICghZmxhZykge1xuICAgICAgICAgICAgcmV0dXJuIGZsYWcgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3Vic2NyaWJlTmV4dCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcmVwbHkgPSBzaW5rKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHN1YnNjcmliZU5leHQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG5leHQ7XG4gICAgICAgIGZsYWcgPSB0cnVlO1xuICAgICAgICB3aGlsZSAoZmxhZyAmJiByZXBseSAhPT0gQmFjb24ubm9Nb3JlKSB7XG4gICAgICAgICAgbmV4dCA9IGdlbmVyYXRvcihpbmRleCsrKTtcbiAgICAgICAgICBmbGFnID0gZmFsc2U7XG4gICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgIHVuc3ViID0gbmV4dC5zdWJzY3JpYmVJbnRlcm5hbChoYW5kbGVFdmVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNpbmsoZW5kRXZlbnQoKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmbGFnID0gdHJ1ZTtcbiAgICAgIH07XG4gICAgICBzdWJzY3JpYmVOZXh0KCk7XG4gICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiB1bnN1YigpO1xuICAgICAgfTtcbiAgICB9KTtcbiAgfTtcblxuICBCYWNvbi5yZXRyeSA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgZGVsYXksIGVycm9yLCBmaW5pc2hlZCwgaXNSZXRyeWFibGUsIG1heFJldHJpZXMsIHJldHJpZXMsIHNvdXJjZTtcbiAgICBpZiAoIV8uaXNGdW5jdGlvbihvcHRpb25zLnNvdXJjZSkpIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCInc291cmNlJyBvcHRpb24gaGFzIHRvIGJlIGEgZnVuY3Rpb25cIik7XG4gICAgfVxuICAgIHNvdXJjZSA9IG9wdGlvbnMuc291cmNlO1xuICAgIHJldHJpZXMgPSBvcHRpb25zLnJldHJpZXMgfHwgMDtcbiAgICBtYXhSZXRyaWVzID0gb3B0aW9ucy5tYXhSZXRyaWVzIHx8IHJldHJpZXM7XG4gICAgZGVsYXkgPSBvcHRpb25zLmRlbGF5IHx8IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIDA7XG4gICAgfTtcbiAgICBpc1JldHJ5YWJsZSA9IG9wdGlvbnMuaXNSZXRyeWFibGUgfHwgZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIGZpbmlzaGVkID0gZmFsc2U7XG4gICAgZXJyb3IgPSBudWxsO1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJyZXRyeVwiLCBbb3B0aW9uc10pLCBCYWNvbi5yZXBlYXQoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY29udGV4dCwgcGF1c2UsIHZhbHVlU3RyZWFtO1xuICAgICAgaWYgKGZpbmlzaGVkKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWVTdHJlYW0gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICByZXR1cm4gc291cmNlKCkuZW5kT25FcnJvcigpLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuaXNFcnJvcigpKSB7XG4gICAgICAgICAgICAgIGVycm9yID0gZXZlbnQ7XG4gICAgICAgICAgICAgIGlmICghKGlzUmV0cnlhYmxlKGVycm9yLmVycm9yKSAmJiByZXRyaWVzID4gMCkpIHtcbiAgICAgICAgICAgICAgICBmaW5pc2hlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IgPSBudWxsO1xuICAgICAgICAgICAgICAgIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgY29udGV4dCA9IHtcbiAgICAgICAgICAgIGVycm9yOiBlcnJvci5lcnJvcixcbiAgICAgICAgICAgIHJldHJpZXNEb25lOiBtYXhSZXRyaWVzIC0gcmV0cmllc1xuICAgICAgICAgIH07XG4gICAgICAgICAgcGF1c2UgPSBCYWNvbi5sYXRlcihkZWxheShjb250ZXh0KSkuZmlsdGVyKGZhbHNlKTtcbiAgICAgICAgICByZXRyaWVzID0gcmV0cmllcyAtIDE7XG4gICAgICAgICAgcmV0dXJuIHBhdXNlLmNvbmNhdChCYWNvbi5vbmNlKCkuZmxhdE1hcCh2YWx1ZVN0cmVhbSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB2YWx1ZVN0cmVhbSgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSkpO1xuICB9O1xuXG4gIEJhY29uLnNlcXVlbnRpYWxseSA9IGZ1bmN0aW9uKGRlbGF5LCB2YWx1ZXMpIHtcbiAgICB2YXIgaW5kZXg7XG4gICAgaW5kZXggPSAwO1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJzZXF1ZW50aWFsbHlcIiwgW2RlbGF5LCB2YWx1ZXNdKSwgQmFjb24uZnJvbVBvbGwoZGVsYXksIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHZhbHVlO1xuICAgICAgdmFsdWUgPSB2YWx1ZXNbaW5kZXgrK107XG4gICAgICBpZiAoaW5kZXggPCB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgIH0gZWxzZSBpZiAoaW5kZXggPT09IHZhbHVlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIFt2YWx1ZSwgZW5kRXZlbnQoKV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZW5kRXZlbnQoKTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2tpcCA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwic2tpcFwiLCBbY291bnRdKSwgdGhpcy53aXRoSGFuZGxlcihmdW5jdGlvbihldmVudCkge1xuICAgICAgaWYgKCFldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgfSBlbHNlIGlmIChjb3VudCA+IDApIHtcbiAgICAgICAgY291bnQtLTtcbiAgICAgICAgcmV0dXJuIEJhY29uLm1vcmU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5wdXNoKGV2ZW50KTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUudGFrZSA9IGZ1bmN0aW9uKGNvdW50KSB7XG4gICAgaWYgKGNvdW50IDw9IDApIHtcbiAgICAgIHJldHVybiBCYWNvbi5uZXZlcigpO1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJ0YWtlXCIsIFtjb3VudF0pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICBpZiAoIWV2ZW50Lmhhc1ZhbHVlKCkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudC0tO1xuICAgICAgICBpZiAoY291bnQgPiAwKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHVzaChldmVudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB0aGlzLnB1c2goZW5kRXZlbnQoKSk7XG4gICAgICAgICAgcmV0dXJuIEJhY29uLm5vTW9yZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuc2tpcFVudGlsID0gZnVuY3Rpb24oc3RhcnRlcikge1xuICAgIHZhciBzdGFydGVkO1xuICAgIHN0YXJ0ZWQgPSBzdGFydGVyLnRha2UoMSkubWFwKHRydWUpLnRvUHJvcGVydHkoZmFsc2UpO1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInNraXBVbnRpbFwiLCBbc3RhcnRlcl0pLCB0aGlzLmZpbHRlcihzdGFydGVkKSk7XG4gIH07XG5cbiAgQmFjb24uRXZlbnRTdHJlYW0ucHJvdG90eXBlLnNraXBXaGlsZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcmdzLCBmLCBvaztcbiAgICBmID0gYXJndW1lbnRzWzBdLCBhcmdzID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgYXNzZXJ0T2JzZXJ2YWJsZUlzUHJvcGVydHkoZik7XG4gICAgb2sgPSBmYWxzZTtcbiAgICByZXR1cm4gY29udmVydEFyZ3NUb0Z1bmN0aW9uKHRoaXMsIGYsIGFyZ3MsIGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInNraXBXaGlsZVwiLCBbZl0pLCB0aGlzLndpdGhIYW5kbGVyKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGlmIChvayB8fCAhZXZlbnQuaGFzVmFsdWUoKSB8fCAhZihldmVudC52YWx1ZSgpKSkge1xuICAgICAgICAgIGlmIChldmVudC5oYXNWYWx1ZSgpKSB7XG4gICAgICAgICAgICBvayA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBCYWNvbi5tb3JlO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuc2xpZGluZ1dpbmRvdyA9IGZ1bmN0aW9uKG4sIG1pblZhbHVlcykge1xuICAgIGlmIChtaW5WYWx1ZXMgPT0gbnVsbCkge1xuICAgICAgbWluVmFsdWVzID0gMDtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwic2xpZGluZ1dpbmRvd1wiLCBbbiwgbWluVmFsdWVzXSksIHRoaXMuc2NhbihbXSwgKGZ1bmN0aW9uKHdpbmRvdywgdmFsdWUpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuY29uY2F0KFt2YWx1ZV0pLnNsaWNlKC1uKTtcbiAgICB9KSkuZmlsdGVyKChmdW5jdGlvbih2YWx1ZXMpIHtcbiAgICAgIHJldHVybiB2YWx1ZXMubGVuZ3RoID49IG1pblZhbHVlcztcbiAgICB9KSkpO1xuICB9O1xuXG4gIEJhY29uLnNweSA9IGZ1bmN0aW9uKHNweSkge1xuICAgIHJldHVybiBzcHlzLnB1c2goc3B5KTtcbiAgfTtcblxuICBzcHlzID0gW107XG5cbiAgcmVnaXN0ZXJPYnMgPSBmdW5jdGlvbihvYnMpIHtcbiAgICB2YXIgaiwgbGVuMSwgc3B5O1xuICAgIGlmIChzcHlzLmxlbmd0aCkge1xuICAgICAgaWYgKCFyZWdpc3Rlck9icy5ydW5uaW5nKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmVnaXN0ZXJPYnMucnVubmluZyA9IHRydWU7XG4gICAgICAgICAgZm9yIChqID0gMCwgbGVuMSA9IHNweXMubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICAgICAgICBzcHkgPSBzcHlzW2pdO1xuICAgICAgICAgICAgc3B5KG9icyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgIGRlbGV0ZSByZWdpc3Rlck9icy5ydW5uaW5nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB2b2lkIDA7XG4gIH07XG5cbiAgQmFjb24uUHJvcGVydHkucHJvdG90eXBlLnN0YXJ0V2l0aCA9IGZ1bmN0aW9uKHNlZWQpIHtcbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJzdGFydFdpdGhcIiwgW3NlZWRdKSwgdGhpcy5zY2FuKHNlZWQsIGZ1bmN0aW9uKHByZXYsIG5leHQpIHtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi5FdmVudFN0cmVhbS5wcm90b3R5cGUuc3RhcnRXaXRoID0gZnVuY3Rpb24oc2VlZCkge1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInN0YXJ0V2l0aFwiLCBbc2VlZF0pLCBCYWNvbi5vbmNlKHNlZWQpLmNvbmNhdCh0aGlzKSk7XG4gIH07XG5cbiAgQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUudGFrZVdoaWxlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGFyZ3MsIGY7XG4gICAgZiA9IGFyZ3VtZW50c1swXSwgYXJncyA9IDIgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKSA6IFtdO1xuICAgIGFzc2VydE9ic2VydmFibGVJc1Byb3BlcnR5KGYpO1xuICAgIHJldHVybiBjb252ZXJ0QXJnc1RvRnVuY3Rpb24odGhpcywgZiwgYXJncywgZnVuY3Rpb24oZikge1xuICAgICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwidGFrZVdoaWxlXCIsIFtmXSksIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmZpbHRlcihmKSkge1xuICAgICAgICAgIHJldHVybiB0aGlzLnB1c2goZXZlbnQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMucHVzaChlbmRFdmVudCgpKTtcbiAgICAgICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgICAgICB9XG4gICAgICB9KSk7XG4gICAgfSk7XG4gIH07XG5cbiAgQmFjb25bXCJ0cnlcIl0gPSBmdW5jdGlvbihmKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBCYWNvbi5vbmNlKGYodmFsdWUpKTtcbiAgICAgIH0gY2F0Y2ggKF9lcnJvcikge1xuICAgICAgICBlID0gX2Vycm9yO1xuICAgICAgICByZXR1cm4gbmV3IEJhY29uLkVycm9yKGUpO1xuICAgICAgfVxuICAgIH07XG4gIH07XG5cbiAgQmFjb24udXBkYXRlID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGksIGluaXRpYWwsIGxhdGVCaW5kRmlyc3QsIHBhdHRlcm5zO1xuICAgIGluaXRpYWwgPSBhcmd1bWVudHNbMF0sIHBhdHRlcm5zID0gMiA8PSBhcmd1bWVudHMubGVuZ3RoID8gc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpIDogW107XG4gICAgbGF0ZUJpbmRGaXJzdCA9IGZ1bmN0aW9uKGYpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3M7XG4gICAgICAgIGFyZ3MgPSAxIDw9IGFyZ3VtZW50cy5sZW5ndGggPyBzbGljZS5jYWxsKGFyZ3VtZW50cywgMCkgOiBbXTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgICByZXR1cm4gZi5hcHBseShudWxsLCBbaV0uY29uY2F0KGFyZ3MpKTtcbiAgICAgICAgfTtcbiAgICAgIH07XG4gICAgfTtcbiAgICBpID0gcGF0dGVybnMubGVuZ3RoIC0gMTtcbiAgICB3aGlsZSAoaSA+IDApIHtcbiAgICAgIGlmICghKHBhdHRlcm5zW2ldIGluc3RhbmNlb2YgRnVuY3Rpb24pKSB7XG4gICAgICAgIHBhdHRlcm5zW2ldID0gKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgICB9O1xuICAgICAgICB9KShwYXR0ZXJuc1tpXSk7XG4gICAgICB9XG4gICAgICBwYXR0ZXJuc1tpXSA9IGxhdGVCaW5kRmlyc3QocGF0dGVybnNbaV0pO1xuICAgICAgaSA9IGkgLSAyO1xuICAgIH1cbiAgICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2MoQmFjb24sIFwidXBkYXRlXCIsIFtpbml0aWFsXS5jb25jYXQoc2xpY2UuY2FsbChwYXR0ZXJucykpKSwgQmFjb24ud2hlbi5hcHBseShCYWNvbiwgcGF0dGVybnMpLnNjYW4oaW5pdGlhbCwgKGZ1bmN0aW9uKHgsIGYpIHtcbiAgICAgIHJldHVybiBmKHgpO1xuICAgIH0pKSk7XG4gIH07XG5cbiAgQmFjb24uemlwQXNBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJlYW1zO1xuICAgIHN0cmVhbXMgPSBhcmd1bWVudHNUb09ic2VydmFibGVzKGFyZ3VtZW50cyk7XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKEJhY29uLCBcInppcEFzQXJyYXlcIiwgc3RyZWFtcyksIEJhY29uLnppcFdpdGgoc3RyZWFtcywgZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgeHM7XG4gICAgICB4cyA9IDEgPD0gYXJndW1lbnRzLmxlbmd0aCA/IHNsaWNlLmNhbGwoYXJndW1lbnRzLCAwKSA6IFtdO1xuICAgICAgcmV0dXJuIHhzO1xuICAgIH0pKTtcbiAgfTtcblxuICBCYWNvbi56aXBXaXRoID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGYsIHJlZjEsIHN0cmVhbXM7XG4gICAgcmVmMSA9IGFyZ3VtZW50c1RvT2JzZXJ2YWJsZXNBbmRGdW5jdGlvbihhcmd1bWVudHMpLCBzdHJlYW1zID0gcmVmMVswXSwgZiA9IHJlZjFbMV07XG4gICAgc3RyZWFtcyA9IF8ubWFwKChmdW5jdGlvbihzKSB7XG4gICAgICByZXR1cm4gcy50b0V2ZW50U3RyZWFtKCk7XG4gICAgfSksIHN0cmVhbXMpO1xuICAgIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyhCYWNvbiwgXCJ6aXBXaXRoXCIsIFtmXS5jb25jYXQoc2xpY2UuY2FsbChzdHJlYW1zKSkpLCBCYWNvbi53aGVuKHN0cmVhbXMsIGYpKTtcbiAgfTtcblxuICBCYWNvbi5PYnNlcnZhYmxlLnByb3RvdHlwZS56aXAgPSBmdW5jdGlvbihvdGhlciwgZikge1xuICAgIGlmIChmID09IG51bGwpIHtcbiAgICAgIGYgPSBBcnJheTtcbiAgICB9XG4gICAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwiemlwXCIsIFtvdGhlcl0pLCBCYWNvbi56aXBXaXRoKFt0aGlzLCBvdGhlcl0sIGYpKTtcbiAgfTtcblxuICBcblxuQmFjb24uT2JzZXJ2YWJsZS5wcm90b3R5cGUuZmlyc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiB3aXRoRGVzYyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcImZpcnN0XCIsIFtdKSwgdGhpcy50YWtlKDEpKTtcbn07XG5cbkJhY29uLk9ic2VydmFibGUucHJvdG90eXBlLmxhc3QgPSBmdW5jdGlvbiAoKSB7XG4gIHZhciBsYXN0RXZlbnQ7XG5cbiAgcmV0dXJuIHdpdGhEZXNjKG5ldyBCYWNvbi5EZXNjKHRoaXMsIFwibGFzdFwiLCBbXSksIHRoaXMud2l0aEhhbmRsZXIoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgaWYgKGV2ZW50LmlzRW5kKCkpIHtcbiAgICAgIGlmIChsYXN0RXZlbnQpIHtcbiAgICAgICAgdGhpcy5wdXNoKGxhc3RFdmVudCk7XG4gICAgICB9XG4gICAgICB0aGlzLnB1c2goZW5kRXZlbnQoKSk7XG4gICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYXN0RXZlbnQgPSBldmVudDtcbiAgICB9XG4gIH0pKTtcbn07XG5cbkJhY29uLkV2ZW50U3RyZWFtLnByb3RvdHlwZS50aHJvdHRsZSA9IGZ1bmN0aW9uIChkZWxheSkge1xuICByZXR1cm4gd2l0aERlc2MobmV3IEJhY29uLkRlc2ModGhpcywgXCJ0aHJvdHRsZVwiLCBbZGVsYXldKSwgdGhpcy5idWZmZXJXaXRoVGltZShkZWxheSkubWFwKGZ1bmN0aW9uICh2YWx1ZXMpIHtcbiAgICByZXR1cm4gdmFsdWVzW3ZhbHVlcy5sZW5ndGggLSAxXTtcbiAgfSkpO1xufTtcblxuQmFjb24uUHJvcGVydHkucHJvdG90eXBlLnRocm90dGxlID0gZnVuY3Rpb24gKGRlbGF5KSB7XG4gIHJldHVybiB0aGlzLmRlbGF5Q2hhbmdlcyhuZXcgQmFjb24uRGVzYyh0aGlzLCBcInRocm90dGxlXCIsIFtkZWxheV0pLCBmdW5jdGlvbiAoY2hhbmdlcykge1xuICAgIHJldHVybiBjaGFuZ2VzLnRocm90dGxlKGRlbGF5KTtcbiAgfSk7XG59O1xuXG5PYnNlcnZhYmxlLnByb3RvdHlwZS5maXJzdFRvUHJvbWlzZSA9IGZ1bmN0aW9uIChQcm9taXNlQ3RyKSB7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgaWYgKHR5cGVvZiBQcm9taXNlQ3RyICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBpZiAodHlwZW9mIFByb21pc2UgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgUHJvbWlzZUN0ciA9IFByb21pc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFeGNlcHRpb24oXCJUaGVyZSBpc24ndCBkZWZhdWx0IFByb21pc2UsIHVzZSBzaGltIG9yIHBhcmFtZXRlclwiKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFByb21pc2VDdHIoZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHJldHVybiBfdGhpcy5zdWJzY3JpYmUoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBpZiAoZXZlbnQuaGFzVmFsdWUoKSkge1xuICAgICAgICByZXNvbHZlKGV2ZW50LnZhbHVlKCkpO1xuICAgICAgfVxuICAgICAgaWYgKGV2ZW50LmlzRXJyb3IoKSkge1xuICAgICAgICByZWplY3QoZXZlbnQuZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gQmFjb24ubm9Nb3JlO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbk9ic2VydmFibGUucHJvdG90eXBlLnRvUHJvbWlzZSA9IGZ1bmN0aW9uIChQcm9taXNlQ3RyKSB7XG4gIHJldHVybiB0aGlzLmxhc3QoKS5maXJzdFRvUHJvbWlzZShQcm9taXNlQ3RyKTtcbn07XG5cbmlmICgodHlwZW9mIGRlZmluZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkZWZpbmUgIT09IG51bGwpICYmIChkZWZpbmUuYW1kICE9IG51bGwpKSB7XG4gICAgZGVmaW5lKFtdLCBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBCYWNvbjtcbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIHRoaXMgIT09IFwidW5kZWZpbmVkXCIgJiYgdGhpcyAhPT0gbnVsbCkge1xuICAgICAgdGhpcy5CYWNvbiA9IEJhY29uO1xuICAgIH1cbiAgfSBlbHNlIGlmICgodHlwZW9mIG1vZHVsZSAhPT0gXCJ1bmRlZmluZWRcIiAmJiBtb2R1bGUgIT09IG51bGwpICYmIChtb2R1bGUuZXhwb3J0cyAhPSBudWxsKSkge1xuICAgIG1vZHVsZS5leHBvcnRzID0gQmFjb247XG4gICAgQmFjb24uQmFjb24gPSBCYWNvbjtcbiAgfSBlbHNlIHtcbiAgICB0aGlzLkJhY29uID0gQmFjb247XG4gIH1cblxufSkuY2FsbCh0aGlzKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2JhY29uanMvZGlzdC9CYWNvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn1cclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkgeyB0aHJvdyBuZXcgRXJyb3IoXCJkZWZpbmUgY2Fubm90IGJlIHVzZWQgaW5kaXJlY3RcIik7IH07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vYW1kLWRlZmluZS5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgR2FtZSA9IHJlcXVpcmUoJy4vZ2FtZScpO1xudmFyIFZpY3RvciA9IHJlcXVpcmUoJ3ZpY3RvcicpO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBHdWl7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5zY2FsZSA9IDIwO1xuICAgIHRoaXMucGFuVmFsdWUgPSBuZXcgVmljdG9yKDAsIDApOyAvLyBQYW4gaW4gcGl4ZWxzXG4gICAgdGhpcy5ib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpO1xuXG4gICAgdGhpcy5ib2R5LmRyYWdnYWJsZSA9IHRydWU7XG4gICAgdmFyIGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGltZy5zcmMgPSAnZGF0YTppbWFnZS9naWY7YmFzZTY0LFIwbEdPRGxoQVFBQkFBQUFBQ0g1QkFFS0FBRUFMQUFBQUFBQkFBRUFBQUlDVEFFQU93PT0nO1xuICAgIHRoaXMuYm9keS5vbmRyYWdzdGFydCA9IGV2ZW50ID0+IHtcbiAgICAgIHRoaXMubGFzdERyYWdQb3NpdGlvbiA9IG5ldyBWaWN0b3IoZXZlbnQuY2xpZW50WCwgZXZlbnQuY2xpZW50WSk7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RHJhZ0ltYWdlKGltZywgMCwgMClcbiAgICB9O1xuICAgIHRoaXMuYm9keS5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ1wiLCBldmVudCA9PiB0aGlzLnBhbihuZXcgVmljdG9yKGV2ZW50LmNsaWVudFgsIGV2ZW50LmNsaWVudFkpKSk7XG5cbiAgICB0aGlzLmh0bWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdodG1sJyk7XG4gICAgdGhpcy5jb250cm9sc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgIHRoaXMuY29udHJvbHNDb250YWluZXIuaWQgPSAnY29udHJvbHMnO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZCh0aGlzLmNvbnRyb2xzQ29udGFpbmVyKTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZXdoZWVsXCIsIGV2ZW50ID0+IHRoaXMubW9kaWZ5U2NhbGUoZXZlbnQud2hlZWxEZWx0YSkpO1xuICAgIHRoaXMuY29udHJvbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udHJvbHMnKTtcbiAgICB0aGlzLnBsYXllckNvbnRhaW5lcnMgPSBbXTtcblxuICAgIHRoaXMuY29sb3JzID0gWydyZWQnLCAnYmx1ZSddO1xuXG4gICAgdGhpcy5nYW1lID0gbmV3IEdhbWUoKTtcbiAgICB0aGlzLmdhbWUucGxheWVycy5tYXAocGxheWVyID0+IHRoaXMuYWRkUGxheWVyKHBsYXllcikpO1xuICAgIHRoaXMubmV4dFR1cm4oKTtcbiAgfVxuXG4gIHBhbihuZXdEcmFnUG9zaXRpb24pe1xuICAgIC8vIFdpZXJkIGJlaGF2aW91ciB0aGF0IHNlbmRzIDAsMCBvbiBkcmFnIGVuZFxuICAgIGlmKG5ld0RyYWdQb3NpdGlvbi54ID09PSAwKSByZXR1cm47XG4gICAgdmFyIHZlY3RvciA9IHRoaXMubGFzdERyYWdQb3NpdGlvbi5zdWJ0cmFjdChuZXdEcmFnUG9zaXRpb24pO1xuICAgIHRoaXMubGFzdERyYWdQb3NpdGlvbiA9IG5ld0RyYWdQb3NpdGlvbjtcbiAgICB0aGlzLnBhblZhbHVlLnggKz0gdmVjdG9yLng7XG4gICAgdGhpcy5wYW5WYWx1ZS55ICs9IHZlY3Rvci55O1xuICAgIHRoaXMuYm9keS5zdHlsZS50b3AgPSB0aGlzLnBhblZhbHVlLnkgKyBcInB4XCI7XG4gICAgdGhpcy5ib2R5LnN0eWxlLmxlZnQgPSB0aGlzLnBhblZhbHVlLnggKyBcInB4XCI7XG4gIH1cblxuICBtb2RpZnlTY2FsZShkZWx0YSl7XG4gICAgaWYoZGVsdGEgPiAyMCkgZGVsdGEgPSAyMDtcbiAgICBpZihkZWx0YSA8IC0yMCkgZGVsdGEgPSAtMjA7XG4gICAgdmFyIHZhbHVlID0gdGhpcy5zY2FsZSArIGRlbHRhLzc7XG4gICAgaWYodmFsdWUgPCA1KSB2YWx1ZSA9IDU7XG4gICAgaWYodmFsdWUgPiAxMDApIHZhbHVlID0gMTAwO1xuICAgIHRoaXMuc2NhbGUgPSB2YWx1ZTtcbiAgICB0aGlzLmh0bWwuc3R5bGUuZm9udFNpemUgPSBNYXRoLnJvdW5kKHZhbHVlKSArIFwicHhcIjtcbiAgfVxuXG4gIGFkZFBsYXllcihwbGF5ZXIpe1xuICAgIHZhciBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgY29udGFpbmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IHRoaXMuY29sb3JzLnBvcCgpO1xuICAgIHRoaXMuYm9keS5hcHBlbmRDaGlsZChjb250YWluZXIpO1xuICAgIHRoaXMucGxheWVyQ29udGFpbmVycy5wdXNoKGNvbnRhaW5lcik7XG4gICAgdGhpcy5hcHBlbmRQb3NpdGlvbihjb250YWluZXIsIHBsYXllci5wb3NpdGlvbilcbiAgfVxuXG4gIGFwcGVuZFBvc2l0aW9uKHBsYXllckNvbnRhaW5lciwgcG9zaXRpb24pe1xuICAgIHZhciBuZXdQb3NpdGlvbkVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgbmV3UG9zaXRpb25FbGVtZW50LmNsYXNzTmFtZSA9ICdwb3NpdGlvbic7XG4gICAgbmV3UG9zaXRpb25FbGVtZW50LnN0eWxlLnRvcCA9IHRoaXMuZ2V0UGl4ZWxQb3NpdGlvbihwb3NpdGlvbi55KTtcbiAgICBuZXdQb3NpdGlvbkVsZW1lbnQuc3R5bGUubGVmdCA9IHRoaXMuZ2V0UGl4ZWxQb3NpdGlvbihwb3NpdGlvbi54KTtcbiAgICBwbGF5ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQobmV3UG9zaXRpb25FbGVtZW50KTtcbiAgfVxuXG4gIGFwcGVuZE1vdmUocGxheWVyQ29udGFpbmVyLCBwb3NpdGlvbiwgbW92ZSl7XG4gICAgdmFyIHRvcCA9IE1hdGgubWluKHBvc2l0aW9uLnksIHBvc2l0aW9uLnkgKyBtb3ZlLnkpO1xuICAgIHZhciBsZWZ0ID0gTWF0aC5taW4ocG9zaXRpb24ueCwgcG9zaXRpb24ueCArIG1vdmUueCk7XG4gICAgdmFyIGhlaWdodCA9IE1hdGguYWJzKG1vdmUueSk7XG4gICAgdmFyIHdpZHRoID0gTWF0aC5hYnMobW92ZS54KTtcblxuICAgIHZhciBoYXNUb3BUb1RoZUxlZnQgPSAobW92ZS54ID4gMCAmJiBtb3ZlLnkgPiAwKSB8fCAobW92ZS54IDwgMCAmJiBtb3ZlLnkgPCAwKTtcbiAgICB2YXIgb3JpZW50YXRpb25DbGFzcyA9IGhhc1RvcFRvVGhlTGVmdCA/ICd0b3AtbGVmdCcgOiAndG9wLXJpZ2h0JztcblxuICAgIHZhciBtb3ZlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICBtb3ZlRWxlbWVudC5jbGFzc05hbWUgPSAnbW92ZSAnICsgb3JpZW50YXRpb25DbGFzcztcbiAgICBtb3ZlRWxlbWVudC5zdHlsZS50b3AgPSB0aGlzLmdldFBpeGVsUG9zaXRpb24odG9wKTtcbiAgICBtb3ZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gdGhpcy5nZXRQaXhlbFBvc2l0aW9uKGxlZnQpO1xuICAgIG1vdmVFbGVtZW50LnN0eWxlLndpZHRoID0gdGhpcy5nZXRQaXhlbFBvc2l0aW9uKHdpZHRoKTtcbiAgICBtb3ZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmdldFBpeGVsUG9zaXRpb24oaGVpZ2h0KTtcbiAgICBwbGF5ZXJDb250YWluZXIuYXBwZW5kQ2hpbGQobW92ZUVsZW1lbnQpO1xuICB9XG5cbiAgZ2V0UGl4ZWxQb3NpdGlvbihvcmRpbmF0ZSl7XG4gICAgcmV0dXJuIG9yZGluYXRlICsgXCJyZW1cIjtcbiAgfVxuXG4gIGRyYXdDb250cm9scyh2ZWN0b3JzKXtcbiAgICB3aGlsZSh0aGlzLmNvbnRyb2xzQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgIHRoaXMuY29udHJvbHNDb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5jb250cm9sc0NvbnRhaW5lci5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICB2ZWN0b3JzLmZvckVhY2godiA9PiB0aGlzLmNyZWF0ZUNvbnRyb2wodikpO1xuICB9XG5cbiAgY3JlYXRlQ29udHJvbCh2ZWN0b3JPYmplY3Qpe1xuICAgIHZhciB0YXJnZXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJyk7XG4gICAgdGFyZ2V0LmF0dHJpYnV0ZXMueCA9IHZlY3Rvck9iamVjdC5yZWxhdGl2ZS54O1xuICAgIHRhcmdldC5hdHRyaWJ1dGVzLnkgPSB2ZWN0b3JPYmplY3QucmVsYXRpdmUueTtcbiAgICB0YXJnZXQuc3R5bGUudG9wID0gdGhpcy5nZXRQaXhlbFBvc2l0aW9uKHZlY3Rvck9iamVjdC5hYnNvbHV0ZS55KTtcbiAgICB0YXJnZXQuc3R5bGUubGVmdCA9IHRoaXMuZ2V0UGl4ZWxQb3NpdGlvbih2ZWN0b3JPYmplY3QuYWJzb2x1dGUueCk7XG4gICAgdGFyZ2V0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICAgICAgdmFyIGF0dHJpYnV0ZXMgPSBlLnRhcmdldC5hdHRyaWJ1dGVzO1xuICAgICAgdmFyIHBsYXllckNvbnRhaW5lciA9IHRoaXMucGxheWVyQ29udGFpbmVyc1t0aGlzLmdhbWUuY3VycmVudFBsYXllckluZGV4XTtcbiAgICAgIHZhciBwb3NpdGlvbiA9IHRoaXMuZ2FtZS5tb3ZlUGxheWVyKHZlY3Rvck9iamVjdC5yZWxhdGl2ZSk7XG4gICAgICB0aGlzLmFwcGVuZFBvc2l0aW9uKHBsYXllckNvbnRhaW5lciwgcG9zaXRpb24pO1xuXG4gICAgICB0aGlzLm5leHRUdXJuKCk7XG4gICAgfSk7XG4gICAgdGhpcy5jb250cm9sc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXJnZXQpO1xuICB9XG5cbiAgbmV4dFR1cm4oKXtcbiAgICB0aGlzLmRyYXdDb250cm9scyh0aGlzLmdhbWUudmVjdG9yc0ZvckNvbnRyb2xzKTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZ3VpLmpzXG4gKiovIiwidmFyIENhciA9IHJlcXVpcmUoJy4vY2FyJyk7XG52YXIgVmljdG9yID0gcmVxdWlyZSgndmljdG9yJyk7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEdhbWV7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgdGhpcy5wbGF5ZXJzID0gW1xuICAgICAgbmV3IENhcihuZXcgVmljdG9yKDEwLDEwKSwgbmV3IFZpY3RvcigyLDApKVxuICAgIF07XG4gICAgdGhpcy5jdXJyZW50UGxheWVySW5kZXggPSAwO1xuICB9XG5cbiAgZ2V0IGN1cnJlbnRQbGF5ZXIoKXtcbiAgICByZXR1cm4gdGhpcy5wbGF5ZXJzW3RoaXMuY3VycmVudFBsYXllckluZGV4XTtcbiAgfVxuXG4gIGdldCB2ZWN0b3JzRm9yQ29udHJvbHMoKXtcbiAgICB2YXIgcGxheWVyID0gdGhpcy5jdXJyZW50UGxheWVyO1xuICAgIHZhciB2ZWN0b3JzRm9yQ29udHJvbHMgPSBbXTtcbiAgICBmb3IodmFyIHggPSAtMTsgeCA8PSAxOyB4Kyspe1xuICAgICAgZm9yKHZhciB5ID0gLTE7IHkgPD0gMTsgeSsrKXtcbiAgICAgICAgdmFyIHBsYXllclJlbGF0aXZlVmVjdG9yID0gbmV3IFZpY3Rvcih4LHkpLmNsb25lKCkuYWRkKHBsYXllci5kaXJlY3Rpb24pO1xuICAgICAgICB2YXIgYWJzb2x1dGVWZWN0b3IgPSBwbGF5ZXJSZWxhdGl2ZVZlY3Rvci5jbG9uZSgpLmFkZChwbGF5ZXIucG9zaXRpb24pO1xuICAgICAgICBpZih0aGlzLmlzUG9zc2libGVQb3NpdGlvbihhYnNvbHV0ZVZlY3RvcikpIHtcbiAgICAgICAgICB2ZWN0b3JzRm9yQ29udHJvbHMucHVzaCh7XG4gICAgICAgICAgICByZWxhdGl2ZTogcGxheWVyUmVsYXRpdmVWZWN0b3IsXG4gICAgICAgICAgICBhYnNvbHV0ZTogYWJzb2x1dGVWZWN0b3JcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdmVjdG9yc0ZvckNvbnRyb2xzO1xuICB9XG5cbiAgbW92ZVBsYXllcih2ZWN0b3Ipe1xuICAgIHRoaXMuY3VycmVudFBsYXllci5tb3ZlKHZlY3Rvcik7XG4gICAgdmFyIHBvc2l0aW9uID0gdGhpcy5jdXJyZW50UGxheWVyLnBvc2l0aW9uO1xuICAgIHRoaXMuc2V0TmV4dFBsYXllcigpO1xuICAgIHJldHVybiBwb3NpdGlvbjtcbiAgfVxuXG4gIHNldE5leHRQbGF5ZXIoKXtcbiAgICB0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCsrO1xuICAgIGlmKHRoaXMuY3VycmVudFBsYXllckluZGV4ID09PSB0aGlzLnBsYXllcnMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRQbGF5ZXJJbmRleCA9IDA7XG4gICAgfVxuICB9XG5cbiAgaXNQb3NzaWJsZVBvc2l0aW9uKHYpe1xuICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9nYW1lLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2FyIHtcbiAgY29uc3RydWN0b3IocG9zaXRpb24sIGRpcmVjdGlvbil7XG4gICAgdGhpcy5wb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB9XG5cbiAgbW92ZSh2ZWN0b3IpIHtcbiAgICBpZighdGhpcy5pc1ZhbGlkTW92ZSh0aGlzLmRpcmVjdGlvbiwgdmVjdG9yKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucG9zaXRpb24uYWRkKHZlY3Rvcik7XG4gICAgdGhpcy5kaXJlY3Rpb24gPSB2ZWN0b3I7XG4gIH1cblxuICBpc1ZhbGlkTW92ZShkaXJlY3Rpb24sIG1vdmUpIHtcbiAgICByZXR1cm4gZGlyZWN0aW9uLmFic0Rpc3RhbmNlWChtb3ZlKSA8PSAxICYmXG4gICAgICAgICAgIGRpcmVjdGlvbi5hYnNEaXN0YW5jZVkobW92ZSkgPD0gMTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY2FyLmpzXG4gKiovIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gVmljdG9yO1xuXG4vKipcbiAqICMgVmljdG9yIC0gQSBKYXZhU2NyaXB0IDJEIHZlY3RvciBjbGFzcyB3aXRoIG1ldGhvZHMgZm9yIGNvbW1vbiB2ZWN0b3Igb3BlcmF0aW9uc1xuICovXG5cbi8qKlxuICogQ29uc3RydWN0b3IuIFdpbGwgYWxzbyB3b3JrIHdpdGhvdXQgdGhlIGBuZXdgIGtleXdvcmRcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gVmljdG9yKDQyLCAxMzM3KTtcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0geCBWYWx1ZSBvZiB0aGUgeCBheGlzXG4gKiBAcGFyYW0ge051bWJlcn0geSBWYWx1ZSBvZiB0aGUgeSBheGlzXG4gKiBAcmV0dXJuIHtWaWN0b3J9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBWaWN0b3IgKHgsIHkpIHtcblx0aWYgKCEodGhpcyBpbnN0YW5jZW9mIFZpY3RvcikpIHtcblx0XHRyZXR1cm4gbmV3IFZpY3Rvcih4LCB5KTtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGUgWCBheGlzXG5cdCAqXG5cdCAqICMjIyBFeGFtcGxlczpcblx0ICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yLmZyb21BcnJheSg0MiwgMjEpO1xuXHQgKlxuXHQgKiAgICAgdmVjLng7XG5cdCAqICAgICAvLyA9PiA0MlxuXHQgKlxuXHQgKiBAYXBpIHB1YmxpY1xuXHQgKi9cblx0dGhpcy54ID0geCB8fCAwO1xuXG5cdC8qKlxuXHQgKiBUaGUgWSBheGlzXG5cdCAqXG5cdCAqICMjIyBFeGFtcGxlczpcblx0ICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yLmZyb21BcnJheSg0MiwgMjEpO1xuXHQgKlxuXHQgKiAgICAgdmVjLnk7XG5cdCAqICAgICAvLyA9PiAyMVxuXHQgKlxuXHQgKiBAYXBpIHB1YmxpY1xuXHQgKi9cblx0dGhpcy55ID0geSB8fCAwO1xufTtcblxuLyoqXG4gKiAjIFN0YXRpY1xuICovXG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBpbnN0YW5jZSBmcm9tIGFuIGFycmF5XG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBWaWN0b3IuZnJvbUFycmF5KFs0MiwgMjFdKTtcbiAqXG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDo0MiwgeToyMVxuICpcbiAqIEBuYW1lIFZpY3Rvci5mcm9tQXJyYXlcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IEFycmF5IHdpdGggdGhlIHggYW5kIHkgdmFsdWVzIGF0IGluZGV4IDAgYW5kIDEgcmVzcGVjdGl2ZWx5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IFRoZSBuZXcgaW5zdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5mcm9tQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7XG5cdHJldHVybiBuZXcgVmljdG9yKGFyclswXSB8fCAwLCBhcnJbMV0gfHwgMCk7XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgaW5zdGFuY2UgZnJvbSBhbiBvYmplY3RcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IFZpY3Rvci5mcm9tT2JqZWN0KHsgeDogNDIsIHk6IDIxIH0pO1xuICpcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjQyLCB5OjIxXG4gKlxuICogQG5hbWUgVmljdG9yLmZyb21PYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmogT2JqZWN0IHdpdGggdGhlIHZhbHVlcyBmb3IgeCBhbmQgeVxuICogQHJldHVybiB7VmljdG9yfSBUaGUgbmV3IGluc3RhbmNlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IuZnJvbU9iamVjdCA9IGZ1bmN0aW9uIChvYmopIHtcblx0cmV0dXJuIG5ldyBWaWN0b3Iob2JqLnggfHwgMCwgb2JqLnkgfHwgMCk7XG59O1xuXG4vKipcbiAqICMgTWFuaXB1bGF0aW9uXG4gKlxuICogVGhlc2UgZnVuY3Rpb25zIGFyZSBjaGFpbmFibGUuXG4gKi9cblxuLyoqXG4gKiBBZGRzIGFub3RoZXIgdmVjdG9yJ3MgWCBheGlzIHRvIHRoaXMgb25lXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMzApO1xuICpcbiAqICAgICB2ZWMxLmFkZFgodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MzAsIHk6MTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gYWRkIHRvIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZFggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueCArPSB2ZWMueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgYW5vdGhlciB2ZWN0b3IncyBZIGF4aXMgdG8gdGhpcyBvbmVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuYWRkWSh2ZWMyKTtcbiAqICAgICB2ZWMxLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMCwgeTo0MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvciB5b3Ugd2FudCB0byBhZGQgdG8gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkWSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy55ICs9IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkcyBhbm90aGVyIHZlY3RvciB0byB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDMwKTtcbiAqXG4gKiAgICAgdmVjMS5hZGQodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MzAsIHk6NDBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gYWRkIHRvIHRoaXMgb25lXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54ICs9IHZlYy54O1xuXHR0aGlzLnkgKz0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBzY2FsYXIgdG8gYm90aCB2ZWN0b3IgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxLCAyKTtcbiAqXG4gKiAgICAgdmVjLmFkZFNjYWxhcigyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OiAzLCB5OiA0XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGRTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCArPSBzY2FsYXI7XG5cdHRoaXMueSArPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGRzIHRoZSBnaXZlbiBzY2FsYXIgdG8gdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxLCAyKTtcbiAqXG4gKiAgICAgdmVjLmFkZFNjYWxhclgoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMywgeTogMlxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBhZGRcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuYWRkU2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54ICs9IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEFkZHMgdGhlIGdpdmVuIHNjYWxhciB0byB0aGUgWSBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEsIDIpO1xuICpcbiAqICAgICB2ZWMuYWRkU2NhbGFyWSgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OiAxLCB5OiA0XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IHNjYWxhciBUaGUgc2NhbGFyIHRvIGFkZFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hZGRTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnkgKz0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBYIGF4aXMgb2YgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuc3VidHJhY3RYKHZlYzIpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjgwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RYID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnggLT0gdmVjLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdGhlIFkgYXhpcyBvZiBhbm90aGVyIHZlY3RvciBmcm9tIHRoaXMgb25lXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAsIDMwKTtcbiAqXG4gKiAgICAgdmVjMS5zdWJ0cmFjdFkodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjIwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IHN1YnRyYWN0IGZyb20gdGhpcyBvbmVcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RZID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnkgLT0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgYW5vdGhlciB2ZWN0b3IgZnJvbSB0aGlzIG9uZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAzMCk7XG4gKlxuICogICAgIHZlYzEuc3VidHJhY3QodmVjMik7XG4gKiAgICAgdmVjMS50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6ODAsIHk6MjBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgc3VidHJhY3QgZnJvbSB0aGlzIG9uZVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5zdWJ0cmFjdCA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dGhpcy54IC09IHZlYy54O1xuXHR0aGlzLnkgLT0gdmVjLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBTdWJ0cmFjdHMgdGhlIGdpdmVuIHNjYWxhciBmcm9tIGJvdGggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYy5zdWJ0cmFjdFNjYWxhcigyMCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogODAsIHk6IDE4MFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBzY2FsYXIgVGhlIHNjYWxhciB0byBzdWJ0cmFjdFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5zdWJ0cmFjdFNjYWxhciA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0dGhpcy54IC09IHNjYWxhcjtcblx0dGhpcy55IC09IHNjYWxhcjtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFN1YnRyYWN0cyB0aGUgZ2l2ZW4gc2NhbGFyIGZyb20gdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYy5zdWJ0cmFjdFNjYWxhclgoMjApO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6IDgwLCB5OiAyMDBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3RcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RTY2FsYXJYID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggLT0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogU3VidHJhY3RzIHRoZSBnaXZlbiBzY2FsYXIgZnJvbSB0aGUgWSBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgMjAwKTtcbiAqXG4gKiAgICAgdmVjLnN1YnRyYWN0U2NhbGFyWSgyMCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDogMTAwLCB5OiAxODBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gc2NhbGFyIFRoZSBzY2FsYXIgdG8gc3VidHJhY3RcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuc3VidHJhY3RTY2FsYXJZID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnkgLT0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWCBheGlzIGJ5IHRoZSB4IGNvbXBvbmVudCBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDApO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlWCh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVYID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnggLz0gdmVjdG9yLng7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIHRoZSBZIGF4aXMgYnkgdGhlIHkgY29tcG9uZW50IG9mIGdpdmVuIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMCwgMik7XG4gKlxuICogICAgIHZlYy5kaXZpZGVZKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgb3RoZXIgdmVjdG9yIHlvdSB3YW50IGRpdmlkZSBieVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXZpZGVZID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnkgLz0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIGJvdGggdmVjdG9yIGF4aXMgYnkgYSBheGlzIHZhbHVlcyBvZiBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDIpO1xuICpcbiAqICAgICB2ZWMuZGl2aWRlKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6MjVcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSB2ZWN0b3IgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZSA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54IC89IHZlY3Rvci54O1xuXHR0aGlzLnkgLz0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBEaXZpZGVzIGJvdGggdmVjdG9yIGF4aXMgYnkgdGhlIGdpdmVuIHNjYWxhciB2YWx1ZVxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmRpdmlkZVNjYWxhcigyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjUwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZVNjYWxhciA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0aWYgKHNjYWxhciAhPT0gMCkge1xuXHRcdHRoaXMueCAvPSBzY2FsYXI7XG5cdFx0dGhpcy55IC89IHNjYWxhcjtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnggPSAwO1xuXHRcdHRoaXMueSA9IDA7XG5cdH1cblxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWCBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5kaXZpZGVTY2FsYXJYKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gVGhlIHNjYWxhciB0byBkaXZpZGUgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGl2aWRlU2NhbGFyWCA9IGZ1bmN0aW9uIChzY2FsYXIpIHtcblx0aWYgKHNjYWxhciAhPT0gMCkge1xuXHRcdHRoaXMueCAvPSBzY2FsYXI7XG5cdH0gZWxzZSB7XG5cdFx0dGhpcy54ID0gMDtcblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogRGl2aWRlcyB0aGUgWSBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5kaXZpZGVTY2FsYXJZKDIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjI1XG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gZGl2aWRlIGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmRpdmlkZVNjYWxhclkgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdGlmIChzY2FsYXIgIT09IDApIHtcblx0XHR0aGlzLnkgLz0gc2NhbGFyO1xuXHR9IGVsc2Uge1xuXHRcdHRoaXMueSA9IDA7XG5cdH1cblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgdGhlIFggYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmludmVydFgoKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4Oi0xMDAsIHk6NTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmludmVydFggPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMueCAqPSAtMTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgdGhlIFkgYXhpc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLmludmVydFkoKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTotNTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmludmVydFkgPSBmdW5jdGlvbiAoKSB7XG5cdHRoaXMueSAqPSAtMTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIEludmVydHMgYm90aCBheGlzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMuaW52ZXJ0KCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDotMTAwLCB5Oi01MFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuaW52ZXJ0ID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLmludmVydFgoKTtcblx0dGhpcy5pbnZlcnRZKCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHRoZSBYIGF4aXMgYnkgWCBjb21wb25lbnQgb2YgZ2l2ZW4gdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyLCAwKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5WCh2ZWMyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwMCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHZlY3RvciB0byBtdWx0aXBseSB0aGUgYXhpcyB3aXRoXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5WCA9IGZ1bmN0aW9uICh2ZWN0b3IpIHtcblx0dGhpcy54ICo9IHZlY3Rvci54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWSBheGlzIGJ5IFkgY29tcG9uZW50IG9mIGdpdmVuIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMCwgMik7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVgodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IHRoZSBheGlzIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlZID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnkgKj0gdmVjdG9yLnk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIGJvdGggdmVjdG9yIGF4aXMgYnkgdmFsdWVzIGZyb20gYSBnaXZlbiB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIsIDIpO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHkodmVjMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgdmVjdG9yIHRvIG11bHRpcGx5IGJ5XG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm11bHRpcGx5ID0gZnVuY3Rpb24gKHZlY3Rvcikge1xuXHR0aGlzLnggKj0gdmVjdG9yLng7XG5cdHRoaXMueSAqPSB2ZWN0b3IueTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIE11bHRpcGxpZXMgYm90aCB2ZWN0b3IgYXhpcyBieSB0aGUgZ2l2ZW4gc2NhbGFyIHZhbHVlXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMubXVsdGlwbHlTY2FsYXIoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoyMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgYnlcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlTY2FsYXIgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueCAqPSBzY2FsYXI7XG5cdHRoaXMueSAqPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBNdWx0aXBsaWVzIHRoZSBYIGF4aXMgYnkgdGhlIGdpdmVuIHNjYWxhclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLm11bHRpcGx5U2NhbGFyWCgyKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwMCwgeTo1MFxuICpcbiAqIEBwYXJhbSB7TnVtYmVyfSBUaGUgc2NhbGFyIHRvIG11bHRpcGx5IHRoZSBheGlzIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubXVsdGlwbHlTY2FsYXJYID0gZnVuY3Rpb24gKHNjYWxhcikge1xuXHR0aGlzLnggKj0gc2NhbGFyO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogTXVsdGlwbGllcyB0aGUgWSBheGlzIGJ5IHRoZSBnaXZlbiBzY2FsYXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5tdWx0aXBseVNjYWxhclkoMik7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6MTAwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IFRoZSBzY2FsYXIgdG8gbXVsdGlwbHkgdGhlIGF4aXMgd2l0aFxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5tdWx0aXBseVNjYWxhclkgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG5cdHRoaXMueSAqPSBzY2FsYXI7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBOb3JtYWxpemVcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLm5vcm1hbGl6ZSA9IGZ1bmN0aW9uICgpIHtcblx0dmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoKCk7XG5cblx0aWYgKGxlbmd0aCA9PT0gMCkge1xuXHRcdHRoaXMueCA9IDE7XG5cdFx0dGhpcy55ID0gMDtcblx0fSBlbHNlIHtcblx0XHR0aGlzLmRpdmlkZShWaWN0b3IobGVuZ3RoLCBsZW5ndGgpKTtcblx0fVxuXHRyZXR1cm4gdGhpcztcbn07XG5cblZpY3Rvci5wcm90b3R5cGUubm9ybSA9IFZpY3Rvci5wcm90b3R5cGUubm9ybWFsaXplO1xuXG4vKipcbiAqIElmIHRoZSBhYnNvbHV0ZSB2ZWN0b3IgYXhpcyBpcyBncmVhdGVyIHRoYW4gYG1heGAsIG11bHRpcGxpZXMgdGhlIGF4aXMgYnkgYGZhY3RvcmBcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5saW1pdCg4MCwgMC45KTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjkwLCB5OjUwXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IG1heCBUaGUgbWF4aW11bSB2YWx1ZSBmb3IgYm90aCB4IGFuZCB5IGF4aXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBmYWN0b3IgRmFjdG9yIGJ5IHdoaWNoIHRoZSBheGlzIGFyZSB0byBiZSBtdWx0aXBsaWVkIHdpdGhcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubGltaXQgPSBmdW5jdGlvbiAobWF4LCBmYWN0b3IpIHtcblx0aWYgKE1hdGguYWJzKHRoaXMueCkgPiBtYXgpeyB0aGlzLnggKj0gZmFjdG9yOyB9XG5cdGlmIChNYXRoLmFicyh0aGlzLnkpID4gbWF4KXsgdGhpcy55ICo9IGZhY3RvcjsgfVxuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9taXplcyBib3RoIHZlY3RvciBheGlzIHdpdGggYSB2YWx1ZSBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZShuZXcgVmljdG9yKDUwLCA2MCksIG5ldyBWaWN0b3IoNzAsIDgwYCkpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NjcsIHk6NzNcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZSA9IGZ1bmN0aW9uICh0b3BMZWZ0LCBib3R0b21SaWdodCkge1xuXHR0aGlzLnJhbmRvbWl6ZVgodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXHR0aGlzLnJhbmRvbWl6ZVkodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSYW5kb21pemVzIHRoZSB5IGF4aXMgd2l0aCBhIHZhbHVlIGJldHdlZW4gMiB2ZWN0b3JzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMucmFuZG9taXplWChuZXcgVmljdG9yKDUwLCA2MCksIG5ldyBWaWN0b3IoNzAsIDgwYCkpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTUsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdG9wTGVmdCBmaXJzdCB2ZWN0b3JcbiAqIEBwYXJhbSB7VmljdG9yfSBib3R0b21SaWdodCBzZWNvbmQgdmVjdG9yXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnJhbmRvbWl6ZVggPSBmdW5jdGlvbiAodG9wTGVmdCwgYm90dG9tUmlnaHQpIHtcblx0dmFyIG1pbiA9IE1hdGgubWluKHRvcExlZnQueCwgYm90dG9tUmlnaHQueCk7XG5cdHZhciBtYXggPSBNYXRoLm1heCh0b3BMZWZ0LngsIGJvdHRvbVJpZ2h0LngpO1xuXHR0aGlzLnggPSByYW5kb20obWluLCBtYXgpO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmFuZG9taXplcyB0aGUgeSBheGlzIHdpdGggYSB2YWx1ZSBiZXR3ZWVuIDIgdmVjdG9yc1xuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqXG4gKiAgICAgdmVjLnJhbmRvbWl6ZVkobmV3IFZpY3Rvcig1MCwgNjApLCBuZXcgVmljdG9yKDcwLCA4MGApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTo2NlxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB0b3BMZWZ0IGZpcnN0IHZlY3RvclxuICogQHBhcmFtIHtWaWN0b3J9IGJvdHRvbVJpZ2h0IHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUucmFuZG9taXplWSA9IGZ1bmN0aW9uICh0b3BMZWZ0LCBib3R0b21SaWdodCkge1xuXHR2YXIgbWluID0gTWF0aC5taW4odG9wTGVmdC55LCBib3R0b21SaWdodC55KTtcblx0dmFyIG1heCA9IE1hdGgubWF4KHRvcExlZnQueSwgYm90dG9tUmlnaHQueSk7XG5cdHRoaXMueSA9IHJhbmRvbShtaW4sIG1heCk7XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSYW5kb21seSByYW5kb21pemVzIGVpdGhlciBheGlzIGJldHdlZW4gMiB2ZWN0b3JzXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICpcbiAqICAgICB2ZWMucmFuZG9taXplQW55KG5ldyBWaWN0b3IoNTAsIDYwKSwgbmV3IFZpY3Rvcig3MCwgODApKTtcbiAqICAgICB2ZWMudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjEwMCwgeTo3N1xuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB0b3BMZWZ0IGZpcnN0IHZlY3RvclxuICogQHBhcmFtIHtWaWN0b3J9IGJvdHRvbVJpZ2h0IHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUucmFuZG9taXplQW55ID0gZnVuY3Rpb24gKHRvcExlZnQsIGJvdHRvbVJpZ2h0KSB7XG5cdGlmICghISBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkpKSB7XG5cdFx0dGhpcy5yYW5kb21pemVYKHRvcExlZnQsIGJvdHRvbVJpZ2h0KTtcblx0fSBlbHNlIHtcblx0XHR0aGlzLnJhbmRvbWl6ZVkodG9wTGVmdCwgYm90dG9tUmlnaHQpO1xuXHR9XG5cdHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSb3VuZHMgYm90aCBheGlzIHRvIGFuIGludGVnZXIgdmFsdWVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLjIsIDUwLjkpO1xuICpcbiAqICAgICB2ZWMudW5mbG9hdCgpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjUxXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS51bmZsb2F0ID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLnggPSBNYXRoLnJvdW5kKHRoaXMueCk7XG5cdHRoaXMueSA9IE1hdGgucm91bmQodGhpcy55KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJvdW5kcyBib3RoIGF4aXMgdG8gYSBjZXJ0YWluIHByZWNpc2lvblxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMDAuMiwgNTAuOSk7XG4gKlxuICogICAgIHZlYy51bmZsb2F0KCk7XG4gKiAgICAgdmVjLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMDAsIHk6NTFcbiAqXG4gKiBAcGFyYW0ge051bWJlcn0gUHJlY2lzaW9uIChkZWZhdWx0OiA4KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS50b0ZpeGVkID0gZnVuY3Rpb24gKHByZWNpc2lvbikge1xuXHRpZiAodHlwZW9mIHByZWNpc2lvbiA9PT0gJ3VuZGVmaW5lZCcpIHsgcHJlY2lzaW9uID0gODsgfVxuXHR0aGlzLnggPSB0aGlzLngudG9GaXhlZChwcmVjaXNpb24pO1xuXHR0aGlzLnkgPSB0aGlzLnkudG9GaXhlZChwcmVjaXNpb24pO1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIG9mIHRoZSBYIGF4aXMgdG93YXJkcyBhbm90aGVyIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYzEubWl4WCh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTUwLCB5OjEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXhYID0gZnVuY3Rpb24gKHZlYywgYW1vdW50KSB7XG5cdGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdGFtb3VudCA9IDAuNTtcblx0fVxuXG5cdHRoaXMueCA9ICgxIC0gYW1vdW50KSAqIHRoaXMueCArIGFtb3VudCAqIHZlYy54O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIG9mIHRoZSBZIGF4aXMgdG93YXJkcyBhbm90aGVyIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCAxMDApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDIwMCk7XG4gKlxuICogICAgIHZlYzEubWl4WSh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAwLCB5OjE1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXhZID0gZnVuY3Rpb24gKHZlYywgYW1vdW50KSB7XG5cdGlmICh0eXBlb2YgYW1vdW50ID09PSAndW5kZWZpbmVkJykge1xuXHRcdGFtb3VudCA9IDAuNTtcblx0fVxuXG5cdHRoaXMueSA9ICgxIC0gYW1vdW50KSAqIHRoaXMueSArIGFtb3VudCAqIHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUGVyZm9ybXMgYSBsaW5lYXIgYmxlbmQgLyBpbnRlcnBvbGF0aW9uIHRvd2FyZHMgYW5vdGhlciB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCAyMDApO1xuICpcbiAqICAgICB2ZWMxLm1peCh2ZWMyLCAwLjUpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTUwLCB5OjE1MFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIG90aGVyIHZlY3RvclxuICogQHBhcmFtIHtOdW1iZXJ9IGFtb3VudCBUaGUgYmxlbmQgYW1vdW50IChvcHRpb25hbCwgZGVmYXVsdDogMC41KVxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5taXggPSBmdW5jdGlvbiAodmVjLCBhbW91bnQpIHtcblx0dGhpcy5taXhYKHZlYywgYW1vdW50KTtcblx0dGhpcy5taXhZKHZlYywgYW1vdW50KTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqICMgUHJvZHVjdHNcbiAqL1xuXG4vKipcbiAqIENyZWF0ZXMgYSBjbG9uZSBvZiB0aGlzIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAsIDEwKTtcbiAqICAgICB2YXIgdmVjMiA9IHZlYzEuY2xvbmUoKTtcbiAqXG4gKiAgICAgdmVjMi50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6MTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IEEgY2xvbmUgb2YgdGhlIHZlY3RvclxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIG5ldyBWaWN0b3IodGhpcy54LCB0aGlzLnkpO1xufTtcblxuLyoqXG4gKiBDb3BpZXMgYW5vdGhlciB2ZWN0b3IncyBYIGNvbXBvbmVudCBpbiB0byBpdHMgb3duXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMCwgMjApO1xuICogICAgIHZhciB2ZWMyID0gdmVjMS5jb3B5WCh2ZWMxKTtcbiAqXG4gKiAgICAgdmVjMi50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MjAsIHk6MTBcbiAqXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmNvcHlYID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLnggPSB2ZWMueDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENvcGllcyBhbm90aGVyIHZlY3RvcidzIFkgY29tcG9uZW50IGluIHRvIGl0cyBvd25cbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAyMCk7XG4gKiAgICAgdmFyIHZlYzIgPSB2ZWMxLmNvcHlZKHZlYzEpO1xuICpcbiAqICAgICB2ZWMyLnRvU3RyaW5nKCk7XG4gKiAgICAgLy8gPT4geDoxMCwgeToyMFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuY29weVkgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHRoaXMueSA9IHZlYy55O1xuXHRyZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQ29waWVzIGFub3RoZXIgdmVjdG9yJ3MgWCBhbmQgWSBjb21wb25lbnRzIGluIHRvIGl0cyBvd25cbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwLCAxMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwLCAyMCk7XG4gKiAgICAgdmFyIHZlYzIgPSB2ZWMxLmNvcHkodmVjMSk7XG4gKlxuICogICAgIHZlYzIudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjIwLCB5OjIwXG4gKlxuICogQHJldHVybiB7VmljdG9yfSBgdGhpc2AgZm9yIGNoYWluaW5nIGNhcGFiaWxpdGllc1xuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gKHZlYykge1xuXHR0aGlzLmNvcHlYKHZlYyk7XG5cdHRoaXMuY29weVkodmVjKTtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIHZlY3RvciB0byB6ZXJvICgwLDApXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMCwgMTApO1xuICpcdFx0IHZhcjEuemVybygpO1xuICogICAgIHZlYzEudG9TdHJpbmcoKTtcbiAqICAgICAvLyA9PiB4OjAsIHk6MFxuICpcbiAqIEByZXR1cm4ge1ZpY3Rvcn0gYHRoaXNgIGZvciBjaGFpbmluZyBjYXBhYmlsaXRpZXNcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuemVybyA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy54ID0gdGhpcy55ID0gMDtcblx0cmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZG90KHZlYzIpO1xuICogICAgIC8vID0+IDIzMDAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBEb3QgcHJvZHVjdFxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kb3QgPSBmdW5jdGlvbiAodmVjMikge1xuXHRyZXR1cm4gdGhpcy54ICogdmVjMi54ICsgdGhpcy55ICogdmVjMi55O1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5jcm9zcyA9IGZ1bmN0aW9uICh2ZWMyKSB7XG5cdHJldHVybiAodGhpcy54ICogdmVjMi55ICkgLSAodGhpcy55ICogdmVjMi54ICk7XG59O1xuXG4vKipcbiAqIFByb2plY3RzIGEgdmVjdG9yIG9udG8gYW5vdGhlciB2ZWN0b3IsIHNldHRpbmcgaXRzZWxmIHRvIHRoZSByZXN1bHQuXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwMCwgMCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDEwMCwgMTAwKTtcbiAqXG4gKiAgICAgdmVjLnByb2plY3RPbnRvKHZlYzIpO1xuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6NTAsIHk6NTBcbiAqXG4gKiBAcGFyYW0ge1ZpY3Rvcn0gdmVjdG9yIFRoZSBvdGhlciB2ZWN0b3IgeW91IHdhbnQgdG8gcHJvamVjdCB0aGlzIHZlY3RvciBvbnRvXG4gKiBAcmV0dXJuIHtWaWN0b3J9IGB0aGlzYCBmb3IgY2hhaW5pbmcgY2FwYWJpbGl0aWVzXG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnByb2plY3RPbnRvID0gZnVuY3Rpb24gKHZlYzIpIHtcbiAgICB2YXIgY29lZmYgPSAoICh0aGlzLnggKiB2ZWMyLngpKyh0aGlzLnkgKiB2ZWMyLnkpICkgLyAoKHZlYzIueCp2ZWMyLngpKyh2ZWMyLnkqdmVjMi55KSk7XG4gICAgdGhpcy54ID0gY29lZmYgKiB2ZWMyLng7XG4gICAgdGhpcy55ID0gY29lZmYgKiB2ZWMyLnk7XG4gICAgcmV0dXJuIHRoaXM7XG59O1xuXG5cblZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gTWF0aC5hdGFuMih0aGlzLnksIHRoaXMueCk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLmhvcml6b250YWxBbmdsZURlZyA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHJhZGlhbjJkZWdyZWVzKHRoaXMuaG9yaXpvbnRhbEFuZ2xlKCkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS52ZXJ0aWNhbEFuZ2xlID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gTWF0aC5hdGFuMih0aGlzLngsIHRoaXMueSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnZlcnRpY2FsQW5nbGVEZWcgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiByYWRpYW4yZGVncmVlcyh0aGlzLnZlcnRpY2FsQW5nbGUoKSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLmFuZ2xlID0gVmljdG9yLnByb3RvdHlwZS5ob3Jpem9udGFsQW5nbGU7XG5WaWN0b3IucHJvdG90eXBlLmFuZ2xlRGVnID0gVmljdG9yLnByb3RvdHlwZS5ob3Jpem9udGFsQW5nbGVEZWc7XG5WaWN0b3IucHJvdG90eXBlLmRpcmVjdGlvbiA9IFZpY3Rvci5wcm90b3R5cGUuaG9yaXpvbnRhbEFuZ2xlO1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZSA9IGZ1bmN0aW9uIChhbmdsZSkge1xuXHR2YXIgbnggPSAodGhpcy54ICogTWF0aC5jb3MoYW5nbGUpKSAtICh0aGlzLnkgKiBNYXRoLnNpbihhbmdsZSkpO1xuXHR2YXIgbnkgPSAodGhpcy54ICogTWF0aC5zaW4oYW5nbGUpKSArICh0aGlzLnkgKiBNYXRoLmNvcyhhbmdsZSkpO1xuXG5cdHRoaXMueCA9IG54O1xuXHR0aGlzLnkgPSBueTtcblxuXHRyZXR1cm4gdGhpcztcbn07XG5cblZpY3Rvci5wcm90b3R5cGUucm90YXRlRGVnID0gZnVuY3Rpb24gKGFuZ2xlKSB7XG5cdGFuZ2xlID0gZGVncmVlczJyYWRpYW4oYW5nbGUpO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGUoYW5nbGUpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVUbyA9IGZ1bmN0aW9uKHJvdGF0aW9uKSB7XG5cdHJldHVybiB0aGlzLnJvdGF0ZShyb3RhdGlvbi10aGlzLmFuZ2xlKCkpO1xufTtcblxuVmljdG9yLnByb3RvdHlwZS5yb3RhdGVUb0RlZyA9IGZ1bmN0aW9uKHJvdGF0aW9uKSB7XG5cdHJvdGF0aW9uID0gZGVncmVlczJyYWRpYW4ocm90YXRpb24pO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGVUbyhyb3RhdGlvbik7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZUJ5ID0gZnVuY3Rpb24gKHJvdGF0aW9uKSB7XG5cdHZhciBhbmdsZSA9IHRoaXMuYW5nbGUoKSArIHJvdGF0aW9uO1xuXG5cdHJldHVybiB0aGlzLnJvdGF0ZShhbmdsZSk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLnJvdGF0ZUJ5RGVnID0gZnVuY3Rpb24gKHJvdGF0aW9uKSB7XG5cdHJvdGF0aW9uID0gZGVncmVlczJyYWRpYW4ocm90YXRpb24pO1xuXHRyZXR1cm4gdGhpcy5yb3RhdGVCeShyb3RhdGlvbik7XG59O1xuXG4vKipcbiAqIENhbGN1bGF0ZXMgdGhlIGRpc3RhbmNlIG9mIHRoZSBYIGF4aXMgYmV0d2VlbiB0aGlzIHZlY3RvciBhbmQgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDIwMCwgNjApO1xuICpcbiAqICAgICB2ZWMxLmRpc3RhbmNlWCh2ZWMyKTtcbiAqICAgICAvLyA9PiAtMTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBEaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5kaXN0YW5jZVggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiB0aGlzLnggLSB2ZWMueDtcbn07XG5cbi8qKlxuICogU2FtZSBhcyBgZGlzdGFuY2VYKClgIGJ1dCBhbHdheXMgcmV0dXJucyBhbiBhYnNvbHV0ZSBudW1iZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDYwKTtcbiAqXG4gKiAgICAgdmVjMS5hYnNEaXN0YW5jZVgodmVjMik7XG4gKiAgICAgLy8gPT4gMTAwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBBYnNvbHV0ZSBkaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hYnNEaXN0YW5jZVggPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLmFicyh0aGlzLmRpc3RhbmNlWCh2ZWMpKTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZGlzdGFuY2Ugb2YgdGhlIFkgYXhpcyBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VZKHZlYzIpO1xuICogICAgIC8vID0+IC0xMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2VZID0gZnVuY3Rpb24gKHZlYykge1xuXHRyZXR1cm4gdGhpcy55IC0gdmVjLnk7XG59O1xuXG4vKipcbiAqIFNhbWUgYXMgYGRpc3RhbmNlWSgpYCBidXQgYWx3YXlzIHJldHVybnMgYW4gYWJzb2x1dGUgbnVtYmVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VZKHZlYzIpO1xuICogICAgIC8vID0+IDEwXG4gKlxuICogQHBhcmFtIHtWaWN0b3J9IHZlY3RvciBUaGUgc2Vjb25kIHZlY3RvclxuICogQHJldHVybiB7TnVtYmVyfSBBYnNvbHV0ZSBkaXN0YW5jZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5hYnNEaXN0YW5jZVkgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLmFicyh0aGlzLmRpc3RhbmNlWSh2ZWMpKTtcbn07XG5cbi8qKlxuICogQ2FsY3VsYXRlcyB0aGUgZXVjbGlkZWFuIGRpc3RhbmNlIGJldHdlZW4gdGhpcyB2ZWN0b3IgYW5kIGFub3RoZXJcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYzEgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZhciB2ZWMyID0gbmV3IFZpY3RvcigyMDAsIDYwKTtcbiAqXG4gKiAgICAgdmVjMS5kaXN0YW5jZSh2ZWMyKTtcbiAqICAgICAvLyA9PiAxMDAuNDk4NzU2MjExMjA4OVxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2UgPSBmdW5jdGlvbiAodmVjKSB7XG5cdHJldHVybiBNYXRoLnNxcnQodGhpcy5kaXN0YW5jZVNxKHZlYykpO1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBzcXVhcmVkIGV1Y2xpZGVhbiBkaXN0YW5jZSBiZXR3ZWVuIHRoaXMgdmVjdG9yIGFuZCBhbm90aGVyXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMxID0gbmV3IFZpY3RvcigxMDAsIDUwKTtcbiAqICAgICB2YXIgdmVjMiA9IG5ldyBWaWN0b3IoMjAwLCA2MCk7XG4gKlxuICogICAgIHZlYzEuZGlzdGFuY2VTcSh2ZWMyKTtcbiAqICAgICAvLyA9PiAxMDEwMFxuICpcbiAqIEBwYXJhbSB7VmljdG9yfSB2ZWN0b3IgVGhlIHNlY29uZCB2ZWN0b3JcbiAqIEByZXR1cm4ge051bWJlcn0gRGlzdGFuY2VcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuZGlzdGFuY2VTcSA9IGZ1bmN0aW9uICh2ZWMpIHtcblx0dmFyIGR4ID0gdGhpcy5kaXN0YW5jZVgodmVjKSxcblx0XHRkeSA9IHRoaXMuZGlzdGFuY2VZKHZlYyk7XG5cblx0cmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xufTtcblxuLyoqXG4gKiBDYWxjdWxhdGVzIHRoZSBsZW5ndGggb3IgbWFnbml0dWRlIG9mIHRoZSB2ZWN0b3JcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5sZW5ndGgoKTtcbiAqICAgICAvLyA9PiAxMTEuODAzMzk4ODc0OTg5NDhcbiAqXG4gKiBAcmV0dXJuIHtOdW1iZXJ9IExlbmd0aCAvIE1hZ25pdHVkZVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBNYXRoLnNxcnQodGhpcy5sZW5ndGhTcSgpKTtcbn07XG5cbi8qKlxuICogU3F1YXJlZCBsZW5ndGggLyBtYWduaXR1ZGVcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKlxuICogICAgIHZlYy5sZW5ndGhTcSgpO1xuICogICAgIC8vID0+IDEyNTAwXG4gKlxuICogQHJldHVybiB7TnVtYmVyfSBMZW5ndGggLyBNYWduaXR1ZGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUubGVuZ3RoU3EgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG59O1xuXG5WaWN0b3IucHJvdG90eXBlLm1hZ25pdHVkZSA9IFZpY3Rvci5wcm90b3R5cGUubGVuZ3RoO1xuXG4vKipcbiAqIFJldHVybnMgYSB0cnVlIGlmIHZlY3RvciBpcyAoMCwgMClcbiAqXG4gKiAjIyMgRXhhbXBsZXM6XG4gKiAgICAgdmFyIHZlYyA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmVjLnplcm8oKTtcbiAqXG4gKiAgICAgLy8gPT4gdHJ1ZVxuICpcbiAqIEByZXR1cm4ge0Jvb2xlYW59XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLmlzWmVybyA9IGZ1bmN0aW9uKCkge1xuXHRyZXR1cm4gdGhpcy54ID09PSAwICYmIHRoaXMueSA9PT0gMDtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhIHRydWUgaWYgdGhpcyB2ZWN0b3IgaXMgdGhlIHNhbWUgYXMgYW5vdGhlclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjMSA9IG5ldyBWaWN0b3IoMTAwLCA1MCk7XG4gKiAgICAgdmFyIHZlYzIgPSBuZXcgVmljdG9yKDEwMCwgNTApO1xuICogICAgIHZlYzEuaXNFcXVhbFRvKHZlYzIpO1xuICpcbiAqICAgICAvLyA9PiB0cnVlXG4gKlxuICogQHJldHVybiB7Qm9vbGVhbn1cbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUuaXNFcXVhbFRvID0gZnVuY3Rpb24odmVjMikge1xuXHRyZXR1cm4gdGhpcy54ID09PSB2ZWMyLnggJiYgdGhpcy55ID09PSB2ZWMyLnk7XG59O1xuXG4vKipcbiAqICMgVXRpbGl0eSBNZXRob2RzXG4gKi9cblxuLyoqXG4gKiBSZXR1cm5zIGFuIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwLCAyMCk7XG4gKlxuICogICAgIHZlYy50b1N0cmluZygpO1xuICogICAgIC8vID0+IHg6MTAsIHk6MjBcbiAqXG4gKiBAcmV0dXJuIHtTdHJpbmd9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5WaWN0b3IucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuXHRyZXR1cm4gJ3g6JyArIHRoaXMueCArICcsIHk6JyArIHRoaXMueTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSByZXByZXNlbnRhdGlvbiBvZiB0aGUgdmVjdG9yXG4gKlxuICogIyMjIEV4YW1wbGVzOlxuICogICAgIHZhciB2ZWMgPSBuZXcgVmljdG9yKDEwLCAyMCk7XG4gKlxuICogICAgIHZlYy50b0FycmF5KCk7XG4gKiAgICAgLy8gPT4gWzEwLCAyMF1cbiAqXG4gKiBAcmV0dXJuIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cblZpY3Rvci5wcm90b3R5cGUudG9BcnJheSA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIFsgdGhpcy54LCB0aGlzLnkgXTtcbn07XG5cbi8qKlxuICogUmV0dXJucyBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24gb2YgdGhlIHZlY3RvclxuICpcbiAqICMjIyBFeGFtcGxlczpcbiAqICAgICB2YXIgdmVjID0gbmV3IFZpY3RvcigxMCwgMjApO1xuICpcbiAqICAgICB2ZWMudG9PYmplY3QoKTtcbiAqICAgICAvLyA9PiB7IHg6IDEwLCB5OiAyMCB9XG4gKlxuICogQHJldHVybiB7T2JqZWN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuVmljdG9yLnByb3RvdHlwZS50b09iamVjdCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIHsgeDogdGhpcy54LCB5OiB0aGlzLnkgfTtcbn07XG5cblxudmFyIGRlZ3JlZXMgPSAxODAgLyBNYXRoLlBJO1xuXG5mdW5jdGlvbiByYW5kb20gKG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSArIG1pbik7XG59XG5cbmZ1bmN0aW9uIHJhZGlhbjJkZWdyZWVzIChyYWQpIHtcblx0cmV0dXJuIHJhZCAqIGRlZ3JlZXM7XG59XG5cbmZ1bmN0aW9uIGRlZ3JlZXMycmFkaWFuIChkZWcpIHtcblx0cmV0dXJuIGRlZyAvIGRlZ3JlZXM7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi92aWN0b3IvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9