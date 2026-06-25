/* =========================================================
   Samparkasetu — Main App Logic (vanilla ES6)
   ========================================================= */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ============ Content Data ============ */
  const modules = [
    ['🧩', 'Dealer CRM', 'Manage every dealer relationship, pipeline and follow-up in one place.'],
    ['🎯', 'Lead Management', 'Capture, route and qualify leads automatically across channels.'],
    ['👨‍🌾', 'Farmer Network', 'A connected community of farmers, FPOs and service buyers.'],
    ['🛒', 'Marketplace', 'Buy and sell equipment, inputs and services with verified partners.'],
    ['🗓️', 'Service Booking', 'On-demand booking for repairs, spraying, rentals and more.'],
    ['🏭', 'OEM Dashboard', 'Real-time visibility into dealers, demand and field performance.'],
    ['📊', 'Analytics', 'Actionable insights on sales, regions, products and trends.'],
    ['📱', 'Mobile App', 'Run your agri-business on the go, even in low-connectivity areas.'],
    ['🤖', 'AI Assistant', 'Conversational AI that handles enquiries and recommends actions.'],
    ['💳', 'Finance', 'Embedded credit and financing workflows for equipment & inputs.'],
    ['🛡️', 'Insurance', 'Crop, asset and livestock insurance built into the journey.'],
    ['♻️', 'Old Equipment Marketplace', 'A trusted resale ecosystem for pre-owned machinery.'],
  ];

  const aiFeatures = [
    ['AI Lead Qualification', 'Scores and prioritises leads by intent, region and product fit.'],
    ['Smart Dealer Matching', 'Connects every enquiry to the right dealer instantly.'],
    ['Predictive Analytics', 'Forecasts demand, churn and sales opportunities.'],
    ['WhatsApp Automation', 'Automated, human-like conversations at scale.'],
    ['Voice AI', 'Voice-first interactions for low-literacy and field use.'],
    ['Regional Language Support', 'Understands and responds in major Indian languages.'],
    ['Recommendation Engine', 'Suggests the right products, services and financing.'],
    ['Workflow Automation', 'Automates follow-ups, tasks and routing end-to-end.'],
  ];

  const industries = [
    ['🚜', 'Agriculture Machinery'], ['🌱', 'Agri Inputs'], ['🥛', 'Dairy'],
    ['🐄', 'Livestock'], ['🏭', 'Food Processing'], ['💧', 'Irrigation'],
    ['☀️', 'Solar'], ['🏦', 'Financial Services'], ['🛡️', 'Insurance'],
    ['🏛️', 'Government Programs'], ['🤝', 'NGOs'], ['🌾', 'FPOs'],
  ];

  const benefits = [
    ['👨‍🌾', 'Farmers', 'Discover trusted dealers, services, finance and the best prices.'],
    ['🏪', 'Dealers', 'More qualified leads, faster conversions and loyal customers.'],
    ['🏭', 'Manufacturers', 'Direct line of sight into demand, dealers and field data.'],
    ['🚛', 'Distributors', 'Streamlined networks and smarter inventory movement.'],
    ['🏦', 'Banks', 'Reach credit-worthy agri-customers with embedded lending.'],
    ['💼', 'NBFCs', 'Scale agri-financing with verified, data-rich borrowers.'],
    ['🛡️', 'Insurance Companies', 'Distribute crop, asset and livestock cover at the point of need.'],
    ['🌐', 'Agri Businesses', 'A unified platform to grow across the value chain.'],
    ['🏛️', 'Government Agencies', 'Last-mile reach for schemes, subsidies and outreach.'],
  ];

  const steps = [
    ['Register', 'Create your account and set up your agri-business profile in minutes.'],
    ['Connect', 'Link with farmers, dealers, OEMs and partners across the ecosystem.'],
    ['Generate Leads', 'Let AI capture, qualify and route high-intent leads to you.'],
    ['Manage Customers', 'Run your CRM, services and follow-ups from one dashboard.'],
    ['Grow Business', 'Scale with analytics, finance, insurance and marketplace access.'],
  ];

  const testimonials = [
    ['Our tractor dealership doubled qualified leads within three months. The AI matching is genuinely a game-changer.', 'Rajesh Kumar', 'Tractor Dealer, Maharashtra', 'RK'],
    ['Samparkasetu connected our FPO directly to buyers and financing. It feels like the digital backbone agriculture needed.', 'Anita Sharma', 'FPO Director, Punjab', 'AS'],
    ['As an OEM, the dealer visibility and demand forecasting alone justified the platform. The whole ecosystem in one view.', 'Vikram Patel', 'Regional Head, Agri OEM', 'VP'],
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

  const aiIcon = `<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1 0 8v1a4 4 0 0 1-8 0v-1a4 4 0 0 1 0-8V6a4 4 0 0 1 4-4z"/><path d="M12 8v8M8 12h8"/></svg>`;

  const render = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; };

  render('#modulesGrid', modules.map(([i, t, d]) =>
    `<article class="card"><div class="card-ic">${i}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join(''));

  render('#aiGrid', aiFeatures.map(([t, d]) =>
    `<article class="ai-card"><div class="ai-ic">${aiIcon}</div><h3>${esc(t)}</h3><p>${esc(d)}</p></article>`).join(''));

  render('#industryGrid', industries.map(([i, t]) =>
    `<div class="industry-card"><span class="ind-ic">${i}</span><span>${esc(t)}</span></div>`).join(''));

  render('#benefitGrid', benefits.map(([i, t, d]) =>
    `<article class="benefit-card"><div class="b-top"><div class="b-ic">${i}</div><h3>${esc(t)}</h3></div><p>${esc(d)}</p></article>`).join(''));

  render('#timeline', steps.map(([t, d], n) =>
    `<li><span class="tl-num">${n + 1}</span><div class="tl-body"><h3>${esc(t)}</h3><p>${esc(d)}</p></div></li>`).join(''));

  render('#testimonialGrid', testimonials.map(([q, a, r, av]) =>
    `<article class="testimonial"><div class="t-stars" aria-label="5 out of 5 stars">★★★★★</div>
      <p class="t-quote">“${esc(q)}”</p>
      <div class="t-author"><div class="t-avatar">${esc(av)}</div><div><b>${esc(a)}</b><small>${esc(r)}</small></div></div>
    </article>`).join(''));

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
    note.textContent = 'Thanks! You’re on the list. 🌱';
    nl.reset();
  });

  /* ============ Contact FAB ============ */
  $('#contactFab').addEventListener('click', () => {
    window.location.href = 'mailto:support@samparkasetu.com?subject=Samparkasetu%20Enquiry';
  });

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
