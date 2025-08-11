document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  if (!id) return;

  try {
    const response = await fetch("js/cars.json");
    const cars = await response.json();
    const car = cars.find(c => c.id === parseInt(id));
    if (!car) return;

    const titleEl = document.getElementById("car-title");
    const imgEl = document.getElementById("car-img");
    const descEl = document.getElementById("car-desc");
    const priceEl = document.getElementById("car-price");
    const infoEl = document.getElementById("car-info");

    if (titleEl) titleEl.textContent = car.title;
    if (imgEl) imgEl.src = car.img;
    if (descEl) descEl.textContent = car.desc;
    if (priceEl) priceEl.textContent = car.price;

    if (infoEl) {
      infoEl.innerHTML = `
        <li>Mileage: ${car.mileage}</li>
        <li>Fuel: ${car.fuel}</li>
        <li>Transmission: ${car.transmission}</li>
        <li>Doors: ${car.doors}</li>
        <li>Color: ${car.color}</li>
        <li>Year: ${car.year}</li>
        <li>VIN: ${car.vin}</li>
        <li>Condition: ${car.condition}</li>
      `;
    }
  } catch (err) {
    console.error("Error loading car details:", err);
  }
});
