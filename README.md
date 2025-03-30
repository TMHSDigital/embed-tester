# embed-tester

<div align="center">

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg?style=for-the-badge)](https://tmhsdigital.github.io/embed-tester)
[![License](https://img.shields.io/badge/license-Apache%202.0-blue.svg?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

  <h1>embed-tester</h1>
  <p>A modern, lightweight site to test embeddable elements, such as maps, charts, and interactive widgets.</p>

  <!-- Animated Divider -->
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

  <!-- Animated Banner -->
  <div style="position: relative; width: 100%; height: 0; padding-bottom: 56.25%; overflow: hidden; background: rgba(0,0,0,0.1); z-index: 0;">
    <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDZ5aXl6dXUzY3gxbDNldG00dWtsNTJ0NWEzdWN5bXM3bnNvMjlsbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/L6Mgrfcc6Y9PS2Nm6B/giphy.gif" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; opacity: 0.15; pointer-events: none;" alt="Background GIF">
  </div>

  <!-- Animated Divider -->
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">

  <!-- Animated Text -->
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=2EF7A5&center=true&vCenter=true&width=435&lines=Welcome+to+embed-tester;Test+Your+Embeddable+Elements;Enjoy+the+Demo" alt="Typing SVG" />

</div>

## Features

- **Predefined Embeds:** Quickly test common embeds like Google Maps, Plotly Charts (example), and YouTube videos.
- **Custom Code Input:** Paste your own HTML embed code into a textarea for testing.
- **Responsive Testing:** Resize the embed container instantly to common device widths (Mobile, Tablet, Desktop) or fit it to the available space.
- **Configurable Sandbox:** Dynamically adjust the `sandbox` attribute permissions for the custom embed iframe using checkboxes. Dangerous permissions (`allow-same-origin`, `allow-top-navigation`) trigger user confirmation dialogs.
- **Dark Mode:** Toggle between light and dark themes, with preference saved to `localStorage`.
- **Save/Load Configuration:** Save your custom embed code and selected sandbox permissions to `localStorage` and automatically load them on your next visit. Use the "Save Config" and "Load Config" buttons.
- **Clean UI:** Modern interface with clear controls and improved error/placeholder feedback.
- **Security Conscious:** Uses `srcdoc` for custom code, dynamically configured `sandbox` attributes, and a Content Security Policy (CSP) meta tag.

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/TMHSDigital/embed-tester.git
   cd embed-tester
   ```

2. **Open in browser**
   ```

## Project Structure

The website files are in the `docs` folder for GitHub Pages compatibility:

```
docs/
├── index.html          # Main HTML file
├── styles.css         # Main CSS file (imports others)
├── embed.js          # Core functionality
├── API.md           # API documentation
└── css/            # CSS modules
    ├── base.css    # Root variables, body, containers
    ├── header.css  # Header styles
    ├── footer.css  # Footer styles  
    └── buttons.css # Button and control styles
```

## Usage Guide