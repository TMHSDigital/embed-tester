// Function to embed an element
function embedElement(type, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id '${containerId}' not found.`);
        return;
    }

    let element;
    switch (type) {
        case 'map':
            element = document.createElement('iframe');
            element.src = 'https://www.example.com/map'; // Example map URL
            element.width = '600';
            element.height = '400';
            break;
        case 'chart':
            element = document.createElement('iframe');
            element.src = 'https://www.example.com/chart'; // Example chart URL
            element.width = '600';
            element.height = '400';
            break;
        default:
            console.error(`Unsupported element type: '${type}'`);
            return;
    }

    container.appendChild(element);
}

// Example usage:
// embedElement('map', 'embed-container');
// embedElement('chart', 'embed-container'); 