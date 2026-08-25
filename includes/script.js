document.addEventListener('DOMContentLoaded', function() {
  const masterBtn = document.getElementById('masterBtn');
  const consoleBox = document.getElementById('console');

  function logMessage(msg) {
    if (consoleBox) {
      consoleBox.textContent += '\n' + msg;
      consoleBox.scrollTop = consoleBox.scrollHeight;
    }
    console.log('[HIGH TECH PS]', msg);
  }

  if (masterBtn) {
    masterBtn.addEventListener('click', function() {
      logMessage('Initiating sequence...');
      if (typeof main === 'function') {
        main();
      } else if (typeof loadExploit === 'function') {
        loadExploit();
      } else {
        logMessage('Exploit script ready.');
      }
    });
  }
});
