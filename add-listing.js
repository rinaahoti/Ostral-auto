
// ✅ add-listing.js me ruajtje të imazhit si DataURL

document.addEventListener("DOMContentLoaded", () => {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");
  const nextButtons = document.querySelectorAll(".next-btn");
  const form = document.getElementById("addForm");
  const fileInput = document.getElementById("imageUpload");

  let uploadedImage = "";

  // Tabs
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((tab) => tab.classList.remove("active"));

      btn.classList.add("active");
      const targetTab = document.getElementById(`tab-${target}`);
      if (targetTab) targetTab.classList.add("active");
    });
  });

  nextButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const next = btn.getAttribute("data-next");
      const nextTabBtn = document.querySelector(`.tab-button[data-tab='${next}']`);
      if (nextTabBtn) nextTabBtn.click();
    });
  });

  // Read image as base64
  if (fileInput) {
    fileInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          uploadedImage = e.target.result; // base64
        };
        reader.readAsDataURL(file);
      }
    });
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const getVal = (placeholder) =>
      form.querySelector(`input[placeholder="${placeholder}"]`)?.value || "";

    const data = {
      title: getVal("Listing Title"),
      model: getVal("Model"),
      price: getVal("Price ($)"),
      year: getVal("Year"),
      transmission: getVal("Transmission"),
      image: uploadedImage || "", // kjo eshte image e ruajtur
    };

    const listings = JSON.parse(localStorage.getItem("listings")) || [];
    listings.push(data);
    localStorage.setItem("listings", JSON.stringify(listings));

    alert("Makina u ruajt me sukses!");
    window.location.href = "my-listings.html";
  });
});




  // Logout
  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "login.html";
    });
  }


