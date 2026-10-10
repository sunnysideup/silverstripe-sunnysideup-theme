(function initSketchBorders() {
  if (!window.matchMedia('(min-width: 900px)').matches) return;
  const num = (val, fallback = 0) => {
    if (!val) return fallback;
    const n = parseFloat(val.toString().trim().split(/\s+/)[0]);
    return Number.isNaN(n) ? fallback : n;
  };

  const VOID_TAGS = new Set(['INPUT', 'TEXTAREA', 'SELECT', 'IMG']);

  /**
   * Generates a multi-wave Quadratic Bézier SVG path string,
   * dynamically scaling wave count and depth based on line length.
   */
  function buildSidePath(x1, y1, x2, y2, requestedWaves, configuredDepth, seeds) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    if (len === 0) return '';

    // --- DYNAMIC LENGTH-ADAPTIVE WRIGGLINESS ---
    let waves = requestedWaves;
    let depth = configuredDepth;

    if (len < 60) {
      // Very short lines (e.g. input field height ~30-40px)
      waves = 1; // Single clean arc
      depth = Math.min(configuredDepth, Math.max(1, len * 0.04)); // Subtle 1px - 1.5px peak
    } else if (len < 200) {
      // Medium lines
      waves = Math.min(requestedWaves, 2);
      depth = Math.min(configuredDepth, Math.max(1.5, len * 0.025));
    } else if (len > 500) {
      // Very long spans (e.g. wide fieldsets / middleColumn)
      depth = configuredDepth * 1.15; // Slightly deeper bow for wide spans
    }

    if (waves <= 0) return `M ${x1.toFixed(1)},${y1.toFixed(1)} L ${x2.toFixed(1)},${y2.toFixed(1)} `;

    const nx = -dy / len;
    const ny = dx / len;
    let d = `M ${x1.toFixed(1)},${y1.toFixed(1)} `;
    const dt = 1 / waves;

    for (let i = 0; i < waves; i++) {
      const s = seeds[i] || { dir: 1, factor: 1 };
      const sx = x1 + dx * (i * dt);
      const sy = y1 + dy * (i * dt);
      const ex = x1 + dx * ((i + 1) * dt);
      const ey = y1 + dy * ((i + 1) * dt);

      const mx = (sx + ex) / 2;
      const my = (sy + ey) / 2;
      const peak = depth * s.factor * s.dir;

      const cx = mx + nx * peak;
      const cy = my + ny * peak;

      d += `Q ${cx.toFixed(1)},${cy.toFixed(1)} ${ex.toFixed(1)},${ey.toFixed(1)} `;
    }
    return d;
  }

  function getSideSeed(rawWaves) {
    let waves = 1;
    const parsed = parseInt(rawWaves, 10);
    if (!Number.isNaN(parsed) && parsed >= 1) {
      waves = Math.min(3, parsed);
    } else {
      waves = Math.floor(Math.random() * 3) + 1;
    }

    const seeds = [];
    let dir = Math.random() < 0.5 ? 1 : -1;
    for (let i = 0; i < 3; i++) {
      seeds.push({ dir, factor: 0.75 + Math.random() * 0.5 });
      dir *= -1;
    }
    return { waves, seeds };
  }

  function renderBorder(el, targetType = 'main') {
    const isPseudo = targetType !== 'main';
    const pseudoSel = isPseudo ? `::${targetType}` : null;
    const style = isPseudo ? window.getComputedStyle(el, pseudoSel) : window.getComputedStyle(el);

    const color = (style.getPropertyValue('--sketch-color') || '').trim();
    if (!color) return;
    if (isPseudo && (style.content === 'none' || style.display === 'none')) return;

    const depth = num(style.getPropertyValue('--sketch-depth'), 4);
    const rawWaves = (style.getPropertyValue('--sketch-waves') || '').trim();
    const inset = num(style.getPropertyValue('--sketch-inset'), 0);

    const topW = num(style.getPropertyValue('--sketch-top'), 0);
    const rightW = num(style.getPropertyValue('--sketch-right'), 0);
    const bottomW = num(style.getPropertyValue('--sketch-bottom'), 0);
    const leftW = num(style.getPropertyValue('--sketch-left'), 0);
    const strokeW = Math.max(topW, rightW, bottomW, leftW, 2);

    const sides = { top: topW > 0, right: rightW > 0, bottom: bottomW > 0, left: leftW > 0 };
    const isVoid = VOID_TAGS.has(el.tagName);
    const container = isVoid ? el.parentElement : el;
    if (!container) return;

    if (!isPseudo && window.getComputedStyle(container).position === 'static') {
      container.style.position = 'relative';
    }

    if (!el._sketchState) el._sketchState = {};
    if (!el._sketchState[targetType]) {
      el._sketchState[targetType] = {
        top: getSideSeed(rawWaves),
        right: getSideSeed(rawWaves),
        bottom: getSideSeed(rawWaves),
        left: getSideSeed(rawWaves)
      };
    }
    const state = el._sketchState[targetType];

    const overlayClass = isPseudo ? `curved-border-overlay--${targetType}` : 'curved-border-overlay';
    let svg = isVoid ? el.nextElementSibling : container.querySelector(`:scope > .${overlayClass}`);

    if (!svg || !svg.classList.contains(overlayClass)) {
      svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.className.baseVal = `curved-border-overlay ${overlayClass}`;
      svg.style.cssText = 'position:absolute;pointer-events:none;z-index:10;overflow:visible;top:0;left:0;';

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke-linecap', 'round');
      path.setAttribute('stroke-linejoin', 'round');
      svg.appendChild(path);

      if (isVoid) el.insertAdjacentElement('afterend', svg);
      else container.appendChild(svg);
    }

    const path = svg.querySelector('path');
    path.setAttribute('stroke', color);
    path.setAttribute('stroke-width', strokeW);

    function updatePath() {
      const cRect = container.getBoundingClientRect();

      let x = 0;
      let y = 0;
      let w = el.offsetWidth || 0;
      let h = el.offsetHeight || 0;

      if (isVoid) {
        const eRect = el.getBoundingClientRect();
        x = eRect.left - cRect.left;
        y = eRect.top - cRect.top;
        w = eRect.width;
        h = eRect.height;
      } else if (isPseudo) {
        x = num(style.left, 0) + num(style.marginLeft, 0);
        y = num(style.top, 0) + num(style.marginTop, 0);

        const compW = style.getPropertyValue('width');
        const compH = style.getPropertyValue('height');
        const parsedW = num(compW, -1);
        const parsedH = num(compH, -1);

        const realW = cRect.width || container.offsetWidth;
        const realH = cRect.height || container.offsetHeight;

        w = parsedW >= 0 ? parsedW : realW;
        h = parsedH >= 0 ? parsedH : realH;
      } else {
        w = cRect.width || w;
        h = cRect.height || h;
      }

      x -= inset;
      y -= inset;
      w += inset * 2;
      h += inset * 2;

      if (w <= 0 || h <= 0) return;

      const pad = strokeW + Math.abs(depth) + 6;
      const topOffset = y - pad;
      const leftOffset = x - pad;
      const svgW = w + pad * 2;
      const svgH = h + pad * 2;

      svg.style.top = `${topOffset}px`;
      svg.style.left = `${leftOffset}px`;
      svg.style.width = `${svgW}px`;
      svg.style.height = `${svgH}px`;
      svg.setAttribute('viewBox', `0 0 ${svgW} ${svgH}`);

      const x0 = pad, y0 = pad;
      const x1 = pad + w, y1 = pad + h;

      let d = '';
      if (sides.top)    d += buildSidePath(x0, y0, x1, y0, state.top.waves, depth, state.top.seeds);
      if (sides.right)  d += buildSidePath(x1, y0, x1, y1, state.right.waves, depth, state.right.seeds);
      if (sides.bottom) d += buildSidePath(x1, y1, x0, y1, state.bottom.waves, depth, state.bottom.seeds);
      if (sides.left)   d += buildSidePath(x0, y1, x0, y0, state.left.waves, depth, state.left.seeds);

      path.setAttribute('d', d.trim());
    }

    updatePath();

    if (!el._sketchObservers) el._sketchObservers = {};
    if (!el._sketchObservers[targetType]) {
      el._sketchObservers[targetType] = new ResizeObserver(updatePath);
      el._sketchObservers[targetType].observe(el);
    }
  }

  function scan() {
    // YOUR CUSTOM SELECTOR
    const selector = '[class*="sketch"], [data-sketch], h2, fieldset, .middleColumn, input[type="submit"]';
    document.querySelectorAll(selector).forEach(el => {
      renderBorder(el, 'main');
      renderBorder(el, 'before');
      renderBorder(el, 'after');
    });
  }

  // --- ANIMATION & RESIZE TRACKING LOOP ---
  let keepAliveUntil = 0;
  let animFrameId = null;

  function triggerAnimationTracking(ms = 800) {
    keepAliveUntil = Math.max(keepAliveUntil, performance.now() + ms);
    if (!animFrameId) {
      loop();
    }
  }

  function loop() {
    scan();
    if (performance.now() < keepAliveUntil) {
      animFrameId = requestAnimationFrame(loop);
    } else {
      animFrameId = null;
    }
  }

  // Triggers for animations, hovers, layout updates, and focus
  ['transitionstart', 'transitionrun', 'animationstart'].forEach(evt => {
    window.addEventListener(evt, () => triggerAnimationTracking(1200), { capture: true, passive: true });
  });

  ['transitionend', 'animationend', 'transitioncancel', 'animationcancel'].forEach(evt => {
    window.addEventListener(evt, () => triggerAnimationTracking(200), { capture: true, passive: true });
  });

  ['pointerenter', 'pointerleave', 'click', 'focusin', 'focusout'].forEach(evt => {
    window.addEventListener(evt, () => triggerAnimationTracking(600), { capture: true, passive: true });
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => triggerAnimationTracking(600));
  } else {
    triggerAnimationTracking(600);
  }

  window.addEventListener('load', () => triggerAnimationTracking(600));

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => triggerAnimationTracking(400));
  }

  const observer = new MutationObserver(() => triggerAnimationTracking(600));
  observer.observe(document.body, { childList: true, subtree: true });
})();
