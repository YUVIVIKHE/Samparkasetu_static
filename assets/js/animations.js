/* =========================================================
   Samparkasetu — Animations Engine (vanilla ES6)
   ========================================================= */
(() => {
  'use strict';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = window.matchMedia('(hover: none)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Page Loader ---------- */
  window.addEventListener('load', () => {
    const loader = $('#pageLoader');
    if (!loader) return;
    setTimeout(() => loader.classList.add('hidden'), reduce ? 0 : 600);
  });

  /* ---------- Scroll Progress ---------- */
  const progress = $('#scrollProgress');
  const onScrollProgress = () => {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  };

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  const revealEls = $$('.reveal, .card-grid, .ai-grid, .industry-grid, .benefit-grid, .testimonial-grid, .timeline, .stats-grid, .chip-grid');
  if (reduce) {
    revealEls.forEach((el) => el.classList.add('in-view'));
  } else {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        // staggered children
        const kids = el.matches('.card-grid, .ai-grid, .industry-grid, .benefit-grid, .testimonial-grid, .timeline, .stats-grid, .chip-grid')
          ? [...el.children] : [];
        kids.forEach((k, i) => { k.style.transitionDelay = (i * 60) + 'ms'; });
        el.classList.add('in-view');
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Animated Counters ---------- */
  const animateCounter = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const dur = 1800;
    const start = performance.now();
    const fmt = (n) => {
      if (target >= 1000) return Math.round(n).toLocaleString('en-IN');
      return Math.round(n).toString();
    };
    if (reduce) { el.textContent = prefix + fmt(target) + suffix; return; }
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = prefix + fmt(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = prefix + fmt(target) + suffix;
    };
    requestAnimationFrame(tick);
  };
  const counters = $$('.counter');
  const countObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { animateCounter(e.target); obs.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  counters.forEach((c) => countObs.observe(c));

  /* ---------- Typewriter (eyebrow rotating phrases) ---------- */
  const twTarget = $('.tw-text');
  if (twTarget && !reduce) {
    const phrases = ["India's AgriTech Operating System", 'AI for the entire agri-ecosystem', 'One platform · Every stakeholder'];
    twTarget.textContent = '';                  // clear the static seed text
    const textNode = document.createTextNode('');
    twTarget.appendChild(textNode);
    const caret = document.createElement('span');
    caret.className = 'tw-caret';
    twTarget.appendChild(caret);
    let pi = 0, ci = 0, deleting = false;
    const type = () => {
      const word = phrases[pi];
      ci += deleting ? -1 : 1;
      textNode.textContent = word.slice(0, ci);
      let delay = deleting ? 35 : 70;
      if (!deleting && ci === word.length) { delay = 2200; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; delay = 400; }
      setTimeout(type, delay);
    };
    setTimeout(type, 1400);
  }

  /* ---------- Parallax Hero shapes ---------- */
  const shapes = $$('.hero-bg .float-shape');
  const heroCard = $('.hero-card');

  /* ---------- Mouse Glow + Cursor + Magnetic ---------- */
  const glow = $('#mouseGlow');
  const dot = $('#cursorDot');
  const ring = $('#cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;
  let cursorReady = false;

  if (!isTouch && !reduce) {
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      // First real movement: snap ring to pointer and reveal cursor (avoids 0,0 park)
      if (!cursorReady) {
        cursorReady = true;
        rx = mx; ry = my;
        document.body.classList.add('cursor-active');
      }
      glow.classList.add('active');
      glow.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    }, { passive: true });

    // Hide cursor + glow when pointer leaves the window (no orphan ring on dark sections)
    document.addEventListener('mouseleave', () => {
      document.body.classList.remove('cursor-active');
      glow.classList.remove('active');
    });
    document.addEventListener('mouseenter', () => {
      if (cursorReady) document.body.classList.add('cursor-active');
    });

    // smooth-trailing ring (only animates once the cursor is ready)
    const ringLoop = () => {
      if (cursorReady) {
        rx += (mx - rx) * 0.18; ry += (my - ry) * 0.18;
        ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(ringLoop);
    };
    requestAnimationFrame(ringLoop);

    // ring hover state on interactive elements
    $$('a, button, .card, .eco-chip, .industry-card').forEach((el) => {
      el.addEventListener('mouseenter', () => ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
    });

    // Magnetic buttons
    $$('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });

    // Card spotlight follow
    $$('.card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  }

  /* ---------- Combined scroll handler (rAF-throttled) ---------- */
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      onScrollProgress();
      if (!reduce) {
        const y = window.scrollY;
        shapes.forEach((s, i) => { s.style.transform = `translateY(${y * (0.06 + i * 0.03)}px)`; });
        if (heroCard && y < 900) heroCard.style.transform = `translateY(${y * -0.04}px)`;
      }
      ticking = false;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScrollProgress();
})();
