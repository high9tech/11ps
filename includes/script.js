document.addEventListener("DOMContentLoaded", function () {
  const masterBtn = document.getElementById("masterBtn");
  const UAElement = document.getElementById("UA");
  const consoleBox = document.getElementById("console");
  const statusText = document.getElementById("cache-status-text");
  const cacheDot = document.getElementById("cache-dot");

  // عرض معلومات متصفح البلايستيشن
  if (UAElement) {
    UAElement.innerText = "PlayStation / " + navigator.userAgent;
  }

  // دالة طباعة الرسائل في شاشة الـ Console
  function appendConsole(msg) {
    if (consoleBox) {
      consoleBox.textContent += "\n" + msg;
      consoleBox.scrollTop = consoleBox.scrollHeight;
    }
  }

  // معالجة الضغط على الزر الذهبي الموحد
  if (masterBtn) {
    masterBtn.addEventListener("click", function () {
      masterBtn.disabled = true;
      appendConsole("[*] جاري بدء تفعيل التعديلة الموحدة...");

      // استدعاء دالة doJb الخاصة بكود الثغرة الرئيسي إن وجدت
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

  // إدارة التخزين الأوفلاين عبر AppCache للمتصفحات القديمة
  if (window.applicationCache) {
    window.applicationCache.addEventListener("checking", function () {
      appendConsole("[*] جاري التحقق من كاش الملفات...");
    }, false);

    window.applicationCache.addEventListener("downloading", function () {
      appendConsole("[*] جاري تنزيل ملفات الكاش للحفظ أوفلاين...");
    }, false);

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
      appendConsole("[+] تم تخزين الملفات أوفلاين بنجاح.");
    };

    window.applicationCache.onupdateready = function () {
      document.title = "✓ Updated";
      if (statusText) statusText.innerText = "تم التحديث";
      if (cacheDot) cacheDot.classList.add("active");
      appendConsole("[+] تم تحديث الكاش. أعد تحميل الصفحة لتطبيق التحديث.");
      try {
        window.applicationCache.swapCache();
      } catch (e) {}
    };

    window.applicationCache.onerror = function () {
      // في حالة وجود Service Worker آمن، نتجاهل خطأ AppCache
      if (!('serviceWorker' in navigator)) {
        appendConsole("[!] خطأ في جلب الكاش، تأكد من وجود جميع الملفات.");
      }
    };
  }
});
