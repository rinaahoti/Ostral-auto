document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const uid = params.get("uid");
  if (!uid) return;

  let all = JSON.parse(localStorage.getItem("chatMessages")) || {};
  let msgs = all[uid] || [];

  const msgContainer = document.getElementById("clientMessages");
  const input = document.getElementById("clientMessageInput");
  const sendBtn = document.getElementById("clientSendBtn");

  function render() {
    msgContainer.innerHTML = "";
    msgs.forEach(m => {
      const div = document.createElement("div");
      div.className = `message ${m.from === "me" ? "from-me" : "from-me"}`;
      div.textContent = m.text;
      msgContainer.appendChild(div);
    });
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function send() {
    const text = input.value.trim();
    if (!text) return;
    
    // prej klienti → gjithmo prej anes  djathtë
    msgs.push({ from: "me", text, time: Date.now() });
    
    all[uid] = msgs;
    localStorage.setItem("chatMessages", JSON.stringify(all));
    input.value = "";
    render();
  }

  sendBtn.addEventListener("click", send);
  input.addEventListener("keydown", e => { if (e.key === "Enter") send(); });

  render();
});
