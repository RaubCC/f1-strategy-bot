import { currentStrategy } from './strategy.js';

const baseLapTimes = {
    'Soft (C5)': 80,
    'Medium (C3)': 81,
    'Hard (C1)': 83
};

export function drawLapDeltaChart() {
    // Defensive: check if currentStrategy is defined and has the expected properties
    if (!currentStrategy || !currentStrategy.firstStintTire || !currentStrategy.secondStintTire || !currentStrategy.finalStintTire) {
        console.error('Lap Delta Debug: currentStrategy is missing or incomplete', currentStrategy);
        return; // Prevent further errors
    } else {
        console.log('Lap Delta Debug:', currentStrategy.firstStintTire, currentStrategy.secondStintTire, currentStrategy.finalStintTire);
    }
    const ctx = document.getElementById('lapDeltaChart');
    if (!ctx) {
        console.error('Lap Delta Debug: lapDeltaChart canvas not found');
        return;
    }
    // Use getContext only if ctx is a canvas
    const chartCtx = ctx.getContext ? ctx.getContext('2d') : ctx;
    const laps = Array.from({ length: 60 }, (_, i) => i + 1);

    const strategyLapTimes = laps.map(lap => {
        let tireType;
        let stintStartLap;
        if (lap <= currentStrategy.firstPitLap) {
            tireType = currentStrategy.firstStintTire;
            stintStartLap = 1;
        } else if (lap <= currentStrategy.secondPitLap) {
            tireType = currentStrategy.secondStintTire;
            stintStartLap = currentStrategy.firstPitLap + 1;
        } else {
            tireType = currentStrategy.finalStintTire;
            stintStartLap = currentStrategy.secondPitLap + 1;
        }

        const baseLap = baseLapTimes[tireType];
        const tireAge = lap - stintStartLap;

        // Spice: exponential lap time increase based on tire age
        const degradationEffect = Math.pow(1 + (tireAge / 100), 2);
        const lapTime = baseLap + degradationEffect + Math.random() * 0.2;

        return lapTime;
    });

    if (window.lapDeltaChartInstance) {
        window.lapDeltaChartInstance.destroy();
    }

    window.lapDeltaChartInstance = new Chart(chartCtx, {
        type: 'line',
        data: {
            labels: laps,
            datasets: [
                {
                    label: 'Strategy Lap Times (s)',
                    borderColor: '#00ffe0',
                    borderWidth: 3,
                    pointRadius: 0,
                    tension: 0.3,
                    data: strategyLapTimes,
                    fill: false,
                }
            ]
        },
        options: {
            responsive: true,
            animation: {
                duration: 1000,
                easing: 'easeOutQuart'
            },
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Lap Time (s)'
                    },
                    beginAtZero: false
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

const tireWearRates = {
    'Soft (C5)': 2.0,
    'Medium (C3)': 1.3,
    'Hard (C1)': 0.9
};

export function drawTireChart() {
    console.log('Tire Chart Debug:', currentStrategy.firstPitLap, currentStrategy.secondPitLap);
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
            animation: {
                duration: 1000, // 1 second animation
                easing: 'easeOutQuart' // smooth and fast
            },
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
    const pitWindow1Start = currentStrategy.firstPitLap;
    const pitWindow2Start = currentStrategy.secondPitLap;
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
