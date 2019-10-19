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