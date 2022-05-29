const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");
const fetch = require('node-fetch');
const { DiscordTogether } = require('discord-together');

module.exports = {
  name: "yt", 
  category: "Activity", 
  aliases: ["youtube"], 
  cooldown: 2, 
  usage: "yt", 
  description: "Beraber youtube videosu izleyebileceğiniz bir pencere açar.", 
  memberpermissions: [], 
  requiredroles: [], 
  alloweduserids: [], 
  minargs: 0, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0, 
  argsmissing_message: "", 
  argstoomany_message: "", 

  run: async (client, message, args, plusArgs, cmdUser, text, prefix, interaction) => {
    try {
      if (!message.member.voice.channelId) {
        let embed = new MessageEmbed()
          .setTitle("<a:wrong:927241890099761173> **HATA | Önce bir ses kanalına katıl!**")
          .setColor("RED")
          .setFooter(ee.footertext, ee.footericon)

        return message.reply({ embeds: [embed] });

      }

      client.discordTogether = new DiscordTogether(client);
      client.discordTogether.createTogetherCode(message.member.voice.channel.id, 'youtube').then(async invite => {

        let embed = new MessageEmbed()
          .setTitle("<:Youtube:908896208657989642> | **Beraber youtube izlemek için aşağıdaki bağlantıyı kullan.**")
          .setDescription(`${invite.code}`)
          .setColor("RED")
          .setFooter(ee.footertext, ee.footericon)

        return message.reply({ embeds: [embed] });
      });
    } catch (e) {
      message.channel.messages.channel.bulkDelete(1);
      console.log(String(e.stack).bgRed)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`<a:wrong:927241890099761173> HATA | Bir hata meydana geldi!`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``).then(msg => {
            msg.react("<a:wrong:927241890099761173> ");
            setTimeout(() => {
              msg.delete()
            }, 5000);
          })
        ]
      });
    }
  }
}