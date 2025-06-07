// Team theme info: driver name as key (lowercase, no spaces), but you can also use team as key
export const TEAM_THEMES = {
    "mercedes": {
        team: "Mercedes-AMG PETRONAS",
        color: "#00D2BE",
        logo: "🐲", // Or use an SVG image path here!
        drivers: ["George Russell", "Lewis Hamilton"]
    },
    "redbull": {
        team: "Red Bull Racing",
        color: "#1E41FF",
        logo: "🐂",
        drivers: ["Max Verstappen", "Sergio Perez"]
    },
    "ferrari": {
        team: "Scuderia Ferrari",
        color: "#DC0000",
        logo: "🐎",
        drivers: ["Charles Leclerc", "Carlos Sainz"]
    },
    "mclaren": {
        team: "McLaren F1 Team",
        color: "#FF8700",
        logo: "🥕",
        drivers: ["Lando Norris", "Oscar Piastri"]
    },
    "astonmartin": {
        team: "Aston Martin",
        color: "#229971",
        logo: "🦅",
        drivers: ["Fernando Alonso", "Lance Stroll"]
    },
    // Add the rest...
    "alpine": {
        team: "Alpine",
        color: "#2293D1",
        logo: "🔷",
        drivers: ["Pierre Gasly", "Esteban Ocon"]
    },
    "williams": {
        team: "Williams Racing",
        color: "#005AFF",
        logo: "🦅",
        drivers: ["Alex Albon", "Logan Sargeant"]
    },
    "kicksauber": {
        team: "Stake F1 Team Kick Sauber",
        color: "#52E252",
        logo: "🟢",
        drivers: ["Valtteri Bottas", "Zhou Guanyu"]
    },
    "rb": {
        team: "Visa Cash App RB",
        color: "#6692FF",
        logo: "🧢",
        drivers: ["Yuki Tsunoda", "Daniel Ricciardo"]
    },
    "haas": {
        team: "Haas F1 Team",
        color: "#B6BABD",
        logo: "🦈",
        drivers: ["Kevin Magnussen", "Nico Hülkenberg"]
    }
};
// Cache your original summary text somewhere!
let baseSummaryText = document.getElementById('summary-card').textContent;

function applyTeamTheme(driverName) {
    const team = getTeamForDriver(driverName);
    if (!team) return;

    // Update card accents and simulate button
    document.querySelectorAll('.card').forEach(card => {
        card.style.boxShadow = `0 2px 20px 2px ${team.color}33`;
        card.style.border = `2px solid ${team.color}`;
    });

    document.getElementById('simulate-btn').style.background = team.color;
    document.getElementById('simulate-btn').style.color = "#181c2c";
    document.getElementById('simulate-btn').style.fontWeight = "bold";

    // Only update summary card if it exists
    const summaryCard = document.getElementById('summary-card');
    if (summaryCard) {
        // Always start with the *original* text, not the last themed one
        summaryCard.innerHTML = `${team.logo} <b>${team.team}</b><br>${baseSummaryText}`;
    }
}

// After you update the summary (e.g. after a simulation),
// reset baseSummaryText to the latest summary before applying the theme!
function updateBaseSummary() {
    baseSummaryText = document.getElementById('summary-card').textContent;
}
