(self["webpackChunkpublic"] = self["webpackChunkpublic"] || []).push([["app"],{

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
    bodyClass.addOrToggleBodyClass('#menu-toggle', false);
    // console.log(bodyClass.isHomePage())
    // console.log(bodyClass.hasFragment())
    // if (
    //     bodyClass.isHomePage() === true &&
    //     bodyClass.hasFragment() === false
    // ) {
    //     // console.log('opening menu')
    //     document.querySelector('#menu-toggle').click()
    // }
    // if you click on theme-selector, you select the theme
    bodyClass.addOrToggleBodyClass('.theme-selector', true);
    // if you click on set-them, you select the theme
    bodyClass.addOrToggleBodyClass('.set-theme', true);
    bodyClass.retrieveCookieOrHash();
    // expose scrolled behaviour
    window.setTimeout(function () {
      window.scrollTo(window.scrollX, window.scrollY + 2);
      window.scrollTo(window.scrollX, window.scrollY - 2);
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
      bodyClass.bodyObject.classList.remove('body-unloaded');
      if ('ontouchstart' in document.documentElement) {
        bodyClass.bodyObject.classList.add('touch');
      } else {
        bodyClass.bodyObject.classList.add('no-touch');
      }
      bodyClass.addRocketMode();
    });
    window.addEventListener('beforeunload', function () {
      // bodyClass.bodyObject.classList.add('body-unloaded')
    });
  },
  retrieveCookieOrHash: function retrieveCookieOrHash() {
    var hash = bodyClass.getHashFromURL();
    var preferredTheme = '';
    if (hash === 'reset') {
      _cookie_js__WEBPACK_IMPORTED_MODULE_0__.myCookie.eraseCookie('preferredTheme');
      // console.log(reset);
    } else if (hash) {
      this.runClickForElement(hash);
    } else {
      preferredTheme = _cookie_js__WEBPACK_IMPORTED_MODULE_0__.myCookie.getCookie('preferredTheme');
      if (preferredTheme) {
        bodyClass.bodyObject.setAttribute('data-theme', preferredTheme);
      } else if (bodyClass.userPrefersDarkTheme()) {
        bodyClass.bodyObject.setAttribute('data-theme', 'theme-moon');
      }
    }
  },
  userPrefersDarkTheme: function userPrefersDarkTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
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
  addOrToggleBodyClass: function addOrToggleBodyClass(objSelector, isTheme) {
    document.querySelectorAll(objSelector).forEach(function (oneEachObject) {
      oneEachObject.addEventListener('click', function (event) {
        bodyClass.actionBodyClassChange(oneEachObject, event, isTheme);
        return false;
      });
    });
  },
  actionBodyClassChange: function actionBodyClassChange(oneEachObject, event, isTheme, scrollTo) {
    event.preventDefault();
    bodyClass.removeBodyClassesBasedOnAttribute(oneEachObject);
    var toggleClass = '';
    var id = '';
    if (oneEachObject.hasAttribute('data-add-class')) {
      toggleClass = oneEachObject.getAttribute('data-add-class');
    } else {
      toggleClass = oneEachObject.getAttribute('id');
      id = toggleClass;
    }
    if (oneEachObject.hasAttribute('data-toggle-rather-than-add')) {
      bodyClass.bodyObject.classList.toggle(toggleClass);
    } else {
      bodyClass.bodyObject.classList.add(toggleClass);
    }
    if (isTheme) {
      _cookie_js__WEBPACK_IMPORTED_MODULE_0__.myCookie.setCookie('preferredTheme', toggleClass, 14);
      bodyClass.bodyObject.setAttribute('data-theme', toggleClass);
    }
    if (id && scrollTo) {
      var hash = bodyClass.getHashFromString(id);
      if (hash.length) {
        hash = hash.replace('#', '');
        window.location.hash = '#' + hash;
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
    ;
    [].forEach.call(document.getElementsByTagName('ul'), function (node) {
      if (node.classList.contains('collapsibleList')) {
        applyTo(node, true);
        if (!doNotRecurse) {
          ;
          [].forEach.call(node.getElementsByTagName('ul'), function (subnode) {
            subnode.classList.add('collapsibleList');
          });
        }
        hasOpenSubList(node);
      }
    });
  }
  function hasOpenSubList(el) {
    var list = el.closest('.collapsibleList');
    if (list) {
      if (list.querySelectorAll('.collapsibleListOpen').length) {
        list.classList.add('collapsibleListHasOpen');
      } else {
        list.classList.remove('collapsibleListHasOpen');
      }
    }
  }

  // Makes the specified list collapsible. The parameters are:
  //
  // node         - the list element
  // doNotRecurse - true if sub-lists should not be made collapsible
  function applyTo(node, doNotRecurse) {
    ;
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
          span.innerHTML = '<i class="open">&nbsp;</i><i class="closed">↰</i>';
          // we need to toggle all of them, some twice
          if (li.classList.contains('section') || li.classList.contains('current')) {
            toggle(li);
          }
          toggle(li);
          li.insertBefore(span, ul[0]);
        }
      }
    });
  }

  // Handles a click. The parameter is:
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
  }

  // Opens or closes the unordered list elements directly within the
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
    hasOpenSubList(node);
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
/* harmony export */   myCookie: function() { return /* binding */ myCookie; }
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
    var target = document.querySelector('#footer');

    // configure the intersection observer instance
    var intersectionObserverOptions = {
      root: null,
      rootMargin: '150px',
      threshold: 1.0
    };
    var observer = new window.IntersectionObserver(onIntersection, intersectionObserverOptions);

    // provide the observer with a target
    observer.observe(target);
    function onIntersection(entries) {
      entries.forEach(function (entry) {
        // console.clear()
        // console.log(entry.intersectionRatio)
        document.querySelector('body').classList.toggle('footer-visible', entry.intersectionRatio >= 1);
        // Are we in viewport?
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

/***/ "../sun/src/js/images.js":
/*!*******************************!*\
  !*** ../sun/src/js/images.js ***!
  \*******************************/
/***/ (function() {

var imageWrapper = function imageWrapper() {
  function wrap(el, wrapper) {
    el.parentNode.insertBefore(wrapper, el);
    wrapper.appendChild(el);
  }
  // create the container div

  // get all divs
  var images = document.querySelectorAll('.typography img');
  // get the body element
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

/***/ "../sun/src/js/scroll-manager.js":
/*!***************************************!*\
  !*** ../sun/src/js/scroll-manager.js ***!
  \***************************************/
/***/ (function() {

var scrollManager = {
  microSecondsBeforeJustScrollledRemoved: 5000,
  minScrollForAction: 2,
  minScrollDownToBeProperScroll: 100,
  normalTransitionDuration: 0,
  themeTransitionDuration: '1.5s',
  // calculated variables
  footerHeight: 0,
  newScroll: 0,
  minimumScrollForThemeSwitch: 20,
  lastScroll: 0,
  didScroll: 0,
  bodyObject: null,
  timeOutFx: null,
  justScrolledFx: null,
  scrolledUpClass: 'scrolled-up',
  scrolledDownClass: 'scrolled-down',
  init: function init() {
    scrollManager.bodyObject = document.querySelector('body');
    scrollManager.scrollListener();
    scrollManager.scrollUpOrDown();
    scrollManager.lastScroll = scrollManager.currentScroll();
    window.setTimeout(function () {
      window.scrollTo(window.scrollX, scrollManager.currentScroll() - scrollManager.minScrollForAction - 1);
    }, 50);
    scrollManager.footerHeight = document.querySelector('footer').offsetHeight / 2;
    scrollManager.normalTransitionDuration = scrollManager.bodyObject.style.transitionDuration;
  },
  getTheme: function getTheme() {
    return new String(scrollManager.bodyObject.getAttribute('data-theme'));
  },
  currentScroll: function currentScroll() {
    return parseInt(window.scrollY || document.documentElement.scrollTop);
  },
  scrollListener: function scrollListener() {
    var isRocketTheme = null;
    window.addEventListener('scroll', function () {
      window.clearTimeout(scrollManager.timeOutFx);
      window.clearTimeout(scrollManager.justScrolledFx);
      var theme = scrollManager.getTheme();
      scrollManager.newScroll = scrollManager.currentScroll();
      var windowHeight = window.innerHeight;
      var totalHeight = document.documentElement.scrollHeight;

      // Check if current scroll position is at the bottom minus the footer's height
      var bottomTest = scrollManager.newScroll + windowHeight >= totalHeight - scrollManager.footerHeight;
      console.log(bottomTest, scrollManager.newScroll, windowHeight, totalHeight, scrollManager.footerHeight);
      var topTest = scrollManager.newScroll < scrollManager.minimumScrollForThemeSwitch;
      if (topTest || bottomTest) {
        if (isRocketTheme !== true) {
          scrollManager.bodyObject.style.transitionDuration = scrollManager.themeTransitionDuration;
          scrollManager.bodyObject.classList.remove('past-header');
          scrollManager.bodyObject.classList.remove(theme);
          scrollManager.bodyObject.classList.add('theme-rocket');
          scrollManager.bodyObject.style.transitionSpeed = scrollManager.normalTransitionDuration;
          isRocketTheme = true;
        }
      } else {
        if (isRocketTheme !== false) {
          scrollManager.bodyObject.style.transitionDuration = scrollManager.themeTransitionDuration;
          scrollManager.bodyObject.classList.add('past-header');
          scrollManager.bodyObject.classList.add(theme);
          scrollManager.bodyObject.classList.remove('theme-rocket');
          scrollManager.bodyObject.style.transitionSpeed = scrollManager.normalTransitionDuration;
          isRocketTheme = false;
        }
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
        scrollManager.newScroll = window.scrollY;
        // console.log('last scroll: ' + scrollManager.lastScroll)
        // console.log('new scroll: ' + newScroll)
        if (Math.abs(scrollManager.lastScroll - scrollManager.newScroll) <= scrollManager.minScrollForAction) {
          // console.log('too little')
          return;
        }
        if (newScroll > scrollManager.lastScroll + scrollManager.minScrollDownToBeProperScroll) {
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
          scrollManager.justScrolledFx = window.setTimeout(function () {
            scrollManager.bodyObject.classList.remove('just-scrolled');
          }, scrollManager.microSecondsBeforeJustScrollledRemoved);
        } else {
          // console.log('do nothing')
        }
        scrollManager.lastScroll = newScroll;
      }
    }, 100);
  }
};
scrollManager.init();

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
  var headings = document.querySelectorAll('#content-below-quote h1, #content-below-quote h2');
  // get the body element
  // apply class to container div
  if (headings.length > 1) {
    body.classList.add('has-toc');
    body.classList.add('toc-off');
    var count = 0;
    var _loop = function _loop() {
      count = i + 1;
      var el = headings[i];
      var previousElem = el.previousElementSibling;
      if (previousElem) {
        // Apply styles or classes to previousElem
        previousElem.classList.add('bottom-space');
      }
      el.id = 'toc-' + count;
      el.classList.add('countable-icons');
      el.classList.add('icon-' + count);
      var span = document.createElement('span');
      span.classList.add('open-close');
      span.classList.add('icon');
      var spanEnd = document.createElement('span');
      spanEnd.classList.add('active-holder');
      // span.addEventListener('click', handleClick.bind(null, el))
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
      _loop();
    }
  } else {
    // body.classList.add('no-toc')
  }
};
toc();
if (window.location.hash === '#toc' && body.classList.contains('toc-off') && body.classList.contains('has-toc')) {
  body.classList.toggle('toc-on');
  body.classList.toggle('toc-off');
}

/***/ }),

/***/ "../sun/src/main.js":
/*!**************************!*\
  !*** ../sun/src/main.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/cookie */ "../sun/src/js/cookie.js");
/* harmony import */ var _js_body_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/body-class */ "../sun/src/js/body-class.js");
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/collapsible-menu */ "../sun/src/js/collapsible-menu.js");
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_scroll_manager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/scroll-manager */ "../sun/src/js/scroll-manager.js");
/* harmony import */ var _js_scroll_manager__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_scroll_manager__WEBPACK_IMPORTED_MODULE_3__);
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










/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("../sun/src/main.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQztZQUM5Q0MsUUFBUSxFQUFFLFFBQVE7WUFBRTtZQUNwQkMsS0FBSyxFQUFFLE9BQU8sQ0FBQztVQUNuQixDQUFDLENBQUM7UUFDTixDQUFDLEVBQUUsR0FBRyxDQUFDO1FBQ1AsT0FBTyxLQUFLO01BQ2hCLENBQUMsRUFDRCxLQUNKLENBQUM7SUFDTCxDQUFDO0lBOUNELEtBQUssSUFBSTBDLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3dJLFFBQVEsQ0FBQ2hLLE1BQU0sRUFBRXdCLENBQUMsRUFBRTtNQUFBMEksS0FBQTtJQUFBO0VBK0M1QyxDQUFDLE1BQU07SUFDSDtFQUFBO0FBRVIsQ0FBQztBQUVESCxHQUFHLENBQUMsQ0FBQztBQUVMLElBQ0kzTCxNQUFNLENBQUMrQyxRQUFRLENBQUMxQyxJQUFJLEtBQUssTUFBTSxJQUMvQnFMLElBQUksQ0FBQzVLLFNBQVMsQ0FBQ2dCLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFDbEM0SixJQUFJLENBQUM1SyxTQUFTLENBQUNnQixRQUFRLENBQUMsU0FBUyxDQUFDLEVBQ3BDO0VBQ0U0SixJQUFJLENBQUM1SyxTQUFTLENBQUM2QixNQUFNLENBQUMsUUFBUSxDQUFDO0VBQy9CK0ksSUFBSSxDQUFDNUssU0FBUyxDQUFDNkIsTUFBTSxDQUFDLFNBQVMsQ0FBQztBQUNwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDb0I7QUFDSTtBQUNNO0FBQ0Y7QUFDRztBQUNiO0FBQ1c7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2JvZHktY2xhc3MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvY29sbGFwc2libGUtbWVudS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9jb29raWUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvZm9vdGVyLWlzLXZpc2libGUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvZm9ybS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9pbWFnZXMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvbW91c2Utb3Zlci1sb2dvLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL3Njcm9sbC1tYW5hZ2VyLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL3RvYy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG15Q29va2llIH0gZnJvbSAnLi9jb29raWUuanMnXG5cbmNvbnN0IGJvZHlDbGFzcyA9IHtcbiAgICBib2R5T2JqZWN0OiBudWxsLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuICAgICAgICBib2R5Q2xhc3MuYWRkT3JUb2dnbGVCb2R5Q2xhc3MoJyNtZW51LXRvZ2dsZScsIGZhbHNlKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2R5Q2xhc3MuaXNIb21lUGFnZSgpKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2R5Q2xhc3MuaGFzRnJhZ21lbnQoKSlcbiAgICAgICAgLy8gaWYgKFxuICAgICAgICAvLyAgICAgYm9keUNsYXNzLmlzSG9tZVBhZ2UoKSA9PT0gdHJ1ZSAmJlxuICAgICAgICAvLyAgICAgYm9keUNsYXNzLmhhc0ZyYWdtZW50KCkgPT09IGZhbHNlXG4gICAgICAgIC8vICkge1xuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ29wZW5pbmcgbWVudScpXG4gICAgICAgIC8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS10b2dnbGUnKS5jbGljaygpXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgeW91IGNsaWNrIG9uIHRoZW1lLXNlbGVjdG9yLCB5b3Ugc2VsZWN0IHRoZSB0aGVtZVxuICAgICAgICBib2R5Q2xhc3MuYWRkT3JUb2dnbGVCb2R5Q2xhc3MoJy50aGVtZS1zZWxlY3RvcicsIHRydWUpXG4gICAgICAgIC8vIGlmIHlvdSBjbGljayBvbiBzZXQtdGhlbSwgeW91IHNlbGVjdCB0aGUgdGhlbWVcbiAgICAgICAgYm9keUNsYXNzLmFkZE9yVG9nZ2xlQm9keUNsYXNzKCcuc2V0LXRoZW1lJywgdHJ1ZSlcbiAgICAgICAgYm9keUNsYXNzLnJldHJpZXZlQ29va2llT3JIYXNoKClcbiAgICAgICAgLy8gZXhwb3NlIHNjcm9sbGVkIGJlaGF2aW91clxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnNjcm9sbFgsIHdpbmRvdy5zY3JvbGxZICsgMilcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkgLSAyKVxuICAgICAgICAgICAgY29uc3QgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVVSTCgpXG4gICAgICAgICAgICBpZiAoaGFzaCAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgaGFzaCkuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsIC8vIHNtb290aCBzY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCcgLy8gdGhlIHVwcGVyIGJvcmRlciBvZiB0aGUgZWxlbWVudCB3aWxsIGJlIGFsaWduZWQgYXQgdGhlIHRvcCBvZiB0aGUgdmlzaWJsZSBwYXJ0IG9mIHRoZSB3aW5kb3cgb2YgdGhlIHNjcm9sbGFibGUgYXJlYS5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMDApXG4gICAgICAgIHRoaXMuYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnMoKVxuICAgIH0sXG5cbiAgICBhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LWxvYWRlZCcpXG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdib2R5LXVubG9hZGVkJylcbiAgICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCd0b3VjaCcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ25vLXRvdWNoJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvZHlDbGFzcy5hZGRSb2NrZXRNb2RlKClcbiAgICAgICAgfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICByZXRyaWV2ZUNvb2tpZU9ySGFzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVVSTCgpXG4gICAgICAgIGxldCBwcmVmZXJyZWRUaGVtZSA9ICcnXG4gICAgICAgIGlmIChoYXNoID09PSAncmVzZXQnKSB7XG4gICAgICAgICAgICBteUNvb2tpZS5lcmFzZUNvb2tpZSgncHJlZmVycmVkVGhlbWUnKVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc2gpIHtcbiAgICAgICAgICAgIHRoaXMucnVuQ2xpY2tGb3JFbGVtZW50KGhhc2gpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcmVmZXJyZWRUaGVtZSA9IG15Q29va2llLmdldENvb2tpZSgncHJlZmVycmVkVGhlbWUnKVxuICAgICAgICAgICAgaWYgKHByZWZlcnJlZFRoZW1lKSB7XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3Quc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgcHJlZmVycmVkVGhlbWUpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJvZHlDbGFzcy51c2VyUHJlZmVyc0RhcmtUaGVtZSgpKSB7XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3Quc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ3RoZW1lLW1vb24nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVzZXJQcmVmZXJzRGFya1RoZW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYSAmJlxuICAgICAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzXG4gICAgICAgIClcbiAgICB9LFxuXG4gICAgcnVuQ2xpY2tGb3JFbGVtZW50OiBmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgICBoYXNoID0gaGFzaC50cmltKClcbiAgICAgICAgaWYgKGhhc2gubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKVxuICAgICAgICAgICAgaWYgKG9iaiAmJiBvYmouY2xhc3NMaXN0LmNvbnRhaW5zKCd0aGVtZS1zZWxlY3RvcicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGUob2JqKVxuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoaGFzaClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG5cbiAgICBhZGRPclRvZ2dsZUJvZHlDbGFzczogZnVuY3Rpb24gKG9ialNlbGVjdG9yLCBpc1RoZW1lKSB7XG4gICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChvYmpTZWxlY3RvcilcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChvbmVFYWNoT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgb25lRWFjaE9iamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYWN0aW9uQm9keUNsYXNzQ2hhbmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgb25lRWFjaE9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUaGVtZVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBhY3Rpb25Cb2R5Q2xhc3NDaGFuZ2U6IGZ1bmN0aW9uIChvbmVFYWNoT2JqZWN0LCBldmVudCwgaXNUaGVtZSwgc2Nyb2xsVG8pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGJvZHlDbGFzcy5yZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGUob25lRWFjaE9iamVjdClcblxuICAgICAgICBsZXQgdG9nZ2xlQ2xhc3MgPSAnJ1xuICAgICAgICBsZXQgaWQgPSAnJ1xuICAgICAgICBpZiAob25lRWFjaE9iamVjdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWRkLWNsYXNzJykpIHtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzID0gb25lRWFjaE9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWRkLWNsYXNzJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzID0gb25lRWFjaE9iamVjdC5nZXRBdHRyaWJ1dGUoJ2lkJylcbiAgICAgICAgICAgIGlkID0gdG9nZ2xlQ2xhc3NcbiAgICAgICAgfVxuICAgICAgICBpZiAob25lRWFjaE9iamVjdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdG9nZ2xlLXJhdGhlci10aGFuLWFkZCcpKSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QudG9nZ2xlKHRvZ2dsZUNsYXNzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCh0b2dnbGVDbGFzcylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1RoZW1lKSB7XG4gICAgICAgICAgICBteUNvb2tpZS5zZXRDb29raWUoJ3ByZWZlcnJlZFRoZW1lJywgdG9nZ2xlQ2xhc3MsIDE0KVxuICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3Quc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgdG9nZ2xlQ2xhc3MpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlkICYmIHNjcm9sbFRvKSB7XG4gICAgICAgICAgICBsZXQgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVN0cmluZyhpZClcbiAgICAgICAgICAgIGlmIChoYXNoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGhhc2ggPSBoYXNoLnJlcGxhY2UoJyMnLCAnJylcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcjJyArIGhhc2hcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGU6IGZ1bmN0aW9uICgkb2JqZWN0KSB7XG4gICAgICAgIGlmICgkb2JqZWN0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1yZW1vdmUtY2xhc3MnKSkge1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5nID0gJG9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVtb3ZlLWNsYXNzJylcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBib2R5Q2xhc3MuZ2V0Q2xhc3Nlc0Zyb21MaXN0KHN0cmluZylcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjbGFzc2VzW2ldXG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRDbGFzc2VzRnJvbUxpc3Q6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBzdHJpbmcuc3BsaXQoJywnKVxuICAgICAgICBjb25zdCBuZXdBcnJheSA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhcnJheVtpXS50cmltKClcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5ld0FycmF5LnB1c2godmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0FycmF5XG4gICAgfSxcblxuICAgIGdldEhhc2hGcm9tVVJMOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoXG4gICAgICAgIHJldHVybiBib2R5Q2xhc3MuZ2V0SGFzaEZyb21TdHJpbmcoc3RyaW5nKVxuICAgIH0sXG5cbiAgICBnZXRIYXNoRnJvbVN0cmluZzogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICBzdHJpbmcgPSBTdHJpbmcoc3RyaW5nKVxuICAgICAgICByZXR1cm4gYm9keUNsYXNzLnJldHJpZXZlSGFzU2lnbkZyb21TdHJpbmcoc3RyaW5nKVxuICAgIH0sXG5cbiAgICByZXRyaWV2ZUhhc1NpZ25Gcm9tU3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgnIycsICcnKVxuICAgIH0sXG5cbiAgICBhZGRSb2NrZXRNb2RlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIGNvbnN0IHNoYWRvdyA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICdkYXRhLXNoYWRvdy1vdmVyLWxvZ28nXG4gICAgICAgIClcbiAgICAgICAgbGV0IHNoYWRvd0NvbG91ciA9ICcnXG4gICAgICAgIGlmIChzaGFkb3cgPT09ICdkYXJrJykge1xuICAgICAgICAgICAgc2hhZG93Q29sb3VyID1cbiAgICAgICAgICAgICAgICAnbGluZWFyLWdyYWRpZW50KDI1OGRlZywgIzAwMDAwMDMwIDMwJSwgdHJhbnNwYXJlbnQgNjAlKSwgJ1xuICAgICAgICB9IGVsc2UgaWYgKHNoYWRvdyA9PT0gJ2xpZ2h0Jykge1xuICAgICAgICAgICAgc2hhZG93Q29sb3VyID1cbiAgICAgICAgICAgICAgICAnbGluZWFyLWdyYWRpZW50KDI1OGRlZywgI0ZGRkZGRjMwIDMwJSwgdHJhbnNwYXJlbnQgNjAlKSwgJ1xuICAgICAgICB9XG4gICAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPVxuICAgICAgICAgICAgc2hhZG93Q29sb3VyICtcbiAgICAgICAgICAgICd1cmwoJyArXG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmctaW1hZ2UnKSArXG4gICAgICAgICAgICAnKSdcbiAgICAgICAgZGl2LmlkID0gJ0JhY2tncm91bmRJbWFnZSdcbiAgICAgICAgY29uc3QgdGVtcCA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmZpcnN0Q2hpbGRcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuaW5zZXJ0QmVmb3JlKGRpdiwgdGVtcClcbiAgICB9LFxuXG4gICAgaXNIb21lUGFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLydcbiAgICB9LFxuICAgIGhhc0ZyYWdtZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaGFzaCAhPT0gJydcbiAgICB9XG59XG5cbmJvZHlDbGFzcy5pbml0KClcbiIsIi8qXG5cbkNvbGxhcHNpYmxlTGlzdHMuanNcblxuQW4gb2JqZWN0IGFsbG93aW5nIGxpc3RzIHRvIGR5bmFtaWNhbGx5IGV4cGFuZCBhbmQgY29sbGFwc2VcblxuQ3JlYXRlZCBieSBLYXRlIE1vcmxleSAtIGh0dHA6Ly9jb2RlLmlhbWthdGUuY29tLyAtIGFuZCByZWxlYXNlZCB1bmRlciB0aGUgdGVybXNcbm9mIHRoZSBDQzAgMS4wIFVuaXZlcnNhbCBsZWdhbCBjb2RlOlxuXG5odHRwOi8vY3JlYXRpdmVjb21tb25zLm9yZy9wdWJsaWNkb21haW4vemVyby8xLjAvbGVnYWxjb2RlXG5cbiovXG5cbmNvbnN0IENvbGxhcHNpYmxlTGlzdHMgPSAoZnVuY3Rpb24gKCkge1xuICAgIC8vIE1ha2VzIGFsbCBsaXN0cyB3aXRoIHRoZSBjbGFzcyAnY29sbGFwc2libGVMaXN0JyBjb2xsYXBzaWJsZS4gVGhlXG4gICAgLy8gcGFyYW1ldGVyIGlzOlxuICAgIC8vXG4gICAgLy8gZG9Ob3RSZWN1cnNlIC0gdHJ1ZSBpZiBzdWItbGlzdHMgc2hvdWxkIG5vdCBiZSBtYWRlIGNvbGxhcHNpYmxlXG4gICAgZnVuY3Rpb24gYXBwbHkgKGRvTm90UmVjdXJzZSkge1xuICAgICAgICA7W10uZm9yRWFjaC5jYWxsKGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpLCBub2RlID0+IHtcbiAgICAgICAgICAgIGlmIChub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0JykpIHtcbiAgICAgICAgICAgICAgICBhcHBseVRvKG5vZGUsIHRydWUpXG5cbiAgICAgICAgICAgICAgICBpZiAoIWRvTm90UmVjdXJzZSkge1xuICAgICAgICAgICAgICAgICAgICA7W10uZm9yRWFjaC5jYWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym5vZGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Ym5vZGUuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0JylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBoYXNPcGVuU3ViTGlzdChub2RlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc09wZW5TdWJMaXN0IChlbCkge1xuICAgICAgICBjb25zdCBsaXN0ID0gZWwuY2xvc2VzdCgnLmNvbGxhcHNpYmxlTGlzdCcpXG4gICAgICAgIGlmIChsaXN0KSB7XG4gICAgICAgICAgICBpZiAobGlzdC5xdWVyeVNlbGVjdG9yQWxsKCcuY29sbGFwc2libGVMaXN0T3BlbicpLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0SGFzT3BlbicpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpc3QuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0SGFzT3BlbicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNYWtlcyB0aGUgc3BlY2lmaWVkIGxpc3QgY29sbGFwc2libGUuIFRoZSBwYXJhbWV0ZXJzIGFyZTpcbiAgICAvL1xuICAgIC8vIG5vZGUgICAgICAgICAtIHRoZSBsaXN0IGVsZW1lbnRcbiAgICAvLyBkb05vdFJlY3Vyc2UgLSB0cnVlIGlmIHN1Yi1saXN0cyBzaG91bGQgbm90IGJlIG1hZGUgY29sbGFwc2libGVcbiAgICBmdW5jdGlvbiBhcHBseVRvIChub2RlLCBkb05vdFJlY3Vyc2UpIHtcbiAgICAgICAgO1tdLmZvckVhY2guY2FsbChub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdsaScpLCBsaSA9PiB7XG4gICAgICAgICAgICBpZiAoIWRvTm90UmVjdXJzZSB8fCBub2RlID09PSBsaS5wYXJlbnROb2RlKSB7XG4gICAgICAgICAgICAgICAgbGkuc3R5bGUudXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLk1velVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS5tc1VzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS5XZWJraXRVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgY29uc3QgdWwgPSBsaS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKVxuICAgICAgICAgICAgICAgIGlmICh1bC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdvcGVuLWNsb3NlJylcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrLmJpbmQobnVsbCwgbGkpKVxuICAgICAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAnPGkgY2xhc3M9XCJvcGVuXCI+Jm5ic3A7PC9pPjxpIGNsYXNzPVwiY2xvc2VkXCI+4oawPC9pPidcbiAgICAgICAgICAgICAgICAgICAgLy8gd2UgbmVlZCB0byB0b2dnbGUgYWxsIG9mIHRoZW0sIHNvbWUgdHdpY2VcbiAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWN0aW9uJykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9nZ2xlKGxpKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZShsaSlcbiAgICAgICAgICAgICAgICAgICAgbGkuaW5zZXJ0QmVmb3JlKHNwYW4sIHVsWzBdKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICAvLyBIYW5kbGVzIGEgY2xpY2suIFRoZSBwYXJhbWV0ZXIgaXM6XG4gICAgLy9cbiAgICAvLyBub2RlIC0gdGhlIG5vZGUgZm9yIHdoaWNoIGNsaWNrcyBhcmUgYmVpbmcgaGFuZGxlZFxuICAgIGZ1bmN0aW9uIGhhbmRsZUNsaWNrIChub2RlLCBlKSB7XG4gICAgICAgIGxldCBsaSA9IGUudGFyZ2V0XG4gICAgICAgIHdoaWxlIChsaS5ub2RlTmFtZSAhPT0gJ0xJJykge1xuICAgICAgICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGkgPT09IG5vZGUpIHtcbiAgICAgICAgICAgIHRvZ2dsZShub2RlKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gT3BlbnMgb3IgY2xvc2VzIHRoZSB1bm9yZGVyZWQgbGlzdCBlbGVtZW50cyBkaXJlY3RseSB3aXRoaW4gdGhlXG4gICAgLy8gc3BlY2lmaWVkIG5vZGUuIFRoZSBwYXJhbWV0ZXIgaXM6XG4gICAgLy9cbiAgICAvLyBub2RlIC0gdGhlIG5vZGUgY29udGFpbmluZyB0aGUgdW5vcmRlcmVkIGxpc3QgZWxlbWVudHNcbiAgICBmdW5jdGlvbiB0b2dnbGUgKG5vZGUpIHtcbiAgICAgICAgY29uc3Qgb3BlbiA9IG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuICAgICAgICBjb25zdCB1bHMgPSBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpXG5cbiAgICAgICAgO1tdLmZvckVhY2guY2FsbCh1bHMsIHVsID0+IHtcbiAgICAgICAgICAgIGxldCBsaSA9IHVsXG4gICAgICAgICAgICB3aGlsZSAobGkubm9kZU5hbWUgIT09ICdMSScpIHtcbiAgICAgICAgICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGxpID09PSBub2RlKSB7XG4gICAgICAgICAgICAgICAgdWwuc3R5bGUuZGlzcGxheSA9IG9wZW4gPyAnYmxvY2snIDogJ25vbmUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcbiAgICAgICAgbm9kZS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuXG4gICAgICAgIGlmICh1bHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbm9kZS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3QnICsgKG9wZW4gPyAnT3BlbicgOiAnQ2xvc2VkJykpXG4gICAgICAgIH1cbiAgICAgICAgaGFzT3BlblN1Ykxpc3Qobm9kZSlcbiAgICB9XG5cbiAgICByZXR1cm4geyBhcHBseSwgYXBwbHlUbyB9XG59KSgpXG5cbkNvbGxhcHNpYmxlTGlzdHMuYXBwbHkoKVxuIiwiY29uc3QgbXlDb29raWUgPSB7XG5cbiAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGRheXMpIHtcbiAgICB2YXIgZXhwaXJlcyA9ICcnXG4gICAgaWYgKHR5cGVvZiBkYXlzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGF5cyA9IDE0XG4gICAgfVxuICAgIGlmIChkYXlzKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpXG4gICAgICBleHBpcmVzID0gJzsgZXhwaXJlcz0nICsgZGF0ZS50b1VUQ1N0cmluZygpXG4gICAgfVxuICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPScgKyAodmFsdWUgfHwgJycpICsgZXhwaXJlcyArICc7IHBhdGg9LydcbiAgfSxcblxuICBnZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIG5hbWVFUSA9IG5hbWUgKyAnPSdcbiAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjID0gY2FbaV1cbiAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKSB7XG4gICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgZXJhc2VDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgbXlDb29raWUuc2V0Q29va2llKG5hbWUsIG51bGwsIDApXG4gIH1cbn1cblxuZXhwb3J0IHsgbXlDb29raWUgfVxuIiwiXG5jb25zdCBmb290ZXJJc1Zpc2libGUgPSB7XG5cbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIC8vIHRoaXMgaXMgdGhlIHRhcmdldCB3aGljaCBpcyBvYnNlcnZlZFxuICAgIGNvbnN0IHRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb290ZXInKVxuXG4gICAgLy8gY29uZmlndXJlIHRoZSBpbnRlcnNlY3Rpb24gb2JzZXJ2ZXIgaW5zdGFuY2VcbiAgICB2YXIgaW50ZXJzZWN0aW9uT2JzZXJ2ZXJPcHRpb25zID0ge1xuICAgICAgcm9vdDogbnVsbCxcbiAgICAgIHJvb3RNYXJnaW46ICcxNTBweCcsXG4gICAgICB0aHJlc2hvbGQ6IDEuMFxuICAgIH1cblxuICAgIHZhciBvYnNlcnZlciA9IG5ldyB3aW5kb3cuSW50ZXJzZWN0aW9uT2JzZXJ2ZXIob25JbnRlcnNlY3Rpb24sIGludGVyc2VjdGlvbk9ic2VydmVyT3B0aW9ucylcblxuICAgIC8vIHByb3ZpZGUgdGhlIG9ic2VydmVyIHdpdGggYSB0YXJnZXRcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldClcblxuICAgIGZ1bmN0aW9uIG9uSW50ZXJzZWN0aW9uIChlbnRyaWVzKSB7XG4gICAgICBlbnRyaWVzLmZvckVhY2goXG4gICAgICAgIGVudHJ5ID0+IHtcbiAgICAgICAgICAvLyBjb25zb2xlLmNsZWFyKClcbiAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbylcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuY2xhc3NMaXN0LnRvZ2dsZShcbiAgICAgICAgICAgICdmb290ZXItdmlzaWJsZScsXG4gICAgICAgICAgICBlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+PSAxXG4gICAgICAgICAgKVxuICAgICAgICAgIC8vIEFyZSB3ZSBpbiB2aWV3cG9ydD9cbiAgICAgICAgICAvLyBpZiAoZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAxKSB7XG4gICAgICAgICAgLy8gU3RvcCB3YXRjaGluZ1xuICAgICAgICAgIC8vIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cbiAgfVxufVxuXG5mb290ZXJJc1Zpc2libGUuaW5pdCgpXG4iLCJ2YXIgZm9ybWZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSdcbilcbmZvciAodmFyIEogPSBmb3JtZmllbGRzLmxlbmd0aCAtIDE7IEogPj0gMDsgLS1KKSB7XG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcblxuICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKVxuICBldnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCBmYWxzZSwgdHJ1ZSlcbiAgZm9ybWZpZWxkc1tKXS5kaXNwYXRjaEV2ZW50KGV2dClcbn1cblxuZnVuY3Rpb24gYWRqdXN0U3R5bGluZyAoekV2ZW50KSB7XG4gIHZhciBpbnBWYWwgPSB6RXZlbnQudGFyZ2V0LnZhbHVlXG4gIGlmIChpbnBWYWwgJiYgaW5wVmFsLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSkge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdmFsdWUnKVxuICB9IGVsc2Uge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbm8tdmFsdWUnKVxuICB9XG59XG4iLCJcbmNvbnN0IGltYWdlV3JhcHBlciA9ICgpID0+IHtcbiAgZnVuY3Rpb24gd3JhcCAoZWwsIHdyYXBwZXIpIHtcbiAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyLCBlbClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsKVxuICB9XG4gIC8vIGNyZWF0ZSB0aGUgY29udGFpbmVyIGRpdlxuXG4gIC8vIGdldCBhbGwgZGl2c1xuICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwb2dyYXBoeSBpbWcnKVxuICAvLyBnZXQgdGhlIGJvZHkgZWxlbWVudFxuICAvLyBhcHBseSBjbGFzcyB0byBjb250YWluZXIgZGl2XG5cbiAgLy8gZmluZCBvdXQgYWxsIHRob3NlIGRpdnMgaGF2aW5nIGNsYXNzIENcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBkdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZHYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdpbWFnZS1jb250YWluZXInKVxuICAgIGNvbnN0IGltZyA9IGltYWdlc1tpXVxuICAgIHdyYXAoaW1nLCBkdilcbiAgfVxufVxuXG5pbWFnZVdyYXBwZXIoKVxuIiwiY29uc3Qgc2hvd1JvY2tldE1vZGUgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0b2dnbGVDbGFzc09uSG92ZXIgPSAoZSkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgICAgIC5jbGFzc0xpc3RcbiAgICAgICAgLnRvZ2dsZSgnbW91c2Utb3Zlci1sb2dvJywgZS50eXBlID09PSAnbW91c2VlbnRlcicpXG4gICAgfVxuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9nbycpXG4gICAgbG9nby5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdG9nZ2xlQ2xhc3NPbkhvdmVyKVxuICAgIGxvZ28uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRvZ2dsZUNsYXNzT25Ib3ZlcilcbiAgfVxufVxuXG5zaG93Um9ja2V0TW9kZS5pbml0KClcbiIsImNvbnN0IHNjcm9sbE1hbmFnZXIgPSB7XG4gICAgbWljcm9TZWNvbmRzQmVmb3JlSnVzdFNjcm9sbGxlZFJlbW92ZWQ6IDUwMDAsXG5cbiAgICBtaW5TY3JvbGxGb3JBY3Rpb246IDIsXG5cbiAgICBtaW5TY3JvbGxEb3duVG9CZVByb3BlclNjcm9sbDogMTAwLFxuXG4gICAgbm9ybWFsVHJhbnNpdGlvbkR1cmF0aW9uOiAwLFxuXG4gICAgdGhlbWVUcmFuc2l0aW9uRHVyYXRpb246ICcxLjVzJyxcblxuICAgIC8vIGNhbGN1bGF0ZWQgdmFyaWFibGVzXG4gICAgZm9vdGVySGVpZ2h0OiAwLFxuXG4gICAgbmV3U2Nyb2xsOiAwLFxuXG4gICAgbWluaW11bVNjcm9sbEZvclRoZW1lU3dpdGNoOiAyMCxcblxuICAgIGxhc3RTY3JvbGw6IDAsXG5cbiAgICBkaWRTY3JvbGw6IDAsXG5cbiAgICBib2R5T2JqZWN0OiBudWxsLFxuXG4gICAgdGltZU91dEZ4OiBudWxsLFxuXG4gICAganVzdFNjcm9sbGVkRng6IG51bGwsXG5cbiAgICBzY3JvbGxlZFVwQ2xhc3M6ICdzY3JvbGxlZC11cCcsXG5cbiAgICBzY3JvbGxlZERvd25DbGFzczogJ3Njcm9sbGVkLWRvd24nLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICAgICAgc2Nyb2xsTWFuYWdlci5zY3JvbGxMaXN0ZW5lcigpXG4gICAgICAgIHNjcm9sbE1hbmFnZXIuc2Nyb2xsVXBPckRvd24oKVxuICAgICAgICBzY3JvbGxNYW5hZ2VyLmxhc3RTY3JvbGwgPSBzY3JvbGxNYW5hZ2VyLmN1cnJlbnRTY3JvbGwoKVxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFgsXG4gICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5jdXJyZW50U2Nyb2xsKCkgLVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLm1pblNjcm9sbEZvckFjdGlvbiAtXG4gICAgICAgICAgICAgICAgICAgIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgfSwgNTApXG4gICAgICAgIHNjcm9sbE1hbmFnZXIuZm9vdGVySGVpZ2h0ID1cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvb3RlcicpLm9mZnNldEhlaWdodCAvIDJcbiAgICAgICAgc2Nyb2xsTWFuYWdlci5ub3JtYWxUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvblxuICAgIH0sXG5cbiAgICBnZXRUaGVtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbmV3IFN0cmluZyhzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJykpXG4gICAgfSxcblxuICAgIGN1cnJlbnRTY3JvbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHBhcnNlSW50KHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3ApXG4gICAgfSxcblxuICAgIHNjcm9sbExpc3RlbmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBpc1JvY2tldFRoZW1lID0gbnVsbFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChzY3JvbGxNYW5hZ2VyLnRpbWVPdXRGeClcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoc2Nyb2xsTWFuYWdlci5qdXN0U2Nyb2xsZWRGeClcbiAgICAgICAgICAgIGNvbnN0IHRoZW1lID0gc2Nyb2xsTWFuYWdlci5nZXRUaGVtZSgpXG4gICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLm5ld1Njcm9sbCA9IHNjcm9sbE1hbmFnZXIuY3VycmVudFNjcm9sbCgpXG4gICAgICAgICAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgICAgIGNvbnN0IHRvdGFsSGVpZ2h0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodFxuXG4gICAgICAgICAgICAvLyBDaGVjayBpZiBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiBpcyBhdCB0aGUgYm90dG9tIG1pbnVzIHRoZSBmb290ZXIncyBoZWlnaHRcbiAgICAgICAgICAgIGNvbnN0IGJvdHRvbVRlc3QgPVxuICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubmV3U2Nyb2xsICsgd2luZG93SGVpZ2h0ID49XG4gICAgICAgICAgICAgICAgdG90YWxIZWlnaHQgLSBzY3JvbGxNYW5hZ2VyLmZvb3RlckhlaWdodFxuICAgICAgICAgICAgY29uc29sZS5sb2coXG4gICAgICAgICAgICAgICAgYm90dG9tVGVzdCxcbiAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLm5ld1Njcm9sbCxcbiAgICAgICAgICAgICAgICB3aW5kb3dIZWlnaHQsXG4gICAgICAgICAgICAgICAgdG90YWxIZWlnaHQsXG4gICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5mb290ZXJIZWlnaHRcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIGNvbnN0IHRvcFRlc3QgPVxuICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubmV3U2Nyb2xsIDxcbiAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLm1pbmltdW1TY3JvbGxGb3JUaGVtZVN3aXRjaFxuICAgICAgICAgICAgaWYgKHRvcFRlc3QgfHwgYm90dG9tVGVzdCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1JvY2tldFRoZW1lICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci50aGVtZVRyYW5zaXRpb25EdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgncGFzdC1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGVtZSlcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ3RoZW1lLXJvY2tldCcpXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5zdHlsZS50cmFuc2l0aW9uU3BlZWQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ub3JtYWxUcmFuc2l0aW9uRHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgaXNSb2NrZXRUaGVtZSA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpc1JvY2tldFRoZW1lICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3Quc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIudGhlbWVUcmFuc2l0aW9uRHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ3Bhc3QtaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQodGhlbWUpXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCd0aGVtZS1yb2NrZXQnKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3Quc3R5bGUudHJhbnNpdGlvblNwZWVkID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubm9ybWFsVHJhbnNpdGlvbkR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlzUm9ja2V0VGhlbWUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuZGlkU2Nyb2xsID0gdHJ1ZVxuICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5zY3JvbGxVcE9yRG93bigpXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHNjcm9sbFVwT3JEb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjcm9sbE1hbmFnZXIudGltZU91dEZ4ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3J1bm5pbmcnKVxuICAgICAgICAgICAgaWYgKHNjcm9sbE1hbmFnZXIuZGlkU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgc28gdGhhdCB3ZSBrbm93IGVhY2ggY2FsbCBpcyBhIHJlYWwgY2FsbC5cbiAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmRpZFNjcm9sbCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5uZXdTY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdsYXN0IHNjcm9sbDogJyArIHNjcm9sbE1hbmFnZXIubGFzdFNjcm9sbClcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbmV3IHNjcm9sbDogJyArIG5ld1Njcm9sbClcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5sYXN0U2Nyb2xsIC0gc2Nyb2xsTWFuYWdlci5uZXdTY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgKSA8PSBzY3JvbGxNYW5hZ2VyLm1pblNjcm9sbEZvckFjdGlvblxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndG9vIGxpdHRsZScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG5ld1Njcm9sbCA+XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubGFzdFNjcm9sbCArXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLm1pblNjcm9sbERvd25Ub0JlUHJvcGVyU2Nyb2xsXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdkb3duJylcbiAgICAgICAgICAgICAgICAgICAgLy8gU2Nyb2xsIERvd25cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLnNjcm9sbGVkVXBDbGFzc1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5zY3JvbGxlZERvd25DbGFzc1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdTY3JvbGwgPCBzY3JvbGxNYW5hZ2VyLmxhc3RTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3VwJylcbiAgICAgICAgICAgICAgICAgICAgLy8gU2Nyb2xsIFVwXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5zY3JvbGxlZFVwQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuc2Nyb2xsZWREb3duQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnanVzdC1zY3JvbGxlZCcpXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuanVzdFNjcm9sbGVkRnggPSB3aW5kb3cuc2V0VGltZW91dChcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2p1c3Qtc2Nyb2xsZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubWljcm9TZWNvbmRzQmVmb3JlSnVzdFNjcm9sbGxlZFJlbW92ZWRcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdkbyBub3RoaW5nJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5sYXN0U2Nyb2xsID0gbmV3U2Nyb2xsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMClcbiAgICB9XG59XG5cbnNjcm9sbE1hbmFnZXIuaW5pdCgpXG4iLCJjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG5cbmNvbnN0IHRvYyA9ICgpID0+IHtcbiAgICAvLyBjcmVhdGUgdGhlIGNvbnRhaW5lciBkaXZcbiAgICAvLyBnZXQgYWxsIGRpdnNcbiAgICBjb25zdCBoZWFkaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICcjY29udGVudC1iZWxvdy1xdW90ZSBoMSwgI2NvbnRlbnQtYmVsb3ctcXVvdGUgaDInXG4gICAgKVxuICAgIC8vIGdldCB0aGUgYm9keSBlbGVtZW50XG4gICAgLy8gYXBwbHkgY2xhc3MgdG8gY29udGFpbmVyIGRpdlxuICAgIGlmIChoZWFkaW5ncy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnaGFzLXRvYycpXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgndG9jLW9mZicpXG4gICAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY291bnQgPSBpICsgMVxuICAgICAgICAgICAgY29uc3QgZWwgPSBoZWFkaW5nc1tpXVxuICAgICAgICAgICAgbGV0IHByZXZpb3VzRWxlbSA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcbiAgICAgICAgICAgIGlmIChwcmV2aW91c0VsZW0pIHtcbiAgICAgICAgICAgICAgICAvLyBBcHBseSBzdHlsZXMgb3IgY2xhc3NlcyB0byBwcmV2aW91c0VsZW1cbiAgICAgICAgICAgICAgICBwcmV2aW91c0VsZW0uY2xhc3NMaXN0LmFkZCgnYm90dG9tLXNwYWNlJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsLmlkID0gJ3RvYy0nICsgY291bnRcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2NvdW50YWJsZS1pY29ucycpXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdpY29uLScgKyBjb3VudClcbiAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnb3Blbi1jbG9zZScpXG4gICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2ljb24nKVxuICAgICAgICAgICAgY29uc3Qgc3BhbkVuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgc3BhbkVuZC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtaG9sZGVyJylcbiAgICAgICAgICAgIC8vIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljay5iaW5kKG51bGwsIGVsKSlcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwib3BlblwiPis8L2k+PGkgY2xhc3M9XCJjbG9zZWRcIj7igJM8L2k+J1xuICAgICAgICAgICAgc3BhbkVuZC5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJhY3RpdmVcIj7iloI8L2k+J1xuICAgICAgICAgICAgZWwuaW5zZXJ0QmVmb3JlKHNwYW4sIGVsLmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChzcGFuRW5kKVxuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgndG9jLW9uJylcbiAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb2ZmJylcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMuaWRcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgJyNjb250ZW50LWJlbG93LXF1b3RlIC50b2MtYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gaGVhZGluZ3NbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3RvYy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ3RvYy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2hcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBoYXNoKS5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLCAvLyBzbW9vdGggc2Nyb2xsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCcgLy8gdGhlIHVwcGVyIGJvcmRlciBvZiB0aGUgZWxlbWVudCB3aWxsIGJlIGFsaWduZWQgYXQgdGhlIHRvcCBvZiB0aGUgdmlzaWJsZSBwYXJ0IG9mIHRoZSB3aW5kb3cgb2YgdGhlIHNjcm9sbGFibGUgYXJlYS5cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgKVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gYm9keS5jbGFzc0xpc3QuYWRkKCduby10b2MnKVxuICAgIH1cbn1cblxudG9jKClcblxuaWYgKFxuICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID09PSAnI3RvYycgJiZcbiAgICBib2R5LmNsYXNzTGlzdC5jb250YWlucygndG9jLW9mZicpICYmXG4gICAgYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2hhcy10b2MnKVxuKSB7XG4gICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb24nKVxuICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgndG9jLW9mZicpXG59XG4iLCIvLyAvLyBub24tdGhlbWVkIGFwcFxuLy8gaW1wb3J0ICdzaXRlL2FwcC9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vL1xuLy8gLy8gdmVuZG9yIG1vZHVsZXNcbi8vIGltcG9ydCAnc2l0ZS92ZW5kb3IvbXl2ZW5kb3IvbXlwYWNrYWdlL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vIC8vIHlvdXIgdGhlbWVkIGFwcCBmaWxlc1xuLy8gaW1wb3J0ICcuL2pzL3BhcnRpYWxzL1NvbWVPdGhlckphdmFzY3JpcHRGaWxlJztcbmltcG9ydCAnLi9qcy9jb29raWUnXG5pbXBvcnQgJy4vanMvYm9keS1jbGFzcydcbmltcG9ydCAnLi9qcy9jb2xsYXBzaWJsZS1tZW51J1xuaW1wb3J0ICcuL2pzL3Njcm9sbC1tYW5hZ2VyJ1xuaW1wb3J0ICcuL2pzL2Zvb3Rlci1pcy12aXNpYmxlJ1xuaW1wb3J0ICcuL2pzL2Zvcm0nXG5pbXBvcnQgJy4vanMvbW91c2Utb3Zlci1sb2dvJ1xuaW1wb3J0ICcuL2pzL2ltYWdlcydcbmltcG9ydCAnLi9qcy90b2MnXG4iXSwibmFtZXMiOlsibXlDb29raWUiLCJib2R5Q2xhc3MiLCJib2R5T2JqZWN0IiwiaW5pdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZE9yVG9nZ2xlQm9keUNsYXNzIiwicmV0cmlldmVDb29raWVPckhhc2giLCJ3aW5kb3ciLCJzZXRUaW1lb3V0Iiwic2Nyb2xsVG8iLCJzY3JvbGxYIiwic2Nyb2xsWSIsImhhc2giLCJnZXRIYXNoRnJvbVVSTCIsImdldEVsZW1lbnRCeUlkIiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsImJsb2NrIiwiYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiZXZlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJkb2N1bWVudEVsZW1lbnQiLCJhZGRSb2NrZXRNb2RlIiwicHJlZmVycmVkVGhlbWUiLCJlcmFzZUNvb2tpZSIsInJ1bkNsaWNrRm9yRWxlbWVudCIsImdldENvb2tpZSIsInNldEF0dHJpYnV0ZSIsInVzZXJQcmVmZXJzRGFya1RoZW1lIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJ0cmltIiwibGVuZ3RoIiwib2JqIiwiY29udGFpbnMiLCJyZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGUiLCJvYmpTZWxlY3RvciIsImlzVGhlbWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIm9uZUVhY2hPYmplY3QiLCJhY3Rpb25Cb2R5Q2xhc3NDaGFuZ2UiLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNsYXNzIiwiaWQiLCJoYXNBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJ0b2dnbGUiLCJzZXRDb29raWUiLCJnZXRIYXNoRnJvbVN0cmluZyIsInJlcGxhY2UiLCJsb2NhdGlvbiIsIiRvYmplY3QiLCJzdHJpbmciLCJjbGFzc2VzIiwiZ2V0Q2xhc3Nlc0Zyb21MaXN0IiwiaSIsImxlbiIsInZhbHVlIiwiYXJyYXkiLCJzcGxpdCIsIm5ld0FycmF5IiwicHVzaCIsIlN0cmluZyIsInJldHJpZXZlSGFzU2lnbkZyb21TdHJpbmciLCJkaXYiLCJjcmVhdGVFbGVtZW50Iiwic2hhZG93Iiwic2hhZG93Q29sb3VyIiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJ0ZW1wIiwiZmlyc3RDaGlsZCIsImluc2VydEJlZm9yZSIsImlzSG9tZVBhZ2UiLCJwYXRobmFtZSIsImhhc0ZyYWdtZW50IiwiQ29sbGFwc2libGVMaXN0cyIsImFwcGx5IiwiZG9Ob3RSZWN1cnNlIiwiY2FsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibm9kZSIsImFwcGx5VG8iLCJzdWJub2RlIiwiaGFzT3BlblN1Ykxpc3QiLCJlbCIsImxpc3QiLCJjbG9zZXN0IiwibGkiLCJwYXJlbnROb2RlIiwidXNlclNlbGVjdCIsIk1velVzZXJTZWxlY3QiLCJtc1VzZXJTZWxlY3QiLCJXZWJraXRVc2VyU2VsZWN0IiwidWwiLCJzcGFuIiwiaGFuZGxlQ2xpY2siLCJiaW5kIiwiaW5uZXJIVE1MIiwiZSIsInRhcmdldCIsIm5vZGVOYW1lIiwib3BlbiIsInVscyIsImRpc3BsYXkiLCJuYW1lIiwiZGF5cyIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9VVENTdHJpbmciLCJjb29raWUiLCJuYW1lRVEiLCJjYSIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwiZm9vdGVySXNWaXNpYmxlIiwiaW50ZXJzZWN0aW9uT2JzZXJ2ZXJPcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJvYnNlcnZlciIsIkludGVyc2VjdGlvbk9ic2VydmVyIiwib25JbnRlcnNlY3Rpb24iLCJvYnNlcnZlIiwiZW50cmllcyIsImVudHJ5IiwiaW50ZXJzZWN0aW9uUmF0aW8iLCJmb3JtZmllbGRzIiwiSiIsImFkanVzdFN0eWxpbmciLCJldnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJ6RXZlbnQiLCJpbnBWYWwiLCJpbWFnZVdyYXBwZXIiLCJ3cmFwIiwid3JhcHBlciIsImFwcGVuZENoaWxkIiwiaW1hZ2VzIiwiZHYiLCJpbWciLCJzaG93Um9ja2V0TW9kZSIsInRvZ2dsZUNsYXNzT25Ib3ZlciIsInR5cGUiLCJsb2dvIiwic2Nyb2xsTWFuYWdlciIsIm1pY3JvU2Vjb25kc0JlZm9yZUp1c3RTY3JvbGxsZWRSZW1vdmVkIiwibWluU2Nyb2xsRm9yQWN0aW9uIiwibWluU2Nyb2xsRG93blRvQmVQcm9wZXJTY3JvbGwiLCJub3JtYWxUcmFuc2l0aW9uRHVyYXRpb24iLCJ0aGVtZVRyYW5zaXRpb25EdXJhdGlvbiIsImZvb3RlckhlaWdodCIsIm5ld1Njcm9sbCIsIm1pbmltdW1TY3JvbGxGb3JUaGVtZVN3aXRjaCIsImxhc3RTY3JvbGwiLCJkaWRTY3JvbGwiLCJ0aW1lT3V0RngiLCJqdXN0U2Nyb2xsZWRGeCIsInNjcm9sbGVkVXBDbGFzcyIsInNjcm9sbGVkRG93bkNsYXNzIiwic2Nyb2xsTGlzdGVuZXIiLCJzY3JvbGxVcE9yRG93biIsImN1cnJlbnRTY3JvbGwiLCJvZmZzZXRIZWlnaHQiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJnZXRUaGVtZSIsInBhcnNlSW50Iiwic2Nyb2xsVG9wIiwiaXNSb2NrZXRUaGVtZSIsImNsZWFyVGltZW91dCIsInRoZW1lIiwid2luZG93SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJ0b3RhbEhlaWdodCIsInNjcm9sbEhlaWdodCIsImJvdHRvbVRlc3QiLCJjb25zb2xlIiwibG9nIiwidG9wVGVzdCIsInRyYW5zaXRpb25TcGVlZCIsIk1hdGgiLCJhYnMiLCJib2R5IiwidG9jIiwiaGVhZGluZ3MiLCJjb3VudCIsIl9sb29wIiwicHJldmlvdXNFbGVtIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInNwYW5FbmQiXSwic291cmNlUm9vdCI6IiJ9