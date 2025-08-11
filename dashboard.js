// document.addEventListener("DOMContentLoaded", () => {
//   // Redirect nëse nuk është loguar
//   if (!localStorage.getItem("loggedIn")) {
//     window.location.href = "login.html";
//     return;
//   }

//   // --- Chart për Car Analytics (grafika e re) ---
//   const carChart = document.getElementById("carAnalyticsChart");
//   if (carChart) {
//     new Chart(carChart, {
//       type: "line",
//       data: {
//         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//         datasets: [{
//           label: "Page Views",
//           data: [195, 132, 213, 362, 210, 250],
//           backgroundColor: "rgba(113, 135, 234, 0.2)",
//           borderColor: "#2a4df0",
//           borderWidth: 2,
//           fill: true,
//           tension: 0.4,
//           pointBackgroundColor: "#2a4df0"
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: { legend: { display: false } },
//         scales: {
//           y: {
//             beginAtZero: false,
//             min: 100,
//             max: 400
//           }
//         }
//       }
//     });
//   }

//   // --- Statistika dinamike ---
//   const statsDiv = document.getElementById("extra-stats");
//   const saved = JSON.parse(localStorage.getItem("savedSearches")) || [];
//   const viewed = JSON.parse(localStorage.getItem("viewedCars")) || [];

//   // Top 3 Searches (teksti dhe charti)
//   const makeCounts = {};
//   saved.forEach(s => {
//     const make = (s.make || "").toLowerCase();
//     if (make) makeCounts[make] = (makeCounts[make] || 0) + 1;
//   });

//   const top3 = Object.entries(makeCounts)
//     .sort((a, b) => b[1] - a[1])
//     .slice(0, 3);

//   const topSearchText = top3.map(([make, count]) => `${make.toUpperCase()}: ${count}x`).join("<br>");

//   const topBox = document.createElement("div");
//   topBox.className = "stat-box";
//   topBox.innerHTML = `<h3>Top 3 Searches</h3><p style="line-height:1.5;">${topSearchText || "No searches yet"}</p>`;
//   statsDiv.appendChild(topBox);

//   // Daily Filters Used
//   const today = new Date().toISOString().slice(0, 10);
//   const todayFilters = saved.filter(s => s.timestamp && s.timestamp.startsWith(today)).length;

//   const filterBox = document.createElement("div");
//   filterBox.className = "stat-box";
//   filterBox.innerHTML = `<h3>Daily Filters Used</h3><p>${todayFilters} time${todayFilters === 1 ? "" : "s"}</p>`;
//   statsDiv.appendChild(filterBox);

//   // --- Chart për Top 3 Searches (bar chart) ---
//   const topChart = document.getElementById("topSearchChart");
//   if (topChart && top3.length > 0) {
//     const labels = top3.map(([make]) => make.toUpperCase());
//     const data = top3.map(([, count]) => count);

//     new Chart(topChart, {
//       type: "bar",
//       data: {
//         labels,
//         datasets: [{
//           label: "Searches",
//           data,
//           backgroundColor: ["#2a4df0", "#3384ff", "#64a5f5"]
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: { legend: { display: false } },
//         scales: { y: { beginAtZero: true } }
//       }
//     });
//   }

//   // --- Logout handler ---
//   const logoutBtn = document.getElementById("logout");
//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", () => {
//       localStorage.removeItem("loggedIn");
//       window.location.href = "login.html";
//     });
//   }
// });





document.addEventListener("DOMContentLoaded", () => {
  // Redirect nese nuk osht logu 
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "login.html";
    return;
  }

  // --- Chart per Car Analytics (grafika e re) ---
  const carChart = document.getElementById("carAnalyticsChart");
  if (carChart) {
    new Chart(carChart, {
      type: "line",
      data: {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [{
          label: "Page Views",
          data: [195, 132, 213, 362, 210, 250, 100, 200, 320, 440, 220, 320],
          backgroundColor: "rgba(113, 135, 234, 0.2)",
          borderColor: "#2a4df0",
          borderWidth: 2,
          fill: true,
          tension: 0.1,
          pointBackgroundColor: "#2a4df0"
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: false,
            min: 0,
            max: 1000 //pjesen e y , per me shtu ose me hek numrat ne grafik 
          }
        }
      }
    });
  }

  // --- Statistika dinamike ---
  const statsDiv = document.getElementById("extra-stats");
  const saved = JSON.parse(localStorage.getItem("savedSearches")) || [];

  // Top 3 Searches (teksti dhe charti)
  const makeCounts = {};
  saved.forEach(s => {
    const make = (s.make || "").toLowerCase();
    if (make) makeCounts[make] = (makeCounts[make] || 0) + 1;
  });

  const top3 = Object.entries(makeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const topSearchText = top3.map(([make, count]) => `${make.toUpperCase()}: ${count}x`).join("<br>");

  const topBox = document.createElement("div");
  topBox.className = "stat-box";
  topBox.innerHTML = `<h3>Top 3 Searches</h3><p style="line-height:1.5;">${topSearchText || "No searches yet"}</p>`;
  statsDiv.appendChild(topBox);

  // Daily Filters Used
  const today = new Date().toISOString().slice(0, 10);
  const todayFilters = saved.filter(s => s.timestamp && s.timestamp.startsWith(today)).length;

  const filterBox = document.createElement("div");
  filterBox.className = "stat-box";
  filterBox.innerHTML = `<h3>Daily Filters Used</h3><p>${todayFilters} time${todayFilters === 1 ? "" : "s"}</p>`;
  statsDiv.appendChild(filterBox);

  // --- Chart per Top 3 Searches (bar chart) ---
  const topChart = document.getElementById("topSearchChart");
  if (topChart && top3.length > 0) {
    const labels = top3.map(([make]) => make.toUpperCase());
    const data = top3.map(([, count]) => count);

    new Chart(topChart, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Searches",
          data,
          backgroundColor: ["#2a4df0", "#3384ff", "#64a5f5"]
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }

  // --- Logout handler ---
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "login.html";
    });
  }
});


















