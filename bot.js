const Discord = require('discord.js');
require('discord.js-aliases');
const client = new Discord.Client();
const ayarlar = require('./settings.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


/////////////////////// Auto Role ///////////////////////
client.on('guildMemberAdd', member => {
    var channel = member.guild.channels.find("name", "karşılama-odası");
    if (!channel) return;

    var role = member.guild.roles.find("name", "Üye");
    if(!role) return;
    member.addRole(role);
    channel.send(member + "aramıza" + role + "rolünde hoşgeldin <3");
    channel.send(member + " sohbete katılmak için #sohbet kanalına gidebilirsin n_n");
});
/////////////////////// Auto Role ///////////////////////

/////////////////////// Auto Role Remove ///////////////////////
client.on('guildMemberRemove', member => {
    const channel = member.guild.channels.find('name', 'sohbet');
    if (!channel) return;
    const embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setAuthor(member.user.username, member.user.avatarURL)
        .setThumbnail(member.user.avatarURL)
        .setTitle('📤 | Sunucudan ayrıldı')
        .setTimestamp()
    channel.sendEmbed(embed);
});
/////////////////////// Auto Role Remove ///////////////////////


/////////////////////// Commands ///////////////////////
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
    if (err) console.error(err);
    files.forEach(f => {
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});
/////////////////////// Commands ///////////////////////



client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./commands/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./commands/${command}`)];
            let cmd = require(`./commands/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};


client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);