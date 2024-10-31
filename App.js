import { authenticate, getAccessToken, fetchFollowerCount } from './src/auth.js';
import FollowerGoal from './src/FollowerGoal.js';
import express from 'express';
import WebSocket from 'ws';
import path from 'path';
import { fileURLToPath } from 'url';

const channelId = process.env.CHANNEL_ID;
const goalFollowers = process.env.FOLLOWER_GOAL;
const broadcasterId = process.env.BROADCASTER_ID;

const app = express();
const PORT = process.env.PORT || 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/config', (req, res) => {
    res.json({
        broadcasterId: process.env.BROADCASTER_ID,
        // Include other environment variables as needed
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to get the follower count
app.get('/api/followers', async (req, res) => {
    try {
        if (!broadcasterId) {
            console.error('No broadcaster ID found in environment variables');
            return res.status(404).json({ error: 'Broadcaster ID not found' });
        }
        await authenticate(); // Ensure you're authenticated
        
        const followerCount = await fetchFollowerCount(broadcasterId);
        
        res.json({ followerCount });
    } catch (error) {
        console.error('Error fetching follower count:', error);
        res.status(500).json({ error: 'Failed to fetch follower count' });
    }
});

// API endpoint to get the configured follower goal
app.get('/api/followersGoal', (req, res) => {
    //note for a JSON response later
    /*const config = {
        goalFollowers: process.env.FOLLOWER_GOAL // Another example if needed
    };
    res.json(config);*/
    res.json({ goalFollowers });
});


app.listen(PORT, () => {
    console.log(`Express server is running on http://localhost:${PORT}`);
});

(async () => {
    try {
        // Initialize authentication
        await authenticate();
        const accessToken = getAccessToken(); // You can use this token as needed
        console.log('Authenticated! Access Token:', accessToken);

    } catch (error) {
        console.error('Error:', error.message);
    }
    
    
        /*try {
            const broadcasterId = await getBroadcasterId('baddrusso');
            console.log('Broadcaster ID:', broadcasterId);
        } catch (error) {
            console.error(error.message);
        }*/
})();

/*document.addEventListener('DOMContentLoaded', async () => {
    try {
        var currentFollowers = await fetchFollowerCount(broadcasterId)
        const followerGoal = new FollowerGoal(currentFollowers, goalFollowers);
        followerGoal.initialize();
    }
    catch (error) {
        console.error("Error initializing follower goal:", error.message);
    }
});*/
