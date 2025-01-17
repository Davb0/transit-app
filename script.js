// Initialize the map and set its default view to a default location
const map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles for the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create a custom icon for bus and tram stations
const redIcon = L.icon({
    iconUrl: 'redmarkericon.png',  // Path to the red marker icon
    iconSize: [32, 32],                   // Size of the marker
    iconAnchor: [16, 32],                 // Position of the marker's "tip" (where the icon points)
    popupAnchor: [0, -32],                // Position of the popup relative to the icon
});

// Function to fetch stations data from an API
async function fetchStations() {
    try {
        // Replace with the actual API URL that provides station data
        const response = await fetch('https://api.example.com/stations'); // Replace with the real API URL

        // Check if the response is valid
        if (!response.ok) {
            throw new Error('Failed to fetch station data');
        }

        // Parse the JSON data
        const stations = await response.json();

        // Loop through the stations and add them to the map with markers
        stations.forEach(station => {
            const { name, lat, lng } = station;

            // Add a custom marker with the red icon for each station
            const marker = L.marker([lat, lng], { icon: redIcon }).addTo(map);

            // Bind a popup to each marker with station name
            marker.bindPopup(`<b>${name}</b>`).openPopup();
        });
    } catch (error) {
        console.error('Error fetching station data:', error);
    }
}

// Call the fetchStations function to load the stations dynamically
fetchStations();

// Function to handle the "Locate Me" button functionality
document.getElementById('locate-me').addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const userMarker = L.marker([latitude, longitude]).addTo(map);
                userMarker.bindPopup('You are here!').openPopup();
                map.setView([latitude, longitude], 14);
            },
            (error) => {
                console.error('Error retrieving geolocation:', error);
                alert('Error locating your position');
            }
        );
    } else {
        alert('Geolocation not supported by your browser.');
    }
});
