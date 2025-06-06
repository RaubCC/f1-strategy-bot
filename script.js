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
