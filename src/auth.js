import dotenv from 'dotenv';
dotenv.config();

/* 
    This file contains the auth method as well as fetch requests
    to Twitch API which use that token
*/
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;

let accessToken = '';

export async function authenticate() {

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

export function getAccessToken() {
    return accessToken;
}

export async function fetchFollowerCount(channelId) {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch(`https://api.twitch.tv/helix/channels/followers?broadcaster_id=${channelId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Client-Id": clientId
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch follower count: ' + response.statusText);
    }

    const data = await response.json();
    return data.total;
}

export async function getBroadcasterId(username) {
    const response = await fetch(`https://api.twitch.tv/helix/users?login=${username}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Client-Id": clientId
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch broadcaster ID: ' + response.statusText);
    }

    const data = await response.json();
    return data.data[0].id;  // This will be your broadcaster/user ID
}

