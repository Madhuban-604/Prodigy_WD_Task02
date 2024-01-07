let stopwatchInterval;
    let startTime;
    let pausedTime = 0;
    let isRunning = false;

    function formatTime(milliseconds) {
        const date = new Date(milliseconds);
        return date.toISOString().substr(11, 8);
    }

    function updateStopwatch() {
        const currentTime = isRunning ? Date.now() - startTime + pausedTime : pausedTime;
        document.getElementById('stopwatch').innerText = formatTime(currentTime);
    }

    function startStopwatch() {
        if (!isRunning) {
            startTime = Date.now();
            stopwatchInterval = setInterval(updateStopwatch, 10);
            isRunning = true;
        }
    }

    function pauseStopwatch() {
        if (isRunning) {
            clearInterval(stopwatchInterval);
            pausedTime += Date.now() - startTime;
            isRunning = false;
        }
    }

    function resetStopwatch() {
        clearInterval(stopwatchInterval);
        pausedTime = 0;
        isRunning = false;
        updateStopwatch();
        document.getElementById('lap-list').innerHTML = '';
    }

    function recordLap() {
        if (isRunning) {
            const lapTime = Date.now() - startTime + pausedTime;
            const lapItem = document.createElement('li');
            lapItem.innerText = `Lap ${document.getElementById('lap-list').childElementCount + 1}: ${formatTime(lapTime)}`;
            document.getElementById('lap-list').appendChild(lapItem);
        }
    }