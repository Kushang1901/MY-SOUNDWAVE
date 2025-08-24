// ✅ Create sessionId once per visit (using sessionStorage so it resets when tab/browser is closed)
if (!sessionStorage.getItem("sessionId")) {
  sessionStorage.setItem("sessionId", crypto.randomUUID());
}
const sessionId = sessionStorage.getItem("sessionId");

// ✅ Your backend URL
const BACKEND_URL = "https://soundwave-backend-391w.onrender.com"; 

// ✅ Function to log events to backend
async function logEvent(action, productId = null) {
  try {
    await fetch(`${BACKEND_URL}/track`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: localStorage.getItem("userId") || "guest", // if logged in user, replace this with real ID
        sessionId,
        action,
        productId,
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

// ✅ (Optional) Track clicks on buttons/links
document.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    logEvent("click_button", e.target.innerText);
  }
  if (e.target.tagName === "A") {
    logEvent("click_link", e.target.href);
  }
});
