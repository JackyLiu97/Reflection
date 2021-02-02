const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  description: "List all of my commands and their usage.",
  execute(message) {
    const embed = new MessageEmbed()
      .setColor("#FBD160")
      .setTitle("Help command")
      // Line break { name: "\u200B", value: "\u200B" },
      .setDescription("Here are all the commands")
      .addFields(
        {
          name: "`!pic` @{mention}>",
          value: "This will grab the user's avatar",
        },
        { name: "`!test`", value: "memes" },
        { name: "`!delete <number>`", value: "delete x <number> of messages" },
        {
          name: "owo",
          value: "OwO",
        },
        {
          name: "uwu",
          value: "UwU",
        }
      )
      .setTimestamp()
      .setFooter("Puppet#1686");
    message.channel.send(embed);
  },
};
