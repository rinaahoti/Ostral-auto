// // --- START: carsforsale.js ---
// document.addEventListener("DOMContentLoaded", () => {
//   // -- Slider Min/Max Price --
//   const minRange = document.getElementById("range-min");
//   const maxRange = document.getElementById("range-max");
//   const minPrice = document.getElementById("min-price");
//   const maxPrice = document.getElementById("max-price");
//   const sliderTrack = document.getElementById("slider-track");

//   function formatPrice(value) {
//     return "€" + Number(value).toLocaleString();
//   }

//   function updatePrices() {
//     let minVal = parseInt(minRange.value);
//     let maxVal = parseInt(maxRange.value);

//     if (minVal > maxVal) {
//       minVal = maxVal;
//       minRange.value = maxVal;
//     }
//     if (maxVal < minVal) {
//       maxVal = minVal;
//       maxRange.value = minVal;
//     }

//     minPrice.textContent = formatPrice(minVal);
//     maxPrice.textContent = formatPrice(maxVal);

//     const min = parseInt(minRange.min);
//     const max = parseInt(maxRange.max);

//     const minPercent = ((minVal - min) / (max - min)) * 100;
//     const maxPercent = ((maxVal - min) / (max - min)) * 100;

//     sliderTrack.style.background = `linear-gradient(
//       to right,
//       #ccc 0%,
//       #ccc ${minPercent}%,
//       #007BFF ${minPercent}%,
//       #007BFF ${maxPercent}%,
//       #ccc ${maxPercent}%,
//       #ccc 100%
//     )`;
//   }

//   minRange.addEventListener("input", updatePrices);
//   maxRange.addEventListener("input", updatePrices);
//   updatePrices();

//   const mileageInput = document.getElementById("mileageRange");
//   const mileageValue = document.getElementById("mileageDisplay");

//   function setMileageFill() {
//     const min = parseInt(mileageInput.min);
//     const max = parseInt(mileageInput.max);
//     const val = parseInt(mileageInput.value);
//     const percent = ((val - min) / (max - min)) * 100;

//     mileageInput.style.setProperty("--fill-percent", percent + "%");
//   }

//   function updateMileageDisplay() {
//     mileageValue.textContent = Number(mileageInput.value).toLocaleString() + " km";
//   }

//   mileageInput.addEventListener("input", () => {
//     setMileageFill();
//     updateMileageDisplay();
//   });

//   setMileageFill();
//   updateMileageDisplay();

//   const dropdowns = document.querySelectorAll(".dropdown");

//   dropdowns.forEach(dropdown => {
//     const selected = dropdown.querySelector(".selected");
//     const options = dropdown.querySelector(".options");
//     const arrow = dropdown.querySelector(".arrow");

//     arrow.addEventListener("click", (e) => {
//       e.stopPropagation();
//       const isOpen = options.style.display === "block";
//       document.querySelectorAll(".options").forEach(opt => opt.style.display = "none");
//       options.style.display = isOpen ? "none" : "block";
//     });

//     options.querySelectorAll("li").forEach(option => {
//       option.addEventListener("click", () => {
//         selected.textContent = option.textContent;
//         options.style.display = "none";
//       });
//     });

//     document.addEventListener("click", (e) => {
//       if (!dropdown.contains(e.target)) {
//         options.style.display = "none";
//       }
//     });
//   });
// });

// // --- START: pagination.js ---
// const carsPerPage = 9;
// let currentPage = 1;
// let carsData = [];
// let filteredCars = [];

// const carContainer = document.querySelector('.car-cards-container');
// const paginationNav = document.querySelector('.pagination');
// const showingCount = document.querySelector('.showing-count');

// async function loadCars() {
//   try {
//     const response = await fetch('js/cars.json');
//     carsData = await response.json();
//     filteredCars = [...carsData];
//     renderPage(currentPage);
//     renderPagination();
//   } catch (error) {
//     console.error('❌ Error loading cars:', error);
//   }
// }

// function renderPage(page) {
//   carContainer.innerHTML = '';
//   const start = (page - 1) * carsPerPage;
//   const end = start + carsPerPage;
//   const pageCars = filteredCars.slice(start, end);

//   if (pageCars.length === 0) {
//     carContainer.innerHTML = '<p>Nuk u gjet asnjë makinë me kriteret e kërkuara.</p>';
//     if (showingCount) showingCount.textContent = '';
//     return;
//   }

//   pageCars.forEach(car => {
//     const carCard = document.createElement('div');
//     carCard.className = 'car-card';
//     carCard.innerHTML = `
//       <img src="${car.img}" alt="${car.title}" class="car-card-img">
//       <div class="car-card-body">
//         <div class="car-card-title">${car.title}</div>
//         <div class="car-card-desc">${car.desc}</div>
//         <div class="car-card-properties">
//           <div class="property"><i class="fa-solid fa-road"></i><span class="property-label">${car.mileage}</span></div>
//           <div class="property"><i class="fa-solid fa-gas-pump"></i><span class="property-label">${car.fuel}</span></div>
//           <div class="property"><i class="fa-solid fa-gear"></i><span class="property-label">${car.transmission}</span></div>
//         </div>
//         <div class="car-card-bottom">
//           <div><div class="price-main">${car.price}</div></div>
//           <a href="car-details.html?id=${car.id}" class="car-card-link">View Details <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
//         </div>
//       </div>
//     `;
//     carContainer.appendChild(carCard);
//   });

//   if (showingCount) {
//     const total = filteredCars.length;
//     const startItem = start + 1;
//     const endItem = Math.min(end, total);
//     showingCount.textContent = `Showing ${startItem} to ${endItem} of ${total} vehicles`;
//   }
// }

// function renderPagination() {
//   paginationNav.innerHTML = '';
//   const totalPages = Math.ceil(filteredCars.length / carsPerPage);
//   if (totalPages <= 1) return;

//   const createPageButton = (page) => {
//     const btn = document.createElement('button');
//     btn.className = 'page-btn';
//     btn.textContent = page;
//     if (page === currentPage) btn.classList.add('active');
//     btn.addEventListener('click', () => {
//       currentPage = page;
//       renderPage(currentPage);
//       renderPagination();
//     });
//     return btn;
//   };

//   const prevBtn = document.createElement('button');
//   prevBtn.className = 'page-btn';
//   prevBtn.setAttribute('aria-label', 'Previous');
//   prevBtn.disabled = currentPage === 1;
//   prevBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
//   prevBtn.addEventListener('click', () => {
//     if (currentPage > 1) {
//       currentPage--;
//       renderPage(currentPage);
//       renderPagination();
//     }
//   });
//   paginationNav.appendChild(prevBtn);

//   for (let i = 1; i <= totalPages; i++) {
//     paginationNav.appendChild(createPageButton(i));
//   }

//   const nextBtn = document.createElement('button');
//   nextBtn.className = 'page-btn';
//   nextBtn.setAttribute('aria-label', 'Next');
//   nextBtn.disabled = currentPage === totalPages;
//   nextBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
//   nextBtn.addEventListener('click', () => {
//     if (currentPage < totalPages) {
//       currentPage++;
//       renderPage(currentPage);
//       renderPagination();
//     }
//   });
//   paginationNav.appendChild(nextBtn);
// }

// // --- FULL applyFilters() FUNCTION ---
// function applyFilters() {
//   const make = document.getElementById('make').value.trim().toLowerCase();
//   const minPrice = parseInt(document.getElementById('range-min').value);
//   const maxPrice = parseInt(document.getElementById('range-max').value);
//   const maxMileage = parseInt(document.getElementById('mileageRange').value);

//   const minYear = parseInt(document.querySelector('#min-dropdown .selected')?.textContent) || 2000;
//   const maxYear = parseInt(document.querySelector('#max-dropdown .selected')?.textContent) || 2025;

//   const fuelTypes = Array.from(document.querySelectorAll('input[name="fuel"]:checked')).map(cb => cb.value.toLowerCase());
//   const transmissions = Array.from(document.querySelectorAll('input[name="transmission"]:checked')).map(cb => cb.value.toLowerCase());

//   const doors = document.getElementById('doors').value;
//   const color = document.getElementById('color').value.toLowerCase();
//   const condition = document.getElementById('condition').value.toLowerCase();

//   filteredCars = carsData.filter(car => {
//     const carMake = (car.make || car.overview?.Make || "").toLowerCase();
//     const carPrice = parseInt(car.price.replace(/[€,.]/g, '').trim());
//     const carMileage = parseInt(car.mileage.replace(/[., km]/g, '').trim());
//     const carYear = parseInt(car.year || car.overview?.Year || "2000");
//     const carFuel = (car.fuel || car.overview?.["Fuel Type"] || "").toLowerCase();
//     const carTransmission = (car.transmission || car.overview?.Transmission || "").toLowerCase();
//     const carDoors = (car.doors || car.overview?.Doors || "").toLowerCase();
//     const carColor = (car.color || car.overview?.Color || "").toLowerCase();
//     const carCondition = (car.condition || car.overview?.Condition || "").toLowerCase();

//     return (
//       (!make || carMake === make) &&
//       (!isNaN(carPrice) && carPrice >= minPrice && carPrice <= maxPrice) &&
//       (!isNaN(carMileage) && carMileage <= maxMileage) &&
//       (!isNaN(carYear) && carYear >= minYear && carYear <= maxYear) &&
//       (fuelTypes.length === 0 || fuelTypes.includes(carFuel)) &&
//       (transmissions.length === 0 || transmissions.includes(carTransmission)) &&
//       (!doors || carDoors.includes(doors)) &&
//       (!color || carColor === color) &&
//       (!condition || carCondition === condition)
//     );
//   });

//   currentPage = 1;
//   renderPage(currentPage);
//   renderPagination();
// }

// document.addEventListener('DOMContentLoaded', () => {
//   loadCars();

//   const filterBtn = document.querySelector('.filter-btn');
//   if (filterBtn) {
//     filterBtn.addEventListener('click', applyFilters);
//   }
// });




// //pjesa e sort by price (qe o nalt)
// document.querySelector('.sort-dropdown').addEventListener('change', function () {
//   const sortType = this.value;

//   if (sortType === 'price-low') {
//     filteredCars.sort((a, b) => {
//       const priceA = parseInt(a.price.replace(/[€,.]/g, '').trim());
//       const priceB = parseInt(b.price.replace(/[€,.]/g, '').trim());
//       return priceA - priceB;
//     });
//   } else if (sortType === 'price-high') {
//     filteredCars.sort((a, b) => {
//       const priceA = parseInt(a.price.replace(/[€,.]/g, '').trim());
//       const priceB = parseInt(b.price.replace(/[€,.]/g, '').trim());
//       return priceB - priceA;
//     });
//   } else if (sortType === 'km') {
//     filteredCars.sort((a, b) => {
//       const kmA = parseInt(a.mileage.replace(/[., km]/g, '').trim());
//       const kmB = parseInt(b.mileage.replace(/[., km]/g, '').trim());
//       return kmA - kmB;
//     });
//   }

//   currentPage = 1;
//   renderPage(currentPage);
//   renderPagination();
// });



// //prej index.html
// document.addEventListener("DOMContentLoaded", () => {
//   loadCars().then(() => {
//     const params = new URLSearchParams(window.location.search);
//     const make = params.get("make");
//     const model = params.get("model");
//     const minPrice = params.get("minPrice");

//     if (make || model || minPrice) {
//       // Zgjedh direkt filtrat dhe i aplikon
//       document.getElementById("make").value = make || "";

//       if (minPrice) {
//         const minRange = document.getElementById("range-min");
//         if (minRange) minRange.value = minPrice;
//       }

//       applyFilters(); // Thirr direkt filtrimin
//     }
//   });
// });



// //per saved search ndashboard
// function goToDetails(car) {
//   let list = JSON.parse(localStorage.getItem("viewedCars")) || [];

//   const already = list.some(c => c.title === car.title);
//   if (!already) list.push(car);

//   localStorage.setItem("viewedCars", JSON.stringify(list));
//   window.location.href = `car-details.html?id=${car.id}`;
// }


// --- START: filters-final.js ---
document.addEventListener("DOMContentLoaded", () => {
  const minRange = document.getElementById("range-min");
  const maxRange = document.getElementById("range-max");
  const minPrice = document.getElementById("min-price");
  const maxPrice = document.getElementById("max-price");
  const sliderTrack = document.getElementById("slider-track");

  function formatPrice(value) {
    return "€" + Number(value).toLocaleString();
  }

  function updatePrices() {
    let minVal = parseInt(minRange.value);
    let maxVal = parseInt(maxRange.value);

    if (minVal > maxVal) {
      minVal = maxVal;
      minRange.value = maxVal;
    }
    if (maxVal < minVal) {
      maxVal = minVal;
      maxRange.value = minVal;
    }

    minPrice.textContent = formatPrice(minVal);
    maxPrice.textContent = formatPrice(maxVal);

    const min = parseInt(minRange.min);
    const max = parseInt(maxRange.max);
    const minPercent = ((minVal - min) / (max - min)) * 100;
    const maxPercent = ((maxVal - min) / (max - min)) * 100;

    sliderTrack.style.background = `linear-gradient(
      to right,
      #ccc 0%,
      #ccc ${minPercent}%,
      #007BFF ${minPercent}%,
      #007BFF ${maxPercent}%,
      #ccc ${maxPercent}%,
      #ccc 100%
    )`;
  }

  minRange.addEventListener("input", updatePrices);
  maxRange.addEventListener("input", updatePrices);
  updatePrices();

  const mileageInput = document.getElementById("mileageRange");
  const mileageValue = document.getElementById("mileageDisplay");

  function setMileageFill() {
    const min = parseInt(mileageInput.min);
    const max = parseInt(mileageInput.max);
    const val = parseInt(mileageInput.value);
    const percent = ((val - min) / (max - min)) * 100;
    mileageInput.style.setProperty("--fill-percent", percent + "%");
  }

  function updateMileageDisplay() {
    mileageValue.textContent = Number(mileageInput.value).toLocaleString() + " km";
  }

  mileageInput.addEventListener("input", () => {
    setMileageFill();
    updateMileageDisplay();
  });

  setMileageFill();
  updateMileageDisplay();

  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach(dropdown => {
    const selected = dropdown.querySelector(".selected");
    const options = dropdown.querySelector(".options");
    const arrow = dropdown.querySelector(".arrow");

    arrow.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = options.style.display === "block";
      document.querySelectorAll(".options").forEach(opt => opt.style.display = "none");
      options.style.display = isOpen ? "none" : "block";
    });

    options.querySelectorAll("li").forEach(option => {
      option.addEventListener("click", () => {
        selected.textContent = option.textContent;
        options.style.display = "none";
      });
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target)) {
        options.style.display = "none";
      }
    });
  });
});

const carsPerPage = 9;
let currentPage = 1;
let carsData = [];
let filteredCars = [];

const carContainer = document.querySelector('.car-cards-container');
const paginationNav = document.querySelector('.pagination');
const showingCount = document.querySelector('.showing-count');

async function loadCars() {
  try {
    const response = await fetch('js/cars.json');
    carsData = await response.json();
    filteredCars = [...carsData];
    renderPage(currentPage);
    renderPagination();
  } catch (error) {
    console.error('❌ Error loading cars:', error);
  }
}

function renderPage(page) {
  carContainer.innerHTML = '';
  const start = (page - 1) * carsPerPage;
  const end = start + carsPerPage;
  const pageCars = filteredCars.slice(start, end);

  if (pageCars.length === 0) {
    carContainer.innerHTML = '<p>Nuk u gjet asnjë makinë me kriteret e kërkuara.</p>';
    showingCount.textContent = '';
    return;
  }

  pageCars.forEach(car => {
    const carCard = document.createElement('div');
    carCard.className = 'car-card';
    carCard.innerHTML = `
      <img src="${car.img}" alt="${car.title}" class="car-card-img">
      <div class="car-card-body">
        <div class="car-card-title">${car.title}</div>
        <div class="car-card-desc">${car.desc}</div>
        <div class="car-card-properties">
          <div class="property"><i class="fa-solid fa-road"></i><span class="property-label">${car.mileage}</span></div>
          <div class="property"><i class="fa-solid fa-gas-pump"></i><span class="property-label">${car.fuel}</span></div>
          <div class="property"><i class="fa-solid fa-gear"></i><span class="property-label">${car.transmission}</span></div>
        </div>
        <div class="car-card-bottom">
          <div><div class="price-main">${car.price}</div></div>
          <a href="car-details.html?id=${car.id}" class="car-card-link">View Details <i class="fa-solid fa-arrow-up-right-from-square"></i></a>
        </div>
      </div>
    `;
    carContainer.appendChild(carCard);
  });

  const total = filteredCars.length;
  showingCount.textContent = `Showing ${start + 1} to ${Math.min(end, total)} of ${total} vehicles`;
}

function renderPagination() {
  paginationNav.innerHTML = '';
  const totalPages = Math.ceil(filteredCars.length / carsPerPage);
  if (totalPages <= 1) return;

  const createPageButton = (page) => {
    const btn = document.createElement('button');
    btn.className = 'page-btn';
    btn.textContent = page;
    if (page === currentPage) btn.classList.add('active');
    btn.addEventListener('click', () => {
      currentPage = page;
      renderPage(currentPage);
      renderPagination();
    });
    return btn;
  };

  const prevBtn = document.createElement('button');
  prevBtn.className = 'page-btn';
  prevBtn.setAttribute('aria-label', 'Previous');
  prevBtn.innerHTML = '<i class="fa-solid fa-angle-left"></i>';
  prevBtn.disabled = currentPage === 1;
  prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      renderPage(currentPage);
      renderPagination();
    }
  });
  paginationNav.appendChild(prevBtn);

  for (let i = 1; i <= totalPages; i++) {
    paginationNav.appendChild(createPageButton(i));
  }

  const nextBtn = document.createElement('button');
  nextBtn.className = 'page-btn';
  nextBtn.setAttribute('aria-label', 'Next');
  nextBtn.innerHTML = '<i class="fa-solid fa-angle-right"></i>';
  nextBtn.disabled = currentPage === totalPages;
  nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderPage(currentPage);
      renderPagination();
    }
  });
  paginationNav.appendChild(nextBtn);
}

function applyFilters() {
  const make = document.getElementById('make').value.trim().toLowerCase();
  const minPrice = parseInt(document.getElementById('range-min').value);
  const maxPrice = parseInt(document.getElementById('range-max').value);
  const maxMileage = parseInt(document.getElementById('mileageRange').value);
  const minYear = parseInt(document.querySelector('#min-dropdown .selected')?.textContent) || 2000;
  const maxYear = parseInt(document.querySelector('#max-dropdown .selected')?.textContent) || 2025;

  const fuelTypes = Array.from(document.querySelectorAll('input[name="fuel"]:checked')).map(cb => cb.value.toLowerCase());
  const transmissions = Array.from(document.querySelectorAll('input[name="transmission"]:checked')).map(cb => cb.value.toLowerCase());

  const doors = document.getElementById('doors').value;
  const color = document.getElementById('color').value.toLowerCase();
  const condition = document.getElementById('condition').value.toLowerCase();

  const fromIndex = sessionStorage.getItem("searchSaved") === "true";

  if (!fromIndex) {
    const searchData = {
      source: "carsforsale",
      make,
      doors,
      color,
      condition,
      fuel: fuelTypes,
      transmission: transmissions,
      minYear,
      maxYear,
      mileage: maxMileage,
      minPrice,
      maxPrice,
      timestamp: new Date().toISOString()
    };
    const saved = JSON.parse(localStorage.getItem("savedSearches")) || [];
    saved.push(searchData);
    localStorage.setItem("savedSearches", JSON.stringify(saved));

    const today = new Date().toISOString().split("T")[0];
    const usage = JSON.parse(localStorage.getItem("dailyFiltersUsed")) || {};
    usage[today] = (usage[today] || 0) + 1;
    localStorage.setItem("dailyFiltersUsed", JSON.stringify(usage));
  } else {
    sessionStorage.removeItem("searchSaved");
  }

  filteredCars = carsData.filter(car => {
    const carMake = (car.make || car.overview?.Make || "").toLowerCase();
    const carPrice = parseInt(car.price.replace(/[€,.]/g, '').trim());
    const carMileage = parseInt(car.mileage.replace(/[., km]/g, '').trim());
    const carYear = parseInt(car.year || car.overview?.Year || "2000");
    const carFuel = (car.fuel || car.overview?.["Fuel Type"] || "").toLowerCase();
    const carTransmission = (car.transmission || car.overview?.Transmission || "").toLowerCase();
    const carDoors = (car.doors || car.overview?.Doors || "").toLowerCase();
    const carColor = (car.color || car.overview?.Color || "").toLowerCase();
    const carCondition = (car.condition || car.overview?.Condition || "").toLowerCase();

    return (
      (!make || carMake === make) &&
      (!isNaN(carPrice) && carPrice >= minPrice && carPrice <= maxPrice) &&
      (!isNaN(carMileage) && carMileage <= maxMileage) &&
      (!isNaN(carYear) && carYear >= minYear && carYear <= maxYear) &&
      (fuelTypes.length === 0 || fuelTypes.includes(carFuel)) &&
      (transmissions.length === 0 || transmissions.includes(carTransmission)) &&
      (!doors || carDoors.includes(doors)) &&
      (!color || carColor === color) &&
      (!condition || carCondition === condition)
    );
  });

  currentPage = 1;
  renderPage(currentPage);
  renderPagination();
}

document.addEventListener("DOMContentLoaded", () => {
  loadCars();

  const filterBtn = document.querySelector('.filter-btn');
  if (filterBtn) {
    filterBtn.addEventListener("click", applyFilters);
  }
});

document.querySelector('.sort-dropdown').addEventListener('change', function () {
  const sortType = this.value;
  if (sortType === 'price-low') {
    filteredCars.sort((a, b) => parseInt(a.price.replace(/[€,.]/g, '')) - parseInt(b.price.replace(/[€,.]/g, '')));
  } else if (sortType === 'price-high') {
    filteredCars.sort((a, b) => parseInt(b.price.replace(/[€,.]/g, '')) - parseInt(a.price.replace(/[€,.]/g, '')));
  } else if (sortType === 'km') {
    filteredCars.sort((a, b) => parseInt(a.mileage.replace(/[., km]/g, '')) - parseInt(b.mileage.replace(/[., km]/g, '')));
  }

  currentPage = 1;
  renderPage(currentPage);
  renderPagination();
});

document.addEventListener("DOMContentLoaded", () => {
  loadCars().then(() => {
    const params = new URLSearchParams(window.location.search);
    const make = params.get("make");
    const model = params.get("model");
    const minPrice = params.get("minPrice");

    if (make || model || minPrice) {
      document.getElementById("make").value = make || "";
      if (minPrice) document.getElementById("range-min").value = minPrice;
      applyFilters();
    }
  });
});

function goToDetails(car) {
  let list = JSON.parse(localStorage.getItem("viewedCars")) || [];
  const already = list.some(c => c.title === car.title);
  if (!already) list.push(car);
  localStorage.setItem("viewedCars", JSON.stringify(list));
  window.location.href = `car-details.html?id=${car.id}`;
}
