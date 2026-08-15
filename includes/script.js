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

  function setReady() {
    if (statusText) statusText.innerText = "جاهز 100% (Offline Ready)";
    if (cacheDot) cacheDot.classList.add("active");
    document.title = "✓ 100% Offline Ready";
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

  // حساب العداد التراكمي من 1 إلى 100
  if (window.applicationCache) {
    window.applicationCache.addEventListener("progress", function (e) {
      if (e.lengthComputable && e.total > 0) {
        const percent = Math.round((e.loaded / e.total) * 100);
        document.title = "Caching: " + percent + "%";
        if (statusText) statusText.innerText = "جاري التخزين: " + percent + "%";
      }
    }, false);

    window.applicationCache.oncached = function () {
      setReady();
      appendConsole("[+] تم اكتمال التخزين بنجاح (100%).");
    };

    window.applicationCache.onupdateready = function () {
      setReady();
      appendConsole("[+] تم تحديث الكاش بالكامل (100%).");
      try { window.applicationCache.swapCache(); } catch (e) {}
    };

    window.applicationCache.onerror = function () {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        setReady();
        appendConsole("[+] تم التثبيت المباشر عبر Service Worker.");
      }
    };
  }
});
