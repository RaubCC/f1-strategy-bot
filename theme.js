// Team theme info: driver name as key (lowercase, no spaces), but you can also use team as key
export const TEAM_THEMES = {
  redbull: {
    name: "Red Bull Racing",
    color: "#1E41FF",
    logo: "assets/logos/redbull.svg",
    drivers: ["Max Verstappen", "Yuki Tsunoda"],
  },
  ferrari: {
    name: "Ferrari",
    color: "#ED1C24",
    logo: "assets/logos/ferrari.svg",
    drivers: ["Charles Leclerc", "Lewis Hamilton"],
  },
  mercedes: {
    name: "Mercedes",
    color: "#6CD3BF",
    logo: "assets/logos/mercedes.svg",
    drivers: ["George Russell", "Andrea Kimi Antonelli"],
  },
  mclaren: {
    name: "McLaren",
    color: "#FF8000",
    logo: "assets/logos/mclaren.svg",
    drivers: ["Lando Norris", "Oscar Piastri"],
  },
  astonmartin: {
    name: "Aston Martin",
    color: "#229971",
    logo: "assets/logos/astonmartin.svg",
    drivers: ["Fernando Alonso", "Lance Stroll"],
  },
  alpine: {
    name: "Alpine",
    color: "#2293D1",
    logo: "assets/logos/alpine.svg",
    drivers: ["Pierre Gasly", "Franco Colapinto"],
  },
  williams: {
    name: "Williams",
    color: "#37BEDD",
    logo: "assets/logos/williams.svg",
    drivers: ["Alexander Albon", "Carlos Sainz Jr."],
  },
  racing_bulls: {
    name: "Racing Bulls",
    color: "#6692FF",
    logo: "assets/logos/racing_bulls.svg",
    drivers: ["Liam Lawson", "Isack Hadjar"],
  },
  sauber: {
    name: "Sauber",
    color: "#52E252",
    logo: "assets/logos/sauber.svg",
    drivers: ["Nico Hülkenberg", "Gabriel Bortoleto"],
  },
  haas: {
    name: "Haas",
    color: "#B6BABD",
    logo: "assets/logos/haas.svg",
    drivers: ["Esteban Ocon", "Oliver Bearman"],
  },
};
// Cache your original summary text somewhere!
let baseSummaryText = null;

function applyTeamTheme(driverName) {
    const team = getTeamForDriver(driverName);
    if (!team) return;

    // Initialize baseSummaryText if not already set
    if (baseSummaryText === null) {
        const summaryCardElem = document.getElementById('summary-card');
        baseSummaryText = summaryCardElem ? summaryCardElem.textContent : '';
    }

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
        summaryCard.innerHTML = `${team.logo} <b>${team.name}</b><br>${baseSummaryText}`;
    }
}

// After you update the summary (e.g. after a simulation),
// reset baseSummaryText to the latest summary before applying the theme!
function updateBaseSummary() {
    const summaryCardElem = document.getElementById('summary-card');
    baseSummaryText = summaryCardElem ? summaryCardElem.textContent : '';
}
