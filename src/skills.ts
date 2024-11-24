import axios from "axios";

export async function handleMessage(context: any) {
  const {
    message: { content, sender },
  } = context;

  const messageText = content.text || content;

  console.log("📨 Received message:", {
    content: messageText,
    sender: sender.address
  });

  try {
    console.log("🚀 Sending request to API...");
    const response = await axios.post('https://basedagent-server.up.railway.app/api/v1/chat', 
      {
        prompt: messageText,
        user: sender.address
      },
      {
        headers: {
          'X-API-KEY': `${process.env.API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log("✅ API Response:", response.data);
    return {
      code: 200,
      message: response.data
    };
  } catch (error: any) {
    console.error("❌ API Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    return {
      code: 500,
      message: "Failed to process message"
    };
  }
}

export const messageHandler = {
  handler: handleMessage
};
