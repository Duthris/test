const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");

module.exports = {
  name: "yazıtura", 
  category: "Utility", 
  aliases: ["coinflip", "flip", "kura"], 
  cooldown: 2, 
  usage: "yazıtura", 
  description: "Kazananı belirlemek için bir para döndürür.", 
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
      const randomNumber = Math.floor(Math.random() * 20) + 1;

      const msg = message.reply({embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`<a:Loading:749349813904080987> | **Yazı - Tura Atılıyor...**`)
      .setImage('https://media3.giphy.com/media/FfrlRYkqKY1lC/giphy.gif?cid=ecf05e47g8mlz89wjip3xpumqfzgtm2nrlt7j1t64gne5tc4&rid=giphy.gif&ct=g')
      ]}).then(msg => {
        if (randomNumber <= 10) {
           setTimeout(() => {
          msg.edit({embeds: [new MessageEmbed()
          .setColor('#2ECC71')
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`<a:check:927241846726484009> | **Yazı Geldi!**`)
      .setImage('https://github.com/sefabalban123/Sifirdan-Discord.Js-V12/blob/35ee3af9f9ccd30aefc8f2089ce399bcc872212f/40%20-%20Message%20Collector%20ve%20Reaction%20Collector/images/yaz%C4%B1.png?raw=true')
          ]})
        }, 2500);
        }

        else {
           setTimeout(() => {
          msg.edit({embeds: [new MessageEmbed()
          .setColor('#2ECC71')
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`<a:check:927241846726484009> | **Tura Geldi!**`)
      .setImage('https://i.hizliresim.com/qv08yz1.png')
          ]})
        }, 2500)
        }
      })

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