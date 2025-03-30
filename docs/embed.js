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
    if (!container) return;
    
    // Clear previous content
    container.innerHTML = '<div class="loading">Loading embed...</div>';
    
    const element = document.createElement('iframe');
    element.classList.add('embedded-iframe');
    element.setAttribute('loading', 'lazy');
    
    switch (type) {
        case 'map':
            element.src = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.30596073366!2d-74.25987701089373!3d40.69766998831435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1614118575811!5m2!1sen!2sus';
            element.setAttribute('sandbox', 'allow-scripts');
            break;
        case 'chart':
            element.src = 'https://plotly.com/~chris/1638.embed';
            element.setAttribute('sandbox', 'allow-scripts allow-popups');
            break;
        case 'youtube':
            element.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
            element.setAttribute('sandbox', 'allow-scripts allow-popups allow-presentation allow-forms');
            break;
        default:
            container.innerHTML = '<p class="error">Unsupported embed type</p>';
            return;
    }
    
    element.onerror = () => displayEmbedError(containerId, 'Failed to load embed. Check the source or network console.');
    container.innerHTML = '';
    container.appendChild(element);
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

    element.onerror = () => displayEmbedError(containerId, 'Failed to load custom embed. Check the code, sandbox permissions, and network console.');
    
    // Clear loading and append after a tiny delay to ensure DOM update
    setTimeout(() => {
        container.innerHTML = '';
        container.appendChild(element);
    }, 50);
}

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

// Add event listeners for embed buttons
document.addEventListener('DOMContentLoaded', () => {
    initDarkMode(); // Initialize dark mode first
    const containerId = 'embed-container';

    document.querySelector('.map-btn')?.addEventListener('click', () => embedElement('map', containerId));
    document.querySelector('.chart-btn')?.addEventListener('click', () => embedElement('chart', containerId));
    document.querySelector('.youtube-btn')?.addEventListener('click', () => embedElement('youtube', containerId));
    document.querySelector('.clear-btn')?.addEventListener('click', () => clearEmbed(containerId));
    document.querySelector('.toggle-mode-btn')?.addEventListener('click', toggleDarkMode);
    document.querySelector('.custom-embed-btn')?.addEventListener('click', () => embedCustomCode(containerId)); // No skip confirmation here

    // Resize buttons
    document.querySelectorAll('.resize-btn').forEach(button => {
        button.addEventListener('click', () => {
            const newWidth = button.dataset.width;
            resizeEmbedContainer(newWidth);
        });
    });

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