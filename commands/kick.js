const Discord = require('discord.js');
exports.run = (client, message, args) => {
    if (!message.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTimestamp()
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField(':warning: Uyarı :warning:', '`kick` adlı komutu özel mesajlarda kullanamazsın.')
        return message.author.sendEmbed(ozelmesajuyari);
    }
    let guild = message.guild
    let reason = args.slice(1).join(' ');
    let user = message.mentions.users.first();
    let modlog = guild.channels.find('name', 'log');
    if (!modlog) return message.reply(':warning: **Uyarı** :warning:', '`log` **adlı Kanal Bulunamadı!**');
    if (reason.length < 1) return message.reply('Hava almaya kimi ve gönderme sebebin ne onuda yaz :P' );
    if (message.mentions.users.size < 1) return message.reply('Kimi göndereyim dışarıya ?').catch(console.error);

    if (!message.guild.member(user).kickable) return message.reply('Yetkilileri sunucudan atamam.');
    message.guild.member(user).ban();

    const embed = new Discord.RichEmbed()
        .setColor(0x00AE86)
        .setTimestamp()
        .addField('Eylem:', 'Hava almaya gönderilme ')
        .addField('Hava almaya gönderilen kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
        .addField('Gönderen Yetkili:', `${message.author.username}#${message.author.discriminator}`)
        .addField('Sebebi: ', reason);
    return guild.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['at'],
    permLevel: 3
};

exports.help = {
    name: 'kick',
    description: 'İstediğiniz kişiyi sunucudan atar.',
    usage: 'kick [kullanıcı] [sebep]'
};