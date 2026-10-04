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
      window.setTimeout(function () {
        bodyClass.bodyObject.classList.add('splash-completed');
      }, 2000);
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
//# sourceMappingURL=app.js.map