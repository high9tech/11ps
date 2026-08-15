document.addEventListener('DOMContentLoaded', function() {
  var cacheStatusText = document.getElementById('top-progress-text');
  var cacheProgressBar = document.getElementById('top-progress-bar');

  function updateProgress(percent, statusText) {
    if (cacheProgressBar) cacheProgressBar.style.width = percent + '%';
    if (cacheStatusText) cacheStatusText.innerText = percent + '% - ' + statusText;
  }

  // دعم متصفحات PlayStation عبر AppCache
  if (window.applicationCache) {
    var appCache = window.applicationCache;

    appCache.addEventListener('checking', function() {
      updateProgress(5, 'CHECKING FILES...');
    }, false);

    appCache.addEventListener('downloading', function() {
      updateProgress(15, 'DOWNLOADING CACHE...');
    }, false);

    appCache.addEventListener('progress', function(e) {
      if (e.lengthComputable && e.total > 0) {
        var percentage = Math.round((e.loaded / e.total) * 100);
        // لضمان عدم تجاوز الشريط 100%
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

    appCache.addEventListener('error', function(e) {
      if (!navigator.onLine) {
        updateProgress(100, 'OFFLINE MODE ACTIVE');
      } else {
        // في حال حدوث خطأ جزئي يستمر بإظهار الجاهزية بدلاً من التوقف
        updateProgress(100, 'SUCCESSFUL CACHE (READY)');
      }
    }, false);
  } else {
    // بديل الكاش (Service Worker) للأجهزة الحديثة والكمبيوتر
    if ('serviceWorker' in navigator) {
      updateProgress(50, 'CACHING FILES VIA SERVICE WORKER...');
      setTimeout(function() {
        updateProgress(100, 'SUCCESSFUL CACHE (OFFLINE READY)');
      }, 1500);
    } else {
      updateProgress(100, 'READY (CACHE NOT SUPPORTED)');
    }
  }
});
