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
		if (message.member.hasPermission('ADMINISTRATOR')) {
			console.log('This user is admin');
		}
			
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

	// fuck this shit
	if (command === 'imout') {
		message.channel.send({embed: {
			image: {
				url: "https://i.makeagif.com/media/11-15-2015/rGySXS.gif"
			}
		}});
	}

	// deletes X number of messages given by user input
	if (command === 'delete') {
		// check for admin role
		if (message.member.hasPermission('ADMINISTRATOR')) {
			let numToDelete = parseInt(args[0], 10) + 1; // +1 to account for the command input
		
			async function clear() {
				let fetched = await message.channel.fetchMessages({limit:numToDelete});
				let fetched_messages = fetched.array();
				let toDelete = [];
				for (let i = 0; i < fetched_messages.length; i++) { // filters out messages that have attachments
					if (fetched_messages[i].attachments.size > 0) {
						// check the attachment url to whitelist images ending with jpg or png
						let attach = fetched_messages[i].attachments.array();
						let url = attach[0].url; // first element of attachments is a map that holds the url
						// console.log(attach[0].url);
						// console.log(url.endsWith('jpg'));
						if (!url.endsWith('jpg') && !url.endsWith('png')) {
							console.log('delete please');
							toDelete.push(fetched_messages[i]);
						}
						
					} else {
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
		else {
			message.reply("Sorry, you don't have permission to do that!");
		}


		
	}

	// deletes based on time [!deletime 10] deletes messages in the last 10 minutes
	if (command === 'deletetime') {
		
		if (message.member.hasPermission('ADMINISTRATOR')) {
				let minutes = parseInt(args[0],10) * 60 // minutes expressed in seconds
					async function clear() {
						let messages = await message.channel.fetchMessages({limit:100});
						let fetched_messages = messages.array()
						let TimeStamp = Math.floor(Date.now() / 1000)  //TimeStamp expressed in seconds
						// Date.now() returns the current timestamp expressed in milliseconds. 
						let filter = TimeStamp - minutes  //minimum threshold ?
						//console.log("Current Timestamp is " + TimeStamp)
						//console.log("current filter is "+ filter)
						let toDelete = []	
						for (let i = 0; i < fetched_messages.length; i++) {
							//console.log(Math.floor(fetched_messages[i].createdTimestamp/1000))
							if ((Math.floor(fetched_messages[i].createdTimestamp / 1000 ) > filter) && (!(fetched_messages[i].attachments.size > 0))) {
								toDelete.push(fetched_messages[i]) //the lesson here is put parenthesis [it matters]
								console.log(fetched_messages[i].content)
							}
							if (fetched_messages[i].attachments.size > 0) {
								let attach = fetched_messages[i].attachments.array()
								let url = attach[0].url
								if (!url.endsWith('jpg') && !url.endsWith('png')) {
									console.log('delete please');
									toDelete.push(fetched_messages[i]);
								}
							}
						}
						toDelete.forEach(message => message.delete())
					}
					if (Number.isInteger(minutes)) {
						clear();
						console.log(("messages were deleted in the last " + minutes + " seconds"))
					}
			}
		else {
			message.reply("@"+ message.author.username + " Sorry, You do not have permission to do that!")
		}
	}
});


client.login(auth.token);