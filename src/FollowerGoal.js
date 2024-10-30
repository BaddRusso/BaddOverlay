class FollowerGoal {
    constructor(currentFollowers, goalFollowers) {
        this.currentFollowers = currentFollowers;
        this.goalFollowers = goalFollowers;
        this.progressBar = null;
    }

    initialize() {
        // Create the main container for the progress bar
        this.progressBar = document.createElement("div");
        this.progressBar.style.width = "100%";
        this.progressBar.style.height = "25px";
        this.progressBar.style.backgroundColor = "#e0e0e0"; // Background color for the progress bar
        this.progressBar.style.borderRadius = "5px";
        this.progressBar.style.position = "relative";

        const fill = document.createElement("div");
        fill.id = "followerGoalFill";
        fill.style.height = "100%";
        fill.style.width = `${this.getFillPercentage()}%`;
        fill.style.backgroundColor = "#4caf50"; // Color of the progress bar fill
        fill.style.borderRadius = "5px 0 0 5px";

        this.progressBar.appendChild(fill);
        document.getElementById('follower-goal-container').appendChild(this.progressBar);
    }

    getFillPercentage() {
        return Math.min((this.currentFollowers / this.goalFollowers) * 100, 100)
    }

    update(newFollowerCount) {
        this.currentFollowers = newFollowerCount;
        const fill = document.getElementById("followerGoalFill");
        if (fill) {
            fill.style.width = `${this.getFillPercentage()}%`
        }
    }
}

export default FollowerGoal;