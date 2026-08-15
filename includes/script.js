document.addEventListener("DOMContentLoaded", function () {
  const masterBtn = document.getElementById("masterBtn");
  const UAElement = document.getElementById("UA");
  const consoleBox = document.getElementById("console");
  const statusText = document.getElementById("cache-status-text");
  const cacheDot = document.getElementById("cache-dot");

  // عرض معلومات المتصفح
  if (UAElement) {
    UAElement.innerText = "PlayStation / " + navigator.userAgent;
  }

  // دالة طباعة السجلات في الـ Console
  function appendConsole(msg) {
    if (consoleBox) {
      consoleBox.textContent += "\n" + msg;
      consoleBox.scrollTop = consoleBox.scrollHeight;
    }
  }

  // دالة تحديث الواجهة إلى حالة الجاهزية 100%
  function markOfflineReady() {
    if (statusText) statusText.innerText = "جاهز 100% (Offline Ready)";
    if (cacheDot) cacheDot.classList.add("active");
    document.title = "✓ 100% Offline Ready";
  }

  // التفاعل مع زر التفعيل الموحد
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

  // 1. معالجة Service Worker الحديثة
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(function () {
      markOfflineReady();
      appendConsole("[+] Service Worker متصل وجاهز للعمل بدون إنترنت.");
    }).catch(function (err) {
      console.log("SW Status Check Error:", err);
    });
  }

  // 2. معالجة AppCache وحساب النسبة (من 1% إلى 100%)
  if (window.applicationCache) {
    const appCache = window.applicationCache;

    appCache.addEventListener("progress", function (e) {
      if (e && e.lengthComputable && e.total > 0) {
        const percent = Math.round((e.loaded / e.total) * 100);
        document.title = "Caching: " + percent + "%";
        if (statusText) statusText.innerText = "جاري التخزين: " + percent + "%";
      } else {
        if (statusText) statusText.innerText = "جاري التخزين...";
      }
    }, false);

    appCache.addEventListener("cached", function () {
      markOfflineReady();
      appendConsole("[+] تم اكتمال التخزين بنجاح (100%).");
    }, false);

    appCache.addEventListener("updateready", function () {
      markOfflineReady();
      appendConsole("[+] تم تحديث الكاش بالكامل (100%).");
      try { appCache.swapCache(); } catch (e) {}
    }, false);

    appCache.addEventListener("noupdate", function () {
      markOfflineReady();
    }, false);

    appCache.addEventListener("error", function () {
      // في حال تعثر AppCache، نتحقق من جاهزية Service Worker كبديل
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        markOfflineReady();
        appendConsole("[+] التخزين شغال بنجاح عبر Service Worker.");
      }
    }, false);
  }
});
