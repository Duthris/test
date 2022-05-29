const { CommandInteraction, MessageEmbed } = require("discord.js");
const { Collection } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
const { client } = require("../../index.js")
const moment = require('moment');
const db = require("../../databases/AFKSystem.js");

const afk3 = new Collection();

module.exports = {
  name: "afk", 
  category: "Information", 
  cooldown: 5, 
  usage: "afk [sebep]", 
  description: "AFK olurken belirtilen notu (nedeni) birisi tarafından etiketlenince iletir.", 
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
      const reason = args.join(" ") || "Belirtilmedi.";

      const existCheck = await db.findOne({ UserID: message.author.id, GuildID: message.guild.id });

      if (existCheck != null && args[0] === "kaldır") {
        message.reply({ embeds: [new MessageEmbed()
        .setColor('#000000')
        .setThumbnail("https://cdn.discordapp.com/emojis/886068576556027934.gif?size=4096")
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`AFK Modu Kapatıldı.\n\nArtık AFK Değilsin.`)
      ]}); 
        await db.findOneAndDelete({ UserID: message.author.id, GuildID: message.guild.id });
        return;
      }

      else {
        await db.findOneAndUpdate(
          { GuildID: message.guild.id, UserID: message.author.id },
          { Status: reason, Time: Date.now() },
          { new: true, upsert: true }
        )
          .then(message.reply({ embeds: [new MessageEmbed()
        .setColor('#000000')
        .setThumbnail("https://cdn.discordapp.com/emojis/886068576556027934.gif?size=4096")
        .setFooter(ee.footertext, ee.footericon)
        .setTitle(`AFK Modu Açıldı.\n\nAFK Sebebi: \`${reason}\``)
      ]}))
      }

    } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ HATA | Bir hata meydana geldi.`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
        ]
      });
    }

  }
}