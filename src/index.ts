import { Client } from "discord.js";
import dotenv from "dotenv";
dotenv.config();

const client = new Client({
    intents: []
});

client.once("ready", () => {
    console.log(`✅ Logged in as ${client.user?.tag}`);
});

client.login(process.env.TOKEN).catch((err: Error) => {
    console.error("❌ Failed to login:", err);
}); 