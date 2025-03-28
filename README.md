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

- **Responsive Testing** - Instantly test how embeds look at different viewport widths (Mobile, Tablet, Desktop)
- **Custom Code Embedding** - Paste any HTML code to test within a secure sandbox
- **Configurable Sandbox** - Fine-tune iframe sandbox permissions to test functionality vs security
- **Map Embeds** - Test Google Maps and other mapping services
- **Chart Embeds** - Visualize data with chart libraries (using Plotly)
- **Video Embeds** - YouTube and other video platform integration
- **Dark Mode** - Automatic dark mode based on system preferences or manual toggle
- **Responsive Design** - Optimized layout for all devices
- **Performance** - Lightweight and optimized
- **Security** - Content Security Policy and sandboxed iframes for protection

## Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/TMHSDigital/embed-tester.git
   cd embed-tester
   ```

2. **Open in browser**
   ```bash
   # Using Python
   python -m http.server 8000 --directory docs
   # OR using Node.js
   npx serve docs
   ```

3. Visit `http://localhost:8000` in your browser

## Project Structure

The website files are located in the `docs` folder for GitHub Pages compatibility:

```
docs/
├── index.html      # Main HTML file
├── styles.css      # Styling
└── embed.js        # Embed functionality
```

## Usage Guide

### Testing Predefined Embeds
Click on any of the preset buttons (Map, Chart, YouTube) to load an example embed in the preview area.

### Testing Custom Code
1. Paste your HTML embed code into the text area
2. Configure sandbox permissions as needed (see security section below)
3. Click "Embed Custom Code" to render your embed

### Responsive Testing
Use the sizing controls (Mobile, Tablet, Desktop, Fit Container) to see how your embed looks at different viewport widths.

### Security Controls
The sandbox permissions section allows you to configure which capabilities your embedded content has:

- **allow-scripts** - Permits JavaScript execution (enabled by default)
- **allow-popups** - Allows opening new windows/popups
- **allow-forms** - Enables form submission
- **allow-presentation** - Permits entering fullscreen mode
- **allow-modals** - Allows displaying modal dialogs

**Advanced/Dangerous Permissions** (require confirmation):
- **allow-same-origin** - Gives embedded content access to the parent page (risky)
- **allow-top-navigation** - Allows redirecting the entire page (risky)

## Security Features

- **Content Security Policy (CSP)** - Restricts resource loading to trusted sources
- **Sandboxed iframes** - All embeds are isolated by default
- **Confirmation Dialogs** - Warns when enabling potentially dangerous permissions
- **Security Visual Indicators** - Clearly highlights risky settings

## Contributing

Contributions are welcome! Feel free to:

- Report bugs
- Suggest features
- Submit pull requests

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

This project is open source and available under the Apache 2.0 License.

<!-- Animated Divider -->
<div align="center">
  <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif">
</div>

<!-- Footer -->
<div align="center">
  <p>A project by <a href="https://github.com/TMHSDigital">TMHSDigital</a></p>
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=100&section=footer" width="100%" alt="Footer"/>
</div>
