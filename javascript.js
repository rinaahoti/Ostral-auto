// Funksion për aktivizim të vetëm një elementi në grup
function activateOnlyOne(selector, activeClass = 'active') {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    el.addEventListener('click', () => {
      elements.forEach(e => e.classList.remove(activeClass));
      el.classList.add(activeClass);
    });
  });
}

activateOnlyOne('.nav-menu li');
activateOnlyOne('.nav-right i, .nav-right span');
activateOnlyOne('.second-nav li');
activateOnlyOne('.second-right i');
activateOnlyOne('.side-menu li');
activateOnlyOne('.blog-logos img');
activateOnlyOne('.social-icons i');
activateOnlyOne('.blog-card', 'active');
activateOnlyOne('.blog-logos img');

// Aktivizimi i kartave të blogut
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.blog-card');
  const dots = document.querySelectorAll('.slide-dot');

  cards.forEach((card, index) => {
    card.addEventListener('click', () => {
      cards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      dots.forEach(dot => dot.classList.remove('active'));
      if (dots[index]) {
        dots[index].classList.add('active');
      }
    });
  });
});

// Menu scroll
function setupMenuScroll(menuSelector, activeClass = 'active') {
  const items = document.querySelectorAll(`${menuSelector} li[data-target]`);
  items.forEach(item => {
    item.addEventListener('click', () => {
      const targetId = item.getAttribute('data-target');
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }

      items.forEach(i => i.classList.remove(activeClass));
      item.classList.add(activeClass);
    });
  });
}

setupMenuScroll('.nav-menu');
setupMenuScroll('.side-menu');

// Aside menu me shigjeta dhe tast
document.addEventListener('DOMContentLoaded', () => {
  const sideMenuItems = Array.from(document.querySelectorAll('.side-menu li[data-target]'));
  const arrowUp = document.querySelector('.side-menu li i.fa-angle-up')?.parentElement;
  const arrowDown = document.querySelector('.side-menu li i.fa-angle-down')?.parentElement;

  function activateItemVisual(index) {
    if (index < 0) index = sideMenuItems.length - 1;
    if (index >= sideMenuItems.length) index = 0;

    sideMenuItems.forEach(item => item.classList.remove('active'));
    sideMenuItems[index].classList.add('active');

    return index;
  }

  function activateItemAndScroll(index) {
    if (index < 0) index = sideMenuItems.length - 1;
    if (index >= sideMenuItems.length) index = 0;

    sideMenuItems.forEach(item => item.classList.remove('active'));
    sideMenuItems[index].classList.add('active');

    const targetId = sideMenuItems[index].getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
    return index;
  }

  let activeIndex = sideMenuItems.findIndex(item => item.classList.contains('active'));
  if (activeIndex === -1) activeIndex = 0;
  if (sideMenuItems.length > 0) activateItemVisual(activeIndex);

  sideMenuItems.forEach((item, i) => {
    item.addEventListener('click', () => {
      activeIndex = activateItemAndScroll(i);
    });
  });

  if (arrowUp) {
    arrowUp.addEventListener('click', () => {
      activeIndex--;
      activeIndex = activateItemVisual(activeIndex);
    });
  }

  if (arrowDown) {
    arrowDown.addEventListener('click', () => {
      activeIndex++;
      activeIndex = activateItemVisual(activeIndex);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
      e.preventDefault();
      if (e.key === 'ArrowUp') {
        activeIndex--;
        activeIndex = activateItemVisual(activeIndex);
      } else if (e.key === 'ArrowDown') {
        activeIndex++;
        activeIndex = activateItemVisual(activeIndex);
      }
    }
  });
});



// SEARCH BTN në index.html (tash me make të rikthyer)
document.addEventListener("DOMContentLoaded", () => {
  const searchBtn = document.getElementById("search-btn");
  if (!searchBtn) return;

  searchBtn.addEventListener("click", () => {
    const make = document.getElementById("search-make")?.value;
    const year = document.getElementById("search-year")?.value;
    const price = document.getElementById("search-price")?.value;

    const params = new URLSearchParams();
    if (make) params.append("make", make);
    if (year) params.append("year", year);
    if (price) params.append("minPrice", price);

    window.location.href = `carsforsale.html?${params.toString()}`;
  });
});

// Vitet – vetëm 3 në HTML, të tjerat i shton JS automatikisht
document.addEventListener("DOMContentLoaded", () => {
  const yearSelect = document.getElementById("search-year");
  if (!yearSelect) return;

  const existingYears = Array.from(yearSelect.options).map(opt => opt.value);
  const currentYear = new Date().getFullYear();
  const minYear = 2000;

  for (let year = currentYear - 1; year >= minYear; year--) {
    if (!existingYears.includes(year.toString())) {
      const option = document.createElement("option");
      option.value = year;
      option.textContent = year;
      yearSelect.appendChild(option);
    }
  }
});



//per zoom
  let currentZoom = 0.8;

  function changeZoom(step) {
    currentZoom += step;
    if (currentZoom < 0.5) currentZoom = 0.5;
    if (currentZoom > 1.5) currentZoom = 1.5;
    document.documentElement.style.zoom = currentZoom;
  }


