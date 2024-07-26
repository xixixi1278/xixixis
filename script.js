let simulationRunning = false;
let temperatureThreshold = 30;
let areaThreshold1 = 100;
let areaThreshold2 = 200;
let waterSwitchStatus = '关闭';
let electricSwitchStatus = '关闭';
let peopleCount = 0;

function toggleSimulation() {
    simulationRunning = !simulationRunning;
    if (simulationRunning) {
        simulateData();
    }
}

function simulateData() {
    setInterval(() => {
        const temp = Math.floor(Math.random() * 50) + 1;
        const area = Math.floor(Math.random() * 600) + 100;
        const personDetected = Math.random() < 0.5;

        updateDisplay(temp, area, personDetected);
        evaluateConditions(temp, area, personDetected);
    }, 5000);
}

function updateDisplay(temp, area, personDetected) {
    document.getElementById('temperatureDisplay').innerText = temp;
    document.getElementById('areaDisplay').innerText = area;
    document.getElementById('peopleCountDisplay').innerText = personDetected ? 1 : 0;
}

function handleEnergySwitch(type) {
    if (type === 'water') {
        waterSwitchStatus = document.getElementById('waterSwitchCheckbox').checked ? '开启' : '关闭';
    } else if (type === 'electric') {
        electricSwitchStatus = document.getElementById('electricSwitchCheckbox').checked ? '开启' : '关闭';
    }
    updateDisplayUI();
}

function updateDisplayUI() {
    document.getElementById('waterSwitchStatus').innerText = waterSwitchStatus;
    document.getElementById('electricSwitchStatus').innerText = electricSwitchStatus;
}

function evaluateConditions(temp, area, personDetected) {
    if (temp >= temperatureThreshold && area >= areaThreshold2) {
        activateAlarm();
        activateBuzzer();
    } else {
        deactivateAlarm();
        deactivateBuzzer();
    }

    if (personDetected) {
        // Simulate turning on energy switches based on personnel detection
        waterSwitchStatus = '开启';
        electricSwitchStatus = '开启';
    } else {
        // Simulate turning off energy switches when no personnel detected
        waterSwitchStatus = '关闭';
        electricSwitchStatus = '关闭';
    }

    updateDisplayUI();
}

function activateAlarm() {
    document.getElementById('alarmLight').dataset.status = "on";
    document.getElementById('alarmStatus').innerText = '工作';
}

function deactivateAlarm() {
    document.getElementById('alarmLight').dataset.status = "off";
    document.getElementById('alarmStatus').innerText = '不工作';
}

function activateBuzzer() {
    document.getElementById('buzzerLight').dataset.status = "on";
    document.getElementById('buzzerStatus').innerText = '工作';
}

function deactivateBuzzer() {
    document.getElementById('buzzerLight').dataset.status = "off";
    document.getElementById('buzzerStatus').innerText = '不工作';
}

// Initialize
document.getElementById('simulationToggle').addEventListener('click', toggleSimulation);