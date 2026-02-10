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
/* harmony import */ var _js_toc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/toc */ "../sun/src/js/toc.js");
/* harmony import */ var _js_toc__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_toc__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/collapsible-menu */ "../sun/src/js/collapsible-menu.js");
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_collapsible_menu__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _js_scroll_manager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/scroll-manager */ "../sun/src/js/scroll-manager.js");
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/form */ "../sun/src/js/form.js");
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_form__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _js_work_example__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/work-example */ "../sun/src/js/work-example.js");
/* harmony import */ var _js_work_example__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_work_example__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/mouse-over-logo */ "../sun/src/js/mouse-over-logo.js");
/* harmony import */ var _js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_mouse_over_logo__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/images */ "../sun/src/js/images.js");
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_images__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _js_image_hover__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/image-hover */ "../sun/src/js/image-hover.js");
/* harmony import */ var _js_image_hover__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_js_image_hover__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _js_print__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./js/print */ "../sun/src/js/print.js");
/* harmony import */ var _js_print__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_js_print__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _js_battery_saver__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./js/battery-saver */ "../sun/src/js/battery-saver.js");
/* harmony import */ var _js_battery_saver__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_js_battery_saver__WEBPACK_IMPORTED_MODULE_11__);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUFDQTtFQUNBO0VBQ0E7RUFDQTtBQUNKLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7O0FDbEdGMU8sUUFBUSxDQUFDSSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQVosQ0FBQyxFQUFJO0VBQ3BDLElBQU13UCxJQUFJLEdBQUd4UCxDQUFDLENBQUM4SixNQUFNLENBQUM3QixPQUFPLENBQUMscUJBQXFCLENBQUM7RUFDcEQsSUFBSSxDQUFDdUgsSUFBSSxFQUFFO0VBRVhBLElBQUksQ0FBQ3ZOLFNBQVMsQ0FBQzBCLE1BQU0sQ0FBQyxXQUFXLENBQUM7QUFDdEMsQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNvQjtBQUNJO0FBQ1A7QUFDYTtBQUNGO0FBQ1Y7QUFDUTtBQUNHO0FBQ1Q7QUFDSztBQUNOIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvYmF0dGVyeS1zYXZlci5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9ib2R5LWNsYXNzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2NvbGxhcHNpYmxlLW1lbnUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvY29va2llLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2Zvcm0uanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvaW1hZ2UtaG92ZXIuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvaW1hZ2VzLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL21vdXNlLW92ZXItbG9nby5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9wcmludC5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9zY3JvbGwtbWFuYWdlci5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy90b2MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvd29yay1leGFtcGxlLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL21haW4uanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGVib3VuY2UgPSAoY2FsbGJhY2ssIHRpbWVvdXQsIF90aGlzKSA9PiB7XG4gICAgbGV0IHRpbWVyXG4gICAgcmV0dXJuIGUgPT4ge1xuICAgICAgICBjb25zdCBfdGhhdCA9IHRoaXNcbiAgICAgICAgaWYgKHRpbWVyKSBjbGVhclRpbWVvdXQodGltZXIpXG4gICAgICAgIHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBjYWxsYmFjay5jYWxsKF90aGlzIHx8IF90aGF0LCBlKVxuICAgICAgICB9LCB0aW1lb3V0KVxuICAgIH1cbn1cblxuY29uc3QgdXNlckFjdGlvbiA9IGRlYm91bmNlKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBmdWxsU2NyZWVuRGl2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JhdHRlcnktc2F2ZXItZGl2JylcblxuICAgIC8vIFNob3cgdGhlIGRpdiB3aGVuIHRoZSBkb2N1bWVudCBpcyBsb2FkZWRcbiAgICBmdWxsU2NyZWVuRGl2LnN0eWxlLmRpc3BsYXkgPSAnZmxleCdcblxuICAgIC8vIEFkZCBjbGljayBldmVudCBsaXN0ZW5lclxuICAgIGZ1bGxTY3JlZW5EaXYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bGxTY3JlZW5EaXYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgIH0pXG59LCA2MDAwMClcblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB1c2VyQWN0aW9uLCBmYWxzZSlcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIHVzZXJBY3Rpb24sIGZhbHNlKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigncG9wc3RhdGUnLCB1c2VyQWN0aW9uLCBmYWxzZSlcblxudXNlckFjdGlvbigpXG4iLCJpbXBvcnQgeyBteUNvb2tpZSB9IGZyb20gJy4vY29va2llLmpzJ1xuXG5leHBvcnQgY29uc3QgYm9keUNsYXNzID0ge1xuICAgIGJvZHlPYmplY3Q6IG51bGwsXG5cbiAgICB0aGVtZTogJycsXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgICAgIGJvZHlDbGFzcy5hZGRPclRvZ2dsZUJvZHlDbGFzcygnI21lbnUtdG9nZ2xlJywgZmFsc2UpXG5cbiAgICAgICAgLy8gaWYgeW91IGNsaWNrIG9uIHRoZW1lLXNlbGVjdG9yLCB5b3Ugc2VsZWN0IHRoZSB0aGVtZVxuICAgICAgICBib2R5Q2xhc3MuYWRkT3JUb2dnbGVCb2R5Q2xhc3MoJy50aGVtZS1zZWxlY3RvcicsIHRydWUpXG4gICAgICAgIHRoaXMudGhlbWUgPVxuICAgICAgICAgICAgLy8gaWYgeW91IGNsaWNrIG9uIHNldC10aGVtLCB5b3Ugc2VsZWN0IHRoZSB0aGVtZVxuICAgICAgICAgICAgYm9keUNsYXNzLnJldHJpZXZlQ29va2llT3JIYXNoKClcbiAgICAgICAgLy8gZXhwb3NlIHNjcm9sbGVkIGJlaGF2aW91clxuICAgICAgICB0aGlzLnNjcm9sbFN0YXJ0KClcbiAgICAgICAgdGhpcy5hZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVycygpXG4gICAgfSxcblxuICAgIGdldEJvZHlPYmplY3Q6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGJvZHlDbGFzcy5ib2R5T2JqZWN0XG4gICAgfSxcblxuICAgIGdldFRoZW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBuZXcgU3RyaW5nKGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScpKVxuICAgIH0sXG5cbiAgICBzaG93TWVudUFzRGVmYXVsdDogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgICBib2R5Q2xhc3MuaXNIb21lUGFnZSgpID09PSB0cnVlICYmXG4gICAgICAgICAgICBib2R5Q2xhc3MuaGFzRnJhZ21lbnQoKSA9PT0gZmFsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbWVudS10b2dnbGUnKS5jbGljaygpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnM6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYm9keUNsYXNzLmFkZFJvY2tldE1vZGVWaWRlb09ySW1hZ2UoKVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LWxvYWRlZCcpXG4gICAgICAgICAgICBpZiAoJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgndG91Y2gnKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCduby10b3VjaCcpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2JvZHktdW5sb2FkZWQnKVxuICAgICAgICAvLyB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JldW5sb2FkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAvLyAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCgnYm9keS11bmxvYWRlZCcpXG4gICAgICAgIC8vIH0pXG4gICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ3BvcHN0YXRlJylcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgcmV0cmlldmVDb29raWVPckhhc2g6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGV0IGhhc2ggPSBib2R5Q2xhc3MuZ2V0SGFzaEZyb21VUkwoKVxuICAgICAgICBsZXQgcHJlZmVycmVkVGhlbWUgPSAnJ1xuICAgICAgICBpZiAoaGFzaCA9PT0gJ3Jlc2V0Jykge1xuICAgICAgICAgICAgbXlDb29raWUuZXJhc2VDb29raWUoJ3ByZWZlcnJlZFRoZW1lJylcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlc2V0KTtcbiAgICAgICAgfSBlbHNlIGlmIChoYXNoKSB7XG4gICAgICAgICAgICB0aGlzLnJ1bkNsaWNrRm9yRWxlbWVudChoYXNoKVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNoICE9PSAndGhlbWUtbW9vbicgJiYgaGFzaCAhPT0gJ3RoZW1lLXN1bicpIHtcbiAgICAgICAgICAgIHByZWZlcnJlZFRoZW1lID0gbXlDb29raWUuZ2V0Q29va2llKCdwcmVmZXJyZWRUaGVtZScpXG4gICAgICAgICAgICBpZiAocHJlZmVycmVkVGhlbWUpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCBwcmVmZXJyZWRUaGVtZSlcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYm9keUNsYXNzLnVzZXJQcmVmZXJzRGFya1RoZW1lKCkpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCAndGhlbWUtbW9vbicpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdXNlclByZWZlcnNEYXJrVGhlbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHdpbmRvdy5tYXRjaE1lZGlhICYmXG4gICAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKHByZWZlcnMtY29sb3Itc2NoZW1lOiBkYXJrKScpLm1hdGNoZXNcbiAgICAgICAgKVxuICAgIH0sXG5cbiAgICBydW5DbGlja0ZvckVsZW1lbnQ6IGZ1bmN0aW9uIChoYXNoKSB7XG4gICAgICAgIGhhc2ggPSBoYXNoLnRyaW0oKVxuICAgICAgICBpZiAoaGFzaC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnN0IG9iaiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGhhc2gpXG4gICAgICAgICAgICBpZiAob2JqICYmIG9iai5jbGFzc0xpc3QuY29udGFpbnMoJ3RoZW1lLXNlbGVjdG9yJykpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZShvYmopXG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZChoYXNoKVxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSxcblxuICAgIGFkZE9yVG9nZ2xlQm9keUNsYXNzOiBmdW5jdGlvbiAob2JqU2VsZWN0b3IsIGlzVGhlbWUpIHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKG9ialNlbGVjdG9yKVxuICAgICAgICAgICAgLmZvckVhY2goZnVuY3Rpb24gKG9uZUVhY2hPYmplY3QpIHtcbiAgICAgICAgICAgICAgICBvbmVFYWNoT2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5hY3Rpb25Cb2R5Q2xhc3NDaGFuZ2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBvbmVFYWNoT2JqZWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBpc1RoZW1lXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9ialNlbGVjdG9yID09PSAnI21lbnUtdG9nZ2xlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xvc2UgbWVudSB3aGVuIHRvZ2dsaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnRvZ2dsZSgnc2hvdy1sb2dvJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDMwMClcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgc2Nyb2xsU3RhcnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgY29uc3QgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVVSTCgpXG4gICAgICAgICAgICBpZiAoaGFzaCAmJiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKSkge1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgaGFzaCkuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsIC8vIHNtb290aCBzY3JvbGxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCcgLy8gdGhlIHVwcGVyIGJvcmRlciBvZiB0aGUgZWxlbWVudCB3aWxsIGJlIGFsaWduZWQgYXQgdGhlIHRvcCBvZiB0aGUgdmlzaWJsZSBwYXJ0IG9mIHRoZSB3aW5kb3cgb2YgdGhlIHNjcm9sbGFibGUgYXJlYS5cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAzMDApXG4gICAgfSxcblxuICAgIGFjdGlvbkJvZHlDbGFzc0NoYW5nZTogZnVuY3Rpb24gKG9uZUVhY2hPYmplY3QsIGV2ZW50LCBpc1RoZW1lLCBzY3JvbGxUbykge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXG5cbiAgICAgICAgYm9keUNsYXNzLnJlbW92ZUJvZHlDbGFzc2VzQmFzZWRPbkF0dHJpYnV0ZShvbmVFYWNoT2JqZWN0KVxuXG4gICAgICAgIGxldCB0b2dnbGVDbGFzcyA9ICcnXG4gICAgICAgIGxldCBpZCA9ICcnXG4gICAgICAgIGlmIChvbmVFYWNoT2JqZWN0Lmhhc0F0dHJpYnV0ZSgnZGF0YS1hZGQtY2xhc3MnKSkge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MgPSBvbmVFYWNoT2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1hZGQtY2xhc3MnKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9nZ2xlQ2xhc3MgPSBvbmVFYWNoT2JqZWN0LmdldEF0dHJpYnV0ZSgnaWQnKVxuICAgICAgICAgICAgaWQgPSB0b2dnbGVDbGFzc1xuICAgICAgICB9XG4gICAgICAgIGlmIChvbmVFYWNoT2JqZWN0Lmhhc0F0dHJpYnV0ZSgnZGF0YS10b2dnbGUtcmF0aGVyLXRoYW4tYWRkJykpIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC50b2dnbGUodG9nZ2xlQ2xhc3MpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKHRvZ2dsZUNsYXNzKVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzVGhlbWUpIHtcbiAgICAgICAgICAgIG15Q29va2llLnNldENvb2tpZSgncHJlZmVycmVkVGhlbWUnLCB0b2dnbGVDbGFzcywgMTQpXG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5zZXRBdHRyaWJ1dGUoJ2RhdGEtdGhlbWUnLCB0b2dnbGVDbGFzcylcbiAgICAgICAgICAgIGJvZHlDbGFzcy50aGVtZSA9IHRvZ2dsZUNsYXNzXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlkICYmIHNjcm9sbFRvKSB7XG4gICAgICAgICAgICBsZXQgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVN0cmluZyhpZClcbiAgICAgICAgICAgIGlmIChoYXNoLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGhhc2ggPSBoYXNoLnJlcGxhY2UoJyMnLCAnJylcbiAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9ICcjJyArIGhhc2hcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGU6IGZ1bmN0aW9uIChvYmplY3QpIHtcbiAgICAgICAgaWYgKG9iamVjdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtcmVtb3ZlLWNsYXNzJykpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZyA9IG9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtcmVtb3ZlLWNsYXNzJylcbiAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBib2R5Q2xhc3MuZ2V0Q2xhc3Nlc0Zyb21MaXN0KHN0cmluZylcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBjbGFzc2VzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBjbGFzc2VzW2ldXG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSh2YWx1ZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRDbGFzc2VzRnJvbUxpc3Q6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgY29uc3QgYXJyYXkgPSBzdHJpbmcuc3BsaXQoJywnKVxuICAgICAgICBjb25zdCBuZXdBcnJheSA9IFtdXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY29uc3QgdmFsdWUgPSBhcnJheVtpXS50cmltKClcbiAgICAgICAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIG5ld0FycmF5LnB1c2godmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ld0FycmF5XG4gICAgfSxcblxuICAgIGdldEhhc2hGcm9tVVJMOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5oYXNoXG4gICAgICAgIHJldHVybiBib2R5Q2xhc3MuZ2V0SGFzaEZyb21TdHJpbmcoc3RyaW5nKVxuICAgIH0sXG5cbiAgICBnZXRIYXNoRnJvbVN0cmluZzogZnVuY3Rpb24gKHN0cmluZykge1xuICAgICAgICBzdHJpbmcgPSBTdHJpbmcoc3RyaW5nKVxuICAgICAgICByZXR1cm4gYm9keUNsYXNzLnJlbW92ZUhhc2hGcm9tU3RyaW5nKHN0cmluZylcbiAgICB9LFxuXG4gICAgcmVtb3ZlSGFzaEZyb21TdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5yZXBsYWNlKCcjJywgJycpXG4gICAgfSxcblxuICAgIGFkZFJvY2tldE1vZGVWaWRlb09ySW1hZ2U6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKGJvZHlDbGFzcy5oYXNSb2NrZXRTaG93KCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHZpZGVvSWQgPSBib2R5Q2xhc3MuYm9keU9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdmlkZW8taWQnKVxuICAgICAgICAgICAgY29uc3QgaXNMYW5kc2NhcGUgPSAoKSA9PlxuICAgICAgICAgICAgICAgIHdpbmRvdy5tYXRjaE1lZGlhKCcob3JpZW50YXRpb246IGxhbmRzY2FwZSknKS5tYXRjaGVzXG4gICAgICAgICAgICBjb25zdCBpbWFnZVVSTCA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1iZy1pbWFnZScpXG4gICAgICAgICAgICBjb25zdCBpbWFnZVggPVxuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1iZy1pbWFnZS14JykgPz8gJzUwJSdcbiAgICAgICAgICAgIGNvbnN0IGltYWdlWSA9XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLWJnLWltYWdlLXknKSA/PyAnNTAlJ1xuXG4gICAgICAgICAgICAvLyBjb25zb2xlLmxvZyh2aWRlb0lkKVxuICAgICAgICAgICAgaWYgKHZpZGVvSWQgfHwgaW1hZ2VVUkwpIHtcbiAgICAgICAgICAgICAgICBsZXQgc3R5bGUgPSAnJ1xuICAgICAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICAgICAgZGl2LmlkID0gJ0JhY2tncm91bmRJbWFnZSdcbiAgICAgICAgICAgICAgICBjb25zdCBzaGFkb3cgPSBib2R5Q2xhc3MuYm9keU9iamVjdC5nZXRBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgICAgICAgICdkYXRhLXNoYWRvdy1vdmVyLWxvZ28nXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIGxldCBzaGFkb3dDb2xvdXIgPSAnJ1xuICAgICAgICAgICAgICAgIGlmIChzaGFkb3cgPT09ICdkYXJrJykge1xuICAgICAgICAgICAgICAgICAgICBzaGFkb3dDb2xvdXIgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJ2xpbmVhci1ncmFkaWVudCgyMTBkZWcsICMwMDAwMDA3NyAxMiUsIHRyYW5zcGFyZW50IDg4JSknXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChzaGFkb3cgPT09ICdsaWdodCcpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhZG93Q29sb3VyID1cbiAgICAgICAgICAgICAgICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMjEwZGVnLCAjRkZGRkZGNzcgMTIlLCB0cmFuc3BhcmVudCA4OCUpJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmlkZW9JZCAmJiBpc0xhbmRzY2FwZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvVXJsID1cbiAgICAgICAgICAgICAgICAgICAgICAgICdodHRwczovL3BsYXllci52aW1lby5jb20vdmlkZW8vJyArXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb0lkICtcbiAgICAgICAgICAgICAgICAgICAgICAgICc/YXV0b3BsYXk9MSZhdXRvcGF1c2U9MCZtdXRlZD0xJmJhY2tncm91bmQ9MSdcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNoYWRvd0NvbG91cikge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSAnYmFja2dyb3VuZDogJyArIHNoYWRvd0NvbG91clxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPVxuICAgICAgICAgICAgICAgICAgICAgICAgJzxpZnJhbWUgc3JjPVwiJyArXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlb1VybCArXG4gICAgICAgICAgICAgICAgICAgICAgICAnXCIgZnJhbWVib3JkZXI9XCIwXCIgYWxsb3c9XCJhdXRvcGxheTsgZnVsbHNjcmVlblwiIGFsbG93ZnVsbHNjcmVlbiBzdHlsZT1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiPjwvaWZyYW1lPidcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmZpcnN0Q2hpbGRcbiAgICAgICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuaW5zZXJ0QmVmb3JlKGRpdiwgdGVtcClcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlkZW8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaGFzLWJnLWltYWdlLWxvYWRlZCcpXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpbWFnZVVSTCkge1xuICAgICAgICAgICAgICAgICAgICBzdHlsZSA9ICd1cmwoJyArIGltYWdlVVJMICsgJyknXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dDb2xvdXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gc2hhZG93Q29sb3VyICsgJywnICsgc3R5bGVcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkaXYuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gc3R5bGVcbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRQb3NpdGlvbiA9IGltYWdlWCArICcgJyArIGltYWdlWVxuXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGltZyA9IG5ldyBJbWFnZSgpXG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2hhcy1iZy1pbWFnZS1sb2FkZWQnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGltZy5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdoYXMtYmctaW1hZ2UtbG9hZGVkJykgLy8gZmFpbCBvcGVuXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IGltYWdlVVJMXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdmYWRlLW9uLW5vLXJvY2tldCcpXG4gICAgICAgICAgICAgICAgY29uc3QgdGVtcCA9IGJvZHlDbGFzcy5ib2R5T2JqZWN0LmZpcnN0Q2hpbGRcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5pbnNlcnRCZWZvcmUoZGl2LCB0ZW1wKVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coJ25vIHJvY2tldCBzaG93JylcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBpc0hvbWVQYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUgPT09ICcvJ1xuICAgIH0sXG5cbiAgICBoYXNGcmFnbWVudDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLmhhc2ggIT09ICcnXG4gICAgfSxcblxuICAgIGhhc1JvY2tldFNob3c6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5jb250YWlucygnbm8tcm9ja2V0LXNob3cnKVxuICAgICAgICAgICAgPyBmYWxzZVxuICAgICAgICAgICAgOiB0cnVlXG4gICAgfVxufVxuXG5ib2R5Q2xhc3MuaW5pdCgpXG4iLCJjb25zdCBDb2xsYXBzaWJsZUxpc3RzID0gKCgpID0+IHtcbiAgICBmdW5jdGlvbiBhcHBseSAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsLmNvbGxhcHNpYmxlTGlzdCcpLmZvckVhY2gobGlzdCA9PiB7XG4gICAgICAgICAgICBhcHBseVRvKGxpc3QpXG4gICAgICAgICAgICB1cGRhdGVIYXNPcGVuKGxpc3QpXG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwbHlUbyAobGlzdCkge1xuICAgICAgICBsaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJ2xpJykuZm9yRWFjaChsaSA9PiB7XG4gICAgICAgICAgICBjb25zdCBjaGlsZFVsID0gbGkucXVlcnlTZWxlY3RvcignOnNjb3BlID4gdWwnKVxuICAgICAgICAgICAgaWYgKCFjaGlsZFVsKSByZXR1cm5cblxuICAgICAgICAgICAgLy8gQUREIFRPR0dMRSBBUlJPV1xuICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgc3Bhbi5jbGFzc05hbWUgPSAnb3Blbi1jbG9zZSdcbiAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwib3BlblwiPuKGmDwvaT48aSBjbGFzcz1cImNsb3NlZFwiPuKGljwvaT4nXG4gICAgICAgICAgICBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdG9nZ2xlKGxpKSlcblxuICAgICAgICAgICAgbGkuaW5zZXJ0QmVmb3JlKHNwYW4sIGNoaWxkVWwpXG5cbiAgICAgICAgICAgIC8vIGNvbGxhcHNlZCBieSBkZWZhdWx0XG4gICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuICAgICAgICAgICAgY2hpbGRVbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICAgICAgICAgIC8vIG9wZW4gZGVmYXVsdHNcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2N1cnJlbnQnKSB8fFxuICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5jb250YWlucygnc2VjdGlvbicpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvcGVuKGxpKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZSAobGkpIHtcbiAgICAgICAgaWYgKGxpLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0T3BlbicpKSB7XG4gICAgICAgICAgICBjbG9zZShsaSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9wZW4obGkpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvcGVuIChsaSkge1xuICAgICAgICBsaS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcblxuICAgICAgICBjb25zdCBkaXJlY3RVbCA9IGxpLnF1ZXJ5U2VsZWN0b3IoJzpzY29wZSA+IHVsJylcbiAgICAgICAgaWYgKGRpcmVjdFVsKSBkaXJlY3RVbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuXG4gICAgICAgIC8vIGtlZXAgZGVlcGVyIGxldmVscyBjb2xsYXBzZWRcbiAgICAgICAgaWYgKGRpcmVjdFVsKSB7XG4gICAgICAgICAgICBkaXJlY3RVbC5xdWVyeVNlbGVjdG9yQWxsKCc6c2NvcGUgdWwnKS5mb3JFYWNoKG5lc3RlZFVsID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuZXN0ZWRMaSA9IG5lc3RlZFVsLnBhcmVudEVsZW1lbnRcbiAgICAgICAgICAgICAgICBuZXN0ZWRMaS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcbiAgICAgICAgICAgICAgICBuZXN0ZWRMaS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuICAgICAgICAgICAgICAgIG5lc3RlZFVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICAvLyBORVc6IGNsb3NlIHNpYmxpbmdzIG9uIHRoZSBzYW1lIGxldmVsXG4gICAgICAgIGNvbnN0IHBhcmVudExpc3QgPSBsaS5wYXJlbnRFbGVtZW50XG4gICAgICAgIHBhcmVudExpc3RcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKCc6c2NvcGUgPiBsaS5jb2xsYXBzaWJsZUxpc3RPcGVuJylcbiAgICAgICAgICAgIC5mb3JFYWNoKHNpYmxpbmcgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChzaWJsaW5nICE9PSBsaSkge1xuICAgICAgICAgICAgICAgICAgICBjbG9zZShzaWJsaW5nKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgbWFya1NpYmxpbmdTdGF0ZShsaSlcbiAgICAgICAgdXBkYXRlSGFzT3BlbihsaS5jbG9zZXN0KCcuY29sbGFwc2libGVMaXN0JykpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2UgKGxpKSB7XG4gICAgICAgIGxpLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKVxuICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3RDbG9zZWQnKVxuXG4gICAgICAgIGNvbnN0IGNoaWxkVWwgPSBsaS5xdWVyeVNlbGVjdG9yKCc6c2NvcGUgPiB1bCcpXG4gICAgICAgIGlmIChjaGlsZFVsKSBjaGlsZFVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcblxuICAgICAgICBtYXJrU2libGluZ1N0YXRlKGxpKVxuICAgICAgICB1cGRhdGVIYXNPcGVuKGxpLmNsb3Nlc3QoJy5jb2xsYXBzaWJsZUxpc3QnKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBtYXJrU2libGluZ1N0YXRlIChsaSkge1xuICAgICAgICBjb25zdCBwYXJlbnRMaXN0ID0gbGkucGFyZW50RWxlbWVudFxuICAgICAgICBpZiAoIXBhcmVudExpc3QuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3QnKSkgcmV0dXJuXG5cbiAgICAgICAgY29uc3Qgc2libGluZ3MgPSBwYXJlbnRMaXN0LnF1ZXJ5U2VsZWN0b3JBbGwoJzpzY29wZSA+IGxpJylcbiAgICAgICAgY29uc3QgaXNPcGVuID0gbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcblxuICAgICAgICBzaWJsaW5ncy5mb3JFYWNoKHNpYiA9PiBzaWIuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0Tm90T3BlbicpKVxuXG4gICAgICAgIGlmIChpc09wZW4pIHtcbiAgICAgICAgICAgIHNpYmxpbmdzLmZvckVhY2goc2liID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2liICE9PSBsaSkgc2liLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNpYmxlTGlzdE5vdE9wZW4nKVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUhhc09wZW4gKGxpc3QpIHtcbiAgICAgICAgaWYgKCFsaXN0KSByZXR1cm5cbiAgICAgICAgY29uc3QgaGFzID0gbGlzdC5xdWVyeVNlbGVjdG9yKCcuY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgICAgIGxpc3QuY2xhc3NMaXN0LnRvZ2dsZSgnY29sbGFwc2libGVMaXN0SGFzT3BlbicsICEhaGFzKVxuICAgIH1cblxuICAgIHJldHVybiB7IGFwcGx5IH1cbn0pKClcblxuQ29sbGFwc2libGVMaXN0cy5hcHBseSgpXG4iLCJjb25zdCBteUNvb2tpZSA9IHtcblxuICBzZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSwgZGF5cykge1xuICAgIHZhciBleHBpcmVzID0gJydcbiAgICBpZiAodHlwZW9mIGRheXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkYXlzID0gMTRcbiAgICB9XG4gICAgaWYgKGRheXMpIHtcbiAgICAgIHZhciBkYXRlID0gbmV3IERhdGUoKVxuICAgICAgZGF0ZS5zZXRUaW1lKGRhdGUuZ2V0VGltZSgpICsgKGRheXMgKiAyNCAqIDYwICogNjAgKiAxMDAwKSlcbiAgICAgIGV4cGlyZXMgPSAnOyBleHBpcmVzPScgKyBkYXRlLnRvVVRDU3RyaW5nKClcbiAgICB9XG4gICAgZG9jdW1lbnQuY29va2llID0gbmFtZSArICc9JyArICh2YWx1ZSB8fCAnJykgKyBleHBpcmVzICsgJzsgcGF0aD0vJ1xuICB9LFxuXG4gIGdldENvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB2YXIgbmFtZUVRID0gbmFtZSArICc9J1xuICAgIHZhciBjYSA9IGRvY3VtZW50LmNvb2tpZS5zcGxpdCgnOycpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjYS5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGMgPSBjYVtpXVxuICAgICAgd2hpbGUgKGMuY2hhckF0KDApID09PSAnICcpIHtcbiAgICAgICAgYyA9IGMuc3Vic3RyaW5nKDEsIGMubGVuZ3RoKVxuICAgICAgfVxuICAgICAgaWYgKGMuaW5kZXhPZihuYW1lRVEpID09PSAwKSB7XG4gICAgICAgIHJldHVybiBjLnN1YnN0cmluZyhuYW1lRVEubGVuZ3RoLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG51bGxcbiAgfSxcblxuICBlcmFzZUNvb2tpZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBteUNvb2tpZS5zZXRDb29raWUobmFtZSwgbnVsbCwgMClcbiAgfVxufVxuXG5leHBvcnQgeyBteUNvb2tpZSB9XG4iLCJ2YXIgZm9ybWZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICdpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYSdcbilcbmZvciAodmFyIEogPSBmb3JtZmllbGRzLmxlbmd0aCAtIDE7IEogPj0gMDsgLS1KKSB7XG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2JsdXInLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcblxuICB2YXIgZXZ0ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0hUTUxFdmVudHMnKVxuICBldnQuaW5pdEV2ZW50KCdjaGFuZ2UnLCBmYWxzZSwgdHJ1ZSlcbiAgZm9ybWZpZWxkc1tKXS5kaXNwYXRjaEV2ZW50KGV2dClcbn1cblxuZnVuY3Rpb24gYWRqdXN0U3R5bGluZyAoekV2ZW50KSB7XG4gIHZhciBpbnBWYWwgPSB6RXZlbnQudGFyZ2V0LnZhbHVlXG4gIGlmIChpbnBWYWwgJiYgaW5wVmFsLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKSkge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbm8tdmFsdWUnKVxuICB9IGVsc2Uge1xuICAgIHpFdmVudC50YXJnZXQuY2xhc3NMaXN0LmFkZCgnbm8tdmFsdWUnKVxuICB9XG59XG4iLCJjb25zdCBpbWFnZWhvdmVyID0ge1xuICAgIHJlc2V0VGltZW91dDogbnVsbCxcblxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9jdW1lbnRcbiAgICAgICAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICAgICAgICcuZWxlbWVudCBzdW5ueXNpZGV1cF9fYXBwX19lbGVtZW50c19fd29ya2V4YW1wbGUgLmltYWdlLWNvbnRhaW5lcidcbiAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5mb3JFYWNoKGVsID0+IHtcbiAgICAgICAgICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNUb3VjaERldmljZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjbGVhclRpbWVvdXQodGhpcy5yZXNldFRpbWVvdXQpXG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBjb25zdCB7IHdpZHRoLCBoZWlnaHQsIGxlZnQsIHRvcCB9ID1cbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHggPSBlLnBhZ2VYIC0gbGVmdCAtIHdpbmRvdy5zY3JvbGxYXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHkgPSBlLnBhZ2VZIC0gdG9wIC0gd2luZG93LnNjcm9sbFlcblxuICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5zZXRQcm9wZXJ0eShcbiAgICAgICAgICAgICAgICAgICAgICAgICctLW1vdXNlLXgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgKHggLyB3aWR0aCkgKiA1MCAtIDI1XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICAgICAgICAgICAnLS1tb3VzZS15JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIDI1IC0gKHkgLyBoZWlnaHQpICogNTBcbiAgICAgICAgICAgICAgICAgICAgKVxuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVG91Y2hEZXZpY2UoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnLS1tb3VzZS14JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5zdHlsZS5yZW1vdmVQcm9wZXJ0eSgnLS1tb3VzZS15JylcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMDApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICB9LFxuICAgIGlzVG91Y2hEZXZpY2VWYXI6IG51bGwsXG5cbiAgICBpc1RvdWNoRGV2aWNlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzVG91Y2hEZXZpY2VWYXIgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuaXNUb3VjaERldmljZVZhciA9XG4gICAgICAgICAgICAgICAgJ29udG91Y2hzdGFydCcgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50IHx8XG4gICAgICAgICAgICAgICAgJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8XG4gICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1heFRvdWNoUG9pbnRzID4gMCB8fFxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tc01heFRvdWNoUG9pbnRzID4gMFxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLmlzVG91Y2hEZXZpY2VWYXJcbiAgICB9XG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgaW1hZ2Vob3Zlci5pbml0KClcbn0pXG4iLCJcbmNvbnN0IGltYWdlV3JhcHBlciA9ICgpID0+IHtcbiAgZnVuY3Rpb24gd3JhcCAoZWwsIHdyYXBwZXIpIHtcbiAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh3cmFwcGVyLCBlbClcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGVsKVxuICB9XG4gIC8vIGNyZWF0ZSB0aGUgY29udGFpbmVyIGRpdlxuXG4gIC8vIGdldCBhbGwgZGl2c1xuICBjb25zdCBpbWFnZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudHlwb2dyYXBoeSBpbWcnKVxuICAvLyBnZXQgdGhlIGJvZHkgZWxlbWVudFxuICAvLyBhcHBseSBjbGFzcyB0byBjb250YWluZXIgZGl2XG5cbiAgLy8gZmluZCBvdXQgYWxsIHRob3NlIGRpdnMgaGF2aW5nIGNsYXNzIENcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWFnZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBkdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgZHYuc2V0QXR0cmlidXRlKCdjbGFzcycsICdpbWFnZS1jb250YWluZXInKVxuICAgIGNvbnN0IGltZyA9IGltYWdlc1tpXVxuICAgIHdyYXAoaW1nLCBkdilcbiAgfVxufVxuXG5pbWFnZVdyYXBwZXIoKVxuIiwiY29uc3Qgc2hvd1JvY2tldE1vZGUgPSB7XG4gIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCB0b2dnbGVDbGFzc09uSG92ZXIgPSAoZSkgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG4gICAgICAgIC5jbGFzc0xpc3RcbiAgICAgICAgLnRvZ2dsZSgnbW91c2Utb3Zlci1sb2dvJywgZS50eXBlID09PSAnbW91c2VlbnRlcicpXG4gICAgfVxuICAgIGNvbnN0IGxvZ28gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbG9nbycpXG4gICAgbG9nby5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWVudGVyJywgdG9nZ2xlQ2xhc3NPbkhvdmVyKVxuICAgIGxvZ28uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRvZ2dsZUNsYXNzT25Ib3ZlcilcbiAgfVxufVxuXG5zaG93Um9ja2V0TW9kZS5pbml0KClcbiIsIndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmVwcmludCcsIGV2ZW50ID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjb250ZW50LWJlbG93LXF1b3RlJylcbiAgICBlbC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJyB9KVxufSlcbiIsImltcG9ydCB7IGJvZHlDbGFzcyB9IGZyb20gJy4vYm9keS1jbGFzcydcblxuY29uc3Qgc2Nyb2xsTWFuYWdlciA9IHtcbiAgICBzY3JlZW5IZWlnaHQ6IHdpbmRvdy5pbm5lckhlaWdodCxcbiAgICBsYXN0U2Nyb2xsOiAwLFxuICAgIGJvZHk6IG51bGwsXG4gICAgcXVvdGU6IG51bGwsXG4gICAgZm9vdGVyOiBudWxsLFxuICAgIGhlYWRlclJhbmdlOiA3MCwgLy8gaW4gdmhcbiAgICBmb290ZXJSYW5nZTogMTgwLCAvLyBpbiB2aFxuICAgIGhlYWRlclBjdDogMCxcbiAgICBmb290ZXJQY3Q6IDEwMCxcbiAgICBqdXN0U2Nyb2xsZWREdXJhdGlvbjogMTIwMCwgLy8gbXMg4oCUIGNoYW5nZSBmcmVlbHlcbiAgICBqdXN0U2Nyb2xsZWRUaW1lcjogbnVsbCxcbiAgICBzY3JvbGxTdG9wVGltZXI6IG51bGwsXG4gICAgc2Nyb2xsU3RvcERlbGF5OiAxMjAsIC8vIG1zIGFmdGVyIGxhc3Qgc2Nyb2xsIGV2ZW50XG5cbiAgICBpbml0ICgpIHtcbiAgICAgICAgdGhpcy5ib2R5ID0gYm9keUNsYXNzLmdldEJvZHlPYmplY3QoKVxuICAgICAgICB0aGlzLnF1b3RlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1haW4tcXVvdGUnKVxuICAgICAgICB0aGlzLmZvb3RlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb290ZXInKVxuXG4gICAgICAgIHRoaXMucmVtZWFzdXJlKClcbiAgICAgICAgdGhpcy5iaW5kU2Nyb2xsKClcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgKCkgPT4gdGhpcy5yZW1lYXN1cmUoKSlcblxuICAgICAgICAvLyBORVc6IFRyaWdnZXIgdGhlIGluaXRpYWwgc2Nyb2xsIGNhbGN1bGF0aW9uXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB0aGlzLm9uU2Nyb2xsKCkpXG4gICAgfSxcblxuICAgIHJlbWVhc3VyZSAoKSB7XG4gICAgICAgIHRoaXMuc2NyZWVuSGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0XG4gICAgICAgIHRoaXMubGFzdFNjcm9sbCA9IHRoaXMuZ2V0U2Nyb2xsKClcbiAgICB9LFxuXG4gICAgZ2V0U2Nyb2xsICgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5zY3JvbGxZIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcbiAgICB9LFxuXG4gICAgYmluZFNjcm9sbCAoKSB7XG4gICAgICAgIGxldCB0aWNraW5nID0gZmFsc2VcblxuICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aWNraW5nKSB7XG4gICAgICAgICAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TY3JvbGwoKVxuICAgICAgICAgICAgICAgICAgICB0aWNraW5nID0gZmFsc2VcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIHRpY2tpbmcgPSB0cnVlXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIG9uU2Nyb2xsICgpIHtcbiAgICAgICAgY29uc3Qgc2Nyb2xsID0gdGhpcy5nZXRTY3JvbGwoKVxuICAgICAgICBjb25zdCBtYXhTY3JvbGwgPVxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbEhlaWdodCAtIHRoaXMuc2NyZWVuSGVpZ2h0XG5cbiAgICAgICAgdGhpcy51cGRhdGVIZWFkZXJDbGFzc2VzKHNjcm9sbClcbiAgICAgICAgdGhpcy51cGRhdGVGb290ZXJDbGFzc2VzKHNjcm9sbCwgbWF4U2Nyb2xsKVxuICAgICAgICB0aGlzLnVwZGF0ZVJvY2tldFRoZW1lKClcbiAgICAgICAgdGhpcy51cGRhdGVTY3JvbGxEaXJlY3Rpb24oc2Nyb2xsKVxuICAgICAgICB0aGlzLmhhbmRsZUp1c3RTY3JvbGxlZCgpXG5cbiAgICAgICAgdGhpcy5sYXN0U2Nyb2xsID0gc2Nyb2xsXG4gICAgfSxcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEhFQURFUiAvIEZPT1RFUiBTVEFURSAoMOKAkzEwMClcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB1cGRhdGVIZWFkZXJDbGFzc2VzIChjdXJyZW50U2Nyb2xsKSB7XG4gICAgICAgIGNvbnN0IGhlYWRlclBpeGVscyA9IHRoaXMuc2NyZWVuSGVpZ2h0ICogKHRoaXMuaGVhZGVyUmFuZ2UgLyAxMDApXG4gICAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5jbGFtcChjdXJyZW50U2Nyb2xsIC8gaGVhZGVyUGl4ZWxzLCAwLCAxKVxuICAgICAgICBjb25zdCBwY3QgPSBNYXRoLnJvdW5kKHJhdGlvICogMTAwKVxuXG4gICAgICAgIHRoaXMuaGVhZGVyUGN0ID0gcGN0XG4gICAgICAgIHRoaXMucmVwbGFjZVN0ZXBDbGFzc2VzKCdoZWFkZXInLCBwY3QpXG5cbiAgICAgICAgaWYgKHBjdCA+PSAxMDApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdwYXN0LWhlYWRlcicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGFzdC1oZWFkZXInKVxuICAgICAgICB9XG4gICAgfSxcbiAgICB1cGRhdGVGb290ZXJDbGFzc2VzIChjdXJyZW50U2Nyb2xsLCBtYXhTY3JvbGwpIHtcbiAgICAgICAgY29uc3QgYm90dG9tRGlzdGFuY2UgPSBtYXhTY3JvbGwgLSBjdXJyZW50U2Nyb2xsXG5cbiAgICAgICAgY29uc3QgaGVhZGVyUGl4ZWxzID0gdGhpcy5zY3JlZW5IZWlnaHQgKiAodGhpcy5oZWFkZXJSYW5nZSAvIDEwMClcblxuICAgICAgICAvLyBJZiB3ZSdyZSBzdGlsbCBpbiB0aGUgaGVhZGVyIHpvbmUsIGhpZGUgZm9vdGVyIGNsYXNzZXNcbiAgICAgICAgaWYgKGN1cnJlbnRTY3JvbGwgPCBoZWFkZXJQaXhlbHMpIHtcbiAgICAgICAgICAgIHRoaXMuZm9vdGVyUGN0ID0gMTAwXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVN0ZXBDbGFzc2VzKCdmb290ZXInKVxuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2Zvb3Rlci12aXNpYmxlJylcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZm9vdGVyUGl4ZWxzID0gdGhpcy5zY3JlZW5IZWlnaHQgKiAodGhpcy5mb290ZXJSYW5nZSAvIDEwMClcbiAgICAgICAgY29uc3QgcmF0aW8gPSB0aGlzLmNsYW1wKGJvdHRvbURpc3RhbmNlIC8gZm9vdGVyUGl4ZWxzLCAwLCAxKVxuICAgICAgICBjb25zdCBwY3QgPSBNYXRoLnJvdW5kKHJhdGlvICogMTAwKVxuXG4gICAgICAgIHRoaXMuZm9vdGVyUGN0ID0gcGN0XG4gICAgICAgIHRoaXMucmVwbGFjZVN0ZXBDbGFzc2VzKCdmb290ZXInLCBwY3QpXG5cbiAgICAgICAgaWYgKHBjdCA8IDEwMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ2Zvb3Rlci12aXNpYmxlJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdmb290ZXItdmlzaWJsZScpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVwbGFjZVN0ZXBDbGFzc2VzIChwcmVmaXgsIHBjdCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8PSAxMDA7IGkgKz0gMTApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGAke3ByZWZpeH0tJHtpfWApXG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgcm91bmRlZCA9IE1hdGgucm91bmQocGN0IC8gMTApICogMTBcbiAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoYCR7cHJlZml4fS0ke3JvdW5kZWR9YClcbiAgICB9LFxuICAgIHJlbW92ZVN0ZXBDbGFzc2VzIChwcmVmaXgpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTAwOyBpICs9IDEwKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9LSR7aX1gKVxuICAgICAgICB9XG4gICAgfSxcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBST0NLRVQgVEhFTUVcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB1cGRhdGVSb2NrZXRUaGVtZSAoKSB7XG4gICAgICAgIGNvbnN0IGhhc1JvY2tldCA9ICF0aGlzLmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCduby1yb2NrZXQtc2hvdycpXG4gICAgICAgIGlmICghaGFzUm9ja2V0KSByZXR1cm5cblxuICAgICAgICBjb25zdCBpbkhlYWRlclpvbmUgPSB0aGlzLmhlYWRlclBjdCA8IDEwMFxuICAgICAgICBjb25zdCBpbkZvb3RlclpvbmUgPSB0aGlzLmZvb3RlclBjdCA8IDEwMFxuXG4gICAgICAgIGlmIChpbkhlYWRlclpvbmUgfHwgaW5Gb290ZXJab25lKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgndGhlbWUtcm9ja2V0JylcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKGJvZHlDbGFzcy5nZXRUaGVtZSgpKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3RoZW1lLXJvY2tldCcpXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZChib2R5Q2xhc3MuZ2V0VGhlbWUoKSlcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBTQ1JPTEwgRElSRUNUSU9OXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdXBkYXRlU2Nyb2xsRGlyZWN0aW9uIChzY3JvbGwpIHtcbiAgICAgICAgaWYgKHNjcm9sbCA+IHRoaXMubGFzdFNjcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbGVkLXVwJylcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZC1kb3duJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdzY3JvbGxlZC11cCcpXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnc2Nyb2xsZWQtZG93bicpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gSlVTVCBTQ1JPTExFRFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGhhbmRsZUp1c3RTY3JvbGxlZCAoKSB7XG4gICAgICAgIC8vIENsZWFyIHByZXZpb3VzIHN0b3AgZGV0ZWN0aW9uXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbFN0b3BUaW1lcikge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuc2Nyb2xsU3RvcFRpbWVyKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY3JvbGxTdG9wVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIC8vIFNjcm9sbCBoYXMgZW5kZWQg4oaSIGFkZCBqdXN0LXNjcm9sbGVkXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnanVzdC1zY3JvbGxlZCcpXG5cbiAgICAgICAgICAgIC8vIENsZWFyIHByZXZpb3VzIHZpc2liaWxpdHkgdGltZXJcbiAgICAgICAgICAgIGlmICh0aGlzLmp1c3RTY3JvbGxlZFRpbWVyKSB7XG4gICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuanVzdFNjcm9sbGVkVGltZXIpXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuanVzdFNjcm9sbGVkVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnanVzdC1zY3JvbGxlZCcpXG4gICAgICAgICAgICB9LCB0aGlzLmp1c3RTY3JvbGxlZER1cmF0aW9uKVxuICAgICAgICB9LCB0aGlzLnNjcm9sbFN0b3BEZWxheSlcbiAgICB9LFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIFVUSUxcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBjbGFtcCAodiwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCB2KSlcbiAgICB9XG59XG5cbnNjcm9sbE1hbmFnZXIuaW5pdCgpXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcblxuICAgIGNvbnN0IHRvYyA9ICgpID0+IHtcbiAgICAgICAgLy8gY3JlYXRlIHRoZSBjb250YWluZXIgZGl2XG4gICAgICAgIC8vIGdldCBhbGwgZGl2c1xuICAgICAgICBjb25zdCBoZWFkaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAnI2NvbnRlbnQtYmVsb3ctcXVvdGUgaDEsICNjb250ZW50LWJlbG93LXF1b3RlIGgyJ1xuICAgICAgICApXG4gICAgICAgIC8vIGdldCB0aGUgYm9keSBlbGVtZW50XG4gICAgICAgIC8vIGFwcGx5IGNsYXNzIHRvIGNvbnRhaW5lciBkaXZcbiAgICAgICAgaWYgKGhlYWRpbmdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LmFkZCgnaGFzLXRvYycpXG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ3RvYy1vZmYnKVxuICAgICAgICAgICAgbGV0IGNvdW50ID0gMFxuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvdW50ID0gaSArIDFcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IGhlYWRpbmdzW2ldXG4gICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coZWwpXG4gICAgICAgICAgICAgICAgbGV0IHByZXZpb3VzRWxlbSA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcbiAgICAgICAgICAgICAgICBpZiAocHJldmlvdXNFbGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEFwcGx5IHN0eWxlcyBvciBjbGFzc2VzIHRvIHByZXZpb3VzRWxlbVxuICAgICAgICAgICAgICAgICAgICBwcmV2aW91c0VsZW0uY2xhc3NMaXN0LmFkZCgnYm90dG9tLXNwYWNlJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWwuaWQgPSAndG9jLScgKyBjb3VudFxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2NvdW50YWJsZS1pY29ucycpXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaWNvbi0nICsgY291bnQpXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnb3Blbi1jbG9zZScpXG4gICAgICAgICAgICAgICAgc3Bhbi5jbGFzc0xpc3QuYWRkKCdpY29uJylcbiAgICAgICAgICAgICAgICBjb25zdCBzcGFuRW5kID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3BhbicpXG4gICAgICAgICAgICAgICAgc3BhbkVuZC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUtaG9sZGVyJylcbiAgICAgICAgICAgICAgICAvLyBzcGFuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlQ2xpY2suYmluZChudWxsLCBlbCkpXG4gICAgICAgICAgICAgICAgc3Bhbi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJvcGVuXCI+KzwvaT48aSBjbGFzcz1cImNsb3NlZFwiPuKAkzwvaT4nXG4gICAgICAgICAgICAgICAgc3BhbkVuZC5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJhY3RpdmVcIj7iloI8L2k+J1xuICAgICAgICAgICAgICAgIGVsLmluc2VydEJlZm9yZShzcGFuLCBlbC5maXJzdENoaWxkKVxuICAgICAgICAgICAgICAgIGVsLmFwcGVuZENoaWxkKHNwYW5FbmQpXG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb24nKVxuICAgICAgICAgICAgICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb2ZmJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGhhc2ggPSB0aGlzLmlkXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoZWFkaW5ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJyNjb250ZW50LWJlbG93LXF1b3RlIC50b2MtYWN0aXZlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoZWFkaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gaGVhZGluZ3NbaV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCd0b2MtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1hY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCd0b2Mtb24nKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaGFzaCA9IGhhc2hcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignIycgKyBoYXNoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmxvY2s6ICdzdGFydCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucXVlcnlTZWxlY3RvcignI3RvYy0xJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGJvZHkuY2xhc3NMaXN0LmFkZCgnbm8tdG9jJylcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPT09ICcjdG9jJyAmJlxuICAgICAgICBib2R5LmNsYXNzTGlzdC5jb250YWlucygndG9jLW9mZicpICYmXG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKCdoYXMtdG9jJylcbiAgICApIHtcbiAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb24nKVxuICAgICAgICBib2R5LmNsYXNzTGlzdC50b2dnbGUoJ3RvYy1vZmYnKVxuICAgIH1cbiAgICB0b2MoKVxuXG4gICAgLy8gY29uc3QgY2xpY2tlZEVsZW1lbnQgPSBldmVudC50YXJnZXRcbiAgICAvLyBpZiAoZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY291bnRhYmxlLWljb25zJykpIHtcbiAgICAvLyAgICAgY29uc29sZS5sb2coZXZlbnQudGFyZ2V0KVxuICAgIC8vICAgICBjb25zb2xlLmxvZygnQUEnKVxuICAgIC8vICAgICBldmVudC50YXJnZXQuY2xpY2soKVxuICAgIC8vIH1cbn0pXG4iLCJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgIGNvbnN0IGl0ZW0gPSBlLnRhcmdldC5jbG9zZXN0KCcud29yay1leGFtcGxlLWltYWdlJylcbiAgICBpZiAoIWl0ZW0pIHJldHVyblxuXG4gICAgaXRlbS5jbGFzc0xpc3QudG9nZ2xlKCdpcy1hY3RpdmUnKVxufSlcbiIsIi8vIC8vIG5vbi10aGVtZWQgYXBwXG4vLyBpbXBvcnQgJ3NpdGUvYXBwL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vXG4vLyAvLyB2ZW5kb3IgbW9kdWxlc1xuLy8gaW1wb3J0ICdzaXRlL3ZlbmRvci9teXZlbmRvci9teXBhY2thZ2UvY2xpZW50L2phdmFzY3JpcHQvTXlKYXZhc2NyaXB0RmlsZSc7XG4vL1xuLy8gLy8geW91ciB0aGVtZWQgYXBwIGZpbGVzXG4vLyBpbXBvcnQgJy4vanMvcGFydGlhbHMvU29tZU90aGVySmF2YXNjcmlwdEZpbGUnO1xuaW1wb3J0ICcuL2pzL2Nvb2tpZSdcbmltcG9ydCAnLi9qcy9ib2R5LWNsYXNzJ1xuaW1wb3J0ICcuL2pzL3RvYydcbmltcG9ydCAnLi9qcy9jb2xsYXBzaWJsZS1tZW51J1xuaW1wb3J0ICcuL2pzL3Njcm9sbC1tYW5hZ2VyJ1xuaW1wb3J0ICcuL2pzL2Zvcm0nXG5pbXBvcnQgJy4vanMvd29yay1leGFtcGxlJ1xuaW1wb3J0ICcuL2pzL21vdXNlLW92ZXItbG9nbydcbmltcG9ydCAnLi9qcy9pbWFnZXMnXG5pbXBvcnQgJy4vanMvaW1hZ2UtaG92ZXInXG5pbXBvcnQgJy4vanMvcHJpbnQnXG5pbXBvcnQgJy4vanMvYmF0dGVyeS1zYXZlcidcbiJdLCJuYW1lcyI6WyJkZWJvdW5jZSIsImNhbGxiYWNrIiwidGltZW91dCIsIl90aGlzIiwidGltZXIiLCJlIiwiX3RoYXQiLCJfdGhpczIiLCJjbGVhclRpbWVvdXQiLCJzZXRUaW1lb3V0IiwiY2FsbCIsInVzZXJBY3Rpb24iLCJmdWxsU2NyZWVuRGl2IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsImFkZEV2ZW50TGlzdGVuZXIiLCJteUNvb2tpZSIsImJvZHlDbGFzcyIsImJvZHlPYmplY3QiLCJ0aGVtZSIsImluaXQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkT3JUb2dnbGVCb2R5Q2xhc3MiLCJyZXRyaWV2ZUNvb2tpZU9ySGFzaCIsInNjcm9sbFN0YXJ0IiwiYWRkQmFzaWNCb2R5Q2xhc3NMaXN0ZW5lcnMiLCJnZXRCb2R5T2JqZWN0IiwiZ2V0VGhlbWUiLCJTdHJpbmciLCJnZXRBdHRyaWJ1dGUiLCJzaG93TWVudUFzRGVmYXVsdCIsImlzSG9tZVBhZ2UiLCJoYXNGcmFnbWVudCIsImNsaWNrIiwiYWRkUm9ja2V0TW9kZVZpZGVvT3JJbWFnZSIsImV2ZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZG9jdW1lbnRFbGVtZW50IiwicmVtb3ZlIiwid2luZG93IiwiaGFzaCIsImdldEhhc2hGcm9tVVJMIiwicHJlZmVycmVkVGhlbWUiLCJlcmFzZUNvb2tpZSIsInJ1bkNsaWNrRm9yRWxlbWVudCIsImdldENvb2tpZSIsInNldEF0dHJpYnV0ZSIsInVzZXJQcmVmZXJzRGFya1RoZW1lIiwibWF0Y2hNZWRpYSIsIm1hdGNoZXMiLCJ0cmltIiwibGVuZ3RoIiwib2JqIiwiY29udGFpbnMiLCJyZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGUiLCJvYmpTZWxlY3RvciIsImlzVGhlbWUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9yRWFjaCIsIm9uZUVhY2hPYmplY3QiLCJhY3Rpb25Cb2R5Q2xhc3NDaGFuZ2UiLCJ0b2dnbGUiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJzY3JvbGxUbyIsInByZXZlbnREZWZhdWx0IiwidG9nZ2xlQ2xhc3MiLCJpZCIsImhhc0F0dHJpYnV0ZSIsInNldENvb2tpZSIsImdldEhhc2hGcm9tU3RyaW5nIiwicmVwbGFjZSIsImxvY2F0aW9uIiwib2JqZWN0Iiwic3RyaW5nIiwiY2xhc3NlcyIsImdldENsYXNzZXNGcm9tTGlzdCIsImkiLCJsZW4iLCJ2YWx1ZSIsImFycmF5Iiwic3BsaXQiLCJuZXdBcnJheSIsInB1c2giLCJyZW1vdmVIYXNoRnJvbVN0cmluZyIsImhhc1JvY2tldFNob3ciLCJfYm9keUNsYXNzJGJvZHlPYmplY3QiLCJfYm9keUNsYXNzJGJvZHlPYmplY3QyIiwidmlkZW9JZCIsImlzTGFuZHNjYXBlIiwiaW1hZ2VVUkwiLCJpbWFnZVgiLCJpbWFnZVkiLCJkaXYiLCJjcmVhdGVFbGVtZW50Iiwic2hhZG93Iiwic2hhZG93Q29sb3VyIiwidmlkZW9VcmwiLCJpbm5lckhUTUwiLCJ0ZW1wIiwiZmlyc3RDaGlsZCIsImluc2VydEJlZm9yZSIsInZpZGVvIiwiYm9keSIsImJhY2tncm91bmRJbWFnZSIsImJhY2tncm91bmRQb3NpdGlvbiIsImltZyIsIkltYWdlIiwib25sb2FkIiwib25lcnJvciIsInNyYyIsInBhdGhuYW1lIiwiQ29sbGFwc2libGVMaXN0cyIsImFwcGx5IiwibGlzdCIsImFwcGx5VG8iLCJ1cGRhdGVIYXNPcGVuIiwibGkiLCJjaGlsZFVsIiwic3BhbiIsImNsYXNzTmFtZSIsIm9wZW4iLCJjbG9zZSIsImRpcmVjdFVsIiwibmVzdGVkVWwiLCJuZXN0ZWRMaSIsInBhcmVudEVsZW1lbnQiLCJwYXJlbnRMaXN0Iiwic2libGluZyIsIm1hcmtTaWJsaW5nU3RhdGUiLCJjbG9zZXN0Iiwic2libGluZ3MiLCJpc09wZW4iLCJzaWIiLCJoYXMiLCJuYW1lIiwiZGF5cyIsImV4cGlyZXMiLCJkYXRlIiwiRGF0ZSIsInNldFRpbWUiLCJnZXRUaW1lIiwidG9VVENTdHJpbmciLCJjb29raWUiLCJuYW1lRVEiLCJjYSIsImMiLCJjaGFyQXQiLCJzdWJzdHJpbmciLCJpbmRleE9mIiwiZm9ybWZpZWxkcyIsIkoiLCJhZGp1c3RTdHlsaW5nIiwiZXZ0IiwiY3JlYXRlRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiekV2ZW50IiwiaW5wVmFsIiwidGFyZ2V0IiwiaW1hZ2Vob3ZlciIsInJlc2V0VGltZW91dCIsImVsIiwiaXNUb3VjaERldmljZSIsIl9lJHRhcmdldCRnZXRCb3VuZGluZyIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIndpZHRoIiwiaGVpZ2h0IiwibGVmdCIsInRvcCIsIngiLCJwYWdlWCIsInNjcm9sbFgiLCJ5IiwicGFnZVkiLCJzY3JvbGxZIiwic2V0UHJvcGVydHkiLCJyZW1vdmVQcm9wZXJ0eSIsImlzVG91Y2hEZXZpY2VWYXIiLCJuYXZpZ2F0b3IiLCJtYXhUb3VjaFBvaW50cyIsIm1zTWF4VG91Y2hQb2ludHMiLCJpbWFnZVdyYXBwZXIiLCJ3cmFwIiwid3JhcHBlciIsInBhcmVudE5vZGUiLCJhcHBlbmRDaGlsZCIsImltYWdlcyIsImR2Iiwic2hvd1JvY2tldE1vZGUiLCJ0b2dnbGVDbGFzc09uSG92ZXIiLCJ0eXBlIiwibG9nbyIsInNjcm9sbE1hbmFnZXIiLCJzY3JlZW5IZWlnaHQiLCJpbm5lckhlaWdodCIsImxhc3RTY3JvbGwiLCJxdW90ZSIsImZvb3RlciIsImhlYWRlclJhbmdlIiwiZm9vdGVyUmFuZ2UiLCJoZWFkZXJQY3QiLCJmb290ZXJQY3QiLCJqdXN0U2Nyb2xsZWREdXJhdGlvbiIsImp1c3RTY3JvbGxlZFRpbWVyIiwic2Nyb2xsU3RvcFRpbWVyIiwic2Nyb2xsU3RvcERlbGF5IiwicmVtZWFzdXJlIiwiYmluZFNjcm9sbCIsInJlcXVlc3RBbmltYXRpb25GcmFtZSIsIm9uU2Nyb2xsIiwiZ2V0U2Nyb2xsIiwic2Nyb2xsVG9wIiwidGlja2luZyIsInNjcm9sbCIsIm1heFNjcm9sbCIsInNjcm9sbEhlaWdodCIsInVwZGF0ZUhlYWRlckNsYXNzZXMiLCJ1cGRhdGVGb290ZXJDbGFzc2VzIiwidXBkYXRlUm9ja2V0VGhlbWUiLCJ1cGRhdGVTY3JvbGxEaXJlY3Rpb24iLCJoYW5kbGVKdXN0U2Nyb2xsZWQiLCJjdXJyZW50U2Nyb2xsIiwiaGVhZGVyUGl4ZWxzIiwicmF0aW8iLCJjbGFtcCIsInBjdCIsIk1hdGgiLCJyb3VuZCIsInJlcGxhY2VTdGVwQ2xhc3NlcyIsImJvdHRvbURpc3RhbmNlIiwicmVtb3ZlU3RlcENsYXNzZXMiLCJmb290ZXJQaXhlbHMiLCJwcmVmaXgiLCJjb25jYXQiLCJyb3VuZGVkIiwiaGFzUm9ja2V0IiwiaW5IZWFkZXJab25lIiwiaW5Gb290ZXJab25lIiwiX3RoaXMzIiwidiIsIm1pbiIsIm1heCIsInRvYyIsImhlYWRpbmdzIiwiY291bnQiLCJwcmV2aW91c0VsZW0iLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwic3BhbkVuZCIsIml0ZW0iXSwic291cmNlUm9vdCI6IiJ9