// ✅ Assign Session ID if not exists
if (!localStorage.getItem("sessionId")) {
  localStorage.setItem("sessionId", crypto.randomUUID());
}
const sessionId = localStorage.getItem("sessionId");

// ✅ Backend URL (update with your deployed backend)
const BACKEND_URL = "https://soundwave-backend-391w.onrender.com";

// ✅ Log Event (only visit_page)
async function logPageVisit(pageName) {
  try {
    await fetch(`${BACKEND_URL}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId") || "guest",
        sessionId,
        action: "visit_page",
        productId: pageName,
      }),
    });
  } catch (err) {
    console.error("❌ Error logging page visit:", err);
  }
}

// ✅ Auto log page visits
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop() || "home";
  logPageVisit(page);
});
