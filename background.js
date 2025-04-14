const intervalMinutes = 15;

function startAutoLoginLoop() {
  setInterval(() => {
    chrome.storage.local.get(["moodleUrl"], (data) => {
      const loginUrl = data.moodleUrl || "https://your.moodle.url/login/index.php";

      // Open Moodle login page in a background tab
      chrome.tabs.create({ url: loginUrl, active: false }, (tab) => {
        const tabId = tab.id;
      
        // Add listener to wait for tab to load
        function onTabUpdated(updatedTabId, info) {
          if (updatedTabId === tabId && info.status === 'complete') {
            chrome.tabs.onUpdated.removeListener(onTabUpdated);
      
            // Now safe to inject
            chrome.scripting.executeScript({
              target: { tabId },
              func: checkLoginStatus,
            }, ([result]) => {
              if (result && result.isLoggedIn) {
                chrome.tabs.remove(tabId);
              } else {
                chrome.scripting.executeScript({
                  target: { tabId },
                  files: ["login.js"],
                }, () => {
                  setTimeout(() => {
                    chrome.tabs.remove(tabId);
                  }, 5000);
                });
              }
            });
          }
        }
      
        chrome.tabs.onUpdated.addListener(onTabUpdated);
      });      
    });
  }, intervalMinutes * 60 * 1000);
}

// Function to check if user is already logged in
function checkLoginStatus() {
  // Check for a logout button or user profile link (common Moodle indicators)
  const logoutButton = document.querySelector('[data-title="logout,moodle"]');
  const userMenu = document.querySelector('.usermenu');
  return {
    isLoggedIn: !!logoutButton || !!userMenu,
  };
}

startAutoLoginLoop();