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
    bodyClass.retrieveCookieOrHash();
    // expose scrolled behaviour
    this.scrollStart();
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
    }
    if (hash !== 'theme-moon' && hash !== 'theme-sun') {
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
  scrollStart: function scrollStart() {
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
          span.innerHTML = '<i class="open">↘</i><i class="closed">↖</i>';
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
      rootMargin: '50%',
      threshold: 1
    };
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

    var observer = new window.IntersectionObserver(onIntersection, intersectionObserverOptions);

    // provide the observer with a target
    observer.observe(target);
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

/***/ "../sun/src/js/image-hover.js":
/*!************************************!*\
  !*** ../sun/src/js/image-hover.js ***!
  \************************************/
/***/ (function() {

var imagehover = {
  resetTimeout: null,
  init: function init() {
    var _this = this;
    document.querySelectorAll('.image-container').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        if (_this.isTouchDevice()) {
          clearTimeout(_this.resetTimeout);
        }
        var _e$target$getBounding = e.target.getBoundingClientRect(),
          width = _e$target$getBounding.width,
          height = _e$target$getBounding.height,
          left = _e$target$getBounding.left,
          top = _e$target$getBounding.top;
        var x = e.pageX - left - window.scrollX;
        var y = e.pageY - top - window.scrollY;
        e.target.style.setProperty('--mouse-x', x / width * 50 - 25);
        e.target.style.setProperty('--mouse-y', 25 - y / height * 50);
        if (_this.isTouchDevice()) {
          _this.resetTimeout = setTimeout(function () {
            e.target.style.removeProperty('--mouse-x');
            e.target.style.removeProperty('--mouse-y');
          }, 1000);
        }
      });
    });
  },
  isTouchDeviceVar: null,
  isTouchDevice: function isTouchDevice() {
    if (this.isTouchDeviceVar === null) {
      this.isTouchDeviceVar = 'ontouchstart' in document.documentElement || 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }
    return this.isTouchDeviceVar;
  }
};
document.addEventListener('DOMContentLoaded', function () {
  imagehover.init();
});

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
      if (window.innerWidth > 768) {
        var quoteBlock = document.querySelector('.main-quote');
        if (!quoteBlock) {
          return;
        }
        var additionalMargin = Math.min(window.scrollY, 25 * window.innerHeight / 100);
        quoteBlock.style.marginTop = "".concat(additionalMargin, "px"); // Use backticks here
      }
      // Check if current scroll position is at the bottom minus the footer's height
      var bottomTest = scrollManager.bodyObject.classList.contains('footer-visible');
      // scrollManager.newScroll + windowHeight >=
      // totalHeight - scrollManager.footerHeight
      var topTest = scrollManager.newScroll < scrollManager.minimumScrollForThemeSwitch;
      if (topTest) {
        scrollManager.bodyObject.classList.remove('past-header');
      } else {
        scrollManager.bodyObject.classList.add('past-header');
      }
      if (topTest || bottomTest) {
        if (isRocketTheme !== true) {
          scrollManager.bodyObject.style.transitionDuration = scrollManager.themeTransitionDuration;
          scrollManager.bodyObject.classList.remove(theme);
          scrollManager.bodyObject.classList.add('theme-rocket');
          scrollManager.bodyObject.style.transitionSpeed = scrollManager.normalTransitionDuration;
          isRocketTheme = true;
        }
      } else {
        if (isRocketTheme !== false) {
          scrollManager.bodyObject.style.transitionDuration = scrollManager.themeTransitionDuration;
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
        if (scrollManager.newScroll > scrollManager.lastScroll + scrollManager.minScrollDownToBeProperScroll) {
          // console.log('down')
          // Scroll Down
          scrollManager.bodyObject.classList.remove(scrollManager.scrolledUpClass);
          scrollManager.bodyObject.classList.add(scrollManager.scrolledDownClass);
        } else if (scrollManager.newScroll < scrollManager.lastScroll) {
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
        scrollManager.lastScroll = scrollManager.newScroll;
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

document.addEventListener('DOMContentLoaded', function () {
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
      for (var i = 0; i < headings.length; i++) {
        count = i + 1;
        var el = headings[i];
        // console.log(el)
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
          e.preventDefault();
          body.classList.toggle('toc-on');
          body.classList.toggle('toc-off');
          var hash = this.id;
          var headings = document.querySelectorAll('#content-below-quote .toc-active');
          for (var _i = 0; _i < headings.length; _i++) {
            var _el = headings[_i];
            _el.classList.remove('toc-active');
          }
          e.target.classList.toggle('toc-active');
          if (body.classList.contains('toc-on') === false) {
            window.location.hash = hash;
            window.setTimeout(function () {
              document.querySelector('#' + hash).scrollIntoView({
                behavior: 'smooth',
                // smooth scroll
                block: 'start' // the upper border of the element will be aligned at the top of the visible part of the window of the scrollable area.
              });
            }, 100);
          } else {
            window.setTimeout(function () {
              document.querySelector('#my-quote').scrollIntoView({
                behavior: 'smooth',
                // smooth scroll
                block: 'start' // the upper border of the element will be aligned at the top of the visible part of the window of the scrollable area.
              });
            }, 100);
          }
          return false;
        }, false);
      }
    } else {
      // body.classList.add('no-toc')
    }
  };
  if (window.location.hash === '#toc' && body.classList.contains('toc-off') && body.classList.contains('has-toc')) {
    body.classList.toggle('toc-on');
    body.classList.toggle('toc-off');
  }
  toc();

  // const clickedElement = event.target
  // if (event.target.classList.contains('countable-icons')) {
  //     console.log(event.target)
  //     console.log('AA')
  //     event.target.click()
  // }
});

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
/* harmony import */ var _js_toc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/toc */ "../sun/src/js/toc.js");
/* harmony import */ var _js_toc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_toc__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/collapsible-menu */ "../sun/src/js/collapsible-menu.js");
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_collapsible_menu__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _js_scroll_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/scroll-manager */ "../sun/src/js/scroll-manager.js");
/* harmony import */ var _js_scroll_manager__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_scroll_manager__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _js_footer_is_visible__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/footer-is-visible */ "../sun/src/js/footer-is-visible.js");
/* harmony import */ var _js_footer_is_visible__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_footer_is_visible__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/form */ "../sun/src/js/form.js");
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_form__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/mouse-over-logo */ "../sun/src/js/mouse-over-logo.js");
/* harmony import */ var _js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/images */ "../sun/src/js/images.js");
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_images__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _js_image_hover__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/image-hover */ "../sun/src/js/image-hover.js");
/* harmony import */ var _js_image_hover__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_js_image_hover__WEBPACK_IMPORTED_MODULE_9__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUMvTSxTQUFTLENBQUN3QyxNQUFNLENBQUMsUUFBUSxDQUFDO0lBQy9CdUssSUFBSSxDQUFDL00sU0FBUyxDQUFDd0MsTUFBTSxDQUFDLFNBQVMsQ0FBQztFQUNwQztFQUNBd0ssR0FBRyxDQUFDLENBQUM7O0VBRUw7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0FBQ0osQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29CO0FBQ0k7QUFDUDtBQUNhO0FBQ0Y7QUFDRztBQUNiO0FBQ1c7QUFDVCIsInNvdXJjZXMiOlsid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2JvZHktY2xhc3MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvY29sbGFwc2libGUtbWVudS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9jb29raWUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvZm9vdGVyLWlzLXZpc2libGUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvZm9ybS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9pbWFnZS1ob3Zlci5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9pbWFnZXMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvbW91c2Utb3Zlci1sb2dvLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL3Njcm9sbC1tYW5hZ2VyLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL3RvYy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG15Q29va2llIH0gZnJvbSAnLi9jb29raWUuanMnXG5cbmNvbnN0IGJvZHlDbGFzcyA9IHtcbiAgICBib2R5T2JqZWN0OiBudWxsLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuICAgICAgICBib2R5Q2xhc3MuYWRkT3JUb2dnbGVCb2R5Q2xhc3MoJyNtZW51LXRvZ2dsZScsIGZhbHNlKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2R5Q2xhc3MuaXNIb21lUGFnZSgpKVxuICAgICAgICAvLyBjb25zb2xlLmxvZyhib2R5Q2xhc3MuaGFzRnJhZ21lbnQoKSlcbiAgICAgICAgLy8gaWYgKFxuICAgICAgICAvLyAgICAgYm9keUNsYXNzLmlzSG9tZVBhZ2UoKSA9PT0gdHJ1ZSAmJlxuICAgICAgICAvLyAgICAgYm9keUNsYXNzLmhhc0ZyYWdtZW50KCkgPT09IGZhbHNlXG4gICAgICAgIC8vICkge1xuICAgICAgICAvLyAgICAgLy8gY29uc29sZS5sb2coJ29wZW5pbmcgbWVudScpXG4gICAgICAgIC8vICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS10b2dnbGUnKS5jbGljaygpXG4gICAgICAgIC8vIH1cbiAgICAgICAgLy8gaWYgeW91IGNsaWNrIG9uIHRoZW1lLXNlbGVjdG9yLCB5b3Ugc2VsZWN0IHRoZSB0aGVtZVxuICAgICAgICBib2R5Q2xhc3MuYWRkT3JUb2dnbGVCb2R5Q2xhc3MoJy50aGVtZS1zZWxlY3RvcicsIHRydWUpXG4gICAgICAgIC8vIGlmIHlvdSBjbGljayBvbiBzZXQtdGhlbSwgeW91IHNlbGVjdCB0aGUgdGhlbWVcbiAgICAgICAgYm9keUNsYXNzLnJldHJpZXZlQ29va2llT3JIYXNoKClcbiAgICAgICAgLy8gZXhwb3NlIHNjcm9sbGVkIGJlaGF2aW91clxuICAgICAgICB0aGlzLnNjcm9sbFN0YXJ0KClcbiAgICAgICAgdGhpcy5hZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycygpXG4gICAgfSxcblxuICAgIGFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktbG9hZGVkJylcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgICAgICAgaWYgKCdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkge1xuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ3RvdWNoJylcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnbm8tdG91Y2gnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYm9keUNsYXNzLmFkZFJvY2tldE1vZGUoKVxuICAgICAgICB9KVxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnYm9keS11bmxvYWRlZCcpXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHJldHJpZXZlQ29va2llT3JIYXNoOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGxldCBoYXNoID0gYm9keUNsYXNzLmdldEhhc2hGcm9tVVJMKClcbiAgICAgICAgbGV0IHByZWZlcnJlZFRoZW1lID0gJydcbiAgICAgICAgaWYgKGhhc2ggPT09ICdyZXNldCcpIHtcbiAgICAgICAgICAgIG15Q29va2llLmVyYXNlQ29va2llKCdwcmVmZXJyZWRUaGVtZScpXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhyZXNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaGFzaCkge1xuICAgICAgICAgICAgdGhpcy5ydW5DbGlja0ZvckVsZW1lbnQoaGFzaClcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzaCAhPT0gJ3RoZW1lLW1vb24nICYmIGhhc2ggIT09ICd0aGVtZS1zdW4nKSB7XG4gICAgICAgICAgICBwcmVmZXJyZWRUaGVtZSA9IG15Q29va2llLmdldENvb2tpZSgncHJlZmVycmVkVGhlbWUnKVxuICAgICAgICAgICAgaWYgKHByZWZlcnJlZFRoZW1lKSB7XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3Quc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgcHJlZmVycmVkVGhlbWUpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJvZHlDbGFzcy51c2VyUHJlZmVyc0RhcmtUaGVtZSgpKSB7XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3Quc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ3RoZW1lLW1vb24nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVzZXJQcmVmZXJzRGFya1RoZW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYSAmJlxuICAgICAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzXG4gICAgICAgIClcbiAgICB9LFxuXG4gICAgcnVuQ2xpY2tGb3JFbGVtZW50OiBmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgICBoYXNoID0gaGFzaC50cmltKClcbiAgICAgICAgaWYgKGhhc2gubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKVxuICAgICAgICAgICAgaWYgKG9iaiAmJiBvYmouY2xhc3NMaXN0LmNvbnRhaW5zKCd0aGVtZS1zZWxlY3RvcicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGUob2JqKVxuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoaGFzaClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG5cbiAgICBhZGRPclRvZ2dsZUJvZHlDbGFzczogZnVuY3Rpb24gKG9ialNlbGVjdG9yLCBpc1RoZW1lKSB7XG4gICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChvYmpTZWxlY3RvcilcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChvbmVFYWNoT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgb25lRWFjaE9iamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYWN0aW9uQm9keUNsYXNzQ2hhbmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgb25lRWFjaE9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUaGVtZVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBzY3JvbGxTdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cuc2Nyb2xsVG8od2luZG93LnNjcm9sbFgsIHdpbmRvdy5zY3JvbGxZICsgMilcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh3aW5kb3cuc2Nyb2xsWCwgd2luZG93LnNjcm9sbFkgLSAyKVxuICAgICAgICAgICAgY29uc3QgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVVSTCgpXG4gICAgICAgICAgICBpZiAoaGFzaCAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgaGFzaCkuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsIC8vIHNtb290aCBzY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCcgLy8gdGhlIHVwcGVyIGJvcmRlciBvZiB0aGUgZWxlbWVudCB3aWxsIGJlIGFsaWduZWQgYXQgdGhlIHRvcCBvZiB0aGUgdmlzaWJsZSBwYXJ0IG9mIHRoZSB3aW5kb3cgb2YgdGhlIHNjcm9sbGFibGUgYXJlYS5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMDApXG4gICAgfSxcblxuICAgIGFjdGlvbkJvZHlDbGFzc0NoYW5nZTogZnVuY3Rpb24gKG9uZUVhY2hPYmplY3QsIGV2ZW50LCBpc1RoZW1lLCBzY3JvbGxUbykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgYm9keUNsYXNzLnJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZShvbmVFYWNoT2JqZWN0KVxuXG4gICAgICAgIGxldCB0b2dnbGVDbGFzcyA9ICcnXG4gICAgICAgIGxldCBpZCA9ICcnXG4gICAgICAgIGlmIChvbmVFYWNoT2JqZWN0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hZGQtY2xhc3MnKSkge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MgPSBvbmVFYWNoT2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1hZGQtY2xhc3MnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MgPSBvbmVFYWNoT2JqZWN0LmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgICAgICAgaWQgPSB0b2dnbGVDbGFzc1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbmVFYWNoT2JqZWN0Lmhhc0F0dHJpYnV0ZSgnZGF0YS10b2dnbGUtcmF0aGVyLXRoYW4tYWRkJykpIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC50b2dnbGUodG9nZ2xlQ2xhc3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKHRvZ2dsZUNsYXNzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVGhlbWUpIHtcbiAgICAgICAgICAgIG15Q29va2llLnNldENvb2tpZSgncHJlZmVycmVkVGhlbWUnLCB0b2dnbGVDbGFzcywgMTQpXG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCB0b2dnbGVDbGFzcylcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWQgJiYgc2Nyb2xsVG8pIHtcbiAgICAgICAgICAgIGxldCBoYXNoID0gYm9keUNsYXNzLmdldEhhc2hGcm9tU3RyaW5nKGlkKVxuICAgICAgICAgICAgaWYgKGhhc2gubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaGFzaCA9IGhhc2gucmVwbGFjZSgnIycsICcnKVxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyMnICsgaGFzaFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZTogZnVuY3Rpb24gKCRvYmplY3QpIHtcbiAgICAgICAgaWYgKCRvYmplY3QuaGFzQXR0cmlidXRlKCdkYXRhLXJlbW92ZS1jbGFzcycpKSB7XG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgPSAkb2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZW1vdmUtY2xhc3MnKVxuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IGJvZHlDbGFzcy5nZXRDbGFzc2VzRnJvbUxpc3Qoc3RyaW5nKVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNsYXNzZXNbaV1cbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldENsYXNzZXNGcm9tTGlzdDogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICBjb25zdCBhcnJheSA9IHN0cmluZy5zcGxpdCgnLCcpXG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGFycmF5W2ldLnRyaW0oKVxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbmV3QXJyYXkucHVzaCh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3QXJyYXlcbiAgICB9LFxuXG4gICAgZ2V0SGFzaEZyb21VUkw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhhc2hcbiAgICAgICAgcmV0dXJuIGJvZHlDbGFzcy5nZXRIYXNoRnJvbVN0cmluZyhzdHJpbmcpXG4gICAgfSxcblxuICAgIGdldEhhc2hGcm9tU3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIHN0cmluZyA9IFN0cmluZyhzdHJpbmcpXG4gICAgICAgIHJldHVybiBib2R5Q2xhc3MucmV0cmlldmVIYXNTaWduRnJvbVN0cmluZyhzdHJpbmcpXG4gICAgfSxcblxuICAgIHJldHJpZXZlSGFzU2lnbkZyb21TdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKCcjJywgJycpXG4gICAgfSxcblxuICAgIGFkZFJvY2tldE1vZGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY29uc3Qgc2hhZG93ID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgJ2RhdGEtc2hhZG93LW92ZXItbG9nbydcbiAgICAgICAgKVxuICAgICAgICBsZXQgc2hhZG93Q29sb3VyID0gJydcbiAgICAgICAgaWYgKHNoYWRvdyA9PT0gJ2RhcmsnKSB7XG4gICAgICAgICAgICBzaGFkb3dDb2xvdXIgPVxuICAgICAgICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMjU4ZGVnLCAjMDAwMDAwMzAgMzAlLCB0cmFuc3BhcmVudCA2MCUpLCAnXG4gICAgICAgIH0gZWxzZSBpZiAoc2hhZG93ID09PSAnbGlnaHQnKSB7XG4gICAgICAgICAgICBzaGFkb3dDb2xvdXIgPVxuICAgICAgICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMjU4ZGVnLCAjRkZGRkZGMzAgMzAlLCB0cmFuc3BhcmVudCA2MCUpLCAnXG4gICAgICAgIH1cbiAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XG4gICAgICAgICAgICBzaGFkb3dDb2xvdXIgK1xuICAgICAgICAgICAgJ3VybCgnICtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1iZy1pbWFnZScpICtcbiAgICAgICAgICAgICcpJ1xuICAgICAgICBkaXYuaWQgPSAnQmFja2dyb3VuZEltYWdlJ1xuICAgICAgICBjb25zdCB0ZW1wID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZmlyc3RDaGlsZFxuICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5pbnNlcnRCZWZvcmUoZGl2LCB0ZW1wKVxuICAgIH0sXG5cbiAgICBpc0hvbWVQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJ1xuICAgIH0sXG5cbiAgICBoYXNGcmFnbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhhc2ggIT09ICcnXG4gICAgfVxufVxuXG5ib2R5Q2xhc3MuaW5pdCgpXG4iLCIvKlxuXG5Db2xsYXBzaWJsZUxpc3RzLmpzXG5cbkFuIG9iamVjdCBhbGxvd2luZyBsaXN0cyB0byBkeW5hbWljYWxseSBleHBhbmQgYW5kIGNvbGxhcHNlXG5cbkNyZWF0ZWQgYnkgS2F0ZSBNb3JsZXkgLSBodHRwOi8vY29kZS5pYW1rYXRlLmNvbS8gLSBhbmQgcmVsZWFzZWQgdW5kZXIgdGhlIHRlcm1zXG5vZiB0aGUgQ0MwIDEuMCBVbml2ZXJzYWwgbGVnYWwgY29kZTpcblxuaHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvcHVibGljZG9tYWluL3plcm8vMS4wL2xlZ2FsY29kZVxuXG4qL1xuXG5jb25zdCBDb2xsYXBzaWJsZUxpc3RzID0gKGZ1bmN0aW9uICgpIHtcbiAgICAvLyBNYWtlcyBhbGwgbGlzdHMgd2l0aCB0aGUgY2xhc3MgJ2NvbGxhcHNpYmxlTGlzdCcgY29sbGFwc2libGUuIFRoZVxuICAgIC8vIHBhcmFtZXRlciBpczpcbiAgICAvL1xuICAgIC8vIGRvTm90UmVjdXJzZSAtIHRydWUgaWYgc3ViLWxpc3RzIHNob3VsZCBub3QgYmUgbWFkZSBjb2xsYXBzaWJsZVxuICAgIGZ1bmN0aW9uIGFwcGx5IChkb05vdFJlY3Vyc2UpIHtcbiAgICAgICAgO1tdLmZvckVhY2guY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKSwgbm9kZSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdCcpKSB7XG4gICAgICAgICAgICAgICAgYXBwbHlUbyhub2RlLCB0cnVlKVxuXG4gICAgICAgICAgICAgICAgaWYgKCFkb05vdFJlY3Vyc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgO1tdLmZvckVhY2guY2FsbChcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJyksXG4gICAgICAgICAgICAgICAgICAgICAgICBzdWJub2RlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWJub2RlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaGFzT3BlblN1Ykxpc3Qobm9kZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNPcGVuU3ViTGlzdCAoZWwpIHtcbiAgICAgICAgY29uc3QgbGlzdCA9IGVsLmNsb3Nlc3QoJy5jb2xsYXBzaWJsZUxpc3QnKVxuICAgICAgICBpZiAobGlzdCkge1xuICAgICAgICAgICAgaWYgKGxpc3QucXVlcnlTZWxlY3RvckFsbCgnLmNvbGxhcHNpYmxlTGlzdE9wZW4nKS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsaXN0LmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdEhhc09wZW4nKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsaXN0LmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdEhhc09wZW4nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gTWFrZXMgdGhlIHNwZWNpZmllZCBsaXN0IGNvbGxhcHNpYmxlLiBUaGUgcGFyYW1ldGVycyBhcmU6XG4gICAgLy9cbiAgICAvLyBub2RlICAgICAgICAgLSB0aGUgbGlzdCBlbGVtZW50XG4gICAgLy8gZG9Ob3RSZWN1cnNlIC0gdHJ1ZSBpZiBzdWItbGlzdHMgc2hvdWxkIG5vdCBiZSBtYWRlIGNvbGxhcHNpYmxlXG4gICAgZnVuY3Rpb24gYXBwbHlUbyAobm9kZSwgZG9Ob3RSZWN1cnNlKSB7XG4gICAgICAgIDtbXS5mb3JFYWNoLmNhbGwobm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSwgbGkgPT4ge1xuICAgICAgICAgICAgaWYgKCFkb05vdFJlY3Vyc2UgfHwgbm9kZSA9PT0gbGkucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIGxpLnN0eWxlLnVzZXJTZWxlY3QgPSAnbm9uZSdcbiAgICAgICAgICAgICAgICBsaS5zdHlsZS5Nb3pVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgbGkuc3R5bGUubXNVc2VyU2VsZWN0ID0gJ25vbmUnXG4gICAgICAgICAgICAgICAgbGkuc3R5bGUuV2Via2l0VXNlclNlbGVjdCA9ICdub25lJ1xuICAgICAgICAgICAgICAgIGNvbnN0IHVsID0gbGkuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ3VsJylcbiAgICAgICAgICAgICAgICBpZiAodWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnb3Blbi1jbG9zZScpXG4gICAgICAgICAgICAgICAgICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljay5iaW5kKG51bGwsIGxpKSlcbiAgICAgICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJzxpIGNsYXNzPVwib3BlblwiPuKGmDwvaT48aSBjbGFzcz1cImNsb3NlZFwiPuKGljwvaT4nXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gdG9nZ2xlIGFsbCBvZiB0aGVtLCBzb21lIHR3aWNlXG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5jb250YWlucygnc2VjdGlvbicpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvZ2dsZShsaSlcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0b2dnbGUobGkpXG4gICAgICAgICAgICAgICAgICAgIGxpLmluc2VydEJlZm9yZShzcGFuLCB1bFswXSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgLy8gSGFuZGxlcyBhIGNsaWNrLiBUaGUgcGFyYW1ldGVyIGlzOlxuICAgIC8vXG4gICAgLy8gbm9kZSAtIHRoZSBub2RlIGZvciB3aGljaCBjbGlja3MgYXJlIGJlaW5nIGhhbmRsZWRcbiAgICBmdW5jdGlvbiBoYW5kbGVDbGljayAobm9kZSwgZSkge1xuICAgICAgICBsZXQgbGkgPSBlLnRhcmdldFxuICAgICAgICB3aGlsZSAobGkubm9kZU5hbWUgIT09ICdMSScpIHtcbiAgICAgICAgICAgIGxpID0gbGkucGFyZW50Tm9kZVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGxpID09PSBub2RlKSB7XG4gICAgICAgICAgICB0b2dnbGUobm9kZSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIE9wZW5zIG9yIGNsb3NlcyB0aGUgdW5vcmRlcmVkIGxpc3QgZWxlbWVudHMgZGlyZWN0bHkgd2l0aGluIHRoZVxuICAgIC8vIHNwZWNpZmllZCBub2RlLiBUaGUgcGFyYW1ldGVyIGlzOlxuICAgIC8vXG4gICAgLy8gbm9kZSAtIHRoZSBub2RlIGNvbnRhaW5pbmcgdGhlIHVub3JkZXJlZCBsaXN0IGVsZW1lbnRzXG4gICAgZnVuY3Rpb24gdG9nZ2xlIChub2RlKSB7XG4gICAgICAgIGNvbnN0IG9wZW4gPSBub2RlLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICAgICAgY29uc3QgdWxzID0gbm9kZS5nZXRFbGVtZW50c0J5VGFnTmFtZSgndWwnKVxuXG4gICAgICAgIDtbXS5mb3JFYWNoLmNhbGwodWxzLCB1bCA9PiB7XG4gICAgICAgICAgICBsZXQgbGkgPSB1bFxuICAgICAgICAgICAgd2hpbGUgKGxpLm5vZGVOYW1lICE9PSAnTEknKSB7XG4gICAgICAgICAgICAgICAgbGkgPSBsaS5wYXJlbnROb2RlXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChsaSA9PT0gbm9kZSkge1xuICAgICAgICAgICAgICAgIHVsLnN0eWxlLmRpc3BsYXkgPSBvcGVuID8gJ2Jsb2NrJyA6ICdub25lJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgICAgIG5vZGUuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcblxuICAgICAgICBpZiAodWxzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIG5vZGUuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0JyArIChvcGVuID8gJ09wZW4nIDogJ0Nsb3NlZCcpKVxuICAgICAgICB9XG4gICAgICAgIGhhc09wZW5TdWJMaXN0KG5vZGUpXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYXBwbHksIGFwcGx5VG8gfVxufSkoKVxuXG5Db2xsYXBzaWJsZUxpc3RzLmFwcGx5KClcbiIsImNvbnN0IG15Q29va2llID0ge1xuXG4gIHNldENvb2tpZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBkYXlzKSB7XG4gICAgdmFyIGV4cGlyZXMgPSAnJ1xuICAgIGlmICh0eXBlb2YgZGF5cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRheXMgPSAxNFxuICAgIH1cbiAgICBpZiAoZGF5cykge1xuICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKVxuICAgICAgZXhwaXJlcyA9ICc7IGV4cGlyZXM9JyArIGRhdGUudG9VVENTdHJpbmcoKVxuICAgIH1cbiAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgJz0nICsgKHZhbHVlIHx8ICcnKSArIGV4cGlyZXMgKyAnOyBwYXRoPS8nXG4gIH0sXG5cbiAgZ2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBuYW1lRVEgPSBuYW1lICsgJz0nXG4gICAgdmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JylcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYyA9IGNhW2ldXG4gICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xuICAgICAgICBjID0gYy5zdWJzdHJpbmcoMSwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgICBpZiAoYy5pbmRleE9mKG5hbWVFUSkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9LFxuXG4gIGVyYXNlQ29va2llOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIG15Q29va2llLnNldENvb2tpZShuYW1lLCBudWxsLCAwKVxuICB9XG59XG5cbmV4cG9ydCB7IG15Q29va2llIH1cbiIsImNvbnN0IGZvb3RlcklzVmlzaWJsZSA9IHtcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIHRoaXMgaXMgdGhlIHRhcmdldCB3aGljaCBpcyBvYnNlcnZlZFxuICAgICAgICBjb25zdCB0YXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9vdGVyJylcblxuICAgICAgICAvLyBjb25maWd1cmUgdGhlIGludGVyc2VjdGlvbiBvYnNlcnZlciBpbnN0YW5jZVxuICAgICAgICB2YXIgaW50ZXJzZWN0aW9uT2JzZXJ2ZXJPcHRpb25zID0ge1xuICAgICAgICAgICAgcm9vdDogbnVsbCxcbiAgICAgICAgICAgIHJvb3RNYXJnaW46ICc1MCUnLFxuICAgICAgICAgICAgdGhyZXNob2xkOiAxXG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBvbkludGVyc2VjdGlvbiAoZW50cmllcykge1xuICAgICAgICAgICAgZW50cmllcy5mb3JFYWNoKGVudHJ5ID0+IHtcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmNsZWFyKClcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlbnRyeS5pbnRlcnNlY3Rpb25SYXRpbylcbiAgICAgICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgICAgICAgICAgICAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2Zvb3Rlci12aXNpYmxlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVudHJ5LmludGVyc2VjdGlvblJhdGlvID49IDFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC8vIEFyZSB3ZSBpbiB2aWV3cG9ydD9cbiAgICAgICAgICAgICAgICAvLyBpZiAoZW50cnkuaW50ZXJzZWN0aW9uUmF0aW8gPiAxKSB7XG4gICAgICAgICAgICAgICAgLy8gU3RvcCB3YXRjaGluZ1xuICAgICAgICAgICAgICAgIC8vIG9ic2VydmVyLnVub2JzZXJ2ZShlbnRyeS50YXJnZXQpO1xuICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb2JzZXJ2ZXIgPSBuZXcgd2luZG93LkludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgICAgICAgICAgb25JbnRlcnNlY3Rpb24sXG4gICAgICAgICAgICBpbnRlcnNlY3Rpb25PYnNlcnZlck9wdGlvbnNcbiAgICAgICAgKVxuXG4gICAgICAgIC8vIHByb3ZpZGUgdGhlIG9ic2VydmVyIHdpdGggYSB0YXJnZXRcbiAgICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQpXG4gICAgfVxufVxuXG5mb290ZXJJc1Zpc2libGUuaW5pdCgpXG4iLCJ2YXIgZm9ybWZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSdcbilcbmZvciAodmFyIEogPSBmb3JtZmllbGRzLmxlbmd0aCAtIDE7IEogPj0gMDsgLS1KKSB7XG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcblxuICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKVxuICBldnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCBmYWxzZSwgdHJ1ZSlcbiAgZm9ybWZpZWxkc1tKXS5kaXNwYXRjaEV2ZW50KGV2dClcbn1cblxuZnVuY3Rpb24gYWRqdXN0U3R5bGluZyAoekV2ZW50KSB7XG4gIHZhciBpbnBWYWwgPSB6RXZlbnQudGFyZ2V0LnZhbHVlXG4gIGlmIChpbnBWYWwgJiYgaW5wVmFsLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSkge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdmFsdWUnKVxuICB9IGVsc2Uge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbm8tdmFsdWUnKVxuICB9XG59XG4iLCJjb25zdCBpbWFnZWhvdmVyID0ge1xuICAgIHJlc2V0VGltZW91dDogbnVsbCxcblxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmltYWdlLWNvbnRhaW5lcicpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb3VjaERldmljZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2V0VGltZW91dClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGxlZnQsIHRvcCB9ID1cbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gZS5wYWdlWCAtIGxlZnQgLSB3aW5kb3cuc2Nyb2xsWFxuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBlLnBhZ2VZIC0gdG9wIC0gd2luZG93LnNjcm9sbFlcblxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLnNldFByb3BlcnR5KCctLW1vdXNlLXgnLCAoeCAvIHdpZHRoKSAqIDUwIC0gMjUpXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuc2V0UHJvcGVydHkoJy0tbW91c2UteScsIDI1IC0gKHkgLyBoZWlnaHQpICogNTApXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1RvdWNoRGV2aWNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCctLW1vdXNlLXgnKVxuICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJy0tbW91c2UteScpXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGlzVG91Y2hEZXZpY2VWYXI6IG51bGwsXG5cbiAgICBpc1RvdWNoRGV2aWNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVG91Y2hEZXZpY2VWYXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUb3VjaERldmljZVZhciA9XG4gICAgICAgICAgICAgICAgJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8XG4gICAgICAgICAgICAgICAgJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMCB8fFxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmlzVG91Y2hEZXZpY2VWYXJcbiAgICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW1hZ2Vob3Zlci5pbml0KClcbn0pXG4iLCJcbmNvbnN0IGltYWdlV3JhcHBlciA9ICgpID0+IHtcbiAgZnVuY3Rpb24gd3JhcCAoZWwsIHdyYXBwZXIpIHtcbiAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyLCBlbClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsKVxuICB9XG4gIC8vIGNyZWF0ZSB0aGUgY29udGFpbmVyIGRpdlxuXG4gIC8vIGdldCBhbGwgZGl2c1xuICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwb2dyYXBoeSBpbWcnKVxuICAvLyBnZXQgdGhlIGJvZHkgZWxlbWVudFxuICAvLyBhcHBseSBjbGFzcyB0byBjb250YWluZXIgZGl2XG5cbiAgLy8gZmluZCBvdXQgYWxsIHRob3NlIGRpdnMgaGF2aW5nIGNsYXNzIENcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBkdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZHYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdpbWFnZS1jb250YWluZXInKVxuICAgIGNvbnN0IGltZyA9IGltYWdlc1tpXVxuICAgIHdyYXAoaW1nLCBkdilcbiAgfVxufVxuXG5pbWFnZVdyYXBwZXIoKVxuIiwiY29uc3Qgc2hvd1JvY2tldE1vZGUgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0b2dnbGVDbGFzc09uSG92ZXIgPSAoZSkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgICAgIC5jbGFzc0xpc3RcbiAgICAgICAgLnRvZ2dsZSgnbW91c2Utb3Zlci1sb2dvJywgZS50eXBlID09PSAnbW91c2VlbnRlcicpXG4gICAgfVxuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9nbycpXG4gICAgbG9nby5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdG9nZ2xlQ2xhc3NPbkhvdmVyKVxuICAgIGxvZ28uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRvZ2dsZUNsYXNzT25Ib3ZlcilcbiAgfVxufVxuXG5zaG93Um9ja2V0TW9kZS5pbml0KClcbiIsImNvbnN0IHNjcm9sbE1hbmFnZXIgPSB7XG4gICAgbWljcm9TZWNvbmRzQmVmb3JlSnVzdFNjcm9sbGxlZFJlbW92ZWQ6IDUwMDAsXG5cbiAgICBtaW5TY3JvbGxGb3JBY3Rpb246IDIsXG5cbiAgICBtaW5TY3JvbGxEb3duVG9CZVByb3BlclNjcm9sbDogMTAwLFxuXG4gICAgbm9ybWFsVHJhbnNpdGlvbkR1cmF0aW9uOiAwLFxuXG4gICAgdGhlbWVUcmFuc2l0aW9uRHVyYXRpb246ICcxLjVzJyxcblxuICAgIC8vIGNhbGN1bGF0ZWQgdmFyaWFibGVzXG5cbiAgICBuZXdTY3JvbGw6IDAsXG5cbiAgICBtaW5pbXVtU2Nyb2xsRm9yVGhlbWVTd2l0Y2g6IDIwLFxuXG4gICAgbGFzdFNjcm9sbDogMCxcblxuICAgIGRpZFNjcm9sbDogMCxcblxuICAgIGJvZHlPYmplY3Q6IG51bGwsXG5cbiAgICB0aW1lT3V0Rng6IG51bGwsXG5cbiAgICBqdXN0U2Nyb2xsZWRGeDogbnVsbCxcblxuICAgIHNjcm9sbGVkVXBDbGFzczogJ3Njcm9sbGVkLXVwJyxcblxuICAgIHNjcm9sbGVkRG93bkNsYXNzOiAnc2Nyb2xsZWQtZG93bicsXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuICAgICAgICBzY3JvbGxNYW5hZ2VyLnNjcm9sbExpc3RlbmVyKClcbiAgICAgICAgc2Nyb2xsTWFuYWdlci5zY3JvbGxVcE9yRG93bigpXG4gICAgICAgIHNjcm9sbE1hbmFnZXIubGFzdFNjcm9sbCA9IHNjcm9sbE1hbmFnZXIuY3VycmVudFNjcm9sbCgpXG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyhcbiAgICAgICAgICAgICAgICB3aW5kb3cuc2Nyb2xsWCxcbiAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmN1cnJlbnRTY3JvbGwoKSAtXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubWluU2Nyb2xsRm9yQWN0aW9uIC1cbiAgICAgICAgICAgICAgICAgICAgMVxuICAgICAgICAgICAgKVxuICAgICAgICB9LCA1MClcbiAgICAgICAgc2Nyb2xsTWFuYWdlci5mb290ZXJIZWlnaHQgPVxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9vdGVyJykub2Zmc2V0SGVpZ2h0IC8gMlxuICAgICAgICBzY3JvbGxNYW5hZ2VyLm5vcm1hbFRyYW5zaXRpb25EdXJhdGlvbiA9XG4gICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3Quc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uXG4gICAgfSxcblxuICAgIGdldFRoZW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RyaW5nKHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnKSlcbiAgICB9LFxuXG4gICAgY3VycmVudFNjcm9sbDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gcGFyc2VJbnQod2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcClcbiAgICB9LFxuXG4gICAgc2Nyb2xsTGlzdGVuZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGlzUm9ja2V0VGhlbWUgPSBudWxsXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KHNjcm9sbE1hbmFnZXIudGltZU91dEZ4KVxuICAgICAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChzY3JvbGxNYW5hZ2VyLmp1c3RTY3JvbGxlZEZ4KVxuICAgICAgICAgICAgY29uc3QgdGhlbWUgPSBzY3JvbGxNYW5hZ2VyLmdldFRoZW1lKClcbiAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubmV3U2Nyb2xsID0gc2Nyb2xsTWFuYWdlci5jdXJyZW50U2Nyb2xsKClcbiAgICAgICAgICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICAgICAgY29uc3QgdG90YWxIZWlnaHQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0XG4gICAgICAgICAgICBpZiAod2luZG93LmlubmVyV2lkdGggPiA3NjgpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBxdW90ZUJsb2NrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tcXVvdGUnKVxuICAgICAgICAgICAgICAgIGlmICghcXVvdGVCbG9jaykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGFkZGl0aW9uYWxNYXJnaW4gPSBNYXRoLm1pbihcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LnNjcm9sbFksXG4gICAgICAgICAgICAgICAgICAgICgyNSAqIHdpbmRvdy5pbm5lckhlaWdodCkgLyAxMDBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgcXVvdGVCbG9jay5zdHlsZS5tYXJnaW5Ub3AgPSBgJHthZGRpdGlvbmFsTWFyZ2lufXB4YCAvLyBVc2UgYmFja3RpY2tzIGhlcmVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIENoZWNrIGlmIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIGlzIGF0IHRoZSBib3R0b20gbWludXMgdGhlIGZvb3RlcidzIGhlaWdodFxuICAgICAgICAgICAgY29uc3QgYm90dG9tVGVzdCA9XG4gICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5jb250YWlucygnZm9vdGVyLXZpc2libGUnKVxuICAgICAgICAgICAgLy8gc2Nyb2xsTWFuYWdlci5uZXdTY3JvbGwgKyB3aW5kb3dIZWlnaHQgPj1cbiAgICAgICAgICAgIC8vIHRvdGFsSGVpZ2h0IC0gc2Nyb2xsTWFuYWdlci5mb290ZXJIZWlnaHRcbiAgICAgICAgICAgIGNvbnN0IHRvcFRlc3QgPVxuICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubmV3U2Nyb2xsIDxcbiAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLm1pbmltdW1TY3JvbGxGb3JUaGVtZVN3aXRjaFxuICAgICAgICAgICAgaWYgKHRvcFRlc3QpIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgncGFzdC1oZWFkZXInKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgncGFzdC1oZWFkZXInKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRvcFRlc3QgfHwgYm90dG9tVGVzdCkge1xuICAgICAgICAgICAgICAgIGlmIChpc1JvY2tldFRoZW1lICE9PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci50aGVtZVRyYW5zaXRpb25EdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSh0aGVtZSlcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ3RoZW1lLXJvY2tldCcpXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5zdHlsZS50cmFuc2l0aW9uU3BlZWQgPVxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ub3JtYWxUcmFuc2l0aW9uRHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgaXNSb2NrZXRUaGVtZSA9IHRydWVcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpc1JvY2tldFRoZW1lICE9PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3Quc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIudGhlbWVUcmFuc2l0aW9uRHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQodGhlbWUpXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCd0aGVtZS1yb2NrZXQnKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3Quc3R5bGUudHJhbnNpdGlvblNwZWVkID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubm9ybWFsVHJhbnNpdGlvbkR1cmF0aW9uXG4gICAgICAgICAgICAgICAgICAgIGlzUm9ja2V0VGhlbWUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuZGlkU2Nyb2xsID0gdHJ1ZVxuICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5zY3JvbGxVcE9yRG93bigpXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHNjcm9sbFVwT3JEb3duOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHNjcm9sbE1hbmFnZXIudGltZU91dEZ4ID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ3J1bm5pbmcnKVxuICAgICAgICAgICAgaWYgKHNjcm9sbE1hbmFnZXIuZGlkU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgc28gdGhhdCB3ZSBrbm93IGVhY2ggY2FsbCBpcyBhIHJlYWwgY2FsbC5cbiAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmRpZFNjcm9sbCA9IGZhbHNlXG4gICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5uZXdTY3JvbGwgPSB3aW5kb3cuc2Nyb2xsWVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdsYXN0IHNjcm9sbDogJyArIHNjcm9sbE1hbmFnZXIubGFzdFNjcm9sbClcbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbmV3IHNjcm9sbDogJyArIG5ld1Njcm9sbClcbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIE1hdGguYWJzKFxuICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5sYXN0U2Nyb2xsIC0gc2Nyb2xsTWFuYWdlci5uZXdTY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgKSA8PSBzY3JvbGxNYW5hZ2VyLm1pblNjcm9sbEZvckFjdGlvblxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygndG9vIGxpdHRsZScpXG4gICAgICAgICAgICAgICAgICAgIHJldHVyblxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubmV3U2Nyb2xsID5cbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5sYXN0U2Nyb2xsICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubWluU2Nyb2xsRG93blRvQmVQcm9wZXJTY3JvbGxcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ2Rvd24nKVxuICAgICAgICAgICAgICAgICAgICAvLyBTY3JvbGwgRG93blxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZShcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuc2Nyb2xsZWRVcENsYXNzXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLnNjcm9sbGVkRG93bkNsYXNzXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNjcm9sbE1hbmFnZXIubmV3U2Nyb2xsIDwgc2Nyb2xsTWFuYWdlci5sYXN0U2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCd1cCcpXG4gICAgICAgICAgICAgICAgICAgIC8vIFNjcm9sbCBVcFxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZChcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIuc2Nyb2xsZWRVcENsYXNzXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLnNjcm9sbGVkRG93bkNsYXNzXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2p1c3Qtc2Nyb2xsZWQnKVxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLmp1c3RTY3JvbGxlZEZ4ID0gd2luZG93LnNldFRpbWVvdXQoXG4gICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2Nyb2xsTWFuYWdlci5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdqdXN0LXNjcm9sbGVkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JvbGxNYW5hZ2VyLm1pY3JvU2Vjb25kc0JlZm9yZUp1c3RTY3JvbGxsZWRSZW1vdmVkXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZG8gbm90aGluZycpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHNjcm9sbE1hbmFnZXIubGFzdFNjcm9sbCA9IHNjcm9sbE1hbmFnZXIubmV3U2Nyb2xsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDEwMClcbiAgICB9XG59XG5cbnNjcm9sbE1hbmFnZXIuaW5pdCgpXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcblxuICAgIGNvbnN0IHRvYyA9ICgpID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBjb250YWluZXIgZGl2XG4gICAgICAgIC8vIGdldCBhbGwgZGl2c1xuICAgICAgICBjb25zdCBoZWFkaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAnI2NvbnRlbnQtYmVsb3ctcXVvdGUgaDEsICNjb250ZW50LWJlbG93LXF1b3RlIGgyJ1xuICAgICAgICApXG4gICAgICAgIC8vIGdldCB0aGUgYm9keSBlbGVtZW50XG4gICAgICAgIC8vIGFwcGx5IGNsYXNzIHRvIGNvbnRhaW5lciBkaXZcbiAgICAgICAgaWYgKGhlYWRpbmdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnaGFzLXRvYycpXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3RvYy1vZmYnKVxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvdW50ID0gaSArIDFcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IGhlYWRpbmdzW2ldXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZWwpXG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzRWxlbSA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNFbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IHN0eWxlcyBvciBjbGFzc2VzIHRvIHByZXZpb3VzRWxlbVxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0VsZW0uY2xhc3NMaXN0LmFkZCgnYm90dG9tLXNwYWNlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWwuaWQgPSAndG9jLScgKyBjb3VudFxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2NvdW50YWJsZS1pY29ucycpXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaWNvbi0nICsgY291bnQpXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnb3Blbi1jbG9zZScpXG4gICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdpY29uJylcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuRW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICAgICAgc3BhbkVuZC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtaG9sZGVyJylcbiAgICAgICAgICAgICAgICAvLyBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2suYmluZChudWxsLCBlbCkpXG4gICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJvcGVuXCI+KzwvaT48aSBjbGFzcz1cImNsb3NlZFwiPuKAkzwvaT4nXG4gICAgICAgICAgICAgICAgc3BhbkVuZC5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJhY3RpdmVcIj7iloI8L2k+J1xuICAgICAgICAgICAgICAgIGVsLmluc2VydEJlZm9yZShzcGFuLCBlbC5maXJzdENoaWxkKVxuICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKHNwYW5FbmQpXG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb2ZmJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNjb250ZW50LWJlbG93LXF1b3RlIC50b2MtYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gaGVhZGluZ3NbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd0b2MtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2Mtb24nKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignIycgKyBoYXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsIC8vIHNtb290aCBzY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jazogJ3N0YXJ0JyAvLyB0aGUgdXBwZXIgYm9yZGVyIG9mIHRoZSBlbGVtZW50IHdpbGwgYmUgYWxpZ25lZCBhdCB0aGUgdG9wIG9mIHRoZSB2aXNpYmxlIHBhcnQgb2YgdGhlIHdpbmRvdyBvZiB0aGUgc2Nyb2xsYWJsZSBhcmVhLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjbXktcXVvdGUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsIC8vIHNtb290aCBzY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jazogJ3N0YXJ0JyAvLyB0aGUgdXBwZXIgYm9yZGVyIG9mIHRoZSBlbGVtZW50IHdpbGwgYmUgYWxpZ25lZCBhdCB0aGUgdG9wIG9mIHRoZSB2aXNpYmxlIHBhcnQgb2YgdGhlIHdpbmRvdyBvZiB0aGUgc2Nyb2xsYWJsZSBhcmVhLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXRvYycpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID09PSAnI3RvYycgJiZcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3RvYy1vZmYnKSAmJlxuICAgICAgICBib2R5LmNsYXNzTGlzdC5jb250YWlucygnaGFzLXRvYycpXG4gICAgKSB7XG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgndG9jLW9uJylcbiAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb2ZmJylcbiAgICB9XG4gICAgdG9jKClcblxuICAgIC8vIGNvbnN0IGNsaWNrZWRFbGVtZW50ID0gZXZlbnQudGFyZ2V0XG4gICAgLy8gaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvdW50YWJsZS1pY29ucycpKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldClcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ0FBJylcbiAgICAvLyAgICAgZXZlbnQudGFyZ2V0LmNsaWNrKClcbiAgICAvLyB9XG59KVxuIiwiLy8gLy8gbm9uLXRoZW1lZCBhcHBcbi8vIGltcG9ydCAnc2l0ZS9hcHAvY2xpZW50L2phdmFzY3JpcHQvTXlKYXZhc2NyaXB0RmlsZSc7XG4vL1xuLy9cbi8vIC8vIHZlbmRvciBtb2R1bGVzXG4vLyBpbXBvcnQgJ3NpdGUvdmVuZG9yL215dmVuZG9yL215cGFja2FnZS9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vLyAvLyB5b3VyIHRoZW1lZCBhcHAgZmlsZXNcbi8vIGltcG9ydCAnLi9qcy9wYXJ0aWFscy9Tb21lT3RoZXJKYXZhc2NyaXB0RmlsZSc7XG5pbXBvcnQgJy4vanMvY29va2llJ1xuaW1wb3J0ICcuL2pzL2JvZHktY2xhc3MnXG5pbXBvcnQgJy4vanMvdG9jJ1xuaW1wb3J0ICcuL2pzL2NvbGxhcHNpYmxlLW1lbnUnXG5pbXBvcnQgJy4vanMvc2Nyb2xsLW1hbmFnZXInXG5pbXBvcnQgJy4vanMvZm9vdGVyLWlzLXZpc2libGUnXG5pbXBvcnQgJy4vanMvZm9ybSdcbmltcG9ydCAnLi9qcy9tb3VzZS1vdmVyLWxvZ28nXG5pbXBvcnQgJy4vanMvaW1hZ2VzJ1xuaW1wb3J0ICcuL2pzL2ltYWdlLWhvdmVyJ1xuIl0sIm5hbWVzIjpbIm15Q29va2llIiwiYm9keUNsYXNzIiwiYm9keU9iamVjdCIsImluaXQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRPclRvZ2dsZUJvZHlDbGFzcyIsInJldHJpZXZlQ29va2llT3JIYXNoIiwic2Nyb2xsU3RhcnQiLCJhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycyIsImFkZEV2ZW50TGlzdGVuZXIiLCJldmVudCIsImNsYXNzTGlzdCIsImFkZCIsInJlbW92ZSIsImRvY3VtZW50RWxlbWVudCIsImFkZFJvY2tldE1vZGUiLCJ3aW5kb3ciLCJoYXNoIiwiZ2V0SGFzaEZyb21VUkwiLCJwcmVmZXJyZWRUaGVtZSIsImVyYXNlQ29va2llIiwicnVuQ2xpY2tGb3JFbGVtZW50IiwiZ2V0Q29va2llIiwic2V0QXR0cmlidXRlIiwidXNlclByZWZlcnNEYXJrVGhlbWUiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsInRyaW0iLCJsZW5ndGgiLCJvYmoiLCJnZXRFbGVtZW50QnlJZCIsImNvbnRhaW5zIiwicmVtb3ZlQm9keUNsYXNzZXNCYXNlZE9uQXR0cmlidXRlIiwib2JqU2VsZWN0b3IiLCJpc1RoZW1lIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJvbmVFYWNoT2JqZWN0IiwiYWN0aW9uQm9keUNsYXNzQ2hhbmdlIiwic2V0VGltZW91dCIsInNjcm9sbFRvIiwic2Nyb2xsWCIsInNjcm9sbFkiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNsYXNzIiwiaWQiLCJoYXNBdHRyaWJ1dGUiLCJnZXRBdHRyaWJ1dGUiLCJ0b2dnbGUiLCJzZXRDb29raWUiLCJnZXRIYXNoRnJvbVN0cmluZyIsInJlcGxhY2UiLCJsb2NhdGlvbiIsIiRvYmplY3QiLCJzdHJpbmciLCJjbGFzc2VzIiwiZ2V0Q2xhc3Nlc0Zyb21MaXN0IiwiaSIsImxlbiIsInZhbHVlIiwiYXJyYXkiLCJzcGxpdCIsIm5ld0FycmF5IiwicHVzaCIsIlN0cmluZyIsInJldHJpZXZlSGFzU2lnbkZyb21TdHJpbmciLCJkaXYiLCJjcmVhdGVFbGVtZW50Iiwic2hhZG93Iiwic2hhZG93Q29sb3VyIiwic3R5bGUiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJ0ZW1wIiwiZmlyc3RDaGlsZCIsImluc2VydEJlZm9yZSIsImlzSG9tZVBhZ2UiLCJwYXRobmFtZSIsImhhc0ZyYWdtZW50IiwiQ29sbGFwc2libGVMaXN0cyIsImFwcGx5IiwiZG9Ob3RSZWN1cnNlIiwiY2FsbCIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwibm9kZSIsImFwcGx5VG8iLCJzdWJub2RlIiwiaGFzT3BlblN1Ykxpc3QiLCJlbCIsImxpc3QiLCJjbG9zZXN0IiwibGkiLCJwYXJlbnROb2RlIiwidXNlclNlbGVjdCIsIk1velVzZXJTZWxlY3QiLCJtc1VzZXJTZWxlY3QiLCJXZWJraXRVc2VyU2VsZWN0IiwidWwiLCJzcGFuIiwiaGFuZGxlQ2xpY2siLCJiaW5kIiwiaW5uZXJIVE1MIiwiZSIsInRhcmdldCIsIm5vZGVOYW1lIiwib3BlbiIsInVscyIsImRpc3BsYXkiLCJuYW1lIiwiZGF5cyIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9VVENTdHJpbmciLCJjb29raWUiLCJuYW1lRVEiLCJjYSIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwiZm9vdGVySXNWaXNpYmxlIiwiaW50ZXJzZWN0aW9uT2JzZXJ2ZXJPcHRpb25zIiwicm9vdCIsInJvb3RNYXJnaW4iLCJ0aHJlc2hvbGQiLCJvbkludGVyc2VjdGlvbiIsImVudHJpZXMiLCJlbnRyeSIsImludGVyc2VjdGlvblJhdGlvIiwib2JzZXJ2ZXIiLCJJbnRlcnNlY3Rpb25PYnNlcnZlciIsIm9ic2VydmUiLCJmb3JtZmllbGRzIiwiSiIsImFkanVzdFN0eWxpbmciLCJldnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJ6RXZlbnQiLCJpbnBWYWwiLCJpbWFnZWhvdmVyIiwicmVzZXRUaW1lb3V0IiwiX3RoaXMiLCJpc1RvdWNoRGV2aWNlIiwiY2xlYXJUaW1lb3V0IiwiX2UkdGFyZ2V0JGdldEJvdW5kaW5nIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJsZWZ0IiwidG9wIiwieCIsInBhZ2VYIiwieSIsInBhZ2VZIiwic2V0UHJvcGVydHkiLCJyZW1vdmVQcm9wZXJ0eSIsImlzVG91Y2hEZXZpY2VWYXIiLCJuYXZpZ2F0b3IiLCJtYXhUb3VjaFBvaW50cyIsIm1zTWF4VG91Y2hQb2ludHMiLCJpbWFnZVdyYXBwZXIiLCJ3cmFwIiwid3JhcHBlciIsImFwcGVuZENoaWxkIiwiaW1hZ2VzIiwiZHYiLCJpbWciLCJzaG93Um9ja2V0TW9kZSIsInRvZ2dsZUNsYXNzT25Ib3ZlciIsInR5cGUiLCJsb2dvIiwic2Nyb2xsTWFuYWdlciIsIm1pY3JvU2Vjb25kc0JlZm9yZUp1c3RTY3JvbGxsZWRSZW1vdmVkIiwibWluU2Nyb2xsRm9yQWN0aW9uIiwibWluU2Nyb2xsRG93blRvQmVQcm9wZXJTY3JvbGwiLCJub3JtYWxUcmFuc2l0aW9uRHVyYXRpb24iLCJ0aGVtZVRyYW5zaXRpb25EdXJhdGlvbiIsIm5ld1Njcm9sbCIsIm1pbmltdW1TY3JvbGxGb3JUaGVtZVN3aXRjaCIsImxhc3RTY3JvbGwiLCJkaWRTY3JvbGwiLCJ0aW1lT3V0RngiLCJqdXN0U2Nyb2xsZWRGeCIsInNjcm9sbGVkVXBDbGFzcyIsInNjcm9sbGVkRG93bkNsYXNzIiwic2Nyb2xsTGlzdGVuZXIiLCJzY3JvbGxVcE9yRG93biIsImN1cnJlbnRTY3JvbGwiLCJmb290ZXJIZWlnaHQiLCJvZmZzZXRIZWlnaHQiLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJnZXRUaGVtZSIsInBhcnNlSW50Iiwic2Nyb2xsVG9wIiwiaXNSb2NrZXRUaGVtZSIsInRoZW1lIiwid2luZG93SGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJ0b3RhbEhlaWdodCIsInNjcm9sbEhlaWdodCIsImlubmVyV2lkdGgiLCJxdW90ZUJsb2NrIiwiYWRkaXRpb25hbE1hcmdpbiIsIk1hdGgiLCJtaW4iLCJtYXJnaW5Ub3AiLCJjb25jYXQiLCJib3R0b21UZXN0IiwidG9wVGVzdCIsInRyYW5zaXRpb25TcGVlZCIsImFicyIsImJvZHkiLCJ0b2MiLCJoZWFkaW5ncyIsImNvdW50IiwicHJldmlvdXNFbGVtIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInNwYW5FbmQiXSwic291cmNlUm9vdCI6IiJ9