// Kapitalizo tekstin e parë (Audi, Diesel, Manual, etj.)
function capitalize(text) {
  if (!text || typeof text !== "string") return "-";
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

document.addEventListener("DOMContentLoaded", () => {
  const table = document.getElementById("savedSearchTable");
  const saved = JSON.parse(localStorage.getItem("savedSearches")) || [];

  saved.reverse().forEach(s => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${
        s.source === "index"
          ? "Quick Search"
          : s.source === "carsforsale"
            ? "Advanced Filters"
            : "-"
      }</td>

      <td>${capitalize(s.make)}</td>
      <td>${s.minYear || "?"} - ${s.maxYear || "?"}</td>
      <td>€${s.minPrice || "?"} - €${s.maxPrice || "?"}</td>
      <td>${
        Array.isArray(s.fuel) && s.fuel.length > 0
          ? s.fuel.map(capitalize).join(", ")
          : "-"
      }</td>
      <td>${
        Array.isArray(s.transmission) && s.transmission.length > 0
          ? s.transmission.map(capitalize).join(", ")
          : "-"
      }</td>
      <td>${new Date(s.timestamp).toLocaleString()}</td>
    `;

    table.appendChild(row);
  });

  // Logout nga sidebar
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "login.html";
    });
  }
});

