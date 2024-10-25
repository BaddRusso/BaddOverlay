require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let accessToken = '';

async function authenticate() {

    const fetch = (await import('node-fetch')).default;

    const response = await fetch('https://id.twitch.tv/oauth2/token', {
        method: 'POST',
        body: new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'client_credentials'
        })
    });

    if (!response.ok) {
        throw new Error('Authentication failed: ' + response.statusText);
    }

    const data = await response.json();
    accessToken = data.access_token;
    return accessToken;
}

function getAccessToken() {
    return accessToken;
}

module.exports = { authenticate, getAccessToken }