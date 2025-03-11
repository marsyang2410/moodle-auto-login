chrome.storage.local.get(["moodleUsername", "moodlePassword"], (data) => {
  const username = data.moodleUsername;
  const password = data.moodlePassword;

  const userInput = document.querySelector('input[name="username"]');
  const passInput = document.querySelector('input[name="password"]');
  const loginForm = document.querySelector('form');

  if (userInput && passInput && loginForm && username && password) {
    userInput.value = username;
    passInput.value = password;

    // ✅ Alert directly here
    alert("✅ Moodle Auto Login Extension has filled your credentials and submitted login!");

    loginForm.submit();
  }
});