// ✅ Session ID stored in browser
if (!localStorage.getItem("sessionId")) {
  localStorage.setItem("sessionId", crypto.randomUUID());
}
const sessionId = localStorage.getItem("sessionId");

const BACKEND_URL = "http://localhost:5000"; // later replace with Railway URL

// ✅ Log Event
async function logEvent(action, productId = null) {
  try {
    await fetch(`${BACKEND_URL}/log`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId") || "guest",
        sessionId,
        action,
        productId
      }),
    });
  } catch (err) {
    console.error("Error logging event:", err);
  }
}

// ✅ Auto log page visits
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop() || "home";
  logEvent("visit_page", page);
});
