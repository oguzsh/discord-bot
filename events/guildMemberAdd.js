module.exports = member => {
    let username = member.user.username;
    member.send('Sunucuya Hoş Geldin!');
    member.guild.defaultChannel.send('');
};
