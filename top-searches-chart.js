// top-searches-chart.js
document.addEventListener("DOMContentLoaded", () => {
  const saved = JSON.parse(localStorage.getItem("savedSearches")) || [];

  const makeCounts = {};
  saved.forEach(s => {
    const make = (s.make || "").toLowerCase();
    if (make) makeCounts[make] = (makeCounts[make] || 0) + 1;
  });

  const top3 = Object.entries(makeCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const chartCanvas = document.getElementById("topSearchChart");
  if (chartCanvas && top3.length > 0) {
    const labels = top3.map(([make]) => make.toUpperCase());
    const data = top3.map(([, count]) => count);

    new Chart(chartCanvas, {
      type: "bar",
      data: {
        labels,
        datasets: [{
          label: "Searches",
          data
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
      }
    });
  }
});
