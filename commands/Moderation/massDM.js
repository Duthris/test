const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");

module.exports = {
  name: "massdm", 
  category: "Moderation", 
  aliases: ["dmeveryone"], 
  cooldown: 0, 
  usage: "massdm mesaj", 
  description: "Sunucuda DM'i açık olan herkese girilen mesajı gönderir.", 
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


      let args = message.content.split(" ").slice(1);
      let argsresult = args.join(' ');

      message.guild.members.cache.forEach(mem => { 
        mem.send(argsresult)
      }).then(message.reply(`sent`))

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