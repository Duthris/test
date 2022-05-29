const weather = require('weather-js');
const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");

module.exports = {
  name: "hava", 
  category: "Utility", 
  aliases: ["delete", "purge"], 
  cooldown: 3, 
  usage: "hava şehir_adı", 
  description: "Belirtilen şehir hakkında hava durumunu gösterir.", 
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
      weather.find({ search: args.join(" "), degreeType: `C` }, function(error, result) {
        if (error) return message.channel.send(`${error}`);
        if (!args.length) return message.channel.send({
          embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**Belirtilen şehir bulunamadı.**`)
            .setDescription(`<a:wrong:927241890099761173> | Lütfen geçerli bir şehir adı söyle!`)
          ]
        })
        if (result === undefined || result.length === 0) return message.channel.send({
          embeds: [new MessageEmbed()
            .setColor(ee.wrongcolor)
            .setFooter(ee.footertext, ee.footericon)
            .setTitle(`**Belirtilen şehir bulunamadı.**`)
            .setDescription(`<a:wrong:927241890099761173> | Lütfen geçerli bir şehir adı söyle!`)
          ]
        })
        var current = result[0].current;
        var location = result[0].location;
        const embed = new Discord.MessageEmbed()
          .setAuthor(`${current.observationpoint} Hava Durumu`)
          .setThumbnail(`${current.imageUrl}`)
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .addField('Saat Dilimi', `UTC ${location.timezone}`, true)
          .addField('Derece Türü', 'Santigrat', true)
          .addField('Sıcaklık', `${current.temperature}°`, true)
          .addField('Rüzgar', `${current.winddisplay}`, true)
          .addField('Hissedilen', `${current.feelslike}°`, true)
          .addField('Nem', `${current.humidity}%`, true)
          .addField("Ölçülen Zaman", result[0].current.observationtime, true)
        message.channel.send({ embeds: [embed] })
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