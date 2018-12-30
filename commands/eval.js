const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    const code = args.join(" ");
    try {
        const evaled = eval(code);
        const clean = await client.clean(client, evaled);
        if (code) {
            const embed = new Discord.RichEmbed()
                .setAuthor(`${message.author.tag}`, message.author.avatarURL)
                .setColor("RANDOM")
                .addField("Input\⬇", `${code}`)
                .addField("Output\⬇", `\`\`\`js\n${clean}\n\`\`\``)
            message.channel.send({
                embed
            });
        } else {
            const embed = new Discord.RichEmbed()
                .setAuthor(`${message.author.tag}`, message.author.avatarURL)
                .setColor("RANDOM")
                .addField("Code", `none`)
                .addField("Output", `\`\`\`js\n${clean}\n\`\`\``)
            message.channel.send({
                embed
            });
        }
    } catch (err) {
        message.channel.send(`\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: "eval",
    description: "Evaluates arbitrary javascript.",
    usage: "eval [...code]"
};