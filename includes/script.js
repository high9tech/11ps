document.addEventListener("DOMContentLoaded", function () {
  const masterBtn = document.getElementById("masterBtn");
  const UAElement = document.getElementById("UA");
  const consoleBox = document.getElementById("console");

  if (UAElement) {
    UAElement.innerText = navigator.userAgent;
  }

  function appendConsole(msg) {
    if (consoleBox) {
      consoleBox.textContent += "\n" + msg;
      consoleBox.scrollTop = consoleBox.scrollHeight;
    }
  }

  if (masterBtn) {
    masterBtn.addEventListener("click", function () {
      masterBtn.disabled = true;
      appendConsole("[*] Executing Jailbreak...");
      if (typeof doJb === "function") {
        doJb();
      } else {
        appendConsole("[!] Main trigger routine initialized.");
      }
    });
  }

  // متابعة تقدم AppCache
  if (window.applicationCache) {
    window.applicationCache.addEventListener("progress", function (e) {
      if (e.lengthComputable && e.total > 0) {
        const percent = Math.round((e.loaded / e.total) * 100);
        document.title = "Caching: " + percent + "%";
      }
    }, false);

    window.applicationCache.oncached = function () {
      document.title = "✓ Offline Ready";
      const statusText = document.getElementById('cache-status-text');
      const dot = document.getElementById('cache-dot');
      if (statusText) statusText.innerText = 'جاهز (Offline Ready)';
      if (dot) dot.classList.add('active');
      appendConsole("[+] تم تخزين الملفات أوفلاين بنجاح.");
    };

    window.applicationCache.onupdateready = function () {
      document.title = "✓ Updated";
      window.applicationCache.swapCache();
      location.reload();
    };

    window.applicationCache.onerror = function () {
      appendConsole("[!] خطأ في كاش AppCache، يرجى إعادة التحميل.");
    };
  }
});
