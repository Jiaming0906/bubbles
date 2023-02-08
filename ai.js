//create a discord bot
require('dotenv').config();

// things to do on discord.com/developers/applications
// 1. create an application
// 2. avatar
// 3. bot, then add bot
// 4. reset token, add token to .env
// 5. message content intent turn on 
// 6. OAuth2, custom URL
// https://discord.com/oauth2/authorize?scope=bot&permissions=8&client_id=YOUR_CLIENT_ID

const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration ({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
})

const openai = new OpenAIApi(configuration);

async function ask(message) {
    client.on('messageCreate', async function(message) {
        try {
            // dont reply to yourself or other bots
            if(message.author.bot) return;

            const gptResponse = await openai.createCompletion({
                model: "text-davinci-003",
                prompt:`ChatGPT is a very intelligent, helpful, creative, and friendly chatbot.\n\
                ChatGPT: Hello, how are you?\n\
                ${message.author.username}: ${message.content}\n\
                ChatGPT:`,
                temperature:0.9,
                max_tokens: 100,
                //stop: ["Human:", "AI:"],
                //echo: true,
            })
            //message.reply(`${gptResponse.data.choices[0].text}`);
            const answer = gptResponse.data.choices[0].text;
            console.log(answer);
            return;
        } catch(err){
            console.log(err)
        }
    });
};

// async function ask(prompt) {
//     const response = await openai.createCompletion ({
//         model: "text-davinci-003",
//         prompt:`ChatGPT is a very intelligent, helpful, creative, and friendly chatbot.\n\
//         ChatGPT: Hello, how are you?\n\
//         ${prompt.author.username}: ${prompt.content}\n\
//         ChatGPT:`,
//         temperature:0.9,
//         max_tokens: 100,
//         //stop: ["Human:", "AI:"],
//         //echo: true,
//     });
//     const answer = response.data.choices[0].text;
//     return answer;
// }

module.exports = {
    ask,
}

