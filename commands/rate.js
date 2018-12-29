const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Neyi oylayacaksın onu da yaz :/');
    message.delete();
    const embed = new Discord.RichEmbed()
        .setAuthor('Oylama Başladı')
        .setColor(3447003)
        .setDescription(`${mesaj} \n\n\ Evet İçin: :thumbsup: Hayır İçin: :thumbsdown: `)
    return message.channel.sendEmbed(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3
};

exports.help = {
    name: 'oylama',
    description: 'Oylama Yapar.',
    usage: 'oylama [oylama konusu]'
};