// Initialize the map and set its default view
const map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Locate Me Button Functionality
document.getElementById('locate-me').addEventListener('click', () => {
    console.log('Locate Me button clicked'); // Debugging

    if (navigator.geolocation) {
        // Attempt to retrieve the user's location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log('Geolocation success:', position);

                const { latitude, longitude } = position.coords;

                // Add a marker for the user's location
                const userMarker = L.marker([latitude, longitude]).addTo(map);
                userMarker.bindPopup('You are here!').openPopup();

                // Center the map on the user's location
                map.setView([latitude, longitude], 14);
            },
            (error) => {
                // Geolocation error handling
                console.error('Geolocation error:', error);

                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        alert('Location access denied by user.');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        alert('Location information is unavailable.');
                        break;
                    case error.TIMEOUT:
                        alert('The request to get user location timed out.');
                        break;
                    default:
                        alert('An unknown error occurred while retrieving location.');
                        break;
                }
            }
        );
    } else {
        // Browser does not support Geolocation API
        alert('Geolocation is not supported by your browser.');
        console.error('Geolocation not supported by this browser.');
    }
});
