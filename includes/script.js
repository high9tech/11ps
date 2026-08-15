var cacheStatusText = document.getElementById('top-progress-text');
var cacheProgressBar = document.getElementById('top-progress-bar');

function updateProgress(percent, statusText) {
  if (cacheProgressBar) cacheProgressBar.style.width = percent + '%';
  if (cacheStatusText) cacheStatusText.innerText = percent + '% - ' + statusText;
}

if (window.applicationCache) {
  var appCache = window.applicationCache;

  appCache.addEventListener('progress', function(e) {
    if (e.lengthComputable && e.total > 0) {
      var percentage = Math.round((e.loaded / e.total) * 100);
      updateProgress(percentage, 'SAVING FOR OFFLINE...');
    }
  }, false);

  appCache.addEventListener('cached', function() {
    updateProgress(100, 'SUCCESSFUL CACHE (OFFLINE READY)');
  }, false);

  appCache.addEventListener('noupdate', function() {
    updateProgress(100, 'SUCCESSFUL CACHE (OFFLINE READY)');
  }, false);

  appCache.addEventListener('error', function() {
    if (!navigator.onLine) {
      updateProgress(100, 'OFFLINE MODE ACTIVE');
    }
  }, false);
}
