// ✅ Always generate a NEW sessionId for each visit
const sessionId = crypto.randomUUID();

// ✅ Replace with your deployed backend URL
const BACKEND_URL = "https://soundwave-backend-391w.onrender.com";

// ✅ Function to log events
async function logEvent(action, productId = null) {
  try {
    await fetch(`${BACKEND_URL}/track`, {
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
    console.error("❌ Error logging event:", err);
  }
}

// ✅ Auto log page visits
document.addEventListener("DOMContentLoaded", () => {
  const page = window.location.pathname.split("/").pop() || "home";
  logEvent("visit_page", page);
});

// ✅ Example usage: log clicks on products
document.addEventListener("click", (e) => {
  if (e.target.matches("[data-product-id]")) {
    const productId = e.target.getAttribute("data-product-id");
    logEvent("click_product", productId);
  }
});
