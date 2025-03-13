const intervalMinutes = 20;

function startAutoLoginLoop() {
  setInterval(() => {
    chrome.storage.local.get(["moodleUrl"], (data) => {
      const loginUrl = data.moodleUrl || "https://your.moodle.url/login/index.php";

      // Open Moodle login page in a background tab (not focused)
      chrome.tabs.create({ url: loginUrl, active: false }, (tab) => {
        // Wait for login.js to run and submit the form, then close the tab
        setTimeout(() => {
          chrome.tabs.remove(tab.id);
        }, 8000); // Wait 8 seconds (adjust if needed)
      });
    });
  }, intervalMinutes * 60 * 1000);
}

startAutoLoginLoop();
