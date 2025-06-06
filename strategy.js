import { drawTireChart, drawPitWindowsChart } from './charts.js';
import { updateRaceSummary } from './summary.js';
import { drawTireChart, drawPitWindowsChart } from './charts.js';
import { updateRaceSummary } from './summary.js';
export function simulateStrategy() {
    // Show spinner
    document.getElementById('loading').style.display = 'block';

    // Hide existing results while loading
    document.getElementById('results').style.display = 'none';
    document.getElementById('pit-window-results').style.display = 'none';
    document.getElementById('race-summary').style.display = 'none';

    // Simulate 1.5 second loading delay
    setTimeout(() => {
        // Draw charts
        drawTireChart();
        drawPitWindowsChart();
        updateRaceSummary();

        // Hide spinner
        document.getElementById('loading').style.display = 'none';

        // Show results
        document.getElementById('results').style.display = 'block';
        document.getElementById('pit-window-results').style.display = 'block';
        document.getElementById('race-summary').style.display = 'block';
    }, 1500);
}
