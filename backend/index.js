// Import built-in http module
const http = require('http');
const url = require('url');

// Mock data for the arrivals (In real-life, you might fetch this from an API)
const arrivalsData = [
  { route: 'Bus 101', time: 5 },
  { route: 'Tram 202', time: 10 },
  { route: 'Bus 303', time: 3 },
];

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Handle '/api/arrivals' endpoint
  if (parsedUrl.pathname === '/api/arrivals' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(arrivalsData));  // Send mock transit data as a response
  } else {
    // Handle 404 for any other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
  }
});

// Set up the server to listen on port 5000
server.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
