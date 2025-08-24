app.post("/track", async (req, res) => {
  try {
    const { sessionId, productId, action, userId } = req.body;

    // ✅ Always create a new session document for every visit
    const session = new UserSession({
      userId: userId || "guest",
      sessionId,
      userAgent: req.headers["user-agent"],
      ip: req.ip,
      actions: [
        {
          action: action || "visit_page",
          productId,
          timestamp: new Date(),
        },
      ],
      startedAt: new Date(),
      endedAt: new Date(),
    });

    await session.save();

    res.json({ message: "✅ New session created", session });
  } catch (err) {
    console.error("❌ Error tracking action:", err);
    res.status(500).json({ error: "Server error" });
  }
});
