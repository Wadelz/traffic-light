// Traffic light controller
const lights = ['red', 'yellow', 'green'];
let currentIndex = 0;
const INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds
let timeRemaining = INTERVAL;
let countdownInterval;
/**
 * ID of the active timer used to cycle the traffic light.
 * Holds the value returned by setInterval so the timer can be cancelled with clearInterval.
 * When no timer is active this is null.
 *
 * @type {number|NodeJS.Timeout|null}
 */
let changeInterval;

// Updates the active light display, advances to the next light in the cycle, and resets the countdown timer.
const redLight = document.getElementById('red');
const yellowLight = document.getElementById('yellow');
const greenLight = document.getElementById('green');
const currentText = document.getElementById('current');
const countdownText = document.getElementById('countdown');

// Function to update the active light
function updateLight() {
    // Remove active class from all lights
    redLight.classList.remove('active');
    yellowLight.classList.remove('active');
    greenLight.classList.remove('active');
    
    // Add active class to current light
    const currentLight = lights[currentIndex];
    document.getElementById(currentLight).classList.add('active');
    
    // Update text
    currentText.textContent = currentLight.charAt(0).toUpperCase() + currentLight.slice(1);
    
    // Move to next light
    currentIndex = (currentIndex + 1) % lights.length;
    
    // Reset timer
    timeRemaining = INTERVAL;
}

// Function to format time as MM:SS
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function updateCountdown() {
    countdownText.textContent = formatTime(Math.max(0, timeRemaining));
    if (timeRemaining > 0) {
        timeRemaining -= 1000;
    }
}

// Initialize
updateLight();
updateCountdown();

// Set up intervals
changeInterval = setInterval(updateLight, INTERVAL);
countdownInterval = setInterval(updateCountdown, 1000);
}