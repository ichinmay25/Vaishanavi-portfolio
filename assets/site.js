document.documentElement.classList.remove('no-js');

var calm = window.matchMedia('(prefers-reduced-motion: reduce)');

/* Entrances: heading, then text, staggered. Nothing stays hidden if this fails. */
(function () {
  var parts = document.querySelectorAll('.rise');
  if (!parts.length) return;

  function revealAll() { parts.forEach(function (p) { p.classList.add('in'); }); }
  if (calm.matches || !('IntersectionObserver' in window) || !window.innerHeight) { revealAll(); return; }

  var seen = new WeakMap();
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting || seen.get(e.target)) return;
      seen.set(e.target, 1);
      var group = e.target.closest('section, header, footer') || document.body;
      var kin = Array.prototype.slice.call(group.querySelectorAll('.rise'));
      var i = Math.max(0, kin.indexOf(e.target));
      setTimeout(function () { e.target.classList.add('in'); }, Math.min(i, 6) * 70);
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -4% 0px', threshold: 0.08 });
  parts.forEach(function (p) { io.observe(p); });

  setTimeout(function () {
    var working = document.querySelectorAll('.rise.in').length;
    parts.forEach(function (p) {
      if (p.classList.contains('in')) return;
      if (!working || p.getBoundingClientRect().top < window.innerHeight) p.classList.add('in');
    });
  }, 2000);
})();
