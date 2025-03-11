# Moodle Auto Login Chrome Extension (Secure Version)

## 📌 Overview

This is a **secure** Chrome extension that automatically logs you into your Moodle account every **20 minutes**. The extension securely stores your credentials and triggers an auto-login process when needed.

## ✨ Features

- ✅ **Auto-login every 20 minutes** to prevent session expiration.
- ✅ **Secure credential storage** (no hardcoded credentials).
- ✅ **Options page** to input Moodle login URL, username, and password.
- ✅ **Quick-select Moodle URL dropdown** for commonly used Moodle systems.
- ✅ **Lightweight & efficient**—runs in the background without affecting performance.

## 🛠 Installation

1. **Download the extension**
2. **Extract the ZIP file**.
3. Open **Google Chrome** and navigate to `chrome://extensions/`.
4. Enable **Developer Mode** (toggle in the top-right corner).
5. Click **"Load unpacked"**, then select the extracted folder.
6. The extension is now installed! 🎉

## 🔧 Usage

### 🧑‍🏫 User Manual

1. After installing the extension:
   - Click on the extension icon in Chrome.
2. In the **Settings interface**:
   - Enter your **Moodle username** and **password**.
   - Paste your **Moodle login URL** (e.g., `https://moodle3.ntnu.edu.tw/login/index.php`).
   - Or simply use the **Quick Select Moodle URL** dropdown to auto-fill the login URL.
3. Click **Save**. Your credentials and URL will be securely stored.
4. The extension will now **auto-login to Moodle every 20 minutes**, and show a **notification popup** each time it does so.

## 📌 Notes

- **Will this extension work for all Moodle websites?**
  - ✅ Yes! As long as the Moodle login form uses standard username/password input fields (`input[name="username"]` and `input[name="password"]`). If your Moodle instance uses a different login structure, minor modifications may be needed.
- **Is my password secure?**
  - ✅ Yes. The extension **does not store passwords in plain text** in the code. It uses `chrome.storage.local`, which encrypts stored data.
- **Can I change the auto-login interval?**
  - ✅ Yes. You can modify the `background.js` file to adjust the time interval.

## 🔧 Customization

### Change the Auto-login Interval

1. Open `background.js`
2. Find this line:
   ```js
   setInterval(() => {
   ```
3. Change `20 * 60 * 1000` (20 minutes) to your desired interval (e.g., `10 * 60 * 1000` for 10 minutes).

### Modify for Custom Moodle Login Pages

If your Moodle login page does not use the default `username` and `password` fields:

1. Open `login.js`
2. Update the query selectors:
   ```js
   const userInput = document.querySelector('input[name="your_custom_username"]');
   const passInput = document.querySelector('input[name="your_custom_password"]');
   ```
3. Save and reload the extension.

## 💖 [Contribution](https://github.com/marsyang2410)

Pull requests are welcome! If you find a bug or have suggestions, open an issue on [GitHub](https://github.com/yourusername/moodle-auto-login).

## 📜 License

This project is open-source under the [MIT License](LICENSE). Feel free to use and modify it!

---

💡 **Maintained by:** [Mars](https://github.com/marsyang2410)

