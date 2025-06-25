const mineflayer = require("mineflayer");
const { OpenAI } = require("openai");

const openai = new OpenAI({
  apiKey: "",  // Set your key here
  // baseURL: "", // Set your base URL here
});

const bot = mineflayer.createBot({
  host: "server",
  port: 25565,
  username: "YourBotName",
  version: "1.20.1",
});

let chatHistory = [];

bot.on("login", () => {
  console.log("Logged in");
  bot.chat("/reg test114514 test114514");
  bot.chat("/login test114514");
});

bot.on("message", async (jsonMsg) => {
  const text = jsonMsg.toString();
  const match = text.match(/^<(.+?)> (.+)$/);
  if (match) {
    const username = match[1];
    const message = match[2];
    if (username === bot.username) return;

    // Add the user's message to the chat history
    chatHistory.push({
      role: "user",
      content:
        "[PlayerName: " +
        username +
        ", AssistantName: " +
        bot.username +
        "]" +
        message,
    });

    // Keep the chat history limited to a certain number of messages (e.g., 10)
    if (chatHistory.length > 10) {
      chatHistory.shift(); // Remove the oldest message
    }

    try {
      const response = await openai.chat.completions.create({
        model: "gemini-2.5-flash-preview-05-20",
        messages: [
          {
            role: "system",
            content:
              "You are a helpful Minecraft chat bot. Maintain context from previous messages. Your responses should be in plain text, without markdown formatting.",
          },
          ...chatHistory, // Include the chat history
        ],
      });

      const botResponse = response.choices[0].message.content.trim();
      bot.chat(botResponse);

      // Add the bot's response to the chat history
      chatHistory.push({ role: "assistant", content: botResponse });
      if (chatHistory.length > 10) {
        chatHistory.shift();
      }
    } catch (error) {
      console.error("OpenAI API error:", error);
    }
  }
});
