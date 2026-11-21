(self["webpackChunkpublic"] = self["webpackChunkpublic"] || []).push([["app"],{

/***/ "../../vendor/sunnysideup/slideshowblock/client/src/js/SlideShowBlock.js":
/*!*******************************************************************************!*\
  !*** ../../vendor/sunnysideup/slideshowblock/client/src/js/SlideShowBlock.js ***!
  \*******************************************************************************/
/***/ (function() {

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(e, a) { _checkPrivateRedeclaration(e, a), a.add(e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
/**
 * Slide show block
 *
 * Under 48rem: slides stack and this script does nothing.
 * From 48rem: a scroll-snap deck with dots, previous/next buttons, arrow keys,
 * a progress bar, a counter and a fade-in for the active slide.
 *
 * Slide types can hook in through two events, fired on the slide <li>:
 *   slideshow:activate    a slide became the visible one
 *   slideshow:deactivate  it stopped being the visible one
 * Both bubble, so one listener on document is enough:
 *   document.addEventListener('slideshow:activate', (e) => { … e.target … });
 */
(function () {
  // Set to false to keep every slide stacked at all widths (no deck).
  // Keep in sync with $deck-enabled in scss/_settings.scss.
  var DECK_ENABLED = false;
  var DECK_QUERY = window.matchMedia(DECK_ENABLED ? '(min-width: 48rem)' : 'not all');
  var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');
  var _root = /*#__PURE__*/new WeakMap();
  var _track = /*#__PURE__*/new WeakMap();
  var _slides = /*#__PURE__*/new WeakMap();
  var _dots = /*#__PURE__*/new WeakMap();
  var _prev = /*#__PURE__*/new WeakMap();
  var _next = /*#__PURE__*/new WeakMap();
  var _counter = /*#__PURE__*/new WeakMap();
  var _progress = /*#__PURE__*/new WeakMap();
  var _observer = /*#__PURE__*/new WeakMap();
  var _index = /*#__PURE__*/new WeakMap();
  var _on = /*#__PURE__*/new WeakMap();
  var _SlideShowBlock_brand = /*#__PURE__*/new WeakSet();
  var SlideShowBlock = /*#__PURE__*/function () {
    "use strict";

    function SlideShowBlock(root) {
      var _classPrivateFieldGet2,
        _this = this,
        _classPrivateFieldGet3;
      _classCallCheck(this, SlideShowBlock);
      /**
       * Scroll-reveal for the bar graphs (pricing sliders, timeline bars).
       * Once the graph has scrolled into view its slide gets `.is-revealed`,
       * and the CSS moves the bars from 0 to their value. Nothing is hidden
       * until `.is-reveal-ready` is set, so without JS (or with reduced
       * motion) the bars simply show their final value.
       */
      _classPrivateMethodInitSpec(this, _SlideShowBlock_brand);
      _classPrivateFieldInitSpec(this, _root, void 0);
      _classPrivateFieldInitSpec(this, _track, void 0);
      _classPrivateFieldInitSpec(this, _slides, void 0);
      _classPrivateFieldInitSpec(this, _dots, []);
      _classPrivateFieldInitSpec(this, _prev, void 0);
      _classPrivateFieldInitSpec(this, _next, void 0);
      _classPrivateFieldInitSpec(this, _counter, void 0);
      _classPrivateFieldInitSpec(this, _progress, void 0);
      _classPrivateFieldInitSpec(this, _observer, void 0);
      _classPrivateFieldInitSpec(this, _index, 0);
      _classPrivateFieldInitSpec(this, _on, false);
      _classPrivateFieldSet(_root, this, root);
      _classPrivateFieldSet(_track, this, root.querySelector('[data-track]'));
      _classPrivateFieldSet(_slides, this, _classPrivateFieldGet(_track, this) ? _toConsumableArray(_classPrivateFieldGet(_track, this).children) : []);
      _classPrivateFieldSet(_prev, this, root.querySelector('[data-prev]'));
      _classPrivateFieldSet(_next, this, root.querySelector('[data-next]'));
      _classPrivateFieldSet(_counter, this, root.querySelector('[data-counter]'));
      _classPrivateFieldSet(_progress, this, root.querySelector('[data-progress]'));
      _assertClassBrand(_SlideShowBlock_brand, this, _initReveal).call(this);
      if (_classPrivateFieldGet(_slides, this).length < 2) {
        return;
      }
      _assertClassBrand(_SlideShowBlock_brand, this, _buildDots).call(this, root.querySelector('[data-dots]'));
      (_classPrivateFieldGet2 = _classPrivateFieldGet(_prev, this)) === null || _classPrivateFieldGet2 === void 0 || _classPrivateFieldGet2.addEventListener('click', function () {
        return _this.go(_classPrivateFieldGet(_index, _this) - 1);
      });
      (_classPrivateFieldGet3 = _classPrivateFieldGet(_next, this)) === null || _classPrivateFieldGet3 === void 0 || _classPrivateFieldGet3.addEventListener('click', function () {
        return _this.go(_classPrivateFieldGet(_index, _this) + 1);
      });
      _classPrivateFieldGet(_track, this).addEventListener('keydown', function (event) {
        return _assertClassBrand(_SlideShowBlock_brand, _this, _onKey).call(_this, event);
      });
      _classPrivateFieldSet(_observer, this, new IntersectionObserver(function (entries) {
        var _iterator = _createForOfIteratorHelper(entries),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;
            if (_classPrivateFieldGet(_on, _this) && entry.isIntersecting) {
              _assertClassBrand(_SlideShowBlock_brand, _this, _update).call(_this, _classPrivateFieldGet(_slides, _this).indexOf(entry.target));
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }, {
        root: _classPrivateFieldGet(_track, this),
        threshold: 0.6
      }));
      var sync = function sync() {
        return DECK_QUERY.matches ? _assertClassBrand(_SlideShowBlock_brand, _this, _enable).call(_this) : _assertClassBrand(_SlideShowBlock_brand, _this, _disable).call(_this);
      };
      DECK_QUERY.addEventListener('change', sync);
      sync();
    }
    return _createClass(SlideShowBlock, [{
      key: "go",
      value: function go(index) {
        var target = Math.max(0, Math.min(index, _classPrivateFieldGet(_slides, this).length - 1));
        _classPrivateFieldGet(_track, this).scrollTo({
          left: _classPrivateFieldGet(_slides, this)[target].offsetLeft,
          behavior: REDUCED_MOTION.matches ? 'instant' : 'smooth'
        });
      }
    }]);
  }();
  function _initReveal() {
    if (REDUCED_MOTION.matches || !('IntersectionObserver' in window)) {
      return;
    }
    var graphs = _classPrivateFieldGet(_root, this).querySelectorAll('.slideshow-pricing__factors, .slideshow-timeline');
    if (!graphs.length) {
      return;
    }
    var observer = new IntersectionObserver(function (entries) {
      var _iterator2 = _createForOfIteratorHelper(entries),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var entry = _step2.value;
          if (entry.isIntersecting) {
            var _entry$target$closest;
            observer.unobserve(entry.target);
            (_entry$target$closest = entry.target.closest('.slideshow-slide')) === null || _entry$target$closest === void 0 || _entry$target$closest.classList.add('is-revealed');
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    }, {
      threshold: 0.3
    });
    _classPrivateFieldGet(_root, this).classList.add('is-reveal-ready');
    graphs.forEach(function (graph) {
      return observer.observe(graph);
    });
  }
  function _enable() {
    var _this2 = this;
    if (_classPrivateFieldGet(_on, this)) {
      return;
    }
    _classPrivateFieldSet(_on, this, true);
    _classPrivateFieldGet(_root, this).classList.add('is-enhanced');
    _classPrivateFieldGet(_root, this).setAttribute('aria-roledescription', 'carousel');
    _classPrivateFieldGet(_track, this).tabIndex = 0;
    _classPrivateFieldGet(_track, this).setAttribute('aria-label', 'Slides: use the arrow keys to move between them');
    _classPrivateFieldGet(_slides, this).forEach(function (slide, n) {
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', "".concat(n + 1, " of ").concat(_classPrivateFieldGet(_slides, _this2).length));
      _classPrivateFieldGet(_observer, _this2).observe(slide);
    });
    _classPrivateFieldGet(_track, this).scrollTo({
      left: _classPrivateFieldGet(_slides, this)[_classPrivateFieldGet(_index, this)].offsetLeft,
      behavior: 'instant'
    });
    _assertClassBrand(_SlideShowBlock_brand, this, _update).call(this, _classPrivateFieldGet(_index, this), true);
  }
  function _disable() {
    _classPrivateFieldSet(_on, this, false);
    _classPrivateFieldGet(_observer, this).disconnect();
    _classPrivateFieldGet(_root, this).classList.remove('is-enhanced');
    _classPrivateFieldGet(_root, this).removeAttribute('aria-roledescription');
    _classPrivateFieldGet(_track, this).removeAttribute('tabindex');
    _classPrivateFieldGet(_track, this).removeAttribute('aria-label');
    _classPrivateFieldGet(_slides, this).forEach(function (slide) {
      slide.inert = false;
      slide.classList.remove('is-active');
      slide.removeAttribute('aria-roledescription');
      slide.removeAttribute('aria-label');
    });
  }
  function _buildDots(list) {
    var _this3 = this;
    if (!list) {
      return;
    }
    _classPrivateFieldGet(_slides, this).forEach(function (_, i) {
      var item = document.createElement('li');
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'slideshow__dot';
      button.setAttribute('aria-label', "Go to slide ".concat(i + 1));
      button.addEventListener('click', function () {
        return _this3.go(i);
      });
      item.append(button);
      list.append(item);
      _classPrivateFieldGet(_dots, _this3).push(button);
    });
  }
  function _onKey(event) {
    if (!_classPrivateFieldGet(_on, this) || event.target !== _classPrivateFieldGet(_track, this)) {
      return;
    }
    var step = {
      ArrowRight: 1,
      ArrowDown: 1,
      PageDown: 1,
      ArrowLeft: -1,
      ArrowUp: -1,
      PageUp: -1
    }[event.key];
    if (step) {
      event.preventDefault();
      this.go(_classPrivateFieldGet(_index, this) + step);
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.go(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      this.go(_classPrivateFieldGet(_slides, this).length - 1);
    }
  }
  function _update(index) {
    var force = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    if (index < 0 || index === _classPrivateFieldGet(_index, this) && !force) {
      return;
    }
    var previous = _classPrivateFieldGet(_slides, this)[_classPrivateFieldGet(_index, this)];
    _classPrivateFieldSet(_index, this, index);
    var total = _classPrivateFieldGet(_slides, this).length;
    _classPrivateFieldGet(_slides, this).forEach(function (slide, n) {
      slide.classList.toggle('is-active', n === index);
      slide.inert = n !== index;
    });
    _classPrivateFieldGet(_dots, this).forEach(function (dot, n) {
      return dot.setAttribute('aria-current', String(n === index));
    });
    if (_classPrivateFieldGet(_prev, this)) _classPrivateFieldGet(_prev, this).disabled = index === 0;
    if (_classPrivateFieldGet(_next, this)) _classPrivateFieldGet(_next, this).disabled = index === total - 1;
    if (_classPrivateFieldGet(_counter, this)) _classPrivateFieldGet(_counter, this).textContent = "Slide ".concat(index + 1, " of ").concat(total);
    if (_classPrivateFieldGet(_progress, this)) _classPrivateFieldGet(_progress, this).style.width = "".concat((index + 1) / total * 100, "%");
    if (previous && previous !== _classPrivateFieldGet(_slides, this)[index]) {
      previous.dispatchEvent(new CustomEvent('slideshow:deactivate', {
        bubbles: true
      }));
    }
    _classPrivateFieldGet(_slides, this)[index].dispatchEvent(new CustomEvent('slideshow:activate', {
      bubbles: true,
      detail: {
        index: index
      }
    }));
  }
  var init = function init() {
    document.querySelectorAll('[data-slideshow]').forEach(function (element) {
      if (!element.slideShowBlock) {
        element.slideShowBlock = new SlideShowBlock(element);
      }
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/***/ }),

/***/ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideCards.js":
/*!************************************************************************************************!*\
  !*** ../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideCards.js ***!
  \************************************************************************************************/
/***/ (function() {

/**
 * Cards slide: no behaviour needed yet, the animations are pure CSS.
 *
 * To use this file, set `private static $has_js = true;` on
 * SlideShowBlockSlideCards, then add code here. For example:
 *
 *   document.addEventListener('slideshow:activate', (event) => {
 *       if (!event.target.matches('.slideshow-slide--cards')) return;
 *       // the cards slide is now the visible one
 *   });
 */

/***/ }),

/***/ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideFlow.js":
/*!***********************************************************************************************!*\
  !*** ../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideFlow.js ***!
  \***********************************************************************************************/
/***/ (function() {

/**
 * Flow slide: no behaviour needed yet, the animations are pure CSS.
 *
 * To use this file, set `private static $has_js = true;` on
 * SlideShowBlockSlideFlow, then add code here. For example:
 *
 *   document.addEventListener('slideshow:activate', (event) => {
 *       if (!event.target.matches('.slideshow-slide--flow')) return;
 *       // the flow slide is now the visible one
 *   });
 */

/***/ }),

/***/ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlidePricing.js":
/*!**************************************************************************************************!*\
  !*** ../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlidePricing.js ***!
  \**************************************************************************************************/
/***/ (function() {

/**
 * Pricing slide: no behaviour needed yet, the animations are pure CSS.
 *
 * To use this file, set `private static $has_js = true;` on
 * SlideShowBlockSlidePricing, then add code here. For example:
 *
 *   document.addEventListener('slideshow:activate', (event) => {
 *       if (!event.target.matches('.slideshow-slide--pricing')) return;
 *       // the pricing slide is now the visible one
 *   });
 */

/***/ }),

/***/ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideProof.js":
/*!************************************************************************************************!*\
  !*** ../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideProof.js ***!
  \************************************************************************************************/
/***/ (function() {

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t.return || t.return(); } finally { if (u) throw o; } } }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * Proof slide: counts the big number up (e.g. 0 → 20+) the first time it
 * comes into view. Works in both the stacked and the deck layout.
 * Loaded because SlideShowBlockSlideProof::$has_js = true.
 */
(function () {
  var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)');
  var countUp = function countUp(element) {
    var text = element.textContent.trim();
    var match = text.match(/^(\D*)(\d+)([^]*)$/);
    if (!match || REDUCED_MOTION.matches) {
      return;
    }
    var _match = _slicedToArray(match, 4),
      before = _match[1],
      digits = _match[2],
      after = _match[3];
    var target = Number.parseInt(digits, 10);
    var duration = 1200;
    var start = performance.now();
    var _frame = function frame(now) {
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 3);
      element.textContent = "".concat(before).concat(Math.round(target * eased)).concat(after);
      if (t < 1) {
        requestAnimationFrame(_frame);
      }
    };
    element.textContent = "".concat(before, "0").concat(after);
    requestAnimationFrame(_frame);
  };
  var init = function init() {
    var observer = new IntersectionObserver(function (entries) {
      var _iterator = _createForOfIteratorHelper(entries),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var entry = _step.value;
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            countUp(entry.target);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }, {
      threshold: 0.6
    });
    document.querySelectorAll('.slideshow-slide--proof [data-count-up]').forEach(function (element) {
      // This script can be loaded twice (module bundle + theme bundle).
      // A second run would read the "0+" the first one just wrote and
      // count to 0, so only ever bind an element once.
      if (element.dataset.countUpBound) {
        return;
      }
      element.dataset.countUpBound = '1';
      observer.observe(element);
    });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

/***/ }),

/***/ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideSteps.js":
/*!************************************************************************************************!*\
  !*** ../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideSteps.js ***!
  \************************************************************************************************/
/***/ (function() {

/**
 * Steps slide: no behaviour needed yet, the animations are pure CSS.
 *
 * To use this file, set `private static $has_js = true;` on
 * SlideShowBlockSlideSteps, then add code here. For example:
 *
 *   document.addEventListener('slideshow:activate', (event) => {
 *       if (!event.target.matches('.slideshow-slide--steps')) return;
 *       // the steps slide is now the visible one
 *   });
 */

/***/ }),

/***/ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideTimeline.js":
/*!***************************************************************************************************!*\
  !*** ../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideTimeline.js ***!
  \***************************************************************************************************/
/***/ (function() {

/**
 * Timeline slide: no behaviour needed yet, the animations are pure CSS.
 *
 * To use this file, set `private static $has_js = true;` on
 * SlideShowBlockSlideTimeline, then add code here. For example:
 *
 *   document.addEventListener('slideshow:activate', (event) => {
 *       if (!event.target.matches('.slideshow-slide--timeline')) return;
 *       // the timeline slide is now the visible one
 *   });
 */

/***/ }),

/***/ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideTitle.js":
/*!************************************************************************************************!*\
  !*** ../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideTitle.js ***!
  \************************************************************************************************/
/***/ (function() {

/**
 * Title slide: no behaviour needed yet, the animations are pure CSS.
 *
 * To use this file, set `private static $has_js = true;` on
 * SlideShowBlockSlideTitle, then add code here. For example:
 *
 *   document.addEventListener('slideshow:activate', (event) => {
 *       if (!event.target.matches('.slideshow-slide--title')) return;
 *       // the title slide is now the visible one
 *   });
 */

/***/ }),

/***/ "../../vendor/sunnysideup/slideshowblock/client/src/main.js":
/*!******************************************************************!*\
  !*** ../../vendor/sunnysideup/slideshowblock/client/src/main.js ***!
  \******************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_SlideShowBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/SlideShowBlock */ "../../vendor/sunnysideup/slideshowblock/client/src/js/SlideShowBlock.js");
/* harmony import */ var _js_SlideShowBlock__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_js_SlideShowBlock__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _js_slides_SlideShowBlockSlideCards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/slides/SlideShowBlockSlideCards */ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideCards.js");
/* harmony import */ var _js_slides_SlideShowBlockSlideCards__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_js_slides_SlideShowBlockSlideCards__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _js_slides_SlideShowBlockSlideFlow__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/slides/SlideShowBlockSlideFlow */ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideFlow.js");
/* harmony import */ var _js_slides_SlideShowBlockSlideFlow__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_slides_SlideShowBlockSlideFlow__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _js_slides_SlideShowBlockSlidePricing__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/slides/SlideShowBlockSlidePricing */ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlidePricing.js");
/* harmony import */ var _js_slides_SlideShowBlockSlidePricing__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_slides_SlideShowBlockSlidePricing__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _js_slides_SlideShowBlockSlideProof__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/slides/SlideShowBlockSlideProof */ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideProof.js");
/* harmony import */ var _js_slides_SlideShowBlockSlideProof__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_slides_SlideShowBlockSlideProof__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _js_slides_SlideShowBlockSlideSteps__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/slides/SlideShowBlockSlideSteps */ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideSteps.js");
/* harmony import */ var _js_slides_SlideShowBlockSlideSteps__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_slides_SlideShowBlockSlideSteps__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _js_slides_SlideShowBlockSlideTimeline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/slides/SlideShowBlockSlideTimeline */ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideTimeline.js");
/* harmony import */ var _js_slides_SlideShowBlockSlideTimeline__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_slides_SlideShowBlockSlideTimeline__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _js_slides_SlideShowBlockSlideTitle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/slides/SlideShowBlockSlideTitle */ "../../vendor/sunnysideup/slideshowblock/client/src/js/slides/SlideShowBlockSlideTitle.js");
/* harmony import */ var _js_slides_SlideShowBlockSlideTitle__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_js_slides_SlideShowBlockSlideTitle__WEBPACK_IMPORTED_MODULE_7__);
// JQUERY - GOD FORBID! - but if you must, here's how to do it in a theme:
// # if you use jQuery ...
// import $ from 'jquery';
// window.jQuery = $;
// window.$ = jQuery;

// EXAMPLE USES:

// // non-themed app
// import 'PROJECT_ROOT_DIR/app/client/javascript/MyJavascriptFile';

// // vendor modules
// import 'PROJECT_ROOT_DIR/vendor/myvendor/mypackage/client/javascript/MyJavascriptFile';

// // your themed app files
// import "./js/partials/SomeOtherJavascriptFile";









/***/ }),

/***/ "../sun/src/js/background.js":
/*!***********************************!*\
  !*** ../sun/src/js/background.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../sun/src/js/dom.js");
// Hero background (image or Vimeo video) behind the rocket-mode page.

var overlay = function overlay(name) {
  return "linear-gradient(var(".concat(name, ", transparent), var(").concat(name, ", transparent))");
};
var SHADOWS = {
  dark: 'linear-gradient(210deg, #00000077 12%, transparent 88%)',
  light: 'linear-gradient(210deg, #FFFFFF77 12%, transparent 88%)',
  fullblue: overlay('--overlay-color-blue'),
  fullyellow: overlay('--overlay-color-yellow'),
  fullgreen: overlay('--overlay-color-green'),
  fullpurple: overlay('--overlay-color-purple')
};
var markLoaded = function markLoaded() {
  return _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.add('has-bg-image-loaded');
};
function videoBackground(videoId, shadow) {
  var src = "https://player.vimeo.com/video/".concat(videoId, "?autoplay=1&autopause=0&muted=1&background=1");
  var iframe = document.createElement('iframe');
  iframe.src = src;
  iframe.allow = 'autoplay; fullscreen';
  iframe.allowFullscreen = true;
  iframe.setAttribute('frameborder', '0');
  if (shadow) iframe.style.background = shadow;
  markLoaded();
  return iframe;
}
function init() {
  if (!(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.hasRocketShow)()) return;
  var _body$dataset = _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.dataset,
    videoId = _body$dataset.videoId,
    bgImage = _body$dataset.bgImage,
    _body$dataset$bgImage = _body$dataset.bgImageX,
    bgImageX = _body$dataset$bgImage === void 0 ? '50%' : _body$dataset$bgImage,
    _body$dataset$bgImage2 = _body$dataset.bgImageY,
    bgImageY = _body$dataset$bgImage2 === void 0 ? '50%' : _body$dataset$bgImage2,
    shadowOverLogo = _body$dataset.shadowOverLogo;
  if (!videoId && !bgImage) return;
  var shadow = SHADOWS[shadowOverLogo] || '';
  var wrapper = document.createElement('div');
  wrapper.id = 'BackgroundImage';
  wrapper.classList.add('fade-on-no-rocket');
  if (videoId && window.matchMedia('(orientation: landscape)').matches) {
    wrapper.appendChild(videoBackground(videoId, shadow));
  } else if (bgImage) {
    wrapper.style.backgroundImage = shadow ? "".concat(shadow, ", url(").concat(bgImage, ")") : "url(".concat(bgImage, ")");
    wrapper.style.backgroundPosition = "".concat(bgImageX, " ").concat(bgImageY);
    var img = new Image();
    img.onload = img.onerror = markLoaded; // fail open
    img.src = bgImage;
  }
  _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.prepend(wrapper);
}
init();

/***/ }),

/***/ "../sun/src/js/battery-saver.js":
/*!**************************************!*\
  !*** ../sun/src/js/battery-saver.js ***!
  \**************************************/
/***/ (function() {

// After 60 seconds without any interaction, show the "battery saving" screen.
var overlay = document.getElementById('battery-saver-div');
var IDLE_AFTER = 60000;
if (overlay) {
  var timer = 0;
  var arm = function arm() {
    window.clearTimeout(timer);
    timer = window.setTimeout(function () {
      overlay.style.display = 'flex';
    }, IDLE_AFTER);
  };
  overlay.addEventListener('click', function () {
    overlay.style.display = 'none';
  });
  ['pointerdown', 'keydown', 'scroll'].forEach(function (type) {
    return window.addEventListener(type, arm, {
      passive: true
    });
  });
  arm();
}

/***/ }),

/***/ "../sun/src/js/body-state.js":
/*!***********************************!*\
  !*** ../sun/src/js/body-state.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../sun/src/js/dom.js");
// Basic state classes on <body>: loaded / touch / splash finished.

_dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.remove('body-unloaded');
(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.onReady)(function () {
  _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.add('body-loaded');
  _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.add(window.matchMedia('(hover: none)').matches ? 'touch' : 'no-touch');
  window.setTimeout(function () {
    return _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.add('splash-completed');
  }, 2000);
});

/***/ }),

/***/ "../sun/src/js/carousel.js":
/*!*********************************!*\
  !*** ../sun/src/js/carousel.js ***!
  \*********************************/
/***/ (function() {

// Work example screenshots: window frame, swipeable carousel with arrows,
// and a "Shown" caption in the info panel that follows the current slide.
// Touch / trackpad swiping is native (CSS scroll-snap); arrows + mouse drag added here.

function setup(track) {
  var block = track.closest('.sunnysideup__app__elements__workexample');
  var panel = block && block.querySelector('.work-example-cards');
  var slides = Array.from(track.querySelectorAll('img'));
  if (!slides.length) return;
  var wrap = document.createElement('div');
  wrap.className = 'carousel-wrap';
  track.parentNode.insertBefore(wrap, track);
  wrap.appendChild(track);
  var buttons = document.createElement('div');
  buttons.className = 'window-buttons';
  buttons.setAttribute('aria-hidden', 'true');
  buttons.innerHTML = '<span class="minimise"></span><span class="maximise"></span><span class="close"></span>';
  wrap.appendChild(buttons);

  // captions: the <p class="caption"> following each image (or its link)
  var captionFor = function captionFor(img) {
    // images.js wraps every img in .image-container, so climb to the direct child of the track
    var holder = img;
    while (holder.parentElement && holder.parentElement !== track) holder = holder.parentElement;
    var p = holder.nextElementSibling;
    return p && p.classList.contains('caption') ? p.textContent.replace('👆', '').trim() : '';
  };
  var captions = slides.map(captionFor);
  var captionText = null;
  var captionCard = null;
  if (panel && captions.some(Boolean)) {
    var card = document.createElement('div');
    card.className = 'card card--shown';
    card.innerHTML = '<h4>Shown</h4><p></p>';
    panel.appendChild(card);
    captionText = card.querySelector('p');
    captionCard = card;
    captionText.textContent = captions[0] || ''; // no flash on first load
  }
  var slideWidth = function slideWidth() {
    return track.clientWidth + parseFloat(getComputedStyle(track).columnGap || 0);
  };
  var current = function current() {
    return Math.min(slides.length - 1, Math.max(0, Math.round(track.scrollLeft / slideWidth())));
  };

  // briefly highlight the "Shown" label when the slide changes
  var flashTimer = 0;
  var flash = function flash() {
    if (!captionCard) return;
    captionCard.classList.add('is-changing');
    window.clearTimeout(flashTimer);
    flashTimer = window.setTimeout(function () {
      return captionCard.classList.remove('is-changing');
    }, 900);
  };
  var prev, next;
  var update = function update() {
    if (prev) {
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    }
    if (captionText) {
      var text = captions[current()] || '';
      if (text !== captionText.textContent) {
        captionText.textContent = text;
        flash();
      }
    }
  };
  if (slides.length > 1) {
    var make = function make(cls, label, char) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = "carousel-arrow ".concat(cls);
      b.setAttribute('aria-label', label);
      b.textContent = char;
      wrap.appendChild(b);
      return b;
    };
    prev = make('prev', 'Previous image', '‹');
    next = make('next', 'Next image', '›');
    var go = function go(dir) {
      return track.scrollBy({
        left: dir * slideWidth(),
        behavior: 'smooth'
      });
    };
    prev.addEventListener('click', function () {
      return go(-1);
    });
    next.addEventListener('click', function () {
      return go(1);
    });

    // mouse drag
    var startX = 0;
    var startLeft = 0;
    var dragging = false;
    track.addEventListener('pointerdown', function (e) {
      if (e.pointerType !== 'mouse') return;
      dragging = true;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      track.classList.add('is-dragging');
      track.setPointerCapture(e.pointerId);
    });
    track.addEventListener('pointermove', function (e) {
      if (dragging) track.scrollLeft = startLeft - (e.clientX - startX);
    });
    var end = function end() {
      if (!dragging) return;
      dragging = false;
      track.classList.remove('is-dragging');
      track.scrollTo({
        left: current() * slideWidth(),
        behavior: 'smooth'
      });
    };
    track.addEventListener('pointerup', end);
    track.addEventListener('pointercancel', end);
  }
  track.addEventListener('scroll', function () {
    return window.requestAnimationFrame(update);
  }, {
    passive: true
  });
  window.addEventListener('resize', update);
  update();
}
document.querySelectorAll('.sunnysideup__app__elements__workexample .work-example-images').forEach(setup);

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

/***/ "../sun/src/js/dom.js":
/*!****************************!*\
  !*** ../sun/src/js/dom.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   body: function() { return /* binding */ body; },
/* harmony export */   hasRocketShow: function() { return /* binding */ hasRocketShow; },
/* harmony export */   onIdle: function() { return /* binding */ onIdle; },
/* harmony export */   onReady: function() { return /* binding */ onReady; },
/* harmony export */   root: function() { return /* binding */ root; }
/* harmony export */ });
// tiny shared helpers - keep this file dependency free
var body = document.body;
var root = document.documentElement;
var onReady = function onReady(fn) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn, {
      once: true
    });
  } else {
    fn();
  }
};

// run non-essential work when the browser has nothing better to do
var onIdle = function onIdle(fn) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(fn, {
      timeout: 2000
    });
  } else {
    window.setTimeout(fn, 200);
  }
};
var hasRocketShow = function hasRocketShow() {
  return !body.classList.contains('no-rocket-show');
};

/***/ }),

/***/ "../sun/src/js/form.js":
/*!*****************************!*\
  !*** ../sun/src/js/form.js ***!
  \*****************************/
/***/ (function() {

// Marks empty form fields with .no-value (used for floating label styling).
var FIELDS = 'input, select, textarea';
var mark = function mark(field) {
  return field.classList.toggle('no-value', !field.value.trim());
}

// one delegated listener instead of five per field
;
['input', 'change', 'focusin', 'focusout'].forEach(function (type) {
  document.addEventListener(type, function (event) {
    var _event$target$matches, _event$target;
    if ((_event$target$matches = (_event$target = event.target).matches) !== null && _event$target$matches !== void 0 && _event$target$matches.call(_event$target, FIELDS)) mark(event.target);
  });
});
document.querySelectorAll(FIELDS).forEach(mark);

/***/ }),

/***/ "../sun/src/js/hash-scroll.js":
/*!************************************!*\
  !*** ../sun/src/js/hash-scroll.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../sun/src/js/dom.js");
// Make sure a #hash in the URL ends up in the right place once the page
// (images, fonts) has settled. Offsets are handled in CSS (scroll-margin-top).

var RESERVED = ['reset', 'top', 'toc', 'no-menu'];
(0,_dom_js__WEBPACK_IMPORTED_MODULE_0__.onReady)(function () {
  window.addEventListener('load', function () {
    var id = decodeURIComponent(window.location.hash.slice(1));
    if (!id || RESERVED.includes(id)) return;
    var target = document.getElementById(id);
    if (target && !target.classList.contains('theme-selector')) {
      target.scrollIntoView();
    }
  }, {
    once: true
  });
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

/***/ "../sun/src/js/menu-toggle.js":
/*!************************************!*\
  !*** ../sun/src/js/menu-toggle.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "../sun/src/js/dom.js");
// Opens / closes the main menu.

var toggle = document.getElementById('menu-toggle');
if (toggle) {
  var className = toggle.dataset.addClass || 'menu-on';
  toggle.addEventListener('click', function () {
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.toggle(className);
    // the logo reappears after the menu has finished closing
    window.setTimeout(function () {
      return _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.toggle('show-logo');
    }, 400);
  });
}

/***/ }),

/***/ "../sun/src/js/print.js":
/*!******************************!*\
  !*** ../sun/src/js/print.js ***!
  \******************************/
/***/ (function() {

// make sure the content (not the hero) is what gets printed
window.addEventListener('beforeprint', function () {
  var _document$getElementB;
  (_document$getElementB = document.getElementById('content-below-quote')) === null || _document$getElementB === void 0 || _document$getElementB.scrollIntoView();
});

/***/ }),

/***/ "../sun/src/js/scroll/direction.js":
/*!*****************************************!*\
  !*** ../sun/src/js/scroll/direction.js ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom.js */ "../sun/src/js/dom.js");
// Scroll direction + "just scrolled" state, only used by the small-screen menu.
//
//   body.scrolled-up / body.scrolled-down   changes only when direction flips
//   body.just-scrolled                      shortly after scrolling has stopped
//
// The listener is passive, runs once per frame at most, and is only attached
// on small screens (>= 1050px has a fixed side menu and does not need it).

var SMALL_SCREEN = window.matchMedia('(max-width: 1049px)');
var MIN_DISTANCE = 6; // px, ignore jitter
var STOP_DELAY = 150; // ms without scrolling = stopped
var VISIBLE_FOR = 2200; // ms the "just-scrolled" state stays on

var lastY = window.scrollY;
var goingUp = false;
var frame = 0;
var stopTimer = 0;
var hideTimer = 0;
function onStop() {
  _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.add('just-scrolled');
  window.clearTimeout(hideTimer);
  hideTimer = window.setTimeout(function () {
    return _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.remove('just-scrolled');
  }, VISIBLE_FOR);
}
function update() {
  frame = 0;
  var y = window.scrollY;
  if (Math.abs(y - lastY) >= MIN_DISTANCE) {
    var up = y < lastY;
    if (up !== goingUp || !_dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.contains(up ? 'scrolled-up' : 'scrolled-down')) {
      goingUp = up;
      _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.toggle('scrolled-up', up);
      _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.toggle('scrolled-down', !up);
    }
    lastY = y;
  }
}
function onScroll() {
  if (!frame) frame = window.requestAnimationFrame(update);
  _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.remove('just-scrolled');
  window.clearTimeout(stopTimer);
  window.clearTimeout(hideTimer);
  // "scrollend" fires natively where available, otherwise fall back to a debounce
  if (!('onscrollend' in window)) stopTimer = window.setTimeout(onStop, STOP_DELAY);
}
function sync() {
  var method = SMALL_SCREEN.matches ? 'addEventListener' : 'removeEventListener';
  window[method]('scroll', onScroll, {
    passive: true
  });
  if ('onscrollend' in window) window[method]('scrollend', onStop);
  if (!SMALL_SCREEN.matches) _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.remove('scrolled-up', 'scrolled-down', 'just-scrolled');
}
SMALL_SCREEN.addEventListener('change', sync);
sync();

/***/ }),

/***/ "../sun/src/js/scroll/zones.js":
/*!*************************************!*\
  !*** ../sun/src/js/scroll/zones.js ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom.js */ "../sun/src/js/dom.js");
/* harmony import */ var _theme_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../theme.js */ "../sun/src/js/theme.js");
// Scroll position -> CSS, without a single scroll listener.
//
// Two invisible "zones" are added to the page (see .scroll-zone in
// scss/animations/scroll-zones.scss):
//   header zone: top of the page, 70vh tall
//   footer zone: the bottom 180vh of the page
//
// An IntersectionObserver reports how much of each zone is on screen
// (in 5% steps), which is all we need to know. We publish that as:
//   --header-progress   0 (top of page) ... 1 (header zone scrolled away)
//   --footer-progress   0 (footer far away) ... 1 (footer fully revealed)
//   body.past-header    header zone is gone
//   body.footer-visible footer zone is on screen (after the header)
// CSS does the rest (fading, scaling, colours).


var STEPS = 20;
var THRESHOLDS = Array.from({
  length: STEPS + 1
}, function (_, i) {
  return i / STEPS;
});
var pastHeader = false;
var footerRatio = 0;
var createZone = function createZone(name) {
  var zone = document.createElement('div');
  zone.className = "scroll-zone scroll-zone--".concat(name);
  zone.setAttribute('aria-hidden', 'true');
  _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.appendChild(zone);
  return zone;
};
function render() {
  var footerVisible = pastHeader && footerRatio > 0;
  _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.toggle('past-header', pastHeader);
  _dom_js__WEBPACK_IMPORTED_MODULE_0__.body.classList.toggle('footer-visible', footerVisible);
  // the rocket hero is shown at the top of the page and again at the very bottom
  (0,_theme_js__WEBPACK_IMPORTED_MODULE_1__.setRocketActive)(!pastHeader || footerVisible);
}
var observe = function observe(zone, onChange) {
  new IntersectionObserver(function (entries) {
    return onChange(entries[entries.length - 1]);
  }, {
    threshold: THRESHOLDS
  }).observe(zone);
};
observe(createZone('header'), function (_ref) {
  var intersectionRatio = _ref.intersectionRatio;
  _dom_js__WEBPACK_IMPORTED_MODULE_0__.root.style.setProperty('--header-progress', (1 - intersectionRatio).toFixed(2));
  pastHeader = intersectionRatio < 0.001;
  render();
});
var footerZone = createZone('footer');
observe(footerZone, function (_ref2) {
  var intersectionRatio = _ref2.intersectionRatio;
  // the viewport can only ever cover (viewport / zone) of the zone: scale that to 0..1
  var fullyCovered = Math.min(1, window.innerHeight / footerZone.offsetHeight);
  var progress = Math.min(1, intersectionRatio / fullyCovered);
  _dom_js__WEBPACK_IMPORTED_MODULE_0__.root.style.setProperty('--footer-progress', progress.toFixed(2));
  footerRatio = intersectionRatio;
  render();
});

/***/ }),

/***/ "../sun/src/js/shiner.js":
/*!*******************************!*\
  !*** ../sun/src/js/shiner.js ***!
  \*******************************/
/***/ (function() {

// The "shine" link in the hero quote scrolls to the content below it.
// The offset comes from CSS: #content-below-quote { scroll-margin-top }.
document.addEventListener('click', function (event) {
  if (!event.target.closest('.shiner')) return;
  var target = document.getElementById('content-below-quote');
  if (!target) return;
  event.preventDefault();
  target.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
});

/***/ }),

/***/ "../sun/src/js/theme.js":
/*!******************************!*\
  !*** ../sun/src/js/theme.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getTheme: function() { return /* binding */ getTheme; },
/* harmony export */   setRocketActive: function() { return /* binding */ setRocketActive; },
/* harmony export */   setTheme: function() { return /* binding */ setTheme; }
/* harmony export */ });
/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ "../sun/src/js/cookie.js");
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom.js */ "../sun/src/js/dom.js");
// Theme handling: sun / moon (user choice) + rocket (temporary hero mode).
//
//  - the chosen theme lives in  body[data-theme]  and in a cookie
//  - the body class list is the single output; it is only ever written
//    by render() so the scroll code cannot fight with theme switching.


var THEMES = ['theme-sun', 'theme-moon'];
var COOKIE = 'preferredTheme';
var theme = _dom_js__WEBPACK_IMPORTED_MODULE_1__.body.dataset.theme || 'theme-sun';
var rocketActive = (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.hasRocketShow)();
var getTheme = function getTheme() {
  return theme;
};
function render() {
  var showRocket = (0,_dom_js__WEBPACK_IMPORTED_MODULE_1__.hasRocketShow)() && rocketActive;
  _dom_js__WEBPACK_IMPORTED_MODULE_1__.body.classList.toggle('theme-rocket', showRocket);
  THEMES.forEach(function (t) {
    return _dom_js__WEBPACK_IMPORTED_MODULE_1__.body.classList.toggle(t, !showRocket && t === theme);
  });
}
function setTheme(next) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
    _ref$remember = _ref.remember,
    remember = _ref$remember === void 0 ? false : _ref$remember;
  if (!THEMES.includes(next)) return;
  theme = next;
  _dom_js__WEBPACK_IMPORTED_MODULE_1__.body.dataset.theme = next;
  if (remember) _cookie_js__WEBPACK_IMPORTED_MODULE_0__.myCookie.setCookie(COOKIE, next, 14);
  render();
}

// called by the scroll code: true while the hero (header / footer) is on screen
function setRocketActive(active) {
  if (active === rocketActive) return;
  rocketActive = active;
  render();
}
function initialTheme() {
  var hash = window.location.hash.replace('#', '');
  if (hash === 'reset') _cookie_js__WEBPACK_IMPORTED_MODULE_0__.myCookie.eraseCookie(COOKIE);
  if (THEMES.includes(hash)) return hash;
  var saved = _cookie_js__WEBPACK_IMPORTED_MODULE_0__.myCookie.getCookie(COOKIE);
  if (THEMES.includes(saved)) return saved;
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'theme-moon';
  return theme;
}

// one delegated listener for every .theme-selector on the page
document.addEventListener('click', function (event) {
  var selector = event.target.closest('.theme-selector');
  if (!selector) return;
  event.preventDefault();
  setTheme(selector.id, {
    remember: true
  });
});
setTheme(initialTheme());

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
            // update the URL without jumping, then glide to the heading
            // once the layout has settled (margins/padding transition for ~0.4s).
            // The heading's scroll-margin-top (CSS) puts it in the vertical middle.
            window.history.replaceState(null, '', '#' + hash);
            window.setTimeout(function () {
              document.querySelector('#' + hash).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
              });
            }, 450);
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

// tap / click on a work example image to show its caption
document.addEventListener('click', function (event) {
  var _event$target$closest;
  (_event$target$closest = event.target.closest('.work-example-image')) === null || _event$target$closest === void 0 || _event$target$closest.classList.toggle('is-active');
});

/***/ }),

/***/ "../sun/src/main.js":
/*!**************************!*\
  !*** ../sun/src/main.js ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_body_state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/body-state */ "../sun/src/js/body-state.js");
/* harmony import */ var _js_theme__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/theme */ "../sun/src/js/theme.js");
/* harmony import */ var _js_background__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/background */ "../sun/src/js/background.js");
/* harmony import */ var _js_scroll_zones__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/scroll/zones */ "../sun/src/js/scroll/zones.js");
/* harmony import */ var _js_scroll_direction__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/scroll/direction */ "../sun/src/js/scroll/direction.js");
/* harmony import */ var _js_hash_scroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/hash-scroll */ "../sun/src/js/hash-scroll.js");
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/images */ "../sun/src/js/images.js");
/* harmony import */ var _js_images__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_images__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _js_menu_toggle__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./js/menu-toggle */ "../sun/src/js/menu-toggle.js");
/* harmony import */ var _js_shiner__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./js/shiner */ "../sun/src/js/shiner.js");
/* harmony import */ var _js_shiner__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_js_shiner__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _js_toc__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/toc */ "../sun/src/js/toc.js");
/* harmony import */ var _js_toc__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_js_toc__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./js/collapsible-menu */ "../sun/src/js/collapsible-menu.js");
/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_js_collapsible_menu__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./js/form */ "../sun/src/js/form.js");
/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_js_form__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _js_work_example__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./js/work-example */ "../sun/src/js/work-example.js");
/* harmony import */ var _js_work_example__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_js_work_example__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _js_carousel__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./js/carousel */ "../sun/src/js/carousel.js");
/* harmony import */ var _js_carousel__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_js_carousel__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _js_print__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./js/print */ "../sun/src/js/print.js");
/* harmony import */ var _js_print__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_js_print__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _js_battery_saver__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./js/battery-saver */ "../sun/src/js/battery-saver.js");
/* harmony import */ var _js_battery_saver__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_js_battery_saver__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var PROJECT_ROOT_DIR_vendor_sunnysideup_slideshowblock_client_src_main__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! PROJECT_ROOT_DIR/vendor/sunnysideup/slideshowblock/client/src/main */ "../../vendor/sunnysideup/slideshowblock/client/src/main.js");
// Entry point. Order matters only where noted.
//
//   1. state + theme   (set up <body> before anything is painted)
//   2. layout helpers  (hero background, scroll zones)
//   3. interaction     (menu, toc, forms, ...)

// 1. state + theme



// 2. layout helpers






// 3. interaction










// slideshow block (vendor) - leave alone


/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ var __webpack_exec__ = function(moduleId) { return __webpack_require__(__webpack_require__.s = moduleId); }
/******/ var __webpack_exports__ = (__webpack_exec__("../sun/src/main.js"));
/******/ }
]);
//# sourceMappingURL=app.js.map