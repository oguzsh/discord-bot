const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../settings.json');

var prefix = ayarlar.prefix;

const girismesaj = [
  'Bot özellikleri için !yardım komutunu kullanabilirsin.',
]

client.on('guildCreate', guild => {
    const generalChannel = guild.defaultChannel
    generalChannel.sendMessage(girismesaj)
	client.user.setGame(prefix + '!yardım' );
})
