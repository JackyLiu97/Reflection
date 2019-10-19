const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json');
const config = require('./config.json');

client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {

	if (message.author.bot) return;

	// splits user input into prefix, command name, args[]
	const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
	const command = args.shift().toLowerCase();

	if (command === 'ping') {
		message.channel.send('Pong!');
	}

	// testing command generates 10 messages
	if (command === 'test') {
		count = 0;
		while (count < 10) {
			message.channel.send('This is a test message');
			
			count++;
		}
	}

	// deletes X number of messages given by user input
	if (command === 'delete') {
		
		let numToDelete = parseInt(args[0], 10) + 1; // added one to account for the command input
		
		async function clear() {
			let fetched = await message.channel.fetchMessages({limit:numToDelete});
			let fetched_messages = fetched.array();
			let toDelete = [];
			for (let i = 0; i < fetched_messages.length; i++) { // filters out messages that have attachments
				if (!(fetched_messages[i].attachments.size > 0)) {
					toDelete.push(fetched_messages[i]);
				}
			}
			toDelete.forEach(message => message.delete())	
		}

		if (Number.isInteger(numToDelete)) {
			console.log((numToDelete - 1) + ' messages deleted!');
			clear();
		}
		
	}

	// deletes based on time // not done bot crashes when I run it lol
	if (command === 'deletetime') {
		let minutes = parseInt(args[0],10) * 60 // minutes expressed in seconds 
		async function clear() {
			let messages = await message.channel.fetchMessages({limit:100});
			let mess_arr = messages.array()
			let TimeStamp = Math.floor(Date.now() / 1000)  //TimeStamp expressed in seconds
			// Date.now() returns the current timestamp expressed in milliseconds. 
			let filter = TimeStamp - minutes  //minimum threshold ?
			//console.log("Current Timestamp is " + TimeStamp)
			//console.log("current filter is "+ filter)
			let filter_msg = []
			for (let i = 0; i < mess_arr.length;i++) {
				//console.log(Math.floor(mess_arr[i].createdTimestamp/1000))
				if (Math.floor(mess_arr[i].createdTimestamp / 1000 ) < filter && (!mess_arr[i].attachments.size >0)) {
					filter_msg.push(mess_arr[i])
				}
			}
			//console.log(filter_msg)
			filter_msg.forEach(msg => msg.delete())
		}

		if (Number.isInteger(minutes)) {
			clear();
			console.log((minutes + ' deleted'))
		}
	}
});


client.login(auth.token);