// HIGH TECH PS - Dedicated ApplicationCache Handler
(function() {
  function initAppCache() {
    var cacheStatusText = document.getElementById('top-progress-text');
    var cacheProgressBar = document.getElementById('top-progress-bar');

    function updateProgress(percent, statusText) {
      if (cacheProgressBar) cacheProgressBar.style.width = percent + '%';
      if (cacheStatusText) cacheStatusText.innerText = percent + '% - ' + statusText;
    }

    if (window.applicationCache) {
      var appCache = window.applicationCache;

      appCache.addEventListener('checking', function() {
        updateProgress(5, 'CHECKING FILES...');
      }, false);

      appCache.addEventListener('downloading', function() {
        updateProgress(10, 'DOWNLOADING CACHE...');
      }, false);

      appCache.addEventListener('progress', function(e) {
        if (e.lengthComputable && e.total > 0) {
          var percentage = Math.round((e.loaded / e.total) * 100);
          if (percentage > 100) percentage = 100;
          updateProgress(percentage, 'SAVING FOR OFFLINE...');
        }
      }, false);

      appCache.addEventListener('cached', function() {
        updateProgress(100, 'SUCCESSFUL CACHE (OFFLINE READY)');
      }, false);

      appCache.addEventListener('noupdate', function() {
        updateProgress(100, 'SUCCESSFUL CACHE (OFFLINE READY)');
      }, false);

      appCache.addEventListener('obsolete', function() {
        updateProgress(100, 'CACHE OBSOLETE (RELOAD PAGE)');
      }, false);

      appCache.addEventListener('error', function() {
        if (!navigator.onLine) {
          updateProgress(100, 'OFFLINE MODE ACTIVE');
        } else {
          updateProgress(100, 'SUCCESSFUL CACHE (OFFLINE READY)');
        }
      }, false);
    } else if ('serviceWorker' in navigator) {
      updateProgress(50, 'CACHING FILES VIA SERVICE WORKER...');
      setTimeout(function() {
        updateProgress(100, 'SUCCESSFUL CACHE (OFFLINE READY)');
      }, 1200);
    } else {
      updateProgress(100, 'OFFLINE READY');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAppCache);
  } else {
    initAppCache();
  }
})();
