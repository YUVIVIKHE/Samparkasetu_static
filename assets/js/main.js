/* =========================================================
   Samparkasetu — Main App Logic (vanilla ES6)
   ========================================================= */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ============ SVG icons (no emoji) ============ */
  const svg = (paths, view = '0 0 24 24') =>
    `<svg class="ic" viewBox="${view}" width="22" height="22" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;

  const I = {
    crm: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    target: svg('<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>'),
    users: svg('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>'),
    building: svg('<rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22V12h6v10"/><path d="M8 6h.01M16 6h.01M8 10h.01M16 10h.01M8 14h.01M16 14h.01"/>'),
    chart: svg('<path d="M3 3v18h18"/><path d="M7 14l4-4 4 4 5-6"/>'),
    phone: svg('<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>'),
    bot: svg('<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M12 2v6"/><circle cx="9" cy="14" r="1"/><circle cx="15" cy="14" r="1"/><path d="M8 20v2M16 20v2"/>'),
    refresh: svg('<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>'),
    tractor: svg('<path d="M3 17a3 3 0 1 0 6 0"/><path d="M15 17a4 4 0 1 0 8 0"/><path d="M3 12h5l2-5h6l3 5h2"/><path d="M10 7V5h4"/>'),
    droplet: svg('<path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>'),
    sun: svg('<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>'),
    leaf: svg('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>'),
    store: svg('<path d="M3 9l1-4h16l1 4"/><path d="M3 9v11a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V9"/><path d="M9 22V12h6v10"/>'),
    star: `<svg class="ic" viewBox="0 0 24 24" width="14" height="14" aria-hidden="true" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  };

  /* ============ Content Data ============ */
  const modules = [
    [I.crm, 'Dealer CRM', 'Manage every dealer relationship, pipeline and follow-up in one place.'],
    [I.target, 'Lead Management', 'Capture, route and qualify leads automatically across channels.'],
    [I.users, 'Farmer Network', 'A connected community of farmers, FPOs and service buyers.'],
    [I.building, 'OEM Dashboard', 'Real-time visibility into dealers, demand and field performance.'],
    [I.chart, 'Analytics', 'Actionable insights on sales, regions, products and trends.'],
    [I.phone, 'Mobile App', 'Run your agri-business on the go, even in low-connectivity areas.'],
    [I.bot, 'AI Assistant', 'Conversational AI that handles enquiries and recommends actions.'],
    [I.refresh, 'Old Equipment Marketplace', 'A trusted resale ecosystem for pre-owned machinery.'],
  ];

  const aiFeatures = [
    ['One-Click Call', 'Connect with any lead in a single tap — no dialling, no delays.'],
    ['Prequalified Leads', 'AI scores and filters leads by intent, region and product fit before they reach you.'],
    ['Instant WhatsApp Alerts', 'Get a real-time WhatsApp notification the moment a new lead comes in.'],
    ['Agent App', 'A dedicated mobile app for your team to manage day-to-day follow-ups on the go.'],
    ['Smart Dealer Matching', 'Connects every enquiry to the right dealer instantly.'],
    ['Predictive Analytics', 'Forecasts demand, churn and sales opportunities.'],
    ['Voice AI', 'Voice-first interactions for low-literacy and field use.'],
    ['Regional Language Support', 'Understands and responds in major Indian languages.'],
  ];

  const industries = [
    [I.tractor, 'Agriculture Machinery'], [I.droplet, 'Irrigation'],
    [I.sun, 'Solar'], [I.leaf, 'FPOs'],
  ];

  const benefits = [
    [I.users, 'Farmers', 'Discover trusted dealers, services, finance and the best prices.'],
    [I.store, 'Dealers', 'More qualified leads, faster conversions and loyal customers.'],
    [I.building, 'Manufacturers', 'Direct line of sight into demand, dealers and field data.'],
  ];

  const steps = [
    ['Register', 'Create your account and set up your agri-business profile in minutes — no paperwork, no waiting.'],
    ['Connect', 'Link with farmers, dealers, OEMs and partners across India\'s agriculture ecosystem instantly.'],
    ['Get Leads', 'AI captures, qualifies and routes high-intent leads straight to your dashboard in real time.'],
    ['Manage Leads', 'Track every lead through your pipeline, assign follow-ups and close deals from one place.'],
    ['Grow Business', 'Use analytics, AI insights and the full Samparkasetu network to scale your agri-business.'],
  ];

  const faqs = [
    ['Is Samparkasetu only for tractors and machinery?', 'No. Samparkasetu is the digital operating system for the entire agriculture ecosystem — covering inputs, irrigation, dairy, livestock, solar, finance, insurance, services and marketplaces, not just machinery.'],
    ['Who can use the platform?', 'Farmers, dealers, manufacturers, distributors, banks, NBFCs, insurers, agri-businesses, FPOs, NGOs and government agencies — each gets tools tailored to their role.'],
    ['Does it support regional languages?', 'Yes. Our AI understands and responds in major Indian languages, with voice support designed for field and low-literacy use.'],
    ['How does the AI generate and qualify leads?', 'The AI captures enquiries across WhatsApp, web and voice, scores them by intent and product fit, then routes each to the best-matched dealer instantly.'],
    ['Is there a mobile app?', 'Yes. The mobile app is built for on-the-go use and works reliably even in low-connectivity rural areas.'],
    ['How do I get started?', 'Click “Get Started” or “Request Demo”. Our team will help you onboard your business and connect to the ecosystem quickly.'],
  ];

  /* ============ Renderers ============ */
  const esc = (s) => s.replace(/[&<>"]/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]));
  const render = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };

  render('#modulesGrid',
    `<div class="swipe-track" id="modulesTrack">${
      modules.map(([i, t, d]) =>
        `<article class="card swipe-card"><div class="card-ic">${i}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`
      ).join('')
    }</div><div class="swipe-dots" id="modulesDots"></div>`);

  render('#aiGrid',
    `<div class="swipe-track" id="aiTrack">${
      aiFeatures.map(([t, d]) =>
        `<article class="ai-card swipe-card"><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`
      ).join('')
    }</div><div class="swipe-dots" id="aiDots"></div>`);

  render('#industryGrid',
    `<div class="swipe-track" id="industryTrack">${
      industries.map(([i, t]) =>
        `<div class="industry-card swipe-card"><span class="ind-ic">${i}</span><span>${esc(t)}</span></div>`
      ).join('')
    }</div><div class="swipe-dots" id="industryDots"></div>`);

  render('#benefitGrid',
    `<div class="swipe-track" id="benefitTrack">${
      benefits.map(([i, t, d]) =>
        `<article class="benefit-card swipe-card"><div class="b-top"><div class="b-ic">${i}</div><h3>${esc(t)}</h3></div><p>${esc(d)}</p></article>`
      ).join('')
    }</div><div class="swipe-dots" id="benefitDots"></div>`);

  render('#timeline', steps.map(([t, d], n) =>
    `<li><span class="tl-num">${n + 1}</span><div class="tl-body"><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join(''));

  // Testimonials live in index.html (6 cards) — skip if already present
  const testimonialGrid = $('#testimonialGrid');
  if (testimonialGrid && !testimonialGrid.querySelector('.testimonial')) {
    const testimonials = [
      ['The prequalified leads save us hours every day. We only call farmers who are genuinely ready to buy, and our conversions have shot up.', 'Jeevan Agro Enterprises', 'Powertrac Dealer', 'JA'],
      ['One-click calling and instant WhatsApp alerts mean we never miss an enquiry. Samparkasetu has changed how our showroom runs.', 'Lokesh RS Tractors', 'Powertrac Dealer', 'LR'],
      ['The dealer matching is brilliant — every lead that reaches us is the right fit. Our Mahindra sales pipeline has never been this organised.', 'Maruti Motors', 'Mahindra Dealer', 'MM'],
      ['The agent app keeps my whole team on track with daily follow-ups. Nothing slips through the cracks anymore.', 'Radha Enterprises', 'Farmtrac Dealer', 'RE'],
      ['From lead capture to closing, the entire journey is now digital. Samparkasetu is the backbone our dealership needed.', 'Shri Ranganatha Motors', 'Mahindra Dealer', 'SR'],
      ['Regional language support helps us reach farmers who never used an app before. Enquiries are clearer and follow-ups are faster.', 'Sri Venkateshwara Tractors', 'Sonalika Dealer', 'SV'],
    ];
    const stars = Array(5).fill(I.star).join('');
    render('#testimonialGrid',
      `<div class="swipe-track" id="testimonialTrack">${
        testimonials.map(([q, a, r, av]) =>
          `<article class="testimonial swipe-card"><div class="t-stars" aria-label="5 out of 5 stars">${stars}</div>
            <p class="t-quote">"${esc(q)}"</p>
            <div class="t-author"><div class="t-avatar">${esc(av)}</div><div><b>${esc(a)}</b><small>${esc(r)}</small></div></div>
          </article>`
        ).join('')
      }</div>`);
  }

  render('#faqList', faqs.map(([q, a], i) =>
    `<div class="faq-item"><button class="faq-q" aria-expanded="false" aria-controls="faqa${i}">
      <span>${esc(q)}</span><span class="faq-icon" aria-hidden="true"></span></button>
      <div class="faq-a" id="faqa${i}" role="region"><p>${esc(a)}</p></div></div>`).join(''));

  // FAQ structured data (injected to keep HTML lean)
  const faqLd = document.createElement('script');
  faqLd.type = 'application/ld+json';
  faqLd.textContent = JSON.stringify({
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: faqs.map(([q, a]) => ({
      '@type': 'Question', name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  });
  document.head.appendChild(faqLd);

  /* ============ FAQ Accordion ============ */
  $$('.faq-item').forEach((item) => {
    const btn = $('.faq-q', item);
    const panel = $('.faq-a', item);
    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', open);
      panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0';
      // close siblings (single-open accordion)
      $$('.faq-item').forEach((other) => {
        if (other !== item && other.classList.contains('open')) {
          other.classList.remove('open');
          $('.faq-q', other).setAttribute('aria-expanded', 'false');
          $('.faq-a', other).style.maxHeight = '0';
        }
      });
    });
  });

  /* ============ Navbar scroll state ============ */
  const navbar = $('#navbar');
  const backTop = $('#backToTop');
  const navAnchors = $$('.nav-links a');
  const sections = navAnchors.map((a) => $(a.getAttribute('href'))).filter(Boolean);

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 20);
    backTop.classList.toggle('show', y > 600);
    // active link
    let current = '';
    sections.forEach((sec) => { if (sec.offsetTop - 120 <= y) current = '#' + sec.id; });
    navAnchors.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === current));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ============ Mobile Menu ============ */
  const toggle = $('#navToggle');
  const menu = $('#mobileMenu');
  const backdrop = document.createElement('div');
  backdrop.className = 'menu-backdrop';
  document.body.appendChild(backdrop);

  const setMenu = (open) => {
    toggle.classList.toggle('open', open);
    menu.classList.toggle('open', open);
    backdrop.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    menu.setAttribute('aria-hidden', !open);
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  backdrop.addEventListener('click', () => setMenu(false));
  $$('a', menu).forEach((a) => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ============ Newsletter ============ */
  const nl = $('#newsletter');
  const note = $('#nlNote');
  nl.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = $('#nlEmail');
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value.trim());
    if (!ok) { note.style.color = '#dc2626'; note.textContent = 'Please enter a valid email address.'; return; }
    note.style.color = '#16A34A';
    note.textContent = 'Thanks! You’re on the list.';
    nl.reset();
  });

  /* ============ Contact FAB ============ */
  const contactFab = $('#contactFab');
  if (contactFab) {
    contactFab.addEventListener('click', () => {
      window.location.href = 'contact.html';
    });
  }

  /* ============ Video Showcase Player ============ */
  const vFrame = $('#videoFrame');
  if (vFrame) {
    const video = $('#showcaseVideo');
    const controls = $('#videoControls');
    const playBtn = $('#videoPlay');
    const toggleBtn = $('#vcToggle');
    const muteBtn = $('#vcMute');
    const fullBtn = $('#vcFull');
    const progress = $('#vcProgress');
    const bar = $('#vcBar');
    let controlsTimer;

    const startWithSound = () => {
      video.muted = false;          // sound ON when the user starts it
      vFrame.classList.add('unmuted');
      video.play().catch(() => {     // if autoplay-with-sound is blocked, fall back to muted
        video.muted = true;
        vFrame.classList.remove('unmuted');
        video.play();
      });
    };

    const showControls = () => {
      vFrame.classList.add('show-controls');
      clearTimeout(controlsTimer);
      controlsTimer = setTimeout(() => vFrame.classList.remove('show-controls'), 2600);
    };

    playBtn.addEventListener('click', startWithSound);
    video.addEventListener('click', () => (video.paused ? video.play() : video.pause()));

    video.addEventListener('play', () => {
      vFrame.classList.add('playing');
      controls.setAttribute('aria-hidden', 'false');
      showControls();
    });
    video.addEventListener('pause', () => vFrame.classList.add('show-controls'));

    toggleBtn.addEventListener('click', () => (video.paused ? video.play() : video.pause()));

    muteBtn.addEventListener('click', () => {
      video.muted = !video.muted;
      vFrame.classList.toggle('unmuted', !video.muted);
      muteBtn.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
    });

    fullBtn.addEventListener('click', () => {
      if (document.fullscreenElement) document.exitFullscreen();
      else (vFrame.requestFullscreen || vFrame.webkitRequestFullscreen).call(vFrame);
    });

    video.addEventListener('timeupdate', () => {
      if (video.duration) bar.style.width = (video.currentTime / video.duration) * 100 + '%';
    });
    progress.addEventListener('click', (e) => {
      const r = progress.getBoundingClientRect();
      video.currentTime = ((e.clientX - r.left) / r.width) * video.duration;
    });

    vFrame.addEventListener('mousemove', () => { if (!video.paused) showControls(); });

    // Pause when scrolled out of view (saves resources, stops background audio)
    new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (!e.isIntersecting && !video.paused) video.pause(); });
    }, { threshold: 0.25 }).observe(video);

    // "Watch Platform" hero button → scroll then auto-start with sound
    const watchBtn = $('#watchBtn');
    if (watchBtn) watchBtn.addEventListener('click', () => setTimeout(startWithSound, 700));
  }

  /* ============ Year ============ */
  $('#year').textContent = new Date().getFullYear();
})();
