/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script-d1308f0d8a08f862";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "http://localhost:35729/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~app"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../sun/src/js/body-class.js":
/*!***********************************!*\
  !*** ../sun/src/js/body-class.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ "../sun/src/js/cookie.js");


const bodyClass = {

  bodyObject: null,

  init: function () {
    bodyClass.bodyObject = document.querySelector('body');
    bodyClass.addOrToggleBodyClass('#menu-toggle', false);
    bodyClass.addOrToggleBodyClass('.theme-selector', true);
    bodyClass.addOrToggleBodyClass('.set-theme', true);
    bodyClass.retrieveCookieOrHash();

    window.setTimeout(function () {
      window.scrollTo(window.pageXOffset, window.pageYOffset + 2);
      window.scrollTo(window.pageXOffset, window.pageYOffset - 2);
      const hash = bodyClass.getHashFromURL();
      if (hash) {
        document.querySelector('#' + hash).scrollIntoView({
          behavior: 'smooth',
          block: 'start' });
      }
    }, 300);
    this.addBasicBodyClassListeners();
  },

  addBasicBodyClassListeners: function () {
    document.addEventListener('DOMContentLoaded', function (event) {
      bodyClass.bodyObject.classList.add('body-loaded');
      if ('ontouchstart' in document.documentElement) {
        bodyClass.bodyObject.classList.add('touch');
      } else {
        bodyClass.bodyObject.classList.add('no-touch');
      }
      bodyClass.addRocketMode();
    });
    window.addEventListener('beforeunload', function () {
      bodyClass.bodyObject.classList.add('body-unloaded');
    });
  },

  retrieveCookieOrHash: function () {
    let hash = bodyClass.getHashFromURL();
    let classes = '';
    if (hash === 'reset') {
      _cookie_js__WEBPACK_IMPORTED_MODULE_0__["myCookie"].eraseCookie('bodyClassClasses');
      hash = '';
    } else if (this.runClickForElement(hash)) {} else {
      classes = _cookie_js__WEBPACK_IMPORTED_MODULE_0__["myCookie"].getCookie('bodyClassClasses');
      classes = String(classes);
      if (classes.length > 0) {
        const classArray = classes.split(' ');
        for (let i = 0; i < classArray.length; i++) {
          this.runClickForElement(classArray[i]);
        }
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.runClickForElement('theme-moon');
      }
    }
  },

  runClickForElement: function (hash) {
    hash = hash.trim();
    if (hash.length) {
      const obj = document.getElementById(hash);
      if (obj && obj.classList.contains('theme-selector')) {
        this.removeBodyClassesBasedOnAttribute(obj);
        bodyClass.bodyObject.classList.add(hash);
        return true;
      }
    }
    return false;
  },

  addOrToggleBodyClass: function (objSelector, keep) {
    document.querySelectorAll(objSelector).forEach(function ($eachObject) {
      $eachObject.addEventListener('click', function (event) {
        bodyClass.actionBodyClassChange($eachObject, event, keep);
        return false;
      });
    });
  },

  actionBodyClassChange: function ($eachObject, event, keep) {
    event.preventDefault();

    bodyClass.removeBodyClassesBasedOnAttribute($eachObject);

    let toggleClass = '';
    let id = '';
    if ($eachObject.hasAttribute('data-add-class')) {
      toggleClass = $eachObject.getAttribute('data-add-class');
    } else {
      toggleClass = $eachObject.getAttribute('id');
      id = toggleClass;
    }
    if ($eachObject.hasAttribute('data-toggle')) {
      bodyClass.bodyObject.classList.toggle(toggleClass);
    } else {
      bodyClass.bodyObject.classList.add(toggleClass);
    }
    if (toggleClass === 'theme-rocket') {}

    if (keep) {
      _cookie_js__WEBPACK_IMPORTED_MODULE_0__["myCookie"].setCookie('bodyClassClasses', bodyClass.bodyObject.className, 14);

      if (id) {
        let hash = bodyClass.getHashFromString(id);
        if (hash.length) {
          hash = hash.replace('#', '');
          window.location.hash = '#' + hash;
        }
      }
    }
  },

  removeBodyClassesBasedOnAttribute: function ($object) {
    if ($object.hasAttribute('data-remove-class')) {
      const string = $object.getAttribute('data-remove-class');
      const classes = bodyClass.getClassesFromList(string);
      for (let i = 0, len = classes.length; i < len; i++) {
        const value = classes[i];
        bodyClass.bodyObject.classList.remove(value);
      }
    }
  },

  getClassesFromList: function (string) {
    const array = string.split(',');
    const newArray = [];
    for (let i = 0, len = array.length; i < len; i++) {
      const value = array[i].trim();
      if (value) {
        newArray.push(value);
      }
    }
    return newArray;
  },

  getHashFromURL: function () {
    const string = window.location.hash;
    return bodyClass.getHashFromString(string);
  },

  getHashFromString: function (string) {
    string = String(string);
    return bodyClass.retrieveHasSignFromString(string);
  },

  retrieveHasSignFromString: function (string) {
    return string.replace('#', '');
  },

  addRocketMode: function () {
    const div = document.createElement('div');
    div.style.backgroundImage = 'url(' + bodyClass.bodyObject.getAttribute('data-bg-image') + ')';
    div.id = 'BackgroundImage';
    const temp = bodyClass.bodyObject.firstChild;
    bodyClass.bodyObject.insertBefore(div, temp);
  }

};

bodyClass.init();

/***/ }),

/***/ "../sun/src/js/collapsible-menu.js":
/*!*****************************************!*\
  !*** ../sun/src/js/collapsible-menu.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {



const CollapsibleLists = function () {
  function apply(doNotRecurse) {
    [].forEach.call(document.getElementsByTagName('ul'), node => {
      if (node.classList.contains('collapsibleList')) {
        applyTo(node, true);

        if (!doNotRecurse) {
          [].forEach.call(node.getElementsByTagName('ul'), subnode => {
            subnode.classList.add('collapsibleList');
          });
        }
      }
    });
  }

  function applyTo(node, doNotRecurse) {
    [].forEach.call(node.getElementsByTagName('li'), li => {
      if (!doNotRecurse || node === li.parentNode) {
        if (li.getElementsByTagName('ul').length > 0) {
          li.style.userSelect = 'none';
          li.style.MozUserSelect = 'none';
          li.style.msUserSelect = 'none';
          li.style.WebkitUserSelect = 'none';
          const span = document.createElement('span');
          span.addEventListener('click', handleClick.bind(null, li));
          span.innerHTML = '<i class="open">+</i><i class="closed">–</i>';
          li.insertBefore(span, li.firstChild);
          if (li.classList.contains('section') || li.classList.contains('current')) {
            toggle(li);
          }
          toggle(li);
        }
      }
    });
  }

  function handleClick(node, e) {
    let li = e.target;
    while (li.nodeName !== 'LI') {
      li = li.parentNode;
    }

    if (li === node) {
      toggle(node);
    }
  }

  function toggle(node) {
    const open = node.classList.contains('collapsibleListClosed');
    const uls = node.getElementsByTagName('ul');

    [].forEach.call(uls, ul => {
      let li = ul;
      while (li.nodeName !== 'LI') {
        li = li.parentNode;
      }

      if (li === node) {
        ul.style.display = open ? 'block' : 'none';
      }
    });

    node.classList.remove('collapsibleListOpen');
    node.classList.remove('collapsibleListClosed');

    if (uls.length > 0) {
      node.classList.add('collapsibleList' + (open ? 'Open' : 'Closed'));
    }
  }

  return { apply, applyTo };
}();

CollapsibleLists.apply();

/***/ }),

/***/ "../sun/src/js/cookie.js":
/*!*******************************!*\
  !*** ../sun/src/js/cookie.js ***!
  \*******************************/
/*! exports provided: myCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "myCookie", function() { return myCookie; });
const myCookie = {

  setCookie: function (name, value, days) {
    var expires = '';
    if (typeof days === 'undefined') {
      days = 14;
    }
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/';
  },

  getCookie: function (name) {
    var nameEQ = name + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  },

  eraseCookie: function (name) {
    myCookie.setCookie(name, null, 0);
  }
};



/***/ }),

/***/ "../sun/src/js/footer-is-visible.js":
/*!******************************************!*\
  !*** ../sun/src/js/footer-is-visible.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {


const footerIsVisible = {

  init: function () {
    const target = document.querySelector('#footer');

    var intersectionObserverOptions = {
      root: null,
      rootMargin: '150px',
      threshold: 1.0
    };

    var observer = new window.IntersectionObserver(onIntersection, intersectionObserverOptions);

    observer.observe(target);

    function onIntersection(entries) {
      entries.forEach(entry => {
        document.querySelector('body').classList.toggle('footer-visible', entry.intersectionRatio >= 1);
      });
    }
  }
};

footerIsVisible.init();

/***/ }),

/***/ "../sun/src/js/form.js":
/*!*****************************!*\
  !*** ../sun/src/js/form.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var formfields = document.querySelectorAll('input, select, textarea');
for (var J = formfields.length - 1; J >= 0; --J) {
  formfields[J].addEventListener('change', adjustStyling, false);
  formfields[J].addEventListener('keyup', adjustStyling, false);
  formfields[J].addEventListener('focus', adjustStyling, false);
  formfields[J].addEventListener('blur', adjustStyling, false);
  formfields[J].addEventListener('mousedown', adjustStyling, false);

  var evt = document.createEvent('HTMLEvents');
  evt.initEvent('change', false, true);
  formfields[J].dispatchEvent(evt);
}

function adjustStyling(zEvent) {
  var inpVal = zEvent.target.value;
  if (inpVal && inpVal.replace(/^\s+|\s+$/g, '')) {
    zEvent.target.classList.remove('no-value');
  } else {
    zEvent.target.classList.add('no-value');
  }
}

/***/ }),

/***/ "../sun/src/js/hide-menu-bar.js":
/*!**************************************!*\
  !*** ../sun/src/js/hide-menu-bar.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const scrollManager = {

  minScrollForAction: 2,

  minScrollDown: 100,

  lastScroll: 0,

  didScroll: 0,

  bodyObject: null,

  timeOutFx: null,

  justScrolledFxtFx: null,

  scrolledUpClass: 'scrolled-up',

  scrolledDownClass: 'scrolled-down',

  init: function () {
    scrollManager.bodyObject = document.querySelector('body');
    this.scrollListener();
    this.scrollUpOrDown();
    this.lastScroll = window.scrollY;
    window.setTimeout(function () {
      window.scrollTo(window.pageXOffset, window.scrollY - this.minScrollForAction - 1);
    }, 50);
  },

  scrollListener: function () {
    window.addEventListener('scroll', function () {
      window.clearTimeout(scrollManager.timeOutFx);
      window.clearTimeout(scrollManager.justScrolledFx);
      if (window.scrollY === 0) {
        scrollManager.bodyObject.classList.remove('past-header');
      } else {
        scrollManager.bodyObject.classList.add('past-header');
      }
      scrollManager.didScroll = true;
      scrollManager.scrollUpOrDown();
    });
  },

  scrollUpOrDown: function () {
    scrollManager.timeOutFx = window.setTimeout(function () {
      if (scrollManager.didScroll) {
        scrollManager.didScroll = false;
        const newScroll = window.scrollY;

        if (Math.abs(scrollManager.lastScroll - newScroll) <= scrollManager.minScrollForAction) {
          return;
        }
        if (newScroll > scrollManager.lastScroll + scrollManager.minScrollDown) {
          scrollManager.bodyObject.classList.remove(scrollManager.scrolledUpClass);
          scrollManager.bodyObject.classList.add(scrollManager.scrolledDownClass);
        } else if (newScroll < scrollManager.lastScroll) {
          scrollManager.bodyObject.classList.add(scrollManager.scrolledUpClass);
          scrollManager.bodyObject.classList.remove(scrollManager.scrolledDownClass);
          scrollManager.bodyObject.classList.add('just-scrolled');
          this.justScrolledFx = window.setTimeout(function () {
            scrollManager.bodyObject.classList.remove('just-scrolled');
          }, 3000);
        } else {}
        scrollManager.lastScroll = newScroll;
      }
    }, 200);
  }

};

scrollManager.init();

/***/ }),

/***/ "../sun/src/js/images.js":
/*!*******************************!*\
  !*** ../sun/src/js/images.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {


const imageWrapper = () => {
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }

  const images = document.querySelectorAll('.typography img');

  for (let i = 0; i < images.length; i++) {
    const dv = document.createElement('div');
    dv.setAttribute('class', 'image-container');
    const img = images[i];
    wrap(img, dv);
  }
};

imageWrapper();

/***/ }),

/***/ "../sun/src/js/mouse-over-logo.js":
/*!****************************************!*\
  !*** ../sun/src/js/mouse-over-logo.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const showRocketMode = {
  init: function () {
    const toggleClassOnHover = e => {
      document.querySelector('body').classList.toggle('mouse-over-logo', e.type === 'mouseenter');
    };
    const logo = document.getElementById('logo');
    logo.addEventListener('mouseenter', toggleClassOnHover);
    logo.addEventListener('mouseleave', toggleClassOnHover);
  }
};

showRocketMode.init();

/***/ }),

/***/ "../sun/src/js/toc.js":
/*!****************************!*\
  !*** ../sun/src/js/toc.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {


const toc = () => {
  const body = document.querySelector('body');

  const headings = document.querySelectorAll('.typography h1, .typography h2');

  if (headings.length > 4) {
    body.classList.add('has-toc');
    body.classList.add('toc-off');
    for (let i = 0; i < headings.length; i++) {
      const el = headings[i];
      el.id = 'toc-' + i;
      el.addEventListener('click', function (e) {
        body.classList.toggle('toc-on');
        const hash = this.id;
        if (hash) {
          document.querySelector('#' + hash).scrollIntoView();
          const scrolledY = window.scrollY;
          if (scrolledY) {
            window.scroll(0, scrolledY - 75);
          }
        }
        return false;
      }, false);
    }
  } else {}
};

toc();

/***/ }),

/***/ "../sun/src/main.js":
/*!**************************!*\
  !*** ../sun/src/main.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/cookie */ "../sun/src/js/cookie.js");
/* harmony import */ var _js_body_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/body-class */ "../sun/src/js/body-class.js");
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/collapsible-menu */ "../sun/src/js/collapsible-menu.js");
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_hide_menu_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/hide-menu-bar */ "../sun/src/js/hide-menu-bar.js");
/* harmony import */ var _js_hide_menu_bar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_hide_menu_bar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _js_footer_is_visible__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/footer-is-visible */ "../sun/src/js/footer-is-visible.js");
/* harmony import */ var _js_footer_is_visible__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_footer_is_visible__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/form */ "../sun/src/js/form.js");
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_form__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/mouse-over-logo */ "../sun/src/js/mouse-over-logo.js");
/* harmony import */ var _js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/images */ "../sun/src/js/images.js");
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_images__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _js_toc__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/toc */ "../sun/src/js/toc.js");
/* harmony import */ var _js_toc__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_toc__WEBPACK_IMPORTED_MODULE_8__);











/***/ }),

/***/ "../sun/src/style.scss":
/*!*****************************!*\
  !*** ../sun/src/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../sswebpack_engine_only/node_modules/mini-css-extract-plugin/dist/loader.js!../../sswebpack_engine_only/node_modules/css-loader??ref--4-2!../../sswebpack_engine_only/node_modules/postcss-loader/src??postcss!../../sswebpack_engine_only/node_modules/resolve-url-loader!../../sswebpack_engine_only/node_modules/sass-loader/dist/cjs.js??ref--4-5!./style.scss */ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js?!../sun/src/style.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../sswebpack_engine_only/node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js?!../sun/src/style.scss":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-2!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader!./node_modules/sass-loader/dist/cjs.js??ref--4-5!../sun/src/style.scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ 0:
/*!******************************************************!*\
  !*** multi ../sun/src/main.js ../sun/src/style.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /var/www/ss4/sunnysideup.co.nz/themes/sun/src/main.js */"../sun/src/main.js");
module.exports = __webpack_require__(/*! /var/www/ss4/sunnysideup.co.nz/themes/sun/src/style.scss */"../sun/src/style.scss");


/***/ })

/******/ });
//# sourceMappingURL=app.js.map