import { currentStrategy } from './strategy.js';

const tireWearRates = {
    'Soft (C5)': 2.0,
    'Medium (C3)': 1.3,
    'Hard (C1)': 0.9
};

export function drawTireChart() {
    const ctx = document.getElementById('tireChart').getContext('2d');
    const laps = Array.from({ length: 60 }, (_, i) => i + 1);

    const tireWear = laps.map(lap => {
        let tireType;
        if (lap <= currentStrategy.firstPitLap) {
            tireType = currentStrategy.firstStintTire;
        } else if (lap <= currentStrategy.secondPitLap) {
            tireType = currentStrategy.secondStintTire;
        } else {
            tireType = currentStrategy.finalStintTire;
        }

        const wearRate = tireWearRates[tireType];

        // Spice: make degradation a curve → faster drop early, slower later
        const wear = Math.max(100 * Math.exp(-wearRate * lap / 100), 0);
        return wear;
    });

    if (window.tireChartInstance) {
        window.tireChartInstance.destroy();
    }

    window.tireChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: laps,
            datasets: [
                {
                    label: 'Tire Wear (%)',
                    borderColor: '#00ffe0',
                    borderWidth: 3,
                    pointRadius: 0,
                    tension: 0.3, // makes curve smooth
                    data: tireWear,
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Tire Life (%)'
                    },
                    beginAtZero: true,
                    max: 100
                },
                x: {
                    title: {
                        display: true,
                        text: 'Lap'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#00D2BE'
                    }
                }
            }
        }
    });
}

export function drawPitWindowsChart() {
    const ctx = document.getElementById('pitWindowChart').getContext('2d');
    const laps = Array.from({ length: 60 }, (_, i) => i + 1);
    const pitWindow1Start = 15;
    const pitWindow2Start = 40;
    const windowWidth = 3;

    const pitWindow1Data = laps.map(lap =>
        (lap >= pitWindow1Start - windowWidth && lap <= pitWindow1Start + windowWidth) ? 1 : 0
    );
    const pitWindow2Data = laps.map(lap =>
        (lap >= pitWindow2Start - windowWidth && lap <= pitWindow2Start + windowWidth) ? 1 : 0
    );

    if (window.pitWindowChartInstance) {
        window.pitWindowChartInstance.destroy();
    }

    window.pitWindowChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: laps,
            datasets: [
                {
                    label: '1st Pit Window',
                    backgroundColor: '#ff4d4d',
                    data: pitWindow1Data
                },
                {
                    label: '2nd Pit Window',
                    backgroundColor: '#ffcc00',
                    data: pitWindow2Data
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Pit Window'
                    },
                    beginAtZero: true,
                    max: 1
                },
                x: {
                    title: {
                        display: true,
                        text: 'Lap'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: '#00D2BE'
                    }
                }
            }
        }
    });
}
