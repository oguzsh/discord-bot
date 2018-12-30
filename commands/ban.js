const Discord = require('discord.js');
exports.run = (client, message, args) => {
  if (!message.guild) {
    const ozelmesajuyari = new Discord.RichEmbed()
      .setColor(0xFF0000)
      .setTimestamp()
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField(':warning: Uyarı :warning:', '`ban` adlı komutu özel mesajlarda kullanamazsın.')
    return message.author.sendEmbed(ozelmesajuyari);
  }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'log');
  if (!modlog) return message.reply(':warning: **Uyarı** :warning:', '`log` **adlı Kanal Bulunamadı!**');
  if (reason.length < 1) return message.reply('Kimi ne sebeple sürgün edeyim onu yaz :P, Kullanım: !ban [kişi] [sebep]');
  if (message.mentions.users.size < 1) return message.reply('Kimi sürgün edeyim ?, Kullanım: !ban [kişi] [sebep]').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('Yetkilileri sunucudan banlayamam.');
  message.guild.member(user).ban();

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', 'Sürgün')
    .addField('Sürgüne gönderilen kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Sürgüne gönderen yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Sebebi: ', reason);
  return guild.channels.get(modlog.id).sendEmbed(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasakla'],
  permLevel: 3
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan banlar.',
  usage: 'ban [kullanıcı] [sebep]'
};