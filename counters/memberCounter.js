module.exports = async (client) => {
  const guild = client.guilds.cache.get('594093391160279051');

  setInterval(() => {
    const memberCount = guild.memberCount;
    const channel = guild.channels.cache.get('927018713977339925');
    channel.setName(`🐵 | Maymun Sayısı: ${memberCount.toLocaleString()}`);
    console.log('Maymun sayısı güncellendi!');
  }, 300000);
}