document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("contactPopup");
  const closeBtn = document.querySelector(".close-popup");
  const messageBtn = document.querySelector(".dealer-box .btn-main"); 
  const form = document.getElementById("contactForm");

  if (messageBtn) {
    messageBtn.addEventListener("click", (e) => {
      e.preventDefault();
      popup.style.display = "flex";
    });
  }

  const closePopup = () => popup.style.display = "none";
  if (closeBtn) closeBtn.addEventListener("click", closePopup);
  window.addEventListener("click", (e) => { if (e.target === popup) closePopup(); });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstName = document.getElementById("firstName").value.trim();
    const lastName  = document.getElementById("lastName").value.trim();
    const phone     = document.getElementById("phone").value.trim();
    const text      = document.getElementById("messageText").value.trim();
    if (!firstName || !lastName || !phone || !text) return;

    // Ruaj në strukturën e dashboard/messages.js
    const users = JSON.parse(localStorage.getItem("chatUsers")) || [];
    const all   = JSON.parse(localStorage.getItem("chatMessages")) || {};
    const read  = JSON.parse(localStorage.getItem("chatReadMessages")) || {};

    const uid = Date.now();
    users.push({ id: uid, name: `${firstName} ${lastName}`, phone });
    localStorage.setItem("chatUsers", JSON.stringify(users));

    all[uid] = all[uid] || [];
    all[uid].push({ from: "me", text, time: Date.now() });
    localStorage.setItem("chatMessages", JSON.stringify(all));

    read[uid] = 0;
    localStorage.setItem("chatReadMessages", JSON.stringify(read));

    popup.style.display = "none";

    // Hap client-chat.html për këtë user
    window.location.href = `client-chat.html?uid=${uid}`;
  });
});
