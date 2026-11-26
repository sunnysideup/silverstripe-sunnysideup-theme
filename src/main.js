// Entry point. Order matters only where noted.
//
//   1. state + theme   (set up <body> before anything is painted)
//   2. layout helpers  (hero background, scroll zones)
//   3. interaction     (menu, toc, forms, ...)

// 1. state + theme
import './js/body-state'
import './js/theme'

// 2. layout helpers
import './js/background'
import './js/scroll/zones'
import './js/scroll/direction'
import './js/hash-scroll'
import './js/images'

// 3. interaction
import './js/menu-toggle'
import './js/shiner'
import './js/toc'
import './js/collapsible-menu'
import './js/form'
import './js/work-example'
import './js/carousel'
import './js/print'
import './js/battery-saver'

// slideshow block (vendor) - JS + SCSS, only if the package is installed
const slideshow = import.meta.webpackContext('PROJECT_ROOT_DIR/vendor', {
  recursive: true,
  regExp: /^\.\/sunnysideup\/slideshowblock\/client\/src\/(main\.js|scss\/main\.scss)$/,
  exclude: /\/vendor\/(?!sunnysideup(\/slideshowblock(\/client(\/src(\/.*)?)?)?)?$)/,
});
slideshow.keys().forEach(slideshow);
