chrome.storage.local.get(["moodleUsername", "moodlePassword", "moodleUrl"], (data) => {
  const currentUrl = window.location.href;

  // ✅ Fix method name and key names
  if (!currentUrl.startsWith(data.moodleUrl)) return;

  const username = data.moodleUsername; // Fixed key name
  const password = data.moodlePassword; // Fixed key name

  const userInput = document.querySelector('input[name="username"]');
  const passInput = document.querySelector('input[name="password"]');
  const loginForm = document.querySelector('form');

  if (userInput && passInput && loginForm && username && password) {
    userInput.value = username;
    passInput.value = password;
    
    // ✅ Only add styles if they don't exist
    if (!document.getElementById('moodle-auto-login-styles')) {
      const style = document.createElement('style');
      style.id = 'moodle-auto-login-styles';
      style.textContent = `
        @keyframes fadein {
          from { opacity: 0; transform: translate(-50%, 20px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }
        @keyframes fadeout {
          from { opacity: 1; transform: translate(-50%, 0); }
          to { opacity: 0; transform: translate(-50%, 20px); }
        }
      `;
      document.head.appendChild(style);
    }

    // Create notification
    const notification = document.createElement('div');
    notification.textContent = "✅ Moodle Auto Login via Chrome Extension";
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '12px 24px';
    notification.style.backgroundColor = '#555';
    notification.style.color = 'white';
    notification.style.borderRadius = '25px';
    notification.style.zIndex = '9999';
    notification.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    notification.style.animation = 'fadein 0.5s, fadeout 0.5s 2.5s';
    notification.style.fontFamily = 'Arial, sans-serif';
    notification.style.fontSize = '20px';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
      loginForm.submit();
    }, 3000);
  }
});