<div align="center">
  <h1 style="font-size: 3rem; font-weight: 700; margin-bottom: 1rem; background: linear-gradient(to right, #4facfe 0%, #00f2fe 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">EMBED-TESTER</h1>
  
  <p style="font-size: 1.2rem; font-weight: 500; margin-bottom: 1.5rem; background: linear-gradient(to right, #a1c4fd 0%, #c2e9fb 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Test your embeddable elements with ease</p>
  
  <div style="display: flex; justify-content: center; gap: 1rem; margin-bottom: 1.5rem;">
    <span style="padding: 0.5rem 1rem; border-radius: 8px; background: linear-gradient(to right, #84fab0 0%, #8fd3f4 100%); font-weight: 600; color: #1a202c;">Modern UI</span>
    <span style="padding: 0.5rem 1rem; border-radius: 8px; background: linear-gradient(to right, #fa709a 0%, #fee140 100%); font-weight: 600; color: #1a202c;">Secure</span>
    <span style="padding: 0.5rem 1rem; border-radius: 8px; background: linear-gradient(to right, #a18cd1 0%, #fbc2eb 100%); font-weight: 600; color: #1a202c;">Responsive</span>
  </div>
</div>

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

<div align="center">
  <h2 style="font-size: 2.2rem; margin-top: 2rem; margin-bottom: 1.5rem; background: linear-gradient(to right, #6a11cb 0%, #2575fc 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Features</h2>
</div>

- **Predefined Embeds:** Quickly test common embeds like Google Maps, Plotly Charts (example), and YouTube videos.
- **Custom Code Input:** Paste your own HTML embed code into a textarea for testing.
- **Responsive Testing:** Resize the embed container instantly to common device widths (Mobile, Tablet, Desktop) or fit it to the available space.
- **Configurable Sandbox:** Dynamically adjust the `sandbox` attribute permissions for the custom embed iframe using checkboxes. Dangerous permissions (`allow-same-origin`, `allow-top-navigation`) trigger user confirmation dialogs.
- **Dark Mode:** Toggle between light and dark themes, with preference saved to `localStorage`.
- **Save/Load Configuration:** Save your custom embed code and selected sandbox permissions to `localStorage` and automatically load them on your next visit. Use the "Save Config" and "Load Config" buttons.
- **Clean UI:** Modern interface with clear controls and improved error/placeholder feedback.
- **Security Conscious:** Uses `srcdoc` for custom code, dynamically configured `sandbox` attributes, and a Content Security Policy (CSP) meta tag.

<div align="center">
  <h2 style="font-size: 2.2rem; margin-top: 2rem; margin-bottom: 1.5rem; background: linear-gradient(to right, #ff9a9e 0%, #fad0c4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Quick Start</h2>
</div>

1. **Clone the repository**
   ```bash
   git clone https://github.com/TMHSDigital/embed-tester.git
   cd embed-tester
   ```

2. **Open in browser**
   ```

<div align="center">
  <h2 style="font-size: 2.2rem; margin-top: 2rem; margin-bottom: 1.5rem; background: linear-gradient(to right, #43e97b 0%, #38f9d7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Project Structure</h2>
</div>

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

