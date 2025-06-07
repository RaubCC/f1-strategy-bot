import { TEAM_THEMES } from './theme.js';
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

// --- Team/Driver Dropdown Population ---
const teamSelector = document.getElementById('teamSelector');
const driverSelector = document.getElementById('driverSelector');

function populateTeams() {
  teamSelector.innerHTML = '';
  Object.entries(TEAM_THEMES).forEach(([key, team]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = team.name;
    teamSelector.appendChild(option);
  });
}

function populateDrivers(teamKey) {
  driverSelector.innerHTML = '';
  const team = TEAM_THEMES[teamKey];
  if (!team) return;
  team.drivers.forEach(driver => {
    const option = document.createElement('option');
    option.value = driver;
    option.textContent = driver;
    driverSelector.appendChild(option);
  });
}

teamSelector.addEventListener('change', (e) => {
  populateDrivers(e.target.value);
  applyTeamTheme(driverSelector.value);
});

driverSelector.addEventListener('change', (e) => {
  applyTeamTheme(e.target.value);
});

// On page load:
populateTeams();
teamSelector.selectedIndex = 0;
populateDrivers(teamSelector.value);
applyTeamTheme(driverSelector.value);

// --- Theming logic ---
function getTeamForDriver(driverName) {
  return Object.values(TEAM_THEMES).find(team => team.drivers.includes(driverName));
}

function applyTeamTheme(driverName) {
  const team = getTeamForDriver(driverName);
  if (!team) return;
  document.querySelectorAll('.card').forEach(card => {
    card.style.boxShadow = `0 2px 20px 2px ${team.color}33`;
    card.style.border = `2px solid ${team.color}`;
  });
  document.getElementById('simulate-btn').style.background = team.color;
  document.getElementById('simulate-btn').style.color = "#181c2c";
  document.getElementById('simulate-btn').style.fontWeight = "bold";
  const summaryCard = document.getElementById('summary-card');
  if (summaryCard) {
    summaryCard.innerHTML = `${team.logo} <b>${team.name}</b><br>${summaryCard.textContent}`;
  }
}
