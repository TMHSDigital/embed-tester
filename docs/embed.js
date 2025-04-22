/**
 * Embeds a predefined element type (map, chart, youtube) into a specified container.
 * Displays a loading message, creates an iframe, sets the appropriate src and sandbox attributes,
 * handles errors, and appends the iframe to the container.
 * 
 * @param {'map' | 'chart' | 'youtube'} type The type of element to embed.
 * @param {string} containerId The ID of the HTML element to embed the iframe into.
 */
function embedElement(type, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        handleEmbedError({ type: 'DEFAULT', message: 'Container not found' }, containerId);
        return;
    }
    
    // Clear previous content and show loading immediately
    container.innerHTML = '<div class="loading">Loading embed...</div>';
    
    const element = document.createElement('iframe');
    element.classList.add('embedded-iframe');
    element.setAttribute('loading', 'lazy');
    
    let isLoading = true; // Flag to track loading state

    try {
        // Add the iframe to the DOM first (hidden)
        element.style.display = 'none';
        container.appendChild(element);

        // Configure sandbox and src based on type
        switch (type) {
            case 'map':
                element.setAttribute('sandbox', 'allow-scripts');
                element.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25987701089373!3d40.69766998831435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1614118575811!5m2!1sen!2sus';
                break;
            case 'chart':
                element.setAttribute('sandbox', 'allow-scripts allow-popups');
                element.src = 'https://plotly.com/~chris/1638.embed';
                break;
            case 'youtube':
                element.setAttribute('sandbox', 'allow-scripts allow-popups allow-presentation allow-forms');
                element.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
                break;
            default:
                element.remove(); // Clean up the hidden iframe
                isLoading = false;
                handleEmbedError({ type: 'DEFAULT', message: 'Unsupported embed type' }, containerId);
                return;
        }
        
        // Set timeout for loading
        const timeout = setTimeout(() => {
            if (isLoading) {
                element.remove(); // Clean up the hidden iframe
                handleEmbedError({ type: 'NETWORK_ERROR', message: 'Loading timeout' }, containerId);
                isLoading = false;
            }
        }, 15000);
        
        element.onload = () => {
            if (!isLoading) {
                element.remove(); // Clean up if we're no longer in loading state
                return;
            }
            clearTimeout(timeout);
            isLoading = false;
            container.innerHTML = ''; // Clear loading message
            container.appendChild(element); // Move iframe to final position
            element.style.display = ''; // Show the iframe
        };
        
        element.onerror = (error) => {
            if (!isLoading) return;
            clearTimeout(timeout);
            isLoading = false;
            element.remove(); // Clean up the hidden iframe
            handleEmbedError({ type: 'LOAD_ERROR', originalError: error }, containerId);
        };

    } catch (error) {
        if (element.parentNode) {
            element.remove(); // Clean up the iframe if it was added
        }
        isLoading = false;
        handleEmbedError({ type: 'DEFAULT', originalError: error }, containerId);
    }
}

/**
 * Displays a standardized error message within the specified container.
 *
 * @param {string} containerId The ID of the container element.
 * @param {string} message The error message to display.
 * @param {number} [clearAfterMs=0] Optional: Milliseconds after which to clear the error and show placeholder.
 */
function displayEmbedError(containerId, message, clearAfterMs = 0) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `<p class="error">${message}</p>`;

    if (clearAfterMs > 0) {
        setTimeout(() => {
            // Only clear if the error message is still the current content
            if (container.querySelector('.error')?.textContent === message) {
                clearEmbed(containerId);
            }
        }, clearAfterMs);
    }
}

/**
 * Clears the content of the embed container and replaces it with placeholder text.
 * 
 * @param {string} containerId The ID of the HTML element to clear.
 */
function clearEmbed(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <div class="placeholder-content">
            <i class="fas fa-code" aria-hidden="true"></i>
            <p class="placeholder-title">Embed Preview Area</p>
            <p class="placeholder-text">Use controls above or paste code below.</p>
            <p class="placeholder-subtext">If content fails to load, check URL/code validity, <br>and potential cross-origin/CSP restrictions.</p>
        </div>
    `;
}

/**
 * Embeds custom HTML code provided by the user into a sandboxed iframe.
 * Reads the code from the #custom-embed-code textarea, displays loading/error messages,
 * creates an iframe, sets its srcdoc and sandbox attributes for security, and appends it.
 * 
 * @param {string} containerId The ID of the HTML element to embed the custom code into.
 * @param {boolean} [skipConfirmation=false] If true, skips dangerous permission confirmations (used for auto-load).
 */
function embedCustomCode(containerId, skipConfirmation = false) {
    const container = document.getElementById(containerId);
    const codeInput = document.getElementById('custom-embed-code');
    const sandboxCheckboxes = document.querySelectorAll('.sandbox-options input[name="sandbox"]:checked');
    if (!container || !codeInput) return;

    const customCode = codeInput.value.trim();
    if (!customCode) {
        displayEmbedError(containerId, 'Please paste embed code first.', 3000);
        return;
    }

    // Build sandbox string from checked boxes
    let sandboxPermissions = [];
    sandboxCheckboxes.forEach(checkbox => {
        sandboxPermissions.push(checkbox.value);
    });
    const sandboxString = sandboxPermissions.join(' ');

    // Confirmation for dangerous permissions (unless skipping)
    let proceed = true;
    if (!skipConfirmation) { // Only confirm if not skipping
        if (sandboxPermissions.includes('allow-same-origin')) {
            proceed = window.confirm("⚠️ SECURITY WARNING: You have enabled 'allow-same-origin'.\n\nThis allows the embedded content to potentially access and control this page (read cookies, change content).\n\nOnly proceed if you ABSOLUTELY trust the source of the embed code.\n\nDo you want to continue?");
        }
        if (proceed && sandboxPermissions.includes('allow-top-navigation')) {
            proceed = window.confirm("⚠️ SECURITY WARNING: You have enabled 'allow-top-navigation'.\n\nThis allows the embedded content to redirect this entire page to another website.\n\nOnly proceed if you ABSOLUTELY trust the source of the embed code.\n\nDo you want to continue?");
        }
    }

    if (!proceed) {
        displayEmbedError(containerId, 'Embedding cancelled due to security concerns.', 4000);
        return; // Stop embedding if user cancelled
    }

    container.innerHTML = '<div class="loading">Loading custom embed...</div>';

    const element = document.createElement('iframe');
    element.classList.add('embedded-iframe');
    // Set sandbox attribute dynamically
    if (sandboxString) {
        element.setAttribute('sandbox', sandboxString);
    } else {
        element.setAttribute('sandbox', '');
    }
    element.srcdoc = customCode; // Use srcdoc for security

    element.onerror = (error) => handleEmbedError({ type: 'LOAD_ERROR', originalError: error, message: 'Failed to load custom embed. Check code/permissions.' }, containerId);
    
    // Clear loading and append after a tiny delay to ensure DOM update
    setTimeout(() => {
        container.innerHTML = '';
        container.appendChild(element);
    }, 50);
}

/**
 * Debounce function to limit the rate at which a function can fire.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function} - The debounced function.
 */
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func.apply(this, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Resizes the embed container to the specified width.
 * 
 * @param {string} width The target width (e.g., '375px', '100%', ''). An empty string resets to default.
 */
function resizeEmbedContainer(width) {
    const container = document.getElementById('embed-container');
    if (!container) return;
    container.style.width = width;
}

// Create a debounced version of the resize function
const debouncedResizeEmbedContainer = debounce(resizeEmbedContainer, 250); // 250ms debounce time

// Example usage:
// embedElement('map', 'embed-container');
// embedElement('chart', 'embed-container');

/**
 * Toggles the 'dark-mode' class on the body element and saves the preference to localStorage.
 */
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

/**
 * Initializes the dark mode based on localStorage preference or system preference (prefers-color-scheme).
 * Adds the 'dark-mode' class to the body if applicable.
 */
function initDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode === 'true' || (savedMode === null && prefersDark)) {
        document.body.classList.add('dark-mode');
    }
}

// Call initDarkMode when the page loads
document.addEventListener('DOMContentLoaded', initDarkMode);

/**
 * Initialize keyboard navigation and focus management
 */
function initAccessibility() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Only trigger shortcuts when not in input/textarea
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        if (e.ctrlKey || e.metaKey) {
            switch(e.key.toLowerCase()) {
                case 'e':
                    e.preventDefault();
                    document.querySelector('.custom-embed-btn')?.click();
                    break;
                case 'c':
                    e.preventDefault();
                    document.querySelector('.clear-btn')?.click();
                    break;
                case 'm':
                    e.preventDefault();
                    document.querySelector('.map-btn')?.click();
                    break;
                case 'y':
                    e.preventDefault();
                    document.querySelector('.youtube-btn')?.click();
                    break;
                case 't':
                    e.preventDefault();
                    document.querySelector('.toggle-mode-btn')?.click();
                    break;
            }
        }
    });

    // Improve focus management for the embed container
    const embedContainer = document.getElementById('embed-container');
    if (embedContainer) {
        embedContainer.addEventListener('focusin', () => {
            embedContainer.classList.add('focused');
        });
        
        embedContainer.addEventListener('focusout', () => {
            embedContainer.classList.remove('focused');
        });
    }

    // Add focus indicators for all interactive elements
    const interactiveElements = document.querySelectorAll('button, input, textarea, [tabindex="0"]');
    interactiveElements.forEach(element => {
        element.addEventListener('focusin', () => {
            element.classList.add('focus-visible');
        });
        
        element.addEventListener('focusout', () => {
            element.classList.remove('focus-visible');
        });
    });
}

/**
 * Generates a preview of the custom HTML code in a dedicated container.
 * Uses DOMParser for safe parsing and checks for script tags.
 */
function previewCustomCode() {
    const codeInput = document.getElementById('custom-embed-code');
    const previewContainer = document.getElementById('preview-container');
    if (!codeInput || !previewContainer) return;

    const customCode = codeInput.value.trim();
    previewContainer.innerHTML = ''; // Clear previous preview
    previewContainer.style.display = 'none'; // Hide initially

    if (!customCode) {
        // Optionally display a message if no code is entered
        // previewContainer.innerHTML = '<p class="preview-info">Enter code to preview.</p>';
        // previewContainer.style.display = 'block';
        return;
    }

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(customCode, 'text/html');
        
        // Basic check for script tags (can be expanded)
        const scripts = doc.querySelectorAll('script');
        if (scripts.length > 0) {
            const warningDiv = document.createElement('div');
            warningDiv.className = 'preview-warning';
            warningDiv.innerHTML = `<i class="fas fa-exclamation-triangle"></i> Warning: Code contains script tags which won't execute in this preview.`;
            previewContainer.appendChild(warningDiv);
        }

        // Append the parsed body content to the preview container
        // Using importNode to clone nodes into the current document
        const contentFragment = document.createDocumentFragment();
        while (doc.body.firstChild) {
            contentFragment.appendChild(document.importNode(doc.body.firstChild, true));
        }
        previewContainer.appendChild(contentFragment);

        previewContainer.style.display = 'block'; // Show the preview box

    } catch (error) {
        console.error('Error parsing HTML for preview:', error);
        previewContainer.innerHTML = '<p class="preview-error"><i class="fas fa-times-circle"></i> Error parsing HTML. Check console for details.</p>';
        previewContainer.style.display = 'block';
    }
}

/**
 * Minimalistic Help System
 */
const helpSystem = {
    topics: {
        sandbox: "Controls what the embedded content is allowed to do. Hover over specific permissions for details. Be cautious with dangerous permissions.",
        'allow-scripts': "Allows the embed to run scripts. Needed for most interactive content.",
        'allow-popups': "Allows the embed to open new windows or tabs (e.g., for authentication).",
        'allow-forms': "Allows the embed to submit forms.",
        'allow-presentation': "Allows the embed to start a presentation session (e.g., screen sharing).",
        'allow-modals': "Allows the embed to open modal dialogs.",
        'allow-same-origin': "<strong>DANGER:</strong> Allows the embed to access this page's resources (like cookies or local storage) and modify its content. Only enable if you absolutely trust the source.",
        'allow-top-navigation': "<strong>DANGER:</strong> Allows the embed to redirect this entire page to another website. Only enable if you absolutely trust the source."
        // Add more topics if needed
    },
    activeTooltip: null,

    /**
     * Shows a help tooltip for a specific topic near the target element.
     * @param {string} topic - The key for the help topic text.
     * @param {HTMLElement} targetElement - The element that triggered the help.
     */
    showTooltip: function(topic, targetElement) {
        this.hideTooltip(); // Hide any existing tooltip

        const helpText = this.topics[topic];
        if (!helpText) return;

        const tooltip = document.createElement('div');
        tooltip.className = 'help-tooltip';
        tooltip.innerHTML = helpText; // Use innerHTML to render the <strong> tag
        tooltip.setAttribute('role', 'tooltip');
        document.body.appendChild(tooltip);
        this.activeTooltip = tooltip;

        // Position the tooltip near the target element
        const targetRect = targetElement.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();

        let top = targetRect.bottom + window.scrollY + 5; // Below the icon
        let left = targetRect.left + window.scrollX + (targetRect.width / 2) - (tooltipRect.width / 2); // Centered horizontally

        // Adjust if tooltip goes off-screen
        if (left < 0) left = 5;
        if (left + tooltipRect.width > window.innerWidth) left = window.innerWidth - tooltipRect.width - 5;
        if (top + tooltipRect.height > window.innerHeight + window.scrollY) {
            top = targetRect.top + window.scrollY - tooltipRect.height - 5; // Place above if not enough space below
        }


        tooltip.style.top = `${top}px`;
        tooltip.style.left = `${left}px`;
        tooltip.style.opacity = 1;

        // Hide tooltip when clicking outside
        // Binding 'this' correctly for the event handler reference
        this.boundHandleOutsideClick = this.handleOutsideClick.bind(this);
        document.addEventListener('click', this.boundHandleOutsideClick, true);
    },

    /**
     * Hides the currently active tooltip.
     */
    hideTooltip: function() {
        if (this.activeTooltip) {
            this.activeTooltip.remove();
            this.activeTooltip = null;
            // Use the stored bound reference for removal
            if(this.boundHandleOutsideClick) {
                document.removeEventListener('click', this.boundHandleOutsideClick, true);
                this.boundHandleOutsideClick = null;
            }
        }
    },

    /**
     * Event handler to hide tooltip when clicking outside of it or its trigger.
     * @param {Event} event - The click event.
     */
    handleOutsideClick: function(event) {
        // 'this' refers to helpSystem due to .bind() in showTooltip
        if (this.activeTooltip && !this.activeTooltip.contains(event.target) && !event.target.closest('.help-icon')) {
            this.hideTooltip();
        }
    },

    /**
     * Initializes the help system by adding event listeners.
     */
    init: function() {
        // Use event delegation on a parent container
        const controlsContainer = document.querySelector('.sandbox-controls'); // Or a higher parent if needed
        if (controlsContainer) {
             controlsContainer.addEventListener('click', (event) => {
                const helpIcon = event.target.closest('.help-icon');
                if (helpIcon) {
                    event.stopPropagation(); // Prevent outside click handler from firing immediately
                    const topic = helpIcon.dataset.helpTopic;
                    if (topic) {
                         // Toggle behavior: if clicking the same icon that spawned the tooltip, hide it.
                         if (this.activeTooltip && helpIcon === this.activeTooltip.triggerElement) {
                             this.hideTooltip();
                         } else {
                            this.showTooltip(topic, helpIcon);
                            // Store which icon opened the tooltip to manage toggle behavior
                            if(this.activeTooltip) this.activeTooltip.triggerElement = helpIcon; 
                         }
                    }
                }
            });
        }

         // Add simple title attribute help to non-dangerous permissions on hover/focus
         document.querySelectorAll('.sandbox-options label:not(.dangerous) code').forEach(codeEl => {
            const topic = codeEl.textContent.trim();
             const helpText = this.topics[topic];
             if (helpText) {
                const parentLabel = codeEl.closest('label');
                if(parentLabel) {
                    // Remove potential <strong> tags for title attribute
                    const plainText = helpText.replace(/<\/?strong>/g, ''); 
                    parentLabel.setAttribute('title', plainText);
                }
             }
         });
    }
};

// Initialize accessibility features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initAccessibility();
    initDarkMode(); // Initialize dark mode first
    helpSystem.init(); // Initialize the help system
    const containerId = 'embed-container';

    document.querySelector('.map-btn')?.addEventListener('click', () => embedElement('map', containerId));
    document.querySelector('.chart-btn')?.addEventListener('click', () => embedElement('chart', containerId));
    document.querySelector('.youtube-btn')?.addEventListener('click', () => embedElement('youtube', containerId));
    document.querySelector('.clear-btn')?.addEventListener('click', () => clearEmbed(containerId));
    document.querySelector('.toggle-mode-btn')?.addEventListener('click', toggleDarkMode);
    document.querySelector('.custom-embed-btn')?.addEventListener('click', () => embedCustomCode(containerId)); // No skip confirmation here

    // Resize buttons - Use the debounced function
    document.querySelectorAll('.resize-btn').forEach(button => {
        button.addEventListener('click', () => {
            const newWidth = button.dataset.width;
            // Call the debounced function instead of the original
            debouncedResizeEmbedContainer(newWidth);
        });
    });

    // Add listener for the new Preview button
    document.getElementById('preview-btn')?.addEventListener('click', previewCustomCode);

    // Add listeners for Save/Load buttons
    document.getElementById('save-config-btn')?.addEventListener('click', saveConfiguration);
    document.getElementById('load-config-btn')?.addEventListener('click', () => loadConfiguration()); // Use () => to ensure fresh call

    // Automatically load configuration on page load
    loadConfiguration();
});

// --- Configuration Save/Load ---

const LOCALSTORAGE_KEY = 'embedTesterConfig';

/**
 * Saves the current custom embed code and sandbox settings to localStorage.
 */
function saveConfiguration() {
    const codeInput = document.getElementById('custom-embed-code');
    const sandboxCheckboxes = document.querySelectorAll('.sandbox-options input[name="sandbox"]:checked');
    const saveBtn = document.getElementById('save-config-btn');

    if (!codeInput) return;

    const config = {
        customCode: codeInput.value,
        sandboxPermissions: Array.from(sandboxCheckboxes).map(cb => cb.value)
    };

    try {
        localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(config));
        // Visual feedback
        if (saveBtn) {
            const originalText = saveBtn.innerHTML;
            saveBtn.innerHTML = '<i class="fas fa-check"></i> Saved!';
            saveBtn.disabled = true;
            setTimeout(() => {
                saveBtn.innerHTML = originalText;
                saveBtn.disabled = false;
            }, 1500);
        }
    } catch (error) {
        console.error("Error saving configuration to localStorage:", error);
        // Optionally display an error to the user
        alert("Failed to save configuration. LocalStorage might be full or disabled.");
    }
}

/**
 * Loads configuration from localStorage and applies it.
 * Also attempts to embed the loaded code.
 */
function loadConfiguration() {
    const codeInput = document.getElementById('custom-embed-code');
    const allSandboxCheckboxes = document.querySelectorAll('.sandbox-options input[name="sandbox"]');
    
    if (!codeInput || !allSandboxCheckboxes.length) return;

    try {
        const savedConfig = localStorage.getItem(LOCALSTORAGE_KEY);
        if (savedConfig) {
            const config = JSON.parse(savedConfig);
            
            if (config.customCode) {
                codeInput.value = config.customCode;
            }
            
            // Reset all checkboxes first
            allSandboxCheckboxes.forEach(cb => cb.checked = false);
            
            // Check the saved ones
            if (config.sandboxPermissions && Array.isArray(config.sandboxPermissions)) {
                config.sandboxPermissions.forEach(permissionValue => {
                    const checkbox = document.querySelector(`.sandbox-options input[value="${permissionValue}"]`);
                    if (checkbox) {
                        checkbox.checked = true;
                    }
                });
            }

            // Attempt to embed the loaded code (without confirmation for dangerous permissions on auto-load)
            // We skip confirmation here to avoid annoying popups on every page load.
            // Manual 'Load Config' button click could potentially re-add confirmations if desired.
            if (config.customCode) {
                embedCustomCode('embed-container', true); // Pass a flag to skip confirmation on auto-load
            }
        }
    } catch (error) {
        console.error("Error loading configuration from localStorage:", error);
        localStorage.removeItem(LOCALSTORAGE_KEY); // Clear potentially corrupted data
        // Optionally inform user
        // alert("Failed to load saved configuration. It might have been corrupted.");
    }
}

/**
 * Enhanced error handling with specific error types and messages
 * @param {Object} error - The error object
 * @param {string} containerId - The ID of the container element
 */
function handleEmbedError(error, containerId) {
    const errorType = error?.type || 'DEFAULT';
    const errorMessages = {
        'NETWORK_ERROR': 'Network error: Check your internet connection',
        'PERMISSION_ERROR': 'Permission denied: Check sandbox settings',
        'LOAD_ERROR': 'Failed to load embed: Invalid content or URL',
        'DEFAULT': 'An error occurred while loading the embed'
    };
    
    const message = errorMessages[errorType] || errorMessages.DEFAULT;
    displayEmbedError(containerId, message);
    console.error('Embed error:', error);
} 