const token = process.env.DISCORD_TOKEN;
//npm install discord.js

const { ask } = require("./ai.js"); //import ask function from ai.js
const { Client, Events, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]});

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

//add these to answer messages that contain an exclamation mark
client.on("message", async(message) => {
    if (message.content.substring(0,1) === "!") {
        const prompt = message.content.substring(1); //remove the exclamation mark
        const answer = "heads \n\
        flipped by the fairest coin flip in the world";
        console.log(answer);
        message.channel.send(answer);
        return;
    } else {
        const prompt = message;
        const answer = await ask(prompt);
        message.channel.send(answer);
    }
})
client.login(token);
