const Discord = require('discord.js');
exports.run = function(client, message, args) {
    const embed = new Discord.MessageEmbed()
        .setImage(message.guild.iconURL())
    message.channel.send(embed);
};
exports.conf = {
  enabled: true, 
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};
exports.help = {
  name: 'sunucu-resmi',
};
