import { Client } from "discord.js";
import(dotenv).then(d => {
    d.config();
});

const client = new Client({
    intents: []
});

client.once("ready", () => {
    console.log(`✅Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN).catch(err => {
    console.error("❌Failed to login:", err);
});