// js/my-listings.js

document.addEventListener("DOMContentLoaded", () => {
  if (!localStorage.getItem("loggedIn")) {
    window.location.href = "login.html";
    return;
  }

  const table = document.querySelector("#listingsTable tbody");
  const listings = JSON.parse(localStorage.getItem("listings")) || [];

  function renderListings() {
    table.innerHTML = "";

    listings.forEach((car, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>
          ${car.image ? `<img src="${car.image}" style="width: 70px; height: auto; border-radius: 6px;" />` : "-"}
        </td>
        <td>${car.model || "-"}</td>
        <td>${car.price || "-"}</td>
        <td>${car.year || "-"}</td>
        <td>${car.transmission || "-"}</td>
        <td>
          <button onclick="deleteListing(${index})" >
            🗑️
          </button>
        </td>
      `;
      table.appendChild(row);
    });
  }

  window.deleteListing = function(index) {
    listings.splice(index, 1);
    localStorage.setItem("listings", JSON.stringify(listings));
    renderListings();
  };

  renderListings();
});



  // Logout
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "login.html";
    });
  }


