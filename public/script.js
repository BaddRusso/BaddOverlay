// script.js (client-side)

async function getConfig() {
    try {
        const response = await fetch('/api/config');
        if (!response.ok) throw new Error('Network response was not ok');
        const config = await response.json();
        console.log('Config:', config);
        // Use the broadcasterId and other data
    } catch (error) {
        console.error('Error fetching config:', error);
    }
}

async function getFollowerCount() {
    try {
        const response = await fetch('/api/followers');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.followerCount; // Get follower count from response
    } catch (error) {
        console.error('Error fetching follower count:', error);
    }
}

// Run the getConfig function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', getConfig);
document.addEventListener('DOMContentLoaded', async () => {
    const followerCount = await getFollowerCount();
    console.log('Current follower count:', followerCount);
    // You can now use this follower count to update your FollowerGoal
});