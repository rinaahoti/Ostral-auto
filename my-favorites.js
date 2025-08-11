// js/my-favorites.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favoritesContainer");
  const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  function renderFavorites() {
    container.innerHTML = "";

    if (favorites.length === 0) {
      container.innerHTML = "<p>You have no favorite cars yet.</p>";
      return;
    }

    favorites.forEach((car, index) => {
      const card = document.createElement("div");
      card.className = "favorite-card";

      card.innerHTML = `
        <button class="remove-btn" onclick="removeFavorite(${index})">❌</button>
        <img src="${car.image || 'https://via.placeholder.com/300x180'}" alt="${car.title}">
        <div class="favorite-card-content">
          <h3>${car.title || 'Untitled Car'}</h3>
          <div class="price">${car.price || 'N/A'}</div>
        </div>
      `;

      container.appendChild(card);
    });
  }

  window.removeFavorite = function(index) {
    favorites.splice(index, 1);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  };

  renderFavorites();
});
