<h1 id="top" align="center">Calendar Card Plus</h1>

<p align="center">
  <a href="https://github.com/hacs/integration">
    <img src="https://img.shields.io/badge/hacs-default-orange.svg?style=for-the-badge" alt="HACS">
  </a>
  <a href="https://github.com/xBourner/calendar-card-plus/releases">
    <img src="https://img.shields.io/github/downloads/xBourner/calendar-card-plus/total?style=for-the-badge" alt="GitHub Downloads">
  </a>
  <a href="https://github.com/xBourner/calendar-card-plus/releases/">
    <img src="https://img.shields.io/github/release/xBourner/calendar-card-plus?style=for-the-badge" alt="GitHub release">
  </a>
  <a href="https://github.com/xBourner/calendar-card-plus">
    <img src="https://img.shields.io/github/stars/xBourner/calendar-card-plus?style=for-the-badge" alt="Stars">
  </a>
  <a href="https://github.com/xBourner/calendar-card-plus/issues">
    <img src="https://img.shields.io/github/issues/xBourner/calendar-card-plus?style=for-the-badge" alt="Issues">
  </a>
</p>

## Overview

**Calendar Card Plus** is a beautiful, highly customizable custom card for Home Assistant Dashboards, inspired by the elegant calendar widget from Apple CarPlay. 

It upgrades your dashboard by providing a clean, dynamic, and intuitive view of your upcoming events, supporting multiple calendars simultaneously without the clutter.

<p align="center">
  <img width="49%" alt="Calendar Card View" src="https://github.com/xBourner/calendar-card-plus/blob/main/.github/images/calendar-card-plus.png">
&nbsp; 
  <img width="49%" alt="Calendar Popup View" src="https://github.com/xBourner/calendar-card-plus/blob/main/.github/images/calendar-card-plus_extended.png">
</p>

## ✨ Features

- 🍎 **Apple CarPlay Aesthetics** - Enjoy a sleek, modern, and beautiful design with dynamic, localized calendar icons.
- 📅 **Multi-Calendar Support** - Displays events from multiple calendars at once natively.
- 📱 **Fully Responsive** - Perfectly optimized layouts for both desktop dashboards and mobile devices.
- 🔍 **Interactive Popup View** - Click to reveal a detailed popup with beautifully formatted event lists.
- 🌍 **Full Localization** - Date formats, relative times, and month abbreviations automatically match your Home Assistant language.
- 🎨 **Highly Customizable** - Extensive styling options, dynamic icons, color routing, and feature toggles.
- 🧠 **GUI Editor Ready** - No YAML required! Setup and customize everything directly from the visual UI editor.

## 📥 Installation

### Method 1: HACS (Recommended)

The easiest way to install and keep **Calendar Card Plus** updated is via HACS.

[![Open in HACS](https://my.home-assistant.io/badges/hacs_repository.svg)](https://my.home-assistant.io/redirect/hacs_repository/?owner=xBourner&repository=calendar-card-plus&category=plugin)

1. Ensure [HACS](https://hacs.xyz) is installed.
2. Open HACS in Home Assistant.
3. Search for **Calendar Card Plus**.
4. Download and Install.
5. **Clear your browser cache** and refresh (F5) the page.

### Method 2: Manual Install

1. Download calendar-card-plus.js file from the latest release.
2. Put calendar-card-plus.js file into your config/www folder.
3. Add reference to calendar-card-plus.js in Dashboard. There's two way to do that:
   - Using UI: Settings → Dashboards → More Options icon → Resources → Add Resource → Set Url as /local/calendar-card-plus.js → Set Resource type as JavaScript Module. Note: If you do not see the Resources menu, you will need to enable Advanced Mode in your User Profile
   - Using YAML: Add following code to lovelace section.
     ```yaml
      resources:
      - url: /local/calendar-card-plus.js
        type: module
    
## ⚙️ Configuration & Usage

Once installed, simply edit your dashboard, click **Add Card**, and search for **Calendar Card Plus**. The visual editor will guide you through all options!

For advanced configuration and YAML examples, please visit the [Wiki](https://github.com/xBourner/calendar-card-plus/wiki).

### 🎥 Video Tutorial

Want to see the Status Card in action? Check out this excellent showcase and tutorial video (🇩🇪 German language):

[![Calendar Card Plus Tutorial](https://img.youtube.com/vi/fHPj5u0S6GU/0.jpg)](https://www.youtube.com/watch?v=fHPj5u0S6GU&t=819)

## ❤️ Support My Work

Developing and maintaining custom cards takes a lot of time and coffee. If you enjoy using Calendar Card Plus and want to support its ongoing development, I would greatly appreciate it!

<p align="center">
  <a href="https://discord.gg/RfVx7hmZD3">
    <img src="https://img.shields.io/discord/1341456711835455609?style=for-the-badge&logo=discord&logoColor=%237289da&label=Discord&color=%237289da" alt="Discord">
  </a>
  <a href="https://www.buymeacoffee.com/bourner">
    <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?&logo=buy-me-a-coffee&logoColor=black&style=for-the-badge" alt="Buy Me A Coffee">
  </a>
  <a href="https://github.com/sponsors/xBourner">
    <img src="https://img.shields.io/badge/Sponsor%20on%20GitHub-30363d?style=for-the-badge&logo=github&logoColor=white" alt="GitHub Sponsors">
  </a>
  <a href="https://www.paypal.me/gibgas123">
    <img src="https://img.shields.io/badge/PayPal-003087?logo=paypal&logoColor=fff&style=for-the-badge" alt="PayPal">
  </a>
</p>

Join the <a href="https://discord.gg/RfVx7hmZD3"> **community Discord server**</a> to leave feedback, request features, or get help with your configuration.

---

[🔝 Back to top](#top)


