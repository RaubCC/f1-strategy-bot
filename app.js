import { drawTireChart, drawLapDeltaChart, drawPitWindowsChart } from './charts.js';
import { updateRaceSummary } from './summary.js';
export let currentStrategy = {
    firstPitLap: 15,
    secondPitLap: 40,
    firstStintTire: 'Soft (C5)',
    secondStintTire: 'Medium (C3)',
    finalStintTire: 'Hard (C1)',
    driver: 'George Russell',
    grandPrix: 'Silverstone 🇬🇧'
};

// Simulate Strategy Function
export function simulateStrategy() {
    // Show loading spinner
    document.getElementById('loading').style.display = 'block';

    // Hide results while simulating
    document.getElementById('results').style.display = 'none';
    document.getElementById('pit-window-results').style.display = 'none';
    document.getElementById('lap-delta-results').style.display = 'none';
    document.getElementById('race-summary').style.display = 'none';

    // Update currentStrategy from inputs
    currentStrategy.firstPitLap = parseInt(document.getElementById('first-pit-lap').value);
    currentStrategy.secondPitLap = parseInt(document.getElementById('second-pit-lap').value);
    currentStrategy.firstStintTire = document.getElementById('first-stint-tire').value;
    currentStrategy.secondStintTire = document.getElementById('second-stint-tire').value;
    currentStrategy.finalStintTire = document.getElementById('final-stint-tire').value;
    currentStrategy.driver = document.getElementById('driver-select').value;
    currentStrategy.grandPrix = document.getElementById('gp-selector').value;

    // Simulate with slight delay to show loading spinner
    setTimeout(() => {
        // Draw Charts
        drawTireChart();
        drawLapDeltaChart();
        drawPitWindowsChart();

        // Update Summary Card
        updateRaceSummary();

        // Hide spinner, show results
        document.getElementById('loading').style.display = 'none';
        document.getElementById('results').style.display = 'block';
        document.getElementById('pit-window-results').style.display = 'block';
        document.getElementById('lap-delta-results').style.display = 'block';
        document.getElementById('race-summary').style.display = 'block';
    }, 1000);
}

// Add Event Listener to Simulate Button
document.getElementById('simulate-btn').addEventListener('click', simulateStrategy);
