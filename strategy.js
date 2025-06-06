import { drawTireChart, drawPitWindowsChart } from './charts.js';
import { updateRaceSummary } from './summary.js';

export function simulateStrategy() {
    drawTireChart();
    drawPitWindowsChart();
    updateRaceSummary();
}
