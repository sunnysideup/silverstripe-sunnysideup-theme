<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 2bc1f37c616e4f73e24dccbf72f23f34dbeaf3f9
/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
<<<<<<< HEAD
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
=======
/******/ 			if(installedChunks[chunkId]) {
>>>>>>> 2bc1f37c616e4f73e24dccbf72f23f34dbeaf3f9
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
<<<<<<< HEAD
/******/
=======
>>>>>>> 2bc1f37c616e4f73e24dccbf72f23f34dbeaf3f9
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"app": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
<<<<<<< HEAD
/******/ 	  var id = "webpack-livereload-plugin-script-fc41994478ac15da";
=======
/******/ 	  var id = "webpack-livereload-plugin-script-be5dc0234f59704a";
>>>>>>> 2bc1f37c616e4f73e24dccbf72f23f34dbeaf3f9
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "http://localhost:35729/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([0,"vendors~app"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../sun/src/js/body-class.js":
/*!***********************************!*\
  !*** ../sun/src/js/body-class.js ***!
  \***********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
<<<<<<< HEAD
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ \"../sun/src/js/cookie.js\");\n\n\nconst bodyClass = {\n\n  bodyObject: null,\n\n  init: function () {\n    bodyClass.bodyObject = document.querySelector('body');\n    bodyClass.addOrToggleBodyClass('#menu-toggle', false);\n    bodyClass.addOrToggleBodyClass('.theme-selector', true);\n    bodyClass.addOrToggleBodyClass('.set-theme', true);\n    bodyClass.retrieveCookieOrHash();\n\n    window.setTimeout(function () {\n      window.scrollTo(window.pageXOffset, window.pageYOffset + 2);\n      window.scrollTo(window.pageXOffset, window.pageYOffset - 2);\n    }, 300);\n    this.addBasicBodyClassListeners();\n  },\n\n  addBasicBodyClassListeners: function () {\n    document.addEventListener('DOMContentLoaded', function (event) {\n      bodyClass.bodyObject.classList.add('body-loaded');\n      if ('ontouchstart' in document.documentElement) {\n        bodyClass.bodyObject.classList.add('touch');\n      } else {\n        bodyClass.bodyObject.classList.add('no-touch');\n      }\n      bodyClass.addRocketMode();\n    });\n    window.addEventListener('beforeunload', function () {\n      bodyClass.bodyObject.classList.add('body-unloaded');\n    });\n  },\n\n  retrieveCookieOrHash: function () {\n    let hash = bodyClass.getHashFromURL();\n    let classes = '';\n    if (hash === 'reset') {\n      _cookie_js__WEBPACK_IMPORTED_MODULE_0__[\"myCookie\"].eraseCookie('bodyClassClasses');\n      hash = '';\n    } else if (hash) {\n      this.runClickForElement(hash);\n    } else {\n      classes = _cookie_js__WEBPACK_IMPORTED_MODULE_0__[\"myCookie\"].getCookie('bodyClassClasses');\n      classes = String(classes);\n      if (classes.length > 0) {\n        const classArray = classes.split(' ');\n        for (let i = 0; i < classArray.length; i++) {\n          this.runClickForElement(classArray[i]);\n        }\n      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {\n        this.runClickForElement('theme-moon');\n      }\n    }\n  },\n\n  runClickForElement: function (hash) {\n    if (hash === 'body-loaded') {\n      return;\n    }\n    if (hash === 'touch') {\n      return;\n    }\n    hash = hash.trim();\n    if (hash.length) {\n      const obj = document.getElementById(hash);\n      if (obj) {\n        this.removeBodyClassesBasedOnAttribute(obj);\n        bodyClass.bodyObject.classList.add(hash);\n      }\n    }\n  },\n\n  addOrToggleBodyClass: function (objSelector, keep) {\n    document.querySelectorAll(objSelector).forEach(function ($eachObject) {\n      $eachObject.addEventListener('click', function (event) {\n        bodyClass.actionBodyClassChange($eachObject, event, keep);\n        return false;\n      });\n    });\n  },\n\n  actionBodyClassChange: function ($eachObject, event, keep) {\n    event.preventDefault();\n\n    bodyClass.removeBodyClassesBasedOnAttribute($eachObject);\n\n    let toggleClass = '';\n    let id = '';\n    if ($eachObject.hasAttribute('data-add-class')) {\n      toggleClass = $eachObject.getAttribute('data-add-class');\n    } else {\n      toggleClass = $eachObject.getAttribute('id');\n      id = toggleClass;\n    }\n    if ($eachObject.hasAttribute('data-toggle')) {\n      bodyClass.bodyObject.classList.toggle(toggleClass);\n    } else {\n      bodyClass.bodyObject.classList.add(toggleClass);\n    }\n    if (toggleClass === 'theme-rocket') {}\n\n    if (keep) {\n      _cookie_js__WEBPACK_IMPORTED_MODULE_0__[\"myCookie\"].setCookie('bodyClassClasses', bodyClass.bodyObject.className, 14);\n\n      if (id) {\n        let hash = bodyClass.getHashFromString(id);\n        if (hash.length) {\n          hash = hash.replace('#', '');\n          window.location.hash = '#' + hash;\n        }\n      }\n    }\n  },\n\n  removeBodyClassesBasedOnAttribute: function ($object) {\n    if ($object.hasAttribute('data-remove-class')) {\n      const string = $object.getAttribute('data-remove-class');\n      const classes = bodyClass.getClassesFromList(string);\n      for (let i = 0, len = classes.length; i < len; i++) {\n        const value = classes[i];\n\n        bodyClass.bodyObject.classList.remove(value);\n      }\n    }\n  },\n\n  getClassesFromList: function (string) {\n    const array = string.split(',');\n    const newArray = [];\n    for (let i = 0, len = array.length; i < len; i++) {\n      const value = array[i].trim();\n      if (value) {\n        newArray.push(value);\n      }\n    }\n    return newArray;\n  },\n\n  getHashFromURL: function () {\n    const string = window.location.hash;\n    return bodyClass.getHashFromString(string);\n  },\n\n  getHashFromString: function (string) {\n    string = String(string);\n    return bodyClass.retrieveHasSignFromString(string);\n  },\n\n  retrieveHasSignFromString: function (string) {\n    return string.replace('#', '');\n  },\n\n  addRocketMode: function () {\n    const div = document.createElement('div');\n    div.style.backgroundImage = 'url(' + bodyClass.bodyObject.getAttribute('data-bg-image') + ')';\n    div.id = 'BackgroundImage';\n    const temp = bodyClass.bodyObject.firstChild;\n    bodyClass.bodyObject.insertBefore(div, temp);\n  }\n\n};\n\nbodyClass.init();\n\n//# sourceURL=webpack:///../sun/src/js/body-class.js?");
=======
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _cookie_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cookie.js */ \"../sun/src/js/cookie.js\");\n\n\nconst bodyClass = {\n\n  bodyObject: null,\n\n  init: function () {\n    bodyClass.bodyObject = document.querySelector('body');\n    bodyClass.addOrToggleBodyClass('#menu-toggle', false);\n    bodyClass.addOrToggleBodyClass('.theme-selector', true);\n    bodyClass.addOrToggleBodyClass('.set-theme', true);\n    bodyClass.retrieveCookieOrHash();\n    // expose scrolled behaviour\n    window.setTimeout(function () {\n      window.scrollTo(window.pageXOffset, window.pageYOffset + 2);\n      window.scrollTo(window.pageXOffset, window.pageYOffset - 2);\n    }, 300);\n    this.addBasicBodyClassListeners();\n  },\n\n  addBasicBodyClassListeners: function () {\n    document.addEventListener('DOMContentLoaded', function (event) {\n      bodyClass.bodyObject.classList.add('body-loaded');\n      if ('ontouchstart' in document.documentElement) {\n        bodyClass.bodyObject.classList.add('touch');\n      } else {\n        bodyClass.bodyObject.classList.add('no-touch');\n      }\n      bodyClass.addRocketMode();\n    });\n    window.addEventListener('beforeunload', function () {\n      bodyClass.bodyObject.classList.add('body-unloaded');\n    });\n  },\n\n  retrieveCookieOrHash: function () {\n    let hash = bodyClass.getHashFromURL();\n    let classes = '';\n    if (hash === 'reset') {\n      _cookie_js__WEBPACK_IMPORTED_MODULE_0__[\"myCookie\"].eraseCookie('bodyClassClasses');\n      hash = '';\n      // console.log(reset);\n    } else if (hash) {\n      this.runClickForElement(hash);\n    } else {\n      classes = _cookie_js__WEBPACK_IMPORTED_MODULE_0__[\"myCookie\"].getCookie('bodyClassClasses');\n      classes = String(classes);\n      if (classes.length > 0) {\n        const classArray = classes.split(' ');\n        for (let i = 0; i < classArray.length; i++) {\n          this.runClickForElement(classArray[i]);\n        }\n      } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {\n        this.runClickForElement('theme-moon');\n      }\n    }\n  },\n\n  runClickForElement: function (hash) {\n    if (hash === 'body-loaded') {\n      return;\n    }\n    if (hash === 'touch') {\n      return;\n    }\n    hash = hash.trim();\n    if (hash.length) {\n      const obj = document.getElementById(hash);\n      if (obj) {\n        this.removeBodyClassesBasedOnAttribute(obj);\n        bodyClass.bodyObject.classList.add(hash);\n      }\n    }\n  },\n\n  addOrToggleBodyClass: function (objSelector, keep) {\n    document.querySelectorAll(objSelector).forEach(function ($eachObject) {\n      $eachObject.addEventListener('click', function (event) {\n        bodyClass.actionBodyClassChange($eachObject, event, keep);\n        return false;\n      });\n    });\n  },\n\n  actionBodyClassChange: function ($eachObject, event, keep) {\n    event.preventDefault();\n\n    bodyClass.removeBodyClassesBasedOnAttribute($eachObject);\n\n    let toggleClass = '';\n    let id = '';\n    if ($eachObject.hasAttribute('data-add-class')) {\n      toggleClass = $eachObject.getAttribute('data-add-class');\n    } else {\n      toggleClass = $eachObject.getAttribute('id');\n      id = toggleClass;\n    }\n    if ($eachObject.hasAttribute('data-toggle')) {\n      bodyClass.bodyObject.classList.toggle(toggleClass);\n    } else {\n      bodyClass.bodyObject.classList.add(toggleClass);\n    }\n    if (toggleClass === 'theme-rocket') {\n      // window.alert('Welcome to our experimental fly-around-the-world rocket(🚀) theme. ')\n    }\n\n    if (keep) {\n      _cookie_js__WEBPACK_IMPORTED_MODULE_0__[\"myCookie\"].setCookie('bodyClassClasses', bodyClass.bodyObject.className, 14);\n\n      if (id) {\n        let hash = bodyClass.getHashFromString(id);\n        if (hash.length) {\n          hash = hash.replace('#', '');\n          window.location.hash = '#' + hash;\n        }\n      }\n    }\n  },\n\n  removeBodyClassesBasedOnAttribute: function ($object) {\n    if ($object.hasAttribute('data-remove-class')) {\n      const string = $object.getAttribute('data-remove-class');\n      const classes = bodyClass.getClassesFromList(string);\n      for (let i = 0, len = classes.length; i < len; i++) {\n        const value = classes[i];\n        // console.log('remove '+value);\n        bodyClass.bodyObject.classList.remove(value);\n      }\n    }\n  },\n\n  getClassesFromList: function (string) {\n    const array = string.split(',');\n    const newArray = [];\n    for (let i = 0, len = array.length; i < len; i++) {\n      const value = array[i].trim();\n      if (value) {\n        newArray.push(value);\n      }\n    }\n    return newArray;\n  },\n\n  getHashFromURL: function () {\n    const string = window.location.hash;\n    return bodyClass.getHashFromString(string);\n  },\n\n  getHashFromString: function (string) {\n    string = String(string);\n    return bodyClass.retrieveHasSignFromString(string);\n  },\n\n  retrieveHasSignFromString: function (string) {\n    return string.replace('#', '');\n  },\n\n  addRocketMode: function () {\n    const div = document.createElement('div');\n    div.style.backgroundImage = 'url(' + bodyClass.bodyObject.getAttribute('data-bg-image') + ')';\n    div.id = 'BackgroundImage';\n    const temp = bodyClass.bodyObject.firstChild;\n    bodyClass.bodyObject.insertBefore(div, temp);\n  }\n\n};\n\nbodyClass.init();\n\n//# sourceURL=webpack:///../sun/src/js/body-class.js?");
>>>>>>> 2bc1f37c616e4f73e24dccbf72f23f34dbeaf3f9

/***/ }),

/***/ "../sun/src/js/collapsible-menu.js":
/*!*****************************************!*\
  !*** ../sun/src/js/collapsible-menu.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

<<<<<<< HEAD
eval("\n\nconst CollapsibleLists = function () {\n  function apply(doNotRecurse) {\n    [].forEach.call(document.getElementsByTagName('ul'), node => {\n      if (node.classList.contains('collapsibleList')) {\n        applyTo(node, true);\n\n        if (!doNotRecurse) {\n          [].forEach.call(node.getElementsByTagName('ul'), subnode => {\n            subnode.classList.add('collapsibleList');\n          });\n        }\n      }\n    });\n  }\n\n  function applyTo(node, doNotRecurse) {\n    [].forEach.call(node.getElementsByTagName('li'), li => {\n      if (!doNotRecurse || node === li.parentNode) {\n        if (li.getElementsByTagName('ul').length > 0) {\n          li.style.userSelect = 'none';\n          li.style.MozUserSelect = 'none';\n          li.style.msUserSelect = 'none';\n          li.style.WebkitUserSelect = 'none';\n          const span = document.createElement('span');\n          span.addEventListener('click', handleClick.bind(null, li));\n          span.innerHTML = '<i class=\"open\">+</i><i class=\"closed\">–</i>';\n          li.insertBefore(span, li.firstChild);\n          if (li.classList.contains('section') || li.classList.contains('current')) {\n            toggle(li);\n          }\n          toggle(li);\n        }\n      }\n    });\n  }\n\n  function handleClick(node, e) {\n    let li = e.target;\n    while (li.nodeName !== 'LI') {\n      li = li.parentNode;\n    }\n\n    if (li === node) {\n      toggle(node);\n    }\n  }\n\n  function toggle(node) {\n    const open = node.classList.contains('collapsibleListClosed');\n    const uls = node.getElementsByTagName('ul');\n\n    [].forEach.call(uls, ul => {\n      let li = ul;\n      while (li.nodeName !== 'LI') {\n        li = li.parentNode;\n      }\n\n      if (li === node) {\n        ul.style.display = open ? 'block' : 'none';\n      }\n    });\n\n    node.classList.remove('collapsibleListOpen');\n    node.classList.remove('collapsibleListClosed');\n\n    if (uls.length > 0) {\n      node.classList.add('collapsibleList' + (open ? 'Open' : 'Closed'));\n    }\n  }\n\n  return { apply, applyTo };\n}();\n\nCollapsibleLists.apply();\n\n//# sourceURL=webpack:///../sun/src/js/collapsible-menu.js?");
=======
eval("/*\n\nCollapsibleLists.js\n\nAn object allowing lists to dynamically expand and collapse\n\nCreated by Kate Morley - http://code.iamkate.com/ - and released under the terms\nof the CC0 1.0 Universal legal code:\n\nhttp://creativecommons.org/publicdomain/zero/1.0/legalcode\n\n*/\n\nconst CollapsibleLists = function () {\n  // Makes all lists with the class 'collapsibleList' collapsible. The\n  // parameter is:\n  //\n  // doNotRecurse - true if sub-lists should not be made collapsible\n  function apply(doNotRecurse) {\n    [].forEach.call(document.getElementsByTagName('ul'), node => {\n      if (node.classList.contains('collapsibleList')) {\n        applyTo(node, true);\n\n        if (!doNotRecurse) {\n          [].forEach.call(node.getElementsByTagName('ul'), subnode => {\n            subnode.classList.add('collapsibleList');\n          });\n        }\n      }\n    });\n  }\n\n  // Makes the specified list collapsible. The parameters are:\n  //\n  // node         - the list element\n  // doNotRecurse - true if sub-lists should not be made collapsible\n  function applyTo(node, doNotRecurse) {\n    [].forEach.call(node.getElementsByTagName('li'), li => {\n      if (!doNotRecurse || node === li.parentNode) {\n        if (li.getElementsByTagName('ul').length > 0) {\n          //\n          li.style.userSelect = 'none';\n          li.style.MozUserSelect = 'none';\n          li.style.msUserSelect = 'none';\n          li.style.WebkitUserSelect = 'none';\n          const span = document.createElement('span');\n          span.addEventListener('click', handleClick.bind(null, li));\n          span.innerHTML = '<i class=\"open\">+</i><i class=\"closed\">–</i>';\n          li.insertBefore(span, li.firstChild);\n          if (li.classList.contains('section') || li.classList.contains('current')) {\n            // do nothing\n            toggle(li);\n          }\n          toggle(li);\n        }\n      }\n    });\n  }\n\n  // Handles a click. The parameter is:\n  //\n  // node - the node for which clicks are being handled\n  function handleClick(node, e) {\n    let li = e.target;\n    while (li.nodeName !== 'LI') {\n      li = li.parentNode;\n    }\n\n    if (li === node) {\n      toggle(node);\n    }\n  }\n\n  // Opens or closes the unordered list elements directly within the\n  // specified node. The parameter is:\n  //\n  // node - the node containing the unordered list elements\n  function toggle(node) {\n    const open = node.classList.contains('collapsibleListClosed');\n    const uls = node.getElementsByTagName('ul');\n\n    [].forEach.call(uls, ul => {\n      let li = ul;\n      while (li.nodeName !== 'LI') {\n        li = li.parentNode;\n      }\n\n      if (li === node) {\n        ul.style.display = open ? 'block' : 'none';\n      }\n    });\n\n    node.classList.remove('collapsibleListOpen');\n    node.classList.remove('collapsibleListClosed');\n\n    if (uls.length > 0) {\n      node.classList.add('collapsibleList' + (open ? 'Open' : 'Closed'));\n    }\n  }\n\n  return { apply, applyTo };\n}();\n\nCollapsibleLists.apply();\n\n//# sourceURL=webpack:///../sun/src/js/collapsible-menu.js?");
>>>>>>> 2bc1f37c616e4f73e24dccbf72f23f34dbeaf3f9

/***/ }),

/***/ "../sun/src/js/cookie.js":
/*!*******************************!*\
  !*** ../sun/src/js/cookie.js ***!
  \*******************************/
/*! exports provided: myCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"myCookie\", function() { return myCookie; });\nconst myCookie = {\n\n  setCookie: function (name, value, days) {\n    var expires = '';\n    if (typeof days === 'undefined') {\n      days = 14;\n    }\n    if (days) {\n      var date = new Date();\n      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);\n      expires = '; expires=' + date.toUTCString();\n    }\n    document.cookie = name + '=' + (value || '') + expires + '; path=/';\n  },\n\n  getCookie: function (name) {\n    var nameEQ = name + '=';\n    var ca = document.cookie.split(';');\n    for (var i = 0; i < ca.length; i++) {\n      var c = ca[i];\n      while (c.charAt(0) === ' ') {\n        c = c.substring(1, c.length);\n      }\n      if (c.indexOf(nameEQ) === 0) {\n        return c.substring(nameEQ.length, c.length);\n      }\n    }\n    return null;\n  },\n\n  eraseCookie: function (name) {\n    myCookie.setCookie(name, null, 0);\n  }\n};\n\n\n\n//# sourceURL=webpack:///../sun/src/js/cookie.js?");

/***/ }),

/***/ "../sun/src/js/footer-is-visible.js":
/*!******************************************!*\
  !*** ../sun/src/js/footer-is-visible.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

<<<<<<< HEAD
eval("\nconst footerIsVisible = {\n\n  init: function () {\n    const target = document.querySelector('#footer');\n\n    var intersectionObserverOptions = {\n      root: null,\n      rootMargin: '150px',\n      threshold: 1.0\n    };\n\n    var observer = new window.IntersectionObserver(onIntersection, intersectionObserverOptions);\n\n    observer.observe(target);\n\n    function onIntersection(entries) {\n      entries.forEach(entry => {\n        document.querySelector('body').classList.toggle('footer-visible', entry.intersectionRatio >= 1);\n      });\n    }\n  }\n};\n\nfooterIsVisible.init();\n\n//# sourceURL=webpack:///../sun/src/js/footer-is-visible.js?");

/***/ }),

/***/ "../sun/src/js/form.js":
/*!*****************************!*\
  !*** ../sun/src/js/form.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var formfields = document.querySelectorAll('input, select, textarea');\nfor (var J = formfields.length - 1; J >= 0; --J) {\n  formfields[J].addEventListener('change', adjustStyling, false);\n  formfields[J].addEventListener('keyup', adjustStyling, false);\n  formfields[J].addEventListener('focus', adjustStyling, false);\n  formfields[J].addEventListener('blur', adjustStyling, false);\n  formfields[J].addEventListener('mousedown', adjustStyling, false);\n\n  var evt = document.createEvent('HTMLEvents');\n  evt.initEvent('change', false, true);\n  formfields[J].dispatchEvent(evt);\n}\n\nfunction adjustStyling(zEvent) {\n  console.log(zEvent);\n  var inpVal = zEvent.target.value;\n  if (inpVal && inpVal.replace(/^\\s+|\\s+$/g, '')) {\n    zEvent.target.classList.remove('no-value');\n  } else {\n    zEvent.target.classList.add('no-value');\n  }\n}\n\n//# sourceURL=webpack:///../sun/src/js/form.js?");
=======
eval("\nconst footerIsVisible = {\n\n  init: function () {\n    // this is the target which is observed\n    const target = document.querySelector('#footer');\n\n    // configure the intersection observer instance\n    var intersectionObserverOptions = {\n      root: null,\n      rootMargin: '150px',\n      threshold: 1.0\n    };\n\n    var observer = new window.IntersectionObserver(onIntersection, intersectionObserverOptions);\n\n    // provide the observer with a target\n    observer.observe(target);\n\n    function onIntersection(entries) {\n      entries.forEach(entry => {\n        // console.clear()\n        // console.log(entry.intersectionRatio)\n        document.querySelector('body').classList.toggle('footer-visible', entry.intersectionRatio >= 1);\n        // Are we in viewport?\n        // if (entry.intersectionRatio > 1) {\n        // Stop watching\n        // observer.unobserve(entry.target);\n        // }\n      });\n    }\n  }\n};\n\nfooterIsVisible.init();\n\n//# sourceURL=webpack:///../sun/src/js/footer-is-visible.js?");
>>>>>>> 2bc1f37c616e4f73e24dccbf72f23f34dbeaf3f9

/***/ }),

/***/ "../sun/src/js/hide-menu-bar.js":
/*!**************************************!*\
  !*** ../sun/src/js/hide-menu-bar.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

<<<<<<< HEAD
eval("const scrollManager = {\n\n  minScrollForAction: 2,\n\n  minScrollDown: 100,\n\n  lastScroll: 0,\n\n  didScrill: 0,\n\n  bodyObject: null,\n\n  timeOutFx: null,\n\n  justScrolledFxtFx: null,\n\n  scrolledUpClass: 'scrolled-up',\n\n  scrolledDownClass: 'scrolled-down',\n\n  init: function () {\n    scrollManager.bodyObject = document.querySelector('body');\n    this.scrollListener();\n    this.scrollUpOrDown();\n    this.lastScroll = window.scrollY;\n  },\n\n  scrollListener: function () {\n    window.addEventListener('scroll', function () {\n      window.clearTimeout(scrollManager.timeOutFx);\n      window.clearTimeout(scrollManager.justScrolledFx);\n      if (window.scrollY === 0) {\n        scrollManager.bodyObject.classList.remove('past-header');\n      } else {\n        scrollManager.bodyObject.classList.add('past-header');\n      }\n      scrollManager.didScroll = true;\n      scrollManager.scrollUpOrDown();\n    });\n  },\n\n  scrollUpOrDown: function () {\n    scrollManager.timeOutFx = window.setTimeout(function () {\n      if (scrollManager.didScroll) {\n        scrollManager.didScroll = false;\n        const newScroll = window.scrollY;\n\n        if (Math.abs(scrollManager.lastScroll - newScroll) <= scrollManager.minScrollForAction) {\n          return;\n        }\n        if (newScroll > scrollManager.lastScroll + scrollManager.minScrollDown) {\n          scrollManager.bodyObject.classList.remove(scrollManager.scrolledUpClass);\n          scrollManager.bodyObject.classList.add(scrollManager.scrolledDownClass);\n        } else if (newScroll < scrollManager.lastScroll) {\n          scrollManager.bodyObject.classList.add(scrollManager.scrolledUpClass);\n          scrollManager.bodyObject.classList.remove(scrollManager.scrolledDownClass);\n          scrollManager.bodyObject.classList.add('just-scrolled');\n          this.justScrolledFx = window.setTimeout(function () {\n            scrollManager.bodyObject.classList.remove('just-scrolled');\n          }, 3000);\n        } else {}\n        scrollManager.lastScroll = newScroll;\n      }\n    }, 200);\n  }\n\n};\n\nscrollManager.init();\n\n//# sourceURL=webpack:///../sun/src/js/hide-menu-bar.js?");
=======
eval("const scrollManager = {\n\n  minScrollForAction: 2,\n\n  minScrollDown: 100,\n\n  lastScroll: 0,\n\n  didScrill: 0,\n\n  bodyObject: null,\n\n  timeOutFx: null,\n\n  scrolledUpClass: 'scrolled-up',\n\n  scrolledDownClass: 'scrolled-down',\n\n  init: function () {\n    scrollManager.bodyObject = document.querySelector('body');\n    this.scrollListener();\n    this.scrollUpOrDown();\n    this.lastScroll = window.scrollY;\n  },\n\n  scrollListener: function () {\n    window.addEventListener('scroll', function () {\n      window.clearTimeout(scrollManager.timeOutFx);\n      if (window.scrollY === 0) {\n        scrollManager.bodyObject.classList.remove('past-header');\n      } else {\n        scrollManager.bodyObject.classList.add('past-header');\n      }\n      scrollManager.didScroll = true;\n      scrollManager.scrollUpOrDown();\n    });\n  },\n\n  scrollUpOrDown: function () {\n    this.timeOutFx = window.setTimeout(function () {\n      // console.log('running')\n      if (scrollManager.didScroll) {\n        scrollManager.didScroll = false;\n        const newScroll = window.scrollY;\n        // console.log('last scroll: ' + scrollManager.lastScroll)\n        // console.log('new scroll: ' + newScroll)\n        if (Math.abs(scrollManager.lastScroll - newScroll) <= scrollManager.minScrollForAction) {\n          // console.log('too little')\n          return;\n        }\n        if (newScroll > scrollManager.lastScroll + scrollManager.minScrollDown) {\n          // console.log('down')\n          // Scroll Down\n          scrollManager.bodyObject.classList.remove(scrollManager.scrolledUpClass);\n          scrollManager.bodyObject.classList.add(scrollManager.scrolledDownClass);\n        } else if (newScroll < scrollManager.lastScroll) {\n          // console.log('up')\n          // Scroll Up\n          scrollManager.bodyObject.classList.add(scrollManager.scrolledUpClass);\n          scrollManager.bodyObject.classList.remove(scrollManager.scrolledDownClass);\n        } else {\n          // console.log('do nothing')\n        }\n        scrollManager.lastScroll = newScroll;\n      }\n    }, 200);\n  }\n\n};\n\nscrollManager.init();\n\n//# sourceURL=webpack:///../sun/src/js/hide-menu-bar.js?");
>>>>>>> 2bc1f37c616e4f73e24dccbf72f23f34dbeaf3f9

/***/ }),

/***/ "../sun/src/js/scripts.js":
/*!********************************!*\
  !*** ../sun/src/js/scripts.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nconst script = () => {};\n\nscript();\n\n//# sourceURL=webpack:///../sun/src/js/scripts.js?");

/***/ }),

/***/ "../sun/src/main.js":
/*!**************************!*\
  !*** ../sun/src/main.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
<<<<<<< HEAD
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/cookie */ \"../sun/src/js/cookie.js\");\n/* harmony import */ var _js_body_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/body-class */ \"../sun/src/js/body-class.js\");\n/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/collapsible-menu */ \"../sun/src/js/collapsible-menu.js\");\n/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _js_hide_menu_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/hide-menu-bar */ \"../sun/src/js/hide-menu-bar.js\");\n/* harmony import */ var _js_hide_menu_bar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_hide_menu_bar__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _js_scripts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/scripts */ \"../sun/src/js/scripts.js\");\n/* harmony import */ var _js_scripts__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_scripts__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _js_footer_is_visible__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/footer-is-visible */ \"../sun/src/js/footer-is-visible.js\");\n/* harmony import */ var _js_footer_is_visible__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_footer_is_visible__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./js/form */ \"../sun/src/js/form.js\");\n/* harmony import */ var _js_form__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_js_form__WEBPACK_IMPORTED_MODULE_6__);\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack:///../sun/src/main.js?");
=======
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/cookie */ \"../sun/src/js/cookie.js\");\n/* harmony import */ var _js_body_class__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./js/body-class */ \"../sun/src/js/body-class.js\");\n/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/collapsible-menu */ \"../sun/src/js/collapsible-menu.js\");\n/* harmony import */ var _js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_js_collapsible_menu__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _js_hide_menu_bar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/hide-menu-bar */ \"../sun/src/js/hide-menu-bar.js\");\n/* harmony import */ var _js_hide_menu_bar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_hide_menu_bar__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _js_scripts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./js/scripts */ \"../sun/src/js/scripts.js\");\n/* harmony import */ var _js_scripts__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_js_scripts__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _js_footer_is_visible__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./js/footer-is-visible */ \"../sun/src/js/footer-is-visible.js\");\n/* harmony import */ var _js_footer_is_visible__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_js_footer_is_visible__WEBPACK_IMPORTED_MODULE_5__);\n\n// // non-themed app\n// import 'site/app/client/javascript/MyJavascriptFile';\n//\n//\n// // vendor modules\n// import 'site/vendor/myvendor/mypackage/client/javascript/MyJavascriptFile';\n//\n// // your themed app files\n// import './js/partials/SomeOtherJavascriptFile';\n\n\n\n\n\n\n\n//# sourceURL=webpack:///../sun/src/main.js?");
>>>>>>> 2bc1f37c616e4f73e24dccbf72f23f34dbeaf3f9

/***/ }),

/***/ "../sun/src/style.scss":
/*!*****************************!*\
  !*** ../sun/src/style.scss ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

<<<<<<< HEAD
eval("\nvar content = __webpack_require__(/*! !../../sswebpack_engine_only/node_modules/mini-css-extract-plugin/dist/loader.js!../../sswebpack_engine_only/node_modules/css-loader??ref--4-2!../../sswebpack_engine_only/node_modules/postcss-loader/src??postcss!../../sswebpack_engine_only/node_modules/resolve-url-loader!../../sswebpack_engine_only/node_modules/sass-loader/dist/cjs.js??ref--4-5!./style.scss */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js?!../sun/src/style.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../sswebpack_engine_only/node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///../sun/src/style.scss?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/dist/cjs.js?!../sun/src/style.scss":
/*!*****************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-2!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader!./node_modules/sass-loader/dist/cjs.js??ref--4-5!../sun/src/style.scss ***!
  \*****************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///../sun/src/style.scss?./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-2!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader!./node_modules/sass-loader/dist/cjs.js??ref--4-5");
=======
eval("\nvar content = __webpack_require__(/*! !../../sswebpack_engine_only/node_modules/mini-css-extract-plugin/dist/loader.js!../../sswebpack_engine_only/node_modules/css-loader??ref--4-2!../../sswebpack_engine_only/node_modules/postcss-loader/src??postcss!../../sswebpack_engine_only/node_modules/resolve-url-loader!../../sswebpack_engine_only/node_modules/sass-loader/lib/loader.js??ref--4-5!./style.scss */ \"./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?!../sun/src/style.scss\");\n\nif(typeof content === 'string') content = [[module.i, content, '']];\n\nvar transform;\nvar insertInto;\n\n\n\nvar options = {\"hmr\":true}\n\noptions.transform = transform\noptions.insertInto = undefined;\n\nvar update = __webpack_require__(/*! ../../sswebpack_engine_only/node_modules/style-loader/lib/addStyles.js */ \"./node_modules/style-loader/lib/addStyles.js\")(content, options);\n\nif(content.locals) module.exports = content.locals;\n\nif(false) {}\n\n//# sourceURL=webpack:///../sun/src/style.scss?");

/***/ }),

/***/ "./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader/index.js?!./node_modules/postcss-loader/src/index.js?!./node_modules/resolve-url-loader/index.js!./node_modules/sass-loader/lib/loader.js?!../sun/src/style.scss":
/*!*******************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-2!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js??ref--4-5!../sun/src/style.scss ***!
  \*******************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///../sun/src/style.scss?./node_modules/mini-css-extract-plugin/dist/loader.js!./node_modules/css-loader??ref--4-2!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader!./node_modules/sass-loader/lib/loader.js??ref--4-5");
>>>>>>> 2bc1f37c616e4f73e24dccbf72f23f34dbeaf3f9

/***/ }),

/***/ 0:
<<<<<<< HEAD
/*!******************************************************!*\
  !*** multi ../sun/src/main.js ../sun/src/style.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! /var/www/ss4/sunnysideup.co.nz/themes/sun/src/main.js */\"../sun/src/main.js\");\nmodule.exports = __webpack_require__(/*! /var/www/ss4/sunnysideup.co.nz/themes/sun/src/style.scss */\"../sun/src/style.scss\");\n\n\n//# sourceURL=webpack:///multi_../sun/src/main.js_../sun/src/style.scss?");

/***/ })

/******/ });
=======
/*!**************************************************************************!*\
  !*** multi ../../themes/sun/src/main.js ../../themes/sun/src/style.scss ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ../../themes/sun/src/main.js */\"../sun/src/main.js\");\nmodule.exports = __webpack_require__(/*! ../../themes/sun/src/style.scss */\"../sun/src/style.scss\");\n\n\n//# sourceURL=webpack:///multi_../../themes/sun/src/main.js_../../themes/sun/src/style.scss?");

/***/ })

/******/ });
=======
!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){n(9),e.exports=n(5)},function(e,t){(function(){function e(e,o){[].forEach.call(e.getElementsByTagName("li"),r=>{if((!o||e===r.parentNode)&&r.getElementsByTagName("ul").length>0){r.style.userSelect="none",r.style.MozUserSelect="none",r.style.msUserSelect="none",r.style.WebkitUserSelect="none";const e=document.createElement("span");e.addEventListener("click",t.bind(null,r)),e.innerHTML='<i class="open">+</i><i class="closed">–</i>',r.insertBefore(e,r.firstChild),(r.classList.contains("section")||r.classList.contains("current"))&&n(r),n(r)}})}function t(e,t){let o=t.target;for(;"LI"!==o.nodeName;)o=o.parentNode;o===e&&n(e)}function n(e){const t=e.classList.contains("collapsibleListClosed"),n=e.getElementsByTagName("ul");[].forEach.call(n,n=>{let o=n;for(;"LI"!==o.nodeName;)o=o.parentNode;o===e&&(n.style.display=t?"block":"none")}),e.classList.remove("collapsibleListOpen"),e.classList.remove("collapsibleListClosed"),n.length>0&&e.classList.add("collapsibleList"+(t?"Open":"Closed"))}return{apply:function(t){[].forEach.call(document.getElementsByTagName("ul"),n=>{n.classList.contains("collapsibleList")&&(e(n,!0),t||[].forEach.call(n.getElementsByTagName("ul"),e=>{e.classList.add("collapsibleList")}))})},applyTo:e}})().apply()},function(e,t){const n={minScrollForAction:2,minScrollDown:100,lastScroll:0,didScrill:0,bodyObject:null,timeOutFx:null,justScrolledFxtFx:null,scrolledUpClass:"scrolled-up",scrolledDownClass:"scrolled-down",init:function(){n.bodyObject=document.querySelector("body"),this.scrollListener(),this.scrollUpOrDown(),this.lastScroll=window.scrollY},scrollListener:function(){window.addEventListener("scroll",(function(){window.clearTimeout(n.timeOutFx),window.clearTimeout(this.justScrolledFx),0===window.scrollY?n.bodyObject.classList.remove("past-header"):n.bodyObject.classList.add("past-header"),n.didScroll=!0,n.scrollUpOrDown()}))},scrollUpOrDown:function(){this.timeOutFx=window.setTimeout((function(){if(n.didScroll){n.didScroll=!1;const e=window.scrollY;if(Math.abs(n.lastScroll-e)<=n.minScrollForAction)return;e>n.lastScroll+n.minScrollDown?(n.bodyObject.classList.remove(n.scrolledUpClass),n.bodyObject.classList.add(n.scrolledDownClass)):e<n.lastScroll&&(n.bodyObject.classList.add(n.scrolledUpClass),n.bodyObject.classList.remove(n.scrolledDownClass),n.bodyObject.classList.add("just-scrolled"),this.justScrolledFx=window.setTimeout((function(){n.bodyObject.classList.remove("just-scrolled")}),3e3)),n.lastScroll=e}}),200)}};n.init()},function(e,t){},function(e,t){(function(){const e=document.querySelector("#footer");new window.IntersectionObserver((function(e){e.forEach(e=>{document.querySelector("body").classList.toggle("footer-visible",e.intersectionRatio>=1)})}),{root:null,rootMargin:"150px",threshold:1}).observe(e)})()},function(e,t,n){var o=n(6);"string"==typeof o&&(o=[[e.i,o,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};n(7)(o,r);o.locals&&(e.exports=o.locals)},function(e,t,n){},function(e,t,n){var o,r,s={},i=(o=function(){return window&&document&&document.all&&!window.atob},function(){return void 0===r&&(r=o.apply(this,arguments)),r}),l=function(e,t){return t?t.querySelector(e):document.querySelector(e)},a=function(e){var t={};return function(e,n){if("function"==typeof e)return e();if(void 0===t[e]){var o=l.call(this,e,n);if(window.HTMLIFrameElement&&o instanceof window.HTMLIFrameElement)try{o=o.contentDocument.head}catch(e){o=null}t[e]=o}return t[e]}}(),c=null,d=0,u=[],f=n(8);function p(e,t){for(var n=0;n<e.length;n++){var o=e[n],r=s[o.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](o.parts[i]);for(;i<o.parts.length;i++)r.parts.push(v(o.parts[i],t))}else{var l=[];for(i=0;i<o.parts.length;i++)l.push(v(o.parts[i],t));s[o.id]={id:o.id,refs:1,parts:l}}}}function b(e,t){for(var n=[],o={},r=0;r<e.length;r++){var s=e[r],i=t.base?s[0]+t.base:s[0],l={css:s[1],media:s[2],sourceMap:s[3]};o[i]?o[i].parts.push(l):n.push(o[i]={id:i,parts:[l]})}return n}function m(e,t){var n=a(e.insertInto);if(!n)throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");var o=u[u.length-1];if("top"===e.insertAt)o?o.nextSibling?n.insertBefore(t,o.nextSibling):n.appendChild(t):n.insertBefore(t,n.firstChild),u.push(t);else if("bottom"===e.insertAt)n.appendChild(t);else{if("object"!=typeof e.insertAt||!e.insertAt.before)throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");var r=a(e.insertAt.before,n);n.insertBefore(t,r)}}function h(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e);var t=u.indexOf(e);t>=0&&u.splice(t,1)}function y(e){var t=document.createElement("style");if(void 0===e.attrs.type&&(e.attrs.type="text/css"),void 0===e.attrs.nonce){var o=function(){0;return n.nc}();o&&(e.attrs.nonce=o)}return g(t,e.attrs),m(e,t),t}function g(e,t){Object.keys(t).forEach((function(n){e.setAttribute(n,t[n])}))}function v(e,t){var n,o,r,s;if(t.transform&&e.css){if(!(s=t.transform(e.css)))return function(){};e.css=s}if(t.singleton){var i=d++;n=c||(c=y(t)),o=L.bind(null,n,i,!1),r=L.bind(null,n,i,!0)}else e.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=function(e){var t=document.createElement("link");return void 0===e.attrs.type&&(e.attrs.type="text/css"),e.attrs.rel="stylesheet",g(t,e.attrs),m(e,t),t}(t),o=S.bind(null,n,t),r=function(){h(n),n.href&&URL.revokeObjectURL(n.href)}):(n=y(t),o=C.bind(null,n),r=function(){h(n)});return o(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;o(e=t)}else r()}}e.exports=function(e,t){if("undefined"!=typeof DEBUG&&DEBUG&&"object"!=typeof document)throw new Error("The style-loader cannot be used in a non-browser environment");(t=t||{}).attrs="object"==typeof t.attrs?t.attrs:{},t.singleton||"boolean"==typeof t.singleton||(t.singleton=i()),t.insertInto||(t.insertInto="head"),t.insertAt||(t.insertAt="bottom");var n=b(e,t);return p(n,t),function(e){for(var o=[],r=0;r<n.length;r++){var i=n[r];(l=s[i.id]).refs--,o.push(l)}e&&p(b(e,t),t);for(r=0;r<o.length;r++){var l;if(0===(l=o[r]).refs){for(var a=0;a<l.parts.length;a++)l.parts[a]();delete s[l.id]}}}};var w,O=(w=[],function(e,t){return w[e]=t,w.filter(Boolean).join("\n")});function L(e,t,n,o){var r=n?"":o.css;if(e.styleSheet)e.styleSheet.cssText=O(t,r);else{var s=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(s,i[t]):e.appendChild(s)}}function C(e,t){var n=t.css,o=t.media;if(o&&e.setAttribute("media",o),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}function S(e,t,n){var o=n.css,r=n.sourceMap,s=void 0===t.convertToAbsoluteUrls&&r;(t.convertToAbsoluteUrls||s)&&(o=f(o)),r&&(o+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(r))))+" */");var i=new Blob([o],{type:"text/css"}),l=e.href;e.href=URL.createObjectURL(i),l&&URL.revokeObjectURL(l)}},function(e,t){e.exports=function(e){var t="undefined"!=typeof window&&window.location;if(!t)throw new Error("fixUrls requires window.location");if(!e||"string"!=typeof e)return e;var n=t.protocol+"//"+t.host,o=n+t.pathname.replace(/\/[^\/]*$/,"/");return e.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi,(function(e,t){var r,s=t.trim().replace(/^"(.*)"$/,(function(e,t){return t})).replace(/^'(.*)'$/,(function(e,t){return t}));return/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(s)?e:(r=0===s.indexOf("//")?s:0===s.indexOf("/")?n+s:o+s.replace(/^\.\//,""),"url("+JSON.stringify(r)+")")}))}},function(e,t,n){"use strict";n.r(t);const o={setCookie:function(e,t,n){var o="";if(void 0===n&&(n=14),n){var r=new Date;r.setTime(r.getTime()+24*n*60*60*1e3),o="; expires="+r.toUTCString()}document.cookie=e+"="+(t||"")+o+"; path=/"},getCookie:function(e){for(var t=e+"=",n=document.cookie.split(";"),o=0;o<n.length;o++){for(var r=n[o];" "===r.charAt(0);)r=r.substring(1,r.length);if(0===r.indexOf(t))return r.substring(t.length,r.length)}return null},eraseCookie:function(e){o.setCookie(e,null,0)}},r={bodyObject:null,init:function(){r.bodyObject=document.querySelector("body"),r.addOrToggleBodyClass("#menu-toggle",!1),r.addOrToggleBodyClass(".theme-selector",!0),r.addOrToggleBodyClass(".set-theme",!0),r.retrieveCookieOrHash(),window.setTimeout((function(){window.scrollTo(window.pageXOffset,window.pageYOffset+2),window.scrollTo(window.pageXOffset,window.pageYOffset-2)}),300),this.addBasicBodyClassListeners()},addBasicBodyClassListeners:function(){document.addEventListener("DOMContentLoaded",(function(e){r.bodyObject.classList.add("body-loaded"),"ontouchstart"in document.documentElement?r.bodyObject.classList.add("touch"):r.bodyObject.classList.add("no-touch"),r.addRocketMode()})),window.addEventListener("beforeunload",(function(){r.bodyObject.classList.add("body-unloaded")}))},retrieveCookieOrHash:function(){let e=r.getHashFromURL(),t="";if("reset"===e)o.eraseCookie("bodyClassClasses"),e="";else if(e)this.runClickForElement(e);else if(t=o.getCookie("bodyClassClasses"),t=String(t),t.length>0){const e=t.split(" ");for(let t=0;t<e.length;t++)this.runClickForElement(e[t])}else window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&this.runClickForElement("theme-moon")},runClickForElement:function(e){if("body-loaded"!==e&&"touch"!==e&&(e=e.trim()).length){const t=document.getElementById(e);t&&(this.removeBodyClassesBasedOnAttribute(t),r.bodyObject.classList.add(e))}},addOrToggleBodyClass:function(e,t){document.querySelectorAll(e).forEach((function(e){e.addEventListener("click",(function(n){return r.actionBodyClassChange(e,n,t),!1}))}))},actionBodyClassChange:function(e,t,n){t.preventDefault(),r.removeBodyClassesBasedOnAttribute(e);let s="",i="";if(e.hasAttribute("data-add-class")?s=e.getAttribute("data-add-class"):(s=e.getAttribute("id"),i=s),e.hasAttribute("data-toggle")?r.bodyObject.classList.toggle(s):r.bodyObject.classList.add(s),n&&(o.setCookie("bodyClassClasses",r.bodyObject.className,14),i)){let e=r.getHashFromString(i);e.length&&(e=e.replace("#",""),window.location.hash="#"+e)}},removeBodyClassesBasedOnAttribute:function(e){if(e.hasAttribute("data-remove-class")){const t=e.getAttribute("data-remove-class"),n=r.getClassesFromList(t);for(let e=0,t=n.length;e<t;e++){const t=n[e];r.bodyObject.classList.remove(t)}}},getClassesFromList:function(e){const t=e.split(","),n=[];for(let e=0,o=t.length;e<o;e++){const o=t[e].trim();o&&n.push(o)}return n},getHashFromURL:function(){const e=window.location.hash;return r.getHashFromString(e)},getHashFromString:function(e){return e=String(e),r.retrieveHasSignFromString(e)},retrieveHasSignFromString:function(e){return e.replace("#","")},addRocketMode:function(){const e=document.createElement("div");e.style.backgroundImage="url("+r.bodyObject.getAttribute("data-bg-image")+")",e.id="BackgroundImage";const t=r.bodyObject.firstChild;r.bodyObject.insertBefore(e,t)}};r.init();n(1),n(2),n(3),n(4)}]);
>>>>>>> bf2b35c4e0579b2d641b9e563420c6d5a8121200
>>>>>>> 2bc1f37c616e4f73e24dccbf72f23f34dbeaf3f9
