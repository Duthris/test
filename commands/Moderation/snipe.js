const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");
const moment = require('moment');

module.exports = {
  name: "yakala", 
  category: "Moderation", 
  aliases: ["snipe", "sp"], 
  cooldown: 0, 
  usage: "yakala", 
  description: "Silinen mesajları yakalar.", 
  memberpermissions: [], 
  requiredroles: [], 
  alloweduserids: [], 
  minargs: 0, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0, 
  argsmissing_message: "", 
  argstoomany_message: "", 
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
      if (!message.member.permissions.has("MANAGE_MESSAGES")) return;

      const channel = message.mentions.channels.first() || message.channel;

      const snipes = client.snipes.get(channel.id);

      if (!snipes) return message.reply({embeds: [
        new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`<a:wrong:927241890099761173> | Hiç silinen mesaj yok!`)
        .setFooter(ee.footertext, ee.footericon)
      ]}).then(msg => {
            setTimeout(() => {
              message.delete()
              msg.delete()
            }, 3000);
          })

     const snipe = args[0] && !isNaN(args[0]) ? Number(args[0]) - 1 : 0;

      const target = snipes[snipe];

      if(!target) return message.reply({embeds: [
        new MessageEmbed()
        .setColor(ee.color)
        .setTitle(`<a:wrong:927241890099761173> | Geçerli bir sayı gir!`)
        .setDescription(`**Bu kanalda toplam ${snipes.length} adet mesaj silindi.**`)
        .setFooter(ee.footertext, ee.footericon)
      ]}).then(msg => {
            setTimeout(() => {
              message.delete()
              msg.delete()
            }, 5000);
          });

      const { content, image, member, time } = target;

      moment.locale('tr');

      message.reply({embeds: [
            new MessageEmbed()
            .setColor(ee.color)
            .setDescription(content ? `**${content.substr(0, 2048)}**` : "**Silinen Resim**")
            .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
            .setImage(image)
            .setFooter(`${moment(time).fromNow()} • ${snipe + 1} / ${snipes.length}\n${ee.footertext}`, ee.footericon)
        ]});
    
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
