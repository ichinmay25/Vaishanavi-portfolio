/* Three small jobs: the colour-theme toggle, the read-more panels,
   and easing each section in as it arrives. */
(function () {
  var root = document.documentElement;

  /* ── Theme ──────────────────────────────────────────── */
  var toggle = document.getElementById('theme-toggle');
  if (toggle) {
    var stored = null;
    try { stored = localStorage.getItem('theme'); } catch (e) {}
    if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);

    toggle.addEventListener('click', function () {
      var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  /* ── Read-more panels ───────────────────────────────── */
  var opener = null;

  function closePanel(dlg) {
    if (!dlg.open || dlg.classList.contains('closing')) return;
    var finished = false;
    function done() {
      if (finished) return;
      finished = true;
      dlg.classList.remove('closing');
      dlg.close();
    }
    dlg.classList.add('closing');
    dlg.addEventListener('animationend', done, { once: true });
    setTimeout(done, 320);
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-dialog]'), function (trigger) {
    trigger.addEventListener('click', function () {
      var dlg = document.getElementById(trigger.getAttribute('data-dialog'));
      if (!dlg || typeof dlg.showModal !== 'function') return;
      opener = trigger;
      dlg.scrollTop = 0;
      dlg.showModal();
      document.body.classList.add('panel-open');
    });
  });

  Array.prototype.forEach.call(document.querySelectorAll('dialog.panel'), function (dlg) {
    // A click that lands on the dialog itself came from the backdrop.
    dlg.addEventListener('click', function (e) {
      if (e.target === dlg) closePanel(dlg);
    });
    Array.prototype.forEach.call(dlg.querySelectorAll('[data-close]'), function (b) {
      b.addEventListener('click', function () { closePanel(dlg); });
    });
    dlg.addEventListener('cancel', function (e) {   // Esc — animate rather than snap
      e.preventDefault();
      closePanel(dlg);
    });
    dlg.addEventListener('close', function () {
      document.body.classList.remove('panel-open');
      if (opener) { opener.focus(); opener = null; }
    });
  });

  /* ── Sections easing in ─────────────────────────────── */
  var targets = document.querySelectorAll('.content, .rail');
  function showAll() {
    Array.prototype.forEach.call(targets, function (el) { el.classList.add('in'); });
  }
  if (!('IntersectionObserver' in window)) { showAll(); return; }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.04 });

  Array.prototype.forEach.call(targets, function (el) { io.observe(el); });
})();
