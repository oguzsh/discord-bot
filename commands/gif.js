// http://api.giphy.com/v1/gifs/random?api_key=WfLCqVCix1GhdMVzEmsHyfqHlMuLyOQa

const Discord = require(`discord.js`);
const ayarlar = require('../settings.json');
const axios = require('axios');
const URL = `http://api.giphy.com/v1/gifs/random?api_key=${ayarlar.giphy_api}`;

exports.run = (client, message) => {
    axios.get(URL)
        .then(function (response) {
            console.log(response.data);
             console.log("------------------------------------------------------------");
             console.log(response.data.original.url);
             console.log("------------------------------------------------------------");
             console.log(response.data.image_url);
            console.log("------------------------------------------------------------");
            console.log(response.data.images);
             console.log("------------------------------------------------------------");
             console.log(response.data.images.image_url);
        })
        .catch(function (error){
            console.error(error)
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