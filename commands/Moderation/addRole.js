const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
var ee = require("../../botconfig/embed.json");
const { GetUser, GetGlobalUser } = require("../../handlers/functions")
const settings = require("../../botconfig/settings.json");

module.exports = {
  name: "rol", 
  category: "Moderation", 
  aliases: ["role", "rolekle", "addrole"], 
  cooldown: 0, 
  usage: "rol @kişi @rol", 
  description: "Etiketlenen kişiye, etiketlenen rolü ekler.", 
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
      if (!message.member.permissions.has("MANAGE_ROLES")) return message.reply("<a:wrong:927241890099761173> | Bunu yapmak için yetkin yok!");

      const targetMember = message.mentions.members.first();
      if (!targetMember) return message.reply("<a:wrong:927241890099761173> | Bir kişi etiketlemen lazım!");

      const targetRole = message.mentions.roles.first();
      if (!targetRole) return message.reply("<a:wrong:927241890099761173> | Bir rol etiketlemen lazım!");

      await targetMember.roles.add(targetRole);
      message.reply({
        embeds: [new MessageEmbed()
          .setColor(ee.color)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle("<a:check:927241846726484009> | Rol başarıyla eklendi.")
          .setDescription(`${targetMember} kişisine ${targetRole} rolü eklendi.`)
        ]
      }).then(msg => {
        setTimeout(() => {
          message.delete()
          msg.delete()
        }, 1000);
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