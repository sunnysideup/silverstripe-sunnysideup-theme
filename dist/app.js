/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../sun/src/js/body-class.js":
/*!***********************************!*\
  !*** ../sun/src/js/body-class.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ "../sun/src/js/cookie.js");

var bodyClass = {
  bodyObject: null,
  init: function init() {
    bodyClass.bodyObject = document.querySelector('body');
    bodyClass.addOrToggleBodyClass('#menu-toggle', false); // console.log(bodyClass.isHomePage())
    // console.log(bodyClass.hasFragment())

    if (bodyClass.isHomePage() === true && bodyClass.hasFragment() === false) {
      // console.log('opening menu')
      document.querySelector('#menu-toggle').click();
    }

    bodyClass.addOrToggleBodyClass('.theme-selector', true);
    bodyClass.addOrToggleBodyClass('.set-theme', true);
    bodyClass.retrieveCookieOrHash(); // expose scrolled behaviour

    window.setTimeout(function () {
      window.scrollTo(window.pageXOffset, window.pageYOffset + 2);
      window.scrollTo(window.pageXOffset, window.pageYOffset - 2);
      var hash = bodyClass.getHashFromURL();

      if (hash && document.getElementById(hash)) {
        document.querySelector('#' + hash).scrollIntoView({
          behavior: 'smooth',
          // smooth scroll
          block: 'start' // the upper border of the element will be aligned at the top of the visible part of the window of the scrollable area.

        });
      }
    }, 300);
    this.addBasicBodyClassListeners();
  },
  addBasicBodyClassListeners: function addBasicBodyClassListeners() {
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
  retrieveCookieOrHash: function retrieveCookieOrHash() {
    var hash = bodyClass.getHashFromURL();
    var classes = '';

    if (hash === 'reset') {
      _cookie_js__WEBPACK_IMPORTED_MODULE_0__.myCookie.eraseCookie('bodyClassClasses');
      hash = ''; // console.log(reset);
    } else if (this.runClickForElement(hash)) {// do nothing
    } else {
      classes = _cookie_js__WEBPACK_IMPORTED_MODULE_0__.myCookie.getCookie('bodyClassClasses');
      classes = String(classes);

      if (classes.length > 0) {
        var classArray = classes.split(' ');

        for (var i = 0; i < classArray.length; i++) {
          this.runClickForElement(classArray[i]);
        }
      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.runClickForElement('theme-moon');
      }
    }
  },
  runClickForElement: function runClickForElement(hash) {
    hash = hash.trim();

    if (hash.length) {
      var obj = document.getElementById(hash);

      if (obj && obj.classList.contains('theme-selector')) {
        this.removeBodyClassesBasedOnAttribute(obj);
        bodyClass.bodyObject.classList.add(hash);
        return true;
      }
    }

    return false;
  },
  addOrToggleBodyClass: function addOrToggleBodyClass(objSelector, keep) {
    document.querySelectorAll(objSelector).forEach(function ($eachObject) {
      $eachObject.addEventListener('click', function (event) {
        bodyClass.actionBodyClassChange($eachObject, event, keep);
        return false;
      });
    });
  },
  actionBodyClassChange: function actionBodyClassChange($eachObject, event, keep) {
    event.preventDefault();
    bodyClass.removeBodyClassesBasedOnAttribute($eachObject);
    var toggleClass = '';
    var id = '';

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

    if (toggleClass === 'theme-rocket') {// window.alert('Welcome to our experimental fly-around-the-world rocket(🚀) theme. ')
    }

    if (keep) {
      _cookie_js__WEBPACK_IMPORTED_MODULE_0__.myCookie.setCookie('bodyClassClasses', bodyClass.bodyObject.className, 14);

      if (id) {
        var hash = bodyClass.getHashFromString(id);

        if (hash.length) {
          hash = hash.replace('#', '');
          window.location.hash = '#' + hash;
        }
      }
    }
  },
  removeBodyClassesBasedOnAttribute: function removeBodyClassesBasedOnAttribute($object) {
    if ($object.hasAttribute('data-remove-class')) {
      var string = $object.getAttribute('data-remove-class');
      var classes = bodyClass.getClassesFromList(string);

      for (var i = 0, len = classes.length; i < len; i++) {
        var value = classes[i];
        bodyClass.bodyObject.classList.remove(value);
      }
    }
  },
  getClassesFromList: function getClassesFromList(string) {
    var array = string.split(',');
    var newArray = [];

    for (var i = 0, len = array.length; i < len; i++) {
      var value = array[i].trim();

      if (value) {
        newArray.push(value);
      }
    }

    return newArray;
  },
  getHashFromURL: function getHashFromURL() {
    var string = window.location.hash;
    return bodyClass.getHashFromString(string);
  },
  getHashFromString: function getHashFromString(string) {
    string = String(string);
    return bodyClass.retrieveHasSignFromString(string);
  },
  retrieveHasSignFromString: function retrieveHasSignFromString(string) {
    return string.replace('#', '');
  },
  addRocketMode: function addRocketMode() {
    var div = document.createElement('div');
    var shadow = bodyClass.bodyObject.getAttribute('data-shadow-over-logo');
    var shadowColour = '';

    if (shadow === 'dark') {
      shadowColour = 'linear-gradient(258deg, #00000030 30%, transparent 60%), ';
    } else if (shadow === 'light') {
      shadowColour = 'linear-gradient(258deg, #FFFFFF30 30%, transparent 60%), ';
    }

    div.style.backgroundImage = shadowColour + 'url(' + bodyClass.bodyObject.getAttribute('data-bg-image') + ')';
    div.id = 'BackgroundImage';
    var temp = bodyClass.bodyObject.firstChild;
    bodyClass.bodyObject.insertBefore(div, temp);
  },
  isHomePage: function isHomePage() {
    return window.location.pathname === '/';
  },
  hasFragment: function hasFragment() {
    return window.location.hash !== '';
  }
};
bodyClass.init();

/***/ }),

/***/ "../sun/src/js/collapsible-menu.js":
/*!*****************************************!*\
  !*** ../sun/src/js/collapsible-menu.js ***!
  \*****************************************/
/***/ (function() {

/*

CollapsibleLists.js

An object allowing lists to dynamically expand and collapse

Created by Kate Morley - http://code.iamkate.com/ - and released under the terms
of the CC0 1.0 Universal legal code:

http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/
var CollapsibleLists = function () {
  // Makes all lists with the class 'collapsibleList' collapsible. The
  // parameter is:
  //
  // doNotRecurse - true if sub-lists should not be made collapsible
  function apply(doNotRecurse) {
    [].forEach.call(document.getElementsByTagName('ul'), function (node) {
      if (node.classList.contains('collapsibleList')) {
        applyTo(node, true);

        if (!doNotRecurse) {
          [].forEach.call(node.getElementsByTagName('ul'), function (subnode) {
            subnode.classList.add('collapsibleList');
          });
        }
      }
    });
  } // Makes the specified list collapsible. The parameters are:
  //
  // node         - the list element
  // doNotRecurse - true if sub-lists should not be made collapsible


  function applyTo(node, doNotRecurse) {
    [].forEach.call(node.getElementsByTagName('li'), function (li) {
      if (!doNotRecurse || node === li.parentNode) {
        li.style.userSelect = 'none';
        li.style.MozUserSelect = 'none';
        li.style.msUserSelect = 'none';
        li.style.WebkitUserSelect = 'none';
        var ul = li.getElementsByTagName('ul');

        if (ul.length > 0) {
          var span = document.createElement('span');
          span.classList.add('open-close');
          span.addEventListener('click', handleClick.bind(null, li));
          span.innerHTML = '<i class="open">&nbsp;</i><i class="closed">↰</i>'; // we need to toggle all of them, some twice

          if (li.classList.contains('section') || li.classList.contains('current')) {
            toggle(li);
          }

          toggle(li);
          li.insertBefore(span, ul[0]);
        }
      }
    });
  } // Handles a click. The parameter is:
  //
  // node - the node for which clicks are being handled


  function handleClick(node, e) {
    var li = e.target;

    while (li.nodeName !== 'LI') {
      li = li.parentNode;
    }

    if (li === node) {
      toggle(node);
    }
  } // Opens or closes the unordered list elements directly within the
  // specified node. The parameter is:
  //
  // node - the node containing the unordered list elements


  function toggle(node) {
    var open = node.classList.contains('collapsibleListClosed');
    var uls = node.getElementsByTagName('ul');
    [].forEach.call(uls, function (ul) {
      var li = ul;

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

  return {
    apply: apply,
    applyTo: applyTo
  };
}();

CollapsibleLists.apply();

/***/ }),

/***/ "../sun/src/js/cookie.js":
/*!*******************************!*\
  !*** ../sun/src/js/cookie.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "myCookie": function() { return /* binding */ myCookie; }
/* harmony export */ });
var myCookie = {
  setCookie: function setCookie(name, value, days) {
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
  getCookie: function getCookie(name) {
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
  eraseCookie: function eraseCookie(name) {
    myCookie.setCookie(name, null, 0);
  }
};


/***/ }),

/***/ "../sun/src/js/footer-is-visible.js":
/*!******************************************!*\
  !*** ../sun/src/js/footer-is-visible.js ***!
  \******************************************/
/***/ (function() {

var footerIsVisible = {
  init: function init() {
    // this is the target which is observed
    var target = document.querySelector('#footer'); // configure the intersection observer instance

    var intersectionObserverOptions = {
      root: null,
      rootMargin: '150px',
      threshold: 1.0
    };
    var observer = new window.IntersectionObserver(onIntersection, intersectionObserverOptions); // provide the observer with a target

    observer.observe(target);

    function onIntersection(entries) {
      entries.forEach(function (entry) {
        // console.clear()
        // console.log(entry.intersectionRatio)
        document.querySelector('body').classList.toggle('footer-visible', entry.intersectionRatio >= 1); // Are we in viewport?
        // if (entry.intersectionRatio > 1) {
        // Stop watching
        // observer.unobserve(entry.target);
        // }
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
/***/ (function() {

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
/***/ (function() {

var scrollManager = {
  minScrollForAction: 2,
  minScrollDown: 100,
  lastScroll: 0,
  didScroll: 0,
  bodyObject: null,
  timeOutFx: null,
  justScrolledFx: null,
  scrolledUpClass: 'scrolled-up',
  scrolledDownClass: 'scrolled-down',
  init: function init() {
    scrollManager.bodyObject = document.querySelector('body');
    this.scrollListener();
    this.scrollUpOrDown();
    this.lastScroll = window.scrollY;
    window.setTimeout(function () {
      window.scrollTo(window.pageXOffset, window.scrollY - this.minScrollForAction - 1);
    }, 50);
  },
  scrollListener: function scrollListener() {
    window.addEventListener('scroll', function () {
      window.clearTimeout(scrollManager.timeOutFx);
      window.clearTimeout(scrollManager.justScrolledFx);

      if (window.scrollY < 10) {
        scrollManager.bodyObject.classList.remove('past-header');
      } else {
        scrollManager.bodyObject.classList.add('past-header');
      }

      scrollManager.didScroll = true;
      scrollManager.scrollUpOrDown();
    });
  },
  scrollUpOrDown: function scrollUpOrDown() {
    scrollManager.timeOutFx = window.setTimeout(function () {
      // console.log('running')
      if (scrollManager.didScroll) {
        // reset so that we know each call is a real call.
        scrollManager.didScroll = false;
        var newScroll = window.scrollY; // console.log('last scroll: ' + scrollManager.lastScroll)
        // console.log('new scroll: ' + newScroll)

        if (Math.abs(scrollManager.lastScroll - newScroll) <= scrollManager.minScrollForAction) {
          // console.log('too little')
          return;
        }

        if (newScroll > scrollManager.lastScroll + scrollManager.minScrollDown) {
          // console.log('down')
          // Scroll Down
          scrollManager.bodyObject.classList.remove(scrollManager.scrolledUpClass);
          scrollManager.bodyObject.classList.add(scrollManager.scrolledDownClass);
        } else if (newScroll < scrollManager.lastScroll) {
          // console.log('up')
          // Scroll Up
          scrollManager.bodyObject.classList.add(scrollManager.scrolledUpClass);
          scrollManager.bodyObject.classList.remove(scrollManager.scrolledDownClass);
          scrollManager.bodyObject.classList.add('just-scrolled');
          this.justScrolledFx = window.setTimeout(function () {
            scrollManager.bodyObject.classList.remove('just-scrolled');
          }, 3000);
        } else {// console.log('do nothing')
        }

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
/***/ (function() {

var imageWrapper = function imageWrapper() {
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  } // create the container div
  // get all divs


  var images = document.querySelectorAll('.typography img'); // get the body element
  // apply class to container div
  // find out all those divs having class C

  for (var i = 0; i < images.length; i++) {
    var dv = document.createElement('div');
    dv.setAttribute('class', 'image-container');
    var img = images[i];
    wrap(img, dv);
  }
};

imageWrapper();

/***/ }),

/***/ "../sun/src/js/mouse-over-logo.js":
/*!****************************************!*\
  !*** ../sun/src/js/mouse-over-logo.js ***!
  \****************************************/
/***/ (function() {

var showRocketMode = {
  init: function init() {
    var toggleClassOnHover = function toggleClassOnHover(e) {
      document.querySelector('body').classList.toggle('mouse-over-logo', e.type === 'mouseenter');
    };

    var logo = document.getElementById('logo');
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
/***/ (function() {

var body = document.querySelector('body');

var toc = function toc() {
  // create the container div
  // get all divs
  var headings = document.querySelectorAll('#content-below-quote h1, #content-below-quote h2'); // get the body element
  // apply class to container div

  if (headings.length > 1) {
    body.classList.add('has-toc');
    body.classList.add('toc-off');
    var count = 0;

    var _loop = function _loop(i) {
      count = i + 1;
      var el = headings[i];
      el.id = 'toc-' + count;
      el.classList.add('countable-icons');
      el.classList.add('icon-' + count);
      var span = document.createElement('span');
      span.classList.add('open-close');
      span.classList.add('icon');
      var spanEnd = document.createElement('span');
      spanEnd.classList.add('active-holder'); // span.addEventListener('click', handleClick.bind(null, el))

      span.innerHTML = '<i class="open">+</i><i class="closed">–</i>';
      spanEnd.innerHTML = '<i class="active">▂</i>';
      el.insertBefore(span, el.firstChild);
      el.appendChild(spanEnd);
      el.addEventListener('click', function (e) {
        body.classList.toggle('toc-on');
        body.classList.toggle('toc-off');
        var hash = this.id;
        var headings = document.querySelectorAll('#content-below-quote .toc-active');

        for (var _i = 0; _i < headings.length; _i++) {
          var _el = headings[_i];

          _el.classList.remove('toc-active');
        }

        el.classList.add('toc-active');
        window.location.hash = hash;
        window.setTimeout(function () {
          document.querySelector('#' + hash).scrollIntoView({
            behavior: 'smooth',
            // smooth scroll
            block: 'start' // the upper border of the element will be aligned at the top of the visible part of the window of the scrollable area.

          });
        }, 100);
        return false;
      }, false);
    };

    for (var i = 0; i < headings.length; i++) {
      _loop(i);
    }
  } else {// body.classList.add('no-toc')
  }
};

toc();

if (window.location.hash === '#toc' && body.classList.contains('toc-off') && body.classList.contains('has-toc')) {
  body.classList.toggle('toc-on');
  body.classList.toggle('toc-off');
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 	
/******/ 		        // webpack-livereload-plugin
/******/ 		        (function() {
/******/ 		          if (typeof window === "undefined") { return };
/******/ 		          var id = "webpack-livereload-plugin-script-49258191fd964082";
/******/ 		          if (document.getElementById(id)) { return; }
/******/ 		          var el = document.createElement("script");
/******/ 		          el.id = id;
/******/ 		          el.async = true;
/******/ 		          el.src = "http://localhost:35729/livereload.js";
/******/ 		          document.getElementsByTagName("head")[0].appendChild(el);
/******/ 		          console.log("[Live Reload] enabled");
/******/ 		        }());
/******/ 		        // Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
var __webpack_exports__ = {};
/*!**************************!*\
  !*** ../sun/src/main.js ***!
  \**************************/
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
// // non-themed app
// import 'site/app/client/javascript/MyJavascriptFile';
//
//
// // vendor modules
// import 'site/vendor/myvendor/mypackage/client/javascript/MyJavascriptFile';
//
// // your themed app files
// import './js/partials/SomeOtherJavascriptFile';









}();
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";
/*!*****************************!*\
  !*** ../sun/src/style.scss ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

}();
/******/ })()
;
//# sourceMappingURL=app.js.map