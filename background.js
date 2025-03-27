const intervalMinutes = 20;

function startAutoLoginLoop() {
  setInterval(() => {
    chrome.storage.local.get(["moodleUrl"], (data) => {
      const loginUrl = data.moodleUrl || "https://your.moodle.url/login/index.php";

      // Open Moodle login page in a background tab
      chrome.tabs.create({ url: loginUrl, active: false }, (tab) => {
        // Execute script to check login status after tab loads
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: checkLoginStatus,
        }, ([result]) => {
          if (result && result.isLoggedIn) {
            // Already logged in → close tab immediately
            chrome.tabs.remove(tab.id);
          } else {
            // Not logged in → inject login script
            chrome.scripting.executeScript({
              target: { tabId: tab.id },
              files: ["login.js"], // Your existing auto-login script
            }, () => {
              // Close tab after login (wait 5s for submission)
              setTimeout(() => {
                chrome.tabs.remove(tab.id);
              }, 5000);
            });
          }
        });
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