chrome.runtime.onInstalled.addListener(() => {
  setInterval(() => {
    chrome.storage.local.get(["moodleUrl"], (data) => {
      const loginUrl = data.moodleUrl || "https://your.moodle.url/login/index.php";
      chrome.tabs.create({ url: loginUrl });

      chrome.notifications.create({
        type: "basic",
        iconUrl: "https://upload.wikimedia.org/wikipedia/commons/7/76/Moodle-logo.svg",
        title: "Moodle Auto Login",
        message: "Auto Logging-in via Chrome Extension"
      });
    });
  }, 20 * 60 * 1000);
});