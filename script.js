let timer;
let isRunning = false;
let elapsedTime = 0; // Time in seconds
let lapTimes = [];

const timeDisplay = document.getElementById('time-display');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lap-list');

// Start or Stop the stopwatch
function startStop() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    startStopButton.textContent = 'Start';
  } else {
    timer = setInterval(updateTime, 1000); // Update every second
    isRunning = true;
    startStopButton.textContent = 'Stop';
  }
}

// Reset the stopwatch
function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  timeDisplay.textContent = formatTime(elapsedTime);
  startStopButton.textContent = 'Start';
  lapTimes = [];
  lapList.innerHTML = ''; // Clear lap times
  lapButton.disabled = true; // Disable lap button when stopped
}

// Record a lap time
function recordLap() {
  if (isRunning) {
    lapTimes.push(elapsedTime);
    const lapTimeElement = document.createElement('li');
    lapTimeElement.textContent = formatTime(elapsedTime);
    lapList.appendChild(lapTimeElement);
  }
}

// Update the time display
function updateTime() {
  elapsedTime++;
  timeDisplay.textContent = formatTime(elapsedTime);
  lapButton.disabled = false; // Enable lap button when running
}

// Format time as MM:SS or HH:MM:SS
function formatTime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const hoursStr = hours < 10 ? `0${hours}` : hours;
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  const secsStr = secs < 10 ? `0${secs}` : secs;

  if (hours > 0) {
    return `${hoursStr}:${minutesStr}:${secsStr}`;
  } else {
    return `${minutesStr}:${secsStr}`;
  }
}
