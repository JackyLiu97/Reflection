module.exports = {
    name: 'test',
    description: 'test command',
	execute(message, args) {
        count = 0
        while (count < 5 ) {
        message.channel.send('Killer Queen has already touched the doorknob.');
        count++;
        }
	}
};