// Initialize the map and set its view to a specific location and zoom level
const map = L.map('map').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Add a marker to represent the user's location
navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude, longitude } = position.coords;
    L.marker([latitude, longitude]).addTo(map).bindPopup('You are here!').openPopup();

    // Center the map on the user's location
    map.setView([latitude, longitude], 14);
});

// Example: Add bus and tram stops (replace with actual data)
const busStops = [
    { name: "Stop A", lat: 51.51, lon: -0.1 },
    { name: "Stop B", lat: 51.52, lon: -0.09 },
];

const tramStops = [
    { name: "Tram A", lat: 51.53, lon: -0.11 },
    { name: "Tram B", lat: 51.54, lon: -0.12 },
];

// Add markers for bus stops
busStops.forEach(stop => {
    L.marker([stop.lat, stop.lon], { icon: L.icon({ iconUrl: 'bus-icon.png', iconSize: [25, 25] }) })
        .addTo(map)
        .bindPopup(`${stop.name} (Bus Stop)`);
});

// Add markers for tram stops
tramStops.forEach(stop => {
    L.marker([stop.lat, stop.lon], { icon: L.icon({ iconUrl: 'tram-icon.png', iconSize: [25, 25] }) })
        .addTo(map)
        .bindPopup(`${stop.name} (Tram Stop)`);
});

