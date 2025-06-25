# Replit-MinecraftBot

A Minecraft chatbot powered by [mineflayer](https://github.com/PrismarineJS/mineflayer) and [OpenAI](https://github.com/openai/openai-node). This bot can automatically log in/register, listen to player chat, and reply with context-aware AI responses.

## Features
- Auto login/register to Minecraft servers
- Listens to player chat and replies using OpenAI LLM
- Maintains chat context for intelligent conversations

## Installation
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/Replit-MinecraftBot.git
   cd Replit-MinecraftBot
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration
1. Set your OpenAI API Key in `index.js`:
   ```js
   const openai = new OpenAI({
     apiKey: "YOUR_OPENAI_API_KEY",
     // baseURL: "", // Optional: set your custom API base URL
   });
   ```
2. Configure your server info and bot name:
   ```js
   const bot = mineflayer.createBot({
     host: "server", // Server address
     port: 25565,     // Port
     username: "YourBotName", // Bot name
     version: "1.20.1",      // Minecraft version
   });
   ```
3. If you need to change the auto register/login commands, edit the `bot.on("login", ...)` section.

## Usage
1. Start the bot:
   ```bash
   node index.js
   ```
2. The bot will automatically register/login and reply to player messages in chat.

## Dependencies
- mineflayer ^4.29.0
- openai ^5.7.0

## License
This project is released into the public domain. You can use it for any purpose, commercial or non-commercial, without restriction.

