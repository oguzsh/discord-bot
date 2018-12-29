const Discord = require('discord.js');
const ayarlar = require('../settings.json');

exports.run = (bot, message, params) => {
    message.delete();
    const embed = new Discord.RichEmbed()
        .setColor("#36393F")
        .setAuthor(message.guild.name, message.guild.userURL)
        .setThumbnail(message.guild.iconURL)
        .addField('Varsayılan rol:', message.guild.defaultRole, true)
        .addField('Roller:', message.guild.roles.map(role => role.name).join(', '), true)
        .setTimestamp()
    message.channel.send({
        embed
    });
    message.react('✅')
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'roller',
    description: 'Sunucudaki rolleri söyler.',
    usage: 'roller'
};