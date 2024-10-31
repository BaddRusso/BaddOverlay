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

async function getGoalFollowerCount() {
    try {
        const response = await fetch('/api/followersGoal');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.goalFollowers; // Get follower count from response
    } catch (error) {
        console.error('Error fetching follower count:', error);
    }
}

//goal bar element and associated code
function initializeFollowerBar(currentFollowerCount,followerGoal) {
    // Create progress bar container
    const container = document.createElement('div');
    container.id = 'followerGoalContainer';
    container.style.width = '500px';
    container.style.height = '25px';
    container.style.backgroundColor = '#e0e0e0';
    container.style.borderRadius = '5px';

    // Create progress bar fill
    const fill = document.createElement('div');
    fill.id = 'followerGoalFill';
    fill.style.width = `${getFillPercentage(currentFollowerCount, followerGoal)}%`;
    fill.style.height = '100%';
    fill.style.backgroundColor = '#4caf50';
    fill.style.borderRadius = '5px 0 0 5px';

    container.appendChild(fill);
    document.body.appendChild(container);
}

function getFillPercentage(current, goal) {
    return Math.min((current / goal) * 100, 100);
}

function startPollingFollowerCount(){
    // Poll the follower count every 15 seconds
    setInterval(async () => {
        const followerCount = await getFollowerCount();
        const goalFollowerCount = await getGoalFollowerCount();
        updateFollowerBar(followerCount, goalFollowerCount);
    }, 15000); // 15000 milliseconds = 15 seconds   
}


async function updateFollowerBar(followerCount, followerGoal) {
    const fill = document.getElementById('followerGoalFill');
    if (fill) {
        fill.style.width = `${getFillPercentage(followerCount, followerGoal)}%`;
        console.log('Updated follower count:', followerCount);
    }
}

//init stuff
// Run the getConfig function once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', async () => {
    await getConfig();
    const initialFollowerCount = await getFollowerCount();
    console.log('Current follower count:', initialFollowerCount);
    const goalFollowerCount = await getGoalFollowerCount();
    console.log('Goal follower count:', goalFollowerCount);
    initializeFollowerBar(initialFollowerCount, goalFollowerCount);
    startPollingFollowerCount();
    // You can now use this follower count to update your FollowerGoal
});