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
    if (bodyClass.isHomePage() === true && bodyClass.hasFragment() === false) {
      // console.log('opening menu')
      document.querySelector('#menu-toggle').click();
    }
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
    var classes = '';
    if (hash === 'reset') {
      _cookie_js__WEBPACK_IMPORTED_MODULE_0__.myCookie.eraseCookie('bodyClassClasses');
      hash = '';
      // console.log(reset);
    } else if (this.runClickForElement(hash)) {
      // do nothing
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
    if (toggleClass === 'theme-rocket') {
      // window.alert('Welcome to our experimental fly-around-the-world rocket(🚀) theme. ')
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
    console.log(el);
    var list = el.closest('.collapsibleList');
    if (list) {
      console.log(list);
      if (list.querySelectorAll('.collapsibleListOpen').length) {
        console.log(list);
        list.classList.add('collapsibleListHasOpen');
      } else {
        list.classList.remove('collapsibleListHasOpen');
        console.log('ERROR');
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
    var isTopTheme = null;
    window.addEventListener('scroll', function () {
      window.clearTimeout(scrollManager.timeOutFx);
      window.clearTimeout(scrollManager.justScrolledFx);
      var theme = scrollManager.bodyObject.getAttribute('data-theme');
      if (window.scrollY < 20) {
        if (isTopTheme !== true) {
          scrollManager.bodyObject.classList.remove('past-header');
          scrollManager.bodyObject.style.transitionDuration = '0.7s';
          scrollManager.bodyObject.classList.remove(theme);
          scrollManager.bodyObject.classList.add('theme-rocket');
          scrollManager.bodyObject.style.transitionSpeed = '0.3s';
          isTopTheme = true;
        }
      } else {
        if (isTopTheme !== false) {
          scrollManager.bodyObject.classList.add('past-header');
          var oldTransitionSpeed = scrollManager.bodyObject.style.transitionDuration;
          scrollManager.bodyObject.style.transitionDuration = '1s';
          scrollManager.bodyObject.classList.add(theme);
          scrollManager.bodyObject.classList.remove('theme-rocket');
          scrollManager.bodyObject.style.transitionSpeed = oldTransitionSpeed;
          isTopTheme = false;
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
        var newScroll = window.scrollY;
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
          }, 3000);
        } else {
          // console.log('do nothing')
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










/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("../sun/src/main.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29CO0FBQ0k7QUFDTTtBQUNIO0FBQ0k7QUFDYjtBQUNXO0FBQ1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9ib2R5LWNsYXNzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2NvbGxhcHNpYmxlLW1lbnUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvY29va2llLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2Zvb3Rlci1pcy12aXNpYmxlLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvaGlkZS1tZW51LWJhci5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9pbWFnZXMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvbW91c2Utb3Zlci1sb2dvLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL3RvYy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG15Q29va2llIH0gZnJvbSAnLi9jb29raWUuanMnXG5cbmNvbnN0IGJvZHlDbGFzcyA9IHtcbiAgICBib2R5T2JqZWN0OiBudWxsLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuICAgICAgICBib2R5Q2xhc3MuYWRkT3JUb2dnbGVCb2R5Q2xhc3MoJyNtZW51LXRvZ2dsZScsIGZhbHNlKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2R5Q2xhc3MuaXNIb21lUGFnZSgpKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2R5Q2xhc3MuaGFzRnJhZ21lbnQoKSlcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgYm9keUNsYXNzLmlzSG9tZVBhZ2UoKSA9PT0gdHJ1ZSAmJlxuICAgICAgICAgICAgYm9keUNsYXNzLmhhc0ZyYWdtZW50KCkgPT09IGZhbHNlXG4gICAgICAgICkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ29wZW5pbmcgbWVudScpXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS10b2dnbGUnKS5jbGljaygpXG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgeW91IGNsaWNrIG9uIHRoZW1lLXNlbGVjdG9yLCB5b3Ugc2VsZWN0IHRoZSB0aGVtZVxuICAgICAgICBib2R5Q2xhc3MuYWRkT3JUb2dnbGVCb2R5Q2xhc3MoJy50aGVtZS1zZWxlY3RvcicsIHRydWUpXG4gICAgICAgIC8vIGlmIHlvdSBjbGljayBvbiBzZXQtdGhlbSwgeW91IHNlbGVjdCB0aGUgdGhlbWVcbiAgICAgICAgYm9keUNsYXNzLmFkZE9yVG9nZ2xlQm9keUNsYXNzKCcuc2V0LXRoZW1lJywgdHJ1ZSlcbiAgICAgICAgYm9keUNsYXNzLnJldHJpZXZlQ29va2llT3JIYXNoKClcbiAgICAgICAgLy8gZXhwb3NlIHNjcm9sbGVkIGJlaGF2aW91clxuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnNjcm9sbFgsIHdpbmRvdy5zY3JvbGxZICsgMilcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkgLSAyKVxuICAgICAgICAgICAgY29uc3QgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVVSTCgpXG4gICAgICAgICAgICBpZiAoaGFzaCAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgaGFzaCkuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsIC8vIHNtb290aCBzY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCcgLy8gdGhlIHVwcGVyIGJvcmRlciBvZiB0aGUgZWxlbWVudCB3aWxsIGJlIGFsaWduZWQgYXQgdGhlIHRvcCBvZiB0aGUgdmlzaWJsZSBwYXJ0IG9mIHRoZSB3aW5kb3cgb2YgdGhlIHNjcm9sbGFibGUgYXJlYS5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMDApXG4gICAgICAgIHRoaXMuYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnMoKVxuICAgIH0sXG5cbiAgICBhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LWxvYWRlZCcpXG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdib2R5LXVubG9hZGVkJylcbiAgICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCd0b3VjaCcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ25vLXRvdWNoJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJvZHlDbGFzcy5hZGRSb2NrZXRNb2RlKClcbiAgICAgICAgfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXVubG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICByZXRyaWV2ZUNvb2tpZU9ySGFzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVVSTCgpXG4gICAgICAgIGxldCBjbGFzc2VzID0gJydcbiAgICAgICAgaWYgKGhhc2ggPT09ICdyZXNldCcpIHtcbiAgICAgICAgICAgIG15Q29va2llLmVyYXNlQ29va2llKCdib2R5Q2xhc3NDbGFzc2VzJylcbiAgICAgICAgICAgIGhhc2ggPSAnJ1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMucnVuQ2xpY2tGb3JFbGVtZW50KGhhc2gpKSB7XG4gICAgICAgICAgICAvLyBkbyBub3RoaW5nXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjbGFzc2VzID0gbXlDb29raWUuZ2V0Q29va2llKCdib2R5Q2xhc3NDbGFzc2VzJylcbiAgICAgICAgICAgIGNsYXNzZXMgPSBTdHJpbmcoY2xhc3NlcylcbiAgICAgICAgICAgIGlmIChjbGFzc2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBjbGFzc0FycmF5ID0gY2xhc3Nlcy5zcGxpdCgnICcpXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjbGFzc0FycmF5Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVuQ2xpY2tGb3JFbGVtZW50KGNsYXNzQXJyYXlbaV0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYSAmJlxuICAgICAgICAgICAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlc1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5ydW5DbGlja0ZvckVsZW1lbnQoJ3RoZW1lLW1vb24nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJ1bkNsaWNrRm9yRWxlbWVudDogZnVuY3Rpb24gKGhhc2gpIHtcbiAgICAgICAgaGFzaCA9IGhhc2gudHJpbSgpXG4gICAgICAgIGlmIChoYXNoLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaClcbiAgICAgICAgICAgIGlmIChvYmogJiYgb2JqLmNsYXNzTGlzdC5jb250YWlucygndGhlbWUtc2VsZWN0b3InKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQm9keUNsYXNzZXNCYXNlZE9uQXR0cmlidXRlKG9iailcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKGhhc2gpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuXG4gICAgYWRkT3JUb2dnbGVCb2R5Q2xhc3M6IGZ1bmN0aW9uIChvYmpTZWxlY3Rvciwga2VlcCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG9ialNlbGVjdG9yKS5mb3JFYWNoKGZ1bmN0aW9uICgkZWFjaE9iamVjdCkge1xuICAgICAgICAgICAgJGVhY2hPYmplY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYWN0aW9uQm9keUNsYXNzQ2hhbmdlKCRlYWNoT2JqZWN0LCBldmVudCwga2VlcClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIGFjdGlvbkJvZHlDbGFzc0NoYW5nZTogZnVuY3Rpb24gKCRlYWNoT2JqZWN0LCBldmVudCwga2VlcCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgYm9keUNsYXNzLnJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZSgkZWFjaE9iamVjdClcblxuICAgICAgICBsZXQgdG9nZ2xlQ2xhc3MgPSAnJ1xuICAgICAgICBsZXQgaWQgPSAnJ1xuICAgICAgICBpZiAoJGVhY2hPYmplY3QuaGFzQXR0cmlidXRlKCdkYXRhLWFkZC1jbGFzcycpKSB7XG4gICAgICAgICAgICB0b2dnbGVDbGFzcyA9ICRlYWNoT2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1hZGQtY2xhc3MnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MgPSAkZWFjaE9iamVjdC5nZXRBdHRyaWJ1dGUoJ2lkJylcbiAgICAgICAgICAgIGlkID0gdG9nZ2xlQ2xhc3NcbiAgICAgICAgfVxuICAgICAgICBpZiAoJGVhY2hPYmplY3QuaGFzQXR0cmlidXRlKCdkYXRhLXRvZ2dsZScpKSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QudG9nZ2xlKHRvZ2dsZUNsYXNzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCh0b2dnbGVDbGFzcylcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9nZ2xlQ2xhc3MgPT09ICd0aGVtZS1yb2NrZXQnKSB7XG4gICAgICAgICAgICAvLyB3aW5kb3cuYWxlcnQoJ1dlbGNvbWUgdG8gb3VyIGV4cGVyaW1lbnRhbCBmbHktYXJvdW5kLXRoZS13b3JsZCByb2NrZXQo8J+agCkgdGhlbWUuICcpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoa2VlcCkge1xuICAgICAgICAgICAgbXlDb29raWUuc2V0Q29va2llKFxuICAgICAgICAgICAgICAgICdib2R5Q2xhc3NDbGFzc2VzJyxcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgMTRcbiAgICAgICAgICAgIClcblxuICAgICAgICAgICAgaWYgKGlkKSB7XG4gICAgICAgICAgICAgICAgbGV0IGhhc2ggPSBib2R5Q2xhc3MuZ2V0SGFzaEZyb21TdHJpbmcoaWQpXG4gICAgICAgICAgICAgICAgaWYgKGhhc2gubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc2ggPSBoYXNoLnJlcGxhY2UoJyMnLCAnJylcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnIycgKyBoYXNoXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZTogZnVuY3Rpb24gKCRvYmplY3QpIHtcbiAgICAgICAgaWYgKCRvYmplY3QuaGFzQXR0cmlidXRlKCdkYXRhLXJlbW92ZS1jbGFzcycpKSB7XG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgPSAkb2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZW1vdmUtY2xhc3MnKVxuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IGJvZHlDbGFzcy5nZXRDbGFzc2VzRnJvbUxpc3Qoc3RyaW5nKVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNsYXNzZXNbaV1cbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldENsYXNzZXNGcm9tTGlzdDogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICBjb25zdCBhcnJheSA9IHN0cmluZy5zcGxpdCgnLCcpXG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGFycmF5W2ldLnRyaW0oKVxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbmV3QXJyYXkucHVzaCh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3QXJyYXlcbiAgICB9LFxuXG4gICAgZ2V0SGFzaEZyb21VUkw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhhc2hcbiAgICAgICAgcmV0dXJuIGJvZHlDbGFzcy5nZXRIYXNoRnJvbVN0cmluZyhzdHJpbmcpXG4gICAgfSxcblxuICAgIGdldEhhc2hGcm9tU3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIHN0cmluZyA9IFN0cmluZyhzdHJpbmcpXG4gICAgICAgIHJldHVybiBib2R5Q2xhc3MucmV0cmlldmVIYXNTaWduRnJvbVN0cmluZyhzdHJpbmcpXG4gICAgfSxcblxuICAgIHJldHJpZXZlSGFzU2lnbkZyb21TdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKCcjJywgJycpXG4gICAgfSxcblxuICAgIGFkZFJvY2tldE1vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3Qgc2hhZG93ID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2RhdGEtc2hhZG93LW92ZXItbG9nbydcbiAgICAgICAgKVxuICAgICAgICBsZXQgc2hhZG93Q29sb3VyID0gJydcbiAgICAgICAgaWYgKHNoYWRvdyA9PT0gJ2RhcmsnKSB7XG4gICAgICAgICAgICBzaGFkb3dDb2xvdXIgPVxuICAgICAgICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMjU4ZGVnLCAjMDAwMDAwMzAgMzAlLCB0cmFuc3BhcmVudCA2MCUpLCAnXG4gICAgICAgIH0gZWxzZSBpZiAoc2hhZG93ID09PSAnbGlnaHQnKSB7XG4gICAgICAgICAgICBzaGFkb3dDb2xvdXIgPVxuICAgICAgICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMjU4ZGVnLCAjRkZGRkZGMzAgMzAlLCB0cmFuc3BhcmVudCA2MCUpLCAnXG4gICAgICAgIH1cbiAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XG4gICAgICAgICAgICBzaGFkb3dDb2xvdXIgK1xuICAgICAgICAgICAgJ3VybCgnICtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1iZy1pbWFnZScpICtcbiAgICAgICAgICAgICcpJ1xuICAgICAgICBkaXYuaWQgPSAnQmFja2dyb3VuZEltYWdlJ1xuICAgICAgICBjb25zdCB0ZW1wID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZmlyc3RDaGlsZFxuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5pbnNlcnRCZWZvcmUoZGl2LCB0ZW1wKVxuICAgIH0sXG5cbiAgICBpc0hvbWVQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJ1xuICAgIH0sXG4gICAgaGFzRnJhZ21lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9PSAnJ1xuICAgIH1cbn1cblxuYm9keUNsYXNzLmluaXQoKVxuIiwiLypcblxuQ29sbGFwc2libGVMaXN0cy5qc1xuXG5BbiBvYmplY3QgYWxsb3dpbmcgbGlzdHMgdG8gZHluYW1pY2FsbHkgZXhwYW5kIGFuZCBjb2xsYXBzZVxuXG5DcmVhdGVkIGJ5IEthdGUgTW9ybGV5IC0gaHR0cDovL2NvZGUuaWFta2F0ZS5jb20vIC0gYW5kIHJlbGVhc2VkIHVuZGVyIHRoZSB0ZXJtc1xub2YgdGhlIENDMCAxLjAgVW5pdmVyc2FsIGxlZ2FsIGNvZGU6XG5cbmh0dHA6Ly9jcmVhdGl2ZWNvbW1vbnMub3JnL3B1YmxpY2RvbWFpbi96ZXJvLzEuMC9sZWdhbGNvZGVcblxuKi9cblxuY29uc3QgQ29sbGFwc2libGVMaXN0cyA9IChmdW5jdGlvbiAoKSB7XG4gICAgLy8gTWFrZXMgYWxsIGxpc3RzIHdpdGggdGhlIGNsYXNzICdjb2xsYXBzaWJsZUxpc3QnIGNvbGxhcHNpYmxlLiBUaGVcbiAgICAvLyBwYXJhbWV0ZXIgaXM6XG4gICAgLy9cbiAgICAvLyBkb05vdFJlY3Vyc2UgLSB0cnVlIGlmIHN1Yi1saXN0cyBzaG91bGQgbm90IGJlIG1hZGUgY29sbGFwc2libGVcbiAgICBmdW5jdGlvbiBhcHBseSAoZG9Ob3RSZWN1cnNlKSB7XG4gICAgICAgIDtbXS5mb3JFYWNoLmNhbGwoZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyksIG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKG5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3QnKSkge1xuICAgICAgICAgICAgICAgIGFwcGx5VG8obm9kZSwgdHJ1ZSlcblxuICAgICAgICAgICAgICAgIGlmICghZG9Ob3RSZWN1cnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIDtbXS5mb3JFYWNoLmNhbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3Vibm9kZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3Vibm9kZS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGhhc09wZW5TdWJMaXN0KG5vZGUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzT3BlblN1Ykxpc3QgKGVsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKGVsKVxuICAgICAgICBjb25zdCBsaXN0ID0gZWwuY2xvc2VzdCgnLmNvbGxhcHNpYmxlTGlzdCcpXG4gICAgICAgIGlmIChsaXN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhsaXN0KVxuICAgICAgICAgICAgaWYgKGxpc3QucXVlcnlTZWxlY3RvckFsbCgnLmNvbGxhcHNpYmxlTGlzdE9wZW4nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhsaXN0KVxuICAgICAgICAgICAgICAgIGxpc3QuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0SGFzT3BlbicpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxpc3QuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0SGFzT3BlbicpXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0VSUk9SJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE1ha2VzIHRoZSBzcGVjaWZpZWQgbGlzdCBjb2xsYXBzaWJsZS4gVGhlIHBhcmFtZXRlcnMgYXJlOlxuICAgIC8vXG4gICAgLy8gbm9kZSAgICAgICAgIC0gdGhlIGxpc3QgZWxlbWVudFxuICAgIC8vIGRvTm90UmVjdXJzZSAtIHRydWUgaWYgc3ViLWxpc3RzIHNob3VsZCBub3QgYmUgbWFkZSBjb2xsYXBzaWJsZVxuICAgIGZ1bmN0aW9uIGFwcGx5VG8gKG5vZGUsIGRvTm90UmVjdXJzZSkge1xuICAgICAgICA7W10uZm9yRWFjaC5jYWxsKG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJyksIGxpID0+IHtcbiAgICAgICAgICAgIGlmICghZG9Ob3RSZWN1cnNlIHx8IG5vZGUgPT09IGxpLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgbGkuc3R5bGUuTW96VXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLm1zVXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLldlYmtpdFVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICBjb25zdCB1bCA9IGxpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCd1bCcpXG4gICAgICAgICAgICAgICAgaWYgKHVsLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ29wZW4tY2xvc2UnKVxuICAgICAgICAgICAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2suYmluZChudWxsLCBsaSkpXG4gICAgICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAgICAgICAgICc8aSBjbGFzcz1cIm9wZW5cIj4mbmJzcDs8L2k+PGkgY2xhc3M9XCJjbG9zZWRcIj7ihrA8L2k+J1xuICAgICAgICAgICAgICAgICAgICAvLyB3ZSBuZWVkIHRvIHRvZ2dsZSBhbGwgb2YgdGhlbSwgc29tZSB0d2ljZVxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlY3Rpb24nKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JylcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGUobGkpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlKGxpKVxuICAgICAgICAgICAgICAgICAgICBsaS5pbnNlcnRCZWZvcmUoc3BhbiwgdWxbMF0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIC8vIEhhbmRsZXMgYSBjbGljay4gVGhlIHBhcmFtZXRlciBpczpcbiAgICAvL1xuICAgIC8vIG5vZGUgLSB0aGUgbm9kZSBmb3Igd2hpY2ggY2xpY2tzIGFyZSBiZWluZyBoYW5kbGVkXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2xpY2sgKG5vZGUsIGUpIHtcbiAgICAgICAgbGV0IGxpID0gZS50YXJnZXRcbiAgICAgICAgd2hpbGUgKGxpLm5vZGVOYW1lICE9PSAnTEknKSB7XG4gICAgICAgICAgICBsaSA9IGxpLnBhcmVudE5vZGVcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChsaSA9PT0gbm9kZSkge1xuICAgICAgICAgICAgdG9nZ2xlKG5vZGUpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPcGVucyBvciBjbG9zZXMgdGhlIHVub3JkZXJlZCBsaXN0IGVsZW1lbnRzIGRpcmVjdGx5IHdpdGhpbiB0aGVcbiAgICAvLyBzcGVjaWZpZWQgbm9kZS4gVGhlIHBhcmFtZXRlciBpczpcbiAgICAvL1xuICAgIC8vIG5vZGUgLSB0aGUgbm9kZSBjb250YWluaW5nIHRoZSB1bm9yZGVyZWQgbGlzdCBlbGVtZW50c1xuICAgIGZ1bmN0aW9uIHRvZ2dsZSAobm9kZSkge1xuICAgICAgICBjb25zdCBvcGVuID0gbm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG4gICAgICAgIGNvbnN0IHVscyA9IG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJylcblxuICAgICAgICA7W10uZm9yRWFjaC5jYWxsKHVscywgdWwgPT4ge1xuICAgICAgICAgICAgbGV0IGxpID0gdWxcbiAgICAgICAgICAgIHdoaWxlIChsaS5ub2RlTmFtZSAhPT0gJ0xJJykge1xuICAgICAgICAgICAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobGkgPT09IG5vZGUpIHtcbiAgICAgICAgICAgICAgICB1bC5zdHlsZS5kaXNwbGF5ID0gb3BlbiA/ICdibG9jaycgOiAnbm9uZSdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcblxuICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKVxuICAgICAgICBub2RlLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG5cbiAgICAgICAgaWYgKHVscy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBub2RlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdCcgKyAob3BlbiA/ICdPcGVuJyA6ICdDbG9zZWQnKSlcbiAgICAgICAgfVxuICAgICAgICBoYXNPcGVuU3ViTGlzdChub2RlKVxuICAgIH1cblxuICAgIHJldHVybiB7IGFwcGx5LCBhcHBseVRvIH1cbn0pKClcblxuQ29sbGFwc2libGVMaXN0cy5hcHBseSgpXG4iLCJjb25zdCBteUNvb2tpZSA9IHtcblxuICBzZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZGF5cykge1xuICAgIHZhciBleHBpcmVzID0gJydcbiAgICBpZiAodHlwZW9mIGRheXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkYXlzID0gMTRcbiAgICB9XG4gICAgaWYgKGRheXMpIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSlcbiAgICAgIGV4cGlyZXMgPSAnOyBleHBpcmVzPScgKyBkYXRlLnRvVVRDU3RyaW5nKClcbiAgICB9XG4gICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArICc9JyArICh2YWx1ZSB8fCAnJykgKyBleHBpcmVzICsgJzsgcGF0aD0vJ1xuICB9LFxuXG4gIGdldENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgbmFtZUVRID0gbmFtZSArICc9J1xuICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBjYVtpXVxuICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7XG4gICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICBlcmFzZUNvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBteUNvb2tpZS5zZXRDb29raWUobmFtZSwgbnVsbCwgMClcbiAgfVxufVxuXG5leHBvcnQgeyBteUNvb2tpZSB9XG4iLCJcbmNvbnN0IGZvb3RlcklzVmlzaWJsZSA9IHtcblxuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgLy8gdGhpcyBpcyB0aGUgdGFyZ2V0IHdoaWNoIGlzIG9ic2VydmVkXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvb3RlcicpXG5cbiAgICAvLyBjb25maWd1cmUgdGhlIGludGVyc2VjdGlvbiBvYnNlcnZlciBpbnN0YW5jZVxuICAgIHZhciBpbnRlcnNlY3Rpb25PYnNlcnZlck9wdGlvbnMgPSB7XG4gICAgICByb290OiBudWxsLFxuICAgICAgcm9vdE1hcmdpbjogJzE1MHB4JyxcbiAgICAgIHRocmVzaG9sZDogMS4wXG4gICAgfVxuXG4gICAgdmFyIG9ic2VydmVyID0gbmV3IHdpbmRvdy5JbnRlcnNlY3Rpb25PYnNlcnZlcihvbkludGVyc2VjdGlvbiwgaW50ZXJzZWN0aW9uT2JzZXJ2ZXJPcHRpb25zKVxuXG4gICAgLy8gcHJvdmlkZSB0aGUgb2JzZXJ2ZXIgd2l0aCBhIHRhcmdldFxuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0KVxuXG4gICAgZnVuY3Rpb24gb25JbnRlcnNlY3Rpb24gKGVudHJpZXMpIHtcbiAgICAgIGVudHJpZXMuZm9yRWFjaChcbiAgICAgICAgZW50cnkgPT4ge1xuICAgICAgICAgIC8vIGNvbnNvbGUuY2xlYXIoKVxuICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVudHJ5LmludGVyc2VjdGlvblJhdGlvKVxuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5jbGFzc0xpc3QudG9nZ2xlKFxuICAgICAgICAgICAgJ2Zvb3Rlci12aXNpYmxlJyxcbiAgICAgICAgICAgIGVudHJ5LmludGVyc2VjdGlvblJhdGlvID49IDFcbiAgICAgICAgICApXG4gICAgICAgICAgLy8gQXJlIHdlIGluIHZpZXdwb3J0P1xuICAgICAgICAgIC8vIGlmIChlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbyA+IDEpIHtcbiAgICAgICAgICAvLyBTdG9wIHdhdGNoaW5nXG4gICAgICAgICAgLy8gb2JzZXJ2ZXIudW5vYnNlcnZlKGVudHJ5LnRhcmdldCk7XG4gICAgICAgICAgLy8gfVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuICB9XG59XG5cbmZvb3RlcklzVmlzaWJsZS5pbml0KClcbiIsInZhciBmb3JtZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJ1xuKVxuZm9yICh2YXIgSiA9IGZvcm1maWVsZHMubGVuZ3RoIC0gMTsgSiA+PSAwOyAtLUopIHtcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuXG4gIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpXG4gIGV2dC5pbml0RXZlbnQoJ2NoYW5nZScsIGZhbHNlLCB0cnVlKVxuICBmb3JtZmllbGRzW0pdLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuXG5mdW5jdGlvbiBhZGp1c3RTdHlsaW5nICh6RXZlbnQpIHtcbiAgdmFyIGlucFZhbCA9IHpFdmVudC50YXJnZXQudmFsdWVcbiAgaWYgKGlucFZhbCAmJiBpbnBWYWwucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpKSB7XG4gICAgekV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCduby12YWx1ZScpXG4gIH0gZWxzZSB7XG4gICAgekV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCduby12YWx1ZScpXG4gIH1cbn1cbiIsImNvbnN0IHNjcm9sbE1hbmFnZXIgPSB7XG4gICAgbWluU2Nyb2xsRm9yQWN0aW9uOiAyLFxuXG4gICAgbWluU2Nyb2xsRG93bjogMTAwLFxuXG4gICAgbGFzdFNjcm9sbDogMCxcblxuICAgIGRpZFNjcm9sbDogMCxcblxuICAgIGJvZHlPYmplY3Q6IG51bGwsXG5cbiAgICB0aW1lT3V0Rng6IG51bGwsXG5cbiAgICBqdXN0U2Nyb2xsZWRGeDogbnVsbCxcblxuICAgIHNjcm9sbGVkVXBDbGFzczogJ3Njcm9sbGVkLXVwJyxcblxuICAgIHNjcm9sbGVkRG93bkNsYXNzOiAnc2Nyb2xsZWQtZG93bicsXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuICAgICAgICB0aGlzLnNjcm9sbExpc3RlbmVyKClcbiAgICAgICAgdGhpcy5zY3JvbGxVcE9yRG93bigpXG4gICAgICAgIHRoaXMubGFzdFNjcm9sbCA9IHdpbmRvdy5zY3JvbGxZXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyhcbiAgICAgICAgICAgICAgICB3aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFkgLSB0aGlzLm1pblNjcm9sbEZvckFjdGlvbiAtIDFcbiAgICAgICAgICAgIClcbiAgICAgICAgfSwgNTApXG4gICAgfSxcblxuICAgIHNjcm9sbExpc3RlbmVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBpc1RvcFRoZW1lID0gbnVsbFxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChzY3JvbGxNYW5hZ2VyLnRpbWVPdXRGeClcbiAgICAgICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoc2Nyb2xsTWFuYWdlci5qdXN0U2Nyb2xsZWRGeClcbiAgICAgICAgICAgIGNvbnN0IHRoZW1lID0gc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScpXG4gICAgICAgICAgICBpZiAod2luZG93LnNjcm9sbFkgPCAyMCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1RvcFRoZW1lICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdwYXN0LWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMC43cydcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUodGhlbWUpXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCd0aGVtZS1yb2NrZXQnKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3Quc3R5bGUudHJhbnNpdGlvblNwZWVkID0gJzAuM3MnXG4gICAgICAgICAgICAgICAgICAgIGlzVG9wVGhlbWUgPSB0cnVlXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNUb3BUaGVtZSAhPT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ3Bhc3QtaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkVHJhbnNpdGlvblNwZWVkID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcxcydcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQodGhlbWUpXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCd0aGVtZS1yb2NrZXQnKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3Quc3R5bGUudHJhbnNpdGlvblNwZWVkID1cbiAgICAgICAgICAgICAgICAgICAgICAgIG9sZFRyYW5zaXRpb25TcGVlZFxuICAgICAgICAgICAgICAgICAgICBpc1RvcFRoZW1lID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmRpZFNjcm9sbCA9IHRydWVcbiAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuc2Nyb2xsVXBPckRvd24oKVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBzY3JvbGxVcE9yRG93bjogZnVuY3Rpb24gKCkge1xuICAgICAgICBzY3JvbGxNYW5hZ2VyLnRpbWVPdXRGeCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdydW5uaW5nJylcbiAgICAgICAgICAgIGlmIChzY3JvbGxNYW5hZ2VyLmRpZFNjcm9sbCkge1xuICAgICAgICAgICAgICAgIC8vIHJlc2V0IHNvIHRoYXQgd2Uga25vdyBlYWNoIGNhbGwgaXMgYSByZWFsIGNhbGwuXG4gICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5kaWRTY3JvbGwgPSBmYWxzZVxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld1Njcm9sbCA9IHdpbmRvdy5zY3JvbGxZXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2xhc3Qgc2Nyb2xsOiAnICsgc2Nyb2xsTWFuYWdlci5sYXN0U2Nyb2xsKVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCduZXcgc2Nyb2xsOiAnICsgbmV3U2Nyb2xsKVxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoc2Nyb2xsTWFuYWdlci5sYXN0U2Nyb2xsIC0gbmV3U2Nyb2xsKSA8PVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLm1pblNjcm9sbEZvckFjdGlvblxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndG9vIGxpdHRsZScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIG5ld1Njcm9sbCA+XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubGFzdFNjcm9sbCArIHNjcm9sbE1hbmFnZXIubWluU2Nyb2xsRG93blxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZG93bicpXG4gICAgICAgICAgICAgICAgICAgIC8vIFNjcm9sbCBEb3duXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5zY3JvbGxlZFVwQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuc2Nyb2xsZWREb3duQ2xhc3NcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3U2Nyb2xsIDwgc2Nyb2xsTWFuYWdlci5sYXN0U2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1cCcpXG4gICAgICAgICAgICAgICAgICAgIC8vIFNjcm9sbCBVcFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuc2Nyb2xsZWRVcENsYXNzXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLnNjcm9sbGVkRG93bkNsYXNzXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2p1c3Qtc2Nyb2xsZWQnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmp1c3RTY3JvbGxlZEZ4ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2p1c3Qtc2Nyb2xsZWQnXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIH0sIDMwMDApXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2RvIG5vdGhpbmcnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmxhc3RTY3JvbGwgPSBuZXdTY3JvbGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMjAwKVxuICAgIH1cbn1cblxuc2Nyb2xsTWFuYWdlci5pbml0KClcbiIsIlxuY29uc3QgaW1hZ2VXcmFwcGVyID0gKCkgPT4ge1xuICBmdW5jdGlvbiB3cmFwIChlbCwgd3JhcHBlcikge1xuICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGVsKVxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZWwpXG4gIH1cbiAgLy8gY3JlYXRlIHRoZSBjb250YWluZXIgZGl2XG5cbiAgLy8gZ2V0IGFsbCBkaXZzXG4gIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50eXBvZ3JhcGh5IGltZycpXG4gIC8vIGdldCB0aGUgYm9keSBlbGVtZW50XG4gIC8vIGFwcGx5IGNsYXNzIHRvIGNvbnRhaW5lciBkaXZcblxuICAvLyBmaW5kIG91dCBhbGwgdGhvc2UgZGl2cyBoYXZpbmcgY2xhc3MgQ1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGR2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ltYWdlLWNvbnRhaW5lcicpXG4gICAgY29uc3QgaW1nID0gaW1hZ2VzW2ldXG4gICAgd3JhcChpbWcsIGR2KVxuICB9XG59XG5cbmltYWdlV3JhcHBlcigpXG4iLCJjb25zdCBzaG93Um9ja2V0TW9kZSA9IHtcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRvZ2dsZUNsYXNzT25Ib3ZlciA9IChlKSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICAgICAgLmNsYXNzTGlzdFxuICAgICAgICAudG9nZ2xlKCdtb3VzZS1vdmVyLWxvZ28nLCBlLnR5cGUgPT09ICdtb3VzZWVudGVyJylcbiAgICB9XG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvJylcbiAgICBsb2dvLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0b2dnbGVDbGFzc09uSG92ZXIpXG4gICAgbG9nby5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdG9nZ2xlQ2xhc3NPbkhvdmVyKVxuICB9XG59XG5cbnNob3dSb2NrZXRNb2RlLmluaXQoKVxuIiwiY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuXG5jb25zdCB0b2MgPSAoKSA9PiB7XG4gICAgLy8gY3JlYXRlIHRoZSBjb250YWluZXIgZGl2XG4gICAgLy8gZ2V0IGFsbCBkaXZzXG4gICAgY29uc3QgaGVhZGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAnI2NvbnRlbnQtYmVsb3ctcXVvdGUgaDEsICNjb250ZW50LWJlbG93LXF1b3RlIGgyJ1xuICAgIClcbiAgICAvLyBnZXQgdGhlIGJvZHkgZWxlbWVudFxuICAgIC8vIGFwcGx5IGNsYXNzIHRvIGNvbnRhaW5lciBkaXZcbiAgICBpZiAoaGVhZGluZ3MubGVuZ3RoID4gMSkge1xuICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ2hhcy10b2MnKVxuICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3RvYy1vZmYnKVxuICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNvdW50ID0gaSArIDFcbiAgICAgICAgICAgIGNvbnN0IGVsID0gaGVhZGluZ3NbaV1cbiAgICAgICAgICAgIGxldCBwcmV2aW91c0VsZW0gPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXG4gICAgICAgICAgICBpZiAocHJldmlvdXNFbGVtKSB7XG4gICAgICAgICAgICAgICAgLy8gQXBwbHkgc3R5bGVzIG9yIGNsYXNzZXMgdG8gcHJldmlvdXNFbGVtXG4gICAgICAgICAgICAgICAgcHJldmlvdXNFbGVtLmNsYXNzTGlzdC5hZGQoJ2JvdHRvbS1zcGFjZScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbC5pZCA9ICd0b2MtJyArIGNvdW50XG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdjb3VudGFibGUtaWNvbnMnKVxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaWNvbi0nICsgY291bnQpXG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ29wZW4tY2xvc2UnKVxuICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdpY29uJylcbiAgICAgICAgICAgIGNvbnN0IHNwYW5FbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICAgIHNwYW5FbmQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlLWhvbGRlcicpXG4gICAgICAgICAgICAvLyBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2suYmluZChudWxsLCBlbCkpXG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm9wZW5cIj4rPC9pPjxpIGNsYXNzPVwiY2xvc2VkXCI+4oCTPC9pPidcbiAgICAgICAgICAgIHNwYW5FbmQuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiYWN0aXZlXCI+4paCPC9pPidcbiAgICAgICAgICAgIGVsLmluc2VydEJlZm9yZShzcGFuLCBlbC5maXJzdENoaWxkKVxuICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoc3BhbkVuZClcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1vbicpXG4gICAgICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgndG9jLW9mZicpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmlkXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICcjY29udGVudC1iZWxvdy1xdW90ZSAudG9jLWFjdGl2ZSdcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IGhlYWRpbmdzW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd0b2MtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCd0b2MtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgaGFzaCkuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJywgLy8gc21vb3RoIHNjcm9sbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnIC8vIHRoZSB1cHBlciBib3JkZXIgb2YgdGhlIGVsZW1lbnQgd2lsbCBiZSBhbGlnbmVkIGF0IHRoZSB0b3Agb2YgdGhlIHZpc2libGUgcGFydCBvZiB0aGUgd2luZG93IG9mIHRoZSBzY3JvbGxhYmxlIGFyZWEuXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tdG9jJylcbiAgICB9XG59XG5cbnRvYygpXG5cbmlmIChcbiAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gJyN0b2MnICYmXG4gICAgYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3RvYy1vZmYnKSAmJlxuICAgIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYXMtdG9jJylcbikge1xuICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgndG9jLW9uJylcbiAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1vZmYnKVxufVxuIiwiLy8gLy8gbm9uLXRoZW1lZCBhcHBcbi8vIGltcG9ydCAnc2l0ZS9hcHAvY2xpZW50L2phdmFzY3JpcHQvTXlKYXZhc2NyaXB0RmlsZSc7XG4vL1xuLy9cbi8vIC8vIHZlbmRvciBtb2R1bGVzXG4vLyBpbXBvcnQgJ3NpdGUvdmVuZG9yL215dmVuZG9yL215cGFja2FnZS9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vLyAvLyB5b3VyIHRoZW1lZCBhcHAgZmlsZXNcbi8vIGltcG9ydCAnLi9qcy9wYXJ0aWFscy9Tb21lT3RoZXJKYXZhc2NyaXB0RmlsZSc7XG5pbXBvcnQgJy4vanMvY29va2llJ1xuaW1wb3J0ICcuL2pzL2JvZHktY2xhc3MnXG5pbXBvcnQgJy4vanMvY29sbGFwc2libGUtbWVudSdcbmltcG9ydCAnLi9qcy9oaWRlLW1lbnUtYmFyJ1xuaW1wb3J0ICcuL2pzL2Zvb3Rlci1pcy12aXNpYmxlJ1xuaW1wb3J0ICcuL2pzL2Zvcm0nXG5pbXBvcnQgJy4vanMvbW91c2Utb3Zlci1sb2dvJ1xuaW1wb3J0ICcuL2pzL2ltYWdlcydcbmltcG9ydCAnLi9qcy90b2MnXG4iXSwibmFtZXMiOlsibXlDb29raWUiLCJib2R5Q2xhc3MiLCJib2R5T2JqZWN0IiwiaW5pdCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImFkZE9yVG9nZ2xlQm9keUNsYXNzIiwiaXNIb21lUGFnZSIsImhhc0ZyYWdtZW50IiwiY2xpY2siLCJyZXRyaWV2ZUNvb2tpZU9ySGFzaCIsIndpbmRvdyIsInNldFRpbWVvdXQiLCJzY3JvbGxUbyIsInNjcm9sbFgiLCJzY3JvbGxZIiwiaGFzaCIsImdldEhhc2hGcm9tVVJMIiwiZ2V0RWxlbWVudEJ5SWQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRvY3VtZW50RWxlbWVudCIsImFkZFJvY2tldE1vZGUiLCJjbGFzc2VzIiwiZXJhc2VDb29raWUiLCJydW5DbGlja0ZvckVsZW1lbnQiLCJnZXRDb29raWUiLCJTdHJpbmciLCJsZW5ndGgiLCJjbGFzc0FycmF5Iiwic3BsaXQiLCJpIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJ0cmltIiwib2JqIiwiY29udGFpbnMiLCJyZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGUiLCJvYmpTZWxlY3RvciIsImtlZXAiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIiRlYWNoT2JqZWN0IiwiYWN0aW9uQm9keUNsYXNzQ2hhbmdlIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsImlkIiwiaGFzQXR0cmlidXRlIiwiZ2V0QXR0cmlidXRlIiwidG9nZ2xlIiwic2V0Q29va2llIiwiY2xhc3NOYW1lIiwiZ2V0SGFzaEZyb21TdHJpbmciLCJyZXBsYWNlIiwibG9jYXRpb24iLCIkb2JqZWN0Iiwic3RyaW5nIiwiZ2V0Q2xhc3Nlc0Zyb21MaXN0IiwibGVuIiwidmFsdWUiLCJhcnJheSIsIm5ld0FycmF5IiwicHVzaCIsInJldHJpZXZlSGFzU2lnbkZyb21TdHJpbmciLCJkaXYiLCJjcmVhdGVFbGVtZW50Iiwic2hhZG93Iiwic2hhZG93Q29sb3VyIiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJ0ZW1wIiwiZmlyc3RDaGlsZCIsImluc2VydEJlZm9yZSIsInBhdGhuYW1lIiwiQ29sbGFwc2libGVMaXN0cyIsImFwcGx5IiwiZG9Ob3RSZWN1cnNlIiwiY2FsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibm9kZSIsImFwcGx5VG8iLCJzdWJub2RlIiwiaGFzT3BlblN1Ykxpc3QiLCJlbCIsImNvbnNvbGUiLCJsb2ciLCJsaXN0IiwiY2xvc2VzdCIsImxpIiwicGFyZW50Tm9kZSIsInVzZXJTZWxlY3QiLCJNb3pVc2VyU2VsZWN0IiwibXNVc2VyU2VsZWN0IiwiV2Via2l0VXNlclNlbGVjdCIsInVsIiwic3BhbiIsImhhbmRsZUNsaWNrIiwiYmluZCIsImlubmVySFRNTCIsImUiLCJ0YXJnZXQiLCJub2RlTmFtZSIsIm9wZW4iLCJ1bHMiLCJkaXNwbGF5IiwibmFtZSIsImRheXMiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvVVRDU3RyaW5nIiwiY29va2llIiwibmFtZUVRIiwiY2EiLCJjIiwiY2hhckF0Iiwic3Vic3RyaW5nIiwiaW5kZXhPZiIsImZvb3RlcklzVmlzaWJsZSIsImludGVyc2VjdGlvbk9ic2VydmVyT3B0aW9ucyIsInJvb3QiLCJyb290TWFyZ2luIiwidGhyZXNob2xkIiwib2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9uSW50ZXJzZWN0aW9uIiwib2JzZXJ2ZSIsImVudHJpZXMiLCJlbnRyeSIsImludGVyc2VjdGlvblJhdGlvIiwiZm9ybWZpZWxkcyIsIkoiLCJhZGp1c3RTdHlsaW5nIiwiZXZ0IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiekV2ZW50IiwiaW5wVmFsIiwic2Nyb2xsTWFuYWdlciIsIm1pblNjcm9sbEZvckFjdGlvbiIsIm1pblNjcm9sbERvd24iLCJsYXN0U2Nyb2xsIiwiZGlkU2Nyb2xsIiwidGltZU91dEZ4IiwianVzdFNjcm9sbGVkRngiLCJzY3JvbGxlZFVwQ2xhc3MiLCJzY3JvbGxlZERvd25DbGFzcyIsInNjcm9sbExpc3RlbmVyIiwic2Nyb2xsVXBPckRvd24iLCJwYWdlWE9mZnNldCIsImlzVG9wVGhlbWUiLCJjbGVhclRpbWVvdXQiLCJ0aGVtZSIsInRyYW5zaXRpb25EdXJhdGlvbiIsInRyYW5zaXRpb25TcGVlZCIsIm9sZFRyYW5zaXRpb25TcGVlZCIsIm5ld1Njcm9sbCIsIk1hdGgiLCJhYnMiLCJpbWFnZVdyYXBwZXIiLCJ3cmFwIiwid3JhcHBlciIsImFwcGVuZENoaWxkIiwiaW1hZ2VzIiwiZHYiLCJzZXRBdHRyaWJ1dGUiLCJpbWciLCJzaG93Um9ja2V0TW9kZSIsInRvZ2dsZUNsYXNzT25Ib3ZlciIsInR5cGUiLCJsb2dvIiwiYm9keSIsInRvYyIsImhlYWRpbmdzIiwiY291bnQiLCJfbG9vcCIsInByZXZpb3VzRWxlbSIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJzcGFuRW5kIl0sInNvdXJjZVJvb3QiOiIifQ==