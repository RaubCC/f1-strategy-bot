import { drawTireChart, drawPitWindowsChart } from './charts.js';
import { updateRaceSummary } from './summary.js';
import { drawTireChart, drawPitWindowsChart } from './charts.js';
import { updateRaceSummary } from './summary.js';
export function simulateStrategy() {
    // Show spinner
    const loading = document.getElementById('loading');
    const results = document.getElementById('results');
    const pitWindowResults = document.getElementById('pit-window-results');
    const raceSummary = document.getElementById('race-summary');

    loading.style.display = 'block';
    results.style.display = 'none';
    pitWindowResults.style.display = 'none';
    raceSummary.style.display = 'none';

    // Simulate 1.5 second loading delay
    setTimeout(() => {
        // Draw charts
        drawTireChart();
        drawPitWindowsChart();
        updateRaceSummary();

        loading.style.display = 'none';
        results.style.display = 'block';
        pitWindowResults.style.display = 'block';
        raceSummary.style.display = 'block';
    }, 1500);
}
