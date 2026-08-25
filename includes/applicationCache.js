(function() {
  function updateProgress(percent, statusText) {
    var pBar = document.getElementById('top-progress-bar');
    var pText = document.getElementById('top-progress-text');
    if (pBar) pBar.style.width = percent + '%';
    if (pText) pText.textContent = percent + '% - ' + statusText;
  }

  if (window.applicationCache) {
    var appCache = window.applicationCache;

    appCache.addEventListener('checking', function() {
      updateProgress(10, 'CHECKING FOR CACHE UPDATES...');
    }, false);

    appCache.addEventListener('downloading', function() {
      updateProgress(30, 'DOWNLOADING OFFLINE ASSETS...');
    }, false);

    appCache.addEventListener('progress', function(e) {
      if (e.lengthComputable) {
        var percentage = Math.round((e.loaded / e.total) * 100);
        updateProgress(percentage, 'CACHING FILES (' + e.loaded + '/' + e.total + ')');
      } else {
        updateProgress(50, 'CACHING IN PROGRESS...');
      }
    }, false);

    appCache.addEventListener('cached', function() {
      updateProgress(100, 'OFFLINE CACHE COMPLETE!');
    }, false);

    appCache.addEventListener('updateready', function() {
      updateProgress(100, 'CACHE UPDATED! REFRESHING...');
      try {
        appCache.swapCache();
      } catch (e) {}
      window.location.reload();
    }, false);

    appCache.addEventListener('noupdate', function() {
      updateProgress(100, 'HOST READY (CACHE UP TO DATE)');
    }, false);

    appCache.addEventListener('error', function() {
      updateProgress(100, 'HOST READY (OFFLINE MODE)');
    }, false);
  }
})();
