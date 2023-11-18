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
    this.lastScroll = this.currentScroll();
    window.setTimeout(function () {
      window.scrollTo(window.scrollX, this.currentScroll() - this.minScrollForAction - 1);
    }, 50);
    this.footerHeight = document.querySelector('footer');
    this.normalTransitionDuration = scrollManager.bodyObject.style.transitionDuration;
  },
  footerHeight: 0,
  normalTransitionDuration: 0,
  themeTransitionDuration: '1.5s',
  newScroll: 0,
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
      var theme = getTheme();
      this.newScroll = this.currentScroll();
      var windowHeight = window.innerHeight;
      var totalHeight = document.documentElement.scrollHeight;

      // Check if current scroll position is at the bottom minus the footer's height
      var bottomTest = scrollPosition + windowHeight >= totalHeight - footerHeight;
      var topTest = scrollPosition < 20;
      if (topTest || bottomTest) {
        if (isRocketTheme !== true) {
          scrollManager.bodyObject.style.transitionDuration = this.themeTransitionDuration;
          scrollManager.bodyObject.classList.remove('past-header');
          scrollManager.bodyObject.classList.remove(theme);
          scrollManager.bodyObject.classList.add('theme-rocket');
          scrollManager.bodyObject.style.transitionSpeed = this.normalTransitionDuration;
          isRocketTheme = true;
        }
      } else {
        if (isRocketTheme !== false) {
          scrollManager.bodyObject.style.transitionDuration = this.themeTransitionDuration;
          scrollManager.bodyObject.classList.add('past-header');
          scrollManager.bodyObject.classList.add(theme);
          scrollManager.bodyObject.classList.remove('theme-rocket');
          scrollManager.bodyObject.style.transitionSpeed = this.normalTransitionDuration;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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TUFBTTtJQUNIO0VBQUE7QUFFUixDQUFDO0FBRURILEdBQUcsQ0FBQyxDQUFDO0FBRUwsSUFDSXhMLE1BQU0sQ0FBQytDLFFBQVEsQ0FBQzFDLElBQUksS0FBSyxNQUFNLElBQy9Ca0wsSUFBSSxDQUFDekssU0FBUyxDQUFDZ0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUNsQ3lKLElBQUksQ0FBQ3pLLFNBQVMsQ0FBQ2dCLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFDcEM7RUFDRXlKLElBQUksQ0FBQ3pLLFNBQVMsQ0FBQzZCLE1BQU0sQ0FBQyxRQUFRLENBQUM7RUFDL0I0SSxJQUFJLENBQUN6SyxTQUFTLENBQUM2QixNQUFNLENBQUMsU0FBUyxDQUFDO0FBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQjtBQUNJO0FBQ007QUFDRjtBQUNHO0FBQ2I7QUFDVztBQUNUIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvYm9keS1jbGFzcy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9jb2xsYXBzaWJsZS1tZW51LmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2Nvb2tpZS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9mb290ZXItaXMtdmlzaWJsZS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9mb3JtLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2ltYWdlcy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9tb3VzZS1vdmVyLWxvZ28uanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvc2Nyb2xsLW1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvdG9jLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbXlDb29raWUgfSBmcm9tICcuL2Nvb2tpZS5qcydcblxuY29uc3QgYm9keUNsYXNzID0ge1xuICAgIGJvZHlPYmplY3Q6IG51bGwsXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgICAgIGJvZHlDbGFzcy5hZGRPclRvZ2dsZUJvZHlDbGFzcygnI21lbnUtdG9nZ2xlJywgZmFsc2UpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJvZHlDbGFzcy5pc0hvbWVQYWdlKCkpXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGJvZHlDbGFzcy5oYXNGcmFnbWVudCgpKVxuICAgICAgICAvLyBpZiAoXG4gICAgICAgIC8vICAgICBib2R5Q2xhc3MuaXNIb21lUGFnZSgpID09PSB0cnVlICYmXG4gICAgICAgIC8vICAgICBib2R5Q2xhc3MuaGFzRnJhZ21lbnQoKSA9PT0gZmFsc2VcbiAgICAgICAgLy8gKSB7XG4gICAgICAgIC8vICAgICAvLyBjb25zb2xlLmxvZygnb3BlbmluZyBtZW51JylcbiAgICAgICAgLy8gICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZW51LXRvZ2dsZScpLmNsaWNrKClcbiAgICAgICAgLy8gfVxuICAgICAgICAvLyBpZiB5b3UgY2xpY2sgb24gdGhlbWUtc2VsZWN0b3IsIHlvdSBzZWxlY3QgdGhlIHRoZW1lXG4gICAgICAgIGJvZHlDbGFzcy5hZGRPclRvZ2dsZUJvZHlDbGFzcygnLnRoZW1lLXNlbGVjdG9yJywgdHJ1ZSlcbiAgICAgICAgLy8gaWYgeW91IGNsaWNrIG9uIHNldC10aGVtLCB5b3Ugc2VsZWN0IHRoZSB0aGVtZVxuICAgICAgICBib2R5Q2xhc3MuYWRkT3JUb2dnbGVCb2R5Q2xhc3MoJy5zZXQtdGhlbWUnLCB0cnVlKVxuICAgICAgICBib2R5Q2xhc3MucmV0cmlldmVDb29raWVPckhhc2goKVxuICAgICAgICAvLyBleHBvc2Ugc2Nyb2xsZWQgYmVoYXZpb3VyXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkgKyAyKVxuICAgICAgICAgICAgd2luZG93LnNjcm9sbFRvKHdpbmRvdy5zY3JvbGxYLCB3aW5kb3cuc2Nyb2xsWSAtIDIpXG4gICAgICAgICAgICBjb25zdCBoYXNoID0gYm9keUNsYXNzLmdldEhhc2hGcm9tVVJMKClcbiAgICAgICAgICAgIGlmIChoYXNoICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBoYXNoKS5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJywgLy8gc21vb3RoIHNjcm9sbFxuICAgICAgICAgICAgICAgICAgICBibG9jazogJ3N0YXJ0JyAvLyB0aGUgdXBwZXIgYm9yZGVyIG9mIHRoZSBlbGVtZW50IHdpbGwgYmUgYWxpZ25lZCBhdCB0aGUgdG9wIG9mIHRoZSB2aXNpYmxlIHBhcnQgb2YgdGhlIHdpbmRvdyBvZiB0aGUgc2Nyb2xsYWJsZSBhcmVhLlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMClcbiAgICAgICAgdGhpcy5hZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycygpXG4gICAgfSxcblxuICAgIGFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktbG9hZGVkJylcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ3RvdWNoJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnbm8tdG91Y2gnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keUNsYXNzLmFkZFJvY2tldE1vZGUoKVxuICAgICAgICB9KVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnYm9keS11bmxvYWRlZCcpXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHJldHJpZXZlQ29va2llT3JIYXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBoYXNoID0gYm9keUNsYXNzLmdldEhhc2hGcm9tVVJMKClcbiAgICAgICAgbGV0IHByZWZlcnJlZFRoZW1lID0gJydcbiAgICAgICAgaWYgKGhhc2ggPT09ICdyZXNldCcpIHtcbiAgICAgICAgICAgIG15Q29va2llLmVyYXNlQ29va2llKCdwcmVmZXJyZWRUaGVtZScpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzaCkge1xuICAgICAgICAgICAgdGhpcy5ydW5DbGlja0ZvckVsZW1lbnQoaGFzaClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZWZlcnJlZFRoZW1lID0gbXlDb29raWUuZ2V0Q29va2llKCdwcmVmZXJyZWRUaGVtZScpXG4gICAgICAgICAgICBpZiAocHJlZmVycmVkVGhlbWUpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCBwcmVmZXJyZWRUaGVtZSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9keUNsYXNzLnVzZXJQcmVmZXJzRGFya1RoZW1lKCkpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAndGhlbWUtbW9vbicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXNlclByZWZlcnNEYXJrVGhlbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHdpbmRvdy5tYXRjaE1lZGlhICYmXG4gICAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXNcbiAgICAgICAgKVxuICAgIH0sXG5cbiAgICBydW5DbGlja0ZvckVsZW1lbnQ6IGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICAgIGhhc2ggPSBoYXNoLnRyaW0oKVxuICAgICAgICBpZiAoaGFzaC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpXG4gICAgICAgICAgICBpZiAob2JqICYmIG9iai5jbGFzc0xpc3QuY29udGFpbnMoJ3RoZW1lLXNlbGVjdG9yJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZShvYmopXG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZChoYXNoKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcblxuICAgIGFkZE9yVG9nZ2xlQm9keUNsYXNzOiBmdW5jdGlvbiAob2JqU2VsZWN0b3IsIGlzVGhlbWUpIHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKG9ialNlbGVjdG9yKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKG9uZUVhY2hPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBvbmVFYWNoT2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5hY3Rpb25Cb2R5Q2xhc3NDaGFuZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmVFYWNoT2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RoZW1lXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgfSxcblxuICAgIGFjdGlvbkJvZHlDbGFzc0NoYW5nZTogZnVuY3Rpb24gKG9uZUVhY2hPYmplY3QsIGV2ZW50LCBpc1RoZW1lLCBzY3JvbGxUbykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgYm9keUNsYXNzLnJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZShvbmVFYWNoT2JqZWN0KVxuXG4gICAgICAgIGxldCB0b2dnbGVDbGFzcyA9ICcnXG4gICAgICAgIGxldCBpZCA9ICcnXG4gICAgICAgIGlmIChvbmVFYWNoT2JqZWN0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hZGQtY2xhc3MnKSkge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MgPSBvbmVFYWNoT2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1hZGQtY2xhc3MnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MgPSBvbmVFYWNoT2JqZWN0LmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgICAgICAgaWQgPSB0b2dnbGVDbGFzc1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbmVFYWNoT2JqZWN0Lmhhc0F0dHJpYnV0ZSgnZGF0YS10b2dnbGUtcmF0aGVyLXRoYW4tYWRkJykpIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC50b2dnbGUodG9nZ2xlQ2xhc3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKHRvZ2dsZUNsYXNzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVGhlbWUpIHtcbiAgICAgICAgICAgIG15Q29va2llLnNldENvb2tpZSgncHJlZmVycmVkVGhlbWUnLCB0b2dnbGVDbGFzcywgMTQpXG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCB0b2dnbGVDbGFzcylcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWQgJiYgc2Nyb2xsVG8pIHtcbiAgICAgICAgICAgIGxldCBoYXNoID0gYm9keUNsYXNzLmdldEhhc2hGcm9tU3RyaW5nKGlkKVxuICAgICAgICAgICAgaWYgKGhhc2gubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaGFzaCA9IGhhc2gucmVwbGFjZSgnIycsICcnKVxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyMnICsgaGFzaFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZTogZnVuY3Rpb24gKCRvYmplY3QpIHtcbiAgICAgICAgaWYgKCRvYmplY3QuaGFzQXR0cmlidXRlKCdkYXRhLXJlbW92ZS1jbGFzcycpKSB7XG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgPSAkb2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZW1vdmUtY2xhc3MnKVxuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IGJvZHlDbGFzcy5nZXRDbGFzc2VzRnJvbUxpc3Qoc3RyaW5nKVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNsYXNzZXNbaV1cbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldENsYXNzZXNGcm9tTGlzdDogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICBjb25zdCBhcnJheSA9IHN0cmluZy5zcGxpdCgnLCcpXG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGFycmF5W2ldLnRyaW0oKVxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbmV3QXJyYXkucHVzaCh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3QXJyYXlcbiAgICB9LFxuXG4gICAgZ2V0SGFzaEZyb21VUkw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhhc2hcbiAgICAgICAgcmV0dXJuIGJvZHlDbGFzcy5nZXRIYXNoRnJvbVN0cmluZyhzdHJpbmcpXG4gICAgfSxcblxuICAgIGdldEhhc2hGcm9tU3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIHN0cmluZyA9IFN0cmluZyhzdHJpbmcpXG4gICAgICAgIHJldHVybiBib2R5Q2xhc3MucmV0cmlldmVIYXNTaWduRnJvbVN0cmluZyhzdHJpbmcpXG4gICAgfSxcblxuICAgIHJldHJpZXZlSGFzU2lnbkZyb21TdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKCcjJywgJycpXG4gICAgfSxcblxuICAgIGFkZFJvY2tldE1vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3Qgc2hhZG93ID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2RhdGEtc2hhZG93LW92ZXItbG9nbydcbiAgICAgICAgKVxuICAgICAgICBsZXQgc2hhZG93Q29sb3VyID0gJydcbiAgICAgICAgaWYgKHNoYWRvdyA9PT0gJ2RhcmsnKSB7XG4gICAgICAgICAgICBzaGFkb3dDb2xvdXIgPVxuICAgICAgICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMjU4ZGVnLCAjMDAwMDAwMzAgMzAlLCB0cmFuc3BhcmVudCA2MCUpLCAnXG4gICAgICAgIH0gZWxzZSBpZiAoc2hhZG93ID09PSAnbGlnaHQnKSB7XG4gICAgICAgICAgICBzaGFkb3dDb2xvdXIgPVxuICAgICAgICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMjU4ZGVnLCAjRkZGRkZGMzAgMzAlLCB0cmFuc3BhcmVudCA2MCUpLCAnXG4gICAgICAgIH1cbiAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XG4gICAgICAgICAgICBzaGFkb3dDb2xvdXIgK1xuICAgICAgICAgICAgJ3VybCgnICtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1iZy1pbWFnZScpICtcbiAgICAgICAgICAgICcpJ1xuICAgICAgICBkaXYuaWQgPSAnQmFja2dyb3VuZEltYWdlJ1xuICAgICAgICBjb25zdCB0ZW1wID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZmlyc3RDaGlsZFxuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5pbnNlcnRCZWZvcmUoZGl2LCB0ZW1wKVxuICAgIH0sXG5cbiAgICBpc0hvbWVQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJ1xuICAgIH0sXG4gICAgaGFzRnJhZ21lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9PSAnJ1xuICAgIH1cbn1cblxuYm9keUNsYXNzLmluaXQoKVxuIiwiLypcblxuQ29sbGFwc2libGVMaXN0cy5qc1xuXG5BbiBvYmplY3QgYWxsb3dpbmcgbGlzdHMgdG8gZHluYW1pY2FsbHkgZXhwYW5kIGFuZCBjb2xsYXBzZVxuXG5DcmVhdGVkIGJ5IEthdGUgTW9ybGV5IC0gaHR0cDovL2NvZGUuaWFta2F0ZS5jb20vIC0gYW5kIHJlbGVhc2VkIHVuZGVyIHRoZSB0ZXJtc1xub2YgdGhlIENDMCAxLjAgVW5pdmVyc2FsIGxlZ2FsIGNvZGU6XG5cbmh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL3B1YmxpY2RvbWFpbi96ZXJvLzEuMC9sZWdhbGNvZGVcblxuKi9cblxuY29uc3QgQ29sbGFwc2libGVMaXN0cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgLy8gTWFrZXMgYWxsIGxpc3RzIHdpdGggdGhlIGNsYXNzICdjb2xsYXBzaWJsZUxpc3QnIGNvbGxhcHNpYmxlLiBUaGVcbiAgICAvLyBwYXJhbWV0ZXIgaXM6XG4gICAgLy9cbiAgICAvLyBkb05vdFJlY3Vyc2UgLSB0cnVlIGlmIHN1Yi1saXN0cyBzaG91bGQgbm90IGJlIG1hZGUgY29sbGFwc2libGVcbiAgICBmdW5jdGlvbiBhcHBseSAoZG9Ob3RSZWN1cnNlKSB7XG4gICAgICAgIDtbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyksIG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3QnKSkge1xuICAgICAgICAgICAgICAgIGFwcGx5VG8obm9kZSwgdHJ1ZSlcblxuICAgICAgICAgICAgICAgIGlmICghZG9Ob3RSZWN1cnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIDtbXS5mb3JFYWNoLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3Vibm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vibm9kZS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhhc09wZW5TdWJMaXN0KG5vZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzT3BlblN1Ykxpc3QgKGVsKSB7XG4gICAgICAgIGNvbnN0IGxpc3QgPSBlbC5jbG9zZXN0KCcuY29sbGFwc2libGVMaXN0JylcbiAgICAgICAgaWYgKGxpc3QpIHtcbiAgICAgICAgICAgIGlmIChsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb2xsYXBzaWJsZUxpc3RPcGVuJykubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgbGlzdC5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3RIYXNPcGVuJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGlzdC5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RIYXNPcGVuJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2VzIHRoZSBzcGVjaWZpZWQgbGlzdCBjb2xsYXBzaWJsZS4gVGhlIHBhcmFtZXRlcnMgYXJlOlxuICAgIC8vXG4gICAgLy8gbm9kZSAgICAgICAgIC0gdGhlIGxpc3QgZWxlbWVudFxuICAgIC8vIGRvTm90UmVjdXJzZSAtIHRydWUgaWYgc3ViLWxpc3RzIHNob3VsZCBub3QgYmUgbWFkZSBjb2xsYXBzaWJsZVxuICAgIGZ1bmN0aW9uIGFwcGx5VG8gKG5vZGUsIGRvTm90UmVjdXJzZSkge1xuICAgICAgICA7W10uZm9yRWFjaC5jYWxsKG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyksIGxpID0+IHtcbiAgICAgICAgICAgIGlmICghZG9Ob3RSZWN1cnNlIHx8IG5vZGUgPT09IGxpLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgbGkuc3R5bGUuTW96VXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLm1zVXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLldlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICBjb25zdCB1bCA9IGxpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpXG4gICAgICAgICAgICAgICAgaWYgKHVsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ29wZW4tY2xvc2UnKVxuICAgICAgICAgICAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2suYmluZChudWxsLCBsaSkpXG4gICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cIm9wZW5cIj4mbmJzcDs8L2k+PGkgY2xhc3M9XCJjbG9zZWRcIj7ihrA8L2k+J1xuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHRvZ2dsZSBhbGwgb2YgdGhlbSwgc29tZSB0d2ljZVxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlY3Rpb24nKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JylcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGUobGkpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlKGxpKVxuICAgICAgICAgICAgICAgICAgICBsaS5pbnNlcnRCZWZvcmUoc3BhbiwgdWxbMF0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIEhhbmRsZXMgYSBjbGljay4gVGhlIHBhcmFtZXRlciBpczpcbiAgICAvL1xuICAgIC8vIG5vZGUgLSB0aGUgbm9kZSBmb3Igd2hpY2ggY2xpY2tzIGFyZSBiZWluZyBoYW5kbGVkXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2sgKG5vZGUsIGUpIHtcbiAgICAgICAgbGV0IGxpID0gZS50YXJnZXRcbiAgICAgICAgd2hpbGUgKGxpLm5vZGVOYW1lICE9PSAnTEknKSB7XG4gICAgICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaSA9PT0gbm9kZSkge1xuICAgICAgICAgICAgdG9nZ2xlKG5vZGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPcGVucyBvciBjbG9zZXMgdGhlIHVub3JkZXJlZCBsaXN0IGVsZW1lbnRzIGRpcmVjdGx5IHdpdGhpbiB0aGVcbiAgICAvLyBzcGVjaWZpZWQgbm9kZS4gVGhlIHBhcmFtZXRlciBpczpcbiAgICAvL1xuICAgIC8vIG5vZGUgLSB0aGUgbm9kZSBjb250YWluaW5nIHRoZSB1bm9yZGVyZWQgbGlzdCBlbGVtZW50c1xuICAgIGZ1bmN0aW9uIHRvZ2dsZSAobm9kZSkge1xuICAgICAgICBjb25zdCBvcGVuID0gbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG4gICAgICAgIGNvbnN0IHVscyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJylcblxuICAgICAgICA7W10uZm9yRWFjaC5jYWxsKHVscywgdWwgPT4ge1xuICAgICAgICAgICAgbGV0IGxpID0gdWxcbiAgICAgICAgICAgIHdoaWxlIChsaS5ub2RlTmFtZSAhPT0gJ0xJJykge1xuICAgICAgICAgICAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobGkgPT09IG5vZGUpIHtcbiAgICAgICAgICAgICAgICB1bC5zdHlsZS5kaXNwbGF5ID0gb3BlbiA/ICdibG9jaycgOiAnbm9uZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKVxuICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG5cbiAgICAgICAgaWYgKHVscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdCcgKyAob3BlbiA/ICdPcGVuJyA6ICdDbG9zZWQnKSlcbiAgICAgICAgfVxuICAgICAgICBoYXNPcGVuU3ViTGlzdChub2RlKVxuICAgIH1cblxuICAgIHJldHVybiB7IGFwcGx5LCBhcHBseVRvIH1cbn0pKClcblxuQ29sbGFwc2libGVMaXN0cy5hcHBseSgpXG4iLCJjb25zdCBteUNvb2tpZSA9IHtcblxuICBzZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZGF5cykge1xuICAgIHZhciBleHBpcmVzID0gJydcbiAgICBpZiAodHlwZW9mIGRheXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkYXlzID0gMTRcbiAgICB9XG4gICAgaWYgKGRheXMpIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSlcbiAgICAgIGV4cGlyZXMgPSAnOyBleHBpcmVzPScgKyBkYXRlLnRvVVRDU3RyaW5nKClcbiAgICB9XG4gICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArICc9JyArICh2YWx1ZSB8fCAnJykgKyBleHBpcmVzICsgJzsgcGF0aD0vJ1xuICB9LFxuXG4gIGdldENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgbmFtZUVRID0gbmFtZSArICc9J1xuICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBjYVtpXVxuICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7XG4gICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICBlcmFzZUNvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBteUNvb2tpZS5zZXRDb29raWUobmFtZSwgbnVsbCwgMClcbiAgfVxufVxuXG5leHBvcnQgeyBteUNvb2tpZSB9XG4iLCJcbmNvbnN0IGZvb3RlcklzVmlzaWJsZSA9IHtcblxuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gdGhpcyBpcyB0aGUgdGFyZ2V0IHdoaWNoIGlzIG9ic2VydmVkXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvb3RlcicpXG5cbiAgICAvLyBjb25maWd1cmUgdGhlIGludGVyc2VjdGlvbiBvYnNlcnZlciBpbnN0YW5jZVxuICAgIHZhciBpbnRlcnNlY3Rpb25PYnNlcnZlck9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogJzE1MHB4JyxcbiAgICAgIHRocmVzaG9sZDogMS4wXG4gICAgfVxuXG4gICAgdmFyIG9ic2VydmVyID0gbmV3IHdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlcihvbkludGVyc2VjdGlvbiwgaW50ZXJzZWN0aW9uT2JzZXJ2ZXJPcHRpb25zKVxuXG4gICAgLy8gcHJvdmlkZSB0aGUgb2JzZXJ2ZXIgd2l0aCBhIHRhcmdldFxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0KVxuXG4gICAgZnVuY3Rpb24gb25JbnRlcnNlY3Rpb24gKGVudHJpZXMpIHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChcbiAgICAgICAgZW50cnkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUuY2xlYXIoKVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVudHJ5LmludGVyc2VjdGlvblJhdGlvKVxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QudG9nZ2xlKFxuICAgICAgICAgICAgJ2Zvb3Rlci12aXNpYmxlJyxcbiAgICAgICAgICAgIGVudHJ5LmludGVyc2VjdGlvblJhdGlvID49IDFcbiAgICAgICAgICApXG4gICAgICAgICAgLy8gQXJlIHdlIGluIHZpZXdwb3J0P1xuICAgICAgICAgIC8vIGlmIChlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+IDEpIHtcbiAgICAgICAgICAvLyBTdG9wIHdhdGNoaW5nXG4gICAgICAgICAgLy8gb2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG59XG5cbmZvb3RlcklzVmlzaWJsZS5pbml0KClcbiIsInZhciBmb3JtZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJ1xuKVxuZm9yICh2YXIgSiA9IGZvcm1maWVsZHMubGVuZ3RoIC0gMTsgSiA+PSAwOyAtLUopIHtcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuXG4gIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpXG4gIGV2dC5pbml0RXZlbnQoJ2NoYW5nZScsIGZhbHNlLCB0cnVlKVxuICBmb3JtZmllbGRzW0pdLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuXG5mdW5jdGlvbiBhZGp1c3RTdHlsaW5nICh6RXZlbnQpIHtcbiAgdmFyIGlucFZhbCA9IHpFdmVudC50YXJnZXQudmFsdWVcbiAgaWYgKGlucFZhbCAmJiBpbnBWYWwucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpKSB7XG4gICAgekV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCduby12YWx1ZScpXG4gIH0gZWxzZSB7XG4gICAgekV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCduby12YWx1ZScpXG4gIH1cbn1cbiIsIlxuY29uc3QgaW1hZ2VXcmFwcGVyID0gKCkgPT4ge1xuICBmdW5jdGlvbiB3cmFwIChlbCwgd3JhcHBlcikge1xuICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGVsKVxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZWwpXG4gIH1cbiAgLy8gY3JlYXRlIHRoZSBjb250YWluZXIgZGl2XG5cbiAgLy8gZ2V0IGFsbCBkaXZzXG4gIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50eXBvZ3JhcGh5IGltZycpXG4gIC8vIGdldCB0aGUgYm9keSBlbGVtZW50XG4gIC8vIGFwcGx5IGNsYXNzIHRvIGNvbnRhaW5lciBkaXZcblxuICAvLyBmaW5kIG91dCBhbGwgdGhvc2UgZGl2cyBoYXZpbmcgY2xhc3MgQ1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGR2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ltYWdlLWNvbnRhaW5lcicpXG4gICAgY29uc3QgaW1nID0gaW1hZ2VzW2ldXG4gICAgd3JhcChpbWcsIGR2KVxuICB9XG59XG5cbmltYWdlV3JhcHBlcigpXG4iLCJjb25zdCBzaG93Um9ja2V0TW9kZSA9IHtcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRvZ2dsZUNsYXNzT25Ib3ZlciA9IChlKSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICAgICAgLmNsYXNzTGlzdFxuICAgICAgICAudG9nZ2xlKCdtb3VzZS1vdmVyLWxvZ28nLCBlLnR5cGUgPT09ICdtb3VzZWVudGVyJylcbiAgICB9XG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvJylcbiAgICBsb2dvLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0b2dnbGVDbGFzc09uSG92ZXIpXG4gICAgbG9nby5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdG9nZ2xlQ2xhc3NPbkhvdmVyKVxuICB9XG59XG5cbnNob3dSb2NrZXRNb2RlLmluaXQoKVxuIiwiY29uc3Qgc2Nyb2xsTWFuYWdlciA9IHtcbiAgICBtaWNyb1NlY29uZHNCZWZvcmVKdXN0U2Nyb2xsbGVkUmVtb3ZlZDogNTAwMCxcblxuICAgIG1pblNjcm9sbEZvckFjdGlvbjogMixcblxuICAgIG1pblNjcm9sbERvd246IDEwMCxcblxuICAgIGxhc3RTY3JvbGw6IDAsXG5cbiAgICBkaWRTY3JvbGw6IDAsXG5cbiAgICBib2R5T2JqZWN0OiBudWxsLFxuXG4gICAgdGltZU91dEZ4OiBudWxsLFxuXG4gICAganVzdFNjcm9sbGVkRng6IG51bGwsXG5cbiAgICBzY3JvbGxlZFVwQ2xhc3M6ICdzY3JvbGxlZC11cCcsXG5cbiAgICBzY3JvbGxlZERvd25DbGFzczogJ3Njcm9sbGVkLWRvd24nLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICAgICAgdGhpcy5zY3JvbGxMaXN0ZW5lcigpXG4gICAgICAgIHRoaXMuc2Nyb2xsVXBPckRvd24oKVxuICAgICAgICB0aGlzLmxhc3RTY3JvbGwgPSB0aGlzLmN1cnJlbnRTY3JvbGwoKVxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFgsXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U2Nyb2xsKCkgLSB0aGlzLm1pblNjcm9sbEZvckFjdGlvbiAtIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgfSwgNTApXG4gICAgICAgIHRoaXMuZm9vdGVySGVpZ2h0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyJylcbiAgICAgICAgdGhpcy5ub3JtYWxUcmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvblxuICAgIH0sXG5cbiAgICBmb290ZXJIZWlnaHQ6IDAsXG5cbiAgICBub3JtYWxUcmFuc2l0aW9uRHVyYXRpb246IDAsXG5cbiAgICB0aGVtZVRyYW5zaXRpb25EdXJhdGlvbjogJzEuNXMnLFxuXG4gICAgbmV3U2Nyb2xsOiAwLFxuXG4gICAgZ2V0VGhlbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmcoc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScpKVxuICAgIH0sXG5cbiAgICBjdXJyZW50U2Nyb2xsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBwYXJzZUludCh3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wKVxuICAgIH0sXG5cbiAgICBzY3JvbGxMaXN0ZW5lcjogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgaXNSb2NrZXRUaGVtZSA9IG51bGxcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoc2Nyb2xsTWFuYWdlci50aW1lT3V0RngpXG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHNjcm9sbE1hbmFnZXIuanVzdFNjcm9sbGVkRngpXG4gICAgICAgICAgICBjb25zdCB0aGVtZSA9IGdldFRoZW1lKClcbiAgICAgICAgICAgIHRoaXMubmV3U2Nyb2xsID0gdGhpcy5jdXJyZW50U2Nyb2xsKClcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgY29uc3QgdG90YWxIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0XG5cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIGlzIGF0IHRoZSBib3R0b20gbWludXMgdGhlIGZvb3RlcidzIGhlaWdodFxuICAgICAgICAgICAgY29uc3QgYm90dG9tVGVzdCA9XG4gICAgICAgICAgICAgICAgc2Nyb2xsUG9zaXRpb24gKyB3aW5kb3dIZWlnaHQgPj0gdG90YWxIZWlnaHQgLSBmb290ZXJIZWlnaHRcbiAgICAgICAgICAgIGNvbnN0IHRvcFRlc3QgPSBzY3JvbGxQb3NpdGlvbiA8IDIwXG4gICAgICAgICAgICBpZiAodG9wVGVzdCB8fCBib3R0b21UZXN0KSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUm9ja2V0VGhlbWUgIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRoZW1lVHJhbnNpdGlvbkR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdwYXN0LWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKHRoZW1lKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgndGhlbWUtcm9ja2V0JylcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LnN0eWxlLnRyYW5zaXRpb25TcGVlZCA9XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm5vcm1hbFRyYW5zaXRpb25EdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBpc1JvY2tldFRoZW1lID0gdHJ1ZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzUm9ja2V0VGhlbWUgIT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50aGVtZVRyYW5zaXRpb25EdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgncGFzdC1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCh0aGVtZSlcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3RoZW1lLXJvY2tldCcpXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5zdHlsZS50cmFuc2l0aW9uU3BlZWQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5ub3JtYWxUcmFuc2l0aW9uRHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgaXNSb2NrZXRUaGVtZSA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5kaWRTY3JvbGwgPSB0cnVlXG4gICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLnNjcm9sbFVwT3JEb3duKClcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgc2Nyb2xsVXBPckRvd246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgc2Nyb2xsTWFuYWdlci50aW1lT3V0RnggPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygncnVubmluZycpXG4gICAgICAgICAgICBpZiAoc2Nyb2xsTWFuYWdlci5kaWRTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAvLyByZXNldCBzbyB0aGF0IHdlIGtub3cgZWFjaCBjYWxsIGlzIGEgcmVhbCBjYWxsLlxuICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuZGlkU2Nyb2xsID0gZmFsc2VcbiAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLm5ld1Njcm9sbCA9IHdpbmRvdy5zY3JvbGxZXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2xhc3Qgc2Nyb2xsOiAnICsgc2Nyb2xsTWFuYWdlci5sYXN0U2Nyb2xsKVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCduZXcgc2Nyb2xsOiAnICsgbmV3U2Nyb2xsKVxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoc2Nyb2xsTWFuYWdlci5sYXN0U2Nyb2xsIC0gbmV3U2Nyb2xsKSA8PVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLm1pblNjcm9sbEZvckFjdGlvblxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndG9vIGxpdHRsZScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG5ld1Njcm9sbCA+XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubGFzdFNjcm9sbCArIHNjcm9sbE1hbmFnZXIubWluU2Nyb2xsRG93blxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZG93bicpXG4gICAgICAgICAgICAgICAgICAgIC8vIFNjcm9sbCBEb3duXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5zY3JvbGxlZFVwQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuc2Nyb2xsZWREb3duQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3U2Nyb2xsIDwgc2Nyb2xsTWFuYWdlci5sYXN0U2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1cCcpXG4gICAgICAgICAgICAgICAgICAgIC8vIFNjcm9sbCBVcFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuc2Nyb2xsZWRVcENsYXNzXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLnNjcm9sbGVkRG93bkNsYXNzXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2p1c3Qtc2Nyb2xsZWQnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmp1c3RTY3JvbGxlZEZ4ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2p1c3Qtc2Nyb2xsZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0sIHNjcm9sbE1hbmFnZXIubWljcm9TZWNvbmRzQmVmb3JlSnVzdFNjcm9sbGxlZFJlbW92ZWQpXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2RvIG5vdGhpbmcnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmxhc3RTY3JvbGwgPSBuZXdTY3JvbGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMTAwKVxuICAgIH1cbn1cblxuc2Nyb2xsTWFuYWdlci5pbml0KClcbiIsImNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcblxuY29uc3QgdG9jID0gKCkgPT4ge1xuICAgIC8vIGNyZWF0ZSB0aGUgY29udGFpbmVyIGRpdlxuICAgIC8vIGdldCBhbGwgZGl2c1xuICAgIGNvbnN0IGhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgJyNjb250ZW50LWJlbG93LXF1b3RlIGgxLCAjY29udGVudC1iZWxvdy1xdW90ZSBoMidcbiAgICApXG4gICAgLy8gZ2V0IHRoZSBib2R5IGVsZW1lbnRcbiAgICAvLyBhcHBseSBjbGFzcyB0byBjb250YWluZXIgZGl2XG4gICAgaWYgKGhlYWRpbmdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdoYXMtdG9jJylcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCd0b2Mtb2ZmJylcbiAgICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb3VudCA9IGkgKyAxXG4gICAgICAgICAgICBjb25zdCBlbCA9IGhlYWRpbmdzW2ldXG4gICAgICAgICAgICBsZXQgcHJldmlvdXNFbGVtID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZ1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzRWxlbSkge1xuICAgICAgICAgICAgICAgIC8vIEFwcGx5IHN0eWxlcyBvciBjbGFzc2VzIHRvIHByZXZpb3VzRWxlbVxuICAgICAgICAgICAgICAgIHByZXZpb3VzRWxlbS5jbGFzc0xpc3QuYWRkKCdib3R0b20tc3BhY2UnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWwuaWQgPSAndG9jLScgKyBjb3VudFxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnY291bnRhYmxlLWljb25zJylcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2ljb24tJyArIGNvdW50KVxuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdvcGVuLWNsb3NlJylcbiAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnaWNvbicpXG4gICAgICAgICAgICBjb25zdCBzcGFuRW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICBzcGFuRW5kLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZS1ob2xkZXInKVxuICAgICAgICAgICAgLy8gc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrLmJpbmQobnVsbCwgZWwpKVxuICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJvcGVuXCI+KzwvaT48aSBjbGFzcz1cImNsb3NlZFwiPuKAkzwvaT4nXG4gICAgICAgICAgICBzcGFuRW5kLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImFjdGl2ZVwiPuKWgjwvaT4nXG4gICAgICAgICAgICBlbC5pbnNlcnRCZWZvcmUoc3BhbiwgZWwuZmlyc3RDaGlsZClcbiAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKHNwYW5FbmQpXG4gICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb24nKVxuICAgICAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1vZmYnKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5pZFxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAnI2NvbnRlbnQtYmVsb3ctcXVvdGUgLnRvYy1hY3RpdmUnXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSBoZWFkaW5nc1tpXVxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgndG9jLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgndG9jLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaFxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGhhc2gpLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsIC8vIHNtb290aCBzY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jazogJ3N0YXJ0JyAvLyB0aGUgdXBwZXIgYm9yZGVyIG9mIHRoZSBlbGVtZW50IHdpbGwgYmUgYWxpZ25lZCBhdCB0aGUgdG9wIG9mIHRoZSB2aXNpYmxlIHBhcnQgb2YgdGhlIHdpbmRvdyBvZiB0aGUgc2Nyb2xsYWJsZSBhcmVhLlxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICApXG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXRvYycpXG4gICAgfVxufVxuXG50b2MoKVxuXG5pZiAoXG4gICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICcjdG9jJyAmJlxuICAgIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2Mtb2ZmJykgJiZcbiAgICBib2R5LmNsYXNzTGlzdC5jb250YWlucygnaGFzLXRvYycpXG4pIHtcbiAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1vbicpXG4gICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb2ZmJylcbn1cbiIsIi8vIC8vIG5vbi10aGVtZWQgYXBwXG4vLyBpbXBvcnQgJ3NpdGUvYXBwL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vXG4vLyAvLyB2ZW5kb3IgbW9kdWxlc1xuLy8gaW1wb3J0ICdzaXRlL3ZlbmRvci9teXZlbmRvci9teXBhY2thZ2UvY2xpZW50L2phdmFzY3JpcHQvTXlKYXZhc2NyaXB0RmlsZSc7XG4vL1xuLy8gLy8geW91ciB0aGVtZWQgYXBwIGZpbGVzXG4vLyBpbXBvcnQgJy4vanMvcGFydGlhbHMvU29tZU90aGVySmF2YXNjcmlwdEZpbGUnO1xuaW1wb3J0ICcuL2pzL2Nvb2tpZSdcbmltcG9ydCAnLi9qcy9ib2R5LWNsYXNzJ1xuaW1wb3J0ICcuL2pzL2NvbGxhcHNpYmxlLW1lbnUnXG5pbXBvcnQgJy4vanMvc2Nyb2xsLW1hbmFnZXInXG5pbXBvcnQgJy4vanMvZm9vdGVyLWlzLXZpc2libGUnXG5pbXBvcnQgJy4vanMvZm9ybSdcbmltcG9ydCAnLi9qcy9tb3VzZS1vdmVyLWxvZ28nXG5pbXBvcnQgJy4vanMvaW1hZ2VzJ1xuaW1wb3J0ICcuL2pzL3RvYydcbiJdLCJuYW1lcyI6WyJteUNvb2tpZSIsImJvZHlDbGFzcyIsImJvZHlPYmplY3QiLCJpbml0IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkT3JUb2dnbGVCb2R5Q2xhc3MiLCJyZXRyaWV2ZUNvb2tpZU9ySGFzaCIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJzY3JvbGxUbyIsInNjcm9sbFgiLCJzY3JvbGxZIiwiaGFzaCIsImdldEhhc2hGcm9tVVJMIiwiZ2V0RWxlbWVudEJ5SWQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRvY3VtZW50RWxlbWVudCIsImFkZFJvY2tldE1vZGUiLCJwcmVmZXJyZWRUaGVtZSIsImVyYXNlQ29va2llIiwicnVuQ2xpY2tGb3JFbGVtZW50IiwiZ2V0Q29va2llIiwic2V0QXR0cmlidXRlIiwidXNlclByZWZlcnNEYXJrVGhlbWUiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsInRyaW0iLCJsZW5ndGgiLCJvYmoiLCJjb250YWlucyIsInJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZSIsIm9ialNlbGVjdG9yIiwiaXNUaGVtZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwib25lRWFjaE9iamVjdCIsImFjdGlvbkJvZHlDbGFzc0NoYW5nZSIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlQ2xhc3MiLCJpZCIsImhhc0F0dHJpYnV0ZSIsImdldEF0dHJpYnV0ZSIsInRvZ2dsZSIsInNldENvb2tpZSIsImdldEhhc2hGcm9tU3RyaW5nIiwicmVwbGFjZSIsImxvY2F0aW9uIiwiJG9iamVjdCIsInN0cmluZyIsImNsYXNzZXMiLCJnZXRDbGFzc2VzRnJvbUxpc3QiLCJpIiwibGVuIiwidmFsdWUiLCJhcnJheSIsInNwbGl0IiwibmV3QXJyYXkiLCJwdXNoIiwiU3RyaW5nIiwicmV0cmlldmVIYXNTaWduRnJvbVN0cmluZyIsImRpdiIsImNyZWF0ZUVsZW1lbnQiLCJzaGFkb3ciLCJzaGFkb3dDb2xvdXIiLCJzdHlsZSIsImJhY2tncm91bmRJbWFnZSIsInRlbXAiLCJmaXJzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwiaXNIb21lUGFnZSIsInBhdGhuYW1lIiwiaGFzRnJhZ21lbnQiLCJDb2xsYXBzaWJsZUxpc3RzIiwiYXBwbHkiLCJkb05vdFJlY3Vyc2UiLCJjYWxsIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJub2RlIiwiYXBwbHlUbyIsInN1Ym5vZGUiLCJoYXNPcGVuU3ViTGlzdCIsImVsIiwibGlzdCIsImNsb3Nlc3QiLCJsaSIsInBhcmVudE5vZGUiLCJ1c2VyU2VsZWN0IiwiTW96VXNlclNlbGVjdCIsIm1zVXNlclNlbGVjdCIsIldlYmtpdFVzZXJTZWxlY3QiLCJ1bCIsInNwYW4iLCJoYW5kbGVDbGljayIsImJpbmQiLCJpbm5lckhUTUwiLCJlIiwidGFyZ2V0Iiwibm9kZU5hbWUiLCJvcGVuIiwidWxzIiwiZGlzcGxheSIsIm5hbWUiLCJkYXlzIiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsIm5hbWVFUSIsImNhIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJmb290ZXJJc1Zpc2libGUiLCJpbnRlcnNlY3Rpb25PYnNlcnZlck9wdGlvbnMiLCJyb290Iiwicm9vdE1hcmdpbiIsInRocmVzaG9sZCIsIm9ic2VydmVyIiwiSW50ZXJzZWN0aW9uT2JzZXJ2ZXIiLCJvbkludGVyc2VjdGlvbiIsIm9ic2VydmUiLCJlbnRyaWVzIiwiZW50cnkiLCJpbnRlcnNlY3Rpb25SYXRpbyIsImZvcm1maWVsZHMiLCJKIiwiYWRqdXN0U3R5bGluZyIsImV2dCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInpFdmVudCIsImlucFZhbCIsImltYWdlV3JhcHBlciIsIndyYXAiLCJ3cmFwcGVyIiwiYXBwZW5kQ2hpbGQiLCJpbWFnZXMiLCJkdiIsImltZyIsInNob3dSb2NrZXRNb2RlIiwidG9nZ2xlQ2xhc3NPbkhvdmVyIiwidHlwZSIsImxvZ28iLCJzY3JvbGxNYW5hZ2VyIiwibWljcm9TZWNvbmRzQmVmb3JlSnVzdFNjcm9sbGxlZFJlbW92ZWQiLCJtaW5TY3JvbGxGb3JBY3Rpb24iLCJtaW5TY3JvbGxEb3duIiwibGFzdFNjcm9sbCIsImRpZFNjcm9sbCIsInRpbWVPdXRGeCIsImp1c3RTY3JvbGxlZEZ4Iiwic2Nyb2xsZWRVcENsYXNzIiwic2Nyb2xsZWREb3duQ2xhc3MiLCJzY3JvbGxMaXN0ZW5lciIsInNjcm9sbFVwT3JEb3duIiwiY3VycmVudFNjcm9sbCIsImZvb3RlckhlaWdodCIsIm5vcm1hbFRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRoZW1lVHJhbnNpdGlvbkR1cmF0aW9uIiwibmV3U2Nyb2xsIiwiZ2V0VGhlbWUiLCJwYXJzZUludCIsInNjcm9sbFRvcCIsImlzUm9ja2V0VGhlbWUiLCJjbGVhclRpbWVvdXQiLCJ0aGVtZSIsIndpbmRvd0hlaWdodCIsImlubmVySGVpZ2h0IiwidG90YWxIZWlnaHQiLCJzY3JvbGxIZWlnaHQiLCJib3R0b21UZXN0Iiwic2Nyb2xsUG9zaXRpb24iLCJ0b3BUZXN0IiwidHJhbnNpdGlvblNwZWVkIiwiTWF0aCIsImFicyIsImJvZHkiLCJ0b2MiLCJoZWFkaW5ncyIsImNvdW50IiwiX2xvb3AiLCJwcmV2aW91c0VsZW0iLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwic3BhbkVuZCJdLCJzb3VyY2VSb290IjoiIn0=