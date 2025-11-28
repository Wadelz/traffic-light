// Traffic light controller
const lights = ['red', 'yellow', 'green'];
const INTERVAL = 5 * 60 * 1000; // 5 minutes in milliseconds
const CYCLE_DURATION = INTERVAL * lights.length;
// Real-world start point for the cycle. Update this date/time to realign the schedule.
const START_TIME = Date.parse('2024-01-01T00:00:00Z');
let renderInterval;

// Updates the active light display, advances to the next light in the cycle, and resets the countdown timer.
const trafficLightElement = document.getElementById('traffic-light');
const redLight = document.getElementById('red');
const yellowLight = document.getElementById('yellow');
const greenLight = document.getElementById('green');
const currentText = document.getElementById('current');
const countdownText = document.getElementById('countdown');

// Derives the current light index and time remaining in the phase from the system clock.
function getCycleState(now = Date.now()) {
    const elapsed = ((now - START_TIME) % CYCLE_DURATION + CYCLE_DURATION) % CYCLE_DURATION;
    const index = Math.floor(elapsed / INTERVAL);
    const timeIntoPhase = elapsed % INTERVAL;
    return {
        currentLight: lights[index],
        timeRemaining: INTERVAL - timeIntoPhase
    };
}

// Function to update the active light
function updateLight(now = Date.now()) {
    const { currentLight, timeRemaining } = getCycleState(now);

    // Remove active class from all lights
    redLight.classList.remove('active');
    yellowLight.classList.remove('active');
    greenLight.classList.remove('active');
    
    // Add active class to current light
    document.getElementById(currentLight).classList.add('active');
    
    // Update text
    const readableLight = currentLight.charAt(0).toUpperCase() + currentLight.slice(1);
    currentText.textContent = readableLight;
    trafficLightElement.setAttribute('aria-label', `Traffic light is ${currentLight}`);
    countdownText.textContent = formatTime(timeRemaining);
}

// Function to format time as MM:SS
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

// Initialize
updateLight();

// Set up interval to refresh the display every second
renderInterval = setInterval(updateLight, 1000);