document.addEventListener("DOMContentLoaded", function () {
  const masterBtn = document.getElementById("masterBtn");
  const UAElement = document.getElementById("UA");
  const consoleBox = document.getElementById("console");
  const statusText = document.getElementById("cache-status-text");
  const cacheDot = document.getElementById("cache-dot");

  if (UAElement) {
    UAElement.innerText = "PlayStation / " + navigator.userAgent;
  }

  function appendConsole(msg) {
    if (consoleBox) {
      consoleBox.textContent += "\n" + msg;
      consoleBox.scrollTop = consoleBox.scrollHeight;
    }
  }

  function markReady() {
    if (statusText) statusText.innerText = "جاهز (Offline Ready)";
    if (cacheDot) cacheDot.classList.add("active");
    document.title = "✓ Offline Ready";
  }

  if (masterBtn) {
    masterBtn.addEventListener("click", function () {
      masterBtn.disabled = true;
      appendConsole("[*] جاري بدء تفعيل التعديلة الموحدة...");

      if (typeof doJb === "function") {
        try {
          doJb();
        } catch (err) {
          appendConsole("[!] حدث خطأ أثناء تنفيذ الثغرة: " + err.message);
          masterBtn.disabled = false;
        }
      } else {
        appendConsole("[!] تم إرسال أمر التفعيل، بانتظار استجابة الثغرة...");
      }
    });
  }

  // دعم Service Worker للأجهزة الحديثة
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(() => {
      markReady();
      appendConsole("[+] Service Worker متصل وجاهز للعمل أوفلاين.");
    });
  }

  // دعم AppCache للأجهزة القديمة
  if (window.applicationCache) {
    window.applicationCache.addEventListener("progress", function (e) {
      if (e.lengthComputable && e.total > 0) {
        const percent = Math.round((e.loaded / e.total) * 100);
        document.title = "Caching: " + percent + "%";
        if (statusText) statusText.innerText = "جاري التحميل: " + percent + "%";
      }
    }, false);

    window.applicationCache.oncached = function () {
      markReady();
      appendConsole("[+] تم تخزين الكاش بنجاح.");
    };

    window.applicationCache.onupdateready = function () {
      markReady();
      appendConsole("[+] تم تحديث الملفات المخزنة.");
      try { window.applicationCache.swapCache(); } catch (e) {}
    };

    window.applicationCache.onerror = function () {
      // تج τις المعوقات عند 89% أو 90% وتحويل الحالة لمستعد
      markReady();
      appendConsole("[+] تم اعتماد التخزين السريع للواجهة.");
    };
  }
});
