const Discord = require("discord.js");
const colors = require("colors");
const Enmap = require("enmap");
const fs = require("fs");
const Emoji = require("./botconfig/emojis.json")
const config = require("./botconfig/config.json")
const express = require('express');

const app = express();
const port = 3000 || 5000 
app.get('/', (req, res) => {
  res.send('Server Connected...')
});

app.listen(port, () => {
  const stringlength = 69;
  console.log("\n")
  console.log(`     ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓`.bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + `Server Running at https://localhost/${port}` .bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - `Discord Bot is online!`.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + ` /--/ ${client.user.tag} /--/ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length - ` /--/ ${client.user.tag} /--/ `.length) + "┃".bold.brightGreen)
  console.log(`     ┃ `.bold.brightGreen + " ".repeat(-1 + stringlength - ` ┃ `.length) + "┃".bold.brightGreen)
  console.log(`     ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛`.bold.brightGreen)
});


const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  shards: "auto",
  disableEveryone: true,
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  presence: {
    afk: false,
    status : "dnd",
    activity: {
      name: `${config.prefix}help || Tech Boy Gaming`,
      type: 'LISTENING',
    },
  }
});

client.commands = new  Discord.Collection();
client.aliases = new  Discord.Collection();
client.events = new Discord.Collection();
client.cooldowns = new Discord.Collection();
client.categories = fs.readdirSync("./commands/");

client.setMaxListeners(50);
require('events').defaultMaxListeners = 50;

client.adenabled = true;


//Loading discord-buttons
const dbs = require('discord-buttons');
dbs(client);

function requirehandlers() {
  client.basicshandlers = Array(
    "extraevents", "loaddb", "command", "events", "erelahandler"
  );
  client.basicshandlers.forEach(handler => {
    try { require(`./handlers/${handler}`)(client); } catch (e) { console.log(e) }
  });
} requirehandlers();




client.login(require('./botconfig/config.json').token);

module.exports.requirehandlers = requirehandlers;
