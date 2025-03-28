# Embed-Tester API Documentation

This document provides detailed information about the JavaScript functions in `embed.js` that power the Embed-Tester application.

## Table of Contents

1. [Embedding Functions](#embedding-functions)
   - [embedElement()](#embedelement)
   - [embedCustomCode()](#embedcustomcode)
   - [clearEmbed()](#clearembed)
2. [UI Control Functions](#ui-control-functions)
   - [resizeEmbedContainer()](#resizeembedcontainer)
   - [toggleDarkMode()](#toggledarkmode)
   - [initDarkMode()](#initdarkmode)
3. [Event Handlers](#event-handlers)

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
4. Handles errors and appends the iframe to the container

#### Sandbox Permissions

- Map: `allow-scripts`
- Chart: `allow-scripts allow-popups`
- YouTube: `allow-scripts allow-popups allow-presentation allow-forms`

### embedCustomCode()

Embeds user-provided HTML code within a sandboxed iframe.

```javascript
embedCustomCode(containerId)
```

#### Parameters

- `containerId` (string): The ID of the HTML element where the iframe will be embedded.

#### Behavior

1. Reads HTML code from the `#custom-embed-code` textarea
2. Reads selected sandbox permissions from checkboxes
3. Shows security confirmation dialogs for dangerous permissions
4. Creates an iframe with the selected sandbox attributes
5. Sets the iframe's `srcdoc` attribute to the custom code
6. Handles errors and appends the iframe to the container

#### Security Features

- Enforces sandbox restrictions based on user-selected checkboxes
- Shows confirmation dialogs for dangerous permissions (`allow-same-origin`, `allow-top-navigation`)
- Defaults to maximum restrictions if no sandbox permissions are selected

### clearEmbed()

Clears the embed container and restores the placeholder content.

```javascript
clearEmbed(containerId)
```

#### Parameters

- `containerId` (string): The ID of the HTML element to clear.

#### Behavior

Replaces the container's content with the default placeholder (code icon and instructional text).

## UI Control Functions

These functions handle user interface controls.

### resizeEmbedContainer()

Resizes the embed container to simulate different viewport widths.

```javascript
resizeEmbedContainer(width)
```

#### Parameters

- `width` (string): The target width for the container (e.g., `"375px"`, `"768px"`, `"1024px"`, or empty string).

#### Behavior

Sets the `width` style property of the embed container. An empty string resets to the default (100% width).

### toggleDarkMode()

Toggles dark mode on/off and saves the preference.

```javascript
toggleDarkMode()
```

#### Behavior

1. Toggles the `dark-mode` class on the `body` element
2. Saves the current state to `localStorage` for persistence

### initDarkMode()

Initializes dark mode based on saved preference or system preference.

```javascript
initDarkMode()
```

#### Behavior

1. Checks for saved dark mode preference in `localStorage`
2. If no preference is saved, checks system preference using `prefers-color-scheme: dark`
3. Applies dark mode if either condition is true by adding the `dark-mode` class to the `body`

## Event Handlers

The application sets up several event listeners when the DOM content is loaded:

- **Embed Type Buttons**: `.map-btn`, `.chart-btn`, `.youtube-btn`, `.clear-btn` trigger their respective embedding functions.
- **Theme Toggle**: `.toggle-mode-btn` toggles dark mode.
- **Custom Embed**: `.custom-embed-btn` embeds the custom code.
- **Resize Buttons**: Each `.resize-btn` element triggers the resize function based on its `data-width` attribute.

## Usage Examples

### Embedding a Map

```javascript
embedElement('map', 'embed-container');
```

### Embedding Custom Code

```javascript
// Assumes the textarea has been filled with valid HTML
embedCustomCode('embed-container');
```

### Switching to Mobile View

```javascript
resizeEmbedContainer('375px');
```

### Clearing the Container

```javascript
clearEmbed('embed-container');
``` 