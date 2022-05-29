const { MessageEmbed } = require("discord.js");
const config = require("../../botconfig/config.json");
const ee = require("../../botconfig/embed.json");
const settings = require("../../botconfig/settings.json");
module.exports = {
  name: "31help31", 
  category: "Information", 
  cooldown: 3, 
  usage: "help [Commandname]", 
  description: "Tüm komutları gösteren yardım menüsü.", 
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
    try{
      if (args[0]) {
        const embed = new MessageEmbed();
        const cmd = client.commands.get(args[0].toLowerCase()) || client.commands.get(client.aliases.get(args[0].toLowerCase()));
        if (!cmd) {
            return message.reply({embeds: [embed.setColor(ee.wrongcolor).setDescription(`**${args[0].toLowerCase()}** komutu için detaylı bilgi bulunamadı.`)]});
        }
        if (cmd.name) embed.addField("**Komut Adı**", `\`${cmd.name}\``);
        if (cmd.name) embed.setTitle(`Detaylı bilgi:\`${cmd.name}\``);
        if (cmd.description) embed.addField("**Açıklama**", `\`${cmd.description}\``);
        if (cmd.aliases) embed.addField("**Diğer Kullanımları**", `\`${cmd.aliases.map((a) => `${a}`).join("`, `")}\``);
        if (cmd.cooldown) embed.addField("**Bekleme Süresi**", `\`${cmd.cooldown} Saniye\``);
        else embed.addField("**Bekleme Süresi**", `\`${settings.default_cooldown_in_sec} Saniye\``);
        if (cmd.usage) {
            embed.addField("**Kullanım**", `\`${prefix}${cmd.usage}\``);
            embed.setFooter("<> = Gerekli, [] = İsteğe Bağlı");
        }
        return message.reply({embeds: [embed.setColor(ee.color)]});
      } else {
        const embed = new MessageEmbed()
            .setColor(ee.color)
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle("🔰 YARDIM MENÜSÜ | KOMUTLAR")
            .setFooter(`Belirli bir komutun detaylarını görmek için böyle yaz: ${prefix}help [Komut-Adı]`, client.user.displayAvatarURL());
        const commands = (category) => {
            return client.commands.filter((cmd) => cmd.category === category).map((cmd) => `\`${cmd.name}\``);
        };
        try {
          for (let i = 0; i < client.categories.length; i += 1) {
            const current = client.categories[i];
            const items = commands(current);
            embed.addField(`**${current.toUpperCase()} [${items.length}]**`, `> ${items.join(", ")}`);
          }
        } catch (e) {
            console.log(String(e.stack).red);
        }
        message.reply({embeds: [embed]});
    }
  } catch (e) {
      console.log(String(e.stack).bgRed)
      return message.reply({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ HATA | Bir hata meydana geldi!`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
      ]});
  }
}
}