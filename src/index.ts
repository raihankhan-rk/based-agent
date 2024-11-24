import { run, XMTPContext, Agent } from "@xmtp/message-kit";
import { messageHandler } from "./skills.js";

// Define the agent with required properties
const agent: Agent = {
  name: "Based Agent",
  tag: "@based",
  description: "A simple message processing agent",
  skills: [{
    skill: "*",
    handler: messageHandler.handler,
    description: "Handles all messages",
    examples: ["Any message"],
    params: {}
  }]
};

run(async (context: XMTPContext) => {
  try {
    const response = await messageHandler.handler(context);
    if (response?.message?.response) {
      await context.reply(response.message.response);
    }
  } catch (error) {
    console.error("Error processing message:", error);
    await context.reply("Sorry, there was an error processing your message.");
  }
}, { agent });