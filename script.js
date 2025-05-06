let startTime, updatedTime, difference, tInterval;
let running = false;
let laps = [];
let hours = 0, minutes = 0, seconds = 0;

const display = document.getElementById('display');
const startStopBtn = document.getElementById('startStopBtn');
const lapBtn = document.getElementById('lapBtn');
const resetBtn = document.getElementById('resetBtn');
const lapsList = document.getElementById('lapsList');

startStopBtn.addEventListener('click', startStop);
lapBtn.addEventListener('click', recordLap);
resetBtn.addEventListener('click', reset);

function startStop() {
    if (!running) {
        startTime = new Date().getTime();
        tInterval = setInterval(updateTime, 1000);
        startStopBtn.innerHTML = 'Stop';
        running = true;
    } else {
        clearInterval(tInterval);
        startStopBtn.innerHTML = 'Start';
        running = false;
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    display.innerHTML = (hours < 10 ? "0" + hours : hours) + ":" + 
                        (minutes < 10 ? "0" + minutes : minutes) + ":" + 
                        (seconds < 10 ? "0" + seconds : seconds);
}

function recordLap() {
    if (running) {
        const lapTime = display.innerHTML;
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
}

function reset() {
    clearInterval(tInterval);
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    running = false;
    hours = 0;
    minutes = 0;
    seconds = 0;
    display.innerHTML = "00:00:00";
    startStopBtn.innerHTML = 'Start';
    lapsList.innerHTML = '';
}
