function simulateStrategy() {
    const ctx = document.getElementById('tireChart').getContext('2d');

    // Example fake data — hook this to real logic later
    const laps = Array.from({ length: 60 }, (_, i) => i + 1);
    const softWear = laps.map(lap => Math.max(100 - lap * 2, 0));
    const mediumWear = laps.map(lap => Math.max(100 - lap * 1.3, 0));
    const hardWear = laps.map(lap => Math.max(100 - lap * 0.9, 0));

    if (window.tireChartInstance) {
        window.tireChartInstance.destroy();
    }

    window.tireChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: laps,
            datasets: [
                {
                    label: 'Soft (C5)',
                    borderColor: '#ff4d4d',
                    data: softWear,
                    fill: false,
                },
                {
                    label: 'Medium (C3)',
                    borderColor: '#ffcc00',
                    data: mediumWear,
                    fill: false,
                },
                {
                    label: 'Hard (C1)',
                    borderColor: '#00ff66',
                    data: hardWear,
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
function simulatePitWindows() {
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
function simulateStrategy() {
    // Existing tire chart logic...
    const ctx = document.getElementById('tireChart').getContext('2d');
    const laps = Array.from({ length: 60 }, (_, i) => i + 1);
    const softWear = laps.map(lap => Math.max(100 - lap * 2, 0));
    const mediumWear = laps.map(lap => Math.max(100 - lap * 1.3, 0));
    const hardWear = laps.map(lap => Math.max(100 - lap * 0.9, 0));

    if (window.tireChartInstance) {
        window.tireChartInstance.destroy();
    }

    window.tireChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: laps,
            datasets: [
                {
                    label: 'Soft (C5)',
                    borderColor: '#ff4d4d',
                    data: softWear,
                    fill: false,
                },
                {
                    label: 'Medium (C3)',
                    borderColor: '#ffcc00',
                    data: mediumWear,
                    fill: false,
                },
                {
                    label: 'Hard (C1)',
                    borderColor: '#00ff66',
                    data: hardWear,
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

    // 🚀 Also simulate pit windows:
    simulatePitWindows();
}
function updateRaceSummary() {
    const gpSelector = document.getElementById('gp-selector');
    const selectedGP = gpSelector.options[gpSelector.selectedIndex].text;

    const selectedTires = Array.from(document.querySelectorAll('#tire-selection input:checked'))
        .map(input => input.value)
        .join(', ');

    const summaryText = `
🏎️ F1 Strategy Bot - Race Summary

Grand Prix: ${selectedGP}
Driver: George Russell
Selected Tires: ${selectedTires}

Strategy Plan:
- 1st Stint: Soft → Lap 15
- 2nd Stint: Medium → Lap 40
- Final Stint: Hard → Lap 61 (Finish)

Expected Total Race Time: ~1h 32m
Optimal Pit Stops: 2
Projected Finish: P2 (+3.2s behind P1)

Weather: Dry, 25°C
Safety Car Probability: Low
    `;

    document.getElementById('summary-card').textContent = summaryText;
}
