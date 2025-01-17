// Initialize the map and set its default view to a default location
const map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles for the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Debug: Log when the map has loaded successfully
console.log("Map initialized successfully.");

// Create a custom icon for bus and tram stations
const redIcon = L.icon({
    iconUrl: 'images/redmarkericon.png',   // Path to the red marker icon
    iconSize: [32, 32],                    // Size of the marker
    iconAnchor: [16, 32],                  // Position of the marker's "tip" (where the icon points)
    popupAnchor: [0, -32],                 // Position of the popup relative to the icon
});

// Debug: Check if the icon is loaded correctly
console.log("Red marker icon:", redIcon);

// Sample bus and tram station coordinates (Replace these with actual coordinates)
const stations = [
    { name: "Bus Station 1", lat: 51.505, lng: -0.09 },
    { name: "Tram Station 1", lat: 51.515, lng: -0.1 },
    { name: "Bus Station 2", lat: 51.525, lng: -0.11 },
    { name: "Tram Station 2", lat: 51.535, lng: -0.12 },
];

// Add the stations to the map with custom red markers
stations.forEach(station => {
    const { name, lat, lng } = station;

    // Add a custom marker with the red icon for each station
    const marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);

    // Bind a popup to each marker
    marker.bindPopup(`<b>${name}</b>`).openPopup();
});

// Function to handle the "Locate Me" button functionality
document.getElementById('locate-me').addEventListener('click', () => {
    console.log("Locate Me button clicked.");

    // Check if the browser supports Geolocation API
    if (navigator.geolocation) {
        console.log("Geolocation supported by browser.");

        // Attempt to get the user's location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log("Geolocation successful:", position);

                // Extract latitude and longitude from position object
                const { latitude, longitude } = position.coords;

                // Debug: Log the user's coordinates
                console.log(`User's location: Latitude ${latitude}, Longitude ${longitude}`);

                // Add a marker for the user's location
                const userMarker = L.marker([latitude, longitude]).addTo(map);
                userMarker.bindPopup('You are here!').openPopup();

                // Center the map on the user's location
                map.setView([latitude, longitude], 14);

                // Debug: Confirm the map view was updated
                console.log("Map centered on user's location.");
            },
            (error) => {
                console.error("Error retrieving geolocation:", error);

                // Handle specific geolocation errors
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
        // Alert the user if Geolocation API is not supported
        alert('Geolocation is not supported by your browser.');
        console.error("Geolocation not supported by browser.");
    }
});
