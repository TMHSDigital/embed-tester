// Function to embed an element
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
            element.setAttribute('sandbox', 'allow-scripts allow-same-origin');
            break;
        case 'chart':
            element.src = 'https://charts.mongodb.com/charts-project-0-qwerty/embed/charts?id=62e9a6c1-ce35-4a97-8a3c-b9bad0e3dd1e&maxDataAge=3600&theme=light&autoRefresh=true';
            element.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
            break;
        case 'youtube':
            element.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ';
            element.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups');
            break;
        default:
            container.innerHTML = '<p class="error">Unsupported embed type</p>';
            return;
    }
    
    element.onerror = () => container.innerHTML = '<p class="error">Failed to load embed</p>';
    container.innerHTML = '';
    container.appendChild(element);
}

function clearEmbed(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = `
        <div>
            <p>Your embedded element will appear here</p>
            <p style="font-size: 0.9rem; opacity: 0.7;">Click one of the buttons below...</p>
        </div>
    `;
}

// Function to embed custom HTML code
function embedCustomCode(containerId) {
    const container = document.getElementById(containerId);
    const codeInput = document.getElementById('custom-embed-code');
    if (!container || !codeInput) return;

    const customCode = codeInput.value.trim();
    if (!customCode) {
        container.innerHTML = '<p class="error">Please paste embed code first.</p>';
        // Optionally clear the error after a few seconds
        setTimeout(() => {
            if (container.querySelector('.error')) {
                 clearEmbed(containerId);
            }
        }, 3000);
        return;
    }

    container.innerHTML = '<div class="loading">Loading custom embed...</div>';

    const element = document.createElement('iframe');
    element.classList.add('embedded-iframe');
    // Set sandbox attributes - adjust as needed, start restrictive
    element.setAttribute('sandbox', 'allow-scripts allow-same-origin'); 
    element.srcdoc = customCode; // Use srcdoc for security

    element.onerror = () => container.innerHTML = '<p class="error">Failed to load custom embed. Check the code.</p>';
    
    // Clear loading and append after a tiny delay to ensure DOM update
    setTimeout(() => {
        container.innerHTML = '';
        container.appendChild(element);
    }, 50); // Small delay
}

// Example usage:
// embedElement('map', 'embed-container');
// embedElement('chart', 'embed-container');

// Dark mode implementation
function toggleDarkMode() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', isDark);
}

// Initialize dark mode based on saved preference or system preference
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
    const containerId = 'embed-container';

    document.querySelector('.map-btn')?.addEventListener('click', () => embedElement('map', containerId));
    document.querySelector('.chart-btn')?.addEventListener('click', () => embedElement('chart', containerId));
    document.querySelector('.youtube-btn')?.addEventListener('click', () => embedElement('youtube', containerId));
    document.querySelector('.clear-btn')?.addEventListener('click', () => clearEmbed(containerId));
    document.querySelector('.toggle-mode-btn')?.addEventListener('click', toggleDarkMode);
    // Add listener for the new custom embed button
    document.querySelector('.custom-embed-btn')?.addEventListener('click', () => embedCustomCode(containerId));
}); 