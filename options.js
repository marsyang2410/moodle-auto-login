document.addEventListener("DOMContentLoaded", () => {
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const urlInput = document.getElementById("moodleUrl");
  const status = document.getElementById("status");
  const urlDropdown = document.getElementById("urlDropdown");

  chrome.storage.local.get(["moodleUsername", "moodlePassword", "moodleUrl"], (data) => {
    if (data.moodleUsername) usernameInput.value = data.moodleUsername;
    if (data.moodlePassword) passwordInput.value = data.moodlePassword;
    if (data.moodleUrl) urlInput.value = data.moodleUrl;
  });

  urlDropdown.addEventListener("change", () => {
    if (urlDropdown.value) {
      urlInput.value = urlDropdown.value;
    }
  });

  document.getElementById("saveBtn").addEventListener("click", () => {
    chrome.storage.local.set({
      moodleUsername: usernameInput.value,
      moodlePassword: passwordInput.value,
      moodleUrl: urlInput.value
    }, () => {
      status.textContent = "✅ Credentials and URL saved!";
      setTimeout(() => status.textContent = "", 2000);
    });
  });
});