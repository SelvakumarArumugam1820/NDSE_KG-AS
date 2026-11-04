// NDSE site behaviour: navigation, scroll effects, division TOC, enquiry form.
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('mainNav');

  // Mobile menu
  function setMenu(open) {
    nav.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    document.body.classList.toggle('nav-open', open);
  }
  if (toggle && nav) {
    toggle.addEventListener('click', function () { setMenu(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', function () { if (window.innerWidth > 1180) setMenu(false); });
  }

  // Submenu toggles (tap-friendly on touch / mobile)
  document.querySelectorAll('.sub-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.closest('.has-sub');
      var open = !li.classList.contains('open');
      li.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  // Header shadow on scroll
  var onScroll = function () { header && header.classList.toggle('scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -40px 0px', threshold: 0.05 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // Division page: highlight the category in view
  var tocLinks = document.querySelectorAll('.toc a[href^="#"]');
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    tocLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var tocIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove('active'); });
        var link = byId[en.target.id];
        if (link) link.classList.add('active');
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    document.querySelectorAll('.detail[id]').forEach(function (el) { tocIo.observe(el); });
  }

  // Project category filter
  var chips = document.querySelectorAll('[data-filter]');
  chips.forEach(function (chip) {
    chip.addEventListener('click', function () {
      var cat = chip.getAttribute('data-filter');
      chips.forEach(function (c) {
        var on = c === chip;
        c.classList.toggle('is-active', on);
        c.setAttribute('aria-pressed', String(on));
      });
      document.querySelectorAll('[data-cat]').forEach(function (el) {
        el.hidden = cat !== 'all' && el.getAttribute('data-cat') !== cat;
        el.classList.add('in');
      });
    });
  });

  // Gallery lightbox
  var shots = document.querySelectorAll('[data-lightbox]');
  if (shots.length && window.HTMLDialogElement) {
    var box = document.createElement('dialog');
    box.className = 'lightbox';
    box.innerHTML = '<button type="button" aria-label="Close">&times;</button><img alt="">';
    document.body.appendChild(box);
    box.addEventListener('click', function () { box.close(); });
    shots.forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var img = box.querySelector('img');
        img.src = a.getAttribute('href');
        img.alt = a.querySelector('img').alt;
        box.showModal();
      });
    });
  }

  // Enquiry form: validate, then hand off to email or WhatsApp (no backend required)
  var form = document.getElementById('enquiryForm');
  if (!form) return;
  var status = document.getElementById('formStatus');
  var EMAIL = 'info@ndse.in';
  var WHATSAPP = '917397733223';

  var preset = new URLSearchParams(window.location.search).get('service');
  if (preset) {
    var select = form.elements.service;
    for (var i = 0; i < select.options.length; i++) {
      if (select.options[i].text === preset) { select.selectedIndex = i; break; }
    }
  }

  function message(field) {
    var v = field.validity;
    if (v.valueMissing) return 'This field is required.';
    if (v.typeMismatch) return 'Please enter a valid email address.';
    if (v.patternMismatch) return 'Please enter a valid phone number (10+ digits).';
    if (v.tooShort) return 'Please enter at least ' + field.minLength + ' characters.';
    return '';
  }
  function check(field) {
    var wrap = field.closest('.field');
    var err = wrap && wrap.querySelector('.err');
    if (field.value && !field.value.trim()) field.value = '';
    var msg = field.checkValidity() ? '' : message(field);
    if (wrap) wrap.classList.toggle('invalid', !!msg);
    if (err) err.textContent = msg;
    return !msg;
  }
  var fields = form.querySelectorAll('input, select, textarea');
  fields.forEach(function (f) {
    f.addEventListener('blur', function () { check(f); });
    f.addEventListener('input', function () { if (f.closest('.field.invalid')) check(f); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true, first = null;
    fields.forEach(function (f) {
      if (!check(f)) { ok = false; first = first || f; }
    });
    if (!ok) { first.focus(); status.textContent = 'Please correct the highlighted fields.'; return; }

    var d = form.elements;
    var lines = [
      'Name: ' + d.name.value.trim(),
      'Phone: ' + d.phone.value.trim(),
      d.email.value.trim() ? 'Email: ' + d.email.value.trim() : '',
      'Site location: ' + d.location.value.trim(),
      'Service: ' + d.service.value,
      d.area.value.trim() ? 'Area / length: ' + d.area.value.trim() : '',
      '',
      d.message.value.trim(),
    ].filter(function (l, idx) { return l !== '' || idx === 6; });
    var text = lines.join('\n');
    var subject = 'Survey enquiry: ' + d.service.value + ' – ' + d.location.value.trim();
    var channel = (e.submitter && e.submitter.getAttribute('data-channel')) || 'email';

    if (channel === 'whatsapp') {
      window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(subject + '\n\n' + text), '_blank', 'noopener');
      status.textContent = 'WhatsApp opened with your enquiry. Please press send in WhatsApp.';
    } else {
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
      status.textContent = 'Your email app has opened with the enquiry. If it did not, email us at ' + EMAIL + '.';
    }
  });
})();
