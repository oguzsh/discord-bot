const Discord = require('discord.js');
const ayarlar = require('../settings.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
    const embedyardim = new Discord.RichEmbed()
        .setTitle("Komutlar")
        .setDescription('')
        .setColor(0x00ffff)
        .addField("**» Kullanıcı Komutları**", `!report = İstediğiniz Kullanıcıyı Reportlarsınız. \n!sunucubilgi = Bulunduğunuz Sunucu Hakkında Bilgi Verir.\n!hava = Hava durumu bilgisini verir\n!oylama = Oylama başlatır.\n!cat = Rastgele kedi resimi getirir\n!ascii = Ascii tarzında yazar\n!google = Arama yapmanızı sağlar\n!gif = Random gif oluşturur`)
        .addField("**» Sunucu Yetkilisi Komutları**", `\n!ban = İstediğiniz Kişiyi Sunucudan Banlar. \n!kick  = İstediğiniz Kişiyi Sunucudan Atar.  \n!sustur = İstediğiniz Kişiyi Susturur. \n!temizle = Belirtilen Miktarda Mesajı Silir. (MAX 100)`)
        .addField("**» Botun Ana Komutları**", "!yardım = BOT Komutlarını Atar.")
        .setFooter('Goygoy.sh BOT [ Beta ]')
    if (!params[0]) {
        const commandNames = Array.from(client.commands.keys());
        const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
        message.channel.send(embedyardim);
    } else {
        let command = params[0];
        if (client.commands.has(command)) {
            command = client.commands.get(command);
            message.author.send('', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
        }
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['h', 'help', 'help', 'y','yardim'],
    permLevel: 0
};

exports.help = {
    name: 'yardım',
    description: 'Tüm komutları gösterir.',
    usage: 'yardim [komut]'
};