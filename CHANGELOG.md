# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Feature: Add configurable sandbox permissions checkboxes for custom code embedding.
- Feature: Add responsiveness testing controls (Mobile, Tablet, Desktop, Fit) to resize embed container.
- Feature: Allow users to paste custom HTML embed code via textarea.
- Security: Improved iframe sandboxing for custom embeds by removing `allow-same-origin`.
- Security: Added Content Security Policy (CSP) via meta tag to restrict resource loading.
- Security: Added confirmation dialogs when enabling dangerous sandbox permissions (`allow-same-origin`, `allow-top-navigation`).
- Documentation: Updated README.md with comprehensive feature list and usage guide.
- Documentation: Added new API.md file with detailed function documentation.
- Documentation: Added JSDoc comments to JavaScript functions.
- Documentation: Added `CONTRIBUTING.md` file.
- Documentation: Added this `CHANGELOG.md` file.
- Style: Added `:focus` and `:active` states to buttons for better interactivity and accessibility.
- Feature: Save/Load custom embed code and sandbox permissions to/from localStorage.
- Accessibility: Add focus-visible styles for sandbox checkboxes.

### Changed
- Style: Revamped header/hero section with animated gradient and updated typography.
- Style: Improve overall typography, spacing, and visual hierarchy.
- Style: Restructure and visually enhance the Sandbox Permissions section for clarity.
- Design: Redesigned footer with improved links (Repo, Issues, License, LinkedIn, Instagram) and styling.
- Style: Refined button appearance (subtler hover/active effects, improved shadows, distinct Clear button).
- Style: Improved appearance of the embed container's initial state (icon, text, solid border, refined hover effect).
- Refactor: Moved button click handlers from inline HTML `onclick` attributes to JavaScript event listeners.
- Refactor: Moved iframe styling from inline JavaScript styles to a dedicated CSS class (`.embedded-iframe`).
- Feature: Improve placeholder text in embed area for better guidance.
- Feature: Implement standardized error message display for embeds.
- Style: Refine mobile responsiveness for header, buttons, padding, and sandbox controls.
- Style: Implement various visual improvements (border-radius, spacing, shadows, button styles).
- Style: Restyle 'Clear' button as secondary/outline button.
- Style: Refine styling for 'dangerous' sandbox options.

### Fixed
- Fixed placeholder GitHub link in the footer of `