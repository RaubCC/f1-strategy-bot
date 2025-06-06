export function updateRaceSummary() {
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
