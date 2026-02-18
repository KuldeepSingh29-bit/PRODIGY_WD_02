// DOM Elements
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const millisecondsDisplay = document.getElementById('milliseconds');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');
const themeToggleCheckbox = document.getElementById('checkbox'); // Checkbox input

// Variables
let timerInterval;
let startTime;
let elapsedTime = 0;
let isRunning = false;
let lapCounter = 1;

// Theme Toggle Functionality with Checkbox
themeToggleCheckbox.addEventListener('change', (e) => {
    if (e.target.checked) {
        document.body.classList.add('light-mode');
        document.querySelector('.theme-switch-wrapper em').textContent = 'Dark Mode';
    } else {
        document.body.classList.remove('light-mode');
        document.querySelector('.theme-switch-wrapper em').textContent = 'Light Mode';
    }
});

// Format Time Function (takes time in ms and returns formatted string components)
function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
    return { minutes, seconds, milliseconds };
}

// Update Display Function - Unused but kept for reference
function updateDisplay() {
    const currentTime = Date.now();
    const time = elapsedTime + (currentTime - startTime);
    const formatted = formatTime(time);

    minutesDisplay.textContent = formatted.minutes;
    secondsDisplay.textContent = formatted.seconds;
    millisecondsDisplay.textContent = formatted.milliseconds;
}

// Start Timer
function startTimer() {
    startTime = Date.now();
    timerInterval = setInterval(() => {
        const currentTime = Date.now();
        const time = elapsedTime + (currentTime - startTime);
        const formatted = formatTime(time);

        minutesDisplay.textContent = formatted.minutes;
        secondsDisplay.textContent = formatted.seconds;
        millisecondsDisplay.textContent = formatted.milliseconds;
    }, 10); // Update every 10ms
}

// Start Button Logic
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTimer();
        isRunning = true;

        // Button States
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
        resetBtn.disabled = false;

        startBtn.style.opacity = '0.5';
        pauseBtn.style.opacity = '1';
    }
});

// Pause Button Logic
pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime += Date.now() - startTime;
        isRunning = false;

        // Button States
        startBtn.disabled = false;
        pauseBtn.disabled = true;

        startBtn.style.opacity = '1';
        pauseBtn.style.opacity = '0.5';
        startBtn.textContent = 'Resume';
    }
});

// Reset Logic
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    isRunning = false;

    // Reset Display
    minutesDisplay.textContent = '00';
    secondsDisplay.textContent = '00';
    millisecondsDisplay.textContent = '00';

    // Reset Buttons and States
    startBtn.disabled = false;
    startBtn.textContent = 'Start';
    startBtn.style.opacity = '1';

    pauseBtn.disabled = true;
    pauseBtn.style.opacity = '0.6';

    lapBtn.disabled = true;
    resetBtn.disabled = true;

    // Clear Laps
    lapsList.innerHTML = '';
    lapCounter = 1;
});

// Lap Logic
lapBtn.addEventListener('click', () => {
    if (isRunning) {
        const currentTime = Date.now();
        const time = elapsedTime + (currentTime - startTime);
        const formatted = formatTime(time);

        const li = document.createElement('li');
        li.innerHTML = `
            <span class="lap-number">Lap ${lapCounter}</span>
            <span class="lap-time">${formatted.minutes}:${formatted.seconds}:${formatted.milliseconds}</span>
        `;

        // Add new lap to the top of the list
        lapsList.prepend(li);
        lapCounter++;
    }
});
