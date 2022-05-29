const Discord = require("discord.js");
const {MessageEmbed} = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");
const fetch = require("axios")

module.exports = {
  name: "ss", 
  category: "Utility", 
  aliases: ["screenshot","ekranresmi","ekran"], 
  cooldown: 2, 
  usage: "ss link", 
  description: "Verilen site linkinin ss'ini gönderir.", 
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
      let url = args[0]

      if(!url) return message.reply({embeds: [new MessageEmbed()
      .setColor(ee.wrongcolor)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle("<a:wrong:927241890099761173> | Url vermeyi unuttun!")
      ]}).then(msg => {
          setTimeout(() => {
            message.delete()
            msg.delete()
          }, 3000);
      })

      message.reply({ embeds: [new MessageEmbed()
      .setColor(ee.color)
      .setFooter(ee.footertext, ee.footericon)
      .setTitle(`<a:Loading:749349813904080987> | Yükleniyor...`)
      ]}).then(async msg => {
        let res = await fetch(`https://api.ultrax-yt.com/v1/screenshot?url=${url}&key=WuqDicYWmOAx`)

        const buffer = new Buffer.from(res.data.screenshot.split(",")[1],"base64")

        const image = new Discord.MessageAttachment(buffer, 'screenshot.png')

        const embed = new MessageEmbed()
        .setTitle(`${url}`)
        .setURL(`${url}`)
        .setImage("attachment://screenshot.png")

        await msg.delete()
        message.reply({ embeds: [ embed ], files: [ image ]})

        
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