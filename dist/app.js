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
    bodyClass.addRocketModeVideoOrImage();
    document.addEventListener('DOMContentLoaded', function (event) {
      bodyClass.bodyObject.classList.add('body-loaded');
      if ('ontouchstart' in document.documentElement) {
        bodyClass.bodyObject.classList.add('touch');
      } else {
        bodyClass.bodyObject.classList.add('no-touch');
      }
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
      var imageURL = bodyClass.bodyObject.getAttribute('data-bg-image');
      var imageX = (_bodyClass$bodyObject = bodyClass.bodyObject.getAttribute('data-bg-image-x')) !== null && _bodyClass$bodyObject !== void 0 ? _bodyClass$bodyObject : '50%';
      var imageY = (_bodyClass$bodyObject2 = bodyClass.bodyObject.getAttribute('data-bg-image-y')) !== null && _bodyClass$bodyObject2 !== void 0 ? _bodyClass$bodyObject2 : '50%';
      // console.log(videoId)
      if (videoId || imageURL) {
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
          var videoUrl = 'https://player.vimeo.com/video/' + videoId + '?autoplay=1&autopause=0&muted=1&background=1';
          if (shadowColour) {
            style = 'background: ' + shadowColour;
          }
          div.innerHTML = '<iframe src="' + videoUrl + '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="' + style + '"></iframe>';
          var _temp = bodyClass.bodyObject.firstChild;
          bodyClass.bodyObject.insertBefore(div, _temp);
          var video = document.createElement('video');
          document.body.classList.add('has-bg-image-loaded');
        } else {
          style = 'url(' + imageURL + ')';
          if (shadowColour) {
            style = shadowColour + ',' + style;
          }
          div.style.backgroundImage = style;
          div.style.backgroundPosition = imageX + ' ' + imageY;
          var img = new Image();
          img.onload = function () {
            document.body.classList.add('has-bg-image-loaded');
          };
          img.onerror = function () {
            document.body.classList.add('has-bg-image-loaded'); // fail open
          };
          img.src = imageURL;
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
  headerRange: 70,
  // in vh
  footerRange: 160,
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VjtBQUNXO0FBQ1Q7QUFDSztBQUNOIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvYmF0dGVyeS1zYXZlci5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9ib2R5LWNsYXNzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2NvbGxhcHNpYmxlLW1lbnUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvY29va2llLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvaW1hZ2UtaG92ZXIuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvaW1hZ2VzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL21vdXNlLW92ZXItbG9nby5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9wcmludC5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9zY3JvbGwtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy90b2MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWJvdW5jZSA9IChjYWxsYmFjaywgdGltZW91dCwgX3RoaXMpID0+IHtcbiAgICBsZXQgdGltZXJcbiAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgIGNvbnN0IF90aGF0ID0gdGhpc1xuICAgICAgICBpZiAodGltZXIpIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoX3RoaXMgfHwgX3RoYXQsIGUpXG4gICAgICAgIH0sIHRpbWVvdXQpXG4gICAgfVxufVxuXG5jb25zdCB1c2VyQWN0aW9uID0gZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGZ1bGxTY3JlZW5EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmF0dGVyeS1zYXZlci1kaXYnKVxuXG4gICAgLy8gU2hvdyB0aGUgZGl2IHdoZW4gdGhlIGRvY3VtZW50IGlzIGxvYWRlZFxuICAgIGZ1bGxTY3JlZW5EaXYuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuXG4gICAgLy8gQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyXG4gICAgZnVsbFNjcmVlbkRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVsbFNjcmVlbkRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfSlcbn0sIDYwMDAwKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVzZXJBY3Rpb24sIGZhbHNlKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXNlckFjdGlvbiwgZmFsc2UpXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHVzZXJBY3Rpb24sIGZhbHNlKVxuXG51c2VyQWN0aW9uKClcbiIsImltcG9ydCB7IG15Q29va2llIH0gZnJvbSAnLi9jb29raWUuanMnXG5cbmV4cG9ydCBjb25zdCBib2R5Q2xhc3MgPSB7XG4gICAgYm9keU9iamVjdDogbnVsbCxcblxuICAgIHRoZW1lOiAnJyxcblxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICAgICAgYm9keUNsYXNzLmFkZE9yVG9nZ2xlQm9keUNsYXNzKCcjbWVudS10b2dnbGUnLCBmYWxzZSlcblxuICAgICAgICAvLyBpZiB5b3UgY2xpY2sgb24gdGhlbWUtc2VsZWN0b3IsIHlvdSBzZWxlY3QgdGhlIHRoZW1lXG4gICAgICAgIGJvZHlDbGFzcy5hZGRPclRvZ2dsZUJvZHlDbGFzcygnLnRoZW1lLXNlbGVjdG9yJywgdHJ1ZSlcbiAgICAgICAgdGhpcy50aGVtZSA9XG4gICAgICAgICAgICAvLyBpZiB5b3UgY2xpY2sgb24gc2V0LXRoZW0sIHlvdSBzZWxlY3QgdGhlIHRoZW1lXG4gICAgICAgICAgICBib2R5Q2xhc3MucmV0cmlldmVDb29raWVPckhhc2goKVxuICAgICAgICAvLyBleHBvc2Ugc2Nyb2xsZWQgYmVoYXZpb3VyXG4gICAgICAgIHRoaXMuc2Nyb2xsU3RhcnQoKVxuICAgICAgICB0aGlzLmFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzKClcbiAgICB9LFxuXG4gICAgZ2V0Qm9keU9iamVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYm9keUNsYXNzLmJvZHlPYmplY3RcbiAgICB9LFxuXG4gICAgZ2V0VGhlbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmcoYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJykpXG4gICAgfSxcblxuICAgIHNob3dNZW51QXNEZWZhdWx0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGJvZHlDbGFzcy5pc0hvbWVQYWdlKCkgPT09IHRydWUgJiZcbiAgICAgICAgICAgIGJvZHlDbGFzcy5oYXNGcmFnbWVudCgpID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZW51LXRvZ2dsZScpLmNsaWNrKClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICBib2R5Q2xhc3MuYWRkUm9ja2V0TW9kZVZpZGVvT3JJbWFnZSgpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktbG9hZGVkJylcbiAgICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCd0b3VjaCcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ25vLXRvdWNoJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgnYm9keS11bmxvYWRlZCcpXG4gICAgICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LXVubG9hZGVkJylcbiAgICAgICAgLy8gfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgncG9wc3RhdGUnKVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICByZXRyaWV2ZUNvb2tpZU9ySGFzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVVSTCgpXG4gICAgICAgIGxldCBwcmVmZXJyZWRUaGVtZSA9ICcnXG4gICAgICAgIGlmIChoYXNoID09PSAncmVzZXQnKSB7XG4gICAgICAgICAgICBteUNvb2tpZS5lcmFzZUNvb2tpZSgncHJlZmVycmVkVGhlbWUnKVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc2gpIHtcbiAgICAgICAgICAgIHRoaXMucnVuQ2xpY2tGb3JFbGVtZW50KGhhc2gpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc2ggIT09ICd0aGVtZS1tb29uJyAmJiBoYXNoICE9PSAndGhlbWUtc3VuJykge1xuICAgICAgICAgICAgcHJlZmVycmVkVGhlbWUgPSBteUNvb2tpZS5nZXRDb29raWUoJ3ByZWZlcnJlZFRoZW1lJylcbiAgICAgICAgICAgIGlmIChwcmVmZXJyZWRUaGVtZSkge1xuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsIHByZWZlcnJlZFRoZW1lKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChib2R5Q2xhc3MudXNlclByZWZlcnNEYXJrVGhlbWUoKSkge1xuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICd0aGVtZS1tb29uJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1c2VyUHJlZmVyc0RhcmtUaGVtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcbiAgICAgICAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlc1xuICAgICAgICApXG4gICAgfSxcblxuICAgIHJ1bkNsaWNrRm9yRWxlbWVudDogZnVuY3Rpb24gKGhhc2gpIHtcbiAgICAgICAgaGFzaCA9IGhhc2gudHJpbSgpXG4gICAgICAgIGlmIChoYXNoLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaClcbiAgICAgICAgICAgIGlmIChvYmogJiYgb2JqLmNsYXNzTGlzdC5jb250YWlucygndGhlbWUtc2VsZWN0b3InKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQm9keUNsYXNzZXNCYXNlZE9uQXR0cmlidXRlKG9iailcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKGhhc2gpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuXG4gICAgYWRkT3JUb2dnbGVCb2R5Q2xhc3M6IGZ1bmN0aW9uIChvYmpTZWxlY3RvciwgaXNUaGVtZSkge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwob2JqU2VsZWN0b3IpXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAob25lRWFjaE9iamVjdCkge1xuICAgICAgICAgICAgICAgIG9uZUVhY2hPYmplY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keUNsYXNzLmFjdGlvbkJvZHlDbGFzc0NoYW5nZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZUVhY2hPYmplY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVGhlbWVcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqU2VsZWN0b3IgPT09ICcjbWVudS10b2dnbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBtZW51IHdoZW4gdG9nZ2xpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LWxvZ28nKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMzAwKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBzY3JvbGxTdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBoYXNoID0gYm9keUNsYXNzLmdldEhhc2hGcm9tVVJMKClcbiAgICAgICAgICAgIGlmIChoYXNoICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBoYXNoKS5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJywgLy8gc21vb3RoIHNjcm9sbFxuICAgICAgICAgICAgICAgICAgICBibG9jazogJ3N0YXJ0JyAvLyB0aGUgdXBwZXIgYm9yZGVyIG9mIHRoZSBlbGVtZW50IHdpbGwgYmUgYWxpZ25lZCBhdCB0aGUgdG9wIG9mIHRoZSB2aXNpYmxlIHBhcnQgb2YgdGhlIHdpbmRvdyBvZiB0aGUgc2Nyb2xsYWJsZSBhcmVhLlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMClcbiAgICB9LFxuXG4gICAgYWN0aW9uQm9keUNsYXNzQ2hhbmdlOiBmdW5jdGlvbiAob25lRWFjaE9iamVjdCwgZXZlbnQsIGlzVGhlbWUsIHNjcm9sbFRvKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBib2R5Q2xhc3MucmVtb3ZlQm9keUNsYXNzZXNCYXNlZE9uQXR0cmlidXRlKG9uZUVhY2hPYmplY3QpXG5cbiAgICAgICAgbGV0IHRvZ2dsZUNsYXNzID0gJydcbiAgICAgICAgbGV0IGlkID0gJydcbiAgICAgICAgaWYgKG9uZUVhY2hPYmplY3QuaGFzQXR0cmlidXRlKCdkYXRhLWFkZC1jbGFzcycpKSB7XG4gICAgICAgICAgICB0b2dnbGVDbGFzcyA9IG9uZUVhY2hPYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWFkZC1jbGFzcycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2dnbGVDbGFzcyA9IG9uZUVhY2hPYmplY3QuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgICAgICAgICBpZCA9IHRvZ2dsZUNsYXNzXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uZUVhY2hPYmplY3QuaGFzQXR0cmlidXRlKCdkYXRhLXRvZ2dsZS1yYXRoZXItdGhhbi1hZGQnKSkge1xuICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnRvZ2dsZSh0b2dnbGVDbGFzcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQodG9nZ2xlQ2xhc3MpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNUaGVtZSkge1xuICAgICAgICAgICAgbXlDb29raWUuc2V0Q29va2llKCdwcmVmZXJyZWRUaGVtZScsIHRvZ2dsZUNsYXNzLCAxNClcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsIHRvZ2dsZUNsYXNzKVxuICAgICAgICAgICAgYm9keUNsYXNzLnRoZW1lID0gdG9nZ2xlQ2xhc3NcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWQgJiYgc2Nyb2xsVG8pIHtcbiAgICAgICAgICAgIGxldCBoYXNoID0gYm9keUNsYXNzLmdldEhhc2hGcm9tU3RyaW5nKGlkKVxuICAgICAgICAgICAgaWYgKGhhc2gubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaGFzaCA9IGhhc2gucmVwbGFjZSgnIycsICcnKVxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyMnICsgaGFzaFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZTogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1yZW1vdmUtY2xhc3MnKSkge1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5nID0gb2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZW1vdmUtY2xhc3MnKVxuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IGJvZHlDbGFzcy5nZXRDbGFzc2VzRnJvbUxpc3Qoc3RyaW5nKVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNsYXNzZXNbaV1cbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldENsYXNzZXNGcm9tTGlzdDogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICBjb25zdCBhcnJheSA9IHN0cmluZy5zcGxpdCgnLCcpXG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGFycmF5W2ldLnRyaW0oKVxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbmV3QXJyYXkucHVzaCh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3QXJyYXlcbiAgICB9LFxuXG4gICAgZ2V0SGFzaEZyb21VUkw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhhc2hcbiAgICAgICAgcmV0dXJuIGJvZHlDbGFzcy5nZXRIYXNoRnJvbVN0cmluZyhzdHJpbmcpXG4gICAgfSxcblxuICAgIGdldEhhc2hGcm9tU3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIHN0cmluZyA9IFN0cmluZyhzdHJpbmcpXG4gICAgICAgIHJldHVybiBib2R5Q2xhc3MucmVtb3ZlSGFzaEZyb21TdHJpbmcoc3RyaW5nKVxuICAgIH0sXG5cbiAgICByZW1vdmVIYXNoRnJvbVN0cmluZzogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoJyMnLCAnJylcbiAgICB9LFxuXG4gICAgYWRkUm9ja2V0TW9kZVZpZGVvT3JJbWFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYm9keUNsYXNzLmhhc1JvY2tldFNob3coKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgdmlkZW9JZCA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS12aWRlby1pZCcpXG4gICAgICAgICAgICBjb25zdCBpbWFnZVVSTCA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1iZy1pbWFnZScpXG4gICAgICAgICAgICBjb25zdCBpbWFnZVggPVxuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1iZy1pbWFnZS14JykgPz8gJzUwJSdcbiAgICAgICAgICAgIGNvbnN0IGltYWdlWSA9XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWJnLWltYWdlLXknKSA/PyAnNTAlJ1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codmlkZW9JZClcbiAgICAgICAgICAgIGlmICh2aWRlb0lkIHx8IGltYWdlVVJMKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gJydcbiAgICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIGRpdi5pZCA9ICdCYWNrZ3JvdW5kSW1hZ2UnXG4gICAgICAgICAgICAgICAgY29uc3Qgc2hhZG93ID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgICAgICAnZGF0YS1zaGFkb3ctb3Zlci1sb2dvJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBsZXQgc2hhZG93Q29sb3VyID0gJydcbiAgICAgICAgICAgICAgICBpZiAoc2hhZG93ID09PSAnZGFyaycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhZG93Q29sb3VyID1cbiAgICAgICAgICAgICAgICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMjEwZGVnLCAjMDAwMDAwNzcgMTIlLCB0cmFuc3BhcmVudCA4OCUpJ1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hhZG93ID09PSAnbGlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYWRvd0NvbG91ciA9XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGluZWFyLWdyYWRpZW50KDIxMGRlZywgI0ZGRkZGRjc3IDEyJSwgdHJhbnNwYXJlbnQgODglKSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlkZW9VcmwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSWQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJz9hdXRvcGxheT0xJmF1dG9wYXVzZT0wJm11dGVkPTEmYmFja2dyb3VuZD0xJ1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93Q29sb3VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSA9ICdiYWNrZ3JvdW5kOiAnICsgc2hhZG93Q29sb3VyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAnPGlmcmFtZSBzcmM9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvVXJsICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvdz1cImF1dG9wbGF5OyBmdWxsc2NyZWVuXCIgYWxsb3dmdWxsc2NyZWVuIHN0eWxlPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PC9pZnJhbWU+J1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZmlyc3RDaGlsZFxuICAgICAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5pbnNlcnRCZWZvcmUoZGl2LCB0ZW1wKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdoYXMtYmctaW1hZ2UtbG9hZGVkJylcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9ICd1cmwoJyArIGltYWdlVVJMICsgJyknXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dDb2xvdXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gc2hhZG93Q29sb3VyICsgJywnICsgc3R5bGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gc3R5bGVcbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IGltYWdlWCArICcgJyArIGltYWdlWVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2hhcy1iZy1pbWFnZS1sb2FkZWQnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdoYXMtYmctaW1hZ2UtbG9hZGVkJykgLy8gZmFpbCBvcGVuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IGltYWdlVVJMXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdmYWRlLW9uLW5vLXJvY2tldCcpXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmZpcnN0Q2hpbGRcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5pbnNlcnRCZWZvcmUoZGl2LCB0ZW1wKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ25vIHJvY2tldCBzaG93JylcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0hvbWVQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJ1xuICAgIH0sXG5cbiAgICBoYXNGcmFnbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhhc2ggIT09ICcnXG4gICAgfSxcblxuICAgIGhhc1JvY2tldFNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5jb250YWlucygnbm8tcm9ja2V0LXNob3cnKVxuICAgICAgICAgICAgPyBmYWxzZVxuICAgICAgICAgICAgOiB0cnVlXG4gICAgfVxufVxuXG5ib2R5Q2xhc3MuaW5pdCgpXG4iLCJjb25zdCBDb2xsYXBzaWJsZUxpc3RzID0gKCgpID0+IHtcbiAgICBmdW5jdGlvbiBhcHBseSAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsLmNvbGxhcHNpYmxlTGlzdCcpLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICBhcHBseVRvKGxpc3QpXG4gICAgICAgICAgICB1cGRhdGVIYXNPcGVuKGxpc3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwbHlUbyAobGlzdCkge1xuICAgICAgICBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykuZm9yRWFjaChsaSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFVsID0gbGkucXVlcnlTZWxlY3RvcignOnNjb3BlID4gdWwnKVxuICAgICAgICAgICAgaWYgKCFjaGlsZFVsKSByZXR1cm5cblxuICAgICAgICAgICAgLy8gQUREIFRPR0dMRSBBUlJPV1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgc3Bhbi5jbGFzc05hbWUgPSAnb3Blbi1jbG9zZSdcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwib3BlblwiPuKGmDwvaT48aSBjbGFzcz1cImNsb3NlZFwiPuKGljwvaT4nXG4gICAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlKGxpKSlcblxuICAgICAgICAgICAgbGkuaW5zZXJ0QmVmb3JlKHNwYW4sIGNoaWxkVWwpXG5cbiAgICAgICAgICAgIC8vIGNvbGxhcHNlZCBieSBkZWZhdWx0XG4gICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuICAgICAgICAgICAgY2hpbGRVbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICAgICAgICAgIC8vIG9wZW4gZGVmYXVsdHNcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSB8fFxuICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5jb250YWlucygnc2VjdGlvbicpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvcGVuKGxpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZSAobGkpIHtcbiAgICAgICAgaWYgKGxpLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0T3BlbicpKSB7XG4gICAgICAgICAgICBjbG9zZShsaSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wZW4obGkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvcGVuIChsaSkge1xuICAgICAgICBsaS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcblxuICAgICAgICBjb25zdCBkaXJlY3RVbCA9IGxpLnF1ZXJ5U2VsZWN0b3IoJzpzY29wZSA+IHVsJylcbiAgICAgICAgaWYgKGRpcmVjdFVsKSBkaXJlY3RVbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuXG4gICAgICAgIC8vIGtlZXAgZGVlcGVyIGxldmVscyBjb2xsYXBzZWRcbiAgICAgICAgaWYgKGRpcmVjdFVsKSB7XG4gICAgICAgICAgICBkaXJlY3RVbC5xdWVyeVNlbGVjdG9yQWxsKCc6c2NvcGUgdWwnKS5mb3JFYWNoKG5lc3RlZFVsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXN0ZWRMaSA9IG5lc3RlZFVsLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICBuZXN0ZWRMaS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcbiAgICAgICAgICAgICAgICBuZXN0ZWRMaS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuICAgICAgICAgICAgICAgIG5lc3RlZFVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICAvLyBORVc6IGNsb3NlIHNpYmxpbmdzIG9uIHRoZSBzYW1lIGxldmVsXG4gICAgICAgIGNvbnN0IHBhcmVudExpc3QgPSBsaS5wYXJlbnRFbGVtZW50XG4gICAgICAgIHBhcmVudExpc3RcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCc6c2NvcGUgPiBsaS5jb2xsYXBzaWJsZUxpc3RPcGVuJylcbiAgICAgICAgICAgIC5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzaWJsaW5nICE9PSBsaSkge1xuICAgICAgICAgICAgICAgICAgICBjbG9zZShzaWJsaW5nKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgbWFya1NpYmxpbmdTdGF0ZShsaSlcbiAgICAgICAgdXBkYXRlSGFzT3BlbihsaS5jbG9zZXN0KCcuY29sbGFwc2libGVMaXN0JykpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2UgKGxpKSB7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKVxuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuXG4gICAgICAgIGNvbnN0IGNoaWxkVWwgPSBsaS5xdWVyeVNlbGVjdG9yKCc6c2NvcGUgPiB1bCcpXG4gICAgICAgIGlmIChjaGlsZFVsKSBjaGlsZFVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblxuICAgICAgICBtYXJrU2libGluZ1N0YXRlKGxpKVxuICAgICAgICB1cGRhdGVIYXNPcGVuKGxpLmNsb3Nlc3QoJy5jb2xsYXBzaWJsZUxpc3QnKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXJrU2libGluZ1N0YXRlIChsaSkge1xuICAgICAgICBjb25zdCBwYXJlbnRMaXN0ID0gbGkucGFyZW50RWxlbWVudFxuICAgICAgICBpZiAoIXBhcmVudExpc3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3QnKSkgcmV0dXJuXG5cbiAgICAgICAgY29uc3Qgc2libGluZ3MgPSBwYXJlbnRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJzpzY29wZSA+IGxpJylcbiAgICAgICAgY29uc3QgaXNPcGVuID0gbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcblxuICAgICAgICBzaWJsaW5ncy5mb3JFYWNoKHNpYiA9PiBzaWIuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0Tm90T3BlbicpKVxuXG4gICAgICAgIGlmIChpc09wZW4pIHtcbiAgICAgICAgICAgIHNpYmxpbmdzLmZvckVhY2goc2liID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2liICE9PSBsaSkgc2liLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdE5vdE9wZW4nKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUhhc09wZW4gKGxpc3QpIHtcbiAgICAgICAgaWYgKCFsaXN0KSByZXR1cm5cbiAgICAgICAgY29uc3QgaGFzID0gbGlzdC5xdWVyeVNlbGVjdG9yKCcuY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnY29sbGFwc2libGVMaXN0SGFzT3BlbicsICEhaGFzKVxuICAgIH1cblxuICAgIHJldHVybiB7IGFwcGx5IH1cbn0pKClcblxuQ29sbGFwc2libGVMaXN0cy5hcHBseSgpXG4iLCJjb25zdCBteUNvb2tpZSA9IHtcblxuICBzZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZGF5cykge1xuICAgIHZhciBleHBpcmVzID0gJydcbiAgICBpZiAodHlwZW9mIGRheXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkYXlzID0gMTRcbiAgICB9XG4gICAgaWYgKGRheXMpIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSlcbiAgICAgIGV4cGlyZXMgPSAnOyBleHBpcmVzPScgKyBkYXRlLnRvVVRDU3RyaW5nKClcbiAgICB9XG4gICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArICc9JyArICh2YWx1ZSB8fCAnJykgKyBleHBpcmVzICsgJzsgcGF0aD0vJ1xuICB9LFxuXG4gIGdldENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgbmFtZUVRID0gbmFtZSArICc9J1xuICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBjYVtpXVxuICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7XG4gICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICBlcmFzZUNvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBteUNvb2tpZS5zZXRDb29raWUobmFtZSwgbnVsbCwgMClcbiAgfVxufVxuXG5leHBvcnQgeyBteUNvb2tpZSB9XG4iLCJ2YXIgZm9ybWZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSdcbilcbmZvciAodmFyIEogPSBmb3JtZmllbGRzLmxlbmd0aCAtIDE7IEogPj0gMDsgLS1KKSB7XG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcblxuICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKVxuICBldnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCBmYWxzZSwgdHJ1ZSlcbiAgZm9ybWZpZWxkc1tKXS5kaXNwYXRjaEV2ZW50KGV2dClcbn1cblxuZnVuY3Rpb24gYWRqdXN0U3R5bGluZyAoekV2ZW50KSB7XG4gIHZhciBpbnBWYWwgPSB6RXZlbnQudGFyZ2V0LnZhbHVlXG4gIGlmIChpbnBWYWwgJiYgaW5wVmFsLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSkge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdmFsdWUnKVxuICB9IGVsc2Uge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbm8tdmFsdWUnKVxuICB9XG59XG4iLCJjb25zdCBpbWFnZWhvdmVyID0ge1xuICAgIHJlc2V0VGltZW91dDogbnVsbCxcblxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmltYWdlLWNvbnRhaW5lcicpLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb3VjaERldmljZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2V0VGltZW91dClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGxlZnQsIHRvcCB9ID1cbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICBjb25zdCB4ID0gZS5wYWdlWCAtIGxlZnQgLSB3aW5kb3cuc2Nyb2xsWFxuICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBlLnBhZ2VZIC0gdG9wIC0gd2luZG93LnNjcm9sbFlcblxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLnNldFByb3BlcnR5KCctLW1vdXNlLXgnLCAoeCAvIHdpZHRoKSAqIDUwIC0gMjUpXG4gICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuc2V0UHJvcGVydHkoJy0tbW91c2UteScsIDI1IC0gKHkgLyBoZWlnaHQpICogNTApXG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1RvdWNoRGV2aWNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCctLW1vdXNlLXgnKVxuICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJy0tbW91c2UteScpXG4gICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcbiAgICB9LFxuICAgIGlzVG91Y2hEZXZpY2VWYXI6IG51bGwsXG5cbiAgICBpc1RvdWNoRGV2aWNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVG91Y2hEZXZpY2VWYXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUb3VjaERldmljZVZhciA9XG4gICAgICAgICAgICAgICAgJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8XG4gICAgICAgICAgICAgICAgJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMCB8fFxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmlzVG91Y2hEZXZpY2VWYXJcbiAgICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW1hZ2Vob3Zlci5pbml0KClcbn0pXG4iLCJcbmNvbnN0IGltYWdlV3JhcHBlciA9ICgpID0+IHtcbiAgZnVuY3Rpb24gd3JhcCAoZWwsIHdyYXBwZXIpIHtcbiAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyLCBlbClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsKVxuICB9XG4gIC8vIGNyZWF0ZSB0aGUgY29udGFpbmVyIGRpdlxuXG4gIC8vIGdldCBhbGwgZGl2c1xuICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwb2dyYXBoeSBpbWcnKVxuICAvLyBnZXQgdGhlIGJvZHkgZWxlbWVudFxuICAvLyBhcHBseSBjbGFzcyB0byBjb250YWluZXIgZGl2XG5cbiAgLy8gZmluZCBvdXQgYWxsIHRob3NlIGRpdnMgaGF2aW5nIGNsYXNzIENcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBkdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZHYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdpbWFnZS1jb250YWluZXInKVxuICAgIGNvbnN0IGltZyA9IGltYWdlc1tpXVxuICAgIHdyYXAoaW1nLCBkdilcbiAgfVxufVxuXG5pbWFnZVdyYXBwZXIoKVxuIiwiY29uc3Qgc2hvd1JvY2tldE1vZGUgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0b2dnbGVDbGFzc09uSG92ZXIgPSAoZSkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgICAgIC5jbGFzc0xpc3RcbiAgICAgICAgLnRvZ2dsZSgnbW91c2Utb3Zlci1sb2dvJywgZS50eXBlID09PSAnbW91c2VlbnRlcicpXG4gICAgfVxuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9nbycpXG4gICAgbG9nby5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdG9nZ2xlQ2xhc3NPbkhvdmVyKVxuICAgIGxvZ28uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRvZ2dsZUNsYXNzT25Ib3ZlcilcbiAgfVxufVxuXG5zaG93Um9ja2V0TW9kZS5pbml0KClcbiIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmVwcmludCcsIGV2ZW50ID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50LWJlbG93LXF1b3RlJylcbiAgICBlbC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KVxufSlcbiIsImltcG9ydCB7IGJvZHlDbGFzcyB9IGZyb20gJy4vYm9keS1jbGFzcydcblxuY29uc3Qgc2Nyb2xsTWFuYWdlciA9IHtcbiAgICBzY3JlZW5IZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICBsYXN0U2Nyb2xsOiAwLFxuICAgIGJvZHk6IG51bGwsXG4gICAgcXVvdGU6IG51bGwsXG4gICAgZm9vdGVyOiBudWxsLFxuICAgIGhlYWRlclJhbmdlOiA3MCwgLy8gaW4gdmhcbiAgICBmb290ZXJSYW5nZTogMTYwLCAvLyBpbiB2aFxuICAgIGhlYWRlclBjdDogMCxcbiAgICBmb290ZXJQY3Q6IDEwMCxcbiAgICBqdXN0U2Nyb2xsZWREdXJhdGlvbjogMTIwMCwgLy8gbXMg4oCUIGNoYW5nZSBmcmVlbHlcbiAgICBqdXN0U2Nyb2xsZWRUaW1lcjogbnVsbCxcbiAgICBzY3JvbGxTdG9wVGltZXI6IG51bGwsXG4gICAgc2Nyb2xsU3RvcERlbGF5OiAxMjAsIC8vIG1zIGFmdGVyIGxhc3Qgc2Nyb2xsIGV2ZW50XG5cbiAgICBpbml0ICgpIHtcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keUNsYXNzLmdldEJvZHlPYmplY3QoKVxuICAgICAgICB0aGlzLnF1b3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tcXVvdGUnKVxuICAgICAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKVxuXG4gICAgICAgIHRoaXMucmVtZWFzdXJlKClcbiAgICAgICAgdGhpcy5iaW5kU2Nyb2xsKClcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gdGhpcy5yZW1lYXN1cmUoKSlcblxuICAgICAgICAvLyBORVc6IFRyaWdnZXIgdGhlIGluaXRpYWwgc2Nyb2xsIGNhbGN1bGF0aW9uXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLm9uU2Nyb2xsKCkpXG4gICAgfSxcblxuICAgIHJlbWVhc3VyZSAoKSB7XG4gICAgICAgIHRoaXMuc2NyZWVuSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIHRoaXMubGFzdFNjcm9sbCA9IHRoaXMuZ2V0U2Nyb2xsKClcbiAgICB9LFxuXG4gICAgZ2V0U2Nyb2xsICgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcbiAgICB9LFxuXG4gICAgYmluZFNjcm9sbCAoKSB7XG4gICAgICAgIGxldCB0aWNraW5nID0gZmFsc2VcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TY3JvbGwoKVxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIG9uU2Nyb2xsICgpIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsID0gdGhpcy5nZXRTY3JvbGwoKVxuICAgICAgICBjb25zdCBtYXhTY3JvbGwgPVxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCAtIHRoaXMuc2NyZWVuSGVpZ2h0XG5cbiAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJDbGFzc2VzKHNjcm9sbClcbiAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDbGFzc2VzKHNjcm9sbCwgbWF4U2Nyb2xsKVxuICAgICAgICB0aGlzLnVwZGF0ZVJvY2tldFRoZW1lKClcbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxEaXJlY3Rpb24oc2Nyb2xsKVxuICAgICAgICB0aGlzLmhhbmRsZUp1c3RTY3JvbGxlZCgpXG5cbiAgICAgICAgdGhpcy5sYXN0U2Nyb2xsID0gc2Nyb2xsXG4gICAgfSxcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEhFQURFUiAvIEZPT1RFUiBTVEFURSAoMOKAkzEwMClcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB1cGRhdGVIZWFkZXJDbGFzc2VzIChjdXJyZW50U2Nyb2xsKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlclBpeGVscyA9IHRoaXMuc2NyZWVuSGVpZ2h0ICogKHRoaXMuaGVhZGVyUmFuZ2UgLyAxMDApXG4gICAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5jbGFtcChjdXJyZW50U2Nyb2xsIC8gaGVhZGVyUGl4ZWxzLCAwLCAxKVxuICAgICAgICBjb25zdCBwY3QgPSBNYXRoLnJvdW5kKHJhdGlvICogMTAwKVxuXG4gICAgICAgIHRoaXMuaGVhZGVyUGN0ID0gcGN0XG4gICAgICAgIHRoaXMucmVwbGFjZVN0ZXBDbGFzc2VzKCdoZWFkZXInLCBwY3QpXG5cbiAgICAgICAgaWYgKHBjdCA+PSAxMDApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdwYXN0LWhlYWRlcicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGFzdC1oZWFkZXInKVxuICAgICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGVGb290ZXJDbGFzc2VzIChjdXJyZW50U2Nyb2xsLCBtYXhTY3JvbGwpIHtcbiAgICAgICAgY29uc3QgYm90dG9tRGlzdGFuY2UgPSBtYXhTY3JvbGwgLSBjdXJyZW50U2Nyb2xsXG5cbiAgICAgICAgY29uc3QgaGVhZGVyUGl4ZWxzID0gdGhpcy5zY3JlZW5IZWlnaHQgKiAodGhpcy5oZWFkZXJSYW5nZSAvIDEwMClcblxuICAgICAgICAvLyBJZiB3ZSdyZSBzdGlsbCBpbiB0aGUgaGVhZGVyIHpvbmUsIGhpZGUgZm9vdGVyIGNsYXNzZXNcbiAgICAgICAgaWYgKGN1cnJlbnRTY3JvbGwgPCBoZWFkZXJQaXhlbHMpIHtcbiAgICAgICAgICAgIHRoaXMuZm9vdGVyUGN0ID0gMTAwXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN0ZXBDbGFzc2VzKCdmb290ZXInKVxuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Zvb3Rlci12aXNpYmxlJylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZm9vdGVyUGl4ZWxzID0gdGhpcy5zY3JlZW5IZWlnaHQgKiAodGhpcy5mb290ZXJSYW5nZSAvIDEwMClcbiAgICAgICAgY29uc3QgcmF0aW8gPSB0aGlzLmNsYW1wKGJvdHRvbURpc3RhbmNlIC8gZm9vdGVyUGl4ZWxzLCAwLCAxKVxuICAgICAgICBjb25zdCBwY3QgPSBNYXRoLnJvdW5kKHJhdGlvICogMTAwKVxuXG4gICAgICAgIHRoaXMuZm9vdGVyUGN0ID0gcGN0XG4gICAgICAgIHRoaXMucmVwbGFjZVN0ZXBDbGFzc2VzKCdmb290ZXInLCBwY3QpXG5cbiAgICAgICAgaWYgKHBjdCA8IDEwMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ2Zvb3Rlci12aXNpYmxlJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdmb290ZXItdmlzaWJsZScpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVwbGFjZVN0ZXBDbGFzc2VzIChwcmVmaXgsIHBjdCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxMDA7IGkgKz0gMTApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH0tJHtpfWApXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm91bmRlZCA9IE1hdGgucm91bmQocGN0IC8gMTApICogMTBcbiAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fS0ke3JvdW5kZWR9YClcbiAgICB9LFxuICAgIHJlbW92ZVN0ZXBDbGFzc2VzIChwcmVmaXgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTAwOyBpICs9IDEwKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9LSR7aX1gKVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBST0NLRVQgVEhFTUVcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB1cGRhdGVSb2NrZXRUaGVtZSAoKSB7XG4gICAgICAgIGNvbnN0IGhhc1JvY2tldCA9ICF0aGlzLmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCduby1yb2NrZXQtc2hvdycpXG4gICAgICAgIGlmICghaGFzUm9ja2V0KSByZXR1cm5cblxuICAgICAgICBjb25zdCBpbkhlYWRlclpvbmUgPSB0aGlzLmhlYWRlclBjdCA8IDEwMFxuICAgICAgICBjb25zdCBpbkZvb3RlclpvbmUgPSB0aGlzLmZvb3RlclBjdCA8IDEwMFxuXG4gICAgICAgIGlmIChpbkhlYWRlclpvbmUgfHwgaW5Gb290ZXJab25lKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgndGhlbWUtcm9ja2V0JylcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGJvZHlDbGFzcy5nZXRUaGVtZSgpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3RoZW1lLXJvY2tldCcpXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZChib2R5Q2xhc3MuZ2V0VGhlbWUoKSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBTQ1JPTEwgRElSRUNUSU9OXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdXBkYXRlU2Nyb2xsRGlyZWN0aW9uIChzY3JvbGwpIHtcbiAgICAgICAgaWYgKHNjcm9sbCA+IHRoaXMubGFzdFNjcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbGVkLXVwJylcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZC1kb3duJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZC11cCcpXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsZWQtZG93bicpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSlVTVCBTQ1JPTExFRFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGhhbmRsZUp1c3RTY3JvbGxlZCAoKSB7XG4gICAgICAgIC8vIENsZWFyIHByZXZpb3VzIHN0b3AgZGV0ZWN0aW9uXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbFN0b3BUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsU3RvcFRpbWVyKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxTdG9wVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIFNjcm9sbCBoYXMgZW5kZWQg4oaSIGFkZCBqdXN0LXNjcm9sbGVkXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnanVzdC1zY3JvbGxlZCcpXG5cbiAgICAgICAgICAgIC8vIENsZWFyIHByZXZpb3VzIHZpc2liaWxpdHkgdGltZXJcbiAgICAgICAgICAgIGlmICh0aGlzLmp1c3RTY3JvbGxlZFRpbWVyKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuanVzdFNjcm9sbGVkVGltZXIpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuanVzdFNjcm9sbGVkVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnanVzdC1zY3JvbGxlZCcpXG4gICAgICAgICAgICB9LCB0aGlzLmp1c3RTY3JvbGxlZER1cmF0aW9uKVxuICAgICAgICB9LCB0aGlzLnNjcm9sbFN0b3BEZWxheSlcbiAgICB9LFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFVUSUxcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBjbGFtcCAodiwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCB2KSlcbiAgICB9XG59XG5cbnNjcm9sbE1hbmFnZXIuaW5pdCgpXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcblxuICAgIGNvbnN0IHRvYyA9ICgpID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBjb250YWluZXIgZGl2XG4gICAgICAgIC8vIGdldCBhbGwgZGl2c1xuICAgICAgICBjb25zdCBoZWFkaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAnI2NvbnRlbnQtYmVsb3ctcXVvdGUgaDEsICNjb250ZW50LWJlbG93LXF1b3RlIGgyJ1xuICAgICAgICApXG4gICAgICAgIC8vIGdldCB0aGUgYm9keSBlbGVtZW50XG4gICAgICAgIC8vIGFwcGx5IGNsYXNzIHRvIGNvbnRhaW5lciBkaXZcbiAgICAgICAgaWYgKGhlYWRpbmdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnaGFzLXRvYycpXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3RvYy1vZmYnKVxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvdW50ID0gaSArIDFcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IGhlYWRpbmdzW2ldXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZWwpXG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzRWxlbSA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNFbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IHN0eWxlcyBvciBjbGFzc2VzIHRvIHByZXZpb3VzRWxlbVxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0VsZW0uY2xhc3NMaXN0LmFkZCgnYm90dG9tLXNwYWNlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWwuaWQgPSAndG9jLScgKyBjb3VudFxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2NvdW50YWJsZS1pY29ucycpXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaWNvbi0nICsgY291bnQpXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnb3Blbi1jbG9zZScpXG4gICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdpY29uJylcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuRW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICAgICAgc3BhbkVuZC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtaG9sZGVyJylcbiAgICAgICAgICAgICAgICAvLyBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2suYmluZChudWxsLCBlbCkpXG4gICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJvcGVuXCI+KzwvaT48aSBjbGFzcz1cImNsb3NlZFwiPuKAkzwvaT4nXG4gICAgICAgICAgICAgICAgc3BhbkVuZC5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJhY3RpdmVcIj7iloI8L2k+J1xuICAgICAgICAgICAgICAgIGVsLmluc2VydEJlZm9yZShzcGFuLCBlbC5maXJzdENoaWxkKVxuICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKHNwYW5FbmQpXG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb2ZmJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNjb250ZW50LWJlbG93LXF1b3RlIC50b2MtYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gaGVhZGluZ3NbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd0b2MtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2Mtb24nKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignIycgKyBoYXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI3RvYy0xJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tdG9jJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICcjdG9jJyAmJlxuICAgICAgICBib2R5LmNsYXNzTGlzdC5jb250YWlucygndG9jLW9mZicpICYmXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYXMtdG9jJylcbiAgICApIHtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb24nKVxuICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1vZmYnKVxuICAgIH1cbiAgICB0b2MoKVxuXG4gICAgLy8gY29uc3QgY2xpY2tlZEVsZW1lbnQgPSBldmVudC50YXJnZXRcbiAgICAvLyBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY291bnRhYmxlLWljb25zJykpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnQUEnKVxuICAgIC8vICAgICBldmVudC50YXJnZXQuY2xpY2soKVxuICAgIC8vIH1cbn0pXG4iLCIvLyAvLyBub24tdGhlbWVkIGFwcFxuLy8gaW1wb3J0ICdzaXRlL2FwcC9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vL1xuLy8gLy8gdmVuZG9yIG1vZHVsZXNcbi8vIGltcG9ydCAnc2l0ZS92ZW5kb3IvbXl2ZW5kb3IvbXlwYWNrYWdlL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vIC8vIHlvdXIgdGhlbWVkIGFwcCBmaWxlc1xuLy8gaW1wb3J0ICcuL2pzL3BhcnRpYWxzL1NvbWVPdGhlckphdmFzY3JpcHRGaWxlJztcbmltcG9ydCAnLi9qcy9jb29raWUnXG5pbXBvcnQgJy4vanMvYm9keS1jbGFzcydcbmltcG9ydCAnLi9qcy90b2MnXG5pbXBvcnQgJy4vanMvY29sbGFwc2libGUtbWVudSdcbmltcG9ydCAnLi9qcy9zY3JvbGwtbWFuYWdlcidcbmltcG9ydCAnLi9qcy9mb3JtJ1xuaW1wb3J0ICcuL2pzL21vdXNlLW92ZXItbG9nbydcbmltcG9ydCAnLi9qcy9pbWFnZXMnXG5pbXBvcnQgJy4vanMvaW1hZ2UtaG92ZXInXG5pbXBvcnQgJy4vanMvcHJpbnQnXG5pbXBvcnQgJy4vanMvYmF0dGVyeS1zYXZlcidcbiJdLCJuYW1lcyI6WyJkZWJvdW5jZSIsImNhbGxiYWNrIiwidGltZW91dCIsIl90aGlzIiwidGltZXIiLCJlIiwiX3RoYXQiLCJfdGhpczIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2FsbCIsInVzZXJBY3Rpb24iLCJmdWxsU2NyZWVuRGl2IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsImFkZEV2ZW50TGlzdGVuZXIiLCJteUNvb2tpZSIsImJvZHlDbGFzcyIsImJvZHlPYmplY3QiLCJ0aGVtZSIsImluaXQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkT3JUb2dnbGVCb2R5Q2xhc3MiLCJyZXRyaWV2ZUNvb2tpZU9ySGFzaCIsInNjcm9sbFN0YXJ0IiwiYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnMiLCJnZXRCb2R5T2JqZWN0IiwiZ2V0VGhlbWUiLCJTdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJzaG93TWVudUFzRGVmYXVsdCIsImlzSG9tZVBhZ2UiLCJoYXNGcmFnbWVudCIsImNsaWNrIiwiYWRkUm9ja2V0TW9kZVZpZGVvT3JJbWFnZSIsImV2ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZG9jdW1lbnRFbGVtZW50IiwicmVtb3ZlIiwid2luZG93IiwiaGFzaCIsImdldEhhc2hGcm9tVVJMIiwicHJlZmVycmVkVGhlbWUiLCJlcmFzZUNvb2tpZSIsInJ1bkNsaWNrRm9yRWxlbWVudCIsImdldENvb2tpZSIsInNldEF0dHJpYnV0ZSIsInVzZXJQcmVmZXJzRGFya1RoZW1lIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJ0cmltIiwibGVuZ3RoIiwib2JqIiwiY29udGFpbnMiLCJyZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGUiLCJvYmpTZWxlY3RvciIsImlzVGhlbWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIm9uZUVhY2hPYmplY3QiLCJhY3Rpb25Cb2R5Q2xhc3NDaGFuZ2UiLCJ0b2dnbGUiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJzY3JvbGxUbyIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlQ2xhc3MiLCJpZCIsImhhc0F0dHJpYnV0ZSIsInNldENvb2tpZSIsImdldEhhc2hGcm9tU3RyaW5nIiwicmVwbGFjZSIsImxvY2F0aW9uIiwib2JqZWN0Iiwic3RyaW5nIiwiY2xhc3NlcyIsImdldENsYXNzZXNGcm9tTGlzdCIsImkiLCJsZW4iLCJ2YWx1ZSIsImFycmF5Iiwic3BsaXQiLCJuZXdBcnJheSIsInB1c2giLCJyZW1vdmVIYXNoRnJvbVN0cmluZyIsImhhc1JvY2tldFNob3ciLCJfYm9keUNsYXNzJGJvZHlPYmplY3QiLCJfYm9keUNsYXNzJGJvZHlPYmplY3QyIiwidmlkZW9JZCIsImltYWdlVVJMIiwiaW1hZ2VYIiwiaW1hZ2VZIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsInNoYWRvdyIsInNoYWRvd0NvbG91ciIsInZpZGVvVXJsIiwiaW5uZXJIVE1MIiwidGVtcCIsImZpcnN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJ2aWRlbyIsImJvZHkiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJpbWciLCJJbWFnZSIsIm9ubG9hZCIsIm9uZXJyb3IiLCJzcmMiLCJwYXRobmFtZSIsIkNvbGxhcHNpYmxlTGlzdHMiLCJhcHBseSIsImxpc3QiLCJhcHBseVRvIiwidXBkYXRlSGFzT3BlbiIsImxpIiwiY2hpbGRVbCIsInNwYW4iLCJjbGFzc05hbWUiLCJvcGVuIiwiY2xvc2UiLCJkaXJlY3RVbCIsIm5lc3RlZFVsIiwibmVzdGVkTGkiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50TGlzdCIsInNpYmxpbmciLCJtYXJrU2libGluZ1N0YXRlIiwiY2xvc2VzdCIsInNpYmxpbmdzIiwiaXNPcGVuIiwic2liIiwiaGFzIiwibmFtZSIsImRheXMiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvVVRDU3RyaW5nIiwiY29va2llIiwibmFtZUVRIiwiY2EiLCJjIiwiY2hhckF0Iiwic3Vic3RyaW5nIiwiaW5kZXhPZiIsImZvcm1maWVsZHMiLCJKIiwiYWRqdXN0U3R5bGluZyIsImV2dCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInpFdmVudCIsImlucFZhbCIsInRhcmdldCIsImltYWdlaG92ZXIiLCJyZXNldFRpbWVvdXQiLCJlbCIsImlzVG91Y2hEZXZpY2UiLCJfZSR0YXJnZXQkZ2V0Qm91bmRpbmciLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImxlZnQiLCJ0b3AiLCJ4IiwicGFnZVgiLCJzY3JvbGxYIiwieSIsInBhZ2VZIiwic2Nyb2xsWSIsInNldFByb3BlcnR5IiwicmVtb3ZlUHJvcGVydHkiLCJpc1RvdWNoRGV2aWNlVmFyIiwibmF2aWdhdG9yIiwibWF4VG91Y2hQb2ludHMiLCJtc01heFRvdWNoUG9pbnRzIiwiaW1hZ2VXcmFwcGVyIiwid3JhcCIsIndyYXBwZXIiLCJwYXJlbnROb2RlIiwiYXBwZW5kQ2hpbGQiLCJpbWFnZXMiLCJkdiIsInNob3dSb2NrZXRNb2RlIiwidG9nZ2xlQ2xhc3NPbkhvdmVyIiwidHlwZSIsImxvZ28iLCJzY3JvbGxNYW5hZ2VyIiwic2NyZWVuSGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJsYXN0U2Nyb2xsIiwicXVvdGUiLCJmb290ZXIiLCJoZWFkZXJSYW5nZSIsImZvb3RlclJhbmdlIiwiaGVhZGVyUGN0IiwiZm9vdGVyUGN0IiwianVzdFNjcm9sbGVkRHVyYXRpb24iLCJqdXN0U2Nyb2xsZWRUaW1lciIsInNjcm9sbFN0b3BUaW1lciIsInNjcm9sbFN0b3BEZWxheSIsInJlbWVhc3VyZSIsImJpbmRTY3JvbGwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJvblNjcm9sbCIsImdldFNjcm9sbCIsInNjcm9sbFRvcCIsInRpY2tpbmciLCJzY3JvbGwiLCJtYXhTY3JvbGwiLCJzY3JvbGxIZWlnaHQiLCJ1cGRhdGVIZWFkZXJDbGFzc2VzIiwidXBkYXRlRm9vdGVyQ2xhc3NlcyIsInVwZGF0ZVJvY2tldFRoZW1lIiwidXBkYXRlU2Nyb2xsRGlyZWN0aW9uIiwiaGFuZGxlSnVzdFNjcm9sbGVkIiwiY3VycmVudFNjcm9sbCIsImhlYWRlclBpeGVscyIsInJhdGlvIiwiY2xhbXAiLCJwY3QiLCJNYXRoIiwicm91bmQiLCJyZXBsYWNlU3RlcENsYXNzZXMiLCJib3R0b21EaXN0YW5jZSIsInJlbW92ZVN0ZXBDbGFzc2VzIiwiZm9vdGVyUGl4ZWxzIiwicHJlZml4IiwiY29uY2F0Iiwicm91bmRlZCIsImhhc1JvY2tldCIsImluSGVhZGVyWm9uZSIsImluRm9vdGVyWm9uZSIsIl90aGlzMyIsInYiLCJtaW4iLCJtYXgiLCJ0b2MiLCJoZWFkaW5ncyIsImNvdW50IiwicHJldmlvdXNFbGVtIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInNwYW5FbmQiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==