const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('../settings.json');
const weather = require('weather-js');

var lele = ayarlar.prefix;

exports.run = (client, message) => {

    let sender = message.author;
    let cont = message.content.slice(lele.length).split(" ");
    let args = cont.slice(1);
    var msg = message.content.toLowerCase();
    weather.find({
        search: args.join(" "),
        degreeType: 'C'
    }, function (err, result) {


        if (result === undefined || result.length === 0) {
            message.channel.send('**Geçerli bir konum belirt.**')
            return;
        }
        var current = result[0].current;
        var location = result[0].location;

        const embedede = new Discord.RichEmbed()
            .setDescription(`**${current.skytext}**`)
            .setAuthor(`${current.observationpoint} için hava durumu`)
            .setThumbnail(current.imageUrl)
            .setColor(0x00AE86)
            .addField('Saat dilimi', `UTC${location.timezone}`, true)
            .addField('Derece tipi', location.degreetype, true)
            .addField('Sıcaklık', `${current.temperature} Derece`, true)
            .addField('Hissettiren', `${current.feelslike} Derece`, true)
            .addField('Rüzgar', current.winddisplay, true)
            .addField('Nem', `${current.humidity}%`, true)


        message.channel.send(embedede);

    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'hava',
    description: 'İstediğiniz bölgenin hava durumunu gösterir.',
    usage: 'hava <bölge>'
};