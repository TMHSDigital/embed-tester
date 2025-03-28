# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Feature: Allow users to paste custom HTML embed code via textarea.
- Security: Improved iframe sandboxing for custom embeds by removing `allow-same-origin`.
- Documentation: Added JSDoc comments to JavaScript functions.
- Documentation: Added `CONTRIBUTING.md` file.
- Documentation: Added this `CHANGELOG.md` file.

### Changed
- Refactor: Moved button click handlers from inline HTML `onclick` attributes to JavaScript event listeners.
- Refactor: Moved iframe styling from inline JavaScript styles to a dedicated CSS class (`.embedded-iframe`).

### Fixed
- Fixed placeholder GitHub link in the footer of `docs/index.html`.

## [0.1.0] - YYYY-MM-DD
### Added
- Initial release of embed-tester.
- Basic HTML structure (`index.html`).
- Styling with dark mode support (`styles.css`).
- Core embed functionality for Map, Chart, YouTube (`embed.js`).
- `README.md` with project description and usage.
- `LICENSE` (Apache 2.0).
- `.gitignore`.
- `plan.md` for future development. 