document.addEventListener("DOMContentLoaded", () => {
  const defaultUsers = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Sarah Lee" },
    { id: 3, name: "Michael Smith" }
  ];

  const chatList = document.getElementById("chatList");
  const chatHeader = document.getElementById("chatHeader");
  const chatMessages = document.getElementById("chatMessages");
  const messageInput = document.getElementById("messageInput");
  const sendBtn = document.getElementById("sendBtn");

  const typingDiv = document.createElement("div");
  typingDiv.id = "typing-indicator";
  typingDiv.className = "typing-indicator";
  typingDiv.textContent = "Typing...";
  let typingTimeout = null;

  let activeUserId = null;

  function timeAgo(timestamp) {
    const now = new Date();
    const seconds = Math.floor((now - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (seconds < 60) return "just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;

    return new Date(timestamp).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric'
    });
  }

  function getDateLabel(timestamp) {
    const today = new Date();
    const date = new Date(timestamp);
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (today.toDateString() === date.toDateString()) return "Today";
    if (yesterday.toDateString() === date.toDateString()) return "Yesterday";

    return date.toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'short', day: 'numeric'
    });
  }

  function getUsers() {
    return JSON.parse(localStorage.getItem("chatUsers")) || defaultUsers;
  }

  function saveUsers(users) {
    localStorage.setItem("chatUsers", JSON.stringify(users));
  }

  function renderChatList() {
    const users = getUsers();
    const allMessages = JSON.parse(localStorage.getItem("chatMessages")) || {};
    const readMap = JSON.parse(localStorage.getItem("chatReadMessages")) || {};

    chatList.innerHTML = "";

    users.forEach(user => {
      const div = document.createElement("div");
      div.className = "chat-user";

      const userMessages = allMessages[user.id] || [];
      const readCount = readMap[user.id] || 0;
      const unreadCount = Math.max(0, userMessages.length - readCount);
      const lastMsg = userMessages[userMessages.length - 1];
      const lastTime = lastMsg ? timeAgo(lastMsg.time) : "";

      div.innerHTML = `
        <div class="user-row">
          <div>
            <div class="user-name">${user.name}</div>
            <div class="user-role">${lastTime}</div>
          </div>
          ${unreadCount > 0 ? `<div class="unread-badge">${unreadCount}</div>` : ""}
        </div>
      `;
      div.addEventListener("click", () => selectUser(user));
      chatList.appendChild(div);
    });
  }

  function selectUser(user) {
    activeUserId = user.id;
    chatHeader.textContent = user.name;

    document.querySelectorAll(".chat-user").forEach(u => u.classList.remove("active"));
    const clicked = Array.from(chatList.children).find(u => u.textContent.includes(user.name));
    if (clicked) clicked.classList.add("active");

    const allMessages = JSON.parse(localStorage.getItem("chatMessages")) || {};
    const msgs = allMessages[activeUserId] || [];
    const readMap = JSON.parse(localStorage.getItem("chatReadMessages")) || {};
    readMap[activeUserId] = msgs.length;
    localStorage.setItem("chatReadMessages", JSON.stringify(readMap));

    loadMessages();
    renderChatList();
  }

  function loadMessages() {
    const allMessages = JSON.parse(localStorage.getItem("chatMessages")) || {};
    const msgs = (allMessages[activeUserId] || []).sort((a, b) => a.time - b.time);
    const userName = getUsers().find(u => u.id === activeUserId)?.name || "User";

    chatMessages.innerHTML = "";
    let lastDate = "";

    msgs.forEach(m => {
      const currentDate = getDateLabel(m.time);
      if (currentDate !== lastDate) {
        const label = document.createElement("div");
        label.className = "message-date-label";
        label.textContent = currentDate;
        chatMessages.appendChild(label);
        lastDate = currentDate;
      }

      const bubble = document.createElement("div");
      bubble.className = `message-bubble ${m.from === "me" ? "message-right" : "message-left"}`;
      bubble.innerHTML = `
        ${m.from !== "me" ? `<div class="message-sender-name">${userName}</div>` : ""}
        <div>${m.text}</div>
        <div class="message-time">${timeAgo(m.time)}</div>
      `;
      chatMessages.appendChild(bubble);
    });

    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function sendMessage() {
    if (!messageInput.value.trim() || !activeUserId) return;

    const allMessages = JSON.parse(localStorage.getItem("chatMessages")) || {};
    const msgs = allMessages[activeUserId] || [];
    const timestamp = Date.now();

    msgs.push({ from: "me", text: messageInput.value.trim(), time: timestamp });
    allMessages[activeUserId] = msgs;
    localStorage.setItem("chatMessages", JSON.stringify(allMessages));

    const readMap = JSON.parse(localStorage.getItem("chatReadMessages")) || {};
    readMap[activeUserId] = msgs.length;
    localStorage.setItem("chatReadMessages", JSON.stringify(readMap));

    messageInput.value = "";
    loadMessages();
    renderChatList();
  }

  sendBtn.addEventListener("click", sendMessage);
  messageInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // ✅ TYPING (simulimi vetem per klienta jo per mu "them")
  function simulateTyping(userId) {
    if (userId === activeUserId) {
      if (!document.getElementById("typing-indicator")) {
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }

      clearTimeout(typingTimeout);
      typingTimeout = setTimeout(() => {
        if (typingDiv.parentNode) typingDiv.remove();
      }, 3000);
    }
  }

  // Butoni per me testu
  const testBtn = document.getElementById("testUnreadBtn");
  if (testBtn) {
    testBtn.addEventListener("click", () => {
      const allMessages = JSON.parse(localStorage.getItem("chatMessages")) || {};
      const now = Date.now();

      getUsers().forEach(u => {
        if (u.id !== activeUserId) {
          const msgs = allMessages[u.id] || [];
          for (let i = 0; i < 3; i++) {
            msgs.push({ from: "them", text: `Typing test ${i + 1}`, time: now + i * 1000 });
            simulateTyping(u.id);
          }
          allMessages[u.id] = msgs;
        }
      });

      localStorage.setItem("chatMessages", JSON.stringify(allMessages));
      renderChatList();
      alert("✅ 3 mesazhe dhe typing për testim.");
    });
  }

  const logoutBtn = document.getElementById("logout");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      window.location.href = "login.html";
    });
  }

  renderChatList();
});
