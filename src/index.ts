import { Client, Message } from "revolt.js";
import { parseArguments } from "./argparse/argparse";
import { Command, CommandRegistry } from "./argparse/commandparse";
import * as fs from 'fs';

let client = new Client();
const commandRegistry = new CommandRegistry();

console.log("Revolt bot is starting up...");

client.on("ready", async () => {
  console.info(`Logged in as ${client.user?.username}!`);
  commandRegistry.registerCommand(new Command("about", "", "", about));
});

async function about(message: Message, params: Array<string>) {
  await message.reply(
    "revoltTestBot 1.0\nWritten by mldchan\nhttps://estrogen.productions/mldchan"
  );
  return true;
}

client.on("message", async (message) => {
  await commandRegistry.processCommands(message);
});

client.loginBot(JSON.parse(fs.readFileSync("config.json").toString()).token);
