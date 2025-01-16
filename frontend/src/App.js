// Fetch the arrivals data from the backend
function fetchArrivals() {
  fetch('http://localhost:5000/api/arrivals')  // Adjust if the backend is deployed
    .then(response => response.json())
    .then(data => {
      const transitList = document.getElementById('transit-list');
      transitList.innerHTML = '';  // Clear existing data

      // Create list items for each arrival
      data.forEach(arrival => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<strong>${arrival.route}</strong> - ${arrival.time} minutes away`;
        transitList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching transit data:', error);
    });
}

// Call the function to fetch arrivals when the page loads
document.addEventListener('DOMContentLoaded', fetchArrivals);
