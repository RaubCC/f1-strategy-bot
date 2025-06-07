import { currentStrategy } from './app.js';

export function updateRaceSummary() {
    const summaryText = `
🏎️ F1 Strategy Bot - Race Summary

Grand Prix: ${currentStrategy.grandPrix}
Driver: ${currentStrategy.driver}

Strategy Plan:
- 1st Stint: ${currentStrategy.firstStintTire} → Lap ${currentStrategy.firstPitLap}
- 2nd Stint: ${currentStrategy.secondStintTire} → Lap ${currentStrategy.secondPitLap}
- Final Stint: ${currentStrategy.finalStintTire} → Lap 61 (Finish)

Expected Total Race Time: ~1h 32m
Optimal Pit Stops: 2
Projected Finish: P2 (+3.2s behind P1)

Weather: Dry, 25°C
Safety Car Probability: Low
    `;

    document.getElementById('summary-card').textContent = summaryText;
}
