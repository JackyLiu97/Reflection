const fs = require("fs");
const Discord = require("discord.js");
const client = new Discord.Client();
client.commands = new Discord.Collection();
const auth = require("./auth.json");
const config = require("./config.json");
const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("message", async (message) => {
  if (message.author.bot) return;

  // splits user input into prefix, command name, args[]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();

  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      (cmd) => cmd.aliases && cmd.aliases.includes(commandName)
    );

  try {
    if (message.content.toLowerCase("OwO").startsWith("owo")) {
      message.channel.send("owo");
    }
    if (message.content.toLowerCase("UwU").startsWith("uwu")) {
      message.channel.send("uwu");
    }
    if (commandName === "delete") {
      command.execute(message, args);
    }
    if (commandName === "test") {
      command.execute(message, args);
    }
    if (commandName === 'ping') {
      command.execute(client,message, args);
    }
  } catch (error) {
    console.log(error);
  }
});

client.login(auth.token);
