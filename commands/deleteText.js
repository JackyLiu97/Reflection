module.exports = {
  name: "delete",
  description: "delete text",
  execute(message, args) {
    if (message.member.hasPermission("ADMINISTRATOR")) {
      let numToDelete = parseInt(args[0], 10) + 1; // +1 to account for the command input

      async function clear() {
        try {
          let fetched = await message.channel.messages.fetch({
            limit: numToDelete,
          });
          let fetched_messages = fetched.array();
          let toDelete = [];
          for (let i = 0; i < fetched_messages.length; i++) {
            // filters out messages that have attachments
            if (fetched_messages[i].attachments.size > 0) {
              // check the attachment url to whitelist images ending with jpg or png
              let attach = fetched_messages[i].attachments.array();
              let url = attach[0].url; // first element of attachments is a map that holds the url
              if (!url.endsWith("jpg") && !url.endsWith("png")) {
                toDelete.push(fetched_messages[i]);
              }
            } else {
              toDelete.push(fetched_messages[i]);
            }
            console.log(fetched_messages[i]);
          }
          toDelete.forEach((message) => message.delete());
        } catch (error) {
          console.log(`Error ${error} `);
        }
      }

      if (Number.isInteger(numToDelete)) {
        console.log(`${numToDelete - 1} messages deleted!`);
        clear();
      }
    } else {
      message.reply("Sorry, you don't have permission to do that!");
    }
  },
};
