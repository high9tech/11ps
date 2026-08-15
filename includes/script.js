window.applicationCache.addEventListener('progress', function(e) {
  if (e.lengthComputable) {
    var percentage = Math.round((e.loaded / e.total) * 100);
    document.getElementById('top-progress-bar').style.width = percentage + '%';
    document.getElementById('top-progress-text').innerText = percentage + '% - CACHING FILES...';
  }
}, false);

window.applicationCache.addEventListener('cached', function() {
  document.getElementById('top-progress-bar').style.width = '100%';
  document.getElementById('top-progress-text').innerText = '100% - SUCCESSFUL CACHE (OFFLINE READY)';
}, false);

window.applicationCache.addEventListener('noupdate', function() {
  document.getElementById('top-progress-bar').style.width = '100%';
  document.getElementById('top-progress-text').innerText = '100% - SUCCESSFUL CACHE (OFFLINE READY)';
}, false);

window.applicationCache.addEventListener('error', function() {
  // في حال كان المحمول offline بالفعل
  if (!navigator.onLine) {
    document.getElementById('top-progress-bar').style.width = '100%';
    document.getElementById('top-progress-text').innerText = 'OFFLINE MODE ACTIVE';
  }
}, false);
