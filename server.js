const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', true);

app.get('/', (req, res) => {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    console.log(`--- Request Captured ---`);
    console.log(`Time: ${new Date().toISOString()}`);
    console.log(`IP: ${clientIp}`);
    console.log(`User-Agent: ${userAgent}`);
    console.log(`------------------------`);

    res.redirect('https://google.com');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
Use code with caution.
