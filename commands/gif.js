const Discord = require(`discord.js`);
const ayarlar = require('../settings.json');
var giphy = require('giphy-api')(ayarlar.giphy_api);

exports.run = (client, message) => {
    giphy.random().then(function (res) {
        var gif = res.data.images.original.url;
         let gif_embed = new Discord.RichEmbed()
             .setColor("#7289DA")
             .setTitle("Gif n_n")
             .setImage(gif);
         message.channel.send(gif_embed);

    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'gif',
    description: 'Rastgele Gif oluşturur',
    usage: '!gif'
}