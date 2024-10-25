const { authenticate, getAccessToken } = require('./src/auth.js');

(async () => {
    try {
        // Initialize authentication
        await authenticate();
        const accessToken = getAccessToken(); // You can use this token as needed
        console.log('Authenticated! Access Token:', accessToken);

    } catch (error) {
        console.error('Error:', error.message);
    }
})();