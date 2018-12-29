const Discord = require('discord.js');

exports.run = (bot, message, args) => {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Çekiliş konusunu giriniz : !çekiliş [konu]');
    const embed = new Discord.RichEmbed()
        .setColor("#00FF00")
        .addField('Ödül', `${mesaj}`)
        .addField('Kazanan:', `${message.guild.members.random().displayName}`)
    return message.channel.send(embed);
}

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'çekiliş',
    description: 'çekiliş [çekiliş konusu]',
    usage: 'çekiliş'
};
