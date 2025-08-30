// ✅ Session ID stored in browser (same across multiple page visits in one session)
if (!localStorage.getItem("sessionId")) {
  localStorage.setItem("sessionId", crypto.randomUUID());
}
const sessionId = localStorage.getItem("sessionId");

// ✅ Get logged-in userId (username) or fallback to "guest"
const userId = localStorage.getItem("userId") || "guest";

// ✅ Change this to your deployed backend URL
const BACKEND_URL = "https://soundwave-backend-391w.onrender.com";

// ✅ Log Event
async function logEvent(action, productId = null) {
  try {
    await fetch(`${BACKEND_URL}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
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

  // Track clicks on links
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      logEvent("click_link", link.href);
    });
  });
});
