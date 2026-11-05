/* One job: the colour-theme toggle in the top right.
   The page is dark by default, as the design is. */
(function () {
  var root = document.documentElement;
  var button = document.getElementById('theme-toggle');
  if (!button) return;

  var stored;
  try { stored = localStorage.getItem('theme'); } catch (e) { stored = null; }
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);

  button.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });
})();
