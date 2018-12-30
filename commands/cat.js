const Discord = require("discord.js");
const superagent = require("superagent");

exports.run = async (bot,message,args) => {

  let{body} = await superagent
  .get(`http://aws.random.cat/meow`);

  let catembed = new Discord.RichEmbed()
  .setColor("#7289DA")
  .setTitle("Cat 🐱")
  .setImage(body.file);

  message.channel.send(catembed);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['kedi'],
    permLevel: 0
};

exports.help = {
    name: 'cat',
    description: 'Rastgele kedi resimi getirir',
    usage: 'cat'
};