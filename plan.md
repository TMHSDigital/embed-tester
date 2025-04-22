# Embed Tester - Development Plan

## Current State
- Static site hosted via GitHub Pages from the `docs/` directory
- Modern, responsive UI with dark mode support
- Support for multiple embed types:
  - Google Maps
  - Plotly Chart (example)
  - YouTube Videos
- Custom code embedding with configurable sandbox
- Features:
  - Glassmorphic UI elements
  - System-aware and manual dark mode with localStorage persistence
  - Responsive design and testing controls
  - Sandboxed iframes with `srcdoc` for security
  - Custom code preview
  - Loading states and improved error handling
  - Save/Load configuration to localStorage
  - Accessibility enhancements (Keyboard nav, focus states)
  - Minimalistic help tooltip system
  - Performance optimizations (debouncing, lazy loading)

## Technical Improvements
- [ ] Add comprehensive test suite
- [ ] Implement CI/CD pipeline
- [ ] Add service worker for offline support
- [x] Improve accessibility features (Progress made, ongoing)
- [ ] Add automated security scanning

## Documentation
- [x] Create detailed API documentation (Updated)
- [x] Add usage examples (Added to README)
- [x] Create contribution guidelines (File exists, needs review)
- [ ] Add security policy (`SECURITY.md`)
- [x] Create changelog (Exists) 