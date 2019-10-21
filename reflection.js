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
			let fetched = await message.channel.fetchMessages({limit:numToDelete}); // this is a collection , map
			let fetched_messages = fetched.array()
			let toDelete = []
			for (let i = 0; i < fetched_messages.length; i++) {
				console.log(fetch_messages[i].attachments + 'has attachments!')
				if (fetched_messages[i].attachments.size <= 0 ) { // if the message doesnt have any attachments
					toDelete.push(fetched_messages[i])
				}
				else {
					if (fetched_messages[i].attachments.size > 0 ) {
						let url = fetched_messages[i].attachments.url
						let format_check = url.indexOf("png", url.length - "png".length) || url.indexOf("jpg", url.length - "jpg".length)
						if (format_check == -1 || typeof(format_check) === 'Undefined') {
						toDelete.push(fetch_messages[i])
							}
				}	
			}	
		}
		toDelete.forEach(message => message.delete())
	}

			/* 
			msg_arr.filter(msg => !msg.attachments.size > 0) //filters out all the messages that has no images
			for (let i = 0; i < msg_arr.length; i++) {
				if (msg_arr[i].attachments.message) { // we know the array contains an image, but check if it contains a message
					let url = msg_arr[i].attachments.url
					let url_bool = url.indexOf("png", url.length - "png".length) || url.indexOf("jpg", url.length - "jpg".length)
					if (url_bool != -1 ) {
						img_arr.push(url)
					}
				}	
			}
			*/	
			/*
			if (message.channel.attachments.message) {
				let url = message.channel.attachments.url
				console.log("Hello world")
			}
			message.channel.bulkDelete(fetched);	
		}
		*/
		if (Number.isInteger(numToDelete)) {
			console.log((numToDelete - 1) + ' messages deleted!');
			clear();
		}
		
	}

	// deletes based on time 
	if (command === 'deletetime') {
		let minutes = parseInt(args[0],10) * 60 // minutes expressed in seconds 
		async function clear() {
			let messages = await message.channel.fetchMessages({limit:100});
			let mess_arr = messages.array()
			let TimeStamp = Math.floor(Date.now() / 1000)  //TimeStamp expressed in seconds
			// Date.now() returns the current timestamp expressed in milliseconds. 
			let filter = TimeStamp - minutes  //minimum threshold ?
			console.log("Current Timestamp is " + TimeStamp)
			console.log("current filter is "+ filter)
			let toDelete = []	
			for (let i = 0; i < fetched_messages.length; i++) {
				console.log(Math.floor(fetched_messages[i].createdTimestamp/1000))
				if ((Math.floor(fetched_messages[i].createdTimestamp / 1000 ) > filter) && (!(fetched_messages[i].attachments.size > 0))) {
					toDelete.push(fetched_messages[i]) 
					console.log(fetched_messages[i].content)
				}
				if (fetched_messages[i].attachments.size > 0) {
					let attach = fetched_messages[i].attachments.array()
					let url = attach[0].url
					/* don't understand the logic for !url.endsWith('jpg') && !url.endsWith('png') 
					shouldn't be it || instead of && ? */
					if (!url.endsWith('jpg') && !url.endsWith('png')) {
						console.log('delete please');
						toDelete.push(fetched_messages[i]);
					}
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