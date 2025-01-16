document.addEventListener("DOMContentLoaded", function () {
    const transitList = document.getElementById("transit-list");

    // Example static data (replace with real API data later)
    const transitData = [
        { id: 1, name: "Bus 1", arrival: "5:30 PM" },
        { id: 2, name: "Tram A", arrival: "5:45 PM" },
        { id: 3, name: "Bus 3", arrival: "6:00 PM" },
    ];

    // Populate the list with transit data
    transitData.forEach((transit) => {
        const li = document.createElement("li");
        li.textContent = `${transit.name} - Arrives at: ${transit.arrival}`;
        transitList.appendChild(li);
    });

    // Add logic for Map (Optional)
    // Initialize the map
const map = L.map('map-container').setView([51.505, -0.09], 13);

// Add OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

});
