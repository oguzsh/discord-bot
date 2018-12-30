const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    let mesaj = args.slice(0).join(' ');
    if (mesaj.length < 1) return message.reply('Hata! Doğru kullanım : !oylama [konu]');
    message.delete();

    const embed = new Discord.RichEmbed()
        .setColor("#ffffff")
        .setAuthor('Oylama Başladı')
        .setTitle(`Oylama tarafından ${message.author.username} başlatıldı`)
        .setColor(3447003)
        .setDescription(`${mesaj} \n\n\ Evet İçin: :thumbsup: Hayır İçin: :thumbsdown: `);

        let msg = await message.channel.send(embed)
            .then(function (msg) {
                msg.react("❎");
                msg.react("✅");
                message.delete({
                    timeout: 1000
                });
            }).catch(function (error) {
                console.log(error);
            });
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