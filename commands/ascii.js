var figlet = require('figlet');

exports.run = (client, message, args, tools) => {
  
  var maxLen = 100 
  
  if(args.join(' ').length > maxLen) return message.channel.send(`En fazla ${maxLen} karakter yazabilirsin!`) 
  
  if(!args[0]) return message.channel.send('Lütfen bir yazı girin... Kullanım : !ascii [yazı]');
  
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log('Bir hata var...');
          console.dir(err);
          return;
      }

      message.channel.send(`${data}`, {code: 'AsciiArt'});
  });


}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['asci'],
  permLevel: 0
};

exports.help = {
  name: 'ascii',
  description: '',
  usage: 'ascii'
};