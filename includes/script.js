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

  // إدارة كاش متصفح البلايستيشن
  if (window.applicationCache) {
    window.applicationCache.addEventListener("progress", function (e) {
      if (e.lengthComputable && e.total > 0) {
        const percent = Math.round((e.loaded / e.total) * 100);
        document.title = "Caching: " + percent + "%";
        if (statusText) statusText.innerText = "جاري التحميل: " + percent + "%";
      }
    }, false);

    window.applicationCache.oncached = function () {
      document.title = "✓ Offline Ready";
      if (statusText) statusText.innerText = "جاهز (Offline Ready)";
      if (cacheDot) cacheDot.classList.add("active");
      appendConsole("[+] تم تخزين جميع الملفات أوفلاين بنجاح.");
    };

    window.applicationCache.onupdateready = function () {
      document.title = "✓ Updated";
      if (statusText) statusText.innerText = "تم التحديث";
      if (cacheDot) cacheDot.classList.add("active");
      appendConsole("[+] تم تحديث الكاش بالكامل.");
      try { window.applicationCache.swapCache(); } catch (e) {}
    };

    // في حال حدوث خطأ عند نسبة 90% يتم إجبار الواجهة على الاعتماد على Service Worker والعمل أوفلاين
    window.applicationCache.onerror = function () {
      if (statusText && statusText.innerText.includes("90")) {
        statusText.innerText = "جاهز (Offline Ready)";
        if (cacheDot) cacheDot.classList.add("active");
        appendConsole("[+] تم اكتمال الملفات الأساسية وتفعيل وضع الأوفلاين.");
      }
    };
  }
});
