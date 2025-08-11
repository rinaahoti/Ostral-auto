// my-profile.js - funksionalitet i plotë me ruajtje të avatarit & rikthim direkt pa reload

document.addEventListener("DOMContentLoaded", () => {
  const editButtons = document.querySelectorAll(".edit-btn");
  const avatarImg = document.getElementById("avatarImage");
  const avatarInput = document.getElementById("avatarInput");

  // Fshi inputin në fillim
  if (avatarInput) avatarInput.style.display = "none";

  // Ngarko avatarin nëse është ruajtur më herët
  const savedAvatar = localStorage.getItem("profileAvatar");
  if (savedAvatar) avatarImg.src = savedAvatar;

  // Ngarko të dhënat nëse ekzistojnë
  const savedProfile = JSON.parse(localStorage.getItem("profileData"));
  if (savedProfile) {
    const allPs = document.querySelectorAll(".info-grid p, .profile-meta p, .profile-meta h2");
    allPs.forEach((p, i) => {
      if (savedProfile[i]) p.textContent = savedProfile[i];
    });
  }

  // Event për ngarkimin e fotos
  if (avatarInput) {
    avatarInput.addEventListener("change", function () {
      const file = this.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          avatarImg.src = e.target.result;
          localStorage.setItem("profileAvatar", e.target.result);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  // Klikimi në Edit
  editButtons.forEach(button => {
    button.addEventListener("click", () => {
      const parent = button.closest(".profile-box") || button.closest(".info-box");

      // Shfaq inputin për foto vetëm për pjesën e sipërme
      if (parent.classList.contains("profile-box") && avatarInput) {
        avatarInput.style.display = "inline-block";
      }

      const metaFields = parent.querySelectorAll(".profile-meta p, .profile-meta h2");
      metaFields.forEach((el) => {
        const currentValue = el.textContent;
        const input = document.createElement("input");
        input.value = currentValue;
        input.style.width = "100%";
        input.style.padding = "8px";
        input.style.borderRadius = "6px";
        input.style.border = "1px solid #ccc";
        el.replaceWith(input);
      });

      const values = parent.querySelectorAll(".info-grid p");
      values.forEach((p) => {
        const currentValue = p.textContent;
        const input = document.createElement("input");
        input.value = currentValue;
        input.style.width = "100%";
        input.style.padding = "8px";
        input.style.borderRadius = "6px";
        input.style.border = "1px solid #ccc";
        p.replaceWith(input);
      });

      button.textContent = "Save Changes";
      button.classList.add("save-mode");
      button.addEventListener("click", saveChanges, { once: true });
    });
  });

  // SAVE & rikthim dizajni
  function saveChanges(e) {
    const btn = e.target;
    const parent = btn.closest(".profile-box") || btn.closest(".info-box");
    const inputs = parent.querySelectorAll("input");
    const newData = [];

    inputs.forEach(input => {
      const p = document.createElement("p");
      p.textContent = input.value;
      newData.push(input.value);
      input.replaceWith(p);
    });

    const allPs = document.querySelectorAll(".info-grid p, .profile-meta p, .profile-meta h2");
    const updated = [];
    allPs.forEach((p, i) => {
      updated[i] = p.textContent;
    });
    localStorage.setItem("profileData", JSON.stringify(updated));

    // Rifresko avatarin direkt
    const latestAvatar = localStorage.getItem("profileAvatar");
    if (latestAvatar) {
      avatarImg.src = latestAvatar;
    }

    // Fshij inputin e fotos
    if (avatarInput) avatarInput.style.display = "none";

    btn.textContent = "Edit ✏️";
    btn.classList.remove("save-mode");
  }
});
