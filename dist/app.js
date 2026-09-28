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
        bodyClass.bodyObject.classList.add(preferredTheme);
      } else if (bodyClass.userPrefersDarkTheme()) {
        bodyClass.bodyObject.setAttribute('data-theme', 'theme-moon');
        bodyClass.bodyObject.classList.add('theme-moon');
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
          }, 400);
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
      var isLandscape = function isLandscape() {
        return window.matchMedia('(orientation: landscape)').matches;
      };
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
        if (videoId && isLandscape()) {
          var videoUrl = 'https://player.vimeo.com/video/' + videoId + '?autoplay=1&autopause=0&muted=1&background=1';
          if (shadowColour) {
            style = 'background: ' + shadowColour;
          }
          div.innerHTML = '<iframe src="' + videoUrl + '" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="' + style + '"></iframe>';
          var _temp = bodyClass.bodyObject.firstChild;
          bodyClass.bodyObject.insertBefore(div, _temp);
          var video = document.createElement('video');
          document.body.classList.add('has-bg-image-loaded');
        } else if (imageURL) {
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
    document.querySelectorAll('.element sunnysideup__app__elements__workexample .image-container').forEach(function (el) {
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
  footerRange: 180,
  // in vh
  headerPct: 0,
  footerPct: 100,
  justScrolledDuration: 2200,
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

/***/ "../sun/src/js/scroll-to-content-below-quote.js":
/*!******************************************************!*\
  !*** ../sun/src/js/scroll-to-content-below-quote.js ***!
  \******************************************************/
/***/ (function() {

document.querySelectorAll('.shiner').forEach(function (el) {
  el.addEventListener('click', function (e) {
    e.preventDefault();
    var target = document.getElementById('content-below-quote');
    if (!target) return;
    var scrollTo = target.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2 - 35);
    window.scrollTo({
      top: scrollTo,
      behavior: 'smooth'
    });
  });
});

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

/***/ "../sun/src/js/work-example.js":
/*!*************************************!*\
  !*** ../sun/src/js/work-example.js ***!
  \*************************************/
/***/ (function() {

document.addEventListener('click', function (e) {
  var item = e.target.closest('.work-example-image');
  if (!item) return;
  item.classList.toggle('is-active');
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
/* harmony import */ var _js_scroll_to_content_below_quote__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/scroll-to-content-below-quote */ "../sun/src/js/scroll-to-content-below-quote.js");
/* harmony import */ var _js_scroll_to_content_below_quote__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_scroll_to_content_below_quote__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_toc__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/toc */ "../sun/src/js/toc.js");
/* harmony import */ var _js_toc__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_toc__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/collapsible-menu */ "../sun/src/js/collapsible-menu.js");
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_collapsible_menu__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _js_scroll_manager__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/scroll-manager */ "../sun/src/js/scroll-manager.js");
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/form */ "../sun/src/js/form.js");
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_form__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _js_work_example__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/work-example */ "../sun/src/js/work-example.js");
/* harmony import */ var _js_work_example__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_work_example__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/mouse-over-logo */ "../sun/src/js/mouse-over-logo.js");
/* harmony import */ var _js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/images */ "../sun/src/js/images.js");
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_js_images__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _js_image_hover__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./js/image-hover */ "../sun/src/js/image-hover.js");
/* harmony import */ var _js_image_hover__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_js_image_hover__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _js_print__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./js/print */ "../sun/src/js/print.js");
/* harmony import */ var _js_print__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_js_print__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _js_battery_saver__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./js/battery-saver */ "../sun/src/js/battery-saver.js");
/* harmony import */ var _js_battery_saver__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_js_battery_saver__WEBPACK_IMPORTED_MODULE_12__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLElBQU1BLFFBQVEsR0FBRyxTQUFYQSxRQUFRQSxDQUFJQyxRQUFRLEVBQUVDLE9BQU8sRUFBRUMsS0FBSyxFQUFLO0VBQzNDLElBQUlDLEtBQUs7RUFDVCxPQUFPLFVBQUFDLENBQUMsRUFBSTtJQUNSLElBQU1DLEtBQUssR0FBR0MsTUFBSTtJQUNsQixJQUFJSCxLQUFLLEVBQUVJLFlBQVksQ0FBQ0osS0FBSyxDQUFDO0lBQzlCQSxLQUFLLEdBQUdLLFVBQVUsQ0FBQyxZQUFNO01BQ3JCUixRQUFRLENBQUNTLElBQUksQ0FBQ1AsS0FBSyxJQUFJRyxLQUFLLEVBQUVELENBQUMsQ0FBQztJQUNwQyxDQUFDLEVBQUVILE9BQU8sQ0FBQztFQUNmLENBQUM7QUFDTCxDQUFDO0FBRUQsSUFBTVMsVUFBVSxHQUFHWCxRQUFRLENBQUMsWUFBWTtFQUNwQyxJQUFNWSxhQUFhLEdBQUdDLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLG1CQUFtQixDQUFDOztFQUVsRTtFQUNBRixhQUFhLENBQUNHLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07O0VBRXBDO0VBQ0FKLGFBQWEsQ0FBQ0ssZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQVk7SUFDaERMLGFBQWEsQ0FBQ0csS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtFQUN4QyxDQUFDLENBQUM7QUFDTixDQUFDLEVBQUUsS0FBSyxDQUFDO0FBRVRILFFBQVEsQ0FBQ0ksZ0JBQWdCLENBQUMsT0FBTyxFQUFFTixVQUFVLEVBQUUsS0FBSyxDQUFDO0FBQ3JERSxRQUFRLENBQUNJLGdCQUFnQixDQUFDLFFBQVEsRUFBRU4sVUFBVSxFQUFFLEtBQUssQ0FBQztBQUN0REUsUUFBUSxDQUFDSSxnQkFBZ0IsQ0FBQyxVQUFVLEVBQUVOLFVBQVUsRUFBRSxLQUFLLENBQUM7QUFFeERBLFVBQVUsQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzQjBCO0FBRS9CLElBQU1RLFNBQVMsR0FBRztFQUNyQkMsVUFBVSxFQUFFLElBQUk7RUFFaEJDLEtBQUssRUFBRSxFQUFFO0VBRVRDLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFBLEVBQWM7SUFDZEgsU0FBUyxDQUFDQyxVQUFVLEdBQUdQLFFBQVEsQ0FBQ1UsYUFBYSxDQUFDLE1BQU0sQ0FBQztJQUNyREosU0FBUyxDQUFDSyxvQkFBb0IsQ0FBQyxjQUFjLEVBQUUsS0FBSyxDQUFDOztJQUVyRDtJQUNBTCxTQUFTLENBQUNLLG9CQUFvQixDQUFDLGlCQUFpQixFQUFFLElBQUksQ0FBQztJQUN2RCxJQUFJLENBQUNILEtBQUs7SUFDTjtJQUNBRixTQUFTLENBQUNNLG9CQUFvQixDQUFDLENBQUM7SUFDcEM7SUFDQSxJQUFJLENBQUNDLFdBQVcsQ0FBQyxDQUFDO0lBQ2xCLElBQUksQ0FBQ0MsMEJBQTBCLENBQUMsQ0FBQztFQUNyQyxDQUFDO0VBRURDLGFBQWEsRUFBRSxTQUFmQSxhQUFhQSxDQUFBLEVBQWM7SUFDdkIsT0FBT1QsU0FBUyxDQUFDQyxVQUFVO0VBQy9CLENBQUM7RUFFRFMsUUFBUSxFQUFFLFNBQVZBLFFBQVFBLENBQUEsRUFBYztJQUNsQixPQUFPLElBQUlDLE1BQU0sQ0FBQ1gsU0FBUyxDQUFDQyxVQUFVLENBQUNXLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztFQUN0RSxDQUFDO0VBRURDLGlCQUFpQixFQUFFLFNBQW5CQSxpQkFBaUJBLENBQUEsRUFBYztJQUMzQixJQUNJYixTQUFTLENBQUNjLFVBQVUsQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUMvQmQsU0FBUyxDQUFDZSxXQUFXLENBQUMsQ0FBQyxLQUFLLEtBQUssRUFDbkM7TUFDRXJCLFFBQVEsQ0FBQ1UsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDWSxLQUFLLENBQUMsQ0FBQztJQUNsRDtFQUNKLENBQUM7RUFFRFIsMEJBQTBCLEVBQUUsU0FBNUJBLDBCQUEwQkEsQ0FBQSxFQUFjO0lBQ3BDUixTQUFTLENBQUNpQix5QkFBeUIsQ0FBQyxDQUFDO0lBQ3JDdkIsUUFBUSxDQUFDSSxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxVQUFVb0IsS0FBSyxFQUFFO01BQzNEbEIsU0FBUyxDQUFDQyxVQUFVLENBQUNrQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUM7TUFDakQsSUFBSSxjQUFjLElBQUkxQixRQUFRLENBQUMyQixlQUFlLEVBQUU7UUFDNUNyQixTQUFTLENBQUNDLFVBQVUsQ0FBQ2tCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLE9BQU8sQ0FBQztNQUMvQyxDQUFDLE1BQU07UUFDSHBCLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDa0IsU0FBUyxDQUFDQyxHQUFHLENBQUMsVUFBVSxDQUFDO01BQ2xEO0lBQ0osQ0FBQyxDQUFDO0lBQ0ZwQixTQUFTLENBQUNDLFVBQVUsQ0FBQ2tCLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLGVBQWUsQ0FBQztJQUN0RDtJQUNBO0lBQ0E7SUFDQUMsTUFBTSxDQUFDekIsZ0JBQWdCLENBQUMsVUFBVSxFQUFFLFlBQVk7TUFDNUNFLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDa0IsU0FBUyxDQUFDRyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQ3JELENBQUMsQ0FBQztFQUNOLENBQUM7RUFFRGhCLG9CQUFvQixFQUFFLFNBQXRCQSxvQkFBb0JBLENBQUEsRUFBYztJQUM5QixJQUFJa0IsSUFBSSxHQUFHeEIsU0FBUyxDQUFDeUIsY0FBYyxDQUFDLENBQUM7SUFDckMsSUFBSUMsY0FBYyxHQUFHLEVBQUU7SUFDdkIsSUFBSUYsSUFBSSxLQUFLLE9BQU8sRUFBRTtNQUNsQnpCLGdEQUFRLENBQUM0QixXQUFXLENBQUMsZ0JBQWdCLENBQUM7TUFDdEM7SUFDSixDQUFDLE1BQU0sSUFBSUgsSUFBSSxFQUFFO01BQ2IsSUFBSSxDQUFDSSxrQkFBa0IsQ0FBQ0osSUFBSSxDQUFDO0lBQ2pDO0lBQ0EsSUFBSUEsSUFBSSxLQUFLLFlBQVksSUFBSUEsSUFBSSxLQUFLLFdBQVcsRUFBRTtNQUMvQ0UsY0FBYyxHQUFHM0IsZ0RBQVEsQ0FBQzhCLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FBQztNQUNyRCxJQUFJSCxjQUFjLEVBQUU7UUFDaEIxQixTQUFTLENBQUNDLFVBQVUsQ0FBQzZCLFlBQVksQ0FBQyxZQUFZLEVBQUVKLGNBQWMsQ0FBQztRQUMvRDFCLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDa0IsU0FBUyxDQUFDQyxHQUFHLENBQUNNLGNBQWMsQ0FBQztNQUN0RCxDQUFDLE1BQU0sSUFBSTFCLFNBQVMsQ0FBQytCLG9CQUFvQixDQUFDLENBQUMsRUFBRTtRQUN6Qy9CLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDNkIsWUFBWSxDQUFDLFlBQVksRUFBRSxZQUFZLENBQUM7UUFDN0Q5QixTQUFTLENBQUNDLFVBQVUsQ0FBQ2tCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFlBQVksQ0FBQztNQUNwRDtJQUNKO0VBQ0osQ0FBQztFQUVEVyxvQkFBb0IsRUFBRSxTQUF0QkEsb0JBQW9CQSxDQUFBLEVBQWM7SUFDOUIsT0FDSVIsTUFBTSxDQUFDUyxVQUFVLElBQ2pCVCxNQUFNLENBQUNTLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDQyxPQUFPO0VBRWpFLENBQUM7RUFFREwsa0JBQWtCLEVBQUUsU0FBcEJBLGtCQUFrQkEsQ0FBWUosSUFBSSxFQUFFO0lBQ2hDQSxJQUFJLEdBQUdBLElBQUksQ0FBQ1UsSUFBSSxDQUFDLENBQUM7SUFDbEIsSUFBSVYsSUFBSSxDQUFDVyxNQUFNLEVBQUU7TUFDYixJQUFNQyxHQUFHLEdBQUcxQyxRQUFRLENBQUNDLGNBQWMsQ0FBQzZCLElBQUksQ0FBQztNQUN6QyxJQUFJWSxHQUFHLElBQUlBLEdBQUcsQ0FBQ2pCLFNBQVMsQ0FBQ2tCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFO1FBQ2pELElBQUksQ0FBQ0MsaUNBQWlDLENBQUNGLEdBQUcsQ0FBQztRQUMzQ3BDLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDa0IsU0FBUyxDQUFDQyxHQUFHLENBQUNJLElBQUksQ0FBQztRQUN4QyxPQUFPLElBQUk7TUFDZjtJQUNKO0lBQ0EsT0FBTyxLQUFLO0VBQ2hCLENBQUM7RUFFRG5CLG9CQUFvQixFQUFFLFNBQXRCQSxvQkFBb0JBLENBQVlrQyxXQUFXLEVBQUVDLE9BQU8sRUFBRTtJQUNsRDlDLFFBQVEsQ0FDSCtDLGdCQUFnQixDQUFDRixXQUFXLENBQUMsQ0FDN0JHLE9BQU8sQ0FBQyxVQUFVQyxhQUFhLEVBQUU7TUFDOUJBLGFBQWEsQ0FBQzdDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFVb0IsS0FBSyxFQUFFO1FBQ3JEbEIsU0FBUyxDQUFDNEMscUJBQXFCLENBQzNCRCxhQUFhLEVBQ2J6QixLQUFLLEVBQ0xzQixPQUNKLENBQUM7UUFDRCxJQUFJRCxXQUFXLEtBQUssY0FBYyxFQUFFO1VBQ2hDO1VBQ0FoQixNQUFNLENBQUNqQyxVQUFVLENBQUMsWUFBWTtZQUMxQlUsU0FBUyxDQUFDQyxVQUFVLENBQUNrQixTQUFTLENBQUMwQixNQUFNLENBQUMsV0FBVyxDQUFDO1VBQ3RELENBQUMsRUFBRSxHQUFHLENBQUM7UUFDWDtRQUNBLE9BQU8sS0FBSztNQUNoQixDQUFDLENBQUM7SUFDTixDQUFDLENBQUM7RUFDVixDQUFDO0VBRUR0QyxXQUFXLEVBQUUsU0FBYkEsV0FBV0EsQ0FBQSxFQUFjO0lBQ3JCZ0IsTUFBTSxDQUFDakMsVUFBVSxDQUFDLFlBQVk7TUFDMUIsSUFBTWtDLElBQUksR0FBR3hCLFNBQVMsQ0FBQ3lCLGNBQWMsQ0FBQyxDQUFDO01BQ3ZDLElBQUlELElBQUksSUFBSTlCLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDNkIsSUFBSSxDQUFDLEVBQUU7UUFDdkM5QixRQUFRLENBQUNVLGFBQWEsQ0FBQyxHQUFHLEdBQUdvQixJQUFJLENBQUMsQ0FBQ3NCLGNBQWMsQ0FBQztVQUM5Q0MsUUFBUSxFQUFFLFFBQVE7VUFBRTtVQUNwQkMsS0FBSyxFQUFFLE9BQU8sQ0FBQztRQUNuQixDQUFDLENBQUM7TUFDTjtJQUNKLENBQUMsRUFBRSxHQUFHLENBQUM7RUFDWCxDQUFDO0VBRURKLHFCQUFxQixFQUFFLFNBQXZCQSxxQkFBcUJBLENBQVlELGFBQWEsRUFBRXpCLEtBQUssRUFBRXNCLE9BQU8sRUFBRVMsUUFBUSxFQUFFO0lBQ3RFL0IsS0FBSyxDQUFDZ0MsY0FBYyxDQUFDLENBQUM7SUFFdEJsRCxTQUFTLENBQUNzQyxpQ0FBaUMsQ0FBQ0ssYUFBYSxDQUFDO0lBRTFELElBQUlRLFdBQVcsR0FBRyxFQUFFO0lBQ3BCLElBQUlDLEVBQUUsR0FBRyxFQUFFO0lBQ1gsSUFBSVQsYUFBYSxDQUFDVSxZQUFZLENBQUMsZ0JBQWdCLENBQUMsRUFBRTtNQUM5Q0YsV0FBVyxHQUFHUixhQUFhLENBQUMvQixZQUFZLENBQUMsZ0JBQWdCLENBQUM7SUFDOUQsQ0FBQyxNQUFNO01BQ0h1QyxXQUFXLEdBQUdSLGFBQWEsQ0FBQy9CLFlBQVksQ0FBQyxJQUFJLENBQUM7TUFDOUN3QyxFQUFFLEdBQUdELFdBQVc7SUFDcEI7SUFDQSxJQUFJUixhQUFhLENBQUNVLFlBQVksQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFO01BQzNEckQsU0FBUyxDQUFDQyxVQUFVLENBQUNrQixTQUFTLENBQUMwQixNQUFNLENBQUNNLFdBQVcsQ0FBQztJQUN0RCxDQUFDLE1BQU07TUFDSG5ELFNBQVMsQ0FBQ0MsVUFBVSxDQUFDa0IsU0FBUyxDQUFDQyxHQUFHLENBQUMrQixXQUFXLENBQUM7SUFDbkQ7SUFFQSxJQUFJWCxPQUFPLEVBQUU7TUFDVHpDLGdEQUFRLENBQUN1RCxTQUFTLENBQUMsZ0JBQWdCLEVBQUVILFdBQVcsRUFBRSxFQUFFLENBQUM7TUFDckRuRCxTQUFTLENBQUNDLFVBQVUsQ0FBQzZCLFlBQVksQ0FBQyxZQUFZLEVBQUVxQixXQUFXLENBQUM7TUFDNURuRCxTQUFTLENBQUNFLEtBQUssR0FBR2lELFdBQVc7SUFDakM7SUFDQSxJQUFJQyxFQUFFLElBQUlILFFBQVEsRUFBRTtNQUNoQixJQUFJekIsSUFBSSxHQUFHeEIsU0FBUyxDQUFDdUQsaUJBQWlCLENBQUNILEVBQUUsQ0FBQztNQUMxQyxJQUFJNUIsSUFBSSxDQUFDVyxNQUFNLEVBQUU7UUFDYlgsSUFBSSxHQUFHQSxJQUFJLENBQUNnQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztRQUM1QmpDLE1BQU0sQ0FBQ2tDLFFBQVEsQ0FBQ2pDLElBQUksR0FBRyxHQUFHLEdBQUdBLElBQUk7TUFDckM7SUFDSjtFQUNKLENBQUM7RUFFRGMsaUNBQWlDLEVBQUUsU0FBbkNBLGlDQUFpQ0EsQ0FBWW9CLE1BQU0sRUFBRTtJQUNqRCxJQUFJQSxNQUFNLENBQUNMLFlBQVksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFO01BQzFDLElBQU1NLE1BQU0sR0FBR0QsTUFBTSxDQUFDOUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDO01BQ3ZELElBQU1nRCxPQUFPLEdBQUc1RCxTQUFTLENBQUM2RCxrQkFBa0IsQ0FBQ0YsTUFBTSxDQUFDO01BQ3BELEtBQUssSUFBSUcsQ0FBQyxHQUFHLENBQUMsRUFBRUMsR0FBRyxHQUFHSCxPQUFPLENBQUN6QixNQUFNLEVBQUUyQixDQUFDLEdBQUdDLEdBQUcsRUFBRUQsQ0FBQyxFQUFFLEVBQUU7UUFDaEQsSUFBTUUsS0FBSyxHQUFHSixPQUFPLENBQUNFLENBQUMsQ0FBQztRQUN4QjlELFNBQVMsQ0FBQ0MsVUFBVSxDQUFDa0IsU0FBUyxDQUFDRyxNQUFNLENBQUMwQyxLQUFLLENBQUM7TUFDaEQ7SUFDSjtFQUNKLENBQUM7RUFFREgsa0JBQWtCLEVBQUUsU0FBcEJBLGtCQUFrQkEsQ0FBWUYsTUFBTSxFQUFFO0lBQ2xDLElBQU1NLEtBQUssR0FBR04sTUFBTSxDQUFDTyxLQUFLLENBQUMsR0FBRyxDQUFDO0lBQy9CLElBQU1DLFFBQVEsR0FBRyxFQUFFO0lBQ25CLEtBQUssSUFBSUwsQ0FBQyxHQUFHLENBQUMsRUFBRUMsR0FBRyxHQUFHRSxLQUFLLENBQUM5QixNQUFNLEVBQUUyQixDQUFDLEdBQUdDLEdBQUcsRUFBRUQsQ0FBQyxFQUFFLEVBQUU7TUFDOUMsSUFBTUUsS0FBSyxHQUFHQyxLQUFLLENBQUNILENBQUMsQ0FBQyxDQUFDNUIsSUFBSSxDQUFDLENBQUM7TUFDN0IsSUFBSThCLEtBQUssRUFBRTtRQUNQRyxRQUFRLENBQUNDLElBQUksQ0FBQ0osS0FBSyxDQUFDO01BQ3hCO0lBQ0o7SUFDQSxPQUFPRyxRQUFRO0VBQ25CLENBQUM7RUFFRDFDLGNBQWMsRUFBRSxTQUFoQkEsY0FBY0EsQ0FBQSxFQUFjO0lBQ3hCLElBQU1rQyxNQUFNLEdBQUdwQyxNQUFNLENBQUNrQyxRQUFRLENBQUNqQyxJQUFJO0lBQ25DLE9BQU94QixTQUFTLENBQUN1RCxpQkFBaUIsQ0FBQ0ksTUFBTSxDQUFDO0VBQzlDLENBQUM7RUFFREosaUJBQWlCLEVBQUUsU0FBbkJBLGlCQUFpQkEsQ0FBWUksTUFBTSxFQUFFO0lBQ2pDQSxNQUFNLEdBQUdoRCxNQUFNLENBQUNnRCxNQUFNLENBQUM7SUFDdkIsT0FBTzNELFNBQVMsQ0FBQ3FFLG9CQUFvQixDQUFDVixNQUFNLENBQUM7RUFDakQsQ0FBQztFQUVEVSxvQkFBb0IsRUFBRSxTQUF0QkEsb0JBQW9CQSxDQUFZVixNQUFNLEVBQUU7SUFDcEMsT0FBT0EsTUFBTSxDQUFDSCxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztFQUNsQyxDQUFDO0VBRUR2Qyx5QkFBeUIsRUFBRSxTQUEzQkEseUJBQXlCQSxDQUFBLEVBQWM7SUFDbkMsSUFBSWpCLFNBQVMsQ0FBQ3NFLGFBQWEsQ0FBQyxDQUFDLEtBQUssSUFBSSxFQUFFO01BQUEsSUFBQUMscUJBQUEsRUFBQUMsc0JBQUE7TUFDcEMsSUFBTUMsT0FBTyxHQUFHekUsU0FBUyxDQUFDQyxVQUFVLENBQUNXLFlBQVksQ0FBQyxlQUFlLENBQUM7TUFDbEUsSUFBTThELFdBQVcsR0FBRyxTQUFkQSxXQUFXQSxDQUFBO1FBQUEsT0FDYm5ELE1BQU0sQ0FBQ1MsVUFBVSxDQUFDLDBCQUEwQixDQUFDLENBQUNDLE9BQU87TUFBQTtNQUN6RCxJQUFNMEMsUUFBUSxHQUFHM0UsU0FBUyxDQUFDQyxVQUFVLENBQUNXLFlBQVksQ0FBQyxlQUFlLENBQUM7TUFDbkUsSUFBTWdFLE1BQU0sSUFBQUwscUJBQUEsR0FDUnZFLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDVyxZQUFZLENBQUMsaUJBQWlCLENBQUMsY0FBQTJELHFCQUFBLGNBQUFBLHFCQUFBLEdBQUksS0FBSztNQUNqRSxJQUFNTSxNQUFNLElBQUFMLHNCQUFBLEdBQ1J4RSxTQUFTLENBQUNDLFVBQVUsQ0FBQ1csWUFBWSxDQUFDLGlCQUFpQixDQUFDLGNBQUE0RCxzQkFBQSxjQUFBQSxzQkFBQSxHQUFJLEtBQUs7O01BRWpFO01BQ0EsSUFBSUMsT0FBTyxJQUFJRSxRQUFRLEVBQUU7UUFDckIsSUFBSS9FLEtBQUssR0FBRyxFQUFFO1FBQ2QsSUFBTWtGLEdBQUcsR0FBR3BGLFFBQVEsQ0FBQ3FGLGFBQWEsQ0FBQyxLQUFLLENBQUM7UUFDekNELEdBQUcsQ0FBQzFCLEVBQUUsR0FBRyxpQkFBaUI7UUFDMUIsSUFBTTRCLE1BQU0sR0FBR2hGLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDVyxZQUFZLENBQzVDLHVCQUNKLENBQUM7UUFDRCxJQUFJcUUsWUFBWSxHQUFHLEVBQUU7UUFDckIsSUFBSUQsTUFBTSxLQUFLLE1BQU0sRUFBRTtVQUNuQkMsWUFBWSxHQUNSLHlEQUF5RDtRQUNqRSxDQUFDLE1BQU0sSUFBSUQsTUFBTSxLQUFLLE9BQU8sRUFBRTtVQUMzQkMsWUFBWSxHQUNSLHlEQUF5RDtRQUNqRTtRQUNBLElBQUlSLE9BQU8sSUFBSUMsV0FBVyxDQUFDLENBQUMsRUFBRTtVQUMxQixJQUFNUSxRQUFRLEdBQ1YsaUNBQWlDLEdBQ2pDVCxPQUFPLEdBQ1AsOENBQThDO1VBQ2xELElBQUlRLFlBQVksRUFBRTtZQUNkckYsS0FBSyxHQUFHLGNBQWMsR0FBR3FGLFlBQVk7VUFDekM7VUFDQUgsR0FBRyxDQUFDSyxTQUFTLEdBQ1QsZUFBZSxHQUNmRCxRQUFRLEdBQ1Isd0VBQXdFLEdBQ3hFdEYsS0FBSyxHQUNMLGFBQWE7VUFDakIsSUFBTXdGLEtBQUksR0FBR3BGLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDb0YsVUFBVTtVQUM1Q3JGLFNBQVMsQ0FBQ0MsVUFBVSxDQUFDcUYsWUFBWSxDQUFDUixHQUFHLEVBQUVNLEtBQUksQ0FBQztVQUM1QyxJQUFNRyxLQUFLLEdBQUc3RixRQUFRLENBQUNxRixhQUFhLENBQUMsT0FBTyxDQUFDO1VBQzdDckYsUUFBUSxDQUFDOEYsSUFBSSxDQUFDckUsU0FBUyxDQUFDQyxHQUFHLENBQUMscUJBQXFCLENBQUM7UUFDdEQsQ0FBQyxNQUFNLElBQUl1RCxRQUFRLEVBQUU7VUFDakIvRSxLQUFLLEdBQUcsTUFBTSxHQUFHK0UsUUFBUSxHQUFHLEdBQUc7VUFDL0IsSUFBSU0sWUFBWSxFQUFFO1lBQ2RyRixLQUFLLEdBQUdxRixZQUFZLEdBQUcsR0FBRyxHQUFHckYsS0FBSztVQUN0QztVQUNBa0YsR0FBRyxDQUFDbEYsS0FBSyxDQUFDNkYsZUFBZSxHQUFHN0YsS0FBSztVQUNqQ2tGLEdBQUcsQ0FBQ2xGLEtBQUssQ0FBQzhGLGtCQUFrQixHQUFHZCxNQUFNLEdBQUcsR0FBRyxHQUFHQyxNQUFNO1VBRXBELElBQU1jLEdBQUcsR0FBRyxJQUFJQyxLQUFLLENBQUMsQ0FBQztVQUN2QkQsR0FBRyxDQUFDRSxNQUFNLEdBQUcsWUFBWTtZQUNyQm5HLFFBQVEsQ0FBQzhGLElBQUksQ0FBQ3JFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLHFCQUFxQixDQUFDO1VBQ3RELENBQUM7VUFDRHVFLEdBQUcsQ0FBQ0csT0FBTyxHQUFHLFlBQVk7WUFDdEJwRyxRQUFRLENBQUM4RixJQUFJLENBQUNyRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFDO1VBQ3ZELENBQUM7VUFDRHVFLEdBQUcsQ0FBQ0ksR0FBRyxHQUFHcEIsUUFBUTtRQUN0QjtRQUNBRyxHQUFHLENBQUMzRCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztRQUN0QyxJQUFNZ0UsSUFBSSxHQUFHcEYsU0FBUyxDQUFDQyxVQUFVLENBQUNvRixVQUFVO1FBQzVDckYsU0FBUyxDQUFDQyxVQUFVLENBQUNxRixZQUFZLENBQUNSLEdBQUcsRUFBRU0sSUFBSSxDQUFDO01BQ2hEO0lBQ0osQ0FBQyxNQUFNO01BQ0g7SUFBQTtFQUVSLENBQUM7RUFFRHRFLFVBQVUsRUFBRSxTQUFaQSxVQUFVQSxDQUFBLEVBQWM7SUFDcEIsT0FBT1MsTUFBTSxDQUFDa0MsUUFBUSxDQUFDdUMsUUFBUSxLQUFLLEdBQUc7RUFDM0MsQ0FBQztFQUVEakYsV0FBVyxFQUFFLFNBQWJBLFdBQVdBLENBQUEsRUFBYztJQUNyQixPQUFPUSxNQUFNLENBQUNrQyxRQUFRLENBQUNqQyxJQUFJLEtBQUssRUFBRTtFQUN0QyxDQUFDO0VBRUQ4QyxhQUFhLEVBQUUsU0FBZkEsYUFBYUEsQ0FBQSxFQUFjO0lBQ3ZCLE9BQU90RSxTQUFTLENBQUNDLFVBQVUsQ0FBQ2tCLFNBQVMsQ0FBQ2tCLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUMxRCxLQUFLLEdBQ0wsSUFBSTtFQUNkO0FBQ0osQ0FBQztBQUVEckMsU0FBUyxDQUFDRyxJQUFJLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7O0FDL1JoQixJQUFNOEYsZ0JBQWdCLEdBQUksWUFBTTtFQUM1QixTQUFTQyxLQUFLQSxDQUFBLEVBQUk7SUFDZHhHLFFBQVEsQ0FBQytDLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFBeUQsSUFBSSxFQUFJO01BQzVEQyxPQUFPLENBQUNELElBQUksQ0FBQztNQUNiRSxhQUFhLENBQUNGLElBQUksQ0FBQztJQUN2QixDQUFDLENBQUM7RUFDTjtFQUVBLFNBQVNDLE9BQU9BLENBQUVELElBQUksRUFBRTtJQUNwQkEsSUFBSSxDQUFDMUQsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFBNEQsRUFBRSxFQUFJO01BQ3RDLElBQU1DLE9BQU8sR0FBR0QsRUFBRSxDQUFDbEcsYUFBYSxDQUFDLGFBQWEsQ0FBQztNQUMvQyxJQUFJLENBQUNtRyxPQUFPLEVBQUU7O01BRWQ7TUFDQSxJQUFNQyxJQUFJLEdBQUc5RyxRQUFRLENBQUNxRixhQUFhLENBQUMsTUFBTSxDQUFDO01BQzNDeUIsSUFBSSxDQUFDQyxTQUFTLEdBQUcsWUFBWTtNQUM3QkQsSUFBSSxDQUFDckIsU0FBUyxHQUFHLDhDQUE4QztNQUMvRHFCLElBQUksQ0FBQzFHLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUFBLE9BQU0rQyxNQUFNLENBQUN5RCxFQUFFLENBQUM7TUFBQSxFQUFDO01BRWhEQSxFQUFFLENBQUNoQixZQUFZLENBQUNrQixJQUFJLEVBQUVELE9BQU8sQ0FBQzs7TUFFOUI7TUFDQUQsRUFBRSxDQUFDbkYsU0FBUyxDQUFDQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7TUFDekNtRixPQUFPLENBQUMzRyxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNOztNQUU5QjtNQUNBLElBQ0l5RyxFQUFFLENBQUNuRixTQUFTLENBQUNrQixRQUFRLENBQUMsU0FBUyxDQUFDLElBQ2hDaUUsRUFBRSxDQUFDbkYsU0FBUyxDQUFDa0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUNsQztRQUNFcUUsSUFBSSxDQUFDSixFQUFFLENBQUM7TUFDWjtJQUNKLENBQUMsQ0FBQztFQUNOO0VBRUEsU0FBU3pELE1BQU1BLENBQUV5RCxFQUFFLEVBQUU7SUFDakIsSUFBSUEsRUFBRSxDQUFDbkYsU0FBUyxDQUFDa0IsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEVBQUU7TUFDOUNzRSxLQUFLLENBQUNMLEVBQUUsQ0FBQztJQUNiLENBQUMsTUFBTTtNQUNISSxJQUFJLENBQUNKLEVBQUUsQ0FBQztJQUNaO0VBQ0o7RUFFQSxTQUFTSSxJQUFJQSxDQUFFSixFQUFFLEVBQUU7SUFDZkEsRUFBRSxDQUFDbkYsU0FBUyxDQUFDRyxNQUFNLENBQUMsdUJBQXVCLENBQUM7SUFDNUNnRixFQUFFLENBQUNuRixTQUFTLENBQUNDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztJQUV2QyxJQUFNd0YsUUFBUSxHQUFHTixFQUFFLENBQUNsRyxhQUFhLENBQUMsYUFBYSxDQUFDO0lBQ2hELElBQUl3RyxRQUFRLEVBQUVBLFFBQVEsQ0FBQ2hILEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE9BQU87O0lBRTlDO0lBQ0EsSUFBSStHLFFBQVEsRUFBRTtNQUNWQSxRQUFRLENBQUNuRSxnQkFBZ0IsQ0FBQyxXQUFXLENBQUMsQ0FBQ0MsT0FBTyxDQUFDLFVBQUFtRSxRQUFRLEVBQUk7UUFDdkQsSUFBTUMsUUFBUSxHQUFHRCxRQUFRLENBQUNFLGFBQWE7UUFDdkNELFFBQVEsQ0FBQzNGLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLHFCQUFxQixDQUFDO1FBQ2hEd0YsUUFBUSxDQUFDM0YsU0FBUyxDQUFDQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7UUFDL0N5RixRQUFRLENBQUNqSCxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO01BQ25DLENBQUMsQ0FBQztJQUNOOztJQUVBO0lBQ0EsSUFBTW1ILFVBQVUsR0FBR1YsRUFBRSxDQUFDUyxhQUFhO0lBQ25DQyxVQUFVLENBQ0x2RSxnQkFBZ0IsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUNuREMsT0FBTyxDQUFDLFVBQUF1RSxPQUFPLEVBQUk7TUFDaEIsSUFBSUEsT0FBTyxLQUFLWCxFQUFFLEVBQUU7UUFDaEJLLEtBQUssQ0FBQ00sT0FBTyxDQUFDO01BQ2xCO0lBQ0osQ0FBQyxDQUFDO0lBRU5DLGdCQUFnQixDQUFDWixFQUFFLENBQUM7SUFDcEJELGFBQWEsQ0FBQ0MsRUFBRSxDQUFDYSxPQUFPLENBQUMsa0JBQWtCLENBQUMsQ0FBQztFQUNqRDtFQUVBLFNBQVNSLEtBQUtBLENBQUVMLEVBQUUsRUFBRTtJQUNoQkEsRUFBRSxDQUFDbkYsU0FBUyxDQUFDRyxNQUFNLENBQUMscUJBQXFCLENBQUM7SUFDMUNnRixFQUFFLENBQUNuRixTQUFTLENBQUNDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztJQUV6QyxJQUFNbUYsT0FBTyxHQUFHRCxFQUFFLENBQUNsRyxhQUFhLENBQUMsYUFBYSxDQUFDO0lBQy9DLElBQUltRyxPQUFPLEVBQUVBLE9BQU8sQ0FBQzNHLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07SUFFM0NxSCxnQkFBZ0IsQ0FBQ1osRUFBRSxDQUFDO0lBQ3BCRCxhQUFhLENBQUNDLEVBQUUsQ0FBQ2EsT0FBTyxDQUFDLGtCQUFrQixDQUFDLENBQUM7RUFDakQ7RUFFQSxTQUFTRCxnQkFBZ0JBLENBQUVaLEVBQUUsRUFBRTtJQUMzQixJQUFNVSxVQUFVLEdBQUdWLEVBQUUsQ0FBQ1MsYUFBYTtJQUNuQyxJQUFJLENBQUNDLFVBQVUsQ0FBQzdGLFNBQVMsQ0FBQ2tCLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO0lBRXZELElBQU0rRSxRQUFRLEdBQUdKLFVBQVUsQ0FBQ3ZFLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUMzRCxJQUFNNEUsTUFBTSxHQUFHZixFQUFFLENBQUNuRixTQUFTLENBQUNrQixRQUFRLENBQUMscUJBQXFCLENBQUM7SUFFM0QrRSxRQUFRLENBQUMxRSxPQUFPLENBQUMsVUFBQTRFLEdBQUc7TUFBQSxPQUFJQSxHQUFHLENBQUNuRyxTQUFTLENBQUNHLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztJQUFBLEVBQUM7SUFFdkUsSUFBSStGLE1BQU0sRUFBRTtNQUNSRCxRQUFRLENBQUMxRSxPQUFPLENBQUMsVUFBQTRFLEdBQUcsRUFBSTtRQUNwQixJQUFJQSxHQUFHLEtBQUtoQixFQUFFLEVBQUVnQixHQUFHLENBQUNuRyxTQUFTLENBQUNDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztNQUMvRCxDQUFDLENBQUM7SUFDTjtFQUNKO0VBRUEsU0FBU2lGLGFBQWFBLENBQUVGLElBQUksRUFBRTtJQUMxQixJQUFJLENBQUNBLElBQUksRUFBRTtJQUNYLElBQU1vQixHQUFHLEdBQUdwQixJQUFJLENBQUMvRixhQUFhLENBQUMsc0JBQXNCLENBQUM7SUFDdEQrRixJQUFJLENBQUNoRixTQUFTLENBQUMwQixNQUFNLENBQUMsd0JBQXdCLEVBQUUsQ0FBQyxDQUFDMEUsR0FBRyxDQUFDO0VBQzFEO0VBRUEsT0FBTztJQUFFckIsS0FBSyxFQUFMQTtFQUFNLENBQUM7QUFDcEIsQ0FBQyxDQUFFLENBQUM7QUFFSkQsZ0JBQWdCLENBQUNDLEtBQUssQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7OztBQzlHeEIsSUFBTW5HLFFBQVEsR0FBRztFQUVmdUQsU0FBUyxFQUFFLFNBQVhBLFNBQVNBLENBQVlrRSxJQUFJLEVBQUV4RCxLQUFLLEVBQUV5RCxJQUFJLEVBQUU7SUFDdEMsSUFBSUMsT0FBTyxHQUFHLEVBQUU7SUFDaEIsSUFBSSxPQUFPRCxJQUFJLEtBQUssV0FBVyxFQUFFO01BQy9CQSxJQUFJLEdBQUcsRUFBRTtJQUNYO0lBQ0EsSUFBSUEsSUFBSSxFQUFFO01BQ1IsSUFBSUUsSUFBSSxHQUFHLElBQUlDLElBQUksQ0FBQyxDQUFDO01BQ3JCRCxJQUFJLENBQUNFLE9BQU8sQ0FBQ0YsSUFBSSxDQUFDRyxPQUFPLENBQUMsQ0FBQyxHQUFJTCxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSyxDQUFDO01BQzNEQyxPQUFPLEdBQUcsWUFBWSxHQUFHQyxJQUFJLENBQUNJLFdBQVcsQ0FBQyxDQUFDO0lBQzdDO0lBQ0FySSxRQUFRLENBQUNzSSxNQUFNLEdBQUdSLElBQUksR0FBRyxHQUFHLElBQUl4RCxLQUFLLElBQUksRUFBRSxDQUFDLEdBQUcwRCxPQUFPLEdBQUcsVUFBVTtFQUNyRSxDQUFDO0VBRUQ3RixTQUFTLEVBQUUsU0FBWEEsU0FBU0EsQ0FBWTJGLElBQUksRUFBRTtJQUN6QixJQUFJUyxNQUFNLEdBQUdULElBQUksR0FBRyxHQUFHO0lBQ3ZCLElBQUlVLEVBQUUsR0FBR3hJLFFBQVEsQ0FBQ3NJLE1BQU0sQ0FBQzlELEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDbkMsS0FBSyxJQUFJSixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUdvRSxFQUFFLENBQUMvRixNQUFNLEVBQUUyQixDQUFDLEVBQUUsRUFBRTtNQUNsQyxJQUFJcUUsQ0FBQyxHQUFHRCxFQUFFLENBQUNwRSxDQUFDLENBQUM7TUFDYixPQUFPcUUsQ0FBQyxDQUFDQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1FBQzFCRCxDQUFDLEdBQUdBLENBQUMsQ0FBQ0UsU0FBUyxDQUFDLENBQUMsRUFBRUYsQ0FBQyxDQUFDaEcsTUFBTSxDQUFDO01BQzlCO01BQ0EsSUFBSWdHLENBQUMsQ0FBQ0csT0FBTyxDQUFDTCxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDM0IsT0FBT0UsQ0FBQyxDQUFDRSxTQUFTLENBQUNKLE1BQU0sQ0FBQzlGLE1BQU0sRUFBRWdHLENBQUMsQ0FBQ2hHLE1BQU0sQ0FBQztNQUM3QztJQUNGO0lBQ0EsT0FBTyxJQUFJO0VBQ2IsQ0FBQztFQUVEUixXQUFXLEVBQUUsU0FBYkEsV0FBV0EsQ0FBWTZGLElBQUksRUFBRTtJQUMzQnpILFFBQVEsQ0FBQ3VELFNBQVMsQ0FBQ2tFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0VBQ25DO0FBQ0YsQ0FBQzs7Ozs7Ozs7Ozs7QUNqQ0QsSUFBSWUsVUFBVSxHQUFHN0ksUUFBUSxDQUFDK0MsZ0JBQWdCLENBQ3hDLHlCQUNGLENBQUM7QUFDRCxLQUFLLElBQUkrRixDQUFDLEdBQUdELFVBQVUsQ0FBQ3BHLE1BQU0sR0FBRyxDQUFDLEVBQUVxRyxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUVBLENBQUMsRUFBRTtFQUMvQ0QsVUFBVSxDQUFDQyxDQUFDLENBQUMsQ0FBQzFJLGdCQUFnQixDQUFDLFFBQVEsRUFBRTJJLGFBQWEsRUFBRSxLQUFLLENBQUM7RUFDOURGLFVBQVUsQ0FBQ0MsQ0FBQyxDQUFDLENBQUMxSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUySSxhQUFhLEVBQUUsS0FBSyxDQUFDO0VBQzdERixVQUFVLENBQUNDLENBQUMsQ0FBQyxDQUFDMUksZ0JBQWdCLENBQUMsT0FBTyxFQUFFMkksYUFBYSxFQUFFLEtBQUssQ0FBQztFQUM3REYsVUFBVSxDQUFDQyxDQUFDLENBQUMsQ0FBQzFJLGdCQUFnQixDQUFDLE1BQU0sRUFBRTJJLGFBQWEsRUFBRSxLQUFLLENBQUM7RUFDNURGLFVBQVUsQ0FBQ0MsQ0FBQyxDQUFDLENBQUMxSSxnQkFBZ0IsQ0FBQyxXQUFXLEVBQUUySSxhQUFhLEVBQUUsS0FBSyxDQUFDO0VBRWpFLElBQUlDLEdBQUcsR0FBR2hKLFFBQVEsQ0FBQ2lKLFdBQVcsQ0FBQyxZQUFZLENBQUM7RUFDNUNELEdBQUcsQ0FBQ0UsU0FBUyxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDO0VBQ3BDTCxVQUFVLENBQUNDLENBQUMsQ0FBQyxDQUFDSyxhQUFhLENBQUNILEdBQUcsQ0FBQztBQUNsQztBQUVBLFNBQVNELGFBQWFBLENBQUVLLE1BQU0sRUFBRTtFQUM5QixJQUFJQyxNQUFNLEdBQUdELE1BQU0sQ0FBQ0UsTUFBTSxDQUFDaEYsS0FBSztFQUNoQyxJQUFJK0UsTUFBTSxJQUFJQSxNQUFNLENBQUN2RixPQUFPLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxFQUFFO0lBQzlDc0YsTUFBTSxDQUFDRSxNQUFNLENBQUM3SCxTQUFTLENBQUNHLE1BQU0sQ0FBQyxVQUFVLENBQUM7RUFDNUMsQ0FBQyxNQUFNO0lBQ0x3SCxNQUFNLENBQUNFLE1BQU0sQ0FBQzdILFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFVBQVUsQ0FBQztFQUN6QztBQUNGLEM7Ozs7Ozs7Ozs7QUN0QkEsSUFBTTZILFVBQVUsR0FBRztFQUNmQyxZQUFZLEVBQUUsSUFBSTtFQUVsQi9JLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFBLEVBQWM7SUFBQSxJQUFBbkIsS0FBQTtJQUNkVSxRQUFRLENBQ0grQyxnQkFBZ0IsQ0FDYixtRUFDSixDQUFDLENBQ0FDLE9BQU8sQ0FBQyxVQUFBeUcsRUFBRSxFQUFJO01BQ1hBLEVBQUUsQ0FBQ3JKLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxVQUFBWixDQUFDLEVBQUk7UUFDbEMsSUFBSUYsS0FBSSxDQUFDb0ssYUFBYSxDQUFDLENBQUMsRUFBRTtVQUN0Qi9KLFlBQVksQ0FBQ0wsS0FBSSxDQUFDa0ssWUFBWSxDQUFDO1FBQ25DO1FBRUEsSUFBQUcscUJBQUEsR0FDSW5LLENBQUMsQ0FBQzhKLE1BQU0sQ0FBQ00scUJBQXFCLENBQUMsQ0FBQztVQUQ1QkMsS0FBSyxHQUFBRixxQkFBQSxDQUFMRSxLQUFLO1VBQUVDLE1BQU0sR0FBQUgscUJBQUEsQ0FBTkcsTUFBTTtVQUFFQyxJQUFJLEdBQUFKLHFCQUFBLENBQUpJLElBQUk7VUFBRUMsR0FBRyxHQUFBTCxxQkFBQSxDQUFISyxHQUFHO1FBRWhDLElBQU1DLENBQUMsR0FBR3pLLENBQUMsQ0FBQzBLLEtBQUssR0FBR0gsSUFBSSxHQUFHbEksTUFBTSxDQUFDc0ksT0FBTztRQUN6QyxJQUFNQyxDQUFDLEdBQUc1SyxDQUFDLENBQUM2SyxLQUFLLEdBQUdMLEdBQUcsR0FBR25JLE1BQU0sQ0FBQ3lJLE9BQU87UUFFeEM5SyxDQUFDLENBQUM4SixNQUFNLENBQUNwSixLQUFLLENBQUNxSyxXQUFXLENBQ3RCLFdBQVcsRUFDVk4sQ0FBQyxHQUFHSixLQUFLLEdBQUksRUFBRSxHQUFHLEVBQ3ZCLENBQUM7UUFDRHJLLENBQUMsQ0FBQzhKLE1BQU0sQ0FBQ3BKLEtBQUssQ0FBQ3FLLFdBQVcsQ0FDdEIsV0FBVyxFQUNYLEVBQUUsR0FBSUgsQ0FBQyxHQUFHTixNQUFNLEdBQUksRUFDeEIsQ0FBQztRQUVELElBQUl4SyxLQUFJLENBQUNvSyxhQUFhLENBQUMsQ0FBQyxFQUFFO1VBQ3RCcEssS0FBSSxDQUFDa0ssWUFBWSxHQUFHNUosVUFBVSxDQUFDLFlBQU07WUFDakNKLENBQUMsQ0FBQzhKLE1BQU0sQ0FBQ3BKLEtBQUssQ0FBQ3NLLGNBQWMsQ0FBQyxXQUFXLENBQUM7WUFDMUNoTCxDQUFDLENBQUM4SixNQUFNLENBQUNwSixLQUFLLENBQUNzSyxjQUFjLENBQUMsV0FBVyxDQUFDO1VBQzlDLENBQUMsRUFBRSxJQUFJLENBQUM7UUFDWjtNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQztFQUNWLENBQUM7RUFDREMsZ0JBQWdCLEVBQUUsSUFBSTtFQUV0QmYsYUFBYSxFQUFFLFNBQWZBLGFBQWFBLENBQUEsRUFBYztJQUN2QixJQUFJLElBQUksQ0FBQ2UsZ0JBQWdCLEtBQUssSUFBSSxFQUFFO01BQ2hDLElBQUksQ0FBQ0EsZ0JBQWdCLEdBQ2pCLGNBQWMsSUFBSXpLLFFBQVEsQ0FBQzJCLGVBQWUsSUFDMUMsY0FBYyxJQUFJRSxNQUFNLElBQ3hCNkksU0FBUyxDQUFDQyxjQUFjLEdBQUcsQ0FBQyxJQUM1QkQsU0FBUyxDQUFDRSxnQkFBZ0IsR0FBRyxDQUFDO0lBQ3RDO0lBQ0EsT0FBTyxJQUFJLENBQUNILGdCQUFnQjtFQUNoQztBQUNKLENBQUM7QUFFRHpLLFFBQVEsQ0FBQ0ksZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBWTtFQUN0RG1KLFVBQVUsQ0FBQzlJLElBQUksQ0FBQyxDQUFDO0FBQ3JCLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7O0FDcERGLElBQU1vSyxZQUFZLEdBQUcsU0FBZkEsWUFBWUEsQ0FBQSxFQUFTO0VBQ3pCLFNBQVNDLElBQUlBLENBQUVyQixFQUFFLEVBQUVzQixPQUFPLEVBQUU7SUFDMUJ0QixFQUFFLENBQUN1QixVQUFVLENBQUNwRixZQUFZLENBQUNtRixPQUFPLEVBQUV0QixFQUFFLENBQUM7SUFDdkNzQixPQUFPLENBQUNFLFdBQVcsQ0FBQ3hCLEVBQUUsQ0FBQztFQUN6QjtFQUNBOztFQUVBO0VBQ0EsSUFBTXlCLE1BQU0sR0FBR2xMLFFBQVEsQ0FBQytDLGdCQUFnQixDQUFDLGlCQUFpQixDQUFDO0VBQzNEO0VBQ0E7O0VBRUE7RUFDQSxLQUFLLElBQUlxQixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLEdBQUc4RyxNQUFNLENBQUN6SSxNQUFNLEVBQUUyQixDQUFDLEVBQUUsRUFBRTtJQUN0QyxJQUFNK0csRUFBRSxHQUFHbkwsUUFBUSxDQUFDcUYsYUFBYSxDQUFDLEtBQUssQ0FBQztJQUN4QzhGLEVBQUUsQ0FBQy9JLFlBQVksQ0FBQyxPQUFPLEVBQUUsaUJBQWlCLENBQUM7SUFDM0MsSUFBTTZELEdBQUcsR0FBR2lGLE1BQU0sQ0FBQzlHLENBQUMsQ0FBQztJQUNyQjBHLElBQUksQ0FBQzdFLEdBQUcsRUFBRWtGLEVBQUUsQ0FBQztFQUNmO0FBQ0YsQ0FBQztBQUVETixZQUFZLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7O0FDdEJkLElBQU1PLGNBQWMsR0FBRztFQUNyQjNLLElBQUksRUFBRSxTQUFOQSxJQUFJQSxDQUFBLEVBQWM7SUFDaEIsSUFBTTRLLGtCQUFrQixHQUFHLFNBQXJCQSxrQkFBa0JBLENBQUk3TCxDQUFDLEVBQUs7TUFDaENRLFFBQVEsQ0FBQ1UsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUMzQmUsU0FBUyxDQUNUMEIsTUFBTSxDQUFDLGlCQUFpQixFQUFFM0QsQ0FBQyxDQUFDOEwsSUFBSSxLQUFLLFlBQVksQ0FBQztJQUN2RCxDQUFDO0lBQ0QsSUFBTUMsSUFBSSxHQUFHdkwsUUFBUSxDQUFDQyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQzVDc0wsSUFBSSxDQUFDbkwsZ0JBQWdCLENBQUMsWUFBWSxFQUFFaUwsa0JBQWtCLENBQUM7SUFDdkRFLElBQUksQ0FBQ25MLGdCQUFnQixDQUFDLFlBQVksRUFBRWlMLGtCQUFrQixDQUFDO0VBQ3pEO0FBQ0YsQ0FBQztBQUVERCxjQUFjLENBQUMzSyxJQUFJLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7O0FDYnJCb0IsTUFBTSxDQUFDekIsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFVBQUFvQixLQUFLLEVBQUk7RUFDNUMsSUFBTWlJLEVBQUUsR0FBR3pKLFFBQVEsQ0FBQ1UsYUFBYSxDQUFDLHNCQUFzQixDQUFDO0VBQ3pEK0ksRUFBRSxDQUFDckcsY0FBYyxDQUFDO0lBQUVDLFFBQVEsRUFBRTtFQUFTLENBQUMsQ0FBQztBQUM3QyxDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7OztBQ0hzQztBQUV4QyxJQUFNbUksYUFBYSxHQUFHO0VBQ2xCQyxZQUFZLEVBQUU1SixNQUFNLENBQUM2SixXQUFXO0VBQ2hDQyxVQUFVLEVBQUUsQ0FBQztFQUNiN0YsSUFBSSxFQUFFLElBQUk7RUFDVjhGLEtBQUssRUFBRSxJQUFJO0VBQ1hDLE1BQU0sRUFBRSxJQUFJO0VBQ1pDLFdBQVcsRUFBRSxFQUFFO0VBQUU7RUFDakJDLFdBQVcsRUFBRSxHQUFHO0VBQUU7RUFDbEJDLFNBQVMsRUFBRSxDQUFDO0VBQ1pDLFNBQVMsRUFBRSxHQUFHO0VBQ2RDLG9CQUFvQixFQUFFLElBQUk7RUFBRTtFQUM1QkMsaUJBQWlCLEVBQUUsSUFBSTtFQUN2QkMsZUFBZSxFQUFFLElBQUk7RUFDckJDLGVBQWUsRUFBRSxHQUFHO0VBQUU7RUFFdEI1TCxJQUFJLFdBQUpBLElBQUlBLENBQUEsRUFBSTtJQUFBLElBQUFuQixLQUFBO0lBQ0osSUFBSSxDQUFDd0csSUFBSSxHQUFHeEYsa0RBQVMsQ0FBQ1MsYUFBYSxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDNkssS0FBSyxHQUFHNUwsUUFBUSxDQUFDVSxhQUFhLENBQUMsYUFBYSxDQUFDO0lBQ2xELElBQUksQ0FBQ21MLE1BQU0sR0FBRzdMLFFBQVEsQ0FBQ0MsY0FBYyxDQUFDLFFBQVEsQ0FBQztJQUUvQyxJQUFJLENBQUNxTSxTQUFTLENBQUMsQ0FBQztJQUNoQixJQUFJLENBQUNDLFVBQVUsQ0FBQyxDQUFDO0lBRWpCMUssTUFBTSxDQUFDekIsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO01BQUEsT0FBTWQsS0FBSSxDQUFDZ04sU0FBUyxDQUFDLENBQUM7SUFBQSxFQUFDOztJQUV6RDtJQUNBRSxxQkFBcUIsQ0FBQztNQUFBLE9BQU1sTixLQUFJLENBQUNtTixRQUFRLENBQUMsQ0FBQztJQUFBLEVBQUM7RUFDaEQsQ0FBQztFQUVESCxTQUFTLFdBQVRBLFNBQVNBLENBQUEsRUFBSTtJQUNULElBQUksQ0FBQ2IsWUFBWSxHQUFHNUosTUFBTSxDQUFDNkosV0FBVztJQUN0QyxJQUFJLENBQUNDLFVBQVUsR0FBRyxJQUFJLENBQUNlLFNBQVMsQ0FBQyxDQUFDO0VBQ3RDLENBQUM7RUFFREEsU0FBUyxXQUFUQSxTQUFTQSxDQUFBLEVBQUk7SUFDVCxPQUFPN0ssTUFBTSxDQUFDeUksT0FBTyxJQUFJdEssUUFBUSxDQUFDMkIsZUFBZSxDQUFDZ0wsU0FBUztFQUMvRCxDQUFDO0VBRURKLFVBQVUsV0FBVkEsVUFBVUEsQ0FBQSxFQUFJO0lBQUEsSUFBQTdNLE1BQUE7SUFDVixJQUFJa04sT0FBTyxHQUFHLEtBQUs7SUFFbkIvSyxNQUFNLENBQUN6QixnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsWUFBTTtNQUNwQyxJQUFJLENBQUN3TSxPQUFPLEVBQUU7UUFDVi9LLE1BQU0sQ0FBQzJLLHFCQUFxQixDQUFDLFlBQU07VUFDL0I5TSxNQUFJLENBQUMrTSxRQUFRLENBQUMsQ0FBQztVQUNmRyxPQUFPLEdBQUcsS0FBSztRQUNuQixDQUFDLENBQUM7UUFDRkEsT0FBTyxHQUFHLElBQUk7TUFDbEI7SUFDSixDQUFDLENBQUM7RUFDTixDQUFDO0VBRURILFFBQVEsV0FBUkEsUUFBUUEsQ0FBQSxFQUFJO0lBQ1IsSUFBTUksTUFBTSxHQUFHLElBQUksQ0FBQ0gsU0FBUyxDQUFDLENBQUM7SUFDL0IsSUFBTUksU0FBUyxHQUNYOU0sUUFBUSxDQUFDMkIsZUFBZSxDQUFDb0wsWUFBWSxHQUFHLElBQUksQ0FBQ3RCLFlBQVk7SUFFN0QsSUFBSSxDQUFDdUIsbUJBQW1CLENBQUNILE1BQU0sQ0FBQztJQUNoQyxJQUFJLENBQUNJLG1CQUFtQixDQUFDSixNQUFNLEVBQUVDLFNBQVMsQ0FBQztJQUMzQyxJQUFJLENBQUNJLGlCQUFpQixDQUFDLENBQUM7SUFDeEIsSUFBSSxDQUFDQyxxQkFBcUIsQ0FBQ04sTUFBTSxDQUFDO0lBQ2xDLElBQUksQ0FBQ08sa0JBQWtCLENBQUMsQ0FBQztJQUV6QixJQUFJLENBQUN6QixVQUFVLEdBQUdrQixNQUFNO0VBQzVCLENBQUM7RUFFRDtFQUNBO0VBQ0E7RUFDQUcsbUJBQW1CLFdBQW5CQSxtQkFBbUJBLENBQUVLLGFBQWEsRUFBRTtJQUNoQyxJQUFNQyxZQUFZLEdBQUcsSUFBSSxDQUFDN0IsWUFBWSxJQUFJLElBQUksQ0FBQ0ssV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUNqRSxJQUFNeUIsS0FBSyxHQUFHLElBQUksQ0FBQ0MsS0FBSyxDQUFDSCxhQUFhLEdBQUdDLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVELElBQU1HLEdBQUcsR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNKLEtBQUssR0FBRyxHQUFHLENBQUM7SUFFbkMsSUFBSSxDQUFDdkIsU0FBUyxHQUFHeUIsR0FBRztJQUNwQixJQUFJLENBQUNHLGtCQUFrQixDQUFDLFFBQVEsRUFBRUgsR0FBRyxDQUFDO0lBRXRDLElBQUlBLEdBQUcsSUFBSSxHQUFHLEVBQUU7TUFDWixJQUFJLENBQUMzSCxJQUFJLENBQUNyRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUM7SUFDMUMsQ0FBQyxNQUFNO01BQ0gsSUFBSSxDQUFDb0UsSUFBSSxDQUFDckUsU0FBUyxDQUFDRyxNQUFNLENBQUMsYUFBYSxDQUFDO0lBQzdDO0VBQ0osQ0FBQztFQUNEcUwsbUJBQW1CLFdBQW5CQSxtQkFBbUJBLENBQUVJLGFBQWEsRUFBRVAsU0FBUyxFQUFFO0lBQzNDLElBQU1lLGNBQWMsR0FBR2YsU0FBUyxHQUFHTyxhQUFhO0lBRWhELElBQU1DLFlBQVksR0FBRyxJQUFJLENBQUM3QixZQUFZLElBQUksSUFBSSxDQUFDSyxXQUFXLEdBQUcsR0FBRyxDQUFDOztJQUVqRTtJQUNBLElBQUl1QixhQUFhLEdBQUdDLFlBQVksRUFBRTtNQUM5QixJQUFJLENBQUNyQixTQUFTLEdBQUcsR0FBRztNQUNwQixJQUFJLENBQUM2QixpQkFBaUIsQ0FBQyxRQUFRLENBQUM7TUFDaEMsSUFBSSxDQUFDaEksSUFBSSxDQUFDckUsU0FBUyxDQUFDRyxNQUFNLENBQUMsZ0JBQWdCLENBQUM7TUFDNUM7SUFDSjtJQUVBLElBQU1tTSxZQUFZLEdBQUcsSUFBSSxDQUFDdEMsWUFBWSxJQUFJLElBQUksQ0FBQ00sV0FBVyxHQUFHLEdBQUcsQ0FBQztJQUNqRSxJQUFNd0IsS0FBSyxHQUFHLElBQUksQ0FBQ0MsS0FBSyxDQUFDSyxjQUFjLEdBQUdFLFlBQVksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzdELElBQU1OLEdBQUcsR0FBR0MsSUFBSSxDQUFDQyxLQUFLLENBQUNKLEtBQUssR0FBRyxHQUFHLENBQUM7SUFFbkMsSUFBSSxDQUFDdEIsU0FBUyxHQUFHd0IsR0FBRztJQUNwQixJQUFJLENBQUNHLGtCQUFrQixDQUFDLFFBQVEsRUFBRUgsR0FBRyxDQUFDO0lBRXRDLElBQUlBLEdBQUcsR0FBRyxHQUFHLEVBQUU7TUFDWCxJQUFJLENBQUMzSCxJQUFJLENBQUNyRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztJQUM3QyxDQUFDLE1BQU07TUFDSCxJQUFJLENBQUNvRSxJQUFJLENBQUNyRSxTQUFTLENBQUNHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztJQUNoRDtFQUNKLENBQUM7RUFFRGdNLGtCQUFrQixXQUFsQkEsa0JBQWtCQSxDQUFFSSxNQUFNLEVBQUVQLEdBQUcsRUFBRTtJQUM3QixLQUFLLElBQUlySixDQUFDLEdBQUcsQ0FBQyxFQUFFQSxDQUFDLElBQUksR0FBRyxFQUFFQSxDQUFDLElBQUksRUFBRSxFQUFFO01BQy9CLElBQUksQ0FBQzBCLElBQUksQ0FBQ3JFLFNBQVMsQ0FBQ0csTUFBTSxJQUFBcU0sTUFBQSxDQUFJRCxNQUFNLE9BQUFDLE1BQUEsQ0FBSTdKLENBQUMsQ0FBRSxDQUFDO0lBQ2hEO0lBQ0EsSUFBTThKLE9BQU8sR0FBR1IsSUFBSSxDQUFDQyxLQUFLLENBQUNGLEdBQUcsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFO0lBQ3pDLElBQUksQ0FBQzNILElBQUksQ0FBQ3JFLFNBQVMsQ0FBQ0MsR0FBRyxJQUFBdU0sTUFBQSxDQUFJRCxNQUFNLE9BQUFDLE1BQUEsQ0FBSUMsT0FBTyxDQUFFLENBQUM7RUFDbkQsQ0FBQztFQUNESixpQkFBaUIsV0FBakJBLGlCQUFpQkEsQ0FBRUUsTUFBTSxFQUFFO0lBQ3ZCLEtBQUssSUFBSTVKLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsSUFBSSxHQUFHLEVBQUVBLENBQUMsSUFBSSxFQUFFLEVBQUU7TUFDL0IsSUFBSSxDQUFDMEIsSUFBSSxDQUFDckUsU0FBUyxDQUFDRyxNQUFNLElBQUFxTSxNQUFBLENBQUlELE1BQU0sT0FBQUMsTUFBQSxDQUFJN0osQ0FBQyxDQUFFLENBQUM7SUFDaEQ7RUFDSixDQUFDO0VBQ0Q7RUFDQTtFQUNBO0VBQ0E4SSxpQkFBaUIsV0FBakJBLGlCQUFpQkEsQ0FBQSxFQUFJO0lBQ2pCLElBQU1pQixTQUFTLEdBQUcsQ0FBQyxJQUFJLENBQUNySSxJQUFJLENBQUNyRSxTQUFTLENBQUNrQixRQUFRLENBQUMsZ0JBQWdCLENBQUM7SUFDakUsSUFBSSxDQUFDd0wsU0FBUyxFQUFFO0lBRWhCLElBQU1DLFlBQVksR0FBRyxJQUFJLENBQUNwQyxTQUFTLEdBQUcsR0FBRztJQUN6QyxJQUFNcUMsWUFBWSxHQUFHLElBQUksQ0FBQ3BDLFNBQVMsR0FBRyxHQUFHO0lBRXpDLElBQUltQyxZQUFZLElBQUlDLFlBQVksRUFBRTtNQUM5QixJQUFJLENBQUN2SSxJQUFJLENBQUNyRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxjQUFjLENBQUM7TUFDdkMsSUFBSSxDQUFDb0UsSUFBSSxDQUFDckUsU0FBUyxDQUFDRyxNQUFNLENBQUN0QixrREFBUyxDQUFDVSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUMsTUFBTTtNQUNILElBQUksQ0FBQzhFLElBQUksQ0FBQ3JFLFNBQVMsQ0FBQ0csTUFBTSxDQUFDLGNBQWMsQ0FBQztNQUMxQyxJQUFJLENBQUNrRSxJQUFJLENBQUNyRSxTQUFTLENBQUNDLEdBQUcsQ0FBQ3BCLGtEQUFTLENBQUNVLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDakQ7RUFDSixDQUFDO0VBRUQ7RUFDQTtFQUNBO0VBQ0FtTSxxQkFBcUIsV0FBckJBLHFCQUFxQkEsQ0FBRU4sTUFBTSxFQUFFO0lBQzNCLElBQUlBLE1BQU0sR0FBRyxJQUFJLENBQUNsQixVQUFVLEVBQUU7TUFDMUIsSUFBSSxDQUFDN0YsSUFBSSxDQUFDckUsU0FBUyxDQUFDRyxNQUFNLENBQUMsYUFBYSxDQUFDO01BQ3pDLElBQUksQ0FBQ2tFLElBQUksQ0FBQ3JFLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLGVBQWUsQ0FBQztJQUM1QyxDQUFDLE1BQU07TUFDSCxJQUFJLENBQUNvRSxJQUFJLENBQUNyRSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxhQUFhLENBQUM7TUFDdEMsSUFBSSxDQUFDb0UsSUFBSSxDQUFDckUsU0FBUyxDQUFDRyxNQUFNLENBQUMsZUFBZSxDQUFDO0lBQy9DO0VBQ0osQ0FBQztFQUVEO0VBQ0E7RUFDQTtFQUNBd0wsa0JBQWtCLFdBQWxCQSxrQkFBa0JBLENBQUEsRUFBSTtJQUFBLElBQUFrQixNQUFBO0lBQ2xCO0lBQ0EsSUFBSSxJQUFJLENBQUNsQyxlQUFlLEVBQUU7TUFDdEJ6TSxZQUFZLENBQUMsSUFBSSxDQUFDeU0sZUFBZSxDQUFDO0lBQ3RDO0lBRUEsSUFBSSxDQUFDQSxlQUFlLEdBQUd4TSxVQUFVLENBQUMsWUFBTTtNQUNwQztNQUNBME8sTUFBSSxDQUFDeEksSUFBSSxDQUFDckUsU0FBUyxDQUFDQyxHQUFHLENBQUMsZUFBZSxDQUFDOztNQUV4QztNQUNBLElBQUk0TSxNQUFJLENBQUNuQyxpQkFBaUIsRUFBRTtRQUN4QnhNLFlBQVksQ0FBQzJPLE1BQUksQ0FBQ25DLGlCQUFpQixDQUFDO01BQ3hDO01BRUFtQyxNQUFJLENBQUNuQyxpQkFBaUIsR0FBR3ZNLFVBQVUsQ0FBQyxZQUFNO1FBQ3RDME8sTUFBSSxDQUFDeEksSUFBSSxDQUFDckUsU0FBUyxDQUFDRyxNQUFNLENBQUMsZUFBZSxDQUFDO01BQy9DLENBQUMsRUFBRTBNLE1BQUksQ0FBQ3BDLG9CQUFvQixDQUFDO0lBQ2pDLENBQUMsRUFBRSxJQUFJLENBQUNHLGVBQWUsQ0FBQztFQUM1QixDQUFDO0VBQ0Q7RUFDQTtFQUNBO0VBQ0FtQixLQUFLLFdBQUxBLEtBQUtBLENBQUVlLENBQUMsRUFBRUMsR0FBRyxFQUFFQyxHQUFHLEVBQUU7SUFDaEIsT0FBT2YsSUFBSSxDQUFDZSxHQUFHLENBQUNELEdBQUcsRUFBRWQsSUFBSSxDQUFDYyxHQUFHLENBQUNDLEdBQUcsRUFBRUYsQ0FBQyxDQUFDLENBQUM7RUFDMUM7QUFDSixDQUFDO0FBRUQvQyxhQUFhLENBQUMvSyxJQUFJLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7O0FDM0xwQlQsUUFBUSxDQUFDK0MsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUNDLE9BQU8sQ0FBQyxVQUFDeUcsRUFBRSxFQUFLO0VBQ25EQSxFQUFFLENBQUNySixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ1osQ0FBQyxFQUFLO0lBQ2xDQSxDQUFDLENBQUNnRSxjQUFjLENBQUMsQ0FBQztJQUVsQixJQUFNOEYsTUFBTSxHQUFHdEosUUFBUSxDQUFDQyxjQUFjLENBQUMscUJBQXFCLENBQUM7SUFDN0QsSUFBSSxDQUFDcUosTUFBTSxFQUFFO0lBRWIsSUFBTS9GLFFBQVEsR0FBRytGLE1BQU0sQ0FBQ00scUJBQXFCLENBQUMsQ0FBQyxDQUFDSSxHQUFHLEdBQUduSSxNQUFNLENBQUN5SSxPQUFPLElBQUt6SSxNQUFNLENBQUM2SixXQUFXLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBRTtJQUN0RzdKLE1BQU0sQ0FBQzBCLFFBQVEsQ0FBQztNQUFFeUcsR0FBRyxFQUFFekcsUUFBUTtNQUFFRixRQUFRLEVBQUU7SUFBUyxDQUFDLENBQUM7RUFDeEQsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7QUNWRnJELFFBQVEsQ0FBQ0ksZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtFQUNoRCxJQUFNMEYsSUFBSSxHQUFHOUYsUUFBUSxDQUFDVSxhQUFhLENBQUMsTUFBTSxDQUFDO0VBRTNDLElBQU1nTyxHQUFHLEdBQUcsU0FBTkEsR0FBR0EsQ0FBQSxFQUFTO0lBQ2Q7SUFDQTtJQUNBLElBQU1DLFFBQVEsR0FBRzNPLFFBQVEsQ0FBQytDLGdCQUFnQixDQUN0QyxrREFDSixDQUFDO0lBQ0Q7SUFDQTtJQUNBLElBQUk0TCxRQUFRLENBQUNsTSxNQUFNLEdBQUcsQ0FBQyxFQUFFO01BQ3JCcUQsSUFBSSxDQUFDckUsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO01BQzdCb0UsSUFBSSxDQUFDckUsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO01BQzdCLElBQUlrTixLQUFLLEdBQUcsQ0FBQztNQUNiLEtBQUssSUFBSXhLLENBQUMsR0FBRyxDQUFDLEVBQUVBLENBQUMsR0FBR3VLLFFBQVEsQ0FBQ2xNLE1BQU0sRUFBRTJCLENBQUMsRUFBRSxFQUFFO1FBQ3RDd0ssS0FBSyxHQUFHeEssQ0FBQyxHQUFHLENBQUM7UUFDYixJQUFNcUYsRUFBRSxHQUFHa0YsUUFBUSxDQUFDdkssQ0FBQyxDQUFDO1FBQ3RCO1FBQ0EsSUFBSXlLLFlBQVksR0FBR3BGLEVBQUUsQ0FBQ3FGLHNCQUFzQjtRQUM1QyxJQUFJRCxZQUFZLEVBQUU7VUFDZDtVQUNBQSxZQUFZLENBQUNwTixTQUFTLENBQUNDLEdBQUcsQ0FBQyxjQUFjLENBQUM7UUFDOUM7UUFDQStILEVBQUUsQ0FBQy9GLEVBQUUsR0FBRyxNQUFNLEdBQUdrTCxLQUFLO1FBQ3RCbkYsRUFBRSxDQUFDaEksU0FBUyxDQUFDQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7UUFDbkMrSCxFQUFFLENBQUNoSSxTQUFTLENBQUNDLEdBQUcsQ0FBQyxPQUFPLEdBQUdrTixLQUFLLENBQUM7UUFDakMsSUFBTTlILElBQUksR0FBRzlHLFFBQVEsQ0FBQ3FGLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDM0N5QixJQUFJLENBQUNyRixTQUFTLENBQUNDLEdBQUcsQ0FBQyxZQUFZLENBQUM7UUFDaENvRixJQUFJLENBQUNyRixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDMUIsSUFBTXFOLE9BQU8sR0FBRy9PLFFBQVEsQ0FBQ3FGLGFBQWEsQ0FBQyxNQUFNLENBQUM7UUFDOUMwSixPQUFPLENBQUN0TixTQUFTLENBQUNDLEdBQUcsQ0FBQyxlQUFlLENBQUM7UUFDdEM7UUFDQW9GLElBQUksQ0FBQ3JCLFNBQVMsR0FBRyw4Q0FBOEM7UUFDL0RzSixPQUFPLENBQUN0SixTQUFTLEdBQUcseUJBQXlCO1FBQzdDZ0UsRUFBRSxDQUFDN0QsWUFBWSxDQUFDa0IsSUFBSSxFQUFFMkMsRUFBRSxDQUFDOUQsVUFBVSxDQUFDO1FBQ3BDOEQsRUFBRSxDQUFDd0IsV0FBVyxDQUFDOEQsT0FBTyxDQUFDO1FBQ3ZCdEYsRUFBRSxDQUFDckosZ0JBQWdCLENBQ2YsT0FBTyxFQUNQLFVBQVVaLENBQUMsRUFBRTtVQUNUQSxDQUFDLENBQUNnRSxjQUFjLENBQUMsQ0FBQztVQUNsQnNDLElBQUksQ0FBQ3JFLFNBQVMsQ0FBQzBCLE1BQU0sQ0FBQyxRQUFRLENBQUM7VUFDL0IyQyxJQUFJLENBQUNyRSxTQUFTLENBQUMwQixNQUFNLENBQUMsU0FBUyxDQUFDO1VBQ2hDLElBQU1yQixJQUFJLEdBQUcsSUFBSSxDQUFDNEIsRUFBRTtVQUNwQixJQUFNaUwsUUFBUSxHQUFHM08sUUFBUSxDQUFDK0MsZ0JBQWdCLENBQ3RDLGtDQUNKLENBQUM7VUFDRCxLQUFLLElBQUlxQixFQUFDLEdBQUcsQ0FBQyxFQUFFQSxFQUFDLEdBQUd1SyxRQUFRLENBQUNsTSxNQUFNLEVBQUUyQixFQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFNcUYsR0FBRSxHQUFHa0YsUUFBUSxDQUFDdkssRUFBQyxDQUFDO1lBQ3RCcUYsR0FBRSxDQUFDaEksU0FBUyxDQUFDRyxNQUFNLENBQUMsWUFBWSxDQUFDO1VBQ3JDO1VBQ0FwQyxDQUFDLENBQUM4SixNQUFNLENBQUM3SCxTQUFTLENBQUMwQixNQUFNLENBQUMsWUFBWSxDQUFDO1VBQ3ZDLElBQUkyQyxJQUFJLENBQUNyRSxTQUFTLENBQUNrQixRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssS0FBSyxFQUFFO1lBQzdDZCxNQUFNLENBQUNrQyxRQUFRLENBQUNqQyxJQUFJLEdBQUdBLElBQUk7WUFDM0JELE1BQU0sQ0FBQ2pDLFVBQVUsQ0FBQyxZQUFZO2NBQzFCSSxRQUFRLENBQ0hVLGFBQWEsQ0FBQyxHQUFHLEdBQUdvQixJQUFJLENBQUMsQ0FDekJzQixjQUFjLENBQUM7Z0JBQ1pDLFFBQVEsRUFBRSxRQUFRO2dCQUNsQkMsS0FBSyxFQUFFO2NBQ1gsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxFQUFFLEdBQUcsQ0FBQztVQUNYLENBQUMsTUFBTTtZQUNIekIsTUFBTSxDQUFDakMsVUFBVSxDQUFDLFlBQVk7Y0FDMUJJLFFBQVEsQ0FDSFUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUN2QjBDLGNBQWMsQ0FBQztnQkFDWkMsUUFBUSxFQUFFLFFBQVE7Z0JBQ2xCQyxLQUFLLEVBQUU7Y0FDWCxDQUFDLENBQUM7WUFDVixDQUFDLEVBQUUsR0FBRyxDQUFDO1VBQ1g7VUFDQSxPQUFPLEtBQUs7UUFDaEIsQ0FBQyxFQUNELEtBQ0osQ0FBQztNQUNMO0lBQ0osQ0FBQyxNQUFNO01BQ0g7SUFBQTtFQUVSLENBQUM7RUFFRCxJQUNJekIsTUFBTSxDQUFDa0MsUUFBUSxDQUFDakMsSUFBSSxLQUFLLE1BQU0sSUFDL0JnRSxJQUFJLENBQUNyRSxTQUFTLENBQUNrQixRQUFRLENBQUMsU0FBUyxDQUFDLElBQ2xDbUQsSUFBSSxDQUFDckUsU0FBUyxDQUFDa0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUNwQztJQUNFbUQsSUFBSSxDQUFDckUsU0FBUyxDQUFDMEIsTUFBTSxDQUFDLFFBQVEsQ0FBQztJQUMvQjJDLElBQUksQ0FBQ3JFLFNBQVMsQ0FBQzBCLE1BQU0sQ0FBQyxTQUFTLENBQUM7RUFDcEM7RUFDQXVMLEdBQUcsQ0FBQyxDQUFDOztFQUVMO0VBQ0E7RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNKLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7O0FDbEdGMU8sUUFBUSxDQUFDSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQVosQ0FBQyxFQUFJO0VBQ3BDLElBQU13UCxJQUFJLEdBQUd4UCxDQUFDLENBQUM4SixNQUFNLENBQUM3QixPQUFPLENBQUMscUJBQXFCLENBQUM7RUFDcEQsSUFBSSxDQUFDdUgsSUFBSSxFQUFFO0VBRVhBLElBQUksQ0FBQ3ZOLFNBQVMsQ0FBQzBCLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDdEMsQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29CO0FBQ0k7QUFDbUI7QUFDMUI7QUFDYTtBQUNGO0FBQ1Y7QUFDUTtBQUNHO0FBQ1Q7QUFDSztBQUNOIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvYmF0dGVyeS1zYXZlci5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9ib2R5LWNsYXNzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2NvbGxhcHNpYmxlLW1lbnUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvY29va2llLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvaW1hZ2UtaG92ZXIuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvaW1hZ2VzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL21vdXNlLW92ZXItbG9nby5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9wcmludC5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9zY3JvbGwtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9zY3JvbGwtdG8tY29udGVudC1iZWxvdy1xdW90ZS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy90b2MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvd29yay1leGFtcGxlLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGVib3VuY2UgPSAoY2FsbGJhY2ssIHRpbWVvdXQsIF90aGlzKSA9PiB7XG4gICAgbGV0IHRpbWVyXG4gICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICBjb25zdCBfdGhhdCA9IHRoaXNcbiAgICAgICAgaWYgKHRpbWVyKSBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKF90aGlzIHx8IF90aGF0LCBlKVxuICAgICAgICB9LCB0aW1lb3V0KVxuICAgIH1cbn1cblxuY29uc3QgdXNlckFjdGlvbiA9IGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBmdWxsU2NyZWVuRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhdHRlcnktc2F2ZXItZGl2JylcblxuICAgIC8vIFNob3cgdGhlIGRpdiB3aGVuIHRoZSBkb2N1bWVudCBpcyBsb2FkZWRcbiAgICBmdWxsU2NyZWVuRGl2LnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcblxuICAgIC8vIEFkZCBjbGljayBldmVudCBsaXN0ZW5lclxuICAgIGZ1bGxTY3JlZW5EaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bGxTY3JlZW5EaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIH0pXG59LCA2MDAwMClcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1c2VyQWN0aW9uLCBmYWxzZSlcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHVzZXJBY3Rpb24sIGZhbHNlKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB1c2VyQWN0aW9uLCBmYWxzZSlcblxudXNlckFjdGlvbigpXG4iLCJpbXBvcnQgeyBteUNvb2tpZSB9IGZyb20gJy4vY29va2llLmpzJ1xuXG5leHBvcnQgY29uc3QgYm9keUNsYXNzID0ge1xuICAgIGJvZHlPYmplY3Q6IG51bGwsXG5cbiAgICB0aGVtZTogJycsXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgICAgIGJvZHlDbGFzcy5hZGRPclRvZ2dsZUJvZHlDbGFzcygnI21lbnUtdG9nZ2xlJywgZmFsc2UpXG5cbiAgICAgICAgLy8gaWYgeW91IGNsaWNrIG9uIHRoZW1lLXNlbGVjdG9yLCB5b3Ugc2VsZWN0IHRoZSB0aGVtZVxuICAgICAgICBib2R5Q2xhc3MuYWRkT3JUb2dnbGVCb2R5Q2xhc3MoJy50aGVtZS1zZWxlY3RvcicsIHRydWUpXG4gICAgICAgIHRoaXMudGhlbWUgPVxuICAgICAgICAgICAgLy8gaWYgeW91IGNsaWNrIG9uIHNldC10aGVtLCB5b3Ugc2VsZWN0IHRoZSB0aGVtZVxuICAgICAgICAgICAgYm9keUNsYXNzLnJldHJpZXZlQ29va2llT3JIYXNoKClcbiAgICAgICAgLy8gZXhwb3NlIHNjcm9sbGVkIGJlaGF2aW91clxuICAgICAgICB0aGlzLnNjcm9sbFN0YXJ0KClcbiAgICAgICAgdGhpcy5hZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycygpXG4gICAgfSxcblxuICAgIGdldEJvZHlPYmplY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGJvZHlDbGFzcy5ib2R5T2JqZWN0XG4gICAgfSxcblxuICAgIGdldFRoZW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RyaW5nKGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScpKVxuICAgIH0sXG5cbiAgICBzaG93TWVudUFzRGVmYXVsdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBib2R5Q2xhc3MuaXNIb21lUGFnZSgpID09PSB0cnVlICYmXG4gICAgICAgICAgICBib2R5Q2xhc3MuaGFzRnJhZ21lbnQoKSA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS10b2dnbGUnKS5jbGljaygpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYm9keUNsYXNzLmFkZFJvY2tldE1vZGVWaWRlb09ySW1hZ2UoKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LWxvYWRlZCcpXG4gICAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgndG91Y2gnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCduby10b3VjaCcpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnYm9keS11bmxvYWRlZCcpXG4gICAgICAgIC8vIH0pXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHN0YXRlJylcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgcmV0cmlldmVDb29raWVPckhhc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGhhc2ggPSBib2R5Q2xhc3MuZ2V0SGFzaEZyb21VUkwoKVxuICAgICAgICBsZXQgcHJlZmVycmVkVGhlbWUgPSAnJ1xuICAgICAgICBpZiAoaGFzaCA9PT0gJ3Jlc2V0Jykge1xuICAgICAgICAgICAgbXlDb29raWUuZXJhc2VDb29raWUoJ3ByZWZlcnJlZFRoZW1lJylcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChoYXNoKSB7XG4gICAgICAgICAgICB0aGlzLnJ1bkNsaWNrRm9yRWxlbWVudChoYXNoKVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNoICE9PSAndGhlbWUtbW9vbicgJiYgaGFzaCAhPT0gJ3RoZW1lLXN1bicpIHtcbiAgICAgICAgICAgIHByZWZlcnJlZFRoZW1lID0gbXlDb29raWUuZ2V0Q29va2llKCdwcmVmZXJyZWRUaGVtZScpXG4gICAgICAgICAgICBpZiAocHJlZmVycmVkVGhlbWUpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCBwcmVmZXJyZWRUaGVtZSlcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKHByZWZlcnJlZFRoZW1lKVxuICAgICAgICAgICAgfSBlbHNlIGlmIChib2R5Q2xhc3MudXNlclByZWZlcnNEYXJrVGhlbWUoKSkge1xuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsICd0aGVtZS1tb29uJylcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCd0aGVtZS1tb29uJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICB1c2VyUHJlZmVyc0RhcmtUaGVtZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEgJiZcbiAgICAgICAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcocHJlZmVycy1jb2xvci1zY2hlbWU6IGRhcmspJykubWF0Y2hlc1xuICAgICAgICApXG4gICAgfSxcblxuICAgIHJ1bkNsaWNrRm9yRWxlbWVudDogZnVuY3Rpb24gKGhhc2gpIHtcbiAgICAgICAgaGFzaCA9IGhhc2gudHJpbSgpXG4gICAgICAgIGlmIChoYXNoLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc3Qgb2JqID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaClcbiAgICAgICAgICAgIGlmIChvYmogJiYgb2JqLmNsYXNzTGlzdC5jb250YWlucygndGhlbWUtc2VsZWN0b3InKSkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlQm9keUNsYXNzZXNCYXNlZE9uQXR0cmlidXRlKG9iailcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKGhhc2gpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9LFxuXG4gICAgYWRkT3JUb2dnbGVCb2R5Q2xhc3M6IGZ1bmN0aW9uIChvYmpTZWxlY3RvciwgaXNUaGVtZSkge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwob2JqU2VsZWN0b3IpXG4gICAgICAgICAgICAuZm9yRWFjaChmdW5jdGlvbiAob25lRWFjaE9iamVjdCkge1xuICAgICAgICAgICAgICAgIG9uZUVhY2hPYmplY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keUNsYXNzLmFjdGlvbkJvZHlDbGFzc0NoYW5nZShcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uZUVhY2hPYmplY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzVGhlbWVcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqU2VsZWN0b3IgPT09ICcjbWVudS10b2dnbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjbG9zZSBtZW51IHdoZW4gdG9nZ2xpbmdcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QudG9nZ2xlKCdzaG93LWxvZ28nKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDAwKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBzY3JvbGxTdGFydDogZnVuY3Rpb24gKCkge1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zdCBoYXNoID0gYm9keUNsYXNzLmdldEhhc2hGcm9tVVJMKClcbiAgICAgICAgICAgIGlmIChoYXNoICYmIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBoYXNoKS5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJywgLy8gc21vb3RoIHNjcm9sbFxuICAgICAgICAgICAgICAgICAgICBibG9jazogJ3N0YXJ0JyAvLyB0aGUgdXBwZXIgYm9yZGVyIG9mIHRoZSBlbGVtZW50IHdpbGwgYmUgYWxpZ25lZCBhdCB0aGUgdG9wIG9mIHRoZSB2aXNpYmxlIHBhcnQgb2YgdGhlIHdpbmRvdyBvZiB0aGUgc2Nyb2xsYWJsZSBhcmVhLlxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sIDMwMClcbiAgICB9LFxuXG4gICAgYWN0aW9uQm9keUNsYXNzQ2hhbmdlOiBmdW5jdGlvbiAob25lRWFjaE9iamVjdCwgZXZlbnQsIGlzVGhlbWUsIHNjcm9sbFRvKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcblxuICAgICAgICBib2R5Q2xhc3MucmVtb3ZlQm9keUNsYXNzZXNCYXNlZE9uQXR0cmlidXRlKG9uZUVhY2hPYmplY3QpXG5cbiAgICAgICAgbGV0IHRvZ2dsZUNsYXNzID0gJydcbiAgICAgICAgbGV0IGlkID0gJydcbiAgICAgICAgaWYgKG9uZUVhY2hPYmplY3QuaGFzQXR0cmlidXRlKCdkYXRhLWFkZC1jbGFzcycpKSB7XG4gICAgICAgICAgICB0b2dnbGVDbGFzcyA9IG9uZUVhY2hPYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWFkZC1jbGFzcycpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b2dnbGVDbGFzcyA9IG9uZUVhY2hPYmplY3QuZ2V0QXR0cmlidXRlKCdpZCcpXG4gICAgICAgICAgICBpZCA9IHRvZ2dsZUNsYXNzXG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9uZUVhY2hPYmplY3QuaGFzQXR0cmlidXRlKCdkYXRhLXRvZ2dsZS1yYXRoZXItdGhhbi1hZGQnKSkge1xuICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnRvZ2dsZSh0b2dnbGVDbGFzcylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQodG9nZ2xlQ2xhc3MpXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNUaGVtZSkge1xuICAgICAgICAgICAgbXlDb29raWUuc2V0Q29va2llKCdwcmVmZXJyZWRUaGVtZScsIHRvZ2dsZUNsYXNzLCAxNClcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsIHRvZ2dsZUNsYXNzKVxuICAgICAgICAgICAgYm9keUNsYXNzLnRoZW1lID0gdG9nZ2xlQ2xhc3NcbiAgICAgICAgfVxuICAgICAgICBpZiAoaWQgJiYgc2Nyb2xsVG8pIHtcbiAgICAgICAgICAgIGxldCBoYXNoID0gYm9keUNsYXNzLmdldEhhc2hGcm9tU3RyaW5nKGlkKVxuICAgICAgICAgICAgaWYgKGhhc2gubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaGFzaCA9IGhhc2gucmVwbGFjZSgnIycsICcnKVxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gJyMnICsgaGFzaFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZTogZnVuY3Rpb24gKG9iamVjdCkge1xuICAgICAgICBpZiAob2JqZWN0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1yZW1vdmUtY2xhc3MnKSkge1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5nID0gb2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1yZW1vdmUtY2xhc3MnKVxuICAgICAgICAgICAgY29uc3QgY2xhc3NlcyA9IGJvZHlDbGFzcy5nZXRDbGFzc2VzRnJvbUxpc3Qoc3RyaW5nKVxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGNsYXNzZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNsYXNzZXNbaV1cbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldENsYXNzZXNGcm9tTGlzdDogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICBjb25zdCBhcnJheSA9IHN0cmluZy5zcGxpdCgnLCcpXG4gICAgICAgIGNvbnN0IG5ld0FycmF5ID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IGFycmF5Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGFycmF5W2ldLnRyaW0oKVxuICAgICAgICAgICAgaWYgKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgbmV3QXJyYXkucHVzaCh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3QXJyYXlcbiAgICB9LFxuXG4gICAgZ2V0SGFzaEZyb21VUkw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgY29uc3Qgc3RyaW5nID0gd2luZG93LmxvY2F0aW9uLmhhc2hcbiAgICAgICAgcmV0dXJuIGJvZHlDbGFzcy5nZXRIYXNoRnJvbVN0cmluZyhzdHJpbmcpXG4gICAgfSxcblxuICAgIGdldEhhc2hGcm9tU3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIHN0cmluZyA9IFN0cmluZyhzdHJpbmcpXG4gICAgICAgIHJldHVybiBib2R5Q2xhc3MucmVtb3ZlSGFzaEZyb21TdHJpbmcoc3RyaW5nKVxuICAgIH0sXG5cbiAgICByZW1vdmVIYXNoRnJvbVN0cmluZzogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoJyMnLCAnJylcbiAgICB9LFxuXG4gICAgYWRkUm9ja2V0TW9kZVZpZGVvT3JJbWFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoYm9keUNsYXNzLmhhc1JvY2tldFNob3coKSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgY29uc3QgdmlkZW9JZCA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS12aWRlby1pZCcpXG4gICAgICAgICAgICBjb25zdCBpc0xhbmRzY2FwZSA9ICgpID0+XG4gICAgICAgICAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEoJyhvcmllbnRhdGlvbjogbGFuZHNjYXBlKScpLm1hdGNoZXNcbiAgICAgICAgICAgIGNvbnN0IGltYWdlVVJMID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWJnLWltYWdlJylcbiAgICAgICAgICAgIGNvbnN0IGltYWdlWCA9XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWJnLWltYWdlLXgnKSA/PyAnNTAlJ1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VZID1cbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmctaW1hZ2UteScpID8/ICc1MCUnXG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHZpZGVvSWQpXG4gICAgICAgICAgICBpZiAodmlkZW9JZCB8fCBpbWFnZVVSTCkge1xuICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9ICcnXG4gICAgICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgICAgICBkaXYuaWQgPSAnQmFja2dyb3VuZEltYWdlJ1xuICAgICAgICAgICAgICAgIGNvbnN0IHNoYWRvdyA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEtc2hhZG93LW92ZXItbG9nbydcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgbGV0IHNoYWRvd0NvbG91ciA9ICcnXG4gICAgICAgICAgICAgICAgaWYgKHNoYWRvdyA9PT0gJ2RhcmsnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYWRvd0NvbG91ciA9XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGluZWFyLWdyYWRpZW50KDIxMGRlZywgIzAwMDAwMDc3IDEyJSwgdHJhbnNwYXJlbnQgODglKSdcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHNoYWRvdyA9PT0gJ2xpZ2h0Jykge1xuICAgICAgICAgICAgICAgICAgICBzaGFkb3dDb2xvdXIgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmVhci1ncmFkaWVudCgyMTBkZWcsICNGRkZGRkY3NyAxMiUsIHRyYW5zcGFyZW50IDg4JSknXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh2aWRlb0lkICYmIGlzTGFuZHNjYXBlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlkZW9VcmwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJ2h0dHBzOi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby8nICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvSWQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJz9hdXRvcGxheT0xJmF1dG9wYXVzZT0wJm11dGVkPTEmYmFja2dyb3VuZD0xJ1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93Q29sb3VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSA9ICdiYWNrZ3JvdW5kOiAnICsgc2hhZG93Q29sb3VyXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAnPGlmcmFtZSBzcmM9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvVXJsICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIiBmcmFtZWJvcmRlcj1cIjBcIiBhbGxvdz1cImF1dG9wbGF5OyBmdWxsc2NyZWVuXCIgYWxsb3dmdWxsc2NyZWVuIHN0eWxlPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCI+PC9pZnJhbWU+J1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZmlyc3RDaGlsZFxuICAgICAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5pbnNlcnRCZWZvcmUoZGl2LCB0ZW1wKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJylcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdoYXMtYmctaW1hZ2UtbG9hZGVkJylcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGltYWdlVVJMKSB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlID0gJ3VybCgnICsgaW1hZ2VVUkwgKyAnKSdcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0NvbG91cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSBzaGFkb3dDb2xvdXIgKyAnLCcgKyBzdHlsZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBzdHlsZVxuICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZFBvc2l0aW9uID0gaW1hZ2VYICsgJyAnICsgaW1hZ2VZXG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1nID0gbmV3IEltYWdlKClcbiAgICAgICAgICAgICAgICAgICAgaW1nLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaGFzLWJnLWltYWdlLWxvYWRlZCcpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW1nLm9uZXJyb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2hhcy1iZy1pbWFnZS1sb2FkZWQnKSAvLyBmYWlsIG9wZW5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gaW1hZ2VVUkxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2ZhZGUtb24tbm8tcm9ja2V0JylcbiAgICAgICAgICAgICAgICBjb25zdCB0ZW1wID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZmlyc3RDaGlsZFxuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0Lmluc2VydEJlZm9yZShkaXYsIHRlbXApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnbm8gcm9ja2V0IHNob3cnKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGlzSG9tZVBhZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSA9PT0gJy8nXG4gICAgfSxcblxuICAgIGhhc0ZyYWdtZW50OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24uaGFzaCAhPT0gJydcbiAgICB9LFxuXG4gICAgaGFzUm9ja2V0U2hvdzogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmNvbnRhaW5zKCduby1yb2NrZXQtc2hvdycpXG4gICAgICAgICAgICA/IGZhbHNlXG4gICAgICAgICAgICA6IHRydWVcbiAgICB9XG59XG5cbmJvZHlDbGFzcy5pbml0KClcbiIsImNvbnN0IENvbGxhcHNpYmxlTGlzdHMgPSAoKCkgPT4ge1xuICAgIGZ1bmN0aW9uIGFwcGx5ICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgndWwuY29sbGFwc2libGVMaXN0JykuZm9yRWFjaChsaXN0ID0+IHtcbiAgICAgICAgICAgIGFwcGx5VG8obGlzdClcbiAgICAgICAgICAgIHVwZGF0ZUhhc09wZW4obGlzdClcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBseVRvIChsaXN0KSB7XG4gICAgICAgIGxpc3QucXVlcnlTZWxlY3RvckFsbCgnbGknKS5mb3JFYWNoKGxpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGNoaWxkVWwgPSBsaS5xdWVyeVNlbGVjdG9yKCc6c2NvcGUgPiB1bCcpXG4gICAgICAgICAgICBpZiAoIWNoaWxkVWwpIHJldHVyblxuXG4gICAgICAgICAgICAvLyBBREQgVE9HR0xFIEFSUk9XXG4gICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICBzcGFuLmNsYXNzTmFtZSA9ICdvcGVuLWNsb3NlJ1xuICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJvcGVuXCI+4oaYPC9pPjxpIGNsYXNzPVwiY2xvc2VkXCI+4oaWPC9pPidcbiAgICAgICAgICAgIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0b2dnbGUobGkpKVxuXG4gICAgICAgICAgICBsaS5pbnNlcnRCZWZvcmUoc3BhbiwgY2hpbGRVbClcblxuICAgICAgICAgICAgLy8gY29sbGFwc2VkIGJ5IGRlZmF1bHRcbiAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG4gICAgICAgICAgICBjaGlsZFVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblxuICAgICAgICAgICAgLy8gb3BlbiBkZWZhdWx0c1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5jb250YWlucygnY3VycmVudCcpIHx8XG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdzZWN0aW9uJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG9wZW4obGkpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlIChsaSkge1xuICAgICAgICBpZiAobGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3RPcGVuJykpIHtcbiAgICAgICAgICAgIGNsb3NlKGxpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgb3BlbihsaSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9wZW4gKGxpKSB7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKVxuXG4gICAgICAgIGNvbnN0IGRpcmVjdFVsID0gbGkucXVlcnlTZWxlY3RvcignOnNjb3BlID4gdWwnKVxuICAgICAgICBpZiAoZGlyZWN0VWwpIGRpcmVjdFVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG5cbiAgICAgICAgLy8ga2VlcCBkZWVwZXIgbGV2ZWxzIGNvbGxhcHNlZFxuICAgICAgICBpZiAoZGlyZWN0VWwpIHtcbiAgICAgICAgICAgIGRpcmVjdFVsLnF1ZXJ5U2VsZWN0b3JBbGwoJzpzY29wZSB1bCcpLmZvckVhY2gobmVzdGVkVWwgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5lc3RlZExpID0gbmVzdGVkVWwucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgICAgIG5lc3RlZExpLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKVxuICAgICAgICAgICAgICAgIG5lc3RlZExpLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG4gICAgICAgICAgICAgICAgbmVzdGVkVWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIE5FVzogY2xvc2Ugc2libGluZ3Mgb24gdGhlIHNhbWUgbGV2ZWxcbiAgICAgICAgY29uc3QgcGFyZW50TGlzdCA9IGxpLnBhcmVudEVsZW1lbnRcbiAgICAgICAgcGFyZW50TGlzdFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoJzpzY29wZSA+IGxpLmNvbGxhcHNpYmxlTGlzdE9wZW4nKVxuICAgICAgICAgICAgLmZvckVhY2goc2libGluZyA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNpYmxpbmcgIT09IGxpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsb3NlKHNpYmxpbmcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcblxuICAgICAgICBtYXJrU2libGluZ1N0YXRlKGxpKVxuICAgICAgICB1cGRhdGVIYXNPcGVuKGxpLmNsb3Nlc3QoJy5jb2xsYXBzaWJsZUxpc3QnKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZSAobGkpIHtcbiAgICAgICAgbGkuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdENsb3NlZCcpXG5cbiAgICAgICAgY29uc3QgY2hpbGRVbCA9IGxpLnF1ZXJ5U2VsZWN0b3IoJzpzY29wZSA+IHVsJylcbiAgICAgICAgaWYgKGNoaWxkVWwpIGNoaWxkVWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXG4gICAgICAgIG1hcmtTaWJsaW5nU3RhdGUobGkpXG4gICAgICAgIHVwZGF0ZUhhc09wZW4obGkuY2xvc2VzdCgnLmNvbGxhcHNpYmxlTGlzdCcpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcmtTaWJsaW5nU3RhdGUgKGxpKSB7XG4gICAgICAgIGNvbnN0IHBhcmVudExpc3QgPSBsaS5wYXJlbnRFbGVtZW50XG4gICAgICAgIGlmICghcGFyZW50TGlzdC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdCcpKSByZXR1cm5cblxuICAgICAgICBjb25zdCBzaWJsaW5ncyA9IHBhcmVudExpc3QucXVlcnlTZWxlY3RvckFsbCgnOnNjb3BlID4gbGknKVxuICAgICAgICBjb25zdCBpc09wZW4gPSBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKVxuXG4gICAgICAgIHNpYmxpbmdzLmZvckVhY2goc2liID0+IHNpYi5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3ROb3RPcGVuJykpXG5cbiAgICAgICAgaWYgKGlzT3Blbikge1xuICAgICAgICAgICAgc2libGluZ3MuZm9yRWFjaChzaWIgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzaWIgIT09IGxpKSBzaWIuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0Tm90T3BlbicpXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdXBkYXRlSGFzT3BlbiAobGlzdCkge1xuICAgICAgICBpZiAoIWxpc3QpIHJldHVyblxuICAgICAgICBjb25zdCBoYXMgPSBsaXN0LnF1ZXJ5U2VsZWN0b3IoJy5jb2xsYXBzaWJsZUxpc3RPcGVuJylcbiAgICAgICAgbGlzdC5jbGFzc0xpc3QudG9nZ2xlKCdjb2xsYXBzaWJsZUxpc3RIYXNPcGVuJywgISFoYXMpXG4gICAgfVxuXG4gICAgcmV0dXJuIHsgYXBwbHkgfVxufSkoKVxuXG5Db2xsYXBzaWJsZUxpc3RzLmFwcGx5KClcbiIsImNvbnN0IG15Q29va2llID0ge1xuXG4gIHNldENvb2tpZTogZnVuY3Rpb24gKG5hbWUsIHZhbHVlLCBkYXlzKSB7XG4gICAgdmFyIGV4cGlyZXMgPSAnJ1xuICAgIGlmICh0eXBlb2YgZGF5cyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRheXMgPSAxNFxuICAgIH1cbiAgICBpZiAoZGF5cykge1xuICAgICAgdmFyIGRhdGUgPSBuZXcgRGF0ZSgpXG4gICAgICBkYXRlLnNldFRpbWUoZGF0ZS5nZXRUaW1lKCkgKyAoZGF5cyAqIDI0ICogNjAgKiA2MCAqIDEwMDApKVxuICAgICAgZXhwaXJlcyA9ICc7IGV4cGlyZXM9JyArIGRhdGUudG9VVENTdHJpbmcoKVxuICAgIH1cbiAgICBkb2N1bWVudC5jb29raWUgPSBuYW1lICsgJz0nICsgKHZhbHVlIHx8ICcnKSArIGV4cGlyZXMgKyAnOyBwYXRoPS8nXG4gIH0sXG5cbiAgZ2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBuYW1lRVEgPSBuYW1lICsgJz0nXG4gICAgdmFyIGNhID0gZG9jdW1lbnQuY29va2llLnNwbGl0KCc7JylcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNhLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgYyA9IGNhW2ldXG4gICAgICB3aGlsZSAoYy5jaGFyQXQoMCkgPT09ICcgJykge1xuICAgICAgICBjID0gYy5zdWJzdHJpbmcoMSwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgICBpZiAoYy5pbmRleE9mKG5hbWVFUSkgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGMuc3Vic3RyaW5nKG5hbWVFUS5sZW5ndGgsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbFxuICB9LFxuXG4gIGVyYXNlQ29va2llOiBmdW5jdGlvbiAobmFtZSkge1xuICAgIG15Q29va2llLnNldENvb2tpZShuYW1lLCBudWxsLCAwKVxuICB9XG59XG5cbmV4cG9ydCB7IG15Q29va2llIH1cbiIsInZhciBmb3JtZmllbGRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgJ2lucHV0LCBzZWxlY3QsIHRleHRhcmVhJ1xuKVxuZm9yICh2YXIgSiA9IGZvcm1maWVsZHMubGVuZ3RoIC0gMTsgSiA+PSAwOyAtLUopIHtcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuXG4gIHZhciBldnQgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnSFRNTEV2ZW50cycpXG4gIGV2dC5pbml0RXZlbnQoJ2NoYW5nZScsIGZhbHNlLCB0cnVlKVxuICBmb3JtZmllbGRzW0pdLmRpc3BhdGNoRXZlbnQoZXZ0KVxufVxuXG5mdW5jdGlvbiBhZGp1c3RTdHlsaW5nICh6RXZlbnQpIHtcbiAgdmFyIGlucFZhbCA9IHpFdmVudC50YXJnZXQudmFsdWVcbiAgaWYgKGlucFZhbCAmJiBpbnBWYWwucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpKSB7XG4gICAgekV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCduby12YWx1ZScpXG4gIH0gZWxzZSB7XG4gICAgekV2ZW50LnRhcmdldC5jbGFzc0xpc3QuYWRkKCduby12YWx1ZScpXG4gIH1cbn1cbiIsImNvbnN0IGltYWdlaG92ZXIgPSB7XG4gICAgcmVzZXRUaW1lb3V0OiBudWxsLFxuXG4gICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAgICAgJy5lbGVtZW50IHN1bm55c2lkZXVwX19hcHBfX2VsZW1lbnRzX193b3JrZXhhbXBsZSAuaW1hZ2UtY29udGFpbmVyJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGUgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1RvdWNoRGV2aWNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnJlc2V0VGltZW91dClcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHsgd2lkdGgsIGhlaWdodCwgbGVmdCwgdG9wIH0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeCA9IGUucGFnZVggLSBsZWZ0IC0gd2luZG93LnNjcm9sbFhcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeSA9IGUucGFnZVkgLSB0b3AgLSB3aW5kb3cuc2Nyb2xsWVxuXG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgICAgICAgICAgJy0tbW91c2UteCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAoeCAvIHdpZHRoKSAqIDUwIC0gMjVcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgICAgICctLW1vdXNlLXknLFxuICAgICAgICAgICAgICAgICAgICAgICAgMjUgLSAoeSAvIGhlaWdodCkgKiA1MFxuICAgICAgICAgICAgICAgICAgICApXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb3VjaERldmljZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCctLW1vdXNlLXgnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLnJlbW92ZVByb3BlcnR5KCctLW1vdXNlLXknKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwMClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KVxuICAgIH0sXG4gICAgaXNUb3VjaERldmljZVZhcjogbnVsbCxcblxuICAgIGlzVG91Y2hEZXZpY2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNUb3VjaERldmljZVZhciA9PT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5pc1RvdWNoRGV2aWNlVmFyID1cbiAgICAgICAgICAgICAgICAnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgfHxcbiAgICAgICAgICAgICAgICAnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3IubWF4VG91Y2hQb2ludHMgPiAwIHx8XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1zTWF4VG91Y2hQb2ludHMgPiAwXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuaXNUb3VjaERldmljZVZhclxuICAgIH1cbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGZ1bmN0aW9uICgpIHtcbiAgICBpbWFnZWhvdmVyLmluaXQoKVxufSlcbiIsIlxuY29uc3QgaW1hZ2VXcmFwcGVyID0gKCkgPT4ge1xuICBmdW5jdGlvbiB3cmFwIChlbCwgd3JhcHBlcikge1xuICAgIGVsLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHdyYXBwZXIsIGVsKVxuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoZWwpXG4gIH1cbiAgLy8gY3JlYXRlIHRoZSBjb250YWluZXIgZGl2XG5cbiAgLy8gZ2V0IGFsbCBkaXZzXG4gIGNvbnN0IGltYWdlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50eXBvZ3JhcGh5IGltZycpXG4gIC8vIGdldCB0aGUgYm9keSBlbGVtZW50XG4gIC8vIGFwcGx5IGNsYXNzIHRvIGNvbnRhaW5lciBkaXZcblxuICAvLyBmaW5kIG91dCBhbGwgdGhvc2UgZGl2cyBoYXZpbmcgY2xhc3MgQ1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGltYWdlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGR2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICBkdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2ltYWdlLWNvbnRhaW5lcicpXG4gICAgY29uc3QgaW1nID0gaW1hZ2VzW2ldXG4gICAgd3JhcChpbWcsIGR2KVxuICB9XG59XG5cbmltYWdlV3JhcHBlcigpXG4iLCJjb25zdCBzaG93Um9ja2V0TW9kZSA9IHtcbiAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IHRvZ2dsZUNsYXNzT25Ib3ZlciA9IChlKSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICAgICAgLmNsYXNzTGlzdFxuICAgICAgICAudG9nZ2xlKCdtb3VzZS1vdmVyLWxvZ28nLCBlLnR5cGUgPT09ICdtb3VzZWVudGVyJylcbiAgICB9XG4gICAgY29uc3QgbG9nbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsb2dvJylcbiAgICBsb2dvLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZW50ZXInLCB0b2dnbGVDbGFzc09uSG92ZXIpXG4gICAgbG9nby5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdG9nZ2xlQ2xhc3NPbkhvdmVyKVxuICB9XG59XG5cbnNob3dSb2NrZXRNb2RlLmluaXQoKVxuIiwid2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2JlZm9yZXByaW50JywgZXZlbnQgPT4ge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2NvbnRlbnQtYmVsb3ctcXVvdGUnKVxuICAgIGVsLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6ICdzbW9vdGgnIH0pXG59KVxuIiwiaW1wb3J0IHsgYm9keUNsYXNzIH0gZnJvbSAnLi9ib2R5LWNsYXNzJ1xuXG5jb25zdCBzY3JvbGxNYW5hZ2VyID0ge1xuICAgIHNjcmVlbkhlaWdodDogd2luZG93LmlubmVySGVpZ2h0LFxuICAgIGxhc3RTY3JvbGw6IDAsXG4gICAgYm9keTogbnVsbCxcbiAgICBxdW90ZTogbnVsbCxcbiAgICBmb290ZXI6IG51bGwsXG4gICAgaGVhZGVyUmFuZ2U6IDcwLCAvLyBpbiB2aFxuICAgIGZvb3RlclJhbmdlOiAxODAsIC8vIGluIHZoXG4gICAgaGVhZGVyUGN0OiAwLFxuICAgIGZvb3RlclBjdDogMTAwLFxuICAgIGp1c3RTY3JvbGxlZER1cmF0aW9uOiAyMjAwLCAvLyBtcyDigJQgY2hhbmdlIGZyZWVseVxuICAgIGp1c3RTY3JvbGxlZFRpbWVyOiBudWxsLFxuICAgIHNjcm9sbFN0b3BUaW1lcjogbnVsbCxcbiAgICBzY3JvbGxTdG9wRGVsYXk6IDEyMCwgLy8gbXMgYWZ0ZXIgbGFzdCBzY3JvbGwgZXZlbnRcblxuICAgIGluaXQgKCkge1xuICAgICAgICB0aGlzLmJvZHkgPSBib2R5Q2xhc3MuZ2V0Qm9keU9iamVjdCgpXG4gICAgICAgIHRoaXMucXVvdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWFpbi1xdW90ZScpXG4gICAgICAgIHRoaXMuZm9vdGVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvb3RlcicpXG5cbiAgICAgICAgdGhpcy5yZW1lYXN1cmUoKVxuICAgICAgICB0aGlzLmJpbmRTY3JvbGwoKVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCAoKSA9PiB0aGlzLnJlbWVhc3VyZSgpKVxuXG4gICAgICAgIC8vIE5FVzogVHJpZ2dlciB0aGUgaW5pdGlhbCBzY3JvbGwgY2FsY3VsYXRpb25cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHRoaXMub25TY3JvbGwoKSlcbiAgICB9LFxuXG4gICAgcmVtZWFzdXJlICgpIHtcbiAgICAgICAgdGhpcy5zY3JlZW5IZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICAgICAgdGhpcy5sYXN0U2Nyb2xsID0gdGhpcy5nZXRTY3JvbGwoKVxuICAgIH0sXG5cbiAgICBnZXRTY3JvbGwgKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LnNjcm9sbFkgfHwgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcFxuICAgIH0sXG5cbiAgICBiaW5kU2Nyb2xsICgpIHtcbiAgICAgICAgbGV0IHRpY2tpbmcgPSBmYWxzZVxuXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRpY2tpbmcpIHtcbiAgICAgICAgICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNjcm9sbCgpXG4gICAgICAgICAgICAgICAgICAgIHRpY2tpbmcgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgdGlja2luZyA9IHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgb25TY3JvbGwgKCkge1xuICAgICAgICBjb25zdCBzY3JvbGwgPSB0aGlzLmdldFNjcm9sbCgpXG4gICAgICAgIGNvbnN0IG1heFNjcm9sbCA9XG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5zY3JlZW5IZWlnaHRcblxuICAgICAgICB0aGlzLnVwZGF0ZUhlYWRlckNsYXNzZXMoc2Nyb2xsKVxuICAgICAgICB0aGlzLnVwZGF0ZUZvb3RlckNsYXNzZXMoc2Nyb2xsLCBtYXhTY3JvbGwpXG4gICAgICAgIHRoaXMudXBkYXRlUm9ja2V0VGhlbWUoKVxuICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbERpcmVjdGlvbihzY3JvbGwpXG4gICAgICAgIHRoaXMuaGFuZGxlSnVzdFNjcm9sbGVkKClcblxuICAgICAgICB0aGlzLmxhc3RTY3JvbGwgPSBzY3JvbGxcbiAgICB9LFxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSEVBREVSIC8gRk9PVEVSIFNUQVRFICgw4oCTMTAwKVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHVwZGF0ZUhlYWRlckNsYXNzZXMgKGN1cnJlbnRTY3JvbGwpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyUGl4ZWxzID0gdGhpcy5zY3JlZW5IZWlnaHQgKiAodGhpcy5oZWFkZXJSYW5nZSAvIDEwMClcbiAgICAgICAgY29uc3QgcmF0aW8gPSB0aGlzLmNsYW1wKGN1cnJlbnRTY3JvbGwgLyBoZWFkZXJQaXhlbHMsIDAsIDEpXG4gICAgICAgIGNvbnN0IHBjdCA9IE1hdGgucm91bmQocmF0aW8gKiAxMDApXG5cbiAgICAgICAgdGhpcy5oZWFkZXJQY3QgPSBwY3RcbiAgICAgICAgdGhpcy5yZXBsYWNlU3RlcENsYXNzZXMoJ2hlYWRlcicsIHBjdClcblxuICAgICAgICBpZiAocGN0ID49IDEwMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Bhc3QtaGVhZGVyJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwYXN0LWhlYWRlcicpXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHVwZGF0ZUZvb3RlckNsYXNzZXMgKGN1cnJlbnRTY3JvbGwsIG1heFNjcm9sbCkge1xuICAgICAgICBjb25zdCBib3R0b21EaXN0YW5jZSA9IG1heFNjcm9sbCAtIGN1cnJlbnRTY3JvbGxcblxuICAgICAgICBjb25zdCBoZWFkZXJQaXhlbHMgPSB0aGlzLnNjcmVlbkhlaWdodCAqICh0aGlzLmhlYWRlclJhbmdlIC8gMTAwKVxuXG4gICAgICAgIC8vIElmIHdlJ3JlIHN0aWxsIGluIHRoZSBoZWFkZXIgem9uZSwgaGlkZSBmb290ZXIgY2xhc3Nlc1xuICAgICAgICBpZiAoY3VycmVudFNjcm9sbCA8IGhlYWRlclBpeGVscykge1xuICAgICAgICAgICAgdGhpcy5mb290ZXJQY3QgPSAxMDBcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlU3RlcENsYXNzZXMoJ2Zvb3RlcicpXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZm9vdGVyLXZpc2libGUnKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBmb290ZXJQaXhlbHMgPSB0aGlzLnNjcmVlbkhlaWdodCAqICh0aGlzLmZvb3RlclJhbmdlIC8gMTAwKVxuICAgICAgICBjb25zdCByYXRpbyA9IHRoaXMuY2xhbXAoYm90dG9tRGlzdGFuY2UgLyBmb290ZXJQaXhlbHMsIDAsIDEpXG4gICAgICAgIGNvbnN0IHBjdCA9IE1hdGgucm91bmQocmF0aW8gKiAxMDApXG5cbiAgICAgICAgdGhpcy5mb290ZXJQY3QgPSBwY3RcbiAgICAgICAgdGhpcy5yZXBsYWNlU3RlcENsYXNzZXMoJ2Zvb3RlcicsIHBjdClcblxuICAgICAgICBpZiAocGN0IDwgMTAwKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnZm9vdGVyLXZpc2libGUnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Zvb3Rlci12aXNpYmxlJylcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZXBsYWNlU3RlcENsYXNzZXMgKHByZWZpeCwgcGN0KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDEwMDsgaSArPSAxMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fS0ke2l9YClcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3VuZGVkID0gTWF0aC5yb3VuZChwY3QgLyAxMCkgKiAxMFxuICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZChgJHtwcmVmaXh9LSR7cm91bmRlZH1gKVxuICAgIH0sXG4gICAgcmVtb3ZlU3RlcENsYXNzZXMgKHByZWZpeCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxMDA7IGkgKz0gMTApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH0tJHtpfWApXG4gICAgICAgIH1cbiAgICB9LFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFJPQ0tFVCBUSEVNRVxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHVwZGF0ZVJvY2tldFRoZW1lICgpIHtcbiAgICAgICAgY29uc3QgaGFzUm9ja2V0ID0gIXRoaXMuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ25vLXJvY2tldC1zaG93JylcbiAgICAgICAgaWYgKCFoYXNSb2NrZXQpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IGluSGVhZGVyWm9uZSA9IHRoaXMuaGVhZGVyUGN0IDwgMTAwXG4gICAgICAgIGNvbnN0IGluRm9vdGVyWm9uZSA9IHRoaXMuZm9vdGVyUGN0IDwgMTAwXG5cbiAgICAgICAgaWYgKGluSGVhZGVyWm9uZSB8fCBpbkZvb3RlclpvbmUpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCd0aGVtZS1yb2NrZXQnKVxuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoYm9keUNsYXNzLmdldFRoZW1lKCkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgndGhlbWUtcm9ja2V0JylcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKGJvZHlDbGFzcy5nZXRUaGVtZSgpKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFNDUk9MTCBESVJFQ1RJT05cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB1cGRhdGVTY3JvbGxEaXJlY3Rpb24gKHNjcm9sbCkge1xuICAgICAgICBpZiAoc2Nyb2xsID4gdGhpcy5sYXN0U2Nyb2xsKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsZWQtdXAnKVxuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbGVkLWRvd24nKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ3Njcm9sbGVkLXVwJylcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxlZC1kb3duJylcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBKVVNUIFNDUk9MTEVEXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgaGFuZGxlSnVzdFNjcm9sbGVkICgpIHtcbiAgICAgICAgLy8gQ2xlYXIgcHJldmlvdXMgc3RvcCBkZXRlY3Rpb25cbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsU3RvcFRpbWVyKSB7XG4gICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5zY3JvbGxTdG9wVGltZXIpXG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjcm9sbFN0b3BUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgLy8gU2Nyb2xsIGhhcyBlbmRlZCDihpIgYWRkIGp1c3Qtc2Nyb2xsZWRcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdqdXN0LXNjcm9sbGVkJylcblxuICAgICAgICAgICAgLy8gQ2xlYXIgcHJldmlvdXMgdmlzaWJpbGl0eSB0aW1lclxuICAgICAgICAgICAgaWYgKHRoaXMuanVzdFNjcm9sbGVkVGltZXIpIHtcbiAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5qdXN0U2Nyb2xsZWRUaW1lcilcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5qdXN0U2Nyb2xsZWRUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdqdXN0LXNjcm9sbGVkJylcbiAgICAgICAgICAgIH0sIHRoaXMuanVzdFNjcm9sbGVkRHVyYXRpb24pXG4gICAgICAgIH0sIHRoaXMuc2Nyb2xsU3RvcERlbGF5KVxuICAgIH0sXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gVVRJTFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGNsYW1wICh2LCBtaW4sIG1heCkge1xuICAgICAgICByZXR1cm4gTWF0aC5tYXgobWluLCBNYXRoLm1pbihtYXgsIHYpKVxuICAgIH1cbn1cblxuc2Nyb2xsTWFuYWdlci5pbml0KClcbiIsImRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zaGluZXInKS5mb3JFYWNoKChlbCkgPT4ge1xuICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgY29uc3QgdGFyZ2V0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQtYmVsb3ctcXVvdGUnKTtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuXG4gICAgY29uc3Qgc2Nyb2xsVG8gPSB0YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wICsgd2luZG93LnNjcm9sbFkgLSAoKHdpbmRvdy5pbm5lckhlaWdodCAvIDIgLSAzNSkpO1xuICAgIHdpbmRvdy5zY3JvbGxUbyh7IHRvcDogc2Nyb2xsVG8sIGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcbiAgfSk7XG59KTtcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuXG4gICAgY29uc3QgdG9jID0gKCkgPT4ge1xuICAgICAgICAvLyBjcmVhdGUgdGhlIGNvbnRhaW5lciBkaXZcbiAgICAgICAgLy8gZ2V0IGFsbCBkaXZzXG4gICAgICAgIGNvbnN0IGhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICAgICcjY29udGVudC1iZWxvdy1xdW90ZSBoMSwgI2NvbnRlbnQtYmVsb3ctcXVvdGUgaDInXG4gICAgICAgIClcbiAgICAgICAgLy8gZ2V0IHRoZSBib2R5IGVsZW1lbnRcbiAgICAgICAgLy8gYXBwbHkgY2xhc3MgdG8gY29udGFpbmVyIGRpdlxuICAgICAgICBpZiAoaGVhZGluZ3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCdoYXMtdG9jJylcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgndG9jLW9mZicpXG4gICAgICAgICAgICBsZXQgY291bnQgPSAwXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY291bnQgPSBpICsgMVxuICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gaGVhZGluZ3NbaV1cbiAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhlbClcbiAgICAgICAgICAgICAgICBsZXQgcHJldmlvdXNFbGVtID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZ1xuICAgICAgICAgICAgICAgIGlmIChwcmV2aW91c0VsZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gQXBwbHkgc3R5bGVzIG9yIGNsYXNzZXMgdG8gcHJldmlvdXNFbGVtXG4gICAgICAgICAgICAgICAgICAgIHByZXZpb3VzRWxlbS5jbGFzc0xpc3QuYWRkKCdib3R0b20tc3BhY2UnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbC5pZCA9ICd0b2MtJyArIGNvdW50XG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnY291bnRhYmxlLWljb25zJylcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdpY29uLScgKyBjb3VudClcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdvcGVuLWNsb3NlJylcbiAgICAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ2ljb24nKVxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW5FbmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICAgICAgICBzcGFuRW5kLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZS1ob2xkZXInKVxuICAgICAgICAgICAgICAgIC8vIHNwYW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVDbGljay5iaW5kKG51bGwsIGVsKSlcbiAgICAgICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm9wZW5cIj4rPC9pPjxpIGNsYXNzPVwiY2xvc2VkXCI+4oCTPC9pPidcbiAgICAgICAgICAgICAgICBzcGFuRW5kLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImFjdGl2ZVwiPuKWgjwvaT4nXG4gICAgICAgICAgICAgICAgZWwuaW5zZXJ0QmVmb3JlKHNwYW4sIGVsLmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICAgICAgZWwuYXBwZW5kQ2hpbGQoc3BhbkVuZClcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1vbicpXG4gICAgICAgICAgICAgICAgICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1vZmYnKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGFzaCA9IHRoaXMuaWRcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhlYWRpbmdzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnI2NvbnRlbnQtYmVsb3ctcXVvdGUgLnRvYy1hY3RpdmUnXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGhlYWRpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSBoZWFkaW5nc1tpXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ3RvYy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgndG9jLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3RvYy1vbicpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID0gaGFzaFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjJyArIGhhc2gpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jazogJ3N0YXJ0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKCcjdG9jLTEnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gYm9keS5jbGFzc0xpc3QuYWRkKCduby10b2MnKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9PT0gJyN0b2MnICYmXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2Mtb2ZmJykgJiZcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ2hhcy10b2MnKVxuICAgICkge1xuICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1vbicpXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgndG9jLW9mZicpXG4gICAgfVxuICAgIHRvYygpXG5cbiAgICAvLyBjb25zdCBjbGlja2VkRWxlbWVudCA9IGV2ZW50LnRhcmdldFxuICAgIC8vIGlmIChldmVudC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb3VudGFibGUtaWNvbnMnKSkge1xuICAgIC8vICAgICBjb25zb2xlLmxvZyhldmVudC50YXJnZXQpXG4gICAgLy8gICAgIGNvbnNvbGUubG9nKCdBQScpXG4gICAgLy8gICAgIGV2ZW50LnRhcmdldC5jbGljaygpXG4gICAgLy8gfVxufSlcbiIsImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgY29uc3QgaXRlbSA9IGUudGFyZ2V0LmNsb3Nlc3QoJy53b3JrLWV4YW1wbGUtaW1hZ2UnKVxuICAgIGlmICghaXRlbSkgcmV0dXJuXG5cbiAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ2lzLWFjdGl2ZScpXG59KVxuIiwiLy8gLy8gbm9uLXRoZW1lZCBhcHBcbi8vIGltcG9ydCAnc2l0ZS9hcHAvY2xpZW50L2phdmFzY3JpcHQvTXlKYXZhc2NyaXB0RmlsZSc7XG4vL1xuLy9cbi8vIC8vIHZlbmRvciBtb2R1bGVzXG4vLyBpbXBvcnQgJ3NpdGUvdmVuZG9yL215dmVuZG9yL215cGFja2FnZS9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vLyAvLyB5b3VyIHRoZW1lZCBhcHAgZmlsZXNcbi8vIGltcG9ydCAnLi9qcy9wYXJ0aWFscy9Tb21lT3RoZXJKYXZhc2NyaXB0RmlsZSc7XG5pbXBvcnQgJy4vanMvY29va2llJ1xuaW1wb3J0ICcuL2pzL2JvZHktY2xhc3MnXG5pbXBvcnQgJy4vanMvc2Nyb2xsLXRvLWNvbnRlbnQtYmVsb3ctcXVvdGUnXG5pbXBvcnQgJy4vanMvdG9jJ1xuaW1wb3J0ICcuL2pzL2NvbGxhcHNpYmxlLW1lbnUnXG5pbXBvcnQgJy4vanMvc2Nyb2xsLW1hbmFnZXInXG5pbXBvcnQgJy4vanMvZm9ybSdcbmltcG9ydCAnLi9qcy93b3JrLWV4YW1wbGUnXG5pbXBvcnQgJy4vanMvbW91c2Utb3Zlci1sb2dvJ1xuaW1wb3J0ICcuL2pzL2ltYWdlcydcbmltcG9ydCAnLi9qcy9pbWFnZS1ob3ZlcidcbmltcG9ydCAnLi9qcy9wcmludCdcbmltcG9ydCAnLi9qcy9iYXR0ZXJ5LXNhdmVyJ1xuIl0sIm5hbWVzIjpbImRlYm91bmNlIiwiY2FsbGJhY2siLCJ0aW1lb3V0IiwiX3RoaXMiLCJ0aW1lciIsImUiLCJfdGhhdCIsIl90aGlzMiIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJjYWxsIiwidXNlckFjdGlvbiIsImZ1bGxTY3JlZW5EaXYiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwic3R5bGUiLCJkaXNwbGF5IiwiYWRkRXZlbnRMaXN0ZW5lciIsIm15Q29va2llIiwiYm9keUNsYXNzIiwiYm9keU9iamVjdCIsInRoZW1lIiwiaW5pdCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRPclRvZ2dsZUJvZHlDbGFzcyIsInJldHJpZXZlQ29va2llT3JIYXNoIiwic2Nyb2xsU3RhcnQiLCJhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycyIsImdldEJvZHlPYmplY3QiLCJnZXRUaGVtZSIsIlN0cmluZyIsImdldEF0dHJpYnV0ZSIsInNob3dNZW51QXNEZWZhdWx0IiwiaXNIb21lUGFnZSIsImhhc0ZyYWdtZW50IiwiY2xpY2siLCJhZGRSb2NrZXRNb2RlVmlkZW9PckltYWdlIiwiZXZlbnQiLCJjbGFzc0xpc3QiLCJhZGQiLCJkb2N1bWVudEVsZW1lbnQiLCJyZW1vdmUiLCJ3aW5kb3ciLCJoYXNoIiwiZ2V0SGFzaEZyb21VUkwiLCJwcmVmZXJyZWRUaGVtZSIsImVyYXNlQ29va2llIiwicnVuQ2xpY2tGb3JFbGVtZW50IiwiZ2V0Q29va2llIiwic2V0QXR0cmlidXRlIiwidXNlclByZWZlcnNEYXJrVGhlbWUiLCJtYXRjaE1lZGlhIiwibWF0Y2hlcyIsInRyaW0iLCJsZW5ndGgiLCJvYmoiLCJjb250YWlucyIsInJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZSIsIm9ialNlbGVjdG9yIiwiaXNUaGVtZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJmb3JFYWNoIiwib25lRWFjaE9iamVjdCIsImFjdGlvbkJvZHlDbGFzc0NoYW5nZSIsInRvZ2dsZSIsInNjcm9sbEludG9WaWV3IiwiYmVoYXZpb3IiLCJibG9jayIsInNjcm9sbFRvIiwicHJldmVudERlZmF1bHQiLCJ0b2dnbGVDbGFzcyIsImlkIiwiaGFzQXR0cmlidXRlIiwic2V0Q29va2llIiwiZ2V0SGFzaEZyb21TdHJpbmciLCJyZXBsYWNlIiwibG9jYXRpb24iLCJvYmplY3QiLCJzdHJpbmciLCJjbGFzc2VzIiwiZ2V0Q2xhc3Nlc0Zyb21MaXN0IiwiaSIsImxlbiIsInZhbHVlIiwiYXJyYXkiLCJzcGxpdCIsIm5ld0FycmF5IiwicHVzaCIsInJlbW92ZUhhc2hGcm9tU3RyaW5nIiwiaGFzUm9ja2V0U2hvdyIsIl9ib2R5Q2xhc3MkYm9keU9iamVjdCIsIl9ib2R5Q2xhc3MkYm9keU9iamVjdDIiLCJ2aWRlb0lkIiwiaXNMYW5kc2NhcGUiLCJpbWFnZVVSTCIsImltYWdlWCIsImltYWdlWSIsImRpdiIsImNyZWF0ZUVsZW1lbnQiLCJzaGFkb3ciLCJzaGFkb3dDb2xvdXIiLCJ2aWRlb1VybCIsImlubmVySFRNTCIsInRlbXAiLCJmaXJzdENoaWxkIiwiaW5zZXJ0QmVmb3JlIiwidmlkZW8iLCJib2R5IiwiYmFja2dyb3VuZEltYWdlIiwiYmFja2dyb3VuZFBvc2l0aW9uIiwiaW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJvbmVycm9yIiwic3JjIiwicGF0aG5hbWUiLCJDb2xsYXBzaWJsZUxpc3RzIiwiYXBwbHkiLCJsaXN0IiwiYXBwbHlUbyIsInVwZGF0ZUhhc09wZW4iLCJsaSIsImNoaWxkVWwiLCJzcGFuIiwiY2xhc3NOYW1lIiwib3BlbiIsImNsb3NlIiwiZGlyZWN0VWwiLCJuZXN0ZWRVbCIsIm5lc3RlZExpIiwicGFyZW50RWxlbWVudCIsInBhcmVudExpc3QiLCJzaWJsaW5nIiwibWFya1NpYmxpbmdTdGF0ZSIsImNsb3Nlc3QiLCJzaWJsaW5ncyIsImlzT3BlbiIsInNpYiIsImhhcyIsIm5hbWUiLCJkYXlzIiwiZXhwaXJlcyIsImRhdGUiLCJEYXRlIiwic2V0VGltZSIsImdldFRpbWUiLCJ0b1VUQ1N0cmluZyIsImNvb2tpZSIsIm5hbWVFUSIsImNhIiwiYyIsImNoYXJBdCIsInN1YnN0cmluZyIsImluZGV4T2YiLCJmb3JtZmllbGRzIiwiSiIsImFkanVzdFN0eWxpbmciLCJldnQiLCJjcmVhdGVFdmVudCIsImluaXRFdmVudCIsImRpc3BhdGNoRXZlbnQiLCJ6RXZlbnQiLCJpbnBWYWwiLCJ0YXJnZXQiLCJpbWFnZWhvdmVyIiwicmVzZXRUaW1lb3V0IiwiZWwiLCJpc1RvdWNoRGV2aWNlIiwiX2UkdGFyZ2V0JGdldEJvdW5kaW5nIiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJoZWlnaHQiLCJsZWZ0IiwidG9wIiwieCIsInBhZ2VYIiwic2Nyb2xsWCIsInkiLCJwYWdlWSIsInNjcm9sbFkiLCJzZXRQcm9wZXJ0eSIsInJlbW92ZVByb3BlcnR5IiwiaXNUb3VjaERldmljZVZhciIsIm5hdmlnYXRvciIsIm1heFRvdWNoUG9pbnRzIiwibXNNYXhUb3VjaFBvaW50cyIsImltYWdlV3JhcHBlciIsIndyYXAiLCJ3cmFwcGVyIiwicGFyZW50Tm9kZSIsImFwcGVuZENoaWxkIiwiaW1hZ2VzIiwiZHYiLCJzaG93Um9ja2V0TW9kZSIsInRvZ2dsZUNsYXNzT25Ib3ZlciIsInR5cGUiLCJsb2dvIiwic2Nyb2xsTWFuYWdlciIsInNjcmVlbkhlaWdodCIsImlubmVySGVpZ2h0IiwibGFzdFNjcm9sbCIsInF1b3RlIiwiZm9vdGVyIiwiaGVhZGVyUmFuZ2UiLCJmb290ZXJSYW5nZSIsImhlYWRlclBjdCIsImZvb3RlclBjdCIsImp1c3RTY3JvbGxlZER1cmF0aW9uIiwianVzdFNjcm9sbGVkVGltZXIiLCJzY3JvbGxTdG9wVGltZXIiLCJzY3JvbGxTdG9wRGVsYXkiLCJyZW1lYXN1cmUiLCJiaW5kU2Nyb2xsIiwicmVxdWVzdEFuaW1hdGlvbkZyYW1lIiwib25TY3JvbGwiLCJnZXRTY3JvbGwiLCJzY3JvbGxUb3AiLCJ0aWNraW5nIiwic2Nyb2xsIiwibWF4U2Nyb2xsIiwic2Nyb2xsSGVpZ2h0IiwidXBkYXRlSGVhZGVyQ2xhc3NlcyIsInVwZGF0ZUZvb3RlckNsYXNzZXMiLCJ1cGRhdGVSb2NrZXRUaGVtZSIsInVwZGF0ZVNjcm9sbERpcmVjdGlvbiIsImhhbmRsZUp1c3RTY3JvbGxlZCIsImN1cnJlbnRTY3JvbGwiLCJoZWFkZXJQaXhlbHMiLCJyYXRpbyIsImNsYW1wIiwicGN0IiwiTWF0aCIsInJvdW5kIiwicmVwbGFjZVN0ZXBDbGFzc2VzIiwiYm90dG9tRGlzdGFuY2UiLCJyZW1vdmVTdGVwQ2xhc3NlcyIsImZvb3RlclBpeGVscyIsInByZWZpeCIsImNvbmNhdCIsInJvdW5kZWQiLCJoYXNSb2NrZXQiLCJpbkhlYWRlclpvbmUiLCJpbkZvb3RlclpvbmUiLCJfdGhpczMiLCJ2IiwibWluIiwibWF4IiwidG9jIiwiaGVhZGluZ3MiLCJjb3VudCIsInByZXZpb3VzRWxlbSIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJzcGFuRW5kIiwiaXRlbSJdLCJzb3VyY2VSb290IjoiIn0=