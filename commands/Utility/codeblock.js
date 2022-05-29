const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");
const fetch = require('node-fetch')

module.exports = {
  name: "kod", 
  category: "Utility", 
  aliases: ["code"], 
  cooldown: 2, 
  usage: "kod [kod]", 
  description: "Verilen metni kod bloğu içine yazdırır.", 
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
      const fullmessage = args.slice(0).join(" ")

      if (!fullmessage) {
        return message.reply({
          embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`<a:wrong:927241890099761173> **| Kod bloğuna yazmak için lütfen bir şeyler yaz!**`)
          ]
        }).then(msg => {
          setTimeout(() => {
            msg.delete()
          }, 5000);
        })
      }

      message.reply({
        embeds: [new MessageEmbed()
        .setColor(ee.color)
        .setFooter(ee.footertext, message.guild.iconURL({ dynamic: true }))
        .setTitle(`<a:attachment:934133367904043018>  |  **__${message.author.tag}__ Tarafından Paylaşılan Kod**`)
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setDescription( `\`\`\`${fullmessage}\`\`\``)]
      })

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