# Embed-Tester API Documentation

This document provides detailed information about the JavaScript functions in `embed.js` that power the Embed-Tester application.

**Note on CSS:** The CSS has been refactored into modular files in `docs/css/`:
- `base.css`: Root variables, body and container styles
- `header.css`: Header component styles
- `footer.css`: Footer component styles
- `buttons.css`: Button and control styles
The main `docs/styles.css` uses `@import` to include these files.

## Table of Contents

1. [Embedding Functions](#embedding-functions)
   - [embedElement()](#embedelement)
   - [embedCustomCode()](#embedcustomcode)
   - [clearEmbed()](#clearembed)
   - [previewCustomCode()](#previewcustomcode)
2. [UI Control Functions](#ui-control-functions)
   - [resizeEmbedContainer()](#resizeembedcontainer)
   - [toggleDarkMode()](#toggledarkmode)
   - [initDarkMode()](#initdarkmode)
3. [Configuration Functions](#configuration-functions)
   - [saveConfiguration()](#saveconfiguration)
   - [loadConfiguration()](#loadconfiguration)
4. [Accessibility](#accessibility)
   - [initAccessibility()](#initaccessibility)
5. [Error Handling](#error-handling)
   - [handleEmbedError()](#handleembederror)
   - [displayEmbedError()](#displayembederror)
6. [Help System](#help-system)
   - [helpSystem Object](#helpsystem-object)
7. [Utilities](#utilities)
   - [debounce()](#debounce)
8. [Event Handlers](#event-handlers)

## Embedding Functions

These functions handle the core functionality of embedding content.

### embedElement()

Embeds a predefined element type into a container.

```javascript
embedElement(type, containerId)
```

#### Parameters

- `type` (string): The type of element to embed. Available options:
  - `"map"`: Embeds a Google Maps iframe of New York City
  - `"chart"`: Embeds a Plotly chart example
  - `"youtube"`: Embeds a YouTube video
- `containerId` (string): The ID of the HTML element where the iframe will be embedded.

#### Behavior

1. Displays a loading message in the container
2. Creates an iframe with appropriate sandbox attributes for the embed type
3. Sets the iframe source based on the type
4. Uses `handleEmbedError()` for error reporting (including a loading timeout)
5. Appends the iframe to the container on successful load

#### Sandbox Permissions

- Map: `allow-scripts`
- Chart: `allow-scripts allow-popups`
- YouTube: `allow-scripts allow-popups allow-presentation allow-forms`

### embedCustomCode()

Embeds user-provided HTML code within a sandboxed iframe.

```javascript
embedCustomCode(containerId, skipConfirmation = false)
```

#### Parameters

- `containerId` (string): The ID of the HTML element where the iframe will be embedded.
- `skipConfirmation` (boolean, optional): Defaults to `false`. If `true`, the function will *not* show confirmation dialogs for dangerous sandbox permissions. This is primarily used by `loadConfiguration()` for automatic loading on page start.

#### Behavior

1. Reads HTML code from the `#custom-embed-code` textarea
2. Reads selected sandbox permissions from checkboxes
3. Shows security confirmation dialogs for dangerous permissions (unless `skipConfirmation` is true)
4. Creates an iframe with the selected sandbox attributes
5. Sets the iframe's `srcdoc` attribute to the custom code
6. Uses `handleEmbedError()` for error reporting
7. Appends the iframe to the container

#### Security Features

- Enforces sandbox restrictions based on user-selected checkboxes
- Shows confirmation dialogs for dangerous permissions (`allow-same-origin`, `allow-top-navigation`) unless skipped
- Defaults to maximum restrictions (empty `sandbox` attribute) if no permissions are selected

### clearEmbed()

Clears the embed container and restores the placeholder content.

```javascript
clearEmbed(containerId)
```

#### Parameters

- `containerId` (string): The ID of the HTML element to clear.

#### Behavior

Replaces the container's content with the default placeholder (code icon and instructional text).

### previewCustomCode()

Generates a static preview of the custom HTML code.

```javascript
previewCustomCode()
```

#### Parameters

None.

#### Behavior

1. Reads HTML code from the `#custom-embed-code` textarea.
2. Clears any previous preview content in `#preview-container`.
3. If code is present, uses `DOMParser` to parse the HTML.
4. Displays a warning within the preview container if `<script>` tags are detected.
5. Appends the parsed body content to the `#preview-container`.
6. Displays an error message in the container if parsing fails.
7. Shows the `#preview-container`.

## UI Control Functions

These functions handle user interface controls.

### resizeEmbedContainer()

Resizes the embed container to simulate different viewport widths.

**Note:** This function is typically called via the debounced version (`debouncedResizeEmbedContainer`).

```javascript
resizeEmbedContainer(width)
```

#### Parameters

- `width` (string): The target width for the container (e.g., `"375px"`, `"768px"`, `"1024px"`, or empty string `""` for 100%).

#### Behavior

Sets the `width` style property of the embed container (`#embed-container`).

### toggleDarkMode()

Toggles dark mode on/off and saves the preference.

```javascript
toggleDarkMode()
```

#### Behavior

1. Toggles the `dark-mode` class on the `body` element.
2. Saves the current state (`true` or `false`) to `localStorage` under the key `darkMode`.

### initDarkMode()

Initializes dark mode based on saved preference or system preference.

```javascript
initDarkMode()
```

#### Behavior

1. Checks for saved dark mode preference in `localStorage` (`darkMode` key).
2. Checks system preference using `window.matchMedia('(prefers-color-scheme: dark)')`.
3. Applies the `dark-mode` class to the `body` if the saved preference is `"true"` or if no preference is saved and the system prefers dark mode.

## Configuration Functions

These functions handle saving and loading user configurations.

### saveConfiguration()

Saves the current custom embed code and selected sandbox permissions to `localStorage`.

```javascript
saveConfiguration()
```

#### Behavior

1. Reads the value from `#custom-embed-code`.
2. Reads the values of all checked sandbox permission checkboxes.
3. Stores this data as a JSON string in `localStorage` under the key `embedTesterConfig`.
4. Provides visual feedback on the "Save Config" button.
5. Includes basic error handling for `localStorage` issues.

### loadConfiguration()

Loads configuration from `localStorage`, applies it, and attempts to embed the code.

```javascript
loadConfiguration()
```

#### Behavior

1. Reads the JSON string from `localStorage` (`embedTesterConfig` key).
2. Parses the JSON data.
3. Sets the value of `#custom-embed-code`.
4. Resets all sandbox checkboxes and checks the ones specified in the loaded configuration.
5. Calls `embedCustomCode('embed-container', true)` to automatically embed the loaded code, skipping dangerous permission confirmations.
6. Includes error handling for parsing issues and clears potentially corrupted data.

## Accessibility

Functions and practices related to accessibility.

### initAccessibility()

Initializes keyboard navigation shortcuts and focus management improvements.

```javascript
initAccessibility()
```

#### Behavior

1. Adds a `keydown` event listener to the document:
   - Listens for `Ctrl+Key` (or `Meta+Key` on Mac) combinations for shortcuts (e.g., `Ctrl+E` for Embed, `Ctrl+C` for Clear).
   - Ignores key presses when focus is inside an `INPUT` or `TEXTAREA`.
   - Calls `preventDefault()` for recognized shortcuts.
2. Adds `focusin` and `focusout` listeners to the `#embed-container` to toggle a `.focused` class (used for styling).
3. Adds `focusin` and `focusout` listeners to all interactive elements (`button`, `input`, `textarea`, `[tabindex="0"]`) to toggle a `.focus-visible` class (used for custom focus ring styling).

## Error Handling

Functions related to error display and handling.

### handleEmbedError()

Displays standardized error messages based on error type and logs the error.

```javascript
handleEmbedError(error, containerId)
```

#### Parameters

- `error` (object): An object containing error details. Expected properties:
  - `type` (string, optional): A predefined error type key (e.g., `NETWORK_ERROR`, `LOAD_ERROR`). Defaults to `DEFAULT`.
  - `message` (string, optional): A specific message to use (overrides default message for the type).
  - `originalError` (any, optional): The original error object caught, used for logging.
- `containerId` (string): The ID of the container where the error message should be displayed.

#### Behavior

1. Determines the error message based on `error.type` or uses a default message.
2. Calls `displayEmbedError()` to show the message in the specified container.
3. Logs the detailed error object (`error`) to the console using `console.error()`.

### displayEmbedError()

(Internal Helper) Displays an error message within a container, optionally clearing it after a delay.

```javascript
displayEmbedError(containerId, message, clearAfterMs = 0)
```

#### Parameters

- `containerId` (string): The ID of the container element.
- `message` (string): The error message text to display.
- `clearAfterMs` (number, optional): If greater than 0, the number of milliseconds after which to clear the error message by calling `clearEmbed()`. Defaults to 0 (no auto-clear).

#### Behavior

1. Finds the container element.
2. Sets the `innerHTML` of the container to `<p class="error">${message}</p>`.
3. If `clearAfterMs` is set, schedules a `setTimeout` to call `clearEmbed(containerId)` after the specified duration, but only if the error message hasn't been replaced by other content in the meantime.

## Help System

Provides context-sensitive help via tooltips.

### helpSystem Object

An object containing the logic and data for the help tooltips.

```javascript
const helpSystem = { ... };
```

#### Properties

- `topics` (object): A key-value store where keys are topic identifiers (e.g., `"sandbox"`, `"allow-scripts"`) and values are the HTML help text strings.
- `activeTooltip` (HTMLElement | null): Reference to the currently displayed tooltip element, or `null` if none is active.
- `boundHandleOutsideClick` (Function | null): Stores the bound reference to the `handleOutsideClick` function for proper event listener removal.

#### Methods

- `init()`: Initializes the system. Adds a delegated click listener to `.sandbox-controls` to handle clicks on `.help-icon` elements. Also adds `title` attributes to non-dangerous permission labels for hover help.
- `showTooltip(topic, targetElement)`: Creates and displays a tooltip for the given `topic` near the `targetElement`. Handles positioning and adds an outside click listener to hide the tooltip.
- `hideTooltip()`: Removes the currently active tooltip from the DOM and removes the associated outside click listener.
- `handleOutsideClick(event)`: The event handler (bound to `helpSystem`) used to detect clicks outside the active tooltip or its trigger icon, calling `hideTooltip()` if necessary.

## Utilities

General utility functions.

### debounce()

Creates a debounced version of a function that delays invoking the function until after `wait` milliseconds have elapsed since the last time the debounced function was invoked.

```javascript
const debouncedFunction = debounce(func, wait);
debouncedFunction(...args);
```

#### Parameters

- `func` (Function): The function to debounce.
- `wait` (number): The number of milliseconds to delay.

#### Returns

- (Function): The new debounced function.

## Event Handlers

Primary event handling is set up within the `DOMContentLoaded` listener and the `helpSystem.init()` method. This includes listeners for:

- Embed type buttons (`.map-btn`, `.chart-btn`, `.youtube-btn`)
- Clear button (`.clear-btn`)
- Theme toggle button (`.toggle-mode-btn`)
- Custom embed button (`.custom-embed-btn`)
- Resize buttons (`.resize-btn`) - Uses the `debouncedResizeEmbedContainer` function.
- Save/Load config buttons (`#save-config-btn`, `#load-config-btn`)
- Preview button (`#preview-btn`)
- Help icons (`.help-icon`) - Handled via delegation in `helpSystem.init()`.
- Keyboard shortcuts (`keydown` listener in `initAccessibility`).
- Focus management (`focusin`/`focusout` listeners in `initAccessibility`).
- Outside clicks for help tooltips (`click` listener added/removed by `helpSystem`).