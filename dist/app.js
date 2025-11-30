(self["webpackChunkpublic"] = self["webpackChunkpublic"] || []).push([["app"],{

/***/ "../sun/src/js/battery-saver.js":
/*!**************************************!*\
  !*** ../sun/src/js/battery-saver.js ***!
  \**************************************/
/***/ (function() {

var _this2 = this;
var debounce = function debounce(callback, timeout, _this) {
  var timer;
  return function (e) {
    var _that = _this2;
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () {
      callback.call(_this || _that, e);
    }, timeout);
  };
};
var userAction = debounce(function () {
  var fullScreenDiv = document.getElementById('battery-saver-div');

  // Show the div when the document is loaded
  fullScreenDiv.style.display = 'flex';

  // Add click event listener
  fullScreenDiv.addEventListener('click', function () {
    fullScreenDiv.style.display = 'none';
  });
}, 60000);
document.addEventListener('click', userAction, false);
document.addEventListener('scroll', userAction, false);
document.addEventListener('popstate', userAction, false);
userAction();

/***/ }),

/***/ "../sun/src/js/body-class.js":
/*!***********************************!*\
  !*** ../sun/src/js/body-class.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   bodyClass: function() { return /* binding */ bodyClass; }
/* harmony export */ });
/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ "../sun/src/js/cookie.js");

var bodyClass = {
  bodyObject: null,
  theme: '',
  init: function init() {
    bodyClass.bodyObject = document.querySelector('body');
    bodyClass.addOrToggleBodyClass('#menu-toggle', false);

    // if you click on theme-selector, you select the theme
    bodyClass.addOrToggleBodyClass('.theme-selector', true);
    this.theme =
    // if you click on set-them, you select the theme
    bodyClass.retrieveCookieOrHash();
    // expose scrolled behaviour
    this.scrollStart();
    this.addBasicBodyClassListeners();
  },
  getBodyObject: function getBodyObject() {
    return bodyClass.bodyObject;
  },
  getTheme: function getTheme() {
    return new String(bodyClass.bodyObject.getAttribute('data-theme'));
  },
  showMenuAsDefault: function showMenuAsDefault() {
    if (bodyClass.isHomePage() === true && bodyClass.hasFragment() === false) {
      document.querySelector('#menu-toggle').click();
    }
  },
  addBasicBodyClassListeners: function addBasicBodyClassListeners() {
    document.addEventListener('DOMContentLoaded', function (event) {
      bodyClass.bodyObject.classList.add('body-loaded');
      if ('ontouchstart' in document.documentElement) {
        bodyClass.bodyObject.classList.add('touch');
      } else {
        bodyClass.bodyObject.classList.add('no-touch');
      }
      bodyClass.addRocketModeVideoOrImage();
    });
    bodyClass.bodyObject.classList.remove('body-unloaded');
    // window.addEventListener('beforeunload', function () {
    //     bodyClass.bodyObject.classList.add('body-unloaded')
    // })
    window.addEventListener('popstate', function () {
      bodyClass.bodyObject.classList.remove('popstate');
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
        if (objSelector === '#menu-toggle') {
          // close menu when toggling
          window.setTimeout(function () {
            bodyClass.bodyObject.classList.toggle('show-logo');
          }, 300);
        }
        return false;
      });
    });
  },
  scrollStart: function scrollStart() {
    window.setTimeout(function () {
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
      bodyClass.theme = toggleClass;
    }
    if (id && scrollTo) {
      var hash = bodyClass.getHashFromString(id);
      if (hash.length) {
        hash = hash.replace('#', '');
        window.location.hash = '#' + hash;
      }
    }
  },
  removeBodyClassesBasedOnAttribute: function removeBodyClassesBasedOnAttribute(object) {
    if (object.hasAttribute('data-remove-class')) {
      var string = object.getAttribute('data-remove-class');
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
    return bodyClass.removeHashFromString(string);
  },
  removeHashFromString: function removeHashFromString(string) {
    return string.replace('#', '');
  },
  addRocketModeVideoOrImage: function addRocketModeVideoOrImage() {
    if (bodyClass.hasRocketShow() === true) {
      var _bodyClass$bodyObject, _bodyClass$bodyObject2;
      var videoId = bodyClass.bodyObject.getAttribute('data-video-id');
      var image = bodyClass.bodyObject.getAttribute('data-bg-image');
      var imageX = (_bodyClass$bodyObject = bodyClass.bodyObject.getAttribute('data-bg-image-x')) !== null && _bodyClass$bodyObject !== void 0 ? _bodyClass$bodyObject : '50%';
      var imageY = (_bodyClass$bodyObject2 = bodyClass.bodyObject.getAttribute('data-bg-image-y')) !== null && _bodyClass$bodyObject2 !== void 0 ? _bodyClass$bodyObject2 : '50%';
      // console.log(videoId)
      if (videoId || image) {
        var style = '';
        var div = document.createElement('div');
        div.id = 'BackgroundImage';
        var shadow = bodyClass.bodyObject.getAttribute('data-shadow-over-logo');
        var shadowColour = '';
        if (shadow === 'dark') {
          shadowColour = 'linear-gradient(210deg, #00000077 12%, transparent 88%)';
        } else if (shadow === 'light') {
          shadowColour = 'linear-gradient(210deg, #FFFFFF77 12%, transparent 88%)';
        }
        if (videoId) {
          if (shadowColour) {
            style = 'background: ' + shadowColour;
          }
          div.innerHTML = '<iframe src="https://player.vimeo.com/video/' + videoId + '?autoplay=1&autopause=0&muted=1&background=1" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="' + style + '"></iframe>';
          var _temp = bodyClass.bodyObject.firstChild;
          bodyClass.bodyObject.insertBefore(div, _temp);
        } else {
          style = 'url(' + image + ')';
          if (shadowColour) {
            style = shadowColour + ',' + style;
          }
          div.style.backgroundImage = style;
          div.style.backgroundPosition = imageX + ' ' + imageY;
        }
        div.classList.add('fade-on-no-rocket');
        var temp = bodyClass.bodyObject.firstChild;
        bodyClass.bodyObject.insertBefore(div, temp);
      }
    } else {
      // console.log('no rocket show')
    }
  },
  isHomePage: function isHomePage() {
    return window.location.pathname === '/';
  },
  hasFragment: function hasFragment() {
    return window.location.hash !== '';
  },
  hasRocketShow: function hasRocketShow() {
    return bodyClass.bodyObject.classList.contains('no-rocket-show') ? false : true;
  }
};
bodyClass.init();

/***/ }),

/***/ "../sun/src/js/collapsible-menu.js":
/*!*****************************************!*\
  !*** ../sun/src/js/collapsible-menu.js ***!
  \*****************************************/
/***/ (function() {

var CollapsibleLists = function () {
  function apply() {
    document.querySelectorAll('ul.collapsibleList').forEach(function (list) {
      applyTo(list);
      updateHasOpen(list);
    });
  }
  function applyTo(list) {
    list.querySelectorAll('li').forEach(function (li) {
      var childUl = li.querySelector(':scope > ul');
      if (!childUl) return;

      // ADD TOGGLE ARROW
      var span = document.createElement('span');
      span.className = 'open-close';
      span.innerHTML = '<i class="open">↘</i><i class="closed">↖</i>';
      span.addEventListener('click', function () {
        return toggle(li);
      });
      li.insertBefore(span, childUl);

      // collapsed by default
      li.classList.add('collapsibleListClosed');
      childUl.style.display = 'none';

      // open defaults
      if (li.classList.contains('current') || li.classList.contains('section')) {
        open(li);
      }
    });
  }
  function toggle(li) {
    if (li.classList.contains('collapsibleListOpen')) {
      close(li);
    } else {
      open(li);
    }
  }
  function open(li) {
    li.classList.remove('collapsibleListClosed');
    li.classList.add('collapsibleListOpen');
    var directUl = li.querySelector(':scope > ul');
    if (directUl) directUl.style.display = 'block';

    // keep deeper levels collapsed
    if (directUl) {
      directUl.querySelectorAll(':scope ul').forEach(function (nestedUl) {
        var nestedLi = nestedUl.parentElement;
        nestedLi.classList.remove('collapsibleListOpen');
        nestedLi.classList.add('collapsibleListClosed');
        nestedUl.style.display = 'none';
      });
    }

    // NEW: close siblings on the same level
    var parentList = li.parentElement;
    parentList.querySelectorAll(':scope > li.collapsibleListOpen').forEach(function (sibling) {
      if (sibling !== li) {
        close(sibling);
      }
    });
    markSiblingState(li);
    updateHasOpen(li.closest('.collapsibleList'));
  }
  function close(li) {
    li.classList.remove('collapsibleListOpen');
    li.classList.add('collapsibleListClosed');
    var childUl = li.querySelector(':scope > ul');
    if (childUl) childUl.style.display = 'none';
    markSiblingState(li);
    updateHasOpen(li.closest('.collapsibleList'));
  }
  function markSiblingState(li) {
    var parentList = li.parentElement;
    if (!parentList.classList.contains('collapsibleList')) return;
    var siblings = parentList.querySelectorAll(':scope > li');
    var isOpen = li.classList.contains('collapsibleListOpen');
    siblings.forEach(function (sib) {
      return sib.classList.remove('collapsibleListNotOpen');
    });
    if (isOpen) {
      siblings.forEach(function (sib) {
        if (sib !== li) sib.classList.add('collapsibleListNotOpen');
      });
    }
  }
  function updateHasOpen(list) {
    if (!list) return;
    var has = list.querySelector('.collapsibleListOpen');
    list.classList.toggle('collapsibleListHasOpen', !!has);
  }
  return {
    apply: apply
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

/***/ "../sun/src/js/print.js":
/*!******************************!*\
  !*** ../sun/src/js/print.js ***!
  \******************************/
/***/ (function() {

window.addEventListener('beforeprint', function (event) {
  var el = document.querySelector('#content-below-quote');
  el.scrollIntoView({
    behavior: 'smooth'
  });
});

/***/ }),

/***/ "../sun/src/js/scroll-manager.js":
/*!***************************************!*\
  !*** ../sun/src/js/scroll-manager.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _body_class__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./body-class */ "../sun/src/js/body-class.js");

var scrollManager = {
  screenHeight: window.innerHeight,
  lastScroll: 0,
  body: null,
  quote: null,
  footer: null,
  headerRange: 60,
  // in vh
  footerRange: 80,
  // in vh
  headerPct: 0,
  footerPct: 100,
  justScrolledDuration: 1200,
  // ms — change freely
  justScrolledTimer: null,
  scrollStopTimer: null,
  scrollStopDelay: 120,
  // ms after last scroll event
  init: function init() {
    var _this = this;
    this.body = _body_class__WEBPACK_IMPORTED_MODULE_0__.bodyClass.getBodyObject();
    this.quote = document.querySelector('.main-quote');
    this.footer = document.getElementById('footer');
    this.remeasure();
    this.bindScroll();
    window.addEventListener('resize', function () {
      return _this.remeasure();
    });

    // NEW: Trigger the initial scroll calculation
    requestAnimationFrame(function () {
      return _this.onScroll();
    });
  },
  remeasure: function remeasure() {
    this.screenHeight = window.innerHeight;
    this.lastScroll = this.getScroll();
  },
  getScroll: function getScroll() {
    return window.scrollY || document.documentElement.scrollTop;
  },
  bindScroll: function bindScroll() {
    var _this2 = this;
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          _this2.onScroll();
          ticking = false;
        });
        ticking = true;
      }
    });
  },
  onScroll: function onScroll() {
    var scroll = this.getScroll();
    var maxScroll = document.documentElement.scrollHeight - this.screenHeight;
    this.updateHeaderClasses(scroll);
    this.updateFooterClasses(scroll, maxScroll);
    this.updateRocketTheme();
    this.updateScrollDirection(scroll);
    this.handleJustScrolled();
    this.lastScroll = scroll;
  },
  // ---------------------------------------------------------------------
  // HEADER / FOOTER STATE (0–100)
  // ---------------------------------------------------------------------
  updateHeaderClasses: function updateHeaderClasses(currentScroll) {
    var headerPixels = this.screenHeight * (this.headerRange / 100);
    var ratio = this.clamp(currentScroll / headerPixels, 0, 1);
    var pct = Math.round(ratio * 100);
    this.headerPct = pct;
    this.replaceStepClasses('header', pct);
    if (pct >= 100) {
      this.body.classList.add('past-header');
    } else {
      this.body.classList.remove('past-header');
    }
  },
  updateFooterClasses: function updateFooterClasses(currentScroll, maxScroll) {
    var bottomDistance = maxScroll - currentScroll;
    var headerPixels = this.screenHeight * (this.headerRange / 100);

    // If we're still in the header zone, hide footer classes
    if (currentScroll < headerPixels) {
      this.footerPct = 100;
      this.removeStepClasses('footer');
      this.body.classList.remove('footer-visible');
      return;
    }
    var footerPixels = this.screenHeight * (this.footerRange / 100);
    var ratio = this.clamp(bottomDistance / footerPixels, 0, 1);
    var pct = Math.round(ratio * 100);
    this.footerPct = pct;
    this.replaceStepClasses('footer', pct);
    if (pct < 100) {
      this.body.classList.add('footer-visible');
    } else {
      this.body.classList.remove('footer-visible');
    }
  },
  replaceStepClasses: function replaceStepClasses(prefix, pct) {
    for (var i = 0; i <= 100; i += 10) {
      this.body.classList.remove("".concat(prefix, "-").concat(i));
    }
    var rounded = Math.round(pct / 10) * 10;
    this.body.classList.add("".concat(prefix, "-").concat(rounded));
  },
  removeStepClasses: function removeStepClasses(prefix) {
    for (var i = 0; i <= 100; i += 10) {
      this.body.classList.remove("".concat(prefix, "-").concat(i));
    }
  },
  // ---------------------------------------------------------------------
  // ROCKET THEME
  // ---------------------------------------------------------------------
  updateRocketTheme: function updateRocketTheme() {
    var hasRocket = !this.body.classList.contains('no-rocket-show');
    if (!hasRocket) return;
    var inHeaderZone = this.headerPct < 100;
    var inFooterZone = this.footerPct < 100;
    if (inHeaderZone || inFooterZone) {
      this.body.classList.add('theme-rocket');
      this.body.classList.remove(_body_class__WEBPACK_IMPORTED_MODULE_0__.bodyClass.getTheme());
    } else {
      this.body.classList.remove('theme-rocket');
      this.body.classList.add(_body_class__WEBPACK_IMPORTED_MODULE_0__.bodyClass.getTheme());
    }
  },
  // ---------------------------------------------------------------------
  // SCROLL DIRECTION
  // ---------------------------------------------------------------------
  updateScrollDirection: function updateScrollDirection(scroll) {
    if (scroll > this.lastScroll) {
      this.body.classList.remove('scrolled-up');
      this.body.classList.add('scrolled-down');
    } else {
      this.body.classList.add('scrolled-up');
      this.body.classList.remove('scrolled-down');
    }
  },
  // ---------------------------------------------------------------------
  // JUST SCROLLED
  // ---------------------------------------------------------------------
  handleJustScrolled: function handleJustScrolled() {
    var _this3 = this;
    // Clear previous stop detection
    if (this.scrollStopTimer) {
      clearTimeout(this.scrollStopTimer);
    }
    this.scrollStopTimer = setTimeout(function () {
      // Scroll has ended → add just-scrolled
      _this3.body.classList.add('just-scrolled');

      // Clear previous visibility timer
      if (_this3.justScrolledTimer) {
        clearTimeout(_this3.justScrolledTimer);
      }
      _this3.justScrolledTimer = setTimeout(function () {
        _this3.body.classList.remove('just-scrolled');
      }, _this3.justScrolledDuration);
    }, this.scrollStopDelay);
  },
  // ---------------------------------------------------------------------
  // UTIL
  // ---------------------------------------------------------------------
  clamp: function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
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
                block: 'start'
              });
            }, 100);
          } else {
            window.setTimeout(function () {
              document.querySelector('#toc-1').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
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
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/form */ "../sun/src/js/form.js");
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_form__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/mouse-over-logo */ "../sun/src/js/mouse-over-logo.js");
/* harmony import */ var _js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/images */ "../sun/src/js/images.js");
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_images__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _js_image_hover__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/image-hover */ "../sun/src/js/image-hover.js");
/* harmony import */ var _js_image_hover__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_image_hover__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _js_print__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/print */ "../sun/src/js/print.js");
/* harmony import */ var _js_print__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_js_print__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _js_battery_saver__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./js/battery-saver */ "../sun/src/js/battery-saver.js");
/* harmony import */ var _js_battery_saver__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_js_battery_saver__WEBPACK_IMPORTED_MODULE_10__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LENBQUNqQyxJQUFJLEtBQUssTUFBTSxJQUMvQnNKLElBQUksQ0FBQzVKLFNBQVMsQ0FBQ21CLFFBQVEsQ0FBQyxTQUFTLENBQUMsSUFDbEN5SSxJQUFJLENBQUM1SixTQUFTLENBQUNtQixRQUFRLENBQUMsU0FBUyxDQUFDLEVBQ3BDO0lBQ0V5SSxJQUFJLENBQUM1SixTQUFTLENBQUMyQixNQUFNLENBQUMsUUFBUSxDQUFDO0lBQy9CaUksSUFBSSxDQUFDNUosU0FBUyxDQUFDMkIsTUFBTSxDQUFDLFNBQVMsQ0FBQztFQUNwQztFQUNBZ0wsR0FBRyxDQUFDLENBQUM7O0VBRUw7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0FBQ0osQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsR0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29CO0FBQ0k7QUFDUDtBQUNhO0FBQ0Y7QUFDVjtBQUNXO0FBQ1Q7QUFDSztBQUNOIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvYmF0dGVyeS1zYXZlci5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9ib2R5LWNsYXNzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2NvbGxhcHNpYmxlLW1lbnUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvY29va2llLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvaW1hZ2UtaG92ZXIuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvaW1hZ2VzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL21vdXNlLW92ZXItbG9nby5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9wcmludC5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9zY3JvbGwtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy90b2MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWJvdW5jZSA9IChjYWxsYmFjaywgdGltZW91dCwgX3RoaXMpID0+IHtcbiAgICBsZXQgdGltZXJcbiAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgIGNvbnN0IF90aGF0ID0gdGhpc1xuICAgICAgICBpZiAodGltZXIpIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoX3RoaXMgfHwgX3RoYXQsIGUpXG4gICAgICAgIH0sIHRpbWVvdXQpXG4gICAgfVxufVxuXG5jb25zdCB1c2VyQWN0aW9uID0gZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGZ1bGxTY3JlZW5EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmF0dGVyeS1zYXZlci1kaXYnKVxuXG4gICAgLy8gU2hvdyB0aGUgZGl2IHdoZW4gdGhlIGRvY3VtZW50IGlzIGxvYWRlZFxuICAgIGZ1bGxTY3JlZW5EaXYuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuXG4gICAgLy8gQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyXG4gICAgZnVsbFNjcmVlbkRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVsbFNjcmVlbkRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfSlcbn0sIDYwMDAwKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVzZXJBY3Rpb24sIGZhbHNlKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXNlckFjdGlvbiwgZmFsc2UpXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHVzZXJBY3Rpb24sIGZhbHNlKVxuXG51c2VyQWN0aW9uKClcbiIsImltcG9ydCB7IG15Q29va2llIH0gZnJvbSAnLi9jb29raWUuanMnXG5cbmV4cG9ydCBjb25zdCBib2R5Q2xhc3MgPSB7XG4gICAgYm9keU9iamVjdDogbnVsbCxcblxuICAgIHRoZW1lOiAnJyxcblxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICAgICAgYm9keUNsYXNzLmFkZE9yVG9nZ2xlQm9keUNsYXNzKCcjbWVudS10b2dnbGUnLCBmYWxzZSlcblxuICAgICAgICAvLyBpZiB5b3UgY2xpY2sgb24gdGhlbWUtc2VsZWN0b3IsIHlvdSBzZWxlY3QgdGhlIHRoZW1lXG4gICAgICAgIGJvZHlDbGFzcy5hZGRPclRvZ2dsZUJvZHlDbGFzcygnLnRoZW1lLXNlbGVjdG9yJywgdHJ1ZSlcbiAgICAgICAgdGhpcy50aGVtZSA9XG4gICAgICAgICAgICAvLyBpZiB5b3UgY2xpY2sgb24gc2V0LXRoZW0sIHlvdSBzZWxlY3QgdGhlIHRoZW1lXG4gICAgICAgICAgICBib2R5Q2xhc3MucmV0cmlldmVDb29raWVPckhhc2goKVxuICAgICAgICAvLyBleHBvc2Ugc2Nyb2xsZWQgYmVoYXZpb3VyXG4gICAgICAgIHRoaXMuc2Nyb2xsU3RhcnQoKVxuICAgICAgICB0aGlzLmFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzKClcbiAgICB9LFxuXG4gICAgZ2V0Qm9keU9iamVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYm9keUNsYXNzLmJvZHlPYmplY3RcbiAgICB9LFxuXG4gICAgZ2V0VGhlbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmcoYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJykpXG4gICAgfSxcblxuICAgIHNob3dNZW51QXNEZWZhdWx0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGJvZHlDbGFzcy5pc0hvbWVQYWdlKCkgPT09IHRydWUgJiZcbiAgICAgICAgICAgIGJvZHlDbGFzcy5oYXNGcmFnbWVudCgpID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZW51LXRvZ2dsZScpLmNsaWNrKClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LWxvYWRlZCcpXG4gICAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgndG91Y2gnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCduby10b3VjaCcpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBib2R5Q2xhc3MuYWRkUm9ja2V0TW9kZVZpZGVvT3JJbWFnZSgpXG4gICAgICAgIH0pXG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnYm9keS11bmxvYWRlZCcpXG4gICAgICAgIC8vIH0pXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHN0YXRlJylcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgcmV0cmlldmVDb29raWVPckhhc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGhhc2ggPSBib2R5Q2xhc3MuZ2V0SGFzaEZyb21VUkwoKVxuICAgICAgICBsZXQgcHJlZmVycmVkVGhlbWUgPSAnJ1xuICAgICAgICBpZiAoaGFzaCA9PT0gJ3Jlc2V0Jykge1xuICAgICAgICAgICAgbXlDb29raWUuZXJhc2VDb29raWUoJ3ByZWZlcnJlZFRoZW1lJylcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChoYXNoKSB7XG4gICAgICAgICAgICB0aGlzLnJ1bkNsaWNrRm9yRWxlbWVudChoYXNoKVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNoICE9PSAndGhlbWUtbW9vbicgJiYgaGFzaCAhPT0gJ3RoZW1lLXN1bicpIHtcbiAgICAgICAgICAgIHByZWZlcnJlZFRoZW1lID0gbXlDb29raWUuZ2V0Q29va2llKCdwcmVmZXJyZWRUaGVtZScpXG4gICAgICAgICAgICBpZiAocHJlZmVycmVkVGhlbWUpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCBwcmVmZXJyZWRUaGVtZSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9keUNsYXNzLnVzZXJQcmVmZXJzRGFya1RoZW1lKCkpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAndGhlbWUtbW9vbicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXNlclByZWZlcnNEYXJrVGhlbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHdpbmRvdy5tYXRjaE1lZGlhICYmXG4gICAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXNcbiAgICAgICAgKVxuICAgIH0sXG5cbiAgICBydW5DbGlja0ZvckVsZW1lbnQ6IGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICAgIGhhc2ggPSBoYXNoLnRyaW0oKVxuICAgICAgICBpZiAoaGFzaC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpXG4gICAgICAgICAgICBpZiAob2JqICYmIG9iai5jbGFzc0xpc3QuY29udGFpbnMoJ3RoZW1lLXNlbGVjdG9yJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZShvYmopXG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZChoYXNoKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcblxuICAgIGFkZE9yVG9nZ2xlQm9keUNsYXNzOiBmdW5jdGlvbiAob2JqU2VsZWN0b3IsIGlzVGhlbWUpIHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKG9ialNlbGVjdG9yKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKG9uZUVhY2hPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBvbmVFYWNoT2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5hY3Rpb25Cb2R5Q2xhc3NDaGFuZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmVFYWNoT2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RoZW1lXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ialNlbGVjdG9yID09PSAnI21lbnUtdG9nZ2xlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgbWVudSB3aGVuIHRvZ2dsaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1sb2dvJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgc2Nyb2xsU3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVVSTCgpXG4gICAgICAgICAgICBpZiAoaGFzaCAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgaGFzaCkuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsIC8vIHNtb290aCBzY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCcgLy8gdGhlIHVwcGVyIGJvcmRlciBvZiB0aGUgZWxlbWVudCB3aWxsIGJlIGFsaWduZWQgYXQgdGhlIHRvcCBvZiB0aGUgdmlzaWJsZSBwYXJ0IG9mIHRoZSB3aW5kb3cgb2YgdGhlIHNjcm9sbGFibGUgYXJlYS5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMDApXG4gICAgfSxcblxuICAgIGFjdGlvbkJvZHlDbGFzc0NoYW5nZTogZnVuY3Rpb24gKG9uZUVhY2hPYmplY3QsIGV2ZW50LCBpc1RoZW1lLCBzY3JvbGxUbykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgYm9keUNsYXNzLnJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZShvbmVFYWNoT2JqZWN0KVxuXG4gICAgICAgIGxldCB0b2dnbGVDbGFzcyA9ICcnXG4gICAgICAgIGxldCBpZCA9ICcnXG4gICAgICAgIGlmIChvbmVFYWNoT2JqZWN0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hZGQtY2xhc3MnKSkge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MgPSBvbmVFYWNoT2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1hZGQtY2xhc3MnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MgPSBvbmVFYWNoT2JqZWN0LmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgICAgICAgaWQgPSB0b2dnbGVDbGFzc1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbmVFYWNoT2JqZWN0Lmhhc0F0dHJpYnV0ZSgnZGF0YS10b2dnbGUtcmF0aGVyLXRoYW4tYWRkJykpIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC50b2dnbGUodG9nZ2xlQ2xhc3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKHRvZ2dsZUNsYXNzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVGhlbWUpIHtcbiAgICAgICAgICAgIG15Q29va2llLnNldENvb2tpZSgncHJlZmVycmVkVGhlbWUnLCB0b2dnbGVDbGFzcywgMTQpXG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCB0b2dnbGVDbGFzcylcbiAgICAgICAgICAgIGJvZHlDbGFzcy50aGVtZSA9IHRvZ2dsZUNsYXNzXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlkICYmIHNjcm9sbFRvKSB7XG4gICAgICAgICAgICBsZXQgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVN0cmluZyhpZClcbiAgICAgICAgICAgIGlmIChoYXNoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGhhc2ggPSBoYXNoLnJlcGxhY2UoJyMnLCAnJylcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcjJyArIGhhc2hcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGU6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtcmVtb3ZlLWNsYXNzJykpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9IG9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVtb3ZlLWNsYXNzJylcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBib2R5Q2xhc3MuZ2V0Q2xhc3Nlc0Zyb21MaXN0KHN0cmluZylcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjbGFzc2VzW2ldXG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRDbGFzc2VzRnJvbUxpc3Q6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBzdHJpbmcuc3BsaXQoJywnKVxuICAgICAgICBjb25zdCBuZXdBcnJheSA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhcnJheVtpXS50cmltKClcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5ld0FycmF5LnB1c2godmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0FycmF5XG4gICAgfSxcblxuICAgIGdldEhhc2hGcm9tVVJMOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoXG4gICAgICAgIHJldHVybiBib2R5Q2xhc3MuZ2V0SGFzaEZyb21TdHJpbmcoc3RyaW5nKVxuICAgIH0sXG5cbiAgICBnZXRIYXNoRnJvbVN0cmluZzogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICBzdHJpbmcgPSBTdHJpbmcoc3RyaW5nKVxuICAgICAgICByZXR1cm4gYm9keUNsYXNzLnJlbW92ZUhhc2hGcm9tU3RyaW5nKHN0cmluZylcbiAgICB9LFxuXG4gICAgcmVtb3ZlSGFzaEZyb21TdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKCcjJywgJycpXG4gICAgfSxcblxuICAgIGFkZFJvY2tldE1vZGVWaWRlb09ySW1hZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGJvZHlDbGFzcy5oYXNSb2NrZXRTaG93KCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZGVvSWQgPSBib2R5Q2xhc3MuYm9keU9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmlkZW8taWQnKVxuICAgICAgICAgICAgY29uc3QgaW1hZ2UgPSBib2R5Q2xhc3MuYm9keU9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmctaW1hZ2UnKVxuICAgICAgICAgICAgY29uc3QgaW1hZ2VYID1cbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmctaW1hZ2UteCcpID8/ICc1MCUnXG4gICAgICAgICAgICBjb25zdCBpbWFnZVkgPVxuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1iZy1pbWFnZS15JykgPz8gJzUwJSdcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZpZGVvSWQpXG4gICAgICAgICAgICBpZiAodmlkZW9JZCB8fCBpbWFnZSkge1xuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9ICcnXG4gICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICBkaXYuaWQgPSAnQmFja2dyb3VuZEltYWdlJ1xuICAgICAgICAgICAgICAgIGNvbnN0IHNoYWRvdyA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEtc2hhZG93LW92ZXItbG9nbydcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgbGV0IHNoYWRvd0NvbG91ciA9ICcnXG4gICAgICAgICAgICAgICAgaWYgKHNoYWRvdyA9PT0gJ2RhcmsnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYWRvd0NvbG91ciA9XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGluZWFyLWdyYWRpZW50KDIxMGRlZywgIzAwMDAwMDc3IDEyJSwgdHJhbnNwYXJlbnQgODglKSdcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNoYWRvdyA9PT0gJ2xpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgICBzaGFkb3dDb2xvdXIgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmVhci1ncmFkaWVudCgyMTBkZWcsICNGRkZGRkY3NyAxMiUsIHRyYW5zcGFyZW50IDg4JSknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2aWRlb0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dDb2xvdXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gJ2JhY2tncm91bmQ6ICcgKyBzaGFkb3dDb2xvdXJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAgICAgICAgICc8aWZyYW1lIHNyYz1cImh0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSWQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJz9hdXRvcGxheT0xJmF1dG9wYXVzZT0wJm11dGVkPTEmYmFja2dyb3VuZD0xXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3c9XCJhdXRvcGxheTsgZnVsbHNjcmVlblwiIGFsbG93ZnVsbHNjcmVlbiBzdHlsZT1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPjwvaWZyYW1lPidcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmZpcnN0Q2hpbGRcbiAgICAgICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuaW5zZXJ0QmVmb3JlKGRpdiwgdGVtcClcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9ICd1cmwoJyArIGltYWdlICsgJyknXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dDb2xvdXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gc2hhZG93Q29sb3VyICsgJywnICsgc3R5bGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gc3R5bGVcbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IGltYWdlWCArICcgJyArIGltYWdlWVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnZmFkZS1vbi1uby1yb2NrZXQnKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBib2R5Q2xhc3MuYm9keU9iamVjdC5maXJzdENoaWxkXG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuaW5zZXJ0QmVmb3JlKGRpdiwgdGVtcClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdubyByb2NrZXQgc2hvdycpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNIb21lUGFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLydcbiAgICB9LFxuXG4gICAgaGFzRnJhZ21lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9PSAnJ1xuICAgIH0sXG5cbiAgICBoYXNSb2NrZXRTaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuY29udGFpbnMoJ25vLXJvY2tldC1zaG93JylcbiAgICAgICAgICAgID8gZmFsc2VcbiAgICAgICAgICAgIDogdHJ1ZVxuICAgIH1cbn1cblxuYm9keUNsYXNzLmluaXQoKVxuIiwiY29uc3QgQ29sbGFwc2libGVMaXN0cyA9ICgoKSA9PiB7XG4gICAgZnVuY3Rpb24gYXBwbHkgKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd1bC5jb2xsYXBzaWJsZUxpc3QnKS5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgICAgYXBwbHlUbyhsaXN0KVxuICAgICAgICAgICAgdXBkYXRlSGFzT3BlbihsaXN0KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5VG8gKGxpc3QpIHtcbiAgICAgICAgbGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmZvckVhY2gobGkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRVbCA9IGxpLnF1ZXJ5U2VsZWN0b3IoJzpzY29wZSA+IHVsJylcbiAgICAgICAgICAgIGlmICghY2hpbGRVbCkgcmV0dXJuXG5cbiAgICAgICAgICAgIC8vIEFERCBUT0dHTEUgQVJST1dcbiAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICAgIHNwYW4uY2xhc3NOYW1lID0gJ29wZW4tY2xvc2UnXG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm9wZW5cIj7ihpg8L2k+PGkgY2xhc3M9XCJjbG9zZWRcIj7ihpY8L2k+J1xuICAgICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZShsaSkpXG5cbiAgICAgICAgICAgIGxpLmluc2VydEJlZm9yZShzcGFuLCBjaGlsZFVsKVxuXG4gICAgICAgICAgICAvLyBjb2xsYXBzZWQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICAgICAgICAgIGNoaWxkVWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXG4gICAgICAgICAgICAvLyBvcGVuIGRlZmF1bHRzXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JykgfHxcbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlY3Rpb24nKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgb3BlbihsaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGUgKGxpKSB7XG4gICAgICAgIGlmIChsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKSkge1xuICAgICAgICAgICAgY2xvc2UobGkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcGVuKGxpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3BlbiAobGkpIHtcbiAgICAgICAgbGkuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0T3BlbicpXG5cbiAgICAgICAgY29uc3QgZGlyZWN0VWwgPSBsaS5xdWVyeVNlbGVjdG9yKCc6c2NvcGUgPiB1bCcpXG4gICAgICAgIGlmIChkaXJlY3RVbCkgZGlyZWN0VWwuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcblxuICAgICAgICAvLyBrZWVwIGRlZXBlciBsZXZlbHMgY29sbGFwc2VkXG4gICAgICAgIGlmIChkaXJlY3RVbCkge1xuICAgICAgICAgICAgZGlyZWN0VWwucXVlcnlTZWxlY3RvckFsbCgnOnNjb3BlIHVsJykuZm9yRWFjaChuZXN0ZWRVbCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmVzdGVkTGkgPSBuZXN0ZWRVbC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgbmVzdGVkTGkuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgICAgICAgICAgICAgbmVzdGVkTGkuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICAgICAgICAgICAgICBuZXN0ZWRVbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTkVXOiBjbG9zZSBzaWJsaW5ncyBvbiB0aGUgc2FtZSBsZXZlbFxuICAgICAgICBjb25zdCBwYXJlbnRMaXN0ID0gbGkucGFyZW50RWxlbWVudFxuICAgICAgICBwYXJlbnRMaXN0XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnOnNjb3BlID4gbGkuY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgICAgICAgICAuZm9yRWFjaChzaWJsaW5nID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2libGluZyAhPT0gbGkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2Uoc2libGluZylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIG1hcmtTaWJsaW5nU3RhdGUobGkpXG4gICAgICAgIHVwZGF0ZUhhc09wZW4obGkuY2xvc2VzdCgnLmNvbGxhcHNpYmxlTGlzdCcpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlIChsaSkge1xuICAgICAgICBsaS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcblxuICAgICAgICBjb25zdCBjaGlsZFVsID0gbGkucXVlcnlTZWxlY3RvcignOnNjb3BlID4gdWwnKVxuICAgICAgICBpZiAoY2hpbGRVbCkgY2hpbGRVbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICAgICAgbWFya1NpYmxpbmdTdGF0ZShsaSlcbiAgICAgICAgdXBkYXRlSGFzT3BlbihsaS5jbG9zZXN0KCcuY29sbGFwc2libGVMaXN0JykpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFya1NpYmxpbmdTdGF0ZSAobGkpIHtcbiAgICAgICAgY29uc3QgcGFyZW50TGlzdCA9IGxpLnBhcmVudEVsZW1lbnRcbiAgICAgICAgaWYgKCFwYXJlbnRMaXN0LmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0JykpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHNpYmxpbmdzID0gcGFyZW50TGlzdC5xdWVyeVNlbGVjdG9yQWxsKCc6c2NvcGUgPiBsaScpXG4gICAgICAgIGNvbnN0IGlzT3BlbiA9IGxpLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0T3BlbicpXG5cbiAgICAgICAgc2libGluZ3MuZm9yRWFjaChzaWIgPT4gc2liLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdE5vdE9wZW4nKSlcblxuICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgICBzaWJsaW5ncy5mb3JFYWNoKHNpYiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNpYiAhPT0gbGkpIHNpYi5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3ROb3RPcGVuJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVIYXNPcGVuIChsaXN0KSB7XG4gICAgICAgIGlmICghbGlzdCkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGhhcyA9IGxpc3QucXVlcnlTZWxlY3RvcignLmNvbGxhcHNpYmxlTGlzdE9wZW4nKVxuICAgICAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoJ2NvbGxhcHNpYmxlTGlzdEhhc09wZW4nLCAhIWhhcylcbiAgICB9XG5cbiAgICByZXR1cm4geyBhcHBseSB9XG59KSgpXG5cbkNvbGxhcHNpYmxlTGlzdHMuYXBwbHkoKVxuIiwiY29uc3QgbXlDb29raWUgPSB7XG5cbiAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGRheXMpIHtcbiAgICB2YXIgZXhwaXJlcyA9ICcnXG4gICAgaWYgKHR5cGVvZiBkYXlzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGF5cyA9IDE0XG4gICAgfVxuICAgIGlmIChkYXlzKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpXG4gICAgICBleHBpcmVzID0gJzsgZXhwaXJlcz0nICsgZGF0ZS50b1VUQ1N0cmluZygpXG4gICAgfVxuICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPScgKyAodmFsdWUgfHwgJycpICsgZXhwaXJlcyArICc7IHBhdGg9LydcbiAgfSxcblxuICBnZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIG5hbWVFUSA9IG5hbWUgKyAnPSdcbiAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjID0gY2FbaV1cbiAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKSB7XG4gICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgZXJhc2VDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgbXlDb29raWUuc2V0Q29va2llKG5hbWUsIG51bGwsIDApXG4gIH1cbn1cblxuZXhwb3J0IHsgbXlDb29raWUgfVxuIiwidmFyIGZvcm1maWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnXG4pXG5mb3IgKHZhciBKID0gZm9ybWZpZWxkcy5sZW5ndGggLSAxOyBKID49IDA7IC0tSikge1xuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG5cbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJylcbiAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgZmFsc2UsIHRydWUpXG4gIGZvcm1maWVsZHNbSl0uZGlzcGF0Y2hFdmVudChldnQpXG59XG5cbmZ1bmN0aW9uIGFkanVzdFN0eWxpbmcgKHpFdmVudCkge1xuICB2YXIgaW5wVmFsID0gekV2ZW50LnRhcmdldC52YWx1ZVxuICBpZiAoaW5wVmFsICYmIGlucFZhbC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykpIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXZhbHVlJylcbiAgfSBlbHNlIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ25vLXZhbHVlJylcbiAgfVxufVxuIiwiY29uc3QgaW1hZ2Vob3ZlciA9IHtcbiAgICByZXNldFRpbWVvdXQ6IG51bGwsXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5pbWFnZS1jb250YWluZXInKS5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVG91Y2hEZXZpY2UoKSkge1xuICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNldFRpbWVvdXQpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBsZWZ0LCB0b3AgfSA9XG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgY29uc3QgeCA9IGUucGFnZVggLSBsZWZ0IC0gd2luZG93LnNjcm9sbFhcbiAgICAgICAgICAgICAgICBjb25zdCB5ID0gZS5wYWdlWSAtIHRvcCAtIHdpbmRvdy5zY3JvbGxZXG5cbiAgICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5zZXRQcm9wZXJ0eSgnLS1tb3VzZS14JywgKHggLyB3aWR0aCkgKiA1MCAtIDI1KVxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLnNldFByb3BlcnR5KCctLW1vdXNlLXknLCAyNSAtICh5IC8gaGVpZ2h0KSAqIDUwKVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb3VjaERldmljZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnLS1tb3VzZS14JylcbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCctLW1vdXNlLXknKVxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBpc1RvdWNoRGV2aWNlVmFyOiBudWxsLFxuXG4gICAgaXNUb3VjaERldmljZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1RvdWNoRGV2aWNlVmFyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlzVG91Y2hEZXZpY2VWYXIgPVxuICAgICAgICAgICAgICAgICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fFxuICAgICAgICAgICAgICAgICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fFxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDAgfHxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyA+IDBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pc1RvdWNoRGV2aWNlVmFyXG4gICAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgIGltYWdlaG92ZXIuaW5pdCgpXG59KVxuIiwiXG5jb25zdCBpbWFnZVdyYXBwZXIgPSAoKSA9PiB7XG4gIGZ1bmN0aW9uIHdyYXAgKGVsLCB3cmFwcGVyKSB7XG4gICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod3JhcHBlciwgZWwpXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChlbClcbiAgfVxuICAvLyBjcmVhdGUgdGhlIGNvbnRhaW5lciBkaXZcblxuICAvLyBnZXQgYWxsIGRpdnNcbiAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cG9ncmFwaHkgaW1nJylcbiAgLy8gZ2V0IHRoZSBib2R5IGVsZW1lbnRcbiAgLy8gYXBwbHkgY2xhc3MgdG8gY29udGFpbmVyIGRpdlxuXG4gIC8vIGZpbmQgb3V0IGFsbCB0aG9zZSBkaXZzIGhhdmluZyBjbGFzcyBDXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZHYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGR2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaW1hZ2UtY29udGFpbmVyJylcbiAgICBjb25zdCBpbWcgPSBpbWFnZXNbaV1cbiAgICB3cmFwKGltZywgZHYpXG4gIH1cbn1cblxuaW1hZ2VXcmFwcGVyKClcbiIsImNvbnN0IHNob3dSb2NrZXRNb2RlID0ge1xuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdG9nZ2xlQ2xhc3NPbkhvdmVyID0gKGUpID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuICAgICAgICAuY2xhc3NMaXN0XG4gICAgICAgIC50b2dnbGUoJ21vdXNlLW92ZXItbG9nbycsIGUudHlwZSA9PT0gJ21vdXNlZW50ZXInKVxuICAgIH1cbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ28nKVxuICAgIGxvZ28uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRvZ2dsZUNsYXNzT25Ib3ZlcilcbiAgICBsb2dvLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0b2dnbGVDbGFzc09uSG92ZXIpXG4gIH1cbn1cblxuc2hvd1JvY2tldE1vZGUuaW5pdCgpXG4iLCJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JlcHJpbnQnLCBldmVudCA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudC1iZWxvdy1xdW90ZScpXG4gICAgZWwuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSlcbn0pXG4iLCJpbXBvcnQgeyBib2R5Q2xhc3MgfSBmcm9tICcuL2JvZHktY2xhc3MnXG5cbmNvbnN0IHNjcm9sbE1hbmFnZXIgPSB7XG4gICAgc2NyZWVuSGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbGFzdFNjcm9sbDogMCxcbiAgICBib2R5OiBudWxsLFxuICAgIHF1b3RlOiBudWxsLFxuICAgIGZvb3RlcjogbnVsbCxcbiAgICBoZWFkZXJSYW5nZTogNjAsIC8vIGluIHZoXG4gICAgZm9vdGVyUmFuZ2U6IDgwLCAvLyBpbiB2aFxuICAgIGhlYWRlclBjdDogMCxcbiAgICBmb290ZXJQY3Q6IDEwMCxcbiAgICBqdXN0U2Nyb2xsZWREdXJhdGlvbjogMTIwMCwgLy8gbXMg4oCUIGNoYW5nZSBmcmVlbHlcbiAgICBqdXN0U2Nyb2xsZWRUaW1lcjogbnVsbCxcbiAgICBzY3JvbGxTdG9wVGltZXI6IG51bGwsXG4gICAgc2Nyb2xsU3RvcERlbGF5OiAxMjAsIC8vIG1zIGFmdGVyIGxhc3Qgc2Nyb2xsIGV2ZW50XG5cbiAgICBpbml0ICgpIHtcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keUNsYXNzLmdldEJvZHlPYmplY3QoKVxuICAgICAgICB0aGlzLnF1b3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tcXVvdGUnKVxuICAgICAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKVxuXG4gICAgICAgIHRoaXMucmVtZWFzdXJlKClcbiAgICAgICAgdGhpcy5iaW5kU2Nyb2xsKClcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gdGhpcy5yZW1lYXN1cmUoKSlcblxuICAgICAgICAvLyBORVc6IFRyaWdnZXIgdGhlIGluaXRpYWwgc2Nyb2xsIGNhbGN1bGF0aW9uXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLm9uU2Nyb2xsKCkpXG4gICAgfSxcblxuICAgIHJlbWVhc3VyZSAoKSB7XG4gICAgICAgIHRoaXMuc2NyZWVuSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIHRoaXMubGFzdFNjcm9sbCA9IHRoaXMuZ2V0U2Nyb2xsKClcbiAgICB9LFxuXG4gICAgZ2V0U2Nyb2xsICgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcbiAgICB9LFxuXG4gICAgYmluZFNjcm9sbCAoKSB7XG4gICAgICAgIGxldCB0aWNraW5nID0gZmFsc2VcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TY3JvbGwoKVxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIG9uU2Nyb2xsICgpIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsID0gdGhpcy5nZXRTY3JvbGwoKVxuICAgICAgICBjb25zdCBtYXhTY3JvbGwgPVxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCAtIHRoaXMuc2NyZWVuSGVpZ2h0XG5cbiAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJDbGFzc2VzKHNjcm9sbClcbiAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDbGFzc2VzKHNjcm9sbCwgbWF4U2Nyb2xsKVxuICAgICAgICB0aGlzLnVwZGF0ZVJvY2tldFRoZW1lKClcbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxEaXJlY3Rpb24oc2Nyb2xsKVxuICAgICAgICB0aGlzLmhhbmRsZUp1c3RTY3JvbGxlZCgpXG5cbiAgICAgICAgdGhpcy5sYXN0U2Nyb2xsID0gc2Nyb2xsXG4gICAgfSxcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEhFQURFUiAvIEZPT1RFUiBTVEFURSAoMOKAkzEwMClcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB1cGRhdGVIZWFkZXJDbGFzc2VzIChjdXJyZW50U2Nyb2xsKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlclBpeGVscyA9IHRoaXMuc2NyZWVuSGVpZ2h0ICogKHRoaXMuaGVhZGVyUmFuZ2UgLyAxMDApXG4gICAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5jbGFtcChjdXJyZW50U2Nyb2xsIC8gaGVhZGVyUGl4ZWxzLCAwLCAxKVxuICAgICAgICBjb25zdCBwY3QgPSBNYXRoLnJvdW5kKHJhdGlvICogMTAwKVxuXG4gICAgICAgIHRoaXMuaGVhZGVyUGN0ID0gcGN0XG4gICAgICAgIHRoaXMucmVwbGFjZVN0ZXBDbGFzc2VzKCdoZWFkZXInLCBwY3QpXG5cbiAgICAgICAgaWYgKHBjdCA+PSAxMDApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdwYXN0LWhlYWRlcicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGFzdC1oZWFkZXInKVxuICAgICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGVGb290ZXJDbGFzc2VzIChjdXJyZW50U2Nyb2xsLCBtYXhTY3JvbGwpIHtcbiAgICAgICAgY29uc3QgYm90dG9tRGlzdGFuY2UgPSBtYXhTY3JvbGwgLSBjdXJyZW50U2Nyb2xsXG5cbiAgICAgICAgY29uc3QgaGVhZGVyUGl4ZWxzID0gdGhpcy5zY3JlZW5IZWlnaHQgKiAodGhpcy5oZWFkZXJSYW5nZSAvIDEwMClcblxuICAgICAgICAvLyBJZiB3ZSdyZSBzdGlsbCBpbiB0aGUgaGVhZGVyIHpvbmUsIGhpZGUgZm9vdGVyIGNsYXNzZXNcbiAgICAgICAgaWYgKGN1cnJlbnRTY3JvbGwgPCBoZWFkZXJQaXhlbHMpIHtcbiAgICAgICAgICAgIHRoaXMuZm9vdGVyUGN0ID0gMTAwXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN0ZXBDbGFzc2VzKCdmb290ZXInKVxuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Zvb3Rlci12aXNpYmxlJylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZm9vdGVyUGl4ZWxzID0gdGhpcy5zY3JlZW5IZWlnaHQgKiAodGhpcy5mb290ZXJSYW5nZSAvIDEwMClcbiAgICAgICAgY29uc3QgcmF0aW8gPSB0aGlzLmNsYW1wKGJvdHRvbURpc3RhbmNlIC8gZm9vdGVyUGl4ZWxzLCAwLCAxKVxuICAgICAgICBjb25zdCBwY3QgPSBNYXRoLnJvdW5kKHJhdGlvICogMTAwKVxuXG4gICAgICAgIHRoaXMuZm9vdGVyUGN0ID0gcGN0XG4gICAgICAgIHRoaXMucmVwbGFjZVN0ZXBDbGFzc2VzKCdmb290ZXInLCBwY3QpXG5cbiAgICAgICAgaWYgKHBjdCA8IDEwMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ2Zvb3Rlci12aXNpYmxlJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdmb290ZXItdmlzaWJsZScpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVwbGFjZVN0ZXBDbGFzc2VzIChwcmVmaXgsIHBjdCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxMDA7IGkgKz0gMTApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH0tJHtpfWApXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm91bmRlZCA9IE1hdGgucm91bmQocGN0IC8gMTApICogMTBcbiAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fS0ke3JvdW5kZWR9YClcbiAgICB9LFxuICAgIHJlbW92ZVN0ZXBDbGFzc2VzIChwcmVmaXgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTAwOyBpICs9IDEwKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9LSR7aX1gKVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBST0NLRVQgVEhFTUVcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB1cGRhdGVSb2NrZXRUaGVtZSAoKSB7XG4gICAgICAgIGNvbnN0IGhhc1JvY2tldCA9ICF0aGlzLmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCduby1yb2NrZXQtc2hvdycpXG4gICAgICAgIGlmICghaGFzUm9ja2V0KSByZXR1cm5cblxuICAgICAgICBjb25zdCBpbkhlYWRlclpvbmUgPSB0aGlzLmhlYWRlclBjdCA8IDEwMFxuICAgICAgICBjb25zdCBpbkZvb3RlclpvbmUgPSB0aGlzLmZvb3RlclBjdCA8IDEwMFxuXG4gICAgICAgIGlmIChpbkhlYWRlclpvbmUgfHwgaW5Gb290ZXJab25lKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgndGhlbWUtcm9ja2V0JylcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGJvZHlDbGFzcy5nZXRUaGVtZSgpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3RoZW1lLXJvY2tldCcpXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZChib2R5Q2xhc3MuZ2V0VGhlbWUoKSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBTQ1JPTEwgRElSRUNUSU9OXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdXBkYXRlU2Nyb2xsRGlyZWN0aW9uIChzY3JvbGwpIHtcbiAgICAgICAgaWYgKHNjcm9sbCA+IHRoaXMubGFzdFNjcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbGVkLXVwJylcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZC1kb3duJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZC11cCcpXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsZWQtZG93bicpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSlVTVCBTQ1JPTExFRFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGhhbmRsZUp1c3RTY3JvbGxlZCAoKSB7XG4gICAgICAgIC8vIENsZWFyIHByZXZpb3VzIHN0b3AgZGV0ZWN0aW9uXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbFN0b3BUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsU3RvcFRpbWVyKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxTdG9wVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIFNjcm9sbCBoYXMgZW5kZWQg4oaSIGFkZCBqdXN0LXNjcm9sbGVkXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnanVzdC1zY3JvbGxlZCcpXG5cbiAgICAgICAgICAgIC8vIENsZWFyIHByZXZpb3VzIHZpc2liaWxpdHkgdGltZXJcbiAgICAgICAgICAgIGlmICh0aGlzLmp1c3RTY3JvbGxlZFRpbWVyKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuanVzdFNjcm9sbGVkVGltZXIpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuanVzdFNjcm9sbGVkVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnanVzdC1zY3JvbGxlZCcpXG4gICAgICAgICAgICB9LCB0aGlzLmp1c3RTY3JvbGxlZER1cmF0aW9uKVxuICAgICAgICB9LCB0aGlzLnNjcm9sbFN0b3BEZWxheSlcbiAgICB9LFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFVUSUxcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBjbGFtcCAodiwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCB2KSlcbiAgICB9XG59XG5cbnNjcm9sbE1hbmFnZXIuaW5pdCgpXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcblxuICAgIGNvbnN0IHRvYyA9ICgpID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBjb250YWluZXIgZGl2XG4gICAgICAgIC8vIGdldCBhbGwgZGl2c1xuICAgICAgICBjb25zdCBoZWFkaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAnI2NvbnRlbnQtYmVsb3ctcXVvdGUgaDEsICNjb250ZW50LWJlbG93LXF1b3RlIGgyJ1xuICAgICAgICApXG4gICAgICAgIC8vIGdldCB0aGUgYm9keSBlbGVtZW50XG4gICAgICAgIC8vIGFwcGx5IGNsYXNzIHRvIGNvbnRhaW5lciBkaXZcbiAgICAgICAgaWYgKGhlYWRpbmdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnaGFzLXRvYycpXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3RvYy1vZmYnKVxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvdW50ID0gaSArIDFcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IGhlYWRpbmdzW2ldXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZWwpXG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzRWxlbSA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNFbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IHN0eWxlcyBvciBjbGFzc2VzIHRvIHByZXZpb3VzRWxlbVxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0VsZW0uY2xhc3NMaXN0LmFkZCgnYm90dG9tLXNwYWNlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWwuaWQgPSAndG9jLScgKyBjb3VudFxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2NvdW50YWJsZS1pY29ucycpXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaWNvbi0nICsgY291bnQpXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnb3Blbi1jbG9zZScpXG4gICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdpY29uJylcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuRW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICAgICAgc3BhbkVuZC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtaG9sZGVyJylcbiAgICAgICAgICAgICAgICAvLyBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2suYmluZChudWxsLCBlbCkpXG4gICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJvcGVuXCI+KzwvaT48aSBjbGFzcz1cImNsb3NlZFwiPuKAkzwvaT4nXG4gICAgICAgICAgICAgICAgc3BhbkVuZC5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJhY3RpdmVcIj7iloI8L2k+J1xuICAgICAgICAgICAgICAgIGVsLmluc2VydEJlZm9yZShzcGFuLCBlbC5maXJzdENoaWxkKVxuICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKHNwYW5FbmQpXG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb2ZmJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNjb250ZW50LWJlbG93LXF1b3RlIC50b2MtYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gaGVhZGluZ3NbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd0b2MtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2Mtb24nKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignIycgKyBoYXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI3RvYy0xJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tdG9jJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICcjdG9jJyAmJlxuICAgICAgICBib2R5LmNsYXNzTGlzdC5jb250YWlucygndG9jLW9mZicpICYmXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYXMtdG9jJylcbiAgICApIHtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb24nKVxuICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1vZmYnKVxuICAgIH1cbiAgICB0b2MoKVxuXG4gICAgLy8gY29uc3QgY2xpY2tlZEVsZW1lbnQgPSBldmVudC50YXJnZXRcbiAgICAvLyBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY291bnRhYmxlLWljb25zJykpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnQUEnKVxuICAgIC8vICAgICBldmVudC50YXJnZXQuY2xpY2soKVxuICAgIC8vIH1cbn0pXG4iLCIvLyAvLyBub24tdGhlbWVkIGFwcFxuLy8gaW1wb3J0ICdzaXRlL2FwcC9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vL1xuLy8gLy8gdmVuZG9yIG1vZHVsZXNcbi8vIGltcG9ydCAnc2l0ZS92ZW5kb3IvbXl2ZW5kb3IvbXlwYWNrYWdlL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vIC8vIHlvdXIgdGhlbWVkIGFwcCBmaWxlc1xuLy8gaW1wb3J0ICcuL2pzL3BhcnRpYWxzL1NvbWVPdGhlckphdmFzY3JpcHRGaWxlJztcbmltcG9ydCAnLi9qcy9jb29raWUnXG5pbXBvcnQgJy4vanMvYm9keS1jbGFzcydcbmltcG9ydCAnLi9qcy90b2MnXG5pbXBvcnQgJy4vanMvY29sbGFwc2libGUtbWVudSdcbmltcG9ydCAnLi9qcy9zY3JvbGwtbWFuYWdlcidcbmltcG9ydCAnLi9qcy9mb3JtJ1xuaW1wb3J0ICcuL2pzL21vdXNlLW92ZXItbG9nbydcbmltcG9ydCAnLi9qcy9pbWFnZXMnXG5pbXBvcnQgJy4vanMvaW1hZ2UtaG92ZXInXG5pbXBvcnQgJy4vanMvcHJpbnQnXG5pbXBvcnQgJy4vanMvYmF0dGVyeS1zYXZlcidcbiJdLCJuYW1lcyI6WyJkZWJvdW5jZSIsImNhbGxiYWNrIiwidGltZW91dCIsIl90aGlzIiwidGltZXIiLCJlIiwiX3RoYXQiLCJfdGhpczIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2FsbCIsInVzZXJBY3Rpb24iLCJmdWxsU2NyZWVuRGl2IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsImFkZEV2ZW50TGlzdGVuZXIiLCJteUNvb2tpZSIsImJvZHlDbGFzcyIsImJvZHlPYmplY3QiLCJ0aGVtZSIsImluaXQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkT3JUb2dnbGVCb2R5Q2xhc3MiLCJyZXRyaWV2ZUNvb2tpZU9ySGFzaCIsInNjcm9sbFN0YXJ0IiwiYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnMiLCJnZXRCb2R5T2JqZWN0IiwiZ2V0VGhlbWUiLCJTdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJzaG93TWVudUFzRGVmYXVsdCIsImlzSG9tZVBhZ2UiLCJoYXNGcmFnbWVudCIsImNsaWNrIiwiZXZlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkb2N1bWVudEVsZW1lbnQiLCJhZGRSb2NrZXRNb2RlVmlkZW9PckltYWdlIiwicmVtb3ZlIiwid2luZG93IiwiaGFzaCIsImdldEhhc2hGcm9tVVJMIiwicHJlZmVycmVkVGhlbWUiLCJlcmFzZUNvb2tpZSIsInJ1bkNsaWNrRm9yRWxlbWVudCIsImdldENvb2tpZSIsInNldEF0dHJpYnV0ZSIsInVzZXJQcmVmZXJzRGFya1RoZW1lIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJ0cmltIiwibGVuZ3RoIiwib2JqIiwiY29udGFpbnMiLCJyZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGUiLCJvYmpTZWxlY3RvciIsImlzVGhlbWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIm9uZUVhY2hPYmplY3QiLCJhY3Rpb25Cb2R5Q2xhc3NDaGFuZ2UiLCJ0b2dnbGUiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJzY3JvbGxUbyIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlQ2xhc3MiLCJpZCIsImhhc0F0dHJpYnV0ZSIsInNldENvb2tpZSIsImdldEhhc2hGcm9tU3RyaW5nIiwicmVwbGFjZSIsImxvY2F0aW9uIiwib2JqZWN0Iiwic3RyaW5nIiwiY2xhc3NlcyIsImdldENsYXNzZXNGcm9tTGlzdCIsImkiLCJsZW4iLCJ2YWx1ZSIsImFycmF5Iiwic3BsaXQiLCJuZXdBcnJheSIsInB1c2giLCJyZW1vdmVIYXNoRnJvbVN0cmluZyIsImhhc1JvY2tldFNob3ciLCJfYm9keUNsYXNzJGJvZHlPYmplY3QiLCJfYm9keUNsYXNzJGJvZHlPYmplY3QyIiwidmlkZW9JZCIsImltYWdlIiwiaW1hZ2VYIiwiaW1hZ2VZIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsInNoYWRvdyIsInNoYWRvd0NvbG91ciIsImlubmVySFRNTCIsInRlbXAiLCJmaXJzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFBvc2l0aW9uIiwicGF0aG5hbWUiLCJDb2xsYXBzaWJsZUxpc3RzIiwiYXBwbHkiLCJsaXN0IiwiYXBwbHlUbyIsInVwZGF0ZUhhc09wZW4iLCJsaSIsImNoaWxkVWwiLCJzcGFuIiwiY2xhc3NOYW1lIiwib3BlbiIsImNsb3NlIiwiZGlyZWN0VWwiLCJuZXN0ZWRVbCIsIm5lc3RlZExpIiwicGFyZW50RWxlbWVudCIsInBhcmVudExpc3QiLCJzaWJsaW5nIiwibWFya1NpYmxpbmdTdGF0ZSIsImNsb3Nlc3QiLCJzaWJsaW5ncyIsImlzT3BlbiIsInNpYiIsImhhcyIsIm5hbWUiLCJkYXlzIiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsIm5hbWVFUSIsImNhIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJmb3JtZmllbGRzIiwiSiIsImFkanVzdFN0eWxpbmciLCJldnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJ6RXZlbnQiLCJpbnBWYWwiLCJ0YXJnZXQiLCJpbWFnZWhvdmVyIiwicmVzZXRUaW1lb3V0IiwiZWwiLCJpc1RvdWNoRGV2aWNlIiwiX2UkdGFyZ2V0JGdldEJvdW5kaW5nIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJsZWZ0IiwidG9wIiwieCIsInBhZ2VYIiwic2Nyb2xsWCIsInkiLCJwYWdlWSIsInNjcm9sbFkiLCJzZXRQcm9wZXJ0eSIsInJlbW92ZVByb3BlcnR5IiwiaXNUb3VjaERldmljZVZhciIsIm5hdmlnYXRvciIsIm1heFRvdWNoUG9pbnRzIiwibXNNYXhUb3VjaFBvaW50cyIsImltYWdlV3JhcHBlciIsIndyYXAiLCJ3cmFwcGVyIiwicGFyZW50Tm9kZSIsImFwcGVuZENoaWxkIiwiaW1hZ2VzIiwiZHYiLCJpbWciLCJzaG93Um9ja2V0TW9kZSIsInRvZ2dsZUNsYXNzT25Ib3ZlciIsInR5cGUiLCJsb2dvIiwic2Nyb2xsTWFuYWdlciIsInNjcmVlbkhlaWdodCIsImlubmVySGVpZ2h0IiwibGFzdFNjcm9sbCIsImJvZHkiLCJxdW90ZSIsImZvb3RlciIsImhlYWRlclJhbmdlIiwiZm9vdGVyUmFuZ2UiLCJoZWFkZXJQY3QiLCJmb290ZXJQY3QiLCJqdXN0U2Nyb2xsZWREdXJhdGlvbiIsImp1c3RTY3JvbGxlZFRpbWVyIiwic2Nyb2xsU3RvcFRpbWVyIiwic2Nyb2xsU3RvcERlbGF5IiwicmVtZWFzdXJlIiwiYmluZFNjcm9sbCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm9uU2Nyb2xsIiwiZ2V0U2Nyb2xsIiwic2Nyb2xsVG9wIiwidGlja2luZyIsInNjcm9sbCIsIm1heFNjcm9sbCIsInNjcm9sbEhlaWdodCIsInVwZGF0ZUhlYWRlckNsYXNzZXMiLCJ1cGRhdGVGb290ZXJDbGFzc2VzIiwidXBkYXRlUm9ja2V0VGhlbWUiLCJ1cGRhdGVTY3JvbGxEaXJlY3Rpb24iLCJoYW5kbGVKdXN0U2Nyb2xsZWQiLCJjdXJyZW50U2Nyb2xsIiwiaGVhZGVyUGl4ZWxzIiwicmF0aW8iLCJjbGFtcCIsInBjdCIsIk1hdGgiLCJyb3VuZCIsInJlcGxhY2VTdGVwQ2xhc3NlcyIsImJvdHRvbURpc3RhbmNlIiwicmVtb3ZlU3RlcENsYXNzZXMiLCJmb290ZXJQaXhlbHMiLCJwcmVmaXgiLCJjb25jYXQiLCJyb3VuZGVkIiwiaGFzUm9ja2V0IiwiaW5IZWFkZXJab25lIiwiaW5Gb290ZXJab25lIiwiX3RoaXMzIiwidiIsIm1pbiIsIm1heCIsInRvYyIsImhlYWRpbmdzIiwiY291bnQiLCJwcmV2aW91c0VsZW0iLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwic3BhbkVuZCJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9