(self.webpackChunkpublic=self.webpackChunkpublic||[]).push([[143],{51:function(){(function(){function e(e){var t=e.closest(".collapsibleList");t&&(t.querySelectorAll(".collapsibleListOpen").length?t.classList.add("collapsibleListHasOpen"):t.classList.remove("collapsibleListHasOpen"))}function t(e,t){[].forEach.call(e.getElementsByTagName("li"),(function(s){if(!t||e===s.parentNode){s.style.userSelect="none",s.style.MozUserSelect="none",s.style.msUserSelect="none",s.style.WebkitUserSelect="none";var r=s.getElementsByTagName("ul");if(r.length>0){var i=document.createElement("span");i.classList.add("open-close"),i.addEventListener("click",o.bind(null,s)),i.innerHTML='<i class="open">↘</i><i class="closed">↖</i>',(s.classList.contains("section")||s.classList.contains("current"))&&n(s),n(s),s.insertBefore(i,r[0])}}}))}function o(e,t){for(var o=t.target;"LI"!==o.nodeName;)o=o.parentNode;o===e&&n(e)}function n(t){var o=t.classList.contains("collapsibleListClosed"),n=t.getElementsByTagName("ul");[].forEach.call(n,(function(e){for(var n=e;"LI"!==n.nodeName;)n=n.parentNode;n===t&&(e.style.display=o?"block":"none")})),t.classList.remove("collapsibleListOpen"),t.classList.remove("collapsibleListClosed"),n.length>0&&t.classList.add("collapsibleList"+(o?"Open":"Closed")),e(t)}return{apply:function(o){[].forEach.call(document.getElementsByTagName("ul"),(function(n){n.classList.contains("collapsibleList")&&(t(n,!0),o||[].forEach.call(n.getElementsByTagName("ul"),(function(e){e.classList.add("collapsibleList")})),e(n))}))},applyTo:t}})().apply()},376:function(){(function(){var e=document.querySelector("#footer");new window.IntersectionObserver((function(e){e.forEach((function(e){document.querySelector("body").classList.toggle("footer-visible",e.intersectionRatio>=1)}))}),{root:null,rootMargin:"50%",threshold:1}).observe(e)})()},701:function(){for(var e=document.querySelectorAll("input, select, textarea"),t=e.length-1;t>=0;--t){e[t].addEventListener("change",n,!1),e[t].addEventListener("keyup",n,!1),e[t].addEventListener("focus",n,!1),e[t].addEventListener("blur",n,!1),e[t].addEventListener("mousedown",n,!1);var o=document.createEvent("HTMLEvents");o.initEvent("change",!1,!0),e[t].dispatchEvent(o)}function n(e){var t=e.target.value;t&&t.replace(/^\s+|\s+$/g,"")?e.target.classList.remove("no-value"):e.target.classList.add("no-value")}},55:function(){var e={resetTimeout:null,init:function(){var e=this;document.querySelectorAll(".image-container").forEach((function(t){t.addEventListener("mousemove",(function(t){e.isTouchDevice()&&clearTimeout(e.resetTimeout);var o=t.target.getBoundingClientRect(),n=o.width,s=o.height,r=o.left,i=o.top,l=t.pageX-r-window.scrollX,c=t.pageY-i-window.scrollY;t.target.style.setProperty("--mouse-x",l/n*50-25),t.target.style.setProperty("--mouse-y",25-c/s*50),e.isTouchDevice()&&(e.resetTimeout=setTimeout((function(){t.target.style.removeProperty("--mouse-x"),t.target.style.removeProperty("--mouse-y")}),1e3))}))}))},isTouchDeviceVar:null,isTouchDevice:function(){return null===this.isTouchDeviceVar&&(this.isTouchDeviceVar="ontouchstart"in document.documentElement||"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0),this.isTouchDeviceVar}};document.addEventListener("DOMContentLoaded",(function(){e.init()}))},711:function(){!function(){for(var e,t,o=document.querySelectorAll(".typography img"),n=0;n<o.length;n++){var s=document.createElement("div");s.setAttribute("class","image-container");var r=o[n];t=s,(e=r).parentNode.insertBefore(t,e),t.appendChild(e)}}()},279:function(){(function(){var e=function(e){document.querySelector("body").classList.toggle("mouse-over-logo","mouseenter"===e.type)},t=document.getElementById("logo");t.addEventListener("mouseenter",e),t.addEventListener("mouseleave",e)})()},39:function(){var e={microSecondsBeforeJustScrollledRemoved:5e3,minScrollForAction:2,minScrollDownToBeProperScroll:100,normalTransitionDuration:0,themeTransitionDuration:"1.5s",newScroll:0,minimumScrollForThemeSwitch:20,lastScroll:0,didScroll:0,bodyObject:null,timeOutFx:null,justScrolledFx:null,scrolledUpClass:"scrolled-up",scrolledDownClass:"scrolled-down",init:function(){e.bodyObject=document.querySelector("body"),e.scrollListener(),e.scrollUpOrDown(),e.lastScroll=e.currentScroll(),window.setTimeout((function(){window.scrollTo(window.scrollX,e.currentScroll()-e.minScrollForAction-1)}),50),e.footerHeight=document.querySelector("footer").offsetHeight/2,e.normalTransitionDuration=e.bodyObject.style.transitionDuration},getTheme:function(){return new String(e.bodyObject.getAttribute("data-theme"))},currentScroll:function(){return parseInt(window.scrollY||document.documentElement.scrollTop)},scrollListener:function(){var t=null;window.addEventListener("scroll",(function(){window.clearTimeout(e.timeOutFx),window.clearTimeout(e.justScrolledFx);var o=e.getTheme();e.newScroll=e.currentScroll();window.innerHeight,document.documentElement.scrollHeight;if(window.innerWidth>768){var n=document.querySelector(".main-quote");if(!n)return;var s=Math.min(window.scrollY,25*window.innerHeight/100);n.style.marginTop="".concat(s,"px")}var r=e.bodyObject.classList.contains("footer-visible"),i=e.newScroll<e.minimumScrollForThemeSwitch;i?e.bodyObject.classList.remove("past-header"):e.bodyObject.classList.add("past-header"),i||r?!0!==t&&(e.bodyObject.style.transitionDuration=e.themeTransitionDuration,e.bodyObject.classList.remove(o),e.bodyObject.classList.add("theme-rocket"),e.bodyObject.style.transitionSpeed=e.normalTransitionDuration,t=!0):!1!==t&&(e.bodyObject.style.transitionDuration=e.themeTransitionDuration,e.bodyObject.classList.add(o),e.bodyObject.classList.remove("theme-rocket"),e.bodyObject.style.transitionSpeed=e.normalTransitionDuration,t=!1),e.didScroll=!0,e.scrollUpOrDown()}))},scrollUpOrDown:function(){e.timeOutFx=window.setTimeout((function(){if(e.didScroll){if(e.didScroll=!1,e.newScroll=window.scrollY,Math.abs(e.lastScroll-e.newScroll)<=e.minScrollForAction)return;e.newScroll>e.lastScroll+e.minScrollDownToBeProperScroll?(e.bodyObject.classList.remove(e.scrolledUpClass),e.bodyObject.classList.add(e.scrolledDownClass)):e.newScroll<e.lastScroll&&(e.bodyObject.classList.add(e.scrolledUpClass),e.bodyObject.classList.remove(e.scrolledDownClass),e.bodyObject.classList.add("just-scrolled"),e.justScrolledFx=window.setTimeout((function(){e.bodyObject.classList.remove("just-scrolled")}),e.microSecondsBeforeJustScrollledRemoved)),e.lastScroll=e.newScroll}}),100)}};e.init()},907:function(){document.addEventListener("DOMContentLoaded",(function(){var e=document.querySelector("body");"#toc"===window.location.hash&&e.classList.contains("toc-off")&&e.classList.contains("has-toc")&&(e.classList.toggle("toc-on"),e.classList.toggle("toc-off")),function(){var t=document.querySelectorAll("#content-below-quote h1, #content-below-quote h2");if(t.length>1){e.classList.add("has-toc"),e.classList.add("toc-off");for(var o=0,n=0;n<t.length;n++){o=n+1;var s=t[n],r=s.previousElementSibling;r&&r.classList.add("bottom-space"),s.id="toc-"+o,s.classList.add("countable-icons"),s.classList.add("icon-"+o);var i=document.createElement("span");i.classList.add("open-close"),i.classList.add("icon");var l=document.createElement("span");l.classList.add("active-holder"),i.innerHTML='<i class="open">+</i><i class="closed">–</i>',l.innerHTML='<i class="active">▂</i>',s.insertBefore(i,s.firstChild),s.appendChild(l),s.addEventListener("click",(function(t){t.preventDefault(),e.classList.toggle("toc-on"),e.classList.toggle("toc-off");for(var o=this.id,n=document.querySelectorAll("#content-below-quote .toc-active"),s=0;s<n.length;s++){n[s].classList.remove("toc-active")}return t.target.classList.toggle("toc-active"),!1===e.classList.contains("toc-on")?(window.location.hash=o,window.setTimeout((function(){document.querySelector("#"+o).scrollIntoView({behavior:"smooth",block:"start"})}),100)):window.setTimeout((function(){document.querySelector("#my-quote").scrollIntoView({behavior:"smooth",block:"start"})}),100),!1}),!1)}}}()}))},605:function(e,t,o){"use strict";var n={setCookie:function(e,t,o){var n="";if(void 0===o&&(o=14),o){var s=new Date;s.setTime(s.getTime()+24*o*60*60*1e3),n="; expires="+s.toUTCString()}document.cookie=e+"="+(t||"")+n+"; path=/"},getCookie:function(e){for(var t=e+"=",o=document.cookie.split(";"),n=0;n<o.length;n++){for(var s=o[n];" "===s.charAt(0);)s=s.substring(1,s.length);if(0===s.indexOf(t))return s.substring(t.length,s.length)}return null},eraseCookie:function(e){n.setCookie(e,null,0)}},s={bodyObject:null,init:function(){s.bodyObject=document.querySelector("body"),s.addOrToggleBodyClass("#menu-toggle",!1),s.addOrToggleBodyClass(".theme-selector",!0),s.retrieveCookieOrHash(),this.scrollStart(),this.addBasicBodyClassListeners()},addBasicBodyClassListeners:function(){document.addEventListener("DOMContentLoaded",(function(e){s.bodyObject.classList.add("body-loaded"),s.bodyObject.classList.remove("body-unloaded"),"ontouchstart"in document.documentElement?s.bodyObject.classList.add("touch"):s.bodyObject.classList.add("no-touch"),s.addRocketMode()})),window.addEventListener("beforeunload",(function(){}))},retrieveCookieOrHash:function(){var e=s.getHashFromURL(),t="";"reset"===e?n.eraseCookie("preferredTheme"):e&&this.runClickForElement(e),"theme-moon"!==e&&"theme-sun"!==e&&((t=n.getCookie("preferredTheme"))?s.bodyObject.setAttribute("data-theme",t):s.userPrefersDarkTheme()&&s.bodyObject.setAttribute("data-theme","theme-moon"))},userPrefersDarkTheme:function(){return window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches},runClickForElement:function(e){if((e=e.trim()).length){var t=document.getElementById(e);if(t&&t.classList.contains("theme-selector"))return this.removeBodyClassesBasedOnAttribute(t),s.bodyObject.classList.add(e),!0}return!1},addOrToggleBodyClass:function(e,t){document.querySelectorAll(e).forEach((function(e){e.addEventListener("click",(function(o){return s.actionBodyClassChange(e,o,t),!1}))}))},scrollStart:function(){window.setTimeout((function(){window.scrollTo(window.scrollX,window.scrollY+2),window.scrollTo(window.scrollX,window.scrollY-2);var e=s.getHashFromURL();e&&document.getElementById(e)&&document.querySelector("#"+e).scrollIntoView({behavior:"smooth",block:"start"})}),300)},actionBodyClassChange:function(e,t,o,r){t.preventDefault(),s.removeBodyClassesBasedOnAttribute(e);var i="",l="";if(e.hasAttribute("data-add-class")?i=e.getAttribute("data-add-class"):l=i=e.getAttribute("id"),e.hasAttribute("data-toggle-rather-than-add")?s.bodyObject.classList.toggle(i):s.bodyObject.classList.add(i),o&&(n.setCookie("preferredTheme",i,14),s.bodyObject.setAttribute("data-theme",i)),l&&r){var c=s.getHashFromString(l);c.length&&(c=c.replace("#",""),window.location.hash="#"+c)}},removeBodyClassesBasedOnAttribute:function(e){if(e.hasAttribute("data-remove-class"))for(var t=e.getAttribute("data-remove-class"),o=s.getClassesFromList(t),n=0,r=o.length;n<r;n++){var i=o[n];s.bodyObject.classList.remove(i)}},getClassesFromList:function(e){for(var t=e.split(","),o=[],n=0,s=t.length;n<s;n++){var r=t[n].trim();r&&o.push(r)}return o},getHashFromURL:function(){var e=window.location.hash;return s.getHashFromString(e)},getHashFromString:function(e){return e=String(e),s.retrieveHasSignFromString(e)},retrieveHasSignFromString:function(e){return e.replace("#","")},addRocketMode:function(){var e=document.createElement("div"),t=s.bodyObject.getAttribute("data-shadow-over-logo"),o="";"dark"===t?o="linear-gradient(258deg, #00000030 30%, transparent 60%), ":"light"===t&&(o="linear-gradient(258deg, #FFFFFF30 30%, transparent 60%), "),e.style.backgroundImage=o+"url("+s.bodyObject.getAttribute("data-bg-image")+")",e.id="BackgroundImage";var n=s.bodyObject.firstChild;s.bodyObject.insertBefore(e,n)},isHomePage:function(){return"/"===window.location.pathname},hasFragment:function(){return""!==window.location.hash}};s.init();o(907),o(51),o(39),o(376),o(701),o(279),o(711),o(55)}},function(e){var t;t=605,e(e.s=t)}]);