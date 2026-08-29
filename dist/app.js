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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxTQUFTLENBQUMwQixNQUFNLENBQUMsUUFBUSxDQUFDO0lBQy9CMkMsSUFBSSxDQUFDckUsU0FBUyxDQUFDMEIsTUFBTSxDQUFDLFNBQVMsQ0FBQztFQUNwQztFQUNBdUwsR0FBRyxDQUFDLENBQUM7O0VBRUw7RUFDQTtFQUNBO0VBQ0E7RUFDQTtFQUNBO0FBQ0osQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7QUNsR0YxTyxRQUFRLENBQUNJLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFBWixDQUFDLEVBQUk7RUFDcEMsSUFBTXdQLElBQUksR0FBR3hQLENBQUMsQ0FBQzhKLE1BQU0sQ0FBQzdCLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQztFQUNwRCxJQUFJLENBQUN1SCxJQUFJLEVBQUU7RUFFWEEsSUFBSSxDQUFDdk4sU0FBUyxDQUFDMEIsTUFBTSxDQUFDLFdBQVcsQ0FBQztBQUN0QyxDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDTEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ29CO0FBQ0k7QUFDUDtBQUNhO0FBQ0Y7QUFDVjtBQUNRO0FBQ0c7QUFDVDtBQUNLO0FBQ04iLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9iYXR0ZXJ5LXNhdmVyLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL2JvZHktY2xhc3MuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvY29sbGFwc2libGUtbWVudS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9jb29raWUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvZm9ybS5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9pbWFnZS1ob3Zlci5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy9pbWFnZXMuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvanMvbW91c2Utb3Zlci1sb2dvLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL3ByaW50LmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL3Njcm9sbC1tYW5hZ2VyLmpzIiwid2VicGFjazovL3B1YmxpYy8uLi9zdW4vc3JjL2pzL3RvYy5qcyIsIndlYnBhY2s6Ly9wdWJsaWMvLi4vc3VuL3NyYy9qcy93b3JrLWV4YW1wbGUuanMiLCJ3ZWJwYWNrOi8vcHVibGljLy4uL3N1bi9zcmMvbWFpbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBkZWJvdW5jZSA9IChjYWxsYmFjaywgdGltZW91dCwgX3RoaXMpID0+IHtcbiAgICBsZXQgdGltZXJcbiAgICByZXR1cm4gZSA9PiB7XG4gICAgICAgIGNvbnN0IF90aGF0ID0gdGhpc1xuICAgICAgICBpZiAodGltZXIpIGNsZWFyVGltZW91dCh0aW1lcilcbiAgICAgICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIGNhbGxiYWNrLmNhbGwoX3RoaXMgfHwgX3RoYXQsIGUpXG4gICAgICAgIH0sIHRpbWVvdXQpXG4gICAgfVxufVxuXG5jb25zdCB1c2VyQWN0aW9uID0gZGVib3VuY2UoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGZ1bGxTY3JlZW5EaXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmF0dGVyeS1zYXZlci1kaXYnKVxuXG4gICAgLy8gU2hvdyB0aGUgZGl2IHdoZW4gdGhlIGRvY3VtZW50IGlzIGxvYWRlZFxuICAgIGZ1bGxTY3JlZW5EaXYuc3R5bGUuZGlzcGxheSA9ICdmbGV4J1xuXG4gICAgLy8gQWRkIGNsaWNrIGV2ZW50IGxpc3RlbmVyXG4gICAgZnVsbFNjcmVlbkRpdi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVsbFNjcmVlbkRpdi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgfSlcbn0sIDYwMDAwKVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHVzZXJBY3Rpb24sIGZhbHNlKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgdXNlckFjdGlvbiwgZmFsc2UpXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdwb3BzdGF0ZScsIHVzZXJBY3Rpb24sIGZhbHNlKVxuXG51c2VyQWN0aW9uKClcbiIsImltcG9ydCB7IG15Q29va2llIH0gZnJvbSAnLi9jb29raWUuanMnXG5cbmV4cG9ydCBjb25zdCBib2R5Q2xhc3MgPSB7XG4gICAgYm9keU9iamVjdDogbnVsbCxcblxuICAgIHRoZW1lOiAnJyxcblxuICAgIGluaXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JylcbiAgICAgICAgYm9keUNsYXNzLmFkZE9yVG9nZ2xlQm9keUNsYXNzKCcjbWVudS10b2dnbGUnLCBmYWxzZSlcblxuICAgICAgICAvLyBpZiB5b3UgY2xpY2sgb24gdGhlbWUtc2VsZWN0b3IsIHlvdSBzZWxlY3QgdGhlIHRoZW1lXG4gICAgICAgIGJvZHlDbGFzcy5hZGRPclRvZ2dsZUJvZHlDbGFzcygnLnRoZW1lLXNlbGVjdG9yJywgdHJ1ZSlcbiAgICAgICAgdGhpcy50aGVtZSA9XG4gICAgICAgICAgICAvLyBpZiB5b3UgY2xpY2sgb24gc2V0LXRoZW0sIHlvdSBzZWxlY3QgdGhlIHRoZW1lXG4gICAgICAgICAgICBib2R5Q2xhc3MucmV0cmlldmVDb29raWVPckhhc2goKVxuICAgICAgICAvLyBleHBvc2Ugc2Nyb2xsZWQgYmVoYXZpb3VyXG4gICAgICAgIHRoaXMuc2Nyb2xsU3RhcnQoKVxuICAgICAgICB0aGlzLmFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzKClcbiAgICB9LFxuXG4gICAgZ2V0Qm9keU9iamVjdDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gYm9keUNsYXNzLmJvZHlPYmplY3RcbiAgICB9LFxuXG4gICAgZ2V0VGhlbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBTdHJpbmcoYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJykpXG4gICAgfSxcblxuICAgIHNob3dNZW51QXNEZWZhdWx0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGJvZHlDbGFzcy5pc0hvbWVQYWdlKCkgPT09IHRydWUgJiZcbiAgICAgICAgICAgIGJvZHlDbGFzcy5oYXNGcmFnbWVudCgpID09PSBmYWxzZVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZW51LXRvZ2dsZScpLmNsaWNrKClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBhZGRCYXNpY0JvZHlDbGFzc0xpc3RlbmVyczogZnVuY3Rpb24gKCkge1xuICAgICAgICBib2R5Q2xhc3MuYWRkUm9ja2V0TW9kZVZpZGVvT3JJbWFnZSgpXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2JvZHktbG9hZGVkJylcbiAgICAgICAgICAgIGlmICgnb250b3VjaHN0YXJ0JyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCd0b3VjaCcpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ25vLXRvdWNoJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgnYm9keS11bmxvYWRlZCcpXG4gICAgICAgIC8vIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdiZWZvcmV1bmxvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuYWRkKCdib2R5LXVubG9hZGVkJylcbiAgICAgICAgLy8gfSlcbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3BvcHN0YXRlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgncG9wc3RhdGUnKVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICByZXRyaWV2ZUNvb2tpZU9ySGFzaDogZnVuY3Rpb24gKCkge1xuICAgICAgICBsZXQgaGFzaCA9IGJvZHlDbGFzcy5nZXRIYXNoRnJvbVVSTCgpXG4gICAgICAgIGxldCBwcmVmZXJyZWRUaGVtZSA9ICcnXG4gICAgICAgIGlmIChoYXNoID09PSAncmVzZXQnKSB7XG4gICAgICAgICAgICBteUNvb2tpZS5lcmFzZUNvb2tpZSgncHJlZmVycmVkVGhlbWUnKVxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKGhhc2gpIHtcbiAgICAgICAgICAgIHRoaXMucnVuQ2xpY2tGb3JFbGVtZW50KGhhc2gpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc2ggIT09ICd0aGVtZS1tb29uJyAmJiBoYXNoICE9PSAndGhlbWUtc3VuJykge1xuICAgICAgICAgICAgcHJlZmVycmVkVGhlbWUgPSBteUNvb2tpZS5nZXRDb29raWUoJ3ByZWZlcnJlZFRoZW1lJylcbiAgICAgICAgICAgIGlmIChwcmVmZXJyZWRUaGVtZSkge1xuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LnNldEF0dHJpYnV0ZSgnZGF0YS10aGVtZScsIHByZWZlcnJlZFRoZW1lKVxuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQocHJlZmVycmVkVGhlbWUpXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGJvZHlDbGFzcy51c2VyUHJlZmVyc0RhcmtUaGVtZSgpKSB7XG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3Quc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgJ3RoZW1lLW1vb24nKVxuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoJ3RoZW1lLW1vb24nKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHVzZXJQcmVmZXJzRGFya1RoZW1lOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYSAmJlxuICAgICAgICAgICAgd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLWNvbG9yLXNjaGVtZTogZGFyayknKS5tYXRjaGVzXG4gICAgICAgIClcbiAgICB9LFxuXG4gICAgcnVuQ2xpY2tGb3JFbGVtZW50OiBmdW5jdGlvbiAoaGFzaCkge1xuICAgICAgICBoYXNoID0gaGFzaC50cmltKClcbiAgICAgICAgaWYgKGhhc2gubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBvYmogPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChoYXNoKVxuICAgICAgICAgICAgaWYgKG9iaiAmJiBvYmouY2xhc3NMaXN0LmNvbnRhaW5zKCd0aGVtZS1zZWxlY3RvcicpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGUob2JqKVxuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5hZGQoaGFzaClcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH0sXG5cbiAgICBhZGRPclRvZ2dsZUJvZHlDbGFzczogZnVuY3Rpb24gKG9ialNlbGVjdG9yLCBpc1RoZW1lKSB7XG4gICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChvYmpTZWxlY3RvcilcbiAgICAgICAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChvbmVFYWNoT2JqZWN0KSB7XG4gICAgICAgICAgICAgICAgb25lRWFjaE9iamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYWN0aW9uQm9keUNsYXNzQ2hhbmdlKFxuICAgICAgICAgICAgICAgICAgICAgICAgb25lRWFjaE9iamVjdCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgaXNUaGVtZVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIGlmIChvYmpTZWxlY3RvciA9PT0gJyNtZW51LXRvZ2dsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsb3NlIG1lbnUgd2hlbiB0b2dnbGluZ1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC50b2dnbGUoJ3Nob3ctbG9nbycpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAzMDApXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgfSxcblxuICAgIHNjcm9sbFN0YXJ0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGNvbnN0IGhhc2ggPSBib2R5Q2xhc3MuZ2V0SGFzaEZyb21VUkwoKVxuICAgICAgICAgICAgaWYgKGhhc2ggJiYgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaGFzaCkpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGhhc2gpLnNjcm9sbEludG9WaWV3KHtcbiAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLCAvLyBzbW9vdGggc2Nyb2xsXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnIC8vIHRoZSB1cHBlciBib3JkZXIgb2YgdGhlIGVsZW1lbnQgd2lsbCBiZSBhbGlnbmVkIGF0IHRoZSB0b3Agb2YgdGhlIHZpc2libGUgcGFydCBvZiB0aGUgd2luZG93IG9mIHRoZSBzY3JvbGxhYmxlIGFyZWEuXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgMzAwKVxuICAgIH0sXG5cbiAgICBhY3Rpb25Cb2R5Q2xhc3NDaGFuZ2U6IGZ1bmN0aW9uIChvbmVFYWNoT2JqZWN0LCBldmVudCwgaXNUaGVtZSwgc2Nyb2xsVG8pIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKVxuXG4gICAgICAgIGJvZHlDbGFzcy5yZW1vdmVCb2R5Q2xhc3Nlc0Jhc2VkT25BdHRyaWJ1dGUob25lRWFjaE9iamVjdClcblxuICAgICAgICBsZXQgdG9nZ2xlQ2xhc3MgPSAnJ1xuICAgICAgICBsZXQgaWQgPSAnJ1xuICAgICAgICBpZiAob25lRWFjaE9iamVjdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtYWRkLWNsYXNzJykpIHtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzID0gb25lRWFjaE9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYWRkLWNsYXNzJylcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzID0gb25lRWFjaE9iamVjdC5nZXRBdHRyaWJ1dGUoJ2lkJylcbiAgICAgICAgICAgIGlkID0gdG9nZ2xlQ2xhc3NcbiAgICAgICAgfVxuICAgICAgICBpZiAob25lRWFjaE9iamVjdC5oYXNBdHRyaWJ1dGUoJ2RhdGEtdG9nZ2xlLXJhdGhlci10aGFuLWFkZCcpKSB7XG4gICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QudG9nZ2xlKHRvZ2dsZUNsYXNzKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuY2xhc3NMaXN0LmFkZCh0b2dnbGVDbGFzcylcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1RoZW1lKSB7XG4gICAgICAgICAgICBteUNvb2tpZS5zZXRDb29raWUoJ3ByZWZlcnJlZFRoZW1lJywgdG9nZ2xlQ2xhc3MsIDE0KVxuICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3Quc2V0QXR0cmlidXRlKCdkYXRhLXRoZW1lJywgdG9nZ2xlQ2xhc3MpXG4gICAgICAgICAgICBib2R5Q2xhc3MudGhlbWUgPSB0b2dnbGVDbGFzc1xuICAgICAgICB9XG4gICAgICAgIGlmIChpZCAmJiBzY3JvbGxUbykge1xuICAgICAgICAgICAgbGV0IGhhc2ggPSBib2R5Q2xhc3MuZ2V0SGFzaEZyb21TdHJpbmcoaWQpXG4gICAgICAgICAgICBpZiAoaGFzaC5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBoYXNoID0gaGFzaC5yZXBsYWNlKCcjJywgJycpXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSAnIycgKyBoYXNoXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlQm9keUNsYXNzZXNCYXNlZE9uQXR0cmlidXRlOiBmdW5jdGlvbiAob2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QuaGFzQXR0cmlidXRlKCdkYXRhLXJlbW92ZS1jbGFzcycpKSB7XG4gICAgICAgICAgICBjb25zdCBzdHJpbmcgPSBvYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLXJlbW92ZS1jbGFzcycpXG4gICAgICAgICAgICBjb25zdCBjbGFzc2VzID0gYm9keUNsYXNzLmdldENsYXNzZXNGcm9tTGlzdChzdHJpbmcpXG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gY2xhc3Nlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gY2xhc3Nlc1tpXVxuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUodmFsdWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0Q2xhc3Nlc0Zyb21MaXN0OiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIGNvbnN0IGFycmF5ID0gc3RyaW5nLnNwbGl0KCcsJylcbiAgICAgICAgY29uc3QgbmV3QXJyYXkgPSBbXVxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbHVlID0gYXJyYXlbaV0udHJpbSgpXG4gICAgICAgICAgICBpZiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBuZXdBcnJheS5wdXNoKHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBuZXdBcnJheVxuICAgIH0sXG5cbiAgICBnZXRIYXNoRnJvbVVSTDogZnVuY3Rpb24gKCkge1xuICAgICAgICBjb25zdCBzdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uaGFzaFxuICAgICAgICByZXR1cm4gYm9keUNsYXNzLmdldEhhc2hGcm9tU3RyaW5nKHN0cmluZylcbiAgICB9LFxuXG4gICAgZ2V0SGFzaEZyb21TdHJpbmc6IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICAgICAgc3RyaW5nID0gU3RyaW5nKHN0cmluZylcbiAgICAgICAgcmV0dXJuIGJvZHlDbGFzcy5yZW1vdmVIYXNoRnJvbVN0cmluZyhzdHJpbmcpXG4gICAgfSxcblxuICAgIHJlbW92ZUhhc2hGcm9tU3RyaW5nOiBmdW5jdGlvbiAoc3RyaW5nKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmcucmVwbGFjZSgnIycsICcnKVxuICAgIH0sXG5cbiAgICBhZGRSb2NrZXRNb2RlVmlkZW9PckltYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmIChib2R5Q2xhc3MuaGFzUm9ja2V0U2hvdygpID09PSB0cnVlKSB7XG4gICAgICAgICAgICBjb25zdCB2aWRlb0lkID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKCdkYXRhLXZpZGVvLWlkJylcbiAgICAgICAgICAgIGNvbnN0IGlzTGFuZHNjYXBlID0gKCkgPT5cbiAgICAgICAgICAgICAgICB3aW5kb3cubWF0Y2hNZWRpYSgnKG9yaWVudGF0aW9uOiBsYW5kc2NhcGUpJykubWF0Y2hlc1xuICAgICAgICAgICAgY29uc3QgaW1hZ2VVUkwgPSBib2R5Q2xhc3MuYm9keU9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmctaW1hZ2UnKVxuICAgICAgICAgICAgY29uc3QgaW1hZ2VYID1cbiAgICAgICAgICAgICAgICBib2R5Q2xhc3MuYm9keU9iamVjdC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYmctaW1hZ2UteCcpID8/ICc1MCUnXG4gICAgICAgICAgICBjb25zdCBpbWFnZVkgPVxuICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0LmdldEF0dHJpYnV0ZSgnZGF0YS1iZy1pbWFnZS15JykgPz8gJzUwJSdcblxuICAgICAgICAgICAgLy8gY29uc29sZS5sb2codmlkZW9JZClcbiAgICAgICAgICAgIGlmICh2aWRlb0lkIHx8IGltYWdlVVJMKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0eWxlID0gJydcbiAgICAgICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgICAgIGRpdi5pZCA9ICdCYWNrZ3JvdW5kSW1hZ2UnXG4gICAgICAgICAgICAgICAgY29uc3Qgc2hhZG93ID0gYm9keUNsYXNzLmJvZHlPYmplY3QuZ2V0QXR0cmlidXRlKFxuICAgICAgICAgICAgICAgICAgICAnZGF0YS1zaGFkb3ctb3Zlci1sb2dvJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBsZXQgc2hhZG93Q29sb3VyID0gJydcbiAgICAgICAgICAgICAgICBpZiAoc2hhZG93ID09PSAnZGFyaycpIHtcbiAgICAgICAgICAgICAgICAgICAgc2hhZG93Q29sb3VyID1cbiAgICAgICAgICAgICAgICAgICAgICAgICdsaW5lYXItZ3JhZGllbnQoMjEwZGVnLCAjMDAwMDAwNzcgMTIlLCB0cmFuc3BhcmVudCA4OCUpJ1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc2hhZG93ID09PSAnbGlnaHQnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNoYWRvd0NvbG91ciA9XG4gICAgICAgICAgICAgICAgICAgICAgICAnbGluZWFyLWdyYWRpZW50KDIxMGRlZywgI0ZGRkZGRjc3IDEyJSwgdHJhbnNwYXJlbnQgODglKSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHZpZGVvSWQgJiYgaXNMYW5kc2NhcGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aWRlb1VybCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAnaHR0cHM6Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvLycgK1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9JZCArXG4gICAgICAgICAgICAgICAgICAgICAgICAnP2F1dG9wbGF5PTEmYXV0b3BhdXNlPTAmbXV0ZWQ9MSZiYWNrZ3JvdW5kPTEnXG4gICAgICAgICAgICAgICAgICAgIGlmIChzaGFkb3dDb2xvdXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlID0gJ2JhY2tncm91bmQ6ICcgKyBzaGFkb3dDb2xvdXJcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkaXYuaW5uZXJIVE1MID1cbiAgICAgICAgICAgICAgICAgICAgICAgICc8aWZyYW1lIHNyYz1cIicgK1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW9VcmwgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ1wiIGZyYW1lYm9yZGVyPVwiMFwiIGFsbG93PVwiYXV0b3BsYXk7IGZ1bGxzY3JlZW5cIiBhbGxvd2Z1bGxzY3JlZW4gc3R5bGU9XCInICtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdcIj48L2lmcmFtZT4nXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBib2R5Q2xhc3MuYm9keU9iamVjdC5maXJzdENoaWxkXG4gICAgICAgICAgICAgICAgICAgIGJvZHlDbGFzcy5ib2R5T2JqZWN0Lmluc2VydEJlZm9yZShkaXYsIHRlbXApXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpZGVvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndmlkZW8nKVxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2hhcy1iZy1pbWFnZS1sb2FkZWQnKVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaW1hZ2VVUkwpIHtcbiAgICAgICAgICAgICAgICAgICAgc3R5bGUgPSAndXJsKCcgKyBpbWFnZVVSTCArICcpJ1xuICAgICAgICAgICAgICAgICAgICBpZiAoc2hhZG93Q29sb3VyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZSA9IHNoYWRvd0NvbG91ciArICcsJyArIHN0eWxlXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGl2LnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IHN0eWxlXG4gICAgICAgICAgICAgICAgICAgIGRpdi5zdHlsZS5iYWNrZ3JvdW5kUG9zaXRpb24gPSBpbWFnZVggKyAnICcgKyBpbWFnZVlcblxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbWcgPSBuZXcgSW1hZ2UoKVxuICAgICAgICAgICAgICAgICAgICBpbWcub25sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdoYXMtYmctaW1hZ2UtbG9hZGVkJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbWcub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnaGFzLWJnLWltYWdlLWxvYWRlZCcpIC8vIGZhaWwgb3BlblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSBpbWFnZVVSTFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnZmFkZS1vbi1uby1yb2NrZXQnKVxuICAgICAgICAgICAgICAgIGNvbnN0IHRlbXAgPSBib2R5Q2xhc3MuYm9keU9iamVjdC5maXJzdENoaWxkXG4gICAgICAgICAgICAgICAgYm9keUNsYXNzLmJvZHlPYmplY3QuaW5zZXJ0QmVmb3JlKGRpdiwgdGVtcClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdubyByb2NrZXQgc2hvdycpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgaXNIb21lUGFnZTogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lID09PSAnLydcbiAgICB9LFxuXG4gICAgaGFzRnJhZ21lbnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9PSAnJ1xuICAgIH0sXG5cbiAgICBoYXNSb2NrZXRTaG93OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBib2R5Q2xhc3MuYm9keU9iamVjdC5jbGFzc0xpc3QuY29udGFpbnMoJ25vLXJvY2tldC1zaG93JylcbiAgICAgICAgICAgID8gZmFsc2VcbiAgICAgICAgICAgIDogdHJ1ZVxuICAgIH1cbn1cblxuYm9keUNsYXNzLmluaXQoKVxuIiwiY29uc3QgQ29sbGFwc2libGVMaXN0cyA9ICgoKSA9PiB7XG4gICAgZnVuY3Rpb24gYXBwbHkgKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCd1bC5jb2xsYXBzaWJsZUxpc3QnKS5mb3JFYWNoKGxpc3QgPT4ge1xuICAgICAgICAgICAgYXBwbHlUbyhsaXN0KVxuICAgICAgICAgICAgdXBkYXRlSGFzT3BlbihsaXN0KVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGx5VG8gKGxpc3QpIHtcbiAgICAgICAgbGlzdC5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmZvckVhY2gobGkgPT4ge1xuICAgICAgICAgICAgY29uc3QgY2hpbGRVbCA9IGxpLnF1ZXJ5U2VsZWN0b3IoJzpzY29wZSA+IHVsJylcbiAgICAgICAgICAgIGlmICghY2hpbGRVbCkgcmV0dXJuXG5cbiAgICAgICAgICAgIC8vIEFERCBUT0dHTEUgQVJST1dcbiAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICAgIHNwYW4uY2xhc3NOYW1lID0gJ29wZW4tY2xvc2UnXG4gICAgICAgICAgICBzcGFuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cIm9wZW5cIj7ihpg8L2k+PGkgY2xhc3M9XCJjbG9zZWRcIj7ihpY8L2k+J1xuICAgICAgICAgICAgc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRvZ2dsZShsaSkpXG5cbiAgICAgICAgICAgIGxpLmluc2VydEJlZm9yZShzcGFuLCBjaGlsZFVsKVxuXG4gICAgICAgICAgICAvLyBjb2xsYXBzZWQgYnkgZGVmYXVsdFxuICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICAgICAgICAgIGNoaWxkVWwuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuXG4gICAgICAgICAgICAvLyBvcGVuIGRlZmF1bHRzXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmNvbnRhaW5zKCdjdXJyZW50JykgfHxcbiAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuY29udGFpbnMoJ3NlY3Rpb24nKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgb3BlbihsaSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGUgKGxpKSB7XG4gICAgICAgIGlmIChsaS5jbGFzc0xpc3QuY29udGFpbnMoJ2NvbGxhcHNpYmxlTGlzdE9wZW4nKSkge1xuICAgICAgICAgICAgY2xvc2UobGkpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvcGVuKGxpKVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3BlbiAobGkpIHtcbiAgICAgICAgbGkuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0T3BlbicpXG5cbiAgICAgICAgY29uc3QgZGlyZWN0VWwgPSBsaS5xdWVyeVNlbGVjdG9yKCc6c2NvcGUgPiB1bCcpXG4gICAgICAgIGlmIChkaXJlY3RVbCkgZGlyZWN0VWwuc3R5bGUuZGlzcGxheSA9ICdibG9jaydcblxuICAgICAgICAvLyBrZWVwIGRlZXBlciBsZXZlbHMgY29sbGFwc2VkXG4gICAgICAgIGlmIChkaXJlY3RVbCkge1xuICAgICAgICAgICAgZGlyZWN0VWwucXVlcnlTZWxlY3RvckFsbCgnOnNjb3BlIHVsJykuZm9yRWFjaChuZXN0ZWRVbCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbmVzdGVkTGkgPSBuZXN0ZWRVbC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgICAgICAgbmVzdGVkTGkuY2xhc3NMaXN0LnJlbW92ZSgnY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgICAgICAgICAgICAgbmVzdGVkTGkuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcbiAgICAgICAgICAgICAgICBuZXN0ZWRVbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gTkVXOiBjbG9zZSBzaWJsaW5ncyBvbiB0aGUgc2FtZSBsZXZlbFxuICAgICAgICBjb25zdCBwYXJlbnRMaXN0ID0gbGkucGFyZW50RWxlbWVudFxuICAgICAgICBwYXJlbnRMaXN0XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbCgnOnNjb3BlID4gbGkuY29sbGFwc2libGVMaXN0T3BlbicpXG4gICAgICAgICAgICAuZm9yRWFjaChzaWJsaW5nID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoc2libGluZyAhPT0gbGkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xvc2Uoc2libGluZylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIG1hcmtTaWJsaW5nU3RhdGUobGkpXG4gICAgICAgIHVwZGF0ZUhhc09wZW4obGkuY2xvc2VzdCgnLmNvbGxhcHNpYmxlTGlzdCcpKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlIChsaSkge1xuICAgICAgICBsaS5jbGFzc0xpc3QucmVtb3ZlKCdjb2xsYXBzaWJsZUxpc3RPcGVuJylcbiAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2libGVMaXN0Q2xvc2VkJylcblxuICAgICAgICBjb25zdCBjaGlsZFVsID0gbGkucXVlcnlTZWxlY3RvcignOnNjb3BlID4gdWwnKVxuICAgICAgICBpZiAoY2hpbGRVbCkgY2hpbGRVbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG5cbiAgICAgICAgbWFya1NpYmxpbmdTdGF0ZShsaSlcbiAgICAgICAgdXBkYXRlSGFzT3BlbihsaS5jbG9zZXN0KCcuY29sbGFwc2libGVMaXN0JykpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFya1NpYmxpbmdTdGF0ZSAobGkpIHtcbiAgICAgICAgY29uc3QgcGFyZW50TGlzdCA9IGxpLnBhcmVudEVsZW1lbnRcbiAgICAgICAgaWYgKCFwYXJlbnRMaXN0LmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0JykpIHJldHVyblxuXG4gICAgICAgIGNvbnN0IHNpYmxpbmdzID0gcGFyZW50TGlzdC5xdWVyeVNlbGVjdG9yQWxsKCc6c2NvcGUgPiBsaScpXG4gICAgICAgIGNvbnN0IGlzT3BlbiA9IGxpLmNsYXNzTGlzdC5jb250YWlucygnY29sbGFwc2libGVMaXN0T3BlbicpXG5cbiAgICAgICAgc2libGluZ3MuZm9yRWFjaChzaWIgPT4gc2liLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbGxhcHNpYmxlTGlzdE5vdE9wZW4nKSlcblxuICAgICAgICBpZiAoaXNPcGVuKSB7XG4gICAgICAgICAgICBzaWJsaW5ncy5mb3JFYWNoKHNpYiA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHNpYiAhPT0gbGkpIHNpYi5jbGFzc0xpc3QuYWRkKCdjb2xsYXBzaWJsZUxpc3ROb3RPcGVuJylcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1cGRhdGVIYXNPcGVuIChsaXN0KSB7XG4gICAgICAgIGlmICghbGlzdCkgcmV0dXJuXG4gICAgICAgIGNvbnN0IGhhcyA9IGxpc3QucXVlcnlTZWxlY3RvcignLmNvbGxhcHNpYmxlTGlzdE9wZW4nKVxuICAgICAgICBsaXN0LmNsYXNzTGlzdC50b2dnbGUoJ2NvbGxhcHNpYmxlTGlzdEhhc09wZW4nLCAhIWhhcylcbiAgICB9XG5cbiAgICByZXR1cm4geyBhcHBseSB9XG59KSgpXG5cbkNvbGxhcHNpYmxlTGlzdHMuYXBwbHkoKVxuIiwiY29uc3QgbXlDb29raWUgPSB7XG5cbiAgc2V0Q29va2llOiBmdW5jdGlvbiAobmFtZSwgdmFsdWUsIGRheXMpIHtcbiAgICB2YXIgZXhwaXJlcyA9ICcnXG4gICAgaWYgKHR5cGVvZiBkYXlzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGF5cyA9IDE0XG4gICAgfVxuICAgIGlmIChkYXlzKSB7XG4gICAgICB2YXIgZGF0ZSA9IG5ldyBEYXRlKClcbiAgICAgIGRhdGUuc2V0VGltZShkYXRlLmdldFRpbWUoKSArIChkYXlzICogMjQgKiA2MCAqIDYwICogMTAwMCkpXG4gICAgICBleHBpcmVzID0gJzsgZXhwaXJlcz0nICsgZGF0ZS50b1VUQ1N0cmluZygpXG4gICAgfVxuICAgIGRvY3VtZW50LmNvb2tpZSA9IG5hbWUgKyAnPScgKyAodmFsdWUgfHwgJycpICsgZXhwaXJlcyArICc7IHBhdGg9LydcbiAgfSxcblxuICBnZXRDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdmFyIG5hbWVFUSA9IG5hbWUgKyAnPSdcbiAgICB2YXIgY2EgPSBkb2N1bWVudC5jb29raWUuc3BsaXQoJzsnKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2EubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBjID0gY2FbaV1cbiAgICAgIHdoaWxlIChjLmNoYXJBdCgwKSA9PT0gJyAnKSB7XG4gICAgICAgIGMgPSBjLnN1YnN0cmluZygxLCBjLmxlbmd0aClcbiAgICAgIH1cbiAgICAgIGlmIChjLmluZGV4T2YobmFtZUVRKSA9PT0gMCkge1xuICAgICAgICByZXR1cm4gYy5zdWJzdHJpbmcobmFtZUVRLmxlbmd0aCwgYy5sZW5ndGgpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBudWxsXG4gIH0sXG5cbiAgZXJhc2VDb29raWU6IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgbXlDb29raWUuc2V0Q29va2llKG5hbWUsIG51bGwsIDApXG4gIH1cbn1cblxuZXhwb3J0IHsgbXlDb29raWUgfVxuIiwidmFyIGZvcm1maWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAnaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWEnXG4pXG5mb3IgKHZhciBKID0gZm9ybWZpZWxkcy5sZW5ndGggLSAxOyBKID49IDA7IC0tSikge1xuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGFkanVzdFN0eWxpbmcsIGZhbHNlKVxuICBmb3JtZmllbGRzW0pdLmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBhZGp1c3RTdHlsaW5nLCBmYWxzZSlcbiAgZm9ybWZpZWxkc1tKXS5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG4gIGZvcm1maWVsZHNbSl0uYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgYWRqdXN0U3R5bGluZywgZmFsc2UpXG5cbiAgdmFyIGV2dCA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdIVE1MRXZlbnRzJylcbiAgZXZ0LmluaXRFdmVudCgnY2hhbmdlJywgZmFsc2UsIHRydWUpXG4gIGZvcm1maWVsZHNbSl0uZGlzcGF0Y2hFdmVudChldnQpXG59XG5cbmZ1bmN0aW9uIGFkanVzdFN0eWxpbmcgKHpFdmVudCkge1xuICB2YXIgaW5wVmFsID0gekV2ZW50LnRhcmdldC52YWx1ZVxuICBpZiAoaW5wVmFsICYmIGlucFZhbC5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJykpIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ25vLXZhbHVlJylcbiAgfSBlbHNlIHtcbiAgICB6RXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ25vLXZhbHVlJylcbiAgfVxufVxuIiwiY29uc3QgaW1hZ2Vob3ZlciA9IHtcbiAgICByZXNldFRpbWVvdXQ6IG51bGwsXG5cbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50XG4gICAgICAgICAgICAucXVlcnlTZWxlY3RvckFsbChcbiAgICAgICAgICAgICAgICAnLmVsZW1lbnQgc3VubnlzaWRldXBfX2FwcF9fZWxlbWVudHNfX3dvcmtleGFtcGxlIC5pbWFnZS1jb250YWluZXInXG4gICAgICAgICAgICApXG4gICAgICAgICAgICAuZm9yRWFjaChlbCA9PiB7XG4gICAgICAgICAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVG91Y2hEZXZpY2UoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMucmVzZXRUaW1lb3V0KVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0LCBsZWZ0LCB0b3AgfSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgICAgICAgICAgICAgICAgICBjb25zdCB4ID0gZS5wYWdlWCAtIGxlZnQgLSB3aW5kb3cuc2Nyb2xsWFxuICAgICAgICAgICAgICAgICAgICBjb25zdCB5ID0gZS5wYWdlWSAtIHRvcCAtIHdpbmRvdy5zY3JvbGxZXG5cbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUuc2V0UHJvcGVydHkoXG4gICAgICAgICAgICAgICAgICAgICAgICAnLS1tb3VzZS14JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICh4IC8gd2lkdGgpICogNTAgLSAyNVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LnN0eWxlLnNldFByb3BlcnR5KFxuICAgICAgICAgICAgICAgICAgICAgICAgJy0tbW91c2UteScsXG4gICAgICAgICAgICAgICAgICAgICAgICAyNSAtICh5IC8gaGVpZ2h0KSAqIDUwXG4gICAgICAgICAgICAgICAgICAgIClcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1RvdWNoRGV2aWNlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJy0tbW91c2UteCcpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuc3R5bGUucmVtb3ZlUHJvcGVydHkoJy0tbW91c2UteScpXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0pXG4gICAgfSxcbiAgICBpc1RvdWNoRGV2aWNlVmFyOiBudWxsLFxuXG4gICAgaXNUb3VjaERldmljZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5pc1RvdWNoRGV2aWNlVmFyID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmlzVG91Y2hEZXZpY2VWYXIgPVxuICAgICAgICAgICAgICAgICdvbnRvdWNoc3RhcnQnIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCB8fFxuICAgICAgICAgICAgICAgICdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fFxuICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tYXhUb3VjaFBvaW50cyA+IDAgfHxcbiAgICAgICAgICAgICAgICBuYXZpZ2F0b3IubXNNYXhUb3VjaFBvaW50cyA+IDBcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5pc1RvdWNoRGV2aWNlVmFyXG4gICAgfVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgZnVuY3Rpb24gKCkge1xuICAgIGltYWdlaG92ZXIuaW5pdCgpXG59KVxuIiwiXG5jb25zdCBpbWFnZVdyYXBwZXIgPSAoKSA9PiB7XG4gIGZ1bmN0aW9uIHdyYXAgKGVsLCB3cmFwcGVyKSB7XG4gICAgZWwucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUod3JhcHBlciwgZWwpXG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChlbClcbiAgfVxuICAvLyBjcmVhdGUgdGhlIGNvbnRhaW5lciBkaXZcblxuICAvLyBnZXQgYWxsIGRpdnNcbiAgY29uc3QgaW1hZ2VzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnR5cG9ncmFwaHkgaW1nJylcbiAgLy8gZ2V0IHRoZSBib2R5IGVsZW1lbnRcbiAgLy8gYXBwbHkgY2xhc3MgdG8gY29udGFpbmVyIGRpdlxuXG4gIC8vIGZpbmQgb3V0IGFsbCB0aG9zZSBkaXZzIGhhdmluZyBjbGFzcyBDXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgaW1hZ2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgZHYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgIGR2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnaW1hZ2UtY29udGFpbmVyJylcbiAgICBjb25zdCBpbWcgPSBpbWFnZXNbaV1cbiAgICB3cmFwKGltZywgZHYpXG4gIH1cbn1cblxuaW1hZ2VXcmFwcGVyKClcbiIsImNvbnN0IHNob3dSb2NrZXRNb2RlID0ge1xuICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgdG9nZ2xlQ2xhc3NPbkhvdmVyID0gKGUpID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKVxuICAgICAgICAuY2xhc3NMaXN0XG4gICAgICAgIC50b2dnbGUoJ21vdXNlLW92ZXItbG9nbycsIGUudHlwZSA9PT0gJ21vdXNlZW50ZXInKVxuICAgIH1cbiAgICBjb25zdCBsb2dvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xvZ28nKVxuICAgIGxvZ28uYWRkRXZlbnRMaXN0ZW5lcignbW91c2VlbnRlcicsIHRvZ2dsZUNsYXNzT25Ib3ZlcilcbiAgICBsb2dvLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0b2dnbGVDbGFzc09uSG92ZXIpXG4gIH1cbn1cblxuc2hvd1JvY2tldE1vZGUuaW5pdCgpXG4iLCJ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmVmb3JlcHJpbnQnLCBldmVudCA9PiB7XG4gICAgY29uc3QgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudC1iZWxvdy1xdW90ZScpXG4gICAgZWwuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogJ3Ntb290aCcgfSlcbn0pXG4iLCJpbXBvcnQgeyBib2R5Q2xhc3MgfSBmcm9tICcuL2JvZHktY2xhc3MnXG5cbmNvbnN0IHNjcm9sbE1hbmFnZXIgPSB7XG4gICAgc2NyZWVuSGVpZ2h0OiB3aW5kb3cuaW5uZXJIZWlnaHQsXG4gICAgbGFzdFNjcm9sbDogMCxcbiAgICBib2R5OiBudWxsLFxuICAgIHF1b3RlOiBudWxsLFxuICAgIGZvb3RlcjogbnVsbCxcbiAgICBoZWFkZXJSYW5nZTogNzAsIC8vIGluIHZoXG4gICAgZm9vdGVyUmFuZ2U6IDE4MCwgLy8gaW4gdmhcbiAgICBoZWFkZXJQY3Q6IDAsXG4gICAgZm9vdGVyUGN0OiAxMDAsXG4gICAganVzdFNjcm9sbGVkRHVyYXRpb246IDEyMDAsIC8vIG1zIOKAlCBjaGFuZ2UgZnJlZWx5XG4gICAganVzdFNjcm9sbGVkVGltZXI6IG51bGwsXG4gICAgc2Nyb2xsU3RvcFRpbWVyOiBudWxsLFxuICAgIHNjcm9sbFN0b3BEZWxheTogMTIwLCAvLyBtcyBhZnRlciBsYXN0IHNjcm9sbCBldmVudFxuXG4gICAgaW5pdCAoKSB7XG4gICAgICAgIHRoaXMuYm9keSA9IGJvZHlDbGFzcy5nZXRCb2R5T2JqZWN0KClcbiAgICAgICAgdGhpcy5xdW90ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYWluLXF1b3RlJylcbiAgICAgICAgdGhpcy5mb290ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9vdGVyJylcblxuICAgICAgICB0aGlzLnJlbWVhc3VyZSgpXG4gICAgICAgIHRoaXMuYmluZFNjcm9sbCgpXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsICgpID0+IHRoaXMucmVtZWFzdXJlKCkpXG5cbiAgICAgICAgLy8gTkVXOiBUcmlnZ2VyIHRoZSBpbml0aWFsIHNjcm9sbCBjYWxjdWxhdGlvblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5vblNjcm9sbCgpKVxuICAgIH0sXG5cbiAgICByZW1lYXN1cmUgKCkge1xuICAgICAgICB0aGlzLnNjcmVlbkhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgICAgICB0aGlzLmxhc3RTY3JvbGwgPSB0aGlzLmdldFNjcm9sbCgpXG4gICAgfSxcblxuICAgIGdldFNjcm9sbCAoKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuc2Nyb2xsWSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXG4gICAgfSxcblxuICAgIGJpbmRTY3JvbGwgKCkge1xuICAgICAgICBsZXQgdGlja2luZyA9IGZhbHNlXG5cbiAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcbiAgICAgICAgICAgIGlmICghdGlja2luZykge1xuICAgICAgICAgICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uU2Nyb2xsKClcbiAgICAgICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB0aWNraW5nID0gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBvblNjcm9sbCAoKSB7XG4gICAgICAgIGNvbnN0IHNjcm9sbCA9IHRoaXMuZ2V0U2Nyb2xsKClcbiAgICAgICAgY29uc3QgbWF4U2Nyb2xsID1cbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxIZWlnaHQgLSB0aGlzLnNjcmVlbkhlaWdodFxuXG4gICAgICAgIHRoaXMudXBkYXRlSGVhZGVyQ2xhc3NlcyhzY3JvbGwpXG4gICAgICAgIHRoaXMudXBkYXRlRm9vdGVyQ2xhc3NlcyhzY3JvbGwsIG1heFNjcm9sbClcbiAgICAgICAgdGhpcy51cGRhdGVSb2NrZXRUaGVtZSgpXG4gICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsRGlyZWN0aW9uKHNjcm9sbClcbiAgICAgICAgdGhpcy5oYW5kbGVKdXN0U2Nyb2xsZWQoKVxuXG4gICAgICAgIHRoaXMubGFzdFNjcm9sbCA9IHNjcm9sbFxuICAgIH0sXG5cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBIRUFERVIgLyBGT09URVIgU1RBVEUgKDDigJMxMDApXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdXBkYXRlSGVhZGVyQ2xhc3NlcyAoY3VycmVudFNjcm9sbCkge1xuICAgICAgICBjb25zdCBoZWFkZXJQaXhlbHMgPSB0aGlzLnNjcmVlbkhlaWdodCAqICh0aGlzLmhlYWRlclJhbmdlIC8gMTAwKVxuICAgICAgICBjb25zdCByYXRpbyA9IHRoaXMuY2xhbXAoY3VycmVudFNjcm9sbCAvIGhlYWRlclBpeGVscywgMCwgMSlcbiAgICAgICAgY29uc3QgcGN0ID0gTWF0aC5yb3VuZChyYXRpbyAqIDEwMClcblxuICAgICAgICB0aGlzLmhlYWRlclBjdCA9IHBjdFxuICAgICAgICB0aGlzLnJlcGxhY2VTdGVwQ2xhc3NlcygnaGVhZGVyJywgcGN0KVxuXG4gICAgICAgIGlmIChwY3QgPj0gMTAwKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgncGFzdC1oZWFkZXInKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Bhc3QtaGVhZGVyJylcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdXBkYXRlRm9vdGVyQ2xhc3NlcyAoY3VycmVudFNjcm9sbCwgbWF4U2Nyb2xsKSB7XG4gICAgICAgIGNvbnN0IGJvdHRvbURpc3RhbmNlID0gbWF4U2Nyb2xsIC0gY3VycmVudFNjcm9sbFxuXG4gICAgICAgIGNvbnN0IGhlYWRlclBpeGVscyA9IHRoaXMuc2NyZWVuSGVpZ2h0ICogKHRoaXMuaGVhZGVyUmFuZ2UgLyAxMDApXG5cbiAgICAgICAgLy8gSWYgd2UncmUgc3RpbGwgaW4gdGhlIGhlYWRlciB6b25lLCBoaWRlIGZvb3RlciBjbGFzc2VzXG4gICAgICAgIGlmIChjdXJyZW50U2Nyb2xsIDwgaGVhZGVyUGl4ZWxzKSB7XG4gICAgICAgICAgICB0aGlzLmZvb3RlclBjdCA9IDEwMFxuICAgICAgICAgICAgdGhpcy5yZW1vdmVTdGVwQ2xhc3NlcygnZm9vdGVyJylcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdmb290ZXItdmlzaWJsZScpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGZvb3RlclBpeGVscyA9IHRoaXMuc2NyZWVuSGVpZ2h0ICogKHRoaXMuZm9vdGVyUmFuZ2UgLyAxMDApXG4gICAgICAgIGNvbnN0IHJhdGlvID0gdGhpcy5jbGFtcChib3R0b21EaXN0YW5jZSAvIGZvb3RlclBpeGVscywgMCwgMSlcbiAgICAgICAgY29uc3QgcGN0ID0gTWF0aC5yb3VuZChyYXRpbyAqIDEwMClcblxuICAgICAgICB0aGlzLmZvb3RlclBjdCA9IHBjdFxuICAgICAgICB0aGlzLnJlcGxhY2VTdGVwQ2xhc3NlcygnZm9vdGVyJywgcGN0KVxuXG4gICAgICAgIGlmIChwY3QgPCAxMDApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKCdmb290ZXItdmlzaWJsZScpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgnZm9vdGVyLXZpc2libGUnKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlcGxhY2VTdGVwQ2xhc3NlcyAocHJlZml4LCBwY3QpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPD0gMTAwOyBpICs9IDEwKSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZShgJHtwcmVmaXh9LSR7aX1gKVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJvdW5kZWQgPSBNYXRoLnJvdW5kKHBjdCAvIDEwKSAqIDEwXG4gICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QuYWRkKGAke3ByZWZpeH0tJHtyb3VuZGVkfWApXG4gICAgfSxcbiAgICByZW1vdmVTdGVwQ2xhc3NlcyAocHJlZml4KSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDw9IDEwMDsgaSArPSAxMCkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoYCR7cHJlZml4fS0ke2l9YClcbiAgICAgICAgfVxuICAgIH0sXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gUk9DS0VUIFRIRU1FXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdXBkYXRlUm9ja2V0VGhlbWUgKCkge1xuICAgICAgICBjb25zdCBoYXNSb2NrZXQgPSAhdGhpcy5ib2R5LmNsYXNzTGlzdC5jb250YWlucygnbm8tcm9ja2V0LXNob3cnKVxuICAgICAgICBpZiAoIWhhc1JvY2tldCkgcmV0dXJuXG5cbiAgICAgICAgY29uc3QgaW5IZWFkZXJab25lID0gdGhpcy5oZWFkZXJQY3QgPCAxMDBcbiAgICAgICAgY29uc3QgaW5Gb290ZXJab25lID0gdGhpcy5mb290ZXJQY3QgPCAxMDBcblxuICAgICAgICBpZiAoaW5IZWFkZXJab25lIHx8IGluRm9vdGVyWm9uZSkge1xuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ3RoZW1lLXJvY2tldCcpXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LnJlbW92ZShib2R5Q2xhc3MuZ2V0VGhlbWUoKSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCd0aGVtZS1yb2NrZXQnKVxuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoYm9keUNsYXNzLmdldFRoZW1lKCkpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgLy8gU0NST0xMIERJUkVDVElPTlxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHVwZGF0ZVNjcm9sbERpcmVjdGlvbiAoc2Nyb2xsKSB7XG4gICAgICAgIGlmIChzY3JvbGwgPiB0aGlzLmxhc3RTY3JvbGwpIHtcbiAgICAgICAgICAgIHRoaXMuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdzY3JvbGxlZC11cCcpXG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsZWQtZG93bicpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmJvZHkuY2xhc3NMaXN0LmFkZCgnc2Nyb2xsZWQtdXAnKVxuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3Njcm9sbGVkLWRvd24nKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIC8vIEpVU1QgU0NST0xMRURcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBoYW5kbGVKdXN0U2Nyb2xsZWQgKCkge1xuICAgICAgICAvLyBDbGVhciBwcmV2aW91cyBzdG9wIGRldGVjdGlvblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxTdG9wVGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnNjcm9sbFN0b3BUaW1lcilcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsU3RvcFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAvLyBTY3JvbGwgaGFzIGVuZGVkIOKGkiBhZGQganVzdC1zY3JvbGxlZFxuICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5hZGQoJ2p1c3Qtc2Nyb2xsZWQnKVxuXG4gICAgICAgICAgICAvLyBDbGVhciBwcmV2aW91cyB2aXNpYmlsaXR5IHRpbWVyXG4gICAgICAgICAgICBpZiAodGhpcy5qdXN0U2Nyb2xsZWRUaW1lcikge1xuICAgICAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLmp1c3RTY3JvbGxlZFRpbWVyKVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmp1c3RTY3JvbGxlZFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2p1c3Qtc2Nyb2xsZWQnKVxuICAgICAgICAgICAgfSwgdGhpcy5qdXN0U2Nyb2xsZWREdXJhdGlvbilcbiAgICAgICAgfSwgdGhpcy5zY3JvbGxTdG9wRGVsYXkpXG4gICAgfSxcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBVVElMXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgY2xhbXAgKHYsIG1pbiwgbWF4KSB7XG4gICAgICAgIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKG1heCwgdikpXG4gICAgfVxufVxuXG5zY3JvbGxNYW5hZ2VyLmluaXQoKVxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpXG5cbiAgICBjb25zdCB0b2MgPSAoKSA9PiB7XG4gICAgICAgIC8vIGNyZWF0ZSB0aGUgY29udGFpbmVyIGRpdlxuICAgICAgICAvLyBnZXQgYWxsIGRpdnNcbiAgICAgICAgY29uc3QgaGVhZGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICAgJyNjb250ZW50LWJlbG93LXF1b3RlIGgxLCAjY29udGVudC1iZWxvdy1xdW90ZSBoMidcbiAgICAgICAgKVxuICAgICAgICAvLyBnZXQgdGhlIGJvZHkgZWxlbWVudFxuICAgICAgICAvLyBhcHBseSBjbGFzcyB0byBjb250YWluZXIgZGl2XG4gICAgICAgIGlmIChoZWFkaW5ncy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBib2R5LmNsYXNzTGlzdC5hZGQoJ2hhcy10b2MnKVxuICAgICAgICAgICAgYm9keS5jbGFzc0xpc3QuYWRkKCd0b2Mtb2ZmJylcbiAgICAgICAgICAgIGxldCBjb3VudCA9IDBcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb3VudCA9IGkgKyAxXG4gICAgICAgICAgICAgICAgY29uc3QgZWwgPSBoZWFkaW5nc1tpXVxuICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGVsKVxuICAgICAgICAgICAgICAgIGxldCBwcmV2aW91c0VsZW0gPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nXG4gICAgICAgICAgICAgICAgaWYgKHByZXZpb3VzRWxlbSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBBcHBseSBzdHlsZXMgb3IgY2xhc3NlcyB0byBwcmV2aW91c0VsZW1cbiAgICAgICAgICAgICAgICAgICAgcHJldmlvdXNFbGVtLmNsYXNzTGlzdC5hZGQoJ2JvdHRvbS1zcGFjZScpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsLmlkID0gJ3RvYy0nICsgY291bnRcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdjb3VudGFibGUtaWNvbnMnKVxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2ljb24tJyArIGNvdW50KVxuICAgICAgICAgICAgICAgIGNvbnN0IHNwYW4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzcGFuJylcbiAgICAgICAgICAgICAgICBzcGFuLmNsYXNzTGlzdC5hZGQoJ29wZW4tY2xvc2UnKVxuICAgICAgICAgICAgICAgIHNwYW4uY2xhc3NMaXN0LmFkZCgnaWNvbicpXG4gICAgICAgICAgICAgICAgY29uc3Qgc3BhbkVuZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKVxuICAgICAgICAgICAgICAgIHNwYW5FbmQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlLWhvbGRlcicpXG4gICAgICAgICAgICAgICAgLy8gc3Bhbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZUNsaWNrLmJpbmQobnVsbCwgZWwpKVxuICAgICAgICAgICAgICAgIHNwYW4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwib3BlblwiPis8L2k+PGkgY2xhc3M9XCJjbG9zZWRcIj7igJM8L2k+J1xuICAgICAgICAgICAgICAgIHNwYW5FbmQuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiYWN0aXZlXCI+4paCPC9pPidcbiAgICAgICAgICAgICAgICBlbC5pbnNlcnRCZWZvcmUoc3BhbiwgZWwuZmlyc3RDaGlsZClcbiAgICAgICAgICAgICAgICBlbC5hcHBlbmRDaGlsZChzcGFuRW5kKVxuICAgICAgICAgICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgndG9jLW9uJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgndG9jLW9mZicpXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBoYXNoID0gdGhpcy5pZFxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVhZGluZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcjY29udGVudC1iZWxvdy1xdW90ZSAudG9jLWFjdGl2ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaGVhZGluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IGhlYWRpbmdzW2ldXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgndG9jLWFjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QudG9nZ2xlKCd0b2MtYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChib2R5LmNsYXNzTGlzdC5jb250YWlucygndG9jLW9uJykgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhhc2ggPSBoYXNoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyMnICsgaGFzaClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zY3JvbGxJbnRvVmlldyh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDEwMClcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoJyN0b2MtMScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc2Nyb2xsSW50b1ZpZXcoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9jazogJ3N0YXJ0J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAxMDApXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBib2R5LmNsYXNzTGlzdC5hZGQoJ25vLXRvYycpXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAgIHdpbmRvdy5sb2NhdGlvbi5oYXNoID09PSAnI3RvYycgJiZcbiAgICAgICAgYm9keS5jbGFzc0xpc3QuY29udGFpbnMoJ3RvYy1vZmYnKSAmJlxuICAgICAgICBib2R5LmNsYXNzTGlzdC5jb250YWlucygnaGFzLXRvYycpXG4gICAgKSB7XG4gICAgICAgIGJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgndG9jLW9uJylcbiAgICAgICAgYm9keS5jbGFzc0xpc3QudG9nZ2xlKCd0b2Mtb2ZmJylcbiAgICB9XG4gICAgdG9jKClcblxuICAgIC8vIGNvbnN0IGNsaWNrZWRFbGVtZW50ID0gZXZlbnQudGFyZ2V0XG4gICAgLy8gaWYgKGV2ZW50LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NvdW50YWJsZS1pY29ucycpKSB7XG4gICAgLy8gICAgIGNvbnNvbGUubG9nKGV2ZW50LnRhcmdldClcbiAgICAvLyAgICAgY29uc29sZS5sb2coJ0FBJylcbiAgICAvLyAgICAgZXZlbnQudGFyZ2V0LmNsaWNrKClcbiAgICAvLyB9XG59KVxuIiwiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICBjb25zdCBpdGVtID0gZS50YXJnZXQuY2xvc2VzdCgnLndvcmstZXhhbXBsZS1pbWFnZScpXG4gICAgaWYgKCFpdGVtKSByZXR1cm5cblxuICAgIGl0ZW0uY2xhc3NMaXN0LnRvZ2dsZSgnaXMtYWN0aXZlJylcbn0pXG4iLCIvLyAvLyBub24tdGhlbWVkIGFwcFxuLy8gaW1wb3J0ICdzaXRlL2FwcC9jbGllbnQvamF2YXNjcmlwdC9NeUphdmFzY3JpcHRGaWxlJztcbi8vXG4vL1xuLy8gLy8gdmVuZG9yIG1vZHVsZXNcbi8vIGltcG9ydCAnc2l0ZS92ZW5kb3IvbXl2ZW5kb3IvbXlwYWNrYWdlL2NsaWVudC9qYXZhc2NyaXB0L015SmF2YXNjcmlwdEZpbGUnO1xuLy9cbi8vIC8vIHlvdXIgdGhlbWVkIGFwcCBmaWxlc1xuLy8gaW1wb3J0ICcuL2pzL3BhcnRpYWxzL1NvbWVPdGhlckphdmFzY3JpcHRGaWxlJztcbmltcG9ydCAnLi9qcy9jb29raWUnXG5pbXBvcnQgJy4vanMvYm9keS1jbGFzcydcbmltcG9ydCAnLi9qcy90b2MnXG5pbXBvcnQgJy4vanMvY29sbGFwc2libGUtbWVudSdcbmltcG9ydCAnLi9qcy9zY3JvbGwtbWFuYWdlcidcbmltcG9ydCAnLi9qcy9mb3JtJ1xuaW1wb3J0ICcuL2pzL3dvcmstZXhhbXBsZSdcbmltcG9ydCAnLi9qcy9tb3VzZS1vdmVyLWxvZ28nXG5pbXBvcnQgJy4vanMvaW1hZ2VzJ1xuaW1wb3J0ICcuL2pzL2ltYWdlLWhvdmVyJ1xuaW1wb3J0ICcuL2pzL3ByaW50J1xuaW1wb3J0ICcuL2pzL2JhdHRlcnktc2F2ZXInXG4iXSwibmFtZXMiOlsiZGVib3VuY2UiLCJjYWxsYmFjayIsInRpbWVvdXQiLCJfdGhpcyIsInRpbWVyIiwiZSIsIl90aGF0IiwiX3RoaXMyIiwiY2xlYXJUaW1lb3V0Iiwic2V0VGltZW91dCIsImNhbGwiLCJ1c2VyQWN0aW9uIiwiZnVsbFNjcmVlbkRpdiIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJzdHlsZSIsImRpc3BsYXkiLCJhZGRFdmVudExpc3RlbmVyIiwibXlDb29raWUiLCJib2R5Q2xhc3MiLCJib2R5T2JqZWN0IiwidGhlbWUiLCJpbml0IiwicXVlcnlTZWxlY3RvciIsImFkZE9yVG9nZ2xlQm9keUNsYXNzIiwicmV0cmlldmVDb29raWVPckhhc2giLCJzY3JvbGxTdGFydCIsImFkZEJhc2ljQm9keUNsYXNzTGlzdGVuZXJzIiwiZ2V0Qm9keU9iamVjdCIsImdldFRoZW1lIiwiU3RyaW5nIiwiZ2V0QXR0cmlidXRlIiwic2hvd01lbnVBc0RlZmF1bHQiLCJpc0hvbWVQYWdlIiwiaGFzRnJhZ21lbnQiLCJjbGljayIsImFkZFJvY2tldE1vZGVWaWRlb09ySW1hZ2UiLCJldmVudCIsImNsYXNzTGlzdCIsImFkZCIsImRvY3VtZW50RWxlbWVudCIsInJlbW92ZSIsIndpbmRvdyIsImhhc2giLCJnZXRIYXNoRnJvbVVSTCIsInByZWZlcnJlZFRoZW1lIiwiZXJhc2VDb29raWUiLCJydW5DbGlja0ZvckVsZW1lbnQiLCJnZXRDb29raWUiLCJzZXRBdHRyaWJ1dGUiLCJ1c2VyUHJlZmVyc0RhcmtUaGVtZSIsIm1hdGNoTWVkaWEiLCJtYXRjaGVzIiwidHJpbSIsImxlbmd0aCIsIm9iaiIsImNvbnRhaW5zIiwicmVtb3ZlQm9keUNsYXNzZXNCYXNlZE9uQXR0cmlidXRlIiwib2JqU2VsZWN0b3IiLCJpc1RoZW1lIiwicXVlcnlTZWxlY3RvckFsbCIsImZvckVhY2giLCJvbmVFYWNoT2JqZWN0IiwiYWN0aW9uQm9keUNsYXNzQ2hhbmdlIiwidG9nZ2xlIiwic2Nyb2xsSW50b1ZpZXciLCJiZWhhdmlvciIsImJsb2NrIiwic2Nyb2xsVG8iLCJwcmV2ZW50RGVmYXVsdCIsInRvZ2dsZUNsYXNzIiwiaWQiLCJoYXNBdHRyaWJ1dGUiLCJzZXRDb29raWUiLCJnZXRIYXNoRnJvbVN0cmluZyIsInJlcGxhY2UiLCJsb2NhdGlvbiIsIm9iamVjdCIsInN0cmluZyIsImNsYXNzZXMiLCJnZXRDbGFzc2VzRnJvbUxpc3QiLCJpIiwibGVuIiwidmFsdWUiLCJhcnJheSIsInNwbGl0IiwibmV3QXJyYXkiLCJwdXNoIiwicmVtb3ZlSGFzaEZyb21TdHJpbmciLCJoYXNSb2NrZXRTaG93IiwiX2JvZHlDbGFzcyRib2R5T2JqZWN0IiwiX2JvZHlDbGFzcyRib2R5T2JqZWN0MiIsInZpZGVvSWQiLCJpc0xhbmRzY2FwZSIsImltYWdlVVJMIiwiaW1hZ2VYIiwiaW1hZ2VZIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsInNoYWRvdyIsInNoYWRvd0NvbG91ciIsInZpZGVvVXJsIiwiaW5uZXJIVE1MIiwidGVtcCIsImZpcnN0Q2hpbGQiLCJpbnNlcnRCZWZvcmUiLCJ2aWRlbyIsImJvZHkiLCJiYWNrZ3JvdW5kSW1hZ2UiLCJiYWNrZ3JvdW5kUG9zaXRpb24iLCJpbWciLCJJbWFnZSIsIm9ubG9hZCIsIm9uZXJyb3IiLCJzcmMiLCJwYXRobmFtZSIsIkNvbGxhcHNpYmxlTGlzdHMiLCJhcHBseSIsImxpc3QiLCJhcHBseVRvIiwidXBkYXRlSGFzT3BlbiIsImxpIiwiY2hpbGRVbCIsInNwYW4iLCJjbGFzc05hbWUiLCJvcGVuIiwiY2xvc2UiLCJkaXJlY3RVbCIsIm5lc3RlZFVsIiwibmVzdGVkTGkiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50TGlzdCIsInNpYmxpbmciLCJtYXJrU2libGluZ1N0YXRlIiwiY2xvc2VzdCIsInNpYmxpbmdzIiwiaXNPcGVuIiwic2liIiwiaGFzIiwibmFtZSIsImRheXMiLCJleHBpcmVzIiwiZGF0ZSIsIkRhdGUiLCJzZXRUaW1lIiwiZ2V0VGltZSIsInRvVVRDU3RyaW5nIiwiY29va2llIiwibmFtZUVRIiwiY2EiLCJjIiwiY2hhckF0Iiwic3Vic3RyaW5nIiwiaW5kZXhPZiIsImZvcm1maWVsZHMiLCJKIiwiYWRqdXN0U3R5bGluZyIsImV2dCIsImNyZWF0ZUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsInpFdmVudCIsImlucFZhbCIsInRhcmdldCIsImltYWdlaG92ZXIiLCJyZXNldFRpbWVvdXQiLCJlbCIsImlzVG91Y2hEZXZpY2UiLCJfZSR0YXJnZXQkZ2V0Qm91bmRpbmciLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsImhlaWdodCIsImxlZnQiLCJ0b3AiLCJ4IiwicGFnZVgiLCJzY3JvbGxYIiwieSIsInBhZ2VZIiwic2Nyb2xsWSIsInNldFByb3BlcnR5IiwicmVtb3ZlUHJvcGVydHkiLCJpc1RvdWNoRGV2aWNlVmFyIiwibmF2aWdhdG9yIiwibWF4VG91Y2hQb2ludHMiLCJtc01heFRvdWNoUG9pbnRzIiwiaW1hZ2VXcmFwcGVyIiwid3JhcCIsIndyYXBwZXIiLCJwYXJlbnROb2RlIiwiYXBwZW5kQ2hpbGQiLCJpbWFnZXMiLCJkdiIsInNob3dSb2NrZXRNb2RlIiwidG9nZ2xlQ2xhc3NPbkhvdmVyIiwidHlwZSIsImxvZ28iLCJzY3JvbGxNYW5hZ2VyIiwic2NyZWVuSGVpZ2h0IiwiaW5uZXJIZWlnaHQiLCJsYXN0U2Nyb2xsIiwicXVvdGUiLCJmb290ZXIiLCJoZWFkZXJSYW5nZSIsImZvb3RlclJhbmdlIiwiaGVhZGVyUGN0IiwiZm9vdGVyUGN0IiwianVzdFNjcm9sbGVkRHVyYXRpb24iLCJqdXN0U2Nyb2xsZWRUaW1lciIsInNjcm9sbFN0b3BUaW1lciIsInNjcm9sbFN0b3BEZWxheSIsInJlbWVhc3VyZSIsImJpbmRTY3JvbGwiLCJyZXF1ZXN0QW5pbWF0aW9uRnJhbWUiLCJvblNjcm9sbCIsImdldFNjcm9sbCIsInNjcm9sbFRvcCIsInRpY2tpbmciLCJzY3JvbGwiLCJtYXhTY3JvbGwiLCJzY3JvbGxIZWlnaHQiLCJ1cGRhdGVIZWFkZXJDbGFzc2VzIiwidXBkYXRlRm9vdGVyQ2xhc3NlcyIsInVwZGF0ZVJvY2tldFRoZW1lIiwidXBkYXRlU2Nyb2xsRGlyZWN0aW9uIiwiaGFuZGxlSnVzdFNjcm9sbGVkIiwiY3VycmVudFNjcm9sbCIsImhlYWRlclBpeGVscyIsInJhdGlvIiwiY2xhbXAiLCJwY3QiLCJNYXRoIiwicm91bmQiLCJyZXBsYWNlU3RlcENsYXNzZXMiLCJib3R0b21EaXN0YW5jZSIsInJlbW92ZVN0ZXBDbGFzc2VzIiwiZm9vdGVyUGl4ZWxzIiwicHJlZml4IiwiY29uY2F0Iiwicm91bmRlZCIsImhhc1JvY2tldCIsImluSGVhZGVyWm9uZSIsImluRm9vdGVyWm9uZSIsIl90aGlzMyIsInYiLCJtaW4iLCJtYXgiLCJ0b2MiLCJoZWFkaW5ncyIsImNvdW50IiwicHJldmlvdXNFbGVtIiwicHJldmlvdXNFbGVtZW50U2libGluZyIsInNwYW5FbmQiLCJpdGVtIl0sInNvdXJjZVJvb3QiOiIifQ==