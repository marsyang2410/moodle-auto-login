const intervalMinutes = 20;

function startAutoLoginLoop() {
  setInterval(() => {
    chrome.storage.local.get(["moodleUrl"], (data) => {
      const loginUrl = data.moodleUrl || "https://your.moodle.url/login/index.php";
      chrome.tabs.create({ url: loginUrl });
    });
  }, intervalMinutes * 60 * 1000);
}

startAutoLoginLoop();
