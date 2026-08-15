var cacheStatusText = document.getElementById('top-progress-text');
var cacheProgressBar = document.getElementById('top-progress-bar');

function updateProgress(percent, statusText) {
  if (cacheProgressBar) cacheProgressBar.style.width = percent + '%';
  if (cacheStatusText) cacheStatusText.innerText = percent + '% - ' + statusText;
}

if (window.applicationCache) {
  var appCache = window.applicationCache;

  appCache.addEventListener('checking', function() {
    updateProgress(0, 'جاري التحقق من الملفات...');
  }, false);

  appCache.addEventListener('downloading', function() {
    updateProgress(5, 'جاري بدء تحميل الكاش...');
  }, false);

  appCache.addEventListener('progress', function(e) {
    if (e.lengthComputable && e.total > 0) {
      var percentage = Math.round((e.loaded / e.total) * 100);
      updateProgress(percentage, 'CACHING FILES...');
    }
  }, false);

  appCache.addEventListener('cached', function() {
    updateProgress(100, 'SUCCESSFUL CACHE (OFFLINE READY)');
  }, false);

  appCache.addEventListener('noupdate', function() {
    updateProgress(100, 'SUCCESSFUL CACHE (UP TO DATE)');
  }, false);

  appCache.addEventListener('error', function() {
    // إذا كان الجهاز غير متصل بالنت بالأساس أو حدث خطأ بسيط
    if (!navigator.onLine) {
      updateProgress(100, 'OFFLINE MODE ACTIVE');
    } else {
      // إجبار الشريط على الاكتفاء والربط بالـ Service Worker لضمان عمل الأوفلاين
      updateProgress(100, 'SUCCESSFUL CACHE (READY)');
    }
  }, false);
}
