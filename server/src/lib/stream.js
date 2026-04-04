// 🔥 DEV SAFE STREAM SETUP

let streamClient = null;
let chatClient = null;

export const getStreamClient = async () => {
  if (!process.env.STREAM_API_KEY || !process.env.STREAM_SECRET) {
    console.log("⚠️ Stream disabled (dev mode)");
    return null;
  }

  if (!streamClient) {
    try {
      const { StreamClient } = await import("@stream-io/node-sdk");

      streamClient = new StreamClient(
        process.env.STREAM_API_KEY,
        process.env.STREAM_SECRET
      );

      chatClient = streamClient; // same instance

      console.log("✅ Stream initialized");
    } catch (err) {
      console.error("❌ Stream init failed:", err.message);
      return null;
    }
  }

  return streamClient;
};

// ✅ EXPORTS FOR OLD CODE (IMPORTANT)
export { streamClient, chatClient };