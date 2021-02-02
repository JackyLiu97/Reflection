const Discord = require("discord.js");

module.exports = {
  name: "pic",
  description: "Gets the avatar image of the discord user",
  execute(client, message, args) {
    const userID = message.mentions.users.first().id;
    client.users
      .fetch(userID)
      .then((user) => {
        const embed = new Discord.MessageEmbed().setColor([0, 0, 255]).setImage(
          user.displayAvatarURL({
            format: "png",
            dynamic: true,
            size: 2048,
          })
        ).setFooter(`${new Date().toLocaleString()}\n 
          Bot created by Puppet#1686.`);
        message.channel.send(embed);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
