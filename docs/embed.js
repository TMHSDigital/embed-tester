// Function to embed an element
function embedElement(type, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Clear previous content
    container.innerHTML = '<div class="loading">Loading embed...</div>';
    
    const element = document.createElement('iframe');
    element.style.width = '100%';
    element.style.height = '100%';
    element.style.border = 'none';
    element.style.borderRadius = '8px';
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

// Example usage:
// embedElement('map', 'embed-container');
// embedElement('chart', 'embed-container');

// Add a manual dark mode toggle function
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
} 