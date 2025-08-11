document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) return;

  try {
    const response = await fetch("js/cars.json");
    const cars = await response.json();
    const car = cars.find(c => c.id === parseInt(id));
    if (!car) return;

    // Vendos të dhënat në faqe
    document.getElementById("car-title").textContent = car.title;
    document.getElementById("car-img").src = car.img;
    document.getElementById("car-desc").textContent = car.desc;
    document.getElementById("car-price").textContent = car.price;

    // Mbush tabelën nëse ekziston
    const overviewTableBody = document.getElementById("overview-table-body");
    overviewTableBody.innerHTML = "";

    const icons = {
      "Body": "bi-car-front",
      "Mileage": "bi-speedometer2",
      "Fuel Type": "bi-fuel-pump",
      "Year": "bi-calendar-date",
      "Transmission": "bi-gear",
      "Drive Type": "bi-reception-4",
      "Condition": "bi-award",
      "Engine Size": "bi-cpu",
      "Doors": "bi-door-closed",
      "Cylinders": "bi-stack",
      "Color": "bi-palette",
      "VIN": "bi-key"
    };

    if (car.overview) {
      for (const [key, value] of Object.entries(car.overview)) {
        const iconClass = icons[key] || "bi-circle";
        const tr = document.createElement("tr");
        tr.innerHTML = `
          <td>
            <span class="icon-list"><i class="bi ${iconClass}"></i></span>
            ${key}
          </td>
          <td>${value}</td>
        `;
        overviewTableBody.appendChild(tr);
      }
    }

    // Event për butonin "Add to Cart"
    const addToCartBtn = document.querySelector(".btn-cart");
    if (addToCartBtn) {
      addToCartBtn.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const index = cart.findIndex(item => item.id === car.id);

        if (index > -1) {
          cart[index].quantity += 1;
        } else {
          cart.push({
            id: car.id,
            title: car.title,
            price: car.price,
            img: car.img,
            quantity: 1
          });
        }

        localStorage.setItem("cart", JSON.stringify(cart));

        // Thirre funksionin global për përditësim të badge-it
        if (typeof updateCartBadge === 'function') {
          updateCartBadge();
        }
      });
    }

    // Thirrja fillestare
    if (typeof updateCartBadge === 'function') {
      updateCartBadge();
    }

  } catch (err) {
    console.error("Gabim gjatë ngarkimit të makinës:", err);
  }
});



//pjesa e favorites ne dashboard
  // document.getElementById("addToFavoritesBtn")?.addEventListener("click", () => {
  //   const title = document.getElementById("car-title")?.innerText || "No Title";
  //   const price = document.getElementById("car-price")?.innerText || "N/A";
  //   const image = document.getElementById("car-img")?.src || "";

  //   const favoriteCar = { title, price, image };

  //   let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  //   const alreadyExists = favorites.some(car => car.title === title && car.price === price);
  //   if (!alreadyExists) {
  //     favorites.push(favoriteCar);
  //     localStorage.setItem("favorites", JSON.stringify(favorites));
  //     alert("Makina u shtua në Favorites!");
  //   } else {
  //     alert("Kjo makinë është tashmë në Favorites.");
  //   }
  // });


