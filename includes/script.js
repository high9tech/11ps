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

  // AppCache Event Listeners
  if (window.applicationCache) {
    window.applicationCache.addEventListener("progress", function (e) {
      const percent = Math.round((e.loaded / e.total) * 100);
      document.title = "Caching: " + percent + "%";
    }, false);

    window.applicationCache.oncached = function () {
      document.title = "✓ Offline Ready";
      appendConsole("[+] Application cached successfully.");
    };

    window.applicationCache.onupdateready = function () {
      document.title = "✓ Updated";
      appendConsole("[+] Cache updated.");
    };
  }
});
