const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const config = require('./config.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
	
	if (message.content.startsWith(config.prefix + 'ping')) {
		message.channel.send('Pong!');
		console.log(config.prefix);
	}

if (message.content.startsWith(config.prefix + 'delete')) {
    message.delete(1000);
	message.reply('Deleting messages!').then(deleted_msg => {deleted_msg.delete(1000); });
    
}
});


client.login(auth.token);