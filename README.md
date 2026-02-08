# WP Code Guardian 🛡️

**WP Code Guardian** is the definitive "one-stop" solution for WordPress developers. It eliminates the manual headache of setting up `PHPCS`, `WPCS`, and `ESLint`. Open your project, and the Guardian takes care of the rest—installing dependencies, configuring rules, and fixing your code automatically.

---

## ✨ Key Features

* **🚀 Zero-Config Provisioning**: Automatically detects if PHPCS (WordPress Standards) or ESLint are missing and offers to install them locally via Composer or NPM.
* **⚛️ React & Gutenberg Ready**: Pre-configured ESLint rules specifically for modern WordPress development, including full React and JSX support.
* **📂 Smart Config Injection**: Automatically generates optimized `phpcs.xml` and `.eslintrc.json` files in your workspace if they are missing.
* **⚡ Instant Auto-Fixing**: Resolves coding standard violations (whitespace, naming conventions, docblocks) on every save or via a single command.
* **🛡️ Project Health**: Ensures your entire team is using the same standards without any manual setup.

---

## 🛠 How It Works



1.  **Open any WordPress Project**: The extension instantly scans your environment.
2.  **One-Click Setup**: If tools like `wp-coding-standards` are missing, a notification prompts you to install them.
3.  **Automatic Configuration**: The Guardian drops standard-compliant config files into your root directory.
4.  **Code & Save**: As you write code, hit `Ctrl+S` (or `Cmd+S`). The extension runs `PHPCBF` and `ESLint --fix` in the background to clean your code instantly.

---

## 📋 Requirements

To ensure the automated installers can run, please verify that you have the following installed globally on your system:

* **Node.js & npm** (v18 or higher recommended)
* **PHP** (v7.4 or higher)
* **Composer** (v2.0 or higher)

---

## ⌨️ Commands

| Command | Description |
| :--- | :--- |
| `WP Guardian: Fix Current File` | Manually triggers the PHP and JS fixers on the active document. |

---

## ⚙️ Extension Settings

This extension is designed to be **zero-config**. It uses the local binaries and configuration files generated in your workspace to ensure maximum compatibility with your specific project.

---

## 📜 Release Notes

### 1.0.0
* Initial Launch! 🚀
* Automated setup for **PHPCS** and **WordPress Coding Standards (WPCS) 3.0+**.
* Automated setup for **ESLint** with `@wordpress/eslint-plugin` and React support.
* "Fix on Save" integration for PHP, JS, and JSX files.
* Automatic generation of `phpcs.xml` and `.eslintrc.json`.

---

## 🐛 Known Issues

* **Path Spaces**: On some Windows systems, ensure your PHP/Node paths do not contain unusual characters.
* **Large Files**: Formatting files over 10,000 lines may result in a slight delay on save.

---

## 🤝 Contributing & Support

Created with ❤️ by **[Aditya Dubey](https://github.com/cyberadityacode)** **[cyberadityacode]**.

If you encounter any issues or have suggestions for new features, please visit our [GitHub Repository](https://github.com/cyberadityacode/wp-code-guardian) to open an issue or submit a pull request.

**Happy Coding!**