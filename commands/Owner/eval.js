const {
  MessageEmbed,
  splitMessage
} = require(`discord.js`);
var Discord = require(`discord.js`);
var config = require(`../../botconfig/config.json`);
var settings = require(`../../botconfig/settings.json`);
var ee = require(`../../botconfig/embed.json`);
const {
  inspect
} = require(`util`);
module.exports = {
  name: `test`,
  category: `Owner`,
  aliases: [`evaluate`, "evaluate", "eval"],
  description: `Eval a Command!`,
  usage: `eval <CODE>`,
  memberpermissions: [], 
  requiredroles: [], 
  minargs: 1, 
  maxargs: 0, 
  minplusargs: 0, 
  maxplusargs: 0, 
  argsmissing_message: "", 
  argstoomany_message: "", 
  run: async (client, message, args, plusArgs, cmdUser, text, prefix) => {
    try {
    const owners = [
      process.env.DuthrisID,
    ]
    if(!owners.includes(message.author.id)) return;
         const code = args.join(" ");
  const token = client.token.split("").join("[^]{0,2}");
  const rev = client.token.split("").reverse().join("[^]{0,2}");
  const filter = new RegExp(`${token}|${rev}`, "g");
  try {
    let output = eval(code);
    if (output instanceof Promise || (Boolean(output) && typeof output.then === "function" && typeof output.catch === "function")) output = await output;
    output = inspect(output, { depth: 0, maxArrayLength: null });
    output = output.replace(filter, "[TOKEN]");
    if (output.length < 1950) {
        const outputembed = new Discord.MessageEmbed()
        .setTitle('<a:attachment:934133367904043018>  |  Test Başarılı!')
        .setDescription('**Test Edilen İfade**\n\`\`\`' + code + '\`\`\`\n\n**Test Sonucu**\n\`\`\`' + output + '\`\`\`')
        .setFooter("© | Maymunlar Dünyası", client.user.displayAvatarURL())
  message.channel.send({ embeds: [outputembed] });
    }
  } catch (error) {
    const erroremb = new Discord.MessageEmbed()
    .setTitle(`⚠ HATA`)
    .setDescription(`\`\`\`${error.stack}\`\`\``)
    message.channel.send({embeds: [erroremb]})
 }
    } catch (e) {
      return message.reply({embeds: [new MessageEmbed()
          .setColor(ee.wrongcolor)
          .setFooter(ee.footertext, ee.footericon)
          .setTitle(`❌ HATA | Bir hata oluştu!`)
          .setDescription(`\`\`\`${e.message ? String(e.message).substr(0, 2000) : String(e).substr(0, 2000)}\`\`\``)
      ]});
    }
  },
};