const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const config = require('./config.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {

	if (message.author.bot) return;

	// splits command into prefix, command name, args[]
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Pong!');
	}

	if (command === 'test') {
		count = 0;
		while (count < 10) {
			message.channel.send('This is a test message');
			
			count++;
		}
	}

	// deletes X number of messages

	if (command === 'delete') {
		
		let numToDelete = parseInt(args[0], 10) + 1;
		
		async function clear() {
			let fetched = await message.channel.fetchMessages({limit:numToDelete});
			message.channel.bulkDelete(fetched);	
		}

		if (Number.isInteger(numToDelete)) {
			console.log((numToDelete - 1) + ' messages deleted!');
			clear();
		}
		
	}
});


client.login(auth.token);