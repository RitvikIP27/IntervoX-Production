import { getStreamClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const chatClient = await getStreamClient();

    // 🔴 DEV MODE → stream disabled
    if (!chatClient) {
      return res.status(200).json({
        token: "dev-token",
        userId: "dev-user",
        userName: "Dev User",
        userImage: ""
      });
    }

    // 🟢 PRODUCTION → real token
    const token = chatClient.createToken(req.user.clerkId);

    res.status(200).json({
      token,
      userId: req.user.clerkId,
      userName: req.user.firstName || "",
      userImage: req.user.image
    });

  } catch (error) {
    console.log("❌ Error generating stream token", error);

    res.status(500).json({
      msg: "error generating stream token",
      error: error.message
    });
  }
}