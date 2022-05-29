const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");

module.exports = {
  name: "sil", 
  category: "Utility", 
  aliases: ["delete", "purge"], 
  cooldown: 1, 
  usage: "sil **adet**", 
  description: "Belirtilen miktarda mesaj siler.", 
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
      let amount = args[0];

      if (!amount) {
        message.channel.messages.channel.bulkDelete(1);
        return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`**Silme işlemi başarısız.**`)
        .setDescription(`<a:wrong:927241890099761173> | Lütfen silinecek mesaj sayısını söyle!`)
        ]}).then(msg => {
          msg.react("<a:wrong:927241890099761173> ");
          setTimeout(() => {
            msg.delete()
          }, 5000);
        })
      }

      if (isNaN(amount)) {
        message.channel.messages.channel.bulkDelete(1);
        return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`**Silme işlemi başarısız.**`)
        .setDescription(`<a:wrong:927241890099761173> | Silinecek mesaj miktarı geçerli bir sayı olmalı!`)
        ]}).then(msg => {
          msg.react("<a:wrong:927241890099761173> ");
          setTimeout(() => {
            msg.delete()
          }, 5000);
        })
      }

      if (amount >= 100) {
        message.channel.messages.channel.bulkDelete(1);
        return message.reply({embeds: [new MessageEmbed()
        .setColor(ee.wrongcolor)
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`**Silme işlemi başarısız.**`)
        .setDescription(`<a:wrong:927241890099761173> | Aynı anda 100'den fazla mesaj silemem!`)
        ]}).then(msg => {
          msg.react("<a:wrong:927241890099761173> ");
          setTimeout(() => {
            msg.delete()
          }, 5000);
        })
      }

      else {
        message.channel.messages.channel.bulkDelete(parseInt(amount)+1);
        return message.reply({embeds: [new MessageEmbed()
        .setColor('#2ECC71')
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`**Silme işlemi başarılı.**`)
        .setDescription(`<a:check:927241846726484009> | ${amount} adet mesaj başarıyla silindi!`)
        ]}).then(msg => {
          msg.react("<a:check:927241846726484009> ");
          setTimeout(() => {
            msg.delete()
          }, 5000);
        })
      }
    } catch (e) {
      message.channel.messages.channel.bulkDelete(1);
      console.log(String(e.stack).bgRed)
      return message.reply({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`<a:wrong:927241890099761173> HATA | Bir hata meydana geldi!`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``).then(msg => {
          msg.react("<a:wrong:927241890099761173> ");
          setTimeout(() => {
            msg.delete()
          }, 5000);
        })
      ]});
    }
  }
}